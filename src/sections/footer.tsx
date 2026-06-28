import { Sparkles } from 'lucide-react';

const footerLinks = {
  Tools: ['Resume Generator', 'LinkedIn Bio', 'Abstract Generator', 'CGPA Calculator', 'PPT Generator'],
  Resources: ['Templates', 'Documentation', 'API Access', 'Blog'],
  Company: ['About Us', 'Careers', 'Privacy Policy', 'Terms of Service'],
  Connect: ['Contact Support', 'Discord Community', 'Twitter/X', 'GitHub'],
};

export function Footer() {
  return (
    <footer className="bg-[#0e0e0e] border-t border-white/[0.05]">
      <div className="max-w-[1200px] mx-auto px-5 pt-16 pb-10">
        {/* Top Row */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-10">
          {/* Brand Column */}
          <div className="col-span-2 md:col-span-3 lg:col-span-1 mb-6 lg:mb-0">
            <a href="#" className="flex items-center gap-2 text-white font-bold text-lg mb-3">
              <Sparkles className="w-5 h-5 text-[#693def]" />
              <span>GradGenie AI</span>
            </a>
            <p className="text-sm text-[#aeadae] max-w-[200px]">
              AI-powered tools for student success.
            </p>
          </div>

          {/* Link Columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-xs font-medium uppercase tracking-widest text-white/50 mb-4">
                {category}
              </h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm text-[#aeadae] hover:text-white transition-colors duration-200"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="border-t border-white/[0.08] my-10" />

        {/* Bottom Row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-[#aeadae]/60">
            &copy; 2026 GradGenie AI. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            {['X', 'GitHub', 'Discord'].map((social) => (
              <a
                key={social}
                href="#"
                className="text-sm text-white/40 hover:text-white transition-colors duration-200"
              >
                {social}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
