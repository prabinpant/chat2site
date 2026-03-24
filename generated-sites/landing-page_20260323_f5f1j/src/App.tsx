import { useState, useEffect } from 'react';
import { 
  Shield, 
  Key, 
  Lock, 
  UserCheck, 
  ArrowRight, 
  CheckCircle2, 
  Terminal, 
  Github,
  Menu,
  X,
  Code2,
  Cpu,
  Fingerprint
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// --- Components ---

const Nav = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b",
        isScrolled 
          ? "bg-white/80 backdrop-blur-md border-slate-200 py-3" 
          : "bg-transparent border-transparent py-5"
      )}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <div className="flex items-center gap-2 group cursor-pointer">
          <div className="p-2 bg-accent rounded-lg">
            <Shield className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold tracking-tight text-text">AuthMaster</span>
        </div>

        <div className="hidden md:flex items-center gap-8">
          {['Curriculum', 'Architecture', 'Security', 'Pricing'].map((item) => (
            <a 
              key={item} 
              href={`#${item.toLowerCase()}`} 
              className="text-sm font-medium text-slate-600 hover:text-accent transition-colors"
            >
              {item}
            </a>
          ))}
          <button className="px-5 py-2.5 bg-text text-white text-sm font-semibold rounded-full hover:bg-slate-800 transition-all">
            Get Access
          </button>
        </div>

        <button 
          className="md:hidden p-2 text-text"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-b border-slate-200 overflow-hidden"
          >
            <div className="px-6 py-6 flex flex-col gap-4">
              {['Curriculum', 'Architecture', 'Security', 'Pricing'].map((item) => (
                <a 
                  key={item} 
                  href={`#${item.toLowerCase()}`} 
                  className="text-lg font-medium text-slate-600"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item}
                </a>
              ))}
              <button className="w-full py-4 bg-text text-white font-semibold rounded-xl">
                Get Access
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => {
  return (
    <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-accent/5 blur-[120px] rounded-full" />
      </div>
      
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-accent/10 rounded-full mb-6">
              <span className="flex h-2 w-2 rounded-full bg-accent animate-pulse" />
              <span className="text-xs font-bold uppercase tracking-wider text-accent">Updated for Next.js 15</span>
            </div>
            <h1 className="text-5xl lg:text-7xl font-bold tracking-tight text-text leading-[1.1] mb-8">
              Master Modern <br />
              <span className="text-accent">Next.js Auth.</span>
            </h1>
            <p className="text-xl text-slate-600 leading-relaxed mb-10 max-w-lg">
              The definitive guide to building bulletproof authentication. From Middleware to RBAC, learn the patterns used by the world's most secure applications.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="px-8 py-4 bg-accent text-white font-bold rounded-2xl flex items-center justify-center gap-2 hover:bg-blue-600 transition-all shadow-lg shadow-accent/20 group">
                Start Learning Now <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="px-8 py-4 bg-white border border-slate-200 text-text font-bold rounded-2xl flex items-center justify-center gap-2 hover:bg-slate-50 transition-all">
                View Curriculum
              </button>
            </div>
            
            <div className="mt-12 flex items-center gap-6">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map((i) => (
                  <img 
                    key={i}
                    src={`https://i.pravatar.cc/100?u=${i}`}
                    className="w-10 h-10 rounded-full border-2 border-white"
                    alt="Student"
                  />
                ))}
              </div>
              <p className="text-sm text-slate-500 font-medium">
                Joined by <span className="text-text font-bold">1,200+</span> developers
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative bg-slate-900 rounded-3xl p-4 shadow-2xl overflow-hidden border border-slate-800">
              <div className="flex items-center gap-2 mb-4 px-2">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/20" />
                  <div className="w-3 h-3 rounded-full bg-amber-500/20" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/20" />
                </div>
                <div className="ml-4 px-3 py-1 bg-slate-800 rounded-md text-[10px] text-slate-400 font-mono">
                  middleware.ts
                </div>
              </div>
              <div className="space-y-3 font-mono text-sm">
                <div className="flex gap-4">
                  <span className="text-slate-600">01</span>
                  <span className="text-blue-400">import</span>
                  <span className="text-slate-300">{` { auth } `}</span>
                  <span className="text-blue-400">from</span>
                  <span className="text-emerald-400">"@/auth"</span>
                </div>
                <div className="flex gap-4">
                  <span className="text-slate-600">02</span>
                  <span className="text-slate-300">export default </span>
                  <span className="text-amber-400">auth</span>
                  <span className="text-slate-300">((req) ={`>`} {'{'}</span>
                </div>
                <div className="flex gap-4">
                  <span className="text-slate-600">03</span>
                  <span className="text-slate-300">  const isLoggedIn = !!req.auth;</span>
                </div>
                <div className="flex gap-4">
                  <span className="text-slate-600">04</span>
                  <span className="text-slate-300">  if (!isLoggedIn) {'{'}</span>
                </div>
                <div className="flex gap-4">
                  <span className="text-slate-600">05</span>
                  <span className="text-slate-300">    return Response.redirect(...)</span>
                </div>
                <div className="flex gap-4">
                  <span className="text-slate-600">06</span>
                  <span className="text-slate-300">  {'}'}</span>
                </div>
                <div className="flex gap-4">
                  <span className="text-slate-600">07</span>
                  <span className="text-slate-300">{'}'})</span>
                </div>
              </div>
              
              {/* Floating element */}
              <motion.div 
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-6 -right-6 bg-white p-4 rounded-2xl shadow-xl border border-slate-100 flex items-center gap-4"
              >
                <div className="p-3 bg-emerald-100 rounded-xl">
                  <UserCheck className="w-6 h-6 text-emerald-600" />
                </div>
                <div>
                  <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">Session Active</p>
                  <p className="text-sm font-bold text-text">user_0921_x2</p>
                </div>
              </motion.div>
            </div>
            
            {/* Background elements */}
            <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full border border-accent/10 rounded-full scale-110" />
            <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full border border-accent/5 rounded-full scale-125" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const Features = () => {
  const features = [
    {
      icon: <Key className="w-6 h-6" />,
      title: "Stateless vs Stateful",
      description: "Deep dive into JWT sessions and Database sessions. Learn when to use which and why it matters for scale."
    },
    {
      icon: <Lock className="w-6 h-6" />,
      title: "OAuth 2.0 & OIDC",
      description: "Implement social logins with Google, GitHub, and Apple using the latest Auth.js and NextAuth patterns."
    },
    {
      icon: <Cpu className="w-6 h-6" />,
      title: "Server Actions Security",
      description: "Secure your data mutations at the source. Learn how to protect Server Actions from unauthorized access."
    },
    {
      icon: <Fingerprint className="w-6 h-6" />,
      title: "Multi-Factor (MFA)",
      description: "Go beyond passwords. Implement Passkeys, WebAuthn, and TOTP for maximum account security."
    },
    {
      icon: <Code2 className="w-6 h-6" />,
      title: "Custom Providers",
      description: "Build your own credential-based authentication with Zod validation and Bcrypt hashing."
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "RBAC & Permissions",
      description: "Fine-grained access control. Learn how to manage user roles and specific action-level permissions."
    }
  ];

  return (
    <section id="architecture" className="py-24 bg-surface relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-3xl lg:text-5xl font-bold tracking-tight text-text mb-6">
            Everything you need for <span className="text-accent">Production.</span>
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Authentication is more than just a login form. We cover the entire security lifecycle of a modern Next.js application.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, idx) => (
            <motion.div 
              key={idx}
              whileHover={{ y: -5 }}
              className="p-8 bg-white border border-slate-200 rounded-3xl hover:border-accent/30 transition-all shadow-sm"
            >
              <div className="w-12 h-12 bg-accent/10 rounded-2xl flex items-center justify-center text-accent mb-6">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-text mb-4">{feature.title}</h3>
              <p className="text-slate-600 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const SecurityShowcase = () => {
  return (
    <section id="security" className="py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="bg-text rounded-[40px] p-8 lg:p-20 overflow-hidden relative">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent/20 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2" />
          
          <div className="grid lg:grid-cols-2 gap-20 items-center relative z-10">
            <div>
              <h2 className="text-3xl lg:text-5xl font-bold tracking-tight text-white mb-8">
                Security is not <br />
                <span className="text-accent">an Afterthought.</span>
              </h2>
              <div className="space-y-6">
                {[
                  "CSRF & XSS protection out of the box",
                  "Secure session cookie management",
                  "Strict Content Security Policy (CSP)",
                  "Rate limiting and brute force protection",
                  "Production-grade secret management"
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-4">
                    <CheckCircle2 className="w-6 h-6 text-accent shrink-0" />
                    <span className="text-slate-300 font-medium">{item}</span>
                  </div>
                ))}
              </div>
              <div className="mt-12">
                <button className="px-8 py-4 bg-accent text-white font-bold rounded-2xl hover:bg-blue-600 transition-all">
                  Read the Security Whitepaper
                </button>
              </div>
            </div>
            
            <div className="bg-slate-900/50 backdrop-blur-xl border border-white/10 rounded-3xl p-8">
              <div className="flex items-center gap-4 mb-8">
                <div className="p-3 bg-accent/10 rounded-xl">
                  <Terminal className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <h4 className="text-white font-bold">Security Audit Log</h4>
                  <p className="text-xs text-slate-500 uppercase tracking-widest font-bold mt-1">Real-time verification</p>
                </div>
              </div>
              
              <div className="space-y-4">
                {[
                  { event: "Login Attempt", status: "Verified", time: "2ms ago", color: "text-emerald-400" },
                  { event: "MFA Token", status: "Validated", time: "12ms ago", color: "text-emerald-400" },
                  { event: "Session Sync", status: "Encrypted", time: "45ms ago", color: "text-blue-400" },
                  { event: "CSRF Token", status: "Generated", time: "1.2s ago", color: "text-slate-400" }
                ].map((log, idx) => (
                  <div key={idx} className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                      <span className="text-sm text-slate-300 font-medium">{log.event}</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className={cn("text-[10px] font-bold uppercase tracking-widest", log.color)}>{log.status}</span>
                      <span className="text-[10px] text-slate-500 font-mono">{log.time}</span>
                    </div>
                  </div>
                ))}
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
    <section className="py-24 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full -z-10">
        <div className="absolute inset-0 bg-accent/5" />
      </div>
      
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h2 className="text-4xl lg:text-6xl font-bold tracking-tight text-text mb-8">
          Build with Confidence.
        </h2>
        <p className="text-xl text-slate-600 mb-12">
          Stop guessing your security implementation. Join the elite Next.js developers who know exactly how to protect their users.
        </p>
        <div className="inline-flex flex-col sm:flex-row items-center gap-6">
          <button className="w-full sm:w-auto px-10 py-5 bg-text text-white font-bold rounded-2xl text-lg hover:bg-slate-800 transition-all shadow-xl">
            Get Instant Access
          </button>
          <div className="flex items-center gap-2 text-slate-500 font-medium">
            <CheckCircle2 className="w-5 h-5 text-emerald-500" />
            30-day money-back guarantee
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="py-12 border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-text rounded-md">
            <Shield className="w-4 h-4 text-white" />
          </div>
          <span className="font-bold tracking-tight text-text">AuthMaster</span>
        </div>
        
        <p className="text-sm text-slate-500">
          © 2026 AuthMaster. Built for the Next.js Community.
        </p>
        
        <div className="flex items-center gap-6">
          <Github className="w-5 h-5 text-slate-400 hover:text-text cursor-pointer transition-colors" />
          <button className="text-sm font-semibold text-slate-600 hover:text-accent transition-colors">
            Terms
          </button>
          <button className="text-sm font-semibold text-slate-600 hover:text-accent transition-colors">
            Privacy
          </button>
        </div>
      </div>
    </footer>
  );
};

const App = () => {
  return (
    <div className="min-h-screen bg-white text-text selection:bg-accent/30 selection:text-accent">
      <Nav />
      <main>
        <Hero />
        <Features />
        <SecurityShowcase />
        <CTA />
      </main>
      <Footer />
    </div>
  );
};

export default App;
