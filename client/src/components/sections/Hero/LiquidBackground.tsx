import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { MeshDistortMaterial, Sphere, Float } from '@react-three/drei';
import * as THREE from 'three';

const DistortedSphere = () => {
    const meshRef = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.2;
            meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.3;
        }
    });

    return (
        <Float speed={2} rotationIntensity={1} floatIntensity={1}>
            <Sphere ref={meshRef} args={[1, 100, 100]} scale={2.4}>
                <MeshDistortMaterial
                    color="#00f0ff"
                    attach="material"
                    distort={0.45}
                    speed={2.5}
                    roughness={0.1}
                    metalness={0.8}
                    emissive="#0066ff"
                    emissiveIntensity={0.5}
                />
            </Sphere>
        </Float>
    );
};

export const LiquidBackground = () => {
    return null;
};
