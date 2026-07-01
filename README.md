# AI Image Tools

Free online AI image processing tools. All processing runs in your browser — nothing is uploaded to any server.

## Tools

| Tool | Description | Technology |
|------|-------------|-----------|
| **Remove Background** | Remove image background in one click | @imgly/background-removal (Wasm) |
| **Compress Image** | Reduce JPG/PNG/WebP file size | Canvas API |
| **Convert Format** | Convert between JPG/PNG/WebP/GIF/BMP | Canvas API |
| **Resize & Crop** | Resize to any dimension, social media presets | Canvas API |
| **ID Photo Maker** | Passport, visa, and standard ID photos | Canvas API |
| **AI Image Upscaler** | 4x super-resolution with Real-ESRGAN neural network | TensorFlow.js + ESRGAN |

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **Icons**: Lucide React
- **AI Background Removal**: @imgly/background-removal (browser Wasm)
- **AI Upscaling**: TensorFlow.js + Real-ESRGAN (browser, offline)
- **Image Processing**: Canvas API (browser only)

## Development

```bash
npm install
npm run dev      # http://localhost:3000
npm run build
npm start
```

## Project Structure

```
src/
├── app/
│   ├── layout.tsx          # Global layout + SEO meta
│   ├── page.tsx            # Home page (tool card grid)
│   ├── globals.css         # Global styles
│   └── tools/
│       ├── remove-bg/      # AI background removal
│       ├── compress/       # Image compression
│       ├── format-convert/ # Format conversion
│       ├── resize/         # Resize & crop
│       ├── id-photo/       # ID photo maker
│       └── upscale/        # AI image upscaler (Real-ESRGAN)
├── components/
│   ├── ImageUploader.tsx   # Drag & drop upload
│   ├── ImagePreview.tsx    # Preview + download
│   ├── ToolLayout.tsx      # Tool page layout
│   └── ProcessingOverlay.tsx # Processing spinner
└── lib/
    ├── utils.ts            # Utility functions
    ├── compress.ts         # Compression logic
    ├── formatConvert.ts    # Format conversion logic
    ├── resize.ts           # Resize logic
    └── idPhoto.ts          # ID photo logic
```

## Models

AI models are bundled with the website under `public/models/`:

| Model | Size | Description |
|-------|------|-------------|
| Slim | 3.8 MB | Fast, good quality (default) |
| Medium | 12 MB | Balanced speed & quality |
| Thick | 112 MB | Best quality, slower |

Models load once and are cached by the browser for offline use.

## Deployment

Recommended: deploy to Vercel (free tier):

```bash
npx vercel --prod
```

## Privacy

All image processing happens entirely in your browser. **Files never leave your device.** Once you close the page, everything is gone.
