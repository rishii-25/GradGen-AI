export interface ResumeTemplate {
  id: number;
  name: string;
  description: string;
  color: string;
  accent: string;
  layout: 'modern' | 'classic' | 'minimal' | 'creative';
}

export const resumeTemplates: ResumeTemplate[] = [
  { id: 1, name: 'Modern Pro', description: 'Clean two-column layout with sidebar', color: '#693def', accent: '#00d4ff', layout: 'modern' },
  { id: 2, name: 'Classic Dark', description: 'Dark header with elegant typography', color: '#111', accent: '#ffffff', layout: 'classic' },
  { id: 3, name: 'Minimal White', description: 'Simple and ATS-optimized', color: '#f8f8f8', accent: '#333', layout: 'minimal' },
  { id: 4, name: 'Creative Blue', description: 'Vibrant blue accents with icons', color: '#0072f5', accent: '#0b98e3', layout: 'creative' },
  { id: 5, name: 'Tech Green', description: 'Developer-focused with skill bars', color: '#00e3a0', accent: '#00b97b', layout: 'modern' },
  { id: 6, name: 'Executive', description: 'Professional serif fonts', color: '#1a1a2e', accent: '#c9a227', layout: 'classic' },
  { id: 7, name: 'Gradient Flow', description: 'Gradient header with timeline', color: '#693def', accent: '#f90082', layout: 'creative' },
  { id: 8, name: 'Sidebar Right', description: 'Right sidebar for skills & contact', color: '#161518', accent: '#00d4ff', layout: 'modern' },
  { id: 9, name: 'Compact', description: 'Single column, dense information', color: '#fff', accent: '#0072f5', layout: 'minimal' },
  { id: 10, name: 'Portfolio Style', description: 'Project-focused with thumbnails', color: '#0c0b0e', accent: '#a6f800', layout: 'creative' },
  { id: 11, name: 'Academic', description: 'Research & publication focused', color: '#fff', accent: '#693def', layout: 'classic' },
  { id: 12, name: 'Startup', description: 'Bold typography for entrepreneurs', color: '#f90082', accent: '#ff4dff', layout: 'creative' },
];

export function getTemplateHTML(data: ResumeData, templateId: number): string {
  const pi = data.personalInfo;
  const edu = data.education.map(e => `<p><strong>${e.degree}</strong> in ${e.field}, ${e.institution} (${e.graduationYear}) — CGPA: ${e.cgpa}</p>`).join('');
  const skills = [...data.skills.technical, ...data.skills.soft].join(', ');
  const exp = data.experience.map(e => `<p><strong>${e.title}</strong> at ${e.company} (${e.startDate} - ${e.current ? 'Present' : e.endDate})<br/>${e.description}</p>`).join('');

  const templates: Record<number, string> = {
    1: `<div style="font-family:Arial,sans-serif;max-width:800px;margin:0 auto;display:grid;grid-template-columns:1fr 280px;gap:0;">
      <div style="padding:40px;"><h1 style="font-size:32px;color:#333;margin:0;">${pi.fullName}</h1><p style="color:#693def;font-size:16px;margin:4px 0;">${pi.title}</p><p style="color:#666;font-size:13px;">${pi.email} | ${pi.phone} | ${pi.location}</p><hr style="border:0;border-top:2px solid #693def;margin:20px 0;"><h3 style="color:#333;border-bottom:1px solid #ddd;padding-bottom:5px;">Summary</h3><p style="color:#555;font-size:14px;line-height:1.6;">${data.summary}</p><h3 style="color:#333;border-bottom:1px solid #ddd;padding-bottom:5px;">Experience</h3><div style="color:#555;font-size:14px;line-height:1.6;">${exp}</div><h3 style="color:#333;border-bottom:1px solid #ddd;padding-bottom:5px;">Education</h3><div style="color:#555;font-size:14px;line-height:1.6;">${edu}</div></div>
      <div style="background:#f8f6ff;padding:40px;"><h3 style="color:#693def;font-size:16px;text-transform:uppercase;letter-spacing:1px;">Skills</h3><p style="color:#555;font-size:14px;line-height:1.8;">${skills}</p><h3 style="color:#693def;font-size:16px;text-transform:uppercase;letter-spacing:1px;margin-top:30px;">Contact</h3><p style="color:#555;font-size:13px;">${pi.email}<br/>${pi.phone}<br/>${pi.location}<br/>${pi.linkedin}</p></div></div>`,
    2: `<div style="font-family:Georgia,serif;max-width:800px;margin:0 auto;"><div style="background:#1a1a2e;color:white;padding:40px;text-align:center;"><h1 style="font-size:36px;margin:0;letter-spacing:2px;">${pi.fullName}</h1><p style="color:#c9a227;font-size:16px;margin:8px 0;letter-spacing:3px;text-transform:uppercase;">${pi.title}</p><p style="color:#aaa;font-size:13px;">${pi.email} | ${pi.phone} | ${pi.location}</p></div><div style="padding:40px;background:white;"><h3 style="color:#1a1a2e;border-bottom:2px solid #c9a227;padding-bottom:8px;font-family:Georgia,serif;">Professional Summary</h3><p style="color:#444;font-size:14px;line-height:1.7;">${data.summary}</p><h3 style="color:#1a1a2e;border-bottom:2px solid #c9a227;padding-bottom:8px;font-family:Georgia,serif;">Experience</h3><div style="color:#444;font-size:14px;line-height:1.7;">${exp}</div><h3 style="color:#1a1a2e;border-bottom:2px solid #c9a227;padding-bottom:8px;font-family:Georgia,serif;">Education</h3><div style="color:#444;font-size:14px;line-height:1.7;">${edu}</div><h3 style="color:#1a1a2e;border-bottom:2px solid #c9a227;padding-bottom:8px;font-family:Georgia,serif;">Skills</h3><p style="color:#444;font-size:14px;">${skills}</p></div></div>`,
    3: `<div style="font-family:Arial,sans-serif;max-width:700px;margin:0 auto;padding:50px;background:white;"><h1 style="font-size:28px;color:#222;margin:0;font-weight:400;border-bottom:1px solid #ddd;padding-bottom:15px;">${pi.fullName}<span style="float:right;font-size:14px;color:#666;font-weight:400;">${pi.email} | ${pi.phone}</span></h1><p style="color:#0072f5;font-size:15px;margin:15px 0;">${pi.title}</p><h3 style="color:#222;font-size:14px;text-transform:uppercase;letter-spacing:2px;border-bottom:1px solid #eee;padding-bottom:5px;">Summary</h3><p style="color:#555;font-size:14px;line-height:1.6;">${data.summary}</p><h3 style="color:#222;font-size:14px;text-transform:uppercase;letter-spacing:2px;border-bottom:1px solid #eee;padding-bottom:5px;">Experience</h3><div style="color:#555;font-size:14px;line-height:1.6;">${exp}</div><h3 style="color:#222;font-size:14px;text-transform:uppercase;letter-spacing:2px;border-bottom:1px solid #eee;padding-bottom:5px;">Education</h3><div style="color:#555;font-size:14px;line-height:1.6;">${edu}</div><h3 style="color:#222;font-size:14px;text-transform:uppercase;letter-spacing:2px;border-bottom:1px solid #eee;padding-bottom:5px;">Skills</h3><p style="color:#555;font-size:14px;">${skills}</p></div>`,
    4: `<div style="font-family:'Segoe UI',sans-serif;max-width:800px;margin:0 auto;"><div style="background:linear-gradient(135deg,#0072f5,#0b98e3);padding:40px;color:white;"><h1 style="font-size:34px;margin:0;">${pi.fullName}</h1><p style="font-size:16px;opacity:0.9;margin:5px 0;">${pi.title}</p><div style="display:flex;gap:20px;margin-top:15px;font-size:13px;opacity:0.8;"><span>${pi.email}</span><span>${pi.phone}</span><span>${pi.location}</span></div></div><div style="padding:40px;background:#f8fbff;"><div style="display:grid;grid-template-columns:2fr 1fr;gap:40px;"><div><h3 style="color:#0072f5;font-size:16px;">Experience</h3><div style="color:#444;font-size:14px;line-height:1.7;">${exp}</div><h3 style="color:#0072f5;font-size:16px;margin-top:25px;">Education</h3><div style="color:#444;font-size:14px;line-height:1.7;">${edu}</div></div><div><h3 style="color:#0072f5;font-size:16px;">Skills</h3><p style="color:#444;font-size:14px;line-height:1.8;">${skills}</p><h3 style="color:#0072f5;font-size:16px;margin-top:25px;">Summary</h3><p style="color:#444;font-size:14px;line-height:1.6;">${data.summary}</p></div></div></div></div>`,
    5: `<div style="font-family:'Courier New',monospace;max-width:800px;margin:0 auto;"><div style="background:#0c0b0e;color:#00e3a0;padding:30px 40px;border-bottom:3px solid #00e3a0;"><h1 style="font-size:30px;margin:0;color:#00e3a0;">&gt; ${pi.fullName}</h1><p style="color:#00b97b;margin:5px 0;font-size:14px;">// ${pi.title}</p><p style="color:#666;font-size:12px;">${pi.email} | ${pi.phone} | ${pi.linkedin}</p></div><div style="padding:40px;background:#111;color:#ccc;"><h3 style="color:#00e3a0;font-size:14px;text-transform:uppercase;">function summary()</h3><p style="font-size:14px;line-height:1.6;padding-left:20px;border-left:2px solid #00e3a0;">${data.summary}</p><h3 style="color:#00e3a0;font-size:14px;text-transform:uppercase;margin-top:25px;">const experience = [</h3><div style="font-size:14px;line-height:1.6;padding-left:20px;border-left:2px solid #00e3a0;">${exp}</div><h3 style="color:#00e3a0;font-size:14px;text-transform:uppercase;margin-top:25px;">const education = [</h3><div style="font-size:14px;line-height:1.6;padding-left:20px;border-left:2px solid #00e3a0;">${edu}</div><h3 style="color:#00e3a0;font-size:14px;text-transform:uppercase;margin-top:25px;">const skills = [</h3><p style="font-size:14px;padding-left:20px;border-left:2px solid #00e3a0;">${skills}</p></div></div>`,
  };

  return templates[templateId] || templates[1];
}

// Simple ResumeData interface for templates
interface ResumeData {
  personalInfo: { fullName: string; email: string; phone: string; location: string; linkedin: string; title: string; };
  summary: string;
  education: { degree: string; field: string; institution: string; graduationYear: string; cgpa: string; }[];
  skills: { technical: string[]; soft: string[]; languages: string[]; };
  experience: { title: string; company: string; startDate: string; endDate: string; current: boolean; description: string; }[];
}
