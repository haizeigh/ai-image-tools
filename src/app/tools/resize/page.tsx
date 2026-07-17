'use client'

import { getSoftwareSchema } from '@/lib/schema';
import { useState, useCallback } from 'react'
import ToolLayout from '@/components/ToolLayout'
import ImageUploader from '@/components/ImageUploader'
import ImagePreview from '@/components/ImagePreview'
import ProcessingOverlay, { useProcessing } from '@/components/ProcessingOverlay'
import { readFileAsDataURL } from '@/lib/utils'
import { resizeImage } from '@/lib/resize'
import { useLang } from '@/i18n/LangContext'
import TutorialOverlay from '@/components/TutorialOverlay'
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

  const tutorialSteps = [
    { icon: '📤', title: 'Upload a File', desc: 'Click the upload area or drag and drop a file. Most common image formats are supported including JPG, PNG, and WebP.' },
    { icon: '⚙️', title: 'Configure Settings', desc: 'Adjust the available options to customize the output according to your needs. Each tool has different settings tailored to its purpose.' },
    { icon: '⏳', title: 'Processing', desc: 'The tool processes your file locally in your browser. No data is sent to any server — everything stays on your device.' },
    { icon: '💾', title: 'Download Result', desc: 'Your processed file will download automatically. Click "Reset" or "Process another" to start over with a new file.' },
  ];
  const jsonLd = getSoftwareSchema('Resize & Crop', '/tools/resize', 'Resize images to any dimension with social media presets. Free online image resizer.');
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <TutorialOverlay toolName="resize" steps={tutorialSteps} />
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
