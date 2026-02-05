
import React from 'react';

interface StoreBadgeProps {
  store: 'Biedronka' | 'Lidl';
}

export const StoreBadge: React.FC<StoreBadgeProps> = ({ store }) => {
  const isBiedronka = store === 'Biedronka';
  return (
    <div className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-2 ${
      isBiedronka ? 'bg-yellow-400 text-red-700 border-2 border-red-700' : 'bg-blue-600 text-white border-2 border-yellow-400'
    }`}>
      {isBiedronka ? (
        <>
          <span className="w-4 h-4 rounded-full bg-red-600 border border-black shadow-inner"></span>
          BIEDRONKA
        </>
      ) : (
        <>
          <span className="font-black">L</span>
          LIDL
        </>
      )}
    </div>
  );
};
