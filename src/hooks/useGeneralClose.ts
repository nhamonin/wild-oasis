import { useEffect, useRef } from 'react';

export function useGeneralClose<T extends HTMLElement>(onClose: () => void) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };

    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [onClose]);

  useEffect(() => {
    function onClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) onClose();
    }

    document.addEventListener('click', onClickOutside, { capture: true });

    return () => {
      document.removeEventListener('click', onClickOutside, { capture: true });
    };
  }, [onClose]);

  return ref;
}
