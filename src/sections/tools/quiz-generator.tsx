import { useState } from 'react';
import { motion } from 'framer-motion';
import { X, HelpCircle, Sparkles, CheckCircle, XCircle } from 'lucide-react';
import { GlassCard } from '@/components/glass-card';

interface QuizProps { onClose: () => void; addToast: (msg: string, type: 'success' | 'error' | 'info') => void; }

interface Question { question: string; options: string[]; answer: number; explanation: string; }

const sampleQuizzes: Record<string, Question[]> = {
  'machine learning': [
    { question: 'Which algorithm is used for classification?', options: ['Linear Regression', 'K-Means', 'Logistic Regression', 'PCA'], answer: 2, explanation: 'Logistic Regression is a classification algorithm despite its name.' },
    { question: 'What does SVM stand for?', options: ['Simple Vector Machine', 'Support Vector Machine', 'Supervised Vector Machine', 'System Vector Model'], answer: 1, explanation: 'Support Vector Machine finds the optimal hyperplane for classification.' },
    { question: 'Which is NOT a supervised learning algorithm?', options: ['Random Forest', 'K-Nearest Neighbors', 'K-Means Clustering', 'Decision Tree'], answer: 2, explanation: 'K-Means is an unsupervised clustering algorithm.' },
    { question: 'What is overfitting?', options: ['Model performs well on training but poorly on test', 'Model performs well on both', 'Model performs poorly on both', 'Model has too few parameters'], answer: 0, explanation: 'Overfitting occurs when a model learns the training data too well, including noise.' },
    { question: 'Gradient Descent is used to?', options: ['Increase loss', 'Minimize loss', 'Shuffle data', 'Normalize features'], answer: 1, explanation: 'Gradient Descent iteratively minimizes the loss function.' },
  ],
  'web development': [
    { question: 'What does DOM stand for?', options: ['Document Object Model', 'Data Object Model', 'Digital Ordinance Model', 'Desktop Oriented Mode'], answer: 0, explanation: 'DOM represents the page structure as a tree of objects.' },
    { question: 'Which HTTP method is used to update data?', options: ['GET', 'POST', 'PUT', 'DELETE'], answer: 2, explanation: 'PUT is used to update existing resources.' },
    { question: 'What is the purpose of useEffect in React?', options: ['State management', 'Side effects handling', 'Routing', 'Styling'], answer: 1, explanation: 'useEffect handles side effects like data fetching, subscriptions.' },
    { question: 'Which CSS property creates flexbox layout?', options: ['display: grid', 'display: block', 'display: flex', 'position: flex'], answer: 2, explanation: 'display: flex enables the flexbox layout model.' },
    { question: 'What is a Promise in JavaScript?', options: ['A callback function', 'An object representing eventual completion', 'A variable type', 'An error handler'], answer: 1, explanation: 'A Promise represents an operation that hasn\'t completed yet but will in the future.' },
  ],
  general: [
    { question: 'What is the time complexity of binary search?', options: ['O(n)', 'O(log n)', 'O(n²)', 'O(1)'], answer: 1, explanation: 'Binary search halves the search space each iteration, giving O(log n).' },
    { question: 'Which data structure uses FIFO?', options: ['Stack', 'Queue', 'Tree', 'Graph'], answer: 1, explanation: 'Queue follows First-In-First-Out principle.' },
    { question: 'What is the primary key in a database?', options: ['A foreign key', 'A unique identifier', 'An index', 'A constraint'], answer: 1, explanation: 'Primary key uniquely identifies each record in a table.' },
    { question: 'Which layer of OSI model handles routing?', options: ['Transport', 'Network', 'Data Link', 'Application'], answer: 1, explanation: 'Network layer (Layer 3) handles routing and IP addressing.' },
    { question: 'What does API stand for?', options: ['Application Program Interface', 'Application Programming Interface', 'Automated Program Integration', 'Advanced Protocol Interface'], answer: 1, explanation: 'Application Programming Interface allows software to communicate.' },
  ],
};

export function QuizGenerator({ onClose, addToast: _addToast }: QuizProps) {
  void _addToast;
  const [topic, setTopic] = useState('');
  const [count, setCount] = useState(5);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [generating, setGenerating] = useState(false);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [showResults, setShowResults] = useState(false);

  const generate = () => {
    setGenerating(true);
    setTimeout(() => {
      const key = Object.keys(sampleQuizzes).find(k => topic.toLowerCase().includes(k)) || 'general';
      const pool = sampleQuizzes[key];
      const shuffled = [...pool].sort(() => Math.random() - 0.5).slice(0, Math.min(count, pool.length));
      setQuestions(shuffled);
      setAnswers({});
      setShowResults(false);
      setGenerating(false);
    }, 1200);
  };

  const selectAnswer = (qIdx: number, optIdx: number) => {
    if (showResults) return;
    setAnswers(prev => ({ ...prev, [qIdx]: optIdx }));
  };

  const score = questions.reduce((acc, q, i) => acc + (answers[i] === q.answer ? 1 : 0), 0);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[500] bg-[#0c0b0e] overflow-y-auto">
      <div className="sticky top-0 z-10 bg-[#111]/95 backdrop-blur-lg border-b border-white/[0.08]">
        <div className="max-w-[800px] mx-auto px-5 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3"><HelpCircle className="w-5 h-5 text-[#f90082]" /><h2 className="text-base font-medium text-white">Quiz & MCQ Generator</h2></div>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-white/[0.08]"><X className="w-5 h-5 text-white/60" /></button>
        </div>
      </div>
      <div className="max-w-[800px] mx-auto px-5 py-8">
        <div className="flex flex-wrap gap-3 mb-6 items-end">
          <div className="flex-1 min-w-[200px]">
            <input value={topic} onChange={e => setTopic(e.target.value)} placeholder="Topic (e.g., Machine Learning)" className="w-full bg-white/[0.05] border border-white/[0.1] rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/30 focus:border-[#f90082]/50 focus:outline-none" />
          </div>
          <input type="number" min={1} max={20} value={count} onChange={e => setCount(Number(e.target.value))} className="w-20 bg-white/[0.05] border border-white/[0.1] rounded-xl px-3 py-3 text-sm text-white text-center focus:border-[#f90082]/50 focus:outline-none" />
          <button onClick={generate} disabled={generating || !topic} className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#f90082] to-[#ff4dff] text-white text-sm font-medium flex items-center gap-2 hover:brightness-110 transition-all disabled:opacity-50">
            {generating ? <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /></> : <><Sparkles className="w-4 h-4" /> Generate</>}
          </button>
          {questions.length > 0 && !showResults && (
            <button onClick={() => setShowResults(true)} className="px-6 py-3 rounded-xl bg-white/[0.1] text-white text-sm font-medium hover:bg-white/[0.15] transition-all">Submit</button>
          )}
          {showResults && (
            <button onClick={() => { setShowResults(false); setAnswers({}); }} className="px-6 py-3 rounded-xl bg-white/[0.1] text-white text-sm font-medium hover:bg-white/[0.15] transition-all">Retry</button>
          )}
        </div>

        {generating && <div className="space-y-4">{[...Array(3)].map((_, i) => <GlassCard key={i} className="!p-5"><div className="space-y-2">{[...Array(5)].map((_, j) => <div key={j} className="h-3 rounded bg-white/[0.05] animate-shimmer" style={{ width: `${50 + Math.random() * 50}%` }} />)}</div></GlassCard>)}</div>}

        {questions.length > 0 && !generating && (
          <div className="space-y-4">
            {showResults && (
              <GlassCard className="text-center">
                <p className="text-sm text-white/60">Your Score</p>
                <p className={`text-4xl font-bold mt-1 ${score / questions.length >= 0.7 ? 'text-[#00e3a0]' : score / questions.length >= 0.4 ? 'text-[#ffba00]' : 'text-[#f90082]'}`}>{score}/{questions.length}</p>
                <p className="text-xs text-white/40">{Math.round((score / questions.length) * 100)}%</p>
              </GlassCard>
            )}
            {questions.map((q, qi) => (
              <GlassCard key={qi} className="!p-5">
                <p className="text-sm font-medium text-white mb-3">{qi + 1}. {q.question}</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {q.options.map((opt, oi) => {
                    const isSelected = answers[qi] === oi;
                    const isCorrect = oi === q.answer;
                    const showCorrect = showResults && isCorrect;
                    const showWrong = showResults && isSelected && !isCorrect;
                    return (
                      <button key={oi} onClick={() => selectAnswer(qi, oi)} disabled={showResults}
                        className={`p-3 rounded-xl text-sm text-left transition-all border ${
                          showCorrect ? 'border-[#00e3a0]/40 bg-[#00e3a0]/10 text-[#00e3a0]' :
                          showWrong ? 'border-[#f90082]/40 bg-[#f90082]/10 text-[#f90082]' :
                          isSelected ? 'border-[#693def]/40 bg-[#693def]/10 text-white' :
                          'border-white/[0.08] bg-white/[0.03] text-white/70 hover:border-white/[0.15]'
                        }`}>
                        <div className="flex items-center gap-2">
                          {showCorrect && <CheckCircle className="w-4 h-4 flex-shrink-0" />}
                          {showWrong && <XCircle className="w-4 h-4 flex-shrink-0" />}
                          <span>{opt}</span>
                        </div>
                      </button>
                    );
                  })}
                </div>
                {showResults && <p className="text-xs text-[#00d4ff] mt-3">{q.explanation}</p>}
              </GlassCard>
            ))}
          </div>
        )}

        {!generating && questions.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20"><HelpCircle className="w-12 h-12 text-white/10 mb-4" /><p className="text-[#aeadae]">Enter a topic to generate quiz questions.</p></div>
        )}
      </div>
    </motion.div>
  );
}
