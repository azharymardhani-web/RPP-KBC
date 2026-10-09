import React, { useState, useEffect } from 'react';
import { 
  X, 
  Plus, 
  Trash2, 
  Download, 
  RotateCcw, 
  Settings, 
  Lock, 
  KeyRound, 
  Eye, 
  EyeOff, 
  ShieldAlert,
  LogOut,
  FolderKanban
} from 'lucide-react';
import { SubjectItem, Jenjang, RPPData } from '../types/rpp';
import { getAllSubjects, saveSubjects, INITIAL_SUBJECTS } from '../data/subjects';

const ADMIN_PASSWORD = 'Kangguru00';
const SESSION_AUTH_KEY = 'generator_administrasi_admin_authenticated';

interface AdminDataModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubjectsUpdated: (subjects: SubjectItem[]) => void;
  rpps: RPPData[];
  onDeleteRPP: (id: string) => void;
}

export const AdminDataModal: React.FC<AdminDataModalProps> = ({
  isOpen,
  onClose,
  onSubjectsUpdated,
  rpps,
  onDeleteRPP,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return sessionStorage.getItem(SESSION_AUTH_KEY) === 'true';
  });
  const [inputPassword, setInputPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const [subjects, setSubjects] = useState<SubjectItem[]>(getAllSubjects());
  const [activeTab, setActiveTab] = useState<'mapel' | 'json' | 'dokumen'>('mapel');

  // New Subject Form state
  const [newSubName, setNewSubName] = useState('');
  const [newSubCategory, setNewSubCategory] = useState<'PAI' | 'Umum' | 'Muatan Lokal'>('Umum');
  const [newSubJenjang, setNewSubJenjang] = useState<Jenjang[]>(['MTs']);

  useEffect(() => {
    if (isOpen) {
      setSubjects(getAllSubjects());
      setErrorMsg(null);
      setInputPassword('');
      setIsAuthenticated(sessionStorage.getItem(SESSION_AUTH_KEY) === 'true');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputPassword === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      sessionStorage.setItem(SESSION_AUTH_KEY, 'true');
      setErrorMsg(null);
      setInputPassword('');
    } else {
      setErrorMsg('Kata sandi salah. Hanya administrator yang dapat mengatur data madrasah.');
    }
  };

  const handleLockAccess = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem(SESSION_AUTH_KEY);
    setInputPassword('');
    setErrorMsg(null);
  };

  const handleAddSubject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSubName.trim()) return;

    const newSub: SubjectItem = {
      id: 'custom_' + Date.now(),
      name: newSubName.trim(),
      category: newSubCategory,
      jenjang: newSubJenjang,
      defaultElements: ['Elemen Utama', 'Keterampilan Proses'],
      defaultModels: ['Problem Based Learning', 'Inquiry Learning'],
    };

    const updated = [...subjects, newSub];
    setSubjects(updated);
    saveSubjects(updated);
    onSubjectsUpdated(updated);
    setNewSubName('');
  };

  const handleDeleteSubject = (id: string) => {
    const updated = subjects.filter((s) => s.id !== id);
    setSubjects(updated);
    saveSubjects(updated);
    onSubjectsUpdated(updated);
  };

  const handleResetToDefault = () => {
    if (confirm('Kembalikan seluruh daftar mata pelajaran ke bawaan awal sistem?')) {
      setSubjects(INITIAL_SUBJECTS);
      saveSubjects(INITIAL_SUBJECTS);
      onSubjectsUpdated(INITIAL_SUBJECTS);
    }
  };

  const handleExportJson = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(subjects, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', 'master_data_madrasah.json');
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const toggleJenjang = (j: Jenjang) => {
    if (newSubJenjang.includes(j)) {
      if (newSubJenjang.length > 1) {
        setNewSubJenjang(newSubJenjang.filter((item) => item !== j));
      }
    } else {
      setNewSubJenjang([...newSubJenjang, j]);
    }
  };

  // PASSWORD PROMPT VIEW IF NOT AUTHENTICATED
  if (!isAuthenticated) {
    return (
      <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
        <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden animate-scale-up">
          
          <div className="bg-gradient-to-br from-slate-900 via-teal-950 to-slate-900 text-white p-6 text-center relative">
            <button
              type="button"
              onClick={onClose}
              className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-lg hover:bg-white/10 transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 border border-emerald-400/40 text-emerald-400 mx-auto flex items-center justify-center mb-3 shadow-inner">
              <Lock className="w-7 h-7" />
            </div>

            <h3 className="text-base sm:text-lg font-extrabold tracking-tight">
              Akses Data Madrasah
            </h3>
            <p className="text-xs text-slate-300 mt-1 max-w-xs mx-auto">
              Halaman ini diproteksi. Autentikasi diperlukan untuk mengelola data.
            </p>
          </div>

          <form onSubmit={handleLoginSubmit} className="p-6 space-y-4">
            {errorMsg && (
              <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-700 flex items-start gap-2">
                <ShieldAlert className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                <span>{errorMsg}</span>
              </div>
            )}

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Password Administrator
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <KeyRound className="w-4 h-4" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={inputPassword}
                  onChange={(e) => {
                    setInputPassword(e.target.value);
                    if (errorMsg) setErrorMsg(null);
                  }}
                  autoFocus
                  placeholder="Masukkan password..."
                  className="w-full text-xs pl-9 pr-10 py-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 cursor-pointer"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center gap-2 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="w-1/2 py-2.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition cursor-pointer"
              >
                Batal
              </button>
              <button
                type="submit"
                className="w-1/2 py-2.5 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-xs transition active:scale-95 cursor-pointer flex items-center justify-center gap-1.5"
              >
                <Lock className="w-3.5 h-3.5" />
                <span>Buka Akses</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  // AUTHENTICATED ADMIN PANEL VIEW
  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="relative w-full max-w-3xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-slate-50/90">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center">
              <Settings className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold text-slate-900">
                  ADMINISTRATOR PANEL
                </h3>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
                  Sesi Aktif
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleLockAccess}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-rose-700 bg-rose-50 border border-rose-200 rounded-lg hover:bg-rose-100 transition cursor-pointer"
              title="Kunci Kembali Akses"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Kunci Sesi</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              className="text-slate-400 hover:text-slate-600 p-1.5 rounded-lg hover:bg-slate-200 transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Header */}
        <div className="flex items-center gap-2 px-6 pt-3 border-b border-slate-200 bg-white text-xs font-semibold">
          <button
            type="button"
            onClick={() => setActiveTab('mapel')}
            className={`pb-2.5 px-3 border-b-2 transition cursor-pointer ${
              activeTab === 'mapel'
                ? 'border-emerald-600 text-emerald-700'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Mata Pelajaran ({subjects.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('dokumen')}
            className={`pb-2.5 px-3 border-b-2 transition cursor-pointer ${
              activeTab === 'dokumen'
                ? 'border-emerald-600 text-emerald-700'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Manajemen Dokumen ({rpps.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('json')}
            className={`pb-2.5 px-3 border-b-2 transition cursor-pointer ${
              activeTab === 'json'
                ? 'border-emerald-600 text-emerald-700'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Data JSON
          </button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto space-y-5 flex-1 text-xs">
          {activeTab === 'mapel' && (
            <>
              <form onSubmit={handleAddSubject} className="p-4 bg-emerald-50/50 border border-emerald-200 rounded-xl space-y-3">
                <span className="font-bold text-emerald-900 block text-xs">
                  + Tambah Mata Pelajaran Baru
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="sm:col-span-2">
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">Nama Mata Pelajaran</label>
                    <input
                      type="text"
                      value={newSubName}
                      onChange={(e) => setNewSubName(e.target.value)}
                      placeholder="Mis: Riset Madrasah..."
                      className="w-full text-xs bg-white border border-slate-300 rounded-lg p-2 focus:ring-1 focus:ring-emerald-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">Kategori</label>
                    <select
                      value={newSubCategory}
                      onChange={(e: any) => setNewSubCategory(e.target.value)}
                      className="w-full text-xs bg-white border border-slate-300 rounded-lg p-2"
                    >
                      <option value="PAI">PAI Kemenag</option>
                      <option value="Umum">Mapel Umum</option>
                      <option value="Muatan Lokal">Muatan Lokal</option>
                    </select>
                  </div>
                </div>
                <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-bold text-slate-600">Jenjang:</span>
                    {(['MI', 'MTs', 'MA'] as Jenjang[]).map((j) => (
                      <label key={j} className="inline-flex items-center gap-1 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={newSubJenjang.includes(j)}
                          onChange={() => toggleJenjang(j)}
                          className="rounded text-emerald-600"
                        />
                        <span className="text-xs">{j}</span>
                      </label>
                    ))}
                  </div>
                  <button
                    type="submit"
                    className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg shadow-xs transition cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    Simpan Mapel
                  </button>
                </div>
              </form>
              <div className="border border-slate-200 rounded-xl overflow-hidden">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-100/80 border-b border-slate-200 text-slate-700">
                      <th className="p-2.5 font-bold">Mata Pelajaran</th>
                      <th className="p-2.5 font-bold">Kategori</th>
                      <th className="p-2.5 font-bold">Jenjang</th>
                      <th className="p-2.5 font-bold text-right">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {subjects.map((sub) => (
                      <tr key={sub.id} className="hover:bg-slate-50">
                        <td className="p-2.5 font-semibold text-slate-800">{sub.name}</td>
                        <td className="p-2.5">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                              sub.category === 'PAI' ? 'bg-emerald-100 text-emerald-800' : 
                              sub.category === 'Muatan Lokal' ? 'bg-amber-100 text-amber-800' : 'bg-blue-100 text-blue-800'
                            }`}>{sub.category}</span>
                        </td>
                        <td className="p-2.5 text-slate-600">{sub.jenjang.join(', ')}</td>
                        <td className="p-2.5 text-right">
                          <button
                            type="button"
                            onClick={() => handleDeleteSubject(sub.id)}
                            className="text-rose-500 hover:text-rose-700 p-1 rounded hover:bg-rose-50 cursor-pointer"
                            title="Hapus"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}

          {activeTab === 'dokumen' && (
            <div className="space-y-3">
              <div className="border border-slate-200 rounded-xl overflow-hidden">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-100/80 border-b border-slate-200 text-slate-700">
                      <th className="p-2.5 font-bold">Mata Pelajaran</th>
                      <th className="p-2.5 font-bold">Topik</th>
                      <th className="p-2.5 font-bold">Kelas</th>
                      <th className="p-2.5 font-bold text-right">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {rpps.map((doc) => (
                      <tr key={doc.id} className="hover:bg-slate-50">
                        <td className="p-2.5 font-semibold text-slate-800">{doc.mataPelajaran}</td>
                        <td className="p-2.5 text-slate-600">{doc.topik}</td>
                        <td className="p-2.5 text-slate-600">{doc.kelas} ({doc.jenjang})</td>
                        <td className="p-2.5 text-right">
                          <button
                            type="button"
                            onClick={() => {
                              if (confirm(`Hapus dokumen RPP "${doc.mataPelajaran}"?`)) {
                                onDeleteRPP(doc.id);
                              }
                            }}
                            className="text-rose-500 hover:text-rose-700 p-1 rounded hover:bg-rose-50 cursor-pointer"
                            title="Hapus Dokumen"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'json' && (
            <div className="space-y-3">
              <div className="flex gap-2">
                <button type="button" onClick={handleExportJson} className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-100 transition cursor-pointer">
                  <Download className="w-3.5 h-3.5" /> Ekspor JSON
                </button>
                <button type="button" onClick={handleResetToDefault} className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-100 transition cursor-pointer">
                  <RotateCcw className="w-3.5 h-3.5" /> Reset Data
                </button>
              </div>
              <pre className="p-3 bg-slate-900 text-emerald-400 font-mono text-[11px] rounded-xl overflow-x-auto max-h-96">
                {JSON.stringify(subjects, null, 2)}
              </pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
