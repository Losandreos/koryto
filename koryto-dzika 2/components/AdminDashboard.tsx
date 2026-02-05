
import React, { useState } from 'react';
import { X, Save, Trash2, Edit, LayoutDashboard, Settings as SettingsIcon, Database, ShieldCheck, RefreshCw, Globe, Github, Terminal, FileCode, CheckSquare } from 'lucide-react';
import { Recipe, AppSettings } from '../types';

interface AdminDashboardProps {
  recipes: Recipe[];
  settings: AppSettings;
  onUpdateSettings: (s: AppSettings) => void;
  onDeleteRecipe: (id: number) => void;
  onEditRecipe: (r: Recipe) => void;
  onClose: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ recipes, settings, onUpdateSettings, onDeleteRecipe, onEditRecipe, onClose }) => {
  const [tempSettings, setTempSettings] = useState(settings);
  const [activeTab, setActiveTab] = useState<'CONTENT' | 'CONFIG' | 'DEPLOY'>('CONTENT');

  const handleSaveSettings = () => {
    onUpdateSettings(tempSettings);
    alert("USTAWIENIA ZAPISANE!");
  };

  const requiredFiles = [
    "index.html", "index.tsx", "App.tsx", "types.ts", "constants.ts", "manifest.json", "sw.js",
    "components/AdminDashboard.tsx", "components/InstallGuide.tsx", "components/AddRecipeModal.tsx",
    "components/BodyStatsModal.tsx", "components/MacroTracker.tsx", "components/QuickLogModal.tsx",
    "components/SOSGrid.tsx", "components/ShoppingList.tsx", "components/SwipeCard.tsx",
    "components/RecipeDetail.tsx", "components/CategoryFilters.tsx", "components/StoreBadge.tsx", "components/PromoModal.tsx"
  ];

  return (
    <div className="fixed inset-0 z-[300] bg-zinc-950 flex flex-col font-sans">
      <header className="p-6 border-b-2 border-[#CCFF00] bg-black flex justify-between items-center">
        <div className="flex items-center gap-3">
          <ShieldCheck className="text-[#CCFF00]" size={32} />
          <div>
            <h2 className="text-xl font-black italic uppercase tracking-tighter">PANEL STEROWANIA MASY</h2>
            <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Admin Access Only</p>
          </div>
        </div>
        <button onClick={onClose} className="p-2 bg-zinc-900 border border-zinc-700 text-white">
          <X size={24} />
        </button>
      </header>

      <nav className="flex bg-zinc-900 p-1">
        <button 
          onClick={() => setActiveTab('CONTENT')}
          className={`flex-1 py-3 flex items-center justify-center gap-2 font-black uppercase italic text-[10px] transition-all ${activeTab === 'CONTENT' ? 'bg-[#CCFF00] text-black' : 'text-zinc-500'}`}
        >
          <Database size={14} /> BAZA
        </button>
        <button 
          onClick={() => setActiveTab('CONFIG')}
          className={`flex-1 py-3 flex items-center justify-center gap-2 font-black uppercase italic text-[10px] transition-all ${activeTab === 'CONFIG' ? 'bg-[#CCFF00] text-black' : 'text-zinc-500'}`}
        >
          <SettingsIcon size={14} /> CONFIG
        </button>
        <button 
          onClick={() => setActiveTab('DEPLOY')}
          className={`flex-1 py-3 flex items-center justify-center gap-2 font-black uppercase italic text-[10px] transition-all ${activeTab === 'DEPLOY' ? 'bg-[#CCFF00] text-black' : 'text-zinc-500'}`}
        >
          <Globe size={14} /> PUBLIKACJA
        </button>
      </nav>

      <main className="flex-1 overflow-y-auto p-6 pb-20">
        {activeTab === 'CONTENT' && (
          <div className="space-y-4 animate-in fade-in duration-300">
            <div className="flex justify-between items-end mb-4">
               <h3 className="font-black italic uppercase text-lg">WSZYSTKIE RECEPTURY ({recipes.length})</h3>
               <button className="text-[10px] font-black uppercase text-[#CCFF00] flex items-center gap-1"><RefreshCw size={10} /> ODŚWIEŻ</button>
            </div>
            <div className="grid grid-cols-1 gap-2">
              {recipes.map(recipe => (
                <div key={recipe.id} className="bg-zinc-900 border border-zinc-800 p-4 flex items-center justify-between group">
                  <div className="flex items-center gap-4">
                    <img src={recipe.image_url} className="w-12 h-12 object-cover border border-zinc-700" alt="" />
                    <div>
                      <h4 className="font-black uppercase text-sm">{recipe.title}</h4>
                      <p className="text-[10px] text-zinc-500 uppercase">{recipe.store} • {recipe.protein}g BIAŁKA</p>
                    </div>
                  </div>
                  <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button onClick={() => onEditRecipe(recipe)} className="p-2 bg-zinc-800 text-blue-500 border border-zinc-700 hover:bg-zinc-700"><Edit size={16} /></button>
                    <button onClick={() => { if(confirm('USUNĄĆ TO KORYTO?')) onDeleteRecipe(recipe.id); }} className="p-2 bg-zinc-800 text-red-500 border border-zinc-700 hover:bg-zinc-700"><Trash2 size={16} /></button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'CONFIG' && (
          <div className="space-y-8 animate-in fade-in duration-300">
            <div className="space-y-4 bg-zinc-900 p-6 border border-zinc-800">
              <h3 className="font-black italic uppercase text-[#CCFF00]">PODSTAWOWE TEKSTY</h3>
              
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-zinc-500">NAZWA APLIKACJI</label>
                <input 
                  value={tempSettings.appName} 
                  onChange={e => setTempSettings({...tempSettings, appName: e.target.value})}
                  className="w-full bg-black border border-zinc-800 p-3 font-black uppercase outline-none focus:border-[#CCFF00]"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-zinc-500">SLOGAN DZIKA</label>
                <input 
                  value={tempSettings.slogan} 
                  onChange={e => setTempSettings({...tempSettings, slogan: e.target.value})}
                  className="w-full bg-black border border-zinc-800 p-3 font-bold italic outline-none focus:border-[#CCFF00]"
                />
              </div>
            </div>

            <button 
              onClick={handleSaveSettings}
              className="w-full bg-[#CCFF00] text-black py-4 font-black uppercase italic shadow-[0_0_30px_rgba(204,255,0,0.3)]"
            >
              <Save className="inline-block mr-2" size={20} /> ZAPISZ KONFIGURACJĘ
            </button>
          </div>
        )}

        {activeTab === 'DEPLOY' && (
          <div className="space-y-6 animate-in slide-in-from-right-4 duration-300 pb-10">
            <div className="p-6 bg-zinc-900 border border-[#CCFF00]/30 space-y-4">
              <h3 className="text-xl font-black italic uppercase text-[#CCFF00] flex items-center gap-2">
                <Github size={24} /> GITHUB PAGES GUIDE
              </h3>
              
              <div className="space-y-6">
                 <div className="space-y-4">
                    <h4 className="text-[10px] font-black uppercase text-zinc-500 tracking-widest flex items-center gap-2">
                       <CheckSquare size={14} /> 1. LISTA PLIKÓW DO WRZUCENIA:
                    </h4>
                    <div className="grid grid-cols-1 gap-1 bg-black p-3 border border-zinc-800">
                       {requiredFiles.map(file => (
                         <div key={file} className="flex items-center gap-2 text-[10px] text-zinc-400 font-mono">
                           <FileCode size={12} className="text-[#CCFF00]" /> {file}
                         </div>
                       ))}
                    </div>
                 </div>

                 <div className="space-y-4">
                    <h4 className="text-[10px] font-black uppercase text-zinc-500 tracking-widest">2. INSTRUKCJA KROK PO KROKU:</h4>
                    <div className="space-y-4">
                      <div className="flex gap-4">
                        <div className="w-8 h-8 rounded-full bg-[#CCFF00] text-black flex items-center justify-center font-black shrink-0">1</div>
                        <p className="text-xs font-bold uppercase italic text-white pt-1">
                          STWÓRZ REPO <span className="text-[#CCFF00]">"KORYTO-DZIKA"</span> NA GITHUBIE.
                        </p>
                      </div>
                      <div className="flex gap-4">
                        <div className="w-8 h-8 rounded-full bg-[#CCFF00] text-black flex items-center justify-center font-black shrink-0">2</div>
                        <p className="text-xs font-bold uppercase italic text-white pt-1">
                          WRZUĆ WSZYSTKIE PLIKI Z LISTY POWYŻEJ (ZACHOWAJ FOLDER <span className="text-[#CCFF00]">components/</span>).
                        </p>
                      </div>
                      <div className="flex gap-4">
                        <div className="w-8 h-8 rounded-full bg-[#CCFF00] text-black flex items-center justify-center font-black shrink-0">3</div>
                        <p className="text-xs font-bold uppercase italic text-white pt-1">
                          W SETTINGS -> PAGES WYBIERZ BRANCH <span className="text-[#CCFF00]">MAIN</span>.
                        </p>
                      </div>
                    </div>
                 </div>
              </div>

              <div className="mt-8 p-4 bg-black border-l-4 border-blue-500">
                <div className="flex items-center gap-2 mb-2">
                  <Terminal size={16} className="text-blue-500" />
                  <span className="text-[10px] font-black uppercase text-blue-500 italic tracking-widest">URL TWOJEGO KORYTA</span>
                </div>
                <p className="text-[10px] font-bold text-zinc-300 uppercase italic leading-tight">
                  https://TWOJ-NICK.github.io/koryto-dzika/
                </p>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};
