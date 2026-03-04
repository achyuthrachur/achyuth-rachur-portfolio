'use client';

import { AnimatedList } from '@/components/reactbits/AnimatedList';
import { ShinyText } from '@/components/reactbits/ShinyText';
import { DecryptedText } from '@/components/reactbits/DecryptedText';
import { useTheme } from '@/components/ThemeProvider';

const SKILL_GROUPS = [
  {
    title: 'AI, Analytics & Engineering',
    skills: [
      'Generative AI (use-case design, prompt/agent patterns, workflow automation)',
      'Machine Learning (model development concepts, evaluation, monitoring)',
      'Model monitoring & drift concepts (performance stability, ongoing controls)',
      'Data analysis & scripting (Python, R)',
      'Data visualization & dashboards (Tableau)',
    ],
  },
  {
    title: 'Risk, Compliance & Governance',
    skills: [
      'AI governance & controls (transparency, auditability, human oversight)',
      'Bias/fairness risk concepts & testing approaches',
      'Risk & compliance process automation',
      'Control design, evidence, and defensible documentation',
      'Stakeholder management (risk/compliance/technology alignment)',
    ],
  },
  {
    title: 'Model Risk Management',
    skills: [
      'Independent Model Validation (vendor + internally developed models)',
      'Model performance & stability assessment',
      'Documentation and internal controls review',
      'CECL familiarity (WARM, DCF) and quantitative testing methods (e.g., OLS; HAC-adjusted techniques)',
    ],
  },
  {
    title: 'Domain Use Cases',
    skills: [
      'Audit analytics & automation',
      'Financial crime / AML operations support (triage, investigation enablement concepts)',
      'Model validation automation & reviewer support',
      'Reconciliation automation & exception management',
    ],
  },
];

// Flat list for the marquee ticker
const ALL_SKILLS = SKILL_GROUPS.flatMap((g) => g.skills);

interface SkillGroupProps {
  title: string;
  skills: string[];
}

function SkillGroup({ title, skills }: SkillGroupProps) {
  return (
    <div>
      <h3 className="text-lg font-semibold text-tint-900 dark:text-[#f6f7fa] font-body">{title}</h3>
      <div className="h-0.5 w-8 bg-[#6366f1] mt-1 mb-4" />
      <AnimatedList className="flex flex-col gap-2" delay={80} duration={0.5}>
        {skills.map((skill) => (
          <span
            key={skill}
            className="bg-white dark:bg-[#1e293b] text-tint-900 dark:text-[#d1d5db] border-none shadow-crowe-sm dark:shadow-none dark:border dark:border-[rgba(255,255,255,0.06)] rounded-full px-3 py-1.5 text-sm font-medium cursor-default transition-all duration-200 hover:shadow-amber-glow hover:scale-[1.03] inline-block"
          >
            {skill}
          </span>
        ))}
      </AnimatedList>
    </div>
  );
}

export function SkillsSection() {
  const { theme } = useTheme();
  const headingColor = theme === 'dark' ? '#f6f7fa' : '#0f172a';

  return (
    <div className="max-w-5xl mx-auto px-6 py-24">
      <p className="text-xs font-semibold tracking-[0.2em] uppercase font-body mb-1">
        <DecryptedText text="02 · SKILLS" className="text-[#6366f1]" speed={30} />
      </p>
      <h2 className="text-3xl font-semibold font-body mb-2">
        <ShinyText text="Skills" as="span" baseColor={headingColor} shineColor="rgba(255,255,255,0.85)" speed={6} />
      </h2>
      <div className="h-0.5 w-12 bg-[#6366f1] rounded-full mb-10" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {SKILL_GROUPS.map((group) => (
          <SkillGroup key={group.title} title={group.title} skills={group.skills} />
        ))}
      </div>

      {/* Marquee ticker — all skills in one infinite scroll */}
      <div className="mt-16 overflow-hidden">
        <div className="flex gap-3 marquee-track w-max">
          {[...ALL_SKILLS, ...ALL_SKILLS].map((skill, i) => (
            <span
              key={i}
              className="flex-shrink-0 bg-white dark:bg-[#1e293b] text-tint-500 dark:text-[#64748b] border border-[rgba(99,102,241,0.15)] rounded-full px-4 py-1.5 text-xs font-medium font-body whitespace-nowrap"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
