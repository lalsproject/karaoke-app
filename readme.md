
# Karaoke App
Karaoke App adalah sebuah aplikasi sederhana yang memungkinkan pengguna untuk mencari lagu karaoke di YouTube dan memainkannya dalam sebuah pemutar video.

## Deskripsi
Aplikasi ini dibangun menggunakan teknologi web dengan menggunakan Express.js untuk membuat server backend dan Electron untuk membuat aplikasi desktop lintas platform.

## Fitur
- Pencarian lagu karaoke di YouTube.
- Memainkan lagu karaoke dengan menggunakan pemutar video.
- Menambahkan lagu ke dalam playlist.
- Menghapus lagu dari playlist.
- Kontrol volume.
- Kontrol pemutaran (putar, jeda, berikutnya).

## Instalasi

Pastikan Anda telah menginstal Node.js di komputer Anda.
Clone repositori ini ke dalam direktori lokal Anda:
```bash
git clone [<URL repositori>](https://github.com/lalsproject/karaoke-app.git)
```
Masuk ke direktori proyek:
```bash
cd karaoke-app
```
Install dependensi dengan menjalankan perintah:
```bash
npm install
```
## Menjalankan Aplikasi
Menjalankan Server Express
Pastikan Anda masih berada di direktori proyek.
Jalankan perintah berikut untuk menjalankan server Express:
```bash
node index.js
```
Server akan berjalan di http://localhost:3000.

## Menjalankan Aplikasi Electron
Pastikan server Express masih berjalan.
Buka terminal dan masuk ke direktori proyek.
Jalankan aplikasi Electron dengan perintah:
```bash
electron app.js
```
Aplikasi akan membuka jendela utama dan jendela pemutar.

## Menjalankan Aplikasi dengan loader.js
Anda juga dapat menggunakan loader.js untuk menjalankan aplikasi dengan mudah. File loader.js bertanggung jawab untuk memulai dua proses aplikasi secara bersamaan: server Express dan aplikasi Electron.

Pastikan Node.js telah terpasang di komputer Anda.
Jalankan loader.js dengan perintah:
```bash
node loader.js
```
loader.js akan memulai aplikasi server Express terlebih dahulu, kemudian setelah 10 detik, akan memulai aplikasi Electron.

## Kontribusi
Kontribusi dalam bentuk pull request selalu dipersilakan. Untuk perubahan besar, silakan buka issue terlebih dahulu untuk mendiskusikannya.

## Lisensi
Proyek ini dilisensikan di bawah Lisensi MIT. Silakan lihat berkas LICENSE untuk detailnya.

