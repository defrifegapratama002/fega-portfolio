/**
 * Technology, grouped by what it is used for (specification §12) — no
 * percentages, no stars. Every entry appears in a real project in
 * data/projects.ts; add a technology here only after it has been used.
 */

export type StackGroup = {
  name: string;
  tools: string[];
};

export const stack: StackGroup[] = [
  { name: "AI", tools: ["Python", "LLM", "Speech Recognition", "Text-to-Speech", "NLP", "scikit-learn"] },
  { name: "Vision", tools: ["TensorFlow", "CNN", "OCR"] },
  { name: "Web", tools: ["TypeScript", "React", "Next.js", "Vue 3", "Tailwind CSS", "Three.js", "GSAP"] },
  { name: "Backend", tools: ["Laravel", "Filament", "PHP", "Node", "Express"] },
  { name: "Mobile", tools: ["Kotlin", "Jetpack Compose", "Flutter", "Dart"] },
  { name: "Data", tools: ["pandas", "MySQL", "Postgres", "SQLite", "Supabase", "Prisma"] },
  { name: "Delivery", tools: ["Git", "GitHub Actions", "Vercel", "Cloudflare Workers"] },
];
