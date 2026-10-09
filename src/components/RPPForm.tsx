import React, { useState } from 'react';
import { 
  Sparkles, 
  Plus, 
  Trash2, 
  HelpCircle, 
  BookOpen, 
  Clock, 
  Users, 
  Layers, 
  School, 
  User, 
  Calendar, 
  Info,
  CheckCircle2,
  FileCheck2,
  ChevronRight,
  ChevronLeft
} from 'lucide-react';
import { RPPData, Jenjang, SubjectItem } from '../types/rpp';
import { GRADES_BY_JENJANG } from '../data/grades';
import { getFaseByGrade } from '../data/phases';
import { KBCSection } from './KBCSection';
import { DeepLearningSection } from './DeepLearningSection';
import { AssessmentSection } from './AssessmentSection';
import { TemplateSelector } from './TemplateSelector';

interface RPPFormProps {
  rpp: RPPData;
  onChangeRpp: (updated: RPPData) => void;
  subjects: SubjectItem[];
  onOpenAddSubject: () => void;
  onGenerateWithAI: () => void;
  isGeneratingAI: boolean;
  currentStep: number;
  onSelectStep: (step: number) => void;
  validationError: string | null;
}

export const RPPForm: React.FC<RPPFormProps> = ({
  rpp,
  onChangeRpp,
  subjects,
  onOpenAddSubject,
  onGenerateWithAI,
  isGeneratingAI,
  currentStep,
  onSelectStep,
  validationError,
}) => {
  // Filter subjects for the selected jenjang
  const availableSubjects = subjects.filter(s => s.jenjang.includes(rpp.jenjang));

  const handleJenjangChange = (newJenjang: Jenjang) => {
    const newGrades = GRADES_BY_JENJANG[newJenjang];
    const defaultGrade = newGrades[0];
    const newFase = getFaseByGrade(newJenjang, defaultGrade);
    const validSubjects = subjects.filter(s => s.jenjang.includes(newJenjang));
    const currentSubValid = validSubjects.some(s => s.name === rpp.mataPelajaran);
    const nextMapel = currentSubValid ? rpp.mataPelajaran : (validSubjects[0]?.name || 'Al-Qur\'an Hadis');

    onChangeRpp({
      ...rpp,
      jenjang: newJenjang,
      kelas: defaultGrade,
      fase: newFase,
      mataPelajaran: nextMapel,
      alokasiWaktu: newJenjang === 'MI' ? '2 JP (2 x 35 Menit)' : newJenjang === 'MTs' ? '2 JP (2 x 40 Menit)' : '2 JP (2 x 45 Menit)',
    });
  };

  const handleGradeChange = (newGrade: string) => {
    const newFase = getFaseByGrade(rpp.jenjang, newGrade);
    onChangeRpp({
      ...rpp,
      kelas: newGrade,
      fase: newFase,
    });
  };

  const addTujuanPembelajaran = () => {
    onChangeRpp({
      ...rpp,
      tujuanPembelajaran: [...rpp.tujuanPembelajaran, 'Peserta didik mampu...'],
    });
  };

  const updateTujuanPembelajaran = (idx: number, val: string) => {
    const updated = [...rpp.tujuanPembelajaran];
    updated[idx] = val;
    onChangeRpp({ ...rpp, tujuanPembelajaran: updated });
  };

  const removeTujuanPembelajaran = (idx: number) => {
    const updated = rpp.tujuanPembelajaran.filter((_, i) => i !== idx);
    onChangeRpp({ ...rpp, tujuanPembelajaran: updated });
  };

  const addPertanyaanPemantik = () => {
    onChangeRpp({
      ...rpp,
      pertanyaanPemantik: [...rpp.pertanyaanPemantik, 'Bagaimana menurutmu...?'],
    });
  };

  const updatePertanyaanPemantik = (idx: number, val: string) => {
    const updated = [...rpp.pertanyaanPemantik];
    updated[idx] = val;
    onChangeRpp({ ...rpp, pertanyaanPemantik: updated });
  };

  const removePertanyaanPemantik = (idx: number) => {
    const updated = rpp.pertanyaanPemantik.filter((_, i) => i !== idx);
    onChangeRpp({ ...rpp, pertanyaanPemantik: updated });
  };

  return (
    <div className="space-y-6">
      
      {/* Top Banner with AI Action */}
      <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-sky-700 rounded-2xl p-5 text-white shadow-md flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-white/20 backdrop-blur-xs text-white border border-white/30">
              Asisten Cerdas Guru Madrasah
            </span>
            <span className="text-xs text-emerald-100 hidden sm:inline">
              Kurikulum Merdeka • KBC • Deep Learning
            </span>
          </div>
          <h2 className="text-lg sm:text-xl font-extrabold tracking-tight mt-1 text-white">
            Susun RPP Otomatis & Terstruktur
          </h2>
          <p className="text-xs text-emerald-100 max-w-xl mt-0.5">
            Lengkapi data di bawah ini, atau gunakan AI untuk merumuskan tujuan, kegiatan aktif, asesmen, KBC, dan Deep Learning.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start md:self-auto">
          <button
            type="button"
            onClick={onGenerateWithAI}
            disabled={isGeneratingAI}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-extrabold text-xs bg-white text-emerald-800 hover:bg-emerald-50 shadow-md hover:shadow-lg transition active:scale-95 disabled:opacity-75 cursor-pointer"
          >
            <Sparkles className={`w-4 h-4 text-emerald-600 ${isGeneratingAI ? 'animate-spin' : ''}`} />
            <span>{isGeneratingAI ? 'Merumuskan RPP...' : '✨ GENERATE DENGAN AI'}</span>
          </button>
        </div>
      </div>

      {/* Validation Message */}
      {validationError && (
        <div className="p-3.5 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-800 flex items-start gap-2.5 animate-bounce">
          <Info className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
          <div>
            <strong className="font-bold">Data belum lengkap!</strong> {validationError}
          </div>
        </div>
      )}

      {/* Stepper Tabs */}
      <div className="flex items-center justify-between overflow-x-auto pb-2 border-b border-slate-200 gap-2 text-xs font-bold text-slate-500">
        {[
          { step: 1, label: '① Identitas Pembelajaran' },
          { step: 2, label: '② Komponen Pembelajaran' },
          { step: 3, label: '③ KBC & Deep Learning' },
          { step: 4, label: '④ Asesmen & Diferensiasi' },
        ].map((item) => (
          <button
            key={item.step}
            type="button"
            onClick={() => onSelectStep(item.step)}
            className={`px-3 py-2 rounded-xl whitespace-nowrap transition cursor-pointer flex items-center gap-1.5 ${
              currentStep === item.step
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
            }`}
          >
            <span>{item.label}</span>
          </button>
        ))}
      </div>

      {/* STEP 1: IDENTITAS PEMBELAJARAN */}
      {currentStep === 1 && (
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-5 sm:p-6 space-y-6">
          <div className="border-b border-slate-200 pb-3">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <School className="w-5 h-5 text-emerald-600" />
              IDENTITAS PEMBELAJARAN & MADRASAH
            </h3>
            <p className="text-xs text-slate-500">
              Lengkapi data profil guru dan satuan pendidikan tempat bertugas.
            </p>
          </div>

          {/* Jenjang Selection Buttons */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
              Pilih Jenjang Madrasah <span className="text-rose-500">*</span>
            </label>
            <div className="grid grid-cols-3 gap-3">
              {(['MI', 'MTs', 'MA'] as Jenjang[]).map((j) => (
                <button
                  key={j}
                  type="button"
                  onClick={() => handleJenjangChange(j)}
                  className={`p-3.5 rounded-xl border text-center transition cursor-pointer ${
                    rpp.jenjang === j
                      ? 'border-emerald-600 bg-emerald-50 text-emerald-900 font-extrabold ring-2 ring-emerald-500/20 shadow-xs'
                      : 'border-slate-200 hover:border-slate-300 bg-white text-slate-700 font-medium'
                  }`}
                >
                  <div className="text-base">{j}</div>
                  <div className="text-[10px] text-slate-500 mt-0.5">
                    {j === 'MI' ? 'Ibtidaiyah (Fase A-C)' : j === 'MTs' ? 'Tsanawiyah (Fase D)' : 'Aliyah (Fase E-F)'}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Kelas & Fase Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Kelas <span className="text-rose-500">*</span>
              </label>
              <select
                value={rpp.kelas}
                onChange={(e) => handleGradeChange(e.target.value)}
                className="w-full text-xs bg-slate-50 border border-slate-300 rounded-xl p-3 font-semibold text-slate-800 focus:bg-white focus:ring-2 focus:ring-emerald-500"
              >
                {GRADES_BY_JENJANG[rpp.jenjang].map((gr) => (
                  <option key={gr} value={gr}>
                    Kelas {gr} ({rpp.jenjang})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Fase (Otomatis Terkunci)
              </label>
              <input
                type="text"
                readOnly
                value={`${rpp.fase} — Sesuai Standar Kurikulum Merdeka`}
                className="w-full text-xs bg-emerald-50/70 border border-emerald-200 text-emerald-900 font-bold rounded-xl p-3 select-none"
              />
            </div>
          </div>

          {/* Mata Pelajaran & Add Subject Button */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-bold text-slate-700">
                Mata Pelajaran <span className="text-rose-500">*</span>
              </label>
              <button
                type="button"
                onClick={onOpenAddSubject}
                className="text-xs font-semibold text-emerald-700 hover:text-emerald-800 inline-flex items-center gap-1 hover:underline cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                [+ Tambah Mata Pelajaran]
              </button>
            </div>

            <select
              value={rpp.mataPelajaran}
              onChange={(e) => onChangeRpp({ ...rpp, mataPelajaran: e.target.value })}
              className="w-full text-xs bg-slate-50 border border-slate-300 rounded-xl p-3 font-semibold text-slate-900 focus:bg-white focus:ring-2 focus:ring-emerald-500"
            >
              {availableSubjects.map((sub) => (
                <option key={sub.id} value={sub.name}>
                  {sub.name} ({sub.category})
                </option>
              ))}
            </select>
          </div>

          {/* Identitas Guru & Madrasah */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Nama Guru Pengampu <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                value={rpp.namaGuru}
                onChange={(e) => onChangeRpp({ ...rpp, namaGuru: e.target.value })}
                placeholder="Mis: Ahmad Fauzi, S.Pd.I., M.Pd."
                className="w-full text-xs bg-slate-50 border border-slate-300 rounded-xl p-3 focus:bg-white focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                NIP / NUPTK (Opsional)
              </label>
              <input
                type="text"
                value={rpp.nip}
                onChange={(e) => onChangeRpp({ ...rpp, nip: e.target.value })}
                placeholder="19850412 201101 1 008 atau -"
                className="w-full text-xs bg-slate-50 border border-slate-300 rounded-xl p-3 focus:bg-white focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Nama Madrasah / Satuan Pendidikan <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                value={rpp.namaMadrasah}
                onChange={(e) => onChangeRpp({ ...rpp, namaMadrasah: e.target.value })}
                placeholder="Mis: MTs Negeri 1 Model Nusantara"
                className="w-full text-xs bg-slate-50 border border-slate-300 rounded-xl p-3 focus:bg-white focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">Tahun Pelajaran</label>
                <input
                  type="text"
                  value={rpp.tahunPelajaran}
                  onChange={(e) => onChangeRpp({ ...rpp, tahunPelajaran: e.target.value })}
                  placeholder="2025/2026"
                  className="w-full text-xs bg-slate-50 border border-slate-300 rounded-xl p-3 focus:bg-white"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">Semester</label>
                <select
                  value={rpp.semester}
                  onChange={(e: any) => onChangeRpp({ ...rpp, semester: e.target.value })}
                  className="w-full text-xs bg-slate-50 border border-slate-300 rounded-xl p-3 focus:bg-white"
                >
                  <option value="1 (Ganjil)">1 (Ganjil)</option>
                  <option value="2 (Genap)">2 (Genap)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">Alokasi Waktu</label>
              <input
                type="text"
                value={rpp.alokasiWaktu}
                onChange={(e) => onChangeRpp({ ...rpp, alokasiWaktu: e.target.value })}
                placeholder="2 JP (2 x 40 Menit)"
                className="w-full text-xs bg-slate-50 border border-slate-300 rounded-xl p-3 focus:bg-white"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">Jumlah Pertemuan</label>
              <input
                type="text"
                value={rpp.jumlahPertemuan}
                onChange={(e) => onChangeRpp({ ...rpp, jumlahPertemuan: e.target.value })}
                placeholder="1 Pertemuan (Tatap Muka)"
                className="w-full text-xs bg-slate-50 border border-slate-300 rounded-xl p-3 focus:bg-white"
              />
            </div>
          </div>

          {/* Template Format Selector */}
          <div className="pt-2 border-t border-slate-200">
            <TemplateSelector
              selectedTemplateId={rpp.templateType}
              onSelectTemplate={(tplId) => onChangeRpp({ ...rpp, templateType: tplId })}
            />
          </div>

          <div className="flex justify-end pt-2">
            <button
              type="button"
              onClick={() => onSelectStep(2)}
              className="inline-flex items-center gap-1.5 px-5 py-2.5 text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 rounded-xl shadow-xs transition cursor-pointer"
            >
              <span>Lanjut ke Komponen Pembelajaran</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 2: KOMPONEN RPP */}
      {currentStep === 2 && (
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-5 sm:p-6 space-y-6">
          <div className="border-b border-slate-200 pb-3">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-blue-600" />
              KOMPONEN PEMBELAJARAN
            </h3>
            <p className="text-xs text-slate-500">
              Tentukan topik materi, tujuan pembelajaran, pemahaman bermakna, dan model pengajaran.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Judul / Topik Pembelajaran <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                value={rpp.topik}
                onChange={(e) => onChangeRpp({ ...rpp, topik: e.target.value })}
                placeholder="Mis: Ketentuan dan Keutamaan Salat Berjamaah"
                className="w-full text-xs bg-slate-50 border border-slate-300 rounded-xl p-3 font-semibold text-slate-900 focus:bg-white focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Model Pembelajaran
              </label>
              <input
                type="text"
                value={rpp.modelPembelajaran}
                onChange={(e) => onChangeRpp({ ...rpp, modelPembelajaran: e.target.value })}
                placeholder="Mis: Problem Based Learning (PBL) / Discovery Learning"
                className="w-full text-xs bg-slate-50 border border-slate-300 rounded-xl p-3 focus:bg-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              Materi Pembelajaran <span className="text-rose-500">*</span>
            </label>
            <textarea
              rows={3}
              value={rpp.materi}
              onChange={(e) => onChangeRpp({ ...rpp, materi: e.target.value })}
              placeholder="Rangkuman konsep materi yang diajarkan..."
              className="w-full text-xs bg-slate-50 border border-slate-300 rounded-xl p-3 focus:bg-white focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Tujuan Pembelajaran List */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                <span>Tujuan Pembelajaran (TP)</span>
                <span className="text-[11px] font-normal text-slate-500">
                  ({rpp.tujuanPembelajaran.length} butir)
                </span>
              </label>
              <button
                type="button"
                onClick={addTujuanPembelajaran}
                className="text-xs font-semibold text-blue-600 hover:text-blue-700 inline-flex items-center gap-1 hover:underline cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                Tambah TP
              </button>
            </div>

            <div className="space-y-2">
              {rpp.tujuanPembelajaran.map((tp, idx) => (
                <div key={idx} className="flex items-start gap-2">
                  <span className="text-xs font-bold text-slate-500 mt-2.5">{idx + 1}.</span>
                  <textarea
                    rows={2}
                    value={tp}
                    onChange={(e) => updateTujuanPembelajaran(idx, e.target.value)}
                    className="flex-1 text-xs bg-slate-50 border border-slate-300 rounded-xl p-2.5 focus:bg-white"
                  />
                  {rpp.tujuanPembelajaran.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeTujuanPembelajaran(idx)}
                      className="text-rose-500 hover:text-rose-700 p-2"
                      title="Hapus"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Pemahaman Bermakna & Kompetensi Awal */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Pemahaman Bermakna
              </label>
              <textarea
                rows={3}
                value={rpp.pemahamanBermakna}
                onChange={(e) => onChangeRpp({ ...rpp, pemahamanBermakna: e.target.value })}
                placeholder="Manfaat jangka panjang materi ini dalam kehidupan nyata murid..."
                className="w-full text-xs bg-slate-50 border border-slate-300 rounded-xl p-3 focus:bg-white"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Kompetensi Awal (Prasyarat)
              </label>
              <textarea
                rows={3}
                value={rpp.kompetensiAwal}
                onChange={(e) => onChangeRpp({ ...rpp, kompetensiAwal: e.target.value })}
                placeholder="Pengetahuan dasar yang sudah dimiliki siswa sebelumnya..."
                className="w-full text-xs bg-slate-50 border border-slate-300 rounded-xl p-3 focus:bg-white"
              />
            </div>
          </div>

          {/* Pertanyaan Pemantik */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-bold text-slate-700">Pertanyaan Pemantik</label>
              <button
                type="button"
                onClick={addPertanyaanPemantik}
                className="text-xs font-semibold text-blue-600 hover:text-blue-700 inline-flex items-center gap-1 hover:underline cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                Tambah Pertanyaan
              </button>
            </div>
            <div className="space-y-2">
              {rpp.pertanyaanPemantik.map((pp, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <span className="text-xs font-bold text-slate-500">{idx + 1}.</span>
                  <input
                    type="text"
                    value={pp}
                    onChange={(e) => updatePertanyaanPemantik(idx, e.target.value)}
                    className="flex-1 text-xs bg-slate-50 border border-slate-300 rounded-xl p-2.5 focus:bg-white"
                  />
                  {rpp.pertanyaanPemantik.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removePertanyaanPemantik(idx)}
                      className="text-rose-500 hover:text-rose-700 p-1"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Sarana, Sumber, Media */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-slate-200">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">Sarana dan Prasarana</label>
              <textarea
                rows={2}
                value={rpp.saranaPrasarana}
                onChange={(e) => onChangeRpp({ ...rpp, saranaPrasarana: e.target.value })}
                placeholder="Ruang kelas, proyektor, papan tulis, mushala madrasah..."
                className="w-full text-xs bg-slate-50 border border-slate-300 rounded-xl p-2.5 focus:bg-white"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">Sumber Belajar</label>
              <textarea
                rows={2}
                value={(rpp.sumberBelajar || []).join('\n')}
                onChange={(e) => onChangeRpp({ ...rpp, sumberBelajar: e.target.value.split('\n').filter(Boolean) })}
                placeholder="Buku Siswa Kemenag, video edukasi, jurnal..."
                className="w-full text-xs bg-slate-50 border border-slate-300 rounded-xl p-2.5 focus:bg-white"
              />
            </div>
          </div>

          <div className="flex items-center justify-between pt-2">
            <button
              type="button"
              onClick={() => onSelectStep(1)}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Kembali</span>
            </button>
            <button
              type="button"
              onClick={() => onSelectStep(3)}
              className="inline-flex items-center gap-1.5 px-5 py-2.5 text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 rounded-xl shadow-xs transition cursor-pointer"
            >
              <span>Lanjut ke KBC & Deep Learning</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 3: INTEGRASI KBC & DEEP LEARNING */}
      {currentStep === 3 && (
        <div className="space-y-6">
          <KBCSection
            selectedValues={rpp.kbcValues}
            onChangeSelected={(vals) => onChangeRpp({ ...rpp, kbcValues: vals })}
            karakter={rpp.kbcKarakter}
            onChangeKarakter={(val) => onChangeRpp({ ...rpp, kbcKarakter: val })}
            implementasi={rpp.kbcImplementasi}
            onChangeImplementasi={(val) => onChangeRpp({ ...rpp, kbcImplementasi: val })}
            contohPerilaku={rpp.kbcContohPerilaku}
            onChangeContohPerilaku={(val) => onChangeRpp({ ...rpp, kbcContohPerilaku: val })}
            refleksi={rpp.kbcRefleksi}
            onChangeRefleksi={(val) => onChangeRpp({ ...rpp, kbcRefleksi: val })}
          />

          <DeepLearningSection
            deepLearning={rpp.deepLearning}
            onChange={(dl) => onChangeRpp({ ...rpp, deepLearning: dl })}
          />

          <div className="flex items-center justify-between pt-2">
            <button
              type="button"
              onClick={() => onSelectStep(2)}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Kembali</span>
            </button>
            <button
              type="button"
              onClick={() => onSelectStep(4)}
              className="inline-flex items-center gap-1.5 px-5 py-2.5 text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 rounded-xl shadow-xs transition cursor-pointer"
            >
              <span>Lanjut ke Asesmen & Diferensiasi</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 4: ASESMEN & DIFERENSIASI */}
      {currentStep === 4 && (
        <div className="space-y-4">
          <AssessmentSection
            asesmen={rpp.asesmen}
            onChangeAsesmen={(data) => onChangeRpp({ ...rpp, asesmen: data })}
            diferensiasi={rpp.diferensiasi}
            onChangeDiferensiasi={(data) => onChangeRpp({ ...rpp, diferensiasi: data })}
            refleksi={rpp.refleksi}
            onChangeRefleksi={(data) => onChangeRpp({ ...rpp, refleksi: data })}
          />

          <div className="flex items-center justify-between pt-2">
            <button
              type="button"
              onClick={() => onSelectStep(3)}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Kembali</span>
            </button>
            <button
              type="button"
              onClick={() => onSelectStep(1)}
              className="inline-flex items-center gap-1.5 px-5 py-2.5 text-xs font-bold text-emerald-800 bg-emerald-100 hover:bg-emerald-200 rounded-xl shadow-xs transition cursor-pointer"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Periksa Formulir Lengkap</span>
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
