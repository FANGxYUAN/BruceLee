import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function Legacy() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end end'],
  });

  const opacity = useTransform(scrollYProgress, [0.3, 0.75], [0, 1]);
  const y = useTransform(scrollYProgress, [0.3, 0.75], [80, 0]);
  const scale = useTransform(scrollYProgress, [0.3, 0.75], [0.92, 1]);
  const charOpacity = useTransform(scrollYProgress, [0.1, 0.5], [0, 0.08]);

  return (
    <section
      ref={containerRef}
      className="min-h-screen relative flex flex-col items-center justify-center bg-black overflow-hidden py-32"
    >
      {/* Background image — ancient stone courtyard */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1559827291-72ee739d0d9a?q=80&w=2000&auto=format&fit=crop")',
          filter: 'brightness(0.07) contrast(1.3) grayscale(0.6)',
        }}
      />
      {/* Ambient top glow */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-jkd-gold/20 to-transparent" />

      {/* Pulsing radial glow */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        style={{ opacity }}
      >
        <div
          className="w-[600px] h-[600px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(212,175,55,0.08) 0%, transparent 70%)',
            animation: 'pulse 6s ease-in-out infinite',
          }}
        />
      </motion.div>

      {/* Background dragon character */}
      <motion.div
        className="absolute font-chinese text-[35vw] leading-none select-none pointer-events-none"
        style={{ opacity: charOpacity, color: '#D4AF37' }}
      >
        永
      </motion.div>

      {/* Spinning ring decoration */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <motion.div
          className="w-[500px] h-[500px] rounded-full border border-jkd-gold/[0.05]"
          style={{ opacity }}
          animate={{ rotate: 360 }}
          transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
        />
        <motion.div
          className="absolute w-[380px] h-[380px] rounded-full border border-jkd-gold/[0.08]"
          style={{ opacity }}
          animate={{ rotate: -360 }}
          transition={{ duration: 28, repeat: Infinity, ease: 'linear' }}
        />
      </div>

      {/* Main content */}
      <motion.div
        style={{ opacity, y, scale }}
        className="relative z-10 text-center px-6 max-w-4xl mx-auto"
      >
        {/* Dragon seal symbol */}
        <div className="w-28 h-28 mx-auto border border-jkd-gold/20 rounded-full flex items-center justify-center relative mb-16">
          <div className="absolute inset-0 rounded-full border border-jkd-gold/10 animate-ping" style={{ animationDuration: '4s' }} />
          <div className="absolute inset-[-12px] rounded-full border border-jkd-gold/5 animate-ping" style={{ animationDuration: '5s', animationDelay: '1s' }} />
          <span className="font-chinese text-4xl text-jkd-gold/70">龍</span>
        </div>

        {/* Main heading */}
        <h2 className="font-cinematic text-5xl md:text-7xl xl:text-8xl text-white leading-tight mb-8">
          The Legend
          <br />
          <span className="italic text-gradient-gold">Lives On</span>
        </h2>

        <div className="section-divider mb-10" />

        {/* Primary quote */}
        <p className="font-cinematic italic text-2xl md:text-3xl text-white/70 leading-relaxed mb-8 max-w-2xl mx-auto">
          "The key to immortality is first living a life worth remembering."
        </p>

        {/* Secondary detail */}
        <p className="text-white/25 font-sans font-light text-sm tracking-wide max-w-lg mx-auto leading-relaxed mb-16">
          Bruce Lee transcended martial arts to become a global icon of philosophy, film, and human potential.
          His legacy continues to inspire millions to break free from limitation.
        </p>

        {/* Bottom inscription */}
        <div className="flex items-center justify-center gap-8">
          <div className="h-[1px] w-20 bg-gradient-to-r from-transparent to-jkd-gold/30" />
          <p className="text-[10px] text-jkd-gold/50 tracking-[0.6em] uppercase font-sans">A Cinematic Tribute · 1940 – 1973</p>
          <div className="h-[1px] w-20 bg-gradient-to-l from-transparent to-jkd-gold/30" />
        </div>
      </motion.div>

      {/* Fade to absolute black at bottom */}
      <div className="absolute bottom-0 w-full h-48 bg-gradient-to-t from-black to-transparent pointer-events-none" />
    </section>
  );
}
