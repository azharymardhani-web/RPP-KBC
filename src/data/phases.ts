import { Fase, Jenjang } from '../types/rpp';

export interface PhaseInfo {
  fase: Fase;
  description: string;
  jenjang: Jenjang[];
  grades: string[];
}

export const PHASES: PhaseInfo[] = [
  {
    fase: 'Fase A',
    description: 'Umumnya untuk Kelas I dan II Madrasah Ibtidaiyah (MI)',
    jenjang: ['MI'],
    grades: ['I', 'II'],
  },
  {
    fase: 'Fase B',
    description: 'Umumnya untuk Kelas III dan IV Madrasah Ibtidaiyah (MI)',
    jenjang: ['MI'],
    grades: ['III', 'IV'],
  },
  {
    fase: 'Fase C',
    description: 'Umumnya untuk Kelas V dan VI Madrasah Ibtidaiyah (MI)',
    jenjang: ['MI'],
    grades: ['V', 'VI'],
  },
  {
    fase: 'Fase D',
    description: 'Umumnya untuk Kelas VII, VIII, dan IX Madrasah Tsanawiyah (MTs)',
    jenjang: ['MTs'],
    grades: ['VII', 'VIII', 'IX'],
  },
  {
    fase: 'Fase E',
    description: 'Umumnya untuk Kelas X Madrasah Aliyah (MA)',
    jenjang: ['MA'],
    grades: ['X'],
  },
  {
    fase: 'Fase F',
    description: 'Umumnya untuk Kelas XI dan XII Madrasah Aliyah (MA)',
    jenjang: ['MA'],
    grades: ['XI', 'XII'],
  },
];

export function getFaseByGrade(jenjang: Jenjang, grade: string): Fase {
  if (jenjang === 'MI') {
    if (grade === 'I' || grade === 'II') return 'Fase A';
    if (grade === 'III' || grade === 'IV') return 'Fase B';
    return 'Fase C';
  }
  if (jenjang === 'MTs') {
    return 'Fase D';
  }
  if (jenjang === 'MA') {
    if (grade === 'X') return 'Fase E';
    return 'Fase F';
  }
  return 'Fase A';
}
