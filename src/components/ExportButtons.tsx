import React, { useState } from 'react';
import { Download, Printer, Save, Check, FileText, Sparkles, RefreshCw } from 'lucide-react';
import { RPPData } from '../types/rpp';
import { exportRPPToDocx, downloadDocxFile } from '../services/docx';
import { saveRPP } from '../services/storage';

interface ExportButtonsProps {
  rpp: RPPData;
  onSaved?: () => void;
  onRefresh?: () => void;
  className?: string;
  isCompact?: boolean;
}

export const ExportButtons: React.FC<ExportButtonsProps> = ({
  rpp,
  onSaved,
  onRefresh,
  className = '',
  isCompact = false,
}) => {
  const [isExportingDocx, setIsExportingDocx] = useState(false);
  const [justSaved, setJustSaved] = useState(false);

  const handleDownloadDocx = async () => {
    try {
      setIsExportingDocx(true);
      const blob = await exportRPPToDocx(rpp);
      const safeTitle = (rpp.title || 'RPP_Madrasah')
        .replace(/[^a-zA-Z0-9_\- ]/g, '')
        .trim()
        .replace(/\s+/g, '_');
      downloadDocxFile(blob, `${safeTitle}.docx`);
    } catch (err) {
      console.error('Failed to generate DOCX', err);
      alert('Gagal mengekspor dokumen Word. Silakan coba kembali.');
    } finally {
      setIsExportingDocx(false);
    }
  };

  const handlePrintPdf = () => {
    // Save draft first so changes are preserved
    saveRPP(rpp);
    window.print();
  };

  const handleSaveDraft = () => {
    saveRPP(rpp);
    setJustSaved(true);
    if (onSaved) onSaved();
    setTimeout(() => setJustSaved(false), 2500);
  };

  return (
    <div className={`flex flex-wrap items-center gap-2 ${className}`}>
      {onRefresh && (
        <button
          type="button"
          onClick={onRefresh}
          className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition shadow-xs active:scale-95"
          title="Refresh Tampilan Dokumen"
        >
          <RefreshCw className="w-3.5 h-3.5 text-slate-500" />
          <span>Refresh</span>
        </button>
      )}

      <button
        type="button"
        onClick={handleSaveDraft}
        className={`inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-lg border transition shadow-xs active:scale-95 ${
          justSaved
            ? 'bg-emerald-50 text-emerald-700 border-emerald-300'
            : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
        }`}
      >
        {justSaved ? (
          <>
            <Check className="w-3.5 h-3.5 text-emerald-600" />
            <span>Tersimpan!</span>
          </>
        ) : (
          <>
            <Save className="w-3.5 h-3.5 text-emerald-600" />
            <span>Simpan Draft</span>
          </>
        )}
      </button>

      <button
        type="button"
        onClick={handlePrintPdf}
        className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-800 bg-slate-100 hover:bg-slate-200 border border-slate-300 rounded-lg transition shadow-xs active:scale-95"
        title="Cetak atau Simpan sebagai PDF (A4)"
      >
        <Printer className="w-3.5 h-3.5 text-slate-700" />
        <span>{isCompact ? 'PDF / Cetak' : 'Cetak / Download PDF'}</span>
      </button>

      <button
        type="button"
        onClick={handleDownloadDocx}
        disabled={isExportingDocx}
        className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition shadow-xs disabled:opacity-50 active:scale-95 cursor-pointer"
        title="Download Microsoft Word .DOCX format A4 siap supervisi"
      >
        <FileText className="w-3.5 h-3.5" />
        <span>{isExportingDocx ? 'Memproses Word...' : 'Download Word (.docx)'}</span>
      </button>
    </div>
  );
};
