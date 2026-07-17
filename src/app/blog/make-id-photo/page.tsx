import BlogLayout from '../BlogLayout'

export default function IdPhotoGuide() {
  return (
    <BlogLayout title="How to Make ID Photos at Home" prev="/blog/resize-image" next="/blog/upscale-image-ai">
      <h1>How to Make ID Photos at Home (Passport, Visa, Driver License)</h1>
      <p className="text-zinc-500 text-sm">Published: July 4, 2026 · 6 min read</p>
      <p>Creating professional ID photos at home saves time and money. Our ID Photo Maker combines AI background removal with standard photo sizing to produce compliant photos for passports, visas, and official documents.</p>
      <h2>Step-by-Step Guide</h2>
      <h3>Step 1: Upload Your Photo</h3>
      <p>Go to <a href="/tools/id-photo" className="text-blue-600">ID Photo Maker</a> and upload a portrait photo. Use a well-lit photo with a plain background for best results.</p>
      <h3>Step 2: Choose Size</h3>
      <p>Select from standard sizes: 1 inch (25x35mm), 2 inch (35x53mm), US Passport (51x51mm), EU Passport (35x45mm), China Visa (33x48mm), Japan Visa (45x45mm), or custom dimensions.</p>
      <h3>Step 3: Choose Background Color</h3>
      <p>Pick a background color: white, blue, red, or gray. The AI automatically removes your original background and replaces it.</p>
      <h3>Step 4: Download</h3>
      <p>Your ID photo downloads as a ready-to-print PNG file.</p>
      <h2>ID Photo Size Guide</h2>
      <ul>
        <li><strong>1 inch (25x35mm)</strong> — China ID, driver license</li>
        <li><strong>2 inch (35x53mm)</strong> — China passport, visa</li>
        <li><strong>US Passport (51x51mm)</strong> — US passport, visa</li>
        <li><strong>EU Passport (35x45mm)</strong> — European Union documents</li>
        <li><strong>China Visa (33x48mm)</strong> — China visa application</li>
        <li><strong>Japan Visa (45x45mm)</strong> — Japan visa application</li>
      </ul>
      <h2>Tips</h2>
      <ul>
        <li>Use front-facing portrait with neutral expression</li>
        <li>Ensure even lighting on your face</li>
        <li>Wear clothing that contrasts with the background</li>
        <li>Avoid glasses that cause glare, or remove them</li>
      </ul>
      <h2>FAQ</h2>
      <h3>Is this compliant with official requirements?</h3>
      <p>The tool produces photos in standard sizes. Check your specific document requirements for exact specifications.</p>
      <h3>What background colors are available?</h3>
      <p>White, blue, red, and gray.</p>
    </BlogLayout>
  )
}
