'use client'

import { useState, useCallback } from 'react'
import { useLang } from '@/i18n/LangContext'
import { t } from '@/i18n/translations'

interface ProcessingOverlayProps {
  message?: string
}

export default function ProcessingOverlay({ message }: ProcessingOverlayProps) {
  const { lang } = useLang()

  return (
    <div className="flex flex-col items-center justify-center py-20 gap-4">
      <div className="w-10 h-10 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin" />
      <p className="text-zinc-500 dark:text-zinc-400 text-sm">
        {message || t(lang, 'processing.default')}
      </p>
    </div>
  )
}

export function useProcessing() {
  const [processing, setProcessing] = useState(false)
  const [progress, setProgress] = useState<string | null>(null)

  const run = useCallback(async <T,>(fn: () => Promise<T>, msg?: string): Promise<T> => {
    setProcessing(true)
    setProgress(msg || null)
    try {
      const result = await fn()
      return result
    } finally {
      setProcessing(false)
      setProgress(null)
    }
  }, [])

  return { processing, progress, run, setProgress }
}
