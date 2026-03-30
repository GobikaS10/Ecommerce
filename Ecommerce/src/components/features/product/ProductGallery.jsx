import React, { useState } from 'react';

export default function ProductGallery({ product }) {
  const [imgError, setImgError] = useState(false);
  const [activeIdx, setActiveIdx] = useState(0);
  const [zoomed, setZoomed] = useState(false);

  const disc = Math.round((1 - product.price / product.originalPrice) * 100);

  const thumbParams = [
    '?w=600&h=600&fit=crop&auto=format',
    '?w=600&h=600&fit=crop&auto=format&crop=top',
    '?w=600&h=600&fit=crop&auto=format&crop=bottom',
    '?w=600&h=600&fit=crop&auto=format&crop=left',
  ];

  const hasImage = product.image && !imgError;
  const baseUrl = hasImage ? product.image.split('?')[0] : '';

  return (
    <div className="flex flex-col gap-3">
      <div
        className="relative rounded-2xl overflow-hidden bg-slate-100 cursor-zoom-in"
        style={{ aspectRatio: '1 / 1' }}
        onClick={() => setZoomed(!zoomed)}
      >
        {hasImage ? (
          <img
            src={`${baseUrl}${thumbParams[activeIdx]}`}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-700 ease-out"
            style={{ transform: zoomed ? 'scale(1.25)' : 'scale(1)' }}
            onError={() => setImgError(true)}
          />
        ) : (
          <div className={`w-full h-full bg-gradient-to-br ${product.bgFrom} ${product.bgTo} flex items-center justify-center min-h-[380px]`}>
            <span className="text-[130px] select-none drop-shadow-xl">{product.emoji}</span>
          </div>
        )}

        {disc > 0 && (
          <span className="absolute top-4 left-4 bg-red-500 text-white text-xs font-black px-3 py-1.5 rounded-xl shadow-lg tracking-wider">
            -{disc}% OFF
          </span>
        )}

        <span className="absolute bottom-3 right-3 bg-black/40 backdrop-blur-md text-white text-[10px] font-semibold px-3 py-1.5 rounded-full pointer-events-none">
          {zoomed ? '🔍 Click to zoom out' : '🔍 Click to zoom in'}
        </span>
      </div>

      {hasImage && (
        <div className="grid grid-cols-4 gap-2">
          {thumbParams.map((params, i) => (
            <button
              key={i}
              onClick={() => setActiveIdx(i)}
              className={`relative rounded-xl overflow-hidden border-2 transition-all duration-200
                ${
                  activeIdx === i
                    ? 'border-sky-500 shadow-md shadow-sky-100 scale-[1.03]'
                    : 'border-slate-200 opacity-60 hover:opacity-100 hover:border-slate-400'
                }`}
              style={{ aspectRatio: '1/1' }}
            >
              <img
                src={`${baseUrl}${params}`}
                alt={`View ${i + 1}`}
                className="w-full h-full object-cover"
              />
              {activeIdx === i && (
                <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-sky-500" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}