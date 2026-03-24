import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useMotionTemplate } from "framer-motion";

export const HeroReveal = ({ heroImage, children }) => {
  const containerRef = useRef(null);

  // We track the scroll progress specifically through this 200vh container.
  // It starts when the top of the container hits the top of the viewport.
  // It ends when the bottom of the container hits the bottom of the viewport.
  // Since the wrapper is 200vh and the screen is 100vh, the user explicitly scrolls 100vh of distance.
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // The clip-path mask opens during the first 30% of the scroll
  // Convert the generic polygon into a true 320x320 pixel mathematically-centered square clip-mask utilizing 'inset'.
  const insetPercentage = useTransform(scrollYProgress, [0, 0.3], [50, 0]); 
  const insetPixels = useTransform(scrollYProgress, [0, 0.3], [-160, 0]); 
  const cornerRadius = useTransform(scrollYProgress, [0, 0.3], [24, 0]); 
  const clipPath = useMotionTemplate`inset(calc(${insetPercentage}% + ${insetPixels}px) calc(${insetPercentage}% + ${insetPixels}px) calc(${insetPercentage}% + ${insetPixels}px) calc(${insetPercentage}% + ${insetPixels}px) round ${cornerRadius}px)`;

  // Scale zooms from 1.3 to 1.0 using standard transform scale
  const backgroundScale = useTransform(scrollYProgress, [0, 0.3], [1.3, 1]);
  
  // Logo fades out completely in the first 15% (vanishing way before text appears)
  const logoOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
  const logoScale = useTransform(scrollYProgress, [0, 0.15], [1, 1.2]);
  
  // Physically unmount the logo from the flex layout after standard fade to prevent absolutely any ghost overlapping
  const logoDisplay = useTransform(scrollYProgress, (pos) => pos > 0.16 ? "none" : "flex");

  // Content fades in between 20% and 40%. The remaining 60% of scroll is pure reading buffer!
  const contentOpacity = useTransform(scrollYProgress, [0.2, 0.4], [0, 1]);
  const contentY = useTransform(scrollYProgress, [0.2, 0.4], [40, 0]);

  return (
    <div ref={containerRef} style={{ height: "400vh" }} className="relative w-full bg-background-light">
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-brand-surface border-b border-stone-200">
        
        {/* The zooming background image revealed by the clip mask */}
        <motion.div
            className="absolute inset-0 bg-stone-900"
            style={{
                clipPath,
                willChange: "transform, opacity, clip-path",
            }}
        >
          <motion.div
              className={`absolute inset-0 bg-[75%_center] md:bg-center bg-cover bg-no-repeat`}
              style={{
                  backgroundImage: `url('${heroImage}')`,
                  scale: backgroundScale,
                  willChange: "transform"
              }}
          >
              <div className="absolute inset-0 bg-black/30"></div>
          </motion.div>
        </motion.div>

        {/* Center Logo that fades out as the mask opens */}
        <motion.div 
          className="absolute inset-0 flex items-center justify-center pointer-events-none z-20"
          style={{ opacity: logoOpacity, scale: logoScale, display: logoDisplay }}
        >
          {/* Renders the Fitsand Logo perfectly centered. Enforced max bounds to fit securely inside the 320x320 start mask */}
          <img src="/logo.png" alt="Fitsand Logo" className="w-[85%] max-w-[280px] object-contain brightness-0 invert drop-shadow-sm" />
        </motion.div>

        {/* The inner children (Movement Refined text) that fades in after mask opens */}
        <motion.div 
            className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 z-30"
            style={{ opacity: contentOpacity, y: contentY }}
        >
          {children}
        </motion.div>

      </div>
    </div>
  );
};
