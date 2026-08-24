/* ============================================================
   FEGA — portfolio interactions
   Zero dependencies. Everything guarded for reduced motion.
   ============================================================ */
(() => {
  "use strict";

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  /* ---------- theme ---------- */
  const root = document.documentElement;
  const themeToggle = document.getElementById("theme-toggle");
  const storedTheme = safeGet("fega-theme");
  if (storedTheme === "dark" || (!storedTheme && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
    root.dataset.theme = "dark";
  }
  themeToggle?.addEventListener("click", () => {
    const next = root.dataset.theme === "dark" ? "light" : "dark";
    root.dataset.theme = next;
    safeSet("fega-theme", next);
  });

  /* ---------- i18n ---------- */
  const ID = {
    "skip": "Langsung ke karya",
    "nav.about": "Karakter",
    "nav.works": "Karya",
    "nav.stack": "Teknologi",
    "nav.principles": "Prinsip",
    "nav.contact": "Kontak",

    "hero.eyebrow": "Portofolio — Batam, Indonesia · UTC+7",
    "hero.sub":
      "Saya membangun dua jenis software yang jarang lahir dari tangan yang sama: <strong>dunia brand sinematik</strong> di browser, dan <strong>sistem bisnis kelas pabrik</strong> yang menjalankan operasional nyata.",
    "hero.cta1": "Lihat karya pilihan",
    "hero.cta2": "Hubungi saya",
    "hero.scroll": "gulir",
    "stats.k1": "Sistem yang dibangun",
    "stats.k2": "Bahasa pasar",
    "stats.k3": "Feature test ERP",
    "stats.k4": "Engine scroll custom",
    "stats.loc": "baris, tanpa dependency",

    "about.eyebrow": "Karakter",
    "about.title": "Satu orang, dua disiplin.",
    "about.a.label": "— Sisi brand",
    "about.a.body":
      "Situs film scroll-driven, produk 3D prosedural, motion yang hadir hanya untuk menjelaskan. Saya merancang dan membangun kehadiran web lengkap untuk brand aroma D2C pasar Jepang — dari riset pasar dan copywriting yang patuh 薬機法, sampai engine scroll-scrub video yang ditulis dari nol tanpa library animasi sama sekali.",
    "about.b.label": "— Sisi sistem",
    "about.b.body":
      "Sebuah pabrik ekspor di Batam menjalankan CRM, penjualan, produksi, dan gudangnya di platform yang saya bangun: Laravel + Filament, 44 migrasi, 47 file feature test. Keputusan pemodelan domain seperti harga yang tidak pernah disimpan dan inventori yang selalu diturunkan melindungi bisnis di lapisan data, bukan cuma di UI.",
    "about.c.label": "— Benang merah di antara keduanya",
    "about.c.body":
      "Kejujuran. Tidak ada demo palsu, tidak ada dashboard bohongan: checkout yang belum tersambung berkata jujur, halaman roadmap menampilkan rencana alih-alih pura-pura live, dan setiap estimasi dilabeli \"indikatif\". Saya lebih suka berbuat banyak dengan sedikit — salah satu project di bawah adalah configurator B2B lengkap dalam tiga file HTML mandiri tanpa dependency.",

    "works.eyebrow": "Karya pilihan",
    "works.title": "Lima sistem, lima dunia.",

    "w1.kind": "Situs brand D2C — pasar Jepang",
    "w1.desc":
      "Website brand lengkap untuk aroma inhaler kayu yang menyasar perokok Jepang yang ingin ritualnya tanpa asap. Produk Three.js yang dimodelkan prosedural dengan serat kayu walnut yang digenerate saat runtime, hero canvas 113 frame yang di-scrub scroll ala Apple, dan cerita GSAP terjepit yang mengubah rokok menjadi produk — semuanya ditulis di dalam batasan iklan 薬機法 yang nyata.",
    "w1.h1": "Perangkat 3D prosedural — profil lathe + serat kayu dilukis di canvas, tanpa GLTF",
    "w1.h2": "14 rute static-export dengan structured data JSON-LD lengkap",
    "w1.h3": "Disiplin motion: reduced-motion, fallback noscript, koreografi desktop/mobile",

    "w2.kind": "Toko sinematik — engine buatan sendiri",
    "w2.desc":
      "Pendamping commerce untuk ZONZON: satu film scroll-driven berkelanjutan dalam sembilan babak, dengan configurator aroma di tengahnya. Jantungnya adalah engine scroll-scrub video 755 baris yang saya tulis tanpa dependency — klip di-fetch sebagai blob agar seeking instan, easing kubik \"linger\" yang tak pernah menggeser frame sambungan, encode mobile terpisah, priming aman untuk iOS.",
    "w2.h1": "Engine scroll↔video custom: loop rAF, easing smoothstep + linger, lifecycle AbortController",
    "w2.h2": "Theming reaktif-aroma — rasa yang dipilih mewarnai ulang seluruh panggung",
    "w2.h3": "Dideploy di Cloudflare Workers dengan CI typecheck + build",

    "w3.kind": "CRM/ERP — dipakai produksi",
    "w3.desc":
      "Platform operasional untuk pabrik filter rod ekspor Indonesia, berjalan setiap hari di jaringan pabrik: intelijen pasar → pipeline penjualan → produksi → gudang. 13 resource admin, 16 halaman custom, ~18 ribu baris kode, diisi 1.229 perusahaan nyata dari 117 negara. Ide-ide paling tajamnya hidup di model data.",
    "w3.h1": "Harga efemeral — quotation diketik saat cetak, tak pernah disimpan; rahasia dagang tak masuk database",
    "w3.h2": "Inventori dihitung, tak pernah diketik: setiap unit diturunkan dari stock movement teraudit (lot FEFO, reorder point)",
    "w3.h3": "Matematika kontainer & MOQ dari dimensi packing; backflush produksi mengikat batch ke bahan baku",

    "w4.kind": "Configurator B2B — tanpa dependency",
    "w4.desc":
      "Configurator produk lengkap untuk filter tips linting — 7 konstruksi, diameter custom, 8 aroma, tier kemasan — dengan live preview tiga objek beranimasi di atas panggung meja studio. Tanpa framework, tanpa build step, tanpa npm: tiga file HTML mandiri yang bisa diedit klien cukup dengan mengubah satu objek JS.",
    "w4.h1": "Aset yang meng-upgrade dirinya: foto diprobe lewat rantai kandidat dan menggantikan SVG begitu filenya ada",
    "w4.h2": "Panggung cross-fade berjenjang dengan signature-diffing agar objek yang tak berubah tak pernah re-animasi",
    "w4.h3": "Toggle \"integration payload\" menampilkan JSON siap-CRM dari konfigurasi — hadiah untuk developer berikutnya",

    "w5.kind": "Storefront katalog — brand refresh",
    "w5.desc":
      "Konsep brand-refresh dan storefront berbasis penawaran untuk supplier foodservice California: 186 SKU dalam 17 kategori, seluruhnya digerakkan satu file CSV yang dikompilasi saat build. Sistem \"visual family\" mengelompokkan varian ukuran sehingga satu foto meng-upgrade satu keluarga produk — dengan ilustrasi SVG gambar-tangan sebagai pengganti sampai fotonya datang.",
    "w5.h1": "CSV-sebagai-CMS: mengedit produk = mengedit spreadsheet",
    "w5.h2": "Keranjang penawaran menghasilkan invoice bernomor (JSF-YYYYMMDD-NNN) dengan transport yang bisa diganti",
    "w5.h3": "Drawer produk deep-linkable dengan focus trap, navigasi keyboard, dan judul halaman per produk",

    "stack.eyebrow": "Teknologi & kapabilitas",
    "stack.title": "Alat dipilih per masalah, bukan per kebiasaan.",
    "stack.c1": "— Frontend",
    "stack.c1n": "(saat tanpa dependency lebih unggul)",
    "stack.c2": "— Motion & 3D",
    "stack.c2a": "Engine scroll-video custom",
    "stack.c2b": "Sekuens gambar di canvas",
    "stack.c2c": "Geometri & tekstur prosedural",
    "stack.c2d": "selalu",
    "stack.c3": "— Sistem",
    "stack.c3a": "pemodelan derived-state",
    "stack.c3b": "Generasi PDF, RBAC, log audit",
    "stack.c3c": "Arsitektur static-export",
    "stack.c4": "— Alur kerja ber-AI dengan tata kelola",
    "stack.c4a": "Arsitektur agent human-in-the-loop",
    "stack.c4b": "Gerbang proposal — agent mengusulkan, manusia menyetujui",
    "stack.c4c": "Guardrails tertulis: tanpa scraping, tanpa data karangan",
    "stack.c4d": "Setiap klaim membawa sumber + tingkat keyakinan",

    "pr.eyebrow": "Prinsip",
    "pr.title": "Cara saya mengambil keputusan.",
    "pr.1t": "Motion hanya untuk menjelaskan",
    "pr.1b": "Animasi harus diegetik atau dihapus. Scroll semestinya terasa seperti napas pengunjung sendiri yang bergerak melewati produk — bukan pertunjukan kembang api.",
    "pr.2t": "Keadaan jujur, tanpa demo palsu",
    "pr.2b": "Checkout yang belum tersambung berkata \"dalam persiapan\". Halaman roadmap menampilkan roadmap. Testimoni placeholder dilabeli placeholder. Kepercayaan itu berbunga.",
    "pr.3t": "Batasan adalah input desain",
    "pr.3b": "Hukum iklan 薬機法, harga rahasia dagang, alur kerja pabrik, UU PDP — saya mendesain bersama batasan sejak hari pertama, bukan menambalnya belakangan.",
    "pr.4t": "Banyak dengan sedikit",
    "pr.4b": "Configurator 7 varian dalam tiga file HTML bebas dependency. Engine scroll 755 baris alih-alih library. Kompleksitas harus dibayar oleh masalahnya.",

    "ct.eyebrow": "Kontak",
    "ct.title": "Mari bangun sesuatu yang tahan lama.",
    "ct.lede": "Terbuka untuk pekerjaan produk yang butuh rasa brand sekaligus tulang punggung engineering — dari Batam, untuk mana saja.",
    "ct.copy": "Salin email",
    "ct.copied": "Tersalin ✓",
    "ft.built": "Dibangun tangan tanpa dependency — memang begitu cara saya suka.",
  };

  // Cache the English originals from the DOM so we can switch back.
  const i18nNodes = document.querySelectorAll("[data-i18n]");
  const EN = {};
  i18nNodes.forEach((el) => { EN[el.dataset.i18n] = el.innerHTML; });

  const RICH_KEYS = new Set(["hero.sub"]); // keys whose ID strings contain markup

  function applyLang(lang) {
    document.documentElement.lang = lang;
    i18nNodes.forEach((el) => {
      const key = el.dataset.i18n;
      const dict = lang === "id" ? ID : EN;
      const val = dict[key];
      if (val == null) return;
      if (lang === "en" || RICH_KEYS.has(key)) {
        el.innerHTML = val; // EN restores original markup; rich ID keys carry vetted tags
      } else {
        el.textContent = val;
      }
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

  /* ---------- reveals ---------- */
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("in");
        io.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });

    // stagger siblings that reveal together
    document.querySelectorAll(".reveal").forEach((el) => {
      const siblings = el.parentElement
        ? [...el.parentElement.children].filter((c) => c.classList.contains("reveal"))
        : [el];
      const idx = siblings.indexOf(el);
      el.style.setProperty("--reveal-delay", `${Math.min(idx * 0.09, 0.45)}s`);
      io.observe(el);
    });
  } else {
    document.documentElement.classList.add("no-observer");
  }

  /* ---------- chapter rail + progress ---------- */
  const railLinks = [...document.querySelectorAll(".chapter-rail a")];
  const chapters = [...document.querySelectorAll("[data-chapter-id]")];
  const progressBar = document.getElementById("progress-bar");

  if ("IntersectionObserver" in window && railLinks.length) {
    const chapterIO = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const id = entry.target.dataset.chapterId;
        railLinks.forEach((a) => a.classList.toggle("active", a.dataset.chapter === id));
      });
    }, { rootMargin: "-40% 0px -55% 0px" });
    chapters.forEach((c) => chapterIO.observe(c));
  }

  let ticking = false;
  window.addEventListener("scroll", () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (progressBar && max > 0) {
        progressBar.style.width = `${(window.scrollY / max) * 100}%`;
      }
      ticking = false;
    });
  }, { passive: true });

  /* ---------- counters ---------- */
  const counters = document.querySelectorAll("[data-count]");
  function runCounter(el) {
    const target = parseInt(el.dataset.count, 10);
    if (reduceMotion.matches) { el.textContent = target.toLocaleString(); return; }
    const dur = 1200;
    const start = performance.now();
    (function tick(now) {
      const p = Math.min((now - start) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(target * eased).toLocaleString();
      if (p < 1) requestAnimationFrame(tick);
    })(start);
  }
  if ("IntersectionObserver" in window) {
    const countIO = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        runCounter(e.target);
        countIO.unobserve(e.target);
      });
    }, { threshold: 0.6 });
    counters.forEach((c) => countIO.observe(c));
  } else {
    counters.forEach((c) => { c.textContent = parseInt(c.dataset.count, 10).toLocaleString(); });
  }

  /* ---------- magnetic buttons ---------- */
  if (!reduceMotion.matches && window.matchMedia("(hover: hover)").matches) {
    document.querySelectorAll(".magnetic").forEach((btn) => {
      btn.addEventListener("pointermove", (e) => {
        const r = btn.getBoundingClientRect();
        const x = e.clientX - r.left - r.width / 2;
        const y = e.clientY - r.top - r.height / 2;
        btn.style.transform = `translate(${x * 0.18}px, ${y * 0.22}px)`;
      });
      btn.addEventListener("pointerleave", () => { btn.style.transform = ""; });
    });
  }

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

  /* ---------- wisp canvas (ambient aroma trails) ---------- */
  const canvas = document.getElementById("wisp-canvas");
  if (canvas && !reduceMotion.matches) {
    const ctx = canvas.getContext("2d");
    let w = 0, h = 0, dpr = 1;
    let particles = [];
    let raf = null;

    function resize() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.clientWidth = window.innerWidth;
      h = canvas.clientHeight = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.min(Math.round((w * h) / 38000), 42);
      particles = Array.from({ length: count }, () => spawn(true));
    }

    function spawn(anywhere) {
      return {
        x: Math.random() * w,
        y: anywhere ? Math.random() * h : h + 20,
        r: 1 + Math.random() * 2.2,
        vy: 0.12 + Math.random() * 0.3,
        drift: Math.random() * Math.PI * 2,
        driftSpeed: 0.004 + Math.random() * 0.008,
        alpha: 0.12 + Math.random() * 0.2,
      };
    }

    function palette() {
      return document.documentElement.dataset.theme === "dark"
        ? ["156, 107, 52", "91, 107, 79", "168, 67, 42"]
        : ["156, 107, 52", "91, 107, 79", "139, 94, 60"];
    }

    function frame() {
      ctx.clearRect(0, 0, w, h);
      const cols = palette();
      particles.forEach((p, i) => {
        p.drift += p.driftSpeed;
        p.x += Math.sin(p.drift) * 0.4;
        p.y -= p.vy;
        if (p.y < -20) particles[i] = spawn(false);
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${cols[i % cols.length]}, ${p.alpha})`;
        ctx.fill();
      });
      raf = requestAnimationFrame(frame);
    }

    resize();
    window.addEventListener("resize", resize);
    frame();

    // pause when tab hidden
    document.addEventListener("visibilitychange", () => {
      if (document.hidden) { cancelAnimationFrame(raf); raf = null; }
      else if (!raf) frame();
    });
  }

  /* ---------- misc ---------- */
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  function safeGet(k) { try { return localStorage.getItem(k); } catch { return null; } }
  function safeSet(k, v) { try { localStorage.setItem(k, v); } catch { /* private mode */ } }
})();
