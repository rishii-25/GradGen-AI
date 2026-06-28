import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { X, CalendarCheck, TrendingDown, TrendingUp } from 'lucide-react';
import { GlassCard } from '@/components/glass-card';

interface AttendanceProps { onClose: () => void; addToast?: (msg: string, type: 'success' | 'error' | 'info') => void; }

export function AttendanceCalculator({ onClose }: AttendanceProps) {
  const [totalClasses, setTotalClasses] = useState(100);
  const [attended, setAttended] = useState(75);
  const [requiredPercent, setRequiredPercent] = useState(75);

  const currentPercent = useMemo(() => totalClasses > 0 ? (attended / totalClasses) * 100 : 0, [attended, totalClasses]);
  const canBunk = useMemo(() => {
    if (requiredPercent <= 0) return 0;
    return Math.max(0, Math.floor((attended * 100 - requiredPercent * totalClasses) / requiredPercent));
  }, [attended, totalClasses, requiredPercent]);
  const needAttend = useMemo(() => {
    if (requiredPercent <= 0) return 0;
    return Math.max(0, Math.ceil((requiredPercent * totalClasses - attended * 100) / (100 - requiredPercent)));
  }, [attended, totalClasses, requiredPercent]);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[500] bg-[#0c0b0e] overflow-y-auto">
      <div className="sticky top-0 z-10 bg-[#111]/95 backdrop-blur-lg border-b border-white/[0.08]">
        <div className="max-w-[700px] mx-auto px-5 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3"><CalendarCheck className="w-5 h-5 text-[#a6f800]" /><h2 className="text-base font-medium text-white">Attendance Calculator</h2></div>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-white/[0.08]"><X className="w-5 h-5 text-white/60" /></button>
        </div>
      </div>
      <div className="max-w-[700px] mx-auto px-5 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-5">
            <h3 className="text-xl font-bold text-white">Enter Your Stats</h3>
            <div>
              <label className="text-sm text-white/60 mb-1 block">Total Classes Held: {totalClasses}</label>
              <input type="range" min={1} max={200} value={totalClasses} onChange={e => setTotalClasses(Number(e.target.value))}
                className="w-full h-2 rounded-full appearance-none cursor-pointer"
                style={{ background: `linear-gradient(to right, #a6f800 ${(totalClasses / 200) * 100}%, rgba(255,255,255,0.1) ${(totalClasses / 200) * 100}%)` }} />
            </div>
            <div>
              <label className="text-sm text-white/60 mb-1 block">Classes Attended: {attended}</label>
              <input type="range" min={0} max={totalClasses} value={attended} onChange={e => setAttended(Math.min(Number(e.target.value), totalClasses))}
                className="w-full h-2 rounded-full appearance-none cursor-pointer"
                style={{ background: `linear-gradient(to right, #00e3a0 ${(attended / totalClasses) * 100}%, rgba(255,255,255,0.1) ${(attended / totalClasses) * 100}%)` }} />
            </div>
            <div>
              <label className="text-sm text-white/60 mb-1 block">Required Attendance %: {requiredPercent}%</label>
              <input type="range" min={50} max={95} value={requiredPercent} onChange={e => setRequiredPercent(Number(e.target.value))}
                className="w-full h-2 rounded-full appearance-none cursor-pointer"
                style={{ background: `linear-gradient(to right, #f90082 ${((requiredPercent - 50) / 45) * 100}%, rgba(255,255,255,0.1) ${((requiredPercent - 50) / 45) * 100}%)` }} />
            </div>
          </div>

          <div className="space-y-4">
            <GlassCard className="text-center">
              <p className="text-sm text-white/60 mb-2">Current Attendance</p>
              <p className={`text-5xl font-bold ${currentPercent >= requiredPercent ? 'text-[#00e3a0]' : 'text-[#f90082]'}`}>{currentPercent.toFixed(1)}%</p>
              <p className="text-xs text-white/40 mt-1">{attended} / {totalClasses} classes</p>
            </GlassCard>

            {canBunk > 0 ? (
              <GlassCard className="!p-4 text-center border-[#00e3a0]/20">
                <TrendingDown className="w-6 h-6 text-[#00e3a0] mx-auto mb-2" />
                <p className="text-3xl font-bold text-[#00e3a0]">{canBunk}</p>
                <p className="text-sm text-[#aeadae]">classes you can bunk safely</p>
              </GlassCard>
            ) : (
              <GlassCard className="!p-4 text-center border-[#f90082]/20">
                <TrendingUp className="w-6 h-6 text-[#f90082] mx-auto mb-2" />
                <p className="text-3xl font-bold text-[#f90082]">{needAttend}</p>
                <p className="text-sm text-[#aeadae]">classes you must attend to reach {requiredPercent}%</p>
              </GlassCard>
            )}

            <GlassCard className="!p-4">
              <h4 className="text-sm font-medium text-white mb-3">Attendance Projection</h4>
              <div className="space-y-2">
                {[50, 60, 70, 75, 80, 85, 90].map(p => {
                  const safe = Math.floor((attended * 100 - p * totalClasses) / p);
                  return (
                    <div key={p} className="flex items-center justify-between text-sm">
                      <span className="text-white/60">{p}% required</span>
                      <span className={safe >= 0 ? 'text-[#00e3a0]' : 'text-[#f90082]'}>{safe >= 0 ? `${safe} safe` : `${Math.abs(safe)} needed`}</span>
                    </div>
                  );
                })}
              </div>
            </GlassCard>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
