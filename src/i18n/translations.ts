import { LangCode } from './languages'

type DeepDict = {
  [key: string]: string | string[] | DeepDict | { label: string; desc: string }[]
}

const translations: Record<string, DeepDict> = {
  // ========== ENGLISH (base) ==========
  en: {
    site: { title: 'AI Image Tools', tagline: 'Free Online AI Image Processing' },
    nav: { back: 'Back to Home', tools: 'Tools', features: 'Features' },
    hero: {
      badge: 'Runs in your browser \u00b7 Nothing is uploaded',
      heading: 'Free Online AI Image Tools',
      sub: 'Remove backgrounds, compress images, convert formats, make ID photos, upscale with AI',
      sub2: 'All tools run locally in your browser \u2014 your privacy is guaranteed',
      highlight1: '100% browser-side processing',
      highlight2: 'Files never leave your device',
      highlight3: 'No account or sign-up needed',
    },
    section: { choose: 'Choose a Tool', why: 'Why Choose Us' },
    features: {
      privacy: { title: 'Privacy First', desc: 'All processing happens in your browser. Files never leave your device.' },
      fast: { title: 'Fast & Efficient', desc: 'Powered by WebAssembly and Canvas \u2014 results in seconds.' },
      free: { title: 'Completely Free', desc: 'No sign-up, no limits, no file size caps. Use as much as you want.' },
    },
    popular: 'Popular',
    footer: 'AI Image Tools \u00b7 All tools are free to use',
    toolFooter: 'AI Image Tools \u00b7 All processing runs in your browser \u2014 files never leave your device',
    uploader: {
      hint: 'Click or drag an image here',
      support: 'Supports JPG, PNG, WebP \u00b7 Max {size}MB',
      errorType: 'Please select an image file',
      errorSize: 'File size must not exceed {size}MB',
    },
    preview: {
      reset: 'Reset',
      download: 'Download',
      original: 'Original',
      compressed: 'Compressed',
      reduced: 'Reduced by {percent}%',
    },
    processing: { default: 'Processing...' },
    removeBg: {
      title: 'Remove Background',
      desc: 'Remove image background in one click. Works great for portraits, products, animals, and more. All processing runs locally in your browser \u2014 nothing is uploaded to any server.',
      btn: 'Remove Background',
      processing: 'Removing background...',
      download: 'Download PNG (Transparent)',
    },
    compress: {
      title: 'Compress Image',
      desc: 'Reduce JPG, PNG, and WebP file sizes while maintaining acceptable quality. All processing runs locally in your browser.',
      quality: 'Quality',
      maxWidth: 'Max Width',
      noLimit: 'No limit',
      btn: 'Compress',
      processing: 'Compressing...',
      presets: [
        { label: 'Best Quality', desc: 'Larger file, lossless quality' },
        { label: 'Good', desc: 'Recommended balance' },
        { label: 'Medium', desc: 'Smaller file' },
        { label: 'Max Compression', desc: 'Smallest file, some quality loss' },
      ],
    },
    formatConvert: {
      title: 'Convert Image Format',
      desc: 'Convert images between JPG, PNG, WebP formats instantly. All processing runs locally in your browser.',
      label: 'Convert to:',
      current: 'Current format:',
      btn: 'Convert to {format}',
      processing: 'Converting...',
      download: 'Download .{ext}',
      formats: [
        { label: 'PNG', desc: 'Lossless, supports transparency' },
        { label: 'JPEG', desc: 'Lossy, small file size' },
        { label: 'WebP', desc: 'Modern format, high compression' },
      ],
    },
    resize: {
      title: 'Resize & Crop Image',
      desc: 'Resize images to any dimension or use presets for popular social media platforms. All processing runs locally in your browser.',
      presetsLabel: 'Preset Dimensions',
      width: 'Width (px)',
      height: 'Height (px)',
      maintain: 'Maintain aspect ratio',
      original: 'Original:',
      btn: 'Resize to {w} \u00d7 {h}',
      processing: 'Resizing...',
      presets: [
        'Instagram Square', 'Twitter Card', 'YouTube Thumbnail',
        'LinkedIn Cover', 'Facebook Cover', '4K Wallpaper',
      ],
    },
    idPhoto: {
      title: 'ID Photo Maker',
      desc: 'Create standard ID photos for passports, visas, and official documents. Supports multiple sizes and background colors. All processing runs locally in your browser.',
      sizeLabel: 'Photo Size',
      bgLabel: 'Background Color',
      btn: 'Create {name} Photo',
      processing: 'Creating ID photo...',
    },
    upscale: {
      title: 'AI Image Upscaler',
      desc: 'Upscale images 2x to 8x with Real-ESRGAN neural network \u2014 intelligently adds detail instead of just blurring. All processing runs locally in your browser, fully offline.',
      modelLabel: 'Select AI Model',
      scaleLabel: 'Upscale Factor',
      modelHint: 'Model files are bundled with the website. First load caches them in your browser for offline use.',
      loadBtn: 'Load {label} AI Model ({size})',
      loading: 'Loading model...',
      loaded: '\u2713 {label} AI model loaded \u2014 ready for offline use',
      upscaleBtn: 'Upscale {scale} with AI',
      processing: 'AI upscaling ({label} model, {scale})...',
      download: 'Download PNG (AI Upscaled)',
      fail: 'Model loading failed. Please refresh and try again.',
      backendLabel: 'Processing Engine',
      backendWasmDesc: 'Fast CPU (Wasm), works everywhere',
      backendGpuDesc: 'Faster, requires GPU support',
      gpuAvailable: '\u2713 GPU detected \u2014 using GPU acceleration',
      wasmAvailable: '\u2713 Wasm backend ready \u2014 fast CPU inference',
      wasmFallback: '\u26a0 GPU unavailable \u2014 using Wasm backend',
      gpuUnavailable: '\u26a0 GPU not available on this device \u2014 using Wasm',
      gpuFallback: '\u26a0 GPU inference failed \u2014 switched to Wasm',
      models: {
        slim: { label: 'Light', size: '3.8 MB', desc: 'Fast, good quality' },
        medium: { label: 'Standard', size: '12 MB', desc: 'Balanced speed & quality' },
      },
    },
    enlarge: {
      title: 'Image Resizer',
      desc: 'Enlarge images 2x to 10x or shrink to any percentage using Canvas interpolation. Fast and works instantly \u2014 no AI model needed. All processing runs locally in your browser.',
      modeLabel: 'Mode',
      modeEnlarge: 'Enlarge',
      modeShrink: 'Shrink',
      scaleLabel: 'Enlarge Factor',
      shrinkLabel: 'Shrink To',
      algLabel: 'Algorithm',
      algSmooth: 'Smooth (Bicubic)',
      algPixel: 'Pixel (Nearest Neighbor)',
      originalSize: 'Original',
      btnEnlarge: 'Enlarge {scale}',
      btnShrink: 'Shrink to {scale}',
      processing: 'Processing...',
      download: 'Download PNG',
    },

    ocr: {
      title: 'Image to Text (OCR)',
      desc: 'Extract text from images using AI-powered OCR. Supports 20+ languages. All processing runs locally in your browser \u2014 nothing is uploaded.',
      btn: 'Extract Text',
      processing: 'Recognizing text...',
      langLabel: 'Language',
      langHint: 'Select the language of the text in your image for best accuracy.',
      resultLabel: 'Extracted Text',
      copy: 'Copy',
      copied: 'Copied!',
      downloadTxt: 'Download .txt',
      placeholder: 'Extracted text will appear here...',
      charCount: '{count} characters',
    },
  },
}

// ========== SPANISH ==========
translations.es = deepClone(translations.en)
Object.assign(translations.es, {
  site: { title: 'AI Image Tools', tagline: 'Procesamiento de Im\u00e1genes con IA Gratuito' },
  nav: { back: 'Volver al Inicio', tools: 'Herramientas', features: 'Caracter\u00edsticas' },
  hero: {
    badge: 'Funciona en tu navegador \u00b7 Nada se sube',
    heading: 'Herramientas de Imagen con IA Gratuitas',
    sub: 'Elimina fondos, comprime im\u00e1genes, convierte formatos, crea fotos carnet, mejora con IA',
    sub2: 'Todas las herramientas funcionan localmente en tu navegador \u2014 tu privacidad est\u00e1 garantizada',
  },
  section: { choose: 'Elige una Herramienta', why: 'Por Qu\u00e9 Elegirnos' },
  features: {
    privacy: { title: 'Privacidad Primero', desc: 'Todo el procesamiento ocurre en tu navegador. Los archivos nunca salen de tu dispositivo.' },
    fast: { title: 'R\u00e1pido y Eficiente', desc: 'Impulsado por WebAssembly y Canvas \u2014 resultados en segundos.' },
    free: { title: 'Completamente Gratis', desc: 'Sin registro, sin l\u00edmites, sin restricciones de tama\u00f1o.' },
  },
  popular: 'Popular',
  footer: 'AI Image Tools \u00b7 Todas las herramientas son gratuitas',
  toolFooter: 'AI Image Tools \u00b7 Todo el procesamiento ocurre en tu navegador',
  uploader: {
    hint: 'Haz clic o arrastra una imagen aqu\u00ed',
    support: 'Soporta JPG, PNG, WebP \u00b7 M\u00e1x. {size}MB',
    errorType: 'Selecciona un archivo de imagen',
    errorSize: 'El tama\u00f1o no debe exceder {size}MB',
  },
  preview: { reset: 'Reiniciar', download: 'Descargar', original: 'Original', compressed: 'Comprimido', reduced: 'Reducido {percent}%' },
  processing: { default: 'Procesando...' },
  removeBg: {
    title: 'Eliminar Fondo',
    desc: 'Elimina el fondo de im\u00e1genes en un clic. Funciona para retratos, productos, animales y m\u00e1s. Todo en tu navegador.',
    btn: 'Eliminar Fondo',
    processing: 'Eliminando fondo...',
    download: 'Descargar PNG (Transparente)',
  },
  compress: {
    title: 'Comprimir Imagen',
    desc: 'Reduce el tama\u00f1o de JPG, PNG y WebP manteniendo una calidad aceptable.',
    quality: 'Calidad', maxWidth: 'Ancho M\u00e1ximo', noLimit: 'Sin l\u00edmite',
    btn: 'Comprimir', processing: 'Comprimiendo...',
    presets: [
      { label: 'Mejor Calidad', desc: 'Archivo grande, calidad sin p\u00e9rdida' },
      { label: 'Buena', desc: 'Equilibrio recomendado' },
      { label: 'Media', desc: 'Archivo m\u00e1s peque\u00f1o' },
      { label: 'M\u00e1x. Compresi\u00f3n', desc: 'Archivo m\u00ednimo, algo de p\u00e9rdida' },
    ],
  },
  formatConvert: {
    title: 'Convertir Formato',
    desc: 'Convierte im\u00e1genes entre JPG, PNG, WebP al instante.',
    label: 'Convertir a:', current: 'Formato actual:',
    btn: 'Convertir a {format}', processing: 'Convirtiendo...', download: 'Descargar .{ext}',
    formats: [
      { label: 'PNG', desc: 'Sin p\u00e9rdida, soporta transparencia' },
      { label: 'JPEG', desc: 'Con p\u00e9rdida, archivo peque\u00f1o' },
      { label: 'WebP', desc: 'Formato moderno, alta compresi\u00f3n' },
    ],
  },
  resize: {
    title: 'Redimensionar y Recortar',
    desc: 'Redimensiona im\u00e1genes a cualquier dimensi\u00f3n o usa ajustes predefinidos.',
    presetsLabel: 'Dimensiones Predefinidas', width: 'Ancho (px)', height: 'Alto (px)',
    maintain: 'Mantener relaci\u00f3n de aspecto', original: 'Original:',
    btn: 'Redimensionar a {w} \u00d7 {h}', processing: 'Redimensionando...',
    presets: ['Instagram Cuadrado', 'Twitter Tarjeta', 'YouTube Miniatura', 'LinkedIn Portada', 'Facebook Portada', '4K Fondo'],
  },
  idPhoto: {
    title: 'Creador de Fotos Carnet',
    desc: 'Crea fotos carnet para pasaportes, visados y documentos oficiales.',
    sizeLabel: 'Tama\u00f1o de Foto', bgLabel: 'Color de Fondo',
    btn: 'Crear Foto {name}', processing: 'Creando foto carnet...',
  },
  upscale: {
    title: 'Mejorar Imagen con IA',
    desc: 'Ampl\u00eda im\u00e1genes de 2x a 8x con la red neuronal Real-ESRGAN.',
    modelLabel: 'Seleccionar Modelo de IA', scaleLabel: 'Factor de Ampliaci\u00f3n',
    modelHint: 'Los modelos est\u00e1n incluidos en el sitio web.',
    loadBtn: 'Cargar Modelo {label} ({size})', loading: 'Cargando modelo...',
    loaded: '\u2713 Modelo {label} cargado \u2014 listo para usar sin conexi\u00f3n',
    upscaleBtn: 'Ampliar {scale} con IA',
    processing: 'Ampliando con IA (modelo {label}, {scale})...',
    download: 'Descargar PNG (Mejorado con IA)',
    fail: 'Error al cargar el modelo. Actualiza e int\u00e9ntalo de nuevo.',
    backendLabel: 'Motor de Procesamiento', backendWasmDesc: 'CPU r\u00e1pido (Wasm), funciona en todas partes',
    backendGpuDesc: 'M\u00e1s r\u00e1pido, requiere GPU',
    gpuAvailable: '\u2713 GPU detectada \u2014 usando aceleraci\u00f3n GPU',
      wasmAvailable: '\u2713 Wasm listo \u2014 inferencia CPU r\u00e1pida',
      wasmFallback: '\u26a0 GPU no disponible \u2014 usando Wasm',
    gpuUnavailable: '\u26a0 GPU no disponible \u2014 usando Wasm',
    gpuFallback: '\u26a0 Inferencia GPU fall\u00f3 \u2014 cambio a Wasm',
    models: {
      slim: { label: 'Ligero', size: '3.8 MB', desc: 'R\u00e1pido, buena calidad' },
      medium: { label: 'Est\u00e1ndar', size: '12 MB', desc: 'Equilibrio velocidad/calidad' },
    },
  },
  enlarge: {
    title: 'Ampliador de Im\u00e1genes',
    desc: 'Ampl\u00eda im\u00e1genes de 2x a 10x con interpolaci\u00f3n Canvas. R\u00e1pido e instant\u00e1neo.',
    scaleLabel: 'Factor de Ampliaci\u00f3n', algLabel: 'Algoritmo',
    algSmooth: 'Suave (Bic\u00fabico)', algPixel: 'Pixel (Vecino m\u00e1s cercano)',
    originalSize: 'Original', btn: 'Ampliar {scale}',
    processing: 'Ampliando...', download: 'Descargar PNG',
  },
})

// ========== FRENCH ==========
translations.fr = deepClone(translations.en)
Object.assign(translations.fr, {
  site: { title: 'AI Image Tools', tagline: 'Traitement d\u2019Images IA Gratuit' },
  nav: { back: 'Retour \u00e0 l\u2019Accueil', tools: 'Outils', features: 'Fonctionnalit\u00e9s' },
  hero: {
    badge: 'Fonctionne dans votre navigateur \u00b7 Rien n\u2019est t\u00e9l\u00e9charg\u00e9',
    heading: 'Outils d\u2019Image IA Gratuits',
    sub: 'Supprimez les fonds, compressez, convertissez, cr\u00e9ez des photos d\u2019identit\u00e9, am\u00e9liorez avec l\u2019IA',
    sub2: 'Tous les outils fonctionnent localement dans votre navigateur \u2014 votre vie priv\u00e9e est garantie',
  },
  section: { choose: 'Choisissez un Outil', why: 'Pourquoi Nous Choisir' },
  features: {
    privacy: { title: 'Confidentialit\u00e9', desc: 'Tout le traitement se fait dans votre navigateur. Les fichiers ne quittent jamais votre appareil.' },
    fast: { title: 'Rapide & Efficace', desc: 'Propuls\u00e9 par WebAssembly et Canvas \u2014 r\u00e9sultats en secondes.' },
    free: { title: 'Enti\u00e8rement Gratuit', desc: 'Sans inscription, sans limites, sans restriction de taille.' },
  },
  popular: 'Populaire',
  footer: 'AI Image Tools \u00b7 Tous les outils sont gratuits',
  toolFooter: 'AI Image Tools \u00b7 Tout le traitement se fait dans votre navigateur',
  uploader: {
    hint: 'Cliquez ou glissez une image ici',
    support: 'Prend en charge JPG, PNG, WebP \u00b7 Max {size}Mo',
    errorType: 'Veuillez s\u00e9lectionner une image',
    errorSize: 'La taille ne doit pas d\u00e9passer {size}Mo',
  },
  preview: { reset: 'R\u00e9initialiser', download: 'T\u00e9l\u00e9charger', original: 'Original', compressed: 'Comprim\u00e9', reduced: 'R\u00e9duit de {percent}%' },
  processing: { default: 'Traitement...' },
  removeBg: {
    title: 'Supprimer le Fond',
    desc: 'Supprimez le fond d\u2019une image en un clic. Fonctionne pour les portraits, produits, animaux, etc.',
    btn: 'Supprimer le Fond', processing: 'Suppression du fond...',
    download: 'T\u00e9l\u00e9charger PNG (Transparent)',
  },
  compress: {
    title: 'Compresser l\u2019Image',
    desc: 'R\u00e9duisez la taille des fichiers JPG, PNG et WebP tout en pr\u00e9servant la qualit\u00e9.',
    quality: 'Qualit\u00e9', maxWidth: 'Largeur Max', noLimit: 'Sans limite',
    btn: 'Compresser', processing: 'Compression...',
    presets: [
      { label: 'Meilleure Qualit\u00e9', desc: 'Fichier plus gros, qualit\u00e9 parfaite' },
      { label: 'Bonne', desc: '\u00c9quilibre recommand\u00e9' },
      { label: 'Moyenne', desc: 'Fichier plus petit' },
      { label: 'Max Compression', desc: 'Fichier minimal, perte visible' },
    ],
  },
  formatConvert: {
    title: 'Convertir le Format',
    desc: 'Convertissez instantan\u00e9ment entre JPG, PNG, WebP.',
    label: 'Convertir en:', current: 'Format actuel:',
    btn: 'Convertir en {format}', processing: 'Conversion...', download: 'T\u00e9l\u00e9charger .{ext}',
    formats: [
      { label: 'PNG', desc: 'Sans perte, transparence' },
      { label: 'JPEG', desc: 'Avec perte, fichier petit' },
      { label: 'WebP', desc: 'Format moderne, compression \u00e9lev\u00e9e' },
    ],
  },
  resize: {
    title: 'Redimensionner & Recadrer',
    desc: 'Redimensionnez les images ou utilisez des pr\u00e9r\u00e9glages pour les r\u00e9seaux sociaux.',
    presetsLabel: 'Dimensions Pr\u00e9r\u00e9gl\u00e9es', width: 'Largeur (px)', height: 'Hauteur (px)',
    maintain: 'Conserver le ratio', original: 'Original:',
    btn: 'Redimensionner \u00e0 {w} \u00d7 {h}', processing: 'Redimensionnement...',
    presets: ['Instagram Carr\u00e9', 'Twitter Carte', 'YouTube Miniature', 'LinkedIn Couverture', 'Facebook Couverture', '4K Fond'],
  },
  idPhoto: {
    title: 'Cr\u00e9ateur de Photo d\u2019Identit\u00e9',
    desc: 'Cr\u00e9ez des photos d\u2019identit\u00e9 pour passeports, visas et documents officiels.',
    sizeLabel: 'Taille de la Photo', bgLabel: 'Couleur de Fond',
    btn: 'Cr\u00e9er une Photo {name}', processing: 'Cr\u00e9ation de la photo...',
  },
  upscale: {
    title: 'Agrandissement par IA',
    desc: 'Agrandissez les images de 2x \u00e0 8x avec le r\u00e9seau neuronal Real-ESRGAN.',
    modelLabel: 'Choisir le Mod\u00e8le IA', scaleLabel: 'Facteur d\u2019Agrandissement',
    modelHint: 'Les mod\u00e8les sont inclus dans le site.',
    loadBtn: 'Charger le Mod\u00e8le {label} ({size})', loading: 'Chargement du mod\u00e8le...',
    loaded: '\u2713 Mod\u00e8le {label} charg\u00e9 \u2014 pr\u00eat pour utilisation hors ligne',
    upscaleBtn: 'Agrandir {scale} avec l\u2019IA',
    processing: 'Agrandissement IA (mod\u00e8le {label}, {scale})...',
    download: 'T\u00e9l\u00e9charger PNG (Am\u00e9lior\u00e9 par IA)',
    fail: '\u00c9chec du chargement. Actualisez et r\u00e9essayez.',
    backendLabel: 'Moteur de Traitement', backendWasmDesc: 'CPU rapide (Wasm), fonctionne partout',
    backendGpuDesc: 'Plus rapide, n\u00e9cessite GPU',
    gpuAvailable: '\u2713 GPU d\u00e9tect\u00e9 \u2014 acc\u00e9l\u00e9ration GPU activ\u00e9e',
      wasmAvailable: '\u2713 Wasm pr\u00eat \u2014 inf\u00e9rence CPU rapide',
      wasmFallback: '\u26a0 GPU indisponible \u2014 utilisation Wasm',
    gpuUnavailable: '\u26a0 GPU non disponible \u2014 utilisation Wasm',
    gpuFallback: '\u26a0 \u00c9chec GPU \u2014 bascule vers Wasm',
    models: {
      slim: { label: 'L\u00e9ger', size: '3.8 Mo', desc: 'Rapide, bonne qualit\u00e9' },
      medium: { label: 'Standard', size: '12 Mo', desc: '\u00c9quilibre vitesse/qualit\u00e9' },
    },
  },
  enlarge: {
    title: 'Agrandisseur d\u2019Images',
    desc: 'Agrandissez rapidement les images de 2x \u00e0 10x par interpolation Canvas. Rapide et instantan\u00e9.',
    scaleLabel: 'Facteur d\u2019Agrandissement', algLabel: 'Algorithme',
    algSmooth: 'Lisse (Bicubique)', algPixel: 'Pixel (Voisin le plus proche)',
    originalSize: 'Original', btn: 'Agrandir {scale}',
    processing: 'Agrandissement...', download: 'T\u00e9l\u00e9charger PNG',
  },
})

// ========== GERMAN ==========
translations.de = deepClone(translations.en)
Object.assign(translations.de, {
  site: { title: 'AI Image Tools', tagline: 'Kostenlose KI-Bildbearbeitung' },
  nav: { back: 'Zur\u00fcck zur Startseite', tools: 'Werkzeuge', features: 'Funktionen' },
  hero: {
    badge: 'L\u00e4uft in Ihrem Browser \u00b7 Nichts wird hochgeladen',
    heading: 'Kostenlose KI-Bildwerkzeuge',
    sub: 'Hintergr\u00fcnde entfernen, Bilder komprimieren, Formate konvertieren, Ausweise erstellen, mit KI verbessern',
    sub2: 'Alle Werkzeuge laufen lokal in Ihrem Browser \u2014 Ihre Privatsph\u00e4re ist gesch\u00fctzt',
  },
  section: { choose: 'W\u00e4hlen Sie ein Werkzeug', why: 'Warum Uns W\u00e4hlen' },
  features: {
    privacy: { title: 'Datenschutz', desc: 'Die gesamte Verarbeitung erfolgt in Ihrem Browser. Dateien verlassen nie Ihr Ger\u00e4t.' },
    fast: { title: 'Schnell & Effizient', desc: 'Angetrieben von WebAssembly und Canvas \u2014 Ergebnisse in Sekunden.' },
    free: { title: 'V\u00f6llig Kostenlos', desc: 'Keine Anmeldung, keine Grenzen, keine Dateigr\u00f6\u00dfenbeschr\u00e4nkung.' },
  },
  popular: 'Beliebt',
  footer: 'AI Image Tools \u00b7 Alle Werkzeuge sind kostenlos',
  toolFooter: 'AI Image Tools \u00b7 Verarbeitung l\u00e4uft in Ihrem Browser',
  uploader: {
    hint: 'Klicken oder ziehen Sie ein Bild hierher',
    support: 'Unterst\u00fctzt JPG, PNG, WebP \u00b7 Max. {size}MB',
    errorType: 'Bitte w\u00e4hlen Sie eine Bilddatei',
    errorSize: 'Dateigr\u00f6\u00dfe darf {size}MB nicht \u00fcberschreiten',
  },
  preview: { reset: 'Zur\u00fccksetzen', download: 'Herunterladen', original: 'Original', compressed: 'Komprimiert', reduced: 'Um {percent}% reduziert' },
  processing: { default: 'Verarbeitung...' },
  removeBg: {
    title: 'Hintergrund Entfernen',
    desc: 'Entfernen Sie den Bildhintergrund mit einem Klick.',
    btn: 'Hintergrund Entfernen', processing: 'Hintergrund wird entfernt...',
    download: 'PNG Herunterladen (Transparent)',
  },
  compress: {
    title: 'Bild Komprimieren',
    desc: 'Reduzieren Sie die Dateigr\u00f6\u00dfe von JPG, PNG und WebP bei guter Qualit\u00e4t.',
    quality: 'Qualit\u00e4t', maxWidth: 'Max. Breite', noLimit: 'Keine Grenze',
    btn: 'Komprimieren', processing: 'Komprimiere...',
    presets: [
      { label: 'Beste Qualit\u00e4t', desc: 'Gr\u00f6\u00dfere Datei, verlustfrei' },
      { label: 'Gut', desc: 'Empfohlener Ausgleich' },
      { label: 'Mittel', desc: 'Kleinere Datei' },
      { label: 'Max. Kompression', desc: 'Kleinste Datei, Qualit\u00e4tsverlust' },
    ],
  },
  formatConvert: {
    title: 'Format Konvertieren',
    desc: 'Konvertieren Sie Bilder zwischen JPG, PNG, WebP.',
    label: 'Konvertieren zu:', current: 'Aktuelles Format:',
    btn: 'Zu {format} Konvertieren', processing: 'Konvertiere...', download: '.{ext} Herunterladen',
    formats: [
      { label: 'PNG', desc: 'Verlustfrei, Transparenz' },
      { label: 'JPEG', desc: 'Verlustbehaftet, kleine Datei' },
      { label: 'WebP', desc: 'Modernes Format, hohe Kompression' },
    ],
  },
  resize: {
    title: 'Gr\u00f6\u00dfe \u00c4ndern & Zuschneiden',
    desc: '\u00c4ndern Sie die Bildgr\u00f6\u00dfe oder verwenden Sie Voreinstellungen.',
    presetsLabel: 'Voreingestellte Gr\u00f6\u00dfen', width: 'Breite (px)', height: 'H\u00f6he (px)',
    maintain: 'Seitenverh\u00e4ltnis beibehalten', original: 'Original:',
    btn: 'Auf {w} \u00d7 {h} \u00c4ndern', processing: 'Gr\u00f6\u00dfe \u00e4ndern...',
    presets: ['Instagram Quadrat', 'Twitter Karte', 'YouTube Thumbnail', 'LinkedIn Titel', 'Facebook Titel', '4K Hintergrund'],
  },
  idPhoto: {
    title: 'Passfoto-Ersteller',
    desc: 'Erstellen Sie Standard-Passfotos f\u00fcr P\u00e4sse, Visa und offizielle Dokumente.',
    sizeLabel: 'Foto-Gr\u00f6\u00dfe', bgLabel: 'Hintergrundfarbe',
    btn: '{name} Foto Erstellen', processing: 'Erstelle Passfoto...',
  },
  upscale: {
    title: 'KI-Bildverbesserung',
    desc: 'Vergr\u00f6\u00dfern Sie Bilder 2x bis 8x mit dem Real-ESRGAN neuronalen Netzwerk.',
    modelLabel: 'KI-Modell Ausw\u00e4hlen', scaleLabel: 'Vergr\u00f6\u00dferungsfaktor',
    modelHint: 'Modelle sind in der Website enthalten.',
    loadBtn: 'Modell {label} Laden ({size})', loading: 'Lade Modell...',
    loaded: '\u2713 Modell {label} geladen \u2014 offline bereit',
    upscaleBtn: '{scale} mit KI Vergr\u00f6\u00dfern',
    processing: 'KI-Vergr\u00f6\u00dferung (Modell {label}, {scale})...',
    download: 'PNG Herunterladen (KI-verbessert)',
    fail: 'Modell laden fehlgeschlagen. Bitte aktualisieren.',
    backendLabel: 'Verarbeitungs-Engine', backendWasmDesc: 'Schnelle CPU (Wasm), funktioniert \u00fcberall',
    backendGpuDesc: 'Schneller, erfordert GPU',
    gpuAvailable: '\u2713 GPU erkannt \u2014 GPU-Beschleunigung aktiv',
      wasmAvailable: '\u2713 Wasm bereit \u2014 schnelle CPU-Inferenz',
      wasmFallback: '\u26a0 GPU nicht verf\u00fcgbar \u2014 verwende Wasm',
    gpuUnavailable: '\u26a0 GPU nicht verf\u00fcgbar \u2014 verwende Wasm',
    gpuFallback: '\u26a0 GPU-Fehler \u2014 zu Wasm gewechselt',
    models: {
      slim: { label: 'Leicht', size: '3.8 MB', desc: 'Schnell, gute Qualit\u00e4t' },
      medium: { label: 'Standard', size: '12 MB', desc: 'Ausgewogen' },
    },
  },
  enlarge: {
    title: 'Bildvergr\u00f6\u00dferer',
    desc: 'Vergr\u00f6\u00dfern Sie Bilder schnell von 2x bis 10x mit Canvas-Interpolation.',
    scaleLabel: 'Vergr\u00f6\u00dferungsfaktor', algLabel: 'Algorithmus',
    algSmooth: 'Glatt (Bikubisch)', algPixel: 'Pixel (N\u00e4chster Nachbar)',
    originalSize: 'Original', btn: '{scale} Vergr\u00f6\u00dfern',
    processing: 'Vergr\u00f6\u00dfere...', download: 'PNG Herunterladen',
  },
})

// ========== JAPANESE ==========
translations.ja = deepClone(translations.en)
Object.assign(translations.ja, {
  site: { title: 'AI Image Tools', tagline: '\u7121\u6599\u30aa\u30f3\u30e9\u30a4\u30f3AI\u753b\u50cf\u51e6\u7406' },
  nav: { back: '\u30db\u30fc\u30e0\u306b\u623b\u308b', tools: '\u30c4\u30fc\u30eb', features: '\u7279\u5fb4' },
  hero: {
    badge: '\u30d6\u30e9\u30a6\u30b6\u3067\u52d5\u4f5c \u00b7 \u30a2\u30c3\u30d7\u30ed\u30fc\u30c9\u4e0d\u8981',
    heading: '\u7121\u6599\u30aa\u30f3\u30e9\u30a4\u30f3AI\u753b\u50cf\u30c4\u30fc\u30eb',
    sub: '\u80cc\u666f\u524a\u9664\u3001\u753b\u50cf\u5727\u7e2e\u3001\u5f62\u5f0f\u5909\u63db\u3001\u8a3c\u660e\u5199\u771f\u4f5c\u6210\u3001AI\u62e1\u5927',
    sub2: '\u3059\u3079\u3066\u306e\u30c4\u30fc\u30eb\u306f\u30d6\u30e9\u30a6\u30b6\u4e0a\u3067\u30ed\u30fc\u30ab\u30eb\u52d5\u4f5c \u2014 \u30d7\u30e9\u30a4\u30d0\u30b7\u30fc\u3092\u4fdd\u8b77',
  },
  section: { choose: '\u30c4\u30fc\u30eb\u3092\u9078\u3076', why: '\u9078\u3070\u308c\u308b\u7406\u7531' },
  features: {
    privacy: { title: '\u30d7\u30e9\u30a4\u30d0\u30b7\u30fc\u512a\u5148', desc: '\u3059\u3079\u3066\u306e\u51e6\u7406\u306f\u30d6\u30e9\u30a6\u30b6\u5185\u3067\u5b8c\u4e86\u3002\u30d5\u30a1\u30a4\u30eb\u304c\u7aef\u672b\u304b\u3089\u9001\u4fe1\u3055\u308c\u308b\u3053\u3068\u306f\u3042\u308a\u307e\u305b\u3093\u3002' },
    fast: { title: '\u9ad8\u901f\u30fb\u52b9\u7387\u7684', desc: 'WebAssembly\u3068Canvas\u3092\u63a1\u7528 \u2014 \u6570\u79d2\u3067\u7d50\u679c\u3092\u51fa\u529b\u3002' },
    free: { title: '\u5b8c\u5168\u7121\u6599', desc: '\u767b\u9332\u4e0d\u8981\u3001\u5236\u9650\u306a\u3057\u3001\u30d5\u30a1\u30a4\u30eb\u30b5\u30a4\u30ba\u5236\u9650\u306a\u3057\u3002' },
  },
  popular: '\u4eba\u6c17',
  footer: 'AI Image Tools \u00b7 \u3059\u3079\u3066\u306e\u30c4\u30fc\u30eb\u306f\u7121\u6599\u3067\u3059',
  toolFooter: 'AI Image Tools \u00b7 \u51e6\u7406\u306f\u30d6\u30e9\u30a6\u30b6\u4e0a\u3067\u30ed\u30fc\u30ab\u30eb\u5b9f\u884c',
  uploader: {
    hint: '\u30af\u30ea\u30c3\u30af\u307e\u305f\u306f\u753b\u50cf\u3092\u30c9\u30e9\u30c3\u30b0',
    support: '\u5bfe\u5fdc\u5f62\u5f0f: JPG, PNG, WebP \u00b7 \u6700\u5927{size}MB',
    errorType: '\u753b\u50cf\u30d5\u30a1\u30a4\u30eb\u3092\u9078\u629e\u3057\u3066\u304f\u3060\u3055\u3044',
    errorSize: '\u30d5\u30a1\u30a4\u30eb\u30b5\u30a4\u30ba\u306f{size}MB\u4ee5\u4e0b\u306b\u3057\u3066\u304f\u3060\u3055\u3044',
  },
  preview: { reset: '\u30ea\u30bb\u30c3\u30c8', download: '\u30c0\u30a6\u30f3\u30ed\u30fc\u30c9', original: '\u5143\u306e\u30b5\u30a4\u30ba', compressed: '\u5727\u7e2e\u5f8c', reduced: '{percent}%\u524a\u6e1b' },
  processing: { default: '\u51e6\u7406\u4e2d...' },
  removeBg: {
    title: '\u80cc\u666f\u524a\u9664',
    desc: '\u30ef\u30f3\u30af\u30ea\u30c3\u30af\u3067\u753b\u50cf\u306e\u80cc\u666f\u3092\u524a\u9664\u3002',
    btn: '\u80cc\u666f\u3092\u524a\u9664', processing: '\u80cc\u666f\u3092\u524a\u9664\u4e2d...',
    download: 'PNG\u3092\u30c0\u30a6\u30f3\u30ed\u30fc\u30c9 (\u900f\u660e)',
  },
  compress: {
    title: '\u753b\u50cf\u5727\u7e2e',
    desc: 'JPG\u3001PNG\u3001WebP\u306e\u30d5\u30a1\u30a4\u30eb\u30b5\u30a4\u30ba\u3092\u54c1\u8cea\u3092\u4fdd\u3063\u305f\u307e\u307e\u524a\u6e1b\u3002',
    quality: '\u54c1\u8cea', maxWidth: '\u6700\u5927\u5e45', noLimit: '\u5236\u9650\u306a\u3057',
    btn: '\u5727\u7e2e', processing: '\u5727\u7e2e\u4e2d...',
    presets: [
      { label: '\u6700\u9ad8\u54c1\u8cea', desc: '\u30d5\u30a1\u30a4\u30eb\u5927\u3001\u52a3\u5316\u306a\u3057' },
      { label: '\u826f\u597d', desc: '\u63a8\u5968\u30d0\u30e9\u30f3\u30b9' },
      { label: '\u4e2d\u7a0b\u5ea6', desc: '\u3088\u308a\u5c0f\u3055\u3044\u30d5\u30a1\u30a4\u30eb' },
      { label: '\u6700\u5927\u5727\u7e2e', desc: '\u6700\u5c0f\u30d5\u30a1\u30a4\u30eb\u3001\u753b\u8cea\u4f4e\u4e0b' },
    ],
  },
  formatConvert: {
    title: '\u5f62\u5f0f\u5909\u63db',
    desc: 'JPG\u3001PNG\u3001WebP\u9593\u3067\u77ac\u6642\u306b\u5909\u63db\u3002',
    label: '\u5909\u63db\u5148:', current: '\u73fe\u5728\u306e\u5f62\u5f0f:',
    btn: '{format}\u306b\u5909\u63db', processing: '\u5909\u63db\u4e2d...', download: '.{ext}\u3092\u30c0\u30a6\u30f3\u30ed\u30fc\u30c9',
    formats: [
      { label: 'PNG', desc: '\u53ef\u9006\u3001\u900f\u660e\u5ea6\u5bfe\u5fdc' },
      { label: 'JPEG', desc: '\u975e\u53ef\u9006\u3001\u30d5\u30a1\u30a4\u30eb\u5c0f' },
      { label: 'WebP', desc: '\u6700\u65b0\u5f62\u5f0f\u3001\u9ad8\u5727\u7e2e' },
    ],
  },
  resize: {
    title: '\u30ea\u30b5\u30a4\u30ba\uff06\u5207\u308a\u629c\u304d',
    desc: '\u753b\u50cf\u3092\u4efb\u610f\u306e\u30b5\u30a4\u30ba\u306b\u5909\u66f4\u3001\u307e\u305f\u306fSNS\u7528\u30d7\u30ea\u30bb\u30c3\u30c8\u3092\u4f7f\u7528\u3002',
    presetsLabel: '\u30d7\u30ea\u30bb\u30c3\u30c8\u5bf8\u6cd5', width: '\u5e45 (px)', height: '\u9ad8\u3055 (px)',
    maintain: '\u30a2\u30b9\u30da\u30af\u30c8\u6bd4\u3092\u7dad\u6301', original: '\u5143\u306e\u30b5\u30a4\u30ba:',
    btn: '{w} \u00d7 {h}\u306b\u30ea\u30b5\u30a4\u30ba', processing: '\u30ea\u30b5\u30a4\u30ba\u4e2d...',
    presets: ['Instagram \u6b63\u65b9\u5f62', 'Twitter \u30ab\u30fc\u30c9', 'YouTube \u30b5\u30e0\u30cd\u30a4\u30eb', 'LinkedIn \u30ab\u30d0\u30fc', 'Facebook \u30ab\u30d0\u30fc', '4K \u58c1\u7d19'],
  },
  idPhoto: {
    title: '\u8a3c\u660e\u5199\u771f\u4f5c\u6210',
    desc: '\u30d1\u30b9\u30dd\u30fc\u30c8\u3001\u30d3\u30b6\u3001\u516c\u5f0f\u66f8\u985e\u7528\u306e\u6a19\u6e96\u8a3c\u660e\u5199\u771f\u3092\u4f5c\u6210\u3002',
    sizeLabel: '\u5199\u771f\u30b5\u30a4\u30ba', bgLabel: '\u80cc\u666f\u8272',
    btn: '{name}\u306e\u5199\u771f\u3092\u4f5c\u6210', processing: '\u8a3c\u660e\u5199\u771f\u3092\u4f5c\u6210\u4e2d...',
  },
  upscale: {
    title: 'AI\u753b\u50cf\u62e1\u5927',
    desc: 'Real-ESRGAN\u30cb\u30e5\u30fc\u30e9\u30eb\u30cd\u30c3\u30c8\u30ef\u30fc\u30af\u3067\u753b\u50cf\u30922\u500d\uff5e8\u500d\u306b\u62e1\u5927\u3002',
    modelLabel: 'AI\u30e2\u30c7\u30eb\u3092\u9078\u629e', scaleLabel: '\u62e1\u5927\u500d\u7387',
    modelHint: '\u30e2\u30c7\u30eb\u30d5\u30a1\u30a4\u30eb\u306f\u30b5\u30a4\u30c8\u306b\u540c\u68b1\u3002',
    loadBtn: '{label}\u30e2\u30c7\u30eb\u3092\u8aad\u307f\u8fbc\u307f ({size})', loading: '\u30e2\u30c7\u30eb\u8aad\u307f\u8fbc\u307f\u4e2d...',
    loaded: '\u2713 {label}\u30e2\u30c7\u30eb\u8aad\u307f\u8fbc\u307f\u5b8c\u4e86 \u2014 \u30aa\u30d5\u30e9\u30a4\u30f3\u5229\u7528\u53ef\u80fd',
    upscaleBtn: 'AI\u3067{scale}\u306b\u62e1\u5927',
    processing: 'AI\u62e1\u5927\u4e2d ({label}\u30e2\u30c7\u30eb, {scale})...',
    download: 'PNG\u3092\u30c0\u30a6\u30f3\u30ed\u30fc\u30c9 (AI\u62e1\u5927)',
    fail: '\u30e2\u30c7\u30eb\u306e\u8aad\u307f\u8fbc\u307f\u306b\u5931\u6557\u3057\u307e\u3057\u305f\u3002\u66f4\u65b0\u3057\u3066\u3084\u308a\u76f4\u3057\u3066\u304f\u3060\u3055\u3044\u3002',
    backendLabel: '\u51e6\u7406\u30a8\u30f3\u30b8\u30f3', backendWasmDesc: '\u9ad8\u901fCPU (Wasm)\u3001\u3059\u3079\u3066\u306e\u74b0\u5883\u3067\u52d5\u4f5c',
    backendGpuDesc: '\u9ad8\u901f\u3001GPU\u5bfe\u5fdc\u304c\u5fc5\u8981',
    gpuAvailable: '\u2713 GPU\u691c\u51fa \u2014 GPU\u30a2\u30af\u30bb\u30e9\u30ec\u30fc\u30b7\u30e7\u30f3\u4f7f\u7528\u4e2d',
      wasmAvailable: '\u2713 Wasm\u6e96\u5099\u5b8c\u4e86 \u2014 \u9ad8\u901fCPU\u63a8\u8ad6',
      wasmFallback: '\u26a0 GPU\u5229\u7528\u4e0d\u53ef \u2014 Wasm\u3092\u4f7f\u7528',
    gpuUnavailable: '\u26a0 GPU\u5229\u7528\u4e0d\u53ef \u2014 CPU\u3092\u4f7f\u7528',
    gpuFallback: '\u26a0 GPU\u63a8\u8ad6\u5931\u6557 \u2014 Wasm\u306b\u5207\u66ff',
    models: {
      slim: { label: '\u8efd\u91cf', size: '3.8 MB', desc: '\u9ad8\u901f\u3001\u826f\u597d\u306a\u54c1\u8cea' },
      medium: { label: '\u6a19\u6e96', size: '12 MB', desc: '\u30d0\u30e9\u30f3\u30b9\u826f\u597d' },
    },
  },
  enlarge: {
    title: '\u753b\u50cf\u62e1\u5927',
    desc: 'Canvas\u88dc\u9593\u3067\u753b\u50cf\u30922\u500d\uff5e10\u500d\u306b\u62e1\u5927\u3002\u9ad8\u901f\u3067\u5373\u5ea7\u306b\u51e6\u7406\u3002',
    scaleLabel: '\u62e1\u5927\u500d\u7387', algLabel: '\u30a2\u30eb\u30b4\u30ea\u30ba\u30e0',
    algSmooth: '\u30b9\u30e0\u30fc\u30ba (\u30d0\u30a4\u30ad\u30e5\u30fc\u30d3\u30c3\u30af)', algPixel: '\u30d4\u30af\u30bb\u30eb (\u6700\u8fd1\u508d\u88dc\u9593)',
    originalSize: '\u5143\u306e\u30b5\u30a4\u30ba', btn: '{scale}\u306b\u62e1\u5927',
    processing: '\u62e1\u5927\u4e2d...', download: 'PNG\u3092\u30c0\u30a6\u30f3\u30ed\u30fc\u30c9',
  },
})

// ========== KOREAN ==========
translations.ko = deepClone(translations.en)
Object.assign(translations.ko, {
  site: { title: 'AI Image Tools', tagline: '\ubb34\ub8cc \uc628\ub77c\uc778 AI \uc774\ubbf8\uc9c0 \ucc98\ub9ac' },
  nav: { back: '\ud648\uc73c\ub85c \ub3cc\uc544\uac00\uae30', tools: '\ub3c4\uad6c', features: '\ud2b9\uc9d5' },
  hero: {
    badge: '\ube0c\ub77c\uc6b0\uc800\uc5d0\uc11c \uc2e4\ud589 \u00b7 \uc5c5\ub85c\ub4dc \uc5c6\uc74c',
    heading: '\ubb34\ub8cc \uc628\ub77c\uc778 AI \uc774\ubbf8\uc9c0 \ub3c4\uad6c',
    sub: '\ubc30\uacbd \uc81c\uac70, \uc774\ubbf8\uc9c0 \uc555\ucd95, \ud615\uc2dd \ubcc0\ud658, \uc99d\uba85\uc0ac\uc9c4 \uc81c\uc791, AI \ud655\ub300',
    sub2: '\ubaa8\ub4e0 \ub3c4\uad6c\ub294 \ube0c\ub77c\uc6b0\uc800\uc5d0\uc11c \ub85c\uceec \uc2e4\ud589 \u2014 \uac1c\uc778\uc815\ubcf4 \ubcf4\ud638',
  },
  section: { choose: '\ub3c4\uad6c \uc120\ud0dd', why: '\uc120\ud0dd\ud574\uc57c \ud558\ub294 \uc774\uc720' },
  features: {
    privacy: { title: '\uac1c\uc778\uc815\ubcf4 \ubcf4\ud638', desc: '\ubaa8\ub4e0 \ucc98\ub9ac\ub294 \ube0c\ub77c\uc6b0\uc800\uc5d0\uc11c \uc774\ub8e8\uc5b4\uc9d1\ub2c8\ub2e4. \ud30c\uc77c\uc774 \uae30\uae30\ub97c \ub5a0\ub098\uc9c0 \uc54a\uc2b5\ub2c8\ub2e4.' },
    fast: { title: '\ube60\ub974\uace0 \ud6a8\uc728\uc801', desc: 'WebAssembly\uc640 Canvas \uae30\ubc18 \u2014 \uba87 \ucd08 \ub9cc\uc5d0 \uacb0\uacfc \uc81c\uacf5.' },
    free: { title: '\uc644\uc804 \ubb34\ub8cc', desc: '\uac00\uc785 \ubd88\ud544\uc694, \uc81c\ud55c \uc5c6\uc74c, \ud30c\uc77c \ud06c\uae30 \uc81c\ud55c \uc5c6\uc74c.' },
  },
  popular: '\uc778\uae30',
  footer: 'AI Image Tools \u00b7 \ubaa8\ub4e0 \ub3c4\uad6c\ub294 \ubb34\ub8cc\uc785\ub2c8\ub2e4',
  toolFooter: 'AI Image Tools \u00b7 \ubaa8\ub4e0 \ucc98\ub9ac\ub294 \ube0c\ub77c\uc6b0\uc800\uc5d0\uc11c \uc2e4\ud589',
  uploader: {
    hint: '\ud074\ub9ad\ud558\uac70\ub098 \uc774\ubbf8\uc9c0\ub97c \ub4dc\ub798\uadf8\ud558\uc138\uc694',
    support: 'JPG, PNG, WebP \uc9c0\uc6d0 \u00b7 \ucd5c\ub300 {size}MB',
    errorType: '\uc774\ubbf8\uc9c0 \ud30c\uc77c\uc744 \uc120\ud0dd\ud574\uc8fc\uc138\uc694',
    errorSize: '\ud30c\uc77c \ud06c\uae30\ub294 {size}MB\ub97c \ucd08\uacfc\ud560 \uc218 \uc5c6\uc2b5\ub2c8\ub2e4',
  },
  preview: { reset: '\ucd08\uae30\ud654', download: '\ub2e4\uc6b4\ub85c\ub4dc', original: '\uc6d0\ubcf8', compressed: '\uc555\ucd95\ub428', reduced: '{percent}% \uac10\uc18c' },
  processing: { default: '\ucc98\ub9ac \uc911...' },
  removeBg: {
    title: '\ubc30\uacbd \uc81c\uac70',
    desc: '\uc6d0\ud074\ub9ad\uc73c\ub85c \uc774\ubbf8\uc9c0 \ubc30\uacbd\uc744 \uc81c\uac70\ud569\ub2c8\ub2e4.',
    btn: '\ubc30\uacbd \uc81c\uac70', processing: '\ubc30\uacbd \uc81c\uac70 \uc911...',
    download: 'PNG \ub2e4\uc6b4\ub85c\ub4dc (\ud22c\uba85)',
  },
  compress: {
    title: '\uc774\ubbf8\uc9c0 \uc555\ucd95',
    desc: 'JPG, PNG, WebP \ud30c\uc77c \ud06c\uae30\ub97c \ud488\uc9c8\uc744 \uc720\uc9c0\ud558\uba70 \uc904\uc785\ub2c8\ub2e4.',
    quality: '\ud488\uc9c8', maxWidth: '\ucd5c\ub300 \ub108\ube44', noLimit: '\uc81c\ud55c \uc5c6\uc74c',
    btn: '\uc555\ucd95', processing: '\uc555\ucd95 \uc911...',
    presets: [
      { label: '\ucd5c\uace0 \ud488\uc9c8', desc: '\ud30c\uc77c \ud06c\ub9bc, \ubb34\uc190\uc2e4' },
      { label: '\uc88b\uc74c', desc: '\uad8c\uc7a5 \uade0\ud615' },
      { label: '\uc911\uac04', desc: '\ub354 \uc791\uc740 \ud30c\uc77c' },
      { label: '\ucd5c\ub300 \uc555\ucd95', desc: '\ucd5c\uc18c \ud30c\uc77c, \ud488\uc9c8 \uc800\ud558' },
    ],
  },
  formatConvert: {
    title: '\ud615\uc2dd \ubcc0\ud658',
    desc: 'JPG, PNG, WebP \uac04 \uc990\uac01 \ubcc0\ud658.',
    label: '\ubcc0\ud658 \ub300\uc0c1:', current: '\ud604\uc7ac \ud615\uc2dd:',
    btn: '{format}(\uc73c)\ub85c \ubcc0\ud658', processing: '\ubcc0\ud658 \uc911...', download: '.{ext} \ub2e4\uc6b4\ub85c\ub4dc',
    formats: [
      { label: 'PNG', desc: '\ubb34\uc190\uc2e4, \ud22c\uba85\ub3c4 \uc9c0\uc6d0' },
      { label: 'JPEG', desc: '\uc190\uc2e4 \uc555\ucd95, \ud30c\uc77c \uc791\uc74c' },
      { label: 'WebP', desc: '\ucd5c\uc2e0 \ud615\uc2dd, \ub192\uc740 \uc555\ucd95' },
    ],
  },
  resize: {
    title: '\ud06c\uae30 \uc870\uc815 & \uc790\ub974\uae30',
    desc: '\uc774\ubbf8\uc9c0\ub97c \uc6d0\ud558\ub294 \ud06c\uae30\ub85c \uc870\uc815\ud558\uac70\ub098 SNS \ud504\ub9ac\uc14b\uc744 \uc0ac\uc6a9\ud558\uc138\uc694.',
    presetsLabel: '\ud504\ub9ac\uc14b \ud06c\uae30', width: '\ub108\ube44 (px)', height: '\ub192\uc774 (px)',
    maintain: '\uac00\ub85c\uc138\ub85c \ube44\uc728 \uc720\uc9c0', original: '\uc6d0\ubcf8:',
    btn: '{w} \u00d7 {h}(\uc73c)\ub85c \uc870\uc815', processing: '\ud06c\uae30 \uc870\uc815 \uc911...',
    presets: ['Instagram \uc815\uc0ac\uac01\ud615', 'Twitter \uce74\ub4dc', 'YouTube \uc378\ub124\uc77c', 'LinkedIn \ucee4\ubc84', 'Facebook \ucee4\ubc84', '4K \ubc30\uacbd\ud654\uba74'],
  },
  idPhoto: {
    title: '\uc99d\uba85\uc0ac\uc9c4 \uc81c\uc791',
    desc: '\uc5ec\uad8c, \ube44\uc790, \uacf5\uc2dd \uc11c\ub958\uc6a9 \ud45c\uc900 \uc99d\uba85\uc0ac\uc9c4\uc744 \ub9cc\ub4ed\ub2c8\ub2e4.',
    sizeLabel: '\uc0ac\uc9c4 \ud06c\uae30', bgLabel: '\ubc30\uacbd\uc0c9',
    btn: '{name} \uc0ac\uc9c4 \ub9cc\ub4e4\uae30', processing: '\uc99d\uba85\uc0ac\uc9c4 \uc81c\uc791 \uc911...',
  },
  upscale: {
    title: 'AI \uc774\ubbf8\uc9c0 \ud655\ub300',
    desc: 'Real-ESRGAN \uc2e0\uacbd\ub9dd\uc73c\ub85c \uc774\ubbf8\uc9c0\ub97c 2\ubc30~8\ubc30 \ud655\ub300.',
    modelLabel: 'AI \ubaa8\ub378 \uc120\ud0dd', scaleLabel: '\ud655\ub300 \ubc30\uc728',
    modelHint: '\ubaa8\ub378 \ud30c\uc77c\uc774 \uc6f9\uc0ac\uc774\ud2b8\uc5d0 \ud3ec\ud568\ub418\uc5b4 \uc788\uc2b5\ub2c8\ub2e4.',
    loadBtn: '{label} \ubaa8\ub378 \ub85c\ub4dc ({size})', loading: '\ubaa8\ub378 \ub85c\ub4dc \uc911...',
    loaded: '\u2713 {label} \ubaa8\ub378 \ub85c\ub4dc \uc644\ub8cc \u2014 \uc624\ud504\ub77c\uc778 \uc0ac\uc6a9 \uac00\ub2a5',
    upscaleBtn: 'AI\ub85c {scale} \ud655\ub300',
    processing: 'AI \ud655\ub300 \uc911 ({label} \ubaa8\ub378, {scale})...',
    download: 'PNG \ub2e4\uc6b4\ub85c\ub4dc (AI \ud655\ub300)',
    fail: '\ubaa8\ub378 \ub85c\ub4dc \uc2e4\ud328. \uc0c8\ub85c\uace0\uce68 \ud6c4 \ub2e4\uc2dc \uc2dc\ub3c4\ud558\uc138\uc694.',
    backendLabel: '\ucc98\ub9ac \uc5d4\uc9c4', backendWasmDesc: '\ube60\ub978 CPU (Wasm), \ubaa8\ub4e0 \ud658\uacbd\uc5d0\uc11c \uc791\ub3d9',
    backendGpuDesc: '\ub354 \ube60\ub984, GPU \uc9c0\uc6d0 \ud544\uc694',
    gpuAvailable: '\u2713 GPU \uac10\uc9c0 \u2014 GPU \uac00\uc18d \uc0ac\uc6a9 \uc911',
      wasmAvailable: '\u2713 Wasm \uc900\ube44 \uc644\ub8cc \u2014 \ube60\ub978 CPU \ucd94\ub860',
      wasmFallback: '\u26a0 GPU \uc0ac\uc6a9 \ubd88\uac00 \u2014 Wasm \uc0ac\uc6a9',
    gpuUnavailable: '\u26a0 GPU \uc0ac\uc6a9 \ubd88\uac00 \u2014 CPU \uc0ac\uc6a9',
    gpuFallback: '\u26a0 GPU \ucd94\ub860 \uc2e4\ud328 \u2014 Wasm\uc73c\ub85c \uc804\ud658',
    models: {
      slim: { label: '\uacbd\ub7c9', size: '3.8 MB', desc: '\ube60\ub984, \uc88b\uc740 \ud488\uc9c8' },
      medium: { label: '\ud45c\uc900', size: '12 MB', desc: '\uade0\ud615 \uc7a1\ud78c' },
    },
  },
  enlarge: {
    title: '\uc774\ubbf8\uc9c0 \ud655\ub300',
    desc: 'Canvas \ubcf4\uac04\uc73c\ub85c \uc774\ubbf8\uc9c0\ub97c 2\ubc30~10\ubc30\ub85c \ud655\ub300. \ube60\ub974\uace0 \uc990\uaca9 \ucc98\ub9ac.',
    scaleLabel: '\ud655\ub300 \ubc30\uc728', algLabel: '\uc54c\uace0\ub9ac\uc998',
    algSmooth: '\ubd80\ub4dc\ub7fd\uac8c (\ubc14\uc774\ud050\ube45)', algPixel: '\ud53d\uc140 (\ucd5c\uadfc\uc811 \uc774\uc6c3)',
    originalSize: '\uc6d0\ubcf8', btn: '{scale} \ud655\ub300',
    processing: '\ud655\ub300 \uc911...', download: 'PNG \ub2e4\uc6b4\ub85c\ub4dc',
  },
})

// ========== CHINESE SIMPLIFIED ==========
translations['zh-CN'] = deepClone(translations.en)
Object.assign(translations['zh-CN'], {
  site: { title: 'AI Image Tools', tagline: '\u514d\u8d39\u5728\u7ebf AI \u56fe\u50cf\u5904\u7406' },
  nav: { back: '\u8fd4\u56de\u9996\u9875', tools: '\u5de5\u5177', features: '\u7279\u70b9' },
  hero: {
    badge: '\u6d4f\u89c8\u5668\u672c\u5730\u5904\u7406 \u00b7 \u4e0d\u4e0a\u4f20\u670d\u52a1\u5668',
    heading: '\u514d\u8d39\u5728\u7ebf AI \u56fe\u50cf\u5904\u7406\u5de5\u5177',
    sub: 'AI \u53bb\u80cc\u666f\u3001\u56fe\u7247\u538b\u7f29\u3001\u683c\u5f0f\u8f6c\u6362\u3001\u8bc1\u4ef6\u7167\u5236\u4f5c\u3001AI \u56fe\u7247\u653e\u5927',
    sub2: '\u6240\u6709\u5de5\u5177\u5728\u6d4f\u89c8\u5668\u672c\u5730\u8fd0\u884c\uff0c\u4fdd\u62a4\u4f60\u7684\u9690\u79c1',
  },
  section: { choose: '\u9009\u62e9\u5de5\u5177', why: '\u4e3a\u4ec0\u4e48\u9009\u62e9\u6211\u4eec' },
  features: {
    privacy: { title: '\u9690\u79c1\u5b89\u5168', desc: '\u6240\u6709\u5904\u7406\u5728\u6d4f\u89c8\u5668\u672c\u5730\u5b8c\u6210\uff0c\u6587\u4ef6\u4e0d\u4e0a\u4f20\u670d\u52a1\u5668' },
    fast: { title: '\u5feb\u901f\u9ad8\u6548', desc: '\u57fa\u4e8e WebAssembly \u548c Canvas\uff0c\u5904\u7406\u901f\u5ea6\u6781\u5feb' },
    free: { title: '\u5b8c\u5168\u514d\u8d39', desc: '\u65e0\u9700\u6ce8\u518c\uff0c\u4e0d\u9650\u6b21\u6570\uff0c\u4e0d\u9650\u6587\u4ef6\u5927\u5c0f' },
  },
  popular: '\u70ed\u95e8',
  footer: 'AI Image Tools \u00b7 \u6240\u6709\u5de5\u5177\u5747\u514d\u8d39\u4f7f\u7528',
  toolFooter: 'AI Image Tools \u00b7 \u6240\u6709\u5904\u7406\u5728\u6d4f\u89c8\u5668\u672c\u5730\u5b8c\u6210\uff0c\u6587\u4ef6\u4e0d\u4e0a\u4f20\u670d\u52a1\u5668',
  uploader: {
    hint: '\u70b9\u51fb\u6216\u62d6\u62fd\u56fe\u7247\u5230\u6b64\u5904',
    support: '\u652f\u6301 JPG\u3001PNG\u3001WebP\uff0c\u6700\u5927 {size}MB',
    errorType: '\u8bf7\u9009\u62e9\u56fe\u7247\u6587\u4ef6',
    errorSize: '\u6587\u4ef6\u5927\u5c0f\u4e0d\u80fd\u8d85\u8fc7 {size}MB',
  },
  preview: { reset: '\u91cd\u65b0\u9009\u62e9', download: '\u4e0b\u8f7d', original: '\u539f\u59cb\u5927\u5c0f', compressed: '\u538b\u7f29\u540e', reduced: '\u538b\u7f29\u4e86 {percent}%' },
  processing: { default: '\u5904\u7406\u4e2d...' },
  removeBg: {
    title: 'AI \u53bb\u80cc\u666f',
    desc: '\u4e00\u952e\u79fb\u9664\u56fe\u7247\u80cc\u666f\uff0c\u652f\u6301\u4eba\u50cf\u3001\u5546\u54c1\u3001\u52a8\u7269\u7b49\u3002\u6240\u6709\u5904\u7406\u5728\u6d4f\u89c8\u5668\u672c\u5730\u5b8c\u6210\u3002',
    btn: '\u79fb\u9664\u80cc\u666f', processing: '\u6b63\u5728\u79fb\u9664\u80cc\u666f...',
    download: '\u4e0b\u8f7d PNG (\u900f\u660e\u80cc\u666f)',
  },
  compress: {
    title: '\u56fe\u7247\u538b\u7f29',
    desc: '\u538b\u7f29 JPG\u3001PNG\u3001WebP \u56fe\u7247\uff0c\u51cf\u5c0f\u6587\u4ef6\u4f53\u79ef\uff0c\u540c\u65f6\u4fdd\u6301\u53ef\u63a5\u53d7\u7684\u753b\u8d28\u3002',
    quality: '\u538b\u7f29\u8d28\u91cf', maxWidth: '\u6700\u5927\u5bbd\u5ea6', noLimit: '\u4e0d\u9650',
    btn: '\u5f00\u59cb\u538b\u7f29', processing: '\u6b63\u5728\u538b\u7f29...',
    presets: [
      { label: '\u6700\u4f73\u8d28\u91cf', desc: '\u6587\u4ef6\u7a0d\u5927\uff0c\u753b\u8d28\u65e0\u635f' },
      { label: '\u826f\u597d', desc: '\u63a8\u8350\u5e73\u8861' },
      { label: '\u4e2d\u7b49', desc: '\u6587\u4ef6\u8f83\u5c0f' },
      { label: '\u6700\u5927\u538b\u7f29', desc: '\u6587\u4ef6\u6700\u5c0f\uff0c\u753b\u8d28\u6709\u635f' },
    ],
  },
  formatConvert: {
    title: '\u56fe\u7247\u683c\u5f0f\u8f6c\u6362',
    desc: '\u5728 JPG\u3001PNG\u3001WebP \u4e4b\u95f4\u81ea\u7531\u8f6c\u6362\u3002',
    label: '\u8f6c\u6362\u4e3a:', current: '\u5f53\u524d\u683c\u5f0f:',
    btn: '\u8f6c\u6362\u4e3a {format}', processing: '\u6b63\u5728\u8f6c\u6362...', download: '\u4e0b\u8f7d .{ext}',
    formats: [
      { label: 'PNG', desc: '\u65e0\u635f\u683c\u5f0f\uff0c\u652f\u6301\u900f\u660e' },
      { label: 'JPEG', desc: '\u6709\u635f\u538b\u7f29\uff0c\u6587\u4ef6\u5c0f' },
      { label: 'WebP', desc: '\u73b0\u4ee3\u683c\u5f0f\uff0c\u538b\u7f29\u7387\u9ad8' },
    ],
  },
  resize: {
    title: '\u56fe\u7247\u7f29\u653e\u4e0e\u88c1\u526a',
    desc: '\u8c03\u6574\u56fe\u7247\u5c3a\u5bf8\u5230\u6307\u5b9a\u5927\u5c0f\uff0c\u6216\u6309\u793e\u4ea4\u5a92\u4f53\u9884\u8bbe\u5c3a\u5bf8\u4e00\u952e\u7f29\u653e\u3002',
    presetsLabel: '\u9884\u8bbe\u5c3a\u5bf8', width: '\u5bbd\u5ea6 (px)', height: '\u9ad8\u5ea6 (px)',
    maintain: '\u4fdd\u6301\u5bbd\u9ad8\u6bd4', original: '\u539f\u59cb\u5c3a\u5bf8:',
    btn: '\u7f29\u653e\u5230 {w} \u00d7 {h}', processing: '\u6b63\u5728\u5904\u7406...',
    presets: ['Instagram \u65b9\u5f62', 'Twitter \u5361\u7247', 'YouTube \u7f29\u7565\u56fe', 'LinkedIn \u5c01\u9762', 'Facebook \u5c01\u9762', '4K \u58c1\u7eb8'],
  },
  idPhoto: {
    title: '\u8bc1\u4ef6\u7167\u5236\u4f5c',
    desc: '\u4e00\u952e\u5236\u4f5c\u6807\u51c6\u8bc1\u4ef6\u7167\uff0c\u652f\u6301\u591a\u79cd\u89c4\u683c\u548c\u80cc\u666f\u8272\u3002',
    sizeLabel: '\u7167\u7247\u89c4\u683c', bgLabel: '\u80cc\u666f\u989c\u8272',
    btn: '\u5236\u4f5c {name} \u8bc1\u4ef6\u7167', processing: '\u6b63\u5728\u5236\u4f5c\u8bc1\u4ef6\u7167...',
  },
  upscale: {
    title: 'AI \u56fe\u7247\u653e\u5927',
    desc: '\u57fa\u4e8e Real-ESRGAN \u795e\u7ecf\u7f51\u7edc\u6a21\u578b\uff0c\u5c06\u56fe\u7247\u653e\u5927 2 \u500d\u81f3 8 \u500d\u5e76\u667a\u80fd\u8865\u5145\u7ec6\u8282\u3002',
    modelLabel: '\u9009\u62e9 AI \u6a21\u578b', scaleLabel: '\u653e\u5927\u500d\u6570',
    modelHint: '\u6a21\u578b\u6587\u4ef6\u5df2\u5185\u7f6e\u4e8e\u7f51\u7ad9\u4e2d\uff0c\u9996\u6b21\u4f7f\u7528\u9700\u52a0\u8f7d\u4e00\u6b21\u3002',
    loadBtn: '\u52a0\u8f7d{label}AI\u6a21\u578b ({size})', loading: '\u52a0\u8f7d\u6a21\u578b\u4e2d...',
    loaded: '\u2713 {label}AI\u6a21\u578b\u5df2\u52a0\u8f7d\uff0c\u53ef\u79bb\u7ebf\u4f7f\u7528',
    upscaleBtn: 'AI \u653e\u5927 {scale}',
    processing: 'AI\u653e\u5927\u4e2d ({label}\u6a21\u578b, {scale})...',
    download: '\u4e0b\u8f7d PNG (AI \u653e\u5927)',
    fail: '\u6a21\u578b\u52a0\u8f7d\u5931\u8d25\uff0c\u8bf7\u5237\u65b0\u91cd\u8bd5',
    backendLabel: '\u5904\u7406\u5f15\u64ce', backendWasmDesc: '\u5feb\u901fCPU (Wasm)\uff0c\u517c\u5bb9\u6240\u6709\u8bbe\u5907',
    backendGpuDesc: '\u66f4\u5feb\uff0c\u9700\u8981 GPU \u652f\u6301',
    gpuAvailable: '\u2713 \u68c0\u6d4b\u5230 GPU \u2014 \u4f7f\u7528 GPU \u52a0\u901f',
      wasmAvailable: '\u2713 Wasm \u5df2\u51c6\u5907 \u2014 \u5feb\u901f CPU \u63a8\u7406',
      wasmFallback: '\u26a0 GPU \u4e0d\u53ef\u7528 \u2014 \u4f7f\u7528 Wasm \u540e\u7aef',
    gpuUnavailable: '\u26a0 \u5f53\u524d\u8bbe\u5907\u4e0d\u652f\u6301 GPU \u2014 \u4f7f\u7528 CPU',
    gpuFallback: '\u26a0 GPU \u63a8\u7406\u5931\u8d25 \u2014 \u5df2\u5207\u6362\u5230 Wasm',
    models: {
      slim: { label: '\u8f7b\u91cf', size: '3.8 MB', desc: '\u901f\u5ea6\u5feb\uff0c\u6548\u679c\u826f\u597d' },
      medium: { label: '\u6807\u51c6', size: '12 MB', desc: '\u5747\u8861\u901f\u5ea6\u4e0e\u8d28\u91cf' },
    },
  },
  enlarge: {
    title: '\u56fe\u7247\u653e\u5927',
    desc: '\u4f7f\u7528 Canvas \u63d2\u503c\u5feb\u901f\u653e\u5927\u56fe\u7247 2 \u500d\u81f3 10 \u500d\u3002\u6beb\u79d2\u7ea7\u5904\u7406\uff0c\u65e0\u9700 AI \u6a21\u578b\u3002',
    scaleLabel: '\u653e\u5927\u500d\u6570', algLabel: '\u7b97\u6cd5',
    algSmooth: '\u5e73\u6ed1 (\u53cc\u4e09\u6b21)', algPixel: '\u50cf\u7d20 (\u6700\u8fd1\u90bb)',
    originalSize: '\u539f\u59cb\u5c3a\u5bf8', btn: '\u653e\u5927 {scale}',
    processing: '\u653e\u5927\u4e2d...', download: '\u4e0b\u8f7d PNG',
  },
})

// ========== RUSSIAN ==========
translations.ru = deepClone(translations.en)
Object.assign(translations.ru, {
  site: { title: 'AI Image Tools', tagline: '\u0411\u0435\u0441\u043f\u043b\u0430\u0442\u043d\u0430\u044f \u043e\u043d\u043b\u0430\u0439\u043d-\u043e\u0431\u0440\u0430\u0431\u043e\u0442\u043a\u0430 \u0438\u0437\u043e\u0431\u0440\u0430\u0436\u0435\u043d\u0438\u0439 \u0441 \u0418\u0418' },
  nav: { back: '\u041d\u0430 \u0433\u043b\u0430\u0432\u043d\u0443\u044e', tools: '\u0418\u043d\u0441\u0442\u0440\u0443\u043c\u0435\u043d\u0442\u044b', features: '\u0412\u043e\u0437\u043c\u043e\u0436\u043d\u043e\u0441\u0442\u0438' },
  hero: {
    badge: '\u0420\u0430\u0431\u043e\u0442\u0430\u0435\u0442 \u0432 \u0431\u0440\u0430\u0443\u0437\u0435\u0440\u0435 \u00b7 \u041d\u0438\u0447\u0435\u0433\u043e \u043d\u0435 \u0437\u0430\u0433\u0440\u0443\u0436\u0430\u0435\u0442\u0441\u044f',
    heading: '\u0411\u0435\u0441\u043f\u043b\u0430\u0442\u043d\u044b\u0435 \u043e\u043d\u043b\u0430\u0439\u043d-\u0438\u043d\u0441\u0442\u0440\u0443\u043c\u0435\u043d\u0442\u044b \u0434\u043b\u044f \u0438\u0437\u043e\u0431\u0440\u0430\u0436\u0435\u043d\u0438\u0439 \u0441 \u0418\u0418',
    sub: '\u0423\u0434\u0430\u043b\u0435\u043d\u0438\u0435 \u0444\u043e\u043d\u0430, \u0441\u0436\u0430\u0442\u0438\u0435, \u043a\u043e\u043d\u0432\u0435\u0440\u0442\u0430\u0446\u0438\u044f, \u0444\u043e\u0442\u043e \u043d\u0430 \u0434\u043e\u043a\u0443\u043c\u0435\u043d\u0442\u044b, \u0443\u0432\u0435\u043b\u0438\u0447\u0435\u043d\u0438\u0435 \u0441 \u0418\u0418',
    sub2: '\u0412\u0441\u0435 \u0438\u043d\u0441\u0442\u0440\u0443\u043c\u0435\u043d\u0442\u044b \u0440\u0430\u0431\u043e\u0442\u0430\u044e\u0442 \u043b\u043e\u043a\u0430\u043b\u044c\u043d\u043e \u0432 \u0432\u0430\u0448\u0435\u043c \u0431\u0440\u0430\u0443\u0437\u0435\u0440\u0435',
  },
  section: { choose: '\u0412\u044b\u0431\u0435\u0440\u0438\u0442\u0435 \u0438\u043d\u0441\u0442\u0440\u0443\u043c\u0435\u043d\u0442', why: '\u041f\u043e\u0447\u0435\u043c\u0443 \u0432\u044b\u0431\u0438\u0440\u0430\u044e\u0442 \u043d\u0430\u0441' },
  features: {
    privacy: { title: '\u041a\u043e\u043d\u0444\u0438\u0434\u0435\u043d\u0446\u0438\u0430\u043b\u044c\u043d\u043e\u0441\u0442\u044c', desc: '\u0412\u0441\u044f \u043e\u0431\u0440\u0430\u0431\u043e\u0442\u043a\u0430 \u043f\u0440\u043e\u0438\u0441\u0445\u043e\u0434\u0438\u0442 \u0432 \u0432\u0430\u0448\u0435\u043c \u0431\u0440\u0430\u0443\u0437\u0435\u0440\u0435.' },
    fast: { title: '\u0411\u044b\u0441\u0442\u0440\u043e \u0438 \u044d\u0444\u0444\u0435\u043a\u0442\u0438\u0432\u043d\u043e', desc: '\u041d\u0430 \u0431\u0430\u0437\u0435 WebAssembly \u0438 Canvas.' },
    free: { title: '\u041f\u043e\u043b\u043d\u043e\u0441\u0442\u044c\u044e \u0431\u0435\u0441\u043f\u043b\u0430\u0442\u043d\u043e', desc: '\u0411\u0435\u0437 \u0440\u0435\u0433\u0438\u0441\u0442\u0440\u0430\u0446\u0438\u0438, \u0431\u0435\u0437 \u043b\u0438\u043c\u0438\u0442\u043e\u0432.' },
  },
  popular: '\u041f\u043e\u043f\u0443\u043b\u044f\u0440\u043d\u043e\u0435',
  footer: 'AI Image Tools \u00b7 \u0412\u0441\u0435 \u0438\u043d\u0441\u0442\u0440\u0443\u043c\u0435\u043d\u0442\u044b \u0431\u0435\u0441\u043f\u043b\u0430\u0442\u043d\u044b',
  toolFooter: 'AI Image Tools \u00b7 \u041e\u0431\u0440\u0430\u0431\u043e\u0442\u043a\u0430 \u0432 \u0432\u0430\u0448\u0435\u043c \u0431\u0440\u0430\u0443\u0437\u0435\u0440\u0435',
  uploader: {
    hint: '\u041d\u0430\u0436\u043c\u0438\u0442\u0435 \u0438\u043b\u0438 \u043f\u0435\u0440\u0435\u0442\u0430\u0449\u0438\u0442\u0435 \u0438\u0437\u043e\u0431\u0440\u0430\u0436\u0435\u043d\u0438\u0435',
    support: 'JPG, PNG, WebP \u00b7 \u041c\u0430\u043a\u0441. {size}\u041c\u0411',
    errorType: '\u0412\u044b\u0431\u0435\u0440\u0438\u0442\u0435 \u0444\u0430\u0439\u043b \u0438\u0437\u043e\u0431\u0440\u0430\u0436\u0435\u043d\u0438\u044f',
    errorSize: '\u0420\u0430\u0437\u043c\u0435\u0440 \u043d\u0435 \u0434\u043e\u043b\u0436\u0435\u043d \u043f\u0440\u0435\u0432\u044b\u0448\u0430\u0442\u044c {size}\u041c\u0411',
  },
  preview: { reset: '\u0421\u0431\u0440\u043e\u0441\u0438\u0442\u044c', download: '\u0421\u043a\u0430\u0447\u0430\u0442\u044c', original: '\u041e\u0440\u0438\u0433\u0438\u043d\u0430\u043b', compressed: '\u0421\u0436\u0430\u0442\u043e', reduced: '\u0423\u043c\u0435\u043d\u044c\u0448\u0435\u043d\u043e \u043d\u0430 {percent}%' },
  processing: { default: '\u041e\u0431\u0440\u0430\u0431\u043e\u0442\u043a\u0430...' },
  removeBg: {
    title: '\u0423\u0434\u0430\u043b\u0435\u043d\u0438\u0435 \u0444\u043e\u043d\u0430',
    desc: '\u0423\u0434\u0430\u043b\u0438\u0442\u0435 \u0444\u043e\u043d \u0438\u0437\u043e\u0431\u0440\u0430\u0436\u0435\u043d\u0438\u044f \u0432 \u043e\u0434\u0438\u043d \u043a\u043b\u0438\u043a.',
    btn: '\u0423\u0434\u0430\u043b\u0438\u0442\u044c \u0444\u043e\u043d', processing: '\u0423\u0434\u0430\u043b\u0435\u043d\u0438\u0435 \u0444\u043e\u043d\u0430...',
    download: '\u0421\u043a\u0430\u0447\u0430\u0442\u044c PNG (\u043f\u0440\u043e\u0437\u0440\u0430\u0447\u043d\u044b\u0439)',
  },
  compress: {
    title: '\u0421\u0436\u0430\u0442\u0438\u0435 \u0438\u0437\u043e\u0431\u0440\u0430\u0436\u0435\u043d\u0438\u044f',
    desc: '\u0423\u043c\u0435\u043d\u044c\u0448\u0438\u0442\u0435 \u0440\u0430\u0437\u043c\u0435\u0440 JPG, PNG \u0438 WebP.',
    quality: '\u041a\u0430\u0447\u0435\u0441\u0442\u0432\u043e', maxWidth: '\u041c\u0430\u043a\u0441. \u0448\u0438\u0440\u0438\u043d\u0430', noLimit: '\u0411\u0435\u0437 \u043b\u0438\u043c\u0438\u0442\u0430',
    btn: '\u0421\u0436\u0430\u0442\u044c', processing: '\u0421\u0436\u0430\u0442\u0438\u0435...',
    presets: [
      { label: '\u041b\u0443\u0447\u0448\u0435\u0435 \u043a\u0430\u0447\u0435\u0441\u0442\u0432\u043e', desc: '\u0411\u043e\u043b\u044c\u0448\u043e\u0439 \u0444\u0430\u0439\u043b, \u0431\u0435\u0437 \u043f\u043e\u0442\u0435\u0440\u044c' },
      { label: '\u0425\u043e\u0440\u043e\u0448\u043e', desc: '\u0420\u0435\u043a\u043e\u043c\u0435\u043d\u0434\u0443\u0435\u043c\u044b\u0439 \u0431\u0430\u043b\u0430\u043d\u0441' },
      { label: '\u0421\u0440\u0435\u0434\u043d\u0435', desc: '\u041c\u0435\u043d\u044c\u0448\u0438\u0439 \u0444\u0430\u0439\u043b' },
      { label: '\u041c\u0430\u043a\u0441. \u0441\u0436\u0430\u0442\u0438\u0435', desc: '\u041c\u0438\u043d. \u0444\u0430\u0439\u043b, \u043f\u043e\u0442\u0435\u0440\u044f \u043a\u0430\u0447\u0435\u0441\u0442\u0432\u0430' },
    ],
  },
  formatConvert: {
    title: '\u041a\u043e\u043d\u0432\u0435\u0440\u0442\u0430\u0446\u0438\u044f \u0444\u043e\u0440\u043c\u0430\u0442\u0430',
    desc: '\u041a\u043e\u043d\u0432\u0435\u0440\u0442\u0430\u0446\u0438\u044f \u043c\u0435\u0436\u0434\u0443 JPG, PNG, WebP.',
    label: '\u041a\u043e\u043d\u0432\u0435\u0440\u0442\u0438\u0440\u043e\u0432\u0430\u0442\u044c \u0432:', current: '\u0422\u0435\u043a\u0443\u0449\u0438\u0439 \u0444\u043e\u0440\u043c\u0430\u0442:',
    btn: '\u041a\u043e\u043d\u0432\u0435\u0440\u0442\u0438\u0440\u043e\u0432\u0430\u0442\u044c \u0432 {format}', processing: '\u041a\u043e\u043d\u0432\u0435\u0440\u0442\u0430\u0446\u0438\u044f...', download: '\u0421\u043a\u0430\u0447\u0430\u0442\u044c .{ext}',
    formats: [
      { label: 'PNG', desc: '\u0411\u0435\u0437 \u043f\u043e\u0442\u0435\u0440\u044c, \u043f\u0440\u043e\u0437\u0440\u0430\u0447\u043d\u043e\u0441\u0442\u044c' },
      { label: 'JPEG', desc: '\u0421 \u043f\u043e\u0442\u0435\u0440\u044f\u043c\u0438, \u043c\u0430\u043b\u044b\u0439 \u0444\u0430\u0439\u043b' },
      { label: 'WebP', desc: '\u0421\u043e\u0432\u0440\u0435\u043c\u0435\u043d\u043d\u044b\u0439 \u0444\u043e\u0440\u043c\u0430\u0442' },
    ],
  },
  resize: {
    title: '\u0418\u0437\u043c\u0435\u043d\u0435\u043d\u0438\u0435 \u0440\u0430\u0437\u043c\u0435\u0440\u0430',
    desc: '\u0418\u0437\u043c\u0435\u043d\u0438\u0442\u0435 \u0440\u0430\u0437\u043c\u0435\u0440 \u0438\u0437\u043e\u0431\u0440\u0430\u0436\u0435\u043d\u0438\u044f \u0438\u043b\u0438 \u0438\u0441\u043f\u043e\u043b\u044c\u0437\u0443\u0439\u0442\u0435 \u043f\u0440\u0435\u0441\u0435\u0442\u044b.',
    presetsLabel: '\u041f\u0440\u0435\u0441\u0435\u0442\u044b \u0440\u0430\u0437\u043c\u0435\u0440\u043e\u0432', width: '\u0428\u0438\u0440\u0438\u043d\u0430 (px)', height: '\u0412\u044b\u0441\u043e\u0442\u0430 (px)',
    maintain: '\u0421\u043e\u0445\u0440\u0430\u043d\u044f\u0442\u044c \u043f\u0440\u043e\u043f\u043e\u0440\u0446\u0438\u0438', original: '\u041e\u0440\u0438\u0433\u0438\u043d\u0430\u043b:',
    btn: '\u0418\u0437\u043c\u0435\u043d\u0438\u0442\u044c \u043d\u0430 {w} \u00d7 {h}', processing: '\u0418\u0437\u043c\u0435\u043d\u0435\u043d\u0438\u0435 \u0440\u0430\u0437\u043c\u0435\u0440\u0430...',
    presets: ['Instagram \u043a\u0432\u0430\u0434\u0440\u0430\u0442', 'Twitter \u043a\u0430\u0440\u0442\u043e\u0447\u043a\u0430', 'YouTube \u043c\u0438\u043d\u0438\u0430\u0442\u044e\u0440\u0430', 'LinkedIn \u043e\u0431\u043b\u043e\u0436\u043a\u0430', 'Facebook \u043e\u0431\u043b\u043e\u0436\u043a\u0430', '4K \u043e\u0431\u043e\u0438'],
  },
  idPhoto: {
    title: '\u0424\u043e\u0442\u043e \u043d\u0430 \u0434\u043e\u043a\u0443\u043c\u0435\u043d\u0442\u044b',
    desc: '\u0421\u043e\u0437\u0434\u0430\u0439\u0442\u0435 \u0441\u0442\u0430\u043d\u0434\u0430\u0440\u0442\u043d\u044b\u0435 \u0444\u043e\u0442\u043e \u0434\u043b\u044f \u043f\u0430\u0441\u043f\u043e\u0440\u0442\u043e\u0432, \u0432\u0438\u0437 \u0438 \u043e\u0444\u0438\u0446\u0438\u0430\u043b\u044c\u043d\u044b\u0445 \u0434\u043e\u043a\u0443\u043c\u0435\u043d\u0442\u043e\u0432.',
    sizeLabel: '\u0420\u0430\u0437\u043c\u0435\u0440 \u0444\u043e\u0442\u043e', bgLabel: '\u0426\u0432\u0435\u0442 \u0444\u043e\u043d\u0430',
    btn: '\u0421\u043e\u0437\u0434\u0430\u0442\u044c \u0444\u043e\u0442\u043e {name}', processing: '\u0421\u043e\u0437\u0434\u0430\u043d\u0438\u0435 \u0444\u043e\u0442\u043e...',
  },
  upscale: {
    title: '\u0423\u0432\u0435\u043b\u0438\u0447\u0435\u043d\u0438\u0435 \u0441 \u0418\u0418',
    desc: '\u0423\u0432\u0435\u043b\u0438\u0447\u044c\u0442\u0435 \u0438\u0437\u043e\u0431\u0440\u0430\u0436\u0435\u043d\u0438\u044f \u0432 2x-8x \u0441 \u043d\u0435\u0439\u0440\u043e\u0441\u0435\u0442\u044c\u044e Real-ESRGAN.',
    modelLabel: '\u0412\u044b\u0431\u0435\u0440\u0438\u0442\u0435 \u043c\u043e\u0434\u0435\u043b\u044c \u0418\u0418', scaleLabel: '\u041a\u043e\u044d\u0444\u0444\u0438\u0446\u0438\u0435\u043d\u0442 \u0443\u0432\u0435\u043b\u0438\u0447\u0435\u043d\u0438\u044f',
    modelHint: '\u041c\u043e\u0434\u0435\u043b\u0438 \u0432\u0441\u0442\u0440\u043e\u0435\u043d\u044b \u0432 \u0441\u0430\u0439\u0442.',
    loadBtn: '\u0417\u0430\u0433\u0440\u0443\u0437\u0438\u0442\u044c \u043c\u043e\u0434\u0435\u043b\u044c {label} ({size})', loading: '\u0417\u0430\u0433\u0440\u0443\u0437\u043a\u0430 \u043c\u043e\u0434\u0435\u043b\u0438...',
    loaded: '\u2713 \u041c\u043e\u0434\u0435\u043b\u044c {label} \u0437\u0430\u0433\u0440\u0443\u0436\u0435\u043d\u0430',
    upscaleBtn: '\u0423\u0432\u0435\u043b\u0438\u0447\u0438\u0442\u044c {scale} \u0441 \u0418\u0418',
    processing: '\u0423\u0432\u0435\u043b\u0438\u0447\u0435\u043d\u0438\u0435 \u0441 \u0418\u0418 (\u043c\u043e\u0434\u0435\u043b\u044c {label}, {scale})...',
    download: '\u0421\u043a\u0430\u0447\u0430\u0442\u044c PNG (\u0443\u0432\u0435\u043b\u0438\u0447\u0435\u043d\u043e \u0418\u0418)',
    fail: '\u041e\u0448\u0438\u0431\u043a\u0430 \u0437\u0430\u0433\u0440\u0443\u0437\u043a\u0438 \u043c\u043e\u0434\u0435\u043b\u0438.',
    backendLabel: '\u0414\u0432\u0438\u0436\u043e\u043a \u043e\u0431\u0440\u0430\u0431\u043e\u0442\u043a\u0438', backendWasmDesc: '\u0411\u044b\u0441\u0442\u0440\u044b\u0439 CPU (Wasm), \u0440\u0430\u0431\u043e\u0442\u0430\u0435\u0442 \u0432\u0435\u0437\u0434\u0435',
    backendGpuDesc: '\u0411\u044b\u0441\u0442\u0440\u0435\u0435, \u0442\u0440\u0435\u0431\u0443\u0435\u0442 GPU',
    gpuAvailable: '\u2713 GPU \u043e\u0431\u043d\u0430\u0440\u0443\u0436\u0435\u043d',
      wasmAvailable: '\u2713 Wasm \u0433\u043e\u0442\u043e\u0432 \u2014 \u0431\u044b\u0441\u0442\u0440\u044b\u0439 \u0432\u044b\u0432\u043e\u0434 CPU',
      wasmFallback: '\u26a0 GPU \u043d\u0435\u0434\u043e\u0441\u0442\u0443\u043f\u0435\u043d \u2014 \u0438\u0441\u043f\u043e\u043b\u044c\u0437\u0443\u0435\u0442\u0441\u044f Wasm',
    gpuUnavailable: '\u26a0 GPU \u043d\u0435\u0434\u043e\u0441\u0442\u0443\u043f\u0435\u043d',
    gpuFallback: '\u26a0 \u041e\u0448\u0438\u0431\u043a\u0430 GPU \u2014 \u043f\u0435\u0440\u0435\u043a\u043b\u044e\u0447\u0435\u043d\u0438\u0435 \u043d\u0430 Wasm',
    models: {
      slim: { label: '\u041b\u0451\u0433\u043a\u0430\u044f', size: '3.8 MB', desc: '\u0411\u044b\u0441\u0442\u0440\u043e, \u0445\u043e\u0440\u043e\u0448\u043e' },
      medium: { label: '\u0421\u0442\u0430\u043d\u0434\u0430\u0440\u0442', size: '12 MB', desc: '\u0421\u0431\u0430\u043b\u0430\u043d\u0441\u0438\u0440\u043e\u0432\u0430\u043d\u043e' },
    },
  },
  enlarge: {
    title: '\u0423\u0432\u0435\u043b\u0438\u0447\u0435\u043d\u0438\u0435 \u0438\u0437\u043e\u0431\u0440\u0430\u0436\u0435\u043d\u0438\u0439',
    desc: '\u0411\u044b\u0441\u0442\u0440\u043e\u0435 \u0443\u0432\u0435\u043b\u0438\u0447\u0435\u043d\u0438\u0435 \u043e\u0442 2x \u0434\u043e 10x \u0441 \u0438\u043d\u0442\u0435\u0440\u043f\u043e\u043b\u044f\u0446\u0438\u0435\u0439 Canvas.',
    scaleLabel: '\u041a\u043e\u044d\u0444\u0444\u0438\u0446\u0438\u0435\u043d\u0442 \u0443\u0432\u0435\u043b\u0438\u0447\u0435\u043d\u0438\u044f', algLabel: '\u0410\u043b\u0433\u043e\u0440\u0438\u0442\u043c',
    algSmooth: '\u0413\u043b\u0430\u0434\u043a\u0438\u0439 (\u0431\u0438\u043a\u0443\u0431\u0438\u0447\u0435\u0441\u043a\u0438\u0439)', algPixel: '\u041f\u0438\u043a\u0441\u0435\u043b\u044c\u043d\u044b\u0439',
    originalSize: '\u041e\u0440\u0438\u0433\u0438\u043d\u0430\u043b', btn: '\u0423\u0432\u0435\u043b\u0438\u0447\u0438\u0442\u044c {scale}',
    processing: '\u0423\u0432\u0435\u043b\u0438\u0447\u0435\u043d\u0438\u0435...', download: '\u0421\u043a\u0430\u0447\u0430\u0442\u044c PNG',
  },
})

function deepClone<T>(obj: T): T {
  return JSON.parse(JSON.stringify(obj))
}

export function t(lang: LangCode, path: string, params?: Record<string, string | number>): string {
  const keys = path.split('.')
  let current: any = translations[lang]
  if (!current) current = translations.en

  for (const key of keys) {
    if (current && typeof current === 'object' && key in current) {
      current = current[key]
    } else {
      current = translations.en
      for (const k of keys) {
        current = current?.[k]
      }
      break
    }
  }

  if (typeof current !== 'string') {
    let fallback: any = translations.en
    for (const key of keys) {
      fallback = fallback?.[key]
    }
    if (typeof fallback === 'string') {
      current = fallback
    } else {
      return path
    }
  }

  if (params) {
    let result = current as string
    for (const [key, value] of Object.entries(params)) {
      result = result.replace(`{${key}}`, String(value))
    }
    return result
  }

  return current as string
}

export function tRaw(lang: LangCode, path: string): any {
  const keys = path.split('.')
  let current: any = translations[lang]
  if (!current) current = translations.en

  for (const key of keys) {
    current = current?.[key]
  }

  if (current !== undefined) return current

  let fallback: any = translations.en
  for (const key of keys) {
    fallback = fallback?.[key]
  }
  return fallback
}

export function tArray(lang: LangCode, path: string): any[] {
  const keys = path.split('.')
  let current: any = translations[lang]
  if (!current) current = translations.en

  for (const key of keys) {
    current = current?.[key]
  }

  if (Array.isArray(current)) return current

  let fallback: any = translations.en
  for (const key of keys) {
    fallback = fallback?.[key]
  }
  return Array.isArray(fallback) ? fallback : []
}

export default translations
