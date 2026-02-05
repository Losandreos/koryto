
import React from 'react';
import { RecipeTag } from '../types';

interface CategoryFiltersProps {
  selected: RecipeTag;
  onSelect: (tag: RecipeTag) => void;
}

export const CategoryFilters: React.FC<CategoryFiltersProps> = ({ selected, onSelect }) => {
  const categories: { label: string; value: RecipeTag }[] = [
    { label: 'WSZYSTKO', value: 'WSZYSTKO' },
    { label: '🍳 ŚNIADANIA', value: 'DZIKIE ŚNIADANIA' },
    { label: '🍲 OBIADY ШЕФА', value: 'OBIADY' },
    { label: '🛒 SKLEPOWA AKCJA', value: 'SKLEPOWA AKCJA' },
    { label: '🚀 DOPYCHACZ', value: 'DOPYCHACZ' },
    { label: '⚡ SZYBKA AKCJA', value: 'SZYBKA AKCJA' },
    { label: '🪶 LIGHT DZIK', value: 'LIGHT DZIK' },
    { label: '🍚 BIAŁE WĘGLE', value: 'BIAŁE WĘGLE' },
    { label: '🥤 PŁYNNE PALIWO', value: 'PŁYNNE PALIWO' },
    { label: '🍕 GOTOWCE', value: 'GOTOWCE' },
    { label: 'PO TRENINGU', value: 'PO TRENINGU' },
    { label: 'DUŻO MIĘSA', value: 'DUŻO MIĘSA' },
    { label: 'SZTOS (FEST)', value: 'SZTOS' },
  ];

  return (
    <div className="flex overflow-x-auto gap-2 py-2 no-scrollbar">
      {categories.map((cat) => {
        const isActive = selected === cat.value;
        const isDopychacz = cat.value === 'DOPYCHACZ';
        const isAkcja = cat.value === 'SKLEPOWA AKCJA';
        const isObiady = cat.value === 'OBIADY';
        const isBreakfast = cat.value === 'DZIKIE ŚNIADANIA';
        const isSpecial = ['LIGHT DZIK', 'BIAŁE WĘGLE', 'SZYBKIE JAJO', 'PŁYNNE PALIWO', 'GOTOWCE', 'OBIADY', 'SKLEPOWA AKCJA', 'DZIKIE ŚNIADANIA'].includes(cat.value);
        
        return (
          <button
            key={cat.value}
            onClick={() => onSelect(cat.value)}
            className={`
              whitespace-nowrap px-4 py-1.5 text-[11px] font-black uppercase tracking-tighter italic border-2 transition-all
              ${isActive 
                ? isDopychacz ? 'bg-red-600 border-red-600 text-white shadow-[0_0_20px_rgba(220,38,38,0.5)]' 
                : isAkcja ? 'bg-blue-600 border-blue-600 text-white shadow-[0_0_20px_rgba(37,99,235,0.5)]'
                : isObiady || isBreakfast ? 'bg-[#CCFF00] border-[#CCFF00] text-black shadow-[0_0_20px_rgba(204,255,0,0.5)]'
                : 'bg-[#CCFF00] border-[#CCFF00] text-black shadow-[0_0_15px_rgba(204,255,0,0.4)]' 
                : isDopychacz
                  ? 'bg-zinc-950 border-red-900/40 text-red-500 animate-pulse'
                  : isAkcja
                  ? 'bg-zinc-950 border-blue-900/40 text-blue-400'
                  : isSpecial
                    ? 'bg-zinc-900 border-zinc-700 text-[#CCFF00] hover:border-[#CCFF00]'
                    : 'bg-transparent border-zinc-800 text-zinc-500 hover:border-zinc-600'
              }
            `}
          >
            {cat.label}
          </button>
        );
      })}
      <style>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
};
