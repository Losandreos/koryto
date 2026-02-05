
import React, { useState, useCallback, useEffect, useMemo } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Heart, X, Dumbbell, Trophy, Sparkles, PlusCircle, Activity, Scale, Plus, Download } from 'lucide-react';
import { Recipe, SwipeDirection, RecipeTag, AppSettings, UserStats, ManualLog } from './types';
import { INITIAL_RECIPES } from './constants';
import { SwipeCard } from './components/SwipeCard';
import { ShoppingList } from './components/ShoppingList';
import { PromoModal } from './components/PromoModal';
import { RecipeDetail } from './components/RecipeDetail';
import { CategoryFilters } from './components/CategoryFilters';
import { AddRecipeModal } from './components/AddRecipeModal';
import { AdminDashboard } from './components/AdminDashboard';
import { BodyStatsModal } from './components/BodyStatsModal';
import { MacroTracker } from './components/MacroTracker';
import { QuickLogModal } from './components/QuickLogModal';
import { SOSGrid } from './components/SOSGrid';
import { InstallGuide } from './components/InstallGuide';

const App: React.FC = () => {
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [isStatsModalOpen, setIsStatsModalOpen] = useState(false);
  const [isQuickLogOpen, setIsQuickLogOpen] = useState(false);
  const [isInstallGuideOpen, setIsInstallGuideOpen] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);
  
  const [settings, setSettings] = useState<AppSettings>({
    appName: "KORYTO DZIKA",
    slogan: "Dobre jadło dla potężnych wyników",
    ctaButton: "ŁADUJ BIAŁKO",
    tgLink: "https://t.me/dzik_koryto",
    featuresEnabled: { aiGeneration: true, batchImport: true }
  });

  const [userStats, setUserStats] = useState<UserStats>(() => {
    const saved = localStorage.getItem('dzik_user_stats');
    return saved ? JSON.parse(saved) : { weight: 85, height: 180, isTrainingDay: true, goal: 'MASA', mealCount: 4 };
  });

  const [manualLogs, setManualLogs] = useState<ManualLog[]>(() => {
    const saved = localStorage.getItem('dzik_manual_logs');
    if (!saved) return [];
    try {
      const logs: ManualLog[] = JSON.parse(saved);
      const today = new Date().setHours(0,0,0,0);
      return logs.filter(log => log.timestamp >= today);
    } catch { return []; }
  });

  const [selectedCategory, setSelectedCategory] = useState<RecipeTag>('WSZYSTKO');
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [likedRecipes, setLikedRecipes] = useState<{recipe: Recipe, multiplier: number}[]>([]);
  const [customRecipes, setCustomRecipes] = useState<Recipe[]>([]);
  
  const [isFavoritesOpen, setIsFavoritesOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingRecipe, setEditingRecipe] = useState<Recipe | null>(null);
  const [viewingRecipeDetail, setViewingRecipeDetail] = useState<Recipe | null>(null);
  
  const [swipeCount, setSwipeCount] = useState(0);
  const [showPromo, setShowPromo] = useState(false);
  const [showHeartAnim, setShowHeartAnim] = useState(false);

  useEffect(() => {
    // Check if running as PWA
    if (window.matchMedia('(display-mode: standalone)').matches || (window.navigator as any).standalone) {
      setIsStandalone(true);
    }

    const saved = localStorage.getItem('protein_swipe_custom_recipes');
    if (saved) {
      try {
        setCustomRecipes(JSON.parse(saved));
      } catch (e) { console.error(e); }
    }
  }, []);

  useEffect(() => {
    const allAvailable = [...INITIAL_RECIPES, ...customRecipes];
    let filtered = [...allAvailable];
    if (selectedCategory !== 'WSZYSTKO') {
      filtered = allAvailable.filter(r => r.tags.includes(selectedCategory));
    }
    const isGridView = selectedCategory === 'DOPYCHACZ' || selectedCategory === 'SKLEPOWA AKCJA';
    if (isGridView) {
      setRecipes(filtered);
    } else {
      setRecipes(filtered.sort(() => Math.random() - 0.5));
    }
  }, [selectedCategory, customRecipes.length]);

  useEffect(() => {
    localStorage.setItem('dzik_manual_logs', JSON.stringify(manualLogs));
  }, [manualLogs]);

  const saveUserStats = (stats: UserStats) => {
    setUserStats(stats);
    localStorage.setItem('dzik_user_stats', JSON.stringify(stats));
  };

  const handleUpdateRecipe = useCallback((updated: Recipe) => {
    setCustomRecipes(prev => {
      const next = prev.map(old => old.id === updated.id ? updated : old);
      localStorage.setItem('protein_swipe_custom_recipes', JSON.stringify(next));
      return next;
    });
    setRecipes(prev => prev.map(r => r.id === updated.id ? updated : r));
    setEditingRecipe(null);
  }, []);

  const handleAddRecipe = useCallback((newRecipe: Recipe) => {
    setCustomRecipes(prev => {
      const next = [newRecipe, ...prev];
      localStorage.setItem('protein_swipe_custom_recipes', JSON.stringify(next));
      return next;
    });
    setRecipes(prev => [newRecipe, ...prev]);
    setIsAddModalOpen(false);
  }, []);

  const handleQuickLog = (log: Omit<ManualLog, 'id' | 'timestamp'>) => {
    const newLog: ManualLog = {
      ...log,
      id: Date.now().toString(),
      timestamp: Date.now()
    };
    setManualLogs(prev => [...prev, newLog]);
  };

  const currentMacros = useMemo(() => {
    const recipeMacros = likedRecipes.reduce((acc, item) => ({
      protein: acc.protein + (item.recipe.protein * item.multiplier),
      carbs: acc.carbs + (item.recipe.carbs * item.multiplier),
      fat: acc.fat + (item.recipe.fat * item.multiplier)
    }), { protein: 0, carbs: 0, fat: 0 });

    const manualMacros = manualLogs.reduce((acc, log) => ({
      protein: acc.protein + log.protein,
      carbs: acc.carbs + log.carbs,
      fat: acc.fat + log.fat
    }), { protein: 0, carbs: 0, fat: 0 });

    return {
      protein: Math.round(recipeMacros.protein + manualMacros.protein),
      carbs: Math.round(recipeMacros.carbs + manualMacros.carbs),
      fat: Math.round(recipeMacros.fat + manualMacros.fat)
    };
  }, [likedRecipes, manualLogs]);

  const handleSwipe = useCallback((direction: SwipeDirection) => {
    if (recipes.length === 0) return;
    const swipedRecipe = recipes[recipes.length - 1];

    if (direction === SwipeDirection.UP) {
      setViewingRecipeDetail(swipedRecipe);
      return;
    }

    if (direction === SwipeDirection.RIGHT) {
      setLikedRecipes(prev => prev.find(i => i.recipe.id === swipedRecipe.id) ? prev : [...prev, { recipe: swipedRecipe, multiplier: 1 }]);
      setShowHeartAnim(true);
      setTimeout(() => setShowHeartAnim(false), 600);
    }
    setRecipes(prev => prev.slice(0, -1));
    setSwipeCount(prev => prev + 1);
  }, [recipes]);

  const handleAddPortionToDiet = (recipe: Recipe, multiplier: number) => {
      setLikedRecipes(prev => {
          const filtered = prev.filter(i => i.recipe.id !== recipe.id);
          return [...filtered, { recipe, multiplier }];
      });
      setShowHeartAnim(true);
      setTimeout(() => setShowHeartAnim(false), 600);
  };

  const isGridView = selectedCategory === 'DOPYCHACZ' || selectedCategory === 'SKLEPOWA AKCJA';

  if (isAdminMode) {
    return <AdminDashboard 
      recipes={[...INITIAL_RECIPES, ...customRecipes]} 
      settings={settings}
      onUpdateSettings={setSettings}
      onDeleteRecipe={(id) => {
        setCustomRecipes(prev => {
          const next = prev.filter(r => r.id !== id);
          localStorage.setItem('protein_swipe_custom_recipes', JSON.stringify(next));
          return next;
        });
      }}
      onEditRecipe={(r) => { setEditingRecipe(r); setIsAdminMode(false); }}
      onClose={() => setIsAdminMode(false)} 
    />;
  }

  return (
    <div className="relative min-h-screen max-w-md mx-auto overflow-hidden bg-black flex flex-col shadow-2xl border-x border-zinc-900 font-sans">
      <header className="pt-6 px-6 pb-2 flex justify-between items-center z-[50] bg-black">
        <div onDoubleClick={() => setIsAdminMode(true)} className="cursor-pointer">
          <h1 className="text-4xl font-black italic tracking-tighter leading-none text-white">
            {settings.appName.split(' ')[0]}<span className="text-[#CCFF00]">{settings.appName.split(' ')[1] || ''}</span>
          </h1>
          <p className="text-[13px] font-black uppercase text-[#CCFF00] tracking-wider leading-none mt-1 italic">
            {settings.slogan}
          </p>
        </div>
        
        <div className="flex gap-2">
          {!isStandalone && (
            <button 
              onClick={() => setIsInstallGuideOpen(true)} 
              className="bg-[#CCFF00] p-3 text-black animate-pulse active:scale-95"
              title="Zainstaluj Aplikację"
            >
              <Download size={24} />
            </button>
          )}
          <button 
            onClick={() => setIsStatsModalOpen(true)} 
            className="bg-zinc-900 border-2 border-blue-600/40 p-3 text-blue-500 active:scale-95"
            title="Twoje Staty"
          >
            <Activity size={24} />
          </button>
          <button onClick={() => setIsFavoritesOpen(true)} className="relative bg-zinc-900 border-2 border-red-600 p-3 text-red-600 active:scale-95">
            <Heart size={24} fill={likedRecipes.length > 0 ? "currentColor" : "none"} />
            {likedRecipes.length > 0 && <span className="absolute -top-2 -right-2 bg-[#CCFF00] text-black text-[11px] font-black w-6 h-6 flex items-center justify-center border-2 border-black">{likedRecipes.length}</span>}
          </button>
        </div>
      </header>

      <div className="px-6 mb-2 z-[50] bg-black">
        <MacroTracker 
          consumed={currentMacros} 
          userStats={userStats} 
          onOpenQuickLog={() => setIsQuickLogOpen(true)} 
        />
        <CategoryFilters selected={selectedCategory} onSelect={setSelectedCategory} />
      </div>

      <main className={`flex-1 relative mx-6 mb-4 mt-2 ${isGridView ? 'overflow-y-auto no-scrollbar' : ''}`}>
        <AnimatePresence mode="popLayout">
          {isGridView ? (
            <SOSGrid items={recipes} onAdd={(r) => handleAddPortionToDiet(r, 1)} onView={(r) => setViewingRecipeDetail(r)} />
          ) : recipes.length > 0 ? (
            recipes.map((recipe, index) => (
              <SwipeCard 
                key={`${selectedCategory}-${recipe.id}`}
                recipe={recipe}
                onSwipe={handleSwipe}
                onEdit={() => setEditingRecipe(recipe)}
                isTop={index === recipes.length - 1}
                index={index}
              />
            ))
          ) : (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute inset-0 flex flex-col items-center justify-center text-center p-8 border-4 border-dashed border-zinc-800">
              <Trophy size={64} className="text-[#CCFF00] mb-4" />
              <h3 className="text-3xl font-black text-white uppercase italic">MISKA PUSTA!</h3>
              <button onClick={() => setSelectedCategory('WSZYSTKO')} className="mt-6 bg-[#CCFF00] text-black font-black py-4 w-full uppercase italic text-xl shadow-lg">LOSUJ PONOWNIE</button>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {!isGridView && recipes.length > 0 && (
        <div className="px-6 pb-8 flex justify-between items-center z-[50] relative">
          <button onClick={() => handleSwipe(SwipeDirection.LEFT)} className="w-16 h-16 rounded-full bg-zinc-900 border-2 border-red-600 flex items-center justify-center text-red-600 active:scale-90"><X size={32} /></button>
          <button onClick={() => setIsAddModalOpen(true)} className="w-12 h-12 rounded-full bg-zinc-900 border border-zinc-700 flex items-center justify-center text-zinc-500 active:scale-90">
             <Plus size={24} />
          </button>
          <button onClick={() => handleSwipe(SwipeDirection.RIGHT)} className="w-20 h-20 rounded-full bg-zinc-900 border-2 border-[#CCFF00] flex items-center justify-center text-[#CCFF00] active:scale-95"><Dumbbell size={40} /></button>
        </div>
      )}

      {isGridView && (
          <div className="px-6 pb-8 z-[50] relative">
            <button 
                onClick={() => setSelectedCategory('WSZYSTKO')}
                className="w-full bg-zinc-900 border border-zinc-700 text-zinc-500 py-4 font-black uppercase italic text-xs tracking-widest"
            >
                POWRÓT DO SWAJPÓW
            </button>
          </div>
      )}

      <AnimatePresence>
        {isInstallGuideOpen && (
          <InstallGuide onClose={() => setIsInstallGuideOpen(false)} />
        )}
        {isStatsModalOpen && (
          <BodyStatsModal 
            stats={userStats} 
            onSave={saveUserStats} 
            onClose={() => setIsStatsModalOpen(false)} 
          />
        )}
        {isQuickLogOpen && (
          <QuickLogModal 
            onAdd={handleQuickLog} 
            onClose={() => setIsQuickLogOpen(false)} 
            recentLogs={manualLogs}
            onClearLogs={() => setManualLogs([])}
          />
        )}
        {isFavoritesOpen && <ShoppingList likedRecipes={likedRecipes.map(i => ({...i.recipe, multiplier: i.multiplier}))} onClear={() => setLikedRecipes([])} onRemoveRecipe={id => setLikedRecipes(l => l.filter(i => i.recipe.id !== id))} onViewRecipe={setViewingRecipeDetail} onClose={() => setIsFavoritesOpen(false)} />}
        {(isAddModalOpen || editingRecipe) && (
          <AddRecipeModal 
            initialData={editingRecipe || undefined} 
            onAdd={handleAddRecipe} 
            onUpdate={handleUpdateRecipe} 
            onBatchAdd={recs => { 
              setCustomRecipes(prev => {
                const next = [...recs, ...prev];
                localStorage.setItem('protein_swipe_custom_recipes', JSON.stringify(next));
                return next;
              });
            }} 
            onClose={() => { setIsAddModalOpen(false); setEditingRecipe(null); }} 
          />
        )}
        {viewingRecipeDetail && (
          <RecipeDetail 
            recipe={viewingRecipeDetail} 
            userStats={userStats}
            onLogPortion={(m) => handleAddPortionToDiet(viewingRecipeDetail, m)}
            onNavigateToCategory={(cat) => setSelectedCategory(cat)}
            onClose={() => setViewingRecipeDetail(null)} 
          />
        )}
      </AnimatePresence>

      <PromoModal isOpen={showPromo} onClose={() => setShowPromo(false)} />
    </div>
  );
};

export default App;
