'use client';

import { useState } from 'react';
import { motion } from 'motion/react';
import { GradientText } from '@/components/reactbits/GradientText';
import { Sms, DirectboxSend, Link21, Code } from 'iconsax-react';

const DEFAULT_COLOR = '#f8fafc';
const HOVER_COLOR = '#818cf8';

interface ContactItem {
  label: string;
  href: string;
  Icon: React.ComponentType<{ color: string; variant: 'Linear' | 'Bold'; size: number }>;
  external: boolean;
}

const CONTACTS: ContactItem[] = [
  {
    label: 'Personal Email',
    href: 'mailto:achyuth.v.rachur@gmail.com',
    Icon: Sms,
    external: false,
  },
  {
    label: 'Crowe Email',
    href: 'mailto:achyuth.rachur@crowe.com',
    Icon: DirectboxSend,
    external: false,
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/achyuth-rachur/',
    Icon: Link21,
    external: true,
  },
  {
    label: 'GitHub',
    href: 'https://github.com/achyuthrachur',
    Icon: Code,
    external: true,
  },
];

function ContactIcon({ item }: { item: ContactItem }) {
  const [hovered, setHovered] = useState(false);
  const color = hovered ? HOVER_COLOR : DEFAULT_COLOR;

  return (
    <motion.a
      href={item.href}
      {...(item.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      className="flex flex-col items-center gap-2 group"
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      whileHover={{ scale: 1.1 }}
      transition={{ duration: 0.15, ease: [0.16, 1, 0.3, 1] }}
    >
      <item.Icon
        color={color}
        variant={hovered ? 'Bold' : 'Linear'}
        size={28}
      />
      <span className="text-xs font-body text-slate-400 group-hover:text-[#818cf8] transition-colors duration-150">
        {item.label}
      </span>
    </motion.a>
  );
}

export function ContactSection() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-24 text-center">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <h2 className="text-3xl font-semibold font-body">
          <GradientText colors={['#818cf8', '#f8fafc', '#818cf8']} animationSpeed={6}>
            Let&apos;s connect
          </GradientText>
        </h2>
        <p className="text-sm font-body text-slate-400 mt-3 mb-10">
          Open to new projects, conversations, and opportunities.
        </p>
        <div className="flex flex-row gap-10 justify-center flex-wrap">
          {CONTACTS.map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <ContactIcon item={item} />
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
