import { cn } from '@/lib/utils';

interface GradientTextProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'violet' | 'blue' | 'green' | 'pink' | 'lime';
}

const variants = {
  violet: 'from-[#693def] to-[#00d4ff]',
  blue: 'from-[#0072f5] to-[#1e9de7]',
  green: 'from-[#00e3a0] to-[#008a5e]',
  pink: 'from-[#f90082] to-[#ff4dff]',
  lime: 'from-[#a6f800] to-[#f90082]',
};

export function GradientText({ children, className, variant = 'violet' }: GradientTextProps) {
  return (
    <span className={cn(`bg-gradient-to-r ${variants[variant]} bg-clip-text text-transparent`, className)}>
      {children}
    </span>
  );
}
