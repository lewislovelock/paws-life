import React from 'react';

export const CatIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M12 5c.67 0 1.35.09 2 .26 1.78-2 5.03-2.84 6.42-2.26 1.4.58-.42 7-.42 7 .57 1.07 1 2.24 1 3.44C21 17.9 16.97 21 12 21s-9-3.1-9-7.56c0-1.25.43-2.42 1-3.44 0 0-1.89-6.42-.5-7 1.39-.58 4.67.26 6.43 2.26.65-.17 1.33-.26 2-.26z" />
  </svg>
);

export const DogIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M10 5.172C10 3.782 8.423 2.679 6.5 3c-2.823.47-4.113 6.006-4 7 .08.703 1.725 1.722 3.656 1 1.261-.472 1.963-1.45 2.344-2.5" />
    <path d="M14.267 5.172c0-1.39 1.577-2.493 3.5-2.172 2.823.47 4.113 6.006 4 7-.08.703-1.725 1.722-3.656 1-1.261-.472-1.963-1.45-2.344-2.5" />
    <path d="M8 14v.5" />
    <path d="M16 14v.5" />
    <path d="M11.25 16.25h1.5L12 17l-.75-.75Z" />
    <path d="M4.42 11.247A4.335 4.335 0 0 1 12 8c2.167 0 4.039 1.57 4.306 3.441" />
    <path d="M8 11.247c-.775-.113-1.348-.68-1.5-1.247" />
    <path d="M16 11.247c.775-.113 1.348-.68 1.5-1.247" />
    <path d="M12 18.5c-4.97 0-9 1.79-9 4 0 2.21 4.03 4 9 4s9-1.79 9-4c0-2.21-4.03-4-9-4Z" />
  </svg>
);
