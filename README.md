# Gebi Portfolio — Panduan Lengkap

## Struktur file
```
gebi-portfolio/
├── index.html          -> semua konten & section
├── css/
│   └── style.css        -> animasi, warna custom, styling tambahan
├── js/
│   └── script.js         -> scrollspy, mobile menu, filter project, form
├── assets/
│   ├── CV-Gebi.pdf       -> GANTI dengan CV asli kamu (nama file harus sama persis)
│   └── images/           -> taro foto profil / screenshot project di sini
└── README.md
```

Kenapa cuma 3 file inti (HTML, 1 CSS, 1 JS)? Karena ini static site kecil — split
jadi banyak file kecil-kecil cuma nambah kerumitan tanpa manfaat di skala ini.

---

## PART 1 — Buka & jalanin di VS Code

1. Buka **VS Code**.
2. Install extension **"Live Server"** (by Ritwick Dey) dari tab Extensions (ikon kotak di sidebar kiri).
3. `File > Open Folder` → pilih folder `gebi-portfolio`.
4. Klik kanan `index.html` → **"Open with Live Server"**.
   Browser bakal kebuka otomatis di `localhost:5500` dan auto-refresh tiap kamu save file.

Gak perlu install Node.js / npm apapun — semua library (Tailwind, font) dipanggil lewat CDN di `<head>` index.html.

---

## PART 2 — Edit konten jadi versi kamu

Ganti bagian-bagian ini di `index.html` sebelum publish:

| Yang perlu diganti | Cari teks ini |
|---|---|
| Link GitHub/LinkedIn | `USERNAME` (ada 4 titik) |
| Email | `email@example.com` (ada di hero, contact, dan `js/script.js`) |
| Foto profil | Ganti `<span>G</span>` di `.avatar-circle` dengan `<img src="assets/images/profile.jpg" class="w-full h-full object-cover rounded-full">` |
| CV | Timpa file `assets/CV-Gebi.pdf` dengan CV asli, nama file sama |
| Deskripsi project | Section `#projects`, sesuaikan kalau ada detail yang kurang pas |

---

## PART 3 — Push ke Git & GitHub

Buka terminal di VS Code (`` Ctrl+` ``), jalanin satu-satu:

```bash
cd gebi-portfolio
git init
git add .
git commit -m "Initial commit: portfolio website"
```

Lanjut bikin repo di GitHub:
1. Buka [github.com/new](https://github.com/new)
2. Nama repo: `portfolio` (bebas, tapi kalau mau pakai GitHub Pages default URL, nama repo apa aja tetep bisa)
3. **Jangan** centang "Add README" (biar gak conflict sama punya kamu)
4. Create repository

GitHub bakal kasih kamu command, tapi intinya:
```bash
git remote add origin https://github.com/USERNAME/portfolio.git
git branch -M main
git push -u origin main
```

---

## PART 4 — Deploy pakai GitHub Pages (gratis, paling simpel)

Kenapa GitHub Pages? Karena situs kamu 100% static (gak ada backend/build step),
jadi gak perlu Vercel/Netlify yang punya fitur build pipeline — itu buat project
yang lebih kompleks. GitHub Pages cukup, gratis, dan langsung nyambung ke repo yang udah kamu push.

1. Di repo GitHub kamu → **Settings** → **Pages** (sidebar kiri)
2. Di **"Build and deployment"** → Source: pilih **"Deploy from a branch"**
3. Branch: pilih **`main`**, folder **`/ (root)`** → **Save**
4. Tunggu 1-2 menit, refresh halaman itu → link kamu muncul di atas, formatnya:
   `https://USERNAME.github.io/portfolio/`

Setiap kali kamu mau update:
```bash
git add .
git commit -m "update: deskripsi yang mau diubah"
git push
```
Otomatis ke-deploy ulang, gak perlu setting apa-apa lagi.

---

## PART 5 — Checklist sebelum dipakai apply internship

- [ ] Semua `USERNAME` dan `email@example.com` sudah diganti
- [ ] Foto profil asli sudah masuk (bukan placeholder huruf "G")
- [ ] CV asli sudah menggantikan file placeholder
- [ ] Cek tampilan di HP (resize browser atau buka dari HP langsung)
- [ ] Test semua link (GitHub, LinkedIn, tombol Resume) beneran ke tempat yang benar
- [ ] Cek scrollspy & animasi jalan lancar pas di-scroll pelan-pelan

---

## Kalau mau nambah project baru nanti

Copy satu blok `<article class="project-card ...">` di section `#projects`,
tempel di bawahnya, ganti isi & `data-category` (pakai `fullstack` atau `ai`,
atau tambah kategori baru + tombol filter baru di `.filter-btn`).
