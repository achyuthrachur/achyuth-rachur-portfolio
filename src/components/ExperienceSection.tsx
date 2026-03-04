'use client';

import { useEffect, useRef } from 'react';
import { animate, stagger } from 'animejs';
import { SpotlightCard } from '@/components/reactbits/SpotlightCard';
import { TiltedCard } from '@/components/reactbits/TiltedCard';
import { ShinyText } from '@/components/reactbits/ShinyText';
import { DecryptedText } from '@/components/reactbits/DecryptedText';
import { useTheme } from '@/components/ThemeProvider';

function Highlight({ children }: { children: string }) {
  return (
    <span className="bg-[#eef2ff] dark:bg-[#312e81]/40 text-[#4f46e5] dark:text-[#818cf8] font-semibold px-1 rounded-sm">
      {children}
    </span>
  );
}

export function ExperienceSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();
  const headingColor = theme === 'dark' ? '#f6f7fa' : '#0f172a';

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const container = containerRef.current;
    if (prefersReduced || !container) return;

    const cards = container.querySelectorAll<HTMLElement>('.exp-card');
    if (!cards.length) return;

    animate(Array.from(cards), { opacity: 0, translateY: 40, duration: 0 });

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
          // Stagger pulse on timeline dots
          const dots = container.querySelectorAll<HTMLElement>('.exp-dot');
          dots.forEach((dot, idx) => {
            setTimeout(() => dot.classList.add('dot-pulse'), idx * 100);
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
      {/* Section number + heading */}
      <p className="text-xs font-semibold tracking-[0.2em] uppercase font-body mb-1">
        <DecryptedText text="01 · EXPERIENCE" className="text-[#6366f1]" speed={30} />
      </p>
      <h2 className="text-2xl font-semibold font-body">
        <ShinyText text="Crowe LLP" as="span" baseColor={headingColor} shineColor="rgba(255,255,255,0.85)" speed={6} />
      </h2>
      <p className="text-sm text-tint-500 dark:text-[#64748b] mt-1 mb-10 font-body">
        Staff Consultant | AI Enablement & Integrated Risk Management · Feb 2025 – Present
      </p>

      {/* Timeline */}
      <div className="relative">
        {/* Vertical line */}
        <div className="absolute left-0 top-2 bottom-2 w-px bg-[#6366f1] opacity-25" />

        <div ref={containerRef} className="flex flex-col gap-4 pl-8">
          {[
            <p key="1" className="text-base text-tint-900 dark:text-[#d1d5db] leading-relaxed font-body">
              Lead <Highlight>AI enablement</Highlight> for financial institutions — including a{' '}
              <Highlight>top 5 U.S. bank</Highlight> — translating risk and compliance needs into
              practical ML and GenAI use cases with clear scope, controls, and monitoring plans.
            </p>,
            <p key="2" className="text-base text-tint-900 dark:text-[#d1d5db] leading-relaxed font-body">
              Design and develop AI solutions across audit, financial crime, model validation, and
              reconciliation — automating evidence collection, investigation support, exception
              triage, and consistency checks.
            </p>,
            <p key="3" className="text-base text-tint-900 dark:text-[#d1d5db] leading-relaxed font-body">
              Implement <Highlight>governance-first</Highlight> patterns for AI in production,
              including model documentation, control design,{' '}
              <Highlight>bias/fairness</Highlight> considerations, human-in-the-loop review, and
              ongoing performance monitoring.
            </p>,
            <p key="4" className="text-base text-tint-900 dark:text-[#d1d5db] leading-relaxed font-body">
              Support <Highlight>Model Risk Management (MRM)</Highlight> programs through{' '}
              <Highlight>independent validation</Highlight> of vendor and internally developed
              models at banks with <Highlight>$1B–$50B in assets</Highlight>, assessing conceptual
              soundness, data quality, performance, stability, and implementation risk.
            </p>,
            <p key="5" className="text-base text-tint-900 dark:text-[#d1d5db] leading-relaxed font-body">
              Evaluate model documentation and internal controls against regulatory expectations
              and industry sound practices; deliver clear findings, remediation recommendations,
              and defensible workpapers.
            </p>,
            <p key="6" className="text-base text-tint-900 dark:text-[#d1d5db] leading-relaxed font-body">
              Partner with stakeholders across risk, compliance, audit, and technology to drive
              adoption — balancing innovation speed with operational constraints and control
              requirements.
            </p>,
          ].map((content, i) => (
            <div key={i} className="relative">
              {/* Timeline dot — pulse triggered by parent card animation */}
              <div className="exp-dot absolute -left-8 top-5 w-2.5 h-2.5 rounded-full bg-[#6366f1] ring-2 ring-[#f1f5f9] dark:ring-[#111827]" />
              <TiltedCard
                tiltMaxAngleX={4}
                tiltMaxAngleY={6}
                glareEnable={true}
                glareColor="rgba(99,102,241,0.6)"
                glareMaxOpacity={0.08}
                scale={1.01}
                transitionSpeed={300}
                className="exp-card"
              >
                <SpotlightCard
                  className="p-6 dark:bg-[#1e293b] dark:border dark:border-[rgba(255,255,255,0.06)]"
                  spotlightColor="rgba(99,102,241,0.08)"
                >
                  {content}
                </SpotlightCard>
              </TiltedCard>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
