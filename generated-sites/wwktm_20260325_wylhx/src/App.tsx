import React, { useEffect, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Compass, Cpu, Users, Globe, ChevronRight, Menu, X, ArrowUpRight } from 'lucide-react';
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
    { name: 'Manifesto', href: '#manifesto' },
    { name: 'Hikes', href: '#hikes' },
    { name: 'Community', href: '#community' },
  ];

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 py-4 md:px-12',
        isScrolled ? 'bg-white/90 backdrop-blur-md border-b border-slate-200' : 'bg-transparent'
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-accent rounded-sm flex items-center justify-center">
            <span className="text-white font-bold text-lg">W</span>
          </div>
          <span className={cn(
            'text-xl font-bold tracking-tight',
            isScrolled ? 'text-slate-900' : 'text-white'
          )}>
            WWKTM
          </span>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className={cn(
                'text-sm font-medium transition-colors hover:text-accent',
                isScrolled ? 'text-slate-600' : 'text-white/80'
              )}
            >
              {link.name}
            </a>
          ))}
          <button className={cn(
            'px-5 py-2 rounded-full text-sm font-bold transition-all',
            isScrolled 
              ? 'bg-slate-900 text-white hover:bg-slate-800' 
              : 'bg-white text-slate-900 hover:bg-slate-100'
          )}>
            Join Now
          </button>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? (
            <X className={isScrolled ? 'text-slate-900' : 'text-white'} />
          ) : (
            <Menu className={isScrolled ? 'text-slate-900' : 'text-white'} />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 bg-white border-b border-slate-200 p-6 md:hidden flex flex-col gap-4 shadow-xl"
          >
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-lg font-medium text-slate-900 py-2 border-b border-slate-100"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </a>
            ))}
            <button className="w-full bg-slate-900 text-white py-4 rounded-xl font-bold mt-2">
              Join Now
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <section className="relative h-screen min-h-[700px] w-full flex items-center justify-center overflow-hidden bg-slate-950">
      <motion.div 
        style={{ y: y1 }}
        className="absolute inset-0 z-0"
      >
        <img
          src="https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=2071&auto=format&fit=crop"
          alt="Kathmandu Himalayas"
          className="w-full h-full object-cover opacity-60 scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/40 via-transparent to-slate-950/80" />
      </motion.div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          style={{ opacity }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white/90 text-xs font-bold tracking-widest uppercase mb-8">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            Kathmandu, Nepal
          </div>
          <h1 className="text-5xl md:text-8xl font-black text-white mb-6 tracking-tighter leading-[0.9]">
            WEB <br /> WEEKEND <br /> <span className="text-accent">KATHMANDU</span>
          </h1>
          <p className="text-xl md:text-2xl text-white/80 max-w-2xl mx-auto mb-10 font-medium leading-relaxed">
            Connecting Nepal's builders, designers, and AI practitioners with the global tech scene.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button className="group px-8 py-4 bg-white text-slate-950 rounded-full font-bold text-lg hover:bg-accent hover:text-white transition-all flex items-center gap-2">
              Join the Un-conference
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white border border-white/20 rounded-full font-bold text-lg hover:bg-white/20 transition-all">
              Our Manifesto
            </button>
          </div>
        </motion.div>
      </div>

      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10"
      >
        <div className="w-6 h-10 rounded-full border-2 border-white/30 flex justify-center p-1">
          <div className="w-1 h-2 bg-white rounded-full" />
        </div>
      </motion.div>
    </section>
  );
};

const SectionHeading = ({ children, subtitle, light = false }: { children: React.ReactNode, subtitle?: string, light?: boolean }) => (
  <div className="mb-16">
    <motion.h2
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={cn(
        "text-4xl md:text-6xl font-black tracking-tighter mb-4",
        light ? "text-white" : "text-slate-900"
      )}
    >
      {children}
    </motion.h2>
    {subtitle && (
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className={cn(
          "text-xl max-w-2xl leading-relaxed",
          light ? "text-white/70" : "text-slate-600"
        )}
      >
        {subtitle}
      </motion.p>
    )}
  </div>
);

const AppliedKnowledge = () => {
  return (
    <section id="manifesto" className="py-24 md:py-32 bg-white px-6">
      <div className="max-w-7xl mx-auto">
        <SectionHeading subtitle="We believe in the power of building. WWKTM is a community-run tech un-conference movement focused on applied knowledge and craft.">
          FOR THE <br /> BUILDERS
        </SectionHeading>

        <div className="grid md:grid-cols-3 gap-12">
          {[
            {
              icon: <Cpu className="w-8 h-8 text-accent" />,
              title: "Applied AI",
              desc: "Moving beyond theory to implement AI systems that solve real local and global problems."
            },
            {
              icon: <Globe className="w-8 h-8 text-accent" />,
              title: "Global-Local Bridge",
              desc: "Connecting Kathmandu's brightest minds with the international engineering community."
            },
            {
              icon: <Compass className="w-8 h-8 text-accent" />,
              title: "Radical Inclusivity",
              desc: "A bilingual space (Nepali & English) welcoming all who craft, from juniors to veterans."
            }
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group"
            >
              <div className="mb-6 p-4 rounded-2xl bg-surface group-hover:bg-accent/5 transition-colors inline-block">
                {item.icon}
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-3 tracking-tight">{item.title}</h3>
              <p className="text-slate-600 leading-relaxed font-medium">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const RadicalNetworking = () => {
  return (
    <section id="hikes" className="relative py-24 md:py-32 overflow-hidden bg-slate-900">
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <img 
          src="https://images.unsplash.com/photo-1551632432-c735e8299298?q=80&w=2070&auto=format&fit=crop" 
          alt="Hiking" 
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <SectionHeading light subtitle="We break the walls of traditional networking. Our community hikes are where the real conversations happen, amidst the hills of the Kathmandu Valley.">
            RADICAL <br /> NETWORKING
          </SectionHeading>
          
          <div className="space-y-8">
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="p-8 rounded-3xl bg-white/5 backdrop-blur-sm border border-white/10"
            >
              <h4 className="text-xl font-bold text-white mb-2">Un-structured Conversations</h4>
              <p className="text-white/60">No stages, no forced agendas. Just engineers and designers talking craft while walking trails.</p>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="p-8 rounded-3xl bg-white/5 backdrop-blur-sm border border-white/10"
            >
              <h4 className="text-xl font-bold text-white mb-2">Builder-to-Builder</h4>
              <p className="text-white/60">Peer-level mentorship and networking that lasts far beyond the weekend.</p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Community = () => {
  return (
    <section id="community" className="py-24 md:py-32 bg-surface px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <SectionHeading subtitle="WWKTM is not just an event; it's a movement owned and run by the community.">
            NEPAL'S <br /> TECH SCENE
          </SectionHeading>
          <div className="flex gap-4 mb-4">
            <div className="text-right">
              <div className="text-3xl font-black text-slate-900">500+</div>
              <div className="text-slate-500 font-bold text-sm uppercase tracking-wider">Builders</div>
            </div>
            <div className="w-px h-12 bg-slate-300" />
            <div className="text-right">
              <div className="text-3xl font-black text-slate-900">12+</div>
              <div className="text-slate-500 font-bold text-sm uppercase tracking-wider">Hikes</div>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="group relative aspect-video overflow-hidden rounded-3xl bg-slate-200"
          >
            <img 
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop" 
              alt="Community" 
              className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 to-transparent flex flex-col justify-end p-8">
              <h4 className="text-2xl font-bold text-white mb-2 underline decoration-accent decoration-4 underline-offset-4">Community Led</h4>
              <p className="text-white/70 max-w-md">Driven by volunteers and local practitioners who care about the future of tech in Nepal.</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="bg-accent rounded-3xl p-12 flex flex-col justify-between text-white"
          >
            <div>
              <Users className="w-12 h-12 mb-8" />
              <h4 className="text-4xl font-black tracking-tight mb-4">Bilingual & Inclusive</h4>
              <p className="text-xl font-medium text-white/90 leading-relaxed">
                Whether you prefer Nepali or English, WWKTM is your home. We bridge the language gap to ensure knowledge flows freely.
              </p>
            </div>
            <a href="#" className="flex items-center gap-2 font-bold text-lg mt-8 group">
              Learn more about our inclusivity
              <ArrowUpRight className="group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform" />
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const CTA = () => {
  return (
    <section className="py-24 md:py-32 px-6">
      <div className="max-w-7xl mx-auto rounded-[3rem] bg-slate-950 p-12 md:p-24 relative overflow-hidden text-center">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-accent/40 via-transparent to-transparent" />
        </div>
        
        <div className="relative z-10 max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-7xl font-black text-white tracking-tighter mb-8">
            READY TO JOIN THE <span className="text-accent">MOVEMENT?</span>
          </h2>
          <p className="text-xl text-white/60 mb-12 font-medium">
            Be part of the next un-conference. Connect with the best builders in Kathmandu and beyond.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <button className="w-full sm:w-auto px-10 py-5 bg-white text-slate-950 rounded-full font-bold text-xl hover:bg-accent hover:text-white transition-all shadow-2xl shadow-white/5">
              Secure Your Spot
            </button>
            <button className="w-full sm:w-auto px-10 py-5 bg-white/5 text-white border border-white/10 rounded-full font-bold text-xl hover:bg-white/10 transition-all">
              Become a Sponsor
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="py-12 px-6 border-t border-slate-100">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-accent rounded-sm flex items-center justify-center">
            <span className="text-white font-bold text-xs">W</span>
          </div>
          <span className="text-lg font-bold tracking-tight text-slate-900 uppercase">
            WWKTM
          </span>
        </div>
        
        <p className="text-slate-500 text-sm font-medium">
          © {new Date().getFullYear()} Web Weekend Kathmandu. Community-run tech movement.
        </p>
        
        <div className="flex gap-8 text-sm font-bold text-slate-900">
          <a href="#" className="hover:text-accent transition-colors">Twitter</a>
          <a href="#" className="hover:text-accent transition-colors">GitHub</a>
          <a href="#" className="hover:text-accent transition-colors">Instagram</a>
        </div>
      </div>
    </footer>
  );
};

const App = () => {
  return (
    <div className="bg-white font-sans selection:bg-accent selection:text-white">
      <Navbar />
      <Hero />
      <AppliedKnowledge />
      <RadicalNetworking />
      <Community />
      <CTA />
      <Footer />
    </div>
  );
};

export default App;
