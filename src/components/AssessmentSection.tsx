import React, { useState } from 'react';
import { ClipboardCheck, Sparkles, SlidersHorizontal, HelpCircle, Layers, CheckCircle2 } from 'lucide-react';
import { AssessmentSectionData, DifferentiationData, ReflectionData } from '../types/rpp';

interface AssessmentSectionProps {
  asesmen: AssessmentSectionData;
  onChangeAsesmen: (data: AssessmentSectionData) => void;
  diferensiasi: DifferentiationData;
  onChangeDiferensiasi: (data: DifferentiationData) => void;
  refleksi: ReflectionData;
  onChangeRefleksi: (data: ReflectionData) => void;
}

export const AssessmentSection: React.FC<AssessmentSectionProps> = ({
  asesmen,
  onChangeAsesmen,
  diferensiasi,
  onChangeDiferensiasi,
  refleksi,
  onChangeRefleksi,
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'asesmen' | 'diferensiasi' | 'refleksi'>('asesmen');

  const updateItem = (category: 'diagnostik' | 'formatif' | 'sumatif', field: string, value: string) => {
    onChangeAsesmen({
      ...asesmen,
      [category]: {
        ...asesmen[category],
        [field]: value,
      },
    });
  };

  const updateSikapRubrik = (index: number, value: string) => {
    const updated = [...(asesmen.sikap.rubrik || [])];
    updated[index] = value;
    onChangeAsesmen({
      ...asesmen,
      sikap: {
        ...asesmen.sikap,
        rubrik: updated,
      },
    });
  };

  const addSikapRubrik = () => {
    onChangeAsesmen({
      ...asesmen,
      sikap: {
        ...asesmen.sikap,
        rubrik: [...(asesmen.sikap.rubrik || []), 'Indikator sikap kasih sayang baru'],
      },
    });
  };

  const removeSikapRubrik = (index: number) => {
    const updated = (asesmen.sikap.rubrik || []).filter((_, i) => i !== index);
    onChangeAsesmen({
      ...asesmen,
      sikap: {
        ...asesmen.sikap,
        rubrik: updated,
      },
    });
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-5 sm:p-6 space-y-6">
      
      {/* Sub-tab Navigation */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 pb-3">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
            <ClipboardCheck className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900">
              ASESMEN, DIFERENSIASI & REFLEKSI
            </h3>
            <p className="text-xs text-slate-500">
              Kurikulum Merdeka berorientasi pada asesmen autentik dan kebutuhan belajar murid.
            </p>
          </div>
        </div>

        <div className="flex items-center p-1 bg-slate-100 rounded-xl text-xs font-semibold">
          <button
            type="button"
            onClick={() => setActiveSubTab('asesmen')}
            className={`px-3 py-1.5 rounded-lg transition ${
              activeSubTab === 'asesmen'
                ? 'bg-white text-blue-700 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            1. Asesmen Pembelajaran
          </button>
          <button
            type="button"
            onClick={() => setActiveSubTab('diferensiasi')}
            className={`px-3 py-1.5 rounded-lg transition ${
              activeSubTab === 'diferensiasi'
                ? 'bg-white text-blue-700 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            2. Diferensiasi & Remedial
          </button>
          <button
            type="button"
            onClick={() => setActiveSubTab('refleksi')}
            className={`px-3 py-1.5 rounded-lg transition ${
              activeSubTab === 'refleksi'
                ? 'bg-white text-blue-700 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            3. Refleksi Guru & Siswa
          </button>
        </div>
      </div>

      {/* 1. ASESMEN TAB */}
      {activeSubTab === 'asesmen' && (
        <div className="space-y-6">
          {/* Asesmen Diagnostik, Formatif, Sumatif */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            
            {/* Diagnostik */}
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-3">
              <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                <span className="text-xs font-extrabold uppercase text-slate-800">
                  Asesmen Diagnostik (Awal)
                </span>
                <span className="text-[10px] bg-slate-200 text-slate-700 font-bold px-1.5 py-0.5 rounded">
                  Non-Kognitif & Awal
                </span>
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1">Teknik & Bentuk</label>
                <input
                  type="text"
                  value={asesmen.diagnostik.teknik}
                  onChange={(e) => updateItem('diagnostik', 'teknik', e.target.value)}
                  placeholder="Mis: Tes Lisan, Kuesioner Emosi"
                  className="w-full text-xs bg-white border border-slate-300 rounded-lg p-2 focus:ring-1 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1">Instrumen</label>
                <input
                  type="text"
                  value={asesmen.diagnostik.instrumen}
                  onChange={(e) => updateItem('diagnostik', 'instrumen', e.target.value)}
                  placeholder="Lembar wawancara / kuis pemantik"
                  className="w-full text-xs bg-white border border-slate-300 rounded-lg p-2 focus:ring-1 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1">Indikator & Kriteria</label>
                <textarea
                  rows={2}
                  value={asesmen.diagnostik.indikator}
                  onChange={(e) => updateItem('diagnostik', 'indikator', e.target.value)}
                  placeholder="Mengetahui kesiapan dan minat belajar awal..."
                  className="w-full text-xs bg-white border border-slate-300 rounded-lg p-2 focus:ring-1 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Formatif */}
            <div className="bg-emerald-50/50 border border-emerald-200 rounded-xl p-4 space-y-3">
              <div className="flex items-center justify-between border-b border-emerald-200 pb-2">
                <span className="text-xs font-extrabold uppercase text-emerald-900">
                  Asesmen Formatif (Proses)
                </span>
                <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-1.5 py-0.5 rounded">
                  Saat Belajar
                </span>
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1">Teknik & Bentuk</label>
                <input
                  type="text"
                  value={asesmen.formatif.teknik}
                  onChange={(e) => updateItem('formatif', 'teknik', e.target.value)}
                  placeholder="Mis: Observasi Partisipasi, Diskusi LKPD"
                  className="w-full text-xs bg-white border border-slate-300 rounded-lg p-2 focus:ring-1 focus:ring-emerald-500"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1">Instrumen</label>
                <input
                  type="text"
                  value={asesmen.formatif.instrumen}
                  onChange={(e) => updateItem('formatif', 'instrumen', e.target.value)}
                  placeholder="Rubrik pengamatan dan umpan balik antarteman"
                  className="w-full text-xs bg-white border border-slate-300 rounded-lg p-2 focus:ring-1 focus:ring-emerald-500"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1">Kriteria Keberhasilan (KKTP)</label>
                <textarea
                  rows={2}
                  value={asesmen.formatif.kriteria}
                  onChange={(e) => updateItem('formatif', 'kriteria', e.target.value)}
                  placeholder="Mampu mempraktikkan minimal 80% alur tugas..."
                  className="w-full text-xs bg-white border border-slate-300 rounded-lg p-2 focus:ring-1 focus:ring-emerald-500"
                />
              </div>
            </div>

            {/* Sumatif */}
            <div className="bg-sky-50/50 border border-sky-200 rounded-xl p-4 space-y-3">
              <div className="flex items-center justify-between border-b border-sky-200 pb-2">
                <span className="text-xs font-extrabold uppercase text-sky-900">
                  Asesmen Sumatif (Akhir)
                </span>
                <span className="text-[10px] bg-sky-100 text-sky-800 font-bold px-1.5 py-0.5 rounded">
                  Ketercapaian TP
                </span>
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1">Teknik & Bentuk</label>
                <input
                  type="text"
                  value={asesmen.sumatif.teknik}
                  onChange={(e) => updateItem('sumatif', 'teknik', e.target.value)}
                  placeholder="Mis: Tes Tertulis HOTS / Produk Akhir"
                  className="w-full text-xs bg-white border border-slate-300 rounded-lg p-2 focus:ring-1 focus:ring-sky-500"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1">Instrumen</label>
                <input
                  type="text"
                  value={asesmen.sumatif.instrumen}
                  onChange={(e) => updateItem('sumatif', 'instrumen', e.target.value)}
                  placeholder="Naskah 5 soal uraian berbasis cerita/kasus"
                  className="w-full text-xs bg-white border border-slate-300 rounded-lg p-2 focus:ring-1 focus:ring-sky-500"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1">Kriteria Ketercapaian (KKTP)</label>
                <textarea
                  rows={2}
                  value={asesmen.sumatif.kriteria}
                  onChange={(e) => updateItem('sumatif', 'kriteria', e.target.value)}
                  placeholder="Mencapai nilai minimal KKTP 75 atau tuntas..."
                  className="w-full text-xs bg-white border border-slate-300 rounded-lg p-2 focus:ring-1 focus:ring-sky-500"
                />
              </div>
            </div>

          </div>

          {/* Asesmen Sikap, Pengetahuan, Keterampilan */}
          <div className="border-t border-slate-200 pt-4 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800">
              Asesmen 3 Aspek (Sikap KBC & PPRA, Pengetahuan, Keterampilan)
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              
              {/* Sikap / Karakter */}
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
                <span className="text-xs font-bold text-rose-700 flex items-center justify-between">
                  <span>Asesmen Sikap / Karakter</span>
                  <button
                    type="button"
                    onClick={addSikapRubrik}
                    className="text-[10px] text-blue-600 hover:underline cursor-pointer"
                  >
                    + Tambah Rubrik
                  </button>
                </span>
                <input
                  type="text"
                  value={asesmen.sikap.teknik}
                  onChange={(e) =>
                    onChangeAsesmen({
                      ...asesmen,
                      sikap: { ...asesmen.sikap, teknik: e.target.value },
                    })
                  }
                  placeholder="Teknik Penilaian Sikap"
                  className="w-full text-xs bg-white border border-slate-300 rounded p-1.5"
                />
                <div className="space-y-1.5 pt-1">
                  {(asesmen.sikap.rubrik || []).map((rub, i) => (
                    <div key={i} className="flex items-center gap-1.5">
                      <input
                        type="text"
                        value={rub}
                        onChange={(e) => updateSikapRubrik(i, e.target.value)}
                        className="flex-1 text-xs bg-white border border-slate-300 rounded p-1.5"
                      />
                      <button
                        type="button"
                        onClick={() => removeSikapRubrik(i)}
                        className="text-xs text-rose-500 hover:text-rose-700 px-1"
                        title="Hapus"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Pengetahuan */}
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
                <span className="text-xs font-bold text-indigo-700">Asesmen Pengetahuan</span>
                <input
                  type="text"
                  value={asesmen.pengetahuan.teknik}
                  onChange={(e) =>
                    onChangeAsesmen({
                      ...asesmen,
                      pengetahuan: { ...asesmen.pengetahuan, teknik: e.target.value },
                    })
                  }
                  placeholder="Teknik (Mis: Tes Tertulis, Penugasan)"
                  className="w-full text-xs bg-white border border-slate-300 rounded p-1.5"
                />
                <textarea
                  rows={3}
                  value={asesmen.pengetahuan.instrumen}
                  onChange={(e) =>
                    onChangeAsesmen({
                      ...asesmen,
                      pengetahuan: { ...asesmen.pengetahuan, instrumen: e.target.value },
                    })
                  }
                  placeholder="Instrumen dan bentuk soal..."
                  className="w-full text-xs bg-white border border-slate-300 rounded p-1.5"
                />
              </div>

              {/* Keterampilan */}
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
                <span className="text-xs font-bold text-teal-700">Asesmen Keterampilan</span>
                <input
                  type="text"
                  value={asesmen.keterampilan.teknik}
                  onChange={(e) =>
                    onChangeAsesmen({
                      ...asesmen,
                      keterampilan: { ...asesmen.keterampilan, teknik: e.target.value },
                    })
                  }
                  placeholder="Teknik (Mis: Praktik, Presentasi, Produk)"
                  className="w-full text-xs bg-white border border-slate-300 rounded p-1.5"
                />
                <textarea
                  rows={3}
                  value={asesmen.keterampilan.instrumen}
                  onChange={(e) =>
                    onChangeAsesmen({
                      ...asesmen,
                      keterampilan: { ...asesmen.keterampilan, instrumen: e.target.value },
                    })
                  }
                  placeholder="Rubrik penilaian kinerja / unjuk kerja..."
                  className="w-full text-xs bg-white border border-slate-300 rounded p-1.5"
                />
              </div>

            </div>
          </div>
        </div>
      )}

      {/* 2. DIFERENSIASI TAB */}
      {activeSubTab === 'diferensiasi' && (
        <div className="space-y-4">
          <div className="p-3 bg-blue-50/70 border border-blue-200 rounded-xl text-xs text-blue-900 leading-relaxed">
            <strong>Prinsip Diferensiasi Kurikulum Merdeka:</strong> Menyesuaikan konten (materi), proses (kegiatan berjenjang), dan produk (hasil unjuk kerja) sesuai kesiapan dan gaya belajar peserta didik tanpa menurunkan esensi kompetensi dasar.
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1">
                Diferensiasi Konten
              </label>
              <textarea
                rows={4}
                value={diferensiasi.konten}
                onChange={(e) => onChangeDiferensiasi({ ...diferensiasi, konten: e.target.value })}
                placeholder="Ragam sumber belajar: teks bergambar, video, bahan ajar analog..."
                className="w-full text-xs bg-slate-50 border border-slate-300 rounded-xl p-3 focus:bg-white focus:ring-1 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1">
                Diferensiasi Proses
              </label>
              <textarea
                rows={4}
                value={diferensiasi.proses}
                onChange={(e) => onChangeDiferensiasi({ ...diferensiasi, proses: e.target.value })}
                placeholder="Scaffolding bertingkat, bimbingan mandiri vs tutor sebaya..."
                className="w-full text-xs bg-slate-50 border border-slate-300 rounded-xl p-3 focus:bg-white focus:ring-1 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1">
                Diferensiasi Produk
              </label>
              <textarea
                rows={4}
                value={diferensiasi.produk}
                onChange={(e) => onChangeDiferensiasi({ ...diferensiasi, produk: e.target.value })}
                placeholder="Pilihan output: infografis, rekaman presentasi, laporan narasi..."
                className="w-full text-xs bg-slate-50 border border-slate-300 rounded-xl p-3 focus:bg-white focus:ring-1 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            <div>
              <label className="block text-xs font-bold text-amber-900 mb-1">
                Program Remedial
              </label>
              <textarea
                rows={3}
                value={diferensiasi.remedial}
                onChange={(e) => onChangeDiferensiasi({ ...diferensiasi, remedial: e.target.value })}
                placeholder="Bimbingan perorangan atau pemanfaatan tutor sebaya untuk indikator yang belum tuntas..."
                className="w-full text-xs bg-amber-50/40 border border-amber-200 rounded-xl p-3 focus:bg-white focus:ring-1 focus:ring-amber-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-emerald-900 mb-1">
                Program Pengayaan
              </label>
              <textarea
                rows={3}
                value={diferensiasi.pengayaan}
                onChange={(e) => onChangeDiferensiasi({ ...diferensiasi, pengayaan: e.target.value })}
                placeholder="Tantangan literasi analitis atau pemecahan masalah lanjutan yang bermakna..."
                className="w-full text-xs bg-emerald-50/40 border border-emerald-200 rounded-xl p-3 focus:bg-white focus:ring-1 focus:ring-emerald-500"
              />
            </div>
          </div>
        </div>
      )}

      {/* 3. REFLEKSI TAB */}
      {activeSubTab === 'refleksi' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            
            {/* Refleksi Guru */}
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
              <span className="text-xs font-bold text-slate-800">
                Pertanyaan Refleksi Guru
              </span>
              <p className="text-[11px] text-slate-500">
                Bahan evaluasi diri bagi guru setelah menuntaskan sesi pembelajaran.
              </p>
              {(refleksi.guru || []).map((q, idx) => (
                <div key={idx} className="flex items-start gap-2">
                  <span className="text-xs font-bold text-slate-500 mt-1.5">{idx + 1}.</span>
                  <input
                    type="text"
                    value={q}
                    onChange={(e) => {
                      const updated = [...refleksi.guru];
                      updated[idx] = e.target.value;
                      onChangeRefleksi({ ...refleksi, guru: updated });
                    }}
                    className="flex-1 text-xs bg-white border border-slate-300 rounded p-1.5"
                  />
                </div>
              ))}
            </div>

            {/* Refleksi Siswa */}
            <div className="bg-rose-50/40 p-4 rounded-xl border border-rose-200 space-y-2">
              <span className="text-xs font-bold text-rose-900">
                Pertanyaan Refleksi Peserta Didik (Nilai KBC)
              </span>
              <p className="text-[11px] text-rose-600">
                Membangun metakognisi dan penghayatan nilai cinta serta kasih sayang murid.
              </p>
              {(refleksi.siswa || []).map((q, idx) => (
                <div key={idx} className="flex items-start gap-2">
                  <span className="text-xs font-bold text-rose-500 mt-1.5">{idx + 1}.</span>
                  <input
                    type="text"
                    value={q}
                    onChange={(e) => {
                      const updated = [...refleksi.siswa];
                      updated[idx] = e.target.value;
                      onChangeRefleksi({ ...refleksi, siswa: updated });
                    }}
                    className="flex-1 text-xs bg-white border border-rose-200 rounded p-1.5"
                  />
                </div>
              ))}
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
