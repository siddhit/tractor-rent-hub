interface FarmulyaMarkProps {
  size?: number;
  round?: boolean;
  ring?: boolean;
  className?: string;
}

/**
 * The furrow "F" mark: a white ground with a black F and an orange seed.
 * `ring` (default true) draws the black keyline; drop it on dark backgrounds
 * (e.g. the footer) where the white ground already reads against black.
 */
const FarmulyaMark = ({ size = 40, round = false, ring = true, className }: FarmulyaMarkProps) => {
  return (
    <span
      className={className}
      style={{
        display: 'inline-flex',
        width: size,
        height: size,
        borderRadius: round ? '50%' : '24%',
        background: 'var(--white)',
        boxShadow: ring ? 'inset 0 0 0 2px var(--black)' : undefined,
        flexShrink: 0,
      }}
    >
      <svg viewBox="0 0 100 100" width="100%" height="100%">
        <rect x="29" y="23" width="15" height="55" rx="7.5" fill="var(--black)" />
        <rect x="29" y="23" width="46" height="15" rx="7.5" fill="var(--black)" />
        <rect x="29" y="47" width="30" height="15" rx="7.5" fill="var(--black)" />
        <circle cx="69" cy="54.5" r="5" fill="var(--orange)" />
      </svg>
    </span>
  );
};

export default FarmulyaMark;
