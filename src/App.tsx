import { useEffect, useState } from 'react';
import Lenis from 'lenis';
import Loader from './components/Loader';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import About from './components/About';
import Philosophy from './components/Philosophy';
import BeWater from './components/BeWater';
import Timeline from './components/Timeline';
import Gallery from './components/Gallery';
import Legacy from './components/Legacy';
import Location from './components/Location';
import CustomCursor from './components/CustomCursor';
import { AnimatePresence, motion } from 'framer-motion';

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.9,
      touchMultiplier: 2,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    const timer = setTimeout(() => setLoading(false), 3500);

    return () => {
      clearTimeout(timer);
      lenis.destroy();
    };
  }, []);

  return (
    <>
      <CustomCursor />

      <AnimatePresence mode="wait">
        {loading && <Loader key="loader" />}
      </AnimatePresence>

      <AnimatePresence>
        {!loading && (
          <motion.div
            key="site"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            {/* Global noise texture overlay */}
            <div className="fixed inset-0 bg-noise z-0 pointer-events-none" />

            <Navigation />

            <main className="relative w-full overflow-hidden bg-jkd-black min-h-screen">
              <section id="hero"><Hero /></section>
              <section id="about"><About /></section>
              <section id="philosophy"><Philosophy /></section>
              <section id="bewater"><BeWater /></section>
              <section id="timeline"><Timeline /></section>
              <section id="gallery"><Gallery /></section>
              <Legacy />
              <section id="location"><Location /></section>
            </main>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default App;
