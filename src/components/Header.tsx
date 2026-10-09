import React from 'react';
import { BookOpen, Sparkles, FolderKanban, HelpCircle, PlusCircle, Settings2, ShieldCheck, HeartHandshake, Lock } from 'lucide-react';

interface HeaderProps {
  currentTab: 'beranda' | 'generator' | 'dokumen' | 'panduan';
  onSelectTab: (tab: 'beranda' | 'generator' | 'dokumen' | 'panduan') => void;
  onOpenAdmin: () => void;
  savedCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  onSelectTab,
  onOpenAdmin,
  savedCount,
}) => {
  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs no-print">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">
          
          {/* Logo & Brand */}
          <div 
            onClick={() => onSelectTab('beranda')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 via-teal-600 to-sky-600 p-0.5 shadow-sm group-hover:shadow-md transition">
              <div className="w-full h-full bg-white rounded-[10px] flex items-center justify-center">
                <HeartHandshake className="w-5 h-5 text-emerald-600 group-hover:scale-110 transition-transform" />
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-slate-900 tracking-tight text-base sm:text-lg leading-tight">
                  GENERATOR ADMINISTRASI <span className="text-emerald-600">GURU MADRASAH</span>
                </span>
                <span className="hidden lg:inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-100/80 text-emerald-800 border border-emerald-200">
                  <ShieldCheck className="w-3 h-3 text-emerald-700" />
                  KMA 347 / 450
                </span>
              </div>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="text-xs font-semibold text-teal-700">
                  RPP Kurikulum Merdeka
                </span>
                <span className="text-xs text-slate-300">•</span>
                <span className="text-xs font-medium text-emerald-700 bg-emerald-50 px-1.5 py-0.2 rounded border border-emerald-100">
                  Kurikulum Berbasis Cinta
                </span>
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-1">
            <button
              type="button"
              onClick={() => onSelectTab('beranda')}
              className={`px-3.5 py-2 rounded-lg text-xs font-semibold transition ${
                currentTab === 'beranda'
                  ? 'bg-slate-100 text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              Beranda
            </button>
            <button
              type="button"
              onClick={() => onSelectTab('generator')}
              className={`px-3.5 py-2 rounded-lg text-xs font-semibold inline-flex items-center gap-1.5 transition ${
                currentTab === 'generator'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              Generator RPP
            </button>
            <button
              type="button"
              onClick={() => onSelectTab('dokumen')}
              className={`px-3.5 py-2 rounded-lg text-xs font-semibold inline-flex items-center gap-1.5 transition ${
                currentTab === 'dokumen'
                  ? 'bg-slate-100 text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <FolderKanban className="w-3.5 h-3.5" />
              Dokumen Saya
              {savedCount > 0 && (
                <span className="ml-1 px-1.5 py-0.2 rounded-full text-[10px] font-bold bg-slate-200 text-slate-700">
                  {savedCount}
                </span>
              )}
            </button>
            <button
              type="button"
              onClick={() => onSelectTab('panduan')}
              className={`px-3.5 py-2 rounded-lg text-xs font-semibold inline-flex items-center gap-1.5 transition ${
                currentTab === 'panduan'
                  ? 'bg-slate-100 text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <HelpCircle className="w-3.5 h-3.5" />
              Panduan
            </button>
          </nav>

          {/* Action / Admin Button */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onOpenAdmin}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-700 hover:text-slate-900 bg-slate-50 hover:bg-slate-100 rounded-lg border border-slate-200/90 transition cursor-pointer"
              title="Kelola Master Mata Pelajaran & Kurikulum (Akses Terbatas)"
            >
              <Settings2 className="w-3.5 h-3.5 text-slate-500" />
              <span className="hidden sm:inline">Data Madrasah</span>
              <Lock className="w-3 h-3 text-amber-600" />
            </button>

            <button
              type="button"
              onClick={() => onSelectTab('generator')}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 rounded-lg shadow-xs hover:shadow transition active:scale-95 cursor-pointer"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">+ Buat RPP</span>
              <span className="sm:hidden">Buat RPP</span>
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Subnav */}
      <div className="md:hidden flex items-center justify-around border-t border-slate-200/80 bg-slate-50/80 py-2 px-2 text-xs font-semibold">
        <button
          type="button"
          onClick={() => onSelectTab('beranda')}
          className={`py-1 px-2.5 rounded-md ${currentTab === 'beranda' ? 'bg-white text-emerald-700 font-bold shadow-xs' : 'text-slate-600'}`}
        >
          Beranda
        </button>
        <button
          type="button"
          onClick={() => onSelectTab('generator')}
          className={`py-1 px-2.5 rounded-md ${currentTab === 'generator' ? 'bg-emerald-600 text-white font-bold shadow-xs' : 'text-slate-600'}`}
        >
          ✨ Generator
        </button>
        <button
          type="button"
          onClick={() => onSelectTab('dokumen')}
          className={`py-1 px-2.5 rounded-md ${currentTab === 'dokumen' ? 'bg-white text-emerald-700 font-bold shadow-xs' : 'text-slate-600'}`}
        >
          📁 Dokumen ({savedCount})
        </button>
        <button
          type="button"
          onClick={() => onSelectTab('panduan')}
          className={`py-1 px-2.5 rounded-md ${currentTab === 'panduan' ? 'bg-white text-emerald-700 font-bold shadow-xs' : 'text-slate-600'}`}
        >
          📖 Panduan
        </button>
      </div>
    </header>
  );
};
