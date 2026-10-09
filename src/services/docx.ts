import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  Table,
  TableRow,
  TableCell,
  WidthType,
  BorderStyle,
  AlignmentType,
  convertInchesToTwip,
  PageBreak,
} from 'docx';
import { RPPData } from '../types/rpp';
import { KBC_VALUES } from '../data/kbc';

const FONT_NAME = 'Times New Roman';

function createHeaderCell(text: string, widthPercent: number = 30): TableCell {
  return new TableCell({
    width: { size: widthPercent, type: WidthType.PERCENTAGE },
    children: [
      new Paragraph({
        children: [
          new TextRun({
            text,
            font: FONT_NAME,
            bold: true,
            size: 22, // 11 pt
          }),
        ],
      }),
    ],
  });
}

function createValueCell(text: string, widthPercent: number = 70): TableCell {
  return new TableCell({
    width: { size: widthPercent, type: WidthType.PERCENTAGE },
    children: [
      new Paragraph({
        children: [
          new TextRun({
            text,
            font: FONT_NAME,
            size: 22,
          }),
        ],
      }),
    ],
  });
}

function createSectionHeading(letter: string, title: string): Paragraph {
  return new Paragraph({
    spacing: { before: 240, after: 120 },
    children: [
      new TextRun({
        text: `${letter}. ${title.toUpperCase()}`,
        bold: true,
        font: FONT_NAME,
        size: 24, // 12 pt
      }),
    ],
  });
}

function createBulletItem(text: string): Paragraph {
  return new Paragraph({
    bullet: { level: 0 },
    spacing: { after: 80 },
    children: [
      new TextRun({
        text,
        font: FONT_NAME,
        size: 24,
      }),
    ],
  });
}

function createNumberedItem(num: string | number, title: string, content: string): Paragraph {
  return new Paragraph({
    spacing: { after: 100 },
    children: [
      new TextRun({
        text: `${num}. ${title}: `,
        bold: true,
        font: FONT_NAME,
        size: 24,
      }),
      new TextRun({
        text: content,
        font: FONT_NAME,
        size: 24,
      }),
    ],
  });
}

export async function exportRPPToDocx(rpp: RPPData): Promise<Blob> {
  const selectedKbcObjects = KBC_VALUES.filter(k => (rpp.kbcValues || []).includes(k.id));
  const kbcNames = selectedKbcObjects.map(k => k.title).join(', ');

  // Identity Table
  const identityRows = [
    new TableRow({
      children: [
        createHeaderCell('Nama Madrasah', 30),
        createValueCell(`: ${rpp.namaMadrasah}`, 70),
      ],
    }),
    new TableRow({
      children: [
        createHeaderCell('Nama Guru', 30),
        createValueCell(`: ${rpp.namaGuru} (NIP. ${rpp.nip || '-'})`, 70),
      ],
    }),
    new TableRow({
      children: [
        createHeaderCell('Mata Pelajaran', 30),
        createValueCell(`: ${rpp.mataPelajaran}`, 70),
      ],
    }),
    new TableRow({
      children: [
        createHeaderCell('Jenjang / Kelas / Fase', 30),
        createValueCell(`: ${rpp.jenjang} / Kelas ${rpp.kelas} (${rpp.fase})`, 70),
      ],
    }),
    new TableRow({
      children: [
        createHeaderCell('Tahun Pelajaran / Semester', 30),
        createValueCell(`: ${rpp.tahunPelajaran} / Semester ${rpp.semester}`, 70),
      ],
    }),
    new TableRow({
      children: [
        createHeaderCell('Alokasi Waktu / Pertemuan', 30),
        createValueCell(`: ${rpp.alokasiWaktu} / ${rpp.jumlahPertemuan}`, 70),
      ],
    }),
    new TableRow({
      children: [
        createHeaderCell('Model & Pendekatan', 30),
        createValueCell(`: ${rpp.modelPembelajaran} (KBC & Deep Learning)`, 70),
      ],
    }),
  ];

  const doc = new Document({
    sections: [
      {
        properties: {
          page: {
            margin: {
              top: convertInchesToTwip(1),
              right: convertInchesToTwip(1),
              bottom: convertInchesToTwip(1),
              left: convertInchesToTwip(1),
            },
          },
        },
        children: [
          // KOP / JUDUL
          new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [
              new TextRun({
                text: 'RENCANA PELAKSANAAN PEMBELAJARAN (RPP)',
                bold: true,
                font: FONT_NAME,
                size: 28, // 14 pt
              }),
            ],
          }),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [
              new TextRun({
                text: 'KURIKULUM MERDEKA • KURIKULUM BERBASIS CINTA (KBC) • DEEP LEARNING',
                bold: true,
                font: FONT_NAME,
                size: 26, // 13 pt
              }),
            ],
          }),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { after: 280 },
            children: [
              new TextRun({
                text: `${rpp.namaMadrasah.toUpperCase()} - TAHUN AJARAN ${rpp.tahunPelajaran}`,
                font: FONT_NAME,
                size: 22,
                color: '333333',
              }),
            ],
          }),

          // A. IDENTITAS PEMBELAJARAN
          createSectionHeading('A', 'Identitas Pembelajaran'),
          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            borders: {
              top: { style: BorderStyle.NONE },
              bottom: { style: BorderStyle.NONE },
              left: { style: BorderStyle.NONE },
              right: { style: BorderStyle.NONE },
              insideHorizontal: { style: BorderStyle.NONE },
              insideVertical: { style: BorderStyle.NONE },
            },
            rows: identityRows,
          }),

          // B. KOMPETENSI AWAL
          createSectionHeading('B', 'Kompetensi Awal (Prasyarat)'),
          new Paragraph({
            spacing: { after: 120 },
            children: [
              new TextRun({
                text: rpp.kompetensiAwal,
                font: FONT_NAME,
                size: 24,
              }),
            ],
          }),

          // C. TUJUAN PEMBELAJARAN
          createSectionHeading('C', 'Tujuan Pembelajaran'),
          ...(rpp.tujuanPembelajaran || []).map((tp, idx) =>
            new Paragraph({
              spacing: { after: 80 },
              children: [
                new TextRun({
                  text: `${idx + 1}. `,
                  bold: true,
                  font: FONT_NAME,
                  size: 24,
                }),
                new TextRun({
                  text: tp,
                  font: FONT_NAME,
                  size: 24,
                }),
              ],
            })
          ),

          // D. PEMAHAMAN BERMAKNA
          createSectionHeading('D', 'Pemahaman Bermakna'),
          new Paragraph({
            spacing: { after: 120 },
            children: [
              new TextRun({
                text: rpp.pemahamanBermakna,
                font: FONT_NAME,
                size: 24,
                italics: true,
              }),
            ],
          }),

          // E. PERTANYAAN PEMANTIK
          createSectionHeading('E', 'Pertanyaan Pemantik'),
          ...(rpp.pertanyaanPemantik || []).map((pp, idx) =>
            new Paragraph({
              spacing: { after: 80 },
              children: [
                new TextRun({
                  text: `${idx + 1}. `,
                  bold: true,
                  font: FONT_NAME,
                  size: 24,
                }),
                new TextRun({
                  text: pp,
                  font: FONT_NAME,
                  size: 24,
                }),
              ],
            })
          ),

          // F. MATERI PEMBELAJARAN
          createSectionHeading('F', 'Materi Pembelajaran'),
          new Paragraph({
            spacing: { after: 120 },
            children: [
              new TextRun({
                text: rpp.materi,
                font: FONT_NAME,
                size: 24,
              }),
            ],
          }),

          // G. KURIKULUM BERBASIS CINTA
          createSectionHeading('G', 'Integrasi Kurikulum Berbasis Cinta (KBC)'),
          createNumberedItem('1', 'Nilai Cinta yang Diintegrasikan', kbcNames || 'Cinta kepada Allah, Cinta Ilmu, Cinta Sesama'),
          createNumberedItem('2', 'Karakter Peserta Didik yang Dikembangkan', rpp.kbcKarakter),
          createNumberedItem('3', 'Implementasi dalam Pembelajaran', rpp.kbcImplementasi),
          createNumberedItem('4', 'Contoh Perilaku Peserta Didik', rpp.kbcContohPerilaku),
          createNumberedItem('5', 'Refleksi Nilai Cinta', rpp.kbcRefleksi),

          // H. PENDEKATAN DEEP LEARNING
          createSectionHeading('H', 'Pendekatan Deep Learning (Mindful, Meaningful, Joyful)'),
          createNumberedItem('1', 'Mindful Learning (Berkesadaran)', rpp.deepLearning?.mindfulLearning || '-'),
          createNumberedItem('2', 'Meaningful Learning (Bermakna)', rpp.deepLearning?.meaningfulLearning || '-'),
          createNumberedItem('3', 'Joyful Learning (Menyenangkan)', rpp.deepLearning?.joyfulLearning || '-'),

          // I. KEGIATAN PEMBELAJARAN
          createSectionHeading('I', 'Kegiatan Pembelajaran'),
          new Paragraph({
            spacing: { before: 80, after: 60 },
            children: [
              new TextRun({
                text: `1. Kegiatan Pendahuluan (${rpp.langkahPembelajaran?.pendahuluan?.durasi || '10 Menit'})`,
                bold: true,
                font: FONT_NAME,
                size: 24,
              }),
            ],
          }),
          ...(rpp.langkahPembelajaran?.pendahuluan?.kegiatan || []).map(k => createBulletItem(k)),

          new Paragraph({
            spacing: { before: 120, after: 60 },
            children: [
              new TextRun({
                text: `2. Kegiatan Inti (${rpp.langkahPembelajaran?.inti?.durasi || '60 Menit'})`,
                bold: true,
                font: FONT_NAME,
                size: 24,
              }),
            ],
          }),
          new Paragraph({
            spacing: { after: 60 },
            children: [
              new TextRun({
                text: `Sintaks: ${rpp.langkahPembelajaran?.inti?.sintaks || 'Eksplorasi dan Kolaborasi'}`,
                italics: true,
                font: FONT_NAME,
                size: 22,
              }),
            ],
          }),
          ...(rpp.langkahPembelajaran?.inti?.kegiatan || []).map(k => createBulletItem(k)),

          new Paragraph({
            spacing: { before: 120, after: 60 },
            children: [
              new TextRun({
                text: `3. Kegiatan Penutup (${rpp.langkahPembelajaran?.penutup?.durasi || '10 Menit'})`,
                bold: true,
                font: FONT_NAME,
                size: 24,
              }),
            ],
          }),
          ...(rpp.langkahPembelajaran?.penutup?.kegiatan || []).map(k => createBulletItem(k)),

          // J. ASESMEN PEMBELAJARAN
          createSectionHeading('J', 'Asesmen Pembelajaran'),
          createNumberedItem('1', 'Asesmen Diagnostik (Awal)', `${rpp.asesmen?.diagnostik?.teknik} - ${rpp.asesmen?.diagnostik?.instrumen}. Indikator: ${rpp.asesmen?.diagnostik?.indikator}`),
          createNumberedItem('2', 'Asesmen Formatif (Proses)', `${rpp.asesmen?.formatif?.teknik} - ${rpp.asesmen?.formatif?.instrumen}. Kriteria: ${rpp.asesmen?.formatif?.kriteria}`),
          createNumberedItem('3', 'Asesmen Sumatif (Akhir)', `${rpp.asesmen?.sumatif?.teknik} - ${rpp.asesmen?.sumatif?.instrumen}. Kriteria: ${rpp.asesmen?.sumatif?.kriteria}`),
          createNumberedItem('4', 'Asesmen Sikap Berbasis KBC', `${rpp.asesmen?.sikap?.teknik}. Indikator Pengamatan: ${(rpp.asesmen?.sikap?.rubrik || []).join('; ')}`),
          createNumberedItem('5', 'Asesmen Pengetahuan', `${rpp.asesmen?.pengetahuan?.teknik} (${rpp.asesmen?.pengetahuan?.instrumen})`),
          createNumberedItem('6', 'Asesmen Keterampilan', `${rpp.asesmen?.keterampilan?.teknik} (${rpp.asesmen?.keterampilan?.instrumen})`),

          // K. DIFERENSIASI PEMBELAJARAN
          createSectionHeading('K', 'Diferensiasi Pembelajaran'),
          createNumberedItem('1', 'Diferensiasi Konten', rpp.diferensiasi?.konten || '-'),
          createNumberedItem('2', 'Diferensiasi Proses', rpp.diferensiasi?.proses || '-'),
          createNumberedItem('3', 'Diferensiasi Produk', rpp.diferensiasi?.produk || '-'),

          // L. REMEDIAL DAN PENGAYAAN
          createSectionHeading('L', 'Remedial dan Pengayaan'),
          createNumberedItem('1', 'Program Remedial', rpp.diferensiasi?.remedial || '-'),
          createNumberedItem('2', 'Program Pengayaan', rpp.diferensiasi?.pengayaan || '-'),

          // M. REFLEKSI GURU DAN PESERTA DIDIK
          createSectionHeading('M', 'Refleksi Pembelajaran'),
          new Paragraph({
            spacing: { before: 60, after: 40 },
            children: [
              new TextRun({
                text: 'Refleksi Guru:',
                bold: true,
                font: FONT_NAME,
                size: 24,
              }),
            ],
          }),
          ...(rpp.refleksi?.guru || []).map(r => createBulletItem(r)),
          new Paragraph({
            spacing: { before: 80, after: 40 },
            children: [
              new TextRun({
                text: 'Refleksi Peserta Didik (Nilai KBC):',
                bold: true,
                font: FONT_NAME,
                size: 24,
              }),
            ],
          }),
          ...(rpp.refleksi?.siswa || []).map(r => createBulletItem(r)),

          // N. SUMBER DAN MEDIA BELAJAR
          createSectionHeading('N', 'Sumber dan Media Belajar'),
          new Paragraph({
            spacing: { before: 60, after: 40 },
            children: [
              new TextRun({
                text: '1. Sumber Belajar:',
                bold: true,
                font: FONT_NAME,
                size: 24,
              }),
            ],
          }),
          ...(rpp.sumberBelajar || []).map(s => createBulletItem(s)),
          new Paragraph({
            spacing: { before: 60, after: 40 },
            children: [
              new TextRun({
                text: '2. Media & Sarana Pembelajaran:',
                bold: true,
                font: FONT_NAME,
                size: 24,
              }),
            ],
          }),
          ...(rpp.mediaPembelajaran || []).map(m => createBulletItem(m)),

          // TANDA TANGAN (TABLE SIGNATURE)
          new Paragraph({ spacing: { before: 360 } }),
          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            borders: {
              top: { style: BorderStyle.NONE },
              bottom: { style: BorderStyle.NONE },
              left: { style: BorderStyle.NONE },
              right: { style: BorderStyle.NONE },
              insideHorizontal: { style: BorderStyle.NONE },
              insideVertical: { style: BorderStyle.NONE },
            },
            rows: [
              new TableRow({
                children: [
                  new TableCell({
                    width: { size: 50, type: WidthType.PERCENTAGE },
                    children: [
                      new Paragraph({
                        children: [
                          new TextRun({ text: 'Mengetahui,', font: FONT_NAME, size: 24 }),
                        ],
                      }),
                      new Paragraph({
                        children: [
                          new TextRun({ text: 'Kepala Madrasah', font: FONT_NAME, size: 24 }),
                        ],
                      }),
                      new Paragraph({ spacing: { before: 1200 } }), // space for signature
                      new Paragraph({
                        children: [
                          new TextRun({
                            text: rpp.namaKepalaMadrasah || 'Kepala Madrasah, M.Pd.',
                            bold: true,
                            underline: {},
                            font: FONT_NAME,
                            size: 24,
                          }),
                        ],
                      }),
                      new Paragraph({
                        children: [
                          new TextRun({
                            text: `NIP. ${rpp.nipKepalaMadrasah || '-'}`,
                            font: FONT_NAME,
                            size: 22,
                          }),
                        ],
                      }),
                    ],
                  }),
                  new TableCell({
                    width: { size: 50, type: WidthType.PERCENTAGE },
                    children: [
                      new Paragraph({
                        children: [
                          new TextRun({ text: rpp.tempatTanggal || 'Kota Madrasah, Juli 2025', font: FONT_NAME, size: 24 }),
                        ],
                      }),
                      new Paragraph({
                        children: [
                          new TextRun({ text: 'Guru Mata Pelajaran', font: FONT_NAME, size: 24 }),
                        ],
                      }),
                      new Paragraph({ spacing: { before: 1200 } }),
                      new Paragraph({
                        children: [
                          new TextRun({
                            text: rpp.namaGuru,
                            bold: true,
                            underline: {},
                            font: FONT_NAME,
                            size: 24,
                          }),
                        ],
                      }),
                      new Paragraph({
                        children: [
                          new TextRun({
                            text: `NIP. ${rpp.nip || '-'}`,
                            font: FONT_NAME,
                            size: 22,
                          }),
                        ],
                      }),
                    ],
                  }),
                ],
              }),
            ],
          }),
        ],
      },
    ],
  });

  return await Packer.toBlob(doc);
}

export function downloadDocxFile(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename.endsWith('.docx') ? filename : `${filename}.docx`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
