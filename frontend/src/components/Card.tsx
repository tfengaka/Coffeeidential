import React, { ForwardedRef, forwardRef } from 'react';

interface ICardProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
}

function Card({ children, id, className }: ICardProps, ref: ForwardedRef<HTMLDivElement>) {
  return (
    <div id={id} className={`bg-white border-none rounded-lg shadow-card ${className}`} ref={ref}>
      {children}
    </div>
  );
}

export default forwardRef(Card);
