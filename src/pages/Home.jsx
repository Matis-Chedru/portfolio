import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="w-full max-w-5xl mt-32 space-y-24 pb-32">

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="glass-card p-8 md:p-12 text-center md:text-left"
      >
        <h1 className="text-5xl md:text-7xl font-bold mb-4 tracking-tight">
          MATIS <span className="text-accentPink">CHEDRU</span>
        </h1>
        <p className="text-accentGreen font-mono text-sm md:text-base mb-6">
          &lt; Ingénierie Logicielle / Photographie / Interactive Design /&gt;
        </p>
        <p className="text-gray-400 max-w-2xl text-lg">
          Bienvenue dans mon espace. J'explore la création d'expériences interactives.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.7 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        <Link to="/projets" className="glass-card p-8 glass-card-hover group cursor-pointer block">
          <h2 className="text-2xl font-bold text-white mb-2 group-hover:text-accentPink transition-colors">Développement</h2>
          <p className="text-gray-400 text-sm">Applications, architectures et outils. Découvrez mes projets techniques.</p>
        </Link>

        <Link to="/photographie" className="glass-card p-8 glass-card-hover group cursor-pointer block">
          <h2 className="text-2xl font-bold text-white mb-2 group-hover:text-accentPink transition-colors">Photographie</h2>
          <p className="text-gray-400 text-sm">Argentique et numérique. Mon regard derrière l'objectif d'un Canon A-1.</p>
        </Link>

        <Link to="/jeux" className="glass-card p-8 glass-card-hover group cursor-pointer block">
          <h2 className="text-2xl font-bold text-white mb-2 group-hover:text-accentPink transition-colors">Mini-Jeux</h2>
          <p className="text-gray-400 text-sm">Expériences web interactives, défis multijoueurs et classements locaux.</p>
        </Link>
      </motion.div>

    </div>
  );
}
