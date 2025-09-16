# 🚀 Guide de Déploiement - Ikfini Shop

## Options de Déploiement

### 1. 📦 Netlify (Recommandé)

#### Option A: Drag & Drop
1. Allez sur [netlify.com](https://netlify.com)
2. Glissez-déposez le dossier du projet sur la zone de déploiement
3. Votre site sera en ligne en quelques secondes !

#### Option B: Git Integration
1. Poussez votre code sur GitHub/GitLab
2. Connectez votre repo à Netlify
3. Déploiement automatique à chaque commit

### 2. ⚡ Vercel

```bash
# Installer Vercel CLI
npm install -g vercel

# Déployer
vercel

# Suivre les instructions
```

### 3. 🐙 GitHub Pages

1. Poussez le code sur un repo GitHub
2. Allez dans Settings > Pages
3. Sélectionnez la branche main
4. Votre site sera disponible sur `username.github.io/repo-name`

### 4. 🌐 Autres Options

- **Firebase Hosting**: `firebase deploy`
- **Surge.sh**: `surge .`
- **Render**: Connectez votre repo Git

## ⚙️ Configuration Post-Déploiement

### 1. Google Sheets Setup

1. **Créez votre Google Sheet** avec ces colonnes :
   ```
   Nom | Prix | Categorie | Image | Description
   ```

2. **Publiez le sheet** :
   - Fichier → Partager → Publier sur le Web
   - Choisissez "Valeurs séparées par des virgules (.csv)"
   - Copiez l'URL générée

3. **Modifiez le fichier** `src/scripts/googleSheets.js` :
   ```javascript
   // Ligne 6 - Remplacez par votre URL
   this.sheetsUrl = 'VOTRE_URL_CSV_ICI';
   ```

### 2. WhatsApp Configuration

Modifiez le numéro dans `src/scripts/whatsapp.js` :
```javascript
// Ligne 4 - Format international sans + ni espaces
this.phoneNumber = '221774876689'; // Remplacez par votre numéro
```

### 3. Personnalisation

- **Logo/Nom** : Modifiez dans `index.html`
- **Couleurs** : Variables CSS dans `src/styles/main.css`
- **Contenu** : Textes dans `src/scripts/navigation.js`

## 🔧 Développement Local

```bash
# Installer les dépendances
npm install

# Lancer le serveur de développement
npm run dev

# Ou avec Python
python -m http.server 8000

# Ou avec PHP
php -S localhost:8000
```

## 📊 Structure des Données Google Sheets

### Format Recommandé :

| Nom | Prix | Categorie | Image | Description |
|-----|------|-----------|-------|-------------|
| T-shirt Blanc | 5000 FCFA | Homme | https://images.pexels.com/... | T-shirt confortable |
| Robe Rouge | 15000 FCFA | Femme | https://images.pexels.com/... | Robe élégante |

### Catégories Supportées :
- Homme
- Femme  
- Chaussures
- Accessoires
- Unisexe

## 🎨 Personnalisation Avancée

### Couleurs (CSS Variables)
```css
:root {
    --primary-color: #2563eb;    /* Bleu principal */
    --secondary-color: #3b82f6;  /* Bleu secondaire */
    --accent-color: #06b6d4;     /* Cyan accent */
}
```

### Ajout de Nouvelles Pages
1. Créez la méthode dans `navigation.js`
2. Ajoutez le lien dans le menu HTML
3. Implémentez la logique de navigation

## 🚨 Dépannage

### Problèmes Courants :

1. **Produits ne se chargent pas** :
   - Vérifiez l'URL Google Sheets
   - Assurez-vous que le sheet est public
   - Consultez la console du navigateur

2. **WhatsApp ne fonctionne pas** :
   - Vérifiez le format du numéro (international)
   - Testez sur mobile et desktop

3. **Site ne s'affiche pas** :
   - Vérifiez les chemins des fichiers
   - Assurez-vous que tous les fichiers sont présents

## 📞 Support

Pour toute question, contactez-nous via WhatsApp en utilisant le bouton sur le site !

---

🛍️ **Ikfini Shop - Votre Mode à Portée de Clic !**