import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RefreshCw, User, Cpu, Trophy, Share2, Info } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

// --- Utilities ---
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// --- Types ---
type Player = 'X' | 'O' | null;

const WINNING_COMBINATIONS = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
  [0, 4, 8], [2, 4, 6]             // Diagonals
];

// --- Components ---

const Square = ({ 
  value, 
  onClick, 
  isWinningSquare, 
  index 
}: { 
  value: Player; 
  onClick: () => void; 
  isWinningSquare: boolean;
  index: number;
}) => {
  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.05, duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
      whileHover={{ backgroundColor: 'rgba(248, 250, 252, 1)' }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={cn(
        "relative h-24 w-24 sm:h-32 sm:w-32 flex items-center justify-center border-[0.5px] border-slate-200 transition-colors duration-300",
        isWinningSquare && "bg-blue-50/50",
        index % 3 === 0 && "border-l-0",
        index % 3 === 2 && "border-r-0",
        index < 3 && "border-t-0",
        index > 5 && "border-b-0"
      )}
    >
      <AnimatePresence mode="wait">
        {value === 'X' && (
          <motion.svg
            key="X"
            viewBox="0 0 100 100"
            className="w-12 h-12 sm:w-16 sm:h-16 stroke-text"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          >
            <motion.path
              d="M 25 25 L 75 75 M 75 25 L 25 75"
              fill="transparent"
              strokeWidth="6"
              strokeLinecap="round"
            />
          </motion.svg>
        )}
        {value === 'O' && (
          <motion.svg
            key="O"
            viewBox="0 0 100 100"
            className="w-12 h-12 sm:w-16 sm:h-16 stroke-accent"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          >
            <motion.circle
              cx="50"
              cy="50"
              r="25"
              fill="transparent"
              strokeWidth="6"
              strokeLinecap="round"
            />
          </motion.svg>
        )}
      </AnimatePresence>
    </motion.button>
  );
};

export default function App() {
  const [board, setBoard] = useState<Player[]>(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [winner, setWinner] = useState<Player | 'draw'>(null);
  const [winningLine, setWinningLine] = useState<number[] | null>(null);
  const [scores, setScores] = useState({ X: 0, O: 0 });
  const [gameMode, setGameMode] = useState<'PvP' | 'PvE'>('PvP');

  const checkWinner = (squares: Player[]) => {
    for (let i = 0; i < WINNING_COMBINATIONS.length; i++) {
      const [a, b, c] = WINNING_COMBINATIONS[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return { winner: squares[a], line: [a, b, c] };
      }
    }
    if (squares.every(s => s !== null)) return { winner: 'draw' as const, line: null };
    return null;
  };

  const handleClick = (index: number) => {
    if (board[index] || winner) return;

    const newBoard = [...board];
    newBoard[index] = isXNext ? 'X' : 'O';
    setBoard(newBoard);
    setIsXNext(!isXNext);

    const result = checkWinner(newBoard);
    if (result) {
      if (result.winner !== 'draw') {
        setWinner(result.winner);
        setWinningLine(result.line);
        setScores(prev => ({ ...prev, [result.winner as 'X' | 'O']: prev[result.winner as 'X' | 'O'] + 1 }));
      } else {
        setWinner('draw');
      }
    }
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
    setWinner(null);
    setWinningLine(null);
  };

  // Simple AI for PvE
  useEffect(() => {
    if (gameMode === 'PvE' && !isXNext && !winner) {
      const timer = setTimeout(() => {
        const availableMoves = board.map((v, i) => v === null ? i : null).filter(v => v !== null) as number[];
        if (availableMoves.length > 0) {
          const randomMove = availableMoves[Math.floor(Math.random() * availableMoves.length)];
          handleClick(randomMove);
        }
      }, 600);
      return () => clearTimeout(timer);
    }
  }, [isXNext, gameMode, winner, board]);

  return (
    <div className="min-h-screen bg-background flex flex-col items-center selection:bg-accent/10">
      {/* Header / Brand */}
      <header className="w-full max-w-7xl px-6 py-8 flex justify-between items-center border-b border-slate-100">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-2"
        >
          <div className="w-8 h-8 bg-text flex items-center justify-center rounded-sm">
            <span className="text-white font-bold text-xs uppercase tracking-tighter">TT</span>
          </div>
          <h1 className="text-xl font-medium tracking-tight text-text">tic tac</h1>
        </motion.div>
        
        <nav className="flex items-center gap-6">
          <button 
            onClick={() => setGameMode(prev => prev === 'PvP' ? 'PvE' : 'PvP')}
            className="text-sm font-medium text-slate-500 hover:text-text transition-colors flex items-center gap-2"
          >
            {gameMode === 'PvP' ? <User className="w-4 h-4" /> : <Cpu className="w-4 h-4" />}
            {gameMode}
          </button>
          <button className="p-2 text-slate-400 hover:text-text transition-colors">
            <Share2 className="w-5 h-5" />
          </button>
        </nav>
      </header>

      <main className="flex-1 w-full max-w-7xl px-6 flex flex-col items-center justify-center py-12 md:py-24">
        
        {/* Game State Indicator */}
        <div className="mb-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-center gap-8 mb-4"
          >
            <div className={cn("transition-all duration-300", isXNext && !winner ? "scale-110 opacity-100" : "scale-100 opacity-40")}>
              <p className="text-[10px] uppercase tracking-widest font-bold text-slate-400 mb-1">Player X</p>
              <div className="text-2xl font-semibold text-text">{scores.X}</div>
            </div>
            <div className="h-8 w-[1px] bg-slate-200" />
            <div className={cn("transition-all duration-300", !isXNext && !winner ? "scale-110 opacity-100" : "scale-100 opacity-40")}>
              <p className="text-[10px] uppercase tracking-widest font-bold text-slate-400 mb-1">Player O</p>
              <div className="text-2xl font-semibold text-accent">{scores.O}</div>
            </div>
          </motion.div>
          
          <AnimatePresence mode="wait">
            {winner ? (
              <motion.div
                key="winner"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="inline-flex items-center gap-3 px-4 py-2 bg-surface rounded-full border border-slate-200"
              >
                <Trophy className="w-4 h-4 text-amber-500" />
                <span className="text-sm font-semibold text-text uppercase tracking-wider">
                  {winner === 'draw' ? "It's a draw" : `Player ${winner} wins`}
                </span>
              </motion.div>
            ) : (
              <motion.div
                key="turn"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-xs text-slate-400 uppercase tracking-widest font-medium"
              >
                {isXNext ? "X's Turn" : "O's Turn"}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* The Board */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
          className="grid grid-cols-3 bg-white"
        >
          {board.map((square, i) => (
            <Square
              key={i}
              index={i}
              value={square}
              onClick={() => handleClick(i)}
              isWinningSquare={winningLine?.includes(i) || false}
            />
          ))}
        </motion.div>

        {/* Controls */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-16 flex items-center gap-4"
        >
          <button
            onClick={resetGame}
            className="group flex items-center gap-3 px-8 py-3 bg-text text-white rounded-full hover:bg-text/90 transition-all active:scale-95"
          >
            <RefreshCw className="w-4 h-4 group-hover:rotate-180 transition-transform duration-500" />
            <span className="text-sm font-medium tracking-wide">Reset Arena</span>
          </button>
        </motion.div>
      </main>

      {/* Footer / Context */}
      <footer className="w-full max-w-7xl px-6 py-12 border-t border-slate-100 mt-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-start">
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-text flex items-center gap-2">
              <Info className="w-4 h-4" />
              Philosophy
            </h3>
            <p className="text-sm text-slate-500 leading-relaxed max-w-xs">
              Tic Tac is a study in precision and restraint. Every move is a choice, every square a canvas for strategy.
            </p>
          </div>
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-text">Play Modes</h3>
            <ul className="text-sm text-slate-500 space-y-2">
              <li>Local Multiplayer (PvP)</li>
              <li>Neural Challenger (PvE)</li>
              <li>Global Matches (Coming Soon)</li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-text">Legacy</h3>
            <p className="text-xs text-slate-400 font-mono">
              v1.0.0-STABLE<br />
              BUILT FOR PERFORMANCE<br />
              DESIGNED FOR CLARITY
            </p>
          </div>
        </div>
        <div className="mt-12 flex justify-between items-center text-[10px] text-slate-400 uppercase tracking-[0.2em] font-medium">
          <span>© 2026 Tic Tac Collective</span>
          <span>Digital Excellence</span>
        </div>
      </footer>
    </div>
  );
}
