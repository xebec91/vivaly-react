function LegalPageLayout({ title, intro, children }) {
  return (
    <section className="legal-page">
      <h1 className="legal-page-title">{title}</h1>
      <p className="legal-page-intro">{intro}</p>
      <div className="legal-page-content">{children}</div>
    </section>
  );
}

export default LegalPageLayout;