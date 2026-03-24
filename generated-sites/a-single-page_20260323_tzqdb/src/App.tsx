import { motion } from 'framer-motion';
import { 
  Trophy, 
  Zap, 
  Activity,
  Users,
  Gift,
  QrCode,
  Slack,
  AlertTriangle,
  Flame,
  Footprints,
  Star,
  Medal,
  Map,
  MapPin,
  Mountain,
  Target,
  Infinity as InfinityIcon,
  RotateCcw,
  Play
} from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const RUNNERS = [
  { id: "AS", name: "Aaryash S.", bio: "Self-proclaimed CTO, runs like a maniac, bets like a fool!" },
  { id: "AK", name: "Alok K.", bio: "He is an Ironman. He eats 100 for breakfast." },
  { id: "AN", name: "Anita N.", bio: "Don't let the new one beat you." },
  { id: "ID", name: "Ishu D.", bio: "She will complete the challenge with few lectures." },
  { id: "KB", name: "Karuna B.", bio: "Strolling light, fueled by bakery delights." },
  { id: "KM", name: "Kaushal M.", bio: "Last one to start. Has 5000 reasons to run." },
  { id: "KS", name: "Kaveri S.", bio: "Started good, became NPC, trying again." },
  { id: "MS", name: "Manish S.", bio: "Numbers run in his head, not on strava." },
  { id: "MJT", name: "Manish T.", bio: "He made us all run whether we liked it or not." },
  { id: "MS", name: "Mridul S.", bio: "Fitness? Pass. Money? Yes!" },
  { id: "NN", name: "Niraj N.", bio: "He runs as often as he comes to office." },
  { id: "PP", name: "Prabin P.", bio: "The यही नै हो अर्को जुनी guy. The CEO who made it all happen." },
  { id: "RK", name: "Regan K.", bio: "He is bestie with Aaryash" },
  { id: "RB", name: "Rishab B.", bio: "He will complete the challenge silently." },
  { id: "RP", name: "Riwaj P.", bio: "He has running in his CV but never runs" },
  { id: "SS", name: "Saroj S.", bio: "He has Asics trail running shoes." },
  { id: "SB", name: "Shamal B.", bio: "He likes Beer, can't say about runs." },
  { id: "SD", name: "Subash D.", bio: "He runs in pixels, so his challenge is 378 million pixels (at 96 DPI)." },
  { id: "SS", name: "Subed S.", bio: "Interns don't get bio." },
  { id: "YO", name: "Yuba O.", bio: "He will run in his fasting day too, no excuses" },
];

const REWARDS = [
  { item: "Custom Finisher T-Shirt", description: "Soft, stylish, and screams 'I ran 100!'" },
  { item: "Fridge Magnet", description: "To remind you of your greatness every time you reach for a snack." },
  { item: "Medal", description: "A heavy, shiny piece of glory for your mantel." },
  { item: "Various Goodies", description: "Surprise treats from our amazing partners." },
];

const AWARDS = [
  { title: "Topper", description: "The one who finishes the challenge first.", icon: Trophy },
  { title: "Marathoner", description: "For the runner who logs the longest single run during the challenge.", icon: Activity },
  { title: "Wonder Women", description: "Awarded to the first female finisher to complete 100.", icon: Star },
  { title: "Endless Wanderer", description: "Awarded to the participant with the longest single walking effort.", icon: Footprints },
  { title: "The Flash", description: "The runner with fastest average run pace", icon: Zap },
  { title: "Beyond Infinity", description: "Who completes the most distance at the end of the challenge.", icon: InfinityIcon },
  { title: "The Math Teacher", description: "To the most consistent one.", icon: Target },
  { title: "Pure Runner", description: "Awarded to the participant who completes the challenge entirely through running—no walks.", icon: Flame },
  { title: "Pure Walker", description: "For the participant who embraces the journey fully on foot—no running, just walking grit.", icon: Footprints },
  { title: "Sky Chaser", description: "Awarded to the one who accumulates the highest elevation gain.", icon: Mountain },
  { title: "Route Artist", description: "For the most creative or visually stunning GPS route.", icon: Map },
  { title: "The Wanderer", description: "Awarded to the explorer who completes the challenge across the most diverse locations.", icon: MapPin },
  { title: "100 Miler", description: "Crosses 160km", icon: Medal },
  { title: "You vs You", description: "The last one to finish the challenge", icon: Users },
  { title: "Route Artist", description: "The one with the most creative strava route map.", icon: Map },
  { title: "The Redeemer", description: "The one who did not complete the previous challenges that completes April 100km", icon: RotateCcw },
  { title: "First Foot Forward", description: "Awarded to the one who makes the opening move of the entire challenge.", icon: Play },
];

const RULES = [
  {
    title: "STRAVA IS LAW",
    description: "Join the Arbyte RC Strava club. If it's not on Strava, it didn't happen. No manual entries unless you have GPS proof.",
    icon: Activity
  },
  {
    title: "LEGS ONLY",
    description: "No bikes, no cars, no scooters. Just you and the pavement. Runs, walks, and hikes all count. No skating!",
    icon: Footprints
  },
  {
    title: "HONOR SYSTEM",
    description: "We verify everything, but don't be a cheat. No 'forgetting' to turn off your Strava while driving home!",
    icon: AlertTriangle
  },
  {
    title: "STAY FIRED UP",
    description: "Log your progress daily. We love to see the burn! Post your stats in the Slack thread to keep the hype alive.",
    icon: Flame
  }
];

const App = () => {
  return (
    <div className="min-h-screen bg-vintage-offwhite text-vintage-black selection:bg-vintage-black selection:text-vintage-offwhite relative overflow-hidden">
      {/* Film Grain & Decorative Overlay */}
      <div className="grain-overlay" />
      
      {/* Background Decorative Elements */}
      <div className="fixed inset-0 pointer-events-none opacity-5">
        <div className="absolute top-10 left-10 w-64 h-64 border-8 border-vintage-black rounded-full animate-wobble-slow" />
        <div className="absolute bottom-10 right-10 w-96 h-96 border-[12px] border-vintage-black rotate-45 animate-wobble-slow" />
      </div>

      {/* Header / Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 p-6 flex justify-between items-center mix-blend-difference invert">
        <div className="flex items-center gap-2">
          <Zap className="w-8 h-8 fill-current" />
          <span className="font-cartoon text-2xl font-bold tracking-tighter uppercase italic">april 100</span>
        </div>
        <div className="flex gap-4 md:gap-8 font-cartoon font-bold uppercase text-sm md:text-lg">
          <a href="#rules" className="hover:line-through">Rules</a>
          <a href="#rewards" className="hover:line-through">Rewards</a>
          <a href="#awards" className="hover:line-through">Awards</a>
          <a href="#registration" className="hover:line-through">Register</a>
          <a href="#leaderboard" className="hover:line-through">Runners</a>
          <a href="#join" className="hover:line-through">Join</a>
        </div>
      </nav>

      {/* Hero Section - Centered Layout without Image */}
      <section className="relative h-[100svh] flex flex-col items-center justify-center px-6 overflow-hidden pt-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-vintage-black/5 to-transparent pointer-events-none" />
        
        <div className="max-w-5xl z-10 text-center">
          <motion.div 
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="inline-flex items-center gap-2 bg-vintage-black text-vintage-offwhite px-6 py-2 mb-8 font-cartoon font-bold uppercase text-xl rotate-[-1deg] shadow-lg">
              <Star className="w-5 h-5 fill-current animate-pulse" />
              Official Club Challenge
              <Star className="w-5 h-5 fill-current animate-pulse" />
            </div>
            
            <h1 className="text-[12vw] md:text-[10vw] lg:text-[125px] font-cartoon font-black uppercase leading-[0.9] tracking-tighter mb-8 animate-flicker">
              APRIL <br /> 
              <span className="text-vintage-black">100km</span> <br /> 
              CHALLENGE
            </h1>
            
            <div className="max-w-3xl mx-auto mb-12">
              <p className="text-lg md:text-xl lg:text-2xl font-cartoon font-bold italic leading-tight opacity-90">
                "Put some pep in your step and miles in your logs, folks! <br />
                The organizers of July 70km are back."
              </p>
            </div>
            
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-6 justify-center"
            >
              <a 
                href="#registration"
                className="wobbly-border bg-vintage-black text-vintage-offwhite px-10 py-5 text-2xl md:text-3xl font-cartoon font-black uppercase shadow-[10px_10px_0px_0px_rgba(0,0,0,0.15)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all"
              >
                Sign Up Now
              </a>
              <a 
                href="https://www.strava.com/clubs/arbyte"
                target="_blank"
                rel="noopener noreferrer"
                className="wobbly-border bg-transparent text-vintage-black px-10 py-5 text-2xl md:text-3xl font-cartoon font-black uppercase shadow-[10px_10px_0px_0px_rgba(0,0,0,0.1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all inline-flex items-center gap-3"
              >
                Strava <Activity className="w-10 h-10" />
              </a>
            </motion.div>
          </motion.div>
        </div>

      </section>

      {/* Rules Section - REDESIGNED WITHOUT IMAGES */}
      <section id="rules" className="py-32 bg-vintage-black text-vintage-offwhite relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-vintage-offwhite to-transparent opacity-10" />
        
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="mb-24">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-7xl md:text-[10rem] font-cartoon font-black uppercase leading-tight italic mb-10">
                THE <span className="text-accent underline decoration-wavy decoration-[12px] underline-offset-[16px]">RULES</span>
              </h2>
              <p className="text-2xl md:text-3xl font-cartoon font-bold opacity-70 italic max-w-2xl">
                No shortcuts. No excuses. Just pure, unadulterated grit.
              </p>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            {RULES.map((rule, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="group relative wobbly-border-thin border-white/20 p-8 md:p-12 bg-white/5 hover:bg-white/10 transition-all"
              >
                <span className="absolute top-4 right-8 text-8xl md:text-[10rem] font-cartoon font-black text-white/5 leading-none select-none pointer-events-none group-hover:text-white/10 transition-colors">
                  0{idx + 1}
                </span>
                
                <div className="relative z-10">
                  <div className="inline-flex bg-accent p-6 rotate-3 shadow-xl group-hover:rotate-6 group-hover:scale-110 transition-transform mb-8">
                    <rule.icon className="w-12 h-12 text-vintage-black" />
                  </div>
                  
                  <h3 className="text-4xl md:text-5xl font-cartoon font-black uppercase leading-none mb-6">
                    {rule.title}
                  </h3>
                  <p className="text-xl md:text-2xl font-cartoon font-medium opacity-80 leading-relaxed">
                    {rule.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-20 text-center">
            <div className="inline-block border-2 border-dashed border-white/30 px-10 py-6 font-cartoon font-bold text-xl md:text-2xl uppercase opacity-60">
              Violators will be publicly shamed in the Slack thread.
            </div>
          </div>
        </div>
      </section>

      {/* Rewards Section */}
      <section id="rewards" className="py-32 px-6 bg-vintage-offwhite overflow-hidden relative">
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-8xl font-cartoon font-black uppercase leading-none mb-6">
              Grand Prizes
            </h2>
            <p className="text-2xl font-cartoon font-black uppercase text-accent rotate-1">
              YOUR ONLY GREAT ACHIEVEMENT OF 2026!
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              {REWARDS.map((reward, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ x: -50, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="flex items-start gap-4 p-4 wobbly-border bg-white"
                >
                  <div className="bg-vintage-black p-3 rounded-full text-white">
                    <Gift className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-cartoon font-black text-xl uppercase">{reward.item}</h3>
                    <p className="font-cartoon opacity-70 italic">{reward.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
            
            <motion.div 
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              className="relative aspect-square flex items-center justify-center"
            >
              <div className="absolute inset-0 bg-accent/20 rounded-full blur-3xl animate-pulse" />
              <div className="wobbly-border bg-white p-8 rotate-3 relative z-10">
                <Trophy className="w-48 h-48 md:w-64 md:h-64 text-vintage-black" />
                <div className="absolute -top-4 -right-4 bg-vintage-black text-white px-4 py-2 font-cartoon font-black rotate-12">
                  LIMITED EDITION
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Awards & Collectibles Section */}
      <section id="awards" className="py-32 bg-vintage-black text-vintage-offwhite relative overflow-hidden">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="mb-24 text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
            >
              <h2 className="text-6xl md:text-9xl font-cartoon font-black uppercase leading-tight italic mb-10">
                Hall of <span className="text-accent underline decoration-wavy decoration-[12px] underline-offset-[16px]">Fame </span>
              </h2>

              <p className="text-2xl md:text-3xl font-cartoon font-bold opacity-70 italic max-w-2xl mx-auto">
                Collect these badges and prove your worth to the gods of grit.
              </p>
            </motion.div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
            {AWARDS.map((award, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
                className="group h-[220px] perspective-1000"
              >
                <div className="relative w-full h-full transition-all duration-500 preserve-3d group-hover:rotate-y-180">
                  {/* Front */}
                  <div className="absolute inset-1 backface-hidden bg-vintage-offwhite text-vintage-black shield-shape flex flex-col items-center justify-center p-4 border-2 border-vintage-black drop-shadow-[4px_4px_0px_rgba(0,0,0,0.2)]">
                    <award.icon className="w-10 h-10 mb-3" />
                    <h3 className="font-cartoon font-black text-center text-sm leading-tight uppercase px-1">
                      {award.title}
                    </h3>
                  </div>
                  
                  {/* Back */}
                  <div className="absolute inset-1 backface-hidden bg-accent text-white shield-shape flex items-center justify-center p-4 rotate-y-180 border-2 border-vintage-black">
                    <p className="font-cartoon font-black text-center text-[10px] leading-snug uppercase italic">
                      {award.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-20 text-center">
            <div className="inline-block border-2 border-dashed border-white/30 px-10 py-6 font-cartoon font-bold text-xl md:text-2xl uppercase opacity-60">
              Only the bravest shall claim them all.
            </div>
          </div>
        </div>
      </section>

      {/* Registration Section */}
      <section id="registration" className="py-32 px-6 bg-vintage-black text-vintage-offwhite relative">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="order-2 lg:order-1"
            >
              <div className="wobbly-border border-white bg-white p-4 rotate-[-2deg] shadow-[12px_12px_0px_0px_rgba(255,255,255,0.1)]">
                <img 
                  src="/qr_new.jpg" 
                  alt="eSewa QR Code" 
                  className="w-full h-auto grayscale hover:grayscale-0 transition-all duration-500"
                />
              </div>
            </motion.div>

            <div className="order-1 lg:order-2 space-y-8">
              <h2 className="text-5xl md:text-7xl font-cartoon font-black uppercase leading-tight italic">
                Join the <br /> Stampede
              </h2>
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="bg-white p-2 text-vintage-black">
                    <QrCode className="w-8 h-8" />
                  </div>
                  <p className="font-cartoon font-bold text-xl md:text-2xl">
                    Pay <span className="text-accent underline">Rs 999</span> on this eSewa QR
                  </p>
                </div>
                <div className="bg-white/10 p-4 border-2 border-dashed border-white/30 font-cartoon">
                  <p className="uppercase font-black text-accent mb-1">Mandatory Remarks:</p>
                  <p className="text-3xl font-black tracking-widest">#APRIL100</p>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-white p-2 text-vintage-black shrink-0">
                    <Slack className="w-8 h-8" />
                  </div>
                  <div className="font-cartoon">
                    <p className="font-bold text-xl mb-2">Post confirmation in the Slack thread:</p>
                    <a 
                      href="https://devlyspace.slack.com/archives/C8LANTESZ/p1773746017040929" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-accent underline break-all hover:text-white transition-colors"
                    >
                      devlyspace.slack.com/...
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Leaderboard Section */}
      <section id="leaderboard" className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div>
              <h2 className="text-5xl md:text-8xl font-cartoon font-black uppercase leading-none">
                Club <br /> 
                Striders
              </h2>
              <p className="text-xl font-cartoon font-bold mt-4 max-w-md italic">
                Behold the folks who've been burning the midnight oil (and their shoe soles)!
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {RUNNERS.map((runner, idx) => (
              <motion.div
                key={runner.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
                className="group cursor-help"
              >
                <div className="wobbly-border-thin bg-white p-5 h-full flex flex-col transition-all group-hover:bg-vintage-black group-hover:text-vintage-offwhite">
                  <div className="flex justify-between items-start mb-4">
                    <span className="font-cartoon font-black text-3xl">#{runner.id}</span>
                    <Trophy className={cn("w-6 h-6", "fill-current")} />
                  </div>
                  <h3 className="font-cartoon font-black text-2xl uppercase leading-none mb-2 group-hover:line-through">
                    {runner.name}
                  </h3>
                  <p className="font-cartoon text-sm opacity-70 mb-2 flex-grow">
                    {runner.bio}
                  </p>
                </div>
              </motion.div>
            ))}

            {/* "You?" Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="group"
            >
              <a href="#registration" className="block h-full">
                <div className="wobbly-border-thin bg-accent text-white p-5 h-full flex flex-col items-center justify-center text-center transition-all hover:bg-vintage-black hover:text-vintage-offwhite">
                  <Users className="w-12 h-12 mb-4 animate-bounce-squash" />
                  <h3 className="font-cartoon font-black text-4xl uppercase mb-2">You?</h3>
                  <p className="font-cartoon font-bold uppercase">Join the challenge!</p>
                </div>
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA / Footer */}
      <footer id="join" className="py-32 px-6 bg-vintage-black text-vintage-offwhite text-center relative overflow-hidden border-t-[6px] border-vintage-black">
        {/* Animated Background Text */}
        <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none select-none">
          <span className="text-[20rem] font-black uppercase whitespace-nowrap animate-wobble-slow">
            APRIL 100
          </span>
        </div>

        <div className="max-w-4xl mx-auto relative z-10">
          <h2 className="text-6xl md:text-9xl font-cartoon font-black uppercase mb-8 leading-none italic">
            Ready to <br /> Rattle Your <br /> Bones?
          </h2>
          <p className="text-xl md:text-3xl font-cartoon font-bold mb-12 opacity-80">
            Join the Arbyte Running Club and get your exclusive april 100 Challenge badge. 
            No wallflowers allowed!
          </p>
          <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
            <a 
              href="https://www.strava.com/clubs/arbyte"
              target="_blank"
              rel="noopener noreferrer"
              className="wobbly-border bg-vintage-offwhite text-vintage-black px-12 py-6 text-3xl font-cartoon font-black uppercase shadow-[8px_8px_0px_0px_rgba(255,255,255,0.2)] hover:shadow-none transition-shadow inline-block"
            >
              Join the Club
            </a>
            <a 
              href="mailto:prabin.p@arbyte.com.np"
              className="font-cartoon font-black text-2xl uppercase underline underline-offset-8 hover:no-underline"
            >
              Contact Us
            </a>
          </div>

          <div className="mt-32 pt-16 border-t border-vintage-offwhite/20 flex flex-col md:flex-row justify-between items-center gap-8 opacity-50">
            <div className="flex items-center gap-2">
              <Zap className="w-6 h-6" />
              <span className="font-cartoon text-xl font-bold tracking-tighter uppercase italic">april 100</span>
            </div>
            <p className="font-cartoon font-bold">© 2026 april 100. All rights reserved.</p>
            <div className="flex gap-6 font-cartoon font-bold uppercase">
              <a 
                href="https://www.strava.com/clubs/arbyte" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:line-through"
              >
                Strava
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
