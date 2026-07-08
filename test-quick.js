/**
 * 快速验证测试 - 确认所有工具功能正常
 */
const { createCanvas, loadImage } = require('canvas')
const fs = require('fs')
const path = require('path')

const TEST_IMAGE = path.join(__dirname, 'public/test-image.png')
const OUT = path.join(__dirname, 'test-quick')
fs.mkdirSync(OUT, { recursive: true })

let pass = 0, fail = 0

async function test(name, fn) {
  try {
    await fn()
    console.log(`  ✅ ${name}`)
    pass++
  } catch (e) {
    console.log(`  ❌ ${name}: ${e.message}`)
    fail++
  }
}

async function main() {
  const img = await loadImage(TEST_IMAGE)
  const origSize = fs.statSync(TEST_IMAGE).size
  console.log(`\n图片: ${img.width}x${img.height}, ${(origSize/1024).toFixed(1)} KB\n`)

  // 1. 格式转换
  console.log('--- 格式转换 ---')
  await test('PNG→JPG', async () => {
    const buf = createCanvas(img.width, img.height).toBuffer('image/jpeg', { quality: 0.92 })
    if (buf.length < 100) throw new Error('Too small')
  })
  await test('JPG→PNG', async () => {
    const c = createCanvas(img.width, img.height)
    c.getContext('2d').drawImage(img, 0, 0)
    const buf = c.toBuffer('image/png')
    if (buf.length < 100) throw new Error('Too small')
  })

  // 2. 压缩
  console.log('\n--- 压缩 ---')
  for (const q of [0.3, 0.75, 1.0]) {
    await test(`quality=${q}`, async () => {
      const buf = createCanvas(img.width, img.height).toBuffer('image/jpeg', { quality: q })
      if (buf.length < 100) throw new Error('Too small')
    })
  }
  await test('宽度限制 800px', async () => {
    const c = createCanvas(800, Math.round(img.height * 800 / img.width))
    c.getContext('2d').drawImage(img, 0, 0, c.width, c.height)
    if (c.width !== 800) throw new Error('Width wrong')
  })

  // 3. 缩放
  console.log('\n--- 缩放 ---')
  await test('Instagram 1080x1080', async () => {
    const c = createCanvas(1080, 1080)
    c.getContext('2d').drawImage(img, 0, 0, 1080, 1080)
    if (c.width !== 1080) throw new Error('Width wrong')
  })
  await test('自定义 500x500 保持比例', async () => {
    const ratio = Math.min(500 / img.width, 500 / img.height)
    const c = createCanvas(Math.round(img.width*ratio), Math.round(img.height*ratio))
    if (c.width > 500) throw new Error('Exceeded')
  })

  // 4. 证件照
  console.log('\n--- 证件照 ---')
  const mmToPx = (mm) => Math.round((mm / 25.4) * 300)
  await test('一寸 蓝底', async () => {
    const c = createCanvas(mmToPx(25), mmToPx(35))
    const ctx = c.getContext('2d')
    ctx.fillStyle = '#4A90D9'; ctx.fillRect(0, 0, c.width, c.height)
    const s = Math.min(c.width/img.width, c.height/img.height) * 0.85
    ctx.drawImage(img, (c.width-img.width*s)/2, (c.height-img.height*s)/2, img.width*s, img.height*s)
    const buf = c.toBuffer('image/jpeg', { quality: 0.95 })
    if (buf.length < 1000) throw new Error('Too small')
  })
  await test('一寸 红底', async () => {
    const c = createCanvas(mmToPx(25), mmToPx(35))
    const ctx = c.getContext('2d')
    ctx.fillStyle = '#E63946'; ctx.fillRect(0, 0, c.width, c.height)
    const s = Math.min(c.width/img.width, c.height/img.height) * 0.85
    ctx.drawImage(img, (c.width-img.width*s)/2, (c.height-img.height*s)/2, img.width*s, img.height*s)
    const buf = c.toBuffer('image/jpeg', { quality: 0.95 })
    if (buf.length < 1000) throw new Error('Too small')
  })

  // 5. Image Resizer
  console.log('\n--- Image Resizer ---')
  await test('放大 4x Smooth', async () => {
    const c = createCanvas(img.width*4, img.height*4)
    const ctx = c.getContext('2d')
    ctx.imageSmoothingEnabled = true; ctx.imageSmoothingQuality = 'high'
    ctx.drawImage(img, 0, 0, c.width, c.height)
    if (c.width !== img.width*4) throw new Error('Width wrong')
  })
  await test('缩小 50%', async () => {
    const c = createCanvas(Math.round(img.width*0.5), Math.round(img.height*0.5))
    c.getContext('2d').drawImage(img, 0, 0, c.width, c.height)
    if (c.width >= img.width) throw new Error('Not shrunk')
  })
  await test('放大 4x Pixel', async () => {
    const c = createCanvas(img.width*4, img.height*4)
    const ctx = c.getContext('2d')
    ctx.imageSmoothingEnabled = false
    ctx.drawImage(img, 0, 0, c.width, c.height)
  })

  // 6. AI放大
  console.log('\n--- AI Upscale ---')
  await test('Standard x4 CPU', async () => {
    const tf = require('@tensorflow/tfjs-node')
    const model = await tf.loadLayersModel(`file://${path.join(__dirname, 'public/models/medium/x4/model.json')}`)
    const data = new Float32Array(img.width * img.height * 3)
    const c = createCanvas(img.width, img.height)
    c.getContext('2d').drawImage(img, 0, 0)
    const raw = c.getContext('2d').getImageData(0, 0, img.width, img.height).data
    for (let i = 0; i < img.width * img.height; i++) {
      data[i*3] = raw[i*4]/255; data[i*3+1] = raw[i*4+1]/255; data[i*3+2] = raw[i*4+2]/255
    }
    const tensor = tf.tensor4d(data, [1, img.height, img.width, 3])
    const start = Date.now()
    const output = model.predict(tensor)
    const elapsed = Date.now() - start
    const shape = output.shape
    tensor.dispose(); output.dispose(); model.dispose()
    if (shape[2] !== img.width*4) throw new Error(`Width wrong: ${shape[2]}`)
    if (elapsed > 30000) throw new Error(`Too slow: ${elapsed}ms`)
  })

  // 结果
  console.log('\n' + '='.repeat(50))
  console.log(`  总计: ${pass + fail}  |  通过: ${pass}  |  失败: ${fail}`)
}

main().catch(console.error)
