# Bazzart — Marketplace Numérique Tunisienne

> **Plateforme de vente d'artisanat tunisien authentique**  
> Connecter les petits commerces locaux avec les acheteurs de toute la Tunisie, simplement et numériquement.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Status: MVP](https://img.shields.io/badge/Status-MVP-green.svg)]()
[![Prototype: Complete](https://img.shields.io/badge/Prototype-Complete-blue.svg)]()

---

## 🎯 Vision

**Bazzart** résout un problème critique en Tunisie : les petits artisans et commerçants locaux manquent d'une plateforme de vente en ligne simple et accessible.

### Objectifs
- ✅ **Vendeurs** : Vendre en ligne en 10 minutes, sans compétences techniques
- ✅ **Acheteurs** : Découvrir et acheter directement auprès des artisans locaux
- ✅ **Logistique** : Gérer la livraison en 24/48h dans les grandes villes

---

## ✨ Features Principales

### Pour les Acheteurs
- 🔍 **Recherche & Filtres avancés** : par catégorie, prix, région, note
- 🛒 **Panier flottant** : accès rapide et persistant au panier
- ⭐ **Système d'avis** : évaluations vérifiées des produits et boutiques
- 📱 **Mobile-first** : design responsive sur tous les appareils
- 💳 **Paiement sécurisé** : intégration paiement (simulée en dev)
- 🚚 **Suivi commande** : statut en temps réel (Préparation → Expédition → Livrée)

### Pour les Vendeurs
- 📦 **Boutique en 10 min** : inscription et publication de produits ultra-simple
- 📊 **Dashboard BI** : statistiques de ventes, visiteurs, conversion en temps réel
- 🎯 **Gestion produits** : catalogue illimité avec images et descriptions
- 🏆 **Badges de confiance** : "Vendeur vérifié", "Top ventes", etc.
- 📈 **Système de recommandation** : produits similaires suggérés

### Fonctionnalités Globales
- 🌐 **100+ catégories** : Mode, Design, Bijoux, Gastronomie, Bien-être, etc.
- 🏪 **120+ boutiques** : Artisans et shops sélectionnés
- 📦 **4200+ produits** : Catalogue riche et diversifié
- 📱 **Design premium** : Interface moderne et intuitive

---

## 🚀 Quick Start

### Prérequis
- Navigateur web moderne (Chrome, Firefox, Safari, Edge)

### Installation

#### Option 1 : Ouverture directe (Recommandée)
```bash
# Ouvrez simplement index.html dans votre navigateur
# Aucune installation, aucun serveur nécessaire
```

#### Option 2 : Serveur local (Python)
```bash
# À la racine du projet
python -m http.server 8000

# Ouvrez http://localhost:8000 dans votre navigateur
```

#### Option 3 : Serveur local (Node.js)
```bash
# Installez http-server globalement
npm install -g http-server

# Lancez le serveur
http-server

# Ouvrez http://localhost:8080
```

---

## 📁 Structure du Projet

```
bazzart/
├── index.html                    # Page d'accueil
├── pages/
│   ├── marketplace.html          # Catalogue produits
│   ├── product-detail.html       # Détail d'un produit
│   ├── boutique.html             # Profil d'une boutique
│   ├── panier.html               # Panier d'achat
│   ├── checkout.html             # Commande & paiement
│   ├── confirmation.html         # Confirmation commande
│   ├── search.html               # Recherche avancée
│   ├── dashboard-vendeur.html    # Dashboard vendeur
│   ├── register-vendeur.html     # Inscription vendeur
│   ├── login.html                # Connexion
│   ├── mentions-legales.html     # Mentions légales
│   ├── cgv.html                  # Conditions générales
│   ├── politique-confidentialite.html    # Politique données
│   └── faq.html                  # Questions fréquentes
├── assets/
│   ├── css/
│   │   ├── style.css             # Styles globaux
│   │   └── components.css        # Composants réutilisables
│   ├── js/
│   │   ├── data.js               # Données (produits, boutiques)
│   │   ├── utils.js              # Fonctions utilitaires
│   │   ├── store.js              # Gestion du panier (localStorage)
│   │   ├── main.js               # Header, footer, DOM principal
│   │   ├── carousel.js           # Carrousel images produits
│   │   ├── cart-drawer.js        # Panier flottant
│   │   ├── mobile-filters.js     # Filtres mobiles
│   │   ├── marketplace.js        # Logique marketplace
│   │   ├── search.js             # Logique recherche
│   │   ├── product-detail.js     # Logique détail produit
│   │   └── [autres modules]
│   └── images/
│       └── Logo.png              # Logo Bazzart
├── README.md                     # Vous êtes ici
└── context.md                    # Architecture détaillée
```

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | HTML5, CSS3, Vanilla JavaScript (ES6) |
| **Stylisation** | CSS Grid, Flexbox, Animations CSS |
| **Données** | JSON + localStorage (pas de backend) |
| **Fonts** | Google Fonts (Cormorant Garamond, Outfit) |
| **Icons** | Emojis, SVG custom |
| **Responsive** | Mobile-first design (breakpoints: 640px, 1000px) |

### Philosophie de développement
- ✅ **Zero dependencies** : Aucun framework, aucune librairie externe
- ✅ **Progressive enhancement** : Fonctionne sans JavaScript
- ✅ **localStorage** : Données persistantes côté client (panier, compte)
- ✅ **Modular JS** : Modules IIFE pour isolation des données

---

## 📱 Pages & Fonctionnalités

### Acheteurs
| Page | Fonctionnalités |
|------|-----------------|
| **index.html** | Hero section, catégories, produits vedettes, témoignages vendeurs |
| **marketplace.html** | Grille produits, filtres, recherche, quick view, pagination |
| **product-detail.html** | Carrousel images, description, avis, produits similaires, "Ajouter au panier" |
| **panier.html** | Résumé items, quantités éditables, codes promo, total, CTA paiement |
| **checkout.html** | Adresse livraison, mode paiement, résumé commande, validation |
| **confirmation.html** | Numéro commande, tracking, état livraison estimé |
| **search.html** | Recherche textuelle + filtres avancés (catégorie, prix, région, note) |

### Vendeurs
| Page | Fonctionnalités |
|------|-----------------|
| **register-vendeur.html** | Inscription 4-étapes (infos base, boutique, documents, validation) |
| **dashboard-vendeur.html** | KPIs (ventes, visiteurs, conversion), diagrammes, gestion produits |
| **boutique.html** | Profil boutique, galerie produits, avis, coordonnées, horaires |

### Légal
| Page | Contenu |
|------|--------|
| **mentions-legales.html** | Éditeur, hébergeur, propriété intellectuelle |
| **cgv.html** | Conditions d'achat, remboursement, livraison, SAV |
| **politique-confidentialite.html** | RGPD, données, droits utilisateur |
| **faq.html** | Questions fréquentes acheteurs et vendeurs |

---

## 🎨 Design System

### Couleurs
```css
--navy: #1a2a3a;           /* Primaire sombre */
--brand-color: #C9A84C;    /* Or Tunisien */
--brand-light: #E8DCC8;    /* Or pâle */
--cream: #F5F3F0;          /* Crème de fond */
--text-primary: #1a2a3a;   /* Texte principal */
--text-muted: #8B8B8B;     /* Texte secondaire */
--border-color: #E5E5E5;   /* Bordures */
--success: #27AE60;        /* Confirmations */
--error: #E74C3C;          /* Erreurs */
```

### Typographie
- **Display** : Cormorant Garamond (serif, premium)
- **Body** : Outfit (sans-serif, lisible)
- **Sizes** : 12px (small) → 48px (h1)

### Composants
- Boutons : Primary (navy), Ghost (transparent), CTA (or)
- Cards : Produits (16px radius), Boutiques (20px radius)
- Formulaires : Inputs avec focus or, validation visuelle
- Navigation : Sticky header avec blur backdrop, mobile nav bottom

---

## 💾 Gestion des Données

### localStorage
```javascript
// Panier utilisateur
localStorage.getItem('BazzartCart') // [{productId, quantity}, ...]

// Compte utilisateur
localStorage.getItem('BazzartUser') // {email, name, role}

// Commandes
localStorage.getItem('BazzartOrders') // [{id, items, status, date}, ...]
```

### Données statiques (data.js)
```javascript
window.BAZZART_DATA = {
  products: [4200+ produits],
  boutiques: [120+ shops],
  categories: [100+ catégories],
  reviews: {productId: [avis clients]}
}
```

---

## 🚀 Améliorations Quick Wins Implémentées

### ✅ Completed (Phase 5-6+)
1. **Carrousel images produits** - Navigation intuitive + thumbnails
2. **Avis produits & ratings** - Score 5 étoiles + compteur d'avis
3. **Badges vendeur** - "Vendeur vérifié" + rating boutique inline
4. **Panier flottant** - Drawer fixed + bouton pulse en haut à droite
5. **Filtres mobiles** - Bottom sheet responsive avec Apply/Reset

---

## 📸 Screenshots

### 🏠 Page d'Accueil
- Hero section avec CTA
- Catégories en chips
- Produits vedettes en grille
- Témoignages vendeurs
- Value proposition cards

### 🛍️ Marketplace
- Grille 4 colonnes (responsive)
- Filtres sidebar (desktop) / bottom sheet (mobile)
- Quick view modal
- Badges dynamiques (New, Best seller, Stock limité)
- Pagination

### 📦 Détail Produit
- Carrousel 1:1 images
- Description complète
- Avis clients filtrés
- Produits similaires
- CTA panier + checkout

### 🛒 Panier Flottant
- Items avec image miniature
- Quantités affichées
- Total calculé
- Lien vers panier complet
- Animation slide-in

---

## 🔧 Développement

### Scripts Essentiels
```bash
# Aucun build nécessaire !
# Le projet est prêt à l'emploi et peut être herbergé directement

# Option : Test local avec Python
python -m http.server 8000

# Option : Déployer sur GitHub Pages
# Pushez la branche vers GitHub, activez Pages dans Settings
```

### Ajouter une Feature
1. Créer un nouveau module dans `assets/js/`
2. Suivre le pattern IIFE + `window.MyModule` pour exposition globale
3. Ajouter les styles dans `components.css`
4. Importer dans la page HTML avec `<script src="...">`

### Convention de Code
- Noms : camelCase (JS), kebab-case (CSS, fichiers)
- Indentation : 2 espaces
- Comments : `// Single line` ou `/* Multi line */`
- Modules : IIFE pattern pour isolation

---

## 📊 Métriques & KPIs

| Métrique | Valeur |
|----------|--------|
| Boutiques actives | 120+ |
| Produits publiés | 4200+ |
| Catégories | 100+ |
| Visiteurs/mois (simulé) | 38k |
| Taux conversion (simulé) | 3.8% |
| Délai moyen livraison | 24-48h |
| Avis clients moyen | 4.3/5 |

---

## 🤝 Contribution

Les contributions sont bienvenues ! Pour contribuer :

1. **Fork** le repository
2. Créez une branche (`git checkout -b feature/amazing-feature`)
3. Commitez vos changements (`git commit -m 'Add amazing feature'`)
4. Poussez vers la branche (`git push origin feature/amazing-feature`)
5. Ouvrez une Pull Request avec description claire

### Areas pour contribution
- [ ] Intégration backend (Node.js, Firebase, etc.)
- [ ] PWA (Service Workers, manifest)
- [ ] Internationalisation (i18n)
- [ ] Accessibilité WCAG AAA
- [ ] Tests unitaires (Jest, Vitest)
- [ ] Optimisation performance
- [ ] Documentation API

---

## 📄 Licence

Ce projet est sous licence **MIT**. Voir [LICENSE](LICENSE) pour détails.

```
Copyright (c) 2026 Bazzart Team

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software.
```

---

## 👥 Auteurs

- **Bazzart Team** — Concept & MVP
- **IHEC Carthage** — Prototype Académique

---

## 📞 Support & Contact

- **Email** : support@bazzart.tn
- **Hotline** : +216 70 000 000
- **Instagram** : [@bazzart.official](https://instagram.com/bazzart.official)
- **TikTok** : [@bazzart.official](https://tiktok.com/@bazzart.official)

---

## 🗺️ Roadmap

### Phase 1-6 ✅
- MVP complet avec 24 pages
- 4200+ produits, 120+ shops
- Système panier, checkout, commandes
- Dashboard vendeur avec BI

### Phase 7 🔄 (En cours)
- **Backend API** : Node.js + MongoDB
- **Authentification** : JWT + OAuth
- **Paiement réel** : Intégration Flouci/Ooredoo Money
- **Notifications** : Email, SMS en temps réel
- **Mobile apps** : React Native (iOS/Android)

### Phase 8 📅 (Planifié)
- **Marketplace avancée** : Enchères, flash sales
- **Creator program** : Influencers & curation
- **Logistique** : Intégration transporteurs officiels
- **Analytics** : Dashboards avancés vendeurs
- **ML** : Recommandations personnalisées

---

## 📚 Ressources

- [Architecture détaillée](context.md)
- [Google Fonts](https://fonts.google.com/?query=Cormorant+Garamond)
- [Spécifications HTML5](https://html.spec.whatwg.org/)
- [MDN Web Docs](https://developer.mozilla.org/)

---

<div align="center">

**Vendre local, grandir digital.** 🇹🇳

[Voir le prototype en ligne](#) • [Rapport complet](context.md) • [Conditions d'usage](pages/cgv.html)

</div>
