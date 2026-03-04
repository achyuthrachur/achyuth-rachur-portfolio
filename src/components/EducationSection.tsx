'use client';

import { motion, useReducedMotion } from 'motion/react';
import { TiltedCard } from '@/components/reactbits/TiltedCard';
import { SpotlightCard } from '@/components/reactbits/SpotlightCard';
import { ShinyText } from '@/components/reactbits/ShinyText';
import { DecryptedText } from '@/components/reactbits/DecryptedText';
import { useTheme } from '@/components/ThemeProvider';

interface ResearchPaper {
  title: string;
  publication: string;
  date: string;
  url: string;
}

const researchPapers: ResearchPaper[] = [
  {
    title: 'The Effect of the Digital Age on Privacy in the United States',
    publication: 'Centre for Business and Economic Research — Business and Management Review',
    date: 'September 26, 2022',
    url: 'https://cberuk.com/cdn/conference_proceedings/2022-09-16-09-14-01-AM.pdf',
  },
  {
    title: 'Securing the Future: Legal Strategies for AI Implementation in Business Operations',
    publication: 'Eurasia Business and Economics Society',
    date: 'April 2024',
    url: '/Securing_the_Future.pdf',
  },
];

export function EducationSection() {
  const prefersReduced = useReducedMotion();
  const { theme } = useTheme();
  const headingColor = theme === 'dark' ? '#f6f7fa' : '#0f172a';

  return (
    <div className="max-w-5xl mx-auto px-6 py-24">
      {/* Section heading */}
      <motion.div
        {...(prefersReduced ? {} : {
          initial: { opacity: 0, y: 30 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, margin: '-100px' },
          transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
        })}
      >
        <p className="text-xs font-semibold tracking-[0.2em] uppercase font-body mb-1">
          <DecryptedText text="03 · EDUCATION" className="text-[#6366f1]" speed={30} />
        </p>
        <h2 className="text-3xl font-semibold font-body">
          <ShinyText text="Education" as="span" baseColor={headingColor} shineColor="rgba(255,255,255,0.85)" speed={6} />
        </h2>
        <motion.div
          className="h-0.5 bg-[#6366f1] rounded-full mt-2 mb-8"
          {...(prefersReduced ? {} : {
            initial: { width: 0 },
            whileInView: { width: '3rem' },
            viewport: { once: true },
            transition: { delay: 0.2, duration: 0.5, ease: [0.16, 1, 0.3, 1] },
          })}
        />
      </motion.div>

      {/* Degree card */}
      <motion.div
        {...(prefersReduced ? {} : {
          initial: { opacity: 0, y: 30 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, margin: '-100px' },
          transition: { duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] },
        })}
      >
        <TiltedCard
          glareColor="rgba(99, 102, 241, 0.6)"
          className="rounded-xl bg-white dark:bg-[#1e293b] p-8 shadow-crowe-card dark:shadow-none"
        >
          <p className="text-xs font-body text-tint-500 dark:text-[#64748b] uppercase tracking-widest mb-2">Degree</p>
          <h3 className="text-xl font-semibold text-tint-900 dark:text-[#f6f7fa] font-body">
            Bachelor of Science in Management and Data Analytics
          </h3>
          <p className="text-base font-body text-tint-900 dark:text-[#818cf8] font-semibold mt-1">
            Purdue University
          </p>
          <p className="text-sm font-body text-tint-500 dark:text-[#64748b] mt-1">December 2024</p>
        </TiltedCard>
      </motion.div>

      {/* Research subsection */}
      <div className="mt-12">
        <h3 className="text-xl font-semibold text-tint-900 dark:text-[#f6f7fa] font-body mb-2">Research</h3>
        <div className="h-0.5 w-8 bg-[#6366f1] rounded-full mb-6" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {researchPapers.map((paper, index) => (
            <motion.div
              key={paper.url}
              {...(prefersReduced ? {} : {
                initial: { opacity: 0, y: 30 },
                whileInView: { opacity: 1, y: 0 },
                viewport: { once: true, margin: '-100px' },
                transition: {
                  duration: 0.6,
                  delay: 0.1 + index * 0.1,
                  ease: [0.16, 1, 0.3, 1],
                },
              })}
            >
              <SpotlightCard spotlightColor="rgba(99, 102, 241, 0.08)" className="p-6">
                <p className="text-xs font-body text-tint-500 dark:text-[#64748b] uppercase tracking-widest mb-2">
                  {paper.publication}
                </p>
                <p className="text-sm font-semibold text-tint-900 dark:text-[#d1d5db] font-body leading-snug mb-1">
                  {paper.title}
                </p>
                <p className="text-xs font-body text-tint-500 dark:text-[#64748b] mb-4">{paper.date}</p>
                <a
                  href={paper.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#6366f1] hover:text-[#4f46e5] transition-colors duration-150"
                >
                  View Paper
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                    <polyline points="15 3 21 3 21 9" />
                    <line x1="10" y1="14" x2="21" y2="3" />
                  </svg>
                </a>
              </SpotlightCard>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
