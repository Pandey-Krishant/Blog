import React, { useEffect, useRef } from 'react';

const Animation = () => {
  const containerRef = useRef(null);

  // 🎨 Vibrant Colors Array (Cyber/Neon Theme)
  const colors = [
    '#ef4444', // red-500
    '#f59e0b', // amber-500
    '#10b981', // emerald-500
    '#3b82f6', // blue-500
    '#8b5cf6', // violet-500
    '#ec4899', // pink-500
    '#06b6d4', // cyan-500
  ];

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!containerRef.current) return;

      // 1. Create a new particle element
      const particle = document.createElement('div');

      // 2. Add Tailwind Classes directly via JS
      // 'fixed': screen ke hisaab se position
      // 'rounded-full': circle banane ke liye
      // 'pointer-events-none': taaki clicks block na ho
      particle.classList.add('fixed', 'rounded-full', 'pointer-events-none');

      // 3. Randomize Size & Color
      const size = Math.random() * 12 + 8; // Size between 8px and 20px
      const color = colors[Math.floor(Math.random() * colors.length)];

      // 4. Set dynamic styles (Positions & Color)
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.backgroundColor = color;
      particle.style.left = `${e.clientX}px`;
      particle.style.top = `${e.clientY}px`;
      
      // Initial transform to center it on cursor
      particle.style.transform = 'translate(-50%, -50%)';

      // 5. Append to our container
      containerRef.current.appendChild(particle);

      // 6. Animate using Web Animations API (No external CSS needed!) 🚀
      const animation = particle.animate([
        { transform: 'translate(-50%, -50%) scale(1)', opacity: 1 },      // Start
        { transform: `translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px) scale(0)`, opacity: 0 } // End (spread + shrink)
      ], {
        duration: 800,       // 800ms animation
        easing: 'cubic-bezier(0, .9, .57, 1)', // Smooth ease-out effect
      });

      // 7. Cleanup: Animation khatam hone ke baad element remove kar do
      animation.onfinish = () => {
        particle.remove();
      };
    };

    // Attach event listener
    window.addEventListener('mousemove', handleMouseMove);

    // Cleanup listener on unmount
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    // Container: Tailwind classes for full screen overlay
    <div 
      ref={containerRef} 
      className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden"
    >
      {/* Particles will be injected here by JS */}
    </div>
  );
};

export default Animation;