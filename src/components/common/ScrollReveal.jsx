import React, { useRef, useState, useEffect } from 'react';

/**
 * ScrollReveal: Lightweight, accessible scroll-triggered motion component
 * Uses native IntersectionObserver to animate elements as they enter viewport.
 * Unobserves immediately after first reveal to ensure zero runtime performance overhead.
 * Respects `prefers-reduced-motion` to guarantee accessibility.
 */
export default function ScrollReveal({
  children,
  className = '',
  delay = 0,
  direction = 'up', // 'up' | 'down' | 'left' | 'right' | 'fade' | 'scale'
  duration = 450, // ms
  threshold = 0.08,
  distance = 20, // px
  as: Component = 'div',
  ...props
}) {
  const ref = useRef(null);
  const [isRevealed, setIsRevealed] = useState(false);

  useEffect(() => {
    // Check if user requested reduced motion
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setIsRevealed(true);
      return;
    }

    if (!('IntersectionObserver' in window)) {
      setIsRevealed(true);
      return;
    }

    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsRevealed(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold,
        rootMargin: '0px 0px -30px 0px',
      }
    );

    observer.observe(element);

    return () => {
      if (element) observer.unobserve(element);
      observer.disconnect();
    };
  }, [threshold]);

  const getTransform = () => {
    if (isRevealed) return 'translate3d(0, 0, 0) scale(1)';
    switch (direction) {
      case 'up':
        return `translate3d(0, ${distance}px, 0)`;
      case 'down':
        return `translate3d(0, -${distance}px, 0)`;
      case 'left':
        return `translate3d(${distance}px, 0, 0)`;
      case 'right':
        return `translate3d(-${distance}px, 0, 0)`;
      case 'scale':
        return 'scale(0.96)';
      case 'fade':
      default:
        return 'translate3d(0, 0, 0)';
    }
  };

  return (
    <Component
      ref={ref}
      className={`reveal-item ${className}`}
      style={{
        opacity: isRevealed ? 1 : 0,
        transform: getTransform(),
        transitionProperty: 'opacity, transform',
        transitionDuration: `${duration}ms`,
        transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
        transitionDelay: `${delay}ms`,
        willChange: isRevealed ? 'auto' : 'opacity, transform',
      }}
      {...props}
    >
      {children}
    </Component>
  );
}
