
import React from 'react';
import { UserStats } from '../types';
import { Zap, Activity, Plus } from 'lucide-react';

interface MacroTrackerProps {
  consumed: { protein: number; carbs: number; fat: number };
  userStats: UserStats;
  onOpenQuickLog: () => void;
}

export const MacroTracker: React.FC<MacroTrackerProps> = ({ consumed, userStats, onOpenQuickLog }) => {
  // Bro-Logic Goals (Precision mode)
  // Mifflin-St Jeor + Dzik Multipliers
  const bmr = 10 * userStats.weight + 6.25 * userStats.height - 5 * 25 + 5;
  const activityMult = userStats.isTrainingDay ? 1.6 : 1.2;
  let tdee = bmr * activityMult;

  if (userStats.goal === 'MASA') {
    tdee += 500;
  }

  const proteinGoal = Math.round(userStats.weight * 2.2);
  const fatGoal = Math.round(userStats.weight * 0.9);
  const carbsGoal = Math.round((tdee - (proteinGoal * 4 + fatGoal * 9)) / 4);

  const pProgress = Math.min(100, (consumed.protein / proteinGoal) * 100);
  const cProgress = Math.max(0, Math.min(100, (consumed.carbs / carbsGoal) * 100));

  return (
    <div className="mb-4 bg-zinc-900/50 border border-zinc-800 p-3 space-y-3 relative group">
      <div className="flex justify-between items-center px-1">
        <div className="flex items-center gap-1.5">
          <Activity size={12} className="text-[#CCFF00]" />
          <span className="text-[10px] font-black uppercase tracking-tighter text-zinc-400 italic">
            STATUS: {userStats.goal} ({userStats.isTrainingDay ? 'TRENING' : 'REGEN'})
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-black text-zinc-600 uppercase italic">CEL DNIA</span>
          <button 
            onClick={onOpenQuickLog}
            className="p-1 bg-[#CCFF00] text-black rounded-none hover:scale-110 transition-transform active:scale-90"
            title="Dodaj Szybką Szamę"
          >
            <Plus size={12} />
          </button>
        </div>
      </div>

      <div className="space-y-2">
        {/* Protein Bar */}
        <div className="space-y-1">
          <div className="flex justify-between items-end">
            <span className="text-[9px] font-black text-[#CCFF00] uppercase">BIAŁKO (MASA)</span>
            <span className="text-[10px] font-black text-white">
              {consumed.protein} <span className="text-zinc-500">/ {proteinGoal}g</span>
            </span>
          </div>
          <div className="h-1.5 w-full bg-zinc-950 border border-zinc-800 relative overflow-hidden">
            <div 
              className="h-full bg-[#CCFF00] shadow-[0_0_10px_#CCFF00] transition-all duration-700" 
              style={{ width: `${pProgress}%` }}
            />
          </div>
        </div>

        {/* Carbs Bar */}
        <div className="space-y-1">
          <div className="flex justify-between items-end">
            <span className="text-[9px] font-black text-blue-500 uppercase">WĘGLE (PALIWO)</span>
            <span className="text-[10px] font-black text-white">
              {consumed.carbs} <span className="text-zinc-500">/ {carbsGoal}g</span>
            </span>
          </div>
          <div className="h-1.5 w-full bg-zinc-950 border border-zinc-800 relative overflow-hidden">
            <div 
              className="h-full bg-blue-500 shadow-[0_0_10px_#3b82f6] transition-all duration-700" 
              style={{ width: `${cProgress}%` }}
            />
          </div>
        </div>
      </div>
      
      {pProgress >= 100 && cProgress >= 100 && (
        <div className="text-[8px] font-black text-[#CCFF00] text-center animate-pulse tracking-widest uppercase mt-1">
          DZIK JEST NAJEDZONY. MOŻNA LECIEĆ NA TRENING! 🐗
        </div>
      )}
    </div>
  );
};
