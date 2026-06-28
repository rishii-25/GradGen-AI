import { useState } from 'react';
import { motion } from 'framer-motion';
import { Copy, Check } from 'lucide-react';

interface CopyButtonProps {
  text: string;
  onCopy?: () => void;
  className?: string;
}

export function CopyButton({ text, onCopy, className }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      onCopy?.();
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
      const textarea = document.createElement('textarea');
      textarea.value = text;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setCopied(true);
      onCopy?.();
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <motion.button
      whileTap={{ scale: 0.95 }}
      onClick={handleCopy}
      className={`p-2 rounded-lg transition-all duration-200 ${className}`}
      title="Copy to clipboard"
    >
      {copied ? (
        <Check className="w-5 h-5 text-[#00e3a0]" />
      ) : (
        <Copy className="w-5 h-5 text-white/60 hover:text-white" />
      )}
    </motion.button>
  );
}
