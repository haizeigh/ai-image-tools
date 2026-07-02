'use client'

import { useState, useCallback } from 'react'
import ToolLayout from '@/components/ToolLayout'
import ImageUploader from '@/components/ImageUploader'
import ImagePreview from '@/components/ImagePreview'
import ProcessingOverlay, { useProcessing } from '@/components/ProcessingOverlay'
import { readFileAsDataURL } from '@/lib/utils'
import { ID_PHOTO_SPECS, BG_COLORS, makeIDPhoto, IDPhotoSpec } from '@/lib/idPhoto'
import { useLang } from '@/i18n/LangContext'
import { t } from '@/i18n/translations'

export default function IDPhotoPage() {
  const { lang } = useLang()
  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [result, setResult] = useState<string | null>(null)
  const [resultSize, setResultSize] = useState<number>(0)
  const [selectedSpec, setSelectedSpec] = useState<IDPhotoSpec>(ID_PHOTO_SPECS[0])
  const [bgColor, setBgColor] = useState(BG_COLORS[0].value)
  const { processing, run } = useProcessing()

  const handleFile = useCallback(async (f: File) => {
    setFile(f); setResult(null)
    setPreview(await readFileAsDataURL(f))
  }, [])

  const handleMake = useCallback(async () => {
    if (!file) return
    gtag('event', 'tool_used', { tool_name: 'id-photo' })
    await run(async () => {
      // Step 1: Remove background
      const { removeBackground } = await import('@imgly/background-removal')
      const bgRemovedBlob = await removeBackground(file, {
        progress: (p: any) => console.log('Remove BG progress:', p),
      })
      const bgRemovedUrl = URL.createObjectURL(bgRemovedBlob)

      // Step 2: Load the background-removed image
      const img = await new Promise<HTMLImageElement>((resolve, reject) => {
        const imgEl = new Image()
        imgEl.onload = () => resolve(imgEl)
        imgEl.onerror = reject
        imgEl.src = bgRemovedUrl
      })

      // Step 3: Create ID photo with background color
      const mmToPx = (mm: number) => Math.round((mm / 25.4) * 300)
      const pw = mmToPx(selectedSpec.width), ph = mmToPx(selectedSpec.height)

      const canvas = document.createElement('canvas')
      canvas.width = pw
      canvas.height = ph
      const ctx = canvas.getContext('2d')!

      // Fill background color
      ctx.fillStyle = bgColor
      ctx.fillRect(0, 0, pw, ph)

      // Draw person centered, scaled to fit (85% of the frame)
      const scale = Math.min(pw / img.width, ph / img.height) * 0.85
      const dx = (pw - img.width * scale) / 2
      const dy = (ph - img.height * scale) / 2
      ctx.drawImage(img, dx, dy, img.width * scale, img.height * scale)

      // Step 4: Export
      const blob = await new Promise<Blob>((resolve) => {
        canvas.toBlob((b) => resolve(b!), 'image/jpeg', 0.95)
      })
      setResult(URL.createObjectURL(blob))
      setResultSize(blob.size)
      URL.revokeObjectURL(bgRemovedUrl)
    }, t(lang, 'idPhoto.processing'))
  }, [file, selectedSpec, bgColor, run, lang])

  const handleDownload = () => {
    if (!result) return
    const a = document.createElement('a')
    a.href = result
    a.download = (file?.name?.replace(/\.[^.]+$/, '') || 'photo') + `-${selectedSpec.name}.jpg`
    a.click()
  }

  const handleReset = () => { setFile(null); setPreview(null); setResult(null) }

  return (
    <ToolLayout title={t(lang, 'idPhoto.title')} description={t(lang, 'idPhoto.desc')}>
      {!file && <ImageUploader onFileSelect={handleFile} accept="image/*" maxSize={20} />}

      {file && !result && preview && (
        <div className="space-y-6">
          <ImagePreview src={preview} fileName={file.name} fileSize={file.size} onReset={handleReset} onDownload={() => {}} downloadLabel="" />

          <div className="p-6 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 space-y-5">
            <div>
              <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">{t(lang, 'idPhoto.sizeLabel')}</label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {ID_PHOTO_SPECS.map((spec) => (
                  <button key={spec.name} onClick={() => setSelectedSpec(spec)}
                    className={`p-3 rounded-lg text-center border transition-all text-sm ${selectedSpec.name === spec.name ? 'border-blue-500 bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300' : 'border-zinc-200 dark:border-zinc-700 hover:border-zinc-300 dark:hover:border-zinc-600'}`}>
                    <div className="font-medium">{spec.name}</div>
                    <div className="text-xs text-zinc-400 mt-0.5">{spec.description}</div>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">{t(lang, 'idPhoto.bgLabel')}</label>
              <div className="flex gap-3">
                {BG_COLORS.map((c) => (
                  <button key={c.value} onClick={() => setBgColor(c.value)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-all ${bgColor === c.value ? 'border-blue-500 ring-2 ring-blue-200' : 'border-zinc-200 dark:border-zinc-700'}`}>
                    <span className="w-5 h-5 rounded-full border border-zinc-300" style={{ backgroundColor: c.value }} />
                    <span className="text-sm text-zinc-700 dark:text-zinc-300">{c.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {processing ? <ProcessingOverlay message={t(lang, 'idPhoto.processing')} /> : (
            <button onClick={handleMake} className="w-full py-3 rounded-xl bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors">
              {t(lang, 'idPhoto.btn', { name: selectedSpec.name })}
            </button>
          )}
        </div>
      )}

      {result && (
        <ImagePreview src={result} fileName={(file?.name?.replace(/\.[^.]+$/, '') || 'photo') + `-${selectedSpec.name}.jpg`} fileSize={resultSize} onReset={handleReset} onDownload={handleDownload} extraInfo={`${selectedSpec.name} · ${selectedSpec.description}`} />
      )}
    </ToolLayout>
  )
}
