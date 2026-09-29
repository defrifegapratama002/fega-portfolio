"use client";

import { useLang } from "@/lib/i18n";

/**
 * The hero's editor window: who Defri is, written the way a developer
 * would write it. Every value mirrors copy that already exists on the
 * site — no invented claims (blueprint §47).
 */

type Tok = [cls: "" | "kw" | "str" | "prop" | "com", text: string];

function lines(principles: [string, string, string]): Tok[][] {
  const str = (s: string): Tok => ["str", `"${s}"`];
  return [
    [["kw", "const"], ["", " defri: "], ["prop", "ProblemSolver"], ["", " = {"]],
    [["", "  "], ["prop", "role"], ["", ": "], str("Problem Solver"), ["", ","]],
    [["", "  "], ["prop", "craft"], ["", ": "], str("Software Engineer"), ["", ","]],
    [["", "  "], ["prop", "roots"], ["", ": "], str("Minangkabau"), ["", ","]],
    [["", "  "], ["prop", "builds"], ["", ": ["], str("AI"), ["", ", "], str("Data"), ["", ", "], str("Web"), ["", ","]],
    [["", "           "], str("Mobile"), ["", ", "], str("Automation"), ["", ", "], str("IoT"), ["", "],"]],
    [["", "  "], ["prop", "solutions"], ["", ": ["]],
    [["", "    "], str(principles[0]), ["", ", "], str(principles[1]), ["", ", "], str(principles[2]), ["", ","]],
    [["", "  ],"]],
    [["", "};"]],
    [],
    [["kw", "export default"], ["", " defri."], ["prop", "solve"], ["", "(yourProblem);"]],
  ];
}

export default function CodeCard({ className = "" }: { className?: string }) {
  const { lang } = useLang();
  const code = lines(lang === "en" ? ["precise", "creative", "modern"] : ["tepat", "kreatif", "modern"]);

  return (
    <div className={`win win-dark ${className}`} aria-hidden="true">
      <div className="win-bar">
        <span className="win-dots">
          <i />
          <i />
          <i />
        </span>
        <span>defri.ts</span>
        <span className="ml-auto">TypeScript</span>
      </div>
      <div className="code scroll-x px-3 py-4 sm:px-4">
        {code.map((line, i) => (
          <div key={i} className="code-line">
            <span className="code-num">{i + 1}</span>
            <span>
              {line.map(([cls, text], j) => (
                <span key={j} className={cls ? `tok-${cls}` : undefined}>
                  {text}
                </span>
              ))}
              {i === code.length - 1 ? <span className="caret ml-1" /> : null}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
