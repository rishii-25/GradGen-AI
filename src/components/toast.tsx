import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, AlertCircle, Info, X } from 'lucide-react';
import type { Toast as ToastType } from '@/types';

interface ToastContainerProps {
  toasts: ToastType[];
  removeToast: (id: string) => void;
}

export function ToastContainer({ toasts, removeToast }: ToastContainerProps) {
  return (
    <div className="fixed bottom-6 right-6 z-[1000] flex flex-col gap-3">
      <AnimatePresence>
        {toasts.map((toast) => (
          <ToastItem key={toast.id} toast={toast} onRemove={() => removeToast(toast.id)} />
        ))}
      </AnimatePresence>
    </div>
  );
}

function ToastItem({ toast, onRemove }: { toast: ToastType; onRemove: () => void }) {
  const borderColors = {
    success: '#00e3a0',
    error: '#f90082',
    info: '#693def',
  };

  const icons = {
    success: <CheckCircle className="w-5 h-5 text-[#00e3a0]" />,
    error: <AlertCircle className="w-5 h-5 text-[#f90082]" />,
    info: <Info className="w-5 h-5 text-[#693def]" />,
  };

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 100, opacity: 0 }}
      transition={{ duration: 0.3, ease: [0, 0, 0.2, 1] }}
      className="flex items-center gap-3 rounded-2xl px-5 py-4 backdrop-blur-xl bg-[rgba(22,21,24,0.9)] border border-white/[0.08] shadow-[0_8px_32px_rgba(0,0,0,0.4)] min-w-[320px]"
      style={{ borderLeft: `3px solid ${borderColors[toast.type]}` }}
    >
      {icons[toast.type]}
      <span className="text-sm text-white flex-1">{toast.message}</span>
      <button onClick={onRemove} className="text-white/50 hover:text-white transition-colors">
        <X className="w-4 h-4" />
      </button>
    </motion.div>
  );
}
