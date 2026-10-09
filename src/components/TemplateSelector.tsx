import React from 'react';
import { Check, Shield, FileCheck, Layers, Zap } from 'lucide-react';
import { RPP_TEMPLATES } from '../data/templates';
import { TemplateDefinition } from '../types/rpp';

interface TemplateSelectorProps {
  selectedTemplateId: string;
  onSelectTemplate: (templateId: any) => void;
}

export const TemplateSelector: React.FC<TemplateSelectorProps> = ({
  selectedTemplateId,
  onSelectTemplate,
}) => {
  const getIcon = (id: string) => {
    switch (id) {
      case 'kbc_merdeka':
        return <Shield className="w-4 h-4 text-rose-500" />;
      case 'standar_merdeka':
        return <FileCheck className="w-4 h-4 text-emerald-500" />;
      case 'supervisi_lengkap':
        return <Layers className="w-4 h-4 text-blue-500" />;
      case 'ringkas':
        return <Zap className="w-4 h-4 text-amber-500" />;
      default:
        return <FileCheck className="w-4 h-4 text-emerald-500" />;
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
          Format Dokumen RPP (Template)
        </label>
        <span className="text-[11px] text-slate-500">
          Format standar disesuaikan dengan kebutuhan supervisi
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {RPP_TEMPLATES.map((tmpl) => {
          const isSelected = selectedTemplateId === tmpl.id;
          return (
            <div
              key={tmpl.id}
              onClick={() => onSelectTemplate(tmpl.id)}
              className={`p-3.5 rounded-xl border text-left cursor-pointer transition select-none flex flex-col justify-between ${
                isSelected
                  ? 'border-emerald-500 bg-emerald-50/70 shadow-xs ring-2 ring-emerald-400/30'
                  : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50/70 bg-white'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-1.5">
                    {getIcon(tmpl.id)}
                    <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-slate-100 text-slate-700">
                      {tmpl.badge}
                    </span>
                  </div>
                  {isSelected && (
                    <div className="w-4 h-4 rounded-full bg-emerald-600 text-white flex items-center justify-center">
                      <Check className="w-3 h-3 stroke-[3]" />
                    </div>
                  )}
                </div>

                <div className="text-xs font-bold text-slate-900 leading-snug">
                  {tmpl.name}
                </div>
                <p className="text-[11px] text-slate-500 mt-1 line-clamp-2">
                  {tmpl.description}
                </p>
              </div>

              {tmpl.isDefault && (
                <div className="mt-2 text-[10px] font-semibold text-emerald-700 flex items-center gap-1">
                  <span>★ Rekomendasi Utama</span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
