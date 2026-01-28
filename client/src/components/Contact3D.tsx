import { Canvas } from '@react-three/fiber';
import { Float, Sphere, MeshDistortMaterial } from '@react-three/drei';
import { motion } from 'framer-motion';
import styles from './Contact3D.module.css';

const Scene3D = () => {
  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      
      <Float speed={2} rotationIntensity={1} floatIntensity={2}>
        <Sphere args={[1, 64, 64]} position={[-2, 0, 0]}>
          <MeshDistortMaterial
            color="#00f0ff"
            distort={0.4}
            speed={2}
            roughness={0}
          />
        </Sphere>
      </Float>
      
      <Float speed={1.5} rotationIntensity={1} floatIntensity={1.5}>
        <Sphere args={[0.8, 64, 64]} position={[2, 1, -1]}>
          <MeshDistortMaterial
            color="#ff00e5"
            distort={0.3}
            speed={1.5}
            roughness={0}
          />
        </Sphere>
      </Float>
    </>
  );
};

export const Contact3D = () => {
  const contactMethods = [
    { icon: '📧', label: 'Email', value: 'prince@example.com', link: 'mailto:prince@example.com' },
    { icon: '💼', label: 'LinkedIn', value: 'prince-gupta', link: '#' },
    { icon: '🐙', label: 'GitHub', value: 'princegupta', link: '#' },
    { icon: '🐦', label: 'Twitter', value: '@princegupta', link: '#' }
  ];

  return (
    <section className={styles.contact}>
      <div className={styles.canvas3D}>
        <Canvas camera={{ position: [0, 0, 5] }}>
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
          Let's Connect
        </motion.h2>

        <motion.p
          className={styles.subtitle}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Ready to bring your ideas to life? Let's talk!
        </motion.p>

        <div className={styles.contactGrid}>
          {contactMethods.map((method, index) => (
            <motion.a
              key={method.label}
              href={method.link}
              className={styles.contactCard}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.05, rotateY: 5 }}
              data-magnetic
            >
              <div className={styles.icon}>{method.icon}</div>
              <h3 className={styles.label}>{method.label}</h3>
              <p className={styles.value}>{method.value}</p>
            </motion.a>
          ))}
        </div>

        <motion.div
          className={styles.ctaSection}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <motion.button
            className={styles.primaryBtn}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            data-magnetic
          >
            Download Resume
          </motion.button>
          
          <motion.button
            className={styles.secondaryBtn}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            data-magnetic
          >
            Schedule Call
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};
