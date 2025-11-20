'use client';

import { useEffect } from 'react';

interface SuccessNotificationProps {
  message: string;
  isVisible: boolean;
  onClose: () => void;
}

export default function SuccessNotification({
  message,
  isVisible,
  onClose,
}: SuccessNotificationProps) {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  if (!isVisible) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-40 bg-green-500 text-white py-3 px-4 text-center">
      <p className="text-sm font-medium">{message}</p>
    </div>
  );
}
