import React from 'react';
import { Heart, Check, Sparkles, BookHeart, Info, CheckSquare, Square } from 'lucide-react';
import { KBC_VALUES } from '../data/kbc';

interface KBCSectionProps {
  selectedValues: string[];
  onChangeSelected: (values: string[]) => void;
  karakter: string;
  onChangeKarakter: (val: string) => void;
  implementasi: string;
  onChangeImplementasi: (val: string) => void;
  contohPerilaku: string;
  onChangeContohPerilaku: (val: string) => void;
  refleksi: string;
  onChangeRefleksi: (val: string) => void;
  onAutoSyncWithSelected?: () => void;
}

export const KBCSection: React.FC<KBCSectionProps> = ({
  selectedValues,
  onChangeSelected,
  karakter,
  onChangeKarakter,
  implementasi,
  onChangeImplementasi,
  contohPerilaku,
  onChangeContohPerilaku,
  refleksi,
  onChangeRefleksi,
  onAutoSyncWithSelected,
}) => {
  const toggleValue = (id: string) => {
    if (selectedValues.includes(id)) {
      onChangeSelected(selectedValues.filter(v => v !== id));
    } else {
      onChangeSelected([...selectedValues, id]);
    }
  };

  const handleSelectAll = () => {
    onChangeSelected(KBC_VALUES.map(v => v.id));
  };

  const handleSelectDefault = () => {
    onChangeSelected(['kbc-allah', 'kbc-ilmu', 'kbc-sesama', 'kbc-kebersamaan']);
  };

  const handleSelectSpiritual = () => {
    onChangeSelected(['kbc-allah', 'kbc-rasul', 'kbc-ilmu']);
  };

  const handleSelectSocial = () => {
    onChangeSelected(['kbc-sesama', 'kbc-lingkungan', 'kbc-bangsa', 'kbc-kebersamaan', 'kbc-perdamaian', 'kbc-kemanusiaan']);
  };

  return (
    <div className="bg-white rounded-2xl border border-rose-100 shadow-xs p-5 sm:p-6 space-y-6">
      
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-rose-100 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-rose-500 to-pink-500 flex items-center justify-center text-white shadow-xs">
            <Heart className="w-5 h-5 fill-white/80" />
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
              INTEGRASI KURIKULUM BERBASIS CINTA (KBC)
              <span className="text-xs px-2 py-0.5 rounded-full bg-rose-100 text-rose-700 font-semibold border border-rose-200">
                Khas Madrasah
              </span>
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Menghubungkan materi ajar dengan 10 pilar cinta untuk menumbuhkan adab, empati, dan spiritualitas peserta didik.
            </p>
          </div>
        </div>

        {/* Preset Buttons */}
        <div className="flex flex-wrap items-center gap-1.5 text-xs">
          <button
            type="button"
            onClick={handleSelectDefault}
            className="px-2.5 py-1 text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-md font-medium transition cursor-pointer"
          >
            Standar (4)
          </button>
          <button
            type="button"
            onClick={handleSelectSpiritual}
            className="px-2.5 py-1 text-emerald-700 bg-emerald-50 hover:bg-emerald-100 rounded-md font-medium transition cursor-pointer"
          >
            Spiritual
          </button>
          <button
            type="button"
            onClick={handleSelectSocial}
            className="px-2.5 py-1 text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-md font-medium transition cursor-pointer"
          >
            Sosial-Humanis
          </button>
          <button
            type="button"
            onClick={handleSelectAll}
            className="px-2.5 py-1 text-rose-700 bg-rose-50 hover:bg-rose-100 rounded-md font-medium transition cursor-pointer"
          >
            Pilih Semua (10)
          </button>
        </div>
      </div>

      {/* 10 Checkboxes Grid */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
            <span>Pilih Nilai Cinta yang Dikembangkan</span>
            <span className="text-[11px] font-normal text-rose-600">
              ({selectedValues.length} dipilih)
            </span>
          </label>
          {onAutoSyncWithSelected && (
            <button
              type="button"
              onClick={onAutoSyncWithSelected}
              className="text-xs text-teal-600 hover:text-teal-700 font-semibold inline-flex items-center gap-1 hover:underline cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5" />
              Sesuaikan Narasi KBC Otomatis
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-2.5">
          {KBC_VALUES.map((item) => {
            const isChecked = selectedValues.includes(item.id);
            return (
              <div
                key={item.id}
                onClick={() => toggleValue(item.id)}
                className={`flex items-start gap-3 p-3 rounded-xl border text-left cursor-pointer transition select-none ${
                  isChecked
                    ? 'border-rose-300 bg-rose-50/60 shadow-xs'
                    : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50/60'
                }`}
              >
                <div className="mt-0.5">
                  {isChecked ? (
                    <div className="w-5 h-5 rounded-md bg-rose-500 text-white flex items-center justify-center shadow-xs">
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </div>
                  ) : (
                    <div className="w-5 h-5 rounded-md border-2 border-slate-300 bg-white" />
                  )}
                </div>
                <div className="flex-1">
                  <div className="text-xs font-bold text-slate-900">
                    {item.title}
                  </div>
                  <div className="text-[11px] text-slate-500 leading-relaxed mt-0.5 line-clamp-2">
                    {item.description}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Narrative Fields for Deep Context */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1.5">
            Nilai Karakter yang Dikembangkan
          </label>
          <textarea
            rows={2}
            value={karakter}
            onChange={(e) => onChangeKarakter(e.target.value)}
            placeholder="Contoh: Ketaatan spiritual, kejujuran, empati antarsesama, tanggung jawab moral..."
            className="w-full text-xs text-slate-800 bg-slate-50 border border-slate-200 rounded-xl p-3 focus:bg-white focus:outline-none focus:ring-2 focus:ring-rose-400 focus:border-rose-400 transition"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1.5">
            Implementasi KBC dalam Pembelajaran
          </label>
          <textarea
            rows={2}
            value={implementasi}
            onChange={(e) => onChangeImplementasi(e.target.value)}
            placeholder="Bagaimana guru dan siswa mengimplementasikannya dalam kegiatan belajar..."
            className="w-full text-xs text-slate-800 bg-slate-50 border border-slate-200 rounded-xl p-3 focus:bg-white focus:outline-none focus:ring-2 focus:ring-rose-400 focus:border-rose-400 transition"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1.5">
            Contoh Perilaku Peserta Didik di Kelas
          </label>
          <textarea
            rows={2}
            value={contohPerilaku}
            onChange={(e) => onChangeContohPerilaku(e.target.value)}
            placeholder="Tindakan konkret: saling menyapa dengan santun, membimbing kawan yang kesulitan..."
            className="w-full text-xs text-slate-800 bg-slate-50 border border-slate-200 rounded-xl p-3 focus:bg-white focus:outline-none focus:ring-2 focus:ring-rose-400 focus:border-rose-400 transition"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1.5">
            Refleksi Nilai Cinta
          </label>
          <textarea
            rows={2}
            value={refleksi}
            onChange={(e) => onChangeRefleksi(e.target.value)}
            placeholder="Pertanyaan atau renungan batin peserta didik mengenai nilai cinta yang dipetik..."
            className="w-full text-xs text-slate-800 bg-slate-50 border border-slate-200 rounded-xl p-3 focus:bg-white focus:outline-none focus:ring-2 focus:ring-rose-400 focus:border-rose-400 transition"
          />
        </div>
      </div>

      {/* Helpful Hint */}
      <div className="flex items-start gap-2.5 p-3 rounded-xl bg-amber-50/70 border border-amber-200/80 text-amber-900 text-xs">
        <Info className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
        <div className="leading-relaxed">
          <strong className="font-semibold">Catatan Supervisi:</strong> Sistem memastikan nilai KBC tidak hanya sekadar label, melainkan terpatri nyata dalam kegiatan apersepsi, kerja kelompok (tutor sebaya), kriteria penilaian sikap, serta doa dan penutup pembelajaran.
        </div>
      </div>

    </div>
  );
};
