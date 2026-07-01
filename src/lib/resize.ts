/**
 * 图片缩放/裁剪 - 纯浏览器端
 */

import { canvasToBlob, loadImage } from './utils'

export interface ResizeOptions {
  width: number
  height: number
  maintainAspectRatio: boolean
  format?: string
  quality?: number
}

export interface CropOptions {
  x: number
  y: number
  width: number
  height: number
}

export async function resizeImage(
  file: File,
  options: ResizeOptions
): Promise<Blob> {
  const url = URL.createObjectURL(file)
  const img = await loadImage(url)
  URL.revokeObjectURL(url)

  let targetW = options.width
  let targetH = options.height

  if (options.maintainAspectRatio) {
    const ratio = Math.min(targetW / img.width, targetH / img.height)
    targetW = Math.round(img.width * ratio)
    targetH = Math.round(img.height * ratio)
  }

  const canvas = document.createElement('canvas')
  canvas.width = targetW
  canvas.height = targetH
  const ctx = canvas.getContext('2d')!
  ctx.drawImage(img, 0, 0, targetW, targetH)

  const format = options.format || file.type
  return canvasToBlob(canvas, format, options.quality ?? 0.92)
}

export async function cropImage(
  file: File,
  crop: CropOptions,
  format?: string
): Promise<Blob> {
  const url = URL.createObjectURL(file)
  const img = await loadImage(url)
  URL.revokeObjectURL(url)

  const canvas = document.createElement('canvas')
  canvas.width = crop.width
  canvas.height = crop.height
  const ctx = canvas.getContext('2d')!
  ctx.drawImage(img, crop.x, crop.y, crop.width, crop.height, 0, 0, crop.width, crop.height)

  return canvasToBlob(canvas, format || file.type, 0.92)
}
