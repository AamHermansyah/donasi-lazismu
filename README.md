# Donasi Berbasis Onchain

## Deskripsi

**Donasi Berbasis Onchain** adalah platform berbasis blockchain yang menjamin transparansi dan akuntabilitas dalam pengelolaan dana ZISKA (Zakat, Infak, Sedekah, Wakaf). Platform ini dirancang untuk memudahkan donasi serta mendukung program pemberdayaan umat yang berkelanjutan melalui LAZISMU. donasi dapat dikelola dengan lebih efisien dan aman.	Dengan teknologi blockchain, setiap transaksi donasi dikelola lebih efisien, aman, dan dapat dilacak secara publik.

## Teknologi yang Digunakan

- **Next.js**: Framework React untuk pengembangan aplikasi web dengan fitur server-side rendering dan static site generation.
- **Tailwind CSS**: Framework CSS yang efisien untuk desain antarmuka pengguna yang responsif dan modern.
- **Prisma**: ORM untuk Node.js dan TypeScript yang memudahkan interaksi dengan database.
- **Ethereum Blockchain & Smart Contracts**: Untuk pengelolaan transaksi donasi secara aman dan transparan.
- **React**: Library JavaScript untuk membangun antarmuka pengguna.
- **TypeScript**: Superset JavaScript yang menyediakan tipe statis opsional dan alat yang kuat untuk pengembangan skala besar.

## Fitur

- **Autentikasi Pengguna**: Sistem untuk mendaftar dan login pengguna dengan keamanan tinggi.
- **Pengelolaan Donasi**: Kemampuan untuk menerima dan mengelola donasi dari berbagai pihak.
- **Pelacakan Transparan**: Menyediakan informasi transparan tentang donasi.
- **Dashboard Admin**: Halaman admin untuk mengelola data dan pengguna.
- **Notifikasi**: Sistem notifikasi untuk menginformasikan pengguna tentang transaksi dan perubahan penting.
- **Analisis dan Pelaporan**: Laporan mengenai pengumpulan dana dan penggunaan dana.

## Instalasi

1. **Clone repository ini:**

    ```bash
    git clone https://github.com/AamHermansyah/donasi-lazismu.git
    cd donasi-lazismu
    ```

2. **Instal dependensi:**

    ```bash
    npm install
    ```

3. **Setup database Prisma:**

    ```bash
    npx prisma generate
    ```

4. **Jalankan aplikasi dalam mode pengembangan:**

    ```bash
    npm run dev
    ```

5. **Bangun aplikasi untuk produksi:**

    ```bash
    npm run build
    ```

6. **Jalankan aplikasi dalam mode produksi:**

    ```bash
    npm start
    ```

## Skrip

- `dev`: Menjalankan aplikasi dalam mode pengembangan.
- `build`: Membangun aplikasi untuk produksi.
- `start`: Menjalankan aplikasi dalam mode produksi.
- `lint`: Menjalankan linter untuk memeriksa kode.
- `postinstall`: Menjalankan perintah Prisma setelah instalasi.

## Kontribusi

Silakan buat _issue_ atau _pull request_ untuk kontribusi. Pastikan anda mengikuti pedoman kontribusi dan kode etik.

## Lisensi

Proyek ini dilisensikan di bawah lisensi MIT.
