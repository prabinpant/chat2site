import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Menu as MenuIcon, 
  X, 
  Instagram, 
  Facebook, 
  Twitter,
  MapPin,
  Clock
} from 'lucide-react';

// --- Data ---

const menuItems = [
  {
    category: "Signature Breads",
    items: [
      { name: "Artisan Sourdough", price: "$8", description: "Naturally leavened, 48-hour fermentation with a crisp, dark crust." },
      { name: "Hokkaido Milk Bread", price: "$10", description: "Soft, pillowy, and slightly sweet Japanese-style loaf." },
      { name: "Rustic Baguette", price: "$5", description: "Traditional French baguette with a light, airy crumb." }
    ]
  },
  {
    category: "Pâtisserie",
    items: [
      { name: "Classic Croissant", price: "$4.50", description: "Buttery, flaky layers of pure French butter." },
      { name: "Pain au Chocolat", price: "$5", description: "Two bars of dark Valrhona chocolate in a buttery pastry." },
      { name: "Pistachio Éclair", price: "$7", description: "Filled with house-made pistachio praliné and topped with white chocolate." }
    ]
  }
];

// --- Components ---

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed w-full z-50 bg-pakery-bg/70 backdrop-blur-lg">
      <div className="max-w-screen-2xl mx-auto px-6 lg:px-12">
        <div className="flex justify-between items-center h-24">
          <div className="flex items-center gap-3">
            <span className="text-3xl font-serif font-black text-pakery-text tracking-tight lowercase">pakery.</span>
          </div>
          
          <div className="hidden md:flex items-center gap-12">
            <a href="#about" className="text-sm font-semibold text-pakery-text/70 hover:text-pakery-accent transition-all uppercase tracking-widest">The Story</a>
            <a href="#menu" className="text-sm font-semibold text-pakery-text/70 hover:text-pakery-accent transition-all uppercase tracking-widest">Our Bakes</a>
            <a href="#contact" className="text-sm font-semibold text-pakery-text/70 hover:text-pakery-accent transition-all uppercase tracking-widest">Visit Us</a>
            <button className="bg-pakery-accent text-white px-8 py-3 rounded-full text-sm font-bold hover:bg-pakery-text transition-all shadow-lg shadow-pakery-accent/10">
              Order Online
            </button>
          </div>

          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-pakery-text">
              {isOpen ? <X size={28} /> : <MenuIcon size={28} />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden bg-pakery-bg border-t border-pakery-text/5 overflow-hidden shadow-2xl"
          >
            <div className="px-6 py-8 space-y-6">
              <a href="#about" onClick={() => setIsOpen(false)} className="block text-2xl font-serif font-bold text-pakery-text">The Story</a>
              <a href="#menu" onClick={() => setIsOpen(false)} className="block text-2xl font-serif font-bold text-pakery-text">Our Bakes</a>
              <a href="#contact" onClick={() => setIsOpen(false)} className="block text-2xl font-serif font-bold text-pakery-text">Visit Us</a>
              <button className="w-full bg-pakery-accent text-white py-5 rounded-2xl font-bold text-lg">Order Online</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const SectionHeading = ({ children, subtitle, light = false }: { children: React.ReactNode, subtitle?: string, light?: boolean }) => (
  <div className="mb-20">
    <motion.h2 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`text-5xl md:text-7xl font-serif font-black leading-tight mb-6 ${light ? 'text-white' : 'text-pakery-text'}`}
    >
      {children}
    </motion.h2>
    {subtitle && (
      <motion.p 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className={`text-xl md:text-2xl font-medium max-w-3xl leading-relaxed ${light ? 'text-white/70' : 'text-pakery-text/60'}`}
      >
        {subtitle}
      </motion.p>
    )}
  </div>
);

export default function App() {
  return (
    <div className="min-h-screen bg-pakery-bg text-pakery-text font-sans selection:bg-pakery-accent selection:text-white overflow-x-hidden">
      <Navbar />
      
      {/* Hero Section - Full Bleed Poster Style */}
      <section className="relative h-[100svh] flex items-center justify-center text-center px-6">
        <div className="absolute inset-0 z-0">
          <motion.img 
            initial={{ scale: 1.1, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            src="https://images.unsplash.com/photo-1555507036-ab1f4038808a?q=80&w=2072&auto=format&fit=crop" 
            alt="Bakery background" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/30 backdrop-blur-[2px]" />
        </div>
        
        <div className="relative z-10 max-w-5xl">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="inline-block text-white/90 text-sm font-bold tracking-[0.3em] uppercase mb-8"
          >
            Artisan Bakery & Coffee
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="text-7xl md:text-9xl font-serif font-black text-white mb-10 leading-[0.9] tracking-tighter"
          >
            Freshly Baked, <br />
            <span className="italic font-normal">Daily.</span>
          </motion.h1>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
          >
            <a href="#menu" className="group relative bg-white text-pakery-text px-12 py-5 rounded-full font-black text-lg transition-all hover:scale-105 active:scale-95 shadow-2xl">
              Discover Our Menu
            </a>
            <a href="#about" className="text-white font-bold text-lg border-b-2 border-white/30 hover:border-white transition-all py-1">
              Read Our Story
            </a>
          </motion.div>
        </div>
        
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 text-white/70 flex flex-col items-center gap-3"
        >
          <span className="text-[10px] uppercase tracking-[0.4em] font-black">Scroll</span>
          <div className="w-px h-16 bg-gradient-to-b from-white to-transparent" />
        </motion.div>
      </section>

      {/* About Section - Large Image & Big Typography */}
      <section id="about" className="py-32 md:py-48 bg-pakery-bg">
        <div className="max-w-screen-2xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center">
            <div className="lg:col-span-7">
              <SectionHeading subtitle="We believe the best things in life are simple, honest, and shared over a warm loaf of bread. Our journey began with a single sourdough starter and a dream to bring authentic, slow-fermented bakes to our community.">
                Honest Flour. <br />Patient Hands.
              </SectionHeading>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-16">
                <div className="space-y-4">
                  <h3 className="text-3xl font-serif font-bold italic">Slow Fermentation</h3>
                  <p className="text-lg text-pakery-text/60 leading-relaxed">
                    Every loaf rests for at least 48 hours, allowing flavors to deepen and textures to perfect naturally.
                  </p>
                </div>
                <div className="space-y-4">
                  <h3 className="text-3xl font-serif font-bold italic">Organic Grains</h3>
                  <p className="text-lg text-pakery-text/60 leading-relaxed">
                    We source only the finest heritage grains from local farmers who care as much about the soil as we do about the bread.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="lg:col-span-5 relative">
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1 }}
                className="aspect-[3/4] rounded-[4rem] overflow-hidden shadow-2xl"
              >
                <img 
                  src="https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=2072&auto=format&fit=crop" 
                  alt="Baker at work" 
                  className="w-full h-full object-cover"
                />
              </motion.div>
              <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-pakery-accent rounded-full flex items-center justify-center text-white text-center p-6 transform -rotate-12 shadow-xl hidden xl:flex">
                <span className="text-xl font-serif font-bold">Baked fresh every single morning</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Image - Parallax Style */}
      <section className="h-[60svh] relative overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1517433367423-c7e5b0f35086?q=80&w=2072&auto=format&fit=crop" 
          alt="Fresh croissants" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-pakery-text/20" />
      </section>

      {/* Menu Section - Visual & Clean */}
      <section id="menu" className="py-32 md:py-48 bg-pakery-surface">
        <div className="max-w-screen-2xl mx-auto px-6 lg:px-12">
          <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-24">
            <div className="max-w-3xl">
              <SectionHeading subtitle="From our signature sourdough to delicate French pastries, every item is crafted with intention and the finest seasonal ingredients.">
                Our Daily <br />Curations.
              </SectionHeading>
            </div>
            <div className="pb-24">
              <button className="text-xl font-bold border-b-2 border-pakery-accent pb-1 text-pakery-accent hover:text-pakery-text hover:border-pakery-text transition-all">
                Download Full Menu (PDF)
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16">
            {menuItems.map((category, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="space-y-12"
              >
                <h3 className="text-4xl md:text-5xl font-serif font-black flex items-center gap-6">
                  <span className="text-pakery-accent">0{idx + 1}</span>
                  {category.category}
                </h3>
                <div className="space-y-10">
                  {category.items.map((item, itemIdx) => (
                    <div key={itemIdx} className="group">
                      <div className="flex justify-between items-baseline mb-3">
                        <h4 className="text-2xl md:text-3xl font-serif font-bold group-hover:text-pakery-accent transition-colors cursor-default">
                          {item.name}
                        </h4>
                        <div className="flex-grow mx-4 border-b border-dotted border-pakery-text/20" />
                        <span className="text-xl font-bold">{item.price}</span>
                      </div>
                      <p className="text-lg text-pakery-text/50 max-w-xl leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Atmosphere Section - Large Imagery */}
      <section className="py-32 md:py-48 bg-pakery-text text-white">
        <div className="max-w-screen-2xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <div className="order-2 lg:order-1">
              <div className="grid grid-cols-2 gap-6">
                <motion.img 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  src="https://images.unsplash.com/photo-1486427944299-d1955d23e34d?q=80&w=2072&auto=format&fit=crop" 
                  className="rounded-3xl aspect-square object-cover shadow-2xl"
                  alt="Pastry close up"
                />
                <motion.img 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  src="https://images.unsplash.com/photo-1549931319-a545dcf3bc73?q=80&w=2070&auto=format&fit=crop" 
                  className="rounded-3xl aspect-square object-cover mt-12 shadow-2xl"
                  alt="Bread selection"
                />
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <SectionHeading 
                light 
                subtitle="Step into our cozy corner of the city. We've designed Pakery to be a sanctuary for bread lovers—a place where the smell of fresh yeast and roasting coffee greets you at the door."
              >
                A Sanctuary <br /><span className="italic font-normal">for Bread.</span>
              </SectionHeading>
              
              <div className="space-y-8 mt-12">
                <div className="flex items-center gap-6">
                  <div className="w-16 h-16 rounded-full border border-white/20 flex items-center justify-center text-pakery-accent">
                    <Clock size={28} />
                  </div>
                  <div>
                    <h4 className="text-2xl font-bold">Daily 7am — 4pm</h4>
                    <p className="text-white/50">Or until we sell out of the day's bakes.</p>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="w-16 h-16 rounded-full border border-white/20 flex items-center justify-center text-pakery-accent">
                    <MapPin size={28} />
                  </div>
                  <div>
                    <h4 className="text-2xl font-bold">Bread District</h4>
                    <p className="text-white/50">123 Artisan Way, Dough Town</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section - Clean & Cozy */}
      <section id="contact" className="py-32 md:py-48 bg-pakery-bg">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <SectionHeading subtitle="Want to pre-order for an event or just have a question? We'd love to hear from you.">
            Say Hello.
          </SectionHeading>
          
          <motion.form 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-16 space-y-8"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <input 
                type="text" 
                placeholder="Your Name" 
                className="w-full bg-pakery-surface border-none rounded-3xl px-8 py-6 text-lg focus:ring-2 focus:ring-pakery-accent transition-all outline-none"
              />
              <input 
                type="email" 
                placeholder="Your Email" 
                className="w-full bg-pakery-surface border-none rounded-3xl px-8 py-6 text-lg focus:ring-2 focus:ring-pakery-accent transition-all outline-none"
              />
            </div>
            <textarea 
              placeholder="Your Message" 
              rows={6}
              className="w-full bg-pakery-surface border-none rounded-3xl px-8 py-6 text-lg focus:ring-2 focus:ring-pakery-accent transition-all outline-none resize-none"
            ></textarea>
            <button className="w-full bg-pakery-accent text-white py-6 rounded-full text-xl font-black shadow-xl shadow-pakery-accent/20 hover:scale-[1.02] active:scale-[0.98] transition-all">
              Send Message
            </button>
          </motion.form>
          
          <div className="mt-24 flex justify-center gap-12">
            {[Instagram, Facebook, Twitter].map((Icon, i) => (
              <a key={i} href="#" className="text-pakery-text/40 hover:text-pakery-accent transition-colors">
                <Icon size={32} />
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 bg-pakery-surface border-t border-pakery-text/5">
        <div className="max-w-screen-2xl mx-auto px-6 lg:px-12 flex flex-col md:flex-row justify-between items-center gap-12">
          <span className="text-4xl font-serif font-black text-pakery-text lowercase">pakery.</span>
          <div className="flex gap-12 text-sm font-black uppercase tracking-widest text-pakery-text/40">
            <a href="#about" className="hover:text-pakery-accent transition-colors">Story</a>
            <a href="#menu" className="hover:text-pakery-accent transition-colors">Menu</a>
            <a href="#contact" className="hover:text-pakery-accent transition-colors">Contact</a>
          </div>
          <p className="text-pakery-text/30 font-medium">
            © 2024 Pakery Artisan.
          </p>
        </div>
      </footer>
    </div>
  );
}
