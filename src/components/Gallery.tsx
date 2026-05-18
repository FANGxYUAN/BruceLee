import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const images = [
  {
    src: '/images/gallery_nunchaku.png',
    label: 'The Weapon',
    caption: 'Movement is Truth',
  },
  {
    src: 'https://images.unsplash.com/photo-1555597673-b21d5c935865?q=90&w=800&auto=format&fit=crop',
    label: 'The Form',
    caption: 'Stillness in Motion',
  },
  {
    src: 'https://images.unsplash.com/photo-1571019613576-2b22c76fd955?q=90&w=800&auto=format&fit=crop',
    label: 'The Power',
    caption: 'Efficiency in Action',
  },
];

export default function Gallery() {
  const containerRef = useRef<HTMLElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header
      gsap.fromTo(
        headerRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 1,
          scrollTrigger: { trigger: headerRef.current, start: 'top 80%' },
        }
      );

      // Parallax on each image
      imagesRef.current.forEach((img) => {
        gsap.fromTo(
          img,
          { yPercent: -15 },
          {
            yPercent: 15,
            ease: 'none',
            scrollTrigger: {
              trigger: img.parentElement,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
            },
          }
        );
      });

      // Stagger-in the cards
      const cards = containerRef.current?.querySelectorAll('.gallery-card');
      if (cards) {
        gsap.fromTo(
          cards,
          { y: 60, opacity: 0, filter: 'blur(10px)' },
          {
            y: 0, opacity: 1, filter: 'blur(0px)',
            stagger: 0.15, duration: 1.2, ease: 'power3.out',
            scrollTrigger: { trigger: containerRef.current, start: 'top 75%' },
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="py-32 bg-[#080808] overflow-hidden relative">
      {/* Horizontal rule top */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-jkd-gold/10 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 md:px-16">
        {/* Header */}
        <div ref={headerRef} className="mb-20 flex items-end justify-between">
          <div>
            <p className="text-xs tracking-[0.5em] text-jkd-gold/60 uppercase font-sans mb-4">Visual</p>
            <h2 className="text-4xl md:text-6xl font-cinematic text-white">
              The Art of <span className="italic text-jkd-gold/90">Combat</span>
            </h2>
          </div>
          <div className="hidden md:block">
            <p className="font-cinematic italic text-white/20 text-lg text-right max-w-xs leading-relaxed">
              "I fear not the man who has practiced 10,000 kicks once, but the man who has practiced one kick 10,000 times."
            </p>
          </div>
        </div>

        {/* Masonry grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {images.map((item, idx) => (
            <div
              key={idx}
              className={`gallery-card group relative overflow-hidden ${idx === 1 ? 'md:mt-16' : ''} ${idx === 2 ? 'md:mt-8' : ''}`}
            >
              {/* Aspect box */}
              <div className="relative aspect-[3/4] overflow-hidden">
                {/* Corner accents */}
                <div className="absolute top-3 left-3 w-8 h-8 border-t border-l border-jkd-gold/30 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute bottom-3 right-3 w-8 h-8 border-b border-r border-jkd-gold/30 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Dark overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent z-10 transition-opacity duration-700" />
                {/* Hover color wash */}
                <div className="absolute inset-0 bg-jkd-amber/5 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 mix-blend-overlay" />

                <img
                  ref={(el) => { if (el) imagesRef.current[idx] = el; }}
                  src={item.src}
                  alt={item.label}
                  className="w-full h-[130%] object-cover absolute top-[-15%] left-0 filter grayscale contrast-110 group-hover:grayscale-0 transition-all duration-700"
                />

                {/* Text overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
                  <span className="text-[10px] tracking-[0.4em] text-jkd-gold/60 uppercase font-sans block mb-2 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
                    {item.label}
                  </span>
                  <p className="font-cinematic italic text-white text-xl translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                    {item.caption}
                  </p>
                </div>

                {/* Index number */}
                <div className="absolute top-5 right-5 font-mono text-xs text-white/20 z-20 counter-num">
                  {String(idx + 1).padStart(2, '0')}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
