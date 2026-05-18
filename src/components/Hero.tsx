import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as random from 'maath/random/dist/maath-random.esm';

function ParticleField() {
  const ref = useRef<any>();
  const sphere = random.inSphere(new Float32Array(6000), { radius: 1.5 });

  useFrame((_state, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta / 14;
      ref.current.rotation.y -= delta / 18;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 5]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled={false} scale={2.2}>
        <PointMaterial
          transparent
          color="#D4AF37"
          size={0.004}
          sizeAttenuation={true}
          depthWrite={false}
          opacity={0.55}
        />
      </Points>
    </group>
  );
}

export default function Hero() {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 1000], [0, 280]);
  const opacity = useTransform(scrollY, [0, 600], [1, 0]);
  const scale = useTransform(scrollY, [0, 800], [1, 1.08]);

  const words = 'BE WATER'.split('');
  const subtitle = 'MY FRIEND'.split('');

  const charVariants = {
    hidden: { opacity: 0, y: 80, rotateX: -40, filter: 'blur(12px)' },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      rotateX: 0,
      filter: 'blur(0px)',
      transition: {
        delay: 3.2 + i * 0.06,
        duration: 1,
        ease: [0.16, 1, 0.3, 1],
      },
    }),
  };

  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden film-frame">
      {/* Hero background image */}
      <motion.div
        className="absolute inset-0 z-0 bg-center bg-cover bg-no-repeat"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1525160354320-d8e92641c563?q=80&w=2000&auto=format&fit=crop")',
          y: y1,
          scale,
        }}
      />

      {/* Dark overlay to keep cinematic darkness */}
      <div
        className="absolute inset-0 z-[1]"
        style={{ background: 'linear-gradient(to bottom, rgba(5,5,5,0.55) 0%, rgba(5,5,5,0.4) 40%, rgba(5,5,5,0.75) 80%, rgba(5,5,5,1) 100%)' }}
      />

      {/* Particle Background on top of image */}
      <div className="absolute inset-0 z-[2] opacity-50">
        <Canvas camera={{ position: [0, 0, 1] }}>
          <ParticleField />
        </Canvas>
      </div>

      {/* Deep radial vignette */}
      <motion.div
        className="absolute inset-0 z-[3]"
        style={{
          background: 'radial-gradient(ellipse 80% 70% at 50% 50%, transparent 0%, rgba(5,5,5,0.5) 70%, rgba(5,5,5,0.92) 100%)',
        }}
      />

      {/* Subtle red horizontal split */}
      <div className="absolute inset-x-0 top-1/2 h-[1px] bg-gradient-to-r from-transparent via-jkd-red/20 to-transparent z-[2]" />

      {/* Chinese character watermark */}
      <motion.div
        className="absolute right-[5%] top-1/2 -translate-y-1/2 font-chinese text-[20vw] text-white/[0.02] select-none z-[2] leading-none"
        style={{ y: y1 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3, duration: 2 }}
      >
        龍
      </motion.div>

      {/* Main text */}
      <div className="relative z-10 text-center px-4 perspective-[1200px]">
        <motion.div style={{ opacity }}>
          {/* BE WATER */}
          <div className="flex justify-center gap-[0.12em] overflow-hidden">
            {words.map((char, i) => (
              <motion.span
                key={i}
                custom={i}
                initial="hidden"
                animate="visible"
                variants={charVariants}
                className={`inline-block font-cinematic font-bold text-[13vw] md:text-[10vw] lg:text-[8vw] leading-none ${char === ' ' ? 'mr-[0.3em]' : ''} text-white`}
                style={{
                  textShadow: '0 0 60px rgba(255,255,255,0.05)',
                }}
              >
                {char === ' ' ? '\u00A0' : char}
              </motion.span>
            ))}
          </div>

          {/* MY FRIEND */}
          <div className="flex justify-center gap-[0.12em] overflow-hidden mt-1">
            {subtitle.map((char, i) => (
              <motion.span
                key={i}
                custom={words.length + i}
                initial="hidden"
                animate="visible"
                variants={charVariants}
                className={`inline-block font-cinematic italic font-light text-[7vw] md:text-[5.5vw] lg:text-[4.5vw] leading-none ${char === ' ' ? 'mr-[0.3em]' : ''} text-gradient-gold`}
              >
                {char === ' ' ? '\u00A0' : char}
              </motion.span>
            ))}
          </div>

          {/* Divider */}
          <motion.div
            className="mx-auto mt-8 h-[1px] bg-gradient-to-r from-transparent via-jkd-gold/50 to-transparent"
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: '200px', opacity: 1 }}
            transition={{ delay: 4.8, duration: 1.5, ease: 'easeInOut' }}
          />

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 5.2, duration: 1.2 }}
            className="mt-6 text-white/40 uppercase tracking-[0.6em] text-xs md:text-sm font-sans font-light"
          >
            The Philosophy of Jeet Kune Do
          </motion.p>
        </motion.div>
      </div>

      {/* Cinematic bars */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-8 bg-black z-[3]"
        initial={{ scaleY: 3 }}
        animate={{ scaleY: 1 }}
        transition={{ delay: 2.8, duration: 0.8, ease: 'easeInOut' }}
        style={{ transformOrigin: 'top' }}
      />
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-8 bg-black z-[3]"
        initial={{ scaleY: 3 }}
        animate={{ scaleY: 1 }}
        transition={{ delay: 2.8, duration: 0.8, ease: 'easeInOut' }}
        style={{ transformOrigin: 'bottom' }}
      />

      {/* Scroll cue */}
      <motion.div
        className="absolute bottom-14 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 5.8, duration: 1 }}
      >
        <span className="text-white/30 text-[10px] tracking-[0.4em] uppercase font-sans">Scroll</span>
        <div className="relative w-[1px] h-14 overflow-hidden">
          <motion.div
            className="absolute top-0 w-full bg-gradient-to-b from-jkd-gold to-transparent"
            animate={{ y: ['-100%', '200%'] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            style={{ height: '60%' }}
          />
        </div>
      </motion.div>
    </section>
  );
}
