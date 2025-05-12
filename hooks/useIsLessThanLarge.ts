import { useEffect, useState } from 'react';

export const useIsLessThanLarge = () => {
  const [isLessThanLarge, setIsLessThanLarge] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsLessThanLarge(window.innerWidth < 1024); // Tailwind's `md` breakpoint is 768px
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  return isLessThanLarge;
};
