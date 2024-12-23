// src/app/layout.tsx

import type { Metadata } from 'next';
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import { Chewy } from 'next/font/google';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import './globals.css';

const christmasFont = Chewy({
  weight: ['400'],
  subsets: ['latin'],
  display: 'swap',
});

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://jule.bingo';

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: 'BUSY julebingo',
  description: 'Julebingo 2024',
  openGraph: {
    type: 'website',
    title: 'BUSY julebingo',
    description: 'Julebingo 2024',
    images: [
      {
        url: '/og-image.jpg', // You'll need to add this image to your public folder
        width: 1200,
        height: 630,
        alt: 'BUSY julebingo',
      },
    ],
    siteName: 'BUSY julebingo',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BUSY julebingo',
    description: 'Julebingo 2024',
    images: ['/og-image.jpg'], // Same image as OG
  },
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
