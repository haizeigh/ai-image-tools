'use client'

import { useState, useCallback } from 'react'
import ToolLayout from '@/components/ToolLayout'
import ImageUploader from '@/components/ImageUploader'
import ImagePreview from '@/components/ImagePreview'
import ProcessingOverlay, { useProcessing } from '@/components/ProcessingOverlay'
import { readFileAsDataURL } from '@/lib/utils'
import { useLang } from '@/i18n/LangContext'
import { t } from '@/i18n/translations'
import { Copy, Check } from 'lucide-react'

export default function OCRPage() {
  const { lang } = useLang()
  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [result, setResult] = useState<string | null>(null)
  const [text, setText] = useState<string>('')
  const [copied, setCopied] = useState(false)
  const [langs, setLangs] = useState<string>('eng')
  const { processing, run } = useProcessing()

  const handleFile = useCallback(async (f: File) => {
    setFile(f)
    setResult(null)
    setText('')
    const dataUrl = await readFileAsDataURL(f)
    setPreview(dataUrl)
  }, [])

  const handleOCR = useCallback(async () => {
    if (!file) return
    gtag('event', 'tool_used', { tool_name: 'ocr' })
    await run(async () => {
      const Tesseract = await import('tesseract.js')
      const { data } = await Tesseract.recognize(file, langs, {
        logger: (m: any) => {
          if (m.status === 'recognizing text') {
            console.log(`Progress: ${Math.round(m.progress * 100)}%`)
          }
        },
      })
      setText(data.text)
      setResult(URL.createObjectURL(file))
    }, t(lang, 'ocr.processing'))
  }, [file, langs, run, lang])

  const handleCopy = useCallback(async () => {
    if (!text) return
    await navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }, [text])

  const handleDownload = () => {
    if (!text) return
    const blob = new Blob([text], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = (file?.name?.replace(/\.[^.]+$/, '') || 'ocr') + '.txt'
    a.click()
    URL.revokeObjectURL(url)
  }

  const handleReset = () => { setFile(null); setPreview(null); setResult(null); setText('') }

  return (
    <ToolLayout
      title={t(lang, 'ocr.title')}
      description={t(lang, 'ocr.desc')}
    >
      {!file && <ImageUploader onFileSelect={handleFile} />}

      {file && !result && preview && (
        <div className="space-y-6">
          <ImagePreview
            src={preview}
            fileName={file.name}
            fileSize={file.size}
            onReset={handleReset}
            onDownload={() => {}}
            downloadLabel=""
          />

          {/* Language Selection */}
          <div className="p-6 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
              {t(lang, 'ocr.langLabel')}
            </label>
            <select
              value={langs}
              onChange={(e) => setLangs(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-zinc-300 dark:border-zinc-600 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 text-sm"
            >
              <option value="eng">English</option>
              <option value="chi_sim">Chinese (Simplified)</option>
              <option value="chi_tra">Chinese (Traditional)</option>
              <option value="jpn">Japanese</option>
              <option value="kor">Korean</option>
              <option value="spa">Spanish</option>
              <option value="fra">French</option>
              <option value="deu">German</option>
              <option value="rus">Russian</option>
              <option value="por">Portuguese</option>
              <option value="ita">Italian</option>
              <option value="ara">Arabic</option>
              <option value="hin">Hindi</option>
              <option value="tur">Turkish</option>
              <option value="nld">Dutch</option>
              <option value="pol">Polish</option>
              <option value="vie">Vietnamese</option>
              <option value="tha">Thai</option>
              <option value="ind">Indonesian</option>
            </select>
            <p className="text-xs text-zinc-400 mt-2">{t(lang, 'ocr.langHint')}</p>
          </div>

          {processing ? (
            <ProcessingOverlay message={t(lang, 'ocr.processing')} />
          ) : (
            <button
              onClick={handleOCR}
              className="w-full py-3 rounded-xl bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors"
            >
              {t(lang, 'ocr.btn')}
            </button>
          )}
        </div>
      )}

      {result && (
        <div className="space-y-4">
          <ImagePreview
            src={result}
            fileName={file?.name || ''}
            fileSize={file?.size}
            onReset={handleReset}
            onDownload={() => {}}
            downloadLabel=""
          />

          <div className="p-6 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
            <div className="flex items-center justify-between mb-3">
              <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                {t(lang, 'ocr.resultLabel')}
              </label>
              <div className="flex gap-2">
                <button
                  onClick={handleCopy}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-zinc-300 dark:border-zinc-600 text-xs font-medium text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-green-500" /> : <Copy className="w-3.5 h-3.5" />}
                  {copied ? t(lang, 'ocr.copied') : t(lang, 'ocr.copy')}
                </button>
                <button
                  onClick={handleDownload}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600 text-white text-xs font-medium hover:bg-blue-700 transition-colors"
                >
                  {t(lang, 'ocr.downloadTxt')}
                </button>
              </div>
            </div>
            <textarea
              readOnly
              value={text}
              className="w-full h-64 p-4 rounded-lg border border-zinc-300 dark:border-zinc-600 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 text-sm font-mono resize-y"
              placeholder={t(lang, 'ocr.placeholder')}
            />
            <p className="text-xs text-zinc-400 mt-2">
              {t(lang, 'ocr.charCount', { count: text.length })}
            </p>
          </div>
        </div>
      )}
    </ToolLayout>
  )
}
