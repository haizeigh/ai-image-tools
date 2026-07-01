'use client'

import { useCallback, useRef, useState } from 'react'
import { Upload, X } from 'lucide-react'
import { useLang } from '@/i18n/LangContext'
import { t } from '@/i18n/translations'

interface ImageUploaderProps {
  onFileSelect: (file: File) => void
  accept?: string
  maxSize?: number
}

export default function ImageUploader({
  onFileSelect,
  accept = 'image/*',
  maxSize = 20,
}: ImageUploaderProps) {
  const { lang } = useLang()
  const inputRef = useRef<HTMLInputElement>(null)
  const [dragOver, setDragOver] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleFile = useCallback(
    (file: File) => {
      setError(null)
      if (!file.type.startsWith('image/')) {
        setError(t(lang, 'uploader.errorType'))
        return
      }
      if (file.size > maxSize * 1024 * 1024) {
        setError(t(lang, 'uploader.errorSize', { size: maxSize }))
        return
      }
      onFileSelect(file)
    },
    [onFileSelect, maxSize, lang]
  )

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      setDragOver(false)
      const file = e.dataTransfer.files[0]
      if (file) handleFile(file)
    },
    [handleFile]
  )

  const handleClick = () => inputRef.current?.click()

  return (
    <div
      onDragOver={(e) => { e.preventDefault(); setDragOver(true) }}
      onDragLeave={() => setDragOver(false)}
      onDrop={handleDrop}
      onClick={handleClick}
      className={`
        relative cursor-pointer rounded-2xl border-2 border-dashed p-12
        transition-all duration-200 text-center
        ${dragOver
          ? 'border-blue-500 bg-blue-50 dark:bg-blue-950/30'
          : 'border-zinc-300 dark:border-zinc-600 hover:border-zinc-400 dark:hover:border-zinc-500'
        }
      `}
    >
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0]
          if (file) handleFile(file)
        }}
      />
      <div className="flex flex-col items-center gap-3">
        <div className="rounded-full bg-zinc-100 dark:bg-zinc-800 p-4">
          <Upload className="w-8 h-8 text-zinc-500 dark:text-zinc-400" />
        </div>
        <div>
          <p className="text-base font-medium text-zinc-700 dark:text-zinc-300">
            {t(lang, 'uploader.hint')}
          </p>
          <p className="text-sm text-zinc-400 mt-1">
            {t(lang, 'uploader.support', { size: maxSize })}
          </p>
        </div>
      </div>
      {error && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-1.5 text-red-500 text-sm">
          <X className="w-4 h-4" />
          {error}
        </div>
      )}
    </div>
  )
}
