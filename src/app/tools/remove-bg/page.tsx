'use client'

import { useState, useCallback } from 'react'
import ToolLayout from '@/components/ToolLayout'
import ImageUploader from '@/components/ImageUploader'
import ImagePreview from '@/components/ImagePreview'
import ProcessingOverlay, { useProcessing } from '@/components/ProcessingOverlay'
import { readFileAsDataURL } from '@/lib/utils'
import { useLang } from '@/i18n/LangContext'
import { t } from '@/i18n/translations'

export default function RemoveBgPage() {
  const { lang } = useLang()
  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [result, setResult] = useState<string | null>(null)
  const [resultSize, setResultSize] = useState<number>(0)
  const { processing, run } = useProcessing()

  const handleFile = useCallback(async (f: File) => {
    setFile(f)
    setResult(null)
    const dataUrl = await readFileAsDataURL(f)
    setPreview(dataUrl)
  }, [])

  const handleRemoveBg = useCallback(async () => {
    if (!file) return
    await run(async () => {
      const { removeBackground } = await import('@imgly/background-removal')
      const blob = await removeBackground(file, {
        progress: (p) => console.log('Progress:', p),
      })
      const url = URL.createObjectURL(blob)
      setResult(url)
      setResultSize(blob.size)
    }, t(lang, 'removeBg.processing'))
  }, [file, run, lang])

  const handleDownload = () => {
    if (!result) return
    const a = document.createElement('a')
    a.href = result
    a.download = (file?.name?.replace(/\.[^.]+$/, '') || 'image') + '-no-bg.png'
    a.click()
  }

  const handleReset = () => {
    setFile(null)
    setPreview(null)
    setResult(null)
  }

  return (
    <ToolLayout
      title={t(lang, 'removeBg.title')}
      description={t(lang, 'removeBg.desc')}
    >
      {!file && <ImageUploader onFileSelect={handleFile} />}

      {file && !result && preview && (
        <div className="space-y-6">
          <ImagePreview
            src={preview}
            fileName={file.name}
            fileSize={file.size}
            onReset={handleReset}
            onDownload={() => {}}
            downloadLabel=""
          />
          {processing ? (
            <ProcessingOverlay message={t(lang, 'removeBg.processing')} />
          ) : (
            <button
              onClick={handleRemoveBg}
              className="w-full py-3 rounded-xl bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors"
            >
              {t(lang, 'removeBg.btn')}
            </button>
          )}
        </div>
      )}

      {result && (
        <ImagePreview
          src={result}
          fileName={(file?.name?.replace(/\.[^.]+$/, '') || 'image') + '-no-bg.png'}
          fileSize={resultSize}
          onReset={handleReset}
          onDownload={handleDownload}
          downloadLabel={t(lang, 'removeBg.download')}
        />
      )}
    </ToolLayout>
  )
}
