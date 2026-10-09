import { RPPData } from '../types/rpp';
import { generateSmartDefaultRPP } from './generator';

export interface GenerateAIRequest {
  jenjang: any;
  kelas: string;
  fase: any;
  mataPelajaran: string;
  topik: string;
  materi?: string;
  namaGuru?: string;
  nip?: string;
  namaMadrasah?: string;
  tahunPelajaran?: string;
  semester?: any;
  kbcValues: string[];
  templateType?: any;
}

export async function generateRPPWithAI(params: GenerateAIRequest): Promise<{ rpp: RPPData; source: 'ai' | 'smart_template' }> {
  try {
    const response = await fetch('/api/generate-rpp', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
    });

    if (!response.ok) {
      const errJson = await response.json().catch(() => ({}));
      console.warn('AI Server responded with error, falling back to smart educational engine:', errJson);
      const fallback = generateSmartDefaultRPP({
        ...params,
        selectedKbcIds: params.kbcValues,
      });
      return { rpp: fallback, source: 'smart_template' };
    }

    const result = await response.json();
    if (result.success && result.data) {
      const aiData = result.data;
      const completeRPP: RPPData = {
        id: 'rpp_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7),
        title: `RPP ${params.mataPelajaran} Kelas ${params.kelas} - ${aiData.topik || params.topik}`,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        templateType: params.templateType || 'kbc_merdeka',
        
        namaGuru: params.namaGuru || 'Guru Pembina',
        nip: params.nip || '-',
        namaMadrasah: params.namaMadrasah || 'Madrasah Hebat Bermartabat',
        tahunPelajaran: params.tahunPelajaran || '2025/2026',
        semester: params.semester || '1 (Ganjil)',
        jenjang: params.jenjang,
        kelas: params.kelas,
        fase: params.fase,
        mataPelajaran: params.mataPelajaran,
        alokasiWaktu: params.jenjang === 'MI' ? '2 JP (2 x 35 Menit)' : params.jenjang === 'MTs' ? '2 JP (2 x 40 Menit)' : '2 JP (2 x 45 Menit)',
        jumlahPertemuan: '1 Pertemuan',
        
        topik: aiData.topik || params.topik,
        materi: aiData.materi || params.materi || 'Materi Pokok Pembelajaran',
        kompetensiAwal: aiData.kompetensiAwal || 'Peserta didik telah memiliki pengetahuan prasyarat.',
        tujuanPembelajaran: Array.isArray(aiData.tujuanPembelajaran) ? aiData.tujuanPembelajaran : [aiData.tujuanPembelajaran],
        pemahamanBermakna: aiData.pemahamanBermakna || '',
        pertanyaanPemantik: Array.isArray(aiData.pertanyaanPemantik) ? aiData.pertanyaanPemantik : [aiData.pertanyaanPemantik],
        saranaPrasarana: aiData.saranaPrasarana || 'Ruang kelas dan modul ajar.',
        modelPembelajaran: aiData.modelPembelajaran || 'Problem Based Learning',
        metodePembelajaran: Array.isArray(aiData.metodePembelajaran) ? aiData.metodePembelajaran : ['Diskusi', 'Tanya Jawab', 'Praktik'],
        sumberBelajar: Array.isArray(aiData.sumberBelajar) ? aiData.sumberBelajar : ['Buku Siswa Kemenag', 'Modul Ajar'],
        mediaPembelajaran: Array.isArray(aiData.mediaPembelajaran) ? aiData.mediaPembelajaran : ['Slide Presentasi', 'LKPD'],
        
        kbcValues: params.kbcValues,
        kbcKarakter: aiData.kbcKarakter || 'Karakter cinta ilmu dan sesama.',
        kbcImplementasi: aiData.kbcImplementasi || 'Integrasi nilai kasih sayang dalam pembelajaran.',
        kbcContohPerilaku: aiData.kbcContohPerilaku || 'Saling membantu dan bertutur kata santun.',
        kbcRefleksi: aiData.kbcRefleksi || 'Merawat ukhuwah dan semangat belajar.',

        deepLearning: aiData.deepLearning || {
          mindfulLearning: 'Membangun kesadaran penuh peserta didik.',
          meaningfulLearning: 'Keterkaitan materi dengan konteks nyata kehidupan.',
          joyfulLearning: 'Suasana belajar yang interaktif dan menyenangkan.',
        },
        
        langkahPembelajaran: aiData.langkahPembelajaran,
        asesmen: aiData.asesmen,
        diferensiasi: aiData.diferensiasi,
        refleksi: aiData.refleksi,
        
        tempatTanggal: 'Kota Madrasah, ' + new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }),
        namaKepalaMadrasah: 'Kepala Madrasah, M.Pd.I.',
        nipKepalaMadrasah: '-'
      };

      return { rpp: completeRPP, source: 'ai' };
    }

    throw new Error('Format respon AI tidak sesuai');
  } catch (err) {
    console.warn('Gagal memanggil API AI, menggunakan generator cerdas kurikulum madrasah:', err);
    const fallback = generateSmartDefaultRPP({
      ...params,
      selectedKbcIds: params.kbcValues,
    });
    return { rpp: fallback, source: 'smart_template' };
  }
}
