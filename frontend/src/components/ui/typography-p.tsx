type TypographyPprops = {
  children: React.ReactNode;
};

export function TypographyP({ children }: TypographyPprops) {
  return <p className="leading-7">{children}</p>;
}
