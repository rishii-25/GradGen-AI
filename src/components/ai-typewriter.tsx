import { useTypewriter } from '@/hooks/useTypewriter';

interface AITypewriterProps {
  text: string;
  speed?: number;
  trigger: boolean;
  className?: string;
}

export function AITypewriter({ text, speed = 25, trigger, className = '' }: AITypewriterProps) {
  const { displayedText, isComplete } = useTypewriter(text, speed, trigger);

  return (
    <span className={className}>
      {displayedText}
      {!isComplete && trigger && (
        <span className="inline-block w-[2px] h-[1em] bg-[#693def] ml-0.5 animate-pulse" />
      )}
    </span>
  );
}
