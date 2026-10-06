import type { Metadata } from "next";
import { Inter, Newsreader, JetBrains_Mono } from "next/font/google";
import { LanguageProvider } from "@/lib/i18n";
import { ThemeProvider } from "@/lib/theme";
import { SITE_DESCRIPTION, SITE_TITLE, SITE_URL } from "@/lib/site";
import { brand, contacts } from "@/data/brand";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const newsreader = Newsreader({
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["opsz"],
  variable: "--font-newsreader",
});
const jbmono = JetBrains_Mono({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-jbmono" });

export const metadata: Metadata = {
  metadataBase: new URL(`${SITE_URL}/`),
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  alternates: { canonical: `${SITE_URL}/` },
  keywords: [
    "Defri Fega Pratama",
    "problem solver",
    "software engineer",
    "AI",
    "automation",
    "computer vision",
    "data analytics",
    "IoT",
    "web development",
    "mobile development",
  ],
  authors: [{ name: brand.name, url: `${SITE_URL}/` }],
  openGraph: {
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    type: "website",
    url: `${SITE_URL}/`,
    siteName: brand.name,
  },
};

/** Structured data: who this site is about. */
const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: brand.name,
  jobTitle: "Software Engineer",
  description: SITE_DESCRIPTION,
  url: `${SITE_URL}/`,
  email: `mailto:${contacts.email}`,
  sameAs: [contacts.github, contacts.linkedin].filter(Boolean),
  knowsAbout: [
    "Artificial Intelligence",
    "Software Engineering",
    "Automation",
    "Computer Vision",
    "Data Analytics",
    "Internet of Things",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    // suppressHydrationWarning: a pre-hydration inline script restores the
    // persisted data-theme on <html> before React hydrates.
    <html
      lang="en"
      data-theme="merah"
      className={`${inter.variable} ${newsreader.variable} ${jbmono.variable}`}
      suppressHydrationWarning
    >
      <body>
        <script
          dangerouslySetInnerHTML={{
            __html:
              "try{var t=localStorage.getItem('fega-theme');if(t==='merah'||t==='ungu'||t==='hijau'||t==='gelap')document.documentElement.dataset.theme=t}catch(e){}",
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <ThemeProvider>
          <LanguageProvider>{children}</LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
