import type { L10n } from "@/lib/i18n";

/**
 * Consult — a visitor picks the problem closest to theirs and is routed
 * to the technology areas that usually solve it (keys from
 * data/technologies.ts), the case studies that prove it (slugs from
 * data/projects.ts), and a first step they can take today.
 *
 * Honest by design: "usually", "often" — no promises before a conversation.
 */

export type ConsultCase = {
  id: string;
  /** Short label on the picker. */
  label: L10n;
  /** One-line symptom under the label. */
  symptom: L10n;
  /** What is usually going on underneath. */
  cause: L10n;
  /** How I would approach it, in order. */
  steps: L10n[];
  /** Something the visitor can do today, before talking to anyone. */
  today: L10n;
  /** Technology areas that usually apply — keys from data/technologies.ts. */
  techKeys: string[];
  /** Case studies that prove it — slugs from data/projects.ts. */
  projectSlugs: string[];
  /** Pre-filled email subject and opening line. */
  subject: L10n;
  body: L10n;
};

export const consultCases: ConsultCase[] = [
  {
    id: "manual",
    label: { en: "Our work still runs on spreadsheets", id: "Pekerjaan kami masih jalan di spreadsheet" },
    symptom: {
      en: "Files forwarded around, numbers typed twice, nobody sure which version is right.",
      id: "File diteruskan ke sana kemari, angka diketik dua kali, tak ada yang yakin versi mana yang benar.",
    },
    cause: {
      en: "Spreadsheets survive because they \"still work\". The cost shows up later: duplicated data, silent mistakes, and people acting as the integration layer between files. Sensitive numbers travel with every forwarded file.",
      id: "Spreadsheet bertahan karena \"masih jalan\". Biayanya muncul belakangan: data ganda, kesalahan senyap, dan manusia yang menjadi lapisan integrasi antar-file. Angka sensitif ikut berpindah setiap kali file diteruskan.",
    },
    steps: [
      {
        en: "Map the real flow first — who enters what, where, and why — without changing anything yet.",
        id: "Petakan alur nyata dulu — siapa memasukkan apa, di mana, dan mengapa — tanpa mengubah apa pun.",
      },
      {
        en: "Replace the single most painful step with a small system that computes instead of copies.",
        id: "Ganti satu langkah paling menyakitkan dengan sistem kecil yang menghitung, bukan menyalin.",
      },
      {
        en: "Grow it step by step from real usage — not one big system delivered all at once.",
        id: "Kembangkan bertahap dari pemakaian nyata — bukan satu sistem besar yang diserahkan sekaligus.",
      },
    ],
    today: {
      en: "Write down the one repetitive task that ate the most hours this week, and how long it took. That is candidate number one.",
      id: "Tulis satu tugas berulang yang paling menyita jam minggu ini, beserta durasinya. Itu kandidat nomor satu.",
    },
    techKeys: ["automation", "web", "data-analytics"],
    projectSlugs: ["itsfr", "supplierdaging"],
    subject: { en: "Our operations still run on spreadsheets", id: "Operasional kami masih jalan di spreadsheet" },
    body: {
      en: "Hi Defri, our work still runs on spreadsheets. The most painful part is: ",
      id: "Halo Defri, pekerjaan kami masih jalan di spreadsheet. Bagian yang paling menyakitkan adalah: ",
    },
  },
  {
    id: "data",
    label: { en: "We have data but no insight", id: "Kami punya data, tapi tanpa insight" },
    symptom: {
      en: "Numbers pile up; decisions are still made on gut feeling.",
      id: "Angka menumpuk; keputusan tetap diambil berdasarkan firasat.",
    },
    cause: {
      en: "Data without a question is just storage. What is usually missing is not a bigger dashboard but three to five numbers that actually change a decision — cleaned, trusted, and looked at regularly.",
      id: "Data tanpa pertanyaan hanyalah tumpukan. Yang biasanya hilang bukan dasbor yang lebih besar, melainkan tiga sampai lima angka yang benar-benar mengubah keputusan — bersih, tepercaya, dan dilihat rutin.",
    },
    steps: [
      {
        en: "Agree on the decision the data should support, then work backwards to the metrics.",
        id: "Sepakati keputusan yang harus didukung data, lalu bekerja mundur ke metriknya.",
      },
      {
        en: "Clean and join the sources once, so every number has one origin.",
        id: "Bersihkan dan gabungkan sumbernya sekali, sehingga setiap angka punya satu asal.",
      },
      {
        en: "Visualize simply and honestly; when the question turns into \"what happens next?\", add a model.",
        id: "Visualisasikan dengan sederhana dan jujur; saat pertanyaannya berubah menjadi \"apa berikutnya?\", tambahkan model.",
      },
    ],
    today: {
      en: "Write down one decision you want to make this month. Then ask: which number would make that decision obvious?",
      id: "Tulis satu keputusan yang ingin Anda ambil bulan ini. Lalu tanya: angka apa yang akan membuat keputusan itu jelas?",
    },
    techKeys: ["data-analytics", "data-science"],
    projectSlugs: ["tourism-data", "sentiment"],
    subject: { en: "We have data but no insight", id: "Kami punya data tapi tanpa insight" },
    body: {
      en: "Hi Defri, we have data about ... and the decision we want to make is: ",
      id: "Halo Defri, kami punya data tentang ... dan keputusan yang ingin kami ambil adalah: ",
    },
  },
  {
    id: "web",
    label: { en: "Our website is slow or nobody finds it", id: "Website kami lambat atau tak ditemukan" },
    symptom: {
      en: "Visitors leave before the page loads; the site does not sell or explain.",
      id: "Pengunjung pergi sebelum halaman selesai dimuat; situs tidak menjual atau menjelaskan.",
    },
    cause: {
      en: "Usually oversized images, too many third-party scripts, and a page that tries to say everything. Slow also means wasteful — every extra second is energy burned on the visitor's phone and on a server somewhere.",
      id: "Biasanya gambar terlalu besar, terlalu banyak skrip pihak ketiga, dan halaman yang mencoba mengatakan segalanya. Lambat juga berarti boros — setiap detik ekstra adalah energi yang terbakar di ponsel pengunjung dan di sebuah server.",
    },
    steps: [
      {
        en: "Measure first with open tools (Lighthouse, WebPageTest) and show you the numbers.",
        id: "Ukur dulu dengan alat terbuka (Lighthouse, WebPageTest) dan tunjukkan angkanya.",
      },
      {
        en: "Fix in order of impact: images, scripts, caching, then structure and copy.",
        id: "Perbaiki berurutan dari yang paling berdampak: gambar, skrip, caching, lalu struktur dan teks.",
      },
      {
        en: "Set a page-weight budget so it stays fast after launch.",
        id: "Tetapkan anggaran berat halaman agar tetap cepat setelah rilis.",
      },
    ],
    today: {
      en: "Open your site on a phone using mobile data and count the seconds until it is readable. More than three is priority one.",
      id: "Buka situs Anda di ponsel dengan data seluler dan hitung detik sampai bisa dibaca. Lebih dari tiga detik berarti prioritas satu.",
    },
    techKeys: ["web"],
    projectSlugs: ["zonzon", "portfolio"],
    subject: { en: "Our website is slow / hard to find", id: "Website kami lambat / sulit ditemukan" },
    body: {
      en: "Hi Defri, our website is at ... and the problem we notice is: ",
      id: "Halo Defri, website kami ada di ... dan masalah yang kami rasakan adalah: ",
    },
  },
  {
    id: "mobile",
    label: { en: "We need an app in customers' hands", id: "Kami butuh aplikasi di tangan pelanggan" },
    symptom: {
      en: "The solution must work on the move — in a pocket, sometimes offline.",
      id: "Solusinya harus bekerja saat bergerak — di saku, kadang tanpa internet.",
    },
    cause: {
      en: "A phone is not a small website. Offline moments, notifications, camera and microphone, licensing and distribution all need to be designed on purpose — and the backend has to be ready for many small devices, not one browser.",
      id: "Ponsel bukan website kecil. Momen offline, notifikasi, kamera dan mikrofon, lisensi dan distribusi semuanya perlu dirancang sengaja — dan backend harus siap melayani banyak perangkat kecil, bukan satu browser.",
    },
    steps: [
      {
        en: "Define the one job the app must do perfectly, then the offline story around it.",
        id: "Tentukan satu tugas yang harus dilakukan aplikasi dengan sempurna, lalu skenario offline di sekitarnya.",
      },
      {
        en: "Ship a signed, installable build early to a handful of real users.",
        id: "Rilis build ter-sign yang bisa dipasang sejak dini ke segelintir pengguna nyata.",
      },
      {
        en: "Add the backend, licensing, and analytics only as real usage demands them.",
        id: "Tambahkan backend, lisensi, dan analitik hanya saat pemakaian nyata menuntutnya.",
      },
    ],
    today: {
      en: "Describe the app in one sentence a customer would say out loud. If you cannot, the scope is still too wide.",
      id: "Gambarkan aplikasinya dalam satu kalimat yang akan diucapkan pelanggan. Jika belum bisa, cakupannya masih terlalu lebar.",
    },
    techKeys: ["mobile", "web"],
    projectSlugs: ["speakenglish", "supplierdaging"],
    subject: { en: "We need a mobile app", id: "Kami butuh aplikasi mobile" },
    body: {
      en: "Hi Defri, we need an app that lets customers ... The one job it must do is: ",
      id: "Halo Defri, kami butuh aplikasi agar pelanggan bisa ... Satu tugas utamanya adalah: ",
    },
  },
  {
    id: "vision",
    label: { en: "Information is trapped in images", id: "Informasi terkunci di dalam gambar" },
    symptom: {
      en: "Documents, photos, scans — someone has to read and retype them by hand.",
      id: "Dokumen, foto, hasil pindai — seseorang harus membaca dan mengetik ulang secara manual.",
    },
    cause: {
      en: "Computers see pixels, not meaning. Reading text, spotting objects, or inspecting a product from an image needs a vision pipeline — and the pipeline is only as good as the real samples it was tested on.",
      id: "Komputer melihat piksel, bukan makna. Membaca teks, mengenali objek, atau memeriksa produk dari gambar membutuhkan pipeline vision — dan pipeline itu hanya sebaik sampel nyata yang diujikan padanya.",
    },
    steps: [
      {
        en: "Collect fifty real samples — the messy ones — before choosing any model.",
        id: "Kumpulkan lima puluh sampel nyata — yang berantakan — sebelum memilih model apa pun.",
      },
      {
        en: "Prototype the pipeline end to end (image → recognition → structured result) and measure accuracy honestly.",
        id: "Prototipekan pipeline dari ujung ke ujung (gambar → pengenalan → hasil terstruktur) dan ukur akurasinya dengan jujur.",
      },
      {
        en: "Put a human check where the model is unsure, then automate the confident cases.",
        id: "Tempatkan pemeriksaan manusia di bagian yang model ragu, lalu otomasi kasus yang meyakinkan.",
      },
    ],
    today: {
      en: "Count how many minutes per day someone spends retyping from images. That number is the business case.",
      id: "Hitung berapa menit per hari yang dihabiskan seseorang untuk mengetik ulang dari gambar. Angka itulah dasar bisnisnya.",
    },
    techKeys: ["vision", "ai", "automation"],
    projectSlugs: ["manga-ocr"],
    subject: { en: "Information trapped in images / documents", id: "Informasi terkunci di gambar / dokumen" },
    body: {
      en: "Hi Defri, we have images/documents of ... and today someone reads them by hand to: ",
      id: "Halo Defri, kami punya gambar/dokumen berupa ... dan saat ini seseorang membacanya manual untuk: ",
    },
  },
  {
    id: "ai",
    label: { en: "We want AI, but don't know where it fits", id: "Kami ingin AI, tapi tak tahu di mana" },
    symptom: {
      en: "Everyone says \"add AI\"; nobody can say which task it should take over.",
      id: "Semua bilang \"tambahkan AI\"; tak ada yang bisa menyebut tugas mana yang harus diambilnya.",
    },
    cause: {
      en: "AI is worth it where a task needs understanding, prediction, or conversation at a scale people cannot sustain. Most of the value is in the boring parts: reliability, fallbacks, and cost control — not the model.",
      id: "AI layak dipakai saat sebuah tugas membutuhkan pemahaman, prediksi, atau percakapan pada skala yang tak sanggup dijaga manusia. Sebagian besar nilainya ada di bagian membosankan: keandalan, fallback, dan kendali biaya — bukan modelnya.",
    },
    steps: [
      {
        en: "List the tasks where people currently read, judge, or answer repeatedly; pick the one with the clearest \"correct answer\".",
        id: "Daftar tugas di mana orang saat ini membaca, menilai, atau menjawab berulang; pilih yang punya \"jawaban benar\" paling jelas.",
      },
      {
        en: "Build a thin prototype with a real model behind it, and put it in front of two real users.",
        id: "Bangun prototipe tipis dengan model nyata di baliknya, dan hadapkan pada dua pengguna nyata.",
      },
      {
        en: "Engineer the reliability layer — failover, limits, cost caps — before calling it a product.",
        id: "Rekayasa lapisan keandalan — failover, batasan, plafon biaya — sebelum menyebutnya produk.",
      },
    ],
    today: {
      en: "Pick one recurring question your team answers by hand. Write down five real examples with the correct answer. That is your first dataset.",
      id: "Pilih satu pertanyaan berulang yang dijawab tim Anda secara manual. Tulis lima contoh nyata beserta jawaban benarnya. Itulah dataset pertama Anda.",
    },
    techKeys: ["ai", "data-science"],
    projectSlugs: ["speakenglish", "sentiment"],
    subject: { en: "Where could AI fit in our work?", id: "Di mana AI bisa masuk dalam pekerjaan kami?" },
    body: {
      en: "Hi Defri, we are considering AI for ... The task we answer by hand most often is: ",
      id: "Halo Defri, kami mempertimbangkan AI untuk ... Tugas yang paling sering kami jawab manual adalah: ",
    },
  },
];
