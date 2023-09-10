export const Section = ({
  children,
  title,
  subtitle
}: {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
}) => (
  <>
    <div className="py-2 pt-3">
      <h3 className="text-xl">{title}</h3>
      <p className="text-text-secondary mt-1 text-sm">{subtitle}</p>
    </div>
    {children}
  </>
);
