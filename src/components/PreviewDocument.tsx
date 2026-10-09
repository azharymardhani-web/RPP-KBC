import React, { useState } from 'react';
import { 
  Printer, 
  FileText, 
  Save, 
  RefreshCw, 
  Edit3, 
  Sparkles, 
  Eye, 
  Maximize2, 
  Minimize2, 
  Check, 
  Trash2, 
  Bookmark 
} from 'lucide-react';
import { RPPData } from '../types/rpp';
import { KBC_VALUES } from '../data/kbc';
import { ExportButtons } from './ExportButtons';
import { DocumentEditor } from './DocumentEditor';

interface PreviewDocumentProps {
  rpp: RPPData;
  onUpdateRpp: (updated: RPPData) => void;
  onRegenerateSection?: (sectionKey: string) => void;
  onRefresh?: () => void;
}

export const PreviewDocument: React.FC<PreviewDocumentProps> = ({
  rpp,
  onUpdateRpp,
  onRegenerateSection,
  onRefresh,
}) => {
  const [editingSection, setEditingSection] = useState<string | null>(null);
  const [isFullScreen, setIsFullScreen] = useState(false);

  const selectedKbcObjects = KBC_VALUES.filter(k => (rpp.kbcValues || []).includes(k.id));
  const kbcNames = selectedKbcObjects.map(k => k.title).join(', ');

  const handleEditSection = (key: string) => {
    setEditingSection(key);
  };

  const handleSaveEditedRpp = (updated: RPPData) => {
    onUpdateRpp(updated);
  };

  return (
    <div className={`space-y-4 ${isFullScreen ? 'fixed inset-0 z-50 bg-slate-900/90 p-4 sm:p-8 overflow-y-auto' : ''}`}>
      
      {/* Toolbar / Actions Bar */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 no-print">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center">
            <Eye className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              PREVIEW DOKUMEN RPP (FORMAT A4 RESMI)
              <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-100/70 px-2 py-0.5 rounded-full border border-emerald-200">
                Real-Time
              </span>
            </h3>
            <p className="text-xs text-slate-500">
              Format baku supervisi madrasah (Times New Roman 12pt, Tabel Bergaris, KBC & Deep Learning).
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 self-end sm:self-auto">
          <button
            type="button"
            onClick={() => setIsFullScreen(!isFullScreen)}
            className="p-2 text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-lg transition"
            title={isFullScreen ? 'Keluar Layar Penuh' : 'Layar Penuh Preview'}
          >
            {isFullScreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" /> }
          </button>

          <ExportButtons rpp={rpp} onRefresh={onRefresh} />
        </div>
      </div>

      {/* A4 Sheet Container */}
      <div className="flex justify-center overflow-x-auto pb-6">
        <div 
          id="printable-rpp-document"
          className="w-full max-w-[850px] bg-white text-black shadow-lg rounded-sm border border-slate-200 p-8 sm:p-14 print:p-0 print:border-none print:shadow-none print:w-full print:max-w-none font-serif text-[13px] leading-relaxed select-text"
          style={{ fontFamily: "'Times New Roman', Times, serif" }}
        >
          
          {/* KOP / JUDUL UTAMA */}
          <div className="text-center pb-4 border-b-2 border-black mb-6">
            <h1 className="text-base sm:text-lg font-bold tracking-wide uppercase">
              RENCANA PELAKSANAAN PEMBELAJARAN (RPP)
            </h1>
            <h2 className="text-sm sm:text-base font-bold uppercase tracking-wider text-slate-900 mt-0.5">
              KURIKULUM MERDEKA • KURIKULUM BERBASIS CINTA (KBC) • DEEP LEARNING
            </h2>
            <div className="text-xs sm:text-sm font-semibold mt-1 uppercase text-slate-800">
              {rpp.namaMadrasah} — TAHUN AJARAN {rpp.tahunPelajaran}
            </div>
          </div>

          {/* A. IDENTITAS PEMBELAJARAN */}
          <div className="group relative mb-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-bold uppercase">
                A. IDENTITAS PEMBELAJARAN
              </h3>
              <div className="opacity-0 group-hover:opacity-100 transition no-print flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => handleEditSection('identitas')}
                  className="px-2 py-0.5 text-[11px] font-sans font-semibold text-blue-600 bg-blue-50 hover:bg-blue-100 rounded border border-blue-200"
                >
                  ✏ Edit
                </button>
              </div>
            </div>

            <table className="w-full text-xs sm:text-[13px] border border-black border-collapse">
              <tbody>
                <tr className="border-b border-black">
                  <td className="w-1/3 py-1.5 px-3 font-semibold bg-slate-50/50 border-r border-black">Nama Madrasah</td>
                  <td className="py-1.5 px-3">: {rpp.namaMadrasah}</td>
                </tr>
                <tr className="border-b border-black">
                  <td className="py-1.5 px-3 font-semibold bg-slate-50/50 border-r border-black">Nama Guru / NIP</td>
                  <td className="py-1.5 px-3">: {rpp.namaGuru} {rpp.nip && rpp.nip !== '-' ? `(NIP. ${rpp.nip})` : ''}</td>
                </tr>
                <tr className="border-b border-black">
                  <td className="py-1.5 px-3 font-semibold bg-slate-50/50 border-r border-black">Mata Pelajaran</td>
                  <td className="py-1.5 px-3 font-bold">: {rpp.mataPelajaran}</td>
                </tr>
                <tr className="border-b border-black">
                  <td className="py-1.5 px-3 font-semibold bg-slate-50/50 border-r border-black">Jenjang / Kelas / Fase</td>
                  <td className="py-1.5 px-3">: {rpp.jenjang} / Kelas {rpp.kelas} ({rpp.fase})</td>
                </tr>
                <tr className="border-b border-black">
                  <td className="py-1.5 px-3 font-semibold bg-slate-50/50 border-r border-black">Tahun Pelajaran / Semester</td>
                  <td className="py-1.5 px-3">: {rpp.tahunPelajaran} / Semester {rpp.semester}</td>
                </tr>
                <tr className="border-b border-black">
                  <td className="py-1.5 px-3 font-semibold bg-slate-50/50 border-r border-black">Alokasi Waktu / Pertemuan</td>
                  <td className="py-1.5 px-3">: {rpp.alokasiWaktu} / {rpp.jumlahPertemuan}</td>
                </tr>
                <tr>
                  <td className="py-1.5 px-3 font-semibold bg-slate-50/50 border-r border-black">Model & Metode</td>
                  <td className="py-1.5 px-3">: {rpp.modelPembelajaran} | {(rpp.metodePembelajaran || []).join(', ')}</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* B. KOMPETENSI AWAL */}
          <div className="group relative mb-5">
            <div className="flex items-center justify-between mb-1">
              <h3 className="text-sm font-bold uppercase">
                B. KOMPETENSI AWAL (PRASYARAT)
              </h3>
              <div className="opacity-0 group-hover:opacity-100 transition no-print flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => handleEditSection('kompetensiAwal')}
                  className="px-2 py-0.5 text-[11px] font-sans font-semibold text-blue-600 bg-blue-50 rounded border border-blue-200"
                >
                  ✏ Edit
                </button>
              </div>
            </div>
            <p className="text-justify pl-4">
              {rpp.kompetensiAwal || 'Peserta didik telah memiliki pengetahuan prasyarat terkait materi pembelajaran.'}
            </p>
          </div>

          {/* C. TUJUAN PEMBELAJARAN */}
          <div className="group relative mb-5">
            <div className="flex items-center justify-between mb-1">
              <h3 className="text-sm font-bold uppercase">
                C. TUJUAN PEMBELAJARAN
              </h3>
              <div className="opacity-0 group-hover:opacity-100 transition no-print flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => handleEditSection('tujuanPembelajaran')}
                  className="px-2 py-0.5 text-[11px] font-sans font-semibold text-blue-600 bg-blue-50 rounded border border-blue-200"
                >
                  ✏ Edit
                </button>
              </div>
            </div>
            <ol className="list-decimal pl-8 space-y-1">
              {(rpp.tujuanPembelajaran || []).map((tp, i) => (
                <li key={i} className="text-justify">{tp}</li>
              ))}
            </ol>
          </div>

          {/* D. PEMAHAMAN BERMAKNA */}
          <div className="group relative mb-5">
            <div className="flex items-center justify-between mb-1">
              <h3 className="text-sm font-bold uppercase">
                D. PEMAHAMAN BERMAKNA
              </h3>
              <div className="opacity-0 group-hover:opacity-100 transition no-print flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => handleEditSection('pemahamanBermakna')}
                  className="px-2 py-0.5 text-[11px] font-sans font-semibold text-blue-600 bg-blue-50 rounded border border-blue-200"
                >
                  ✏ Edit
                </button>
              </div>
            </div>
            <p className="text-justify italic pl-4">
              "{rpp.pemahamanBermakna}"
            </p>
          </div>

          {/* E. PERTANYAAN PEMANTIK */}
          <div className="group relative mb-5">
            <div className="flex items-center justify-between mb-1">
              <h3 className="text-sm font-bold uppercase">
                E. PERTANYAAN PEMANTIK
              </h3>
              <div className="opacity-0 group-hover:opacity-100 transition no-print flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => handleEditSection('pertanyaanPemantik')}
                  className="px-2 py-0.5 text-[11px] font-sans font-semibold text-blue-600 bg-blue-50 rounded border border-blue-200"
                >
                  ✏ Edit
                </button>
              </div>
            </div>
            <ol className="list-decimal pl-8 space-y-1">
              {(rpp.pertanyaanPemantik || []).map((pp, i) => (
                <li key={i}>{pp}</li>
              ))}
            </ol>
          </div>

          {/* F. MATERI PEMBELAJARAN */}
          <div className="group relative mb-5">
            <div className="flex items-center justify-between mb-1">
              <h3 className="text-sm font-bold uppercase">
                F. MATERI PEMBELAJARAN
              </h3>
              <div className="opacity-0 group-hover:opacity-100 transition no-print flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => handleEditSection('materi')}
                  className="px-2 py-0.5 text-[11px] font-sans font-semibold text-blue-600 bg-blue-50 rounded border border-blue-200"
                >
                  ✏ Edit
                </button>
              </div>
            </div>
            <p className="text-justify pl-4">
              {rpp.materi}
            </p>
          </div>

          {/* G. KURIKULUM BERBASIS CINTA */}
          <div className="group relative mb-6 bg-slate-50/50 p-4 border border-black rounded-xs">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-bold uppercase">
                G. INTEGRASI KURIKULUM BERBASIS CINTA (KBC)
              </h3>
              <div className="opacity-0 group-hover:opacity-100 transition no-print flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => handleEditSection('kbc')}
                  className="px-2 py-0.5 text-[11px] font-sans font-semibold text-blue-600 bg-blue-50 rounded border border-blue-200"
                >
                  ✏ Edit
                </button>
              </div>
            </div>
            <div className="space-y-2 pl-2">
              <div>
                <span className="font-bold">1. Nilai Cinta Terintegrasi: </span>
                <span>{kbcNames || 'Cinta kepada Allah, Cinta kepada Ilmu, Cinta kepada Sesama'}</span>
              </div>
              <div>
                <span className="font-bold">2. Karakter yang Dikembangkan: </span>
                <span>{rpp.kbcKarakter}</span>
              </div>
              <div>
                <span className="font-bold">3. Implementasi dalam Pembelajaran: </span>
                <span className="text-justify">{rpp.kbcImplementasi}</span>
              </div>
              <div>
                <span className="font-bold">4. Contoh Perilaku Nyata Peserta Didik: </span>
                <span className="text-justify">{rpp.kbcContohPerilaku}</span>
              </div>
              <div>
                <span className="font-bold">5. Refleksi Nilai Cinta: </span>
                <span className="text-justify italic">"{rpp.kbcRefleksi}"</span>
              </div>
            </div>
          </div>

          {/* H. PENDEKATAN DEEP LEARNING */}
          <div className="group relative mb-6 bg-indigo-50/30 p-4 border border-black rounded-xs">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-bold uppercase">
                H. PENDEKATAN DEEP LEARNING (MINDFUL, MEANINGFUL, JOYFUL)
              </h3>
            </div>
            <div className="space-y-2 pl-2">
              <div>
                <span className="font-bold">1. Mindful Learning (Berkesadaran): </span>
                <span className="text-justify">{rpp.deepLearning?.mindfulLearning || '-'}</span>
              </div>
              <div>
                <span className="font-bold">2. Meaningful Learning (Bermakna): </span>
                <span className="text-justify">{rpp.deepLearning?.meaningfulLearning || '-'}</span>
              </div>
              <div>
                <span className="font-bold">3. Joyful Learning (Menyenangkan): </span>
                <span className="text-justify">{rpp.deepLearning?.joyfulLearning || '-'}</span>
              </div>
            </div>
          </div>

          {/* I. KEGIATAN PEMBELAJARAN */}
          <div className="group relative mb-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-bold uppercase">
                I. KEGIATAN PEMBELAJARAN
              </h3>
              <div className="opacity-0 group-hover:opacity-100 transition no-print flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => handleEditSection('langkah')}
                  className="px-2 py-0.5 text-[11px] font-sans font-semibold text-blue-600 bg-blue-50 rounded border border-blue-200"
                >
                  ✏ Edit
                </button>
              </div>
            </div>

            <div className="space-y-4 pl-2">
              
              {/* Pendahuluan */}
              <div>
                <div className="font-bold underline mb-1">
                  1. Kegiatan Pendahuluan ({rpp.langkahPembelajaran?.pendahuluan?.durasi || '10 Menit'})
                </div>
                <ul className="list-disc pl-6 space-y-1">
                  {(rpp.langkahPembelajaran?.pendahuluan?.kegiatan || []).map((k, idx) => (
                    <li key={idx} className="text-justify">{k}</li>
                  ))}
                </ul>
              </div>

              {/* Inti */}
              <div>
                <div className="font-bold underline mb-0.5">
                  2. Kegiatan Inti ({rpp.langkahPembelajaran?.inti?.durasi || '60 Menit'})
                </div>
                <div className="text-xs italic mb-1.5 text-slate-700">
                  Sintaks Model: {rpp.langkahPembelajaran?.inti?.sintaks || 'Eksplorasi, Kolaborasi, dan Praktik Kasih Sayang'}
                </div>
                <ul className="list-disc pl-6 space-y-1.5">
                  {(rpp.langkahPembelajaran?.inti?.kegiatan || []).map((k, idx) => (
                    <li key={idx} className="text-justify">{k}</li>
                  ))}
                </ul>
              </div>

              {/* Penutup */}
              <div>
                <div className="font-bold underline mb-1">
                  3. Kegiatan Penutup ({rpp.langkahPembelajaran?.penutup?.durasi || '10 Menit'})
                </div>
                <ul className="list-disc pl-6 space-y-1">
                  {(rpp.langkahPembelajaran?.penutup?.kegiatan || []).map((k, idx) => (
                    <li key={idx} className="text-justify">{k}</li>
                  ))}
                </ul>
              </div>

            </div>
          </div>

          {/* J. ASESMEN PEMBELAJARAN */}
          <div className="group relative mb-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-bold uppercase">
                J. ASESMEN PEMBELAJARAN
              </h3>
              <div className="opacity-0 group-hover:opacity-100 transition no-print flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => handleEditSection('asesmen')}
                  className="px-2 py-0.5 text-[11px] font-sans font-semibold text-blue-600 bg-blue-50 rounded border border-blue-200"
                >
                  ✏ Edit
                </button>
              </div>
            </div>

            <table className="w-full text-xs border border-black border-collapse mb-3">
              <thead>
                <tr className="bg-slate-100 border-b border-black">
                  <th className="border-r border-black p-2 text-left font-bold w-1/4">Jenis Asesmen</th>
                  <th className="border-r border-black p-2 text-left font-bold w-1/4">Teknik & Bentuk</th>
                  <th className="border-r border-black p-2 text-left font-bold w-1/4">Instrumen</th>
                  <th className="p-2 text-left font-bold w-1/4">Indikator & Kriteria</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-black">
                  <td className="border-r border-black p-2 font-semibold">1. Diagnostik (Awal)</td>
                  <td className="border-r border-black p-2">{rpp.asesmen?.diagnostik?.teknik} ({rpp.asesmen?.diagnostik?.bentuk})</td>
                  <td className="border-r border-black p-2">{rpp.asesmen?.diagnostik?.instrumen}</td>
                  <td className="p-2">{rpp.asesmen?.diagnostik?.indikator}</td>
                </tr>
                <tr className="border-b border-black">
                  <td className="border-r border-black p-2 font-semibold">2. Formatif (Proses)</td>
                  <td className="border-r border-black p-2">{rpp.asesmen?.formatif?.teknik} ({rpp.asesmen?.formatif?.bentuk})</td>
                  <td className="border-r border-black p-2">{rpp.asesmen?.formatif?.instrumen}</td>
                  <td className="p-2">{rpp.asesmen?.formatif?.kriteria}</td>
                </tr>
                <tr>
                  <td className="border-r border-black p-2 font-semibold">3. Sumatif (Akhir)</td>
                  <td className="border-r border-black p-2">{rpp.asesmen?.sumatif?.teknik} ({rpp.asesmen?.sumatif?.bentuk})</td>
                  <td className="border-r border-black p-2">{rpp.asesmen?.sumatif?.instrumen}</td>
                  <td className="p-2">{rpp.asesmen?.sumatif?.kriteria}</td>
                </tr>
              </tbody>
            </table>

            {/* Rubrik Sikap, Pengetahuan, Keterampilan */}
            <div className="space-y-1 pl-2 text-xs">
              <div>
                <span className="font-bold">• Asesmen Sikap (KBC & PPRA): </span>
                <span>{rpp.asesmen?.sikap?.teknik}. Indikator: {(rpp.asesmen?.sikap?.rubrik || []).join('; ')}</span>
              </div>
              <div>
                <span className="font-bold">• Asesmen Pengetahuan: </span>
                <span>{rpp.asesmen?.pengetahuan?.teknik} — {rpp.asesmen?.pengetahuan?.instrumen}</span>
              </div>
              <div>
                <span className="font-bold">• Asesmen Keterampilan: </span>
                <span>{rpp.asesmen?.keterampilan?.teknik} — {rpp.asesmen?.keterampilan?.instrumen}</span>
              </div>
            </div>
          </div>

          {/* K. DIFERENSIASI */}
          <div className="group relative mb-5">
            <div className="flex items-center justify-between mb-1">
              <h3 className="text-sm font-bold uppercase">
                K. DIFERENSIASI PEMBELAJARAN
              </h3>
              <div className="opacity-0 group-hover:opacity-100 transition no-print flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => handleEditSection('diferensiasi')}
                  className="px-2 py-0.5 text-[11px] font-sans font-semibold text-blue-600 bg-blue-50 rounded border border-blue-200"
                >
                  ✏ Edit
                </button>
              </div>
            </div>
            <div className="space-y-1.5 pl-4">
              <div><span className="font-bold">1. Diferensiasi Konten: </span>{rpp.diferensiasi?.konten}</div>
              <div><span className="font-bold">2. Diferensiasi Proses: </span>{rpp.diferensiasi?.proses}</div>
              <div><span className="font-bold">3. Diferensiasi Produk: </span>{rpp.diferensiasi?.produk}</div>
            </div>
          </div>

          {/* L. REMEDIAL & PENGAYAAN */}
          <div className="group relative mb-5">
            <div className="flex items-center justify-between mb-1">
              <h3 className="text-sm font-bold uppercase">
                L. REMEDIAL DAN PENGAYAAN
              </h3>
            </div>
            <div className="space-y-1.5 pl-4">
              <div><span className="font-bold">1. Program Remedial: </span>{rpp.diferensiasi?.remedial}</div>
              <div><span className="font-bold">2. Program Pengayaan: </span>{rpp.diferensiasi?.pengayaan}</div>
            </div>
          </div>

          {/* M. REFLEKSI */}
          <div className="group relative mb-5">
            <div className="flex items-center justify-between mb-1">
              <h3 className="text-sm font-bold uppercase">
                M. REFLEKSI GURU DAN PESERTA DIDIK
              </h3>
              <div className="opacity-0 group-hover:opacity-100 transition no-print flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => handleEditSection('refleksi')}
                  className="px-2 py-0.5 text-[11px] font-sans font-semibold text-blue-600 bg-blue-50 rounded border border-blue-200"
                >
                  ✏ Edit
                </button>
              </div>
            </div>
            <div className="space-y-2 pl-4">
              <div>
                <span className="font-bold">Refleksi Guru:</span>
                <ul className="list-disc pl-6 space-y-0.5">
                  {(rpp.refleksi?.guru || []).map((rg, i) => (
                    <li key={i}>{rg}</li>
                  ))}
                </ul>
              </div>
              <div>
                <span className="font-bold">Refleksi Peserta Didik (KBC):</span>
                <ul className="list-disc pl-6 space-y-0.5">
                  {(rpp.refleksi?.siswa || []).map((rs, i) => (
                    <li key={i}>{rs}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* N. SUMBER BELAJAR */}
          <div className="group relative mb-8">
            <div className="flex items-center justify-between mb-1">
              <h3 className="text-sm font-bold uppercase">
                N. SUMBER DAN MEDIA BELAJAR
              </h3>
            </div>
            <div className="pl-4 space-y-1">
              <div>
                <span className="font-bold">1. Sumber Belajar: </span>
                <span>{(rpp.sumberBelajar || []).join('; ')}</span>
              </div>
              <div>
                <span className="font-bold">2. Media Pembelajaran: </span>
                <span>{(rpp.mediaPembelajaran || []).join('; ')}</span>
              </div>
            </div>
          </div>

          {/* TANDA TANGAN (TABLE SIGNATURES) */}
          <div className="group relative pt-4 break-inside-avoid">
            <div className="flex justify-end mb-2 no-print opacity-0 group-hover:opacity-100 transition">
              <button
                type="button"
                onClick={() => handleEditSection('ttd')}
                className="px-2 py-0.5 text-[11px] font-sans font-semibold text-blue-600 bg-blue-50 rounded border border-blue-200"
              >
                ✏ Edit Tanda Tangan
              </button>
            </div>

            <table className="w-full text-center">
              <tbody>
                <tr>
                  <td className="w-1/2 align-top text-left pl-6">
                    <div>Mengetahui,</div>
                    <div className="font-semibold">Kepala Madrasah</div>
                    <div className="h-24"></div>
                    <div className="font-bold underline">{rpp.namaKepalaMadrasah || 'Drs. H. Maimun Zubair, M.Ag.'}</div>
                    <div className="text-xs">NIP. {rpp.nipKepalaMadrasah || '19720610 199803 1 001'}</div>
                  </td>
                  <td className="w-1/2 align-top text-left pl-6">
                    <div>{rpp.tempatTanggal || 'Kota Madrasah, Juli 2025'}</div>
                    <div className="font-semibold">Guru Mata Pelajaran</div>
                    <div className="h-24"></div>
                    <div className="font-bold underline">{rpp.namaGuru}</div>
                    <div className="text-xs">NIP. {rpp.nip || '-'}</div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

        </div>
      </div>

      {/* Editor Modal */}
      <DocumentEditor
        isOpen={Boolean(editingSection)}
        sectionKey={editingSection}
        rpp={rpp}
        onClose={() => setEditingSection(null)}
        onSave={handleSaveEditedRpp}
        onRegenerateSection={onRegenerateSection}
      />

    </div>
  );
};
