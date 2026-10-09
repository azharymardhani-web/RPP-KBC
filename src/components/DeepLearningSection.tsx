import React from 'react';
import { Brain, Sparkles, Smile, Compass, Target } from 'lucide-react';
import { DeepLearningData } from '../types/rpp';

interface DeepLearningSectionProps {
  deepLearning: DeepLearningData;
  onChange: (data: DeepLearningData) => void;
}

export const DeepLearningSection: React.FC<DeepLearningSectionProps> = ({
  deepLearning,
  onChange,
}) => {
  return (
    <div className="bg-white rounded-2xl border border-indigo-100 shadow-xs p-5 sm:p-6 space-y-6">
      
      {/* Header Banner */}
      <div className="flex items-center gap-3 border-b border-indigo-100 pb-4">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center text-white shadow-xs">
          <Brain className="w-5 h-5" />
        </div>
        <div>
          <h3 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
            PENDEKATAN DEEP LEARNING (3 PILAR UTAMA)
            <span className="text-xs px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-800 font-semibold border border-indigo-200">
              Kurikulum Merdeka Lanjutan
            </span>
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Penerapan kerangka berpikir Deep Learning: Mindful Learning (Berkesadaran), Meaningful Learning (Bermakna), dan Joyful Learning (Menyenangkan).
          </p>
        </div>
      </div>

      {/* 3 Pillars Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        
        {/* Mindful Learning */}
        <div className="bg-indigo-50/50 border border-indigo-200 rounded-xl p-4 space-y-2.5 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="w-7 h-7 rounded-lg bg-indigo-600 text-white flex items-center justify-center font-bold text-xs">
                1
              </span>
              <h4 className="font-bold text-indigo-950 text-xs uppercase tracking-wide">
                Mindful Learning (Berkesadaran)
              </h4>
            </div>
            <p className="text-[11px] text-slate-600">
              Melatih kehadiran utuh (mindfulness), konsentrasi mental, dan kesadaran spiritual siswa saat mulai menerima ilmu.
            </p>
          </div>
          <textarea
            rows={3}
            value={deepLearning.mindfulLearning}
            onChange={(e) => onChange({ ...deepLearning, mindfulLearning: e.target.value })}
            placeholder="Strategi membangun fokus dan kesadaran penuh..."
            className="w-full text-xs bg-white border border-indigo-200 rounded-xl p-2.5 focus:ring-1 focus:ring-indigo-500"
          />
        </div>

        {/* Meaningful Learning */}
        <div className="bg-teal-50/50 border border-teal-200 rounded-xl p-4 space-y-2.5 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="w-7 h-7 rounded-lg bg-teal-600 text-white flex items-center justify-center font-bold text-xs">
                2
              </span>
              <h4 className="font-bold text-teal-950 text-xs uppercase tracking-wide">
                Meaningful Learning (Bermakna)
              </h4>
            </div>
            <p className="text-[11px] text-slate-600">
              Menghubungkan materi dengan realitas kehidupan nyata, relevansi sosial, dan pemecahan masalah autentik.
            </p>
          </div>
          <textarea
            rows={3}
            value={deepLearning.meaningfulLearning}
            onChange={(e) => onChange({ ...deepLearning, meaningfulLearning: e.target.value })}
            placeholder="Keterkaitan materi dengan konteks nyata kehidupan..."
            className="w-full text-xs bg-white border border-teal-200 rounded-xl p-2.5 focus:ring-1 focus:ring-teal-500"
          />
        </div>

        {/* Joyful Learning */}
        <div className="bg-amber-50/50 border border-amber-200 rounded-xl p-4 space-y-2.5 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="w-7 h-7 rounded-lg bg-amber-600 text-white flex items-center justify-center font-bold text-xs">
                3
              </span>
              <h4 className="font-bold text-amber-950 text-xs uppercase tracking-wide">
                Joyful Learning (Menyenangkan)
              </h4>
            </div>
            <p className="text-[11px] text-slate-600">
              Membangun atmosfer kelas yang interaktif, penuh antusiasme, apresiasi positif, dan permainan kolaboratif.
            </p>
          </div>
          <textarea
            rows={3}
            value={deepLearning.joyfulLearning}
            onChange={(e) => onChange({ ...deepLearning, joyfulLearning: e.target.value })}
            placeholder="Aktivitas kreatif yang memicu kegembiraan belajar..."
            className="w-full text-xs bg-white border border-amber-200 rounded-xl p-2.5 focus:ring-1 focus:ring-amber-500"
          />
        </div>

      </div>

    </div>
  );
};
