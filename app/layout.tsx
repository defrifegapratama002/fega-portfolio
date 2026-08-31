import type { Metadata } from "next";
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import { LanguageProvider } from "@/lib/i18n";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const grotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-grotesk" });
const jbmono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jbmono" });

export const metadata: Metadata = {
  title: "Defri Fega Pratama — Software Engineer",
  description:
    "Defri Fega Pratama is a software engineer solving real problems with precise, creative, and modern solutions — through AI, data, software, automation, web and mobile technologies.",
  keywords: [
    "Defri Fega Pratama",
    "software engineer",
    "AI",
    "computer vision",
    "data analytics",
    "web development",
    "mobile development",
    "automation",
  ],
  openGraph: {
    title: "Defri Fega Pratama — Software Engineer",
    description:
      "I build technology to solve real problems — with precise, creative, modern solutions. AI · Data · Software · Automation.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    // suppressHydrationWarning: a pre-hydration inline script adds the "js"
    // class (progressive-enhancement flag for reveal styles) to <html>.
    <html
      lang="en"
      className={`${inter.variable} ${grotesk.variable} ${jbmono.variable}`}
      suppressHydrationWarning
    >
      <body>
        {/* Progressive enhancement flag: reveal styles apply only with JS */}
        <script
          dangerouslySetInnerHTML={{
            __html: "document.documentElement.classList.add('js')",
          }}
        />
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
