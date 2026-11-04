import "./globals.css";
import { Poppins } from 'next/font/google';

const poppins = Poppins({
  weight: ['400', '500', '600', '700', '800'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-poppins',
});

import { ThemeProvider } from "./components/ThemeProvider";

const baseUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  process.env.SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : null) ||
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : null) ||
  process.env.URL ||
  'https://shoaibhassan.dev';

export const metadata = {
  metadataBase: new URL(baseUrl),
  title: "Shoaib Hassan | Full-Stack Engineer, AI Automation & Creative Media",
  description: "Software Engineer specializing in Next.js web applications, intelligent AI automations, UGC ad creatives, and digital listing media.",
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/icon.png', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-icon.png' },
    ],
  },
  verification: {
    google: "CrclxNAp0WdPs-yRkRIrSTOSSQ-xqzxse5GSJhj0DsQ",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${poppins.variable} scroll-smooth`}>
      <body
        className={`${poppins.className} bg-background text-foreground transition-colors duration-300`}
      >
        <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
