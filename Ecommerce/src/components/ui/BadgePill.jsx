/**
 * components/ui/BadgePill.jsx
 * Colored label chip driven by BADGE_CONFIG.
 */

import React from 'react';
import { BADGE_CONFIG } from '../../data/config';

export default function BadgePill({ text, className = '' }) {
  const cfg = BADGE_CONFIG[text] || BADGE_CONFIG['_default'];
  return (
    <span className={`
      inline-block text-[10px] font-bold tracking-wider px-2.5 py-0.5
      rounded-full ring-1 ${cfg.bg} ${cfg.text} ${cfg.ring} ${className}
    `.trim()}>
      {text}
    </span>
  );
}
