import type { Metadata } from 'next';
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import { Chewy } from 'next/font/google';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import './globals.css';

// Initialize Inter font with bold weight
const christmasFont = Chewy({
  weight: ['400'],
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'BUSY julebingo',
  description: 'Julebingo 2024',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={christmasFont.className}>
      <body className={`${GeistSans.variable} ${GeistMono.variable} antialiased`}>
        {children}

        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
