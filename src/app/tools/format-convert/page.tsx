'use client'

import { getSoftwareSchema } from '@/lib/schema';
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
    gtag('event', 'tool_used', { tool_name: 'format-convert' })
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

  const jsonLd = getSoftwareSchema('Format Convert', '/tools/format-convert', 'Convert images between JPG, PNG, WebP formats. Free online image converter.');
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
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
                const jsonLd = getSoftwareSchema('Format Convert', '/tools/format-convert', 'Convert images between JPG, PNG, WebP formats. Free online image converter.');
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
      {/* SEO content */}
      <div className="max-w-3xl mx-auto px-4 pb-16">
        <div className="border-t border-zinc-200 dark:border-zinc-800 pt-12 space-y-8">
          <section>
            <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 mb-4">How to Use This Tool</h2>
            <ol className="list-decimal pl-5 space-y-2 text-zinc-600 dark:text-zinc-400">
              <li><strong>Upload your file</strong> — Click the upload area or drag and drop a file.</li>
              <li><strong>Configure settings</strong> — Adjust options to your needs.</li>
              <li><strong>Process</strong> — Click the action button to start processing.</li>
              <li><strong>Download</strong> — Your result will download automatically.</li>
            </ol>
          </section>

          <section>
            <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 mb-4">Why Choose This Tool?</h2>
            <ul className="list-disc pl-5 space-y-2 text-zinc-600 dark:text-zinc-400">
              <li>All processing happens in your browser — files never leave your device.</li>
              <li>No sign-up, no limits, no hidden charges.</li>
              <li>Works on desktop and mobile browsers.</li>
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
                <p className="font-medium text-zinc-800 dark:text-zinc-200">Is my data safe?</p>
                <p className="text-sm text-zinc-500">Yes. All processing happens locally in your browser. Your files never leave your device.</p>
              </div>
              <div>
                <p className="font-medium text-zinc-800 dark:text-zinc-200">Does it work on mobile?</p>
                <p className="text-sm text-zinc-500">Yes, the tool works in any modern mobile browser.</p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  )
}
