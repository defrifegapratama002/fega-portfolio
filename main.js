/* ============================================================
   FEGA — PROBLEM IN. SYSTEM OUT.
   Zero dependencies. Reduced-motion respected.
   ============================================================ */
(() => {
  "use strict";

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  /* ---------- i18n ---------- */
  const P = {
    1: "stok kacau", 2: "penjualan tak tercatat", 3: "data berserakan di Excel",
    4: "harga bocor ke kompetitor", 5: "butuh aplikasi kasir", 6: "mau jualan ke pasar Jepang",
    7: "tak ada yang ingat follow-up", 8: "gudang tak tahu isinya sendiri",
  };
  const ID = {
    "bar.loc": "BATAM, ID · 1.13°LU 104.05°BT · UTC+7",

    "hero.in": "MASALAH", "hero.in2": "MASUK.",
    "hero.out": "SISTEM", "hero.out2": "KELUAR.",
    "hero.line":
      "Pemecah masalah lewat teknologi. Saya membangun apa pun yang benar-benar dibutuhkan masalahnya — AI yang bisa bicara, aplikasi yang menjual, lapisan data di bawahnya, atau ERP yang menjalankan lantai pabrik.",
    "hero.foot": "9 sistem rampung · 3 bahasa pasar · gulir ↓",

    "mq.1": P[1], "mq.2": P[2], "mq.3": P[3], "mq.4": P[4],
    "mq.5": P[5], "mq.6": P[6], "mq.7": P[7], "mq.8": P[8],
    "mq.1b": P[1], "mq.2b": P[2], "mq.3b": P[3], "mq.4b": P[4],
    "mq.5b": P[5], "mq.6b": P[6], "mq.7b": P[7], "mq.8b": P[8],

    "how.label": "CARA SAYA BEKERJA",
    "how.1": "Saya lebih memilih mengirim tiga file jujur daripada sirkus framework.",
    "how.1n": "configurator B2B 7 varian hidup dalam 3 file HTML tanpa dependency — RYO, di bawah",
    "how.2": "Demo tidak pernah palsu. Kalau checkout belum tersambung, tombolnya berkata jujur.",
    "how.2n": "keranjang zonzon jujur berlabel 準備中; halaman roadmap AI menampilkan roadmap, bukan angka bohongan",
    "how.3": "Hukum, rahasia dagang, dan lantai pabrik adalah input desain — bukan penghalang.",
    "how.3n": "copy patuh 薬機法 untuk Jepang; ERP yang database-nya secara fisik tak bisa membocorkan harga",
    "how.4": "Bisnis bukan sebuah website. Bisnis adalah loop: rasakan → bangun → jual → operasikan → belajar.",
    "how.4n": "roda gilanya dipetakan di akhir halaman ini — setiap klaim terikat pada sistem yang sudah jadi",

    "sc.label": "SISTEM PILIHAN — 2025 → 2026",
    "spec.proof": "BUKTI",

    "s1.kind": "COMMERCE SINEMATIK — JEPANG",
    "s1.log": "Sembilan babak, satu gulir: toko ini <em>adalah</em> filmnya.",
    "s1.dl": "DETAILNYA —",
    "s1.d": "755 baris, nol library: engine scroll-scrub video dengan seeking instan via blob dan easing \"linger\" yang memperlambat tengah babak tanpa pernah menggeser frame sambungan.",
    "s1.st": "brand + toko rampung fitur, CI hijau",
    "s1.pf": "9 babak scroll-scrub · theming reaktif-aroma · encode khusus mobile",

    "s2.kind": "DUNIA BRAND D2C — JEPANG",
    "s2.log": "Inhaler kayu untuk Jepang — dijual oleh website yang menjelaskannya seperti dokumenter.",
    "s2.dl": "DETAILNYA —",
    "s2.d": "produk 3D-nya bukan file model: ia geometri profil lathe yang dijiplak dari foto, dengan serat walnut dilukis kode ke canvas saat runtime — 260 goresan bezier, drag untuk memutar.",
    "s2.st": "pra-rilis — checkout jujur ditandai belum aktif",
    "s2.pf": "14 rute · hero canvas 113 frame · copy patuh 薬機法",

    "s3.kind": "CRM/ERP — MENJALANKAN PABRIK, SETIAP HARI",
    "s3.log": "Sistem operasi pabrik filter rod ekspor: lead masuk, kontainer keluar.",
    "s3.dl": "DETAILNYA —",
    "s3.d": "harga diketik saat mencetak, disimpan di session, menempel hanya pada PDF — tak pernah dipersistenkan. Database tak bisa membocorkan yang tak pernah ia simpan. Inventori sama: dihitung dari pergerakan teraudit, tak pernah diketik.",
    "s3.st": "produksi — dipakai di LAN pabrik setiap hari",
    "s3.pf": "13 resource · 16 halaman custom · ~18 ribu baris · lot FEFO · matematika kontainer",

    "s4.kind": "ANDROID × AI — TER-SIGN, RILIS, TERJUAL",
    "s4.log": "Tutor bahasa Inggris AI yang membalas bicara — dijual via APK dan kode aktivasi, langsung ke pengguna.",
    "s4.dl": "DETAILNYA —",
    "s4.d": "delapan provider LLM tier gratis di balik satu interface dengan streaming, rotasi kunci, dan failover otomatis — saat satu kehabisan kuota di tengah percakapan, berikutnya yang menjawab. Lisensinya HMAC terikat perangkat dengan tamper guard dan backend Supabase.",
    "s4.st": "release ter-sign — dijual langsung via WhatsApp",
    "s4.pf": "protokol koreksi grammar terstruktur · 11 skenario · loop suara dengan barge-in",

    "s5.kind": "FLUTTER — BACK OFFICE OFFLINE-FIRST",
    "s5.log": "Seluruh back office distributor daging — POS sampai struk thermal — offline, dalam satu APK.",
    "s5.dl": "DETAILNYA —",
    "s5.d": "uang adalah rupiah bulat, berat adalah gram bulat — float tak pernah menyentuh pembukuan. Satu penjualan mencatat keluar stok, piutang, dan jejak audit dalam satu transaksi database; barang mudah rusak keluar gudang first-expired-first-out.",
    "s5.st": "MVP rampung fitur — release split-ABI ter-sign",
    "s5.pf": "cetak Bluetooth ESC/POS · laporan PDF/CSV · design system tertulis 26 halaman",

    "s6.kind": "CONFIGURATOR B2B — NOL DEPENDENCY",
    "s6.log": "Configurator produk 7 varian dalam tiga file HTML. Tanpa framework. Tanpa build. Tanpa npm.",
    "s6.dl": "DETAILNYA —",
    "s6.d": "letakkan foto dengan nama file yang benar dan halamannya meng-upgrade dirinya sendiri: aset memeriksa rantai kandidat dari yang paling spesifik dan menggantikan SVG buatan, tanpa edit kode. Sebuah toggle tersembunyi mencetak seluruh konfigurasi sebagai JSON siap-CRM — hadiah untuk developer berikutnya.",
    "s6.st": "mockup handoff rapi untuk itsfilterrod.com",
    "s6.pf": "7 konstruksi · panggung live 3 objek · halaman SEO dwibahasa · funnel WhatsApp",

    "fl.label": "FILMOGRAFI LENGKAP",
    "fl.h1": "TAHUN", "fl.h2": "SISTEM", "fl.h3": "APA INI", "fl.h4": "STACK",
    "fl.r1": "PWA depot air 4 peran — 30 kebijakan RLS, bukti antar GPS",
    "fl.r2": "server tutor bahasa bersuara, streaming TTS per kalimat",
    "fl.r3": "garapan klien — manajemen dokumen enterprise, RBAC, versioning",
    "fl.r4": "MVP sebelum SpeakEnglish — renderer furigana custom",
    "fl.r5": "storefront 186 SKU yang CMS-nya sebuah file CSV",
    "fl.thesis": "skripsi",
    "fl.r6t": "CNN penyakit daun",
    "fl.r6": "classifier penyakit tanaman terlatih, live sebagai web app",

    "map.label": "RODA GILA — ",
    "map.label2": "UNTUK APA SEMUA INI ADA",
    "map.lede":
      "Tak satu pun sistem ini demo skill acak. Mereka adalah stasiun di satu loop — loop yang membangun bisnis. Labelnya jujur: terbukti lewat sistem yang sudah jadi, sedang dibangun, atau target berikutnya.",
    "map.center": "nilai untuk pelanggan",
    "map.n1a": "Workflow berbantuan AI",
    "map.n1b": "Otomasi",
    "map.n1c": "Aplikasi LLM & agent",
    "map.d2": "DEVELOPMENT & PLATFORM",
    "map.n2a": "Aplikasi desktop",
    "map.n2b": "Backend & database",
    "map.p2": "sembilan project rampung",
    "map.n3a": "Situs sinematik",
    "map.n3b": "Configurator & commerce",
    "map.n3c": "Copy multi-bahasa (ID/EN/JP)",
    "map.n4a": "Gudang & produksi",
    "map.p4": "ITSFR Platform — dipakai produksi",
    "map.n5a": "Pipeline & import data",
    "map.n5b": "Dashboard analitik",
    "map.n5c": "ML terapan (CNN)",
    "map.p5": "ITSFR · CNN skripsi — live",
    "map.l1": "Terbukti — sistem sudah jadi",
    "map.l2": "Sedang dibangun",
    "map.l3": "Target berikutnya",

    "ct.t1": "BAWA",
    "ct.t2": "MASALAH ANDA.",
    "ct.line": "Dari Batam, untuk mana saja. Obrolan pertama gratis; kejujurannya juga.",
    "ct.copy": "SALIN EMAIL",
    "ct.copied": "TERSALIN ✓",
    "ft.built": "dibangun tangan · nol dependency · seperti semua di atas",
  };

  const RICH_KEYS = new Set(["s1.log"]);

  const i18nNodes = document.querySelectorAll("[data-i18n]");
  const EN = {};
  i18nNodes.forEach((el) => { EN[el.dataset.i18n] = el.innerHTML; });

  function applyLang(lang) {
    document.documentElement.lang = lang;
    i18nNodes.forEach((el) => {
      const key = el.dataset.i18n;
      const dict = lang === "id" ? ID : EN;
      const val = dict[key];
      if (val == null) return;
      if (lang === "en" || RICH_KEYS.has(key)) el.innerHTML = val;
      else el.textContent = val;
    });
    const label = document.querySelector("[data-lang-label]");
    if (label) label.textContent = lang === "id" ? "EN" : "ID";
    safeSet("fega-lang", lang);
  }

  let lang = safeGet("fega-lang") || "en";
  if (lang === "id") applyLang("id");
  document.getElementById("lang-toggle")?.addEventListener("click", () => {
    lang = lang === "id" ? "en" : "id";
    applyLang(lang);
  });

  /* ---------- scroll: progress + scene-number parallax ---------- */
  const progressBar = document.getElementById("progress-bar");
  const plxEls = reduceMotion.matches ? [] : [...document.querySelectorAll("[data-plx]")];
  let ticking = false;

  function onScroll() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (progressBar && max > 0) progressBar.style.width = `${(window.scrollY / max) * 100}%`;
      const vh = window.innerHeight;
      plxEls.forEach((el) => {
        const r = el.getBoundingClientRect();
        if (r.bottom < -200 || r.top > vh + 200) return;
        const offset = (r.top + r.height / 2 - vh / 2) * -0.1;
        el.style.transform = `translateY(${offset.toFixed(1)}px)`;
      });
      ticking = false;
    });
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- copy email ---------- */
  const copyBtn = document.getElementById("copy-email");
  copyBtn?.addEventListener("click", async () => {
    const email = copyBtn.dataset.email;
    try {
      await navigator.clipboard.writeText(email);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = email;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      ta.remove();
    }
    copyBtn.classList.add("copied");
    setTimeout(() => copyBtn.classList.remove("copied"), 1600);
  });

  /* ---------- misc ---------- */
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  function safeGet(k) { try { return localStorage.getItem(k); } catch { return null; } }
  function safeSet(k, v) { try { localStorage.setItem(k, v); } catch { /* private mode */ } }
})();
