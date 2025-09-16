# 🎨 Guide de Personnalisation - Ikfini Shop

## 🎯 Personnalisation Rapide

### 1. Informations de Base

#### Nom et Logo
```html
<!-- Dans index.html, ligne 15 -->
<div class="nav-logo">
    <i class="fas fa-shopping-bag"></i>
    <span>VOTRE_NOM_BOUTIQUE</span>
</div>
```

#### Slogan et Description
```javascript
// Dans src/scripts/navigation.js, ligne 45
<h1>VOTRE_NOM_BOUTIQUE</h1>
<p>Votre slogan personnalisé !</p>
```

### 2. Coordonnées de Contact

#### Numéro WhatsApp
```javascript
// Dans src/scripts/whatsapp.js, ligne 4
this.phoneNumber = 'VOTRE_NUMERO'; // Format: 221774876689
```

#### Email et Téléphone
```javascript
// Dans src/scripts/navigation.js, page contact
<p><i class="fas fa-phone"></i> +221 XX XXX XX XX</p>
<p><i class="fas fa-envelope"></i> votre@email.com</p>
```

## 🎨 Personnalisation Visuelle

### 1. Couleurs Principales

```css
/* Dans src/styles/main.css, lignes 10-20 */
:root {
    --primary-color: #2563eb;      /* Couleur principale */
    --secondary-color: #3b82f6;    /* Couleur secondaire */
    --accent-color: #06b6d4;       /* Couleur d'accent */
    --text-dark: #1e293b;          /* Texte foncé */
    --text-light: #64748b;         /* Texte clair */
    --background-light: #f8fafc;   /* Arrière-plan clair */
}
```

### 2. Polices

```css
/* Changer la police principale */
:root {
    --font-primary: 'Votre-Police', sans-serif;
}

/* Ajouter dans le <head> de index.html */
<link href="https://fonts.googleapis.com/css2?family=Votre-Police:wght@300;400;500;600;700&display=swap" rel="stylesheet">
```

### 3. Images et Icônes

#### Logo personnalisé
```html
<!-- Remplacer l'icône par une image -->
<div class="nav-logo">
    <img src="images/logo.png" alt="Logo" style="height: 40px;">
    <span>VOTRE_BOUTIQUE</span>
</div>
```

#### Images de fond
```css
/* Hero section avec image de fond */
.hero {
    background: linear-gradient(rgba(37, 99, 235, 0.8), rgba(6, 182, 212, 0.8)),
                url('images/hero-bg.jpg') center/cover;
}
```

## 📊 Configuration Google Sheets

### 1. Structure Recommandée

| Colonne | Description | Exemple |
|---------|-------------|---------|
| Nom | Nom du produit | "T-shirt Premium" |
| Prix | Prix avec devise | "5000 FCFA" |
| Categorie | Catégorie du produit | "Homme" |
| Image | URL de l'image | "https://..." |
| Description | Description courte | "T-shirt confortable..." |

### 2. Catégories Personnalisées

```javascript
// Dans src/scripts/googleSheets.js, modifier les catégories
const categories = ['Tous', 'Homme', 'Femme', 'Enfant', 'Sport', 'Accessoires'];
```

### 3. Ajout de Champs Personnalisés

```javascript
// Exemple: Ajouter une couleur
{
    nom: "T-shirt",
    prix: "5000 FCFA",
    categorie: "Homme",
    couleur: "Bleu", // Nouveau champ
    image: "...",
    description: "..."
}
```

## 🛍️ Fonctionnalités Avancées

### 1. Système de Promotion

```javascript
// Ajouter des promotions
{
    nom: "T-shirt Premium",
    prix: "5000 FCFA",
    prixOriginal: "7000 FCFA", // Prix barré
    promotion: true,
    pourcentageReduction: 30
}
```

### 2. Badges Personnalisés

```css
/* Nouveaux badges */
.badge-nouveau {
    background: #10b981;
    color: white;
}

.badge-promo {
    background: #ef4444;
    color: white;
}
```

### 3. Filtres Avancés

```javascript
// Ajouter des filtres par prix, couleur, etc.
filterByPrice(minPrice, maxPrice) {
    return this.products.filter(product => {
        const price = parseInt(product.prix.replace(/\D/g, ''));
        return price >= minPrice && price <= maxPrice;
    });
}
```

## 📱 Personnalisation Mobile

### 1. Menu Mobile Personnalisé

```css
/* Couleur du menu mobile */
.nav-menu {
    background: var(--primary-color);
}

.nav-menu.active .nav-link {
    color: white;
}
```

### 2. Boutons d'Action Mobile

```css
/* Boutons plus grands sur mobile */
@media (max-width: 768px) {
    .btn {
        padding: 1rem 2rem;
        font-size: 1.1rem;
    }
}
```

## 🎭 Animations Personnalisées

### 1. Animations d'Entrée

```css
/* Animation personnalisée */
@keyframes slideInLeft {
    from {
        opacity: 0;
        transform: translateX(-50px);
    }
    to {
        opacity: 1;
        transform: translateX(0);
    }
}

.custom-animation {
    animation: slideInLeft 0.6s ease-out;
}
```

### 2. Effets de Survol

```css
/* Effet de survol personnalisé */
.product-card:hover {
    transform: translateY(-10px) scale(1.02);
    box-shadow: 0 20px 40px rgba(0,0,0,0.1);
}
```

## 🔧 Optimisations

### 1. Performance

```javascript
// Lazy loading des images
<img src="placeholder.jpg" data-src="vraie-image.jpg" class="lazy">
```

### 2. SEO

```html
<!-- Métadonnées personnalisées -->
<meta name="description" content="Votre description boutique">
<meta name="keywords" content="vêtements, mode, boutique">
<meta property="og:title" content="Votre Boutique">
<meta property="og:description" content="Description pour réseaux sociaux">
```

## 📞 Support Personnalisé

### Messages WhatsApp Personnalisés

```javascript
// Dans src/scripts/whatsapp.js
const message = `Bonjour ${this.businessName} ! 👋

Je suis intéressé(e) par votre collection.
Pouvez-vous me renseigner sur :
- Vos nouveautés
- Les promotions en cours
- Les modalités de livraison

Merci ! 😊`;
```

---

💡 **Conseil** : Testez toujours vos modifications sur différents appareils et navigateurs !

🛍️ **Ikfini Shop - Personnalisez votre succès !**