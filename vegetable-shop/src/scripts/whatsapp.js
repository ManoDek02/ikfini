// FreshVeg - Script pour l'intégration WhatsApp

class WhatsAppManager {
    constructor() {
        this.phoneNumber = '221776404406'; // Numéro WhatsApp par défaut
        this.init();
    }

    init() {
        this.setupEventListeners();
    }

    // Configuration des écouteurs d'événements
    setupEventListeners() {
        // Bouton de commande WhatsApp
        const checkoutBtn = document.querySelector('.checkout-btn');
        if (checkoutBtn) {
            checkoutBtn.addEventListener('click', () => {
                this.handleCheckout();
            });
        }

        // Boutons de contact WhatsApp
        document.querySelectorAll('.whatsapp-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                this.openWhatsApp(this.generateContactMessage());
            });
        });
    }

    // Gérer le processus de commande
    handleCheckout() {
        if (!window.cartManager || window.cartManager.cart.length === 0) {
            this.showNotification('Votre panier est vide', 'warning');
            return;
        }
        
        const message = this.generateOrderMessage(window.cartManager.cart);
        this.openWhatsApp(message);
    }

    // Générer le message de commande
    generateOrderMessage(cart) {
        let message = `🍅 *Commande FreshVeg* 🥕\n\n`;
        message += `Bonjour ! Je souhaite passer une commande de légumes frais :\n\n`;
        
        cart.forEach(item => {
            message += `• *${item.name}* (${item.badge || 'Standard'})\n`;
            message += `  Quantité: ${item.quantity} ${item.unit}\n`;
            message += `  Prix unitaire: ${item.price.toLocaleString()} FCFA\n`;
            message += `  Sous-total: ${(item.price * item.quantity).toLocaleString()} FCFA\n\n`;
        });
        
        const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        message += `💰 *Total: ${total.toLocaleString()} FCFA*\n\n`;
        message += `📱 Merci de confirmer ma commande et de me donner les détails de livraison.\n`;
        message += `📍 Adresse de livraison: [À préciser]\n`;
        message += `📞 Téléphone: [À préciser]\n`;
        message += `⏰ Préférence de livraison: [À préciser]`;
        
        return message;
    }

    // Générer le message de contact
    generateContactMessage() {
        return `Bonjour ! Je suis intéressé(e) par vos légumes frais. Pourriez-vous me donner plus d'informations sur vos produits et services ?`;
    }

    // Générer le message pour un produit spécifique
    generateProductMessage(product) {
        return `Bonjour ! Je suis intéressé(e) par le produit suivant :\n\n` +
               `• *${product.name}*\n` +
               `• Prix: ${product.price.toLocaleString()} FCFA / ${product.unit}\n` +
               `• Description: ${product.description}\n\n` +
               `Pourriez-vous me donner plus d'informations sur ce produit ?`;
    }

    // Ouvrir WhatsApp avec un message
    openWhatsApp(message) {
        const encodedMessage = encodeURIComponent(message);
        const whatsappUrl = `https://wa.me/${this.phoneNumber}?text=${encodedMessage}`;
        
        // Ouvrir dans un nouvel onglet
        window.open(whatsappUrl, '_blank');
        
        // Tracker l'événement
        this.trackWhatsAppClick(message);
    }

    // Ouvrir WhatsApp pour un produit spécifique
    openWhatsAppForProduct(product) {
        const message = this.generateProductMessage(product);
        this.openWhatsApp(message);
    }

    // Ouvrir WhatsApp pour le support
    openWhatsAppSupport() {
        const message = `Bonjour ! J'ai besoin d'aide avec ma commande ou j'ai une question sur vos services.`;
        this.openWhatsApp(message);
    }

    // Ouvrir WhatsApp pour les livraisons
    openWhatsAppDelivery() {
        const message = `Bonjour ! J'aimerais connaître vos options de livraison et les frais associés.`;
        this.openWhatsApp(message);
    }

    // Tracker les clics WhatsApp
    trackWhatsAppClick(message) {
        console.log('📱 WhatsApp click tracked:', {
            phone: this.phoneNumber,
            messageLength: message.length,
            timestamp: new Date().toISOString()
        });
        
        // Vous pouvez implémenter Google Analytics ou autre système de tracking ici
        if (typeof gtag !== 'undefined') {
            gtag('event', 'whatsapp_click', {
                'event_category': 'engagement',
                'event_label': 'order_inquiry'
            });
        }
    }

    // Configurer le numéro de téléphone
    setPhoneNumber(phoneNumber) {
        this.phoneNumber = phoneNumber;
        console.log('Numéro WhatsApp mis à jour:', phoneNumber);
    }

    // Obtenir le numéro de téléphone formaté
    getFormattedPhoneNumber() {
        return `+${this.phoneNumber}`;
    }

    // Vérifier si WhatsApp est disponible
    isWhatsAppAvailable() {
        return /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
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
        
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        setTimeout(() => {
            notification.style.transform = 'translateX(400px)';
            setTimeout(() => {
                if (document.body.contains(notification)) {
                    document.body.removeChild(notification);
                }
            }, 300);
        }, 4000);
    }

    // Créer un bouton WhatsApp pour un produit
    createWhatsAppButton(product, text = 'Commander') {
        const button = document.createElement('button');
        button.className = 'whatsapp-product-btn';
        button.innerHTML = `
            <i class="fab fa-whatsapp"></i>
            ${text}
        `;
        
        button.style.cssText = `
            background: #25D366;
            color: white;
            border: none;
            padding: 0.75rem 1rem;
            border-radius: 0.5rem;
            cursor: pointer;
            font-weight: 600;
            display: flex;
            align-items: center;
            gap: 0.5rem;
            transition: all 0.3s ease;
            margin-top: 0.5rem;
        `;
        
        button.addEventListener('click', () => {
            this.openWhatsAppForProduct(product);
        });
        
        button.addEventListener('mouseenter', () => {
            button.style.background = '#128C7E';
            button.style.transform = 'translateY(-2px)';
        });
        
        button.addEventListener('mouseleave', () => {
            button.style.background = '#25D366';
            button.style.transform = 'translateY(0)';
        });
        
        return button;
    }

    // Ajouter des boutons WhatsApp aux produits
    addWhatsAppButtonsToProducts() {
        document.querySelectorAll('.product-card').forEach(card => {
            const productName = card.querySelector('.product-name').textContent;
            const productPrice = card.querySelector('.product-price').textContent;
            const productDescription = card.querySelector('.product-description').textContent;
            
            const product = {
                name: productName,
                price: parseInt(productPrice.replace(/[^\d]/g, '')),
                description: productDescription
            };
            
            const whatsappBtn = this.createWhatsAppButton(product, 'Commander via WhatsApp');
            const productActions = card.querySelector('.product-actions');
            if (productActions) {
                productActions.appendChild(whatsappBtn);
            }
        });
    }
}

// Initialiser le gestionnaire WhatsApp
const whatsappManager = new WhatsAppManager();

// Fonctions globales
window.whatsappManager = whatsappManager;
window.openWhatsApp = (message) => whatsappManager.openWhatsApp(message);
window.openWhatsAppForProduct = (product) => whatsappManager.openWhatsAppForProduct(product);
window.openWhatsAppSupport = () => whatsappManager.openWhatsAppSupport();
window.openWhatsAppDelivery = () => whatsappManager.openWhatsAppDelivery();

// Configuration pour les développeurs
window.setWhatsAppNumber = (phoneNumber) => {
    whatsappManager.setPhoneNumber(phoneNumber);
};

// Ajouter les boutons WhatsApp après le chargement des produits
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        whatsappManager.addWhatsAppButtonsToProducts();
    }, 1000);
});
