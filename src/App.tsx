import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Dashboard } from './components/Dashboard';
import { RPPGenerator } from './components/RPPGenerator';
import { AdminDataModal } from './components/AdminDataModal';
import { GuideModal } from './components/GuideModal';
import { getAllRPPs, getLastActiveRPP, saveRPP, duplicateRPP, deleteRPP } from './services/storage';
import { getAllSubjects } from './data/subjects';
import { generateSmartDefaultRPP } from './services/generator';
import { SubjectItem, RPPData } from './types/rpp';
import { FolderKanban, PlusCircle, Sparkles, BookOpen, HeartHandshake, Trash2 } from 'lucide-react';

export default function App() {
  const [currentTab, setCurrentTab] = useState<'beranda' | 'generator' | 'dokumen' | 'panduan'>('beranda');
  const [rpps, setRpps] = useState<RPPData[]>([]);
  const [activeRpp, setActiveRpp] = useState<RPPData | null>(null);
  const [subjects, setSubjects] = useState<SubjectItem[]>([]);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isGuideOpen, setIsGuideOpen] = useState(false);

  // Initialize data on mount
  useEffect(() => {
    const loadedRpps = getAllRPPs();
    setRpps(loadedRpps);
    setActiveRpp(getLastActiveRPP());
    setSubjects(getAllSubjects());
  }, []);

  const refreshRPPList = () => {
    const updated = getAllRPPs();
    setRpps(updated);
  };

  const handleSelectRPP = (rpp: RPPData) => {
    setActiveRpp(rpp);
    setCurrentTab('generator');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNewRPP = () => {
    const fresh = generateSmartDefaultRPP({
      jenjang: 'MTs',
      kelas: 'VII',
      mataPelajaran: 'Al-Qur\'an Hadis',
      templateType: 'kbc_merdeka',
    });
    saveRPP(fresh);
    refreshRPPList();
    setActiveRpp(fresh);
    setCurrentTab('generator');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDuplicateRPP = (id: string) => {
    const duplicated = duplicateRPP(id);
    if (duplicated) {
      refreshRPPList();
      setActiveRpp(duplicated);
    }
  };

  const handleDeleteRPP = (id: string) => {
    if (confirm('Hapus dokumen RPP tersimpan ini?')) {
      const remaining = deleteRPP(id);
      setRpps(remaining);
      if (activeRpp?.id === id) {
        setActiveRpp(remaining[0] || null);
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      
      {/* Header */}
      <Header
        currentTab={currentTab}
        onSelectTab={setCurrentTab}
        onOpenAdmin={() => setIsAdminOpen(true)}
        savedCount={rpps.length}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        
        {/* TAB: BERANDA (DASHBOARD) */}
        {currentTab === 'beranda' && (
          <Dashboard
            rpps={rpps}
            onSelectRPP={handleSelectRPP}
            onNewRPP={handleNewRPP}
            onOpenGuide={() => setIsGuideOpen(true)}
            onOpenAdmin={() => setIsAdminOpen(true)}
            onDuplicateRPP={handleDuplicateRPP}
            onDeleteRPP={handleDeleteRPP}
            onGoToGenerator={() => setCurrentTab('generator')}
          />
        )}

        {/* TAB: GENERATOR RPP */}
        {currentTab === 'generator' && activeRpp && (
          <div>
            <RPPGenerator
              key={activeRpp.id}
              initialRpp={activeRpp}
              subjects={subjects}
              onOpenAddSubject={() => setIsAdminOpen(true)}
              onSaved={refreshRPPList}
            />
          </div>
        )}

        {/* TAB: DOKUMEN SAYA */}
        {currentTab === 'dokumen' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-4">
              <div>
                <h2 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
                  <FolderKanban className="w-6 h-6 text-emerald-600" />
                  Daftar Seluruh Dokumen RPP ({rpps.length})
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Semua administrasi pembelajaran tersimpan di memori peramban Anda.
                </p>
              </div>

              <button
                type="button"
                onClick={handleNewRPP}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-xs transition cursor-pointer"
              >
                <PlusCircle className="w-4 h-4" />
                <span>+ Buat RPP Baru</span>
              </button>
            </div>

            {/* Grid of Documents */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {rpps.map((doc) => (
                <div
                  key={doc.id}
                  onClick={() => handleSelectRPP(doc)}
                  className="p-5 bg-white rounded-2xl border border-slate-200/90 hover:border-emerald-400 hover:shadow-md transition cursor-pointer flex flex-col justify-between"
                >
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-emerald-100 text-emerald-800">
                        {doc.jenjang}
                      </span>
                      <span className="text-[10px] font-bold text-slate-400">
                        Kelas {doc.kelas} ({doc.fase})
                      </span>
                    </div>

                    <h3 className="font-bold text-sm text-slate-900 line-clamp-1 hover:text-emerald-700 transition">
                      {doc.mataPelajaran}
                    </h3>
                    <p className="text-xs font-semibold text-slate-700 line-clamp-1">
                      {doc.topik}
                    </p>
                    <p className="text-[11px] text-slate-500 line-clamp-2">
                      {doc.materi}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                    <span className="text-[10px] text-slate-400">
                      {new Date(doc.updatedAt).toLocaleDateString('id-ID')}
                    </span>
                    
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSelectRPP(doc);
                      }}
                      className="font-bold text-emerald-700 hover:underline"
                    >
                      Buka Dokumen →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB: PANDUAN */}
        {currentTab === 'panduan' && (
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
              <div className="flex items-center gap-3 border-b border-slate-200 pb-4">
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                  <BookOpen className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-lg sm:text-xl font-bold text-slate-900">
                    Panduan Lengkap Implementasi RPP Madrasah
                  </h2>
                  <p className="text-xs text-slate-500">
                    Sesuai Standar Kurikulum Merdeka (KMA 347/450) & Kurikulum Berbasis Cinta (KBC).
                  </p>
                </div>
              </div>

              <div className="space-y-4 text-xs text-slate-700 leading-relaxed">
                <h3 className="text-sm font-bold text-slate-900 text-emerald-800">
                  1. Filosofi Kurikulum Berbasis Cinta (KBC)
                </h3>
                <p>
                  Kurikulum Berbasis Cinta merupakan model kurikulum khas madrasah yang menekankan bahwa proses pendidikan harus berhulu dan bermuara pada kasih sayang. Ada 10 pilar nilai cinta yang diintegrasikan ke dalam tujuan pembelajaran, sintaks kegiatan inti, asesmen sikap (PPRA), dan refleksi.
                </p>

                <h3 className="text-sm font-bold text-slate-900 text-blue-800 pt-2">
                  2. Ketentuan Supervisi Akademik Guru Madrasah
                </h3>
                <p>
                  Dalam supervisi oleh Pengawas Madrasah atau Kepala Madrasah, RPP/Modul Ajar ditelaah berdasarkan:
                </p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Kesesuaian Tujuan Pembelajaran dengan Capaian Pembelajaran (CP) dan Fase.</li>
                  <li>Keberpihakan pembelajaran pada murid (student-centered) melalui model aktif (PBL, Discovery, Praktik).</li>
                  <li>Keberadaan diferensiasi konten, proses, dan produk sesuai kesiapan belajar murid.</li>
                  <li>Kelengkapan instrumen asesmen diagnostik, formatif, dan sumatif beserta kriteria keberhasilan.</li>
                  <li>Integrasi nilai Profil Pelajar Pancasila & Profil Pelajar Rahmatan Lil Alamin (P5RA) serta KBC.</li>
                </ul>

                <h3 className="text-sm font-bold text-slate-900 text-purple-800 pt-2">
                  3. Tata Cara Ekspor Word (.docx) & PDF
                </h3>
                <p>
                  Aplikasi ini menyediakan ekspor dokumen dalam format Microsoft Word (.docx) dengan format standar <strong>Times New Roman 12 pt, ukuran kertas A4, margin 1 inci, dan tabel bergaris rapi</strong>, sehingga dapat langsung dicetak atau diserahkan saat supervisi resmi.
                </p>
              </div>

              <div className="pt-4 border-t border-slate-200 flex justify-end">
                <button
                  type="button"
                  onClick={handleNewRPP}
                  className="px-5 py-2.5 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-xs transition"
                >
                  Mulai Buat RPP Baru →
                </button>
              </div>
            </div>
          </div>
        )}

      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white py-6 text-center text-xs text-slate-500 no-print">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <HeartHandshake className="w-4 h-4 text-emerald-600" />
            <span className="font-semibold text-slate-700">
              Generator Administrasi Guru Madrasah
            </span>
            <span>• Kurikulum Merdeka & Kurikulum Berbasis Cinta</span>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-slate-500 font-medium">
            <span>Dibuat Oleh Azhary Mardhani, S.Kom</span>
            <span className="hidden sm:inline text-slate-300">•</span>
            <span>MI • MTs • MA</span>
          </div>
        </div>
      </footer>

      {/* Admin / Data Master Modal */}
      <AdminDataModal
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        onSubjectsUpdated={(updated) => setSubjects(updated)}
        rpps={rpps}
        onDeleteRPP={handleDeleteRPP}
      />

      {/* Guide Modal */}
      <GuideModal
        isOpen={isGuideOpen}
        onClose={() => setIsGuideOpen(false)}
        onStartGenerator={() => {
          setIsGuideOpen(false);
          handleNewRPP();
        }}
      />

    </div>
  );
}
