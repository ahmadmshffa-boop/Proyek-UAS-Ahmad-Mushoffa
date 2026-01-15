# Proyek-UAS-Ahmad-Mushoffa
sebagai penilaian ujian akhir semester 
penjelasan alur logika dan algortihma pada web ini

1. Alur Sistem 

Website ini memiliki 3 fungsi utama:

1. Menampilkan informasi event
2. Menampilkan galeri carousel otomatis
3. Mengelola form pendaftaran + kuota peserta
4. Menampilkan daftar peserta terdaftar secara real-time 

 2. Alur Logika Program (Flow)

 Saat halaman dibuka:

DOM loaded
-
Inisialisasi variabel & elemen DOM
-
participants 
MAX_QUOTA = 50
-
renderParticipantList
updateCounts


 3. Struktur Data

js
participants = [
  {
    nama: "...",
    email: "...",
    noHp: "...",
    kategori: "..."
  }



Daftar ini menjadi database sementara.


 4. Algoritma Utama

 1. Inisialisasi: Saat halaman dimuat, skrip akan menyiapkan variabel-variabel penting, termasuk kuota maksimal (50)
      dan daftar peserta (awalnya kosong).
   2. Pengecekan Kuota: Ketika pengguna menekan tombol "Daftar", algoritma pertama-tama akan memeriksa apakah kuota
      masih tersedia.
      - Jika Penuh: Pendaftaran dihentikan, dan SweetAlert peringatan "Kuota Penuh" akan muncul.
   3. Validasi Input: Jika kuota masih ada, skrip akan memvalidasi semua data yang dimasukkan pengguna (nama, email, No.
      HP, dan kategori).
      - Jika Tidak Valid: Pesan error akan ditampilkan di bawah form, dan pendaftaran dihentikan.
   4. Proses Pendaftaran: Jika data valid, algoritma akan:
      - Membuat objek baru yang berisi data peserta.
      - Menambahkan objek tersebut ke dalam daftar internal (array) peserta.
      - Menampilkan SweetAlert "Pendaftaran Berhasil!".
      - Mengosongkan kembali semua kolom input pada form.
   5. Pembaruan Tampilan (UI Update): Setelah pendaftaran berhasil, skrip akan secara otomatis:
      - Memperbarui dan menampilkan kembali daftar peserta yang sudah terdaftar di halaman.
      - Memperbarui teks "Kuota Tersedia" dan jumlah peserta terdaftar.

 6. Algoritma Carousel (CSS)

Carousel menggunakan:

display:flex
animation: scroll 30s linear infinite

Dengan duplikasi gambar → menciptakan efek loop tanpa JS.

 7. Kesimpulan

Website ini menggunakan konsep:

✔ Daftar sebagai database
✔ Event listener sebagai trigger
✔ Validasi berlapis
✔ Manipulasi DOM
