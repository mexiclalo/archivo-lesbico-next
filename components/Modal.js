'use client';

import { useEffect } from 'react';

export default function Modal({ isOpen, onClose, children, onNext, onPrev }) {
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.keyCode === 27) {
        onClose();
      }
      if (event.keyCode === 37 && onPrev) {
        onPrev();
      }
      if (event.keyCode === 39 && onNext) {
        onNext();
      }
    };

    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose, onNext, onPrev]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex justify-center items-center" onClick={onClose}>
        <button onClick={onClose} className="text-white text-4xl absolute top-4 right-4 z-20 hover:text-primary-500 transition-colors duration-300">&times;</button>
        <div className="flex items-center" onClick={e => e.stopPropagation()}>
            {onPrev && (
                <button onClick={onPrev} className="text-white text-4xl z-10 mx-4">&lsaquo;</button>
            )}
            <div className="bg-gray-900 p-4 rounded-lg shadow-lg max-w-4xl max-h-full overflow-auto">
                {children}
            </div>
            {onNext && (
                <button onClick={onNext} className="text-white text-4xl z-10 mx-4">&rsaquo;</button>
            )}
        </div>
    </div>
  );
}
