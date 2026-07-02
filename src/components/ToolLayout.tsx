'use client'

import { ReactNode } from 'react'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import LanguageSelector from '@/components/LanguageSelector'
import { useLang } from '@/i18n/LangContext'
import { t } from '@/i18n/translations'

interface ToolLayoutProps {
  title: string
  description: string
  children: ReactNode
}

export default function ToolLayout({ title, description, children }: ToolLayoutProps) {
  const { lang } = useLang()

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950">
      <header className="border-b border-zinc-200 dark:border-zinc-800">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="flex items-center gap-1.5 text-sm text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              {t(lang, 'nav.back')}
            </Link>
            <span className="text-zinc-300 dark:text-zinc-700">|</span>
            <Link href="/" className="text-sm font-semibold text-zinc-800 dark:text-zinc-200">
              AI Image Tools
            </Link>
          </div>
          <div className="flex items-center gap-3">
            <a href="mailto:support.img@aixiaot.com" className="hidden sm:inline-flex items-center gap-1 text-xs text-zinc-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              support.img@aixiaot.com
            </a>
            <LanguageSelector />
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100">{title}</h1>
          <p className="mt-2 text-zinc-500 dark:text-zinc-400">{description}</p>
        </div>
        {children}
      </main>

      <footer className="border-t border-zinc-200 dark:border-zinc-800 py-6 text-center text-sm text-zinc-400">
        <p>{t(lang, 'toolFooter')}</p>
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
