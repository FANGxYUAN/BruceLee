import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: '26', label: 'Films' },
  { value: '33', label: 'Years of Life' },
  { value: '1967', label: 'JKD Founded' },
  { value: '∞', label: 'Legacy' },
];

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Image reveal with parallax
      gsap.fromTo(
        imageRef.current,
        { scale: 1.15, opacity: 0, filter: 'blur(15px) grayscale(100%)' },
        {
          scale: 1,
          opacity: 1,
          filter: 'blur(0px) grayscale(100%)',
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
            end: 'center center',
            scrub: 1.5,
          },
        }
      );

      // Text lines stagger reveal
      const lines = textRef.current?.querySelectorAll('.reveal-text');
      if (lines) {
        gsap.fromTo(
          lines,
          { y: 60, opacity: 0, filter: 'blur(8px)' },
          {
            y: 0,
            opacity: 1,
            filter: 'blur(0px)',
            stagger: 0.18,
            ease: 'power3.out',
            duration: 1.1,
            scrollTrigger: {
              trigger: textRef.current,
              start: 'top 72%',
            },
          }
        );
      }

      // Stats counter animation
      const statEls = statsRef.current?.querySelectorAll('.stat-value');
      if (statEls) {
        gsap.fromTo(
          statEls,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            stagger: 0.1,
            ease: 'back.out(1.5)',
            scrollTrigger: {
              trigger: statsRef.current,
              start: 'top 85%',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-32 px-4 md:px-16 xl:px-24 min-h-screen flex items-center bg-jkd-black overflow-hidden">
      {/* Ambient gold orb */}
      <div className="absolute -left-40 top-1/3 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(212,175,55,0.04) 0%, transparent 70%)' }} />

      <div className="max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 xl:gap-28 items-center">

          {/* Image column */}
          <div className="relative">
            {/* Corner accents */}
            <div className="absolute -top-3 -left-3 w-12 h-12 border-t border-l border-jkd-gold/40 z-20" />
            <div className="absolute -bottom-3 -right-3 w-12 h-12 border-b border-r border-jkd-gold/40 z-20" />

            {/* Image frame */}
            <div className="relative aspect-[3/4] overflow-hidden group border border-white/5">
              {/* Color grade overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-jkd-black via-transparent to-transparent z-10 mix-blend-multiply" />
              <div className="absolute inset-0 bg-jkd-amber/10 mix-blend-overlay z-10 transition-opacity duration-700 group-hover:opacity-0" />

              <div
                ref={imageRef}
                className="w-full h-full bg-cover bg-center bg-top origin-center filter grayscale contrast-110"
                style={{
                  backgroundImage: 'url("/images/bruce_lee_real.jpg")',
                }}
              />

              {/* Quote overlay on hover */}
              <div className="absolute inset-0 z-20 flex items-end p-8 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                <p className="font-cinematic italic text-white/80 text-lg leading-relaxed"
                  style={{ textShadow: '0 2px 20px rgba(0,0,0,0.8)' }}>
                  "Absorb what is useful, discard what is not, add what is uniquely your own."
                </p>
              </div>
            </div>

            {/* Year badge */}
            <div className="absolute -right-5 top-1/3 bg-jkd-black border border-jkd-gold/20 px-4 py-3 z-30">
              <span className="font-chinese text-jkd-gold/60 text-3xl">武</span>
            </div>
          </div>

          {/* Text column */}
          <div ref={textRef} className="flex flex-col gap-8">
            <div className="reveal-text">
              <p className="text-xs tracking-[0.4em] text-jkd-gold/70 uppercase mb-4 font-sans font-light">The Dragon / 李小龍</p>
              <h2 className="text-5xl md:text-6xl xl:text-7xl font-cinematic text-white leading-[1.05]">
                A martial artist,
                <br />
                <span className="italic text-jkd-gold/90">philosopher,</span>
                <br />
                and legend.
              </h2>
            </div>

            <div className="reveal-text">
              <div className="w-16 h-[1px] bg-gradient-to-r from-jkd-gold to-transparent" />
            </div>

            <div className="reveal-text space-y-5 text-white/50 font-light text-lg leading-relaxed">
              <p>
                Bruce Lee revolutionized martial arts by breaking free from traditional forms.
                He believed that rigid styles were a cage — limiting the human body's natural expression.
              </p>
              <p>
                He created <span className="text-white/80 font-normal italic">Jeet Kune Do</span> — The Way of the Intercepting Fist.
                Not a style, but an approach. A philosophy of combat that emphasizes speed, directness, and total freedom.
              </p>
            </div>

            {/* Stats row */}
            <div ref={statsRef} className="reveal-text grid grid-cols-4 gap-4 mt-4 pt-8 border-t border-white/5">
              {stats.map((stat) => (
                <div key={stat.label} className="stat-value text-center">
                  <div className="font-cinematic text-3xl md:text-4xl text-jkd-gold mb-1 counter-num">
                    {stat.value}
                  </div>
                  <div className="text-[10px] uppercase tracking-[0.2em] text-white/30 font-sans">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
