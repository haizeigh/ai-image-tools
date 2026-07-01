'use client'

import { createContext, useContext, useState, useCallback, useEffect, ReactNode } from 'react'
import { LangCode, LANGUAGES } from '@/i18n/languages'

interface LangContextType {
  lang: LangCode
  setLang: (code: LangCode) => void
}

const LangContext = createContext<LangContextType>({
  lang: 'en',
  setLang: () => {},
})

export function useLang() {
  return useContext(LangContext)
}

export function LangProvider({ children, defaultLang = 'en' }: { children: ReactNode; defaultLang?: LangCode }) {
  const [lang, setLangState] = useState<LangCode>(defaultLang)

  // Initialize from localStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('ai-image-tools-lang') as LangCode | null
      if (saved && LANGUAGES.some(l => l.code === saved)) {
        setLangState(saved)
      }
    }
  }, [])

  const setLang = useCallback((code: LangCode) => {
    setLangState(code)
    if (typeof window !== 'undefined') {
      localStorage.setItem('ai-image-tools-lang', code)
    }
  }, [])

  return (
    <LangContext.Provider value={{ lang, setLang }}>
      {children}
    </LangContext.Provider>
  )
}
