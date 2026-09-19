import { Canvas } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import { useLocation } from 'react-router-dom';

export default function Background3D() {
  const location = useLocation();

  // Si l'utilisateur est sur la page photographie, on ne rend rien (null)
  if (location.pathname === '/photographie') {
    return null;
  }

  return (
      <div className="fixed top-0 left-0 w-full h-full -z-10 bg-[#0b0b0e]">
        <Canvas camera={{ position: [0, 0, 15], fov: 45 }}>
          {/* Éclairage d'ambiance */}
          <ambientLight intensity={0.5} />

          {/* Éclairage directionnel (vert néon) */}
          <directionalLight position={[10, 10, 5]} intensity={2} color="#6be140" />

          {/* Éclairage directionnel (rose) */}
          <directionalLight position={[-10, -10, 5]} intensity={2} color="#eb77ba" />

          {/* L'objet 3D flottant */}
          <Float
              speed={1.5}
              rotationIntensity={2}
              floatIntensity={2}
          >
            <mesh rotation={[0.5, 0.5, 0]}>
              <torusKnotGeometry args={[5, 1.5, 128, 32]} />
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