import { Jenjang } from '../types/rpp';

export const GRADES_BY_JENJANG: Record<Jenjang, string[]> = {
  MI: ['I', 'II', 'III', 'IV', 'V', 'VI'],
  MTs: ['VII', 'VIII', 'IX'],
  MA: ['X', 'XI', 'XII'],
};

export const JENJANG_INFO = [
  {
    id: 'MI' as Jenjang,
    name: 'Madrasah Ibtidaiyah (MI)',
    sub: 'Setara SD (Kelas 1 - 6)',
    badge: 'Fase A, B, C',
    iconColor: 'from-emerald-500 to-teal-600',
  },
  {
    id: 'MTs' as Jenjang,
    name: 'Madrasah Tsanawiyah (MTs)',
    sub: 'Setara SMP (Kelas 7 - 9)',
    badge: 'Fase D',
    iconColor: 'from-blue-500 to-indigo-600',
  },
  {
    id: 'MA' as Jenjang,
    name: 'Madrasah Aliyah (MA)',
    sub: 'Setara SMA (Kelas 10 - 12)',
    badge: 'Fase E, F',
    iconColor: 'from-sky-500 to-blue-700',
  },
];
