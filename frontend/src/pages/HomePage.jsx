import { useEffect } from 'react';
import { Link } from 'react-router-dom';

const categoriesTop = [
  {
    title: 'Bien-être et Santé',
    image: '/assets/images/santé.png',
  },
  {
    title: 'Beauté et Soins',
    image: '/assets/images/beauté.png',
  },
  {
    title: 'Décoration et Loisirs',
    image: '/assets/images/décoration.png',
  },
];

const categoriesBottom = [
  {
    title: 'Maison et Organisation',
    image: '/assets/images/maison.png',
  },
  {
    title: 'Enfants et Animaux',
    image: '/assets/images/enfants.png',
  },
];

const values = [
  {
    title: "Respect de l’Environnement",
    text: "Réduction de notre empreinte écologique grâce à des choix durables à chaque étape.",
    image: '/assets/images/plante_main_eolienne.jpg',
    alt: "Respect de l’environnement",
  },
  {
    title: 'Protection de la Biodiversité',
    text: 'Nous soutenons activement la planète et ses espèces face aux enjeux climatiques.',
    image: '/assets/images/ours_banquise.jpg',
    alt: 'Protection de la biodiversité',
  },
  {
    title: 'Durabilité & Qualité',
    text: 'Des articles faits pour durer, pour une consommation raisonnée et un avenir durable.',
    image: '/assets/images/durabilite.jpg',
    alt: 'Produits durables',
  },
];

function HomePage() {
  useEffect(() => {
    const button = document.querySelector('.home-hero-button');
    if (button) {
      button.style.opacity = '0';
      button.style.transform = 'translateY(10px)';

      const timeout = setTimeout(() => {
        button.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        button.style.opacity = '1';
        button.style.transform = 'translateY(0)';
      }, 300);

      return () => clearTimeout(timeout);
    }
  }, []);

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  return (
    <main className="home-page">
      <section
        className="home-hero"
        aria-label="Bannière de découverte du catalogue"
        style={{ backgroundImage: "url('/assets/images/femme_souriante.jpg')" }}
      >
        <div className="home-hero-overlay" aria-hidden="true"></div>
        <div className="home-hero-content">
          <Link
            to="/catalogue"
            className="home-hero-button"
            aria-label="Découvrir le catalogue complet"
          >
            Découvrir notre Catalogue
          </Link>
        </div>
      </section>

      <section className="home-categories">
        <div className="home-section-heading">
          <h1>VOTRE QUOTIDIEN EN UN CLIC</h1>
          <p>
            Chez Vivaly, chaque produit est pensé pour allier pratique, joie et style à votre vie.
          </p>
        </div>

        <div className="home-container">
          <div className="home-category-grid home-category-grid-top" role="list" aria-label="Catégories de produits">
            {categoriesTop.map((category) => (
              <div key={category.title} role="listitem">
                <div className="home-category-card">
                  <img src={category.image} alt={category.title} />
                  <div className="home-category-overlay" aria-hidden="true">
                    <p>{category.title}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div
            className="home-category-grid home-category-grid-bottom"
            role="list"
            aria-label="Catégories complémentaires"
          >
            {categoriesBottom.map((category) => (
              <div key={category.title} role="listitem">
                <div className="home-category-card">
                  <img src={category.image} alt={category.title} />
                  <div className="home-category-overlay" aria-hidden="true">
                    <p>{category.title}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="home-category-cta">
            <Link
              to="/catalogue"
              className="home-dark-button"
              aria-label="Voir tout le catalogue"
            >
              Afficher les Produits
            </Link>
          </div>
        </div>
      </section>

      <section className="home-salon">
        <h2>SUBLIMEZ CHAQUE COIN DE VOTRE MAISON</h2>
        <p>
          Réinventez votre intérieur avec des produits malins, pratiques et pleins de style.
        </p>
        <img src="/assets/images/salon_elegant.jpg" alt="Salon Élégant" />
      </section>

      <section className="home-values" id="engagements-valeurs">
        <div className="home-section-heading">
          <h2>Nos Engagements & Valeurs</h2>
          <p>
            Chez <strong>Vivaly</strong>, nous croyons qu’un commerce éthique est possible.
            Nos produits et nos actions reflètent des principes forts qui nous tiennent à cœur.
          </p>
        </div>

        <div className="home-values-grid">
          {values.map((value) => (
            <article key={value.title} className="home-value-card">
              <div className="home-value-image-wrapper">
                <img src={value.image} alt={value.alt} />
              </div>
              <h3>{value.title}</h3>
              <p>{value.text}</p>
            </article>
          ))}
        </div>
      </section>

      <button
        className="home-scroll-top"
        id="scrollToTopBtn"
        onClick={scrollToTop}
        aria-label="Revenir en haut de la page"
      >
        <svg
          className="home-scroll-top-icon"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M5 10l7-7m0 0l7 7m-7-7v18"
          />
        </svg>
      </button>
    </main>
  );
}

export default HomePage;