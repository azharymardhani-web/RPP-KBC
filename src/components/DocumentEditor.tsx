import React, { useState } from 'react';
import { X, Check, Sparkles, RefreshCw, Trash2, Edit3 } from 'lucide-react';
import { RPPData } from '../types/rpp';

interface DocumentEditorProps {
  isOpen: boolean;
  sectionKey: string | null;
  rpp: RPPData;
  onClose: () => void;
  onSave: (updatedRpp: RPPData) => void;
  onRegenerateSection?: (sectionKey: string) => void;
}

export const DocumentEditor: React.FC<DocumentEditorProps> = ({
  isOpen,
  sectionKey,
  rpp,
  onClose,
  onSave,
  onRegenerateSection,
}) => {
  if (!isOpen || !sectionKey) return null;

  const [formData, setFormData] = useState<RPPData>(rpp);

  const getSectionTitle = (key: string): string => {
    switch (key) {
      case 'identitas':
        return 'A. Identitas Pembelajaran & Madrasah';
      case 'kompetensiAwal':
        return 'B. Kompetensi Awal (Prasyarat)';
      case 'tujuanPembelajaran':
        return 'C. Tujuan Pembelajaran';
      case 'pemahamanBermakna':
        return 'D. Pemahaman Bermakna';
      case 'pertanyaanPemantik':
        return 'E. Pertanyaan Pemantik';
      case 'materi':
        return 'F. Materi Pembelajaran';
      case 'kbc':
        return 'G. Integrasi Kurikulum Berbasis Cinta (KBC)';
      case 'langkah':
        return 'H. Kegiatan Pembelajaran (Pendahuluan, Inti, Penutup)';
      case 'asesmen':
        return 'I. Asesmen Pembelajaran';
      case 'diferensiasi':
        return 'J & K. Diferensiasi, Remedial & Pengayaan';
      case 'refleksi':
        return 'L. Refleksi Guru & Peserta Didik';
      case 'sumber':
        return 'M. Sumber & Media Belajar';
      case 'ttd':
        return 'Penandatanganan (Kepala Madrasah & Guru)';
      default:
        return 'Edit Bagian Dokumen';
    }
  };

  const handleSave = () => {
    onSave(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-slate-50/80">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center">
              <Edit3 className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">
                {getSectionTitle(sectionKey)}
              </h3>
              <p className="text-[11px] text-slate-500">
                Edit langsung konten bagian ini tanpa merombak bagian lainnya.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {onRegenerateSection && (
              <button
                type="button"
                onClick={() => onRegenerateSection(sectionKey)}
                className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-semibold text-teal-700 bg-teal-50 hover:bg-teal-100 rounded-lg border border-teal-200 transition"
                title="Regenerate bagian ini dengan AI"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Regenerasi Bagian</span>
              </button>
            )}
            <button
              type="button"
              onClick={onClose}
              className="text-slate-400 hover:text-slate-600 p-1.5 rounded-lg hover:bg-slate-200 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-4 flex-1 text-xs">
          
          {sectionKey === 'kompetensiAwal' && (
            <div>
              <label className="block font-bold text-slate-700 mb-1.5">
                Kompetensi Awal (Prasyarat Siswa)
              </label>
              <textarea
                rows={4}
                value={formData.kompetensiAwal}
                onChange={(e) => setFormData({ ...formData, kompetensiAwal: e.target.value })}
                className="w-full text-xs bg-slate-50 border border-slate-300 rounded-xl p-3 focus:bg-white focus:ring-2 focus:ring-blue-500"
              />
            </div>
          )}

          {sectionKey === 'pemahamanBermakna' && (
            <div>
              <label className="block font-bold text-slate-700 mb-1.5">
                Pemahaman Bermakna (Deep Understanding)
              </label>
              <textarea
                rows={4}
                value={formData.pemahamanBermakna}
                onChange={(e) => setFormData({ ...formData, pemahamanBermakna: e.target.value })}
                className="w-full text-xs bg-slate-50 border border-slate-300 rounded-xl p-3 focus:bg-white focus:ring-2 focus:ring-blue-500"
              />
            </div>
          )}

          {sectionKey === 'tujuanPembelajaran' && (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="font-bold text-slate-700">Daftar Tujuan Pembelajaran</label>
                <button
                  type="button"
                  onClick={() =>
                    setFormData({
                      ...formData,
                      tujuanPembelajaran: [...formData.tujuanPembelajaran, 'Tujuan pembelajaran baru'],
                    })
                  }
                  className="text-blue-600 hover:underline font-semibold"
                >
                  + Tambah Tujuan
                </button>
              </div>
              {formData.tujuanPembelajaran.map((tp, idx) => (
                <div key={idx} className="flex items-start gap-2">
                  <span className="font-bold text-slate-500 mt-2">{idx + 1}.</span>
                  <textarea
                    rows={2}
                    value={tp}
                    onChange={(e) => {
                      const updated = [...formData.tujuanPembelajaran];
                      updated[idx] = e.target.value;
                      setFormData({ ...formData, tujuanPembelajaran: updated });
                    }}
                    className="flex-1 text-xs bg-slate-50 border border-slate-300 rounded-xl p-2.5 focus:bg-white"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      const updated = formData.tujuanPembelajaran.filter((_, i) => i !== idx);
                      setFormData({ ...formData, tujuanPembelajaran: updated });
                    }}
                    className="text-rose-500 hover:text-rose-700 p-2"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}

          {sectionKey === 'pertanyaanPemantik' && (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="font-bold text-slate-700">Pertanyaan Pemantik</label>
                <button
                  type="button"
                  onClick={() =>
                    setFormData({
                      ...formData,
                      pertanyaanPemantik: [...formData.pertanyaanPemantik, 'Pertanyaan pemantik baru'],
                    })
                  }
                  className="text-blue-600 hover:underline font-semibold"
                >
                  + Tambah Pertanyaan
                </button>
              </div>
              {formData.pertanyaanPemantik.map((pp, idx) => (
                <div key={idx} className="flex items-start gap-2">
                  <span className="font-bold text-slate-500 mt-2">{idx + 1}.</span>
                  <input
                    type="text"
                    value={pp}
                    onChange={(e) => {
                      const updated = [...formData.pertanyaanPemantik];
                      updated[idx] = e.target.value;
                      setFormData({ ...formData, pertanyaanPemantik: updated });
                    }}
                    className="flex-1 text-xs bg-slate-50 border border-slate-300 rounded-xl p-2.5 focus:bg-white"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      const updated = formData.pertanyaanPemantik.filter((_, i) => i !== idx);
                      setFormData({ ...formData, pertanyaanPemantik: updated });
                    }}
                    className="text-rose-500 hover:text-rose-700 p-2"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}

          {sectionKey === 'materi' && (
            <div>
              <label className="block font-bold text-slate-700 mb-1.5">
                Uraian Materi Pembelajaran
              </label>
              <textarea
                rows={5}
                value={formData.materi}
                onChange={(e) => setFormData({ ...formData, materi: e.target.value })}
                className="w-full text-xs bg-slate-50 border border-slate-300 rounded-xl p-3 focus:bg-white"
              />
            </div>
          )}

          {sectionKey === 'kbc' && (
            <div className="space-y-3">
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Karakter Peserta Didik yang Dikembangkan
                </label>
                <textarea
                  rows={2}
                  value={formData.kbcKarakter}
                  onChange={(e) => setFormData({ ...formData, kbcKarakter: e.target.value })}
                  className="w-full text-xs bg-slate-50 border border-slate-300 rounded-lg p-2.5"
                />
              </div>
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Implementasi dalam Pembelajaran
                </label>
                <textarea
                  rows={2}
                  value={formData.kbcImplementasi}
                  onChange={(e) => setFormData({ ...formData, kbcImplementasi: e.target.value })}
                  className="w-full text-xs bg-slate-50 border border-slate-300 rounded-lg p-2.5"
                />
              </div>
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Contoh Perilaku Peserta Didik
                </label>
                <textarea
                  rows={2}
                  value={formData.kbcContohPerilaku}
                  onChange={(e) => setFormData({ ...formData, kbcContohPerilaku: e.target.value })}
                  className="w-full text-xs bg-slate-50 border border-slate-300 rounded-lg p-2.5"
                />
              </div>
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Refleksi Nilai Cinta
                </label>
                <textarea
                  rows={2}
                  value={formData.kbcRefleksi}
                  onChange={(e) => setFormData({ ...formData, kbcRefleksi: e.target.value })}
                  className="w-full text-xs bg-slate-50 border border-slate-300 rounded-lg p-2.5"
                />
              </div>
            </div>
          )}

          {sectionKey === 'langkah' && (
            <div className="space-y-4">
              <div>
                <label className="block font-bold text-emerald-800 mb-1">
                  Kegiatan Pendahuluan ({formData.langkahPembelajaran?.pendahuluan?.durasi})
                </label>
                <div className="space-y-1.5">
                  {(formData.langkahPembelajaran?.pendahuluan?.kegiatan || []).map((k, i) => (
                    <div key={i} className="flex items-center gap-1.5">
                      <input
                        type="text"
                        value={k}
                        onChange={(e) => {
                          const updated = [...formData.langkahPembelajaran.pendahuluan.kegiatan];
                          updated[i] = e.target.value;
                          setFormData({
                            ...formData,
                            langkahPembelajaran: {
                              ...formData.langkahPembelajaran,
                              pendahuluan: { ...formData.langkahPembelajaran.pendahuluan, kegiatan: updated },
                            },
                          });
                        }}
                        className="flex-1 text-xs bg-slate-50 border border-slate-300 rounded p-1.5"
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <label className="block font-bold text-blue-800 mb-1">
                  Kegiatan Inti ({formData.langkahPembelajaran?.inti?.durasi}) - {formData.langkahPembelajaran?.inti?.sintaks}
                </label>
                <div className="space-y-1.5">
                  {(formData.langkahPembelajaran?.inti?.kegiatan || []).map((k, i) => (
                    <div key={i} className="flex items-center gap-1.5">
                      <input
                        type="text"
                        value={k}
                        onChange={(e) => {
                          const updated = [...formData.langkahPembelajaran.inti.kegiatan];
                          updated[i] = e.target.value;
                          setFormData({
                            ...formData,
                            langkahPembelajaran: {
                              ...formData.langkahPembelajaran,
                              inti: { ...formData.langkahPembelajaran.inti, kegiatan: updated },
                            },
                          });
                        }}
                        className="flex-1 text-xs bg-slate-50 border border-slate-300 rounded p-1.5"
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <label className="block font-bold text-purple-800 mb-1">
                  Kegiatan Penutup ({formData.langkahPembelajaran?.penutup?.durasi})
                </label>
                <div className="space-y-1.5">
                  {(formData.langkahPembelajaran?.penutup?.kegiatan || []).map((k, i) => (
                    <div key={i} className="flex items-center gap-1.5">
                      <input
                        type="text"
                        value={k}
                        onChange={(e) => {
                          const updated = [...formData.langkahPembelajaran.penutup.kegiatan];
                          updated[i] = e.target.value;
                          setFormData({
                            ...formData,
                            langkahPembelajaran: {
                              ...formData.langkahPembelajaran,
                              penutup: { ...formData.langkahPembelajaran.penutup, kegiatan: updated },
                            },
                          });
                        }}
                        className="flex-1 text-xs bg-slate-50 border border-slate-300 rounded p-1.5"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {sectionKey === 'ttd' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Tempat & Tanggal Pengesahan</label>
                <input
                  type="text"
                  value={formData.tempatTanggal}
                  onChange={(e) => setFormData({ ...formData, tempatTanggal: e.target.value })}
                  className="w-full text-xs bg-slate-50 border border-slate-300 rounded-lg p-2.5"
                />
              </div>
              <div>
                <label className="block font-bold text-slate-700 mb-1">Nama Kepala Madrasah</label>
                <input
                  type="text"
                  value={formData.namaKepalaMadrasah}
                  onChange={(e) => setFormData({ ...formData, namaKepalaMadrasah: e.target.value })}
                  className="w-full text-xs bg-slate-50 border border-slate-300 rounded-lg p-2.5"
                />
              </div>
              <div>
                <label className="block font-bold text-slate-700 mb-1">NIP Kepala Madrasah</label>
                <input
                  type="text"
                  value={formData.nipKepalaMadrasah}
                  onChange={(e) => setFormData({ ...formData, nipKepalaMadrasah: e.target.value })}
                  className="w-full text-xs bg-slate-50 border border-slate-300 rounded-lg p-2.5"
                />
              </div>
              <div>
                <label className="block font-bold text-slate-700 mb-1">NIP Guru Pengampu</label>
                <input
                  type="text"
                  value={formData.nip}
                  onChange={(e) => setFormData({ ...formData, nip: e.target.value })}
                  className="w-full text-xs bg-slate-50 border border-slate-300 rounded-lg p-2.5"
                />
              </div>
            </div>
          )}

        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-slate-200 bg-slate-50">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800 rounded-lg border border-slate-300 bg-white hover:bg-slate-100 transition"
          >
            Batal
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="inline-flex items-center gap-1.5 px-5 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-xs transition"
          >
            <Check className="w-4 h-4" />
            Simpan Perubahan
          </button>
        </div>

      </div>
    </div>
  );
};
