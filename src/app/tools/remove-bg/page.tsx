'use client'

import { getSoftwareSchema } from '@/lib/schema';
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
    try { gtag('event', 'tool_used', { tool_name: 'remove-bg' }) } catch {}
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

  const jsonLd = getSoftwareSchema('Remove Background', '/tools/remove-bg', 'Remove image background in one click using AI. Free online tool, runs in your browser.');
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
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
      {/* SEO content for AdSense */}
      <div className="max-w-3xl mx-auto px-4 pb-16">
        <div className="border-t border-zinc-200 dark:border-zinc-800 pt-12 space-y-8">
          <section>
            <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 mb-4">How to Remove Background from an Image</h2>
            <ol className="list-decimal pl-5 space-y-2 text-zinc-600 dark:text-zinc-400">
              <li><strong>Upload your image</strong> — Click the upload area or drag and drop a JPG or PNG file.</li>
              <li><strong>Click "Remove Background"</strong> — The AI model processes your image locally in your browser. No data is sent to any server.</li>
              <li><strong>Wait a few seconds</strong> — Processing time depends on your device and image size.</li>
              <li><strong>Download the result</strong> — Your transparent PNG will download automatically.</li>
            </ol>
          </section>

          <section>
            <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 mb-4">Tips for Best Results</h2>
            <ul className="list-disc pl-5 space-y-2 text-zinc-600 dark:text-zinc-400">
              <li>Use images with clear contrast between subject and background.</li>
              <li>Portrait photos and product shots work best.</li>
              <li>For complex backgrounds, try cropping first using <a href="/tools/resize" className="text-blue-600 dark:text-blue-400 underline">Resize &amp; Crop</a>.</li>
              <li>Larger images take longer to process.</li>
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
                <p className="font-medium text-zinc-800 dark:text-zinc-200">Is my image uploaded?</p>
                <p className="text-sm text-zinc-500">No. All processing happens locally in your browser. Your image never leaves your device.</p>
              </div>
              <div>
                <p className="font-medium text-zinc-800 dark:text-zinc-200">What formats are supported?</p>
                <p className="text-sm text-zinc-500">JPG, PNG, and WebP. Output is transparent PNG.</p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  )
}
