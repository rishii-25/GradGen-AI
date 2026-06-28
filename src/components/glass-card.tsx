import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  glowColor?: string;
}

export function GlassCard({ children, className, hover = true, glowColor }: GlassCardProps) {
  return (
    <motion.div
      whileHover={hover ? { y: -4 } : undefined}
      transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
      className={cn(
        'rounded-3xl p-8 relative overflow-hidden',
        'bg-[rgba(22,21,24,0.6)] backdrop-blur-xl',
        'border border-white/[0.08]',
        'shadow-[0_4px_24px_rgba(0,0,0,0.2)]',
        hover && 'hover:border-white/[0.15] hover:shadow-[0_8px_32px_rgba(0,0,0,0.3)]',
        className
      )}
      style={glowColor ? {
        boxShadow: `0 4px 24px rgba(0,0,0,0.2), 0 0 60px ${glowColor}15`
      } : undefined}
    >
      {children}
    </motion.div>
  );
}
