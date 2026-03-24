import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useMotionTemplate, useMotionValueEvent } from "framer-motion";

export const HeroReveal = ({ heroImage, mobileHeroImage, children }) => {
  const containerRef = useRef(null);

  // We track the scroll progress specifically through this 200vh container.
  // It starts when the top of the container hits the top of the viewport.
  // It ends when the bottom of the container hits the bottom of the viewport.
  // Since the wrapper is 200vh and the screen is 100vh, the user explicitly scrolls 100vh of distance.
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // The clip-path mask opens during the first 70% of the scroll within the shorter container
  const insetPercentage = useTransform(scrollYProgress, [0, 0.7], [50, 0]); 
  const insetPixels = useTransform(scrollYProgress, [0, 0.7], [-160, 0]); 
  const cornerRadius = useTransform(scrollYProgress, [0, 0.7], [24, 0]); 
  const clipPath = useMotionTemplate`inset(calc(${insetPercentage}% + ${insetPixels}px) calc(${insetPercentage}% + ${insetPixels}px) calc(${insetPercentage}% + ${insetPixels}px) calc(${insetPercentage}% + ${insetPixels}px) round ${cornerRadius}px)`;

  // Scale zooms from 1.3 to 1.0 using standard transform scale
  const backgroundScale = useTransform(scrollYProgress, [0, 0.7], [1.3, 1]);
  
  // Logo fades out completely in the first 30%
  const logoOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const logoScale = useTransform(scrollYProgress, [0, 0.3], [1, 1.2]);
  
  // Physically unmount the logo from the flex layout after standard fade to prevent absolutely any ghost overlapping
  const logoDisplay = useTransform(scrollYProgress, (pos) => pos > 0.31 ? "none" : "flex");

  // Scroll indicator fades out fast as soon as user starts scrolling
  const scrollIndicatorOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);
  const scrollIndicatorY = useTransform(scrollYProgress, [0, 0.1], [0, 15]);

  const [textVisible, setTextVisible] = useState(false);
  
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (latest >= 0.7 && !textVisible) {
      setTextVisible(true);
    } else if (latest < 0.7 && textVisible) {
      setTextVisible(false);
    }
  });

  return (
    <div ref={containerRef} style={{ height: "200vh" }} className="relative w-full bg-background-light">
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-brand-surface border-b border-stone-200 relative">
        
        {/* The zooming background image revealed by the clip mask */}
        <motion.div
            className="absolute inset-0 bg-stone-900"
            style={{
                clipPath,
                willChange: "transform, opacity, clip-path",
            }}
        >
          <motion.div
              className={`absolute inset-0`}
              style={{
                  scale: backgroundScale,
                  willChange: "transform"
              }}
          >
              <picture className="absolute inset-0 w-full h-full">
                  {mobileHeroImage && <source media="(max-width: 768px)" srcSet={mobileHeroImage} />}
                  <img src={heroImage} alt="Hero Background" className="w-full h-full object-cover object-[75%_center] md:object-center" />
              </picture>
              <div className="absolute inset-0 bg-black/30 z-10"></div>
          </motion.div>
        </motion.div>

        {/* Center Logo that fades out as the mask opens */}
        <motion.div 
          className="absolute inset-0 flex items-center justify-center pointer-events-none z-20"
          style={{ opacity: logoOpacity, scale: logoScale, display: logoDisplay }}
        >
          {/* Renders the Fitsand Logo perfectly centered. Enforced max bounds to fit securely inside the 320x320 start mask */}
          <img src="/logo.png" alt="Fitsand Logo" className="w-[85%] max-w-[280px] object-contain brightness-0 invert drop-shadow-sm pointer-events-none" />
        </motion.div>

        {/* The inner children (Movement Refined text) that automatically fades in once mask opens */}
        <motion.div 
            className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 z-30"
            initial={{ opacity: 0, y: 30, pointerEvents: "none" }}
            animate={{ opacity: textVisible ? 1 : 0, y: textVisible ? 0 : 30, pointerEvents: textVisible ? "auto" : "none" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {children}
        </motion.div>

        {/* Minimal Scroll Down Indicator at the very bottom, visible only at the start */}
        <motion.div 
          className="absolute bottom-6 left-0 right-0 flex flex-col items-center gap-1 z-40 pointer-events-none"
          style={{ 
            opacity: scrollIndicatorOpacity, 
            y: scrollIndicatorY
          }}
        >
          <span className="font-nav text-[10px] tracking-[0.4em] uppercase text-stone-500 font-medium">Scroll</span>
          <motion.span 
            className="material-symbols-outlined text-stone-500 text-[24px]"
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          >
            expand_more
          </motion.span>
        </motion.div>

      </div>
    </div>
  );
};
