import React, { useState } from 'react';
import { Sparkles, Save, Check, RefreshCw, Layers, ArrowDown } from 'lucide-react';
import { RPPData, SubjectItem } from '../types/rpp';
import { RPPForm } from './RPPForm';
import { PreviewDocument } from './PreviewDocument';
import { generateRPPWithAI } from '../services/ai';
import { generateSmartDefaultRPP } from '../services/generator';
import { saveRPP } from '../services/storage';

interface RPPGeneratorProps {
  initialRpp: RPPData;
  subjects: SubjectItem[];
  onOpenAddSubject: () => void;
  onSaved: () => void;
}

export const RPPGenerator: React.FC<RPPGeneratorProps> = ({
  initialRpp,
  subjects,
  onOpenAddSubject,
  onSaved,
}) => {
  const [currentRpp, setCurrentRpp] = useState<RPPData>(initialRpp);
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [isGeneratingAI, setIsGeneratingAI] = useState<boolean>(false);
  const [validationError, setValidationError] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const handleValidateForm = (): boolean => {
    if (!currentRpp.mataPelajaran) {
      setValidationError('Mata pelajaran wajib dipilih.');
      setCurrentStep(1);
      return false;
    }
    if (!currentRpp.topik || currentRpp.topik.trim() === '') {
      setValidationError('Judul / Topik Pembelajaran tidak boleh kosong.');
      setCurrentStep(2);
      return false;
    }
    if (!currentRpp.materi || currentRpp.materi.trim() === '') {
      setValidationError('Materi Pembelajaran tidak boleh kosong.');
      setCurrentStep(2);
      return false;
    }
    setValidationError(null);
    return true;
  };

  const handleGenerateWithAI = async () => {
    if (!handleValidateForm()) return;

    try {
      setIsGeneratingAI(true);
      setValidationError(null);

      const result = await generateRPPWithAI({
        jenjang: currentRpp.jenjang,
        kelas: currentRpp.kelas,
        fase: currentRpp.fase,
        mataPelajaran: currentRpp.mataPelajaran,
        topik: currentRpp.topik,
        materi: currentRpp.materi,
        namaGuru: currentRpp.namaGuru,
        nip: currentRpp.nip,
        namaMadrasah: currentRpp.namaMadrasah,
        tahunPelajaran: currentRpp.tahunPelajaran,
        semester: currentRpp.semester,
        kbcValues: currentRpp.kbcValues,
        templateType: currentRpp.templateType,
      });

      setCurrentRpp(result.rpp);
      saveRPP(result.rpp);
      onSaved();

      if (result.source === 'ai') {
        showToast('✨ Dokumen RPP berhasil di-generate secara cerdas dengan Gemini 3.8 Flash!');
      } else {
        showToast('💡 RPP berhasil disusun dengan Kurikulum Berbasis Cinta & Karakter Madrasah!');
      }
    } catch (err: any) {
      console.error('Error generating AI:', err);
      // Fallback locally
      const localRpp = generateSmartDefaultRPP({
        ...currentRpp,
        selectedKbcIds: currentRpp.kbcValues,
      });
      setCurrentRpp(localRpp);
      saveRPP(localRpp);
      showToast('💡 RPP tersusun dengan modul ajar madrasah terintegrasi KBC.');
    } finally {
      setIsGeneratingAI(false);
    }
  };

  const handleRegenerateSection = (sectionKey: string) => {
    // Regenerate targeted section
    const fresh = generateSmartDefaultRPP({
      ...currentRpp,
      selectedKbcIds: currentRpp.kbcValues,
    });

    let updated = { ...currentRpp };
    if (sectionKey === 'kompetensiAwal') updated.kompetensiAwal = fresh.kompetensiAwal;
    if (sectionKey === 'tujuanPembelajaran') updated.tujuanPembelajaran = fresh.tujuanPembelajaran;
    if (sectionKey === 'pemahamanBermakna') updated.pemahamanBermakna = fresh.pemahamanBermakna;
    if (sectionKey === 'pertanyaanPemantik') updated.pertanyaanPemantik = fresh.pertanyaanPemantik;
    if (sectionKey === 'materi') updated.materi = fresh.materi;
    if (sectionKey === 'kbc') {
      updated.kbcKarakter = fresh.kbcKarakter;
      updated.kbcImplementasi = fresh.kbcImplementasi;
      updated.kbcContohPerilaku = fresh.kbcContohPerilaku;
      updated.kbcRefleksi = fresh.kbcRefleksi;
    }
    if (sectionKey === 'langkah') updated.langkahPembelajaran = fresh.langkahPembelajaran;
    if (sectionKey === 'asesmen') updated.asesmen = fresh.asesmen;
    if (sectionKey === 'diferensiasi') updated.diferensiasi = fresh.diferensiasi;
    if (sectionKey === 'refleksi') updated.refleksi = fresh.refleksi;

    setCurrentRpp(updated);
    saveRPP(updated);
    showToast(`Bagian ${sectionKey} berhasil diperbarui.`);
  };

  const handleRefreshPreview = () => {
    showToast('Tampilan dokumen telah disegarkan.');
  };

  return (
    <div className="space-y-8">
      
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white text-xs font-semibold px-4 py-3 rounded-xl shadow-xl flex items-center gap-2 border border-slate-700 animate-fade-in no-print">
          <Sparkles className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* FORM SECTION (WIZARD) */}
      <section>
        <RPPForm
          rpp={currentRpp}
          onChangeRpp={(updated) => {
            setCurrentRpp(updated);
            saveRPP(updated);
          }}
          subjects={subjects}
          onOpenAddSubject={onOpenAddSubject}
          onGenerateWithAI={handleGenerateWithAI}
          isGeneratingAI={isGeneratingAI}
          currentStep={currentStep}
          onSelectStep={setCurrentStep}
          validationError={validationError}
        />
      </section>

      {/* TRANSITION DIVIDER */}
      <div className="flex items-center justify-center gap-3 pt-2 text-slate-400 no-print">
        <div className="h-px bg-slate-300 flex-1" />
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-xs font-bold uppercase tracking-wider">
          <ArrowDown className="w-3.5 h-3.5 text-emerald-600" />
          PREVIEW DOKUMEN REAL-TIME DI BAWAH INI
        </div>
        <div className="h-px bg-slate-300 flex-1" />
      </div>

      {/* REAL-TIME PREVIEW SECTION */}
      <section className="scroll-mt-20" id="preview-section">
        <PreviewDocument
          rpp={currentRpp}
          onUpdateRpp={(updated) => {
            setCurrentRpp(updated);
            saveRPP(updated);
            onSaved();
          }}
          onRegenerateSection={handleRegenerateSection}
          onRefresh={handleRefreshPreview}
        />
      </section>

    </div>
  );
};
