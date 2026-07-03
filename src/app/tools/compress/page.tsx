'use client'

import { getSoftwareSchema } from '@/lib/schema';

const jsonLd = getSoftwareSchema('Compress Image', '/tools/compress', 'Reduce image file size while keeping quality. Free online image compressor.');
import { useState, useCallback } from 'react'
import ToolLayout from '@/components/ToolLayout'
import ImageUploader from '@/components/ImageUploader'
import ImagePreview from '@/components/ImagePreview'
import ProcessingOverlay, { useProcessing } from '@/components/ProcessingOverlay'
import { readFileAsDataURL, formatFileSize } from '@/lib/utils'
import { compressImage } from '@/lib/compress'
import { useLang } from '@/i18n/LangContext'
import { t, tArray } from '@/i18n/translations'

export default function CompressPage() {
  const { lang } = useLang()
  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [result, setResult] = useState<string | null>(null)
  const [resultSize, setResultSize] = useState<number>(0)
  const [quality, setQuality] = useState(0.75)
  const [maxWidth, setMaxWidth] = useState(1920)
  const { processing, run } = useProcessing()

  const presets = tArray(lang, 'compress.presets') as { label: string; desc: string }[]

  const handleFile = useCallback(async (f: File) => {
    setFile(f)
    setResult(null)
    const dataUrl = await readFileAsDataURL(f)
    setPreview(dataUrl)
  }, [])

  const handleCompress = useCallback(async () => {
    if (!file) return
    gtag('event', 'tool_used', { tool_name: 'compress' })
    await run(async () => {
      const blob = await compressImage(file, { quality, maxWidth: maxWidth || undefined })
      const url = URL.createObjectURL(blob)
      setResult(url)
      setResultSize(blob.size)
    }, t(lang, 'compress.processing'))
  }, [file, quality, maxWidth, run, lang])

  const handleDownload = () => {
    if (!result) return
    const a = document.createElement('a')
    a.href = result
    const ext = file?.name?.split('.').pop() || 'jpg'
    a.download = (file?.name?.replace(/\.[^.]+$/, '') || 'image') + '-compressed.' + ext
    a.click()
  }

  const handleReset = () => { setFile(null); setPreview(null); setResult(null) }

  const compressionRatio = file && resultSize ? Math.round((1 - resultSize / file.size) * 100) : 0

  return (
    <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ToolLayout title={t(lang, 'compress.title')} description={t(lang, 'compress.desc')}>
      {!file && <ImageUploader onFileSelect={handleFile} />}

      {file && !result && preview && (
        <div className="space-y-6">
          <ImagePreview src={preview} fileName={file.name} fileSize={file.size} onReset={handleReset} onDownload={() => {}} downloadLabel="" />

          <div className="space-y-5 p-6 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
            <div>
              <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                {t(lang, 'compress.quality')}: {Math.round(quality * 100)}%
              </label>
              <input type="range" min="0.1" max="1" step="0.05" value={quality} onChange={(e) => setQuality(Number(e.target.value))} className="w-full accent-blue-600" />
              <div className="flex justify-between text-xs text-zinc-400 mt-1">
                {presets.map((p: any, i: number) => {
                  const q = [0.9, 0.75, 0.5, 0.3][i] || 0.75
                  return (
                    <button key={i} onClick={() => setQuality(q)}
                      className={`px-2 py-1 rounded ${quality === q ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300' : 'hover:text-zinc-600 dark:hover:text-zinc-300'}`}>
                      {p.label}
                    </button>
                  )
                })}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                {t(lang, 'compress.maxWidth')}: {maxWidth || t(lang, 'compress.noLimit')}px
              </label>
              <input type="range" min="0" max="4000" step="100" value={maxWidth} onChange={(e) => setMaxWidth(Number(e.target.value))} className="w-full accent-blue-600" />
              <div className="flex justify-between text-xs text-zinc-400 mt-1">
                <span>{t(lang, 'compress.noLimit')}</span><span>1920</span><span>2560</span><span>4000</span>
              </div>
            </div>
          </div>

          {processing ? <ProcessingOverlay message={t(lang, 'compress.processing')} /> : (
            <button onClick={handleCompress} className="w-full py-3 rounded-xl bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors">
              {t(lang, 'compress.btn')}
            </button>
          )}
        </div>
      )}

      {result && (
        <div className="space-y-4">
          <ImagePreview src={result} fileName={(file?.name?.replace(/\.[^.]+$/, '') || 'image') + '-compressed.' + (file?.name?.split('.').pop() || 'jpg')} fileSize={resultSize} onReset={handleReset} onDownload={handleDownload} extraInfo={t(lang, 'preview.reduced', { percent: compressionRatio })} />
          {file && (
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-center">
                <p className="text-zinc-400">{t(lang, 'preview.original')}</p>
                <p className="text-lg font-semibold text-zinc-700 dark:text-zinc-300">{formatFileSize(file.size)}</p>
              </div>
              <div className="p-4 rounded-xl bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 text-center">
                <p className="text-green-600 dark:text-green-400">{t(lang, 'preview.compressed')}</p>
                <p className="text-lg font-semibold text-green-700 dark:text-green-300">{formatFileSize(resultSize)}</p>
              </div>
            </div>
          )}
        </div>
      )}
    </ToolLayout>
  )
}
