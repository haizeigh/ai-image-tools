'use client'

import { Download, RotateCcw } from 'lucide-react'
import { formatFileSize } from '@/lib/utils'
import { useLang } from '@/i18n/LangContext'
import { t } from '@/i18n/translations'

interface ImagePreviewProps {
  src: string
  fileName?: string
  fileSize?: number
  onReset: () => void
  onDownload: () => void
  downloadLabel?: string
  extraInfo?: string
}

export default function ImagePreview({
  src,
  fileName,
  fileSize,
  onReset,
  onDownload,
  downloadLabel,
  extraInfo,
}: ImagePreviewProps) {
  const { lang } = useLang()

  return (
    <div className="space-y-4">
      <div className="relative rounded-xl overflow-hidden bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt="Preview"
          className="max-w-full max-h-[500px] mx-auto object-contain"
        />
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="text-sm text-zinc-500 dark:text-zinc-400">
          {fileName && <span className="font-medium text-zinc-700 dark:text-zinc-300">{fileName}</span>}
          {fileSize && <span> · {formatFileSize(fileSize)}</span>}
          {extraInfo && <span> · {extraInfo}</span>}
        </div>

        <div className="flex gap-2">
          <button
            onClick={onReset}
            className="flex items-center gap-1.5 px-4 py-2 rounded-lg border border-zinc-300 dark:border-zinc-600 text-sm font-medium text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            {t(lang, 'preview.reset')}
          </button>
          <button
            onClick={onDownload}
            className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition-colors"
          >
            <Download className="w-4 h-4" />
            {downloadLabel || t(lang, 'preview.download')}
          </button>
        </div>
      </div>
    </div>
  )
}
