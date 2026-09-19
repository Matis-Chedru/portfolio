import { motion } from 'framer-motion';
import { Play } from 'lucide-react';
import { Link } from 'react-router-dom';

const gamesData = [
    {
        id: 1,
        title: "IUT Guessr",
        status: "En développement",
        description: "Saurez-vous retrouver dans quelle salle de l'IUT de Montpellier a été prise cette photo ? Un GeoGuessr local.",
        tags: ["React", "Maps API", "Local Storage"],
        color: "from-purple-500 to-accentPink",
        // Ajout du lien vers la page du jeu
        link: "/jeux/iut-guessr"
    },
    {
        id: 2,
        title: "Générateur de Palettes",
        status: "Concept",
        description: "Un outil pour extraire instantanément les couleurs dominantes d'une image déposée sur la page.",
        tags: ["Canvas API", "Algorithmique"],
        color: "from-accentGreen to-emerald-600",
        link: "#"
    },
    {
        id: 3,
        title: "Simulation Particules",
        status: "Expérience",
        description: "Un moteur physique rudimentaire tournant dans le navigateur pour simuler des collisions.",
        tags: ["WebGL", "Mathématiques"],
        color: "from-blue-500 to-cyan-400",
        link: "#"
    }
];

export default function Sandbox() {
    return (
        <div className="w-full max-w-6xl mt-32 pb-32">

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="mb-16 border-l-4 border-purple-500 pl-6"
            >
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Bac à sable</h1>
                <p className="text-gray-400 font-mono text-sm md:text-base">
                    ~/portfolio/lab/experiments $ ./run_all.sh
                </p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {gamesData.map((game, index) => (
                    <motion.div
                        key={game.id}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: index * 0.15 }}
                        className="glass-card p-8 group relative overflow-hidden flex flex-col justify-between min-h-[250px]"
                    >
                        <div className={`absolute inset-0 bg-gradient-to-br ${game.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500 z-0`}></div>

                        <div className="relative z-10">
                            <div className="flex justify-between items-start mb-4">
                                <h2 className="text-3xl font-bold text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-400 transition-all">
                                    {game.title}
                                </h2>
                                <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs font-mono text-purple-400">
                  {game.status}
                </span>
                            </div>

                            <p className="text-gray-400 text-base mb-6 max-w-md">
                                {game.description}
                            </p>
                        </div>

                        <div className="relative z-10 flex justify-between items-end mt-auto">
                            <div className="flex gap-2">
                                {game.tags.map((tag, i) => (
                                    <span key={i} className="text-xs font-mono text-gray-500">
                    #{tag}
                  </span>
                                ))}
                            </div>

                            {/* Le bouton Play devient un lien de navigation si un lien est fourni */}
                            {game.link !== "#" ? (
                                <Link to={game.link} className="w-12 h-12 rounded-full bg-white text-black flex items-center justify-center opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 hover:scale-110">
                                    <Play size={20} className="ml-1" />
                                </Link>
                            ) : (
                                <button className="w-12 h-12 rounded-full bg-white/50 text-black/50 cursor-not-allowed flex items-center justify-center opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                                    <Play size={20} className="ml-1" />
                                </button>
                            )}
                        </div>

                    </motion.div>
                ))}
            </div>

        </div>
    );
}