import { Canvas } from '@react-three/fiber';
import { OrbitControls, useTexture } from '@react-three/drei';
import * as THREE from 'three';
import { Suspense } from 'react';

function Sphere({ image }) {
    const texture = useTexture(image);

    return (
        <mesh>
            <sphereGeometry args={[500, 60, 40]} />
            <meshBasicMaterial map={texture} side={THREE.BackSide} />
        </mesh>
    );
}

export default function PanoramaViewer({ image }) {
    return (
        <Canvas camera={{ position: [0, 0, 0.1] }} className="w-full h-full cursor-grab active:cursor-grabbing">
            <OrbitControls
                enableZoom={false}
                enablePan={false}
                rotateSpeed={-0.5}
            />
            <Suspense fallback={null}>
                <Sphere image={image} />
            </Suspense>
        </Canvas>
    );
}