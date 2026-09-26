import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Map as MapIcon, Crosshair } from 'lucide-react';
import { Link } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, useMapEvents, Polyline } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import PanoramaViewer from '../components/PanoramaViewer';
import { allLocations } from '../data/locations';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

const targetIcon = L.divIcon({
    className: 'custom-target-icon',
    html: `<div style="background-color: #6be140; width: 16px; height: 16px; border-radius: 50%; border: 2px solid white; box-shadow: 0 0 10px #6be140;"></div>`,
    iconSize: [16, 16],
    iconAnchor: [8, 8]
});

// Définition du nombre de manches par partie (standard GeoGuessr)
const ROUNDS_PER_GAME = 5;

function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371e3;
    const p1 = lat1 * Math.PI / 180;
    const p2 = lat2 * Math.PI / 180;
    const dp = (lat2 - lat1) * Math.PI / 180;
    const dl = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dp / 2) * Math.sin(dp / 2) + Math.cos(p1) * Math.cos(p2) * Math.sin(dl / 2) * Math.sin(dl / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
}

const shuffleArray = (array) => {
    const newArr = [...array];
    for (let i = newArr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
    }
    return newArr;
};

export default function IutGuessr() {
    const [gameState, setGameState] = useState('MENU');
    const [pseudo, setPseudo] = useState('');
    const [round, setRound] = useState(1);
    const [score, setScore] = useState(0);
    const [timeLeft, setTimeLeft] = useState(30);
    const [guessPosition, setGuessPosition] = useState(null);
    const [hasGuessed, setHasGuessed] = useState(false);
    const [roundDistance, setRoundDistance] = useState(0);
    const [roundScore, setRoundScore] = useState(0);
    const [gameLocations, setGameLocations] = useState([]);

    function LocationMarker() {
        useMapEvents({
            click(e) {
                if (!hasGuessed && gameState === 'PLAYING') {
                    setGuessPosition(e.latlng);
                }
            },
        });
        return guessPosition === null ? null : <Marker position={guessPosition}></Marker>;
    }

    const startSolo = () => {
        if (!pseudo) setPseudo('Joueur');

        // Sélectionne N manches aléatoires parmi TOUTES les locations
        const randomizedLocations = shuffleArray(allLocations);
        setGameLocations(randomizedLocations.slice(0, ROUNDS_PER_GAME));

        setGameState('PLAYING');
        setRound(1);
        setScore(0);
        resetRound();
    };

    const resetRound = () => {
        setHasGuessed(false);
        setGuessPosition(null);
        setTimeLeft(30);
        setRoundDistance(0);
        setRoundScore(0);
    };

    useEffect(() => {
        if (gameState === 'PLAYING' && !hasGuessed && timeLeft > 0) {
            const timerId = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
            return () => clearTimeout(timerId);
        } else if (timeLeft === 0 && !hasGuessed && gameState === 'PLAYING') {
            handleValidation();
        }
    }, [timeLeft, gameState, hasGuessed]);

    const handleValidation = () => {
        setHasGuessed(true);
        const currentLocation = gameLocations[round - 1];
        let pts = 0;

        if (guessPosition) {
            const dist = calculateDistance(guessPosition.lat, guessPosition.lng, currentLocation.lat, currentLocation.lng);
            setRoundDistance(Math.round(dist));

            if (dist <= 5) {
                pts = 5000;
            } else if (dist > 300) {
                pts = 0;
            } else {
                pts = Math.max(0, Math.round(5000 * (1 - (dist / 300))));
            }
        } else {
            setRoundDistance("Temps écoulé");
        }

        setRoundScore(pts);
        setScore(prev => prev + pts);
        setGameState('RESULT');
    };

    const handleNext = () => {
        if (round < gameLocations.length) {
            setRound(prev => prev + 1);
            resetRound();
            setGameState('PLAYING');
        } else {
            setGameState('END');
        }
    };

    return (
        <div className="fixed inset-0 z-[100] bg-[#0b0b0e] text-white flex flex-col items-center justify-center overflow-hidden font-sans select-none">
            <Link to="/jeux" className="absolute top-6 left-6 z-50 flex items-center gap-2 glass-card px-4 py-2 hover:border-accentPink/50 transition-colors">
                <ArrowLeft size={16} /> <span className="font-mono text-sm">Quitter</span>
            </Link>

            <AnimatePresence mode="wait">
                {gameState === 'MENU' && (
                    <motion.div
                        key="menu"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="flex flex-col items-center z-10 w-full max-w-md px-4"
                    >
                        <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-[#161b22] border border-[#30363d] w-fit mb-6 shadow-lg shadow-purple-500/10">
                            <MapIcon size={14} className="text-purple-400" />
                            <span className="text-gray-300 font-mono text-xs uppercase tracking-widest">Campus Montpellier</span>
                        </div>
                        <h1 className="text-6xl font-bold tracking-tighter mb-2 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-accentPink">IUT Guessr</h1>
                        <p className="text-gray-400 mb-12 text-center">Un portage React / Leaflet optimisé.</p>

                        <div className="glass-card w-full p-8 flex flex-col gap-6">
                            <div>
                                <label className="block text-xs font-mono text-gray-500 uppercase tracking-wider mb-2">Identifiant</label>
                                <input
                                    type="text"
                                    placeholder="Entrez votre pseudo"
                                    maxLength="12"
                                    value={pseudo}
                                    onChange={(e) => setPseudo(e.target.value)}
                                    className="w-full bg-[#0d1117] border border-[#30363d] p-4 rounded-lg text-white font-mono outline-none focus:border-purple-500 transition-colors"
                                />
                            </div>
                            <button
                                onClick={startSolo}
                                className="w-full p-4 rounded-lg bg-white text-black font-bold uppercase tracking-wider hover:bg-purple-400 hover:text-white transition-all flex items-center justify-center gap-2 group"
                            >
                                <Crosshair size={18} className="group-hover:scale-110 transition-transform" /> Jouer en Solo
                            </button>
                        </div>
                    </motion.div>
                )}

                {gameState === 'PLAYING' && (
                    <motion.div key="game" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute inset-0 w-full h-full">
                        <div className="absolute inset-0 w-full h-full bg-black z-0">
                            <PanoramaViewer image={gameLocations[round - 1].image} />
                        </div>

                        <div className="absolute top-6 left-1/2 -translate-x-1/2 z-40 glass-card px-6 py-3 flex items-center gap-8">
                            <div className="flex flex-col items-center">
                                <span className="text-[10px] uppercase font-mono text-gray-500 tracking-widest">Manche</span>
                                <span className="font-bold text-lg">{round} <span className="text-gray-500 text-sm">/ {gameLocations.length}</span></span>
                            </div>
                            <div className="w-px h-8 bg-[#30363d]"></div>
                            <div className="flex flex-col items-center">
                                <span className="text-[10px] uppercase font-mono text-gray-500 tracking-widest">Score</span>
                                <span className="font-bold text-lg text-accentGreen">{score}</span>
                            </div>
                            <div className="w-px h-8 bg-[#30363d]"></div>
                            <div className="flex flex-col items-center">
                                <span className="text-[10px] uppercase font-mono text-gray-500 tracking-widest">Temps</span>
                                <span className={`font-mono text-xl font-bold ${timeLeft <= 5 ? 'text-accentPink' : 'text-white'}`}>0:{timeLeft < 10 ? `0${timeLeft}` : timeLeft}</span>
                            </div>
                        </div>

                        <div className="absolute bottom-6 right-6 z-40 w-[320px] h-[240px] hover:w-[600px] hover:h-[450px] transition-all duration-300 ease-[cubic-bezier(0.25,1,0.5,1)] glass-card p-2 rounded-2xl overflow-hidden flex flex-col group">
                            <div className="w-full flex-grow rounded-xl overflow-hidden relative">
                                <MapContainer center={[43.6360, 3.8520]} zoom={17} zoomControl={false} style={{ height: '100%', width: '100%' }}>
                                    <TileLayer attribution='&copy; OSM' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                                    <LocationMarker />
                                </MapContainer>
                            </div>
                            <div className="h-0 group-hover:h-auto overflow-hidden transition-all duration-300">
                                <button
                                    onClick={handleValidation}
                                    disabled={!guessPosition || hasGuessed}
                                    className={`w-full mt-2 p-3 rounded-xl font-bold uppercase tracking-wider transition-colors ${guessPosition && !hasGuessed ? 'bg-accentGreen text-black hover:bg-emerald-400' : 'bg-[#161b22] text-gray-500 cursor-not-allowed'}`}
                                >
                                    Valider le point
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}

                {gameState === 'RESULT' && (
                    <motion.div key="result" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="w-full h-full flex flex-col items-center justify-center p-8 z-40">
                        <h2 className="text-4xl font-bold mb-2">Manche {round} terminée</h2>
                        <p className="text-gray-400 font-mono mb-8">Distance : <span className="text-accentPink">{typeof roundDistance === 'number' ? `${roundDistance} m` : roundDistance}</span> | Points : <span className="text-accentGreen">{roundScore}</span></p>

                        <div className="w-full max-w-4xl h-[50vh] glass-card rounded-2xl overflow-hidden mb-8 relative">
                            <MapContainer center={[43.6360, 3.8520]} zoom={16} zoomControl={false} style={{ height: '100%', width: '100%' }}>
                                <TileLayer attribution='&copy; OSM' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                                <Marker position={[gameLocations[round - 1].lat, gameLocations[round - 1].lng]} icon={targetIcon} />
                                {guessPosition && (
                                    <>
                                        <Marker position={guessPosition} />
                                        <Polyline
                                            positions={[[gameLocations[round - 1].lat, gameLocations[round - 1].lng], guessPosition]}
                                            pathOptions={{ color: '#eb77ba', dashArray: '5, 10', weight: 3 }}
                                        />
                                    </>
                                )}
                            </MapContainer>
                        </div>

                        <button onClick={handleNext} className="px-8 py-4 rounded-lg bg-white text-black font-bold uppercase tracking-wider hover:bg-accentGreen transition-all">
                            {round < gameLocations.length ? 'Manche suivante' : 'Voir les résultats'}
                        </button>
                    </motion.div>
                )}

                {gameState === 'END' && (
                    <motion.div key="end" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col items-center z-10 w-full max-w-md px-4 glass-card py-12">
                        <h2 className="text-5xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-accentGreen to-emerald-400">Terminé !</h2>
                        <p className="text-gray-400 font-mono mb-8">Score final de {pseudo}</p>
                        <div className="text-6xl font-bold text-white mb-12">{score} <span className="text-xl text-gray-500">/ {gameLocations.length * 5000}</span></div>

                        <button onClick={() => setGameState('MENU')} className="w-full p-4 rounded-lg bg-[#161b22] border border-[#30363d] text-white font-bold uppercase tracking-wider hover:border-accentPink transition-colors">
                            Rejouer
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}