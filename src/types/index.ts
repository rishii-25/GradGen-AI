export interface Tool {
  id: string;
  name: string;
  description: string;
  icon: string;
  gradient: string;
  preview: string;
}

export interface Feature {
  id: string;
  title: string;
  description: string;
  icon: string;
  gradient: string;
}

export interface Testimonial {
  id: string;
  quote: string;
  name: string;
  university: string;
  role: string;
  gradient: string;
}

export interface PricingPlan {
  id: string;
  name: string;
  description: string;
  monthlyPrice: number;
  annualPrice: number;
  lifetimePrice: number;
  features: { text: string; included: boolean }[];
  accent: string;
  borderColor: string;
  featured?: boolean;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export interface Toast {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info';
}

export interface OnboardingData {
  fullName: string;
  email: string;
  university: string;
  degree: string;
  year: string;
  cgpa: string;
  skills: string[];
  careerInterest: string;
}

export interface ResumeData {
  personalInfo: {
    fullName: string;
    email: string;
    phone: string;
    location: string;
    linkedin: string;
    title: string;
  };
  summary: string;
  summaryTone: string;
  education: EducationEntry[];
  skills: { technical: string[]; soft: string[]; languages: string[] };
  experience: ExperienceEntry[];
  template: number;
}

export interface EducationEntry {
  id: string;
  institution: string;
  degree: string;
  field: string;
  graduationYear: string;
  cgpa: string;
  achievements: string;
}

export interface ExperienceEntry {
  id: string;
  title: string;
  company: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
  achievements: string[];
  type: 'work' | 'internship' | 'project';
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'ai';
  content: string;
}

export interface DemoScript {
  tab: string;
  userMessage: string;
  aiResponse: string;
}
