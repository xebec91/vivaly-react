function ContactPage() {
  return (
    <section className="contact-page">
      <div className="contact-container">
        <div className="contact-main-icon-wrapper">
          <div className="contact-main-icon">
            <svg xmlns="http://www.w3.org/2000/svg" className="contact-main-icon-svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12l-4-4-4 4m0 0l4 4 4-4" />
            </svg>
          </div>
        </div>

        <h2 className="contact-title">Besoin d’aide ?</h2>

        <p className="contact-description">
          Notre équipe est disponible pour répondre à vos questions concernant vos
          commandes, produits ou livraisons.
        </p>

        <div className="contact-info-grid">
          <div className="contact-info-item">
            <div className="contact-info-icon">
              <svg xmlns="http://www.w3.org/2000/svg" className="contact-info-icon-svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12H8m8 0l-4-4m4 4l-4 4m12 0V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2z" />
              </svg>
            </div>
            <div>
              <h3>Par e-mail</h3>
              <p>
                <a href="mailto:contact@vivaly.fr">contact@vivaly.fr</a>
              </p>
            </div>
          </div>

          <div className="contact-info-item">
            <div className="contact-info-icon">
              <svg xmlns="http://www.w3.org/2000/svg" className="contact-info-icon-svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h2a1 1 0 011 1v3a1 1 0 01-1 1H6a10 10 0 0010 10v-2a1 1 0 011-1h3a1 1 0 011 1v2a2 2 0 01-2 2h-1C9.163 21 3 14.837 3 7V6a1 1 0 011-1z" />
              </svg>
            </div>
            <div>
              <h3>Par téléphone</h3>
              <p>
                <a href="tel:+33123456789">01 23 45 67 89</a>
              </p>
            </div>
          </div>
        </div>

        <div className="contact-cta">
          <a href="mailto:contact@vivaly.fr" className="contact-button">
            Nous contacter
          </a>
        </div>
      </div>
    </section>
  );
}

export default ContactPage;