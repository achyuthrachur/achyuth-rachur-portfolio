// src/app/layout.tsx
import type { Metadata } from 'next';
import '@fontsource-variable/inter';
import './globals.css';

export const metadata: Metadata = {
  title: 'Achyuth Rachur — Staff Consultant | IRM',
  description:
    'Portfolio of Achyuth Rachur, Staff Consultant in Integrated Risk Management at Crowe LLP.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="font-body antialiased">{children}</body>
    </html>
  );
}
