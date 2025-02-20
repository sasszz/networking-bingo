'use client';

import { useEffect } from 'react';

export default function ClientOnlyOrientationFix() {
  useEffect(() => {
    const checkRotation = () => {
      const isMobile = window.matchMedia('(hover: none)').matches;
      const angle = window.screen.orientation?.angle ?? window.orientation ?? 0;

      const appElement = document.body;

      if (isMobile) {
        if (angle === 180 || angle === -180) {
          appElement.classList.add('flip');
        } else {
          appElement.classList.remove('flip');
        }
      }
    };

    checkRotation();
    window.addEventListener('orientationchange', checkRotation);

    return () => {
      window.removeEventListener('orientationchange', checkRotation);
    };
  }, []);

  return null;
}
