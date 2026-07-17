import BlogLayout from '../BlogLayout'

export default function EnlargeImageGuide() {
  return (
    <BlogLayout title="How to Enlarge or Shrink Images with Image Resizer" prev="/blog/upscale-image-ai" next="/blog/remove-background">
      <h1>How to Enlarge or Shrink Images with Image Resizer</h1>
      <p className="text-zinc-500 text-sm">Published: July 4, 2026 · 4 min read</p>
      <p>Sometimes you need to quickly change image size without AI processing. Our Image Resizer uses fast Canvas-based interpolation for instant results. Perfect for batch previews, thumbnails, and quick adjustments.</p>
      <h2>Step-by-Step Guide</h2>
      <h3>Step 1: Upload</h3>
      <p>Go to <a href="/tools/enlarge" className="text-blue-600">Image Resizer</a> and upload your image. Supports JPG, PNG, and WebP.</p>
      <h3>Step 2: Choose Scale</h3>
      <p>Select a scale from 10% (shrink) to 1000% (enlarge 10x). Use the slider for precise control.</p>
      <h3>Step 3: Choose Algorithm</h3>
      <p>Smooth (bicubic interpolation) for photos, Pixel (nearest-neighbor) for pixel art and graphics.</p>
      <h3>Step 4: Download</h3>
      <p>Your resized image downloads instantly.</p>
      <h2>When to Use Each Algorithm</h2>
      <ul>
        <li><strong>Smooth (Bicubic):</strong> Best for photos, gradients, and natural images. Produces smooth results.</li>
        <li><strong>Pixel (Nearest-Neighbor):</strong> Best for pixel art, icons, screenshots, and text. Preserves sharp edges.</li>
      </ul>
      <h2>FAQ</h2>
      <h3>What is the maximum enlargement?</h3>
      <p>Up to 10x (1000%). For higher quality enlargements, use our AI Image Upscaler instead.</p>
      <h3>What format is the output?</h3>
      <p>Output matches input format. PNG stays PNG, JPG stays JPG.</p>
    </BlogLayout>
  )
}
