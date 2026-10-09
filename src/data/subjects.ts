import { SubjectItem, Jenjang } from '../types/rpp';

export const INITIAL_SUBJECTS: SubjectItem[] = [
  // PAI Madrasah (Khas Kemenag / Madrasah)
  {
    id: 'qurdis',
    name: "Al-Qur'an Hadis",
    jenjang: ['MI', 'MTs', 'MA'],
    category: 'PAI',
    defaultElements: ['Al-Qur\'an', 'Hadis'],
    defaultModels: ['Tadabbur & Talaqqi', 'Problem Based Learning', 'Inquiry Learning']
  },
  {
    id: 'akidah',
    name: 'Akidah Akhlak',
    jenjang: ['MI', 'MTs', 'MA'],
    category: 'PAI',
    defaultElements: ['Akidah', 'Akhlak Terpuji', 'Kisah Teladan'],
    defaultModels: ['Value Clarification Technique (VCT)', 'Problem Based Learning', 'Keteladanan']
  },
  {
    id: 'fikih',
    name: 'Fikih',
    jenjang: ['MI', 'MTs', 'MA'],
    category: 'PAI',
    defaultElements: ['Fikih Ibadah', 'Fikih Muamalah', 'Ushul Fikih'],
    defaultModels: ['Demonstrasi Praktik', 'Project Based Learning', 'Simulasi']
  },
  {
    id: 'ski',
    name: 'Sejarah Kebudayaan Islam (SKI)',
    jenjang: ['MI', 'MTs', 'MA'],
    category: 'PAI',
    defaultElements: ['Periode Nabi Muhammad SAW', 'Khulafaur Rasyidin', 'Peradaban Islam'],
    defaultModels: ['Historical Inquiry', 'Storytelling Interaktif', 'Project Based Learning']
  },
  {
    id: 'barab',
    name: 'Bahasa Arab',
    jenjang: ['MI', 'MTs', 'MA'],
    category: 'PAI',
    defaultElements: ['Istima\' (Mendengar)', 'Kalam (Berbicara)', 'Qira\'ah (Membaca)', 'Kitabah (Menulis)'],
    defaultModels: ['Communicative Language Teaching', 'Role Playing', 'Total Physical Response']
  },

  // Mapel Umum
  {
    id: 'bindo',
    name: 'Bahasa Indonesia',
    jenjang: ['MI', 'MTs', 'MA'],
    category: 'Umum',
    defaultElements: ['Menyimak', 'Membaca dan Memirsa', 'Berbicara dan Mempresentasikan', 'Menulis'],
    defaultModels: ['Genre-Based Approach', 'Problem Based Learning', 'Project Based Learning']
  },
  {
    id: 'matematika',
    name: 'Matematika',
    jenjang: ['MI', 'MTs', 'MA'],
    category: 'Umum',
    defaultElements: ['Bilangan', 'Aljabar', 'Pengukuran', 'Geometri', 'Analisis Data dan Peluang'],
    defaultModels: ['Problem Based Learning', 'Realistic Mathematics Education (RME)', 'Inquiry']
  },
  {
    id: 'ipas',
    name: 'IPAS (Ilmu Pengetahuan Alam dan Sosial)',
    jenjang: ['MI'],
    category: 'Umum',
    defaultElements: ['Pemahaman IPAS (Sains & Sosial)', 'Keterampilan Proses'],
    defaultModels: ['Inquiry Learning', 'Eksperimen Lapangan', 'Project Based Learning']
  },
  {
    id: 'ipa',
    name: 'Ilmu Pengetahuan Alam (IPA)',
    jenjang: ['MTs'],
    category: 'Umum',
    defaultElements: ['Pemahaman IPA', 'Keterampilan Proses'],
    defaultModels: ['Discovery Learning', 'Inquiry Terbimbing', 'Saintifik Praktikum']
  },
  {
    id: 'ips',
    name: 'Ilmu Pengetahuan Sosial (IPS)',
    jenjang: ['MTs'],
    category: 'Umum',
    defaultElements: ['Pemahaman Konsep Sosial', 'Keterampilan Proses'],
    defaultModels: ['Problem Based Learning', 'Investigasi Kelompok', 'Studi Kasus']
  },
  {
    id: 'pancasila',
    name: 'Pendidikan Pancasila',
    jenjang: ['MI', 'MTs', 'MA'],
    category: 'Umum',
    defaultElements: ['Pancasila', 'UUD NRI 1945', 'Bhinneka Tunggal Ika', 'NKRI'],
    defaultModels: ['Problem Based Learning', 'Klarifikasi Nilai', 'Refleksi Kontekstual']
  },
  {
    id: 'pjok',
    name: 'PJOK',
    jenjang: ['MI', 'MTs', 'MA'],
    category: 'Umum',
    defaultElements: ['Keterampilan Gerak', 'Pengetahuan Gerak', 'Pemanfaatan Gerak', 'Pengembangan Karakter'],
    defaultModels: ['Demonstrasi & Drill Terpimpin', 'Teaching Games for Understanding (TGfU)']
  },
  {
    id: 'seni',
    name: 'Seni Budaya / Seni Rupa / Musik',
    jenjang: ['MI', 'MTs', 'MA'],
    category: 'Umum',
    defaultElements: ['Mengalami', 'Menciptakan', 'Merefleksikan', 'Berdampak'],
    defaultModels: ['Project Based Learning', 'Eksplorasi Kreatif', 'Apresiasi Karya']
  },
  {
    id: 'informatika',
    name: 'Informatika',
    jenjang: ['MI', 'MTs', 'MA'],
    category: 'Umum',
    defaultElements: ['Berpikir Komputasional (BK)', 'Teknologi Informasi dan Komunikasi (TIK)', 'Sistem Komputer (SK)', 'Analisis Data (AD)', 'Algoritma Pemrograman (AP)', 'Dampak Sosial Informatika (DSI)'],
    defaultModels: ['Computational Problem Solving', 'Project Based Learning', 'Unplugged & Plugged Activity']
  },
  {
    id: 'binggris',
    name: 'Bahasa Inggris',
    jenjang: ['MTs', 'MA'],
    category: 'Umum',
    defaultElements: ['Menyimak-Berbicara', 'Membaca-Memirsa', 'Menulis-Mempresentasikan'],
    defaultModels: ['Communicative Language Teaching', 'Task-Based Learning', 'Interactive Dialogue']
  },
  {
    id: 'prakarya',
    name: 'Prakarya & Kewirausahaan',
    jenjang: ['MTs', 'MA'],
    category: 'Umum',
    defaultElements: ['Observasi & Eksplorasi', 'Desain/Perencanaan', 'Produksi', 'Refleksi & Evaluasi'],
    defaultModels: ['Project Based Learning', 'Design Thinking', 'Kewirausahaan Berbasis Proyek']
  },
  {
    id: 'biologi',
    name: 'Biologi',
    jenjang: ['MA'],
    category: 'Umum',
    defaultElements: ['Pemahaman Biologi', 'Keterampilan Proses'],
    defaultModels: ['Inquiry Terbimbing', 'Praktikum Laboratorium', 'PBL']
  },
  {
    id: 'fisika',
    name: 'Fisika',
    jenjang: ['MA'],
    category: 'Umum',
    defaultElements: ['Pemahaman Fisika', 'Keterampilan Proses'],
    defaultModels: ['Eksperimen Fisika', 'Problem Solving', 'Inquiry']
  },
  {
    id: 'kimia',
    name: 'Kimia',
    jenjang: ['MA'],
    category: 'Umum',
    defaultElements: ['Pemahaman Kimia', 'Keterampilan Proses'],
    defaultModels: ['Praktikum Laboratorium', 'Discovery Learning', 'PBL']
  },
  {
    id: 'ekonomi',
    name: 'Ekonomi',
    jenjang: ['MA'],
    category: 'Umum',
    defaultElements: ['Pemahaman Konsep Ekonomi', 'Keterampilan Proses'],
    defaultModels: ['Studi Kasus Pasar & Syariah', 'PBL', 'Simulasi Finansial']
  },
  {
    id: 'sosiologi',
    name: 'Sosiologi',
    jenjang: ['MA'],
    category: 'Umum',
    defaultElements: ['Pemahaman Konsep Sosiologi', 'Keterampilan Proses Penelitian Sosial'],
    defaultModels: ['Riset Sosial Sederhana', 'Diskusi Reflektif', 'PBL']
  },
  {
    id: 'geografi',
    name: 'Geografi',
    jenjang: ['MA'],
    category: 'Umum',
    defaultElements: ['Kewilayahan & Keruangan', 'Keterampilan Proses Geografi'],
    defaultModels: ['Analisis Peta & Spasial', 'Observasi Lapangan', 'PjBL']
  },
];

const LOCAL_STORAGE_SUBJECTS_KEY = 'generator_rpp_custom_subjects_v1';

export function getAllSubjects(): SubjectItem[] {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_SUBJECTS_KEY);
    if (!raw) return INITIAL_SUBJECTS;
    const custom = JSON.parse(raw);
    return Array.isArray(custom) ? custom : INITIAL_SUBJECTS;
  } catch {
    return INITIAL_SUBJECTS;
  }
}

export function saveSubjects(subjects: SubjectItem[]): void {
  try {
    localStorage.setItem(LOCAL_STORAGE_SUBJECTS_KEY, JSON.stringify(subjects));
  } catch (e) {
    console.error('Failed to save subjects', e);
  }
}

export function addCustomSubject(subject: SubjectItem): SubjectItem[] {
  const current = getAllSubjects();
  const updated = [...current, subject];
  saveSubjects(updated);
  return updated;
}
