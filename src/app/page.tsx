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

      {/* Footer */}
      <footer className="py-8 text-center text-sm text-zinc-400">
        <p>{t(lang, 'footer')}</p>
        <p className="mt-1 text-xs text-zinc-400/60">
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
