import React from 'react';
import { X, BookOpen, Heart, ShieldCheck, CheckCircle2, FileText, Sparkles, HelpCircle } from 'lucide-react';
import { KBC_VALUES } from '../data/kbc';

interface GuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  onStartGenerator: () => void;
}

export const GuideModal: React.FC<GuideModalProps> = ({
  isOpen,
  onClose,
  onStartGenerator,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-gradient-to-r from-emerald-50 via-teal-50 to-blue-50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-xs">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">
                PANDUAN ADMINISTRASI PEMBELAJARAN MADRASAH
              </h3>
              <p className="text-xs text-slate-600">
                Pedoman Implementasi Kurikulum Merdeka & Kurikulum Berbasis Cinta (KBC)
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 p-1.5 rounded-lg hover:bg-slate-200 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-xs text-slate-700 leading-relaxed">
          
          {/* Quick Flow */}
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
            <h4 className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-emerald-600" />
              Alur Cepat Pembuatan RPP:
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1 font-semibold text-slate-800">
              <div className="p-2.5 bg-white border border-slate-200 rounded-lg text-center">
                <span className="text-emerald-600 block text-[10px]">Langkah 1</span>
                Isi Identitas & Jenjang (MI/MTs/MA)
              </div>
              <div className="p-2.5 bg-white border border-slate-200 rounded-lg text-center">
                <span className="text-emerald-600 block text-[10px]">Langkah 2</span>
                Tentukan Komponen & Topik
              </div>
              <div className="p-2.5 bg-white border border-slate-200 rounded-lg text-center">
                <span className="text-emerald-600 block text-[10px]">Langkah 3</span>
                Pilih Nilai Cinta (KBC) & Asesmen
              </div>
              <div className="p-2.5 bg-white border border-slate-200 rounded-lg text-center">
                <span className="text-emerald-600 block text-[10px]">Langkah 4</span>
                Preview, Edit & Download Word/PDF
              </div>
            </div>
          </div>

          {/* Konsep Kurikulum Berbasis Cinta */}
          <div className="space-y-3">
            <h4 className="font-bold text-slate-900 text-sm flex items-center gap-1.5 text-rose-700">
              <Heart className="w-4 h-4 fill-rose-600 text-rose-600" />
              Mengenal Kurikulum Berbasis Cinta (KBC) di Madrasah
            </h4>
            <p>
              <strong>Kurikulum Berbasis Cinta (KBC)</strong> adalah paradigma pendidikan madrasah yang menempatkan rasa cinta, kasih sayang (rahmah), dan ketulusan sebagai pondasi utama proses belajar mengajar. Guru tidak hanya mentransfer pengetahuan kognitif, tetapi menyentuh hati sanubari murid dengan keteladanan akhlak.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
              {KBC_VALUES.map((v, i) => (
                <div key={v.id} className="p-2.5 bg-rose-50/40 border border-rose-100 rounded-lg">
                  <div className="font-bold text-rose-900">
                    {i + 1}. {v.title}
                  </div>
                  <div className="text-[11px] text-slate-600 mt-0.5">
                    {v.description}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Standar Supervisi */}
          <div className="p-4 bg-emerald-50/60 border border-emerald-200 rounded-xl space-y-2">
            <h4 className="font-bold text-emerald-950 text-sm flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-700" />
              Kesesuaian dengan Regulasi Kemenag & Supervisi
            </h4>
            <ul className="space-y-1.5 list-disc pl-5">
              <li>
                <strong>KMA Nomor 347 dan 450 Tahun 2024:</strong> Panduan Implementasi Kurikulum Merdeka pada Madrasah (RA, MI, MTs, MA, MAK).
              </li>
              <li>
                <strong>Fase Belajar Otomatis:</strong> MI (Fase A: Kelas 1-2, Fase B: Kelas 3-4, Fase C: Kelas 5-6), MTs (Fase D: Kelas 7-9), MA (Fase E: Kelas 10, Fase F: Kelas 11-12).
              </li>
              <li>
                <strong>Format Word (.docx):</strong> Dokumen yang diekspor menggunakan standar dokumen resmi: Font Times New Roman 12 pt, margin normal 1 inci, tabel dengan border, serta ruang tanda tangan Kepala Madrasah dan Guru Pengampu.
              </li>
            </ul>
          </div>

          {/* Tanya Jawab Singkat */}
          <div className="space-y-2">
            <h4 className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
              <HelpCircle className="w-4 h-4 text-blue-600" />
              Pertanyaan yang Sering Diajukan (FAQ)
            </h4>
            <div className="space-y-2">
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
                <span className="font-bold text-slate-800 block">Apakah saya harus membuat akun atau mendaftar?</span>
                <span className="text-slate-600">Tidak. Aplikasi ini dirancang 100% bebas login dan registrasi agar Bapak/Ibu guru dapat langsung bekerja tanpa hambatan.</span>
              </div>
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
                <span className="font-bold text-slate-800 block">Bagaimana jika kuota AI habis atau koneksi internet offline?</span>
                <span className="text-slate-600">Aplikasi memiliki mesin pembuat kurikulum cerdas internal (smart templates) yang tetap menghasilkan RPP berbobot tinggi sesuai mata pelajaran secara instan.</span>
              </div>
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-slate-200 bg-slate-50">
          <span className="text-[11px] text-slate-500 hidden sm:inline">
            Generator Administrasi Guru Madrasah • Versi 2025
          </span>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-100 transition"
            >
              Tutup
            </button>
            <button
              type="button"
              onClick={() => {
                onClose();
                onStartGenerator();
              }}
              className="px-5 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg shadow-xs transition"
            >
              Mulai Buat RPP Sekarang →
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
