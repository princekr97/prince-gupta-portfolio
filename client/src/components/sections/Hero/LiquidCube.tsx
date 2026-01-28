import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial } from '@react-three/drei';

const AnimatedCube = () => {
    const meshRef = useRef<any>(null);

    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.2;
            meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.2;
        }
    });

    return (
        <mesh ref={meshRef}>
            <boxGeometry args={[2, 2, 2]} />
            <MeshDistortMaterial
                color="#00f0ff"
                speed={3}
                distort={0.4}
                roughness={0.2}
                metalness={0.8}
            />
        </mesh>
    );
};

export const LiquidCube = ({ mouseX, mouseY }: { mouseX?: any, mouseY?: any }) => {
    // Prevent unused vars error
    void mouseX;
    void mouseY;
    return (
        <div style={{ position: 'absolute', left: '10%', top: '30%', width: '250px', height: '250px', zIndex: 1 }}>
            {/* <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
                <ambientLight intensity={1} />
                <pointLight position={[10, 10, 10]} intensity={1.5} />
                <Float speed={2} rotationIntensity={1} floatIntensity={2}>
                    <AnimatedCube />
                </Float>
            </Canvas> */}
        </div>
    );
};
