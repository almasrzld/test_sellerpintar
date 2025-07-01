# 📰 Website Manajemen Artikel — Seller Pintar

Aplikasi manajemen artikel dengan role **User** dan **Admin**, dibangun menggunakan **Next.js App Router** dan terintegrasi dengan API eksternal:  
`https://test-fe.mysellerpintar.com/api`.

## 🚧 Status: Development

✅ Setup awal sudah dilakukan:

- Struktur modular (components, features, hooks, lib)
- Integrasi Tailwind CSS + Shadcn/ui
- Setup TanStack Query (React Query)
- Axios instance siap
- TypeScript + Linter
- Middleware route protection dimulai (`middleware.ts`)

✅ Slicing dan fetching user:

- Slicing UI user
- Integrasi api

---

## 🧱 Struktur Folder

```

TEST\_SELLERPINTAR/
├── app/               # Routing App Router (Next.js)
├── components/        # Reusable UI components
├── constants/         # Konstanta global (mis. role, API endpoint)
├── features/          # Fitur modular per domain (artikel, auth, dll)
├── hooks/             # Custom React hooks
├── lib/               # Utilitas global (axios, helper, storage, dll)
├── public/            # Aset publik
├── .env.local         # Env lokal (API base URL, dst)
├── middleware.ts      # Middleware untuk proteksi halaman
├── next.config.ts     # Konfigurasi Next.js
├── package.json       # Dependencies dan scripts
├── tsconfig.json      # Konfigurasi TypeScript
└── README.md          # Dokumentasi proyek ini

```

---

## 🛠 Teknologi yang Digunakan

| Teknologi           | Fungsi                                |
| ------------------- | ------------------------------------- |
| **Next.js**         | Framework utama, App Router + SSR/CSR |
| **Tailwind CSS**    | Styling responsif berbasis utility    |
| **Shadcn/ui**       | Komponen UI siap pakai                |
| **TanStack Query**  | Fetching & caching data (React Query) |
| **Axios**           | HTTP client untuk API eksternal       |
| **Lucide Icons**    | Ikon SVG stylish                      |
| **React Hook Form** | Form state management                 |
| **Zod**             | Validasi schema form                  |
| **TypeScript**      | Bahasa pemrograman typed              |

---

## 🔧 Cara Menjalankan Proyek

1. Clone repo ini:
   ```bash
   git clone https://github.com/username/test_sellerpintar.git
   cd test_sellerpintar
   ```

````

2. Install dependensi:

   ```bash
   npm install
   ```

3. Buat file `.env.local`:

   ```env
   NEXT_PUBLIC_APP_URL=https://test-fe.mysellerpintar.com/api
   ```

4. Jalankan:

   ```bash
   npm run dev
   ```

---

## 📌 Rencana Fitur

### User

- [x] Register & Login dengan validasi
- [x] Halaman list artikel
- [x] Filter & Search (debounce)
- [x] Detail artikel + related posts
- [x] Logout

### Admin

* [ ] Register & Login dengan validasi
* [ ] CRUD kategori
* [ ] CRUD artikel + preview
* [ ] Filtering, search, pagination

---

## 💡 Catatan Pengembangan

* Backup dummy data akan disiapkan untuk fallback saat API tidak tersedia
* Middleware digunakan untuk membatasi akses halaman berdasarkan role
* Semua form akan divalidasi menggunakan `React Hook Form + Zod`
* UI akan dibuat **mobile-friendly**

---

## 📂 Deployment

* 🔜 Live URL: *akan menyusul*
* 🔜 GitHub Repo: *akan disediakan*

---

## 📄 Lisensi

Proyek ini dibuat sebagai bagian dari Home Test Frontend Developer. Bebas digunakan dan dimodifikasi untuk kebutuhan pengembangan pribadi atau edukasi.
````
