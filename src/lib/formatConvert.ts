/**
 * 图片格式转换 - 纯浏览器端
 */

import { canvasToBlob, loadImage, getMimeType } from './utils'

export async function convertFormat(
  file: File,
  targetFormat: string
): Promise<Blob> {
  const url = URL.createObjectURL(file)
  const img = await loadImage(url)
  URL.revokeObjectURL(url)

  const canvas = document.createElement('canvas')
  canvas.width = img.width
  canvas.height = img.height
  const ctx = canvas.getContext('2d')!
  ctx.drawImage(img, 0, 0)

  const mimeType = getMimeType(targetFormat)
  const quality = targetFormat === 'jpeg' || targetFormat === 'jpg' ? 0.92 : undefined
  return canvasToBlob(canvas, mimeType, quality)
}
