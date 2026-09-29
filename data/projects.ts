import type { L10n } from "@/lib/i18n";

/**
 * Data-driven project architecture (blueprint §45), extended with the
 * problem → approach → technology → solution → result → lesson structure
 * every project must answer (blueprint §20, §23).
 *
 * Status labels are honest (blueprint §47): production / shipped /
 * prototype / personal / experimental — as things really are.
 */

export type ProjectStatus =
  | "production"
  | "shipped"
  | "prototype"
  | "personal"
  | "experimental";

export type Project = {
  slug: string;
  title: string;
  year: string;
  category: L10n;
  status: ProjectStatus;
  statusLabel: L10n;
  /** One-line logline shown on the card before it is opened. */
  logline: L10n;
  problem: L10n;
  approach: L10n;
  technologies: string[];
  solution: L10n;
  result: L10n;
  lesson: L10n;
  /** Compact visual pipeline for the case study (blueprint flow diagrams). */
  pipeline: string[];
  /** Ecosystem domains this project proves (keys from data/technologies.ts). */
  domains: string[];
  featured: boolean;
  /** Public links (specification §33) — only when they really exist. */
  demoUrl?: string;
  sourceUrl?: string;
};

export const STATUS_LABELS: Record<ProjectStatus, L10n> = {
  production: { en: "In production — used daily", id: "Produksi — dipakai setiap hari" },
  shipped: { en: "Shipped release", id: "Rilis rampung" },
  prototype: { en: "Prototype", id: "Prototipe" },
  personal: { en: "Personal project", id: "Project pribadi" },
  experimental: { en: "Experimental project", id: "Project eksperimental" },
};

export const projects: Project[] = [
  {
    slug: "speakenglish",
    title: "AI English Speaking Tutor",
    year: "2026",
    category: { en: "AI × Mobile — Android", id: "AI × Mobile — Android" },
    status: "shipped",
    statusLabel: {
      en: "Signed release — sold directly to users",
      id: "Release ter-sign — dijual langsung ke pengguna",
    },
    logline: {
      en: "An AI tutor that listens, understands, corrects, and talks back.",
      id: "Tutor AI yang mendengar, memahami, mengoreksi, dan membalas bicara.",
    },
    problem: {
      en: "Learners need far more opportunities to practice speaking naturally — and immediate feedback when they make mistakes. A human tutor is expensive and not always available.",
      id: "Pembelajar butuh jauh lebih banyak kesempatan berlatih bicara secara natural — dan umpan balik seketika saat salah. Tutor manusia mahal dan tidak selalu ada.",
    },
    approach: {
      en: "Build the whole speaking loop on a phone: speech in, understanding, structured grammar correction, spoken response out. Keep inference cost at zero by pooling free-tier LLM providers behind one interface.",
      id: "Bangun seluruh loop berbicara di ponsel: suara masuk, pemahaman, koreksi grammar terstruktur, respons suara keluar. Biaya inferensi nol dengan menggabungkan provider LLM tier gratis di balik satu interface.",
    },
    technologies: ["Kotlin", "Jetpack Compose", "Speech Recognition", "LLM", "Text-to-Speech", "Room", "Supabase"],
    solution: {
      en: "Eight LLM providers with streaming, key rotation and automatic failover — when one runs dry mid-conversation, the next answers. Device-bound HMAC licensing with a tamper guard and a Supabase backend. Eleven conversation scenarios with a barge-in voice loop.",
      id: "Delapan provider LLM dengan streaming, rotasi kunci, dan failover otomatis — saat satu kehabisan kuota di tengah percakapan, berikutnya menjawab. Lisensi HMAC terikat perangkat dengan tamper guard dan backend Supabase. Sebelas skenario percakapan dengan loop suara barge-in.",
    },
    result: {
      en: "A signed APK sold directly via WhatsApp with activation codes — real users, real revenue, $0 inference cost.",
      id: "APK ter-sign dijual langsung via WhatsApp dengan kode aktivasi — pengguna nyata, pendapatan nyata, biaya inferensi $0.",
    },
    lesson: {
      en: "Reliability is a product feature. The failover layer — not the model — is what made the app sellable.",
      id: "Keandalan adalah fitur produk. Lapisan failover — bukan modelnya — yang membuat aplikasi ini layak dijual.",
    },
    pipeline: ["USER", "MICROPHONE", "SPEECH RECOGNITION", "AI", "RESPONSE", "VOICE"],
    domains: ["ai", "mobile"],
    featured: true,
  },
  {
    slug: "itsfr",
    title: "ITSFR Platform",
    year: "2026",
    category: { en: "CRM/ERP — export operations", id: "CRM/ERP — operasional ekspor" },
    status: "production",
    statusLabel: {
      en: "In production — used in daily operations",
      id: "Produksi — dipakai operasional setiap hari",
    },
    logline: {
      en: "The operating system of an export business: leads in, containers out.",
      id: "Sistem operasi sebuah bisnis ekspor: lead masuk, kontainer keluar.",
    },
    problem: {
      en: "An export company ran its pipeline, production, warehouse and shipping across scattered spreadsheets — and its most sensitive asset, pricing, could leak with a single forwarded file.",
      id: "Sebuah perusahaan ekspor menjalankan pipeline, produksi, gudang, dan pengiriman lewat spreadsheet berserakan — dan aset paling sensitifnya, harga, bisa bocor lewat satu file yang diteruskan.",
    },
    approach: {
      en: "Treat trade secrets and real operations as design inputs, not obstacles. Model the real flow — lead → order → production → warehouse → container — and design the database so it physically cannot leak what it never stores.",
      id: "Perlakukan rahasia dagang dan operasional nyata sebagai input desain, bukan penghalang. Modelkan alur nyata — lead → order → produksi → gudang → kontainer — dan rancang database agar secara fisik tak bisa membocorkan yang tak pernah ia simpan.",
    },
    technologies: ["Laravel", "Filament", "MySQL", "PHP"],
    solution: {
      en: "Prices are typed at print time, held in session, attached only to the PDF — never persisted. Inventory is computed from audited stock movements, never typed. FEFO lots, container-load math, a 360° customer view over 1,229 companies in 117 countries.",
      id: "Harga diketik saat mencetak, disimpan di session, menempel hanya pada PDF — tak pernah dipersistenkan. Inventori dihitung dari pergerakan stok teraudit, tak pernah diketik. Lot FEFO, matematika muatan kontainer, tampilan pelanggan 360° atas 1.229 perusahaan di 117 negara.",
    },
    result: {
      en: "13 resources, 16 custom pages, ~18k lines of code — running the company's daily operations in production.",
      id: "13 resource, 16 halaman custom, ~18 ribu baris kode — menjalankan operasi harian perusahaan di produksi.",
    },
    lesson: {
      en: "The safest data is data you never store. Security by architecture beats security by policy.",
      id: "Data teraman adalah data yang tak pernah disimpan. Keamanan lewat arsitektur mengalahkan keamanan lewat aturan.",
    },
    pipeline: ["LEAD", "ORDER", "PRODUCTION", "WAREHOUSE", "CONTAINER", "INSIGHT"],
    domains: ["web", "automation", "data-analytics"],
    featured: true,
  },
  {
    slug: "manga-ocr",
    title: "Manga OCR / Translation / TTS",
    year: "2025",
    category: { en: "Computer Vision × NLP", id: "Computer Vision × NLP" },
    status: "personal",
    statusLabel: STATUS_LABELS.personal,
    logline: {
      en: "Point it at a manga page — it reads, translates, and speaks.",
      id: "Arahkan ke halaman manga — ia membaca, menerjemahkan, dan bersuara.",
    },
    problem: {
      en: "Reading manga in Japanese means constantly stopping to look up text locked inside images — dictionaries can't see pictures.",
      id: "Membaca manga berbahasa Jepang berarti terus berhenti untuk mencari teks yang terkunci di dalam gambar — kamus tak bisa melihat gambar.",
    },
    approach: {
      en: "Chain vision and language into one pipeline: detect text regions in the page image, run OCR, translate the extracted text, then synthesize speech — so the page becomes readable and audible.",
      id: "Rangkai vision dan bahasa dalam satu pipeline: deteksi area teks pada gambar halaman, jalankan OCR, terjemahkan teks hasil ekstraksi, lalu sintesis suara — halaman jadi terbaca dan terdengar.",
    },
    technologies: ["Python", "OCR", "Computer Vision", "Translation", "Text-to-Speech"],
    solution: {
      en: "A working image → OCR → text → translation → speech pipeline that turns raw manga panels into translated, spoken text.",
      id: "Pipeline gambar → OCR → teks → terjemahan → suara yang mengubah panel manga mentah menjadi teks terjemahan yang diucapkan.",
    },
    result: {
      en: "A personal tool that demonstrates the full vision-to-speech chain end to end.",
      id: "Alat pribadi yang mendemonstrasikan rantai lengkap vision-ke-suara dari ujung ke ujung.",
    },
    lesson: {
      en: "Most real AI value comes from chaining simple capabilities well, not from one heroic model.",
      id: "Nilai AI yang nyata kebanyakan lahir dari merangkai kemampuan sederhana dengan baik, bukan dari satu model heroik.",
    },
    pipeline: ["MANGA IMAGE", "OCR", "TEXT", "TRANSLATION", "TEXT-TO-SPEECH", "VOICE"],
    domains: ["vision", "ai"],
    featured: true,
  },
  {
    slug: "supplierdaging",
    title: "SupplierDaging",
    year: "2026",
    category: { en: "Mobile — offline-first back office", id: "Mobile — back office offline-first" },
    status: "shipped",
    statusLabel: {
      en: "Feature-complete MVP — signed split-ABI releases",
      id: "MVP rampung fitur — release split-ABI ter-sign",
    },
    logline: {
      en: "A meat distributor's entire back office — POS to thermal receipts — offline, in one APK.",
      id: "Seluruh back office distributor daging — POS sampai struk thermal — offline, dalam satu APK.",
    },
    problem: {
      en: "A meat distributor ran sales, stock, receivables and expiry tracking by hand — with unreliable internet, perishable goods, and money that must never be off by a rounding error.",
      id: "Distributor daging menjalankan penjualan, stok, piutang, dan pelacakan kedaluwarsa secara manual — dengan internet tak stabil, barang mudah rusak, dan uang yang tak boleh meleset karena pembulatan.",
    },
    approach: {
      en: "Offline-first by design: the database lives on the device. Money is integer rupiah, weight is integer grams — floats never touch the books. Every sale is one atomic transaction.",
      id: "Offline-first sejak desain: database hidup di perangkat. Uang adalah rupiah bulat, berat adalah gram bulat — float tak pernah menyentuh pembukuan. Setiap penjualan adalah satu transaksi atomik.",
    },
    technologies: ["Flutter", "Dart", "Drift (SQLite)", "Riverpod", "Bluetooth ESC/POS"],
    solution: {
      en: "One sale commits stock issue, receivable and audit trail in a single database transaction; perishables leave the warehouse first-expired-first-out. Bluetooth thermal printing, PDF/CSV reports, and a written 26-page design system.",
      id: "Satu penjualan mencatat keluar stok, piutang, dan jejak audit dalam satu transaksi database; barang mudah rusak keluar gudang first-expired-first-out. Cetak thermal Bluetooth, laporan PDF/CSV, dan design system tertulis 26 halaman.",
    },
    result: {
      en: "17 tables, 34.5k lines of code, signed split-ABI releases — the whole business in one offline APK.",
      id: "17 tabel, 34,5 ribu baris kode, release split-ABI ter-sign — seluruh bisnis dalam satu APK offline.",
    },
    lesson: {
      en: "Constraints (offline, perishable, exact money) are the spec. Respect them and the architecture designs itself.",
      id: "Batasan (offline, mudah rusak, uang presisi) adalah spesifikasinya. Hormati itu dan arsitekturnya merancang dirinya sendiri.",
    },
    pipeline: ["INPUT", "POS", "DATABASE", "STOCK / FEFO", "RECEIPT", "REPORT"],
    domains: ["mobile", "automation", "data-analytics"],
    featured: true,
  },
  {
    slug: "tourism-data",
    title: "Tourism Data Intelligence",
    year: "2025",
    category: { en: "Data Analytics", id: "Data Analytics" },
    status: "experimental",
    statusLabel: STATUS_LABELS.experimental,
    logline: {
      en: "Raw tourism data collected, cleaned, analyzed — turned into decisions.",
      id: "Data pariwisata mentah dikumpulkan, dibersihkan, dianalisis — menjadi keputusan.",
    },
    problem: {
      en: "Tourism data exists in scattered, messy sources — useful signals about visitors and trends stay invisible without collection and analysis.",
      id: "Data pariwisata tersebar di sumber yang berantakan — sinyal berharga tentang pengunjung dan tren tetap tak terlihat tanpa pengumpulan dan analisis.",
    },
    approach: {
      en: "Build the classic analytics pipeline honestly: collect from sources, clean, analyze with pandas, visualize, and write down the insights a decision-maker could act on.",
      id: "Bangun pipeline analitik klasik dengan jujur: kumpulkan dari sumber, bersihkan, analisis dengan pandas, visualisasikan, dan tuliskan insight yang bisa ditindaklanjuti pengambil keputusan.",
    },
    technologies: ["Python", "pandas", "Data Collection", "Data Visualization"],
    solution: {
      en: "A reproducible collection → cleaning → analysis → visualization workflow over real tourism data.",
      id: "Alur kerja pengumpulan → pembersihan → analisis → visualisasi yang dapat direproduksi atas data pariwisata nyata.",
    },
    result: {
      en: "Explorable visualizations and written insights — the full raw-data-to-decision path, demonstrated.",
      id: "Visualisasi yang dapat dieksplorasi dan insight tertulis — jalur lengkap data-mentah-ke-keputusan, didemonstrasikan.",
    },
    lesson: {
      en: "Data becomes valuable only when it helps someone make a better decision. Cleaning is 80% of the work.",
      id: "Data baru bernilai saat membantu seseorang mengambil keputusan lebih baik. Pembersihan adalah 80% pekerjaannya.",
    },
    pipeline: ["DATA SOURCES", "COLLECTION", "CLEANING", "ANALYSIS", "VISUALIZATION", "INSIGHT"],
    domains: ["data-analytics", "data-science"],
    featured: true,
  },
  {
    slug: "sentiment",
    title: "Sentiment Analysis",
    year: "2025",
    category: { en: "Data Science × NLP", id: "Data Science × NLP" },
    status: "experimental",
    statusLabel: STATUS_LABELS.experimental,
    logline: {
      en: "Teaching a model to read feeling from raw text.",
      id: "Mengajari model membaca perasaan dari teks mentah.",
    },
    problem: {
      en: "Thousands of text opinions are impossible to read one by one — yet the overall sentiment is exactly what a decision-maker needs.",
      id: "Ribuan opini teks mustahil dibaca satu per satu — padahal sentimen keseluruhannya justru yang dibutuhkan pengambil keputusan.",
    },
    approach: {
      en: "The standard NLP path, done properly: preprocess and normalize the text, extract features, train and evaluate a classification model, then analyze where and why it fails.",
      id: "Jalur NLP standar, dikerjakan dengan benar: praproses dan normalisasi teks, ekstraksi fitur, latih dan evaluasi model klasifikasi, lalu analisis di mana dan mengapa ia gagal.",
    },
    technologies: ["Python", "NLP", "Machine Learning", "scikit-learn"],
    solution: {
      en: "A text → preprocessing → NLP → model → sentiment pipeline with honest evaluation of its accuracy and failure cases.",
      id: "Pipeline teks → praproses → NLP → model → sentimen dengan evaluasi jujur atas akurasi dan kasus gagalnya.",
    },
    result: {
      en: "A working classifier and — more importantly — a documented understanding of the full NLP workflow.",
      id: "Classifier yang bekerja dan — lebih penting — pemahaman terdokumentasi atas alur kerja NLP lengkap.",
    },
    lesson: {
      en: "A model's errors teach more than its accuracy score. Evaluation is where data science actually happens.",
      id: "Kesalahan model mengajarkan lebih banyak daripada skor akurasinya. Evaluasi adalah tempat data science sesungguhnya terjadi.",
    },
    pipeline: ["TEXT", "PREPROCESSING", "NLP", "MODEL", "SENTIMENT", "ANALYSIS"],
    domains: ["data-science", "ai"],
    featured: true,
  },
  {
    slug: "zonzon",
    title: "ZONZON × zonzon.shop",
    year: "2026",
    category: { en: "D2C brand world + cinematic commerce — Japan", id: "Dunia brand D2C + commerce sinematik — Jepang" },
    status: "shipped",
    statusLabel: {
      en: "Pre-launch — checkout honestly stubbed",
      id: "Pra-rilis — checkout jujur ditandai belum aktif",
    },
    logline: {
      en: "A wooden inhaler for Japan — sold by a website that explains it like a documentary.",
      id: "Inhaler kayu untuk Jepang — dijual oleh website yang menjelaskannya seperti dokumenter.",
    },
    problem: {
      en: "A physical product entering the Japanese market needs trust before transactions — and its story can't be told by a template store under 薬機法 advertising law.",
      id: "Produk fisik yang masuk pasar Jepang butuh kepercayaan sebelum transaksi — dan kisahnya tak bisa diceritakan template toko biasa di bawah hukum iklan 薬機法.",
    },
    approach: {
      en: "Build the brand as a film: nine scroll-scrubbed chapters where the shop is the movie. Compliance is a design input — every claim written to satisfy 薬機法.",
      id: "Bangun brand sebagai film: sembilan babak scroll-scrub di mana tokonya adalah filmnya. Kepatuhan adalah input desain — setiap klaim ditulis memenuhi 薬機法.",
    },
    technologies: ["Next.js", "React", "Three.js / R3F", "GSAP", "Tailwind CSS", "TanStack Start", "Cloudflare Workers"],
    solution: {
      en: "A 755-line zero-library scroll-scrub video engine with blob-fetched instant seeking; a 3D product built from lathe-profiled geometry with walnut grain painted by code at runtime — 260 bezier strokes, drag to rotate.",
      id: "Engine scroll-scrub video 755 baris tanpa library dengan seeking instan via blob; produk 3D dari geometri profil lathe dengan serat walnut yang dilukis kode saat runtime — 260 goresan bezier, drag untuk memutar.",
    },
    result: {
      en: "14 routes, a 113-frame canvas hero, aroma-reactive theming, mobile encodes — feature-complete brand + shop, CI green.",
      id: "14 rute, hero canvas 113 frame, theming reaktif-aroma, encode mobile — brand + toko rampung fitur, CI hijau.",
    },
    lesson: {
      en: "Motion is storytelling. A scroll bar can be a film reel if every frame earns its place.",
      id: "Motion adalah storytelling. Scroll bar bisa menjadi rol film jika setiap frame layak berada di sana.",
    },
    pipeline: ["STORY", "9 CHAPTERS", "SCROLL ENGINE", "3D PRODUCT", "SHOP", "CUSTOMER"],
    domains: ["web", "mobile"],
    featured: true,
  },
  {
    slug: "portfolio",
    title: "Interactive Technology Portfolio",
    year: "2026",
    category: { en: "Web — the site you are on", id: "Web — situs yang sedang Anda buka" },
    status: "shipped",
    statusLabel: {
      en: "Live — you are experiencing it right now",
      id: "Live — sedang Anda alami saat ini",
    },
    logline: {
      en: "The meta-project: a portfolio that demonstrates skills instead of listing them.",
      id: "Meta-project: portfolio yang mendemonstrasikan skill alih-alih mendaftarnya.",
    },
    problem: {
      en: "Traditional portfolios describe skills without demonstrating them. \"I know 3D / motion / AI\" is a claim, not evidence.",
      id: "Portfolio tradisional mendeskripsikan skill tanpa mendemonstrasikannya. \"Saya bisa 3D / motion / AI\" adalah klaim, bukan bukti.",
    },
    approach: {
      en: "Don't just tell — demonstrate. Every section of this site turns a skill into an experience: the hero is real-time 3D, the motion is scroll-driven storytelling, the demos run in your browser.",
      id: "Jangan hanya bercerita — demonstrasikan. Setiap seksi situs ini mengubah skill menjadi pengalaman: hero-nya 3D real-time, motion-nya storytelling berbasis scroll, demonya berjalan di browser Anda.",
    },
    technologies: ["Next.js", "React", "TypeScript", "Three.js / React Three Fiber", "GSAP", "Tailwind CSS"],
    solution: {
      en: "An interactive single-journey site: a 3D digital core, an explorable technology ecosystem, live in-browser demonstrations, and case studies structured as problem → solution.",
      id: "Situs satu-perjalanan interaktif: digital core 3D, ekosistem teknologi yang dapat dijelajahi, demonstrasi live di browser, dan studi kasus terstruktur masalah → solusi.",
    },
    result: {
      en: "You are reading the result. Static-exported, accessible, reduced-motion aware, and open source on GitHub.",
      id: "Anda sedang membaca hasilnya. Diekspor statis, aksesibel, menghormati reduced-motion, dan open source di GitHub.",
    },
    lesson: {
      en: "A portfolio is a product. The user experience is the résumé.",
      id: "Portfolio adalah produk. Pengalaman penggunanya adalah CV-nya.",
    },
    pipeline: ["SKILL", "EXPERIENCE", "DEMONSTRATION", "PROOF"],
    domains: ["web"],
    featured: true,
    sourceUrl: "https://github.com/defrifegapratama002/fega-portfolio",
  },
];

/** Compact index of the remaining shipped systems (full filmography). */
export type MiniProject = {
  year: string;
  title: string;
  what: L10n;
  stack: string;
};

export const moreProjects: MiniProject[] = [
  {
    year: "2026",
    title: "GalonHarmoni",
    what: {
      en: "4-role water-depot PWA — 30 RLS policies, GPS delivery proof",
      id: "PWA depot air 4 peran — 30 kebijakan RLS, bukti antar GPS",
    },
    stack: "Next.js · Supabase",
  },
  {
    year: "2026",
    title: "FegaTutor",
    what: {
      en: "Voice language-tutor server, per-sentence TTS streaming",
      id: "Server tutor bahasa bersuara, streaming TTS per kalimat",
    },
    stack: "Node · Claude Agent SDK",
  },
  {
    year: "2026",
    title: "Secure DMS",
    what: {
      en: "Client build — enterprise document management, RBAC, versioning",
      id: "Garapan klien — manajemen dokumen enterprise, RBAC, versioning",
    },
    stack: "Express · Prisma · Postgres",
  },
  {
    year: "2026",
    title: "SpeakJapanese",
    what: {
      en: "The MVP before SpeakEnglish — custom furigana renderer",
      id: "MVP sebelum SpeakEnglish — renderer furigana custom",
    },
    stack: "Kotlin · Compose",
  },
  {
    year: "2025–26",
    title: "ITS RYO Configurator",
    what: {
      en: "7-variant B2B product configurator in three dependency-free HTML files",
      id: "Configurator produk B2B 7 varian dalam tiga file HTML tanpa dependency",
    },
    stack: "Vanilla ES6 · SVG",
  },
  {
    year: "2025",
    title: "July Sunflowers",
    what: {
      en: "186-SKU storefront where the CMS is a CSV file",
      id: "Storefront 186 SKU yang CMS-nya sebuah file CSV",
    },
    stack: "Vue 3 · Vite",
  },
  {
    year: "2024",
    title: "Leaf-Disease CNN (thesis)",
    what: {
      en: "Trained crop-disease classifier, deployed live as a web app",
      id: "Classifier penyakit tanaman terlatih, live sebagai web app",
    },
    stack: "TensorFlow · Flask · Vercel",
  },
];
