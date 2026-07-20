import BlogLayout from '../BlogLayout'

export default function CropImageGuide() {
  return (
    <BlogLayout title="How to Crop Images Online with Interactive Selection" prev="/blog/upscale-image-ai" next="/blog/enlarge-image">
      <h1>How to Crop Images Online with Interactive Selection Tool</h1>
      <p className="text-zinc-500 text-sm">Published: July 4, 2026 · 4 min read</p>
      <p>Cropping is one of the most fundamental image editing operations. It allows you to remove unwanted areas, focus on a specific subject, or change the aspect ratio of an image. Our interactive crop tool lets you draw a selection rectangle directly on the image.</p>
      <h2>Step-by-Step Guide</h2>
      <h3>Step 1: Upload Your Image</h3>
      <p>Go to <a href="/tools/crop" className="text-blue-600">Crop Image Tool</a> and upload a JPG, PNG, or WebP file.</p>
      <h3>Step 2: Draw a Selection</h3>
      <p>Click and drag on the image to draw a crop rectangle. The area outside the selection is dimmed, and the selected area remains visible. Release the mouse to set the crop region.</p>
      <h3>Step 3: Adjust if Needed</h3>
      <p>If you're not satisfied with the selection, simply click and drag again to redraw the rectangle. You can do this as many times as needed.</p>
      <h3>Step 4: Crop</h3>
      <p>Click the "Crop" button. The tool trims the image to your selected area and shows the result.</p>
      <h3>Step 5: Download</h3>
      <p>Your cropped image downloads as a PNG file.</p>
      <h2>Tips for Best Results</h2>
      <ul>
        <li>Use high-resolution images for better quality after cropping.</li>
        <li>The crop selection must be at least 10x10 pixels.</li>
        <li>For precise dimensions, use our Resize & Crop tool instead.</li>
        <li>Crop first, then upscale using AI Upscaler for best quality.</li>
      </ul>
      <h2>FAQ</h2>
      <h3>What format is the output?</h3>
      <p>The output is a PNG file with transparent background support.</p>
      <h3>Can I crop to a specific aspect ratio?</h3>
      <p>The free-form selection lets you choose any aspect ratio. For fixed ratios, use the Resize & Crop tool.</p>
    </BlogLayout>
  )
}
