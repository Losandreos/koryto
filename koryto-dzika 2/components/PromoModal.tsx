
import React from 'react';
import { X, Send } from 'lucide-react';

interface PromoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PromoModal: React.FC<PromoModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm">
      <div className="relative bg-zinc-900 border-4 border-[#CCFF00] p-8 rounded-none max-w-sm w-full text-center shadow-[0_0_50px_rgba(204,255,0,0.3)]">
        <button 
          onClick={onClose}
          className="absolute top-2 right-2 text-zinc-500 hover:text-white"
        >
          <X size={24} />
        </button>
        
        <h2 className="text-4xl font-black mb-4 italic tracking-tighter">CHCESZ WIĘCEJ MASY?</h2>
        <p className="text-zinc-400 mb-8 font-bold uppercase">
          Dołącz do elitarnej grupy na Telegramie i odbierz darmowy plan treningowy!
        </p>
        
        <a 
          href="https://t.me/placeholder" 
          target="_blank" 
          rel="noopener noreferrer"
          className="bg-[#CCFF00] text-black font-black py-4 px-6 w-full flex items-center justify-center gap-3 hover:scale-105 transition-transform"
        >
          <Send size={24} />
          DOŁĄCZ DO TELEGRAMA
        </a>
      </div>
    </div>
  );
};
