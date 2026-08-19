# Plan: Portfolio Web — Endow

> **Dokumen historis.** Ini rencana awal, bukan kondisi sekarang.
> Untuk cara pakai & aturan desain yang berlaku, baca [README.md](README.md).
>
> Tiga keputusan berubah waktu pengerjaan:
> 1. **Hiasan background dibuang** — `background: "none"`, hitam polos ala vercel.com.
>    Keempat variannya tetap ada dan bisa dihidupkan lagi kapan pun lewat `content/site.ts`.
> 2. **Instrument Serif dibuang** — Geist untuk semuanya, sama seperti vercel.com.
>    Hierarki sekarang dari ukuran, berat, dan tracking (`.display` di `globals.css`).
> 3. **Ditambah blok statistik** di section About (3+ / 20+ / 5).
>
> Satu temuan yang tidak ada di rencana: enam level opacity teks ternyata gagal
> WCAG AA, dan **light theme selalu jadi penentunya**. Batas amannya `/60`.

> Semua **copy di websitenya full English**. Dokumen plan ini Bahasa Indonesia biar enak dibaca.

## Context

Folder `d:\WholeProject\web-porto` masih kosong. Target: bikin portfolio pribadi dari nol.

Tiga referensi yang jadi acuan, dan apa yang diambil dari masing-masing:

| Referensi | Diambil | Ditinggal |
|---|---|---|
| [kaenova.my.id](https://kaenova.my.id/) | Struktur & ketenangannya — 1 kolom `max-w-5xl`, hero full-screen centered, progress bar tipis di atas, ikon Lucide | Gradient warna ungu-birunya |
| [hzlnqodrey](https://hzlnqodrey-portofolio.vercel.app/) | Ide hiasan background — bentuk dekoratif `absolute` di tiap section | Eksekusinya: SVG ellipse statis, warna orange-biru tabrakan, judul gradient di mana-mana |
| [databywisnu.dev](https://databywisnu.dev/) | Kesederhanaan strukturnya (About · Skills · Projects · Contact) | Seluruh desain & copy-nya — ini yang kamu sebut "AI slop" |

**Keputusan yang sudah dikunci:**
- Next.js (App Router) + Tailwind + TypeScript
- **Monokrom hitam-putih** — nol warna aksen
- Dark default, ada toggle ke light
- Bahasa website: **English**
- Deploy ke Vercel
- Posisi: Data Enthusiast — Analyst / Engineer / Scientist / ML & DL

**Masih terbuka:** varian background (kamu pilih dari preview di Tahap 2) dan sumber konten.

---

## Kenapa Wisnu terasa "AI slop" — dan cara menghindarinya

Ini inti dari seluruh plan. Kalau lewat satu pun, hasilnya bakal terasa sama.

| Gejala AI slop | Yang kita lakukan |
|---|---|
| Copy hampa: *"Transforming raw data into actionable insights"* | Kalimat orang pertama yang spesifik. Sebut angka, nama tools, hasil nyata. Kalau bisa ditempel ke portfolio orang lain, buang. |
| Emoji di heading (👋 🚀 ⚙️ 🧰) | Nol emoji. Hierarki dibangun lewat ukuran & jarak. |
| Grid kartu seragam, semua project berbobot sama | Asimetris — 1 project unggulan besar, sisanya baris ringkas. |
| Badge skill berhamburan (20+ pill warna-warni) | Daftar mono per kategori. Sedikit tapi jujur. |
| Semua rata tengah | Cuma hero yang centered. Sisanya rata kiri. |
| Gradient ungu-biru | Monokrom. Kedalaman dari opacity, border 1px, dan grain. |
| Inter buat semuanya | Pasangan 3 font (di bawah) — ini yang paling cepat bikin beda. |

**Aturan gampangnya:** semua yang nggak bisa dijelaskan alasannya, dibuang.

---

## Struktur halaman

Satu halaman, scroll vertikal. Kolom tunggal `max-w-3xl` (lebih sempit dari kaenova yang `5xl` — makin sempit makin kelihatan sengaja, bukan template).

```
┌──────────────────────────────────────────────────┐
│ ▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔                                 │ ← progress bar 2px
│  EN              work  about  contact      ◐     │ ← nav fixed, blur, border-b
├──────────────────────────────────────────────────┤
│                                                  │
│                                    ╭──╮          │
│         YOGYAKARTA, ID · 2026     (    )         │ ← label mono, kecil, tracking lebar
│                                    ╰──╯          │
│                    Endow                         │ ← display serif, besar
│         Data Analyst & ML Engineer               │
│                                                  │   ← HIASAN BACKGROUND
│      Two specific sentences about what           │     hidup di lapisan ini
│      you're actually building right now.         │
│                                                  │
│         [ View work ]  [ Résumé ↓ ]              │
│              in    gh    ✉                       │
│                          ╭────╮                  │
│                    ↓    (      )                 │
└──────────────────────────────────────────────────┘   ← min-h-screen

  ─── ABOUT ──────────────────────────────────
  One paragraph. First person. Specific.

  CURRENTLY
  → thing one
  → thing two                                        ← blok "currently", bikin situs
                                                       terasa hidup & bertanggal

  ─── STACK ──────────────────────────────────
  ANALYSIS      SQL · Python · pandas · statistics
  ENGINEERING   Dagster · dbt · Postgres · Docker    ← label mono kiri,
  ML / DL       scikit-learn · PyTorch · MLflow        isi rata kiri
  VIZ           Metabase · Streamlit · Plotly

  ─── WORK ───────────────────────────────────
  2024 —    Entropi Martech
            Job title
            Two lines of impact, with numbers.       ← timeline, tahun mono
  2023 24   Previous place
            ...

  ─── PROJECTS ───────────────────────────────
  ┌────────────────────────────────────────┐
  │                                        │
  │  Featured project                      │        ← 1 kartu besar,
  │  One sentence + the outcome.           │          ada thumbnail
  │  DAGSTER  DBT  POSTGRES     ↗ demo     │
  └────────────────────────────────────────┘
  Second project     one-liner       ↗ repo         ← sisanya baris ringkas,
  Third project      one-liner       ↗ repo           dipisah border-t
  Fourth project     one-liner       ↗ repo

  ─── CONTACT ────────────────────────────────
  hello@email.com                                   ← link email besar, underline
  LinkedIn · GitHub · Résumé

  ── footer: built with Next.js · 2026 ──
```

---

## Design system

**Warna** — dua token saja, dibalik saat theme berubah. Tidak ada warna ketiga.

```
        dark (default)      light
bg      #0A0A0A             #FAFAFA
fg      #FAFAFA             #0A0A0A

turunannya semua pakai opacity fg:
  fg/60  teks sekunder      fg/40  label mono
  fg/10  border             fg/5   permukaan kartu
```

**Tipografi** — 3 font. Ini penangkal AI-slop paling ampuh, karena Inter-untuk-semuanya adalah ciri khasnya.

| Peran | Font | Dipakai di |
|---|---|---|
| Display | **Instrument Serif** | Nama di hero, judul section |
| Body | **Geist Sans** | Paragraf, UI |
| Mono | **Geist Mono** | Label, tahun, tag tech, angka |

Semua dari `next/font/google` — self-hosted otomatis, nol layout shift.

**Gerak** — halus dan sekali jalan. Fade-up 12px saat section masuk viewport, `IntersectionObserver`, durasi 500ms. Bukan animasi berulang. Semua tunduk pada `prefers-reduced-motion`.

---

## Tahap 2: Pilih background

Kamu bilang mau lihat gambarnya dulu. Jadi setelah scaffold, aku bikin halaman `/preview` yang menampilkan **4 varian**, masing-masing dipasang di hero sungguhan biar kelihatan apa adanya. Kamu buka di browser, pilih satu, baru lanjut.

Karena temanya monokrom, varian di bawah main di tekstur & bentuk — bukan warna.

**A. Grid + spotlight** — grid 1px `fg/6`, mask fade di tepi, glow radial 500px ngikut kursor. Kesan teknikal.

**B. Grain + orb** — 2 orb putih blur 140px opacity 8%, drift 25s. Di atasnya grain SVG opacity 3%. Grain-nya yang bikin nggak berasa digital.

**C. Kontur data** — garis kontur SVG halus, bentuknya dari data beneran (kurva distribusi / scatter). Personal buat orang data, dan nggak bakal ketemu di template mana pun.

**D. Dot matrix + vignette** — titik 1px jarak 24px, plus vignette radial gelap di tepi. Paling kalem.

Keempatnya dibangun sebagai komponen terpisah di `components/backgrounds/` dengan antarmuka sama, jadi ganti pilihan cuma tukar satu baris di `layout.tsx`. Bisa juga campur — misal A buat hero, D buat section bawah.

---

## Struktur file

```
web-porto/
├─ app/
│  ├─ layout.tsx           font, theme provider, background terpilih
│  ├─ page.tsx             rangkai section
│  ├─ preview/page.tsx     Tahap 2 — dihapus setelah kamu pilih
│  ├─ globals.css          token warna + @theme Tailwind v4
│  └─ opengraph-image.tsx  preview link, digenerate
├─ components/
│  ├─ backgrounds/         GridSpotlight · GrainOrb · DataContour · DotMatrix
│  ├─ Nav · ScrollProgress · ThemeToggle · Reveal · Section
│  └─ Hero · About · Stack · Work · Projects · Contact
├─ content/site.ts         ← SEMUA teks & data (English). Satu file.
└─ public/                 resume.pdf, thumbnail project
```

`content/site.ts` sengaja dipisah: kamu bisa update isi portfolio tanpa nyentuh satu baris pun kode komponen.

---

## Urutan pengerjaan

1. **Scaffold** — `create-next-app` (TS, Tailwind v4, App Router), token warna, font, theme toggle anti-flash
2. **Preview background** — 4 varian di `/preview`, **berhenti di sini, kamu pilih**
3. **Layout inti** — Nav, ScrollProgress, Section, Reveal, background terpilih terpasang
4. **Section** — Hero → About → Stack → Work → Projects → Contact, ambil data dari `content/site.ts`
5. **Konten** — isi beneran (butuh input kamu, lihat di bawah)
6. **Poles** — metadata SEO, OG image, favicon, cek responsive, cek kontras, `prefers-reduced-motion`
7. **Deploy** — push GitHub, connect Vercel

Tahap 1–4 jalan tanpa perlu nunggu kamu. Yang nge-block cuma Tahap 2 (pilih background) dan Tahap 5 (konten).

---

## Yang aku butuh dari kamu

Belum kejawab — tapi **nggak nge-block**, aku jalan pakai placeholder English yang realistis dulu:

- Nama lengkap (buat `<title>` & SEO) — di hero pakai "Endow"
- Kota
- Email, LinkedIn, GitHub
- Résumé (PDF) kalau mau ada tombol download
- 3–5 project: judul, satu kalimat, tech, hasil/angka kalau ada, link
- Riwayat kerja/kuliah: tempat, jabatan, tahun

Paling gampang: lempar aja CV atau link LinkedIn/GitHub-mu, nanti aku tarik sendiri dan aku tulis ulang ke English.

---

## Verifikasi

- `npm run dev` → buka `localhost:3000`, cek tiap section di 375px / 768px / 1440px
- Toggle dark/light — pastikan nggak ada flash putih saat reload (script blocking di `<head>`)
- DevTools → Rendering → `prefers-reduced-motion: reduce` → semua animasi berhenti
- Lighthouse: target Performance & Accessibility ≥ 95
- Kontras teks sekunder `fg/60` ≥ 4.5:1 di kedua tema
- `npm run build` bersih sebelum push ke Vercel