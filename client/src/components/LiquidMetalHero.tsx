import { Canvas } from '@react-three/fiber';
import { MeshDistortMaterial, OrbitControls } from '@react-three/drei';
import { motion } from 'framer-motion';
import styles from './LiquidMetalHero.module.css';

const KineticName = ({ text }: { text: string }) => {
  const letters = text.split('');
  
  return (
    <h1 className={styles.kineticName}>
      {letters.map((letter, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 50, rotateX: -90 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{
            duration: 0.8,
            delay: i * 0.03,
            type: 'spring',
            stiffness: 100
          }}
          whileHover={{
            scale: 1.2,
            textShadow: '0 0 30px rgba(255, 0, 229, 0.8)',
            transition: { duration: 0.2 }
          }}
          className={styles.kineticLetter}
        >
          {letter === ' ' ? '\u00A0' : letter}
        </motion.span>
      ))}
    </h1>
  );
};

export const LiquidMetalHero = () => {
  return (
    <section className={styles.liquidHero}>
      <div className={styles.canvasContainer}>
        <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1} />
          <pointLight position={[-10, -10, -10]} intensity={0.5} color="#ff00e5" />
          <mesh>
            <sphereGeometry args={[2.5, 64, 64]} />
            <MeshDistortMaterial
              color="#00f0ff"
              attach="material"
              distort={0.5}
              speed={1.5}
              roughness={0}
              metalness={1}
            />
          </mesh>
          <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} enablePan={false} />
        </Canvas>
      </div>

      <motion.div 
        className={styles.nameContainer}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        <KineticName text="PRINCE KUMAR GUPTA" />
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.5 }}
          style={{
            textAlign: 'center',
            fontSize: 'clamp(1rem, 2vw, 1.5rem)',
            color: '#00f0ff',
            marginTop: '2rem',
            fontWeight: 500,
            letterSpacing: '0.1em'
          }}
        >
          Full Stack Developer • UI/UX Enthusiast
        </motion.p>
      </motion.div>
    </section>
  );
};
