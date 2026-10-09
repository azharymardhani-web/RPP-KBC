import { TemplateDefinition } from '../types/rpp';

export const RPP_TEMPLATES: TemplateDefinition[] = [
  {
    id: 'kbc_merdeka',
    name: 'RPP Kurikulum Merdeka + Kurikulum Berbasis Cinta (KBC)',
    description: 'Format komprehensif mengintegrasikan nilai-nilai cinta, karakter madrasah, Profil Pelajar Rahmatan Lil Alamin (PPRA), dan Kurikulum Merdeka.',
    badge: 'Rekomendasi Utama',
    isDefault: true,
  },
  {
    id: 'standar_merdeka',
    name: 'RPP Standar Kurikulum Merdeka',
    description: 'Format baku sesuai Kepmendikbudristek & KMA 347/450 dengan fokus CP, TP, Asesmen Autentik, dan Diferensiasi.',
    badge: 'Standar Kemenag & Kemdikbud',
  },
  {
    id: 'supervisi_lengkap',
    name: 'RPP Supervisi Lengkap & Akreditasi',
    description: 'Format sangat mendalam dengan rubrik asesmen lengkap, instrumen penilaian sikap, pengetahuan, keterampilan, remedial dan pengayaan siap telaah pengawas.',
    badge: 'Siap Audit & Supervisi',
  },
  {
    id: 'ringkas',
    name: 'RPP Ringkas Praktis (Efektif & Efisien)',
    description: 'Format ringkas 2-3 halaman berfokus pada 3 komponen esensial: Tujuan, Langkah-langkah Aktif, dan Asesmen Berdampak.',
    badge: 'Ringkas & Cepat',
  },
];
