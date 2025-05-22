
import { useState, useEffect, useRef, RefObject } from 'react';

interface UseIntersectionObserverProps {
  threshold?: number;
  rootMargin?: string;
}

export function useIntersectionObserver({
  threshold = 0.1,
  rootMargin = "0px"
}: UseIntersectionObserverProps = {}) {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
      },
      {
        rootMargin,
        threshold,
      }
    );

    const currentRef = ref.current;
    
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [rootMargin, threshold]);

  return { ref, isIntersecting };
}

export function useCountAnimation(
  ref: RefObject<HTMLElement>,
  end: number,
  duration: number = 2000,
  isIntersecting: boolean = false
) {
  const [count, setCount] = useState(0);
  const countRef = useRef(0);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    if (isIntersecting) {
      const step = (timestamp: number) => {
        if (!countRef.current) countRef.current = timestamp;
        const progress = timestamp - countRef.current;
        const increment = Math.ceil((progress / duration) * end);
        
        setCount(Math.min(increment, end));
        
        if (progress < duration) {
          timerRef.current = requestAnimationFrame(step);
        }
      };
      
      timerRef.current = requestAnimationFrame(step);
    }
    
    return () => {
      if (timerRef.current) {
        cancelAnimationFrame(timerRef.current);
      }
    };
  }, [isIntersecting, end, duration]);

  return count;
}
