'use client'

import { getSoftwareSchema } from '@/lib/schema';

const jsonLd = getSoftwareSchema('Resize & Crop', '/tools/resize', 'Resize images to any dimension with social media presets. Free online image resizer.');
import { useState, useCallback } from 'react'
import ToolLayout from '@/components/ToolLayout'
import ImageUploader from '@/components/ImageUploader'
import ImagePreview from '@/components/ImagePreview'
import ProcessingOverlay, { useProcessing } from '@/components/ProcessingOverlay'
import { readFileAsDataURL } from '@/lib/utils'
import { resizeImage } from '@/lib/resize'
import { useLang } from '@/i18n/LangContext'
import { t, tArray } from '@/i18n/translations'

const PRESET_VALUES = [
  { label: 'Instagram Square', w: 1080, h: 1080 },
  { label: 'Twitter Card', w: 1200, h: 675 },
  { label: 'YouTube Thumbnail', w: 1280, h: 720 },
  { label: 'LinkedIn Cover', w: 1584, h: 396 },
  { label: 'Facebook Cover', w: 1640, h: 624 },
  { label: '4K Wallpaper', w: 3840, h: 2160 },
]

export default function ResizePage() {
  const { lang } = useLang()
  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [result, setResult] = useState<string | null>(null)
  const [resultSize, setResultSize] = useState<number>(0)
  const [width, setWidth] = useState(1080)
  const [height, setHeight] = useState(1080)
  const [maintainRatio, setMaintainRatio] = useState(true)
  const [originalDims, setOriginalDims] = useState({ w: 0, h: 0 })
  const { processing, run } = useProcessing()

  const presetLabels = tArray(lang, 'resize.presets') as string[]

  const handleFile = useCallback(async (f: File) => {
    setFile(f); setResult(null)
    const dataUrl = await readFileAsDataURL(f)
    setPreview(dataUrl)
    const img = new Image()
    img.onload = () => { setOriginalDims({ w: img.width, h: img.height }); setWidth(img.width); setHeight(img.height) }
    img.src = dataUrl
  }, [])

  const handleProcess = useCallback(async () => {
    if (!file) return
    gtag('event', 'tool_used', { tool_name: 'resize' })
    await run(async () => {
      const blob = await resizeImage(file, { width, height, maintainAspectRatio: maintainRatio })
      setResult(URL.createObjectURL(blob))
      setResultSize(blob.size)
    }, t(lang, 'resize.processing'))
  }, [file, width, height, maintainRatio, run, lang])

  const handleDownload = () => {
    if (!result) return
    const a = document.createElement('a')
    a.href = result
    const ext = file?.name?.split('.').pop() || 'jpg'
    a.download = (file?.name?.replace(/\.[^.]+$/, '') || 'image') + `-${width}x${height}.` + ext
    a.click()
  }

  const handleReset = () => { setFile(null); setPreview(null); setResult(null) }

  const applyPreset = (p: { w: number; h: number }) => { setWidth(p.w); setHeight(p.h) }

  return (
    <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ToolLayout title={t(lang, 'resize.title')} description={t(lang, 'resize.desc')}>
      {!file && <ImageUploader onFileSelect={handleFile} />}

      {file && !result && preview && (
        <div className="space-y-6">
          <ImagePreview src={preview} fileName={file.name} fileSize={file.size} onReset={handleReset} onDownload={() => {}} downloadLabel="" />

          <div className="p-6 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 space-y-5">
            <div>
              <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">{t(lang, 'resize.presetsLabel')}</label>
              <div className="flex flex-wrap gap-2">
                {PRESET_VALUES.map((p, i) => (
                  <button key={p.label} onClick={() => applyPreset(p)}
                    className={`px-3 py-1.5 rounded-lg text-xs border transition-colors ${width === p.w && height === p.h ? 'border-blue-500 bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300' : 'border-zinc-200 dark:border-zinc-700 hover:border-zinc-300'}`}>
                    {presetLabels[i] || p.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">{t(lang, 'resize.width')}</label>
                <input type="number" value={width} onChange={(e) => { const w = Number(e.target.value); setWidth(w); if (maintainRatio && originalDims.w > 0) setHeight(Math.round(w * (originalDims.h / originalDims.w))) }}
                  className="w-full px-3 py-2 rounded-lg border border-zinc-300 dark:border-zinc-600 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100" />
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">{t(lang, 'resize.height')}</label>
                <input type="number" value={height} onChange={(e) => { const h = Number(e.target.value); setHeight(h); if (maintainRatio && originalDims.w > 0) setWidth(Math.round(h * (originalDims.w / originalDims.h))) }}
                  className="w-full px-3 py-2 rounded-lg border border-zinc-300 dark:border-zinc-600 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100" />
              </div>
            </div>

            <label className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400">
              <input type="checkbox" checked={maintainRatio} onChange={(e) => setMaintainRatio(e.target.checked)} className="accent-blue-600" />
              {t(lang, 'resize.maintain')}
            </label>

            {originalDims.w > 0 && <p className="text-xs text-zinc-400">{t(lang, 'resize.original')} {originalDims.w} × {originalDims.h} px</p>}
          </div>

          {processing ? <ProcessingOverlay message={t(lang, 'resize.processing')} /> : (
            <button onClick={handleProcess} className="w-full py-3 rounded-xl bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors">
              {t(lang, 'resize.btn', { w: width, h: height })}
            </button>
          )}
        </div>
      )}

      {result && (
        <ImagePreview src={result} fileName={(file?.name?.replace(/\.[^.]+$/, '') || 'image') + `-${width}x${height}.` + (file?.name?.split('.').pop() || 'jpg')} fileSize={resultSize} onReset={handleReset} onDownload={handleDownload} extraInfo={`${width} × ${height} px`} />
      )}
    </ToolLayout>
  )
}
