/**
 * Where the site lives. Override with NEXT_PUBLIC_SITE_URL when moving to
 * a custom domain; used for canonical URLs, the sitemap and structured data.
 */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://defrifegapratama002.github.io/fega-portfolio"
).replace(/\/$/, "");

export const SITE_TITLE = "Defri Fega Pratama — Problem Solver & Software Engineer";

export const SITE_DESCRIPTION =
  "Portfolio of Defri Fega Pratama — a problem solver and software engineer building AI, software, automation, computer vision, data and IoT systems for real-world problems.";
