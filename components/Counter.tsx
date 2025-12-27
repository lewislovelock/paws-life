import React, { useEffect, useState, useRef } from 'react';

interface CounterProps {
  value: number;
  duration?: number;
  className?: string;
}

export const Counter: React.FC<CounterProps> = ({ value, duration = 1000, className }) => {
  const [displayValue, setDisplayValue] = useState(0);
  const startValue = useRef(0);
  const startTime = useRef<number | null>(null);
  const requestRef = useRef<number>();

  useEffect(() => {
    startValue.current = displayValue;
    startTime.current = null;
    
    const animate = (time: number) => {
      if (startTime.current === null) startTime.current = time;
      const progress = Math.min((time - startTime.current) / duration, 1);
      
      // Easing function (easeOutQuart)
      const ease = 1 - Math.pow(1 - progress, 4);
      
      const current = startValue.current + (value - startValue.current) * ease;
      setDisplayValue(Math.round(current));

      if (progress < 1) {
        requestRef.current = requestAnimationFrame(animate);
      }
    };

    requestRef.current = requestAnimationFrame(animate);

    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [value, duration]);

  return <span className={className}>{displayValue}</span>;
};
