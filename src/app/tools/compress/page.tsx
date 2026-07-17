'use client'

import { getSoftwareSchema } from '@/lib/schema';
import { useState, useCallback } from 'react'
import ToolLayout from '@/components/ToolLayout'
import ImageUploader from '@/components/ImageUploader'
import ImagePreview from '@/components/ImagePreview'
import ProcessingOverlay, { useProcessing } from '@/components/ProcessingOverlay'
import { readFileAsDataURL, formatFileSize } from '@/lib/utils'
import { compressImage } from '@/lib/compress'
import { useLang } from '@/i18n/LangContext'
import TutorialOverlay from '@/components/TutorialOverlay'
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

  const tutorialSteps = [
    { icon: '📤', title: 'Upload a File', desc: 'Click the upload area or drag and drop a file. Most common image formats are supported including JPG, PNG, and WebP.' },
    { icon: '⚙️', title: 'Configure Settings', desc: 'Adjust the available options to customize the output according to your needs. Each tool has different settings tailored to its purpose.' },
    { icon: '⏳', title: 'Processing', desc: 'The tool processes your file locally in your browser. No data is sent to any server — everything stays on your device.' },
    { icon: '💾', title: 'Download Result', desc: 'Your processed file will download automatically. Click "Reset" or "Process another" to start over with a new file.' },
  ];
  const jsonLd = getSoftwareSchema('Compress Image', '/tools/compress', 'Reduce image file size while keeping quality. Free online image compressor.');
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <TutorialOverlay toolName="compress" steps={tutorialSteps} />
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
                  const tutorialSteps = [
    { icon: '📤', title: 'Upload a File', desc: 'Click the upload area or drag and drop a file. Most common image formats are supported including JPG, PNG, and WebP.' },
    { icon: '⚙️', title: 'Configure Settings', desc: 'Adjust the available options to customize the output according to your needs. Each tool has different settings tailored to its purpose.' },
    { icon: '⏳', title: 'Processing', desc: 'The tool processes your file locally in your browser. No data is sent to any server — everything stays on your device.' },
    { icon: '💾', title: 'Download Result', desc: 'Your processed file will download automatically. Click "Reset" or "Process another" to start over with a new file.' },
  ];
  const jsonLd = getSoftwareSchema('Compress Image', '/tools/compress', 'Reduce image file size while keeping quality. Free online image compressor.');
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
      {/* SEO content */}
      <div className="max-w-3xl mx-auto px-4 pb-16">
        <div className="border-t border-zinc-200 dark:border-zinc-800 pt-12 space-y-8">
          <section>
            <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 mb-4">How to Compress an Image</h2>
            <ol className="list-decimal pl-5 space-y-2 text-zinc-600 dark:text-zinc-400">
              <li><strong>Upload your image</strong> — Drag and drop or click to select a JPG, PNG, or WebP file.</li>
              <li><strong>Adjust quality</strong> — Use the slider to choose compression level (10% = smallest file, 100% = best quality).</li>
              <li><strong>Set max width (optional)</strong> — Limit output width to 200px, 800px, or 1920px for smaller files.</li>
              <li><strong>Click "Compress Image"</strong> — Your compressed image will download automatically.</li>
            </ol>
          </section>

          <section>
            <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 mb-4">Tips for Best Results</h2>
            <ul className="list-disc pl-5 space-y-2 text-zinc-600 dark:text-zinc-400">
              <li>For web use, 50-75% quality offers the best balance of size and quality.</li>
              <li>Use 1920px width limit for full-resolution web images.</li>
              <li>Use 800px width for blog posts and articles.</li>
              <li>Use 200px width for thumbnails and avatars.</li>
              <li>Lossy compression works best for photographs; screenshots may show artifacts at low quality.</li>
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
                <p className="font-medium text-zinc-800 dark:text-zinc-200">What formats are supported?</p>
                <p className="text-sm text-zinc-500">JPG, PNG, and WebP. Output matches the input format.</p>
              </div>
              <div>
                <p className="font-medium text-zinc-800 dark:text-zinc-200">What's the best quality for web?</p>
                <p className="text-sm text-zinc-500">75% quality is recommended for most web use — good quality with small file size.</p>
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
