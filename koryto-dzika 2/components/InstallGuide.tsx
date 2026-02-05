
import React from 'react';
import { X, Share, PlusSquare, MoreVertical, Download, Smartphone, Apple } from 'lucide-react';
import { motion } from 'framer-motion';

interface InstallGuideProps {
  onClose: () => void;
}

export const InstallGuide: React.FC<InstallGuideProps> = ({ onClose }) => {
  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[300] bg-black/95 backdrop-blur-md flex flex-col p-6 font-sans overflow-y-auto"
    >
      <header className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-black italic uppercase tracking-tighter text-[#CCFF00]">INSTALACJA</h2>
        <button onClick={onClose} className="p-2 bg-zinc-900 border border-zinc-700 text-white">
          <X size={24} />
        </button>
      </header>

      <div className="space-y-10 pb-10">
        <section className="space-y-4">
          <div className="flex items-center gap-3 text-white">
            <Apple size={32} className="text-zinc-400" />
            <h3 className="text-xl font-black uppercase italic">DLA IPHONE (SAFARI)</h3>
          </div>
          <div className="space-y-4 bg-zinc-900 p-6 border-l-4 border-blue-500">
            <div className="flex gap-4 items-start">
              <div className="bg-zinc-800 p-2 rounded-lg text-blue-400"><Share size={24} /></div>
              <p className="text-sm font-bold uppercase italic text-zinc-300">1. Kliknij przycisk "Udostępnij" na dolnym pasku Safari.</p>
            </div>
            <div className="flex gap-4 items-start">
              <div className="bg-zinc-800 p-2 rounded-lg text-blue-400"><PlusSquare size={24} /></div>
              <p className="text-sm font-bold uppercase italic text-zinc-300">2. Znajdź i kliknij "Do ekranu początkowego" (Add to Home Screen).</p>
            </div>
            <div className="flex gap-4 items-start">
              <div className="bg-zinc-800 p-2 rounded-lg text-[#CCFF00] font-black italic">ADD</div>
              <p className="text-sm font-bold uppercase italic text-zinc-300">3. Potwierdź klikając "Dodaj" w prawym górnym rogu.</p>
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <div className="flex items-center gap-3 text-white">
            <Smartphone size={32} className="text-zinc-400" />
            <h3 className="text-xl font-black uppercase italic">DLA ANDROID (CHROME)</h3>
          </div>
          <div className="space-y-4 bg-zinc-900 p-6 border-l-4 border-[#CCFF00]">
            <div className="flex gap-4 items-start">
              <div className="bg-zinc-800 p-2 rounded-lg text-[#CCFF00]"><MoreVertical size={24} /></div>
              <p className="text-sm font-bold uppercase italic text-zinc-300">1. Kliknij trzy kropki w prawym górnym rogu przeglądarki.</p>
            </div>
            <div className="flex gap-4 items-start">
              <div className="bg-zinc-800 p-2 rounded-lg text-[#CCFF00]"><Download size={24} /></div>
              <p className="text-sm font-bold uppercase italic text-zinc-300">2. Wybierz opcję "Zainstaluj aplikację" lub "Dodaj do ekranu głównego".</p>
            </div>
          </div>
        </section>

        <div className="p-6 border-2 border-dashed border-zinc-800 text-center">
          <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest leading-relaxed">
            PO TYM ZABIEGU APLIKACJA POJAWI SIĘ NA TWOIM PULPICIE OBOK INSTAGRAMA I TINDERA. BĘDZIE DZIAŁAĆ SZYBCIEJ I BEZ RAMKI PRZEGLĄDARKI.
          </p>
        </div>
      </div>

      <button 
        onClick={onClose}
        className="w-full bg-[#CCFF00] text-black py-6 font-black uppercase italic text-xl shadow-[0_0_30_rgba(204,255,0,0.3)] mt-auto"
      >
        ROZUMIEM, LECĘ!
      </button>
    </motion.div>
  );
};
