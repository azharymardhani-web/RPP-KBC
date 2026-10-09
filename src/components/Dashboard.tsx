import React from 'react';
import { 
  Sparkles, 
  PlusCircle, 
  FileText, 
  Download, 
  HelpCircle, 
  Eye, 
  Layers, 
  BookOpen, 
  Trash2, 
  Copy, 
  ArrowRight,
  Heart,
  CheckCircle2,
  Calendar,
  School,
  Clock
} from 'lucide-react';
import { RPPData } from '../types/rpp';
import { exportRPPToDocx, downloadDocxFile } from '../services/docx';

interface DashboardProps {
  rpps: RPPData[];
  onSelectRPP: (rpp: RPPData) => void;
  onNewRPP: () => void;
  onOpenGuide: () => void;
  onOpenAdmin: () => void;
  onDuplicateRPP: (id: string) => void;
  onDeleteRPP: (id: string) => void;
  onGoToGenerator: () => void;
}

export const Dashboard: React.FC<DashboardProps> = ({
  rpps,
  onSelectRPP,
  onNewRPP,
  onOpenGuide,
  onOpenAdmin,
  onDuplicateRPP,
  onDeleteRPP,
  onGoToGenerator,
}) => {
  const distinctSubjects = new Set(rpps.map(r => r.mataPelajaran)).size;
  const distinctJenjang = new Set(rpps.map(r => r.jenjang)).size;
  const lastRPP = rpps[0] || null;

  const handleQuickDownloadDocx = async (rpp: RPPData, e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      const blob = await exportRPPToDocx(rpp);
      downloadDocxFile(blob, `${rpp.mataPelajaran}_Kelas_${rpp.kelas}_${rpp.jenjang}.docx`);
    } catch (err) {
      console.error(err);
      alert('Gagal mendownload Word');
    }
  };

  return (
    <div className="space-y-8 pb-12">
      
      {/* HERO SECTION / LANDING PAGE HEADLINE */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-teal-950 to-slate-900 text-white p-7 sm:p-12 shadow-xl border border-slate-800">
        
        {/* Glow backdrop circles */}
        <div className="absolute top-0 right-0 -mt-12 -mr-12 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 -mb-16 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-400/30 text-emerald-300 text-xs font-bold tracking-wide">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            <span>Kurikulum Merdeka • Kurikulum Berbasis Cinta (KBC)</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
            Administrasi Guru, <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-sky-400">Lebih Mudah.</span>
          </h1>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
            Generator RPP Kurikulum Merdeka dan Kurikulum Berbasis Cinta untuk membantu guru menyiapkan administrasi pembelajaran secara cepat, rapi, dan profesional.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={onNewRPP}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-xs sm:text-sm bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white shadow-lg hover:shadow-emerald-500/25 transition active:scale-95 cursor-pointer"
            >
              <PlusCircle className="w-4 h-4" />
              <span>+ BUAT RPP SEKARANG</span>
            </button>

            <button
              type="button"
              onClick={onOpenGuide}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl font-semibold text-xs sm:text-sm bg-white/10 hover:bg-white/15 text-slate-200 border border-white/20 transition cursor-pointer"
            >
              <BookOpen className="w-4 h-4 text-emerald-300" />
              <span>Pelajari Panduan</span>
            </button>
          </div>

          <div className="pt-3 border-t border-white/10 flex items-center gap-2 text-xs text-emerald-300/80 font-medium">
            <span>Dirancang untuk Guru • Madrasah (MI, MTs, MA) • Supervisi Pembelajaran</span>
          </div>
        </div>

      </section>

      {/* 4 MENU CARDS (SECTION 3 OF PROMPT) */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* BUAT RPP */}
        <div
          onClick={onNewRPP}
          className="group p-5 bg-white rounded-2xl border border-slate-200/90 shadow-xs hover:shadow-md hover:border-emerald-300 transition cursor-pointer flex flex-col justify-between"
        >
          <div className="space-y-3">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center group-hover:scale-105 transition-transform">
              <PlusCircle className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 group-hover:text-emerald-700 transition">
                BUAT RPP
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Membuat RPP baru sesuai mata pelajaran, jenjang, fase, dan nilai Kurikulum Berbasis Cinta.
              </p>
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center text-xs font-bold text-emerald-700 group-hover:translate-x-1 transition-transform">
            <span>Mulai Buat RPP</span>
            <ArrowRight className="w-3.5 h-3.5 ml-1" />
          </div>
        </div>

        {/* PREVIEW DOKUMEN */}
        <div
          onClick={() => {
            if (lastRPP) onSelectRPP(lastRPP);
            else onNewRPP();
          }}
          className="group p-5 bg-white rounded-2xl border border-slate-200/90 shadow-xs hover:shadow-md hover:border-blue-300 transition cursor-pointer flex flex-col justify-between"
        >
          <div className="space-y-3">
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center group-hover:scale-105 transition-transform">
              <Eye className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-700 transition">
                PREVIEW DOKUMEN
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Melihat lembar kerja dokumen A4 secara real-time sebelum dicetak atau diajukan supervisi.
              </p>
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center text-xs font-bold text-blue-700 group-hover:translate-x-1 transition-transform">
            <span>Buka Dokumen A4</span>
            <ArrowRight className="w-3.5 h-3.5 ml-1" />
          </div>
        </div>

        {/* DOWNLOAD */}
        <div
          onClick={() => {
            if (lastRPP) onSelectRPP(lastRPP);
            else onNewRPP();
          }}
          className="group p-5 bg-white rounded-2xl border border-slate-200/90 shadow-xs hover:shadow-md hover:border-purple-300 transition cursor-pointer flex flex-col justify-between"
        >
          <div className="space-y-3">
            <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center group-hover:scale-105 transition-transform">
              <Download className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 group-hover:text-purple-700 transition">
                DOWNLOAD
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Mengunduh dokumen format Microsoft Word (.DOCX) standar Times New Roman 12 pt dan PDF.
              </p>
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center text-xs font-bold text-purple-700 group-hover:translate-x-1 transition-transform">
            <span>Ekspor Word & PDF</span>
            <ArrowRight className="w-3.5 h-3.5 ml-1" />
          </div>
        </div>

        {/* PANDUAN */}
        <div
          onClick={onOpenGuide}
          className="group p-5 bg-white rounded-2xl border border-slate-200/90 shadow-xs hover:shadow-md hover:border-amber-300 transition cursor-pointer flex flex-col justify-between"
        >
          <div className="space-y-3">
            <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center group-hover:scale-105 transition-transform">
              <HelpCircle className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 group-hover:text-amber-700 transition">
                PANDUAN
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Petunjuk penggunaan aplikasi, 10 nilai Kurikulum Berbasis Cinta, serta regulasi supervisi Kemenag.
              </p>
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center text-xs font-bold text-amber-700 group-hover:translate-x-1 transition-transform">
            <span>Baca Pedoman</span>
            <ArrowRight className="w-3.5 h-3.5 ml-1" />
          </div>
        </div>

      </section>

      {/* STATISTIK SEDERHANA (SECTION 3 OF PROMPT) */}
      <section className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-5">
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-600 mb-4">
          Statistik Administrasi Guru
        </h4>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
            <div className="text-xs font-semibold text-slate-500">RPP Dibuat</div>
            <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">{rpps.length}</div>
            <div className="text-[11px] text-emerald-600 font-medium mt-1">Tersimpan di browser</div>
          </div>

          <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
            <div className="text-xs font-semibold text-slate-500">RPP Terakhir</div>
            <div className="text-xs sm:text-sm font-bold text-slate-900 mt-1.5 truncate">
              {lastRPP ? lastRPP.mataPelajaran : 'Belum ada'}
            </div>
            <div className="text-[11px] text-slate-500 mt-1 truncate">
              {lastRPP ? `Kelas ${lastRPP.kelas} (${lastRPP.jenjang})` : '-'}
            </div>
          </div>

          <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
            <div className="text-xs font-semibold text-slate-500">Mata Pelajaran</div>
            <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">{distinctSubjects}</div>
            <div className="text-[11px] text-slate-500 mt-1">Variasi mapel terdaftar</div>
          </div>

          <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
            <div className="text-xs font-semibold text-slate-500">Jenjang</div>
            <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">{distinctJenjang}</div>
            <div className="text-[11px] text-slate-500 mt-1">MI, MTs, dan MA</div>
          </div>
        </div>
      </section>

      {/* DOKUMEN SAYA / DRAFT TERAKHIR */}
      <section className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-5 sm:p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-3">
          <div>
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <FileText className="w-5 h-5 text-emerald-600" />
              Dokumen RPP Tersimpan (Draft & Final)
            </h3>
            <p className="text-xs text-slate-500">
              Dokumen tersimpan otomatis pada browser Anda. Anda dapat mengedit, menduplikasi, atau mengekspor kapan saja.
            </p>
          </div>

          <button
            type="button"
            onClick={onNewRPP}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg shadow-xs transition"
          >
            <PlusCircle className="w-3.5 h-3.5" />
            + Buat RPP Baru
          </button>
        </div>

        {rpps.length === 0 ? (
          <div className="text-center py-12 text-slate-400">
            <FileText className="w-12 h-12 mx-auto mb-2 opacity-30" />
            <p className="text-sm">Belum ada dokumen RPP tersimpan.</p>
            <button
              type="button"
              onClick={onNewRPP}
              className="mt-3 text-xs font-bold text-emerald-600 hover:underline"
            >
              Mulai buat RPP pertama sekarang
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {rpps.map((doc) => (
              <div
                key={doc.id}
                onClick={() => onSelectRPP(doc)}
                className="group p-4 bg-slate-50/70 hover:bg-white rounded-xl border border-slate-200 hover:border-emerald-300 hover:shadow-sm transition cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-1.5">
                      <span className="px-2 py-0.5 rounded text-[10px] font-extrabold bg-emerald-100 text-emerald-800">
                        {doc.jenjang}
                      </span>
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-200 text-slate-700">
                        Kelas {doc.kelas} ({doc.fase})
                      </span>
                    </div>

                    <span className="text-[10px] text-slate-400">
                      {new Date(doc.updatedAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' })}
                    </span>
                  </div>

                  <h4 className="font-bold text-sm text-slate-900 group-hover:text-emerald-700 transition mt-2">
                    {doc.mataPelajaran} — {doc.topik}
                  </h4>

                  <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                    {doc.materi}
                  </p>

                  <div className="flex flex-wrap items-center gap-2 mt-2 pt-2 border-t border-slate-100 text-[11px] text-slate-600">
                    <span className="inline-flex items-center gap-1">
                      <School className="w-3 h-3 text-slate-400" />
                      {doc.namaMadrasah}
                    </span>
                    <span>•</span>
                    <span className="inline-flex items-center gap-1 text-rose-600 font-medium">
                      <Heart className="w-3 h-3 fill-rose-500" />
                      {(doc.kbcValues || []).length} Nilai Cinta
                    </span>
                  </div>
                </div>

                  <div className="flex items-center justify-between gap-2 mt-4 pt-3 border-t border-slate-200/80">
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onDuplicateRPP(doc.id);
                      }}
                      className="p-1.5 text-slate-500 hover:text-slate-800 rounded hover:bg-slate-200 transition"
                      title="Duplikat Dokumen"
                    >
                      <Copy className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={(e) => handleQuickDownloadDocx(doc, e)}
                      className="inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-semibold text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-lg border border-blue-200 transition"
                      title="Download DOCX"
                    >
                      <Download className="w-3 h-3" />
                      <span>Word</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => onSelectRPP(doc)}
                      className="inline-flex items-center gap-1 px-3 py-1 text-[11px] font-bold text-white bg-slate-900 hover:bg-slate-800 rounded-lg shadow-xs transition"
                    >
                      <span>Buka & Edit</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>

              </div>
            ))}
          </div>
        )}
      </section>

    </div>
  );
};
