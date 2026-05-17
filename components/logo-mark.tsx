export function LogoMark({ size = 22, color = "var(--accent)" }: { size?: number; color?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      {/* Edges — drawn first so they sit behind nodes */}
      <line x1="6" y1="8" x2="15" y2="6" stroke={color} strokeWidth="1" strokeOpacity="0.35" />
      <line x1="6" y1="8" x2="9" y2="17" stroke={color} strokeWidth="1" strokeOpacity="0.35" />
      <line x1="15" y1="6" x2="18" y2="16" stroke={color} strokeWidth="1" strokeOpacity="0.35" />
      <line x1="9" y1="17" x2="18" y2="16" stroke={color} strokeWidth="1" strokeOpacity="0.35" />
      <line x1="15" y1="6" x2="9" y2="17" stroke={color} strokeWidth="1" strokeOpacity="0.18" />

      {/* Nodes — asymmetric sizes for organic feel */}
      <circle cx="6" cy="8" r="2.2" fill={color} />
      <circle cx="15" cy="6" r="1.7" fill={color} />
      <circle cx="9" cy="17" r="1.9" fill={color} />
      <circle cx="18" cy="16" r="2.4" fill={color} />
    </svg>
  );
}
