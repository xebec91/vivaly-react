# Vivaly React

Vivaly React est la migration d’une plateforme e-commerce initialement développée en PHP MVC, HTML, TailwindCSS et JavaScript vers une version moderne avec **React** pour le front-end, tout en conservant un **back-end PHP** pour l’authentification et certaines API.

## Fonctionnalités

- Page d’accueil en React
- Catalogue produits en React
- Fiches produits détaillées
- Panier dynamique
- Authentification utilisateur
- Espace administrateur en React
- Paiement avec Stripe Checkout
- Pages d’information :
  - Notre Histoire
  - FAQ
  - Suivi de commande
  - Contact
- Pages légales :
  - Politique de Retour
  - Politique de Confidentialité
  - Politique de Livraison
  - Conditions d’Utilisation
  - Conditions Générales de Vente

## Stack technique

### Front-end
- React
- React Router
- CSS classique

### Back-end
- PHP MVC
- MySQL
- Composer

### Paiement
- Stripe Checkout

## Installation

1. Cloner le projet

git clone https://github.com/VOTRE_USERNAME/vivaly-react.git
cd vivaly-react

3. Installer les dépendances PHP

composer install

5. Installer les dépendances React

cd frontend
npm install

## Configuration

Créer un fichier .env à la racine du projet avec vos variables locales, par exemple :

DB_HOST=localhost
DB_NAME=vivaly
DB_USER=root
DB_PASS=

STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_PUBLIC_KEY=your_stripe_public_key
APP_URL=http://localhost:5173

## Lancer le projet

Back-end PHP

Placez le projet dans votre environnement local PHP, par exemple avec XAMPP :

C:\xampp\htdocs\vivaly-react

Puis démarrez Apache et MySQL.

Front-end React

Depuis le dossier frontend :

npm run dev

Le front React sera disponible sur :

http://localhost:5173
Comptes

Le projet prévoit un système d’authentification avec rôles :

utilisateur

administrateur

L’interface d’administration React est accessible uniquement aux administrateurs connectés.

Paiement Stripe

Le projet utilise Stripe Checkout pour le paiement.

Pour que cela fonctionne, il faut :

configurer les clés Stripe dans le .env

utiliser un compte Stripe en mode test pour les essais

Remarques

Les produits principaux sont gérés directement dans le code pour simplifier la présentation des fiches produits.

Certaines parties du back PHP sont conservées pour l’authentification et les API.

Le projet est pensé comme une migration progressive d’un site PHP vers React.

## Auteur

Projet réalisé par Youssouf Bathily.

## Structure du projet

```text
vivaly-react/
├─ app/
├─ public/
├─ frontend/
├─ composer.json
├─ package.json
└─ README.md````
