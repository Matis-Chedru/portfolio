import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="fixed top-0 w-full z-50 glass-card rounded-none border-t-0 border-x-0 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="font-mono text-xl font-bold text-accentPink">
          Matis<span className="text-accentGreen">_</span>
        </Link>

        <ul className="hidden md:flex space-x-8 text-sm font-mono text-gray-400">
          <li><Link to="/projets" className="hover:text-accentGreen transition-colors">/projets</Link></li>
          <li><Link to="/photographie" className="hover:text-accentGreen transition-colors">/photographie</Link></li>
          <li><Link to="/jeux" className="hover:text-accentGreen transition-colors">/jeux</Link></li>
        </ul>
      </div>
    </nav>
  );
}
