
import React, { useState } from 'react';
import { X, Check, Coffee, Zap, Trash2, History } from 'lucide-react';
import { ManualLog } from '../types';

interface QuickLogModalProps {
  onAdd: (log: Omit<ManualLog, 'id' | 'timestamp'>) => void;
  onClose: () => void;
  onClearLogs: () => void;
  recentLogs: ManualLog[];
}

export const QuickLogModal: React.FC<QuickLogModalProps> = ({ onAdd, onClose, recentLogs, onClearLogs }) => {
  const [protein, setProtein] = useState<number>(30);
  const [carbs, setCarbs] = useState<number>(0);
  const [label, setLabel] = useState<string>('ODŻYWKA / SNACK');

  const presets = [
    { name: 'SHAKE', p: 30, c: 5 },
    { name: 'BATON', p: 20, c: 25 },
    { name: 'KREATYNA', p: 5, c: 0 },
  ];

  const handleAdd = () => {
    onAdd({ label, protein, carbs, fat: 0 });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[260] bg-black/90 backdrop-blur-md flex flex-col p-6 animate-in fade-in duration-300">
      <header className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-3xl font-black italic uppercase tracking-tighter text-[#CCFF00]">SZYBKI WRZUT</h2>
          <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest italic">DODAJ MAKRO BEZ SZUKANIA</p>
        </div>
        <button onClick={onClose} className="p-2 bg-zinc-900 border border-zinc-700 text-white active:scale-90">
          <X size={24} />
        </button>
      </header>

      <div className="space-y-8 flex-1 overflow-y-auto">
        {/* Presets */}
        <div className="grid grid-cols-3 gap-2">
          {presets.map(p => (
            <button 
              key={p.name}
              onClick={() => { setProtein(p.p); setCarbs(p.c); setLabel(p.name); }}
              className="bg-zinc-900 border border-zinc-800 p-3 flex flex-col items-center gap-1 active:scale-95 hover:border-[#CCFF00] transition-colors"
            >
              <span className="text-[10px] font-black italic">{p.name}</span>
              <span className="text-[9px] text-zinc-500 uppercase">{p.p}P / {p.c}C</span>
            </button>
          ))}
        </div>

        {/* Inputs */}
        <div className="p-6 bg-zinc-900 border border-zinc-800 space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase text-zinc-500">CO TO BYŁO?</label>
            <input 
              type="text" 
              value={label} 
              onChange={e => setLabel(e.target.value.toUpperCase())}
              className="w-full bg-black border border-zinc-800 p-4 font-black italic text-white outline-none focus:border-[#CCFF00]"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase text-zinc-500 flex items-center gap-1">
                <Zap size={10} className="text-[#CCFF00]" /> BIAŁKO (G)
              </label>
              <input 
                type="number" 
                value={protein} 
                onChange={e => setProtein(Number(e.target.value))}
                className="w-full bg-black border border-zinc-800 p-4 text-2xl font-black text-[#CCFF00] outline-none focus:border-[#CCFF00]"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase text-zinc-500 flex items-center gap-1">
                <Coffee size={10} className="text-blue-500" /> WĘGLE (G)
              </label>
              <input 
                type="number" 
                value={carbs} 
                onChange={e => setCarbs(Number(e.target.value))}
                className="w-full bg-black border border-zinc-800 p-4 text-2xl font-black text-blue-500 outline-none focus:border-blue-500"
              />
            </div>
          </div>
        </div>

        {/* History */}
        {recentLogs.length > 0 && (
          <div className="space-y-3">
            <div className="flex justify-between items-end">
              <h3 className="text-[10px] font-black uppercase text-zinc-500 italic flex items-center gap-1">
                <History size={12} /> OSTATNIE WRZUTY
              </h3>
              <button onClick={onClearLogs} className="text-[9px] font-black text-red-500 uppercase italic">WYCZYŚĆ</button>
            </div>
            <div className="space-y-2">
              {recentLogs.slice(-3).reverse().map(log => (
                <div key={log.id} className="bg-zinc-900/50 p-3 border border-zinc-800 flex justify-between items-center">
                  <div>
                    <span className="text-[10px] font-black text-white">{log.label}</span>
                    <span className="text-[9px] text-zinc-600 ml-2 italic">
                      {new Date(log.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                  <div className="text-[10px] font-bold">
                    <span className="text-[#CCFF00]">{log.protein}P</span>
                    <span className="text-zinc-700 mx-1">/</span>
                    <span className="text-blue-500">{log.carbs}C</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <button 
        onClick={handleAdd}
        className="w-full bg-[#CCFF00] text-black py-6 font-black uppercase italic text-xl shadow-[0_0_30px_rgba(204,255,0,0.3)] active:scale-95 mt-6"
      >
        <Check className="inline-block mr-2" /> WRZUĆ DO KORYTA
      </button>
    </div>
  );
};
