# 📰 Website Manajemen Artikel — Seller Pintar

Aplikasi manajemen artikel dengan role **User** dan **Admin**, dibangun menggunakan **Next.js App Router**

## 🚀 Status: Production

✅ Setup awal sudah dilakukan:

- Struktur modular (components, features, hooks, lib, types)
- Integrasi Tailwind CSS + Shadcn/ui
- Setup TanStack Query (React Query)
- Axios instance siap
- TypeScript + Linter
- Middleware route protection (`middleware.ts`)
- Zustand store (global state)
- ✔️ Build berhasil dengan lint dan type check ✅

✅ Fitur:

### User

- [x] Register & Login dengan validasi
- [x] Halaman list artikel
- [x] Filter & Search (debounce)
- [x] Detail artikel + related posts
- [x] Logout

### Admin

- [x] Register & Login dengan validasi
- [x] CRUD kategori
- [x] CRUD artikel + preview
- [x] Filtering, search, pagination

✅ Perbaikan kode:

- Ganti `any` dengan tipe eksplisit
- Ganti `<img>` jadi `<Image />` (Next.js)
- Ganti `<a>` jadi `<Link />`

---

## 🧱 Struktur Folder

```
TEST_SELLERPINTAR/
├── app/               # Routing App Router (Next.js)
├── components/        # Reusable UI components
├── constants/         # Konstanta global (mis. role, API endpoint)
├── features/          # Fitur modular per domain (artikel, auth, dll)
├── hooks/             # Custom React hooks
├── lib/               # Utilitas global (axios, helper, storage, dll)
├── public/            # Aset publik
├── types/             # Tipe global (UserType, API response, dll)
├── .env.local         # Env lokal (API base URL, dst)
├── middleware.ts      # Middleware untuk proteksi halaman
├── next.config.ts     # Konfigurasi Next.js
├── package.json       # Dependencies dan scripts
├── tsconfig.json      # Konfigurasi TypeScript
└── README.md          # Dokumentasi proyek ini
```

---

## ⚙️ Teknologi & Konfigurasi Penting

| Teknologi             | Deskripsi                                |
| --------------------- | ---------------------------------------- |
| **Next.js 15**        | App Router, SSR, Middleware              |
| **TypeScript**        | Strict mode aktif                        |
| **Tailwind CSS 4**    | Utility-first styling                    |
| **Shadcn/ui**         | Komponen UI berbasis Radix UI            |
| **TanStack Query 5**  | Fetching & caching data                  |
| **Axios**             | Setup dengan `axiosInstanceToken`        |
| **React Hook Form**   | Validasi dengan `zodResolver`            |
| **Zustand**           | Global state management ringan & efisien |
| **Lucide React**      | Ikon stylish dan ringan                  |
| **Zod**               | Validasi form berbasis schema            |
| **ESLint + TSConfig** | Disiplin penulisan & pengecekan typing   |
| **Middleware Auth**   | Proteksi halaman berbasis `role`         |

---

## 🔧 Cara Menjalankan Proyek

1. Clone repo ini:

   ```bash
   git clone https://github.com/almasrzld/test_sellerpintar.git
   cd test_sellerpintar
   ```

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

## 💡 Catatan Pengembangan

- Semua form divalidasi menggunakan `React Hook Form + Zod`
- Halaman terproteksi menggunakan `middleware.ts` berbasis cookie role
- UI sudah responsif dan siap mobile
- Search category (Internet Server Error)
- Seluruh halaman lolos lint & type check

---

## 📂 Deployment

- ✅ Live: [https://almasrzld-sellerpintar.vercel.app](https://almasrzld-sellerpintar.vercel.app)
- 📁 GitHub Repo: [https://github.com/almasrzld/test_sellerpintar](https://github.com/almasrzld/test_sellerpintar)

---

## 📄 Lisensi

Proyek ini dibuat sebagai bagian dari Home Test Frontend Developer. Bebas digunakan dan dimodifikasi untuk kebutuhan pengembangan pribadi atau edukasi.
