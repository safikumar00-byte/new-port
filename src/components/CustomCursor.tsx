import React, { useEffect, useState } from 'react';

export const CustomCursor: React.FC = () => {
  const [pos, setPos] = useState<{ x: number; y: number }>({ x: -100, y: -100 });
  const [visible, setVisible] = useState(false);
  const [label, setLabel] = useState('You');
  const [isTip, setIsTip] = useState(false);

  useEffect(() => {
    // Only enable on pointer-fine (mouse) devices
    if (!window.matchMedia('(hover:hover) and (pointer:fine)').matches) return;

    document.documentElement.classList.add('fc');

    const handlePointerMove = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return;
      setPos({ x: e.clientX, y: e.clientY });
      if (!visible) setVisible(true);

      // Check if target or any ancestor has data-cursor-label
      const target = (e.target as HTMLElement).closest('[data-cursor-label]');
      if (target) {
        const customLabel = target.getAttribute('data-cursor-label');
        if (customLabel) {
          setLabel(customLabel);
          setIsTip(true);
          return;
        }
      }

      setLabel('You');
      setIsTip(false);
    };

    const handleMouseLeave = () => {
      setVisible(false);
    };

    window.addEventListener('pointermove', handlePointerMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      document.documentElement.classList.remove('fc');
      window.removeEventListener('pointermove', handlePointerMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [visible]);

  if (!visible) return null;

  return (
    <div
      id="me"
      className={`on ${isTip ? 'tip' : ''}`}
      style={{
        transform: `translate(${pos.x}px, ${pos.y}px)`
      }}
      aria-hidden="true"
    >
      <svg className="a" viewBox="0 0 16 16" fill="currentColor">
        <path d="M0 0l6 14 3-5 5-3L0 0z" />
      </svg>
      <span>{label}</span>
    </div>
  );
};

