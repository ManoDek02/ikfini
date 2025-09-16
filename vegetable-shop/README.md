# FreshVeg - Plateforme de Vente de Légumes

## 🥕 Description

FreshVeg est une plateforme e-commerce moderne spécialisée dans la vente de légumes frais et biologiques. Elle fait partie de l'écosystème multi-services Ikfini, aux côtés d'Ikfini Shop (mode) et AutoMax (automobile).

## ✨ Fonctionnalités

### 🛒 E-commerce Complet
- **Catalogue de légumes** : 16+ variétés organisées par catégories
- **Panier intelligent** : Gestion complète des commandes
- **Filtres par catégorie** : Légumes feuilles, racines, fruits, aromates
- **Prix en temps réel** : Calcul automatique des totaux

### 📱 Intégration WhatsApp
- **Commandes via WhatsApp** : Génération automatique de messages
- **Support client** : Contact direct avec l'équipe
- **Notifications** : Confirmations et mises à jour

### 🎨 Design Moderne
- **Interface responsive** : Optimisée pour mobile et desktop
- **Animations fluides** : Expérience utilisateur engageante
- **Thème vert** : Couleurs naturelles et apaisantes
- **Icônes FontAwesome** : Représentation visuelle des légumes

### 📊 Gestion des Données
- **Google Sheets** : Intégration pour la gestion des stocks
- **LocalStorage** : Sauvegarde locale du panier
- **Formulaires** : Contact et newsletter

## 🏗️ Structure du Projet

```
vegetable-shop/
├── index.html              # Page principale
└── src/
    ├── styles/
    │   └── main.css        # Styles CSS complets
    └── scripts/
        ├── main.js         # Logique principale
        ├── cart.js         # Gestion du panier
        ├── googleSheets.js # Intégration Google Sheets
        └── whatsapp.js     # Intégration WhatsApp
```

## 🥬 Catalogue de Produits

### Légumes Feuilles
- Épinards Frais (1,500 FCFA/kg)
- Laitue Romaine (1,200 FCFA/pièce)
- Chou Vert (2,000 FCFA/pièce)

### Légumes Racines
- Carottes (1,800 FCFA/kg)
- Pommes de Terre (1,600 FCFA/kg)
- Oignons (1,400 FCFA/kg)

### Légumes Fruits
- Tomates (2,500 FCFA/kg)
- Concombres (2,000 FCFA/kg)
- Poivrons (3,000 FCFA/kg)
- Aubergines (2,800 FCFA/kg)

### Aromates
- Persil (500 FCFA/bouquet)
- Ail (3,000 FCFA/kg)
- Basilic (800 FCFA/bouquet)
- Coriandre (600 FCFA/bouquet)
- Menthe (700 FCFA/bouquet)
- Gingembre (4,000 FCFA/kg)

## 🚀 Installation et Utilisation

### 1. Accès Direct
Ouvrez `vegetable-shop/index.html` dans votre navigateur web.

### 2. Serveur Local (Recommandé)
```bash
# Dans le dossier racine du projet
npx serve .
# Puis accédez à http://localhost:3000/vegetable-shop/
```

### 3. Déploiement
- **Netlify** : Glisser-déposer le dossier `vegetable-shop/`
- **Vercel** : Connecter le repository GitHub
- **GitHub Pages** : Activer dans les paramètres du repository

## ⚙️ Configuration

### Google Sheets
Pour activer l'intégration Google Sheets :

1. Créez une feuille Google Sheets
2. Configurez les colonnes : ID, Nom, Description, Prix, Catégorie, Image, Badge, Unité
3. Activez l'API Google Sheets
4. Mettez à jour les variables dans `googleSheets.js` :
```javascript
this.sheetId = 'VOTRE_SHEET_ID';
this.apiKey = 'VOTRE_API_KEY';
```

### WhatsApp
Pour personnaliser le numéro WhatsApp :
```javascript
// Dans whatsapp.js
this.phoneNumber = '2217748766689'; // Votre numéro
```

## 🎨 Personnalisation

### Couleurs
Modifiez les variables CSS dans `main.css` :
```css
:root {
    --primary-color: #22c55e;    /* Vert principal */
    --secondary-color: #16a34a;  /* Vert secondaire */
    --accent-color: #84cc16;     /* Vert accent */
}
```

### Produits
Ajoutez de nouveaux légumes dans `main.js` :
```javascript
const vegetablesData = [
    {
        id: 17,
        name: "Nouveau Légume",
        description: "Description du légume",
        price: 2000,
        category: "legumes-feuilles",
        image: "fas fa-leaf",
        badge: "Bio",
        unit: "kg"
    }
];
```

## 📱 Responsive Design

La plateforme est entièrement responsive avec :
- **Mobile** : Interface optimisée pour les petits écrans
- **Tablet** : Adaptation pour les écrans moyens
- **Desktop** : Expérience complète sur grand écran

## 🔧 Technologies Utilisées

- **HTML5** : Structure sémantique
- **CSS3** : Styles modernes avec variables CSS
- **JavaScript ES6+** : Logique interactive
- **FontAwesome** : Icônes vectorielles
- **Google Fonts** : Typographie Poppins
- **LocalStorage** : Persistance des données
- **Google Sheets API** : Gestion des stocks

## 📞 Support

Pour toute question ou support :
- **Email** : contact@freshveg.sn
- **Téléphone** : +221 77 123 45 67
- **WhatsApp** : +221 77 487 66 89

## 📄 Licence

Ce projet fait partie de l'écosystème Ikfini Multi-Services et est sous licence MIT.

---

**FreshVeg** - Des légumes frais, une expérience moderne ! 🥕✨
