"use client";

import type { CSSProperties, ReactNode } from "react";
import { useLang } from "@/lib/i18n";
import type { SceneKey } from "@/data/chapters";

/**
 * Coded chapter scenes — each field of expertise shown the way it appears
 * in everyday life. Pure SVG + CSS: every element is staged against the
 * scroll progress --p published by ScrollBackdrop, so the scene assembles
 * itself as the chapter scrolls in. Reduced motion → the finished picture.
 *
 * The scenes are illustrations, not measurements: no metrics, no claims.
 *
 * A chapter can hold several cases (data/chapters.ts). To add one: write
 * a Scene component here, register it in SCENES, list it in the chapter.
 */

/** Every scene is complete just before its chapter reaches the middle of the screen. */
const PACE = 0.78;

/** Stage an element: --t runs 0 → 1 while --p moves from `from` to `to`. */
function st(from: number, to: number): CSSProperties {
  const a = from * PACE;
  const b = to * PACE;
  return {
    ["--t" as string]: `clamp(0, calc((var(--p, 1) - ${a.toFixed(3)}) / ${(b - a).toFixed(3)}), 1)`,
  };
}

/** Move an element by (dx, dy) SVG units as its stage runs. */
function mv(from: number, to: number, dx: number, dy: number): CSSProperties {
  return { ...st(from, to), ["--dx" as string]: `${dx}px`, ["--dy" as string]: `${dy}px` };
}

function Label({ x, y, children, hi = false, size = 12, anchor = "start" }: {
  x: number;
  y: number;
  children: ReactNode;
  hi?: boolean;
  size?: number;
  anchor?: "start" | "middle" | "end";
}) {
  return (
    <text x={x} y={y} fontSize={size} textAnchor={anchor} className={hi ? "s-text s-text-hi" : "s-text"}>
      {children}
    </text>
  );
}

/* ---------------------------------------------------------------- AI */
function SceneAI({ id }: { id: boolean }) {
  const bars = [14, 26, 40, 22, 48, 30, 18, 44, 34, 20, 38, 24, 12];
  return (
    <>
      {/* Voice tutor on a phone */}
      <rect x="60" y="30" width="270" height="390" rx="30" className="s-draw" pathLength={1} style={st(0.1, 0.24)} />
      <g className="s-fade" style={st(0.16, 0.24)}>
        {bars.map((h, i) => (
          <rect
            key={i}
            x={112 + i * 13}
            y={100 - h / 2}
            width="5"
            height={h}
            rx="2.5"
            className="s-fill-hi s-pulse"
            style={{ animationDelay: `${i * -0.13}s` }}
          />
        ))}
        <Label x={195} y={150} anchor="middle" size={11}>
          {id ? "mendengarkan…" : "listening…"}
        </Label>
      </g>
      <g className="s-rise" style={st(0.22, 0.3)}>
        <rect x="150" y="175" width="160" height="40" rx="12" />
        <Label x={166} y={200}>I goes to market</Label>
      </g>
      <g className="s-rise" style={st(0.3, 0.38)}>
        <rect x="80" y="232" width="214" height="66" rx="12" className="s-panel-hi" />
        <Label x={96} y={258} hi>I went to the market ✓</Label>
        <Label x={96} y={281} size={11}>goes → went</Label>
      </g>
      <g className="s-rise" style={st(0.38, 0.46)}>
        <circle cx="195" cy="358" r="24" className="s-panel-hi" />
        <path d="M187 350v16M195 344v28M203 352v12" className="s-stroke-hi" />
      </g>

      {/* Computer vision on an everyday street */}
      <g className="s-fade" style={st(0.14, 0.24)}>
        <rect x="420" y="70" width="340" height="260" rx="8" />
        <path d="M420 270h340" />
        {/* person */}
        <circle cx="500" cy="176" r="13" />
        <path d="M500 189v46M500 204l-18 20M500 204l18 20M500 235l-14 35M500 235l14 35" />
        {/* motorbike */}
        <circle cx="596" cy="252" r="18" />
        <circle cx="668" cy="252" r="18" />
        <path d="M596 252l22-34h34l16 34M618 218l-10-14h-14M652 218l10-8" />
        {/* shop sign */}
        <rect x="660" y="104" width="76" height="34" rx="4" />
        <Label x={698} y={126} anchor="middle">BUKA</Label>
        <rect x="420" y="70" width="340" height="3" className="s-fill-hi s-scan" stroke="none" />
      </g>
      <g style={st(0.26, 0.36)}>
        <rect x="474" y="152" width="52" height="124" className="s-draw s-stroke-hi" pathLength={1} />
        <Label x={474} y={145} hi size={11}>person</Label>
      </g>
      <g style={st(0.32, 0.42)}>
        <rect x="570" y="196" width="124" height="80" className="s-draw s-stroke-hi" pathLength={1} />
        <Label x={570} y={189} hi size={11}>motorbike</Label>
      </g>
      <g style={st(0.38, 0.48)}>
        <rect x="652" y="96" width="92" height="50" className="s-draw s-stroke-hi" pathLength={1} />
        <Label x={744} y={162} hi size={11} anchor="end">text: “BUKA”</Label>
      </g>
      <Label x={420} y={358} size={11}>
        {id ? "kamera → deteksi objek → baca teks" : "camera → detect objects → read text"}
      </Label>
    </>
  );
}

/* -------------------------------------------------------------- DATA */
function SceneData({ id }: { id: boolean }) {
  const rows = [150, 96, 176, 120, 84, 164, 110, 140];
  const bars = [92, 70, 110, 84, 130, 196, 150];
  const days = id ? ["Sen", "Sel", "Rab", "Kam", "Jum", "Sab", "Min"] : ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  return (
    <>
      {/* Raw, messy records */}
      <g className="s-fade" style={st(0.1, 0.2)}>
        <rect x="40" y="70" width="230" height="300" rx="10" />
        <Label x={56} y={98} size={11}>{id ? "catatan_penjualan.csv" : "sales_notes.csv"}</Label>
        <path d="M40 112h230" />
        {rows.map((w, i) => (
          <rect key={i} x="56" y={130 + i * 28} width={w} height="8" rx="4" className="s-fill-ink" stroke="none" opacity={0.35 + (i % 3) * 0.15} />
        ))}
      </g>
      <g style={st(0.2, 0.28)}>
        <path d="M288 220h58M334 208l12 12-12 12" className="s-draw s-stroke-hi" pathLength={1} />
      </g>

      {/* A chart somebody can decide with */}
      <g style={st(0.22, 0.32)}>
        <path d="M380 90v280h380" className="s-draw" pathLength={1} />
      </g>
      {bars.map((h, i) => (
        <g key={i} style={st(0.26 + i * 0.022, 0.36 + i * 0.022)}>
          <rect
            x={404 + i * 50}
            y={370 - h}
            width="30"
            height={h}
            rx="3"
            className={i === 5 ? "s-grow s-fill-hi" : "s-grow s-fill-ink"}
            stroke="none"
            opacity={i === 5 ? 1 : 0.5}
          />
          <text x={419 + i * 50} y={392} fontSize="10" textAnchor="middle" className="s-text s-fade">
            {days[i]}
          </text>
        </g>
      ))}
      <g style={st(0.4, 0.5)}>
        <path
          d="M419 268L469 290L519 250L569 276L619 230L669 164L719 210"
          className="s-draw s-stroke-hi"
          pathLength={1}
        />
      </g>
      <g className="s-rise" style={st(0.44, 0.52)}>
        <rect x="534" y="92" width="226" height="52" rx="10" className="s-panel-hi" />
        <Label x={550} y={113} size={10}>INSIGHT</Label>
        <Label x={550} y={132} hi>{id ? "Sabtu paling ramai" : "Saturday is the busiest"}</Label>
      </g>
    </>
  );
}

/* --------------------------------------------------------------- WEB */
function SceneWeb({ id }: { id: boolean }) {
  return (
    <>
      {/* Browser */}
      <rect x="30" y="50" width="480" height="340" rx="12" className="s-draw" pathLength={1} style={st(0.1, 0.24)} />
      <g className="s-fade" style={st(0.18, 0.26)}>
        <path d="M30 86h480" />
        <circle cx="52" cy="68" r="4" className="s-fill-hi" stroke="none" />
        <circle cx="68" cy="68" r="4" />
        <circle cx="84" cy="68" r="4" />
        <rect x="110" y="59" width="250" height="18" rx="9" />
        <Label x={124} y={72} size={10}>{id ? "toko-anda.id/pesan" : "your-shop.id/order"}</Label>
      </g>
      <g className="s-rise" style={st(0.24, 0.32)}>
        <rect x="54" y="108" width="432" height="92" rx="8" className="s-panel-hi" />
        <rect x="74" y="132" width="180" height="10" rx="5" className="s-fill-ink" stroke="none" />
        <rect x="74" y="154" width="120" height="8" rx="4" className="s-fill-ink" stroke="none" opacity="0.5" />
      </g>
      {[0, 1, 2].map((i) => (
        <g key={i} className="s-rise" style={st(0.3 + i * 0.03, 0.38 + i * 0.03)}>
          <rect x={54 + i * 148} y="220" width="136" height="146" rx="8" />
          <rect x={66 + i * 148} y="232" width="112" height="70" rx="4" className="s-fill-ink" stroke="none" opacity="0.14" />
          <rect x={66 + i * 148} y="316" width="80" height="7" rx="3.5" className="s-fill-ink" stroke="none" opacity="0.6" />
          <rect x={66 + i * 148} y="336" width="50" height="16" rx="8" className={i === 1 ? "s-fill-hi" : ""} stroke={i === 1 ? "none" : undefined} />
        </g>
      ))}

      {/* Same product, in the pocket */}
      <rect x="580" y="40" width="190" height="370" rx="28" className="s-draw" pathLength={1} style={st(0.2, 0.34)} />
      <g className="s-rise" style={st(0.34, 0.42)}>
        <rect x="598" y="76" width="154" height="70" rx="8" className="s-panel-hi" />
        <rect x="598" y="160" width="154" height="56" rx="8" />
        <rect x="598" y="228" width="154" height="56" rx="8" />
        <rect x="610" y="176" width="70" height="7" rx="3.5" className="s-fill-ink" stroke="none" opacity="0.6" />
        <rect x="610" y="244" width="90" height="7" rx="3.5" className="s-fill-ink" stroke="none" opacity="0.6" />
      </g>
      <g className="s-rise" style={st(0.42, 0.5)}>
        <rect x="598" y="330" width="154" height="40" rx="20" className="s-fill-hi" stroke="none" />
        <text x="675" y="355" fontSize="12" textAnchor="middle" className="s-text s-text-dark">
          {id ? "PESAN SEKARANG" : "ORDER NOW"}
        </text>
      </g>

      {/* Live sync between the two */}
      <g className="s-fade" style={st(0.36, 0.46)}>
        <path d="M510 220h70" className="s-stroke-hi s-flow" strokeDasharray="5 7" />
        <Label x={545} y={208} size={10} anchor="middle" hi>sync</Label>
      </g>
    </>
  );
}

/* -------------------------------------------------------- AUTOMATION */
function SceneAutomation({ id }: { id: boolean }) {
  const steps = id ? ["PESANAN", "STOK", "FAKTUR", "KIRIM"] : ["ORDER", "STOCK", "INVOICE", "DELIVERY"];
  const notes = id
    ? ["masuk dari form", "berkurang otomatis", "dibuat sendiri", "kurir diberi tahu"]
    : ["arrives by form", "deducted automatically", "generated", "courier notified"];
  return (
    <>
      <g className="s-fade" style={st(0.1, 0.2)}>
        <Label x={40} y={92} size={11}>
          {id ? "sebelum: diketik ulang di 4 spreadsheet" : "before: re-typed across 4 spreadsheets"}
        </Label>
        <path d="M40 100h292" className="s-stroke-hi" />
      </g>
      {steps.map((s, i) => (
        <g key={s}>
          <g className="s-rise" style={st(0.16 + i * 0.07, 0.26 + i * 0.07)}>
            <rect x={40 + i * 190} y="170" width="150" height="80" rx="12" className={i === 3 ? "s-panel-hi" : ""} />
            <Label x={115 + i * 190} y={205} anchor="middle" size={13}>{s}</Label>
            <Label x={115 + i * 190} y={228} anchor="middle" size={9.5}>{notes[i]}</Label>
          </g>
          {i < 3 ? (
            <g style={st(0.22 + i * 0.07, 0.3 + i * 0.07)}>
              <path
                d={`M${190 + i * 190} 210h40M${222 + i * 190} 202l8 8-8 8`}
                className="s-draw s-stroke-hi"
                pathLength={1}
              />
            </g>
          ) : null}
          <g className="s-fade" style={st(0.24 + i * 0.07, 0.3 + i * 0.07)}>
            <circle cx={115 + i * 190} cy="290" r="11" className="s-panel-hi" />
            <path d={`M${109 + i * 190} 290l4 4 8-9`} className="s-stroke-hi" />
          </g>
        </g>
      ))}
      {/* The parcel travels the whole line as you scroll */}
      <g className="s-parcel" style={st(0.16, 0.5)}>
        <rect x="100" y="126" width="30" height="26" rx="4" className="s-fill-hi" stroke="none" />
        <path d="M100 136h30M115 126v26" className="s-stroke-dark" />
      </g>
      <Label x={40} y={360} size={11}>
        {id ? "satu input → semua langkah berjalan sendiri" : "one input → every step runs by itself"}
      </Label>
    </>
  );
}

/* --------------------------------------------------------------- IOT */
function SceneIoT({ id }: { id: boolean }) {
  const sensors: { x: number; y: number; label: string; value: string }[] = [
    { x: 130, y: 250, label: id ? "suhu" : "temp", value: "28°C" },
    { x: 240, y: 210, label: id ? "lampu" : "lamp", value: "ON" },
    { x: 330, y: 300, label: id ? "pintu" : "door", value: id ? "terkunci" : "locked" },
  ];
  return (
    <>
      {/* A house with sensors */}
      <g style={st(0.1, 0.26)}>
        <path d="M50 190L230 60l180 130M80 170v200h300V170" className="s-draw" pathLength={1} />
      </g>
      {sensors.map((s, i) => (
        <g key={s.label} className="s-fade" style={st(0.2 + i * 0.05, 0.28 + i * 0.05)}>
          <circle cx={s.x} cy={s.y} r="16" className="s-stroke-hi s-ping" style={{ animationDelay: `${i * -0.7}s` }} />
          <circle cx={s.x} cy={s.y} r="7" className="s-fill-hi" stroke="none" />
          <Label x={s.x} y={s.y + 38} anchor="middle" size={11}>{s.label}</Label>
        </g>
      ))}

      {/* Readings travel to the hub, then to the phone */}
      {sensors.map((s, i) => (
        <g key={s.label} style={st(0.3 + i * 0.03, 0.4 + i * 0.03)}>
          <path d={`M${s.x + 18} ${s.y - 6}L520 150`} className="s-draw s-stroke-hi" pathLength={1} opacity="0.7" />
        </g>
      ))}
      <g className="s-rise" style={st(0.34, 0.42)}>
        <path d="M500 168a30 30 0 0 1 6-59 40 40 0 0 1 76 8 26 26 0 0 1-4 51z" className="s-panel-hi" />
        <Label x={542} y={148} anchor="middle" size={10}>HUB</Label>
      </g>
      <g style={st(0.4, 0.46)}>
        <path d="M580 176l48 40" className="s-draw s-stroke-hi" pathLength={1} />
      </g>
      <rect x="610" y="90" width="160" height="300" rx="24" className="s-draw" pathLength={1} style={st(0.3, 0.42)} />
      {sensors.map((s, i) => (
        <g key={s.label} className="s-rise" style={st(0.42 + i * 0.025, 0.5 + i * 0.025)}>
          <rect x="626" y={130 + i * 62} width="128" height="50" rx="8" className={i === 1 ? "s-panel-hi" : ""} />
          <Label x={640} y={152 + i * 62} size={10}>{s.label}</Label>
          <Label x={640} y={170 + i * 62} hi>{s.value}</Label>
        </g>
      ))}
      <Label x={50} y={412} size={11}>
        {id ? "sensor → hub → ponsel Anda" : "sensors → hub → your phone"}
      </Label>
    </>
  );
}

/* ------------------------------------------------- AI · receipts */
function SceneAIReceipt({ id }: { id: boolean }) {
  const items = [96, 120, 84, 110];
  const fields = [
    { k: id ? "toko" : "shop", v: "Warung Makan" },
    { k: id ? "tanggal" : "date", v: "12 / 03" },
    { k: "total", v: "Rp 45.000" },
  ];
  return (
    <>
      {/* A photographed receipt */}
      <g className="s-fade" style={st(0.1, 0.2)}>
        <path d="M80 40h230v356l-19 14-19-14-19 14-20-14-19 14-19-14-19 14-19-14-19 14-19-14-20 14-19-14z" />
        <Label x={195} y={80} anchor="middle" size={14}>WARUNG MAKAN</Label>
        <Label x={195} y={104} anchor="middle" size={10}>12 / 03</Label>
        <path d="M100 124h190" strokeDasharray="4 5" />
        {items.map((w, i) => (
          <g key={i}>
            <rect x="100" y={148 + i * 32} width={w} height="7" rx="3.5" className="s-fill-ink" stroke="none" opacity="0.45" />
            <rect x="250" y={148 + i * 32} width="40" height="7" rx="3.5" className="s-fill-ink" stroke="none" opacity="0.45" />
          </g>
        ))}
        <path d="M100 290h190" strokeDasharray="4 5" />
        <Label x={100} y={326} size={13}>TOTAL</Label>
        <Label x={290} y={326} size={13} anchor="end">Rp 45.000</Label>
        <rect x="80" y="40" width="230" height="3" className="s-fill-hi s-scan" stroke="none" />
      </g>
      {/* What the model picks out */}
      <g style={st(0.22, 0.3)}>
        <rect x="112" y="60" width="166" height="28" className="s-draw s-stroke-hi" pathLength={1} />
      </g>
      <g style={st(0.27, 0.35)}>
        <rect x="160" y="92" width="70" height="18" className="s-draw s-stroke-hi" pathLength={1} />
      </g>
      <g style={st(0.32, 0.4)}>
        <rect x="92" y="306" width="206" height="30" className="s-draw s-stroke-hi" pathLength={1} />
      </g>
      <g style={st(0.34, 0.42)}>
        <path d="M336 225h72M396 213l12 12-12 12" className="s-draw s-stroke-hi" pathLength={1} />
      </g>

      {/* Structured data, ready for the books */}
      <g className="s-fade" style={st(0.36, 0.42)}>
        <rect x="440" y="80" width="320" height="290" rx="12" />
        <Label x={460} y={110} size={11}>{id ? "pengeluaran.json" : "expense.json"}</Label>
        <path d="M440 124h320" />
      </g>
      {fields.map((f, i) => (
        <g key={f.k} className="s-rise" style={st(0.4 + i * 0.04, 0.48 + i * 0.04)}>
          <rect x="460" y={144 + i * 70} width="280" height="54" rx="8" className={i === 2 ? "s-panel-hi" : ""} />
          <Label x={476} y={166 + i * 70} size={10}>{f.k}</Label>
          <Label x={476} y={186 + i * 70} hi size={14}>{f.v}</Label>
        </g>
      ))}
      <Label x={440} y={400} size={11}>
        {id ? "foto struk → teks → data terstruktur" : "receipt photo → text → structured data"}
      </Label>
    </>
  );
}

/* ---------------------------------------------- DATA · reviews */
function SceneDataReviews({ id }: { id: boolean }) {
  const reviews = id
    ? ["Enak dan cepat!", "Menunggu lama sekali…", "Pelayanannya ramah", "Antrenya panjang"]
    : ["Tasty and fast!", "Waited far too long…", "Friendly service", "The queue was long"];
  const positive = [true, false, true, false];
  const bars = [
    { label: id ? "positif" : "positive", w: 250, hi: false },
    { label: id ? "netral" : "neutral", w: 90, hi: false },
    { label: id ? "negatif" : "negative", w: 180, hi: true },
  ];
  return (
    <>
      {/* Reviews nobody has time to read one by one */}
      {reviews.map((r, i) => (
        <g key={i}>
          <g className="s-rise" style={st(0.1 + i * 0.04, 0.18 + i * 0.04)}>
            <rect x="40" y={50 + i * 84} width="270" height="58" rx="14" />
            <Label x={58} y={84 + i * 84}>{r}</Label>
          </g>
          <g className="s-fade" style={st(0.24 + i * 0.04, 0.3 + i * 0.04)}>
            <circle cx="346" cy={79 + i * 84} r="15" className={positive[i] ? "" : "s-panel-hi"} />
            <path
              d={positive[i] ? `M338 ${79 + i * 84}h16M346 ${71 + i * 84}v16` : `M338 ${79 + i * 84}h16`}
              className={positive[i] ? "" : "s-stroke-hi"}
            />
          </g>
        </g>
      ))}

      {/* The overall picture */}
      <g style={st(0.3, 0.38)}>
        <path d="M430 90v220" className="s-draw" pathLength={1} />
      </g>
      {bars.map((b, i) => (
        <g key={b.label} style={st(0.34 + i * 0.04, 0.44 + i * 0.04)}>
          <Label x={444} y={118 + i * 74} size={11}>{b.label}</Label>
          <rect
            x="444"
            y={128 + i * 74}
            width={b.w}
            height="26"
            rx="4"
            className={b.hi ? "s-growx s-fill-hi" : "s-growx s-fill-ink"}
            stroke="none"
            opacity={b.hi ? 1 : 0.5}
          />
        </g>
      ))}
      <g className="s-rise" style={st(0.48, 0.56)}>
        <rect x="444" y="338" width="316" height="56" rx="10" className="s-panel-hi" />
        <Label x={460} y={360} size={10}>INSIGHT</Label>
        <Label x={460} y={380} hi>{id ? "Keluhan utama: waktu tunggu" : "Main complaint: waiting time"}</Label>
      </g>
    </>
  );
}

/* ------------------------------------------- WEB · delivery tracking */
function SceneWebTracking({ id }: { id: boolean }) {
  const status = id
    ? ["Pesanan diterima", "Kurir berangkat", "Tiba — foto bukti"]
    : ["Order received", "Courier on the way", "Arrived — photo proof"];
  return (
    <>
      {/* A map of the neighbourhood */}
      <g className="s-fade" style={st(0.1, 0.2)}>
        <rect x="30" y="50" width="500" height="340" rx="12" />
        <path d="M30 150h500M30 260h500M160 50v340M300 50v340M430 50v340" opacity="0.28" />
        <rect x="64" y="318" width="52" height="44" rx="6" />
        <Label x={90} y={380} anchor="middle" size={10}>depot</Label>
        <path d="M442 118l28-24 28 24v36h-56z" />
        <Label x={470} y={172} anchor="middle" size={10}>{id ? "pelanggan" : "customer"}</Label>
      </g>
      <g style={st(0.2, 0.46)}>
        <path d="M116 340h184V140h142" className="s-draw s-stroke-hi" pathLength={1} strokeWidth="2.5" />
      </g>
      {/* The courier: three legs of one trip */}
      <g className="s-move" style={mv(0.2, 0.3, 184, 0)}>
        <g className="s-move" style={mv(0.3, 0.4, 0, -200)}>
          <g className="s-move" style={mv(0.4, 0.46, 142, 0)}>
            <circle cx="116" cy="340" r="18" className="s-stroke-hi s-ping" />
            <circle cx="116" cy="340" r="9" className="s-fill-hi" stroke="none" />
          </g>
        </g>
      </g>

      {/* What the customer sees */}
      <rect x="590" y="40" width="180" height="370" rx="28" className="s-draw" pathLength={1} style={st(0.14, 0.28)} />
      {status.map((s, i) => (
        <g key={s} className="s-rise" style={st(0.22 + i * 0.11, 0.3 + i * 0.11)}>
          <rect x="606" y={90 + i * 84} width="148" height="66" rx="10" className={i === 2 ? "s-panel-hi" : ""} />
          <circle cx="626" cy={112 + i * 84} r="8" className="s-panel-hi" />
          <path d={`M622 ${112 + i * 84}l3 3 5-6`} className="s-stroke-hi" />
          <text x="618" y={140 + i * 84} fontSize="10.5" className={i === 2 ? "s-text s-text-hi" : "s-text"}>
            {s}
          </text>
        </g>
      ))}
      <Label x={30} y={420} size={11}>
        {id ? "pelanggan melihat posisi kurir, langsung" : "the customer watches the courier, live"}
      </Label>
    </>
  );
}

/* ------------------------------------------ AUTOMATION · cashier */
function SceneAutomationPOS({ id }: { id: boolean }) {
  const rows = [110, 86, 124];
  const report = [30, 46, 38, 62];
  return (
    <>
      {/* The cashier's screen */}
      <g className="s-fade" style={st(0.1, 0.2)}>
        <rect x="30" y="60" width="290" height="300" rx="14" />
        <Label x={50} y={92} size={11}>{id ? "KASIR" : "CASHIER"}</Label>
        <path d="M30 106h290" />
        {rows.map((w, i) => (
          <g key={i}>
            <rect x="50" y={130 + i * 40} width={w} height="8" rx="4" className="s-fill-ink" stroke="none" opacity="0.5" />
            <rect x="250" y={130 + i * 40} width="50" height="8" rx="4" className="s-fill-ink" stroke="none" opacity="0.5" />
          </g>
        ))}
      </g>
      <g className="s-rise" style={st(0.18, 0.26)}>
        <rect x="50" y="296" width="250" height="44" rx="22" className="s-fill-hi" stroke="none" />
        <text x="175" y="323" fontSize="13" textAnchor="middle" className="s-text s-text-dark">
          {id ? "BAYAR" : "PAY"}
        </text>
      </g>

      {/* One tap fans out into three results */}
      <g style={st(0.26, 0.34)}>
        <path d="M320 210h60M380 210V95h40M380 210v95h40" className="s-draw s-stroke-hi" pathLength={1} />
      </g>

      {/* 1 — the receipt prints */}
      <g className="s-fade" style={st(0.3, 0.36)}>
        <rect x="420" y="70" width="150" height="50" rx="8" />
        <Label x={495} y={100} anchor="middle" size={10}>{id ? "PRINTER STRUK" : "RECEIPT PRINTER"}</Label>
      </g>
      <g style={st(0.34, 0.46)}>
        <rect x="440" y="120" width="110" height="70" className="s-growd s-panel-hi" />
      </g>

      {/* 2 — stock goes down by itself */}
      <g className="s-rise" style={st(0.34, 0.42)}>
        <rect x="610" y="70" width="160" height="120" rx="10" />
        <Label x={626} y={96} size={10}>{id ? "STOK · daging sapi" : "STOCK · beef"}</Label>
      </g>
      <g className="s-fadeout" style={st(0.4, 0.46)}>
        <Label x={626} y={152} size={30}>12 kg</Label>
      </g>
      <g className="s-fade" style={st(0.44, 0.5)}>
        <Label x={626} y={152} size={30} hi>10 kg</Label>
      </g>

      {/* 3 — today's report updates */}
      <g className="s-rise" style={st(0.4, 0.48)}>
        <rect x="420" y="240" width="350" height="130" rx="10" />
        <Label x={440} y={268} size={10}>{id ? "LAPORAN HARI INI" : "REPORT · TODAY"}</Label>
      </g>
      {report.map((h, i) => (
        <g key={i} style={st(0.44 + i * 0.025, 0.52 + i * 0.025)}>
          <rect
            x={450 + i * 44}
            y={352 - h}
            width="26"
            height={h}
            rx="3"
            className={i === 3 ? "s-grow s-fill-hi" : "s-grow s-fill-ink"}
            stroke="none"
            opacity={i === 3 ? 1 : 0.5}
          />
        </g>
      ))}
      <Label x={30} y={400} size={11}>
        {id ? "satu transaksi → struk, stok, laporan" : "one sale → receipt, stock, report"}
      </Label>
    </>
  );
}

/* ------------------------------------------------ IOT · water tank */
function SceneIoTTank({ id }: { id: boolean }) {
  const notes = id
    ? ["Air hampir habis", "Pompa menyala sendiri", "Tandon penuh ✓"]
    : ["Water is running low", "Pump switched itself on", "Tank is full ✓"];
  return (
    <>
      {/* The tank fills as you scroll */}
      <g style={st(0.1, 0.22)}>
        <path d="M90 90v270h180V90" className="s-draw" pathLength={1} />
      </g>
      <g style={st(0.22, 0.5)}>
        <rect x="92" y="130" width="176" height="228" className="s-grow s-fill-hi" stroke="none" opacity="0.32" />
      </g>
      <g className="s-fade" style={st(0.14, 0.22)}>
        <circle cx="180" cy="72" r="16" className="s-stroke-hi s-ping" />
        <circle cx="180" cy="72" r="7" className="s-fill-hi" stroke="none" />
        <Label x={180} y={392} anchor="middle" size={11}>{id ? "tandon air" : "water tank"}</Label>
      </g>

      {/* The pump decides for itself */}
      <g style={st(0.16, 0.26)}>
        <path d="M196 72h219v208" className="s-draw" pathLength={1} opacity="0.5" />
      </g>
      <g className="s-fade" style={st(0.2, 0.26)}>
        <Label x={300} y={62} anchor="middle" size={11}>{id ? "sensor level" : "level sensor"}</Label>
      </g>
      <g className="s-rise" style={st(0.2, 0.28)}>
        <rect x="350" y="280" width="130" height="80" rx="12" className="s-panel-hi" />
        <Label x={415} y={314} anchor="middle" size={12}>{id ? "POMPA" : "PUMP"}</Label>
      </g>
      <g className="s-fadeout" style={st(0.46, 0.52)}>
        <Label x={415} y={340} anchor="middle" hi size={13}>ON</Label>
        <path d="M350 320H270" className="s-stroke-hi s-flow" strokeDasharray="5 7" />
      </g>
      <g className="s-fade" style={st(0.5, 0.56)}>
        <Label x={415} y={340} anchor="middle" size={13}>OFF</Label>
      </g>

      {/* And the owner is told */}
      <rect x="570" y="50" width="200" height="350" rx="28" className="s-draw" pathLength={1} style={st(0.14, 0.28)} />
      {notes.map((n, i) => (
        <g key={n} className="s-rise" style={st(0.2 + i * 0.15, 0.28 + i * 0.15)}>
          <rect x="586" y={100 + i * 84} width="168" height="64" rx="10" className={i === 2 ? "s-panel-hi" : ""} />
          <text x="600" y={138 + i * 84} fontSize="10.5" className={i === 2 ? "s-text s-text-hi" : "s-text"}>
            {n}
          </text>
        </g>
      ))}
      <Label x={330} y={420} size={11}>
        {id ? "sensor → keputusan otomatis → kabar" : "sensor → automatic decision → notice"}
      </Label>
    </>
  );
}

const SCENES: Record<SceneKey, (props: { id: boolean }) => ReactNode> = {
  "ai/tutor": SceneAI,
  "ai/receipt": SceneAIReceipt,
  "data/sales": SceneData,
  "data/reviews": SceneDataReviews,
  "web/shop": SceneWeb,
  "web/tracking": SceneWebTracking,
  "automation/orders": SceneAutomation,
  "automation/cashier": SceneAutomationPOS,
  "iot/home": SceneIoT,
  "iot/tank": SceneIoTTank,
};

export default function ChapterScene({ scene, className = "" }: { scene: SceneKey; className?: string }) {
  const { lang } = useLang();
  const Scene = SCENES[scene];

  return (
    <svg
      viewBox="0 0 800 450"
      className={`scene ${className}`}
      preserveAspectRatio="xMidYMid meet"
      aria-hidden="true"
      focusable="false"
    >
      {/* key: switching cases replays the entrance */}
      <g key={scene} className="scene-enter">
        <Scene id={lang === "id"} />
      </g>
    </svg>
  );
}
