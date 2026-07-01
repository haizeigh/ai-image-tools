'use client'

import { useState, useRef, useEffect } from 'react'
import { useLang } from '@/i18n/LangContext'
import { LANGUAGES } from '@/i18n/languages'
import { Globe } from 'lucide-react'

export default function LanguageSelector() {
  const { lang, setLang } = useLang()
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  const current = LANGUAGES.find((l) => l.code === lang)

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
      >
        <Globe className="w-3.5 h-3.5" />
        <span>{current?.native || 'English'}</span>
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-1 z-50 w-48 max-h-72 overflow-y-auto rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 shadow-lg">
          {LANGUAGES.map((l) => (
            <button
              key={l.code}
              onClick={() => {
                setLang(l.code)
                setOpen(false)
              }}
              className={`w-full text-left px-4 py-2 text-sm transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-800 ${
                lang === l.code
                  ? 'text-blue-600 dark:text-blue-400 font-medium bg-blue-50 dark:bg-blue-950'
                  : 'text-zinc-700 dark:text-zinc-300'
              }`}
            >
              <span className="mr-2">{l.native}</span>
              <span className="text-xs text-zinc-400">({l.name})</span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
