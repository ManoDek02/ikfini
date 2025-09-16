// Gestionnaire de favoris pour les véhicules
class FavoritesManager {
    constructor() {
        this.favorites = [];
        this.isVisible = false;
        this.init();
    }

    init() {
        this.loadFromStorage();
        this.createFavoritesWidget();
        this.setupEventListeners();
        this.updateFavoritesDisplay();
    }

    // Ajouter un véhicule aux favoris
    addToFavorites(car) {
        if (!car || !car.nom) {
            console.warn('Tentative d\'ajout d\'un véhicule invalide aux favoris');
            return;
        }

        const existingFavorite = this.findFavorite(car.nom);
        
        if (!existingFavorite) {
            this.favorites.push({
                id: this.generateId(),
                car: car,
                addedAt: new Date()
            });
            
            this.saveToStorage();
            this.updateFavoritesDisplay();
            this.showAddToFavoritesNotification(car.nom);
        }
    }

    // Retirer un véhicule des favoris
    removeFromFavorites(carName) {
        this.favorites = this.favorites.filter(fav => fav.car.nom !== carName);
        this.saveToStorage();
        this.updateFavoritesDisplay();
    }

    // Vérifier si un véhicule est dans les favoris
    isFavorite(carName) {
        return this.favorites.some(fav => fav.car.nom === carName);
    }

    // Trouver un favori
    findFavorite(carName) {
        return this.favorites.find(fav => fav.car.nom === carName);
    }

    // Générer un ID unique
    generateId() {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    }

    // Obtenir le nombre total de favoris
    getTotalFavorites() {
        return this.favorites.length;
    }

    // Sauvegarder dans le localStorage
    saveToStorage() {
        try {
            localStorage.setItem('automax_favorites', JSON.stringify(this.favorites));
        } catch (error) {
            console.error('Erreur lors de la sauvegarde des favoris:', error);
        }
    }

    // Charger depuis le localStorage
    loadFromStorage() {
        try {
            const stored = localStorage.getItem('automax_favorites');
            if (stored) {
                this.favorites = JSON.parse(stored);
            }
        } catch (error) {
            console.error('Erreur lors du chargement des favoris:', error);
            this.favorites = [];
        }
    }

    // Créer le widget de favoris flottant
    createFavoritesWidget() {
        // Bouton flottant des favoris
        this.favoritesButton = document.createElement('div');
        this.favoritesButton.className = 'favorites-button';
        this.favoritesButton.innerHTML = `
            <div class="favorites-icon">
                <i class="fas fa-heart"></i>
                <span class="favorites-count">0</span>
            </div>
        `;

        // Panneau des favoris
        this.favoritesPanel = document.createElement('div');
        this.favoritesPanel.className = 'favorites-panel';
        this.favoritesPanel.innerHTML = `
            <div class="favorites-header">
                <h3><i class="fas fa-heart"></i> Mes Favoris</h3>
                <button class="favorites-close" onclick="window.favoritesManager.toggleFavorites()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="favorites-content">
                <div class="favorites-items"></div>
                <div class="favorites-empty">
                    <i class="fas fa-heart"></i>
                    <p>Vos favoris sont vides</p>
                    <p>Ajoutez des véhicules pour les retrouver facilement</p>
                </div>
            </div>
            <div class="favorites-footer">
                <div class="favorites-actions">
                    <button class="btn btn-secondary" onclick="window.favoritesManager.clearFavorites()">
                        <i class="fas fa-trash"></i>
                        Vider
                    </button>
                    <button class="btn btn-primary" onclick="window.favoritesManager.contactAboutFavorites()">
                        <i class="fab fa-whatsapp"></i>
                        Contacter
                    </button>
                </div>
            </div>
        `;

        // Ajouter au DOM
        document.body.appendChild(this.favoritesButton);
        document.body.appendChild(this.favoritesPanel);

        // Événements
        this.favoritesButton.addEventListener('click', () => this.toggleFavorites());
        
        // Fermer les favoris en cliquant à l'extérieur
        document.addEventListener('click', (e) => {
            if (!this.favoritesPanel.contains(e.target) && 
                !this.favoritesButton.contains(e.target) && 
                this.isVisible) {
                this.hideFavorites();
            }
        });
    }

    // Basculer la visibilité des favoris
    toggleFavorites() {
        if (this.isVisible) {
            this.hideFavorites();
        } else {
            this.showFavorites();
        }
    }

    // Afficher les favoris
    showFavorites() {
        this.favoritesPanel.classList.add('active');
        this.isVisible = true;
        this.updateFavoritesDisplay();
    }

    // Masquer les favoris
    hideFavorites() {
        this.favoritesPanel.classList.remove('active');
        this.isVisible = false;
    }

    // Mettre à jour l'affichage des favoris
    updateFavoritesDisplay() {
        const favoritesCount = this.favoritesButton.querySelector('.favorites-count');
        const favoritesItems = this.favoritesPanel.querySelector('.favorites-items');
        const favoritesEmpty = this.favoritesPanel.querySelector('.favorites-empty');
        const favoritesFooter = this.favoritesPanel.querySelector('.favorites-footer');

        // Mettre à jour le compteur
        const totalFavorites = this.getTotalFavorites();
        favoritesCount.textContent = totalFavorites;
        favoritesCount.style.display = totalFavorites > 0 ? 'block' : 'none';

        // Afficher/masquer le contenu selon le nombre de favoris
        if (this.favorites.length === 0) {
            favoritesEmpty.style.display = 'block';
            favoritesItems.style.display = 'none';
            favoritesFooter.style.display = 'none';
        } else {
            favoritesEmpty.style.display = 'none';
            favoritesItems.style.display = 'block';
            favoritesFooter.style.display = 'block';

            // Générer la liste des favoris
            favoritesItems.innerHTML = this.favorites.map(fav => `
                <div class="favorites-item" data-car-name="${fav.car.nom}">
                    <div class="favorites-item-image">
                        <img src="${fav.car.image}" alt="${fav.car.nom}">
                    </div>
                    <div class="favorites-item-details">
                        <h4>${fav.car.nom}</h4>
                        <p class="favorites-item-price">${fav.car.prix}</p>
                        <p class="favorites-item-specs">${fav.car.marque} • ${fav.car.annee} • ${fav.car.kilometrage}</p>
                    </div>
                    <div class="favorites-item-controls">
                        <button class="btn btn-secondary" onclick="window.favoritesManager.removeFromFavorites('${fav.car.nom}')">
                            <i class="fas fa-trash"></i>
                        </button>
                        <button class="btn btn-primary" onclick="window.googleSheets.showCarDetails('${fav.car.nom}')">
                            <i class="fas fa-eye"></i>
                        </button>
                    </div>
                </div>
            `).join('');
        }
    }

    // Notification d'ajout aux favoris
    showAddToFavoritesNotification(carName) {
        const notification = document.createElement('div');
        notification.className = 'favorites-notification';
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas fa-heart"></i>
                <span>${carName} ajouté aux favoris !</span>
            </div>
        `;

        document.body.appendChild(notification);

        // Animation d'apparition
        setTimeout(() => notification.classList.add('show'), 100);

        // Supprimer après 3 secondes
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }

    // Configuration des événements
    setupEventListeners() {
        // Les événements d'ajout aux favoris sont gérés via les attributs onclick dans le HTML
    }

    // Vider les favoris
    clearFavorites() {
        this.favorites = [];
        this.saveToStorage();
        this.updateFavoritesDisplay();
    }

    // Contacter pour les favoris
    contactAboutFavorites() {
        if (this.favorites.length === 0) {
            return;
        }

        // Préparer les données pour WhatsApp
        const cars = this.favorites.map(fav => ({
            nom: fav.car.nom,
            prix: fav.car.prix,
            marque: fav.car.marque,
            annee: fav.car.annee
        }));

        // Utiliser la méthode existante de WhatsAppHelper
        if (window.whatsAppHelper) {
            const message = `Bonjour AutoMax ! 👋

Je suis intéressé(e) par ces véhicules de mes favoris :

${cars.map((car, index) => `${index + 1}. ${car.nom} - ${car.prix} (${car.marque} ${car.annee})`).join('\n')}

Pourriez-vous me donner plus d'informations sur :
- La disponibilité de ces véhicules
- Les modalités de livraison
- Les options de financement
- Les garanties incluses

Merci !`;

            const whatsappUrl = window.whatsAppHelper.generateWhatsAppUrl(message);
            window.open(whatsappUrl, '_blank');
        }
    }

    // Méthode publique pour gérer l'ajout aux favoris depuis les boutons
    handleAddToFavorites(buttonElement, carData) {
        // Protection contre les clics multiples rapides
        if (buttonElement.disabled) {
            return;
        }

        // Désactiver temporairement le bouton
        buttonElement.disabled = true;
        buttonElement.style.opacity = '0.6';

        // Ajouter aux favoris
        this.addToFavorites(carData);
        
        // Mettre à jour l'icône du bouton
        buttonElement.innerHTML = '<i class="fas fa-heart"></i> Dans les favoris';
        buttonElement.classList.add('favorited');

        // Réactiver le bouton après un délai
        setTimeout(() => {
            buttonElement.disabled = false;
            buttonElement.style.opacity = '1';
        }, 1000);
    }

    // Méthodes utilitaires pour l'API externe
    getFavoritesItems() {
        return this.favorites;
    }

    getFavoritesSummary() {
        return {
            totalFavorites: this.getTotalFavorites(),
            items: this.favorites.length
        };
    }
}

// Initialiser le gestionnaire de favoris
document.addEventListener('DOMContentLoaded', () => {
    window.favoritesManager = new FavoritesManager();
});
