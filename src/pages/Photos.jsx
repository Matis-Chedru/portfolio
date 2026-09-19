import { motion } from 'framer-motion';

// Remplace les "src" par le nom exact des fichiers que tu as mis dans public/photos/
const photoData = [
    { id: 1, title: "Paragliding Sky", camera: "Nikon D5300 (140mm • f/5.6 • 1/250s • ISO 100)", format: "Numérique", src: "/photos/paragliding-sky.webp" },
    { id: 2, title: "Paragliding Sunset", camera: "Nikon D5300 (140mm • f/5.6 • 1/180s • ISO 100)", format: "Numérique", src: "/photos/paragliding-sunset.webp" },
    { id: 3, title: "Golden Horizon", camera: "Nikon D5300 (140mm • f/5.6 • 1/2000s • ISO 100)", format: "Numérique", src: "/photos/golden-horizon.webp" },
    { id: 4, title: "West Coast", camera: "Nikon D5300 (42mm • f/4.5 • 1/250s • ISO 100)", format: "Numérique", src: "/photos/west-coast.webp" },
    { id: 5, title: "Silhouette Branches", camera: "Nikon D5300 (140mm • f/5.6 • 1/125s • ISO 100)", format: "Numérique", src: "/photos/silhouette-branches.webp" },
    { id: 6, title: "Ocean Sun", camera: "Nikon D5300 (140mm • f/11 • 1/500s • ISO 400)", format: "Numérique", src: "/photos/ocean-sun.webp" },
    { id: 7, title: "Hill Dusk", camera: "iPhone 11 (4.25mm • f/1.8 • 1/1200s • ISO 32)", format: "Smartphone", src: "/photos/hill-dusk.webp" },
    { id: 8, title: "Fire Clouds", camera: "Nikon D5300 (140mm • f/5.6 • 1/250s • ISO 110)", format: "Numérique", src: "/photos/fire-clouds.webp" },
    { id: 9, title: "Palm Dusk", camera: "Nikon D5300", format: "Numérique", src: "/photos/palm-dusk.webp" },
    { id: 10, title: "Palm Silhouette", camera: "Nikon D5300", format: "Numérique", src: "/photos/palm-silhouette.webp" },
    { id: 11, title: "Dusk Clouds", camera: "Nikon D5300", format: "Numérique", src: "/photos/dusk-clouds.webp" },
    { id: 12, title: "Palm Twilight", camera: "Nikon D5300", format: "Numérique", src: "/photos/palm-twilight.webp" },
    { id: 13, title: "Whale Surface", camera: "Nikon D5300 (140mm • f/5.6 • 1/1500s • ISO 220)", format: "Numérique", src: "/photos/whale-surface.webp" },
    { id: 14, title: "Sea Turtle Blue", camera: "Nikon D5300 (140mm • f/5.6 • 1/750s • ISO 220)", format: "Numérique", src: "/photos/sea-turtle-blue.webp" },
    { id: 15, title: "Sea Turtle Swim", camera: "Nikon D5300 (140mm • f/5.6 • 1/750s • ISO 200)", format: "Numérique", src: "/photos/sea-turtle-swim.webp" },
    { id: 16, title: "Tropical Bird", camera: "Nikon D5300 (140mm • f/8.0 • 1/1000s • ISO 100)", format: "Numérique", src: "/photos/tropical-bird.webp" },
    { id: 17, title: "Waves Cliff", camera: "Nikon D5300 (140mm • f/5.6 • 1/2000s • ISO 100)", format: "Numérique", src: "/photos/waves-cliff.webp" },
];

export default function Photos() {
    return (
        <div className="w-full max-w-6xl mt-32 pb-32">

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="mb-16 border-l-4 border-accentPink pl-6"
            >
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Chambre Noire</h1>
                <p className="text-gray-400 font-mono text-sm md:text-base">
                    ~/portfolio/art/photographie $ ls -la
                </p>
            </motion.div>

            {/* Remplacement de grid par la technique des colonnes CSS (Masonry) */}
            <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
                {photoData.map((photo, index) => (
                    <motion.div
                        key={photo.id}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        // break-inside-avoid empêche une image d'être coupée entre deux colonnes
                        className="break-inside-avoid relative group overflow-hidden rounded-xl bg-[#161b22] border border-[#30363d] cursor-pointer"
                    >

                        {/* L'image réelle */}
                        <img
                            src={photo.src}
                            alt={photo.title}
                            loading="lazy"
                            className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out"
                        />

                        {/* Volet d'informations au survol */}
                        <div className="absolute inset-0 bg-[#0d1117]/80 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out z-20 flex flex-col justify-end p-6 border-t border-accentPink/30">
                            <h3 className="text-white font-bold text-xl mb-1">{photo.title}</h3>
                            <p className="text-accentPink font-mono text-xs uppercase tracking-widest mb-2">{photo.format}</p>
                            <p className="text-gray-400 text-sm">{photo.camera}</p>
                        </div>

                    </motion.div>
                ))}
            </div>

        </div>
    );
}