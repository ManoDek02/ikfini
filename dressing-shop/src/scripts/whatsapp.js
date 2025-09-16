class WhatsAppHelper {
    constructor() {
        // Numéro WhatsApp de la boutique (remplacez par le vôtre)
        this.phoneNumber = '221776404406'; // Format international sans + ni espaces
        this.businessName = 'Ikfini Shop';
    }

    // Formater le message pour WhatsApp
    formatMessage(message) {
        return encodeURIComponent(message);
    }

    // Générer l'URL WhatsApp
    generateWhatsAppUrl(message) {
        const formattedMessage = this.formatMessage(message);
        return `https://wa.me/${this.phoneNumber}?text=${formattedMessage}`;
    }

    // Commander un produit spécifique
    orderProduct(productName, productPrice) {
        const message = `Bonjour ${this.businessName} ! 👋

Je suis intéressé(e) par ce produit :

Produit : ${productName}
Prix : ${productPrice}

Pourriez-vous me donner plus d'informations sur :
- La disponibilité
- Les tailles disponibles
- Les modalités de livraison

Merci !`;

        const whatsappUrl = this.generateWhatsAppUrl(message);
        window.open(whatsappUrl, '_blank');
        
        // Analytics (optionnel)
        this.trackEvent('product_order', {
            product_name: productName,
            product_price: productPrice
        });
    }

    // Commander un produit avec taille spécifique
    orderProductWithSize(productName, productPrice, size, stock) {
        const message = `Bonjour ${this.businessName} ! 👋

Je suis intéressé(e) par ce produit :

Produit : ${productName}
Prix : ${productPrice}
Taille : ${size}
Stock disponible : ${stock} pièce(s)

Pourriez-vous me confirmer :
- La disponibilité de cette taille
- Les modalités de livraison
- Les options de paiement

Merci !`;

        const whatsappUrl = this.generateWhatsAppUrl(message);
        window.open(whatsappUrl, '_blank');
        
        // Analytics (optionnel)
        this.trackEvent('product_order_with_size', {
            product_name: productName,
            product_price: productPrice,
            size: size,
            stock: stock
        });
    }

    // Envoyer un message général
    sendGeneralMessage() {
        const message = `Bonjour ${this.businessName} ! 👋

J'aimerais en savoir plus sur vos produits et services.

Pouvez-vous m'aider ?`;

        const whatsappUrl = this.generateWhatsAppUrl(message);
        window.open(whatsappUrl, '_blank');
        
        this.trackEvent('general_contact');
    }

    // Demander des informations sur un produit
    inquireProduct(productName) {
        const message = `Bonjour ${this.businessName} ! 👋

J'aimerais avoir plus d'informations sur ce produit :

${productName}

Pourriez-vous me renseigner sur :
- Les détails du produit
- Les tailles/couleurs disponibles  
- Le prix et les conditions de livraison

Merci !`;

        const whatsappUrl = this.generateWhatsAppUrl(message);
        window.open(whatsappUrl, '_blank');
        
        this.trackEvent('product_inquiry', {
            product_name: productName
        });
    }

    // Commander plusieurs produits (version améliorée)
    orderMultipleProducts(products) {
        let productList = '';
        let totalPrice = 0;
        
        products.forEach((product, index) => {
            const price = this.extractPrice(product.prix);
            const itemTotal = price * (product.quantité || 1);
            totalPrice += itemTotal;
            
            productList += `${index + 1}. ${product.nom} - ${product.prix}`;
            if (product.taille) {
                productList += ` (Taille: ${product.taille})`;
            }
            if (product.quantité && product.quantité > 1) {
                productList += ` x${product.quantité}`;
            }
            productList += '\n';
        });

        const message = `Bonjour ${this.businessName} !

Je souhaite passer une commande groupée :

**Articles sélectionnés :**
${productList}

**Total estimé :** ${totalPrice.toLocaleString()} FCFA

Pourriez-vous me confirmer :
- La disponibilité de tous ces articles
- Le prix total final
- Les frais de livraison
- Les modalités de paiement
- Les délais de livraison

Merci !`;

        const whatsappUrl = this.generateWhatsAppUrl(message);
        window.open(whatsappUrl, '_blank');
        
        this.trackEvent('multiple_products_order', {
            products_count: products.length,
            total_price: totalPrice
        });
    }

    // Extraire le prix numérique d'une chaîne
    extractPrice(priceString) {
        const match = priceString.match(/(\d+)/);
        return match ? parseInt(match[1]) : 0;
    }

    // Demander des informations sur la livraison
    askAboutDelivery() {
        const message = `Bonjour ${this.businessName} ! 👋

J'aimerais connaître vos conditions de livraison :

Dans quelles zones livrez-vous ?
Quels sont les délais de livraison ?
Quels sont les frais de livraison ?
Comment se passe la livraison ?

Merci !`;

        const whatsappUrl = this.generateWhatsAppUrl(message);
        window.open(whatsappUrl, '_blank');
        
        this.trackEvent('delivery_inquiry');
    }

    // Demander des informations sur les paiements
    askAboutPayment() {
        const message = `Bonjour ${this.businessName} !

J'aimerais connaître vos modalités de paiement :

Quels moyens de paiement acceptez-vous ?
Peut-on payer à la livraison ?
Acceptez-vous les paiements mobiles ?

Merci !`;

        const whatsappUrl = this.generateWhatsAppUrl(message);
        window.open(whatsappUrl, '_blank');
        
        this.trackEvent('payment_inquiry');
    }

    // Signaler un problème
    reportIssue(issue) {
        const message = `Bonjour ${this.businessName} !

J'aimerais signaler un problème :

❗ ${issue}

Pourriez-vous m'aider à résoudre cette situation ?

Merci !`;

        const whatsappUrl = this.generateWhatsAppUrl(message);
        window.open(whatsappUrl, '_blank');
        
        this.trackEvent('issue_report', {
            issue_type: issue
        });
    }

    // Suivi analytique des événements (optionnel)
    trackEvent(eventName, parameters = {}) {
        // Vous pouvez implémenter Google Analytics ou un autre service ici
        console.log(`📊 Event tracked: ${eventName}`, parameters);
        
        // Exemple avec Google Analytics (si implémenté)
        if (typeof gtag !== 'undefined') {
            gtag('event', eventName, {
                ...parameters,
                event_category: 'whatsapp_interaction'
            });
        }
    }

    // Vérifier si WhatsApp est disponible sur l'appareil
    isWhatsAppAvailable() {
        const userAgent = navigator.userAgent || navigator.vendor || window.opera;
        
        // Détecter les appareils mobiles
        if (/android/i.test(userAgent)) {
            return true; // Android peut ouvrir WhatsApp
        }
        
        if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
            return true; // iOS peut ouvrir WhatsApp
        }
        
        // Desktop - ouvre WhatsApp Web
        return true;
    }

    // Créer un bouton WhatsApp personnalisé
    createWhatsAppButton(text = 'Contacter via WhatsApp', productName = null, productPrice = null) {
        const button = document.createElement('button');
        button.className = 'btn btn-whatsapp';
        button.innerHTML = `<i class="fab fa-whatsapp"></i> ${text}`;
        
        button.addEventListener('click', () => {
            if (productName && productPrice) {
                this.orderProduct(productName, productPrice);
            } else {
                this.sendGeneralMessage();
            }
        });
        
        return button;
    }

    // Widget WhatsApp flottant (optionnel)
    createFloatingWidget() {
        const widget = document.createElement('div');
        widget.className = 'whatsapp-widget';
        widget.innerHTML = `
            <div class="whatsapp-widget-button">
                <i class="fab fa-whatsapp"></i>
            </div>
        `;
        
        // Ajouter les styles CSS pour le widget
        const style = document.createElement('style');
        style.textContent = `
            .whatsapp-widget {
                position: fixed;
                bottom: 20px;
                right: 20px;
                z-index: 1000;
            }
            
            .whatsapp-widget-button {
                width: 60px;
                height: 60px;
                background: #25d366;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                color: white;
                font-size: 24px;
                cursor: pointer;
                box-shadow: 0 4px 12px rgba(37, 211, 102, 0.3);
                transition: transform 0.3s ease;
            }
            
            .whatsapp-widget-button:hover {
                transform: scale(1.1);
            }
        `;
        
        document.head.appendChild(style);
        
        widget.addEventListener('click', () => {
            this.sendGeneralMessage();
        });
        
        return widget;
    }
}

// Initialiser l'assistant WhatsApp
document.addEventListener('DOMContentLoaded', () => {
    window.whatsAppHelper = new WhatsAppHelper();
    
    // Optionnel : Ajouter le widget flottant
    // document.body.appendChild(window.whatsAppHelper.createFloatingWidget());
});