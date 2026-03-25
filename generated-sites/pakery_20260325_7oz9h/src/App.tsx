import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Menu as MenuIcon, 
  X, 
  ShoppingBag, 
  Instagram, 
  Facebook, 
  Twitter,
  MapPin,
  Phone,
  Mail,
  Clock,
  ArrowRight,
  Cake,
  Croissant,
  Coffee
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
    <nav className="fixed w-full z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-pakery-accent rounded-full flex items-center justify-center text-white">
              <Cake size={20} />
            </div>
            <span className="text-2xl font-bold text-pakery-text tracking-tight uppercase">pakery</span>
          </div>
          
          <div className="hidden md:flex items-center gap-8">
            <a href="#about" className="text-sm font-medium text-slate-600 hover:text-pakery-accent transition-colors">Story</a>
            <a href="#menu" className="text-sm font-medium text-slate-600 hover:text-pakery-accent transition-colors">Menu</a>
            <a href="#contact" className="text-sm font-medium text-slate-600 hover:text-pakery-accent transition-colors">Order</a>
            <button className="bg-pakery-text text-white px-6 py-2.5 rounded-full text-sm font-semibold hover:bg-slate-800 transition-all flex items-center gap-2">
              Visit Us <ArrowRight size={16} />
            </button>
          </div>

          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-pakery-text">
              {isOpen ? <X size={24} /> : <MenuIcon size={24} />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-slate-100 overflow-hidden"
          >
            <div className="px-4 py-6 space-y-4">
              <a href="#about" onClick={() => setIsOpen(false)} className="block text-lg font-medium text-slate-900">Story</a>
              <a href="#menu" onClick={() => setIsOpen(false)} className="block text-lg font-medium text-slate-900">Menu</a>
              <a href="#contact" onClick={() => setIsOpen(false)} className="block text-lg font-medium text-slate-900">Order</a>
              <button className="w-full bg-pakery-text text-white py-4 rounded-xl font-bold">Visit Us</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const SectionHeading = ({ children, subtitle }: { children: React.ReactNode, subtitle?: string }) => (
  <div className="mb-16">
    <motion.h2 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-4xl md:text-5xl font-bold text-pakery-text mb-4"
    >
      {children}
    </motion.h2>
    {subtitle && (
      <motion.p 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className="text-lg text-slate-500 max-w-2xl"
      >
        {subtitle}
      </motion.p>
    )}
  </div>
);

export default function App() {
  return (
    <div className="min-h-screen bg-pakery-bg text-pakery-text font-sans selection:bg-pakery-accent selection:text-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative h-[100svh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=2072&auto=format&fit=crop" 
            alt="Bakery background" 
            className="w-full h-full object-cover brightness-[0.85]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent" />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-20">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-2xl"
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md text-white text-sm font-semibold mb-6 border border-white/20 uppercase tracking-widest">
              Established 2024
            </span>
            <h1 className="text-6xl md:text-8xl font-bold text-white mb-8 tracking-tight leading-tight">
              Honest Flour. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/60">Slow Rising.</span>
            </h1>
            <p className="text-xl text-white/80 mb-10 leading-relaxed max-w-lg">
              Crafting premium artisan breads and delicate pastries daily. Every loaf is a labor of love, time, and the finest organic ingredients.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="#menu" className="bg-pakery-accent hover:bg-blue-600 text-white px-8 py-4 rounded-full font-bold text-center transition-all transform hover:scale-105 shadow-xl shadow-blue-500/20">
                Explore Menu
              </a>
              <a href="#contact" className="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/30 px-8 py-4 rounded-full font-bold text-center transition-all">
                Order Online
              </a>
            </div>
          </motion.div>
        </div>
        
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/50 flex flex-col items-center gap-2"
        >
          <span className="text-xs uppercase tracking-widest font-medium">Scroll to explore</span>
          <div className="w-px h-12 bg-gradient-to-b from-white/50 to-transparent" />
        </motion.div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="relative">
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="aspect-[4/5] rounded-[2.5rem] overflow-hidden"
              >
                <img 
                  src="https://images.unsplash.com/photo-1555507036-ab1f4038808a?q=80&w=1926&auto=format&fit=crop" 
                  alt="Baker working" 
                  className="w-full h-full object-cover"
                />
              </motion.div>
              <motion.div 
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="absolute -bottom-10 -right-10 bg-pakery-accent p-8 rounded-[2rem] text-white hidden md:block"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                    <Clock size={24} />
                  </div>
                  <div>
                    <div className="text-2xl font-bold tracking-tight">48 Hours</div>
                    <div className="text-sm opacity-80">Natural Fermentation</div>
                  </div>
                </div>
                <p className="max-w-[200px] text-sm leading-relaxed opacity-90">
                  Our sourdough process takes time, resulting in deeper flavor and better digestion.
                </p>
              </motion.div>
            </div>
            
            <div>
              <SectionHeading subtitle="Rooted in tradition, perfected for the modern palate. At Pakery, we believe that the best ingredients and patient hands create the most memorable experiences.">
                The Art of Baking.
              </SectionHeading>
              
              <div className="space-y-8">
                {[
                  { icon: <Croissant />, title: "Artisan Quality", desc: "Small-batch production ensuring every piece meets our exacting standards." },
                  { icon: <ShoppingBag />, title: "Organic Ingredients", desc: "We source only the finest organic flour and local dairy for pure taste." },
                  { icon: <Coffee />, title: "Daily Freshness", desc: "Baked through the night to ensure your morning starts with the perfect crunch." }
                ].map((feature, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex gap-6"
                  >
                    <div className="flex-shrink-0 w-14 h-14 bg-pakery-surface rounded-2xl flex items-center justify-center text-pakery-accent">
                      {feature.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                      <p className="text-slate-500 leading-relaxed">{feature.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Menu Section */}
      <section id="menu" className="py-24 md:py-32 bg-pakery-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <SectionHeading subtitle="A curated selection of our daily creations. Selection may vary by season.">
              Our Daily Menu.
            </SectionHeading>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-12">
            {menuItems.map((category, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.2 }}
                className="bg-white p-8 md:p-12 rounded-[3rem] shadow-sm border border-slate-100"
              >
                <h3 className="text-2xl font-bold mb-10 text-pakery-accent flex items-center gap-3">
                  <div className="w-8 h-px bg-pakery-accent/30" />
                  {category.category}
                </h3>
                <div className="space-y-10">
                  {category.items.map((item, itemIdx) => (
                    <div key={itemIdx} className="group cursor-default">
                      <div className="flex justify-between items-baseline mb-2">
                        <h4 className="text-xl font-bold group-hover:text-pakery-accent transition-colors">
                          {item.name}
                        </h4>
                        <span className="text-lg font-bold text-slate-900">{item.price}</span>
                      </div>
                      <p className="text-slate-500 leading-relaxed">{item.description}</p>
                      <div className="mt-4 h-px w-full bg-slate-50" />
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
            <div>
              <SectionHeading subtitle="Have a custom order or want to say hello? Drop us a message below or visit our cozy bakery downtown.">
                Get in Touch.
              </SectionHeading>
              
              <div className="space-y-8">
                <div className="flex items-start gap-6">
                  <div className="w-12 h-12 bg-pakery-surface rounded-xl flex items-center justify-center text-pakery-accent">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold mb-1">Location</h4>
                    <p className="text-slate-500">123 Artisan Way, Bread District<br />Dough Town, DT 5678</p>
                  </div>
                </div>
                <div className="flex items-start gap-6">
                  <div className="w-12 h-12 bg-pakery-surface rounded-xl flex items-center justify-center text-pakery-accent">
                    <Phone size={24} />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold mb-1">Phone</h4>
                    <p className="text-slate-500">+1 (555) 123-4567</p>
                  </div>
                </div>
                <div className="flex items-start gap-6">
                  <div className="w-12 h-12 bg-pakery-surface rounded-xl flex items-center justify-center text-pakery-accent">
                    <Mail size={24} />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold mb-1">Email</h4>
                    <p className="text-slate-500">hello@pakery.com</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-12 flex gap-4">
                {[Instagram, Facebook, Twitter].map((Icon, i) => (
                  <a key={i} href="#" className="w-12 h-12 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 hover:border-pakery-accent hover:text-pakery-accent transition-all">
                    <Icon size={20} />
                  </a>
                ))}
              </div>
            </div>
            
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-pakery-surface p-8 md:p-12 rounded-[3rem] border border-slate-100"
            >
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold uppercase tracking-wider text-slate-400">Full Name</label>
                    <input type="text" className="w-full bg-white border border-slate-200 rounded-2xl px-6 py-4 outline-none focus:border-pakery-accent transition-colors" placeholder="John Doe" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold uppercase tracking-wider text-slate-400">Email Address</label>
                    <input type="email" className="w-full bg-white border border-slate-200 rounded-2xl px-6 py-4 outline-none focus:border-pakery-accent transition-colors" placeholder="john@example.com" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold uppercase tracking-wider text-slate-400">Subject</label>
                  <select className="w-full bg-white border border-slate-200 rounded-2xl px-6 py-4 outline-none focus:border-pakery-accent transition-colors appearance-none">
                    <option>General Inquiry</option>
                    <option>Custom Cake Order</option>
                    <option>Wholesale</option>
                    <option>Feedback</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold uppercase tracking-wider text-slate-400">Message</label>
                  <textarea rows={5} className="w-full bg-white border border-slate-200 rounded-2xl px-6 py-4 outline-none focus:border-pakery-accent transition-colors resize-none" placeholder="Tell us what's on your mind..."></textarea>
                </div>
                <button type="submit" className="w-full bg-pakery-text text-white py-5 rounded-2xl font-bold text-lg hover:bg-slate-800 transition-all flex items-center justify-center gap-3 group">
                  Send Message
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-pakery-text text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-10 pb-20 border-b border-white/10">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-pakery-accent rounded-full flex items-center justify-center">
                <Cake size={24} />
              </div>
              <span className="text-3xl font-bold tracking-tight uppercase">pakery</span>
            </div>
            <div className="flex gap-10">
              <a href="#about" className="hover:text-pakery-accent transition-colors">Story</a>
              <a href="#menu" className="hover:text-pakery-accent transition-colors">Menu</a>
              <a href="#contact" className="hover:text-pakery-accent transition-colors">Contact</a>
            </div>
          </div>
          <div className="pt-10 flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-white/40">
            <p>© 2024 Pakery Artisan Bakery. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
