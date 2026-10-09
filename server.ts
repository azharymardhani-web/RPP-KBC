import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI, Type } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json({ limit: '10mb' }));

// Server-side Gemini initialization
const apiKey = process.env.GEMINI_API_KEY;
let ai: GoogleGenAI | null = null;
if (apiKey) {
  ai = new GoogleGenAI({
    apiKey: apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

// API Health Check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    hasApiKey: Boolean(apiKey),
    timestamp: new Date().toISOString(),
  });
});

// API: Generate Complete RPP with Gemini
app.post('/api/generate-rpp', async (req, res) => {
  try {
    const {
      jenjang,
      kelas,
      fase,
      mataPelajaran,
      topik,
      materi,
      namaGuru,
      namaMadrasah,
      kbcValues,
      templateType,
    } = req.body;

    if (!ai) {
      return res.status(503).json({
        error: 'GEMINI_API_KEY belum dikonfigurasi pada environment server.',
      });
    }

    const systemPrompt = `Anda adalah pakar kurikulum madrasah (Kementerian Agama RI) dan ahli pedagogi Kurikulum Merdeka, Kurikulum Berbasis Cinta (KBC), serta kerangka Deep Learning (Mindful, Meaningful, Joyful Learning).
Tugas Anda adalah merumuskan dokumen Rencana Pelaksanaan Pembelajaran (RPP/Modul Ajar) yang mendalam, terperinci, autentik, tidak generik, dan siap pakai untuk supervisi pendidikan.
Prinsip wajib:
1. Pembelajaran aktif yang berpusat pada siswa (student-centered).
2. Terapkan 3 pilar Deep Learning secara terpadu:
   - Mindful Learning (Pembelajaran Berkesadaran / kehadiran utuh mental & spiritual).
   - Meaningful Learning (Pembelajaran Bermakna / relevansi kontekstual & pemecahan masalah nyata).
   - Joyful Learning (Pembelajaran Menyenangkan / antusiasme, kolaborasi, dan apresiasi positif).
3. Sesuaikan aktivitas secara spesifik dengan mata pelajaran (Informatika, Matematika, PAI, IPA, Bahasa, dll).
4. Integrasikan Kurikulum Berbasis Cinta (KBC) secara alami.
5. Format output HARUS JSON murni sesuai skema yang diminta.`;

    const userPrompt = `Buatkan RPP Kurikulum Merdeka + Kurikulum Berbasis Cinta & Deep Learning dengan rincian berikut:
- Jenjang: ${jenjang}
- Kelas: ${kelas} (${fase})
- Mata Pelajaran: ${mataPelajaran}
- Topik/Judul: ${topik}
- Materi Pembelajaran: ${materi || 'Materi esensial standar'}
- Guru: ${namaGuru || 'Guru Madrasah'}
- Madrasah: ${namaMadrasah || 'Madrasah Model'}
- Nilai-nilai KBC terpilih: ${Array.isArray(kbcValues) ? kbcValues.join(', ') : 'Cinta kepada Allah, Cinta kepada Ilmu, Cinta kepada Sesama, Cinta Lingkungan'}
- Format Template: ${templateType || 'kbc_merdeka'}

Pastikan menghasilkan respon JSON yang lengkap dan terstruktur.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: userPrompt,
      config: {
        systemInstruction: systemPrompt,
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            topik: { type: Type.STRING },
            materi: { type: Type.STRING },
            kompetensiAwal: { type: Type.STRING },
            tujuanPembelajaran: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
            },
            pemahamanBermakna: { type: Type.STRING },
            pertanyaanPemantik: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
            },
            saranaPrasarana: { type: Type.STRING },
            modelPembelajaran: { type: Type.STRING },
            metodePembelajaran: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
            },
            sumberBelajar: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
            },
            mediaPembelajaran: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
            },
            kbcKarakter: { type: Type.STRING },
            kbcImplementasi: { type: Type.STRING },
            kbcContohPerilaku: { type: Type.STRING },
            kbcRefleksi: { type: Type.STRING },
            deepLearning: {
              type: Type.OBJECT,
              properties: {
                mindfulLearning: { type: Type.STRING },
                meaningfulLearning: { type: Type.STRING },
                joyfulLearning: { type: Type.STRING },
              },
              required: ['mindfulLearning', 'meaningfulLearning', 'joyfulLearning'],
            },
            langkahPembelajaran: {
              type: Type.OBJECT,
              properties: {
                pendahuluan: {
                  type: Type.OBJECT,
                  properties: {
                    durasi: { type: Type.STRING },
                    kegiatan: {
                      type: Type.ARRAY,
                      items: { type: Type.STRING },
                    },
                  },
                  required: ['durasi', 'kegiatan'],
                },
                inti: {
                  type: Type.OBJECT,
                  properties: {
                    durasi: { type: Type.STRING },
                    sintaks: { type: Type.STRING },
                    kegiatan: {
                      type: Type.ARRAY,
                      items: { type: Type.STRING },
                    },
                  },
                  required: ['durasi', 'sintaks', 'kegiatan'],
                },
                penutup: {
                  type: Type.OBJECT,
                  properties: {
                    durasi: { type: Type.STRING },
                    kegiatan: {
                      type: Type.ARRAY,
                      items: { type: Type.STRING },
                    },
                  },
                  required: ['durasi', 'kegiatan'],
                },
              },
              required: ['pendahuluan', 'inti', 'penutup'],
            },
            asesmen: {
              type: Type.OBJECT,
              properties: {
                diagnostik: {
                  type: Type.OBJECT,
                  properties: {
                    teknik: { type: Type.STRING },
                    bentuk: { type: Type.STRING },
                    instrumen: { type: Type.STRING },
                    indikator: { type: Type.STRING },
                    kriteria: { type: Type.STRING },
                  },
                  required: ['teknik', 'bentuk', 'instrumen', 'indikator', 'kriteria'],
                },
                formatif: {
                  type: Type.OBJECT,
                  properties: {
                    teknik: { type: Type.STRING },
                    bentuk: { type: Type.STRING },
                    instrumen: { type: Type.STRING },
                    indikator: { type: Type.STRING },
                    kriteria: { type: Type.STRING },
                  },
                  required: ['teknik', 'bentuk', 'instrumen', 'indikator', 'kriteria'],
                },
                sumatif: {
                  type: Type.OBJECT,
                  properties: {
                    teknik: { type: Type.STRING },
                    bentuk: { type: Type.STRING },
                    instrumen: { type: Type.STRING },
                    indikator: { type: Type.STRING },
                    kriteria: { type: Type.STRING },
                  },
                  required: ['teknik', 'bentuk', 'instrumen', 'indikator', 'kriteria'],
                },
                sikap: {
                  type: Type.OBJECT,
                  properties: {
                    teknik: { type: Type.STRING },
                    rubrik: {
                      type: Type.ARRAY,
                      items: { type: Type.STRING },
                    },
                  },
                  required: ['teknik', 'rubrik'],
                },
                pengetahuan: {
                  type: Type.OBJECT,
                  properties: {
                    teknik: { type: Type.STRING },
                    instrumen: { type: Type.STRING },
                  },
                  required: ['teknik', 'instrumen'],
                },
                keterampilan: {
                  type: Type.OBJECT,
                  properties: {
                    teknik: { type: Type.STRING },
                    instrumen: { type: Type.STRING },
                  },
                  required: ['teknik', 'instrumen'],
                },
              },
              required: ['diagnostik', 'formatif', 'sumatif', 'sikap', 'pengetahuan', 'keterampilan'],
            },
            diferensiasi: {
              type: Type.OBJECT,
              properties: {
                konten: { type: Type.STRING },
                proses: { type: Type.STRING },
                produk: { type: Type.STRING },
                remedial: { type: Type.STRING },
                pengayaan: { type: Type.STRING },
              },
              required: ['konten', 'proses', 'produk', 'remedial', 'pengayaan'],
            },
            refleksi: {
              type: Type.OBJECT,
              properties: {
                guru: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING },
                },
                siswa: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING },
                },
                kbc: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING },
                },
              },
              required: ['guru', 'siswa', 'kbc'],
            },
          },
          required: [
            'topik',
            'materi',
            'kompetensiAwal',
            'tujuanPembelajaran',
            'pemahamanBermakna',
            'pertanyaanPemantik',
            'saranaPrasarana',
            'modelPembelajaran',
            'metodePembelajaran',
            'sumberBelajar',
            'mediaPembelajaran',
            'kbcKarakter',
            'kbcImplementasi',
            'kbcContohPerilaku',
            'kbcRefleksi',
            'deepLearning',
            'langkahPembelajaran',
            'asesmen',
            'diferensiasi',
            'refleksi',
          ],
        },
      },
    });

    const text = response.text;
    if (!text) {
      throw new Error('AI tidak menghasilkan output teks yang valid.');
    }

    const parsed = JSON.parse(text);
    res.json({ success: true, data: parsed });
  } catch (error: any) {
    console.error('Error generating RPP with Gemini:', error);
    res.status(500).json({
      error: error.message || 'Terjadi kesalahan saat memproses permintaan AI.',
    });
  }
});

// API: Regenerate Specific Section
app.post('/api/regenerate-section', async (req, res) => {
  try {
    const { sectionName, currentRpp, instructions } = req.body;

    if (!ai) {
      return res.status(503).json({
        error: 'GEMINI_API_KEY belum dikonfigurasi.',
      });
    }

    const prompt = `Anda adalah ahli kurikulum madrasah. Tulis ulang HANYA bagian "${sectionName}" dari RPP berikut agar lebih kaya, mendalam, dan menginspirasi sesuai Kurikulum Merdeka, Kurikulum Berbasis Cinta (KBC), serta Deep Learning.
Mata Pelajaran: ${currentRpp.mataPelajaran}
Jenjang & Kelas: ${currentRpp.jenjang} Kelas ${currentRpp.kelas} (${currentRpp.fase})
Topik: ${currentRpp.topik}
Petunjuk khusus: ${instructions || 'Tingkatkan kualitas pedagogis'}

Kembalikan hasilnya dalam JSON dengan key "${sectionName}".`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
      },
    });

    const text = response.text;
    res.json({ success: true, text });
  } catch (error: any) {
    console.error('Error regenerating section:', error);
    res.status(500).json({ error: error.message || 'Gagal memperbarui bagian RPP.' });
  }
});

// Mount Vite or serve static
if (process.env.NODE_ENV !== 'production') {
  const { createServer: createViteServer } = await import('vite');
  const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: 'spa',
  });
  app.use(vite.middlewares);
} else {
  app.use(express.static(path.join(__dirname, 'dist')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
  });
}

app.listen(port, () => {
  console.log(`Server Administrasi Guru Madrasah berjalan pada port ${port}`);
});
