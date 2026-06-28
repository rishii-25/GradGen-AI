import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X, FileText, ChevronRight, ChevronLeft, Sparkles,
  Check, Plus, Trash2, GripVertical
} from 'lucide-react';
import { GlassCard } from '@/components/glass-card';
import { CopyButton } from '@/components/copy-button';
import type { ResumeData, EducationEntry, ExperienceEntry } from '@/types';

interface ResumeGeneratorProps {
  onClose: () => void;
  addToast: (msg: string, type: 'success' | 'error' | 'info') => void;
}

const tones = ['Professional', 'Confident', 'Creative', 'Technical'];

const initialData: ResumeData = {
  personalInfo: { fullName: '', email: '', phone: '', location: '', linkedin: '', title: '' },
  summary: '',
  summaryTone: 'Professional',
  education: [],
  skills: { technical: [], soft: [], languages: [] },
  experience: [],
  template: 1,
};

export function ResumeGenerator({ onClose, addToast }: ResumeGeneratorProps) {
  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState(1);
  const [data, setData] = useState<ResumeData>(initialData);
  const [aiGenerating, setAiGenerating] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  const nextStep = () => { setDirection(1); setStep(s => Math.min(s + 1, 7)); };
  const prevStep = () => { setDirection(-1); setStep(s => Math.max(s - 1, 1)); };

  const updatePersonal = (field: string, value: string) => {
    setData(prev => ({ ...prev, personalInfo: { ...prev.personalInfo, [field]: value } }));
  };

  const generateSummary = () => {
    setAiGenerating(true);
    setTimeout(() => {
      const summaries: Record<string, string> = {
        Professional: `Dedicated ${data.personalInfo.title || 'professional'} with a strong foundation in ${data.skills.technical.slice(0, 3).join(', ') || 'relevant technical skills'}. Proven track record of delivering high-quality results in fast-paced environments. Seeking to leverage expertise in ${data.skills.technical[0] || 'the field'} to contribute to innovative projects and drive organizational success.`,
        Confident: `I am a results-driven ${data.personalInfo.title || 'professional'} who excels at ${data.skills.technical.slice(0, 2).join(' and ') || 'solving complex problems'}. My expertise in ${data.skills.technical[0] || 'my field'} combined with ${data.skills.soft[0] || 'strong communication skills'} makes me a valuable asset to any team. I deliver results, period.`,
        Creative: `Storyteller at heart, technologist by training. As a ${data.personalInfo.title || 'creative professional'}, I blend ${data.skills.technical.slice(0, 2).join(' and ') || 'technical expertise'} with out-of-the-box thinking to craft solutions that don't just work — they inspire. Every project is a canvas, every challenge an opportunity to create something extraordinary.`,
        Technical: `${data.personalInfo.title || 'Engineer'} specializing in ${data.skills.technical.slice(0, 4).join(', ') || 'software development'}. Proficient in ${data.skills.technical.slice(0, 3).join(', ') || 'modern tech stacks'} with hands-on experience building scalable systems. Strong foundation in ${data.skills.technical[3] || 'system design'} and passionate about writing clean, efficient code.`,
      };
      setData(prev => ({ ...prev, summary: summaries[data.summaryTone] || summaries.Professional }));
      setAiGenerating(false);
    }, 1500);
  };

  const addEducation = () => {
    const newEd: EducationEntry = { id: Date.now().toString(), institution: '', degree: '', field: '', graduationYear: '', cgpa: '', achievements: '' };
    setData(prev => ({ ...prev, education: [...prev.education, newEd] }));
  };

  const updateEducation = (id: string, field: string, value: string) => {
    setData(prev => ({ ...prev, education: prev.education.map(ed => ed.id === id ? { ...ed, [field]: value } : ed) }));
  };

  const removeEducation = (id: string) => {
    setData(prev => ({ ...prev, education: prev.education.filter(ed => ed.id !== id) }));
  };

  const addExperience = (type: 'work' | 'internship' | 'project' = 'work') => {
    const newExp: ExperienceEntry = { id: Date.now().toString(), title: '', company: '', startDate: '', endDate: '', current: false, description: '', achievements: [], type };
    setData(prev => ({ ...prev, experience: [...prev.experience, newExp] }));
  };

  const updateExperience = (id: string, field: string, value: string | boolean | string[]) => {
    setData(prev => ({ ...prev, experience: prev.experience.map(exp => exp.id === id ? { ...exp, [field]: value } : exp) }));
  };

  const removeExperience = (id: string) => {
    setData(prev => ({ ...prev, experience: prev.experience.filter(exp => exp.id !== id) }));
  };

  const toggleSkill = (category: 'technical' | 'soft' | 'languages', skill: string) => {
    setData(prev => ({
      ...prev,
      skills: {
        ...prev.skills,
        [category]: prev.skills[category].includes(skill)
          ? prev.skills[category].filter(s => s !== skill)
          : [...prev.skills[category], skill],
      },
    }));
  };

  const handleDownload = () => {
    setShowConfetti(true);
    addToast('Resume downloaded as PDF!', 'success');
    setTimeout(() => setShowConfetti(false), 3000);
  };

  const resumeText = useCallback(() => {
    const pi = data.personalInfo;
    return `${pi.fullName}
${pi.title}
${pi.email} | ${pi.phone} | ${pi.location}
LinkedIn: ${pi.linkedin}

PROFESSIONAL SUMMARY
${data.summary}

EDUCATION
${data.education.map(ed => `- ${ed.degree} in ${ed.field}, ${ed.institution} (${ed.graduationYear}) - CGPA: ${ed.cgpa}`).join('\n')}

SKILLS
Technical: ${data.skills.technical.join(', ')}
Soft Skills: ${data.skills.soft.join(', ')}
Languages: ${data.skills.languages.join(', ')}

EXPERIENCE
${data.experience.map(exp => `- ${exp.title} at ${exp.company} (${exp.startDate} - ${exp.current ? 'Present' : exp.endDate})\n  ${exp.description}`).join('\n')}
`;
  }, [data]);

  const steps = ['Personal Info', 'Summary', 'Education', 'Skills', 'Experience', 'Review', 'Download'];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[500] bg-[#0c0b0e] overflow-y-auto"
    >
      {/* Header */}
      <div className="sticky top-0 z-10 bg-[#111]/95 backdrop-blur-lg border-b border-white/[0.08]">
        <div className="max-w-[1000px] mx-auto px-5 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <FileText className="w-5 h-5 text-[#693def]" />
            <h2 className="text-base font-medium text-white">AI Resume Generator</h2>
          </div>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-white/[0.08] transition-colors">
            <X className="w-5 h-5 text-white/60" />
          </button>
        </div>

        {/* Step Indicator */}
        <div className="max-w-[1000px] mx-auto px-5 pb-4">
          <div className="flex items-center gap-1">
            {steps.map((s, i) => (
              <div key={i} className="flex items-center flex-1">
                <div className="flex flex-col items-center flex-1">
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-medium transition-all ${
                    i + 1 < step ? 'bg-[#00e3a0] text-[#0c0b0e]' :
                    i + 1 === step ? 'bg-gradient-to-r from-[#693def] to-[#00d4ff] text-white animate-glow-pulse' :
                    'bg-white/[0.1] text-white/40'
                  }`}>
                    {i + 1 < step ? <Check className="w-4 h-4" /> : i + 1}
                  </div>
                  <span className={`text-[10px] mt-1 hidden sm:block ${i + 1 <= step ? 'text-white/60' : 'text-white/30'}`}>{s}</span>
                </div>
                {i < steps.length - 1 && (
                  <div className={`h-[2px] flex-1 mx-1 transition-all ${i + 1 < step ? 'bg-[#00e3a0]' : 'bg-white/[0.1]'}`} />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-[800px] mx-auto px-5 py-8">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={step}
            custom={direction}
            initial={{ x: direction * 30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: direction * -30, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Step 1: Personal Info */}
            {step === 1 && (
              <div className="space-y-5">
                <h3 className="text-2xl font-bold text-white mb-6">Personal Information</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input label="Full Name" value={data.personalInfo.fullName} onChange={(v) => updatePersonal('fullName', v)} placeholder="John Doe" />
                  <Input label="Professional Title" value={data.personalInfo.title} onChange={(v) => updatePersonal('title', v)} placeholder="Software Engineer" />
                  <Input label="Email" type="email" value={data.personalInfo.email} onChange={(v) => updatePersonal('email', v)} placeholder="john@email.com" />
                  <Input label="Phone" type="tel" value={data.personalInfo.phone} onChange={(v) => updatePersonal('phone', v)} placeholder="+1 234 567 890" />
                  <Input label="Location" value={data.personalInfo.location} onChange={(v) => updatePersonal('location', v)} placeholder="City, State" />
                  <Input label="LinkedIn URL" value={data.personalInfo.linkedin} onChange={(v) => updatePersonal('linkedin', v)} placeholder="linkedin.com/in/johndoe" />
                </div>
              </div>
            )}

            {/* Step 2: Summary */}
            {step === 2 && (
              <div className="space-y-5">
                <h3 className="text-2xl font-bold text-white mb-2">Professional Summary</h3>

                {/* Tone Selector */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {tones.map(tone => (
                    <button
                      key={tone}
                      onClick={() => setData(prev => ({ ...prev, summaryTone: tone }))}
                      className={`px-4 py-2 rounded-full text-sm transition-all ${
                        data.summaryTone === tone
                          ? 'bg-gradient-to-r from-[#693def] to-[#00d4ff] text-white'
                          : 'bg-white/[0.05] border border-white/[0.1] text-white/60 hover:border-white/[0.2]'
                      }`}
                    >
                      {tone}
                    </button>
                  ))}
                </div>

                {/* Generate Button */}
                <button
                  onClick={generateSummary}
                  disabled={aiGenerating}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-[#693def] to-[#00d4ff] text-white font-medium flex items-center justify-center gap-2 hover:brightness-110 transition-all disabled:opacity-50"
                >
                  {aiGenerating ? (
                    <><div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Generating...</>
                  ) : (
                    <><Sparkles className="w-5 h-5" /> Generate with AI</>
                  )}
                </button>

                {/* Summary Output */}
                {data.summary && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-4"
                  >
                    <textarea
                      value={data.summary}
                      onChange={(e) => setData(prev => ({ ...prev, summary: e.target.value }))}
                      rows={5}
                      className="w-full bg-white/[0.05] border border-white/[0.1] rounded-xl p-4 text-white text-sm focus:border-[#693def]/50 focus:outline-none resize-none"
                    />
                    <p className="text-xs text-white/40 mt-2">{data.summary.length}/2000 characters</p>
                  </motion.div>
                )}
              </div>
            )}

            {/* Step 3: Education */}
            {step === 3 && (
              <div className="space-y-5">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-2xl font-bold text-white">Education</h3>
                  <button onClick={addEducation} className="flex items-center gap-1 text-sm text-[#693def] hover:text-[#00d4ff]">
                    <Plus className="w-4 h-4" /> Add Education
                  </button>
                </div>
                {data.education.length === 0 && (
                  <p className="text-center text-[#aeadae] py-8">No education added yet. Click &quot;Add Education&quot; to get started.</p>
                )}
                {data.education.map((ed) => (
                  <GlassCard key={ed.id} className="p-5 !rounded-xl">
                    <div className="flex justify-between items-start mb-4">
                      <h4 className="text-sm font-medium text-white/60">Education Entry</h4>
                      <button onClick={() => removeEducation(ed.id)} className="p-1 hover:bg-white/[0.1] rounded">
                        <Trash2 className="w-4 h-4 text-[#f90082]" />
                      </button>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <Input label="Institution" value={ed.institution} onChange={(v) => updateEducation(ed.id, 'institution', v)} placeholder="Stanford University" />
                      <Input label="Degree" value={ed.degree} onChange={(v) => updateEducation(ed.id, 'degree', v)} placeholder="Bachelor of Science" />
                      <Input label="Field of Study" value={ed.field} onChange={(v) => updateEducation(ed.id, 'field', v)} placeholder="Computer Science" />
                      <Input label="Graduation Year" value={ed.graduationYear} onChange={(v) => updateEducation(ed.id, 'graduationYear', v)} placeholder="2026" />
                      <Input label="CGPA" value={ed.cgpa} onChange={(v) => updateEducation(ed.id, 'cgpa', v)} placeholder="8.5" />
                      <Input label="Achievements" value={ed.achievements} onChange={(v) => updateEducation(ed.id, 'achievements', v)} placeholder="Dean's List, Scholarships" />
                    </div>
                  </GlassCard>
                ))}
              </div>
            )}

            {/* Step 4: Skills */}
            {step === 4 && (
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-white mb-2">Skills</h3>

                {/* Technical Skills */}
                <div>
                  <h4 className="text-sm font-medium text-white/60 mb-3">Technical Skills</h4>
                  <div className="flex flex-wrap gap-2">
                    {['Python', 'JavaScript', 'Java', 'C++', 'React', 'Node.js', 'SQL', 'Machine Learning', 'Data Analysis', 'Cloud Computing'].map(skill => (
                      <button
                        key={skill}
                        onClick={() => toggleSkill('technical', skill)}
                        className={`px-4 py-2 rounded-full text-sm transition-all ${
                          data.skills.technical.includes(skill)
                            ? 'bg-gradient-to-r from-[#0072f5] to-[#0b98e3] text-white'
                            : 'bg-white/[0.05] border border-white/[0.1] text-white/60 hover:border-white/[0.2]'
                        }`}
                      >
                        {skill}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Soft Skills */}
                <div>
                  <h4 className="text-sm font-medium text-white/60 mb-3">Soft Skills</h4>
                  <div className="flex flex-wrap gap-2">
                    {['Communication', 'Leadership', 'Teamwork', 'Problem Solving', 'Time Management', 'Adaptability'].map(skill => (
                      <button
                        key={skill}
                        onClick={() => toggleSkill('soft', skill)}
                        className={`px-4 py-2 rounded-full text-sm transition-all ${
                          data.skills.soft.includes(skill)
                            ? 'bg-gradient-to-r from-[#00e3a0] to-[#00b97b] text-white'
                            : 'bg-white/[0.05] border border-white/[0.1] text-white/60 hover:border-white/[0.2]'
                        }`}
                      >
                        {skill}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Languages */}
                <div>
                  <h4 className="text-sm font-medium text-white/60 mb-3">Languages</h4>
                  <div className="flex flex-wrap gap-2">
                    {['English', 'Spanish', 'French', 'German', 'Mandarin', 'Hindi', 'Japanese'].map(lang => (
                      <button
                        key={lang}
                        onClick={() => toggleSkill('languages', lang)}
                        className={`px-4 py-2 rounded-full text-sm transition-all ${
                          data.skills.languages.includes(lang)
                            ? 'bg-gradient-to-r from-[#f90082] to-[#ff4dff] text-white'
                            : 'bg-white/[0.05] border border-white/[0.1] text-white/60 hover:border-white/[0.2]'
                        }`}
                      >
                        {lang}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Step 5: Experience */}
            {step === 5 && (
              <div className="space-y-5">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-2xl font-bold text-white">Experience</h3>
                  <button onClick={() => addExperience('work')} className="flex items-center gap-1 text-sm text-[#693def] hover:text-[#00d4ff]">
                    <Plus className="w-4 h-4" /> Add Experience
                  </button>
                </div>
                {data.experience.length === 0 && (
                  <p className="text-center text-[#aeadae] py-8">No experience added yet. Click &quot;Add Experience&quot; to get started.</p>
                )}
                {data.experience.map((exp) => (
                  <GlassCard key={exp.id} className="p-5 !rounded-xl">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex items-center gap-2">
                        <GripVertical className="w-4 h-4 text-white/20" />
                        <h4 className="text-sm font-medium text-white/60">{exp.type.charAt(0).toUpperCase() + exp.type.slice(1)} Experience</h4>
                      </div>
                      <button onClick={() => removeExperience(exp.id)} className="p-1 hover:bg-white/[0.1] rounded">
                        <Trash2 className="w-4 h-4 text-[#f90082]" />
                      </button>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <Input label="Title/Role" value={exp.title} onChange={(v) => updateExperience(exp.id, 'title', v)} placeholder="Software Engineer Intern" />
                      <Input label="Company/Organization" value={exp.company} onChange={(v) => updateExperience(exp.id, 'company', v)} placeholder="Google" />
                      <Input label="Start Date" value={exp.startDate} onChange={(v) => updateExperience(exp.id, 'startDate', v)} placeholder="Jan 2024" />
                      <Input label="End Date" value={exp.endDate} onChange={(v) => updateExperience(exp.id, 'endDate', v)} placeholder="Jun 2024" />
                      <div className="sm:col-span-2">
                        <label className="text-sm text-white/60 mb-1 block">Description</label>
                        <textarea
                          value={exp.description}
                          onChange={(e) => updateExperience(exp.id, 'description', e.target.value)}
                          rows={3}
                          className="w-full bg-white/[0.05] border border-white/[0.1] rounded-xl p-3 text-sm text-white focus:border-[#693def]/50 focus:outline-none resize-none"
                          placeholder="Describe your role and achievements..."
                        />
                      </div>
                    </div>
                  </GlassCard>
                ))}
              </div>
            )}

            {/* Step 6: Review */}
            {step === 6 && (
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-white mb-2">Review Your Resume</h3>
                <GlassCard className="!bg-white/[0.03]">
                  <div className="space-y-4 text-sm text-white/80">
                    <div>
                      <h4 className="text-lg font-bold text-white">{data.personalInfo.fullName || 'Your Name'}</h4>
                      <p className="text-[#693def]">{data.personalInfo.title || 'Your Title'}</p>
                      <p className="text-white/50 text-xs mt-1">{data.personalInfo.email} {data.personalInfo.phone && `| ${data.personalInfo.phone}`}</p>
                    </div>
                    {data.summary && (
                      <div>
                        <h5 className="font-medium text-white/60 text-xs uppercase tracking-wider mb-1">Summary</h5>
                        <p className="text-white/70">{data.summary}</p>
                      </div>
                    )}
                    {data.education.length > 0 && (
                      <div>
                        <h5 className="font-medium text-white/60 text-xs uppercase tracking-wider mb-1">Education</h5>
                        {data.education.map(ed => (
                          <p key={ed.id} className="text-white/70">{ed.degree} in {ed.field}, {ed.institution} ({ed.graduationYear})</p>
                        ))}
                      </div>
                    )}
                    {(data.skills.technical.length > 0 || data.skills.soft.length > 0) && (
                      <div>
                        <h5 className="font-medium text-white/60 text-xs uppercase tracking-wider mb-1">Skills</h5>
                        <p className="text-white/70">{[...data.skills.technical, ...data.skills.soft].join(', ')}</p>
                      </div>
                    )}
                  </div>
                </GlassCard>
              </div>
            )}

            {/* Step 7: Download */}
            {step === 7 && (
              <div className="text-center space-y-6">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
                  className="w-20 h-20 mx-auto rounded-full border-4 border-[#00e3a0] flex items-center justify-center"
                >
                  <Check className="w-10 h-10 text-[#00e3a0]" />
                </motion.div>
                <h3 className="text-3xl font-bold text-white">Your Resume is Ready!</h3>
                <p className="text-[#aeadae]">Choose your preferred format to download.</p>

                <div className="grid grid-cols-3 gap-4 max-w-[400px] mx-auto">
                  {['PDF', 'DOCX', 'TXT'].map(fmt => (
                    <motion.button
                      key={fmt}
                      whileHover={{ y: -4 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleDownload}
                      className="p-4 rounded-2xl bg-white/[0.05] border border-white/[0.1] hover:border-[#693def]/40 transition-colors"
                    >
                      <FileText className="w-8 h-8 text-[#693def] mx-auto mb-2" />
                      <p className="text-sm font-medium text-white">{fmt}</p>
                      <p className="text-xs text-white/40">~50KB</p>
                    </motion.button>
                  ))}
                </div>

                <div className="flex items-center justify-center gap-4 pt-4">
                  <CopyButton text={resumeText()} onCopy={() => addToast('Copied to clipboard!', 'success')} />
                  <span className="text-sm text-white/40">Copy as Text</span>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Navigation Buttons */}
        <div className="flex items-center justify-between mt-8 pt-6 border-t border-white/[0.08]">
          <button
            onClick={prevStep}
            disabled={step === 1}
            className="flex items-center gap-1 text-sm text-white/60 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronLeft className="w-4 h-4" /> Back
          </button>
          <button
            onClick={nextStep}
            className="btn-primary flex items-center gap-1"
          >
            {step === 7 ? 'Finish' : 'Continue'} <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Confetti */}
      {showConfetti && <ConfettiEffect />}
    </motion.div>
  );
}

function Input({ label, value, onChange, placeholder, type = 'text' }: { label: string; value: string; onChange: (v: string) => void; placeholder: string; type?: string }) {
  return (
    <div>
      <label className="text-sm text-white/60 mb-1 block">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-white/[0.05] border border-white/[0.1] rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/30 focus:border-[#693def]/50 focus:outline-none transition-colors"
      />
    </div>
  );
}

function ConfettiEffect() {
  return (
    <div className="fixed inset-0 pointer-events-none z-[600]">
      {[...Array(30)].map((_, i) => (
        <motion.div
          key={i}
          initial={{
            x: '50vw',
            y: '50vh',
            scale: 1,
            opacity: 1,
          }}
          animate={{
            x: `${50 + (Math.random() - 0.5) * 80}vw`,
            y: `${50 + Math.random() * 50}vh`,
            scale: 0,
            opacity: 0,
          }}
          transition={{ duration: 2, ease: 'easeOut' }}
          className="absolute w-2 h-2 rounded-full"
          style={{
            backgroundColor: ['#693def', '#00d4ff', '#00e3a0', '#f90082', '#ff4dff'][i % 5],
          }}
        />
      ))}
    </div>
  );
}
