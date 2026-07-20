'use client'

import Link from 'next/link'
import {
  ImageDown,
  FileDown,
  Shuffle,
  Maximize,
  IdCard,
  ZoomIn,
  Expand,
  FileText,
  Crop,
  Sparkles,
  Shield,
  Zap,
  Globe,
} from 'lucide-react'
import LanguageSelector from '@/components/LanguageSelector'
import { useLang } from '@/i18n/LangContext'
import { t, tRaw } from '@/i18n/translations'

const TOOL_PATHS = [
  { href: '/tools/remove-bg', icon: ImageDown, color: 'from-violet-500 to-purple-600', key: 'removeBg' },
  { href: '/tools/compress', icon: FileDown, color: 'from-emerald-500 to-teal-600', key: 'compress' },
  { href: '/tools/format-convert', icon: Shuffle, color: 'from-blue-500 to-indigo-600', key: 'formatConvert' },
  { href: '/tools/resize', icon: Maximize, color: 'from-amber-500 to-orange-600', key: 'resize' },
  { href: '/tools/id-photo', icon: IdCard, color: 'from-rose-500 to-pink-600', key: 'idPhoto' },
  { href: '/tools/upscale', icon: ZoomIn, color: 'from-cyan-500 to-sky-600', key: 'upscale' },
  { href: '/tools/enlarge', icon: Expand, color: 'from-orange-500 to-red-600', key: 'enlarge' },
  { href: '/tools/ocr', icon: FileText, color: 'from-purple-500 to-pink-600', key: 'ocr' },
  { href: '/tools/crop', icon: Crop, color: 'from-lime-500 to-green-600', key: 'crop' },
]

const POPULAR_TOOLS = ['removeBg', 'compress', 'formatConvert', 'idPhoto', 'upscale', 'ocr']

export default function Home() {
  const { lang } = useLang()

  const getToolTitle = (key: string) => t(lang, `${key}.title`)
  const getToolDesc = (key: string) => t(lang, `${key}.desc`)

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950">
      {/* Navigation */}
      <header className="border-b border-zinc-100 dark:border-zinc-800">
        <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-blue-600" />
            <span className="font-bold text-zinc-800 dark:text-zinc-200">
              AI Image Tools
            </span>
          </div>
          <div className="flex items-center gap-4">
            <nav className="flex items-center gap-4 text-sm text-zinc-500">
              <a href="#tools" className="hover:text-zinc-700 dark:hover:text-zinc-300">{t(lang, 'nav.tools')}</a>
              <a href="#features" className="hover:text-zinc-700 dark:hover:text-zinc-300">{t(lang, 'nav.features')}</a>
            </nav>
            <a href="mailto:support.img@aixiaot.com" className="hidden sm:inline-flex items-center gap-1 text-xs text-zinc-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              support.img@aixiaot.com
            </a>
            <LanguageSelector />
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="max-w-4xl mx-auto px-4 py-12 text-center">
        {/* Privacy Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-950/50 dark:to-blue-950/50 border border-green-200 dark:border-green-800 text-green-700 dark:text-green-300 text-sm font-medium mb-6 shadow-sm">
          <Shield className="w-4 h-4" />
          <span>{t(lang, 'hero.badge')}</span>
          <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
        </div>

        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
          {t(lang, 'hero.heading')}
        </h1>
        <p className="mt-3 text-base text-zinc-500 dark:text-zinc-400 max-w-2xl mx-auto">
          {t(lang, 'hero.sub')}
        </p>
      </section>

      {/* Tool Grid */}
      <section id="tools" className="max-w-5xl mx-auto px-4 pb-8">
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mb-2 text-center">
          {t(lang, 'section.choose')}
        </h2>
        <p className="text-sm text-zinc-400 text-center mb-8">
          🔒 {t(lang, 'hero.privacyNote')}
        </p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {TOOL_PATHS.map((tool) => (
            <Link
              key={tool.href}
              href={tool.href}
              className="group relative p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 transition-all hover:shadow-lg hover:-translate-y-0.5"
            >
              {POPULAR_TOOLS.includes(tool.key) && (
                <span className="absolute top-3 right-3 px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 text-xs font-medium">
                  {t(lang, 'popular')}
                </span>
              )}
              <span className="absolute top-3 left-3 px-1.5 py-0.5 rounded text-[10px] font-medium text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-950/50 border border-green-200 dark:border-green-800">
                🔒 Local
              </span>
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${tool.color} flex items-center justify-center mb-4`}>
                <tool.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold text-zinc-800 dark:text-zinc-200 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                {getToolTitle(tool.key)}
              </h3>
              <p className="mt-1.5 text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
                {getToolDesc(tool.key)}
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* Privacy highlights */}
      <section className="max-w-5xl mx-auto px-4 pb-12">
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-zinc-500 dark:text-zinc-400">
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 shrink-0" />
            {t(lang, 'hero.highlight1')}
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 shrink-0" />
            {t(lang, 'hero.highlight2')}
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 shrink-0" />
            {t(lang, 'hero.highlight3')}
          </span>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="bg-zinc-50 dark:bg-zinc-900 border-y border-zinc-100 dark:border-zinc-800">
        <div className="max-w-5xl mx-auto px-4 py-16">
          <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mb-10 text-center">
            {t(lang, 'section.why')}
          </h2>
          <div className="grid sm:grid-cols-3 gap-8">
            {['privacy', 'fast', 'free'].map((key) => {
              const f = tRaw(lang, `features.${key}`) as any
              const icons = { privacy: Shield, fast: Zap, free: Globe } as const
              const Icon = icons[key as keyof typeof icons]
              return (
                <div key={key} className="text-center">
                  <div className="w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-900 flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h3 className="font-semibold text-zinc-800 dark:text-zinc-200 mb-1">{f.title}</h3>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">{f.desc}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Blog / Guides section */}
      <section className="bg-zinc-50 dark:bg-zinc-900 border-y border-zinc-100 dark:border-zinc-800">
        <div className="max-w-5xl mx-auto px-4 py-16">
          <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mb-10 text-center">
            Guides & Tutorials
          </h2>
          <div className="grid sm:grid-cols-2 gap-6">
            <Link href="/blog/remove-background" className="block p-5 rounded-xl bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 hover:border-blue-300 dark:hover:border-blue-600 hover:shadow-md transition-all">
              <span className="text-xs font-medium text-blue-600 bg-blue-50 dark:bg-blue-900/30 px-2 py-0.5 rounded">New</span>
              <h3 className="font-semibold text-zinc-800 dark:text-zinc-200 mt-2 mb-1 text-sm">How to Remove Background from Images Online</h3>
              <p className="text-xs text-zinc-500">Learn how to automatically remove backgrounds from photos using AI.</p>
            </Link>
            <Link href="/blog/compress-image" className="block p-5 rounded-xl bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 hover:border-blue-300 dark:hover:border-blue-600 hover:shadow-md transition-all">
              <h3 className="font-semibold text-zinc-800 dark:text-zinc-200 mt-2 mb-1 text-sm">How to Compress Images for Web</h3>
              <p className="text-xs text-zinc-500">Reduce file size without losing quality. Adjustable quality from 10% to 100%.</p>
            </Link>
            <Link href="/blog/convert-image-format" className="block p-5 rounded-xl bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 hover:border-blue-300 dark:hover:border-blue-600 hover:shadow-md transition-all">
              <h3 className="font-semibold text-zinc-800 dark:text-zinc-200 mt-2 mb-1 text-sm">How to Convert Image Formats</h3>
              <p className="text-xs text-zinc-500">Convert between JPG, PNG, and WebP instantly in your browser.</p>
            </Link>
            <Link href="/blog/resize-image" className="block p-5 rounded-xl bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 hover:border-blue-300 dark:hover:border-blue-600 hover:shadow-md transition-all">
              <h3 className="font-semibold text-zinc-800 dark:text-zinc-200 mt-2 mb-1 text-sm">How to Resize Images for Social Media</h3>
              <p className="text-xs text-zinc-500">Use presets for Instagram, Twitter, YouTube, LinkedIn, and Facebook.</p>
            </Link>
            <Link href="/blog/make-id-photo" className="block p-5 rounded-xl bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 hover:border-blue-300 dark:hover:border-blue-600 hover:shadow-md transition-all">
              <h3 className="font-semibold text-zinc-800 dark:text-zinc-200 mt-2 mb-1 text-sm">How to Make ID Photos at Home</h3>
              <p className="text-xs text-zinc-500">Create passport, visa, and official ID photos in standard sizes.</p>
            </Link>
            <Link href="/blog/upscale-image-ai" className="block p-5 rounded-xl bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 hover:border-blue-300 dark:hover:border-blue-600 hover:shadow-md transition-all">
              <h3 className="font-semibold text-zinc-800 dark:text-zinc-200 mt-2 mb-1 text-sm">How to Upscale Images with AI</h3>
              <p className="text-xs text-zinc-500">Enlarge images 2x to 8x using Real-ESRGAN neural network.</p>
            </Link>
            <Link href="/blog/crop-image" className="block p-5 rounded-xl bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 hover:border-blue-300 dark:hover:border-blue-600 hover:shadow-md transition-all">
              <h3 className="font-semibold text-zinc-800 dark:text-zinc-200 mt-2 mb-1 text-sm">How to Crop Images Online</h3>
              <p className="text-xs text-zinc-500">Draw a selection rectangle and keep only what you want.</p>
            </Link>
            <Link href="/blog/enlarge-image" className="block p-5 rounded-xl bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 hover:border-blue-300 dark:hover:border-blue-600 hover:shadow-md transition-all">
              <h3 className="font-semibold text-zinc-800 dark:text-zinc-200 mt-2 mb-1 text-sm">How to Enlarge or Shrink Images</h3>
              <p className="text-xs text-zinc-500">Scale images 10% to 1000% with Canvas interpolation.</p>
            </Link>
            <Link href="/blog/image-to-text-ocr" className="block p-5 rounded-xl bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 hover:border-blue-300 dark:hover:border-blue-600 hover:shadow-md transition-all">
              <h3 className="font-semibold text-zinc-800 dark:text-zinc-200 mt-2 mb-1 text-sm">How to Extract Text from Images with OCR</h3>
              <p className="text-xs text-zinc-500">Recognize text in 20+ languages using AI-powered OCR.</p>
            </Link>
          </div>
          <div className="text-center mt-8">
            <Link href="/blog" className="inline-flex items-center gap-1.5 px-6 py-2.5 rounded-xl bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition-colors shadow-sm">
              View all guides →
            </Link>
          </div>
        </div>
      </section>

      {/* About / SEO content */}
      <section className="max-w-3xl mx-auto px-4 py-16">
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mb-6 text-center">About AI Image Tools</h2>
        <div className="space-y-4 text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
          <p>AI Image Tools is a completely free online image processing platform. All tools run directly in your browser using WebAssembly and JavaScript — your files never leave your device. No uploads, no servers, no sign-ups.</p>
          <p>The platform includes nine powerful tools: Remove Background uses a neural network to automatically detect and remove image backgrounds with high accuracy. Compress Image reduces file sizes while preserving visual quality. Format Conversion instantly converts between JPG, PNG, and WebP formats. Resize &amp; Crop lets you scale images to any dimension with preset options for social media platforms. ID Photo Maker creates standard passport and visa photos in multiple sizes. AI Image Upscaler uses Real-ESRGAN technology to intelligently upscale images by 2x to 8x. Image Resizer provides fast Canvas-based scaling. Image to Text (OCR) extracts text from images using AI-powered optical character recognition. The interactive Crop tool lets you draw a selection rectangle and keep only what you want.</p>
          <p>All tools are built with privacy as the core principle. Since everything runs in your browser, there is no risk of data breaches or unauthorized access to your images. This approach also means zero server costs, which allows us to keep the tools free forever.</p>
          <p>The project is open source under the AGPL v3 license. The code is available on GitHub for transparency and community contributions.</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 text-center text-sm text-zinc-400">
        <p>{t(lang, 'footer')}</p>
        <p className="mt-1 text-xs text-zinc-400/60">
          <Link href="/blog" className="hover:text-zinc-600 dark:hover:text-zinc-300 underline underline-offset-2 mr-3">Guides</Link>
          <Link href="/privacy" className="hover:text-zinc-600 dark:hover:text-zinc-300 underline underline-offset-2 mr-3">Privacy Policy</Link>
          <a href="https://github.com/haizeigh/ai-image-tools" target="_blank" rel="noopener noreferrer" className="hover:text-zinc-600 dark:hover:text-zinc-300 underline underline-offset-2 mr-3">
            AGPL v3 · GitHub
          </a>
          <a href="mailto:support.img@aixiaot.com" className="hover:text-zinc-600 dark:hover:text-zinc-300 underline underline-offset-2">
            support.img@aixiaot.com
          </a>
        </p>
      </footer>
    </div>
  )
}
