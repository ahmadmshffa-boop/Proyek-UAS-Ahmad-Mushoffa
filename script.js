document.addEventListener('DOMContentLoaded', () => {
    // --- ELEMEN DOM ---
    const registrationForm = document.getElementById('registration-form');
    const namaInput = document.getElementById('nama');
    const emailInput = document.getElementById('email');
    const noHpInput = document.getElementById('no-hp');
    const kategoriInput = document.getElementById('kategori');
    const formMessage = document.getElementById('form-message');
    const participantCountSpan = document.getElementById('participant-count');
    const participantListUl = document.getElementById('participant-list');
    const kuotaSisaSpan = document.getElementById('kuota-sisa');
    const submitButton = registrationForm.querySelector('.btn-submit');
    const registrationContent = document.getElementById('registration-content');

    // --- STATE APLIKASI ---
    let participants = [];
    const MAX_QUOTA = 50;

    // --- FUNGSI ---

    /**
     * render ulang daftar peserta di DOM
     */
    function renderParticipantList() {
        participantListUl.innerHTML = ''; // mengkosongkan daftar
        if (participants.length === 0) {
            participantListUl.innerHTML = '<p>Belum ada peserta terdaftar.</p>';
        } else {
            participants.forEach(participant => {
                const li = document.createElement('li');
                li.innerHTML = `
                    <div class="participant-info">
                        <div class="name">${participant.nama}</div>
                        <div class="details">${participant.email} | ${participant.noHp}</div>
                    </div>
                    <span class="participant-category">${participant.kategori}</span>
                `;
                participantListUl.appendChild(li);
            });
        }
    }

    /**
     * update tampilan daftar peserta
     */
    function updateCounts() {
        const registeredCount = participants.length;
        const remainingQuota = MAX_QUOTA - registeredCount;
        
        participantCountSpan.textContent = registeredCount;
        kuotaSisaSpan.textContent = remainingQuota > 0 ? remainingQuota : 0;

        // pengecekan jika kuora oenuh
        if (registeredCount >= MAX_QUOTA) {
            handleQuotaFull();
        }
    }

    /**
     * Menampilkan pesan di area form
     * @param {string} message - Pesan yang akan ditampilkan
     * @param {('success'|'error')} type - Tipe pesan (untuk styling CSS)
     */
    function showMessage(message, type) {
        formMessage.textContent = message;
        formMessage.className = `message ${type}`;
    }
    
    /**
     * Membersihkan pesan di area form
     */
    function clearMessage() {
        formMessage.textContent = '';
        formMessage.className = 'message';
    }

    /**
     * Logika yang dijalankan saat daftar atau pesrta penuh
     */
    function handleQuotaFull() {
        Swal.fire({
            icon: 'warning',
            title: 'Pendaftaran Ditutup',
            text: 'Maaf, kuota peserta sudah penuh. Sampai jumpa di event berikutnya!',
            confirmButtonText: 'Oke'
        });
        registrationContent.innerHTML = `<p class="message error" style="font-size: 1.2rem; text-align: center;">Pendaftaran ditutup. Kuota sudah penuh.</p>`;
        kuotaSisaSpan.textContent = "Penuh";
        submitButton.disabled = true; // Disable the button when quota is full
    }


    registrationForm.addEventListener('submit', (event) => {
        event.preventDefault(); // Mencegah reload halaman
        clearMessage();

        //  Cek Kuota sebelum validasi
        if (participants.length >= MAX_QUOTA) {
            handleQuotaFull();
            return;
        }

        //  Ambil nilai input
        const nama = namaInput.value.trim();
        const email = emailInput.value.trim();
        const noHp = noHpInput.value.trim();
        const kategori = kategoriInput.value;

        //  Validasi Javascript
        if (!nama || !email || !noHp || !kategori) {
            showMessage('Semua input wajib diisi.', 'error');
            return;
        }

        if (!email.includes('@')) {
            showMessage('Format email tidak valid. Harus mengandung karakter "@".', 'error');
            return;
        }

        if (!/^\d+$/.test(noHp)) {
            showMessage('No. Handphone hanya boleh berisi angka.', 'error');
            return;
        }
        
        //  Proses Pendaftaran Berhasil
        const newParticipant = { nama, email, noHp, kategori };
        participants.push(newParticipant);

        //  Tampilkan konfirmasi dan reset form
        Swal.fire({
            icon: 'success',
            title: 'Pendaftaran Berhasil!',
            text: 'Terima kasih telah mendaftar. Sampai jumpa di Event Teknologi 2026!',
            confirmButtonText: 'Oke'
        });
        registrationForm.reset();

        //  Manipulasi DOM (update tampilan)
        renderParticipantList();
        updateCounts();
    });


    // --- INISIALISASI ---
    
    // untuk render halaman saat baru dimuat
    renderParticipantList();
    updateCounts();
});
