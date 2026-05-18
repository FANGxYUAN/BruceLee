import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const tenets = [
  {
    title: 'Fluidity',
    desc: 'Like water, formless and adaptable. Capable of flowing seamlessly from one movement to the next, yielding to force yet wearing down the hardest stone.',
    char: '水',
    num: '01',
    quote: '"Empty your mind, be formless, shapeless — like water."',
  },
  {
    title: 'Economy of Motion',
    desc: 'Maximum efficiency. The shortest distance between two points is a straight line. No wasted movement, no excess — only pure, direct expression.',
    char: '简',
    num: '02',
    quote: '"Simplicity is the key to brilliance."',
  },
  {
    title: 'Self-Expression',
    desc: 'Honest expression of the human body in combat, unbound by classical routines. True art is the direct expression of one\'s self.',
    char: '真',
    num: '03',
    quote: '"Using no way as way, having no limitation as limitation."',
  },
];

export default function Philosophy() {
  const containerRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header
      gsap.fromTo(
        headerRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: headerRef.current, start: 'top 80%' },
        }
      );

      // Cards
      cardsRef.current.forEach((card, i) => {
        gsap.fromTo(
          card,
          { y: 80, opacity: 0, rotateX: -20, filter: 'blur(10px)' },
          {
            y: 0, opacity: 1, rotateX: 0, filter: 'blur(0px)',
            duration: 1.1, ease: 'power3.out',
            scrollTrigger: { trigger: card, start: 'top 88%' },
            delay: i * 0.15,
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="py-32 px-4 md:px-16 bg-[#080808] relative overflow-hidden">
      {/* Diagonal stripe texture */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: 'repeating-linear-gradient(-45deg, #D4AF37 0, #D4AF37 1px, transparent 0, transparent 50%)',
          backgroundSize: '6px 6px',
        }}
      />

      {/* Large ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at center, rgba(212,175,55,0.03) 0%, transparent 70%)' }} />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-24">
          <p className="text-xs tracking-[0.5em] text-jkd-gold/60 uppercase font-sans mb-5">Jeet Kune Do</p>
          <h2 className="text-4xl md:text-6xl xl:text-7xl font-cinematic text-white mb-8">
            The Three <span className="italic text-jkd-gold/90">Pillars</span>
          </h2>
          <div className="section-divider" />
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 perspective-[1200px]">
          {tenets.map((tenet, idx) => (
            <div
              key={idx}
              ref={(el) => { if (el) cardsRef.current[idx] = el; }}
              className="group relative cinematic-border bg-black/30 backdrop-blur-sm p-10 flex flex-col overflow-hidden card-shine"
              data-cursor-hover="true"
            >
              {/* Large character watermark */}
              <div className="absolute top-0 right-0 font-chinese text-[10rem] leading-none text-white/[0.03] group-hover:text-jkd-gold/[0.06] transition-colors duration-700 select-none translate-x-4 -translate-y-4">
                {tenet.char}
              </div>

              {/* Number */}
              <span className="text-xs font-mono tracking-[0.3em] text-jkd-gold/40 mb-8 block counter-num">
                {tenet.num}
              </span>

              {/* Title */}
              <h3 className="text-3xl md:text-4xl font-cinematic text-white mb-5 group-hover:text-jkd-gold transition-colors duration-500 relative z-10">
                {tenet.title}
              </h3>

              {/* Expanding underline */}
              <div className="h-[1px] w-0 group-hover:w-full transition-all duration-700 ease-out mb-6"
                style={{ background: 'linear-gradient(90deg, #D4AF37, transparent)' }} />

              {/* Description */}
              <p className="text-white/40 font-light leading-relaxed flex-1 relative z-10 text-sm md:text-base">
                {tenet.desc}
              </p>

              {/* Quote appears on hover */}
              <div className="mt-8 overflow-hidden">
                <p className="font-cinematic italic text-jkd-gold/60 text-sm leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-700 translate-y-4 group-hover:translate-y-0 transition-transform">
                  {tenet.quote}
                </p>
              </div>

              {/* Subtle corner glow on hover */}
              <div className="absolute bottom-0 left-0 w-24 h-24 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                style={{ background: 'radial-gradient(circle at 0% 100%, rgba(212,175,55,0.1) 0%, transparent 70%)' }} />
            </div>
          ))}
        </div>

        {/* Bottom centered quote */}
        <div className="text-center mt-24">
          <p className="font-cinematic italic text-2xl md:text-3xl text-white/20 max-w-2xl mx-auto leading-relaxed">
            "Research your own experience. Absorb what is useful."
          </p>
        </div>
      </div>
    </section>
  );
}
