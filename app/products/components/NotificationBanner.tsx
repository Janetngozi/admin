"use client";

import React from 'react';

interface NotificationBannerProps {
  type: 'success' | 'error' | 'remove';
  message: string;
  onClose: () => void;
  /**
   * Inline banner (full-width block) only — this component focuses on the design banner.
   */
}

export default function NotificationBanner({ type, message, onClose }: NotificationBannerProps) {
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    // trigger enter animation
    setVisible(true);
    const hide = setTimeout(() => setVisible(false), 2700); // animate out before onClose
    const close = setTimeout(onClose, 3000); // actual unmount after 3s
    return () => {
      clearTimeout(hide);
      clearTimeout(close);
    };
  }, [onClose]);

  const bgClass = (type === 'success' || type === 'remove') ? 'bg-green-600 text-white' : 'bg-red-600 text-white';

  return (
    <div className={`overflow-hidden ${bgClass}`} role="status" aria-live="polite">
      <div
        className={`max-w-7xl mx-auto px-4 py-3 text-center text-sm font-medium transform transition-all duration-300 ${
          visible ? 'translate-y-0 opacity-100' : '-translate-y-3 opacity-0'
        }`}
      >
        {message}
      </div>
    </div>
  );
}

export { NotificationBanner };
