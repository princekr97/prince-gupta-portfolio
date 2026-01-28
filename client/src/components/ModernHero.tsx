import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Text3D, MeshTransmissionMaterial, Environment, PerspectiveCamera } from '@react-three/drei';
import { motion } from 'framer-motion';
import { useRef } from 'react';
import * as THREE from 'three';
import styles from './ModernHero.module.css';

const FloatingShape = ({ position, color }: any) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.2;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3;
    }
  });

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      <mesh ref={meshRef} position={position}>
        <icosahedronGeometry args={[1, 0]} />
        <MeshTransmissionMaterial
          color={color}
          thickness={0.5}
          roughness={0}
          transmission={1}
          ior={1.5}
          chromaticAberration={0.5}
        />
      </mesh>
    </Float>
  );
};

const Scene3D = () => {
  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 8]} />
      <ambientLight intensity={0.5} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#ff00e5" />
      
      <FloatingShape position={[-3, 2, 0]} color="#00f0ff" />
      <FloatingShape position={[3, -2, -2]} color="#7b61ff" />
      <FloatingShape position={[0, 0, -3]} color="#ff00e5" />
      
      <Environment preset="city" />
    </>
  );
};

export const ModernHero = () => {
  return (
    <section className={styles.hero}>
      <div className={styles.canvas3D}>
        <Canvas>
          <Scene3D />
        </Canvas>
      </div>

      <div className={styles.content}>
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.6, 0.05, 0.01, 0.9] }}
        >
          <motion.h1 
            className={styles.title}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 1 }}
          >
            PRINCE KUMAR
            <br />
            <span className={styles.gradient}>GUPTA</span>
          </motion.h1>
          
          <motion.p
            className={styles.subtitle}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            Full Stack Developer • Creative Technologist
          </motion.p>

          <motion.div
            className={styles.cta}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.8 }}
          >
            <button className={styles.primaryBtn} data-magnetic>
              View Work
            </button>
            <button className={styles.secondaryBtn} data-magnetic>
              Contact Me
            </button>
          </motion.div>
        </motion.div>

        <motion.div
          className={styles.scrollIndicator}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
        >
          <div className={styles.mouse}>
            <div className={styles.wheel} />
          </div>
          <p>Scroll to explore</p>
        </motion.div>
      </div>
    </section>
  );
};
