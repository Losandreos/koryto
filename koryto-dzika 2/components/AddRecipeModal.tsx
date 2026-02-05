
import React, { useState } from 'react';
import { X, Plus, Trash2, Save, Image as ImageIcon, UtensilsCrossed, Sparkles, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Recipe, RecipeTag, Ingredient } from '../types';
import { GoogleGenAI } from "@google/genai";

interface AddRecipeModalProps {
  initialData?: Recipe;
  onAdd: (recipe: Recipe) => void;
  onUpdate: (recipe: Recipe) => void;
  onBatchAdd: (recipes: Recipe[]) => void;
  onClose: () => void;
}

const AVAILABLE_TAGS: RecipeTag[] = [
  'PO TRENINGU', 'NA WYNOS', 'DUŻO MIĘSA', 'SZTOS', 'SZYBKA AKCJA', 
  'LIGHT DZIK', 'BIAŁE WĘGLE', 'SZYBKIE JAJO', 'PŁYNNE PALIWO', 'GOTOWCE', 'DZIKIE ŚNIADANIA'
];

export const AddRecipeModal: React.FC<AddRecipeModalProps> = ({ 
  initialData, 
  onAdd, 
  onUpdate, 
  onBatchAdd, 
  onClose 
}) => {
  const [title, setTitle] = useState(initialData?.title || '');
  const [protein, setProtein] = useState(initialData?.protein || 0);
  const [carbs, setCarbs] = useState(initialData?.carbs || 0);
  const [fat, setFat] = useState(initialData?.fat || 0);
  const [time, setTime] = useState(initialData?.time || 15);
  const [store, setStore] = useState<'Biedronka' | 'Lidl'>(initialData?.store || 'Biedronka');
  const [ingredients, setIngredients] = useState<Ingredient[]>(initialData?.ingredients || [{ item: '', amount: '' }]);
  const [instructions, setInstructions] = useState<string[]>(initialData?.instructions || ['']);
  const [tags, setTags] = useState<RecipeTag[]>(initialData?.tags || []);
  const [imageUrl, setImageUrl] = useState(initialData?.image_url || '');
  const [imgPreviewError, setImgPreviewError] = useState(false);
  
  // AI Generation states
  const [aiPrompt, setAiPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerateImage = async () => {
    const promptToUse = aiPrompt.trim() || title;
    if (!promptToUse) {
      alert("WPISZ COŚ LUB PADAJ TYTUŁ, ŻEBY AI WIEDZIAŁO CO RYOWAĆ!");
      return;
    }

    setIsGenerating(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      // Optimized for ultra-realistic food photography
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: {
          parts: [
            { text: `Ultra-realistic commercial food photography of: ${promptToUse}. High-end restaurant plating, macro shot, soft professional lighting, vibrant colors, 8k resolution, cinematic atmosphere, appetizing texture.` }
          ]
        },
        config: {
          imageConfig: {
            aspectRatio: "1:1"
          }
        }
      });

      let foundImage = false;
      if (response.candidates?.[0]?.content?.parts) {
        for (const part of response.candidates[0].content.parts) {
          if (part.inlineData) {
            const base64Data = part.inlineData.data;
            const newUrl = `data:image/png;base64,${base64Data}`;
            setImageUrl(newUrl);
            setImgPreviewError(false);
            foundImage = true;
            break;
          }
        }
      }

      if (!foundImage) {
        throw new Error("Nie znaleziono obrazu w odpowiedzi AI");
      }
    } catch (error) {
      console.error("AI Generation failed:", error);
      alert("BŁĄD GENEROWANIA: " + (error instanceof Error ? error.message : "Spróbuj ponownie"));
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSave = () => {
    if (!title) {
        alert("TYTUŁ MUSI BYĆ!");
        return;
    }
    
    const recipe: Recipe = {
      id: initialData?.id || Date.now(),
      title,
      description: initialData?.description || "Nowe koryto w bazie.",
      protein,
      carbs,
      fat,
      time,
      price_est: initialData?.price_est || 0,
      store,
      ingredients: ingredients.filter(i => i.item.trim()),
      instructions: instructions.filter(i => i.trim()),
      image_url: imageUrl || "https://images.unsplash.com/photo-1546069901-ba9599a7e63c",
      tags
    };

    if (initialData) {
      onUpdate(recipe);
    } else {
      onAdd(recipe);
    }
    onClose();
  };

  const addIngredient = () => setIngredients([...ingredients, { item: '', amount: '' }]);
  const updateIngredient = (index: number, field: keyof Ingredient, value: string) => {
    const newIngs = [...ingredients];
    newIngs[index] = { ...newIngs[index], [field]: value };
    setIngredients(newIngs);
  };

  const addInstruction = () => setInstructions([...instructions, '']);
  const updateInstruction = (index: number, value: string) => {
    const newInst = [...instructions];
    newInst[index] = value;
    setInstructions(newInst);
  };

  const toggleTag = (tag: RecipeTag) => {
    setTags(prev => prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[200] bg-black/95 backdrop-blur-md overflow-y-auto p-4 flex flex-col items-center"
    >
      <div className="w-full max-w-lg bg-zinc-900 border-4 border-zinc-800 p-6 space-y-6 my-8 shadow-[0_0_50px_rgba(0,0,0,0.8)]">
        <header className="flex justify-between items-center">
          <h2 className="text-2xl font-black italic uppercase text-white tracking-tighter">
            {initialData ? 'EDYTUJ KORYTO' : 'DODAJ NOWE KORYTO'}
          </h2>
          <button onClick={onClose} className="p-2 text-zinc-500 hover:text-white transition-colors">
            <X size={24} />
          </button>
        </header>

        <div className="space-y-6">
          {/* AI GENERATION SECTION */}
          <div className="p-4 bg-black border-2 border-dashed border-[#CCFF00]/30 space-y-3">
            <label className="text-[10px] font-black text-[#CCFF00] uppercase flex items-center gap-2 italic">
              <Sparkles size={14} /> Generuj zdjęcie przez AI (Realistic Food)
            </label>
            <div className="flex gap-2">
              <input 
                placeholder="NP. OWSIANKA, TALERZ, JABŁKA..."
                value={aiPrompt}
                onChange={e => setAiPrompt(e.target.value.toUpperCase())}
                className="flex-1 bg-zinc-900 border border-zinc-800 p-3 font-black italic text-white outline-none focus:border-[#CCFF00] transition-colors text-xs"
              />
              <button 
                onClick={handleGenerateImage}
                disabled={isGenerating}
                className="bg-[#CCFF00] text-black px-4 py-3 font-black uppercase italic text-[10px] flex items-center gap-2 disabled:opacity-50 disabled:grayscale transition-all"
              >
                {isGenerating ? <Loader2 size={16} className="animate-spin" /> : <Sparkles size={16} />}
                GENERUJ
              </button>
            </div>
            <p className="text-[8px] text-zinc-600 font-bold uppercase tracking-widest italic text-center">
              Dzikie AI stworzy realistyczną fotę Twojego koryta
            </p>
          </div>

          {/* PHOTO URL & PREVIEW */}
          <div className="space-y-3">
            <label className="text-[10px] font-black text-zinc-500 uppercase flex items-center gap-2">
              <ImageIcon size={14} /> Link do zdjęcia (URL)
            </label>
            <div className="flex flex-col gap-3">
              <input 
                placeholder="HTTPS://UNSPLASH.COM/PHOTO..."
                value={imageUrl}
                onChange={e => {
                  setImageUrl(e.target.value);
                  setImgPreviewError(false);
                }}
                className="w-full bg-black border border-zinc-800 p-4 font-black italic text-[#CCFF00] outline-none focus:border-[#CCFF00] transition-colors text-xs"
              />
              <div className="h-48 w-full bg-black border-2 border-zinc-800 overflow-hidden relative group">
                {imageUrl && !imgPreviewError ? (
                  <img 
                    src={imageUrl} 
                    alt="Preview" 
                    className="w-full h-full object-cover grayscale-[10%] group-hover:grayscale-0 transition-all duration-500"
                    onError={() => setImgPreviewError(true)}
                  />
                ) : (
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-zinc-800">
                    <UtensilsCrossed size={48} />
                    <span className="text-[10px] font-black uppercase mt-3 tracking-widest">Czekam na koryto...</span>
                  </div>
                )}
                {isGenerating && (
                  <div className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center text-[#CCFF00] z-10">
                    <Loader2 size={40} className="animate-spin mb-2" />
                    <span className="text-xs font-black italic uppercase animate-pulse">Dzik myśli nad fotą...</span>
                  </div>
                )}
                <div className="absolute top-2 right-2 bg-black/80 text-[#CCFF00] text-[8px] font-black px-2 py-1 uppercase tracking-tighter italic border border-[#CCFF00]/30">
                  WIZUALIZACJA
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black text-zinc-500 uppercase">Nazwa potrawy</label>
            <input 
              placeholder="NP. KURCZAK PO DZIKU"
              value={title}
              onChange={e => setTitle(e.target.value.toUpperCase())}
              className="w-full bg-black border border-zinc-800 p-4 font-black italic text-[#CCFF00] outline-none focus:border-[#CCFF00] transition-colors text-lg"
            />
          </div>

          <div className="grid grid-cols-4 gap-2">
            <div className="space-y-1">
              <label className="text-[10px] font-black text-zinc-500 uppercase text-center block">B (g)</label>
              <input type="number" value={protein} onChange={e => setProtein(Number(e.target.value))} className="w-full bg-black border border-zinc-800 p-3 text-white font-black text-center" />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-black text-zinc-500 uppercase text-center block">W (g)</label>
              <input type="number" value={carbs} onChange={e => setCarbs(Number(e.target.value))} className="w-full bg-black border border-zinc-800 p-3 text-white font-black text-center" />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-black text-zinc-500 uppercase text-center block">T (g)</label>
              <input type="number" value={fat} onChange={e => setFat(Number(e.target.value))} className="w-full bg-black border border-zinc-800 p-3 text-white font-black text-center" />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-black text-zinc-500 uppercase text-center block">MIN</label>
              <input type="number" value={time} onChange={e => setTime(Number(e.target.value))} className="w-full bg-black border border-zinc-800 p-3 text-white font-black text-center" />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black text-zinc-500 uppercase">Dostępne w</label>
            <div className="grid grid-cols-2 gap-2">
              {(['Biedronka', 'Lidl'] as const).map(s => (
                <button 
                  key={s}
                  onClick={() => setStore(s)}
                  className={`py-3 font-black italic text-xs border-2 transition-all ${store === s ? 'bg-white text-black border-white shadow-[0_0_15px_rgba(255,255,255,0.2)]' : 'border-zinc-800 text-zinc-500 bg-black'}`}
                >
                  {s.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black text-zinc-500 uppercase">Tagi</label>
            <div className="flex flex-wrap gap-2">
              {AVAILABLE_TAGS.map(tag => (
                <button 
                  key={tag}
                  onClick={() => toggleTag(tag)}
                  className={`px-3 py-1.5 text-[10px] font-black italic border transition-all ${tags.includes(tag) ? 'bg-[#CCFF00] text-black border-[#CCFF00]' : 'border-zinc-800 text-zinc-500 bg-black'}`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-3">
             <div className="flex justify-between items-center px-1">
               <label className="text-[10px] font-black text-zinc-500 uppercase">Składniki</label>
               <button onClick={addIngredient} className="text-[#CCFF00] p-1 border border-zinc-800 hover:bg-[#CCFF00] hover:text-black transition-colors">
                 <Plus size={14} />
               </button>
             </div>
             <div className="space-y-2">
               {ingredients.map((ing, i) => (
                 <div key={i} className="flex gap-2">
                   <input placeholder="SKŁADNIK" value={ing.item} onChange={e => updateIngredient(i, 'item', e.target.value)} className="flex-1 bg-black border border-zinc-800 p-3 text-[11px] text-white font-bold" />
                   <input placeholder="ILOŚĆ" value={ing.amount} onChange={e => updateIngredient(i, 'amount', e.target.value)} className="w-24 bg-black border border-zinc-800 p-3 text-[11px] text-white font-bold" />
                   <button onClick={() => setIngredients(ingredients.filter((_, idx) => idx !== i))} className="text-red-500 p-2 border border-zinc-800 hover:bg-red-500 hover:text-white transition-colors">
                     <Trash2 size={16} />
                   </button>
                 </div>
               ))}
             </div>
          </div>

          <div className="space-y-3">
             <div className="flex justify-between items-center px-1">
               <label className="text-[10px] font-black text-zinc-500 uppercase">Instrukcja (kroki)</label>
               <button onClick={addInstruction} className="text-[#CCFF00] p-1 border border-zinc-800 hover:bg-[#CCFF00] hover:text-black transition-colors">
                 <Plus size={14} />
               </button>
             </div>
             <div className="space-y-2">
               {instructions.map((step, i) => (
                 <div key={i} className="flex gap-2">
                   <span className="w-8 h-10 flex items-center justify-center bg-zinc-800 text-[10px] font-black text-zinc-400 shrink-0">{i+1}</span>
                   <input value={step} onChange={e => updateInstruction(i, e.target.value)} className="flex-1 bg-black border border-zinc-800 p-3 text-[11px] text-white font-bold" />
                   <button onClick={() => setInstructions(instructions.filter((_, idx) => idx !== i))} className="text-red-500 p-2 border border-zinc-800 hover:bg-red-500 hover:text-white transition-colors">
                     <Trash2 size={16} />
                   </button>
                 </div>
               ))}
             </div>
          </div>

          <button 
            onClick={handleSave}
            disabled={isGenerating}
            className="w-full bg-[#CCFF00] text-black py-5 font-black uppercase italic shadow-[0_0_30px_rgba(204,255,0,0.3)] active:scale-[0.98] transition-all text-lg flex items-center justify-center gap-2 disabled:opacity-50"
          >
            <Save size={24} /> {initialData ? 'ZAPISZ ZMIANY' : 'DODAJ DO BAZY'}
          </button>
        </div>
      </div>
    </motion.div>
  );
};
