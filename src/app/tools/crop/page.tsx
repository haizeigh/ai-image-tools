'use client'

import { getSoftwareSchema } from '@/lib/schema';
import { useState, useCallback, useRef, useEffect } from 'react'
import ToolLayout from '@/components/ToolLayout'
import ImageUploader from '@/components/ImageUploader'
import ProcessingOverlay, { useProcessing } from '@/components/ProcessingOverlay'
import { readFileAsDataURL, formatFileSize } from '@/lib/utils'
import { useLang } from '@/i18n/LangContext'
import { t } from '@/i18n/translations'

export default function CropPage() {
  const { lang } = useLang()
  const [file, setFile] = useState<File | null>(null)
  const [imageUrl, setImageUrl] = useState<string | null>(null)
  const [result, setResult] = useState<string | null>(null)
  const [imageSize, setImageSize] = useState({ w: 0, h: 0 })
  const [resultSize, setResultSize] = useState<number>(0)
  const { processing, run } = useProcessing()
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  // Selection state
  const [sel, setSel] = useState({ x: 0, y: 0, w: 0, h: 0 })
  const [drawing, setDrawing] = useState(false)
  const [start, setStart] = useState({ x: 0, y: 0 })
  const [scale, setScale] = useState(1)
  const [hasSelection, setHasSelection] = useState(false)

  const handleFile = useCallback(async (f: File) => {
    setFile(f)
    setResult(null)
    setHasSelection(false)
    setSel({ x: 0, y: 0, w: 0, h: 0 })
    const dataUrl = await readFileAsDataURL(f)
    setImageUrl(dataUrl)
    const img = new Image()
    img.onload = () => {
      setImageSize({ w: img.width, h: img.height })
    }
    img.src = dataUrl
  }, [])

  useEffect(() => {
    if (!imageUrl || !canvasRef.current) return
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')!
    const img = new Image()
    img.onload = () => {
      const maxW = 600
      const s = Math.min(maxW / img.width, 1)
      canvas.width = Math.round(img.width * s)
      canvas.height = Math.round(img.height * s)
      setScale(s)
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
    }
    img.src = imageUrl
  }, [imageUrl])

  const getPos = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const rect = canvasRef.current!.getBoundingClientRect()
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    }
  }

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!canvasRef.current) return
    const pos = getPos(e)
    setDrawing(true)
    setStart(pos)
    setSel({ x: pos.x, y: pos.y, w: 0, h: 0 })
    setHasSelection(false)
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!drawing || !canvasRef.current) return
    const pos = getPos(e)
    const x = Math.min(start.x, pos.x)
    const y = Math.min(start.y, pos.y)
    const w = Math.abs(pos.x - start.x)
    const h = Math.abs(pos.y - start.y)
    setSel({ x, y, w, h })
  }

  const handleMouseUp = () => {
    setDrawing(false)
    if (sel.w > 10 && sel.h > 10) {
      setHasSelection(true)
    }
  }

  const handleCrop = useCallback(async () => {
    if (!file || !hasSelection || !canvasRef.current) return
    await run(async () => {
      const c = document.createElement('canvas')
      const ctx = c.getContext('2d')!
      const realX = Math.round(sel.x / scale)
      const realY = Math.round(sel.y / scale)
      const realW = Math.round(sel.w / scale)
      const realH = Math.round(sel.h / scale)
      c.width = realW
      c.height = realH
      const img = new Image()
      img.src = imageUrl!
      await new Promise(r => { img.onload = r })
      ctx.drawImage(img, realX, realY, realW, realH, 0, 0, realW, realH)
      c.toBlob(blob => {
        if (!blob) return
        setResultSize(blob.size)
        const url = URL.createObjectURL(blob)
        setResult(url)
      }, 'image/png')
    }, t(lang, 'processing.default'))
  }, [file, hasSelection, sel, scale, imageUrl, run, lang])

  const handleDownload = () => {
    if (!result) return
    const a = document.createElement('a')
    a.href = result
    a.download = (file?.name?.replace(/\.[^.]+$/, '') || 'image') + '-cropped.png'
    a.click()
  }

  const handleReset = () => {
    setFile(null)
    setImageUrl(null)
    setResult(null)
    setHasSelection(false)
    setSel({ x: 0, y: 0, w: 0, h: 0 })
  }

  const jsonLd = getSoftwareSchema('Crop Image', '/tools/crop', 'Crop images to any size by drawing a selection rectangle. Free online image cropper.');

  // Re-render selection overlay
  useEffect(() => {
    if (!canvasRef.current || !imageUrl) return
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')!
    const img = new Image()
    img.onload = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
      if (hasSelection || drawing) {
        ctx.fillStyle = 'rgba(0,0,0,0.4)'
        // Draw dark overlay around the selection (4 rectangles), not on top of it
        // Top rectangle
        ctx.fillRect(0, 0, canvas.width, sel.y)
        // Bottom rectangle
        ctx.fillRect(0, sel.y + sel.h, canvas.width, canvas.height - sel.y - sel.h)
        // Left rectangle
        ctx.fillRect(0, sel.y, sel.x, sel.h)
        // Right rectangle
        ctx.fillRect(sel.x + sel.w, sel.y, canvas.width - sel.x - sel.w, sel.h)
        // Selection border
        ctx.strokeStyle = '#3B82F6'
        ctx.lineWidth = 2
        ctx.strokeRect(sel.x, sel.y, sel.w, sel.h)
      }
    }
    img.src = imageUrl
  }, [imageUrl, sel, drawing, hasSelection])

  return (
    <>
      <script type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ToolLayout
        title={t(lang, 'crop.title')}
        description={t(lang, 'crop.desc')}
      >
        {!file && <ImageUploader onFileSelect={handleFile} />}

        {file && !result && imageUrl && (
          <div className="space-y-6">
            <div className="flex items-center justify-between bg-zinc-100 rounded-xl px-4 py-3">
              <span className="text-sm font-medium text-zinc-700">{file.name} ({formatFileSize(file.size)}, {imageSize.w}×{imageSize.h})</span>
              <button onClick={handleReset} className="text-xs text-zinc-500 hover:text-zinc-700">Change file</button>
            </div>

            <div ref={containerRef} className="flex justify-center">
              <canvas
                ref={canvasRef}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
                className="border border-zinc-200 rounded-lg cursor-crosshair max-w-full"
                style={{ touchAction: 'none' }}
              />
            </div>

            {hasSelection && !processing && (
              <button onClick={handleCrop}
                className="w-full py-3 rounded-xl bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors"
              >
                Crop ({Math.round(sel.w / scale)}×{Math.round(sel.h / scale)})
              </button>
            )}
          </div>
        )}

        {processing && <ProcessingOverlay message={t(lang, 'processing.default')} />}

        {result && (
          <div className="space-y-4">
            <img src={result} alt="Cropped" className="max-w-full rounded-lg border border-zinc-200" />
            <div className="flex items-center justify-between bg-emerald-50 border border-emerald-200 rounded-xl px-5 py-4">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                <span className="text-emerald-800 font-medium">Cropped!</span>
                <span className="text-sm text-emerald-600">({formatFileSize(resultSize)})</span>
              </div>
              <button onClick={handleDownload}
                className="text-sm text-brand-600 hover:text-brand-700 font-medium"
              >
                Download
              </button>
            </div>
            <button onClick={handleReset}
              className="w-full py-2.5 rounded-xl bg-zinc-100 text-zinc-700 font-medium hover:bg-zinc-200 transition-colors"
            >
              Crop another
            </button>
          </div>
        )}
      </ToolLayout>
      {/* SEO content */}
      <div className="max-w-3xl mx-auto px-4 pb-16">
        <div className="border-t border-zinc-200 dark:border-zinc-800 pt-12 space-y-8">
          <section>
            <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 mb-4">How to Crop an Image</h2>
            <ol className="list-decimal pl-5 space-y-2 text-zinc-600 dark:text-zinc-400">
              <li><strong>Upload your image</strong> — Click the upload area or drag and drop a JPG or PNG file.</li>
              <li><strong>Draw a selection</strong> — Click and drag on the image to draw a crop rectangle. A blue border shows your selection.</li>
              <li><strong>Adjust if needed</strong> — Release the mouse and redraw if you're not satisfied.</li>
              <li><strong>Click "Crop"</strong> — The tool crops to your selection and shows the result.</li>
              <li><strong>Download</strong> — Save your cropped image as a PNG file.</li>
            </ol>
          </section>

          <section>
            <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 mb-4">Tips for Best Results</h2>
            <ul className="list-disc pl-5 space-y-2 text-zinc-600 dark:text-zinc-400">
              <li>Use high-resolution images for better quality after cropping.</li>
              <li>The crop selection must be at least 10×10 pixels.</li>
              <li>For precise dimensions, use our <a href="/tools/resize" className="text-blue-600 dark:text-blue-400 underline">Resize &amp; Crop</a> tool instead.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 mb-4">FAQ</h2>
            <div className="space-y-4">
              <div>
                <p className="font-medium text-zinc-800 dark:text-zinc-200">Is this free?</p>
                <p className="text-sm text-zinc-500">Yes, completely free with no limits or sign-up.</p>
              </div>
              <div>
                <p className="font-medium text-zinc-800 dark:text-zinc-200">What format is the output?</p>
                <p className="text-sm text-zinc-500">The output is a PNG file with transparent background support.</p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  )
}

function CheckCircle2(props: any) {
  return (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" strokeLinecap="round" strokeLinejoin="round"/>
      <polyline points="22 4 12 14.01 9 11.01" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}
