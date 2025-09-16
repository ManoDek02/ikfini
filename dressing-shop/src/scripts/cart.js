// Gestionnaire de panier pour les commandes groupées
class CartManager {
    constructor() {
        this.items = [];
        this.isVisible = false;
        this.init();
    }

    init() {
        this.loadFromStorage();
        this.createCartWidget();
        this.setupEventListeners();
        this.updateCartDisplay();
    }

    // Ajouter un produit au panier
    addToCart(product, size = null, quantity = 1) {
        // Protection contre les ajouts en double
        if (!product || !product.nom) {
            console.warn('Tentative d\'ajout d\'un produit invalide au panier');
            return;
        }

        const existingItem = this.findItem(product.nom, size);
        
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            this.items.push({
                id: this.generateId(),
                product: product,
                size: size,
                quantity: quantity,
                addedAt: new Date()
            });
        }
        
        this.saveToStorage();
        this.updateCartDisplay();
        this.showAddToCartNotification(product.nom);
    }

    // Retirer un produit du panier
    removeFromCart(itemId) {
        this.items = this.items.filter(item => item.id !== itemId);
        this.saveToStorage();
        this.updateCartDisplay();
    }

    // Modifier la quantité d'un produit
    updateQuantity(itemId, newQuantity) {
        const item = this.items.find(item => item.id === itemId);
        if (item) {
            if (newQuantity <= 0) {
                this.removeFromCart(itemId);
            } else {
                item.quantity = newQuantity;
                this.saveToStorage();
                this.updateCartDisplay();
            }
        }
    }

    // Vider le panier
    clearCart() {
        this.items = [];
        this.saveToStorage();
        this.updateCartDisplay();
    }

    // Trouver un item dans le panier
    findItem(productName, size) {
        return this.items.find(item => 
            item.product.nom === productName && item.size === size
        );
    }

    // Générer un ID unique
    generateId() {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    }

    // Calculer le total du panier
    getTotalPrice() {
        return this.items.reduce((total, item) => {
            const price = this.extractPrice(item.product.prix);
            return total + (price * item.quantity);
        }, 0);
    }

    // Extraire le prix numérique d'une chaîne
    extractPrice(priceString) {
        const match = priceString.match(/(\d+)/);
        return match ? parseInt(match[1]) : 0;
    }

    // Obtenir le nombre total d'articles
    getTotalItems() {
        return this.items.reduce((total, item) => total + item.quantity, 0);
    }

    // Sauvegarder dans le localStorage
    saveToStorage() {
        try {
            localStorage.setItem('ikfini_cart', JSON.stringify(this.items));
        } catch (error) {
            console.error('Erreur lors de la sauvegarde du panier:', error);
        }
    }

    // Charger depuis le localStorage
    loadFromStorage() {
        try {
            const stored = localStorage.getItem('ikfini_cart');
            if (stored) {
                this.items = JSON.parse(stored);
            }
        } catch (error) {
            console.error('Erreur lors du chargement du panier:', error);
            this.items = [];
        }
    }

    // Créer le widget de panier flottant
    createCartWidget() {
        // Bouton flottant du panier
        this.cartButton = document.createElement('div');
        this.cartButton.className = 'cart-button';
        this.cartButton.innerHTML = `
            <div class="cart-icon">
                <i class="fas fa-shopping-cart"></i>
                <span class="cart-count">0</span>
            </div>
        `;

        // Panneau du panier
        this.cartPanel = document.createElement('div');
        this.cartPanel.className = 'cart-panel';
        this.cartPanel.innerHTML = `
            <div class="cart-header">
                <h3><i class="fas fa-shopping-cart"></i> Mon Panier</h3>
                <button class="cart-close" onclick="window.cartManager.toggleCart()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="cart-content">
                <div class="cart-items"></div>
                <div class="cart-empty">
                    <i class="fas fa-shopping-cart"></i>
                    <p>Votre panier est vide</p>
                    <p>Ajoutez des produits pour commencer vos achats</p>
                </div>
            </div>
            <div class="cart-footer">
                <div class="cart-total">
                    <span>Total: <strong id="cart-total-price">0 FCFA</strong></span>
                </div>
                <div class="cart-actions">
                    <button class="btn btn-secondary" onclick="window.cartManager.clearCart()">
                        <i class="fas fa-trash"></i>
                        Vider
                    </button>
                    <button class="btn btn-whatsapp" onclick="window.cartManager.checkout()">
                        <i class="fab fa-whatsapp"></i>
                        Commander
                    </button>
                </div>
            </div>
        `;

        // Ajouter au DOM
        document.body.appendChild(this.cartButton);
        document.body.appendChild(this.cartPanel);

        // Événements
        this.cartButton.addEventListener('click', () => this.toggleCart());
        
        // Fermer le panier en cliquant à l'extérieur
        document.addEventListener('click', (e) => {
            if (!this.cartPanel.contains(e.target) && 
                !this.cartButton.contains(e.target) && 
                this.isVisible) {
                this.hideCart();
            }
        });
    }

    // Basculer la visibilité du panier
    toggleCart() {
        if (this.isVisible) {
            this.hideCart();
        } else {
            this.showCart();
        }
    }

    // Afficher le panier
    showCart() {
        this.cartPanel.classList.add('active');
        this.isVisible = true;
        this.updateCartDisplay();
    }

    // Masquer le panier
    hideCart() {
        this.cartPanel.classList.remove('active');
        this.isVisible = false;
    }

    // Mettre à jour l'affichage du panier
    updateCartDisplay() {
        const cartCount = this.cartButton.querySelector('.cart-count');
        const cartItems = this.cartPanel.querySelector('.cart-items');
        const cartEmpty = this.cartPanel.querySelector('.cart-empty');
        const cartTotalPrice = this.cartPanel.querySelector('#cart-total-price');
        const cartFooter = this.cartPanel.querySelector('.cart-footer');

        // Mettre à jour le compteur
        const totalItems = this.getTotalItems();
        cartCount.textContent = totalItems;
        cartCount.style.display = totalItems > 0 ? 'block' : 'none';

        // Afficher/masquer le contenu selon le nombre d'articles
        if (this.items.length === 0) {
            cartEmpty.style.display = 'block';
            cartItems.style.display = 'none';
            cartFooter.style.display = 'none';
        } else {
            cartEmpty.style.display = 'none';
            cartItems.style.display = 'block';
            cartFooter.style.display = 'block';

            // Générer la liste des articles
            cartItems.innerHTML = this.items.map(item => `
                <div class="cart-item" data-item-id="${item.id}">
                    <div class="cart-item-image">
                        <img src="${item.product.image}" alt="${item.product.nom}">
                    </div>
                    <div class="cart-item-details">
                        <h4>${item.product.nom}</h4>
                        <p class="cart-item-price">${item.product.prix}</p>
                        ${item.size ? `<p class="cart-item-size">Taille: ${item.size}</p>` : ''}
                    </div>
                    <div class="cart-item-controls">
                        <div class="quantity-controls">
                            <button class="quantity-btn" onclick="window.cartManager.updateQuantity('${item.id}', ${item.quantity - 1})">
                                <i class="fas fa-minus"></i>
                            </button>
                            <span class="quantity">${item.quantity}</span>
                            <button class="quantity-btn" onclick="window.cartManager.updateQuantity('${item.id}', ${item.quantity + 1})">
                                <i class="fas fa-plus"></i>
                            </button>
                        </div>
                        <button class="remove-btn" onclick="window.cartManager.removeFromCart('${item.id}')">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
            `).join('');

            // Mettre à jour le total
            cartTotalPrice.textContent = `${this.getTotalPrice().toLocaleString()} FCFA`;
        }
    }

    // Notification d'ajout au panier
    showAddToCartNotification(productName) {
        const notification = document.createElement('div');
        notification.className = 'cart-notification';
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas fa-check-circle"></i>
                <span>${productName} ajouté au panier !</span>
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
        // Note: Les événements d'ajout au panier sont gérés par handleAddToCart()
        // via les attributs onclick dans le HTML pour éviter les doubles déclenchements
    }

    // Afficher une alerte pour sélectionner une taille
    showSizeSelectionAlert() {
        const alert = document.createElement('div');
        alert.className = 'size-alert';
        alert.innerHTML = `
            <div class="size-alert-content">
                <i class="fas fa-exclamation-circle"></i>
                <span>Veuillez sélectionner une taille avant d'ajouter au panier</span>
            </div>
        `;
        
        document.body.appendChild(alert);
        
        setTimeout(() => {
            alert.remove();
        }, 3000);
    }

    // Afficher une alerte pour taille non disponible
    showSizeUnavailableAlert() {
        const alert = document.createElement('div');
        alert.className = 'size-alert unavailable';
        alert.innerHTML = `
            <div class="size-alert-content">
                <i class="fas fa-times-circle"></i>
                <span>Cette taille n'est pas disponible. Veuillez choisir une autre taille.</span>
            </div>
        `;
        
        document.body.appendChild(alert);
        
        setTimeout(() => {
            alert.remove();
        }, 3000);
    }

    // Passer commande via WhatsApp
    checkout() {
        if (this.items.length === 0) {
            return;
        }

        // Préparer les données pour WhatsApp
        const products = this.items.map(item => ({
            nom: item.product.nom,
            prix: item.product.prix,
            taille: item.size,
            quantité: item.quantity
        }));

        // Utiliser la méthode existante de WhatsAppHelper
        if (window.whatsAppHelper) {
            window.whatsAppHelper.orderMultipleProducts(products);
            
            // Vider le panier après commande
            this.clearCart();
            this.hideCart();
        }
    }

    // Méthode publique pour gérer l'ajout au panier depuis les boutons
    handleAddToCart(buttonElement) {
        // Protection contre les clics multiples rapides
        if (buttonElement.disabled) {
            return;
        }

        // Désactiver temporairement le bouton
        buttonElement.disabled = true;
        buttonElement.style.opacity = '0.6';

        const productCard = buttonElement.closest('.product-card');
        const productData = JSON.parse(productCard.dataset.product);
        const selectedSize = productCard.querySelector('.size-option.selected');
        
        // Vérifier si une taille est sélectionnée
        if (!selectedSize) {
            this.showSizeSelectionAlert();
            this.enableButton(buttonElement);
            return;
        }
        
        // Vérifier si la taille est disponible
        if (selectedSize.disabled || selectedSize.classList.contains('unavailable')) {
            this.showSizeUnavailableAlert();
            this.enableButton(buttonElement);
            return;
        }
        
        // Ajouter au panier avec validation
        this.addToCart(productData, selectedSize.dataset.size);
        
        // Réactiver le bouton après un délai
        setTimeout(() => {
            this.enableButton(buttonElement);
        }, 1000);
    }

    // Réactiver un bouton
    enableButton(buttonElement) {
        buttonElement.disabled = false;
        buttonElement.style.opacity = '1';
    }

    // Méthodes utilitaires pour l'API externe
    getCartItems() {
        return this.items;
    }

    getCartSummary() {
        return {
            totalItems: this.getTotalItems(),
            totalPrice: this.getTotalPrice(),
            items: this.items.length
        };
    }
}

// Initialiser le gestionnaire de panier
document.addEventListener('DOMContentLoaded', () => {
    window.cartManager = new CartManager();
});
