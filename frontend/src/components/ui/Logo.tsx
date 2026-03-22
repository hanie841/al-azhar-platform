interface LogoProps {
  className?: string;
  size?: number;
  variant?: 'light' | 'dark';
}

export function Logo({ className = '', size = 40, variant }: LogoProps) {
  // When no variant specified, use currentColor so it adapts to dark mode via CSS
  const useCurrentColor = !variant;
  const primary = useCurrentColor ? 'currentColor' : variant === 'light' ? '#0d4f4f' : '#ffffff';
  const accent = '#c9a84c';

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${useCurrentColor ? 'text-primary-700 dark:text-sand-100' : ''} ${className}`}
      aria-label="Al-Azhar University logo"
    >
      {/* Outer circle */}
      <circle cx="50" cy="50" r="48" stroke={accent} strokeWidth="2" fill="none" />

      {/* Dome base */}
      <rect x="30" y="62" width="40" height="14" rx="1" fill={primary} />

      {/* Columns */}
      <rect x="34" y="52" width="4" height="10" rx="1" fill={primary} />
      <rect x="48" y="52" width="4" height="10" rx="1" fill={primary} />
      <rect x="62" y="52" width="4" height="10" rx="1" fill={primary} />

      {/* Main dome */}
      <path
        d="M30 52 Q50 28 70 52"
        stroke={primary}
        strokeWidth="3"
        fill="none"
      />

      {/* Minaret left */}
      <rect x="22" y="36" width="5" height="26" rx="1" fill={primary} />
      <path d="M22 36 L24.5 28 L27 36" fill={accent} />
      <circle cx="24.5" cy="26" r="2" fill={accent} />

      {/* Minaret right */}
      <rect x="73" y="36" width="5" height="26" rx="1" fill={primary} />
      <path d="M73 36 L75.5 28 L78 36" fill={accent} />
      <circle cx="75.5" cy="26" r="2" fill={accent} />

      {/* Crescent on dome */}
      <path
        d="M50 32 Q46 28 50 24 Q52 28 50 32"
        fill={accent}
      />
      <line x1="50" y1="24" x2="50" y2="20" stroke={accent} strokeWidth="1.5" />

      {/* Decorative arch inside dome */}
      <path
        d="M40 52 Q50 38 60 52"
        stroke={accent}
        strokeWidth="1.5"
        fill="none"
      />

      {/* Star detail at base */}
      <polygon
        points="50,66 51.5,69 55,69 52.2,71 53.2,74 50,72 46.8,74 47.8,71 45,69 48.5,69"
        fill={accent}
      />
    </svg>
  );
}
