class GoogleSheetsAPI {
    constructor() {
        // Configuration pour Google Sheets
        // Remplacez cette URL par votre lien Google Sheets publié en CSV
        this.sheetsUrl = 'https://docs.google.com/spreadsheets/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/edit#gid=0';
        
        // URL d'exemple pour les données de démonstration
        this.demoData = this.getDemoCars();
        
        this.cars = [];
        this.isLoading = false;
    }

    // Données de démonstration pour les voitures
    getDemoCars() {
        return [
            {
                nom: "Toyota Corolla 2023",
                marque: "Toyota",
                modele: "Corolla",
                annee: 2023,
                prix: "8500000 FCFA",
                prixOriginal: "9000000 FCFA",
                categorie: "Berline",
                carburant: "Essence",
                transmission: "Automatique",
                kilometrage: "15000 km",
                couleur: "Blanc",
                image: "https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg?auto=compress&cs=tinysrgb&w=600",
                description: "Toyota Corolla 2023 en excellent état, très économique et fiable. Parfait pour la ville et les longs trajets.",
                caracteristiques: {
                    "Moteur": "1.6L 4 cylindres",
                    "Puissance": "132 CV",
                    "Consommation": "6.2L/100km",
                    "Sièges": "5 places",
                    "Climatisation": "Oui",
                    "GPS": "Oui",
                    "Bluetooth": "Oui",
                    "Airbags": "6 airbags"
                },
                statut: "Disponible"
            },
            {
                nom: "BMW X5 2022",
                marque: "BMW",
                modele: "X5",
                annee: 2022,
                prix: "25000000 FCFA",
                prixOriginal: "28000000 FCFA",
                categorie: "SUV",
                carburant: "Essence",
                transmission: "Automatique",
                kilometrage: "25000 km",
                couleur: "Noir",
                image: "https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg?auto=compress&cs=tinysrgb&w=600",
                description: "BMW X5 luxueux avec toutes les options. Confort premium et performance exceptionnelle.",
                caracteristiques: {
                    "Moteur": "3.0L 6 cylindres",
                    "Puissance": "340 CV",
                    "Consommation": "8.5L/100km",
                    "Sièges": "7 places",
                    "Climatisation": "4 zones",
                    "GPS": "Navigation BMW",
                    "Bluetooth": "Oui",
                    "Airbags": "8 airbags",
                    "Toit ouvrant": "Panoramique"
                },
                statut: "Disponible"
            },
            {
                nom: "Peugeot 208 2021",
                marque: "Peugeot",
                modele: "208",
                annee: 2021,
                prix: "4500000 FCFA",
                prixOriginal: "5000000 FCFA",
                categorie: "Citadine",
                carburant: "Essence",
                transmission: "Manuelle",
                kilometrage: "30000 km",
                couleur: "Rouge",
                image: "https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg?auto=compress&cs=tinysrgb&w=600",
                description: "Peugeot 208 compacte et maniable, idéale pour la ville. Économique et moderne.",
                caracteristiques: {
                    "Moteur": "1.2L 3 cylindres",
                    "Puissance": "100 CV",
                    "Consommation": "5.1L/100km",
                    "Sièges": "5 places",
                    "Climatisation": "Oui",
                    "GPS": "Oui",
                    "Bluetooth": "Oui",
                    "Airbags": "4 airbags"
                },
                statut: "Disponible"
            },
            {
                nom: "Mercedes-Benz C-Class 2023",
                marque: "Mercedes-Benz",
                modele: "C-Class",
                annee: 2023,
                prix: "18000000 FCFA",
                prixOriginal: "20000000 FCFA",
                categorie: "Berline",
                carburant: "Essence",
                transmission: "Automatique",
                kilometrage: "12000 km",
                couleur: "Argent",
                image: "https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg?auto=compress&cs=tinysrgb&w=600",
                description: "Mercedes C-Class élégante avec finitions premium. Confort et technologie de pointe.",
                caracteristiques: {
                    "Moteur": "2.0L 4 cylindres",
                    "Puissance": "255 CV",
                    "Consommation": "7.2L/100km",
                    "Sièges": "5 places",
                    "Climatisation": "3 zones",
                    "GPS": "Navigation Mercedes",
                    "Bluetooth": "Oui",
                    "Airbags": "7 airbags",
                    "Sièges chauffants": "Oui"
                },
                statut: "Disponible"
            },
            {
                nom: "Nissan Qashqai 2022",
                marque: "Nissan",
                modele: "Qashqai",
                annee: 2022,
                prix: "12000000 FCFA",
                prixOriginal: "13500000 FCFA",
                categorie: "SUV",
                carburant: "Essence",
                transmission: "Automatique",
                kilometrage: "20000 km",
                couleur: "Bleu",
                image: "https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg?auto=compress&cs=tinysrgb&w=600",
                description: "Nissan Qashqai polyvalent, idéal pour la famille. Spacieux et confortable.",
                caracteristiques: {
                    "Moteur": "1.3L 4 cylindres",
                    "Puissance": "140 CV",
                    "Consommation": "6.8L/100km",
                    "Sièges": "5 places",
                    "Climatisation": "2 zones",
                    "GPS": "Oui",
                    "Bluetooth": "Oui",
                    "Airbags": "6 airbags"
                },
                statut: "Disponible"
            },
            {
                nom: "Hyundai i20 2021",
                marque: "Hyundai",
                modele: "i20",
                annee: 2021,
                prix: "3800000 FCFA",
                prixOriginal: "4200000 FCFA",
                categorie: "Citadine",
                carburant: "Essence",
                transmission: "Manuelle",
                kilometrage: "35000 km",
                couleur: "Blanc",
                image: "https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg?auto=compress&cs=tinysrgb&w=600",
                description: "Hyundai i20 économique et fiable. Parfait pour les déplacements urbains.",
                caracteristiques: {
                    "Moteur": "1.0L 3 cylindres",
                    "Puissance": "100 CV",
                    "Consommation": "4.9L/100km",
                    "Sièges": "5 places",
                    "Climatisation": "Oui",
                    "GPS": "Oui",
                    "Bluetooth": "Oui",
                    "Airbags": "4 airbags"
                },
                statut: "Disponible"
            },
            {
                nom: "Audi A4 2023",
                marque: "Audi",
                modele: "A4",
                annee: 2023,
                prix: "16000000 FCFA",
                prixOriginal: "18000000 FCFA",
                categorie: "Berline",
                carburant: "Essence",
                transmission: "Automatique",
                kilometrage: "8000 km",
                couleur: "Noir",
                image: "https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg?auto=compress&cs=tinysrgb&w=600",
                description: "Audi A4 sportive avec technologie quattro. Performance et élégance allemandes.",
                caracteristiques: {
                    "Moteur": "2.0L 4 cylindres",
                    "Puissance": "190 CV",
                    "Consommation": "6.5L/100km",
                    "Sièges": "5 places",
                    "Climatisation": "3 zones",
                    "GPS": "Navigation Audi",
                    "Bluetooth": "Oui",
                    "Airbags": "6 airbags",
                    "Quattro": "Oui"
                },
                statut: "Disponible"
            },
            {
                nom: "Volkswagen Golf 2022",
                marque: "Volkswagen",
                modele: "Golf",
                annee: 2022,
                prix: "7500000 FCFA",
                prixOriginal: "8500000 FCFA",
                categorie: "Compacte",
                carburant: "Essence",
                transmission: "Automatique",
                kilometrage: "18000 km",
                couleur: "Gris",
                image: "https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg?auto=compress&cs=tinysrgb&w=600",
                description: "Volkswagen Golf légendaire, équilibre parfait entre confort et performance.",
                caracteristiques: {
                    "Moteur": "1.5L 4 cylindres",
                    "Puissance": "150 CV",
                    "Consommation": "5.8L/100km",
                    "Sièges": "5 places",
                    "Climatisation": "2 zones",
                    "GPS": "Oui",
                    "Bluetooth": "Oui",
                    "Airbags": "6 airbags"
                },
                statut: "Disponible"
            }
        ];
    }

    // Charger les voitures depuis Google Sheets ou utiliser les données de démo
    async loadCars(page = 'home') {
        this.isLoading = true;
        
        try {
            // Essayer de charger depuis Google Sheets
            const carsData = await this.fetchFromGoogleSheets();
            
            if (carsData && carsData.length > 0) {
                this.cars = carsData;
                console.log('✅ Voitures chargées depuis Google Sheets:', this.cars.length);
            } else {
                // Utiliser les données de démonstration
                this.cars = this.demoData;
                console.log('📋 Utilisation des données de démonstration:', this.cars.length);
            }
            
            // Filtrer selon la page
            const filteredCars = this.filterCarsForPage(page);
            
            // Afficher les voitures
            this.displayCars(filteredCars, page);
            
        } catch (error) {
            console.error('❌ Erreur lors du chargement des voitures:', error);
            // Utiliser les données de démonstration en cas d'erreur
            this.cars = this.demoData;
            const filteredCars = this.filterCarsForPage(page);
            this.displayCars(filteredCars, page);
        } finally {
            this.isLoading = false;
        }
    }

    // Tenter de récupérer les données depuis Google Sheets
    async fetchFromGoogleSheets() {
        try {
            // Convertir l'URL Google Sheets en URL CSV
            const csvUrl = this.sheetsUrl.replace('/edit#gid=', '/export?format=csv&gid=');
            
            const response = await fetch(csvUrl);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const csvText = await response.text();
            return this.parseCSV(csvText);
            
        } catch (error) {
            console.warn('⚠️ Impossible de charger depuis Google Sheets:', error.message);
            return null;
        }
    }

    // Parser le CSV en données de voitures
    parseCSV(csvText) {
        const lines = csvText.split('\n');
        const headers = lines[0].split(',').map(h => h.trim());
        const cars = [];
        
        for (let i = 1; i < lines.length; i++) {
            if (lines[i].trim()) {
                const values = lines[i].split(',').map(v => v.trim());
                const car = {};
                
                headers.forEach((header, index) => {
                    car[header] = values[index] || '';
                });
                
                cars.push(car);
            }
        }
        
        return cars;
    }

    // Filtrer les voitures selon la page
    filterCarsForPage(page) {
        switch (page) {
            case 'home':
                // Afficher les 6 voitures les plus récentes sur la page d'accueil
                return this.cars
                    .sort((a, b) => b.annee - a.annee)
                    .slice(0, 6);
            case 'catalog':
                // Afficher toutes les voitures dans le catalogue
                return this.cars;
            default:
                return this.cars;
        }
    }

    // Afficher les voitures dans l'interface
    displayCars(cars, page) {
        const container = document.getElementById('main-content');
        if (!container) return;

        if (page === 'home') {
            this.displayHomePage(cars);
        } else if (page === 'catalog') {
            this.displayCatalogPage(cars);
        }
    }

    // Afficher la page d'accueil avec les voitures vedettes
    displayHomePage(cars) {
        const container = document.getElementById('main-content');
        
        container.innerHTML = `
            <div class="page active">
                <!-- Hero Section -->
                <section class="hero">
                    <div class="hero-content">
                        <h1>Bienvenue chez AutoMax</h1>
                        <p>Découvrez notre sélection de véhicules neufs et d'occasion de qualité</p>
                        <div class="hero-features">
                            <div class="hero-feature">
                                <i class="fas fa-car"></i>
                                <h3>Véhicules de Qualité</h3>
                                <p>Inspection complète</p>
                            </div>
                            <div class="hero-feature">
                                <i class="fas fa-shield-alt"></i>
                                <h3>Garantie Étendue</h3>
                                <p>Protection maximale</p>
                            </div>
                            <div class="hero-feature">
                                <i class="fas fa-tools"></i>
                                <h3>Service Après-Vente</h3>
                                <p>Entretien professionnel</p>
                            </div>
                        </div>
                    </div>
                </section>

                <!-- Featured Cars Section -->
                <section class="section">
                    <div class="container">
                        <div class="section-title">
                            <h2>Nos Véhicules Vedettes</h2>
                            <p>Découvrez notre sélection de véhicules les plus populaires</p>
                        </div>
                        <div class="cars-grid">
                            ${cars.map(car => this.createCarCard(car)).join('')}
                        </div>
                    </div>
                </section>

                <!-- Services Section -->
                <section class="section" style="background: var(--gray-100);">
                    <div class="container">
                        <div class="section-title">
                            <h2>Nos Services</h2>
                            <p>Une gamme complète de services pour votre véhicule</p>
                        </div>
                        <div class="services-grid">
                            <div class="service-card">
                                <div class="service-icon">
                                    <i class="fas fa-search"></i>
                                </div>
                                <h3>Inspection Complète</h3>
                                <p>Chaque véhicule passe par une inspection rigoureuse pour garantir sa qualité et sa fiabilité.</p>
                            </div>
                            <div class="service-card">
                                <div class="service-icon">
                                    <i class="fas fa-wrench"></i>
                                </div>
                                <h3>Réparation & Entretien</h3>
                                <p>Service après-vente professionnel avec des techniciens qualifiés et des pièces d'origine.</p>
                            </div>
                            <div class="service-card">
                                <div class="service-icon">
                                    <i class="fas fa-credit-card"></i>
                                </div>
                                <h3>Financement</h3>
                                <p>Solutions de financement adaptées à votre budget avec des taux compétitifs.</p>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        `;
    }

    // Afficher la page catalogue avec filtres
    displayCatalogPage(cars) {
        const container = document.getElementById('main-content');
        
        container.innerHTML = `
            <div class="page active">
                <!-- Filter Section -->
                <section class="filter-section">
                    <div class="filter-container">
                        <div class="filter-grid">
                            <div class="filter-group">
                                <label for="marque-filter">Marque</label>
                                <select id="marque-filter">
                                    <option value="">Toutes les marques</option>
                                    ${this.getUniqueValues(cars, 'marque').map(marque => 
                                        `<option value="${marque}">${marque}</option>`
                                    ).join('')}
                                </select>
                            </div>
                            <div class="filter-group">
                                <label for="categorie-filter">Catégorie</label>
                                <select id="categorie-filter">
                                    <option value="">Toutes les catégories</option>
                                    ${this.getUniqueValues(cars, 'categorie').map(categorie => 
                                        `<option value="${categorie}">${categorie}</option>`
                                    ).join('')}
                                </select>
                            </div>
                            <div class="filter-group">
                                <label for="prix-filter">Prix maximum</label>
                                <select id="prix-filter">
                                    <option value="">Tous les prix</option>
                                    <option value="5000000">Moins de 5M FCFA</option>
                                    <option value="10000000">Moins de 10M FCFA</option>
                                    <option value="15000000">Moins de 15M FCFA</option>
                                    <option value="20000000">Moins de 20M FCFA</option>
                                </select>
                            </div>
                            <div class="filter-group">
                                <label for="carburant-filter">Carburant</label>
                                <select id="carburant-filter">
                                    <option value="">Tous les carburants</option>
                                    ${this.getUniqueValues(cars, 'carburant').map(carburant => 
                                        `<option value="${carburant}">${carburant}</option>`
                                    ).join('')}
                                </select>
                            </div>
                            <div class="filter-actions">
                                <button class="btn-filter" onclick="window.googleSheets.applyFilters()">
                                    <i class="fas fa-filter"></i> Filtrer
                                </button>
                                <button class="btn-clear" onclick="window.googleSheets.clearFilters()">
                                    <i class="fas fa-times"></i> Effacer
                                </button>
                            </div>
                        </div>
                    </div>
                </section>

                <!-- Cars Grid -->
                <section class="section">
                    <div class="container">
                        <div class="section-title">
                            <h2>Notre Catalogue de Véhicules</h2>
                            <p>Trouvez le véhicule parfait pour vos besoins</p>
                        </div>
                        <div class="cars-grid" id="cars-grid">
                            ${cars.map(car => this.createCarCard(car)).join('')}
                        </div>
                    </div>
                </section>
            </div>
        `;

        // Ajouter les événements de filtrage
        this.setupFilters();
    }

    // Créer une carte de voiture
    createCarCard(car) {
        const prixReduction = car.prixOriginal ? 
            `<span class="price-original">${car.prixOriginal}</span>` : '';
        
        return `
            <div class="car-card" data-car-id="${car.nom}">
                <div class="car-image">
                    <img src="${car.image}" alt="${car.nom}" loading="lazy">
                    <div class="car-badge">${car.statut}</div>
                </div>
                <div class="car-info">
                    <h3 class="car-title">${car.nom}</h3>
                    <p class="car-subtitle">${car.marque} • ${car.annee} • ${car.couleur}</p>
                    
                    <div class="car-specs">
                        <div class="car-spec">
                            <i class="fas fa-tachometer-alt"></i>
                            <span>${car.kilometrage}</span>
                        </div>
                        <div class="car-spec">
                            <i class="fas fa-gas-pump"></i>
                            <span>${car.carburant}</span>
                        </div>
                        <div class="car-spec">
                            <i class="fas fa-cog"></i>
                            <span>${car.transmission}</span>
                        </div>
                        <div class="car-spec">
                            <i class="fas fa-users"></i>
                            <span>5 places</span>
                        </div>
                    </div>
                    
                    <div class="car-price">
                        <span class="price">${car.prix}</span>
                        ${prixReduction}
                    </div>
                    
                    <div class="car-actions">
                        <button class="btn btn-secondary" onclick="window.googleSheets.showCarDetails('${car.nom}')">
                            <i class="fas fa-eye"></i> Voir détails
                        </button>
                        <button class="btn btn-primary" onclick="window.googleSheets.contactAboutCar('${car.nom}', '${car.prix}')">
                            <i class="fab fa-whatsapp"></i> Contact
                        </button>
                    </div>
                </div>
            </div>
        `;
    }
    
    // Envoyer un message WhatsApp spécialisé depuis une carte de produit
    sendWhatsAppMessage(type, carName, carPrice) {
        const messages = {
            'achat': `Bonjour AutoMax ! 👋

Je suis intéressé(e) par l'achat de ce véhicule :

🚗 Véhicule : ${carName}
💰 Prix : ${carPrice}

Pouvez-vous me donner plus d'informations sur :
- La disponibilité du véhicule
- L'historique et l'état général
- Les modalités de livraison
- Les options de garantie
- Les conditions de paiement

Merci !`,
            
            'financement': `Bonjour AutoMax ! 👋

Je souhaite des informations sur le financement pour ce véhicule :

🚗 Véhicule : ${carName}
💰 Prix : ${carPrice}

Pouvez-vous me renseigner sur :
- Les conditions de crédit disponibles
- Les taux d'intérêt
- Les durées de remboursement
- Les documents nécessaires
- Les garanties requises
- Les modalités de versement

Merci !`,
            
            'service': `Bonjour AutoMax ! 👋

Je souhaite des informations sur les services pour ce véhicule :

🚗 Véhicule : ${carName}
💰 Prix : ${carPrice}

Pouvez-vous me renseigner sur :
- Les services d'entretien proposés
- Les garanties disponibles
- Les tarifs de réparation
- La disponibilité des pièces détachées
- Les contrats de maintenance

Merci !`,
            
            'general': `Bonjour AutoMax ! 👋

Je vous contacte concernant ce véhicule :

🚗 Véhicule : ${carName}
💰 Prix : ${carPrice}

J'aimerais obtenir plus d'informations générales sur ce véhicule et vos services.

Merci !`
        };
        
        const message = messages[type] || messages['general'];
        
        if (window.whatsAppHelper) {
            window.whatsAppHelper.sendCustomMessage(message);
        } else {
            // Fallback si WhatsApp helper n'est pas disponible
            const phoneNumber = '221776404406';
            const encodedMessage = encodeURIComponent(message);
            window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, '_blank');
        }
        
        // Analytics
        this.trackCarContact(type, carName, carPrice);
    }
    
    // Suivre les contacts depuis les cartes de produits
    trackCarContact(type, carName, carPrice) {
        console.log(`📱 Contact depuis carte produit: ${type} - ${carName} - ${carPrice}`);
        
        // Ici vous pouvez ajouter votre système d'analytics
        if (typeof gtag !== 'undefined') {
            gtag('event', 'car_contact', {
                'contact_type': type,
                'car_name': carName,
                'car_price': carPrice,
                'page': 'catalog'
            });
        }
    }
    
    // Obtenir les valeurs uniques pour les filtres
    getUniqueValues(cars, property) {
        const values = cars.map(car => car[property]).filter(Boolean);
        return [...new Set(values)].sort();
    }

    // Configurer les filtres
    setupFilters() {
        // Les filtres seront appliqués via les boutons dans l'interface
    }

    // Appliquer les filtres
    applyFilters() {
        const marqueFilter = document.getElementById('marque-filter')?.value || '';
        const categorieFilter = document.getElementById('categorie-filter')?.value || '';
        const prixFilter = document.getElementById('prix-filter')?.value || '';
        const carburantFilter = document.getElementById('carburant-filter')?.value || '';

        let filteredCars = [...this.cars];

        if (marqueFilter) {
            filteredCars = filteredCars.filter(car => car.marque === marqueFilter);
        }

        if (categorieFilter) {
            filteredCars = filteredCars.filter(car => car.categorie === categorieFilter);
        }

        if (prixFilter) {
            const maxPrix = parseInt(prixFilter);
            filteredCars = filteredCars.filter(car => {
                const prix = parseInt(car.prix.replace(/\D/g, ''));
                return prix <= maxPrix;
            });
        }

        if (carburantFilter) {
            filteredCars = filteredCars.filter(car => car.carburant === carburantFilter);
        }

        // Mettre à jour l'affichage
        const carsGrid = document.getElementById('cars-grid');
        if (carsGrid) {
            carsGrid.innerHTML = filteredCars.map(car => this.createCarCard(car)).join('');
        }
    }

    // Effacer les filtres
    clearFilters() {
        document.getElementById('marque-filter').value = '';
        document.getElementById('categorie-filter').value = '';
        document.getElementById('prix-filter').value = '';
        document.getElementById('carburant-filter').value = '';
        
        // Réafficher toutes les voitures
        const carsGrid = document.getElementById('cars-grid');
        if (carsGrid) {
            carsGrid.innerHTML = this.cars.map(car => this.createCarCard(car)).join('');
        }
    }

    // Afficher les détails d'une voiture
    showCarDetails(carName) {
        const car = this.cars.find(c => c.nom === carName);
        if (!car) return;

        const modal = document.createElement('div');
        modal.className = 'modal';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h2 class="modal-title">${car.nom}</h2>
                    <span class="close">&times;</span>
                </div>
                <div class="modal-body">
                    <div class="car-details-grid">
                        <div class="car-details-image">
                            <img src="${car.image}" alt="${car.nom}">
                        </div>
                        <div class="car-details-info">
                            <h3>Caractéristiques principales</h3>
                            <div class="car-details-specs">
                                ${Object.entries(car.caracteristiques).map(([key, value]) => `
                                    <div class="car-details-spec">
                                        <i class="fas fa-check"></i>
                                        <span><strong>${key}:</strong> ${value}</span>
                                    </div>
                                `).join('')}
                            </div>
                            <div class="car-details-price">${car.prix}</div>
                            <p class="car-details-description">${car.description}</p>
                            <div class="modal-actions">
                                <button class="btn btn-primary" onclick="window.googleSheets.contactAboutCar('${car.nom}', '${car.prix}')">
                                    <i class="fas fa-phone"></i> Contacter pour ce véhicule
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(modal);
        modal.style.display = 'block';

        // Fermer la modal
        modal.querySelector('.close').onclick = () => {
            modal.remove();
        };

        modal.onclick = (e) => {
            if (e.target === modal) {
                modal.remove();
            }
        };
    }

    // Contacter pour une voiture
    contactAboutCar(carName, carPrice) {
        console.log('🚗 Contact demandé pour:', carName, carPrice);
        console.log('📱 WhatsApp Helper disponible:', !!window.whatsAppHelper);
        
        const message = `Bonjour AutoMax ! 👋

Je suis intéressé(e) par ce véhicule :

🚗 Véhicule : ${carName}
💰 Prix : ${carPrice}

Pouvez-vous me donner plus d'informations sur :
- La disponibilité du véhicule
- L'historique et l'état général
- Les modalités de livraison
- Les options de garantie
- Les conditions de paiement

Merci !`;

        try {
            if (window.whatsAppHelper && typeof window.whatsAppHelper.sendMessage === 'function') {
                console.log('📱 Utilisation de WhatsApp Helper');
                window.whatsAppHelper.sendMessage(message);
            } else {
                console.log('📱 Utilisation du fallback direct');
                // Fallback direct vers WhatsApp
                const phoneNumber = '221776404406';
                const encodedMessage = encodeURIComponent(message);
                const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
                console.log('🔗 URL WhatsApp:', whatsappUrl);
                window.open(whatsappUrl, '_blank');
            }
            
            // Analytics
            if (typeof gtag !== 'undefined') {
                gtag('event', 'contact_car', {
                    'car_name': carName,
                    'car_price': carPrice
                });
            }
            
            console.log('✅ Contact WhatsApp envoyé avec succès');
            
        } catch (error) {
            console.error('❌ Erreur lors du contact WhatsApp:', error);
            // Fallback d'urgence
            const phoneNumber = '221776404406';
            const encodedMessage = encodeURIComponent(message);
            window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, '_blank');
        }
    }
    
    // Filtrer les véhicules par catégorie
    filterCarsByCategory(category) {
        if (!this.cars) {
            console.warn('Aucun véhicule chargé pour le filtrage');
            return;
        }
        
        let filteredCars = this.cars;
        
        if (category !== 'all') {
            filteredCars = this.cars.filter(car => {
                const carCategory = car.categorie ? car.categorie.toLowerCase() : '';
                return carCategory.includes(category.toLowerCase());
            });
        }
        
        this.displayFilteredCars(filteredCars, `Véhicules ${category === 'all' ? 'tous' : category}`);
    }
    
    // Filtrer les véhicules par prix
    filterCarsByPrice(priceRange) {
        if (!this.cars) {
            console.warn('Aucun véhicule chargé pour le filtrage');
            return;
        }
        
        let filteredCars = this.cars;
        
        if (priceRange) {
            const [min, max] = priceRange.split('-');
            const minPrice = parseInt(min);
            const maxPrice = max === '+' ? Infinity : parseInt(max);
            
            filteredCars = this.cars.filter(car => {
                const carPrice = this.extractPrice(car.prix);
                return carPrice >= minPrice && carPrice <= maxPrice;
            });
        }
        
        const priceLabel = this.getPriceRangeLabel(priceRange);
        this.displayFilteredCars(filteredCars, `Véhicules ${priceLabel}`);
    }
    
    // Extraire le prix numérique d'une chaîne de prix
    extractPrice(priceString) {
        if (!priceString) return 0;
        
        // Supprimer tout sauf les chiffres
        const numericPrice = priceString.replace(/[^\d]/g, '');
        return parseInt(numericPrice) || 0;
    }
    
    // Obtenir le label pour la plage de prix
    getPriceRangeLabel(priceRange) {
        const labels = {
            '0-5000000': 'moins de 5M FCFA',
            '5000000-10000000': 'entre 5M et 10M FCFA',
            '10000000-15000000': 'entre 10M et 15M FCFA',
            '15000000+': 'plus de 15M FCFA'
        };
        
        return labels[priceRange] || priceRange;
    }
    
    // Afficher les véhicules filtrés
    displayFilteredCars(cars, title) {
        const container = document.getElementById('catalog-cars');
        
        if (!container) {
            console.error('Container catalog-cars non trouvé');
            return;
        }
        
        if (cars.length === 0) {
            container.innerHTML = `
                <div class="no-results">
                    <i class="fas fa-search"></i>
                    <h3>Aucun véhicule trouvé</h3>
                    <p>Aucun véhicule ne correspond à vos critères de recherche.</p>
                    <button class="btn btn-primary" onclick="window.navigation.filterCars('all')">
                        <i class="fas fa-refresh"></i>
                        Voir tous les véhicules
                    </button>
                </div>
            `;
            return;
        }
        
        // Afficher le titre du filtre
        const filterTitle = document.createElement('div');
        filterTitle.className = 'filter-results-title';
        filterTitle.innerHTML = `
            <h3>${title} (${cars.length} véhicule${cars.length > 1 ? 's' : ''})</h3>
            <button class="btn btn-secondary" onclick="window.navigation.filterCars('all')">
                <i class="fas fa-times"></i>
                Effacer les filtres
            </button>
        `;
        
        // Créer la grille des véhicules
        const carsGrid = document.createElement('div');
        carsGrid.className = 'cars-grid';
        carsGrid.innerHTML = cars.map(car => this.createCarCard(car)).join('');
        
        // Mettre à jour le contenu
        container.innerHTML = '';
        container.appendChild(filterTitle);
        container.appendChild(carsGrid);
        
        // Animation d'entrée
        container.style.opacity = '0';
        setTimeout(() => {
            container.style.transition = 'opacity 0.3s ease';
            container.style.opacity = '1';
        }, 100);
    }
}

// Initialiser l'API Google Sheets pour les voitures
document.addEventListener('DOMContentLoaded', () => {
    window.googleSheets = new GoogleSheetsAPI();
});
