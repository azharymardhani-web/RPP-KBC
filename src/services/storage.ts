import { RPPData } from '../types/rpp';
import { SAMPLE_RPPS } from '../data/sampleRpps';

const STORAGE_KEY = 'generator_administrasi_guru_rpp_list_v2';
const LAST_ACTIVE_ID_KEY = 'generator_administrasi_guru_last_active_id_v2';

export function getAllRPPs(): RPPData[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      // Seed with initial sample documents so user can immediately view/explore
      localStorage.setItem(STORAGE_KEY, JSON.stringify(SAMPLE_RPPS));
      return SAMPLE_RPPS;
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : SAMPLE_RPPS;
  } catch (e) {
    console.error('Failed to load RPP list from localStorage', e);
    return SAMPLE_RPPS;
  }
}

export function saveRPP(rpp: RPPData): void {
  try {
    const all = getAllRPPs();
    const existingIndex = all.findIndex(item => item.id === rpp.id);
    let updated: RPPData[];
    
    const rppToSave = {
      ...rpp,
      updatedAt: new Date().toISOString(),
    };

    if (existingIndex >= 0) {
      updated = [...all];
      updated[existingIndex] = rppToSave;
    } else {
      updated = [rppToSave, ...all];
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    localStorage.setItem(LAST_ACTIVE_ID_KEY, rppToSave.id);
  } catch (e) {
    console.error('Failed to save RPP to localStorage', e);
  }
}

export function getRPPById(id: string): RPPData | undefined {
  const all = getAllRPPs();
  return all.find(item => item.id === id);
}

export function getLastActiveRPP(): RPPData {
  const all = getAllRPPs();
  const lastId = localStorage.getItem(LAST_ACTIVE_ID_KEY);
  if (lastId) {
    const found = all.find(item => item.id === lastId);
    if (found) return found;
  }
  return all[0] || SAMPLE_RPPS[0];
}

export function deleteRPP(id: string): RPPData[] {
  try {
    const all = getAllRPPs();
    const filtered = all.filter(item => item.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
    return filtered;
  } catch (e) {
    console.error('Failed to delete RPP', e);
    return getAllRPPs();
  }
}

export function duplicateRPP(id: string): RPPData | null {
  const original = getRPPById(id);
  if (!original) return null;

  const duplicated: RPPData = {
    ...original,
    id: 'rpp_' + Date.now() + '_' + Math.random().toString(36).substring(2, 6),
    title: `${original.title} (Salinan)`,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  saveRPP(duplicated);
  return duplicated;
}

export function getRPPStats() {
  const all = getAllRPPs();
  const distinctSubjects = new Set(all.map(r => r.mataPelajaran)).size;
  const distinctJenjang = new Set(all.map(r => r.jenjang)).size;
  const lastRPP = all[0] || null;

  return {
    total: all.length,
    lastRPP,
    subjectCount: distinctSubjects,
    jenjangCount: distinctJenjang,
  };
}
