// FreshVeg - Script pour l'intégration Google Sheets

class GoogleSheetsManager {
    constructor() {
        this.sheetId = 'YOUR_GOOGLE_SHEET_ID'; // À remplacer par votre ID de feuille
        this.apiKey = 'YOUR_GOOGLE_API_KEY'; // À remplacer par votre clé API
        this.baseUrl = 'https://sheets.googleapis.com/v4/spreadsheets';
        this.init();
    }

    init() {
        this.setupEventListeners();
    }

    // Configuration des écouteurs d'événements
    setupEventListeners() {
        // Écouter les soumissions de formulaire
        const contactForm = document.getElementById('contact-form');
        if (contactForm) {
            contactForm.addEventListener('submit', (e) => {
                this.handleContactSubmission(e);
            });
        }

        // Écouter les inscriptions à la newsletter
        const newsletterForm = document.querySelector('.newsletter-form');
        if (newsletterForm) {
            newsletterForm.addEventListener('submit', (e) => {
                this.handleNewsletterSubmission(e);
            });
        }
    }

    // Gérer la soumission du formulaire de contact
    async handleContactSubmission(e) {
        e.preventDefault();
        
        const formData = new FormData(e.target);
        const data = {
            name: formData.get('name'),
            email: formData.get('email'),
            message: formData.get('message'),
            timestamp: new Date().toISOString(),
            type: 'contact'
        };

        try {
            await this.submitToSheet(data, 'Contact');
            this.showSuccessMessage('Message envoyé avec succès !');
            e.target.reset();
        } catch (error) {
            console.error('Erreur lors de l\'envoi:', error);
            this.showErrorMessage('Erreur lors de l\'envoi du message. Veuillez réessayer.');
        }
    }

    // Gérer l'inscription à la newsletter
    async handleNewsletterSubmission(e) {
        e.preventDefault();
        
        const email = e.target.querySelector('input[type="email"]').value;
        const data = {
            email: email,
            timestamp: new Date().toISOString(),
            type: 'newsletter'
        };

        try {
            await this.submitToSheet(data, 'Newsletter');
            this.showSuccessMessage('Merci pour votre inscription à la newsletter !');
            e.target.querySelector('input[type="email"]').value = '';
        } catch (error) {
            console.error('Erreur lors de l\'inscription:', error);
            this.showErrorMessage('Erreur lors de l\'inscription. Veuillez réessayer.');
        }
    }

    // Soumettre des données à Google Sheets
    async submitToSheet(data, sheetName) {
        if (!this.sheetId || !this.apiKey) {
            console.warn('Google Sheets non configuré. Utilisation du mode simulation.');
            return this.simulateSubmission(data);
        }

        const url = `${this.baseUrl}/${this.sheetId}/values/${sheetName}:append?valueInputOption=RAW&key=${this.apiKey}`;
        
        const values = this.formatDataForSheet(data);
        
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                values: [values]
            })
        });

        if (!response.ok) {
            throw new Error(`Erreur HTTP: ${response.status}`);
        }

        return await response.json();
    }

    // Formater les données pour Google Sheets
    formatDataForSheet(data) {
        const values = [];
        
        switch (data.type) {
            case 'contact':
                values.push(
                    data.timestamp,
                    data.name,
                    data.email,
                    data.message
                );
                break;
            case 'newsletter':
                values.push(
                    data.timestamp,
                    data.email
                );
                break;
            case 'order':
                values.push(
                    data.timestamp,
                    data.customerName,
                    data.customerPhone,
                    data.customerEmail,
                    data.items,
                    data.total,
                    data.status || 'En attente'
                );
                break;
            default:
                values.push(JSON.stringify(data));
        }
        
        return values;
    }

    // Simulation de soumission (pour les tests)
    simulateSubmission(data) {
        return new Promise((resolve) => {
            setTimeout(() => {
                console.log('Simulation de soumission:', data);
                resolve({ success: true });
            }, 1000);
        });
    }

    // Enregistrer une commande
    async saveOrder(orderData) {
        const data = {
            ...orderData,
            timestamp: new Date().toISOString(),
            type: 'order'
        };

        try {
            await this.submitToSheet(data, 'Commandes');
            return true;
        } catch (error) {
            console.error('Erreur lors de l\'enregistrement de la commande:', error);
            return false;
        }
    }

    // Obtenir les données d'une feuille
    async getSheetData(range) {
        if (!this.sheetId || !this.apiKey) {
            console.warn('Google Sheets non configuré.');
            return null;
        }

        const url = `${this.baseUrl}/${this.sheetId}/values/${range}?key=${this.apiKey}`;
        
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`Erreur HTTP: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error('Erreur lors de la récupération des données:', error);
            return null;
        }
    }

    // Charger les produits depuis Google Sheets
    async loadProductsFromSheet() {
        try {
            const data = await this.getSheetData('Produits!A:F');
            if (data && data.values) {
                return this.parseProductsData(data.values);
            }
        } catch (error) {
            console.error('Erreur lors du chargement des produits:', error);
        }
        return null;
    }

    // Parser les données de produits
    parseProductsData(values) {
        const headers = values[0];
        const products = [];

        for (let i = 1; i < values.length; i++) {
            const row = values[i];
            if (row.length >= headers.length) {
                const product = {};
                headers.forEach((header, index) => {
                    product[header.toLowerCase().replace(/\s+/g, '_')] = row[index];
                });
                
                // Convertir les types
                if (product.prix) {
                    product.price = parseFloat(product.prix) || 0;
                }
                if (product.id) {
                    product.id = parseInt(product.id) || i;
                }
                
                products.push(product);
            }
        }

        return products;
    }

    // Afficher un message de succès
    showSuccessMessage(message) {
        this.showNotification(message, 'success');
    }

    // Afficher un message d'erreur
    showErrorMessage(message) {
        this.showNotification(message, 'error');
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

    // Configuration de l'API
    configure(sheetId, apiKey) {
        this.sheetId = sheetId;
        this.apiKey = apiKey;
        console.log('Google Sheets configuré avec succès');
    }

    // Test de connexion
    async testConnection() {
        if (!this.sheetId || !this.apiKey) {
            return { success: false, message: 'Configuration manquante' };
        }

        try {
            const data = await this.getSheetData('A1:A1');
            return { success: true, message: 'Connexion réussie' };
        } catch (error) {
            return { success: false, message: error.message };
        }
    }
}

// Initialiser le gestionnaire Google Sheets
const googleSheetsManager = new GoogleSheetsManager();

// Fonctions globales
window.googleSheetsManager = googleSheetsManager;

// Configuration pour les développeurs
window.configureGoogleSheets = (sheetId, apiKey) => {
    googleSheetsManager.configure(sheetId, apiKey);
};

// Test de connexion
window.testGoogleSheetsConnection = async () => {
    const result = await googleSheetsManager.testConnection();
    console.log('Test de connexion Google Sheets:', result);
    return result;
};
