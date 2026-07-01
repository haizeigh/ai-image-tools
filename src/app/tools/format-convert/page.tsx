'use client'

import { useState, useCallback } from 'react'
import ToolLayout from '@/components/ToolLayout'
import ImageUploader from '@/components/ImageUploader'
import ImagePreview from '@/components/ImagePreview'
import ProcessingOverlay, { useProcessing } from '@/components/ProcessingOverlay'
import { readFileAsDataURL } from '@/lib/utils'
import { convertFormat } from '@/lib/formatConvert'
import { useLang } from '@/i18n/LangContext'
import { t, tArray } from '@/i18n/translations'

const FORMAT_VALUES = ['png', 'jpg', 'webp']

export default function FormatConvertPage() {
  const { lang } = useLang()
  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [result, setResult] = useState<string | null>(null)
  const [resultSize, setResultSize] = useState<number>(0)
  const [targetFormat, setTargetFormat] = useState('png')
  const { processing, run } = useProcessing()

  const formats = tArray(lang, 'formatConvert.formats') as { label: string; desc: string }[]

  const handleFile = useCallback(async (f: File) => {
    setFile(f); setResult(null)
    setPreview(await readFileAsDataURL(f))
  }, [])

  const handleConvert = useCallback(async () => {
    if (!file) return
    await run(async () => {
      const blob = await convertFormat(file, targetFormat)
      setResult(URL.createObjectURL(blob))
      setResultSize(blob.size)
    }, t(lang, 'formatConvert.processing'))
  }, [file, targetFormat, run, lang])

  const handleDownload = () => {
    if (!result) return
    const a = document.createElement('a')
    a.href = result
    a.download = (file?.name?.replace(/\.[^.]+$/, '') || 'image') + '.' + targetFormat
    a.click()
  }

  const handleReset = () => { setFile(null); setPreview(null); setResult(null) }
  const currentExt = file?.name?.split('.').pop()?.toLowerCase() || ''

  return (
    <ToolLayout title={t(lang, 'formatConvert.title')} description={t(lang, 'formatConvert.desc')}>
      {!file && <ImageUploader onFileSelect={handleFile} />}

      {file && !result && preview && (
        <div className="space-y-6">
          <ImagePreview src={preview} fileName={file.name} fileSize={file.size} onReset={handleReset} onDownload={() => {}} downloadLabel="" />

          <div className="p-6 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-3">{t(lang, 'formatConvert.label')}</label>
            <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
              {formats.map((fmt: any, i: number) => {
                const val = FORMAT_VALUES[i]
                return (
                  <button key={val} onClick={() => setTargetFormat(val)} disabled={val === currentExt}
                    className={`p-3 rounded-lg text-center border transition-all ${val === targetFormat ? 'border-blue-500 bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300' : val === currentExt ? 'border-zinc-200 dark:border-zinc-700 text-zinc-300 dark:text-zinc-600 cursor-not-allowed' : 'border-zinc-200 dark:border-zinc-700 hover:border-zinc-300 dark:hover:border-zinc-600'}`}>
                    <div className="font-medium text-sm">{fmt.label}</div>
                    <div className="text-xs text-zinc-400 mt-0.5">{fmt.desc}</div>
                  </button>
                )
              })}
            </div>
            {currentExt && <p className="text-xs text-zinc-400 mt-2">{t(lang, 'formatConvert.current')} <span className="font-medium uppercase">{currentExt}</span></p>}
          </div>

          {processing ? <ProcessingOverlay message={t(lang, 'formatConvert.processing')} /> : (
            <button onClick={handleConvert} className="w-full py-3 rounded-xl bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors">
              {t(lang, 'formatConvert.btn', { format: formats.find((_: any, i: number) => FORMAT_VALUES[i] === targetFormat)?.label || targetFormat.toUpperCase() })}
            </button>
          )}
        </div>
      )}

      {result && (
        <ImagePreview src={result} fileName={(file?.name?.replace(/\.[^.]+$/, '') || 'image') + '.' + targetFormat} fileSize={resultSize} onReset={handleReset} onDownload={handleDownload} downloadLabel={t(lang, 'formatConvert.download', { ext: targetFormat })} />
      )}
    </ToolLayout>
  )
}
