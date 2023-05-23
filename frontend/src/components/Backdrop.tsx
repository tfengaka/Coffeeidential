import React from 'react';
import { createPortal } from 'react-dom';

interface BackdropProps {
  children: React.ReactNode;
  className?: string;
}

function Backdrop({ children, className }: BackdropProps) {
  return createPortal(
    <div className={`fixed inset-0 z-50 w-full h-full bg-black bg-opacity-30 ${className}`}>{children}</div>,
    document.querySelector('body') as HTMLElement
  );
}

export default Backdrop;
