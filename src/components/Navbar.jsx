export default function Navbar() {
  return (
    <nav className="fixed top-0 w-full z-50 glass-card rounded-none border-t-0 border-x-0 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <div className="font-mono text-xl font-bold text-accentPink">
          Matis<span className="text-accentGreen">_</span>
        </div>

        {/* Ce menu est masqué sur mobile (hidden) et s'affiche en ligne (flex) sur écran moyen (md) */}
        <ul className="hidden md:flex space-x-8 text-sm font-mono text-gray-400">
          <li className="hover:text-accentGreen cursor-pointer transition-colors">/projets</li>
          <li className="hover:text-accentGreen cursor-pointer transition-colors">/photographie</li>
          <li className="hover:text-accentGreen cursor-pointer transition-colors">/jeux</li>
        </ul>
      </div>
    </nav>
  );
}
