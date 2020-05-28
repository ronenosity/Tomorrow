import React, { useState, useCallback, useRef, useMemo } from 'react';

export interface UseIsOpenProps {
  isOpen: boolean;
  toggle: () => void;
  onClickAway: (event: React.MouseEvent<EventTarget, MouseEvent>) => void;
  close: () => void;
}

export default function useIsOpen(
  initialValue = false,
): {
  onClickAway: (event: React.MouseEvent<EventTarget>) => void;
  toggle: () => void;
  close: () => void;
  isOpen: boolean;
  anchorRef: React.MutableRefObject<HTMLButtonElement & HTMLDivElement>;
} {
  const [isOpen, setIsOpen] = useState(initialValue);

  const toggle: any = useCallback(() => {
    setIsOpen(prev => !prev);
  }, [setIsOpen]);

  const close: any = useCallback(() => {
    setIsOpen(false);
  }, [setIsOpen]);

  const anchorRef = useRef<HTMLButtonElement & HTMLDivElement>(null);
  const onClickAway = useCallback(
    (event: React.MouseEvent<EventTarget>) => {
      if (anchorRef.current && anchorRef.current.contains(event.target as HTMLElement)) {
        return;
      }
      setIsOpen(false);
    },
    [setIsOpen, anchorRef],
  );

  // @ts-ignore
  return useMemo(
    () => ({
      isOpen,
      toggle,
      anchorRef,
      onClickAway,
      close,
    }),
    [anchorRef, isOpen, onClickAway, toggle, close],
  );
}
