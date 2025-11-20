'use client';

import React from 'react';

interface WishlistModalProps {
  type: 'success' | 'error';
  message: string;
  onClose: () => void;
  /**
   * position: 'fixed' -> a fixed top banner (legacy). 'inline' -> full-width block placed inline in the DOM.
   */
  position?: 'fixed' | 'inline';
}

export default function WishlistModal({ type, message, onClose, position = 'fixed' }: WishlistModalProps) {
  React.useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  // Colors used in design: dark green/red background with white text for inline; lighter for fixed
  const inlineBg = type === 'success' ? 'bg-green-600 text-white' : 'bg-red-600 text-white';
  const fixedBg = type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800';
  const borderColor = type === 'success' ? 'border-green-400' : 'border-red-400';
  const icon = type === 'success' ? '✓' : '✕';

  if (position === 'inline') {
    return (
      <div className={`${inlineBg}`}>
        <div className="max-w-7xl mx-auto px-4 py-3 text-center text-sm font-medium">
          {message}
        </div>
      </div>
    );
  }

  // legacy fixed top banner (keeps previous visual style but still auto-hides)
  return (
    <div className={`fixed top-0 left-0 right-0 ${fixedBg} border-b-4 ${borderColor} shadow-lg`} role="status" aria-live="polite">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center gap-3">
        <span className="text-2xl font-bold">{icon}</span>
        <p className="font-medium">{message}</p>
      </div>
    </div>
  );
}
