import { useEffect, useCallback } from 'react';

const useKeyPress = (targetKey: string, callback: () => void): void => {
  const handleKeyPress = useCallback(
    (event: KeyboardEvent) => {
      if (event.shiftKey && event.key === targetKey) {
        callback();
      }
    },
    [targetKey, callback]
  );

  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress);

    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [handleKeyPress]);
};

export default useKeyPress;
