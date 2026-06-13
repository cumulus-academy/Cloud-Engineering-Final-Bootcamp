export function PageHeader({ eyebrow, title, description }) {
  return (
    <div className="border-b bg-muted/30">
      <div className="container py-12 md:py-16">
        {eyebrow && (
          <p className="mb-2 text-sm font-medium uppercase tracking-wider text-primary">
            {eyebrow}
          </p>
        )}
        <h1 className="text-3xl font-bold tracking-tight md:text-4xl">{title}</h1>
        {description && (
          <p className="mt-3 max-w-2xl text-muted-foreground">{description}</p>
        )}
      </div>
    </div>
  );
}

// Standard wrapper to give every page consistent horizontal padding + spacing.
export function Section({ children, className = "" }) {
  return <section className={`container py-12 ${className}`}>{children}</section>;
}
