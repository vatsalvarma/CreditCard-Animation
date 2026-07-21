import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import { Grid, Search } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Elements
  const phoneRef = useRef<HTMLImageElement>(null);
  const planeRef = useRef<HTMLImageElement>(null);
  const cartRef = useRef<HTMLImageElement>(null);
  const giftRef = useRef<HTMLImageElement>(null);

  const text1Ref = useRef<HTMLDivElement>(null);
  const text2Ref = useRef<HTMLDivElement>(null);

  const readerRef = useRef<HTMLImageElement>(null);
  const cardRef = useRef<HTMLImageElement>(null);
  const tickRef = useRef<HTMLDivElement>(null);
  const tickPathRef = useRef<SVGPathElement>(null);

  const formSectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    if (!containerRef.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: '+=400%',
        scrub: 1,
        pin: true,
        anticipatePin: 1,
      }
    });

    // Initial setup
    gsap.set([planeRef.current, cartRef.current, giftRef.current], { opacity: 0, scale: 0.5, y: 100 });
    gsap.set(readerRef.current, { y: '100vh', opacity: 0 });
    gsap.set(cardRef.current, { x: '100vw', y: '20vh', rotationY: -180, rotationZ: 45, opacity: 0, scale: 0.8 });
    gsap.set(tickRef.current, { scale: 0, opacity: 0, y: 20 });
    gsap.set(tickPathRef.current, { strokeDasharray: 50, strokeDashoffset: 50 });
    gsap.set(text2Ref.current, { opacity: 0, y: 50 });
    gsap.set(formSectionRef.current, { opacity: 0, x: 100 });

    // --- Phase 1: Items fly out of phone ---
    tl.to(phoneRef.current, { y: 20, duration: 1 }, 0)
      .to(planeRef.current, { opacity: 1, scale: 1, x: -180, y: -250, rotation: -15, duration: 1, ease: "back.out(1.2)" }, 0.2)
      .to(cartRef.current, { opacity: 1, scale: 1, x: -280, y: 50, rotation: -10, duration: 1, ease: "back.out(1.2)" }, 0.4)
      .to(giftRef.current, { opacity: 1, scale: 1, x: 250, y: -150, rotation: 15, duration: 1, ease: "back.out(1.2)" }, 0.6);

    // --- Phase 2: Phone disappears, Reader & Card appear ---
    tl.to([phoneRef.current, planeRef.current, cartRef.current, giftRef.current], { opacity: 0, y: '-50vh', duration: 1, stagger: 0.1 }, 2)
      .to(text1Ref.current, { opacity: 0, y: -50, duration: 1 }, 2)
      .to(text2Ref.current, { opacity: 1, y: 0, duration: 1 }, 2.5)
      .to(readerRef.current, { y: '15vh', opacity: 1, duration: 1.5, ease: "power3.out" }, 2.5)
      .to(cardRef.current, {
        x: '1vw',
        y: '8vh',
        rotationY: 0,
        rotationZ: -22,
        opacity: 1,
        scale: 1.0,
        duration: 1.5,
        ease: "power2.out"
      }, 2.5)
      .to(tickRef.current, {
        scale: 1,
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "back.out(1.7)"
      }, 3.5)
      .to(tickPathRef.current, {
        strokeDashoffset: 0,
        duration: 0.8,
        ease: "power2.out"
      }, 3.8);

    // --- Phase 3: Card moves left, Form appears on right ---
    tl.to(text2Ref.current, { opacity: 0, y: -50, duration: 1 }, 5)
      .to(readerRef.current, { opacity: 0, y: '100vh', duration: 1 }, 5)
      .to(tickRef.current, { opacity: 0, y: -20, duration: 1 }, 5)
      .to(cardRef.current, {
        x: '-25vw',
        y: '0vh',
        rotationY: -365, // Full 360-degree flip + 5-degree resting angle
        rotationZ: -2,
        scale: 1.5,
        duration: 1.8, // Slightly longer to appreciate the flip
        ease: "power3.inOut"
      }, 5)
      .to(formSectionRef.current, { opacity: 1, x: 0, duration: 1.5, ease: "power3.out" }, 5.5);

    return () => {
      lenis.destroy();
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <div className="bg-[#0f0a1c] min-h-screen text-white relative overflow-hidden font-sans selection:bg-primary/50">

      {/* Fixed UI Overlays */}
      <nav className="fixed top-0 w-full p-8 flex justify-between items-center z-50 pointer-events-none">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-primary to-secondary blur-[1px]"></div>
          <span className="font-bold text-lg leading-tight tracking-widest">ATLAS<br />BANK</span>
        </div>
        <div className="flex items-center gap-2 pointer-events-auto cursor-pointer group">
          <span className="font-semibold text-sm tracking-wider group-hover:text-primary transition-colors">MENU</span>
          <Grid size={24} className="text-white group-hover:text-primary transition-colors" />
        </div>
      </nav>

      {/* Left Sidebar Fixed */}
      <div className="fixed left-8 top-1/2 -translate-y-1/2 flex flex-col items-center gap-16 z-50 pointer-events-none opacity-50 text-[10px] tracking-[0.3em] font-bold">
        <span className="[writing-mode:vertical-rl] rotate-180">SUPPORT</span>
        <span className="[writing-mode:vertical-rl] rotate-180">OFFERS</span>
        <span className="[writing-mode:vertical-rl] rotate-180">BENEFITS</span>
        <span className="[writing-mode:vertical-rl] rotate-180">FEATURES</span>
      </div>

      {/* Right Dots Fixed */}
      <div className="fixed right-8 top-1/2 -translate-y-1/2 flex flex-col gap-4 z-50 pointer-events-none">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className={`w-1.5 h-1.5 rounded-full ${i === 2 ? 'bg-white' : 'bg-white/20'}`} />
        ))}
      </div>

      {/* Bottom Search & Learn More */}
      <div className="fixed bottom-0 w-full flex justify-between items-end p-8 z-50 pointer-events-none">
        <div className="w-16 h-16 bg-[#161226] flex items-center justify-center rounded-tr-3xl pointer-events-auto cursor-pointer hover:bg-primary/20 transition-colors">
          <Search size={20} className="text-white/70" />
        </div>
        <div className="pointer-events-auto cursor-pointer text-sm text-white/70 hover:text-white transition-colors flex items-center gap-2">
          Learn More <span>→</span>
        </div>
      </div>

      {/* Scrollable Container */}
      <div ref={containerRef} className="h-screen w-full relative flex items-center justify-center">

        {/* Live Swirling Aurora Background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 bg-[#05010f]">
          {/* Spinning Conic Gradients for Fluid Aurora Swirl */}
          <div 
            className="absolute top-1/2 left-1/2 w-[120vw] h-[120vw] -translate-x-1/2 -translate-y-1/2 opacity-80 blur-[60px] animate-spin mix-blend-screen"
            style={{ 
              background: 'conic-gradient(from 0deg at 50% 50%, transparent 0%, transparent 35%, #7c3aed 45%, transparent 50%, transparent 85%, #4c1d95 95%, transparent 100%)',
              animationDuration: '15s'
            }}
          ></div>
          <div 
            className="absolute top-1/2 left-1/2 w-[100vw] h-[100vw] -translate-x-1/2 -translate-y-1/2 opacity-60 blur-[50px] animate-spin mix-blend-screen"
            style={{
              background: 'conic-gradient(from 90deg at 50% 50%, transparent 0%, transparent 20%, #5b21b6 30%, transparent 40%, transparent 70%, #6d28d9 80%, transparent 90%)',
              animationDuration: '20s',
              animationDirection: 'reverse'
            }}
          ></div>
        </div>

        {/* Noise Texture */}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-30 mix-blend-overlay pointer-events-none z-0"></div>

        {/* --- SCENE ELEMENTS --- */}

        <div className="relative w-full max-w-5xl h-full flex items-center justify-center">

          {/* Phase 1 Elements */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
            <img ref={phoneRef} src={`${import.meta.env.BASE_URL}images/phone.png`} alt="Phone" className="w-[300px] object-contain drop-shadow-2xl mix-blend-lighten" />

            <img ref={planeRef} src={`${import.meta.env.BASE_URL}images/plane.png`} alt="Plane" className="absolute w-[250px] object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)] mix-blend-lighten" />
            <img ref={cartRef} src={`${import.meta.env.BASE_URL}images/shopping_cart.png`} alt="Cart" className="absolute w-[200px] object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)] mix-blend-lighten" />
            <img ref={giftRef} src={`${import.meta.env.BASE_URL}images/gift_box.png`} alt="Gift" className="absolute w-[180px] object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)] mix-blend-lighten" />
          </div>

          <div ref={text1Ref} className="absolute bottom-16 text-center w-full z-20 px-4">
            <h1 className="text-3xl md:text-4xl font-light tracking-wide mb-3">SPEND &, EARN MORE <span className="font-semibold">WITH VASAVI</span></h1>
            <p className="text-white/50 text-xs md:text-sm max-w-md mx-auto">AtlasCard awaits you for every spend with our bank and credit card partners.</p>
          </div>

          {/* Phase 2 Elements */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-30">
            <img ref={readerRef} src={`${import.meta.env.BASE_URL}images/card_reader.png`} alt="Card Reader" className="absolute w-[350px] object-contain drop-shadow-[0_30px_60px_rgba(0,0,0,0.8)]" />
            <img ref={cardRef} src={`${import.meta.env.BASE_URL}images/credit_card.png`} alt="Credit Card" className="absolute w-[350px] object-contain drop-shadow-[0_30px_60px_rgba(0,0,0,0.8)]" />
            
            {/* Success Tick */}
            <div className="absolute -translate-y-[210px] flex items-center justify-center">
              <div ref={tickRef} className="relative flex items-center justify-center w-24 h-24">
                {/* Outer animated spinning dashed ring */}
                <svg className="absolute inset-0 w-full h-full animate-[spin_5s_linear_infinite] opacity-50" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="48" fill="none" stroke="#D4AF37" strokeWidth="2" strokeDasharray="10 15" strokeLinecap="round" />
                </svg>

                {/* Inner glassmorphism circle */}
                <div className="absolute inset-2 bg-purple-900/60 backdrop-blur-xl rounded-full border border-[#D4AF37]/50 shadow-[0_0_40px_rgba(212,175,55,0.6)] flex items-center justify-center">
                  <svg className="w-10 h-10 drop-shadow-[0_0_15px_rgba(212,175,55,1)]" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <path ref={tickPathRef} d="M20 6L9 17l-5-5" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          <div ref={text2Ref} className="absolute bottom-16 text-center w-full z-20 px-4">
            <h1 className="text-3xl md:text-4xl font-light tracking-wide mb-3">NO TOUCH. NO CONTACT. <span className="font-semibold">NO WORRIES.</span></h1>
            <p className="text-white/50 text-xs md:text-sm max-w-md mx-auto">AtlasCard allows you to make quick, secure payments without touching the screen.</p>
          </div>

          {/* Phase 3 Elements (Form) */}
          <div ref={formSectionRef} className="absolute right-[10%] w-[400px] z-40 bg-[#120d24]/80 backdrop-blur-xl p-10 rounded-3xl border border-white/5 shadow-2xl">
            <h2 className="text-3xl font-light mb-8">Let's get started.</h2>
            <form className="flex flex-col gap-6" onSubmit={(e) => e.preventDefault()}>
              <div className="relative group">
                <input type="text" id="idNumber" className="w-full bg-transparent border-b border-white/20 pb-2 text-white outline-none focus:border-primary transition-colors peer" required />
                <label htmlFor="idNumber" className="absolute left-0 top-0 text-white/50 text-sm peer-focus:-translate-y-5 peer-focus:text-xs peer-focus:text-primary transition-all peer-valid:-translate-y-5 peer-valid:text-xs">ID Number</label>
              </div>
              <div className="relative group mt-4">
                <input type="text" id="phone" className="w-full bg-transparent border-b border-white/20 pb-2 text-white outline-none focus:border-primary transition-colors peer" required />
                <label htmlFor="phone" className="absolute left-0 top-0 text-white/50 text-sm peer-focus:-translate-y-5 peer-focus:text-xs peer-focus:text-primary transition-all peer-valid:-translate-y-5 peer-valid:text-xs">Phone Number</label>
              </div>

              <label className="flex items-start gap-3 mt-4 cursor-pointer group">
                <div className="relative w-5 h-5 rounded border border-white/30 group-hover:border-primary transition-colors flex-shrink-0 mt-0.5 flex items-center justify-center">
                  <input type="checkbox" className="opacity-0 absolute inset-0 cursor-pointer peer" />
                  <div className="w-3 h-3 bg-primary rounded-sm opacity-0 peer-checked:opacity-100 transition-opacity"></div>
                </div>
                <span className="text-xs text-white/50 leading-relaxed">I consent to process of the data I shared during my application for the purposes stated in Terms of Use.</span>
              </label>

              <button className="mt-8 w-full py-4 rounded-lg bg-gradient-to-r from-[#4b277b] to-[#b83ec4] hover:opacity-90 transition-opacity text-white font-medium shadow-[0_0_20px_rgba(184,62,196,0.3)]">
                Apply Now
              </button>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
}
