import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Sphere } from '@react-three/drei';
import { motion } from 'framer-motion';
import { useMemo, useRef, type ReactNode } from 'react';
import * as THREE from 'three';
import styles from './CleanContact.module.css';
import usePortfolioData from '../hooks/usePortfolioData';
import { useMediaQuery } from '../hooks/useMediaQuery';
import { useReducedMotion } from '../hooks/useReducedMotion';

type ContactMethod = {
  icon: string;
  label: string;
  value: string;
  href?: string;
  external?: boolean;
};

const ContactScene = () => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    const t = clock.getElapsedTime();
    groupRef.current.rotation.y = t * 0.14;
    groupRef.current.rotation.x = Math.sin(t * 0.35) * 0.08;
  });

  return (
    <>
      <ambientLight intensity={0.35} />
      <pointLight position={[6, 6, 6]} intensity={1.2} color="#00f0ff" />
      <pointLight position={[-6, -4, 4]} intensity={1.0} color="#ff00e5" />

      <group ref={groupRef}>
        <Float speed={2} rotationIntensity={1.1} floatIntensity={1.5}>
          <Sphere args={[1.05, 32, 32]} position={[-1.7, 0.4, 0]}>
            <MeshDistortMaterial
              color="#00f0ff"
              distort={0.35}
              speed={2}
              roughness={0.2}
              metalness={0.25}
            />
          </Sphere>
        </Float>

        <Float speed={1.6} rotationIntensity={1} floatIntensity={1.2}>
          <Sphere args={[0.85, 32, 32]} position={[1.8, -0.45, -1]}>
            <MeshDistortMaterial
              color="#ff00e5"
              distort={0.3}
              speed={1.6}
              roughness={0.25}
              metalness={0.2}
            />
          </Sphere>
        </Float>

        <Float speed={1.25} rotationIntensity={0.8} floatIntensity={0.9}>
          <mesh position={[0.2, 1.25, -1.6]}>
            <torusKnotGeometry args={[0.55, 0.16, 80, 12]} />
            <meshStandardMaterial
              color="#bd5fff"
              emissive="#bd5fff"
              emissiveIntensity={0.35}
              metalness={0.65}
              roughness={0.25}
              wireframe
            />
          </mesh>
        </Float>
      </group>
    </>
  );
};

const SpinBorderCta = ({
  href,
  children,
  external,
  variant = 'primary',
}: {
  href: string;
  children: ReactNode;
  external?: boolean;
  variant?: 'primary' | 'secondary';
}) => {
  return (
    <motion.a
      href={href}
      className={`${styles.ctaButton} ${variant === 'secondary' ? styles.ctaButtonSecondary : ''}`}
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
      data-magnetic
      whileHover={{ scale: 1.03, y: -2 }}
      whileTap={{ scale: 0.97 }}
    >
      <span className={styles.ctaBorder} aria-hidden="true" />
      <span className={styles.ctaContent}>{children}</span>
    </motion.a>
  );
};

export const CleanContact = () => {
  const data = usePortfolioData();
  const reducedMotion = useReducedMotion();
  const isMobile = useMediaQuery('(max-width: 768px)');
  const show3D = !reducedMotion && !isMobile;

  const contactMethods = useMemo<ContactMethod[]>(() => {
    const methods: ContactMethod[] = [
      {
        icon: '📧',
        label: 'Email',
        value: data.contact.email,
        href: `mailto:${data.contact.email}`,
      },
      {
        icon: '💼',
        label: 'LinkedIn',
        value: 'Connect & message',
        href: data.contact.linkedin,
        external: true,
      },
      {
        icon: '🐙',
        label: 'GitHub',
        value: 'Projects & code',
        href: data.contact.github,
        external: true,
      },
      { icon: '📍', label: 'Location', value: data.contact.location },
    ];

    const phone = String(data.contact.phone ?? '').trim();
    if (phone && phone.toLowerCase() !== 'na') {
      methods.push({
        icon: '📱',
        label: 'Phone',
        value: phone,
        href: `tel:${phone.replace(/\s+/g, '')}`,
      });
    }

    return methods;
  }, [data.contact.email, data.contact.github, data.contact.linkedin, data.contact.location, data.contact.phone]);

  return (
    <section className={styles.contact} id="contact" aria-labelledby="contact-title">
      <div className={styles.bg} aria-hidden="true" />

      {show3D ? (
        <div className={styles.canvasWrap} aria-hidden="true">
          <Canvas
            dpr={[1, 1.2]}
            camera={{ position: [0, 0, 5], fov: 50 }}
            gl={{
              antialias: false,
              alpha: true,
              powerPreference: 'high-performance',
              preserveDrawingBuffer: false,
              failIfMajorPerformanceCaveat: true
            }}
          >
            <ContactScene />
          </Canvas>
        </div>
      ) : null}

      <div className="container">
        <div className={styles.layout}>
          <motion.header
            className={styles.header}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className={styles.title} id="contact-title">
              Get In Touch
            </h2>
            <p className={styles.subtitle}>Establishing connection to future possibilities</p>

            <div className={styles.ctaRow}>
              <SpinBorderCta href="/resume.pdf">Download Resume</SpinBorderCta>
              <SpinBorderCta href={`mailto:${data.contact.email}`} variant="secondary">
                Send Email
              </SpinBorderCta>
            </div>
          </motion.header>

          <div className={styles.cards}>
            {contactMethods.map((method, index) => {
              const { key, ...motionProps } = {
                key: method.label,
                className: styles.contactCard,
                initial: { opacity: 0, y: 18 },
                whileInView: { opacity: 1, y: 0 },
                viewport: { once: true } as const,
                transition: { delay: 0.08 * index, duration: 0.6 },
              };

              const content = (
                <>
                  <div className={styles.cardIcon} aria-hidden="true">
                    {method.icon}
                  </div>
                  <div className={styles.cardBody}>
                    <h3 className={styles.label}>{method.label}</h3>
                    <p className={styles.value}>{method.value}</p>
                  </div>
                  {method.href ? (
                    <span className={styles.cardArrow} aria-hidden="true">
                      ↗
                    </span>
                  ) : null}
                </>
              );

              if (method.href) {
                return (
                  <motion.a
                    key={key}
                    {...motionProps}
                    href={method.href}
                    target={method.external ? '_blank' : undefined}
                    rel={method.external ? 'noopener noreferrer' : undefined}
                    data-magnetic
                  >
                    {content}
                  </motion.a>
                );
              }

              return <motion.div key={key} {...motionProps}>{content}</motion.div>;
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
