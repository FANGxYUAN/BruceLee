import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

export default function Loader() {
  const [phase, setPhase] = useState(0); // 0: dragon char, 1: name, 2: tagline

  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 400);
    const t2 = setTimeout(() => setPhase(2), 1200);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-jkd-black overflow-hidden"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 1.2, ease: [0.76, 0, 0.24, 1] } }}
    >
      {/* Ambient glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <motion.div
          className="w-96 h-96 rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(212,175,55,0.06) 0%, transparent 70%)' }}
          animate={{ scale: [1, 1.3, 1], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      {/* Horizontal scan line */}
      <motion.div
        className="absolute w-full h-[1px] bg-gradient-to-r from-transparent via-jkd-gold/20 to-transparent"
        animate={{ y: ['-50vh', '50vh'] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
      />

      <div className="relative text-center flex flex-col items-center gap-8">
        {/* Chinese Dragon Character */}
        <AnimatePresence>
          {phase >= 0 && (
            <motion.div
              className="font-chinese text-8xl md:text-9xl text-jkd-gold/20 absolute -top-32 left-1/2 -translate-x-1/2 select-none"
              initial={{ opacity: 0, scale: 0.7, filter: 'blur(20px)' }}
              animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
              transition={{ duration: 1.2, ease: 'easeOut' }}
            >
              龍
            </motion.div>
          )}
        </AnimatePresence>

        {/* Name */}
        <motion.div
          className="overflow-hidden"
          initial={{ height: 0 }}
          animate={{ height: 'auto' }}
          transition={{ duration: 0, delay: 0.3 }}
        >
          <motion.h1
            className="font-cinematic text-5xl md:text-7xl lg:text-8xl text-white tracking-[0.15em] uppercase"
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            Bruce Lee
          </motion.h1>
        </motion.div>

        {/* Gold line expands */}
        <motion.div
          className="h-[1px] bg-gradient-to-r from-transparent via-jkd-gold to-transparent"
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: '200px', opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.8, ease: 'easeInOut' }}
        />

        {/* Tagline */}
        <motion.p
          className="text-jkd-gold/70 tracking-[0.5em] text-xs uppercase font-sans font-light"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.4 }}
        >
          A Cinematic Tribute
        </motion.p>

        {/* Loading dots */}
        <motion.div
          className="flex gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6 }}
        >
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-1 h-1 rounded-full bg-jkd-gold/50"
              animate={{ opacity: [0.3, 1, 0.3], scale: [1, 1.5, 1] }}
              transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.2 }}
            />
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
}
