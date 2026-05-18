import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion, useScroll, useTransform } from 'framer-motion';

gsap.registerPlugin(ScrollTrigger);

export default function BeWater() {
  const containerRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const line1Ref = useRef<HTMLSpanElement>(null);
  const line2Ref = useRef<HTMLSpanElement>(null);
  const line3Ref = useRef<HTMLSpanElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ['-10%', '10%']);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top center',
          end: 'bottom top',
          scrub: 1.5,
          pin: true,
          pinSpacing: true,
        },
      });

      // Stagger in the lines
      tl.fromTo(
        [line1Ref.current, line2Ref.current, line3Ref.current],
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, stagger: 0.3, ease: 'power2.out', duration: 0.5 },
        0
      );

      // Scale and fade out at end
      tl.to(
        textRef.current,
        { scale: 1.4, opacity: 0, filter: 'blur(30px)', ease: 'power2.in', duration: 0.5 },
        0.8
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="h-screen w-full flex items-center justify-center bg-black relative overflow-hidden"
    >
      {/* Real background — dark water surface */}
      <motion.div
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1505118380757-91f5f5632de0?q=80&w=2000&auto=format&fit=crop")',
          y: bgY,
          filter: 'brightness(0.15) contrast(1.2)',
        }}
      />

      {/* Animated water-like blue glow layers */}
      <motion.div
        className="absolute inset-0 pointer-events-none z-[1]"
        style={{ y: bgY }}
      >
        <div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse 80% 50% at 50% 60%, rgba(30,58,138,0.12) 0%, transparent 100%)',
          }}
        />
      </motion.div>

      {/* Horizontal water ripple lines */}
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          className="absolute left-0 right-0 h-[1px] pointer-events-none z-[2]"
          style={{
            top: `${30 + i * 8}%`,
            background: 'linear-gradient(90deg, transparent 0%, rgba(30,58,138,0.15) 30%, rgba(96,165,250,0.1) 50%, rgba(30,58,138,0.15) 70%, transparent 100%)',
            animation: `waterRipple ${4 + i * 0.7}s ease-in-out ${i * 0.4}s infinite`,
          }}
        />
      ))}

      {/* Spinning decorative ring */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-[2]">
        <div
          className="w-[600px] h-[600px] rounded-full border border-jkd-gold/[0.04] rotate-slow"
          style={{ boxShadow: 'inset 0 0 80px rgba(212,175,55,0.02)' }}
        />
        <div className="absolute w-[400px] h-[400px] rounded-full border border-blue-900/10 rotate-slow-reverse" />
      </div>

      {/* Chinese character — large background */}
      <div className="absolute font-chinese text-[40vw] text-white/[0.015] select-none leading-none pointer-events-none">
        水
      </div>

      {/* Main quote text */}
      <div ref={textRef} className="relative z-10 w-full max-w-4xl px-6 md:px-12 text-center">
        <span
          ref={line1Ref}
          className="block font-cinematic text-4xl md:text-6xl lg:text-7xl text-white/80 leading-tight mb-3"
          style={{ textShadow: '0 0 60px rgba(255,255,255,0.06)' }}
        >
          Empty your mind.
        </span>
        <span
          ref={line2Ref}
          className="block font-cinematic italic text-4xl md:text-6xl lg:text-7xl text-white/50 leading-tight mb-3"
        >
          Be formless, shapeless...
        </span>
        <span
          ref={line3Ref}
          className="block font-cinematic font-bold text-5xl md:text-7xl lg:text-8xl text-gradient-gold leading-tight text-glow"
        >
          like water.
        </span>

        <div className="mt-12 flex items-center justify-center gap-6">
          <div className="h-[1px] w-16 bg-gradient-to-r from-transparent to-jkd-gold/40" />
          <span className="font-chinese text-jkd-gold/40 text-2xl">水</span>
          <div className="h-[1px] w-16 bg-gradient-to-l from-transparent to-jkd-gold/40" />
        </div>
      </div>

      {/* Vignette */}
      <div className="absolute inset-0 vignette pointer-events-none z-[2]" />
    </section>
  );
}
