/**
 * Where the site lives. Override with NEXT_PUBLIC_SITE_URL when moving to
 * a custom domain; used for canonical URLs, the sitemap and structured data.
 */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://defrifegapratama002.github.io/fega-portfolio"
).replace(/\/$/, "");

export const SITE_TITLE = "Defri Fega Pratama · Problem Solver, Software Engineer";

export const SITE_DESCRIPTION =
  "Defri Fega Pratama builds software for real problems: a CRM/ERP that runs an export company's daily operations, an AI English speaking tutor sold to real users, an offline back office for a meat distributor. AI, data, web, mobile, automation, IoT.";
