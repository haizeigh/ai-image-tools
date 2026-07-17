'use client'

import { getSoftwareSchema } from '@/lib/schema';
import { useState, useCallback } from 'react'
import ToolLayout from '@/components/ToolLayout'
import ImageUploader from '@/components/ImageUploader'
import ImagePreview from '@/components/ImagePreview'
import ProcessingOverlay, { useProcessing } from '@/components/ProcessingOverlay'
import { readFileAsDataURL } from '@/lib/utils'
import { useLang } from '@/i18n/LangContext'
import TutorialOverlay from '@/components/TutorialOverlay'
import { t } from '@/i18n/translations'
import { Copy, Check } from 'lucide-react'



export default function OCRPage() {
  const { lang } = useLang()
  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [result, setResult] = useState<string | null>(null)
  const [text, setText] = useState<string>('')
  const [copied, setCopied] = useState(false)
  const [langs, setLangs] = useState<string>('eng')
  const { processing, run } = useProcessing()

  const handleFile = useCallback(async (f: File) => {
    setFile(f)
    setResult(null)
    setText('')
    const dataUrl = await readFileAsDataURL(f)
    setPreview(dataUrl)
  }, [])

  const handleOCR = useCallback(async () => {
    if (!file) return
    gtag('event', 'tool_used', { tool_name: 'ocr' })
    await run(async () => {
      const Tesseract = await import('tesseract.js')
      const { data } = await Tesseract.recognize(file, langs, {
        logger: (m: any) => {
          if (m.status === 'recognizing text') {
            console.log(`Progress: ${Math.round(m.progress * 100)}%`)
          }
        },
      })
      setText(data.text)
      setResult(URL.createObjectURL(file))
    }, t(lang, 'ocr.processing'))
  }, [file, langs, run, lang])

  const handleCopy = useCallback(async () => {
    if (!text) return
    await navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }, [text])

  const handleDownload = () => {
    if (!text) return
    const blob = new Blob([text], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = (file?.name?.replace(/\.[^.]+$/, '') || 'ocr') + '.txt'
    a.click()
    URL.revokeObjectURL(url)
  }

  const handleReset = () => { setFile(null); setPreview(null); setResult(null); setText('') }

  const tutorialSteps = [
    { icon: '📤', title: 'Upload a File', desc: 'Click the upload area or drag and drop a file. Most common image formats are supported including JPG, PNG, and WebP.' },
    { icon: '⚙️', title: 'Configure Settings', desc: 'Adjust the available options to customize the output according to your needs. Each tool has different settings tailored to its purpose.' },
    { icon: '⏳', title: 'Processing', desc: 'The tool processes your file locally in your browser. No data is sent to any server — everything stays on your device.' },
    { icon: '💾', title: 'Download Result', desc: 'Your processed file will download automatically. Click "Reset" or "Process another" to start over with a new file.' },
  ];
  const jsonLd = getSoftwareSchema('Image to Text (OCR)', '/tools/ocr', 'Extract text from images using AI OCR. Supports 20+ languages. Free online OCR tool.');
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <TutorialOverlay toolName="ocr" steps={tutorialSteps} />
      <ToolLayout
      title={t(lang, 'ocr.title')}
      description={t(lang, 'ocr.desc')}
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

          {/* Language Selection */}
          <div className="p-6 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
              {t(lang, 'ocr.langLabel')}
            </label>
            <select
              value={langs}
              onChange={(e) => setLangs(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-zinc-300 dark:border-zinc-600 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 text-sm"
            >
              <option value="eng">English</option>
              <option value="chi_sim">Chinese (Simplified)</option>
              <option value="chi_tra">Chinese (Traditional)</option>
              <option value="jpn">Japanese</option>
              <option value="kor">Korean</option>
              <option value="spa">Spanish</option>
              <option value="fra">French</option>
              <option value="deu">German</option>
              <option value="rus">Russian</option>
              <option value="por">Portuguese</option>
              <option value="ita">Italian</option>
              <option value="ara">Arabic</option>
              <option value="hin">Hindi</option>
              <option value="tur">Turkish</option>
              <option value="nld">Dutch</option>
              <option value="pol">Polish</option>
              <option value="vie">Vietnamese</option>
              <option value="tha">Thai</option>
              <option value="ind">Indonesian</option>
            </select>
            <p className="text-xs text-zinc-400 mt-2">{t(lang, 'ocr.langHint')}</p>
          </div>

          {/* Tips */}
          <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950 border border-amber-200 dark:border-amber-800">
            <div className="flex items-start gap-2">
              <span className="text-base shrink-0 mt-0.5 text-amber-500">&#9889;</span>
              <div>
                <p className="text-sm font-medium text-amber-800 dark:text-amber-200 mb-1">{t(lang, 'ocr.tipsTitle')}</p>
                <ul className="text-xs text-amber-700 dark:text-amber-300 space-y-0.5 list-disc list-inside">
                  <li>{t(lang, 'ocr.tip1')}</li>
                  <li>{t(lang, 'ocr.tip2')}</li>
                  <li>{t(lang, 'ocr.tip3')}</li>
                  <li>{t(lang, 'ocr.tip4')}</li>
                </ul>
              </div>
            </div>
          </div>

          {processing ? (
            <ProcessingOverlay message={t(lang, 'ocr.processing')} />
          ) : (
            <button
              onClick={handleOCR}
              className="w-full py-3 rounded-xl bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors"
            >
              {t(lang, 'ocr.btn')}
            </button>
          )}
        </div>
      )}

      {result && (
        <div className="space-y-4">
          <ImagePreview
            src={result}
            fileName={file?.name || ''}
            fileSize={file?.size}
            onReset={handleReset}
            onDownload={() => {}}
            downloadLabel=""
          />

          <div className="p-6 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
            <div className="flex items-center justify-between mb-3">
              <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                {t(lang, 'ocr.resultLabel')}
              </label>
              <div className="flex gap-2">
                <button
                  onClick={handleCopy}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-zinc-300 dark:border-zinc-600 text-xs font-medium text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-green-500" /> : <Copy className="w-3.5 h-3.5" />}
                  {copied ? t(lang, 'ocr.copied') : t(lang, 'ocr.copy')}
                </button>
                <button
                  onClick={handleDownload}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600 text-white text-xs font-medium hover:bg-blue-700 transition-colors"
                >
                  {t(lang, 'ocr.downloadTxt')}
                </button>
              </div>
            </div>
            <textarea
              readOnly
              value={text}
              className="w-full h-64 p-4 rounded-lg border border-zinc-300 dark:border-zinc-600 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 text-sm font-mono resize-y"
              placeholder={t(lang, 'ocr.placeholder')}
            />
            <p className="text-xs text-zinc-400 mt-2">
              {t(lang, 'ocr.charCount', { count: text.length })}
            </p>
          </div>
        </div>
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
      {/* SEO content for AdSense */}
      <div className="max-w-3xl mx-auto px-4 pb-16">
        <div className="border-t border-zinc-200 dark:border-zinc-800 pt-12 space-y-8">
          <section>
            <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 mb-4">How to Use This Tool</h2>
            <ol className="list-decimal pl-5 space-y-3 text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed">
              <li><strong>Upload your file</strong> — Click the upload area or drag and drop a file. The tool supports various input formats. For best results, use high-quality source files with clear content.</li>
              <li><strong>Adjust settings</strong> — Configure the available options to customize the output. Each setting provides real-time feedback so you can see the effect before processing.</li>
              <li><strong>Process your file</strong> — Click the action button to start processing. The tool runs locally in your browser using advanced algorithms. No data is ever uploaded to any server.</li>
              <li><strong>Download the result</strong> — Your processed file will download automatically. The output maintains high quality while being optimized for your specific needs. Click "Start over" to process another file.</li>
            </ol>
          </section>
          <section>
            <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 mb-4">Tips for Best Results</h2>
            <ul className="list-disc pl-5 space-y-2 text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed">
              <li><strong>Use high quality source files</strong> — Higher resolution inputs produce better quality outputs. Avoid heavily compressed or low-resolution source files.</li>
              <li><strong>Optimize before processing</strong> — For large files, consider reducing dimensions first using our tools to improve processing speed.</li>
              <li><strong>Processing is local</strong> — All computation happens in your browser. Performance depends on your device's capabilities. Modern computers and laptops provide the best experience.</li>
              <li><strong>No file size limits</strong> — There are no imposed limits on file size, though very large files may take longer to process depending on your device memory.</li>
              <li><strong>Works offline after first load</strong> — Once the page is loaded, subsequent uses may work offline or with limited connectivity since processing is local.</li>
            </ul>
          </section>
          <section>
            <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 mb-4">Frequently Asked Questions</h2>
            <div className="space-y-4">
              <div>
                <p className="font-medium text-zinc-800 dark:text-zinc-200">Is this tool free to use?</p>
                <p className="text-sm text-zinc-500">Yes, completely free with no limits, no sign-up required, and no hidden charges. You can use it as many times as you want.</p>
              </div>
              <div>
                <p className="font-medium text-zinc-800 dark:text-zinc-200">Is my file uploaded to a server?</p>
                <p className="text-sm text-zinc-500">No. All processing happens locally in your browser. Your files never leave your device.</p>
              </div>
              <div>
                <p className="font-medium text-zinc-800 dark:text-zinc-200">What file formats are supported?</p>
                <p className="text-sm text-zinc-500">The tool supports common formats. Check the tool description for specific format support. Results maintain the original quality when possible.</p>
              </div>
              <div>
                <p className="font-medium text-zinc-800 dark:text-zinc-200">Does it work on mobile devices?</p>
                <p className="text-sm text-zinc-500">Yes, the tool works in any modern mobile browser including Chrome, Safari, and Firefox on iOS and Android. No app download needed.</p>
              </div>
              <div>
                <p className="font-medium text-zinc-800 dark:text-zinc-200">What happens to my files after processing?</p>
                <p className="text-sm text-zinc-500">Nothing. Since all processing is local, no copies are stored on any server. Once you close the page, everything is cleared from memory.</p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  )
}
