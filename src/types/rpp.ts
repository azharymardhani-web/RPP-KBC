export type Jenjang = 'MI' | 'MTs' | 'MA';

export type Fase = 'Fase A' | 'Fase B' | 'Fase C' | 'Fase D' | 'Fase E' | 'Fase F';

export interface SubjectItem {
  id: string;
  name: string;
  jenjang: Jenjang[];
  category: 'PAI' | 'Umum' | 'Muatan Lokal';
  defaultElements?: string[];
  defaultModels?: string[];
}

export interface KBCValue {
  id: string;
  title: string;
  description: string;
  iconName?: string;
  exampleBehavior: string;
  reflectionQuestion: string;
}

export interface StepLearning {
  pendahuluan: {
    durasi: string;
    kegiatan: string[];
  };
  inti: {
    durasi: string;
    sintaks: string; // e.g. Orientasi, Eksplorasi, Kolaborasi, dll.
    kegiatan: string[];
  };
  penutup: {
    durasi: string;
    kegiatan: string[];
  };
}

export interface AssessmentItem {
  teknik: string;
  bentuk: string;
  instrumen: string;
  indikator: string;
  kriteria: string;
}

export interface AssessmentSectionData {
  diagnostik: AssessmentItem;
  formatif: AssessmentItem;
  sumatif: AssessmentItem;
  sikap: {
    teknik: string;
    rubrik: string[];
  };
  pengetahuan: {
    teknik: string;
    instrumen: string;
  };
  keterampilan: {
    teknik: string;
    instrumen: string;
  };
}

export interface DifferentiationData {
  konten: string;
  proses: string;
  produk: string;
  remedial: string;
  pengayaan: string;
}

export interface DeepLearningData {
  mindfulLearning: string; // Pembelajaran Berkesadaran (Mindful)
  meaningfulLearning: string; // Pembelajaran Bermakna (Meaningful)
  joyfulLearning: string; // Pembelajaran Menyenangkan (Joyful)
}

export interface ReflectionData {
  guru: string[];
  siswa: string[];
  kbc: string[];
}

export interface RPPData {
  id: string;
  title: string;
  createdAt: string;
  updatedAt: string;
  templateType: 'kbc_merdeka' | 'standar_merdeka' | 'ringkas' | 'supervisi_lengkap';
  
  // Identitas
  namaGuru: string;
  nip: string;
  namaMadrasah: string;
  tahunPelajaran: string;
  semester: '1 (Ganjil)' | '2 (Genap)';
  jenjang: Jenjang;
  kelas: string;
  fase: Fase;
  mataPelajaran: string;
  alokasiWaktu: string;
  jumlahPertemuan: string;
  
  // Komponen
  topik: string;
  materi: string;
  kompetensiAwal: string;
  tujuanPembelajaran: string[];
  pemahamanBermakna: string;
  pertanyaanPemantik: string[];
  saranaPrasarana: string;
  modelPembelajaran: string;
  metodePembelajaran: string[];
  sumberBelajar: string[];
  mediaPembelajaran: string[];
  
  // KBC
  kbcValues: string[]; // List of selected KBC IDs
  kbcKarakter: string;
  kbcImplementasi: string;
  kbcContohPerilaku: string;
  kbcRefleksi: string;

  // Deep Learning Framework
  deepLearning: DeepLearningData;
  
  // Langkah
  langkahPembelajaran: StepLearning;
  
  // Asesmen
  asesmen: AssessmentSectionData;
  
  // Diferensiasi
  diferensiasi: DifferentiationData;
  
  // Refleksi
  refleksi: ReflectionData;
  
  // Penandatanganan
  tempatTanggal: string;
  namaKepalaMadrasah: string;
  nipKepalaMadrasah: string;
}

export interface TemplateDefinition {
  id: string;
  name: string;
  description: string;
  badge: string;
  isDefault?: boolean;
}
