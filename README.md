# Plateforme Multi-Services - Ikfini Shop & AutoMax

## 📋 Description

Cette plateforme multi-services regroupe deux projets complémentaires :

1. **Ikfini Shop** - Boutique de vêtements en ligne
2. **AutoMax** - Concessionnaire automobile

## 🏗️ Structure du Projet

```
ikfini-shop/
├── index.html                 # Interface commune d'accès
├── README.md                  # Documentation du projet
├── package.json               # Configuration du projet
├── src/                       # Projet Ikfini Shop (vêtements)
│   ├── scripts/
│   │   ├── main.js           # Script principal
│   │   ├── navigation.js     # Gestion de navigation
│   │   ├── googleSheets.js   # Gestion des produits
│   │   ├── whatsapp.js       # Intégration WhatsApp
│   │   └── cart.js           # Gestion du panier
│   └── styles/
│       └── main.css          # Styles CSS
└── car-shop/                  # Projet AutoMax (voitures)
    ├── index.html            # Page principale AutoMax
    ├── src/
    │   ├── scripts/
    │   │   ├── main.js       # Script principal
    │   │   ├── navigation.js # Gestion de navigation
    │   │   ├── googleSheets.js # Gestion des véhicules
    │   │   ├── whatsapp.js   # Intégration WhatsApp
    │   │   └── cart.js       # Gestion des favoris
    │   └── styles/
    │       └── main.css      # Styles CSS
```

## 🚀 Fonctionnalités

### Ikfini Shop (Vêtements)
- ✅ Catalogue de vêtements homme/femme
- ✅ Système de panier d'achat
- ✅ Filtrage par catégorie et taille
- ✅ Intégration WhatsApp pour commandes
- ✅ Interface responsive
- ✅ Gestion des stocks

### AutoMax (Voitures)
- ✅ Catalogue de véhicules neufs/occasion
- ✅ Système de favoris
- ✅ Filtrage par marque, catégorie, prix
- ✅ Intégration WhatsApp pour contact
- ✅ Interface responsive
- ✅ Détails techniques des véhicules

### Interface Commune
- ✅ Navigation entre les deux plateformes
- ✅ Design moderne et responsive
- ✅ Statistiques des deux services
- ✅ Contact unifié

## 🛠️ Installation et Utilisation

### Prérequis
- Navigateur web moderne
- Serveur web local (optionnel)

### Installation
1. Cloner ou télécharger le projet
2. Ouvrir `index.html` dans un navigateur
3. Ou utiliser un serveur local :
   ```bash
   npx serve .
   ```

### Configuration
1. **Numéros WhatsApp** : Modifier dans les fichiers `whatsapp.js`
2. **Google Sheets** : Configurer les URLs dans `googleSheets.js`
3. **Données** : Adapter les données de démonstration selon vos besoins

## 📱 Intégration WhatsApp

Les deux plateformes utilisent WhatsApp pour :
- Commandes de produits (Ikfini Shop)
- Contact pour véhicules (AutoMax)
- Support client général

### Configuration WhatsApp
```javascript
// Dans whatsapp.js
this.phoneNumber = '221776404406'; // Votre numéro
this.businessName = 'Nom de votre entreprise';
```

## 🎨 Personnalisation

### Couleurs
Modifier les variables CSS dans `:root` :
```css
:root {
    --primary-color: #2563eb;
    --secondary-color: #3b82f6;
    --accent-color: #06b6d4;
    /* ... */
}
```

### Données
- **Ikfini Shop** : Modifier `getDemoProducts()` dans `googleSheets.js`
- **AutoMax** : Modifier `getDemoCars()` dans `googleSheets.js`

## 📊 Gestion des Données

### Google Sheets (Optionnel)
1. Créer une feuille Google Sheets
2. Publier en CSV
3. Configurer l'URL dans `googleSheets.js`

### Données Locales
Les données de démonstration sont incluses par défaut pour tester les fonctionnalités.

## 🔧 Développement

### Structure des Scripts
- `main.js` : Initialisation et événements globaux
- `navigation.js` : Gestion des pages et navigation
- `googleSheets.js` : Gestion des données (produits/véhicules)
- `whatsapp.js` : Intégration WhatsApp
- `cart.js` : Gestion panier/favoris

### Ajout de Fonctionnalités
1. Modifier les scripts correspondants
2. Ajouter les styles CSS nécessaires
3. Tester sur différents appareils

## 📱 Responsive Design

Les deux plateformes sont optimisées pour :
- 📱 Mobile (320px+)
- 📱 Tablette (768px+)
- 💻 Desktop (1024px+)

## 🚀 Déploiement

### Options de Déploiement
1. **Netlify** : Glisser-déposer le dossier
2. **Vercel** : Connexion GitHub
3. **GitHub Pages** : Push vers repository
4. **Serveur Web** : Upload des fichiers

### Configuration de Déploiement
- Aucune compilation nécessaire
- Fichiers statiques uniquement
- Compatible avec tous les hébergeurs

## 📞 Support

Pour toute question ou assistance :
- 📧 Email : contact@ikfinishop.com
- 📱 WhatsApp : +221 77 487 66 89
- 📍 Localisation : Dakar, Sénégal

## 📄 Licence

MIT License - Libre d'utilisation et modification.

## 🔄 Mises à Jour

### Version 1.0
- ✅ Interface commune créée
- ✅ Ikfini Shop fonctionnel
- ✅ AutoMax fonctionnel
- ✅ Intégration WhatsApp
- ✅ Design responsive

### Prochaines Fonctionnalités
- 🔄 Système de paiement en ligne
- 🔄 Gestion des utilisateurs
- 🔄 Notifications push
- 🔄 API REST
- 🔄 Dashboard administrateur

---

**Développé avec ❤️ pour offrir une expérience utilisateur exceptionnelle**