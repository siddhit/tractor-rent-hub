interface FarmulyaWordmarkProps {
  dark?: boolean;
}

/**
 * "Farmમૂલ્ય" lockup — one line, same in both languages. "Farm" is black
 * (white on dark grounds), "મૂલ્ય" is green (orange-glow on dark grounds).
 * Plain Latin "Farmulya" is used instead only where Gujarati can't render
 * (domain, email, English running copy) — this component is for the header/
 * footer brand lockup specifically.
 */
const FarmulyaWordmark = ({ dark = false }: FarmulyaWordmarkProps) => (
  <span
    style={{
      fontFamily: "'Anek Gujarati', system-ui, sans-serif",
      fontWeight: 800,
      fontSize: 23,
      lineHeight: 1.1,
      whiteSpace: 'nowrap',
    }}
  >
    <span style={{ color: dark ? 'var(--white)' : 'var(--black)' }}>Farm</span>
    <span style={{ color: dark ? 'var(--orange-glow)' : 'var(--green)' }}>મૂલ્ય</span>
  </span>
);

export default FarmulyaWordmark;
