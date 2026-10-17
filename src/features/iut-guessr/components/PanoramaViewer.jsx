import { Canvas, useThree } from '@react-three/fiber';
import { OrbitControls, useTexture } from '@react-three/drei';
import * as THREE from 'three';
import { Suspense, useEffect, useRef } from 'react';

function Sphere({ image }) {
    const texture = useTexture(image);

    return (
        <mesh scale={[-1, 1, 1]}>
            <sphereGeometry args={[500, 60, 40]} />
            <meshBasicMaterial side={THREE.BackSide}>
                <primitive attach="map" object={texture} colorSpace={THREE.SRGBColorSpace} />
            </meshBasicMaterial>
        </mesh>
    );
}

function CameraController({ controlsRef }) {
    const { camera, gl } = useThree();

    useEffect(() => {
        const handleWheel = (e) => {
            e.preventDefault();

            camera.fov += e.deltaY * 0.05;
            camera.fov = Math.max(20, Math.min(camera.fov, 100));
            camera.updateProjectionMatrix();

            if (controlsRef.current) {
                controlsRef.current.rotateSpeed = (camera.fov / 80) * -0.5;
            }
        };

        gl.domElement.addEventListener('wheel', handleWheel, { passive: false });

        return () => {
            gl.domElement.removeEventListener('wheel', handleWheel);
        };
    }, [camera, gl, controlsRef]);

    return null;
}

export default function PanoramaViewer({ image }) {
    const controlsRef = useRef(null);

    return (
        <Canvas camera={{ position: [0, 0, 0.1], fov: 80 }} className="w-full h-full cursor-grab active:cursor-grabbing">
            <CameraController controlsRef={controlsRef} />
            <OrbitControls
                ref={controlsRef}
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