'use client';

import { useEffect, useRef } from 'react';
import { animate, stagger } from 'animejs';
import { SpotlightCard } from '@/components/reactbits/SpotlightCard';

// Amber-wash highlight span helper
function Highlight({ children }: { children: string }) {
  return (
    <span className="bg-[#eef2ff] text-[#4f46e5] font-semibold px-1 rounded-sm">{children}</span>
  );
}

export function ExperienceSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const container = containerRef.current;
    if (prefersReduced || !container) return;

    const cards = container.querySelectorAll<HTMLElement>('.exp-card');
    if (!cards.length) return;

    // Set cards invisible before scroll trigger fires
    animate(Array.from(cards), { opacity: 0, translateY: 40, duration: 0 });

    // IntersectionObserver pattern — proven in this codebase (Nav.tsx)
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          animate(Array.from(cards), {
            opacity: [0, 1],
            translateY: [40, 0],
            duration: 600,
            delay: stagger(100),
            ease: 'outQuint',
          });
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(container);

    return () => observer.disconnect();
  }, []);

  return (
    <div className="max-w-5xl mx-auto px-6 py-24">
      <h2 className="text-2xl font-semibold text-crowe-indigo-dark font-body">Crowe LLP</h2>
      <p className="text-sm text-tint-500 mt-1 mb-10 font-body">
        Staff Consultant | Integrated Risk Management · Feb 2025 – Present
      </p>

      <div ref={containerRef} className="flex flex-col gap-4">
        {/* Card 1 */}
        <SpotlightCard className="exp-card p-6" spotlightColor="rgba(99,102,241,0.08)">
          <p className="text-base text-tint-900 leading-relaxed font-body">
            Lead <Highlight>AI enablement</Highlight> for financial institutions — including a{' '}
            <Highlight>top 5 U.S. bank</Highlight> — translating risk and compliance needs into
            practical ML and GenAI use cases with clear scope, controls, and monitoring plans.
          </p>
        </SpotlightCard>

        {/* Card 2 */}
        <SpotlightCard className="exp-card p-6" spotlightColor="rgba(99,102,241,0.08)">
          <p className="text-base text-tint-900 leading-relaxed font-body">
            Design and develop AI solutions across audit, financial crime, model validation, and
            reconciliation — automating evidence collection, investigation support, exception
            triage, and consistency checks.
          </p>
        </SpotlightCard>

        {/* Card 3 */}
        <SpotlightCard className="exp-card p-6" spotlightColor="rgba(99,102,241,0.08)">
          <p className="text-base text-tint-900 leading-relaxed font-body">
            Implement <Highlight>governance-first</Highlight> patterns for AI in production,
            including model documentation, control design,{' '}
            <Highlight>bias/fairness</Highlight> considerations, human-in-the-loop review, and
            ongoing performance monitoring.
          </p>
        </SpotlightCard>

        {/* Card 4 */}
        <SpotlightCard className="exp-card p-6" spotlightColor="rgba(99,102,241,0.08)">
          <p className="text-base text-tint-900 leading-relaxed font-body">
            Support <Highlight>Model Risk Management (MRM)</Highlight> programs through{' '}
            <Highlight>independent validation</Highlight> of vendor and internally developed
            models at banks with <Highlight>$1B–$50B in assets</Highlight>, assessing conceptual
            soundness, data quality, performance, stability, and implementation risk.
          </p>
        </SpotlightCard>

        {/* Card 5 */}
        <SpotlightCard className="exp-card p-6" spotlightColor="rgba(99,102,241,0.08)">
          <p className="text-base text-tint-900 leading-relaxed font-body">
            Evaluate model documentation and internal controls against regulatory expectations
            and industry sound practices; deliver clear findings, remediation recommendations,
            and defensible workpapers.
          </p>
        </SpotlightCard>

        {/* Card 6 */}
        <SpotlightCard className="exp-card p-6" spotlightColor="rgba(99,102,241,0.08)">
          <p className="text-base text-tint-900 leading-relaxed font-body">
            Partner with stakeholders across risk, compliance, audit, and technology to drive
            adoption — balancing innovation speed with operational constraints and control
            requirements.
          </p>
        </SpotlightCard>
      </div>
    </div>
  );
}
