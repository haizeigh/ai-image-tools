'use client'

import { useState, useCallback, useRef } from 'react'
import ToolLayout from '@/components/ToolLayout'
import ImageUploader from '@/components/ImageUploader'
import ImagePreview from '@/components/ImagePreview'
import ProcessingOverlay, { useProcessing } from '@/components/ProcessingOverlay'
import { readFileAsDataURL } from '@/lib/utils'
import { useLang } from '@/i18n/LangContext'
import { t, tRaw } from '@/i18n/translations'

type ModelSize = 'slim' | 'medium'
type Scale = 'x2' | 'x3' | 'x4' | 'x8'
type Backend = 'wasm' | 'gpu'

const MODEL_KEYS: ModelSize[] = ['slim', 'medium']
const SCALE_OPTIONS: Scale[] = ['x2', 'x3', 'x4', 'x8']

export default function UpscalePage() {
  const { lang } = useLang()
  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [result, setResult] = useState<string | null>(null)
  const [resultSize, setResultSize] = useState<number>(0)
  const [modelSize, setModelSize] = useState<ModelSize>('slim')
  const [scale, setScale] = useState<Scale>('x4')
  const [backend, setBackend] = useState<Backend>('wasm')
  const [actualBackend, setActualBackend] = useState<Backend>('wasm')
  const [backendMsg, setBackendMsg] = useState<string | null>(null)
  const [modelLoaded, setModelLoaded] = useState(false)
  const [modelLoading, setModelLoading] = useState(false)
  const [modelLoadProgress, setModelLoadProgress] = useState<string | null>(null)
  const modelRef = useRef<any>(null)
  const backendRef = useRef<Backend>('wasm')
  const { processing, run } = useProcessing()

  const getModelInfo = (key: ModelSize) => {
    const models = tRaw(lang, 'upscale.models') as any
    return models?.[key] || { label: key, size: '', desc: '' }
  }

  // Initialize TF.js with the selected backend
  const initBackend = useCallback(async (target: Backend): Promise<{ tf: any; actual: Backend }> => {
    const tf = await import('@tensorflow/tfjs')

    if (target === 'wasm') {
      // Load Wasm backend for fast CPU inference
      try {
        await import('@tensorflow/tfjs-backend-wasm')
        const wasm = (await import('@tensorflow/tfjs-backend-wasm')) as any
        // Point to our local Wasm files
        wasm.setWasmPaths('/wasm/')
        await tf.setBackend('wasm')
        await tf.ready()
        backendRef.current = 'wasm'
        return { tf, actual: 'wasm' }
      } catch (err) {
        console.warn('Wasm backend failed, falling back to CPU:', err)
        await tf.setBackend('cpu')
        await tf.ready()
        backendRef.current = 'wasm' // still report as wasm mode
        return { tf, actual: 'wasm' }
      }
    }

    // GPU (WebGL) — try it
    try {
      await tf.setBackend('webgl')
      await tf.ready()
      if (tf.getBackend() === 'webgl') {
        backendRef.current = 'gpu'
        return { tf, actual: 'gpu' }
      }
    } catch {}
    // WebGL not available, fallback to Wasm
    await import('@tensorflow/tfjs-backend-wasm')
    const wasm = (await import('@tensorflow/tfjs-backend-wasm')) as any
    wasm.setWasmPaths('/wasm/')
    await tf.setBackend('wasm')
    await tf.ready()
    backendRef.current = 'wasm'
    return { tf, actual: 'wasm' }
  }, [])

  const loadModel = useCallback(async () => {
    if (modelRef.current) { setModelLoaded(true); return }
    setModelLoading(true)
    const info = getModelInfo(modelSize)
    setModelLoadProgress(t(lang, 'upscale.loadBtn', { label: info.label, size: info.size }))

    try {
      const { tf, actual } = await initBackend(backend)
      setActualBackend(actual)
      if (actual === 'gpu') {
        setBackendMsg(t(lang, 'upscale.gpuAvailable'))
      } else {
        setBackendMsg(t(lang, 'upscale.wasmAvailable'))
      }

      const model = await tf.loadLayersModel(`/models/${modelSize}/${scale}/model.json`)
      modelRef.current = model
      setModelLoaded(true)
      setModelLoadProgress(null)
    } catch (err) {
      console.error('Model loading failed:', err)
      // Try fallback
      try {
        const tf = await import('@tensorflow/tfjs')
        await import('@tensorflow/tfjs-backend-wasm')
        const wasm = (await import('@tensorflow/tfjs-backend-wasm')) as any
        wasm.setWasmPaths('/wasm/')
        await tf.setBackend('wasm')
        await tf.ready()
        const model = await tf.loadLayersModel(`/models/${modelSize}/${scale}/model.json`)
        modelRef.current = model
        setModelLoaded(true)
        setModelLoadProgress(null)
        setActualBackend('wasm')
        setBackendMsg(t(lang, 'upscale.wasmFallback'))
        return
      } catch {}
      setModelLoadProgress(t(lang, 'upscale.fail'))
    } finally {
      setModelLoading(false)
    }
  }, [modelSize, scale, backend, lang, initBackend])

  const handleModelChange = useCallback((newModel: ModelSize, newScale: Scale) => {
    setModelSize(newModel)
    setScale(newScale)
    setModelLoaded(false)
    modelRef.current = null
  }, [])

  const handleBackendChange = useCallback(async (newBackend: Backend) => {
    setBackend(newBackend)
    setModelLoaded(false)
    modelRef.current = null
    // Test backend immediately
    try {
      const { actual } = await initBackend(newBackend)
      setActualBackend(actual)
      if (actual === 'gpu') {
        setBackendMsg(t(lang, 'upscale.gpuAvailable'))
      } else if (newBackend === 'gpu') {
        setBackendMsg(t(lang, 'upscale.gpuUnavailable'))
      } else {
        setBackendMsg(t(lang, 'upscale.wasmAvailable'))
      }
    } catch {
      setActualBackend('wasm')
      setBackendMsg(t(lang, 'upscale.wasmFallback'))
    }
  }, [lang, initBackend])

  const handleFile = useCallback(async (f: File) => {
    setFile(f); setResult(null)
    setPreview(await readFileAsDataURL(f))
  }, [])

  const handleUpscale = useCallback(async () => {
    if (!file || !modelRef.current) return
    const info = getModelInfo(modelSize)
    await run(async () => {
      const tf = await import('@tensorflow/tfjs')
      const currentBackend = backendRef.current

      // Ensure the right backend is active
      if (tf.getBackend() !== (currentBackend === 'gpu' ? 'webgl' : 'wasm')) {
        if (currentBackend === 'gpu') {
          await tf.setBackend('webgl')
        } else {
          await tf.setBackend('wasm')
        }
        await tf.ready()
      }

      const url = URL.createObjectURL(file)
      const img = new Image()
      await new Promise<void>((resolve, reject) => { img.onload = () => resolve(); img.onerror = reject; img.src = url })
      URL.revokeObjectURL(url)

      let output: any
      try {
        const tensor = tf.browser.fromPixels(img).toFloat().div(255)
        const batched = tensor.expandDims(0)
        output = modelRef.current.predict(batched) as any
        const squeezed = output.squeeze() as any
        const clamped = tf.clipByValue(squeezed, 0, 1) as any

        const canvas = document.createElement('canvas')
        const [h, w] = clamped.shape as [number, number]
        canvas.width = w; canvas.height = h
        await tf.browser.toPixels(clamped as any, canvas)

        tensor.dispose(); batched.dispose(); output.dispose(); squeezed.dispose(); clamped.dispose()

        const blob = await new Promise<Blob>((resolve, reject) => {
          canvas.toBlob((b) => (b ? resolve(b) : reject(new Error('toBlob failed'))), 'image/png')
        })
        setResult(URL.createObjectURL(blob))
        setResultSize(blob.size)
      } catch (err) {
        // GPU failed — fallback to Wasm
        if (currentBackend === 'gpu') {
          console.warn('GPU inference failed, falling back to Wasm:', err)
          await import('@tensorflow/tfjs-backend-wasm')
          await tf.setBackend('wasm')
          await tf.ready()
          backendRef.current = 'wasm'
          setActualBackend('wasm')
          setBackendMsg(t(lang, 'upscale.wasmFallback'))

          const tensor = tf.browser.fromPixels(img).toFloat().div(255)
          const batched = tensor.expandDims(0)
          output = modelRef.current.predict(batched) as any
          const squeezed = output.squeeze() as any
          const clamped = tf.clipByValue(squeezed, 0, 1) as any

          const canvas = document.createElement('canvas')
          const [h, w] = clamped.shape as [number, number]
          canvas.width = w; canvas.height = h
          await tf.browser.toPixels(clamped as any, canvas)

          tensor.dispose(); batched.dispose(); output.dispose(); squeezed.dispose(); clamped.dispose()

          const blob = await new Promise<Blob>((resolve, reject) => {
            canvas.toBlob((b) => (b ? resolve(b) : reject(new Error('toBlob failed'))), 'image/png')
          })
          setResult(URL.createObjectURL(blob))
          setResultSize(blob.size)
        } else {
          throw err
        }
      }
    }, t(lang, 'upscale.processing', { label: info.label, scale }))
  }, [file, modelSize, scale, run, lang])

  const handleDownload = () => {
    if (!result) return
    const a = document.createElement('a')
    a.href = result
    a.download = (file?.name?.replace(/\.[^.]+$/, '') || 'image') + `-ai-${modelSize}${scale}.png`
    a.click()
  }

  const handleReset = () => { setFile(null); setPreview(null); setResult(null) }

  return (
    <ToolLayout title={t(lang, 'upscale.title')} description={t(lang, 'upscale.desc')}>
      {!file && (
        <div className="space-y-6">
          <div className="p-6 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 space-y-5">
            {/* Model */}
            <div>
              <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-3">{t(lang, 'upscale.modelLabel')}</label>
              <div className="grid grid-cols-2 gap-3">
                {MODEL_KEYS.map((key) => {
                  const info = getModelInfo(key)
                  return (
                    <button key={key} onClick={() => handleModelChange(key, scale)}
                      className={`p-4 rounded-xl text-center border transition-all ${modelSize === key ? 'border-blue-500 bg-blue-50 dark:bg-blue-950 ring-2 ring-blue-200 dark:ring-blue-800' : 'border-zinc-200 dark:border-zinc-700 hover:border-zinc-300 dark:hover:border-zinc-600'}`}>
                      <div className="font-semibold text-zinc-800 dark:text-zinc-200">{info.label}</div>
                      <div className="text-xs text-zinc-400 mt-0.5">{info.size}</div>
                      <div className="text-xs text-zinc-500 mt-1">{info.desc}</div>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Scale */}
            <div>
              <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">{t(lang, 'upscale.scaleLabel')}</label>
              <div className="grid grid-cols-4 gap-2">
                {SCALE_OPTIONS.map((s) => (
                  <button key={s} onClick={() => handleModelChange(modelSize, s)}
                    className={`py-3 rounded-lg text-center border transition-all font-medium ${scale === s ? 'border-blue-500 bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300' : 'border-zinc-200 dark:border-zinc-700 hover:border-zinc-300 dark:hover:border-zinc-600'}`}>
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Backend Toggle */}
            <div>
              <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">{t(lang, 'upscale.backendLabel')}</label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => handleBackendChange('wasm')}
                  className={`p-3 rounded-xl text-center border transition-all ${backend === 'wasm' ? 'border-blue-500 bg-blue-50 dark:bg-blue-950 ring-2 ring-blue-200 dark:ring-blue-800' : 'border-zinc-200 dark:border-zinc-700 hover:border-zinc-300 dark:hover:border-zinc-600'}`}
                >
                  <div className="font-medium text-sm text-zinc-800 dark:text-zinc-200">Wasm</div>
                  <div className="text-xs text-zinc-400 mt-0.5">{t(lang, 'upscale.backendWasmDesc')}</div>
                </button>
                <button
                  onClick={() => handleBackendChange('gpu')}
                  className={`p-3 rounded-xl text-center border transition-all ${backend === 'gpu' ? 'border-blue-500 bg-blue-50 dark:bg-blue-950 ring-2 ring-blue-200 dark:ring-blue-800' : 'border-zinc-200 dark:border-zinc-700 hover:border-zinc-300 dark:hover:border-zinc-600'}`}
                >
                  <div className="font-medium text-sm text-zinc-800 dark:text-zinc-200">GPU</div>
                  <div className="text-xs text-zinc-400 mt-0.5">{t(lang, 'upscale.backendGpuDesc')}</div>
                </button>
              </div>
              {backendMsg && (
                <div className={`mt-2 px-3 py-2 rounded-lg text-xs ${
                  actualBackend === 'gpu'
                    ? 'bg-green-50 dark:bg-green-950 text-green-700 dark:text-green-300 border border-green-200 dark:border-green-800'
                    : 'bg-amber-50 dark:bg-amber-950 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800'
                }`}>
                  {backendMsg}
                </div>
              )}
            </div>

            <p className="text-xs text-zinc-400">{t(lang, 'upscale.modelHint')}</p>
          </div>

          <ImageUploader onFileSelect={handleFile} />
        </div>
      )}

      {file && !result && preview && (
        <div className="space-y-6">
          <ImagePreview src={preview} fileName={file.name} fileSize={file.size} onReset={handleReset} onDownload={() => {}} downloadLabel="" />

          {!modelLoaded && !modelLoading && (
            <button onClick={loadModel} className="w-full py-3 rounded-xl bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors">
              {t(lang, 'upscale.loadBtn', { label: getModelInfo(modelSize).label, size: getModelInfo(modelSize).size })} · {scale}
            </button>
          )}

          {modelLoading && <ProcessingOverlay message={modelLoadProgress || t(lang, 'upscale.loading')} />}

          {modelLoaded && !processing && (
            <div className="space-y-3">
              <div className="p-3 rounded-xl bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 text-center text-sm text-green-700 dark:text-green-300">
                {t(lang, 'upscale.loaded', { label: getModelInfo(modelSize).label })} · {scale}
                {actualBackend === 'gpu' ? ' · GPU' : ' · Wasm'}
              </div>
              {backendMsg && (
                <div className={`px-3 py-2 rounded-lg text-xs ${
                  actualBackend === 'gpu'
                    ? 'bg-green-50 dark:bg-green-950 text-green-700 dark:text-green-300 border border-green-200 dark:border-green-800'
                    : 'bg-amber-50 dark:bg-amber-950 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800'
                }`}>
                  {backendMsg}
                </div>
              )}
              <button onClick={handleUpscale} className="w-full py-3 rounded-xl bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors">
                {t(lang, 'upscale.upscaleBtn', { scale })}
              </button>
            </div>
          )}

          {processing && <ProcessingOverlay message={t(lang, 'upscale.processing', { label: getModelInfo(modelSize).label, scale })} />}
        </div>
      )}

      {result && (
        <ImagePreview src={result} fileName={(file?.name?.replace(/\.[^.]+$/, '') || 'image') + `-ai-${modelSize}${scale}.png`} fileSize={resultSize} onReset={handleReset} onDownload={handleDownload}
          downloadLabel={t(lang, 'upscale.download')} extraInfo={`${getModelInfo(modelSize).label} · ${scale}${actualBackend === 'gpu' ? ' · GPU' : ' · Wasm'}`} />
      )}
    </ToolLayout>
  )
}
