'use client';

import { AnimatedList } from '@/components/reactbits/AnimatedList';

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

interface SkillGroupProps {
  title: string;
  skills: string[];
}

function SkillGroup({ title, skills }: SkillGroupProps) {
  return (
    <div>
      <h3 className="text-lg font-semibold text-crowe-indigo-dark font-body">{title}</h3>
      <div className="h-0.5 w-8 bg-crowe-amber mt-1 mb-4" />
      <AnimatedList className="flex flex-col gap-2" delay={80} duration={0.5}>
        {skills.map((skill) => (
          <span
            key={skill}
            className="bg-white text-[#2d3142] border-none shadow-crowe-sm rounded-full px-3 py-1.5 text-sm font-medium cursor-default transition-all duration-200 hover:shadow-amber-glow hover:scale-[1.03] inline-block"
          >
            {skill}
          </span>
        ))}
      </AnimatedList>
    </div>
  );
}

export function SkillsSection() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-24">
      <h2 className="text-3xl font-semibold text-crowe-indigo-dark font-body mb-2">Skills</h2>
      <div className="h-0.5 w-12 bg-crowe-amber rounded-full mb-10" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {SKILL_GROUPS.map((group) => (
          <SkillGroup key={group.title} title={group.title} skills={group.skills} />
        ))}
      </div>
    </div>
  );
}
