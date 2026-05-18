import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const events = [
  {
    year: '1940',
    title: 'The Dragon is Born',
    desc: 'Born on November 27th in San Francisco during the Hour of the Dragon. Raised in Kowloon, Hong Kong.',
    char: '生',
    detail: 'San Francisco, CA',
  },
  {
    year: '1954',
    title: 'Wing Chun Begins',
    desc: 'Studies Wing Chun under Ip Man in Hong Kong. The foundation of a revolutionary philosophy begins.',
    char: '武',
    detail: 'Hong Kong',
  },
  {
    year: '1959',
    title: 'Journey to America',
    desc: 'Arrives in Seattle with $100 in his pocket. Begins teaching martial arts, captivating all who witness him.',
    char: '旅',
    detail: 'Seattle, WA',
  },
  {
    year: '1967',
    title: 'Birth of Jeet Kune Do',
    desc: 'Founds the Way of the Intercepting Fist — not a style, but a philosophy of total freedom in combat.',
    char: '道',
    detail: 'Los Angeles, CA',
  },
  {
    year: '1973',
    title: 'Enter the Dragon',
    desc: 'His masterwork premieres to global acclaim, just 6 days after his passing. An immortal legacy is sealed.',
    char: '龍',
    detail: 'Global Release',
  },
];

export default function Timeline() {
  const containerRef = useRef<HTMLElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Draw the vertical line
      gsap.fromTo(
        lineRef.current,
        { scaleY: 0, opacity: 0 },
        {
          scaleY: 1,
          opacity: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 60%',
            end: 'bottom 60%',
            scrub: true,
          },
        }
      );

      // Reveal each item
      itemRefs.current.forEach((item, i) => {
        const isLeft = i % 2 === 0;
        const dot = item.querySelector('.timeline-dot');
        const content = item.querySelector('.timeline-content');

        gsap.fromTo(
          dot,
          { scale: 0, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.6,
            ease: 'back.out(2)',
            scrollTrigger: { trigger: item, start: 'top 78%' },
          }
        );

        gsap.fromTo(
          content,
          { x: isLeft ? -70 : 70, opacity: 0, filter: 'blur(8px)' },
          {
            x: 0,
            opacity: 1,
            filter: 'blur(0px)',
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: { trigger: item, start: 'top 80%' },
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="py-32 px-4 bg-jkd-black relative overflow-hidden">
      {/* Ambient side glows */}
      <div className="absolute left-0 top-0 bottom-0 w-48 pointer-events-none"
        style={{ background: 'linear-gradient(90deg, rgba(212,175,55,0.02) 0%, transparent 100%)' }} />
      <div className="absolute right-0 top-0 bottom-0 w-48 pointer-events-none"
        style={{ background: 'linear-gradient(-90deg, rgba(212,175,55,0.02) 0%, transparent 100%)' }} />

      <div className="max-w-5xl mx-auto relative">
        {/* Header */}
        <div className="text-center mb-24">
          <p className="text-xs tracking-[0.5em] text-jkd-gold/60 uppercase font-sans mb-5">Life & Legacy</p>
          <h2 className="text-4xl md:text-6xl font-cinematic text-white mb-8">
            The <span className="italic text-jkd-gold/90">Evolution</span>
          </h2>
          <div className="section-divider" />
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div
            ref={lineRef}
            className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-[1px] origin-top"
            style={{ background: 'linear-gradient(to bottom, transparent, #D4AF37 15%, #D4AF37 85%, transparent)' }}
          />

          {events.map((ev, idx) => {
            const isLeft = idx % 2 === 0;
            return (
              <div
                key={idx}
                ref={(el) => { if (el) itemRefs.current[idx] = el; }}
                className={`relative flex items-center mb-20 md:mb-28 w-full ${isLeft ? 'flex-row' : 'flex-row-reverse'}`}
              >
                {/* Content half */}
                <div className={`timeline-content w-5/12 ${isLeft ? 'pr-12 text-right' : 'pl-12 text-left'}`}>
                  {/* Detail badge */}
                  <span className="text-[10px] tracking-[0.3em] text-jkd-gold/40 uppercase font-sans block mb-2">
                    {ev.detail}
                  </span>
                  {/* Year */}
                  <span className="font-cinematic text-5xl md:text-6xl font-bold text-white/[0.07] block leading-none mb-3 counter-num">
                    {ev.year}
                  </span>
                  {/* Title */}
                  <h3 className="text-xl md:text-2xl font-cinematic text-white mb-3 leading-snug">
                    {ev.title}
                  </h3>
                  <p className="text-white/35 font-light text-sm md:text-base leading-relaxed">{ev.desc}</p>
                </div>

                {/* Center dot & char */}
                <div className="w-2/12 flex justify-center items-center relative z-10 flex-col gap-2">
                  <div className="font-chinese text-jkd-gold/25 text-lg select-none">{ev.char}</div>
                  <div
                    className="timeline-dot w-3 h-3 rounded-full border-2 border-jkd-gold bg-jkd-black relative"
                    style={{ boxShadow: '0 0 16px rgba(212,175,55,0.4)' }}
                  >
                    {/* Pulse ring */}
                    <div className="absolute inset-[-6px] rounded-full border border-jkd-gold/20 animate-ping" style={{ animationDuration: '3s' }} />
                  </div>
                </div>

                {/* Empty half */}
                <div className="w-5/12" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
