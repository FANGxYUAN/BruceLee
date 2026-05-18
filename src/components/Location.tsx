import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Location() {
  const sectionRef = useRef<HTMLElement>(null);
  
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.location-reveal',
        { y: 50, opacity: 0, filter: 'blur(10px)' },
        { y: 0, opacity: 1, filter: 'blur(0px)', duration: 1, stagger: 0.2, scrollTrigger: { trigger: sectionRef.current, start: 'top 85%' } }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-32 bg-[#050505] border-t border-jkd-gold/10 relative overflow-hidden">
      {/* Subtle radial gradient background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-jkd-gold/5 blur-[100px] rounded-full pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 md:px-16 text-center z-10 relative">
        <p className="text-xs tracking-[0.4em] text-jkd-gold/60 uppercase font-sans mb-4 location-reveal">The Genesis</p>
        <h2 className="text-4xl md:text-5xl font-cinematic text-white mb-12 location-reveal">
          Jun Fan Gung Fu <span className="italic text-jkd-gold/90">Institute</span>
        </h2>
        
        <div className="inline-block border border-white/5 bg-[#0a0a0a]/80 backdrop-blur-sm p-8 md:p-12 location-reveal relative group text-left max-w-4xl w-full">
           {/* Corner accents */}
           <div className="absolute top-0 left-0 w-6 h-6 border-t border-l border-jkd-gold/40 z-20" />
           <div className="absolute bottom-0 right-0 w-6 h-6 border-b border-r border-jkd-gold/40 z-20" />
           
           <div className="absolute inset-0 bg-jkd-amber/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0" />
           
           <div className="relative z-10 flex flex-col md:flex-row gap-8 items-center md:items-start justify-between">
             <div>
               <p className="font-sans text-white/50 tracking-[0.2em] uppercase text-xs mb-3">Original Dojo Location</p>
               <p className="font-cinematic text-2xl md:text-3xl text-white mb-4 leading-snug">
                 628 W. College Street<br/>
                 Los Angeles, CA 90012
               </p>
               <p className="font-light text-white/40 text-sm leading-relaxed max-w-sm">
                 The historic site where Bruce Lee formally established his Los Angeles school and further developed the revolutionary philosophy of Jeet Kune Do.
               </p>
             </div>
             
             {/* Map Iframe */}
             <div className="mt-8 md:mt-0 w-full md:w-1/2 flex-shrink-0 overflow-hidden rounded border border-white/10 opacity-90 hover:opacity-100 transition-opacity duration-300">
               <iframe 
                 src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3305.171237199313!2d-118.24101389999998!3d34.0651244!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c2c7abdfc9d751%3A0x7a51f9a1342dffea!2sBruce%20Lee%20old%20dojo!5e0!3m2!1sen!2sin!4v1778812750663!5m2!1sen!2sin" 
                 width="100%" 
                 height="250" 
                 style={{ border: 0 }} 
                 allowFullScreen 
                 loading="lazy" 
                 referrerPolicy="no-referrer-when-downgrade"
               />
             </div>
           </div>

           {/* Chinese seal / watermark */}
           <div className="absolute -bottom-8 -right-4 font-chinese text-white/[0.02] text-[150px] pointer-events-none select-none leading-none">
             武
           </div>
        </div>
      </div>
    </section>
  );
}
