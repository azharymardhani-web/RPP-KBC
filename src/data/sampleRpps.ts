import { RPPData } from '../types/rpp';

export const SAMPLE_RPPS: RPPData[] = [
  {
    id: 'sample-mts-fikih',
    title: 'RPP Fikih MTs Kelas VII - Salat Berjamaah dan Pembiasaan Kasih Sayang',
    createdAt: '2026-10-01T08:00:00.000Z',
    updatedAt: '2026-10-01T08:30:00.000Z',
    templateType: 'kbc_merdeka',
    
    namaGuru: 'Ahmad Fauzi, S.Pd.I., M.Pd.',
    nip: '19850412 201101 1 008',
    namaMadrasah: 'MTs Negeri 1 Model Nusantara',
    tahunPelajaran: '2025/2026',
    semester: '1 (Ganjil)',
    jenjang: 'MTs',
    kelas: 'VII',
    fase: 'Fase D',
    mataPelajaran: 'Fikih',
    alokasiWaktu: '2 JP (2 x 40 Menit)',
    jumlahPertemuan: '1 Pertemuan',
    
    topik: 'Ketentuan dan Keutamaan Salat Berjamaah',
    materi: 'Salat Berjamaah: Syarat Imam dan Makmum, Posisi Shaf, Masbuq, serta Pembiasaan Disiplin dan Ukhuwah',
    kompetensiAwal: 'Peserta didik telah memahami tata cara salat fardhu secara munfarid dan bacaan salat dengan benar.',
    tujuanPembelajaran: [
      'Menjelaskan ketentuan syar\'i salat berjamaah (syarat sah, syarat imam, syarat makmum) dengan tepat dan berbasis dalil hadis sahih.',
      'Mendemonstrasikan tata kelola saf salat berjamaah dan tata cara makmum masbuq dengan tertib dan khusyuk.',
      'Menginternalisasikan nilai cinta kepada Allah SWT dan sesama melalui pembiasaan salat berjamaah di madrasah sebagai sarana merajut persaudaraan (ukhuwah islamiyah).'
    ],
    pemahamanBermakna: 'Salat berjamaah melatih kepatuhan pada pemimpin adil, meluruskan saf hati, dan menumbuhkan kasih sayang tanpa memandang sekat sosial atau latar belakang.',
    pertanyaanPemantik: [
      'Mengapa Rasulullah SAW menyatakan pahala salat berjamaah dilipatgandakan 27 derajat dibanding salat sendirian?',
      'Pelajaran kepemimpinan dan kasih sayang apa yang dapat kita petik dari interaksi seorang imam dan makmum saat salat?'
    ],
    saranaPrasarana: 'Masjid/Mushala madrasah, proyektor, sajadah, buku paket Fikih Kemenag Kelas VII, LKPD interaktif.',
    modelPembelajaran: 'Problem Based Learning (PBL) dipadukan dengan Demonstrasi Praktik',
    metodePembelajaran: ['Tanya Jawab', 'Diskusi Kelompok Terfokus', 'Simulasi Peragaan (Drill)', 'Refleksi Berbasis Cinta'],
    sumberBelajar: [
      'Buku Siswa Fikih Madrasah Tsanawiyah Kelas VII Kemenag RI 2024',
      'Kitab Fiqh Sunnah li Sayyid Sabiq bab Shalatul Jama\'ah',
      'Video edukasi tata cara shalat berjamaah dan makmum masbuq (Kemenag TV)'
    ],
    mediaPembelajaran: ['Slide Canva Interaktif', 'Video Ilustrasi Shaf Salat', 'Lembar Kerja Peserta Didik (LKPD) Cinta Saf'],
    
    kbcValues: ['kbc-allah', 'kbc-rasul', 'kbc-sesama', 'kbc-kebersamaan', 'kbc-perdamaian'],
    kbcKarakter: 'Ketaatan spiritual, empati sosial, ketertiban shaf, ukhuwah islamiyah, dan kesantunan akhlak.',
    kbcImplementasi: 'Guru merancang kegiatan simulasi salat berjamaah di mana siswa saling mengoreksi posisi saf dengan kata-kata lembut (qaulan layyina) dan berlapang dada ketika diingatkan.',
    kbcContohPerilaku: 'Peserta didik rela mempersilakan temannya masuk ke dalam barisan shaf tanpa berdesakan, dan dengan senyum tulus mengulurkan sajadah untuk kawan di sebelahnya.',
    kbcRefleksi: 'Peserta didik merenungi bagaimana kesiapan meluruskan saf dalam salat dapat diterapkan dalam kehidupan nyata untuk saling menjaga keharmonisan dan perdamaian di madrasah.',
    
    deepLearning: {
      mindfulLearning: 'Memusatkan kesadaran batin dan khusyuk melalui tadabbur makna salat berjamaah sebelum memulai praktik peragaan saf.',
      meaningfulLearning: 'Mengaitkan kedisiplinan saf salat berjamaah dengan pembentukan kepemimpinan dan keharmonisan sosial di madrasah.',
      joyfulLearning: 'Menyelenggarakan simulasi peragaan saf secara interaktif, gembira, dan penuh semangat kebersamaan.',
    },

    langkahPembelajaran: {
      pendahuluan: {
        durasi: '10 Menit',
        kegiatan: [
          'Guru membuka pertemuan dengan salam hangat bernuansa cinta, menyapa setiap peserta didik dengan senyuman dan menanyakan kabar hati serta kesehatan.',
          'Pembacaan doa bersama dipimpin oleh ketua kelas dengan khusyuk sebagai wujud cinta kepada Allah SWT dan Rasul-Nya.',
          'Pemeriksaan kerapian dan kebersihan area sekitar tempat duduk siswa sebagai wujud cinta lingkungan.',
          'Apersepsi: Guru mengaitkan pengalaman salat berjamaah saat Zuhur di madrasah dan menayangkan gambar jamaah haji di Masjidil Haram yang berbaris rapi mengitari Ka\'bah.',
          'Penyampaian tujuan pembelajaran, alur kegiatan kolaboratif, dan asesmen yang akan dilalui.'
        ]
      },
      inti: {
        durasi: '60 Menit',
        sintaks: 'Fase Orientasi, Eksplorasi, Simulasi Praktik, dan Kolaborasi Berkasih Sayang',
        kegiatan: [
          'Orientasi Masalah: Guru menampilkan video pendek studi kasus tentang situasi makmum masbuq yang panik berlari dan bersenggolan dengan jamaah lain di saf masjid.',
          'Eksplorasi Konseptual: Siswa dalam kelompok menelaah hadis tentang adab menuju salat berjamaah ("datangilah salat dengan tenang dan khusyuk") dan ketentuan posisi saf jika makmum terdiri dari berbagai usia dan jenis kelamin.',
          'Diskusi Kolaboratif: Tiap kelompok mendiskusikan solusi atas kasus makmum masbuq dan merumuskan etika saling menyayangi antarjamaah saat saf padat.',
          'Simulasi Peragaan (Praktik Nyata): Kelompok mempraktikkan langsung: (1) Cara imam mengingatkan kelurusan saf dengan bijak, (2) Posisi 1 makmum, 2 makmum, dan jamaah banyak, (3) Tata cara masbuq takbiratul ihram tanpa mengganggu kekhusyukan jamaah lain.',
          'Feedback & Apresiasi Teman: Antarkelompok memberikan umpan balik apresiatif dengan kata-kata santun dan memuji kerapian saf kelompok penampil.'
        ]
      },
      penutup: {
        durasi: '10 Menit',
        kegiatan: [
          'Guru bersama peserta didik menyimpulkan hikmah salat berjamaah: melatih ketaatan pada kebenaran dan merekatkan rasa cinta sesama mukmin.',
          'Refleksi Berbasis Cinta: Siswa menuliskan satu tekad perbaikan sikap (misal: "Saya akan lebih awal datang ke musala dan menyapa teman dengan senyum saat mengajak salat berjamaah").',
          'Pemberian tugas pengamatan kebiasaan salat berjamaah di musala/masjid rumah masing-masing.',
          'Menutup pembelajaran dengan doa kafaratul majlis dan salam penutup penuh kehangatan.'
        ]
      }
    },
    
    asesmen: {
      diagnostik: {
        teknik: 'Tanya Jawab Lisan & Kuis Reflektif Awal',
        bentuk: 'Pertanyaan Terbuka',
        instrumen: 'Rubrik pemahaman awal konsep salat berjamaah dan kebiasaan salat di keluarga.',
        indikator: 'Mengidentifikasi pengetahuan awal siswa terkait rukun dan hukum salat berjamaah.',
        kriteria: 'Siswa mampu menjelaskan hukum salat berjamaah dan pengalaman melaksanakannya.'
      },
      formatif: {
        teknik: 'Observasi Unjuk Kerja Simulasi & Lembar Diskusi LKPD',
        bentuk: 'Rubrik Pengamatan Praktik Saf & Masbuq',
        instrumen: 'Checklist ketercapaian tata cara saf, kekhusyukan, dan adab masbuq.',
        indikator: 'Kesesuaian gerakan makmum terhadap imam dan ketepatan adab masbuq.',
        kriteria: 'Memenuhi minimal 80% ketepatan posisi saf dan pergantian rakaat masbuq.'
      },
      sumatif: {
        teknik: 'Tes Tertulis & Penilaian Proyek Portofolio Ibadah',
        bentuk: 'Soal Analisis Situasional Berbasis Cerita (HOTS)',
        instrumen: 'Soal uraian 5 butir tentang solusi permasalahan salat berjamaah di masyarakat.',
        indikator: 'Menganalisis hukum sah/batalnya salat makmum dalam situasi tertentu.',
        kriteria: 'Nilai ketercapaian tujuan pembelajaran (KKTP) minimal 75.'
      },
      sikap: {
        teknik: 'Observasi Penilaian Diri dan Antarteman Berbasis KBC',
        rubrik: [
          'Kedisiplinan hadir tepat waktu di musala madrasah (Cinta kepada Allah SWT)',
          'Santun dalam menegur kekeliruan rekan tanpa mempermalukan (Cinta kepada Sesama)',
          'Saling berbagi sajadah dan tempat duduk tanpa egois (Cinta terhadap Kebersamaan)'
        ]
      },
      pengetahuan: {
        teknik: 'Tes Objektif & Uraian Analitis',
        instrumen: 'Lembar soal evaluasi kognitif Fikih materi Shalatul Jama\'ah.'
      },
      keterampilan: {
        teknik: 'Uji Praktik Peragaan Langsung di Musala',
        instrumen: 'Format lembar penilaian praktik salat berjamaah dan tata cara masbuq.'
      }
    },
    
    diferensiasi: {
      konten: 'Menyediakan teks rujukan kitab Fikih klasik berharakat bagi siswa mahir bahasa Arab, teks terjemahan bahasa Indonesia, dan infografis visual langkah-langkah salat berjamaah bagi pembelajar visual.',
      proses: 'Peserta didik yang sudah fasih menjadi pemandu (tutor sebaya) dalam simulasi peragaan saf, sementara guru mendampingi kelompok yang masih bingung membedakan rakaat masbuq.',
      produk: 'Peserta didik dapat memilih menyajikan hasil pemahaman dalam bentuk: (1) Poster infografis adab salat berjamaah, (2) Rekaman video pendek tutorial masbuq, atau (3) Resume naratif berisi refleksi pengalaman berjamaah.',
      remedial: 'Bimbingan khusus secara tatap muka terbatas mengenai perhitungan rakaat makmum masbuq dan praktik langsung dipandu guru.',
      pengayaan: 'Mengkaji materi lanjutan mengenai hukum masbuq dalam salat gerhana, salat jenazah, dan ketentuan salat jama\' qashar berjamaah.'
    },
    
    refleksi: {
      guru: [
        'Apakah seluruh peserta didik merasa nyaman dan dihargai selama simulasi berlangsung?',
        'Sejauh mana nilai Kurikulum Berbasis Cinta (empati dan ukhuwah) tercermin dalam interaksi antar-siswa di kelas hari ini?',
        'Langkah diferensiasi mana yang paling efektif membantu siswa yang masih kesulitan?'
      ],
      siswa: [
        'Apa hal paling berharga dan menenangkan yang saya rasakan ketika mempraktikkan salat berjamaah bersama sahabat sekelas?',
        'Bagaimana saya bisa menjadi makmum yang lebih santun dan penuh kasih saat berada di musala madrasah maupun rumah?',
        'Adakah teman yang telah membantu saya memahami materi hari ini, dan sudahkah saya berterima kasih kepadanya?'
      ],
      kbc: [
        'Penumbuhan cinta pada panggilan azan dan kerinduan berkumpul dalam kebaikan.',
        'Membiasakan budaya saling menyapa dengan salam dan senyuman sebelum dan sesudah salat.'
      ]
    },
    
    tempatTanggal: 'Jakarta, 14 Juli 2025',
    namaKepalaMadrasah: 'Drs. H. Mulyadi, M.Pd.I.',
    nipKepalaMadrasah: '19700315 199503 1 002'
  },
  {
    id: 'sample-ma-informatika',
    title: 'RPP Informatika MA Kelas X - Berpikir Komputasional Berlandaskan Cinta Kemanusiaan',
    createdAt: '2026-10-02T09:15:00.000Z',
    updatedAt: '2026-10-02T10:00:00.000Z',
    templateType: 'kbc_merdeka',
    
    namaGuru: 'Nurul Hidayati, S.Kom., M.T.',
    nip: '19900820 201802 2 001',
    namaMadrasah: 'MAN Insan Cendekia Nusantara',
    tahunPelajaran: '2025/2026',
    semester: '1 (Ganjil)',
    jenjang: 'MA',
    kelas: 'X',
    fase: 'Fase E',
    mataPelajaran: 'Informatika',
    alokasiWaktu: '3 JP (3 x 45 Menit)',
    jumlahPertemuan: '1 Pertemuan',
    
    topik: 'Penerapan Berpikir Komputasional untuk Solusi Sosial Kemanusiaan',
    materi: '4 Pilar Berpikir Komputasional: Dekomposisi, Pengenalan Pola, Abstraksi, dan Perancangan Algoritma untuk Mengatasi Isu Sampah di Madrasah',
    kompetensiAwal: 'Siswa memahami konsep logika dasar dan penggunaan perangkat digital sehari-hari.',
    tujuanPembelajaran: [
      'Menganalisis permasalahan riil di lingkungan madrasah menggunakan 4 pilar computational thinking secara logis dan terstruktur.',
      'Merancang diagram alir (flowchart) algoritma sistem pengelolaan sampah madrasah berbasis teknologi digital.',
      'Mengintegrasikan nilai cinta lingkungan dan cinta ilmu sebagai motivasi menciptakan inovasi teknologi yang bermanfaat bagi kemanusiaan (maslahah \'ammah).'
    ],
    pemahamanBermakna: 'Kecakapan berpikir komputasional bukan hanya untuk membuat program komputer, tetapi instrumen akal anugerah Allah SWT untuk memecahkan persoalan masyarakat dengan penuh kasih sayang.',
    pertanyaanPemantik: [
      'Bagaimana algoritma dan teknologi komputer bisa menyelamatkan lingkungan kita dari tumpukan sampah plastik?',
      'Jika teknologi tidak dilandasi rasa cinta dan moralitas kemanusiaan, apa dampak buruk yang mungkin timbul?'
    ],
    saranaPrasarana: 'Laboratorium Komputer, LCD Proyektor, Kartu Kasus Masalah Sosial (Unplugged), Aplikasi Diagram Lucidchart / Draw.io.',
    modelPembelajaran: 'Problem Based Learning (PBL) dipadukan dengan Pendekatan Unplugged & Plugged Computational Thinking',
    metodePembelajaran: ['Studi Kasus Lingkungan', 'Kerja Kelompok Kolaboratif', 'Presentasi Algoritma', 'Refleksi Etika Digital'],
    sumberBelajar: [
      'Buku Informatika MA/SMA Kelas X Pusat Kurikulum dan Perbukuan Kemendikbudristek',
      'Modul Berpikir Komputasional Bebras Indonesia',
      'Jurnal Inovasi Teknologi Ramah Lingkungan untuk Madrasah'
    ],
    mediaPembelajaran: ['Papan Kanvas Berpikir Komputasional', 'Alat Peraga Unplugged', 'Slide Presentasi Interaktif'],
    
    kbcValues: ['kbc-allah', 'kbc-ilmu', 'kbc-lingkungan', 'kbc-kemanusiaan'],
    kbcKarakter: 'Kecendekiaan, tanggung jawab ekologis, empati sosial, dan berpikir kritis berintegritas.',
    kbcImplementasi: 'Siswa diarahkan mendesain algoritma yang mengutamakan kemudahan masyarakat dan mengedukasi warga madrasah agar tidak membuang sampah sembarangan dengan pendekatan kasih sayang.',
    kbcContohPerilaku: 'Peserta didik tekun membimbing teman satu tim yang belum terbiasa logika flowchart tanpa merendahkan, dan antusias membersihkan meja lab komputer setelah pembelajaran usai.',
    kbcRefleksi: 'Peserta didik merenungi bahwa kecerdasan akal dan kecanggihan teknologi harus selalu diarahkan untuk melayani sesama ciptaan Tuhan.',

    deepLearning: {
      mindfulLearning: 'Membangun kesadaran kritis dan etika digital yang berlandaskan tanggung jawab ekologis dan sosial.',
      meaningfulLearning: 'Merancang algoritma komputasi untuk menyelesaikan masalah nyata penumpukan sampah di lingkungan madrasah.',
      joyfulLearning: 'Mengeksplorasi logika pemrograman secara kolaboratif, menyenangkan, dan kreatif di laboratorium komputer.',
    },
    
    langkahPembelajaran: {
      pendahuluan: {
        durasi: '15 Menit',
        kegiatan: [
          'Guru mengawali dengan salam sapa ceria, mendoakan keberkahan belajar, dan menanyakan kondisi emosi siswa (mood check-in).',
          'Tadarus ayat pilihan (QS. Ar-Rum: 41 tentang kerusakan lingkungan akibat tangan manusia) untuk menyalakan api kesadaran cinta lingkungan.',
          'Pemeriksaan kesiapan perangkat komputer lab dan kebersihan meja kerja.',
          'Apersepsi: Guru menampilkan foto kondisi timbulan sampah di kantin madrasah saat jam istirahat dan memicu rasa peduli siswa.',
          'Menyampaikan peta capaian pembelajaran dan kontrak belajar yang menyenangkan.'
        ]
      },
      inti: {
        durasi: '105 Menit',
        sintaks: 'Tahap Dekomposisi, Identifikasi Pola Kasus, Pemodelan Abstraksi, dan Konstruksi Solusi Algoritma',
        kegiatan: [
          'Dekomposisi: Setiap kelompok menerima tantangan membedah rantai penyebab penumpukan sampah di madrasah ke dalam komponen-komponen kecil (kantin, kelas, kesadaran personal, fasilitas tong sampah).',
          'Pengenalan Pola: Siswa mengamati data waktu puncak produksi sampah dan jenis sampah terbanyak yang dihasilkan setiap harinya.',
          'Abstraksi: Siswa memilah variabel penting yang bisa diintervensi oleh sistem logika (misalnya poin penghargaan sedekah sampah) dan mengabaikan hal yang tidak relevan.',
          'Algoritma: Kelompok menyusun flowchart langkah-langkah aplikasi sederhana "Sedekah Sampah Berkah" yang menghubungkan siswa dengan bank sampah madrasah.',
          'Gallery Walk & Presentasi: Tiap kelompok memajang rancangan di layar komputer lab, kelompok lain berkunjung memberikan apresiasi dan masukan yang membangun.'
        ]
      },
      penutup: {
        durasi: '15 Menit',
        kegiatan: [
          'Klarifikasi dan penguatan konsep oleh guru tentang keindahan berpikir komputasional yang dipandu hati nurani.',
          'Refleksi Diri Berbasis Cinta: Peserta didik menjawab pertanyaan "Apakah algoritma yang saya buat sudah mempermudah orang lain berbuat kebaikan?"',
          'Penutupan dengan doa syukur dan mematikan perangkat lab komputer secara tertib untuk hemat energi.'
        ]
      }
    },
    
    asesmen: {
      diagnostik: {
        teknik: 'Kuis Logika Cepat Unplugged (Pre-Test)',
        bentuk: 'Pilihan Ganda & Teka-teki Pola Logika',
        instrumen: 'Lembar instrumen 5 soal logika komputasional dasar.',
        indikator: 'Menilai kemampuan dekomposisi masalah sederhana siswa.',
        kriteria: 'Mampu memecah persoalan minimal ke dalam 3 sub-komponen.'
      },
      formatif: {
        teknik: 'Penilaian Kinerja Lembar Kerja Komputasional',
        bentuk: 'Rubrik Penilaian 4 Pilar Berpikir Komputasional',
        instrumen: 'Lembar observasi proses pemecahan masalah dan kerja sama tim.',
        indikator: 'Ketepatan identifikasi dekomposisi, pola, abstraksi, dan flowchart algoritma.',
        kriteria: 'Mencapai skor minimal 3 dari 4 pada setiap pilar berpikir komputasional.'
      },
      sumatif: {
        teknik: 'Portofolio Desain Algoritma Solusi Masalah Lingkungan',
        bentuk: 'Dokumen Desain Flowchart & Laporan Solusi Digital',
        instrumen: 'Rubrik penilaian portofolio logika dan relevansi sosial.',
        indikator: 'Efisiensi langkah algoritma dan nilai kemanfaatan bagi lingkungan.',
        kriteria: 'Nilai kelulusan KKTP minimal 78.'
      },
      sikap: {
        teknik: 'Pengamatan Karakter Digital & Kepedulian Ekologis',
        rubrik: [
          'Kepedulian terhadap fasilitas dan kebersihan laboratorium (Cinta Lingkungan)',
          'Menghargai hak cipta dan tidak melakukan plagiasi ide kelompok lain (Cinta Kebenaran & Kemanusiaan)',
          'Kerja sama saling mendukung tanpa diskriminasi kemampuan teknis (Cinta Sesama)'
        ]
      },
      pengetahuan: {
        teknik: 'Tes Pemahaman Teori Logika & Algoritma',
        instrumen: 'Soal pilihan ganda kompleks dan studi kasus flowchart.'
      },
      keterampilan: {
        teknik: 'Unjuk Kerja Penyusunan Diagram Alir Komputer',
        instrumen: 'Lembar penilaian kerapian simbol flowchart dan ketepatan sintaks logika.'
      }
    },
    
    diferensiasi: {
      konten: 'Tersedia panduan langkah-langkah logika pemula dengan kartu analog, serta materi tingkat lanjut mengenai pseudocode bagi siswa yang sudah terbiasa coding.',
      proses: 'Peserta didik yang memiliki ketertarikan visual dapat fokus mendesain antarmuka/simbol flowchart, sementara yang menyukai logika naratif merumuskan runtutan aturan.',
      produk: 'Produk akhir dapat berupa flowchart digital di Canva/Lucidchart, diagram tangan kreatif di kertas plano, atau purwarupa interaktif Scratch.',
      remedial: 'Latihan terbimbing menyelesaikan pola logika Bebras tingkat dasar bersama guru.',
      pengayaan: 'Menerjemahkan diagram alir yang telah dibuat ke dalam bahasa pemrograman Python sederhana.'
    },
    
    refleksi: {
      guru: [
        'Apakah pendekatan unplugged berhasil meruntuhkan kesan bahwa informatika itu rumit dan kaku?',
        'Bagaimana integrasi nilai cinta lingkungan mampu memotivasi siswa menghasilkan solusi bermakna?',
        'Adakah peserta didik yang memerlukan pendampingan intensif pada pilar abstraksi?'
      ],
      siswa: [
        'Hal apa dari materi berpikir komputasional hari ini yang mengubah cara pandang saya terhadap masalah sehari-hari?',
        'Bagaimana saya memanfaatkan kecakapan logika ini untuk membantu keluarga atau teman di luar kelas?',
        'Apakah saya merasa bangga dapat berkontribusi merawat kelestarian lingkungan madrasah?'
      ],
      kbc: [
        'Mengembangkan etika teknologi yang berpihak pada kemaslahatan manusia dan alam.',
        'Membangun tradisi digital yang menjunjung kesantunan dan anti-kebencian.'
      ]
    },
    
    tempatTanggal: 'Yogyakarta, 21 Juli 2025',
    namaKepalaMadrasah: 'Prof. Dr. H. Subagyo, M.Si.',
    nipKepalaMadrasah: '19681105 199303 1 003'
  }
];
