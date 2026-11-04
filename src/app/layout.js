import "./globals.css";
import { Poppins } from 'next/font/google';

const poppins = Poppins({
  weight: ['400', '500', '600', '700', '800'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-poppins',
});

import { ThemeProvider } from "./components/ThemeProvider";

export const metadata = {
  title: "Shoaib Hassan | Full-Stack Engineer, AI Automation & Creative Media",
  description: "Software Engineer specializing in Next.js web applications, intelligent AI automations, UGC ad creatives, and digital listing media.",
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
