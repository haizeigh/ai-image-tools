import BlogLayout from '../BlogLayout'

export default function ResizeImageGuide() {
  return (
    <BlogLayout title="How to Resize Images for Social Media" prev="/blog/convert-image-format" next="/blog/make-id-photo">
      <h1>How to Resize Images for Social Media (Instagram, Twitter, LinkedIn)</h1>
      <p className="text-zinc-500 text-sm">Published: July 4, 2026 · 5 min read</p>
      <p>Each social media platform has optimal image dimensions. Using the right size ensures your images display correctly without cropping or stretching. This guide covers the most common social media sizes and how to resize images using our free tool.</p>
      <h2>Step-by-Step Guide</h2>
      <h3>Step 1: Upload</h3>
      <p>Visit our <a href="/tools/resize" className="text-blue-600">Resize &amp; Crop Tool</a> and upload your image.</p>
      <h3>Step 2: Choose Preset or Custom Size</h3>
      <p>Select from our presets: Instagram (1080x1080), Twitter (1200x675), YouTube (1280x720), LinkedIn (1200x627), Facebook (1200x630), or 4K (3840x2160). You can also enter custom dimensions.</p>
      <h3>Step 3: Download</h3>
      <p>Your resized image downloads automatically at the specified dimensions.</p>
      <h2>Social Media Size Guide</h2>
      <ul>
        <li><strong>Instagram Post:</strong> 1080x1080 (square)</li>
        <li><strong>Twitter Card:</strong> 1200x675 (landscape)</li>
        <li><strong>YouTube Thumbnail:</strong> 1280x720 (16:9)</li>
        <li><strong>LinkedIn Post:</strong> 1200x627 (landscape)</li>
        <li><strong>Facebook Post:</strong> 1200x630 (landscape)</li>
        <li><strong>4K Display:</strong> 3840x2160 (16:9)</li>
      </ul>
      <h2>FAQ</h2>
      <h3>Does resizing affect quality?</h3>
      <p>Enlarging may reduce sharpness. Shrinking preserves quality. For enlarging, consider our AI Upscaler tool.</p>
      <h3>What format is the output?</h3>
      <p>Output matches the input format. PNG files remain PNG, JPG remains JPG.</p>
    </BlogLayout>
  )
}
