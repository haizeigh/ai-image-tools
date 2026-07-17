import Link from 'next/link'

const articles = [
  { path: '/blog/remove-background', title: 'How to Remove Background from Images Online (Free, No Upload)', desc: 'Learn how to automatically remove backgrounds from photos using AI. Works for portraits, products, and more. All processing is local.' },
  { path: '/blog/compress-image', title: 'How to Compress Images for Web (Reduce File Size Without Losing Quality)', desc: 'Reduce JPG, PNG, and WebP file sizes while maintaining visual quality. Perfect for websites, email, and social media.' },
  { path: '/blog/convert-image-format', title: 'How to Convert JPG to PNG and Other Image Formats', desc: 'Convert images between JPG, PNG, and WebP formats instantly in your browser. No upload required.' },
  { path: '/blog/resize-image', title: 'How to Resize Images for Social Media (Instagram, Twitter, LinkedIn)', desc: 'Resize images to any dimension or use preset sizes for popular social media platforms.' },
  { path: '/blog/make-id-photo', title: 'How to Make ID Photos at Home (Passport, Visa, Driver License)', desc: 'Create standard ID photos for passports, visas, and official documents in multiple sizes and background colors.' },
  { path: '/blog/upscale-image-ai', title: 'How to Upscale Images with AI (2x to 8x Resolution)', desc: 'Enlarge images using Real-ESRGAN neural network. Adds detail instead of blurring. All processing runs locally.' },
  { path: '/blog/crop-image', title: 'How to Crop Images Online (Interactive Selection Tool)', desc: 'Crop images by drawing a selection rectangle. Choose exactly what to keep and remove the rest.' },
]

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950">
      <header className="border-b border-zinc-200 dark:border-zinc-800">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className="text-sm font-semibold text-zinc-800 dark:text-zinc-200 hover:text-blue-600 transition-colors">← AI Image Tools</Link>
        </div>
      </header>
      <main className="max-w-5xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100 mb-2">Guides & Tutorials</h1>
        <p className="text-zinc-500 mb-10">Step-by-step guides for all our image processing tools.</p>
        <div className="grid md:grid-cols-2 gap-6">
          {articles.map(a => (
            <Link key={a.path} href={a.path} className="block p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 hover:border-blue-300 dark:hover:border-blue-700 hover:shadow-md transition-all">
              <h2 className="font-semibold text-zinc-800 dark:text-zinc-200 mb-2">{a.title}</h2>
              <p className="text-sm text-zinc-500 leading-relaxed">{a.desc}</p>
            </Link>
          ))}
        </div>
      </main>
    </div>
  )
}
