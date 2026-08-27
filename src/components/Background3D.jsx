import { Canvas } from '@react-three/fiber';
import { Float } from '@react-three/drei';

export default function Background3D() {
  return (
    <div className="fixed top-0 left-0 w-full h-full -z-10 bg-background">
      <Canvas camera={{ position: [0, 0, 15], fov: 45 }}>
        {/* Éclairage d'ambiance */}
        <ambientLight intensity={0.5} />
        {/* Éclairage directionnel (vert néon) */}
        <directionalLight position={[10, 10, 5]} intensity={2} color="#6be140" />
        {/* Éclairage directionnel (rose) */}
        <directionalLight position={[-10, -10, 5]} intensity={2} color="#eb77ba" />

        {/* L'objet 3D flottant */}
        <Float
          speed={1.5} // Vitesse de l'animation
          rotationIntensity={2} // Amplitude de la rotation
          floatIntensity={2} // Amplitude du mouvement de haut en bas
        >
          <mesh rotation={[0.5, 0.5, 0]}>
            {/* Noeud torique) */}
            <torusKnotGeometry args={[5, 1.5, 128, 32]} />
            {/* Le matériau : fil de fer violet qui réagit aux lumières */}
            <meshStandardMaterial
              color="#eb77ba"
              wireframe={true}
              transparent
              opacity={0.3}
            />
          </mesh>
        </Float>
      </Canvas>
    </div>
  );
}
