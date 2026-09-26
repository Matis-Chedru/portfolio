import { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import * as THREE from 'three';

const PARTICLE_COUNT = 450;
const BOUNDS = 18;
const COLORS = ['#6be140', '#eb77ba', '#8b5cf6', '#ffffff']; // Vert, Rose, Violet, Blanc

function Particles() {
    const meshRef = useRef(null);
    const dummy = useMemo(() => new THREE.Object3D(), []);
    const color = new THREE.Color();
    const { viewport, pointer } = useThree();

    // Initialisation des données physiques
    const particles = useMemo(() => {
        const temp = [];
        for (let i = 0; i < PARTICLE_COUNT; i++) {
            temp.push({
                position: new THREE.Vector3(
                    (Math.random() - 0.5) * BOUNDS,
                    (Math.random() - 0.5) * BOUNDS,
                    (Math.random() - 0.5) * 6 // Ajout de profondeur Z
                ),
                velocity: new THREE.Vector3(
                    (Math.random() - 0.5) * 0.05,
                    (Math.random() - 0.5) * 0.05,
                    (Math.random() - 0.5) * 0.05
                ),
                baseColor: COLORS[Math.floor(Math.random() * COLORS.length)],
                radius: Math.random() * 0.08 + 0.03
            });
        }
        return temp;
    }, []);

    // Application des couleurs par instance (optimisation GPU)
    useEffect(() => {
        if (!meshRef.current) return;
        particles.forEach((p, i) => {
            color.set(p.baseColor);
            meshRef.current.setColorAt(i, color);
        });
        meshRef.current.instanceColor.needsUpdate = true;
    }, [particles]);

    // Boucle de rendu et calculs physiques
    useFrame(() => {
        if (!meshRef.current) return;

        // Conversion de la souris 2D (-1 à 1) vers les coordonnées 3D de la scène
        const mouseX = (pointer.x * viewport.width) / 2;
        const mouseY = (pointer.y * viewport.height) / 2;
        const mousePos = new THREE.Vector3(mouseX, mouseY, 0);

        particles.forEach((particle, i) => {
            // 1. Déplacement
            particle.position.add(particle.velocity);

            // 2. Rebond sur les limites 3D
            if (particle.position.x > BOUNDS / 2 || particle.position.x < -BOUNDS / 2) particle.velocity.x *= -1;
            if (particle.position.y > BOUNDS / 2 || particle.position.y < -BOUNDS / 2) particle.velocity.y *= -1;
            if (particle.position.z > 3 || particle.position.z < -3) particle.velocity.z *= -1;

            // 3. Algorithme de répulsion magnétique (Souris)
            const distToMouse = particle.position.distanceTo(mousePos);
            if (distToMouse < 4) {
                // Calcule la direction opposée à la souris
                const force = new THREE.Vector3().subVectors(particle.position, mousePos).normalize();
                // Plus la particule est proche, plus la force est violente
                const strength = (4 - distToMouse) * 0.015;
                particle.velocity.add(force.multiplyScalar(strength));
            }

            // 4. Friction (Empêche les particules de devenir incontrôlables)
            particle.velocity.clampLength(0, 0.12);

            // 5. Mise à jour de la matrice GPU
            dummy.position.copy(particle.position);
            dummy.scale.set(particle.radius, particle.radius, particle.radius);
            dummy.updateMatrix();
            meshRef.current.setMatrixAt(i, dummy.matrix);
        });

        meshRef.current.instanceMatrix.needsUpdate = true;
    });

    return (
        <instancedMesh ref={meshRef} args={[null, null, PARTICLE_COUNT]}>
            <sphereGeometry args={[1, 16, 16]} />
            <meshPhysicalMaterial
                roughness={0.2}
                metalness={0.8}
                transmission={0.5}
                emissive="#1a1a1a"
                emissiveIntensity={0.5}
            />
        </instancedMesh>
    );
}

export default function ParticlesSim() {
    return (
        <div className="fixed inset-0 z-[100] bg-[#0b0b0e] text-white flex flex-col items-center justify-center overflow-hidden font-sans select-none">
            <Link to="/jeux" className="absolute top-6 left-6 z-50 flex items-center gap-2 glass-card px-4 py-2 hover:border-accentPink/50 transition-colors">
                <ArrowLeft size={16} /> <span className="font-mono text-sm">Quitter</span>
            </Link>

            <div className="absolute inset-0 w-full h-full">
                <Canvas camera={{ position: [0, 0, 12], fov: 60 }}>
                    <ambientLight intensity={0.4} />
                    <directionalLight position={[10, 10, 5]} intensity={2} color="#6be140" />
                    <directionalLight position={[-10, -10, 5]} intensity={2} color="#eb77ba" />
                    <Particles />
                </Canvas>
            </div>
        </div>
    );
}