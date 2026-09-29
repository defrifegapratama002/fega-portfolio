/**
 * Brand mark — the gonjong, the rising roofline of a Minangkabau rumah
 * gadang, drawn as three nested curves. Identity, not decoration: it
 * appears only where the site speaks about who Defri is.
 */
export default function Gonjong({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 400 170"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M20 14Q200 196 380 14" />
      <path d="M84 44Q200 170 316 44" />
      <path d="M146 76Q200 142 254 76" />
      <path d="M70 132H330M92 132v26M308 132v26M70 158H330" />
    </svg>
  );
}
