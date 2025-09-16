// FreshVeg - Script pour la gestion du panier

class CartManager {
    constructor() {
        this.cart = JSON.parse(localStorage.getItem('freshveg-cart')) || [];
        this.init();
    }

    init() {
        this.updateCartDisplay();
        this.setupEventListeners();
    }

    // Ajouter un produit au panier
    addToCart(product, quantity = 1) {
        const existingItem = this.cart.find(item => item.id === product.id);
        
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            this.cart.push({
                ...product,
                quantity: quantity
            });
        }
        
        this.saveCart();
        this.updateCartDisplay();
        this.showNotification(`${product.name} ajouté au panier !`, 'success');
    }

    // Retirer un produit du panier
    removeFromCart(productId) {
        this.cart = this.cart.filter(item => item.id !== productId);
        this.saveCart();
        this.updateCartDisplay();
        this.showNotification('Article retiré du panier', 'info');
    }

    // Mettre à jour la quantité d'un produit
    updateQuantity(productId, newQuantity) {
        const item = this.cart.find(item => item.id === productId);
        if (item) {
            item.quantity = Math.max(1, newQuantity);
            this.saveCart();
            this.updateCartDisplay();
        }
    }

    // Vider le panier
    clearCart() {
        this.cart = [];
        this.saveCart();
        this.updateCartDisplay();
        this.showNotification('Panier vidé', 'info');
    }

    // Obtenir le total du panier
    getTotal() {
        return this.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    }

    // Obtenir le nombre total d'articles
    getTotalItems() {
        return this.cart.reduce((sum, item) => sum + item.quantity, 0);
    }

    // Sauvegarder le panier dans le localStorage
    saveCart() {
        localStorage.setItem('freshveg-cart', JSON.stringify(this.cart));
    }

    // Mettre à jour l'affichage du panier
    updateCartDisplay() {
        this.updateCartCount();
        this.updateCartItems();
        this.updateCartTotal();
    }

    // Mettre à jour le compteur du panier
    updateCartCount() {
        const cartCount = document.getElementById('cart-count');
        if (cartCount) {
            const totalItems = this.getTotalItems();
            cartCount.textContent = totalItems;
            cartCount.style.display = totalItems > 0 ? 'flex' : 'none';
        }
    }

    // Mettre à jour la liste des articles du panier
    updateCartItems() {
        const cartItems = document.getElementById('cart-items');
        if (!cartItems) return;

        cartItems.innerHTML = '';

        if (this.cart.length === 0) {
            cartItems.innerHTML = `
                <div class="empty-cart">
                    <i class="fas fa-shopping-cart"></i>
                    <p>Votre panier est vide</p>
                    <a href="#catalog" class="btn btn-primary" onclick="toggleCart()">
                        Commencer mes achats
                    </a>
                </div>
            `;
            return;
        }

        this.cart.forEach(item => {
            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item';
            cartItem.innerHTML = `
                <div class="cart-item-image">
                    <i class="${item.image}"></i>
                </div>
                <div class="cart-item-info">
                    <div class="cart-item-name">${item.name}</div>
                    <div class="cart-item-price">${item.price.toLocaleString()} FCFA / ${item.unit}</div>
                    <div class="cart-item-total">Total: ${(item.price * item.quantity).toLocaleString()} FCFA</div>
                </div>
                <div class="cart-item-controls">
                    <div class="cart-quantity-controls">
                        <button class="cart-quantity-btn" onclick="cartManager.updateQuantity(${item.id}, ${item.quantity - 1})" ${item.quantity <= 1 ? 'disabled' : ''}>-</button>
                        <span class="cart-quantity-display">${item.quantity}</span>
                        <button class="cart-quantity-btn" onclick="cartManager.updateQuantity(${item.id}, ${item.quantity + 1})" ${item.quantity >= 10 ? 'disabled' : ''}>+</button>
                    </div>
                    <button class="remove-item-btn" onclick="cartManager.removeFromCart(${item.id})" title="Retirer du panier">
                        <i class="fas fa-trash"></i>
                        Supprimer
                    </button>
                </div>
            `;
            cartItems.appendChild(cartItem);
        });
    }

    // Mettre à jour le total du panier
    updateCartTotal() {
        const cartTotal = document.getElementById('cart-total');
        if (cartTotal) {
            const total = this.getTotal();
            cartTotal.textContent = `${total.toLocaleString()} FCFA`;
        }
    }

    // Configuration des écouteurs d'événements
    setupEventListeners() {
        // Fermer le panier en cliquant sur l'overlay
        const cartOverlay = document.getElementById('cart-overlay');
        if (cartOverlay) {
            cartOverlay.addEventListener('click', () => {
                this.toggleCart();
            });
        }

        // Empêcher la fermeture du panier en cliquant à l'intérieur
        const cartSidebar = document.getElementById('cart-sidebar');
        if (cartSidebar) {
            cartSidebar.addEventListener('click', (e) => {
                e.stopPropagation();
            });
        }
    }

    // Basculer l'affichage du panier
    toggleCart() {
        const cartSidebar = document.getElementById('cart-sidebar');
        const cartOverlay = document.getElementById('cart-overlay');
        
        if (cartSidebar && cartOverlay) {
            cartSidebar.classList.toggle('active');
            cartOverlay.classList.toggle('active');
        }
    }

    // Procéder au checkout
    proceedToCheckout() {
        console.log('🛒 proceedToCheckout appelé, panier:', this.cart);
        
        if (this.cart.length === 0) {
            console.log('⚠️ Panier vide');
            this.showNotification('Votre panier est vide', 'warning');
            return;
        }
        
        console.log('📱 Génération du message WhatsApp...');
        // Générer le message WhatsApp
        const message = this.generateWhatsAppMessage();
        console.log('📝 Message généré:', message);
        
        const whatsappUrl = `https://wa.me/2217748766689?text=${encodeURIComponent(message)}`;
        console.log('🔗 URL WhatsApp:', whatsappUrl);
        
        window.open(whatsappUrl, '_blank');
        console.log('✅ WhatsApp ouvert');
        
        // Optionnel: vider le panier après commande
        // this.clearCart();
    }

    // Générer le message WhatsApp pour la commande
    generateWhatsAppMessage() {
        let message = `🍅 *Commande FreshVeg* 🥕\n\n`;
        message += `Bonjour ! Je souhaite passer une commande de légumes frais :\n\n`;
        
        this.cart.forEach(item => {
            message += `• ${item.name} (${item.badge || 'Standard'})\n`;
            message += `  Quantité: ${item.quantity} ${item.unit}\n`;
            message += `  Prix unitaire: ${item.price.toLocaleString()} FCFA\n`;
            message += `  Sous-total: ${(item.price * item.quantity).toLocaleString()} FCFA\n\n`;
        });
        
        const total = this.getTotal();
        message += `💰 *Total: ${total.toLocaleString()} FCFA*\n\n`;
        message += `📱 Merci de confirmer ma commande et de me donner les détails de livraison.\n`;
        message += `📍 Adresse de livraison: [À préciser]\n`;
        message += `📞 Téléphone: [À préciser]`;
        
        return message;
    }

    // Afficher une notification
    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        
        const iconMap = {
            success: 'check-circle',
            error: 'exclamation-circle',
            warning: 'exclamation-triangle',
            info: 'info-circle'
        };
        
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas fa-${iconMap[type] || 'info-circle'}"></i>
                <span>${message}</span>
            </div>
        `;
        
        // Styles pour la notification
        const colors = {
            success: '#10b981',
            error: '#ef4444',
            warning: '#f59e0b',
            info: '#3b82f6'
        };
        
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: ${colors[type] || colors.info};
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 0.5rem;
            box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
            z-index: 10000;
            transform: translateX(400px);
            transition: transform 0.3s ease;
            max-width: 350px;
            word-wrap: break-word;
        `;
        
        document.body.appendChild(notification);
        
        // Animation d'entrée
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Suppression automatique
        setTimeout(() => {
            notification.style.transform = 'translateX(400px)';
            setTimeout(() => {
                if (document.body.contains(notification)) {
                    document.body.removeChild(notification);
                }
            }, 300);
        }, 4000);
    }

    // Obtenir les données du panier pour export
    exportCartData() {
        return {
            items: this.cart,
            total: this.getTotal(),
            totalItems: this.getTotalItems(),
            timestamp: new Date().toISOString()
        };
    }

    // Importer des données de panier
    importCartData(data) {
        if (data && data.items && Array.isArray(data.items)) {
            this.cart = data.items;
            this.saveCart();
            this.updateCartDisplay();
            this.showNotification('Panier importé avec succès', 'success');
        }
    }
}

// Initialiser le gestionnaire de panier
const cartManager = new CartManager();

// Fonctions globales pour les boutons HTML
function proceedToCheckout() {
    console.log('🛒 Bouton checkout cliqué');
    if (cartManager) {
        console.log('✅ CartManager trouvé, exécution du checkout');
        cartManager.proceedToCheckout();
    } else {
        console.error('❌ CartManager non trouvé');
    }
}

function toggleCart() {
    console.log('🛒 Toggle cart cliqué');
    if (cartManager) {
        cartManager.toggleCart();
    } else {
        console.error('❌ CartManager non trouvé');
    }
}

function clearCart() {
    console.log('🗑️ Vider le panier cliqué');
    if (cartManager) {
        cartManager.clearCart();
    } else {
        console.error('❌ CartManager non trouvé');
    }
}

// Fonctions globales pour compatibilité
window.toggleCart = () => {
    console.log('🛒 Window.toggleCart appelé');
    if (cartManager) {
        cartManager.toggleCart();
    } else {
        console.error('❌ CartManager non trouvé');
    }
};

window.proceedToCheckout = () => {
    console.log('🛒 Window.proceedToCheckout appelé');
    if (cartManager) {
        cartManager.proceedToCheckout();
    } else {
        console.error('❌ CartManager non trouvé');
    }
};

window.clearCart = () => {
    console.log('🗑️ Window.clearCart appelé');
    if (cartManager) {
        cartManager.clearCart();
    } else {
        console.error('❌ CartManager non trouvé');
    }
};

window.cartManager = cartManager;

// Debug pour vérifier le chargement
console.log('🛒 Cart.js chargé, cartManager:', cartManager);
