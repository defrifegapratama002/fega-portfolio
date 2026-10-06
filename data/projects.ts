import type { L10n } from "@/lib/i18n";

/**
 * Projects. Each one answers the same questions: what the problem was,
 * how it was approached, what was built, what came out of it.
 *
 * Status labels say what is true: production / shipped / prototype /
 * personal / experimental. Numbers are the real ones or are left out.
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
  /** One line shown before the detail is opened. */
  logline: L10n;
  problem: L10n;
  approach: L10n;
  technologies: string[];
  solution: L10n;
  result: L10n;
  /** Field keys from data/technologies.ts. */
  domains: string[];
  featured: boolean;
  /** Public links, only when they really exist. */
  demoUrl?: string;
  sourceUrl?: string;
};

export const STATUS_LABELS: Record<ProjectStatus, L10n> = {
  production: { en: "In production, used daily", id: "Produksi, dipakai setiap hari" },
  shipped: { en: "Shipped", id: "Sudah rilis" },
  prototype: { en: "Prototype", id: "Prototipe" },
  personal: { en: "Personal project", id: "Proyek pribadi" },
  experimental: { en: "Experiment", id: "Eksperimen" },
};

export const projects: Project[] = [
  {
    slug: "speakenglish",
    title: "AI English Speaking Tutor",
    year: "2026",
    category: { en: "Android app · AI", id: "Aplikasi Android · AI" },
    status: "shipped",
    statusLabel: {
      en: "Signed release, sold directly to users",
      id: "Rilis ter-sign, dijual langsung ke pengguna",
    },
    logline: {
      en: "An English speaking tutor on a phone. It listens, corrects the grammar, and answers out loud.",
      id: "Tutor bicara bahasa Inggris di ponsel. Ia mendengar, mengoreksi tata bahasa, dan menjawab dengan suara.",
    },
    problem: {
      en: "People learning English need a lot of speaking practice and quick feedback on their mistakes. A human tutor costs money and is not available at eleven at night.",
      id: "Orang yang belajar bahasa Inggris butuh banyak latihan bicara dan koreksi cepat atas kesalahannya. Tutor manusia mahal dan tidak selalu ada jam sebelas malam.",
    },
    approach: {
      en: "Run the whole loop on the phone: speech in, understanding, structured grammar correction, spoken answer out. Keep the inference cost at zero by pooling several free-tier LLM providers behind one interface.",
      id: "Seluruh alurnya dijalankan di ponsel: suara masuk, dipahami, koreksi tata bahasa terstruktur, jawaban keluar sebagai suara. Biaya inferensi dijaga nol dengan menggabungkan beberapa provider LLM tier gratis di balik satu antarmuka.",
    },
    technologies: ["Kotlin", "Jetpack Compose", "Speech Recognition", "LLM", "Text-to-Speech", "Room", "Supabase"],
    solution: {
      en: "Eight LLM providers with streaming, key rotation and automatic failover, so when one runs out of quota mid-conversation the next one answers. Device-bound HMAC licensing with a tamper guard and a Supabase backend. Eleven conversation scenarios and a voice loop you can interrupt.",
      id: "Delapan provider LLM dengan streaming, rotasi kunci, dan failover otomatis, jadi saat satu kehabisan kuota di tengah percakapan, berikutnya yang menjawab. Lisensi HMAC terikat perangkat dengan tamper guard dan backend Supabase. Sebelas skenario percakapan dan loop suara yang bisa disela.",
    },
    result: {
      en: "A signed APK sold through WhatsApp with activation codes. Real users, real revenue, no inference bill.",
      id: "APK ter-sign yang dijual lewat WhatsApp dengan kode aktivasi. Pengguna nyata, pemasukan nyata, tanpa tagihan inferensi.",
    },
    domains: ["ai", "mobile"],
    featured: true,
  },
  {
    slug: "itsfr",
    title: "ITSFR Platform",
    year: "2026",
    category: { en: "CRM/ERP · export company", id: "CRM/ERP · perusahaan ekspor" },
    status: "production",
    statusLabel: {
      en: "In production, used in daily operations",
      id: "Produksi, dipakai operasional setiap hari",
    },
    logline: {
      en: "The system an export company runs on: leads, orders, production, warehouse, containers.",
      id: "Sistem yang menjalankan sebuah perusahaan ekspor: lead, pesanan, produksi, gudang, kontainer.",
    },
    problem: {
      en: "An export company ran its sales pipeline, production, warehouse and shipping across scattered spreadsheets. Its most sensitive asset, pricing, could leak with one forwarded file.",
      id: "Sebuah perusahaan ekspor menjalankan pipeline penjualan, produksi, gudang, dan pengiriman lewat spreadsheet yang berserakan. Aset paling sensitifnya, harga, bisa bocor lewat satu file yang diteruskan.",
    },
    approach: {
      en: "Model the real flow, from lead to order to production to warehouse to container, and design the database so it cannot leak what it never stores.",
      id: "Modelkan alur yang sebenarnya, dari lead ke pesanan ke produksi ke gudang ke kontainer, dan rancang database agar tidak bisa membocorkan apa yang tidak pernah ia simpan.",
    },
    technologies: ["Laravel", "Filament", "MySQL", "PHP"],
    solution: {
      en: "Prices are typed at print time, held in session and attached only to the PDF, never saved. Inventory is computed from audited stock movements instead of typed in. FEFO lots, container load calculation, and a customer view across 1,229 companies in 117 countries.",
      id: "Harga diketik saat mencetak, disimpan di session, dan menempel hanya di PDF, tidak pernah disimpan. Inventori dihitung dari pergerakan stok yang teraudit, bukan diketik. Lot FEFO, perhitungan muatan kontainer, dan tampilan pelanggan atas 1.229 perusahaan di 117 negara.",
    },
    result: {
      en: "13 resources, 16 custom pages, around 18k lines of code, in production for the company's daily work.",
      id: "13 resource, 16 halaman custom, sekitar 18 ribu baris kode, dipakai produksi untuk kerja harian perusahaan.",
    },
    domains: ["web", "automation", "data-analytics"],
    featured: true,
  },
  {
    slug: "manga-ocr",
    title: "Manga OCR, Translation, TTS",
    year: "2025",
    category: { en: "Computer vision · NLP", id: "Computer vision · NLP" },
    status: "personal",
    statusLabel: STATUS_LABELS.personal,
    logline: {
      en: "Point it at a manga page. It reads the text, translates it, and reads it aloud.",
      id: "Arahkan ke halaman manga. Ia membaca teksnya, menerjemahkan, lalu membacakannya.",
    },
    problem: {
      en: "Reading manga in Japanese means stopping constantly to look up text that lives inside an image. A dictionary cannot see pictures.",
      id: "Membaca manga berbahasa Jepang berarti terus berhenti untuk mencari teks yang ada di dalam gambar. Kamus tidak bisa melihat gambar.",
    },
    approach: {
      en: "Chain the steps: detect text regions on the page, run OCR, translate the extracted text, then synthesize speech.",
      id: "Rangkai langkahnya: deteksi area teks di halaman, jalankan OCR, terjemahkan teks hasilnya, lalu sintesis suara.",
    },
    technologies: ["Python", "OCR", "Computer Vision", "Translation", "Text-to-Speech"],
    solution: {
      en: "A working pipeline in Python: image, OCR, text, translation, speech.",
      id: "Pipeline yang berjalan di Python: gambar, OCR, teks, terjemahan, suara.",
    },
    result: {
      en: "A personal tool I actually use. It demonstrates the full chain from image to voice.",
      id: "Alat pribadi yang benar-benar saya pakai. Ia menunjukkan rantai lengkap dari gambar ke suara.",
    },
    domains: ["vision", "ai"],
    featured: true,
  },
  {
    slug: "supplierdaging",
    title: "SupplierDaging",
    year: "2026",
    category: { en: "Flutter app · offline back office", id: "Aplikasi Flutter · back office offline" },
    status: "shipped",
    statusLabel: {
      en: "Feature-complete MVP, signed split-ABI releases",
      id: "MVP rampung fitur, rilis split-ABI ter-sign",
    },
    logline: {
      en: "A meat distributor's back office, from point of sale to thermal receipts, in one offline APK.",
      id: "Back office distributor daging, dari kasir sampai struk thermal, dalam satu APK offline.",
    },
    problem: {
      en: "A meat distributor tracked sales, stock, receivables and expiry dates by hand. Internet was unreliable, the goods were perishable, and the money could not be off by a rounding error.",
      id: "Distributor daging mencatat penjualan, stok, piutang, dan tanggal kedaluwarsa secara manual. Internet tidak stabil, barangnya mudah rusak, dan uangnya tidak boleh meleset karena pembulatan.",
    },
    approach: {
      en: "Offline first: the database lives on the device. Money is integer rupiah, weight is integer grams, no floats in the books. Each sale is one atomic transaction.",
      id: "Offline dulu: database hidup di perangkat. Uang dalam rupiah bulat, berat dalam gram bulat, tidak ada float di pembukuan. Setiap penjualan adalah satu transaksi atomik.",
    },
    technologies: ["Flutter", "Dart", "Drift (SQLite)", "Riverpod", "Bluetooth ESC/POS"],
    solution: {
      en: "One sale commits the stock issue, the receivable and the audit trail in a single database transaction. Perishables leave the warehouse first-expired-first-out. Bluetooth thermal printing, PDF and CSV reports, and a written 26-page design system.",
      id: "Satu penjualan mencatat keluar stok, piutang, dan jejak audit dalam satu transaksi database. Barang mudah rusak keluar gudang first-expired-first-out. Cetak thermal Bluetooth, laporan PDF dan CSV, dan design system tertulis 26 halaman.",
    },
    result: {
      en: "17 tables, 34.5k lines of code, signed split-ABI releases. The whole business in one offline APK.",
      id: "17 tabel, 34,5 ribu baris kode, rilis split-ABI ter-sign. Seluruh bisnis dalam satu APK offline.",
    },
    domains: ["mobile", "automation", "data-analytics"],
    featured: true,
  },
  {
    slug: "tourism-data",
    title: "Tourism Data Intelligence",
    year: "2025",
    category: { en: "Data analytics", id: "Analitik data" },
    status: "experimental",
    statusLabel: STATUS_LABELS.experimental,
    logline: {
      en: "Tourism data collected, cleaned and analysed, with written insights at the end.",
      id: "Data pariwisata dikumpulkan, dibersihkan, dan dianalisis, dengan insight tertulis di akhirnya.",
    },
    problem: {
      en: "Tourism data sits in scattered, messy sources. Signals about visitors and trends stay invisible until someone collects and cleans them.",
      id: "Data pariwisata tersebar di sumber yang berantakan. Sinyal tentang pengunjung dan tren tetap tak terlihat sampai ada yang mengumpulkan dan membersihkannya.",
    },
    approach: {
      en: "The standard analytics pipeline, done properly: collect, clean, analyse with pandas, visualise, and write down what a decision-maker could act on.",
      id: "Pipeline analitik standar, dikerjakan dengan benar: kumpulkan, bersihkan, analisis dengan pandas, visualisasikan, dan tuliskan apa yang bisa ditindaklanjuti pengambil keputusan.",
    },
    technologies: ["Python", "pandas", "Data Collection", "Data Visualization"],
    solution: {
      en: "A reproducible collection, cleaning, analysis and visualisation workflow over real tourism data.",
      id: "Alur kerja pengumpulan, pembersihan, analisis, dan visualisasi yang bisa diulang atas data pariwisata nyata.",
    },
    result: {
      en: "Explorable charts and written insights. Most of the work was cleaning.",
      id: "Grafik yang bisa dijelajahi dan insight tertulis. Sebagian besar kerjanya adalah pembersihan.",
    },
    domains: ["data-analytics", "data-science"],
    featured: true,
  },
  {
    slug: "sentiment",
    title: "Sentiment Analysis",
    year: "2025",
    category: { en: "Data science · NLP", id: "Data science · NLP" },
    status: "experimental",
    statusLabel: STATUS_LABELS.experimental,
    logline: {
      en: "A classifier that reads the mood of thousands of written opinions.",
      id: "Classifier yang membaca suasana hati dari ribuan opini tertulis.",
    },
    problem: {
      en: "Thousands of written opinions cannot be read one by one, but the overall sentiment is exactly what a decision-maker wants to know.",
      id: "Ribuan opini tertulis tidak mungkin dibaca satu per satu, padahal sentimen keseluruhannya justru yang ingin diketahui pengambil keputusan.",
    },
    approach: {
      en: "Preprocess and normalise the text, extract features, train and evaluate a classifier, then look at where and why it fails.",
      id: "Praproses dan normalisasi teks, ekstraksi fitur, latih dan evaluasi classifier, lalu lihat di mana dan mengapa ia gagal.",
    },
    technologies: ["Python", "NLP", "Machine Learning", "scikit-learn"],
    solution: {
      en: "A text-to-sentiment pipeline with scikit-learn, evaluated on accuracy and on its failure cases.",
      id: "Pipeline teks-ke-sentimen dengan scikit-learn, dievaluasi pada akurasi dan pada kasus gagalnya.",
    },
    result: {
      en: "A working classifier and a documented understanding of the whole NLP workflow.",
      id: "Classifier yang bekerja dan pemahaman terdokumentasi atas seluruh alur kerja NLP.",
    },
    domains: ["data-science", "ai"],
    featured: true,
  },
  {
    slug: "zonzon",
    title: "ZONZON × zonzon.shop",
    year: "2026",
    category: { en: "Web · D2C brand and shop, Japan", id: "Web · brand D2C dan toko, Jepang" },
    status: "shipped",
    statusLabel: {
      en: "Pre-launch; checkout is stubbed and says so",
      id: "Pra-rilis; checkout belum aktif dan ditandai begitu",
    },
    logline: {
      en: "A wooden inhaler for the Japanese market, sold through a website that tells its story like a documentary.",
      id: "Inhaler kayu untuk pasar Jepang, dijual lewat website yang menceritakannya seperti dokumenter.",
    },
    problem: {
      en: "A physical product entering Japan needs trust before transactions. Its story cannot be told by a template store, and every claim has to comply with 薬機法 advertising law.",
      id: "Produk fisik yang masuk pasar Jepang butuh kepercayaan sebelum transaksi. Kisahnya tidak bisa diceritakan template toko biasa, dan setiap klaim harus mematuhi hukum iklan 薬機法.",
    },
    approach: {
      en: "Build the brand as a film: nine scroll-driven chapters, with the shop inside the story. Compliance is a design input; every claim is written to satisfy 薬機法.",
      id: "Bangun brand sebagai film: sembilan babak yang digerakkan scroll, dengan toko di dalam ceritanya. Kepatuhan adalah input desain; setiap klaim ditulis agar memenuhi 薬機法.",
    },
    technologies: ["Next.js", "React", "Three.js / R3F", "GSAP", "Tailwind CSS", "TanStack Start", "Cloudflare Workers"],
    solution: {
      en: "A 755-line scroll-scrub video engine without libraries, with blob-fetched instant seeking. A 3D product built from lathe-profiled geometry with walnut grain painted by code at runtime: 260 bezier strokes, drag to rotate.",
      id: "Engine video scroll-scrub 755 baris tanpa library, dengan seeking instan lewat blob. Produk 3D dari geometri profil lathe dengan serat walnut yang dilukis kode saat runtime: 260 goresan bezier, drag untuk memutar.",
    },
    result: {
      en: "14 routes, a 113-frame canvas hero, aroma-reactive theming, mobile encodes. Brand and shop are feature-complete, CI green.",
      id: "14 rute, hero canvas 113 frame, theming reaktif-aroma, encode mobile. Brand dan toko rampung fitur, CI hijau.",
    },
    domains: ["web", "mobile"],
    featured: true,
  },
  {
    slug: "portfolio",
    title: "This site",
    year: "2026",
    category: { en: "Web · the page you are on", id: "Web · halaman yang sedang Anda buka" },
    status: "shipped",
    statusLabel: {
      en: "Live, open source",
      id: "Live, open source",
    },
    logline: {
      en: "A static Next.js page with scroll-driven chapter scenes and small demos you can run in the browser.",
      id: "Halaman Next.js statis dengan adegan bab yang mengikuti scroll dan demo kecil yang bisa dijalankan di browser.",
    },
    problem: {
      en: "A list of skills proves nothing. I wanted a page where the demos run in the visitor's browser and every project says plainly what state it is in.",
      id: "Daftar skill tidak membuktikan apa-apa. Saya ingin halaman yang demonya jalan di browser pengunjung, dan setiap proyek menyatakan apa adanya statusnya.",
    },
    approach: {
      en: "One page, static export, no tracking. Content lives in data files. The chapter scenes are hand-coded SVG driven by scroll position, and four colour themes share one set of tokens.",
      id: "Satu halaman, ekspor statis, tanpa pelacakan. Konten hidup di file data. Adegan babnya SVG yang ditulis tangan dan digerakkan posisi scroll, dan empat tema warna memakai satu set token.",
    },
    technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
    solution: {
      en: "Next.js 15 static export, React 19, Tailwind 4. Scroll-scrubbed chapter scenes without an animation library, bilingual copy, reduced-motion support.",
      id: "Next.js 15 ekspor statis, React 19, Tailwind 4. Adegan bab scroll-scrub tanpa library animasi, copy dwibahasa, dukungan reduced-motion.",
    },
    result: {
      en: "You are reading it. Source on GitHub.",
      id: "Anda sedang membacanya. Kode sumbernya di GitHub.",
    },
    domains: ["web"],
    featured: true,
    sourceUrl: "https://github.com/defrifegapratama002/fega-portfolio",
  },
];

/** The remaining shipped systems, in one table. */
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
      en: "Water-depot PWA for 4 roles, 30 RLS policies, GPS delivery proof",
      id: "PWA depot air untuk 4 peran, 30 kebijakan RLS, bukti antar GPS",
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
      en: "Client project: document management, RBAC, versioning",
      id: "Garapan klien: manajemen dokumen, RBAC, versioning",
    },
    stack: "Express · Prisma · Postgres",
  },
  {
    year: "2026",
    title: "SpeakJapanese",
    what: {
      en: "The MVP before SpeakEnglish, with a custom furigana renderer",
      id: "MVP sebelum SpeakEnglish, dengan renderer furigana custom",
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
