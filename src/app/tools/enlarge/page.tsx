'use client'

import { getSoftwareSchema } from '@/lib/schema';
import { useState, useCallback } from 'react'
import ToolLayout from '@/components/ToolLayout'
import ImageUploader from '@/components/ImageUploader'
import ImagePreview from '@/components/ImagePreview'
import ProcessingOverlay, { useProcessing } from '@/components/ProcessingOverlay'
import { readFileAsDataURL, loadImage, canvasToBlob } from '@/lib/utils'
import { useLang } from '@/i18n/LangContext'
import TutorialOverlay from '@/components/TutorialOverlay'
import { t } from '@/i18n/translations'



type Mode = 'enlarge' | 'shrink'

const ENLARGE_OPTIONS = [
  { value: 2, label: '2x' },
  { value: 3, label: '3x' },
  { value: 4, label: '4x' },
  { value: 6, label: '6x' },
  { value: 8, label: '8x' },
  { value: 10, label: '10x' },
]

const SHRINK_OPTIONS = [
  { value: 0.1, label: '10%' },
  { value: 0.25, label: '25%' },
  { value: 0.5, label: '50%' },
  { value: 0.75, label: '75%' },
]

const ALGORITHMS = [
  { value: 'smooth', labelKey: 'enlarge.algSmooth' },
  { value: 'pixel', labelKey: 'enlarge.algPixel' },
]

export default function EnlargePage() {
  const { lang } = useLang()
  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [result, setResult] = useState<string | null>(null)
  const [resultSize, setResultSize] = useState<number>(0)
  const [mode, setMode] = useState<Mode>('enlarge')
  const [scale, setScale] = useState(4)
  const [algorithm, setAlgorithm] = useState<'smooth' | 'pixel'>('smooth')
  const [originalDims, setOriginalDims] = useState({ w: 0, h: 0 })
  const { processing, run } = useProcessing()

  const handleFile = useCallback(async (f: File) => {
    setFile(f)
    setResult(null)
    const dataUrl = await readFileAsDataURL(f)
    setPreview(dataUrl)
    const img = new Image()
    img.onload = () => setOriginalDims({ w: img.width, h: img.height })
    img.src = dataUrl
  }, [])

  const handleModeChange = useCallback((newMode: Mode) => {
    setMode(newMode)
    setResult(null)
    setScale(newMode === 'enlarge' ? 4 : 0.5)
  }, [])

  const handleProcess = useCallback(async () => {
    if (!file) return
    gtag('event', 'tool_used', { tool_name: 'enlarge' })
    await run(async () => {
      const url = URL.createObjectURL(file)
      const img = await loadImage(url)
      URL.revokeObjectURL(url)

      const newW = Math.round(img.width * scale)
      const newH = Math.round(img.height * scale)

      const canvas = document.createElement('canvas')
      canvas.width = newW
      canvas.height = newH
      const ctx = canvas.getContext('2d')!

      if (algorithm === 'smooth') {
        ctx.imageSmoothingEnabled = true
        ctx.imageSmoothingQuality = 'high'
      } else {
        ctx.imageSmoothingEnabled = false
      }

      ctx.drawImage(img, 0, 0, newW, newH)
      const blob = await canvasToBlob(canvas, 'image/png')
      setResult(URL.createObjectURL(blob))
      setResultSize(blob.size)
    }, t(lang, 'enlarge.processing'))
  }, [file, scale, algorithm, run, lang])

  const handleDownload = () => {
    if (!result) return
    const a = document.createElement('a')
    a.href = result
    const suffix = mode === 'enlarge' ? `${scale}x` : `${Math.round(scale * 100)}pct`
    a.download = (file?.name?.replace(/\.[^.]+$/, '') || 'image') + `-${suffix}.png`
    a.click()
  }

  const handleReset = () => { setFile(null); setPreview(null); setResult(null) }

  const scaleOptions = mode === 'enlarge' ? ENLARGE_OPTIONS : SHRINK_OPTIONS
  const resultSuffix = mode === 'enlarge' ? `${scale}x` : `${Math.round(scale * 100)}%`
  const btnLabel = mode === 'enlarge'
    ? t(lang, 'enlarge.btnEnlarge', { scale: resultSuffix })
    : t(lang, 'enlarge.btnShrink', { scale: resultSuffix })
  const newW = originalDims.w > 0 ? Math.round(originalDims.w * scale) : 0
  const newH = originalDims.h > 0 ? Math.round(originalDims.h * scale) : 0

  const tutorialSteps = [
    { icon: '📤', title: 'Upload a File', desc: 'Click the upload area or drag and drop a file. Most common image formats are supported including JPG, PNG, and WebP.' },
    { icon: '⚙️', title: 'Configure Settings', desc: 'Adjust the available options to customize the output according to your needs. Each tool has different settings tailored to its purpose.' },
    { icon: '⏳', title: 'Processing', desc: 'The tool processes your file locally in your browser. No data is sent to any server — everything stays on your device.' },
    { icon: '💾', title: 'Download Result', desc: 'Your processed file will download automatically. Click "Reset" or "Process another" to start over with a new file.' },
  ];
  const jsonLd = getSoftwareSchema('Image Resizer', '/tools/enlarge', 'Enlarge images 2x to 10x or shrink using Canvas interpolation. Free online image resizer.');
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <TutorialOverlay toolName="enlarge" steps={tutorialSteps} />
      <ToolLayout
      title={t(lang, 'enlarge.title')}
      description={t(lang, 'enlarge.desc')}
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

          <div className="p-6 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 space-y-5">
            {/* Mode Toggle */}
            <div>
              <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                {t(lang, 'enlarge.modeLabel')}
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => handleModeChange('enlarge')}
                  className={`p-3 rounded-xl text-center border transition-all ${
                    mode === 'enlarge'
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-950 ring-2 ring-blue-200 dark:ring-blue-800'
                      : 'border-zinc-200 dark:border-zinc-700 hover:border-zinc-300 dark:hover:border-zinc-600'
                  }`}
                >
                  <div className="font-medium text-sm text-zinc-800 dark:text-zinc-200">
                    {t(lang, 'enlarge.modeEnlarge')}
                  </div>
                </button>
                <button
                  onClick={() => handleModeChange('shrink')}
                  className={`p-3 rounded-xl text-center border transition-all ${
                    mode === 'shrink'
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-950 ring-2 ring-blue-200 dark:ring-blue-800'
                      : 'border-zinc-200 dark:border-zinc-700 hover:border-zinc-300 dark:hover:border-zinc-600'
                  }`}
                >
                  <div className="font-medium text-sm text-zinc-800 dark:text-zinc-200">
                    {t(lang, 'enlarge.modeShrink')}
                  </div>
                </button>
              </div>
            </div>

            {/* Scale */}
            <div>
              <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                {mode === 'enlarge' ? t(lang, 'enlarge.scaleLabel') : t(lang, 'enlarge.shrinkLabel')}
              </label>
              <div className={`grid gap-2 ${mode === 'enlarge' ? 'grid-cols-3 sm:grid-cols-6' : 'grid-cols-2 sm:grid-cols-4'}`}>
                {scaleOptions.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => setScale(opt.value)}
                    className={`py-3 rounded-lg text-center border transition-all font-medium ${
                      scale === opt.value
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300'
                        : 'border-zinc-200 dark:border-zinc-700 hover:border-zinc-300 dark:hover:border-zinc-600'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Algorithm */}
            <div>
              <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                {t(lang, 'enlarge.algLabel')}
              </label>
              <div className="grid grid-cols-2 gap-2">
                {ALGORITHMS.map((alg) => (
                  <button
                    key={alg.value}
                    onClick={() => setAlgorithm(alg.value as 'smooth' | 'pixel')}
                    className={`p-3 rounded-xl text-center border transition-all ${
                      algorithm === alg.value
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-950 ring-2 ring-blue-200 dark:ring-blue-800'
                        : 'border-zinc-200 dark:border-zinc-700 hover:border-zinc-300 dark:hover:border-zinc-600'
                    }`}
                  >
                    <div className="font-medium text-sm text-zinc-800 dark:text-zinc-200">
                      {t(lang, alg.labelKey)}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {originalDims.w > 0 && (
              <p className="text-xs text-zinc-400">
                {t(lang, 'enlarge.originalSize')}: {originalDims.w} × {originalDims.h} → {newW} × {newH}
              </p>
            )}
          </div>

          {processing ? (
            <ProcessingOverlay message={t(lang, 'enlarge.processing')} />
          ) : (
            <button
              onClick={handleProcess}
              className="w-full py-3 rounded-xl bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors"
            >
              {btnLabel}
            </button>
          )}
        </div>
      )}

      {result && (
        <ImagePreview
          src={result}
          fileName={(file?.name?.replace(/\.[^.]+$/, '') || 'image') + `-${mode === 'enlarge' ? scale + 'x' : Math.round(scale * 100) + 'pct'}.png`}
          fileSize={resultSize}
          onReset={handleReset}
          onDownload={handleDownload}
          downloadLabel={t(lang, 'enlarge.download')}
          extraInfo={`${resultSuffix} · ${algorithm === 'smooth' ? t(lang, 'enlarge.algSmooth') : t(lang, 'enlarge.algPixel')}`}
        />
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
