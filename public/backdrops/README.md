# Scroll backdrops

Taruh file di folder ini. Tidak perlu ubah kode — nama file menentukan tempatnya.

| Nama file        | Tampil di                          | Isi yang disarankan                                  |
| ---------------- | ---------------------------------- | ---------------------------------------------------- |
| `hero.mp4`       | Hero (menggantikan core 3D)        | Gambaran umum: Anda + teknologi yang Anda bangun     |
| `ai.mp4`         | Bab 01 — AI & Vision               | Suara → teks → respons AI; OCR membaca gambar        |
| `data.mp4`       | Bab 02 — Data                      | Data mentah → grafik → insight                       |
| `web.mp4`        | Bab 03 — Web & Mobile              | Rekaman layar aplikasi/website Anda yang sebenarnya  |
| `automation.mp4` | Bab 04 — Otomasi                   | Alur kerja: order → gudang → laporan                 |
| `iot.mp4`        | Bab 05 — IoT                       | Sensor/perangkat mengirim data ke ponsel             |

Tanpa file, setiap bab memutar animasi berkode (`components/ui/ChapterScene.tsx`).
Video yang ditaruh di sini **menggantikan** animasi bab tersebut.

Setiap video sebaiknya punya poster dengan nama yang sama (`hero.jpg`, `ai.jpg`, …).
Poster dipakai di HP, saat *reduced motion* aktif, dan selama video dimuat.
Poster saja tanpa video juga boleh — ia tampil sebagai gambar dengan zoom halus saat scroll.

Format yang dikenali: video `.mp4` / `.webm`, poster `.webp` / `.avif` / `.jpg` / `.png`.

## Aturan video

- **Durasi 4–8 detik.** Scroll yang menggerakkan video, bukan waktu.
- **Tanpa suara**, lanskap, 1920×1080 cukup.
- **Kamera bergerak pelan dan searah** (maju, geser, memutar). Potongan adegan (cut) terasa kasar saat di-scrub.
- **Wajib di-encode ulang** dengan perintah di bawah. Video biasa hanya punya keyframe tiap beberapa detik,
  sehingga tersendat saat di-scrub.
- Target ukuran: di bawah ~6 MB per video.

```bash
# video: setiap frame ke-2 adalah keyframe → scrub mulus
ffmpeg -i sumber.mp4 -an -vf "scale=1920:-2,fps=30" -c:v libx264 -preset slow -crf 24 -g 2 -pix_fmt yuv420p -movflags +faststart hero.mp4

# poster: frame pertama
ffmpeg -i hero.mp4 -frames:v 1 -q:v 3 hero.jpg
```

Setelah menaruh file: muat ulang halaman (dev), atau build ulang (produksi).
