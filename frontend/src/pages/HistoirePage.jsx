import { useEffect } from 'react';

function HistoirePage() {
  useEffect(() => {
    const title = document.querySelector('#titre-histoire');
    const intro = document.querySelector('.history-intro');
    const conclusion = document.querySelector('.history-conclusion');
    const groups = document.querySelectorAll('.history-block');
    const images = document.querySelectorAll('.history-block img');
    const texts = document.querySelectorAll('.history-block p');

    function fadeIn(element, delay = 0) {
      if (!element) return;
      element.style.opacity = '0';
      element.style.transform = 'translateY(10px)';
      setTimeout(() => {
        element.style.transition = 'opacity 400ms ease-out, transform 400ms ease-out';
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
      }, delay);
    }

    fadeIn(title, 200);
    fadeIn(intro, 350);

    [...groups].forEach((group, index) => {
      fadeIn(group, 450 + index * 180);
    });

    fadeIn(conclusion, 850);

    images.forEach((img) => {
      img.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease';
      img.addEventListener('mouseenter', () => {
        img.style.transform = 'scale(1.05) translateY(-10px)';
        img.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.2)';
      });
      img.addEventListener('mouseleave', () => {
        img.style.transform = 'scale(1) translateY(0)';
        img.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
      });
    });

    return () => {
      images.forEach((img) => {
        img.onmouseenter = null;
        img.onmouseleave = null;
      });
    };
  }, []);

  return (
    <section className="history-page" aria-labelledby="titre-histoire">
      <h2 id="titre-histoire" className="history-title">
        Notre Histoire
      </h2>

      <p className="history-intro">
        Chez Vivaly, tout part d’une envie sincère : améliorer le quotidien avec des
        solutions pratiques, accessibles et pleines de style, pour que chacun y trouve
        son bonheur.
      </p>

      <div className="history-block" role="group" aria-labelledby="history-block-1">
        <div className="history-image-col">
          <img
            src="/assets/images/femme_canape.jpg"
            alt="Personne détendue sur un canapé"
          />
        </div>
        <div className="history-text-col">
          <p id="history-block-1">
            Tout a commencé avec le désir de simplifier la vie de tous les jours. Face
            aux postures fatiguées, aux matins pressés ou aux espaces monotones, Vivaly
            a créé des solutions accessibles. Chaque produit est pensé pour être utile,
            facile à adopter et apporter un peu de joie.
          </p>
        </div>
      </div>

      <div className="history-block history-block-reverse" role="group" aria-labelledby="history-block-2">
        <div className="history-image-col">
          <img
            src="/assets/images/chat_balle.jpg"
            alt="Chat jouant avec une balle dans un salon"
          />
        </div>
        <div className="history-text-col">
          <p id="history-block-2">
            Ensuite, l’envie s’est étendue aux petits bonheurs partagés : ceux des
            enfants, des animaux et de la maison. Des jouets pour chats aux cadres
            créatifs pour les plus jeunes, jusqu’aux housses confortables pour canapés,
            Vivaly embellit chaque instant. Avec la livraison offerte, c’est une touche
            de douceur à portée de main.
          </p>
        </div>
      </div>

      <p className="history-conclusion">
        Avec Vivaly, vous avez tout pour réinventer votre quotidien : des produits
        astucieux, des prix justes, une livraison sans frais et une équipe prête à vous
        accompagner à chaque étape.
      </p>
    </section>
  );
}

export default HistoirePage;