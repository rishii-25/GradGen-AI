import { motion } from 'framer-motion';

interface SectionDividerProps {
  colors?: [string, string, string];
}

export function SectionDivider({ colors = ['#693def', '#00d4ff', '#001a4c'] }: SectionDividerProps) {
  return (
    <motion.div
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
      style={{
        transformOrigin: 'left',
        background: `linear-gradient(90deg, ${colors[0]}, ${colors[1]}, ${colors[2]})`,
      }}
      className="w-full h-1"
    />
  );
}
