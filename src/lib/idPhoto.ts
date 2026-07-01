/**
 * 证件照制作 - 纯浏览器端
 */

import { canvasToBlob, loadImage } from './utils'

export interface IDPhotoSpec {
  name: string
  width: number  // mm
  height: number // mm
  dpi: number
  description: string
}

export const ID_PHOTO_SPECS: IDPhotoSpec[] = [
  { name: '1 inch (China)', width: 25, height: 35, dpi: 300, description: 'China standard 1 inch (25mm×35mm)' },
  { name: '2 inch (China)', width: 35, height: 49, dpi: 300, description: 'China standard 2 inch (35mm×49mm)' },
  { name: 'Small 1 inch', width: 22, height: 32, dpi: 300, description: 'China small 1 inch (22mm×32mm)' },
  { name: 'Large 1 inch', width: 33, height: 48, dpi: 300, description: 'China large 1 inch (33mm×48mm)' },
  { name: 'US Visa', width: 51, height: 51, dpi: 300, description: 'US Visa (51mm×51mm)' },
  { name: 'EU Visa', width: 35, height: 45, dpi: 300, description: 'EU Visa (35mm×45mm)' },
  { name: 'Japan Visa', width: 45, height: 45, dpi: 300, description: 'Japan Visa (45mm×45mm)' },
]

export const BG_COLORS = [
  { name: 'White', value: '#FFFFFF' },
  { name: 'Blue', value: '#4A90D9' },
  { name: 'Red', value: '#E63946' },
  { name: 'Gray', value: '#D3D3D3' },
]

function mmToPixels(mm: number, dpi: number): number {
  return Math.round((mm / 25.4) * dpi)
}

export async function makeIDPhoto(
  file: File,
  spec: IDPhotoSpec,
  bgColor: string
): Promise<Blob> {
  const url = URL.createObjectURL(file)
  const img = await loadImage(url)
  URL.revokeObjectURL(url)

  const targetW = mmToPixels(spec.width, spec.dpi)
  const targetH = mmToPixels(spec.height, spec.dpi)

  // 计算缩放，使人物完整居中
  const scale = Math.min(targetW / img.width, targetH / img.height) * 0.85
  const drawW = Math.round(img.width * scale)
  const drawH = Math.round(img.height * scale)
  const offsetX = Math.round((targetW - drawW) / 2)
  const offsetY = Math.round((targetH - drawH) / 2)

  const canvas = document.createElement('canvas')
  canvas.width = targetW
  canvas.height = targetH
  const ctx = canvas.getContext('2d')!

  // 填充背景色
  ctx.fillStyle = bgColor
  ctx.fillRect(0, 0, targetW, targetH)

  // 绘制人物
  ctx.drawImage(img, offsetX, offsetY, drawW, drawH)

  return canvasToBlob(canvas, 'image/jpeg', 0.95)
}
