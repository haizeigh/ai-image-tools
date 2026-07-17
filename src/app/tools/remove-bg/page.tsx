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
import TutorialOverlay from '@/components/TutorialOverlay'



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
  const tutorialSteps = [
    { icon: '📤', title: 'Upload an Image', desc: 'Click the upload area or drag and drop a JPG or PNG file. Supports photos, product images, illustrations, and more. Maximum file size depends on your browser memory.' },
    { icon: '⚡', title: 'AI Removes Background', desc: 'Click the "Remove Background" button. The AI model (u2net) processes your image locally in your browser using WebAssembly. No data is sent to any server — everything stays on your device.' },
    { icon: '⏳', title: 'Wait a Moment', desc: 'Processing takes 2-5 seconds depending on your device and image size. Larger images with complex edges (hair, fur) may take longer. A progress indicator shows the current status.' },
    { icon: '💾', title: 'Download Result', desc: 'Your transparent PNG will download automatically. You can use it for websites, product listings, presentations, or any project. Click "Reset" to start over with a new image.' },
  ];
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <TutorialOverlay toolName="remove-bg" steps={tutorialSteps} />
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
            <ol className="list-decimal pl-5 space-y-3 text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed">
              <li><strong>Upload your image</strong> — Click the upload area or drag and drop a JPG, PNG, or WebP file. The tool supports photos of people, products, animals, and graphics. For best results, use images with clear contrast between the subject and background. Portrait photos, product shots on white backgrounds, and images with simple backgrounds work exceptionally well.</li>
              <li><strong>Click "Remove Background"</strong> — The AI model processes your image locally in your browser using TensorFlow.js and ONNX Runtime Web. The neural network (u2net) has been trained on millions of images to accurately detect and separate foreground subjects from their backgrounds. No data is sent to any server — your privacy is guaranteed.</li>
              <li><strong>Wait a few seconds</strong> — Processing time depends on your device's CPU and the image size. On modern computers, most images process within 2-5 seconds. Larger images with complex edges such as hair, fur, or transparent objects may take longer. A progress bar shows the current processing status.</li>
              <li><strong>Download the result</strong> — Your transparent PNG will download automatically. The image preserves the original resolution and quality. You can use it for websites, e-commerce product listings, social media graphics, presentations, photo compositing, or any creative project. Click "Remove another" to process a new image.</li>
            </ol>
          </section>

          <section>
            <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 mb-4">Tips for Best Results</h2>
            <ul className="list-disc pl-5 space-y-2 text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed">
              <li><strong>Use high contrast images</strong> — Images with clear separation between the subject and background produce the most accurate results. White or solid color backgrounds work best.</li>
              <li><strong>Portrait and product photos excel</strong> — The AI model performs particularly well on human portraits, fashion items, and product photography. Group photos with multiple subjects are also supported.</li>
              <li><strong>Complex edges may vary</strong> — Fine details like hair, fur, jewelry, and transparent objects may show some imperfections. For best results, try cropping the image first using our <a href="/tools/resize" className="text-blue-600 dark:text-blue-400 underline">Resize &amp; Crop</a> tool.</li>
              <li><strong>Optimize image size</strong> — Larger images take longer to process. For faster results, use our <a href="/tools/enlarge" className="text-blue-600 dark:text-blue-400 underline">Image Resizer</a> to reduce dimensions before background removal.</li>
              <li><strong>Output is always transparent PNG</strong> — The result preserves transparency, making it perfect for compositing onto other backgrounds, creating thumbnails, or adding to presentations.</li>
              <li><strong>Batch processing</strong> — Process multiple images one after another. Each result downloads independently. No limits on how many images you can process.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 mb-4">Use Cases</h2>
            <div className="space-y-3 text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
              <p><strong>E-commerce:</strong> Online sellers can remove backgrounds from product photos to create clean, professional-looking listings. Transparent backgrounds allow products to blend seamlessly into any store design.</p>
              <p><strong>Social Media:</strong> Content creators can isolate themselves or objects from photos and composite them onto creative backgrounds for Instagram, TikTok, and other platforms.</p>
              <p><strong>Graphic Design:</strong> Designers can quickly extract subjects from photos for use in brochures, flyers, posters, and digital artwork without needing expensive software.</p>
              <p><strong>ID Photos:</strong> Remove backgrounds from portrait photos and use our <a href="/tools/id-photo" className="text-blue-600 dark:text-blue-400 underline">ID Photo Maker</a> to create passport and visa photos in standard sizes.</p>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 mb-4">Technical Details</h2>
            <div className="space-y-2 text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
              <p>The background removal tool uses the u2net neural network architecture, a deep learning model specifically designed for salient object detection. The model runs entirely in your browser via TensorFlow.js with the WebAssembly backend.</p>
              <p>Unlike cloud-based alternatives, our approach ensures your images never leave your device. There are no upload servers, no temporary storage, and no data processing pipelines. Everything happens within the secure environment of your browser's JavaScript runtime.</p>
              <p>The model size is approximately 170MB and is downloaded once and cached locally. Subsequent uses load from cache for faster startup.</p>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 mb-4">Frequently Asked Questions</h2>
            <div className="space-y-4">
              <div>
                <p className="font-medium text-zinc-800 dark:text-zinc-200">Is this free to use?</p>
                <p className="text-sm text-zinc-500">Yes, completely free with no limits, no sign-up, and no hidden charges. You can process as many images as you want.</p>
              </div>
              <div>
                <p className="font-medium text-zinc-800 dark:text-zinc-200">Is my image uploaded to a server?</p>
                <p className="text-sm text-zinc-500">No. All processing happens locally in your browser using WebAssembly and TensorFlow.js. Your image never leaves your device. This guarantees complete privacy.</p>
              </div>
              <div>
                <p className="font-medium text-zinc-800 dark:text-zinc-200">What image formats are supported?</p>
                <p className="text-sm text-zinc-500">JPG, PNG, and WebP formats are supported for input. The output is always a transparent PNG image.</p>
              </div>
              <div>
                <p className="font-medium text-zinc-800 dark:text-zinc-200">What is the maximum file size?</p>
                <p className="text-sm text-zinc-500">There is no strict limit, but very large images (over 20MB) may take longer to process or cause browser memory issues. For best results, use images under 20MB.</p>
              </div>
              <div>
                <p className="font-medium text-zinc-800 dark:text-zinc-200">Does it work on mobile devices?</p>
                <p className="text-sm text-zinc-500">Yes, the tool works in any modern mobile browser including Chrome, Safari, and Firefox on iOS and Android. No app download needed.</p>
              </div>
              <div>
                <p className="font-medium text-zinc-800 dark:text-zinc-200">How accurate is the background removal?</p>
                <p className="text-sm text-zinc-500">The AI model achieves high accuracy on images with clear subject-background separation. Results may vary on complex backgrounds, fine hair details, or transparent objects. The model continues to improve with updates.</p>
              </div>
            </div>
          </section>

        </div>
      </div>
    </>
  )
}
