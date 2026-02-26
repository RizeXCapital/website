interface SectionDividerProps {
  variant?: "light" | "dark";
}

/**
 * Modern gradient-glow divider with geometric accents.
 * Thin luminous line that fades from edges to a teal center,
 * with small diamond markers — clean, modern, AI-forward.
 *
 * - light: teal line on light backgrounds
 * - dark: teal line on navy backgrounds (brighter glow)
 */
export default function SectionDivider({ variant = "light" }: SectionDividerProps) {
  const isDark = variant === "dark";

  const lineGradientId = `line-grad-${variant}`;
  const glowId = `glow-${variant}`;

  // Accent color for line + diamonds
  const accentColor = "#2E86AB";
  // Diamond positions along the line (x out of 1200)
  const diamonds = [200, 480, 600, 720, 1000];

  return (
    <div
      className="relative flex w-full items-center justify-center overflow-hidden"
      style={{ height: "32px" }}
      aria-hidden="true"
    >
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 1200 32"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Horizontal gradient: transparent → teal → transparent */}
          <linearGradient id={lineGradientId} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor={accentColor} stopOpacity="0" />
            <stop offset="30%" stopColor={accentColor} stopOpacity={isDark ? "0.6" : "0.3"} />
            <stop offset="50%" stopColor={accentColor} stopOpacity={isDark ? "0.9" : "0.5"} />
            <stop offset="70%" stopColor={accentColor} stopOpacity={isDark ? "0.6" : "0.3"} />
            <stop offset="100%" stopColor={accentColor} stopOpacity="0" />
          </linearGradient>

          {/* Soft glow filter */}
          <filter id={glowId} x="-50%" y="-200%" width="200%" height="500%">
            <feGaussianBlur in="SourceGraphic" stdDeviation={isDark ? "4" : "3"} result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Glow layer — wider, softer duplicate of the line */}
        <line
          x1="0" y1="16" x2="1200" y2="16"
          stroke={`url(#${lineGradientId})`}
          strokeWidth={isDark ? "6" : "4"}
          opacity={isDark ? "0.4" : "0.25"}
          filter={`url(#${glowId})`}
        />

        {/* Crisp center line */}
        <line
          x1="0" y1="16" x2="1200" y2="16"
          stroke={`url(#${lineGradientId})`}
          strokeWidth="1"
        />

        {/* Diamond accents along the line */}
        {diamonds.map((x) => (
          <rect
            key={x}
            x={x - 3}
            y={13}
            width="6"
            height="6"
            rx="1"
            fill={accentColor}
            opacity={isDark ? "0.7" : "0.35"}
            transform={`rotate(45 ${x} 16)`}
          />
        ))}

        {/* Center diamond — slightly larger */}
        <rect
          x={597}
          y={12}
          width="8"
          height="8"
          rx="1"
          fill={accentColor}
          opacity={isDark ? "0.9" : "0.5"}
          transform="rotate(45 601 16)"
        />
      </svg>
    </div>
  );
}
