
import React, { useState } from 'react';
import { motion, PanInfo, useMotionValue, useTransform, animate } from 'framer-motion';
import { Clock, Zap, Flame, Loader2, UtensilsCrossed, Edit2, Info } from 'lucide-react';
import { Recipe, SwipeDirection } from '../types';
import { StoreBadge } from './StoreBadge';

interface SwipeCardProps {
  recipe: Recipe;
  onSwipe: (direction: SwipeDirection) => void;
  onEdit?: () => void;
  isTop: boolean;
  index: number;
}

export const SwipeCard: React.FC<SwipeCardProps> = ({ recipe, onSwipe, onEdit, isTop, index }) => {
  const [imgError, setImgError] = useState(false);
  const [imgLoading, setImgLoading] = useState(true);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const rotate = useTransform(x, [-200, 200], [-25, 25]);
  const opacity = useTransform(x, [-200, -150, 0, 150, 200], [0, 1, 1, 1, 0]);
  
  const likeOpacity = useTransform(x, [20, 100], [0, 1]);
  const nopeOpacity = useTransform(x, [-20, -100], [0, 1]);
  const infoOpacity = useTransform(y, [-20, -100], [0, 1]);
  
  // Fix: Removed unused comma-separated arrays that caused a syntax error in useTransform
  const bgColor = useTransform(
    [x, y],
    (latest: any) => {
        const xVal = latest[0];
        const yVal = latest[1];
        if (yVal < -50) return '#1e1b4b'; // Deep blue for info/preview
        if (xVal > 50) return '#14532d'; // Green for like
        if (xVal < -50) return '#450a0a'; // Red for nope
        return '#18181b';
    }
  );

  const handleDragEnd = (_: any, info: PanInfo) => {
    if (info.offset.x > 80 || info.velocity.x > 500) {
      onSwipe(SwipeDirection.RIGHT);
    } else if (info.offset.x < -80 || info.velocity.x < -500) {
      onSwipe(SwipeDirection.LEFT);
    } else if (info.offset.y < -80 || info.velocity.y < -500) {
      // Trigger preview but keep card (return to center)
      onSwipe(SwipeDirection.UP);
      animate(x, 0);
      animate(y, 0);
    } else {
      animate(x, 0);
      animate(y, 0);
    }
  };

  return (
    <motion.div
      style={{ 
        x, 
        y,
        rotate, 
        opacity, 
        position: 'absolute', 
        zIndex: index,
        width: '100%',
        height: '100%'
      }}
      drag={isTop ? true : false}
      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
      dragElastic={0.7}
      onDragEnd={handleDragEnd}
      whileTap={{ scale: 1.01 }}
      className="cursor-grab active:cursor-grabbing touch-none"
    >
      <motion.div 
        style={{ backgroundColor: bgColor }}
        className="relative w-full h-full bg-zinc-900 border-2 border-zinc-800 rounded-none overflow-hidden shadow-2xl transition-colors"
      >
        {/* Indicators */}
        <motion.div 
          style={{ opacity: likeOpacity }}
          className="absolute top-8 left-8 z-50 border-2 border-[#CCFF00] text-[#CCFF00] font-black px-3 py-1 text-2xl rotate-[-15deg] pointer-events-none uppercase italic"
        >
          ŁADUJ!
        </motion.div>
        <motion.div 
          style={{ opacity: nopeOpacity }}
          className="absolute top-8 right-8 z-50 border-2 border-red-600 text-red-600 font-black px-3 py-1 text-2xl rotate-[15deg] pointer-events-none uppercase italic"
        >
          DLA LESZCZA
        </motion.div>
        <motion.div 
          style={{ opacity: infoOpacity }}
          className="absolute bottom-32 left-1/2 -translate-x-1/2 z-50 border-2 border-blue-400 text-blue-400 font-black px-4 py-2 text-2xl pointer-events-none uppercase italic flex items-center gap-2"
        >
          <Info size={24} /> PODGLĄD
        </motion.div>

        {/* Edit Button */}
        {onEdit && isTop && (
            <button 
                onClick={(e) => { e.stopPropagation(); onEdit(); }}
                className="absolute top-16 right-4 z-[60] bg-black/60 backdrop-blur-md p-3 border border-white/20 text-white rounded-full hover:bg-white hover:text-black transition-all"
            >
                <Edit2 size={20} />
            </button>
        )}

        {/* Image Section */}
        <div className="h-[72%] relative bg-zinc-800">
          {imgLoading && !imgError && (
            <div className="absolute inset-0 flex items-center justify-center">
              <Loader2 className="animate-spin text-zinc-600" size={32} />
            </div>
          )}
          
          {imgError ? (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-zinc-800 to-zinc-900 text-zinc-700">
              <UtensilsCrossed size={48} className="mb-2 opacity-20" />
              <span className="text-[10px] font-black uppercase tracking-widest">Błąd obrazu</span>
            </div>
          ) : (
            <img 
              src={recipe.image_url} 
              alt={recipe.title} 
              onLoad={() => setImgLoading(false)}
              onError={() => {
                setImgError(true);
                setImgLoading(false);
              }}
              className={`w-full h-full object-cover contrast-[105%] transition-opacity duration-300 ${imgLoading ? 'opacity-0' : 'opacity-100'}`}
            />
          )}

          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80"></div>
          
          <div className="absolute top-4 left-4">
            <StoreBadge store={recipe.store} />
          </div>

          <div className="absolute bottom-4 left-5 right-5">
            <h2 className="text-2xl font-black italic tracking-tighter leading-none uppercase drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] text-white">
              {recipe.title}
            </h2>
            <p className="text-[10px] font-bold text-[#CCFF00] uppercase italic mt-1 tracking-widest drop-shadow-md">
              GÓRA: PODGLĄD | BOKI: SWAJP
            </p>
          </div>
        </div>

        <div className="p-5 h-[28%] flex flex-col justify-center">
          <div className="grid grid-cols-3 gap-3">
            <div className="flex flex-col items-center justify-center bg-zinc-900/50 p-2 border-b-2 border-[#CCFF00]">
              <Zap className="text-[#CCFF00] mb-0.5" size={16} />
              <span className="text-xl font-black">{recipe.protein}g</span>
              <span className="text-[8px] text-zinc-500 uppercase font-black tracking-widest">BIAŁKO</span>
            </div>
            <div className="flex flex-col items-center justify-center bg-zinc-900/50 p-2 border-b-2 border-blue-500">
              <Flame className="text-blue-500 mb-0.5" size={16} />
              <span className="text-xl font-black">{recipe.carbs}g</span>
              <span className="text-[8px] text-zinc-500 uppercase font-black tracking-widest">WĘGLE</span>
            </div>
            <div className="flex flex-col items-center justify-center bg-zinc-900/50 p-2 border-b-2 border-red-500">
              <Clock className="text-red-500 mb-0.5" size={16} />
              <span className="text-xl font-black">{recipe.time}'</span>
              <span className="text-[8px] text-zinc-500 uppercase font-black tracking-widest">MINUTY</span>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};
