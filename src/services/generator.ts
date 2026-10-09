import { RPPData, Jenjang, Fase } from '../types/rpp';
import { getFaseByGrade } from '../data/phases';
import { KBC_VALUES } from '../data/kbc';

interface SmartGenerationParams {
  namaGuru?: string;
  nip?: string;
  namaMadrasah?: string;
  tahunPelajaran?: string;
  semester?: '1 (Ganjil)' | '2 (Genap)';
  jenjang: Jenjang;
  kelas: string;
  mataPelajaran: string;
  topik?: string;
  materi?: string;
  selectedKbcIds?: string[];
  templateType?: 'kbc_merdeka' | 'standar_merdeka' | 'ringkas' | 'supervisi_lengkap';
}

export function generateSmartDefaultRPP(params: SmartGenerationParams): RPPData {
  const fase: Fase = getFaseByGrade(params.jenjang, params.kelas);
  const mapel = params.mataPelajaran || 'Al-Qur\'an Hadis';
  const topik = params.topik || getDefaultTopicForSubject(mapel, params.jenjang, params.kelas);
  const materi = params.materi || getDefaultMateriForSubject(mapel, topik);
  
  // Pick 3-4 natural KBC values if not specified
  const chosenKbcIds = params.selectedKbcIds && params.selectedKbcIds.length > 0 
    ? params.selectedKbcIds 
    : getDefaultKbcIdsForSubject(mapel);

  const chosenKbcObjects = KBC_VALUES.filter(k => chosenKbcIds.includes(k.id));
  const kbcNames = chosenKbcObjects.map(k => k.title).join(', ');

  const timeAlloc = params.jenjang === 'MI' ? '2 JP (2 x 35 Menit)' : params.jenjang === 'MTs' ? '2 JP (2 x 40 Menit)' : '2 JP (2 x 45 Menit)';

  const modelPembelajaran = getDefaultModelForSubject(mapel);
  const activities = generateSubjectSpecificActivities(mapel, topik, materi, params.kelas, params.jenjang, chosenKbcObjects);
  const assessments = generateSubjectSpecificAssessments(mapel, topik);
  const diff = generateSubjectSpecificDifferentiation(mapel, topik);
  const goals = generateSubjectGoals(mapel, topik, materi, params.kelas, fase, chosenKbcObjects);
  const pemahaman = generateSubjectPemahaman(mapel, topik);
  const pemantik = generateSubjectPemantik(mapel, topik);

  return {
    id: 'rpp_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7),
    title: `RPP ${mapel} Kelas ${params.kelas} ${params.jenjang} - ${topik}`,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    templateType: params.templateType || 'kbc_merdeka',
    
    namaGuru: params.namaGuru || 'Ust. Muhammad Rizki, S.Pd.I.',
    nip: params.nip || '19880515 201403 1 004',
    namaMadrasah: params.namaMadrasah || `${params.jenjang} Negeri Karakter Bangsa`,
    tahunPelajaran: params.tahunPelajaran || '2025/2026',
    semester: params.semester || '1 (Ganjil)',
    jenjang: params.jenjang,
    kelas: params.kelas,
    fase: fase,
    mataPelajaran: mapel,
    alokasiWaktu: timeAlloc,
    jumlahPertemuan: '1 Pertemuan (Tatap Muka)',
    
    topik: topik,
    materi: materi,
    kompetensiAwal: `Peserta didik telah memiliki pengetahuan dasar mengenai konsep ${topik} serta terbiasa berkolaborasi secara santun dalam kelompok.`,
    tujuanPembelajaran: goals,
    pemahamanBermakna: pemahaman,
    pertanyaanPemantik: pemantik,
    saranaPrasarana: 'Ruang kelas berteknologi, LCD proyektor/layar presentasi, Lembar Kerja Peserta Didik (LKPD), Al-Qur\'an dan terjemah, buku teks siswa resmi Kemenag/Kemdikbudristek.',
    modelPembelajaran: modelPembelajaran,
    metodePembelajaran: ['Tanya Jawab Eksploratif', 'Diskusi Kelompok Kolaboratif', 'Praktik/Demonstrasi Terbimbing', 'Refleksi Berbasis Cinta'],
    sumberBelajar: [
      `Buku Guru dan Buku Siswa ${mapel} Kelas ${params.kelas} Kemenag/Kemdikbudristek Edisi Terbaru`,
      'Bahan bacaan digital dan modul ajar interaktif madrasah',
      'Lingkungan sekitar madrasah dan sumber literatur shahih yang relevan'
    ],
    mediaPembelajaran: [
      'Slide Paparan Interaktif (Canva / PPT)',
      'Video Edukasi Kontekstual',
      'Kartu Studi Kasus & Lembar Refleksi Diri'
    ],
    
    kbcValues: chosenKbcIds,
    kbcKarakter: `Menumbuhkan karakter keimanan, ${kbcNames}, dan kepekaan sosial madrasah yang rahmatan lil 'alamin.`,
    kbcImplementasi: `Guru mengintegrasikan ${kbcNames} ke dalam setiap alur interaksi kelas, memberikan keteladanan bertutur kata lembut, saling menyemangati, dan membimbing siswa saling menghargai.`,
    kbcContohPerilaku: chosenKbcObjects.map(k => k.exampleBehavior).join(' '),
    kbcRefleksi: chosenKbcObjects.map(k => k.reflectionQuestion).join(' '),

    deepLearning: {
      mindfulLearning: `Membangun kesadaran penuh (mindfulness) peserta didik terhadap materi ${topik} melalui doa khusyuk, hening sejenak, dan pemusatan perhatian hati nurani.`,
      meaningfulLearning: `Menghubungkan konsep ${topik} dengan studi kasus dan permasalahan nyata yang relevan dengan kehidupan sehari-hari siswa.`,
      joyfulLearning: 'Mengemas aktivitas penemuan dan diskusi kelompok dengan suasana yang interaktif, apresiatif, menyenangkan, serta penuh semangat.',
    },
    
    langkahPembelajaran: activities,
    asesmen: assessments,
    diferensiasi: diff,
    refleksi: {
      guru: [
        'Apakah strategi pembelajaran hari ini berhasil menumbuhkan rasa senang dan cinta peserta didik terhadap ilmu?',
        'Bagaimana respons peserta didik terhadap integrasi nilai karakter Kurikulum Berbasis Cinta dalam kerja kelompok?',
        'Aspek mana yang perlu saya perbaiki untuk mengoptimalkan diferensiasi bagi siswa yang membutuhkan dukungan lebih?'
      ],
      siswa: [
        'Apa pengetahuan baru yang paling menyentuh hati dan membuat saya kagum hari ini?',
        'Nilai cinta atau kebaikan apa yang berhasil saya amalkan bersama kawan sekelas selama belajar tadi?',
        'Apa tantangan belajar yang berhasil saya atasi dengan penuh rasa percaya diri?'
      ],
      kbc: [
        'Menghidupkan kesadaran bahwa mencari ilmu adalah ibadah mulia yang berpahala di sisi Allah SWT.',
        'Membangun iklim kelas madrasah yang hangat, teduh, tanpa saling mencela dan menjunjung empati.'
      ]
    },
    
    tempatTanggal: 'Kota Madrasah, 18 Juli 2025',
    namaKepalaMadrasah: 'Drs. H. Maimun Zubair, M.Ag.',
    nipKepalaMadrasah: '19720610 199803 1 001'
  };
}

export function getDefaultTopicForSubject(subject: string, jenjang: Jenjang, grade: string): string {
  const s = subject.toLowerCase();
  if (s.includes('qur') || s.includes('hadis')) return 'Kandungan Surah Pendek dan Keutamaan Berbakti kepada Orang Tua';
  if (s.includes('akidah')) return 'Mengenal Asmaul Husna: Al-Wahhab, Ar-Razzaq, dan Al-Hadi';
  if (s.includes('fikih')) return 'Ketentuan dan Keutamaan Thaharah (Bersuci) Sebagai Bukti Cinta Kebersihan';
  if (s.includes('ski')) return 'Keteladanan Dakwah Rasulullah SAW di Madinah Berlandaskan Persaudaraan';
  if (s.includes('arab')) return 'At-Ta\'aruf (Perkenalan Diri) dan Kehidupan Madrasah Penuh Kasih Sayang';
  if (s.includes('indo')) return 'Menulis Teks Narasi Inspiratif Bertema Kepedulian Sosial dan Kemanusiaan';
  if (s.includes('matematika')) return 'Operasi Pecahan dan Aljabar Sederhana dalam Pembagian Hak yang Berkeadilan';
  if (s.includes('ipa') || s.includes('ipas')) return 'Ekosistem dan Rantai Makanan: Menjaga Harmoni Ciptaan Allah SWT';
  if (s.includes('ips')) return 'Keberagaman Sosial Budaya Bangsa Indonesia Sebagai Modal Kekuatan Persatuan';
  if (s.includes('pancasila')) return 'Penerapan Nilai-Nilai Gotong Royong dalam Kehidupan Bermasyarakat';
  if (s.includes('informatika')) return 'Berpikir Komputasional dan Etika Bijak Bermedia Digital (Digital Empathy)';
  if (s.includes('inggris')) return 'Describing People and Expressing Gratitude in Daily Interaction';
  if (s.includes('pjok')) return 'Kebugaran Jasmani dan Permainan Beregu yang Menjunjung Sportivitas Serta Cinta Kawan';
  if (s.includes('seni')) return 'Mengekspresikan Keindahan Alam Ciptaan Tuhan Melalui Ragam Hias Nusantara';
  return `Konsep Esensial dan Aplikasi Pembelajaran ${subject} Kelas ${grade}`;
}

export function getDefaultMateriForSubject(subject: string, topic: string): string {
  return `${topic}: Pemahaman konsep dasar, dalil/landasan teoretis, analisis kasus kontekstual, dan implementasi nilai karakter dalam kehidupan sehari-hari peserta didik madrasah.`;
}

export function getDefaultKbcIdsForSubject(subject: string): string[] {
  const s = subject.toLowerCase();
  if (s.includes('qur') || s.includes('akidah') || s.includes('fikih') || s.includes('ski')) {
    return ['kbc-allah', 'kbc-rasul', 'kbc-ilmu', 'kbc-sesama'];
  }
  if (s.includes('ipa') || s.includes('ipas') || s.includes('biologi')) {
    return ['kbc-allah', 'kbc-lingkungan', 'kbc-ilmu', 'kbc-kemanusiaan'];
  }
  if (s.includes('ips') || s.includes('pancasila') || s.includes('sosiologi')) {
    return ['kbc-bangsa', 'kbc-sesama', 'kbc-kebersamaan', 'kbc-perdamaian'];
  }
  if (s.includes('informatika')) {
    return ['kbc-ilmu', 'kbc-kemanusiaan', 'kbc-sesama', 'kbc-perdamaian'];
  }
  if (s.includes('matematika')) {
    return ['kbc-ilmu', 'kbc-diri', 'kbc-kebersamaan', 'kbc-allah'];
  }
  if (s.includes('pjok')) {
    return ['kbc-diri', 'kbc-kebersamaan', 'kbc-sesama', 'kbc-perdamaian'];
  }
  return ['kbc-allah', 'kbc-ilmu', 'kbc-sesama', 'kbc-lingkungan'];
}

function getDefaultModelForSubject(subject: string): string {
  const s = subject.toLowerCase();
  if (s.includes('qur') || s.includes('hadis')) return 'Tadabbur Kontekstual & Talaqqi Terbimbing';
  if (s.includes('fikih')) return 'Demonstrasi Praktik & Problem Based Learning (PBL)';
  if (s.includes('akidah')) return 'Value Clarification Technique (VCT) & Refleksi Kisah';
  if (s.includes('ski')) return 'Historical Storytelling & Inquiry Kolaboratif';
  if (s.includes('arab') || s.includes('inggris')) return 'Communicative Language Teaching & Role Playing';
  if (s.includes('matematika')) return 'Realistic Mathematics Education (RME) & PBL';
  if (s.includes('ipa') || s.includes('ipas') || s.includes('biologi') || s.includes('fisika') || s.includes('kimia')) return 'Discovery Learning & Praktikum Eksperimental';
  if (s.includes('informatika')) return 'Computational Problem Solving & Project Based Learning';
  if (s.includes('seni') || s.includes('prakarya')) return 'Project Based Learning (PjBL) & Eksplorasi Karya';
  if (s.includes('pjok')) return 'Teaching Games for Understanding (TGfU) & Drill Terpimpin';
  return 'Problem Based Learning (PBL) Berdiferensiasi';
}

function generateSubjectGoals(subject: string, topic: string, materi: string, grade: string, fase: Fase, kbc: any[]): string[] {
  const s = subject.toLowerCase();
  const kbcNames = kbc.map(k => k.title).join(' serta ');
  
  if (s.includes('informatika')) {
    return [
      `Mengidentifikasi pola dan komponen logika dari ${topic} dengan menerapkan 4 pilar berpikir komputasional secara terstruktur.`,
      `Merancang diagram alir atau pemodelan solusi digital yang berorientasi pada kemudahan dan kemaslahatan pengguna.`,
      `Mengintegrasikan nilai ${kbcNames} melalui pembiasaan kolaborasi tim yang suportif dan santun dalam etika digital.`
    ];
  }
  if (s.includes('matematika')) {
    return [
      `Menganalisis dan menyelesaikan persoalan kontekstual terkait ${topic} menggunakan penalaran matematis yang logis dan cermat.`,
      `Menyajikan representasi matematis dalam bentuk tabel/grafik/rumus dengan ketelitian tinggi dan kemampuan komunikasi yang runtut.`,
      `Menumbuhkan ketekunan, kejujuran berpikir, dan nilai ${kbcNames} dalam memecahkan tantangan matematika sehari-hari.`
    ];
  }
  if (s.includes('bahasa indonesia') || s.includes('indo')) {
    return [
      `Menganalisis gagasan pokok, struktur kebahasaan, dan pesan moral dalam teks bertema ${topic} secara kritis dan reflektif.`,
      `Menyusun karya tulis naratif/eksposisi orisinal yang menggugah empati pembaca dengan pilihan kosakata santun dan bermakna.`,
      `Menginternalisasikan nilai ${kbcNames} sebagai landasan bertutur kata yang menyejukkan dan menebar kebaikan.`
    ];
  }
  if (s.includes('fikih') || s.includes('akidah') || s.includes('qur') || s.includes('ski')) {
    return [
      `Menelaah dalil naqli dan pemahaman syar'i/konseptual mengenai ${topic} dengan argumentasi yang jelas dan shahih.`,
      `Mendemonstrasikan atau menganalisis keteladanan dan tata cara penerapan ${topic} secara tepat dan tertib.`,
      `Menjadikan nilai ${kbcNames} sebagai penggerak hati untuk senantiasa taat beribadah dan memperlakukan sesama dengan penuh kasih sayang.`
    ];
  }
  if (s.includes('ipa') || s.includes('ipas')) {
    return [
      `Menyelidiki fenomena dan prinsip alamiah terkait ${topic} melalui pengamatan sistematis dan keterampilan proses sains.`,
      `Mengomunikasikan hasil penyelidikan hubungan sebab-akibat fenomena alam dengan data yang akurat dan jelas.`,
      `Menumbuhkan rasa takjub kepada Sang Pencipta semesta dan menjiwai nilai ${kbcNames} dalam melestarikan lingkungan bumi.`
    ];
  }

  return [
    `Peserta didik mampu memahami hakikat dan konsep utama ${topic} secara mendalam dan kontekstual pada jenjang ${fase}.`,
    `Peserta didik mampu berkolaborasi dalam kelompok untuk merumuskan pemecahan masalah nyata berkaitan dengan ${topic}.`,
    `Peserta didik menghayati dan mengimplementasikan nilai ${kbcNames} dalam proses pembelajaran dan kehidupan sosial madrasah.`
  ];
}

function generateSubjectPemahaman(subject: string, topic: string): string {
  const s = subject.toLowerCase();
  if (s.includes('matematika')) {
    return `Kecakapan matematika mengajarkan ketertiban berpikir, objektivitas, keadilan dalam menghitung, dan rasa syukur atas keteraturan hukum alam ciptaan Allah SWT.`;
  }
  if (s.includes('informatika')) {
    return `Teknologi komputer dan komputasi diciptakan untuk mempermudah urusan kemanusiaan, sehingga penggunaannya wajib dilandasi etika, empati, dan cinta perdamaian.`;
  }
  if (s.includes('qur') || s.includes('akidah') || s.includes('fikih')) {
    return `Agama Islam adalah risalah kasih sayang (rahmatan lil 'alamin); setiap syariat dan ajaran yang kita pelajari hakikatnya membimbing manusia hidup damai, bersih, dan berakhlak mulia.`;
  }
  if (s.includes('ipa') || s.includes('ipas')) {
    return `Segala ciptaan di alam semesta saling terhubung secara harmonis; manusia diamanahi sebagai khalifah yang wajib merawat ekosistem dengan penuh cinta dan tanggung jawab.`;
  }
  return `Memahami ${topic} membuka wawasan bahwa ilmu pengetahuan adalah sarana meningkatkan kualitas diri, memperluas kemanfaatan hidup, dan mempererat tali kasih sayang sesama.`;
}

function generateSubjectPemantik(subject: string, topic: string): string[] {
  const s = subject.toLowerCase();
  if (s.includes('informatika')) {
    return [
      `Bagaimana cara kita memanfaatkan logika berpikir komputasional untuk membantu orang-orang di sekitar kita yang membutuhkan?`,
      `Apa yang membedakan manusia dengan mesin cerdas (AI) jika dilihat dari sudut pandang hati nurani dan rasa cinta?`
    ];
  }
  if (s.includes('matematika')) {
    return [
      `Pernahkah kalian berpikir mengapa perhitungan matematika selalu menuntut keadilan, ketelitian, dan kejujuran tanpa memihak?`,
      `Bagaimana konsep matematika dapat membantu kita berbagi rezeki dan membagi tugas secara adil dalam kelompok?`
    ];
  }
  if (s.includes('fikih') || s.includes('qur') || s.includes('akidah')) {
    return [
      `Mengapa setiap ibadah yang kita kerjakan harus berlandaskan rasa cinta dan ketulusan, bukan sekadar menggugurkan kewajiban?`,
      `Bagaimana ajaran materi ini dapat membuat hubungan kita dengan teman madrasah menjadi jauh lebih rukun dan tenteram?`
    ];
  }
  return [
    `Apa manfaat terbesar yang dapat kita rasakan jika kita menguasai topik ${topic} dengan sungguh-sungguh?`,
    `Sikap kasih sayang dan kepedulian seperti apa yang bisa kita tunjukkan saat menyelesaikan tantangan belajar materi ini?`
  ];
}

function generateSubjectSpecificActivities(subject: string, topic: string, materi: string, grade: string, jenjang: Jenjang, kbc: any[]) {
  const s = subject.toLowerCase();
  const kbcName = kbc.length > 0 ? kbc[0].title : 'Cinta kepada Ilmu';
  const kbcNamesCombined = kbc.map(k => k.title).join(', ');

  const pendahuluan = [
    'Guru membuka sesi pembelajaran dengan salam hangat bernuansa cinta, tersenyum tulus menyapa kehadiran setiap peserta didik, dan menanyakan kabar perasaan mereka.',
    'Berdoa bersama dengan khusyuk dipimpin salah satu peserta didik sebagai perwujudan Cinta kepada Allah SWT dan Rasulullah SAW.',
    'Pemeriksaan kesiapan ruang kelas, kerapian seragam, dan kebersihan lingkungan sekitar tempat duduk siswa sebagai wujud kepedulian pada keindahan dan lingkungan.',
    'Apersepsi bermakna: Guru menghubungkan pengalaman nyata peserta didik dengan materi ' + topic + ' serta memantik rasa ingin tahu yang menyenangkan.',
    'Guru menyampaikan tujuan pembelajaran, nilai Kurikulum Berbasis Cinta (' + kbcNamesCombined + ') yang akan ditumbuhkan, serta alur kegiatan belajar aktif hari ini.'
  ];

  let intiKegiatan: string[] = [];
  let sintaks = 'Sintaks Pembelajaran Aktif Berdiferensiasi & Integrasi KBC';

  if (s.includes('informatika')) {
    sintaks = 'Fase Eksplorasi Masalah Komputasi, Dekomposisi Kasus, Kolaborasi Logika, dan Refleksi Etika Digital';
    intiKegiatan = [
      'Orientasi Masalah: Guru menyajikan studi kasus kontekstual seputar ' + topic + ' yang membutuhkan pemecahan logis terstruktur.',
      'Dekomposisi & Eksplorasi: Peserta didik berkelompok membedah kasus menjadi bagian-bagian esensial dan mengidentifikasi pola data yang relevan.',
      'Kolaborasi Tanpa Ego: Kelompok merumuskan diagram alir (algoritma) solusi, di mana siswa saling mengajari dan memastikan tiap anggota tim memahami alur berpikirnya.',
      'Praktik Nyata / Uji Coba: Peserta didik menguji rancangan logika komputasional secara langsung dan mencatat hasil optimasi program/alur kerja.',
      'Presentasi Apresiatif: Perwakilan kelompok mempresentasikan karyanya; kelompok lain memberikan umpan balik konstruktif dengan tutur kata santun penuh kasih sayang.'
    ];
  } else if (s.includes('matematika')) {
    sintaks = 'Fase Penalaran Realistik (RME), Pemecahan Masalah, Kolaborasi Sejawat, dan Konstruksi Konsep Matematis';
    intiKegiatan = [
      'Stimulasi Nyata: Guru membagikan lembar tantangan kontekstual (misal: pembagian zakat, infak, atau perhitungan adil di kantin madrasah) terkait ' + topic + '.',
      'Eksplorasi Konsep: Peserta didik menggunakan alat peraga manipulatif atau sketsa visual untuk menemukan formula dan hubungan kuantitatif.',
      'Tutor Sebaya Penuh Empati: Siswa yang lebih cepat memahami materi mendampingi kawan sekelompok yang masih ragu, tanpa rasa tinggi hati (Cinta kepada Sesama).',
      'Verifikasi Bersama: Kelompok menuliskan langkah penyelesaian di papan kanvas kerja dan membuktikan keakuratan jawaban dengan logika jernih.',
      'Konstruksi Makna: Guru dan peserta didik menyimpulkan bahwa ketelitian dalam rumus matematika sejalan dengan prinsip keadilan dan kejujuran hati.'
    ];
  } else if (s.includes('fikih') || s.includes('qur') || s.includes('akidah') || s.includes('ski')) {
    sintaks = 'Fase Tadabbur Dalil, Kajian Konseptual Syar\'i, Simulasi Keteladanan, dan Internalisasi Nilai Akhlak';
    intiKegiatan = [
      'Tadabbur Ayat & Hadis: Guru memfasilitasi pembacaan dalil naqli tentang ' + topic + ' dengan irama tartil yang menentramkan jiwa peserta didik.',
      'Eksplorasi Makna: Peserta didik dalam kelompok menelaah hikmah di balik syariat/kisah teladan dan mendiskusikan implementasinya di zaman modern.',
      'Simulasi & Praktik Khusyuk: Kelompok mempraktikkan tata cara/adab yang dipelajari, saling memperhatikan dan membetulkan kekeliruan dengan bisikan lembut dan penuh rasa hormat.',
      'Kontekstualisasi Madrasah: Siswa mengidentifikasi contoh perilaku nyata di lingkungan madrasah yang mencerminkan nilai ' + kbcNamesCombined + '.',
      'Gelar Karya & Penguatan: Guru memberikan apresiasi terhadap ketertiban dan kemurnian penghayatan ibadah yang ditunjukkan seluruh siswa.'
    ];
  } else if (s.includes('ipa') || s.includes('ipas')) {
    sintaks = 'Fase Observasi Saintifik, Investigasi Eksperimen, Analisis Data Empiris, dan Refleksi Keagungan Ilahi';
    intiKegiatan = [
      'Pemberian Rangsangan: Guru menayangkan video fenomena alam mengagumkan terkait ' + topic + ' yang membangkitkan rasa takjub peserta didik.',
      'Penyusunan Hipotesis: Siswa merumuskan pertanyaan penyelidikan dan membagi peran kerja eksperimen secara adil dan bertanggung jawab.',
      'Eksperimen / Pengamatan Terpadu: Siswa melakukan percobaan ilmiah dengan cermat, mencatat data faktual, dan menjaga kebersihan alat laboratorium.',
      'Analisis Data Kolaboratif: Tiap kelompok menghubungkan bukti pengamatan dengan konsep sains yang dipelajari dan menyusun kesimpulan logis.',
      'Refleksi Teologis & Ekologis: Guru membimbing siswa menyadari bahwa keteraturan hukum sains adalah bukti kasih sayang Allah SWT yang menjaga kelangsungan hidup makhluk-Nya.'
    ];
  } else {
    sintaks = 'Fase Orientasi, Eksplorasi, Kolaborasi Kreatif, Elaborasi Karya, dan Apresiasi Sejawat';
    intiKegiatan = [
      'Orientasi Materi: Guru menghadirkan pengantar interaktif tentang materi ' + topic + ' yang memikat daya imajinasi dan nalar kritis siswa.',
      'Eksplorasi Aktif: Peserta didik mengkaji sumber belajar multimodal (buku teks, infografis, modul interaktif) secara mandiri dan berkelompok.',
      'Diskusi Dialogis: Siswa mendiskusikan temuan materi, saling mengemukakan argumen dengan tetap menjunjung tinggi rasa hormat dan tasamuh (toleransi).',
      'Penciptaan Produk Pembelajaran: Kelompok menyusun ringkasan, peta konsep, atau karya sederhana yang menunjukkan ketercapaian pemahaman mereka.',
      'Apresiasi & Refleksi Kelas: Guru dan peserta didik memberikan tepuk tangan apresiasi kepada setiap kelompok atas kerja keras dan kerja samanya.'
    ];
  }

  const penutup = [
    'Guru memfasilitasi peserta didik menarik kesimpulan komprehensif mengenai materi ' + topic + ' yang baru saja dituntaskan.',
    'Refleksi Berbasis Cinta: Peserta didik menuliskan kesan mendalam tentang bagaimana pembelajaran hari ini menguatkan rasa ' + kbcName + ' dalam diri mereka.',
    'Pemberian tindak lanjut: Guru memberikan arahan penugasan mandiri yang menyenangkan dan menantang untuk mengasah daya cipta siswa.',
    'Apresiasi tulus dari guru kepada seluruh peserta didik atas antusiasme, kesungguhan, dan adab mulia yang ditunjukkan selama jam pelajaran.',
    'Menutup proses pembelajaran dengan doa bersama (kafaratul majlis) dan saling menebarkan senyum salam kedamaian.'
  ];

  return {
    pendahuluan: {
      durasi: '10 Menit',
      kegiatan: pendahuluan,
    },
    inti: {
      durasi: jenjang === 'MI' ? '50 Menit' : jenjang === 'MTs' ? '60 Menit' : '70 Menit',
      sintaks: sintaks,
      kegiatan: intiKegiatan,
    },
    penutup: {
      durasi: '10 Menit',
      kegiatan: penutup,
    }
  };
}

function generateSubjectSpecificAssessments(subject: string, topic: string) {
  return {
    diagnostik: {
      teknik: 'Tes Lisan & Kuis Awal Terbuka',
      bentuk: 'Pertanyaan Eksploratif Pemantik Nalar',
      instrumen: `Panduan wawancara singkat & ceklis kesiapan belajar mengenai konsep ${topic}.`,
      indikator: 'Mengetahui pemahaman prasyarat dan minat belajar peserta didik.',
      kriteria: 'Dapat menyampaikan minimal 2 konsep awal terkait materi pembelajaran.'
    },
    formatif: {
      teknik: 'Observasi Kinerja & Penilaian Diskusi LKPD',
      bentuk: 'Rubrik Pengamatan Proses Berkelanjutan',
      instrumen: 'Lembar observasi keaktifan diskusi, lembar kerja kolaboratif, dan penilaian antarteman bernuansa kasih sayang.',
      indikator: `Keterampilan menguraikan dan menerapkan konsep ${topic} serta adab berkomunikasi dalam tim.`,
      kriteria: 'Memenuhi minimal 75% kriteria rubrik partisipasi dan pemahaman tugas.'
    },
    sumatif: {
      teknik: 'Tes Tertulis Berbasis Kasus (HOTS) & Unjuk Portofolio',
      bentuk: 'Uraian Analitis dan Proyek Pemecahan Masalah',
      instrumen: 'Naskah soal evaluasi akhir materi 5 butir esai analisis kontekstual.',
      indikator: `Ketuntasan komprehensif dalam menganalisis, menyelesaikan, dan menyimpulkan masalah terkait ${topic}.`,
      kriteria: 'Mencapai batas Kriteria Ketercapaian Tujuan Pembelajaran (KKTP) minimal 75.'
    },
    sikap: {
      teknik: 'Observasi Karakter Berbasis Kurikulum Berbasis Cinta (KBC)',
      rubrik: [
        'Keikhlasan dan kesungguhan dalam menuntut ilmu (Cinta kepada Ilmu & Allah SWT)',
        'Kesantunan bertutur kata dan kepedulian terhadap kesulitan rekan sekelas (Cinta Sesama)',
        'Kedisiplinan menjaga kebersihan fasilitas madrasah dan peralatan belajar (Cinta Lingkungan)',
        'Menghargai keragaman pendapat dalam musyawarah kelompok (Cinta Kebersamaan & Perdamaian)'
      ]
    },
    pengetahuan: {
      teknik: 'Tes Tertulis & Penugasan Konseptual',
      instrumen: `Kisi-kisi soal evaluasi pemahaman ${topic} mencakup level kognitif C2 hingga C4.`
    },
    keterampilan: {
      teknik: 'Penilaian Kinerja Unjuk Kerja / Produk Karya',
      instrumen: 'Rubrik penilaian sistematika penyajian hasil diskusi, kerapian produk, dan artikulasi presentasi.'
    }
  };
}

function generateSubjectSpecificDifferentiation(subject: string, topic: string) {
  return {
    konten: `Menyediakan materi pembelajaran dalam 3 moda: bacaan teks bergambar/infografis terstruktur, video tutorial interaktif dengan narasi audio, serta studi kasus nyata untuk peserta didik yang menyukai tantangan analitis tinggi.`,
    proses: `Memberikan pendampingan berjenjang (scaffolding): peserta didik yang butuh bimbingan didampingi secara intensif oleh guru atau tutor sebaya yang sabar, sedangkan kelompok yang mandiri diberikan tantangan eksplorasi kasus mandiri.`,
    produk: `Peserta didik bebas memilih format laporan akhir ketercapaian belajar: mind-mapping visual kreatif, rekaman presentasi suara/video singkat, atau laporan tertulis reflektif yang rapi.`,
    remedial: `Bimbingan terfokus pada indikator yang belum tuntas melalui latihan sederhana dengan analogi yang lebih dekat ke keseharian siswa, dilandasi pendekatan personal penuh kehangatan.`,
    pengayaan: `Diberikan bahan pengayaan berbasis literasi analitis lanjutan untuk memperdalam kaitan antara konsep materi dengan isu global atau kemaslahatan umat.`
  };
}
