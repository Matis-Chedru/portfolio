import { motion } from 'framer-motion';
import ProjectCard from '../components/ProjectCard';

const projectsData = [
  {
    id: 1,
    title: "Dominion Seaside",
    category: "SAÉ 2.01 - IUT",
    description: "Moteur de jeu de plateau et architecture distribuée client-serveur communiquant par WebSockets avec interface riche en JavaFX.",
    tags: ["Java 21", "JavaFX", "MVC", "Tyrus"]
  },
  {
    id: 2,
    title: "Blackjack Engine",
    category: "Projet Algorithmique",
    description: "Moteur de casino complet intégrant une intelligence artificielle probabiliste basée sur le calcul rigoureux de 100 000 simulations Monte-Carlo.",
    tags: ["Java 17", "OOP", "IA", "Monte-Carlo"]
  },
  {
    id: 3,
    title: "Le Village",
    category: "Nuit de l'Info 2025",
    description: "Application web gamifiée développée en équipe de nuit sous forte contrainte de temps.",
    tags: ["Next.js", "Docker", "UI/UX"]
  },
  {
    id: 4,
    title: "Horror DJ Manager",
    category: "Code Game Jam 2026",
    description: "Jeu 2D de gestion horrifique développé au sein d'une équipe de 8 personnes avec le moteur Godot.",
    tags: ["Godot", "GDScript", "Game Design"]
  }
];

export default function Projects() {
  return (
      <div className="w-full max-w-6xl mt-32 pb-32">
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-16 border-l-4 border-accentGreen pl-6"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Dépôts & Projets</h1>
          <p className="text-gray-400 font-mono text-sm md:text-base">
            ~/portfolio/dev/projets $ ls -la
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projectsData.map((project, index) => (
              <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.15 }}
              >
                <ProjectCard
                    title={project.title}
                    category={project.category}
                    description={project.description}
                    tags={project.tags}
                />
              </motion.div>
          ))}
        </div>
      </div>
  );
}