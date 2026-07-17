import BlogLayout from '../BlogLayout'

export default function OcrGuide() {
  return (
    <BlogLayout title="How to Extract Text from Images with OCR" prev="/blog/enlarge-image" next="/blog/compress-image">
      <h1>How to Extract Text from Images with OCR (Free, No Upload)</h1>
      <p className="text-zinc-500 text-sm">Published: July 4, 2026 · 5 min read</p>
      <p>OCR (Optical Character Recognition) converts images containing text into machine-readable text. This is useful for digitizing printed documents, extracting text from screenshots, and copying text from images.</p>
      <h2>How It Works</h2>
      <p>Our OCR tool uses Tesseract.js, a JavaScript port of the popular Tesseract OCR engine. It runs entirely in your browser using WebAssembly, recognizing text in over 20 languages.</p>
      <h2>Step-by-Step Guide</h2>
      <h3>Step 1: Upload</h3>
      <p>Go to <a href="/tools/ocr" className="text-blue-600">OCR Tool</a> and upload an image containing text. Supports JPG, PNG, and WebP.</p>
      <h3>Step 2: Select Language</h3>
      <p>Choose the text language from 20+ options including English, Chinese, Japanese, Korean, French, German, Spanish, and more.</p>
      <h3>Step 3: Process</h3>
      <p>Click "Extract Text" and wait for the OCR engine to process. Processing time depends on image size and complexity.</p>
      <h3>Step 4: Copy Result</h3>
      <p>The extracted text appears in a text area. You can copy it, select portions, or use it directly.</p>
      <h2>Tips for Best Results</h2>
      <ul>
        <li><strong>Use high resolution images</strong> — Text should be clear and at least 10px tall</li>
        <li><strong>Ensure good lighting</strong> — Avoid shadows and glare on the document</li>
        <li><strong>Straighten the image</strong> — Skewed text reduces accuracy</li>
        <li><strong>Increase contrast</strong> — Dark text on light background works best</li>
        <li><strong>Upscale first</strong> — Use our AI Upscaler to enlarge small text before OCR</li>
      </ul>
      <h2>Supported Languages</h2>
      <p>English, Chinese (Simplified/Traditional), Japanese, Korean, French, German, Spanish, Portuguese, Italian, Dutch, Russian, Arabic, Hindi, and more.</p>
      <h2>FAQ</h2>
      <h3>How accurate is the OCR?</h3>
      <p>Accuracy depends on image quality. High-resolution, well-lit images with clear text achieve 95%+ accuracy.</p>
      <h3>Can I scan handwritten text?</h3>
      <p>Handwriting recognition is limited. Printed text produces much better results.</p>
      <h3>Is my image uploaded?</h3>
      <p>No. All processing happens locally in your browser. Your image never leaves your device.</p>
    </BlogLayout>
  )
}
