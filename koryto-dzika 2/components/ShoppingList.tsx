
import React, { useState, useMemo } from 'react';
import { ShoppingBasket, Trash2, Share2, ChevronLeft, CheckCircle2, Circle, Utensils, Eye, Package, ChevronDown, ChevronUp, LayoutList, Combine } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Recipe } from '../types';

interface ShoppingListProps {
  likedRecipes: Recipe[];
  onClear: () => void;
  onRemoveRecipe: (id: number) => void;
  onViewRecipe: (recipe: Recipe) => void;
  onClose: () => void;
}

const DZIK_STAPLES = [
  "Skyr naturalny (Lidl/Biedra)",
  "Jaja kl. L (30 szt)",
  "Pierś z kurczaka (opakowanie XXL)",
  "Twaróg chudy (klin)",
  "Ryż biały / basmati",
  "Oliwa z oliwek",
  "Banan (kiść)",
  "Płatki owsiane"
];

export const ShoppingList: React.FC<ShoppingListProps> = ({ 
  likedRecipes, 
  onClear, 
  onRemoveRecipe, 
  onViewRecipe,
  onClose 
}) => {
  const [isStaplesExpanded, setIsStaplesExpanded] = useState(false);
  const [viewMode, setViewMode] = useState<'per-recipe' | 'unified'>('per-recipe');
  const [boughtItems, setBoughtItems] = useState<Set<string>>(new Set());
  const [boughtStaples, setBoughtStaples] = useState<Set<string>>(new Set());

  // Aggregation logic for Unified List
  const unifiedIngredients = useMemo(() => {
    const map = new Map<string, { amounts: string[], recipes: string[] }>();
    likedRecipes.forEach(recipe => {
      recipe.ingredients.forEach(ing => {
        const name = ing.item.trim().toUpperCase();
        if (!map.has(name)) {
          map.set(name, { amounts: [], recipes: [] });
        }
        const entry = map.get(name)!;
        entry.amounts.push(ing.amount);
        if (!entry.recipes.includes(recipe.title)) {
          entry.recipes.push(recipe.title);
        }
      });
    });
    return Array.from(map.entries()).sort((a, b) => a[0].localeCompare(b[0]));
  }, [likedRecipes]);

  const toggleItem = (key: string) => {
    setBoughtItems(prev => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key); else next.add(key);
      return next;
    });
  };

  const toggleStaple = (item: string) => {
    setBoughtStaples(prev => {
      const next = new Set(prev);
      if (next.has(item)) next.delete(item); else next.add(item);
      return next;
    });
  };

  const handleShare = () => {
    if (likedRecipes.length === 0 && boughtStaples.size === 0) return;
    let text = `🔥 MOJA ZDOBYCZ - KORYTO DZIKA 🔥\n\n`;
    
    if (viewMode === 'unified') {
      text += `🛒 LISTA ZBIORCZA:\n`;
      unifiedIngredients.forEach(([name, data]) => {
        const isBought = boughtItems.has(name);
        text += `${isBought ? '✅' : '⬜'} ${name}: ${data.amounts.join(' + ')}\n`;
      });
    } else {
      likedRecipes.forEach(recipe => {
        text += `[ ${recipe.title.toUpperCase()} ]\n`;
        recipe.ingredients.forEach((ing, idx) => {
          const isBought = boughtItems.has(`${recipe.id}-${idx}`);
          text += `${isBought ? '✅' : '⬜'} ${ing.item}: ${ing.amount}\n`;
        });
        text += `\n`;
      });
    }

    text += `\n📦 BAZA DZIKA:\n`;
    DZIK_STAPLES.forEach(item => {
      text += `${boughtStaples.has(item) ? '✅' : '⬜'} ${item}\n`;
    });
    
    if (navigator.share) {
      navigator.share({ title: 'Moja Zdobycz', text }).catch(() => {});
    } else {
      navigator.clipboard.writeText(text);
      alert('ZDOBYCZ SKOPIOWANA!');
    }
  };

  return (
    <motion.div 
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      exit={{ x: '100%' }}
      className="fixed inset-0 z-[100] bg-black flex flex-col"
    >
      <header className="p-6 border-b-4 border-zinc-800 bg-black flex flex-col gap-4 shrink-0 shadow-2xl">
        <div className="flex items-center justify-between">
          <button onClick={onClose} className="flex items-center gap-2 font-black text-[#CCFF00] uppercase italic">
            <ChevronLeft size={24} /> WRÓĆ
          </button>
          <h1 className="text-xl font-black italic uppercase tracking-tighter">ZDOBYCZ</h1>
          <div className="w-8"></div>
        </div>

        {/* View Mode Switcher */}
        <div className="flex bg-zinc-900 p-1 rounded-none border border-zinc-800">
          <button 
            onClick={() => setViewMode('per-recipe')}
            className={`flex-1 py-2 flex items-center justify-center gap-2 text-[10px] font-black uppercase italic transition-all ${viewMode === 'per-recipe' ? 'bg-[#CCFF00] text-black' : 'text-zinc-500'}`}
          >
            <LayoutList size={14} /> PO BLIUDACH
          </button>
          <button 
            onClick={() => setViewMode('unified')}
            className={`flex-1 py-2 flex items-center justify-center gap-2 text-[10px] font-black uppercase italic transition-all ${viewMode === 'unified' ? 'bg-[#CCFF00] text-black' : 'text-zinc-500'}`}
          >
            <Combine size={14} /> LISTA ZBIORCZA
          </button>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto p-4 space-y-6 pb-40 no-scrollbar">
        {/* BAZA DZIKA SECTION - Collapsible */}
        <section className="bg-zinc-900/40 border-2 border-zinc-800">
          <button 
            onClick={() => setIsStaplesExpanded(!isStaplesExpanded)}
            className="w-full p-4 flex items-center justify-between text-[#CCFF00]"
          >
            <div className="flex items-center gap-2">
              <Package size={20} />
              <h3 className="text-sm font-black italic uppercase tracking-tighter">MOJE KORYTO BAZA (STAPLES)</h3>
            </div>
            {isStaplesExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </button>
          
          <AnimatePresence>
            {isStaplesExpanded && (
              <motion.div 
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden border-t border-zinc-800"
              >
                <div className="p-4 grid grid-cols-1 gap-1.5">
                  {DZIK_STAPLES.map(item => (
                    <button 
                      key={item}
                      onClick={() => toggleStaple(item)}
                      className={`w-full text-left p-3 border flex justify-between items-center transition-all ${
                        boughtStaples.has(item) ? 'bg-zinc-900/10 border-zinc-900/50 opacity-40' : 'bg-zinc-900/40 border-zinc-800'
                      }`}
                    >
                      <span className={`text-[11px] font-bold uppercase tracking-tight ${boughtStaples.has(item) ? 'line-through text-zinc-600' : 'text-zinc-200'}`}>{item}</span>
                      <div className={boughtStaples.has(item) ? 'text-zinc-700' : 'text-[#CCFF00]'}>
                        {boughtStaples.has(item) ? <CheckCircle2 size={16} /> : <Circle size={16} className="opacity-20" />}
                      </div>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </section>

        {/* LIKED RECIPES CONTENT */}
        <div className="space-y-6">
          <h3 className="text-xl font-black italic uppercase tracking-tighter flex items-center gap-2 px-1">
            <Utensils size={20} className="text-[#CCFF00]" /> 
            {viewMode === 'unified' ? 'ZSUMOWANA SZAMA' : 'TWOJE KORYTO'}
          </h3>

          {likedRecipes.length === 0 ? (
            <div className="text-center p-10 border-2 border-dashed border-zinc-800 text-zinc-600">
              <p className="font-black uppercase italic">PUSTO W KOSZYKU. DODAJ COŚ!</p>
            </div>
          ) : viewMode === 'unified' ? (
            /* UNIFIED VIEW */
            <div className="bg-zinc-900/60 border-2 border-zinc-800 p-4">
              <div className="space-y-2">
                {unifiedIngredients.map(([name, data]) => {
                  const isBought = boughtItems.has(name);
                  return (
                    <button 
                      key={name}
                      onClick={() => toggleItem(name)}
                      className={`w-full text-left p-4 border flex flex-col gap-1 transition-all ${
                        isBought ? 'bg-zinc-900/10 border-zinc-900/50 opacity-40' : 'bg-zinc-900/40 border-zinc-800 shadow-sm'
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <span className={`text-xs font-black uppercase italic ${isBought ? 'line-through text-zinc-600' : 'text-[#CCFF00]'}`}>
                          {name}
                        </span>
                        <div className={isBought ? 'text-zinc-700' : 'text-[#CCFF00]'}>
                          {isBought ? <CheckCircle2 size={16} /> : <Circle size={16} className="opacity-20" />}
                        </div>
                      </div>
                      <div className="flex justify-between items-end">
                        <span className={`text-[10px] font-bold ${isBought ? 'text-zinc-700' : 'text-zinc-400'}`}>
                          ILOŚĆ: {data.amounts.join(' + ')}
                        </span>
                        <span className="text-[8px] font-black text-zinc-600 uppercase italic">
                          DLA: {data.recipes.length} DAŃ
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          ) : (
            /* PER-RECIPE VIEW */
            <AnimatePresence mode="popLayout">
              {likedRecipes.map((recipe) => (
                <motion.section 
                  key={recipe.id} 
                  layout 
                  initial={{ opacity: 0, x: 20 }} 
                  animate={{ opacity: 1, x: 0 }} 
                  className="bg-zinc-900/60 border-2 border-zinc-800 overflow-hidden"
                >
                  <div className="relative h-20 cursor-pointer" onClick={() => onViewRecipe(recipe)}>
                    <img src={recipe.image_url} className="w-full h-full object-cover opacity-40" alt="" />
                    <div className="absolute inset-0 bg-gradient-to-r from-black via-black/40 to-transparent p-4 flex flex-col justify-center">
                      <h3 className="text-base font-black uppercase italic text-white drop-shadow-xl">{recipe.title}</h3>
                      <p className="text-[8px] text-[#CCFF00] font-black uppercase tracking-widest italic mt-1">KLIKNIJ PO INSTRUKCJĘ</p>
                    </div>
                  </div>
                  <div className="p-4 bg-zinc-950/40">
                    <ul className="grid grid-cols-1 gap-1.5">
                      {recipe.ingredients.map((ing, idx) => {
                        const key = `${recipe.id}-${idx}`;
                        const isBought = boughtItems.has(key);
                        return (
                          <li key={key}>
                            <button 
                              onClick={() => toggleItem(key)} 
                              className={`w-full text-left p-3 border flex justify-between items-center transition-all ${
                                isBought ? 'bg-zinc-900/10 border-zinc-900/50 opacity-40' : 'bg-zinc-900/40 border-zinc-800'
                              }`}
                            >
                              <div className="flex flex-col">
                                <span className={`text-[10px] font-bold uppercase ${isBought ? 'line-through text-zinc-600' : 'text-zinc-200'}`}>
                                  {ing.item}
                                </span>
                                <span className={`text-[9px] font-black italic ${isBought ? 'text-zinc-700' : 'text-[#CCFF00]'}`}>
                                  {ing.amount}
                                </span>
                              </div>
                              <div className={isBought ? 'text-zinc-700' : 'text-[#CCFF00]'}>
                                {isBought ? <CheckCircle2 size={16} /> : <Circle size={16} className="opacity-20" />}
                              </div>
                            </button>
                          </li>
                        );
                      })}
                    </ul>
                    <button 
                      onClick={() => onRemoveRecipe(recipe.id)}
                      className="w-full mt-3 py-2 border border-red-900/30 text-red-900 text-[9px] font-black uppercase hover:bg-red-950/20 transition-colors"
                    >
                      USUŃ Z LISTY
                    </button>
                  </div>
                </motion.section>
              ))}
            </AnimatePresence>
          )}
        </div>
      </div>

      <div className="p-6 bg-black border-t-4 border-zinc-800 grid grid-cols-2 gap-4 fixed bottom-0 left-0 right-0 z-[120]">
        <button onClick={onClear} className="bg-zinc-900 border-2 border-red-600/40 py-4 font-black text-red-600 uppercase italic text-sm">CZYŚĆ WSZYSTKO</button>
        <button onClick={handleShare} className="bg-[#CCFF00] text-black py-4 font-black uppercase italic text-sm shadow-[0_0_30px_rgba(204,255,0,0.3)] flex items-center justify-center gap-2">
          <Share2 size={18} /> UDOSTĘPNIJ
        </button>
      </div>

      <style>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </motion.div>
  );
};
