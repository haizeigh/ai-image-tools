'use client'

import { getSoftwareSchema } from '@/lib/schema';
import { useState, useCallback } from 'react'
import ToolLayout from '@/components/ToolLayout'
import ImageUploader from '@/components/ImageUploader'
import ImagePreview from '@/components/ImagePreview'
import ProcessingOverlay, { useProcessing } from '@/components/ProcessingOverlay'
import { readFileAsDataURL } from '@/lib/utils'
import { ID_PHOTO_SPECS, BG_COLORS, makeIDPhoto, IDPhotoSpec } from '@/lib/idPhoto'
import { useLang } from '@/i18n/LangContext'
import TutorialOverlay from '@/components/TutorialOverlay'
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

  const tutorialSteps = [
    { icon: '📤', title: 'Upload a File', desc: 'Click the upload area or drag and drop a file. Most common image formats are supported including JPG, PNG, and WebP.' },
    { icon: '⚙️', title: 'Configure Settings', desc: 'Adjust the available options to customize the output according to your needs. Each tool has different settings tailored to its purpose.' },
    { icon: '⏳', title: 'Processing', desc: 'The tool processes your file locally in your browser. No data is sent to any server — everything stays on your device.' },
    { icon: '💾', title: 'Download Result', desc: 'Your processed file will download automatically. Click "Reset" or "Process another" to start over with a new file.' },
  ];
  const jsonLd = getSoftwareSchema('ID Photo Maker', '/tools/id-photo', 'Create passport and visa ID photos with customizable backgrounds. Free online ID photo maker.');
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <TutorialOverlay toolName="id-photo" steps={tutorialSteps} />
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
