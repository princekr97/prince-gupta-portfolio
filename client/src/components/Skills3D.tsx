import { Canvas, useFrame } from '@react-three/fiber';
import { Float, OrbitControls } from '@react-three/drei';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import * as THREE from 'three';
import styles from './Skills3D.module.css';

const skills = [
  { name: 'React', level: 95, color: '#61dafb' },
  { name: 'TypeScript', level: 90, color: '#3178c6' },
  { name: 'Node.js', level: 88, color: '#68a063' },
  { name: 'Python', level: 85, color: '#3776ab' },
  { name: 'AWS', level: 82, color: '#ff9900' },
  { name: 'Docker', level: 80, color: '#2496ed' }
];

const FloatingBox = ({ position, color }: any) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.2;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <mesh ref={meshRef} position={position}>
        <boxGeometry args={[0.5, 0.5, 0.5]} />
        <meshStandardMaterial color={color} metalness={0.8} roughness={0.2} />
      </mesh>
    </Float>
  );
};

const Scene3D = () => {
  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      
      <FloatingBox position={[-2, 1, 0]} color="#61dafb" />
      <FloatingBox position={[2, -1, -1]} color="#3178c6" />
      <FloatingBox position={[0, 2, -2]} color="#68a063" />
      
      <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
    </>
  );
};

export const Skills3D = () => {
  const containerRef = useRef(null);

  return (
    <section ref={containerRef} className={styles.skills}>
      <div className={styles.canvas3D}>
        <Canvas camera={{ position: [0, 0, 8], fov: 50 }}>
          <Scene3D />
        </Canvas>
      </div>

      <div className={styles.content}>
        <motion.h2
          className={styles.title}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          Technical Skills
        </motion.h2>

        <div className={styles.skillsGrid}>
          {skills.map((skill, index) => (
            <motion.div
              key={skill.name}
              className={styles.skillCard}
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              data-magnetic
            >
              <div className={styles.skillHeader}>
                <h3 className={styles.skillName}>{skill.name}</h3>
                <span className={styles.skillPercent}>{skill.level}%</span>
              </div>
              
              <div className={styles.progressBar}>
                <motion.div
                  className={styles.progressFill}
                  style={{ background: skill.color }}
                  initial={{ width: 0 }}
                  whileInView={{ width: `${skill.level}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: index * 0.1 + 0.3 }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
