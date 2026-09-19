export default function ProjectCard({ title, category, description, tags }) {
    return (
        <div className="glass-card p-8 flex flex-col h-full relative overflow-hidden group cursor-pointer transition-all duration-300 hover:-translate-y-2 hover:border-accentPink/50 hover:shadow-[0_0_30px_rgba(235,119,186,0.15)]">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-accentGreen to-accentPink opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

            <div className="mb-6">
                <span className="text-accentGreen font-mono text-xs uppercase tracking-widest">{category}</span>
                <h3 className="text-2xl font-bold text-white mt-2 group-hover:text-accentPink transition-colors">{title}</h3>
            </div>

            <p className="text-gray-400 text-sm md:text-base flex-grow mb-8 leading-relaxed">
                {description}
            </p>

            <div className="flex flex-wrap gap-2 mt-auto">
                {tags.map((tag, index) => (
                    <span key={index} className="px-3 py-1 bg-[#161b22] border border-[#30363d] rounded-full text-xs font-mono text-gray-300 group-hover:border-accentGreen/40 transition-colors">
            {tag}
          </span>
                ))}
            </div>
        </div>
    );
}