import { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Users, Menu, X, ArrowUpRight, Zap, Radio, Activity, Terminal } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: '// Manifesto', href: '#manifesto' },
    { name: '// Events', href: '#events' },
    { name: '// Hikes', href: '#hikes' },
    { name: '// Community', href: '#community' },
  ];

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-[60] transition-all duration-500 px-6 py-4 md:px-12',
        isScrolled ? 'bg-pitch/80 backdrop-blur-xl border-b-2 border-accent' : 'bg-transparent'
      )}
    >
      <div className="max-w-[1400px] mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3">
          <motion.div 
            whileHover={{ scale: 1.1, rotate: 90 }}
            className="w-10 h-10 bg-accent flex items-center justify-center brutalist-border box-glow-pink"
          >
            <span className="text-white font-black text-xl">W</span>
          </motion.div>
          <div className="flex flex-col">
            <span className="text-2xl font-black tracking-tighter text-white leading-none">
              WWKTM
            </span>
            <span className="text-[10px] font-mono text-accent uppercase tracking-widest leading-none mt-1">
              [ AI_ENABLED_CRAFT ]
            </span>
          </div>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-sm font-mono font-bold text-white/70 hover:text-accent transition-colors relative group"
            >
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent transition-all group-hover:w-full" />
            </a>
          ))}
          <button className="px-6 py-2 bg-accent text-white font-black uppercase text-sm brutalist-border hover:translate-x-1 hover:-translate-y-1 transition-transform">
            JOIN_SYSTEM
          </button>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden p-2 bg-accent brutalist-border"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X className="text-white" /> : <Menu className="text-white" />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 bg-pitch z-[70] flex flex-col p-8 md:hidden"
          >
            <div className="flex justify-between items-center mb-12">
              <span className="text-2xl font-black text-white">MENU</span>
              <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 bg-accent brutalist-border">
                <X className="text-white" />
              </button>
            </div>
            <div className="flex flex-col gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-4xl font-black text-white hover:text-accent transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </a>
              ))}
            </div>
            <button className="mt-auto w-full py-6 bg-accent text-white font-black text-2xl brutalist-border">
              JOIN_SYSTEM
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const GlitchText = ({ text, className }: { text: string, className?: string }) => {
  return (
    <div className={cn("relative inline-block group", className)}>
      <span className="relative z-10">{text}</span>
      <span className="absolute top-0 left-0 -z-10 text-accent-blue translate-x-1 translate-y-1 opacity-0 group-hover:opacity-70 group-hover:animate-glitch select-none">
        {text}
      </span>
      <span className="absolute top-0 left-0 -z-10 text-accent translate-x-[-1px] translate-y-[-1px] opacity-0 group-hover:opacity-70 group-hover:animate-glitch select-none" style={{ animationDelay: '0.1s' }}>
        {text}
      </span>
    </div>
  );
};

const Hero = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 400]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, -10]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.8]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section ref={containerRef} className="relative h-[120vh] w-full flex items-center justify-center overflow-hidden bg-pitch">
      <div className="scanline" />
      
      {/* Background AI Grid/Mesh */}
      <div className="absolute inset-0 z-0 opacity-20">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,0,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,0,255,0.05)_1px,transparent_1px)] bg-[size:40px_40px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,255,255,0.1)_0%,transparent_70%)]" />
      </div>

      <motion.div 
        style={{ y, rotate, scale, opacity }}
        className="relative z-10 w-full max-w-[1600px] px-6"
      >
        <div className="flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mb-6 font-mono text-accent-green font-bold tracking-[0.5em] uppercase text-sm flex items-center gap-2"
          >
            <Activity className="w-4 h-4 animate-pulse" />
            [ PROTOCOL_V3.0_ONLINE ]
          </motion.div>

          <h1 className="text-[12vw] md:text-[10vw] font-black leading-[0.8] tracking-tighter text-white mb-8">
            <span className="block cursor-default">
              <GlitchText text="WEB" />
            </span>
            <span className="block text-accent glow-pink">
               <GlitchText text="WEEKEND" />
            </span>
            <span className="block hover:skew-x-12 transition-transform duration-300">
               <GlitchText text="KATHMANDU" />
            </span>
          </h1>

          <div className="relative w-full max-w-4xl">
            <p className="text-xl md:text-3xl text-white/60 font-medium leading-tight max-w-3xl mx-auto mb-12">
              The <span className="text-white italic">Un-conference</span> for those who craft with code, design with intent, and build with <span className="text-accent-blue font-mono font-bold">Generative Intelligence.</span>
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6">
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-10 py-5 bg-accent text-white font-black text-xl brutalist-border flex items-center gap-3 box-glow-pink"
            >
              INITIALIZE_JOIN
              <Zap className="w-6 h-6 fill-white" />
            </motion.button>
            <motion.button 
              whileHover={{ x: 10 }}
              className="px-10 py-5 border-4 border-white text-white font-black text-xl hover:bg-white hover:text-pitch transition-colors flex items-center gap-3"
            >
              READ_MANIFESTO
              <Terminal className="w-6 h-6" />
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* Background Image - Distorted */}
      <motion.div 
        style={{ opacity: useTransform(scrollYProgress, [0, 0.4], [0.3, 0]) }}
        className="absolute bottom-0 right-0 w-1/2 h-full z-0 pointer-events-none"
      >
        <img
          src="https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=2071&auto=format&fit=crop"
          alt="Kathmandu Himalayas"
          className="w-full h-full object-cover grayscale mix-blend-overlay opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-l from-pitch via-pitch/50 to-transparent" />
      </motion.div>
    </section>
  );
};

const Manifesto = () => {
  const scrollRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: scrollRef,
    offset: ["start end", "end start"]
  });

  const x1 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const x2 = useTransform(scrollYProgress, [0, 1], [0, 200]);

  return (
    <section id="manifesto" ref={scrollRef} className="py-32 bg-pitch overflow-hidden">
      <motion.div style={{ x: x1 }} className="whitespace-nowrap flex gap-8 mb-12">
        {[...Array(5)].map((_, i) => (
          <span key={i} className="text-[10vw] font-black text-white/5 uppercase leading-none">
            Applied Knowledge Craft Applied Knowledge Craft
          </span>
        ))}
      </motion.div>

      <div className="max-w-[1400px] mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
        <div className="relative">
          <div className="absolute -left-8 top-0 w-2 h-full bg-accent" />
          <h2 className="text-6xl md:text-8xl font-black text-white leading-none tracking-tighter mb-12">
            THE <br /> <span className="text-accent-blue">BUILDER'S</span> <br /> CODE
          </h2>
          <div className="font-mono text-accent-green mb-8 flex items-center gap-2">
            <Radio className="w-5 h-5" />
            STRENGTHENING_THE_LOCAL_ECOSYSTEM
          </div>
        </div>

        <div className="grid gap-6">
          {[
            { 
              title: "HYPER-APPLIED AI", 
              desc: "We don't talk about GPT-5. We build systems that solve the chaotic, beautiful problems of Kathmandu and beyond.",
              color: "accent"
            },
            { 
              title: "RADICAL OPENNESS", 
              desc: "Knowledge is a fluid. We bridge the gap between global standards and local ingenuity in Nepali and English.",
              color: "accent-blue"
            },
            { 
              title: "CRAFT OVER CLOUT", 
              desc: "No corporate fluff. No polished pitches. Just raw code, deep design, and the smell of fresh mountain air.",
              color: "accent-green"
            }
          ].map((item, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={cn(
                "p-8 brutalist-border",
                item.color === 'accent' ? 'brutalist-border' : 
                item.color === 'accent-blue' ? 'brutalist-border-blue' : 'brutalist-border-green'
              )}
            >
              <h3 className="text-2xl font-black text-white mb-4">{item.title}</h3>
              <p className="text-white/60 font-medium leading-relaxed">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      <motion.div style={{ x: x2 }} className="whitespace-nowrap flex gap-8 mt-24">
        {[...Array(5)].map((_, i) => (
          <span key={i} className="text-[10vw] font-black text-white/5 uppercase leading-none">
            Radical Inclusivity Global Radical Inclusivity Global
          </span>
        ))}
      </motion.div>
    </section>
  );
};

const Events = () => {
  const events = [
    {
      name: "Web Weekend Kathmandu",
      shortName: "WWKTM",
      description: "A biennial conference on web tech and UI/UX. It brings together local and international builders to share knowledge and craft.",
      link: "https://wwktm.com/",
      logo: "https://raw.githubusercontent.com/wwktm/brand-assets/master/logo/logo.png",
      color: "accent"
    },
    {
      name: "AI Conf (AI in Action)",
      shortName: "AI_CONF",
      description: "Focusing on practical AI deployment and governance. Exploring how generative intelligence is reshaping our workflows.",
      link: "https://ai.wwktm.com/",
      logo: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=2070&auto=format&fit=crop",
      color: "accent-blue"
    },
    {
      name: "BarCamp Kathmandu",
      shortName: "BARCAMP",
      description: "An attendee-led unconference where everyone is a speaker. Radical openness and spontaneous knowledge sharing.",
      link: "https://barcamp.wwktm.com/",
      logo: "https://images.unsplash.com/photo-1540575861501-7cf05a4b125a?q=80&w=2070&auto=format&fit=crop",
      color: "accent-green"
    },
    {
      name: "Tech Kura Kani",
      shortName: "TKK",
      description: "A monthly tech meetup series for casual conversations and networking within the local ecosystem.",
      link: "https://lu.ma/wwktm",
      logo: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=2070&auto=format&fit=crop",
      color: "white"
    }
  ];

  return (
    <section id="events" className="py-32 bg-pitch relative overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6">
        <h2 className="text-6xl md:text-9xl font-black text-white leading-[0.8] tracking-tighter uppercase mb-24">
          THINGS <br /> WE <br /> <span className="text-accent-blue">DO</span>
        </h2>
        
        <div className="grid md:grid-cols-2 gap-12">
          {events.map((event, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={cn(
                "group p-8 brutalist-border relative overflow-hidden flex flex-col justify-between min-h-[400px]",
                event.color === 'accent' ? 'brutalist-border' : 
                event.color === 'accent-blue' ? 'brutalist-border-blue' : 
                event.color === 'accent-green' ? 'brutalist-border-green' : 'border-white'
              )}
            >
              <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                 <span className="text-8xl font-black text-white">{event.shortName}</span>
              </div>

              <div className="relative z-10">
                <div className="w-20 h-20 mb-8 bg-white p-2 brutalist-border overflow-hidden">
                  <img src={event.logo} alt={event.name} className="w-full h-full object-contain grayscale group-hover:grayscale-0 transition-all" />
                </div>
                <h3 className="text-4xl font-black text-white mb-4 uppercase leading-none">{event.name}</h3>
                <p className="text-white/60 text-lg mb-8 max-w-md leading-relaxed">
                  {event.description}
                </p>
              </div>

              <a 
                href={event.link} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-white font-mono font-bold hover:text-accent transition-colors mt-auto"
              >
                {`>> VIEW_SITE`} <ArrowUpRight className="w-5 h-5" />
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Hikes = () => {
  return (
    <section id="hikes" className="py-32 bg-pitch relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/3 h-full pointer-events-none opacity-20">
        <svg viewBox="0 0 100 100" className="w-full h-full stroke-accent-blue fill-none stroke-[0.5]">
          <path d="M0,50 Q25,25 50,50 T100,50 M0,60 Q25,35 50,60 T100,60 M0,40 Q25,15 50,40 T100,40" />
          <path d="M10,0 Q35,25 10,50 T10,100 M20,0 Q45,25 20,50 T20,100" />
        </svg>
      </div>

      <div className="max-w-[1400px] mx-auto px-6">
        <div className="flex flex-col md:flex-row gap-12 mb-24">
          <div className="flex-1">
            <h2 className="text-6xl md:text-[10rem] font-black text-white leading-[0.8] tracking-tighter uppercase mb-12">
              BEYOND <br /> THE <br /> <span className="text-accent glow-pink">SCREEN</span>
            </h2>
          </div>
          <div className="flex-1 flex flex-col justify-end">
            <p className="text-2xl md:text-4xl text-white/80 font-bold leading-tight mb-8">
              We break the walls of traditional networking. Our hikes are where the <span className="text-accent-blue">real algorithms</span> are written—on the trails of Kathmandu Valley.
            </p>
            <div className="flex gap-4">
              <div className="px-6 py-3 bg-white text-pitch font-black uppercase text-sm brutalist-border">
                12+ SUMMITS
              </div>
              <div className="px-6 py-3 border-2 border-white text-white font-black uppercase text-sm">
                500+ TRAIL HOURS
              </div>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            { img: "https://images.unsplash.com/photo-1551632432-c735e8299298?q=80&w=2070&auto=format&fit=crop", title: "Shivapuri Peak", tag: "HARD_CORE" },
            { img: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=2070&auto=format&fit=crop", title: "Champadevi", tag: "FLOW_STATE" },
            { img: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=2071&auto=format&fit=crop", title: "Nagarkot Rim", tag: "SYSTEM_SCAN" }
          ].map((item, i) => (
            <motion.div 
              key={i}
              whileHover={{ y: -20 }}
              className="relative aspect-[3/4] overflow-hidden group brutalist-border"
            >
              <img src={item.img} className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700" alt={item.title} />
              <div className="absolute inset-0 bg-gradient-to-t from-pitch via-transparent to-transparent opacity-80" />
              <div className="absolute bottom-6 left-6 right-6">
                <span className="inline-block px-3 py-1 bg-accent-green text-pitch font-mono font-bold text-xs mb-2">
                  {item.tag}
                </span>
                <h4 className="text-3xl font-black text-white uppercase">{item.title}</h4>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Community = () => {
  return (
    <section id="community" className="py-32 bg-white px-6 overflow-hidden">
      <div className="max-w-[1400px] mx-auto">
        <div className="grid md:grid-cols-2 gap-24 items-center">
          <div>
            <h2 className="text-7xl md:text-9xl font-black text-pitch leading-[0.8] tracking-tighter uppercase mb-12">
              SYSTEM <br /> <span className="text-accent underline decoration-[20px] decoration-accent/30 underline-offset-[-10px]">OWNERS</span>
            </h2>
            <p className="text-2xl text-pitch/60 font-bold mb-12">
              WWKTM is not a corporate event. It is a self-evolving community node powered by volunteers and local builders.
            </p>
            
            <div className="grid grid-cols-2 gap-8 mb-12">
              <div>
                <div className="text-6xl font-black text-pitch">500+</div>
                <div className="font-mono text-accent font-bold uppercase tracking-widest text-sm">Active_Builders</div>
              </div>
              <div>
                <div className="text-6xl font-black text-pitch">100%</div>
                <div className="font-mono text-accent-blue font-bold uppercase tracking-widest text-sm">Community_Run</div>
              </div>
            </div>

            <motion.button 
              whileHover={{ scale: 1.05 }}
              className="px-8 py-4 bg-pitch text-white font-black text-xl brutalist-border-blue flex items-center gap-3"
            >
              JOIN_THE_MOVEMENT
              <ArrowUpRight className="w-6 h-6" />
            </motion.button>
          </div>

          <div className="relative">
            <motion.div 
              animate={{ rotate: [0, 5, 0] }}
              transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
              className="absolute -top-12 -left-12 w-64 h-64 bg-accent-green rounded-full blur-[100px] opacity-20 pointer-events-none" 
            />
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="aspect-square bg-pitch brutalist-border overflow-hidden">
                  <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop" className="w-full h-full object-cover grayscale opacity-80" alt="community" />
                </div>
                <div className="aspect-[3/4] bg-accent brutalist-border-blue flex items-center justify-center p-8">
                  <Users className="w-20 h-20 text-white" />
                </div>
              </div>
              <div className="space-y-4 pt-12">
                <div className="aspect-[3/4] bg-accent-blue brutalist-border overflow-hidden">
                   <div className="p-6 font-mono text-white text-xs">
                    {`>> LOADING_COMMUNITY_DATA...`}
                    <br />{`>> SUCCESS.`}
                    <br /><br />{`LOCATION: KATHMANDU`}
                    <br />{`STATUS: EVOLVING`}
                    <br />{`DIVERSITY: 100%`}
                    <br />{`VIBE: VIBRANT`}
                   </div>
                </div>
                <div className="aspect-square bg-pitch brutalist-border-green overflow-hidden">
                  <img src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=2070&auto=format&fit=crop" className="w-full h-full object-cover grayscale opacity-80" alt="community" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const CTA = () => {
  return (
    <section className="py-32 px-6 bg-pitch overflow-hidden relative">
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent rounded-full blur-[150px] opacity-10 animate-pulse" />
      </div>

      <div className="max-w-[1200px] mx-auto relative z-10">
        <div className="bg-pitch brutalist-border p-12 md:p-24 text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-accent to-transparent" />
          <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-accent-blue to-transparent" />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="mb-8"
          >
            <h2 className="text-5xl md:text-9xl font-black text-white leading-none tracking-tighter mb-8 uppercase italic">
              ARE YOU <br /> <span className="text-accent glow-pink">CONNECTED?</span>
            </h2>
            <p className="text-xl md:text-3xl text-white/50 font-mono mb-12 uppercase tracking-widest">
              [ WAITING_FOR_U_TO_JOIN_THE_ARRAY ]
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <motion.button 
                whileHover={{ scale: 1.1, rotate: -2 }}
                className="w-full sm:w-auto px-12 py-6 bg-accent text-white font-black text-2xl brutalist-border box-glow-pink uppercase"
              >
                STAKE_YOUR_CLAIM
              </motion.button>
              <motion.button 
                whileHover={{ scale: 1.1, rotate: 2 }}
                className="w-full sm:w-auto px-12 py-6 bg-accent-blue text-white font-black text-2xl brutalist-border-blue uppercase"
              >
                SPONSOR_NODE
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="py-24 px-6 bg-pitch border-t-4 border-white overflow-hidden">
      <div className="max-w-[1400px] mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start gap-12 mb-24">
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-accent flex items-center justify-center brutalist-border">
                <span className="text-white font-black text-2xl">W</span>
              </div>
              <span className="text-4xl font-black tracking-tighter text-white uppercase italic">
                WWKTM
              </span>
            </div>
            <p className="text-white/40 font-mono text-sm max-w-sm leading-relaxed">
              KATHMANDU VALLEY / NEPAL / EARTH / SECTOR-ZZ9-PLURAL-Z-ALPHA / BUILT BY THE COMMUNITY FOR THE COMMUNITY.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-12">
            <div>
              <h5 className="font-mono text-accent-green font-bold text-xs mb-6 uppercase tracking-widest">{`// NAVIGATION`}</h5>
              <div className="flex flex-col gap-4 font-black uppercase text-xl">
                <a href="#manifesto" className="hover:text-accent transition-colors">MANIFESTO</a>
                <a href="#events" className="hover:text-accent transition-colors">EVENTS</a>
                <a href="#hikes" className="hover:text-accent transition-colors">HIKES</a>
                <a href="#community" className="hover:text-accent transition-colors">COMMUNITY</a>
              </div>
            </div>
            <div>
              <h5 className="font-mono text-accent-blue font-bold text-xs mb-6 uppercase tracking-widest">{`// CONNECT`}</h5>
              <div className="flex flex-col gap-4 font-black uppercase text-xl">
                <a href="#" className="hover:text-accent transition-colors">TWITTER</a>
                <a href="#" className="hover:text-accent transition-colors">GITHUB</a>
                <a href="#" className="hover:text-accent transition-colors">INSTAGRAM</a>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row justify-between items-center pt-12 border-t border-white/10 gap-6">
          <div className="font-mono text-[10px] text-white/30 uppercase tracking-[0.3em]">
            © {new Date().getFullYear()} WEB WEEKEND KATHMANDU / ALL_RIGHTS_RESERVED
          </div>
          <div className="flex items-center gap-4">
             <div className="h-px w-24 bg-white/20" />
             <div className="font-mono text-[10px] text-accent font-bold">SYSTEM_STABLE_100%</div>
          </div>
        </div>
      </div>
    </footer>
  );
};

const App = () => {
  return (
    <div className="bg-pitch font-display selection:bg-accent selection:text-white">
      <div className="noise-overlay" />
      <Navbar />
      <Hero />
      <Manifesto />
      <Events />
      <Hikes />
      <Community />
      <CTA />
      <Footer />
    </div>
  );
};

export default App;
