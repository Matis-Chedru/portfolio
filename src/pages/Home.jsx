import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Terminal, Camera, Gamepad2, ArrowRight } from 'lucide-react';

export default function Home() {
    return (
        <div className="w-full max-w-6xl mt-20 md:mt-32 pb-32 flex flex-col gap-24">

            <motion.section
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="flex flex-col gap-8 relative z-10"
            >
                <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-[#161b22] border border-[#30363d] w-fit shadow-lg shadow-accentGreen/5">
                    <span className="w-2.5 h-2.5 rounded-full bg-accentGreen animate-pulse"></span>
                    <span className="text-gray-300 font-mono text-xs uppercase tracking-widest">
            Recherche Stage / Alternance (2026-2027)
          </span>
                </div>

                <h1 className="text-6xl md:text-8xl font-bold tracking-tighter text-white leading-tight">
                    Matis Chedru.<br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-accentPink to-purple-500">
            Développeur Logiciel.
          </span>
                </h1>

                <p className="max-w-2xl text-gray-400 text-lg md:text-xl leading-relaxed mt-2">
                    Étudiant en BUT Informatique (Parcours RACDV) à Montpellier. Passionné par la conception logicielle, l'optimisation des performances et la résolution de bugs complexes.
                </p>

                <div className="flex flex-wrap gap-4 mt-4">
                    <Link to="/projets" className="px-7 py-3.5 bg-white text-black font-semibold rounded-full hover:scale-105 transition-transform duration-300 flex items-center gap-2">
                        Explorer les projets <ArrowRight size={18} />
                    </Link>
                    <a href="https://github.com/Matis-Chedru" target="_blank" rel="noreferrer" className="px-7 py-3.5 bg-[#161b22] text-white font-semibold rounded-full hover:bg-[#30363d] border border-[#30363d] transition-colors duration-300 flex items-center gap-2">
                        GitHub
                    </a>
                </div>
            </motion.section>

            <section className="grid grid-cols-1 md:grid-cols-3 gap-6">

                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.5 }}>
                    <Link to="/projets" className="glass-card p-8 flex flex-col h-full group cursor-pointer hover:border-accentGreen/50 transition-colors">
                        <Terminal className="text-accentGreen mb-6" size={32} />
                        <h2 className="text-2xl font-bold text-white mb-2">Code</h2>
                        <p className="text-gray-400 text-sm">Architecture logicielle, scripts bash, et environnements de développement.</p>
                    </Link>
                </motion.div>

                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.5 }}>
                    <Link to="/photographie" className="glass-card p-8 flex flex-col h-full group cursor-pointer hover:border-accentPink/50 transition-colors">
                        <Camera className="text-accentPink mb-6" size={32} />
                        <h2 className="text-2xl font-bold text-white mb-2">Photographie</h2>
                        <p className="text-gray-400 text-sm">Argentique 35mm, développement et expérimentations visuelles.</p>
                    </Link>
                </motion.div>

                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.5 }}>
                    <Link to="/jeux" className="glass-card p-8 flex flex-col h-full group cursor-pointer hover:border-purple-500/50 transition-colors">
                        <Gamepad2 className="text-purple-500 mb-6" size={32} />
                        <h2 className="text-2xl font-bold text-white mb-2">Sandbox</h2>
                        <p className="text-gray-400 text-sm">Bac à sable interactif, IUT Guessr et mini-jeux expérimentaux.</p>
                    </Link>
                </motion.div>

            </section>
        </div>
    );
}