
import React, { useState, useMemo } from 'react';
import { X, Scale, Ruler, Check, Dumbbell, Zap, Target, TrendingUp, Utensils } from 'lucide-react';
import { UserStats, UserGoal } from '../types';

interface BodyStatsModalProps {
  stats: UserStats;
  onSave: (stats: UserStats) => void;
  onClose: () => void;
}

export const BodyStatsModal: React.FC<BodyStatsModalProps> = ({ stats, onSave, onClose }) => {
  const [tempStats, setTempStats] = useState<UserStats>(stats);

  const targets = useMemo(() => {
    // Aggressive Bro-Math logic
    const bmr = 10 * tempStats.weight + 6.25 * tempStats.height - 5 * 25 + 5;
    const activityMult = tempStats.isTrainingDay ? 1.6 : 1.2;
    let tdee = bmr * activityMult;

    if (tempStats.goal === 'MASA') {
      tdee += 500;
    }

    const protein = Math.round(tempStats.weight * 2.2);
    const fat = Math.round(tempStats.weight * 0.9);
    const carbs = Math.round((tdee - (protein * 4 + fat * 9)) / 4);

    return { 
        protein, 
        carbs, 
        fat, 
        calories: Math.round(tdee),
        mealP: Math.round(protein / tempStats.mealCount),
        mealC: Math.round(carbs / tempStats.mealCount)
    };
  }, [tempStats]);

  return (
    <div className="fixed inset-0 z-[250] bg-black/95 backdrop-blur-md flex flex-col p-6 animate-in fade-in duration-300">
      <header className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-black italic uppercase tracking-tighter text-white">DZIK-KALKULATOR</h2>
        <button onClick={onClose} className="p-2 bg-zinc-900 border border-zinc-700 text-white">
          <X size={24} />
        </button>
      </header>

      <div className="space-y-6 flex-1 overflow-y-auto no-scrollbar pb-10">
        <div className="p-6 bg-zinc-900 border border-zinc-800 space-y-6">
          <h3 className="text-[#CCFF00] font-black italic uppercase text-sm tracking-widest flex items-center gap-2">
            <Scale size={18} /> POMIARY BYKA
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase text-zinc-500">WAGA (KG)</label>
              <input type="number" value={tempStats.weight} onChange={e => setTempStats({...tempStats, weight: Number(e.target.value)})} className="w-full bg-black border border-zinc-800 p-4 text-2xl font-black text-[#CCFF00] outline-none" />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase text-zinc-500">WZROST (CM)</label>
              <input type="number" value={tempStats.height} onChange={e => setTempStats({...tempStats, height: Number(e.target.value)})} className="w-full bg-black border border-zinc-800 p-4 text-2xl font-black text-white outline-none" />
            </div>
          </div>
        </div>

        <div className="p-6 bg-zinc-900 border border-zinc-800 space-y-4">
          <h3 className="text-[#CCFF00] font-black italic uppercase text-sm tracking-widest flex items-center gap-2">
            <Utensils size={18} /> ILE RAZY ŻRESZ?
          </h3>
          <div className="grid grid-cols-4 gap-2">
            {[3, 4, 5, 6].map(n => (
              <button 
                key={n}
                onClick={() => setTempStats({...tempStats, mealCount: n})}
                className={`py-3 border-2 font-black italic text-xs ${tempStats.mealCount === n ? 'bg-white border-white text-black' : 'border-zinc-800 text-zinc-600 bg-black'}`}
              >
                {n}
              </button>
            ))}
          </div>
        </div>

        <div className="p-6 bg-zinc-900 border border-zinc-800 space-y-4">
          <h3 className="text-[#CCFF00] font-black italic uppercase text-sm tracking-widest flex items-center gap-2">
            <Target size={18} /> CEL
          </h3>
          <div className="flex gap-2">
            {(['MASA', 'UTRZYMANIE'] as UserGoal[]).map(g => (
              <button key={g} onClick={() => setTempStats({...tempStats, goal: g})} className={`flex-1 py-4 border-2 font-black italic uppercase text-xs ${tempStats.goal === g ? 'bg-white border-white text-black' : 'border-zinc-800 text-zinc-600 bg-black'}`}>{g}</button>
            ))}
          </div>
        </div>

        <div className="p-6 bg-zinc-900 border border-zinc-800 space-y-4">
          <h3 className="text-[#CCFF00] font-black italic uppercase text-sm tracking-widest flex items-center gap-2">
            <Zap size={18} /> DZIEŃ
          </h3>
          <div className="flex gap-2">
            <button onClick={() => setTempStats({...tempStats, isTrainingDay: true})} className={`flex-1 py-4 border-2 font-black italic uppercase text-xs flex flex-col items-center gap-2 ${tempStats.isTrainingDay ? 'bg-[#CCFF00] border-[#CCFF00] text-black shadow-[0_0_20px_#CCFF00]' : 'border-zinc-800 text-zinc-600 bg-black'}`}><Dumbbell size={20} /> TRENING</button>
            <button onClick={() => setTempStats({...tempStats, isTrainingDay: false})} className={`flex-1 py-4 border-2 font-black italic uppercase text-xs flex flex-col items-center gap-2 ${!tempStats.isTrainingDay ? 'bg-zinc-700 border-zinc-700 text-white' : 'border-zinc-800 text-zinc-600 bg-black'}`}>💤 REGEN</button>
          </div>
        </div>

        <div className="p-6 border-2 border-[#CCFF00] bg-zinc-950 space-y-4">
           <div className="flex justify-between items-end">
              <h3 className="text-[11px] font-black uppercase text-[#CCFF00] italic">TARGET NA POSIŁEK:</h3>
              <span className="text-xl font-black italic text-white">{targets.mealP}P / {targets.mealC}C</span>
           </div>
           <div className="grid grid-cols-2 gap-4 border-t border-zinc-800 pt-4">
              <div>
                <span className="text-[9px] font-black text-zinc-500 uppercase block">DZIEŃ: BIAŁKO</span>
                <span className="text-xl font-black text-[#CCFF00] italic">{targets.protein}g</span>
              </div>
              <div>
                <span className="text-[9px] font-black text-zinc-500 uppercase block">DZIEŃ: KCAL</span>
                <span className="text-xl font-black text-white italic">{targets.calories}</span>
              </div>
           </div>
        </div>
      </div>

      <button onClick={() => { onSave(tempStats); onClose(); }} className="w-full bg-[#CCFF00] text-black py-6 font-black uppercase italic text-xl shadow-[0_0_30px_rgba(204,255,0,0.3)] active:scale-95 transition-transform shrink-0"><Check className="inline-block mr-2" /> ZATWIERDŹ STATY</button>
    </div>
  );
};
