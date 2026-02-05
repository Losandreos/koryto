
import React, { useState, useMemo } from 'react';
import { X, ShoppingCart, CheckCircle2, UtensilsCrossed, Zap, Plus, Info, ShieldAlert, AlertTriangle, ShoppingBasket, ExternalLink } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Recipe, UserStats } from '../types';
import { StoreBadge } from './StoreBadge';

interface RecipeDetailProps {
  recipe: Recipe;
  userStats: UserStats;
  onLogPortion?: (multiplier: number) => void;
  onNavigateToCategory?: (category: any) => void;
  onClose: () => void;
}

export const RecipeDetail: React.FC<RecipeDetailProps> = ({ recipe, userStats, onLogPortion, onNavigateToCategory, onClose }) => {
  const [imgError, setImgError] = useState(false);
  const [isImageExpanded, setIsImageExpanded] = useState(false);
  const [multiplier, setMultiplier] = useState(1);
  const [justAdded, setJustAdded] = useState(false);

  const isDopychacz = recipe.tags.includes('DOPYCHACZ');
  const isBreakfast = recipe.tags.includes('DZIKIE ŚNIADANIA');
  const isSklepowaAkcja = recipe.tags.includes('SKLEPOWA AKCJA');
  const isTraining = recipe.tags.includes('PO TRENINGU') || recipe.tags.includes('DUŻO MIĘSA');

  // Per-meal target calculation for a Dzik
  const mealTargets = useMemo(() => {
    const bmr = 10 * userStats.weight + 6.25 * userStats.height - 5 * 25 + 5;
    const activityMult = userStats.isTrainingDay ? 1.6 : 1.2;
    let tdee = bmr * activityMult;
    if (userStats.goal === 'MASA') tdee += 500;
    
    const dailyProtein = Math.round(userStats.weight * 2.2);
    const dailyCarbs = Math.round((tdee - (dailyProtein * 4 + (userStats.weight * 0.9) * 9)) / 4);
    
    return {
      protein: Math.round(dailyProtein / userStats.mealCount),
      carbs: Math.round(dailyCarbs / userStats.mealCount)
    };
  }, [userStats]);

  const parseAmount = (amount: string, mult: number) => {
    return amount.replace(/(\d+(?:\.\d+)?)/g, (match) => {
      const num = parseFloat(match);
      return (Math.round((num * mult) * 10) / 10).toString();
    });
  };

  const handleAddToDiet = () => {
      if (onLogPortion) {
          onLogPortion(multiplier);
          setJustAdded(true);
          setTimeout(() => setJustAdded(false), 2000);
      }
  };

  const handleSOS = () => {
    if (onNavigateToCategory) {
        onNavigateToCategory('DOPYCHACZ');
        onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-[150] bg-black overflow-y-auto pb-48 scroll-smooth">
      <AnimatePresence>
        {isImageExpanded && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsImageExpanded(false)}
            className="fixed inset-0 z-[200] bg-black flex items-center justify-center p-2 cursor-zoom-out"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="relative w-full max-h-[90vh] flex items-center justify-center"
            >
              <img 
                src={recipe.image_url} 
                alt={recipe.title} 
                className="max-w-full max-h-full object-contain shadow-[0_0_50px_rgba(0,0,0,0.5)] border border-white/10"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative h-80 bg-zinc-900 shrink-0 group overflow-hidden">
        {imgError ? (
          <div className="w-full h-full flex items-center justify-center bg-zinc-900 border-b border-zinc-800">
            <UtensilsCrossed size={48} className="text-zinc-800" />
          </div>
        ) : (
          <img 
            src={recipe.image_url} 
            alt={recipe.title} 
            onError={() => setImgError(true)}
            onClick={() => setIsImageExpanded(true)}
            className="w-full h-full object-cover grayscale-[10%] brightness-75 cursor-zoom-in group-hover:scale-105 transition-transform duration-700"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent pointer-events-none"></div>
        
        <div className="absolute top-4 left-4 right-4 flex justify-between items-start z-20">
          <div className={`px-3 py-1.5 border backdrop-blur-md text-[9px] font-black uppercase tracking-widest italic flex items-center gap-2 ${isSklepowaAkcja ? 'bg-blue-600/40 border-blue-400 text-blue-100' : 'bg-black/40 border-white/10 text-[#CCFF00]'}`}>
            {isSklepowaAkcja ? <ShoppingBasket size={12} /> : isDopychacz ? <ShieldAlert size={12} className="text-red-600" /> : <Info size={12} />} 
            {isSklepowaAkcja ? 'SKLEPOWA AKCJA' : isDopychacz ? 'MODUŁ DOPYCHACZA' : 'POWIĘKSZ KORYTO'}
          </div>
          <button 
              onClick={onClose}
              className="bg-black/60 backdrop-blur-md p-3 rounded-full border border-white/20 text-white active:scale-90 shadow-xl"
          >
              <X size={24} />
          </button>
        </div>

        <div className="absolute bottom-6 left-6 pointer-events-none">
          <StoreBadge store={recipe.store} />
          <h2 className="text-3xl font-black italic uppercase tracking-tighter mt-2 leading-tight text-white max-w-[95%] drop-shadow-2xl">
            {recipe.title}
          </h2>
        </div>
      </div>

      <div className="p-6 space-y-8">
        {/* MACRO HIGHLIGHT SECTION */}
        <div className="grid grid-cols-2 gap-3">
            <div className={`flex flex-col items-center justify-center p-5 border-2 bg-zinc-900 shadow-lg ${isSklepowaAkcja ? 'border-[#CCFF00] shadow-[#CCFF00]/10' : 'border-[#CCFF00]/30'}`}>
                <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-1 italic">BIAŁKO (B)</span>
                <span className="text-4xl font-black text-[#CCFF00] italic leading-none">{Math.round(recipe.protein * multiplier)}g</span>
                <div className="w-full h-1 bg-zinc-800 mt-3 relative overflow-hidden">
                    <div className="absolute inset-0 bg-[#CCFF00]" style={{ width: '80%' }} />
                </div>
            </div>
            <div className={`flex flex-col items-center justify-center p-5 border-2 bg-zinc-900 shadow-lg ${isSklepowaAkcja ? 'border-blue-500 shadow-blue-500/10' : 'border-blue-500/30'}`}>
                <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-1 italic">WĘGLE (W)</span>
                <span className="text-4xl font-black text-blue-500 italic leading-none">{Math.round(recipe.carbs * multiplier)}g</span>
                <div className="w-full h-1 bg-zinc-800 mt-3 relative overflow-hidden">
                    <div className="absolute inset-0 bg-blue-500" style={{ width: '90%' }} />
                </div>
            </div>
        </div>

        {/* LOGIKA ZAKUPÓW / RATIONALE */}
        {(isSklepowaAkcja || recipe.dzik_rationale) && (
          <div className={`${isSklepowaAkcja ? 'bg-blue-600/10 border-blue-600' : 'bg-[#CCFF00]/10 border-[#CCFF00]'} border-l-4 p-4 space-y-2`}>
             <h4 className={`text-[10px] font-black ${isSklepowaAkcja ? 'text-blue-400' : 'text-[#CCFF00]'} uppercase italic flex items-center gap-2`}>
                <Info size={14} /> {isSklepowaAkcja ? 'LOGIKA ZAKUPÓW' : 'LOGIKA DZIKA'}
             </h4>
             <p className="text-zinc-300 font-bold text-xs uppercase leading-snug italic tracking-tight">
                {recipe.dzik_rationale || (isSklepowaAkcja ? "TO KOMBO ZOSTAŁO SKONSTRUOWANE TAK, BYŚ MÓGŁ JE ZJEŚĆ NATYCHMIAST PO WYJŚCIU ZE SKLEPU. ZERO CZEKANIA, ZERO GOTOWANIA." : "")}
             </p>
          </div>
        )}

        {/* INGREDIENTS / SHOPPING LIST */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
                <ShoppingBasket size={20} className={isSklepowaAkcja ? "text-blue-500" : "text-[#CCFF00]"} />
                <h3 className="text-2xl font-black italic uppercase tracking-tighter">LISTA ZAKUPÓW</h3>
            </div>
            <div className="flex gap-1">
                {[1, 2].map(m => (
                    <button 
                        key={m} 
                        onClick={() => setMultiplier(m)}
                        className={`w-8 h-8 flex items-center justify-center text-[10px] font-black border ${multiplier === m ? 'bg-white text-black' : 'text-zinc-500 border-zinc-800'}`}
                    >
                        x{m}
                    </button>
                ))}
            </div>
          </div>
          <ul className="grid grid-cols-1 gap-2">
            {recipe.ingredients.map((ing, i) => (
              <li key={i} className="flex justify-between items-center bg-zinc-900/40 p-4 border border-zinc-800">
                <div className="flex flex-col">
                    <span className="font-black text-[#CCFF00] uppercase text-[10px] italic tracking-widest mb-0.5">KUP:</span>
                    <span className="font-bold text-white uppercase text-xs tracking-tight">{ing.item}</span>
                </div>
                <span className="text-[#CCFF00] font-black text-sm italic bg-black px-2 py-1 border border-zinc-800">
                  {parseAmount(ing.amount, multiplier)}
                </span>
              </li>
            ))}
          </ul>
        </section>

        {/* DZIKIE PRZYPOMNIENIE */}
        {(isBreakfast || isTraining) && (
          <div className="bg-[#CCFF00]/5 border-2 border-dashed border-[#CCFF00] p-5 space-y-2">
             <h4 className="text-[12px] font-black uppercase text-[#CCFF00] italic flex items-center gap-2">
                <AlertTriangle size={16} /> DZIKIE PRZYPOMNIENIE
             </h4>
             <p className="text-zinc-200 font-bold text-[10px] uppercase leading-tight tracking-tight italic relative z-10">
                "NIE WLAZŁO CAŁE? JEŚLI ZOSTAWIŁEŚ POŁOWĘ SZAMY, MUSISZ TO DOBIĆ WĘGLAMI Z SEKCJI <span className="text-red-600">DOPYCHACZ</span>. ROŚNIJ MĄDRZE – NIE DOPUŚĆ DO DEGRADACJI MIĘŚNI!"
             </p>
          </div>
        )}
      </div>

      {/* FOOTER ACTIONS */}
      <div className="fixed bottom-0 left-0 right-0 p-6 bg-black border-t-2 border-zinc-800 z-50 flex flex-col gap-3">
          <div className="flex gap-3">
              {!isDopychacz && (
                  <button 
                    onClick={handleSOS}
                    className="flex-1 py-4 bg-red-950/40 border-2 border-red-600 text-red-500 font-black uppercase italic text-xs flex items-center justify-center gap-2 active:scale-95"
                  >
                    <Zap size={16} fill="currentColor" /> SOS / DOPYCHACZ
                  </button>
              )}
              <button 
                onClick={handleAddToDiet}
                className={`flex-[2] py-4 font-black uppercase italic text-sm flex items-center justify-center gap-3 transition-all ${
                    justAdded ? 'bg-white text-black scale-95' : isSklepowaAkcja ? 'bg-blue-600 text-white shadow-[0_0_20px_rgba(37,99,235,0.3)]' : 'bg-[#CCFF00] text-black shadow-[0_0_20px_rgba(204,255,0,0.3)]'
                }`}
              >
                {justAdded ? (
                    <><CheckCircle2 size={18} /> WRZUCONE DO KORYTA!</>
                ) : (
                    <><ShoppingBasket size={18} /> {isSklepowaAkcja ? "DODAJ DO ZAKUPÓW" : `DODAJ x${multiplier} DO DIETY`}</>
                )}
              </button>
          </div>
          <p className="text-center text-[8px] font-black text-zinc-600 uppercase italic tracking-widest">
              * MAKRO DLA x{multiplier} PORCJI | SUMA: {Math.round((recipe.protein + recipe.carbs + recipe.fat) * 4 * multiplier)} KCAL
          </p>
      </div>
    </div>
  );
};
