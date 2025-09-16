class WhatsAppHelper {
    constructor() {
        // Numéro WhatsApp de la concession (remplacez par le vôtre)
        this.phoneNumber = '221776404406'; // Format international sans + ni espaces
        this.businessName = 'AutoMax';
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

    // Contacter pour un véhicule spécifique
    contactAboutCar(carName, carPrice) {
        const message = `Bonjour ${this.businessName} ! 👋

Je suis intéressé(e) par ce véhicule :

🚗 Véhicule : ${carName}
💰 Prix : ${carPrice}

Pourriez-vous me donner plus d'informations sur :
- La disponibilité du véhicule
- L'historique et l'état général
- Les modalités de livraison
- Les options de financement
- La garantie incluse

Merci !`;

        const whatsappUrl = this.generateWhatsAppUrl(message);
        window.open(whatsappUrl, '_blank');
        
        // Analytics (optionnel)
        this.trackEvent('car_inquiry', {
            car_name: carName,
            car_price: carPrice
        });
    }

    // Demander des informations sur un véhicule
    inquireCar(carName) {
        const message = `Bonjour ${this.businessName} ! 👋

J'aimerais avoir plus d'informations sur ce véhicule :

🚗 ${carName}

Pourriez-vous me renseigner sur :
- Les détails techniques du véhicule
- L'historique d'entretien
- Les options disponibles
- Le prix et les conditions de vente
- Les modalités de livraison

Merci !`;

        const whatsappUrl = this.generateWhatsAppUrl(message);
        window.open(whatsappUrl, '_blank');
        
        this.trackEvent('car_inquiry', {
            car_name: carName
        });
    }

    // Envoyer un message général
    sendGeneralMessage() {
        const message = `Bonjour ${this.businessName} ! 👋

J'aimerais en savoir plus sur vos véhicules et services.

Pouvez-vous m'aider à trouver le véhicule idéal pour mes besoins ?`;

        const whatsappUrl = this.generateWhatsAppUrl(message);
        window.open(whatsappUrl, '_blank');
        
        this.trackEvent('general_contact');
    }

    // Demander des informations sur les services
    askAboutServices(serviceType) {
        const message = `Bonjour ${this.businessName} !

J'aimerais connaître vos services de ${serviceType} :

Quels services proposez-vous ?
Quels sont vos tarifs ?
Quels sont les délais ?
Comment prendre rendez-vous ?

Merci !`;

        const whatsappUrl = this.generateWhatsAppUrl(message);
        window.open(whatsappUrl, '_blank');
        
        this.trackEvent('service_inquiry', {
            service_type: serviceType
        });
    }

    // Demander des informations sur le financement
    askAboutFinancing() {
        const message = `Bonjour ${this.businessName} !

J'aimerais connaître vos options de financement :

Quels sont vos taux d'intérêt ?
Quelles sont les conditions d'éligibilité ?
Quels documents sont nécessaires ?
Quels sont les délais d'approbation ?

Merci !`;

        const whatsappUrl = this.generateWhatsAppUrl(message);
        window.open(whatsappUrl, '_blank');
        
        this.trackEvent('financing_inquiry');
    }

    // Demander des informations sur la reprise
    askAboutTradeIn() {
        const message = `Bonjour ${this.businessName} !

J'aimerais connaître vos conditions de reprise de véhicule :

Comment évaluez-vous mon véhicule ?
Quels documents sont nécessaires ?
Quel est le processus de reprise ?
Quels sont les délais ?

Merci !`;

        const whatsappUrl = this.generateWhatsAppUrl(message);
        window.open(whatsappUrl, '_blank');
        
        this.trackEvent('trade_in_inquiry');
    }

    // Demander des informations sur la garantie
    askAboutWarranty() {
        const message = `Bonjour ${this.businessName} !

J'aimerais connaître vos garanties :

Quelle garantie offrez-vous ?
Que couvre la garantie ?
Quelle est la durée de la garantie ?
Comment faire valoir la garantie ?

Merci !`;

        const whatsappUrl = this.generateWhatsAppUrl(message);
        window.open(whatsappUrl, '_blank');
        
        this.trackEvent('warranty_inquiry');
    }

    // Prendre rendez-vous pour un essai
    bookTestDrive(carName) {
        const message = `Bonjour ${this.businessName} !

Je souhaite prendre rendez-vous pour un essai :

🚗 Véhicule : ${carName}
📅 Quand seriez-vous disponible ?
📍 Où se déroule l'essai ?

Merci !`;

        const whatsappUrl = this.generateWhatsAppUrl(message);
        window.open(whatsappUrl, '_blank');
        
        this.trackEvent('test_drive_booking', {
            car_name: carName
        });
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
    createWhatsAppButton(text = 'Contacter via WhatsApp', carName = null, carPrice = null) {
        const button = document.createElement('button');
        button.className = 'btn btn-secondary';
        button.innerHTML = `<i class="fab fa-whatsapp"></i> ${text}`;
        
        button.addEventListener('click', () => {
            if (carName && carPrice) {
                this.contactAboutCar(carName, carPrice);
            } else {
                this.sendGeneralMessage();
            }
        });
        
        return button;
    }

    // Envoyer un message personnalisé
    sendCustomMessage(message) {
        const whatsappUrl = this.generateWhatsAppUrl(message);
        window.open(whatsappUrl, '_blank');
        
        // Analytics (optionnel)
        this.trackEvent('custom_message', {
            message_length: message.length
        });
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
