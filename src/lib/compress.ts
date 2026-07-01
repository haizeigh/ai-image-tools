/**
 * 图片压缩 - 纯浏览器端处理
 */

import { canvasToBlob, loadImage } from './utils'

export interface CompressOptions {
  maxWidth?: number
  maxHeight?: number
  quality: number // 0-1
  format?: string
}

export async function compressImage(
  file: File,
  options: CompressOptions
): Promise<Blob> {
  const url = URL.createObjectURL(file)
  const img = await loadImage(url)
  URL.revokeObjectURL(url)

  let { width, height } = img

  if (options.maxWidth && width > options.maxWidth) {
    height = Math.round(height * (options.maxWidth / width))
    width = options.maxWidth
  }
  if (options.maxHeight && height > options.maxHeight) {
    width = Math.round(width * (options.maxHeight / height))
    height = options.maxHeight
  }

  const canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height
  const ctx = canvas.getContext('2d')!
  ctx.drawImage(img, 0, 0, width, height)

  const format = options.format || file.type
  return canvasToBlob(canvas, format, options.quality)
}
