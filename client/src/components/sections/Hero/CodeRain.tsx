import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import styles from './CodeRain.module.css';

const codeSnippets = [
  'const app = () => {}',
  'import React from "react"',
  'function Component()',
  'export default App',
  'npm install',
  'git commit -m',
  'async await',
  'useState()',
  'useEffect()',
  'return <div>',
  'map((item) =>',
  'filter(x => x)',
  'reduce(acc, cur)',
  'Promise.all()',
  'fetch("/api")',
  'try { } catch',
  'class Component',
  'interface Props',
  'type State = {}',
  'let x: number',
];

interface CodeLine {
  id: number;
  text: string;
  x: number;
  delay: number;
  duration: number;
}

export const CodeRain = () => {
  const [lines, setLines] = useState<CodeLine[]>([]);

  useEffect(() => {
    const generateLines = () => {
      const newLines: CodeLine[] = [];
      for (let i = 0; i < 15; i++) {
        newLines.push({
          id: i,
          text: codeSnippets[Math.floor(Math.random() * codeSnippets.length)],
          x: Math.random() * 100,
          delay: Math.random() * 5,
          duration: 15 + Math.random() * 10,
        });
      }
      setLines(newLines);
    };

    generateLines();
  }, []);

  return (
    <div className={styles.codeRain}>
      {lines.map((line) => (
        <motion.div
          key={line.id}
          className={styles.codeLine}
          style={{ left: `${line.x}%` }}
          initial={{ y: '-100%', opacity: 0 }}
          animate={{
            y: '100vh',
            opacity: [0, 0.6, 0.6, 0],
          }}
          transition={{
            duration: line.duration,
            delay: line.delay,
            repeat: Infinity,
            ease: 'linear',
          }}
        >
          {line.text}
        </motion.div>
      ))}
    </div>
  );
};
