class GoogleSheetsAPI {
    constructor() {
        // Configuration pour Google Sheets
        // Remplacez cette URL par votre lien Google Sheets publié en CSV
        this.sheetsUrl = 'https://docs.google.com/spreadsheets/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/edit#gid=0';
        
        // URL d'exemple pour les données de démonstration
        this.demoData = this.getDemoProducts();
        
        this.products = [];
        this.isLoading = false;
    }

    // Données de démonstration
    getDemoProducts() {
        return [
            {
                nom: "T-shirt Blanc Premium",
                prix: "5000 FCFA",
                categorie: "Homme",
                image: "https://images.pexels.com/photos/428338/pexels-photo-428338.jpeg?auto=compress&cs=tinysrgb&w=400",
                description: "T-shirt en coton 100% bio, coupe moderne et confortable. Parfait pour un look casual chic.",
                tailles: {
                    "S": { disponible: true, stock: 5 },
                    "M": { disponible: true, stock: 8 },
                    "L": { disponible: true, stock: 3 },
                    "XL": { disponible: false, stock: 0 }
                }
            },
            {
                nom: "Robe Rouge Élégante",
                prix: "15000 FCFA",
                categorie: "Femme",
                image: "https://images.pexels.com/photos/985635/pexels-photo-985635.jpeg?auto=compress&cs=tinysrgb&w=400",
                description: "Robe rouge sophistiquée, idéale pour les occasions spéciales. Tissu fluide et coupe flatteuse.",
                tailles: {
                    "XS": { disponible: true, stock: 2 },
                    "S": { disponible: true, stock: 4 },
                    "M": { disponible: true, stock: 6 },
                    "L": { disponible: true, stock: 2 },
                    "XL": { disponible: false, stock: 0 }
                }
            },
            {
                nom: "Pantalon Jean Slim",
                prix: "8000 FCFA",
                categorie: "Homme",
                image: "https://images.pexels.com/photos/1598507/pexels-photo-1598507.jpeg?auto=compress&cs=tinysrgb&w=400",
                description: "Jean slim fit de haute qualité, confortable et durable. Disponible en plusieurs tailles.",
                tailles: {
                    "28": { disponible: true, stock: 3 },
                    "30": { disponible: true, stock: 7 },
                    "32": { disponible: true, stock: 5 },
                    "34": { disponible: true, stock: 4 },
                    "36": { disponible: false, stock: 0 }
                }
            },
            {
                nom: "Chemise Business",
                prix: "12000 FCFA",
                categorie: "Homme",
                image: "https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg?auto=compress&cs=tinysrgb&w=400",
                description: "Chemise professionnelle en coton premium, parfaite pour le bureau. Coupe ajustée moderne.",
                tailles: {
                    "S": { disponible: true, stock: 6 },
                    "M": { disponible: true, stock: 9 },
                    "L": { disponible: true, stock: 4 },
                    "XL": { disponible: true, stock: 2 },
                    "XXL": { disponible: false, stock: 0 }
                }
            },
            {
                nom: "Robe Fleurie",
                prix: "10000 FCFA",
                categorie: "Femme",
                image: "https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=400",
                description: "Robe d'été légère avec motifs floraux. Parfaite pour les journées ensoleillées.",
                tailles: {
                    "XS": { disponible: true, stock: 3 },
                    "S": { disponible: true, stock: 5 },
                    "M": { disponible: true, stock: 7 },
                    "L": { disponible: true, stock: 3 },
                    "XL": { disponible: true, stock: 1 }
                }
            },
            {
                nom: "Pull-over Gris",
                prix: "9000 FCFA",
                categorie: "Unisexe",
                image: "https://images.pexels.com/photos/428340/pexels-photo-428340.jpeg?auto=compress&cs=tinysrgb&w=400",
                description: "Pull-over chaud et confortable, idéal pour les soirées fraîches. Maille douce et résistante.",
                tailles: {
                    "S": { disponible: true, stock: 4 },
                    "M": { disponible: true, stock: 8 },
                    "L": { disponible: true, stock: 6 },
                    "XL": { disponible: true, stock: 2 }
                }
            },
            {
                nom: "Jupe Noire Courte",
                prix: "6500 FCFA",
                categorie: "Femme",
                image: "https://images.pexels.com/photos/1055691/pexels-photo-1055691.jpeg?auto=compress&cs=tinysrgb&w=400",
                description: "Jupe noire versatile, parfaite avec tous les hauts. Coupe moderne et élégante.",
                tailles: {
                    "XS": { disponible: true, stock: 2 },
                    "S": { disponible: true, stock: 6 },
                    "M": { disponible: true, stock: 4 },
                    "L": { disponible: false, stock: 0 }
                }
            },
            {
                nom: "Blazer Femme",
                prix: "18000 FCFA",
                categorie: "Femme",
                image: "https://images.pexels.com/photos/1126993/pexels-photo-1126993.jpeg?auto=compress&cs=tinysrgb&w=400",
                description: "Blazer professionnel pour femme, coupe cintrée et style intemporel. Parfait pour le travail.",
                tailles: {
                    "XS": { disponible: true, stock: 1 },
                    "S": { disponible: true, stock: 3 },
                    "M": { disponible: true, stock: 5 },
                    "L": { disponible: true, stock: 2 },
                    "XL": { disponible: false, stock: 0 }
                }
            },
            {
                nom: "Sneakers Blanches",
                prix: "7500 FCFA",
                categorie: "Chaussures",
                image: "https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=400",
                description: "Sneakers blanches tendance, confortables pour un usage quotidien. Style urbain moderne.",
                tailles: {
                    "38": { disponible: true, stock: 2 },
                    "39": { disponible: true, stock: 4 },
                    "40": { disponible: true, stock: 6 },
                    "41": { disponible: true, stock: 3 },
                    "42": { disponible: true, stock: 5 },
                    "43": { disponible: false, stock: 0 },
                    "44": { disponible: true, stock: 2 }
                }
            },
            {
                nom: "Sac à Main Cuir",
                prix: "12500 FCFA",
                categorie: "Accessoires",
                image: "https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?auto=compress&cs=tinysrgb&w=400",
                description: "Sac à main en cuir véritable, élégant et pratique. Parfait pour toutes occasions.",
                tailles: {
                    "Unique": { disponible: true, stock: 8 }
                }
            },

            // Vêtements Homme supplémentaires
            {
                nom: "T-shirt Noir Graphique",
                prix: "4500 FCFA",
                categorie: "Homme",
                image: "https://images.pexels.com/photos/4065890/pexels-photo-4065890.jpeg?auto=compress&cs=tinysrgb&w=400",
                description: "T-shirt noir avec design graphique moderne. Coton doux et respirant.",
                tailles: {
                    "S": { disponible: true, stock: 6 },
                    "M": { disponible: true, stock: 10 },
                    "L": { disponible: true, stock: 7 },
                    "XL": { disponible: true, stock: 4 }
                }
            },
            {
                nom: "Polo Bleu Marine",
                prix: "7000 FCFA",
                categorie: "Homme",
                image: "https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg?auto=compress&cs=tinysrgb&w=400",
                description: "Polo élégant en bleu marine, parfait pour un look sophistiqué et décontracté.",
                tailles: {
                    "S": { disponible: true, stock: 5 },
                    "M": { disponible: true, stock: 8 },
                    "L": { disponible: true, stock: 6 },
                    "XL": { disponible: true, stock: 3 }
                }
            },
            {
                nom: "Short Cargo Beige",
                prix: "6000 FCFA",
                categorie: "Homme",
                image: "https://images.pexels.com/photos/1598507/pexels-photo-1598507.jpeg?auto=compress&cs=tinysrgb&w=400",
                description: "Short cargo pratique avec poches multiples. Idéal pour les activités outdoor.",
                tailles: {
                    "S": { disponible: true, stock: 4 },
                    "M": { disponible: true, stock: 7 },
                    "L": { disponible: true, stock: 5 },
                    "XL": { disponible: true, stock: 2 }
                }
            },
            {
                nom: "Veste Bomber Noire",
                prix: "14000 FCFA",
                categorie: "Homme",
                image: "https://images.pexels.com/photos/428340/pexels-photo-428340.jpeg?auto=compress&cs=tinysrgb&w=400",
                description: "Veste bomber tendance en noir, style urbain et confortable.",
                tailles: {
                    "S": { disponible: true, stock: 3 },
                    "M": { disponible: true, stock: 6 },
                    "L": { disponible: true, stock: 4 },
                    "XL": { disponible: true, stock: 2 }
                }
            },
            {
                nom: "Costume Business",
                prix: "25000 FCFA",
                categorie: "Homme",
                image: "https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg?auto=compress&cs=tinysrgb&w=400",
                description: "Costume professionnel complet, parfait pour les occasions formelles.",
                tailles: {
                    "S": { disponible: true, stock: 2 },
                    "M": { disponible: true, stock: 4 },
                    "L": { disponible: true, stock: 3 },
                    "XL": { disponible: true, stock: 1 }
                }
            },

            // Vêtements Femme supplémentaires
            {
                nom: "Blouse Blanche Élégante",
                prix: "8500 FCFA",
                categorie: "Femme",
                image: "https://images.pexels.com/photos/985635/pexels-photo-985635.jpeg?auto=compress&cs=tinysrgb&w=400",
                description: "Blouse blanche sophistiquée, parfaite pour le bureau ou les sorties.",
                tailles: {
                    "XS": { disponible: true, stock: 3 },
                    "S": { disponible: true, stock: 6 },
                    "M": { disponible: true, stock: 8 },
                    "L": { disponible: true, stock: 4 },
                    "XL": { disponible: true, stock: 2 }
                }
            },
            {
                nom: "Jeans Femme Skinny",
                prix: "9500 FCFA",
                categorie: "Femme",
                image: "https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=400",
                description: "Jeans skinny femme, coupe moderne et confortable. Élasticité optimale.",
                tailles: {
                    "XS": { disponible: true, stock: 2 },
                    "S": { disponible: true, stock: 5 },
                    "M": { disponible: true, stock: 7 },
                    "L": { disponible: true, stock: 3 },
                    "XL": { disponible: true, stock: 1 }
                }
            },
            {
                nom: "Robe Midi Bleue",
                prix: "12000 FCFA",
                categorie: "Femme",
                image: "https://images.pexels.com/photos/1126993/pexels-photo-1126993.jpeg?auto=compress&cs=tinysrgb&w=400",
                description: "Robe midi élégante en bleu, parfaite pour les occasions semi-formelles.",
                tailles: {
                    "XS": { disponible: true, stock: 2 },
                    "S": { disponible: true, stock: 4 },
                    "M": { disponible: true, stock: 6 },
                    "L": { disponible: true, stock: 3 },
                    "XL": { disponible: true, stock: 1 }
                }
            },
            {
                nom: "Veste Femme Blazer",
                prix: "16000 FCFA",
                categorie: "Femme",
                image: "https://images.pexels.com/photos/1055691/pexels-photo-1055691.jpeg?auto=compress&cs=tinysrgb&w=400",
                description: "Veste blazer femme, coupe cintrée et style professionnel moderne.",
                tailles: {
                    "XS": { disponible: true, stock: 1 },
                    "S": { disponible: true, stock: 3 },
                    "M": { disponible: true, stock: 5 },
                    "L": { disponible: true, stock: 2 },
                    "XL": { disponible: false, stock: 0 }
                }
            },
            {
                nom: "Ensemble Jogging Femme",
                prix: "11000 FCFA",
                categorie: "Femme",
                image: "https://images.pexels.com/photos/428338/pexels-photo-428338.jpeg?auto=compress&cs=tinysrgb&w=400",
                description: "Ensemble jogging confortable, parfait pour le sport ou le détente.",
                tailles: {
                    "XS": { disponible: true, stock: 2 },
                    "S": { disponible: true, stock: 4 },
                    "M": { disponible: true, stock: 6 },
                    "L": { disponible: true, stock: 3 },
                    "XL": { disponible: true, stock: 1 }
                }
            },

            // Chaussures supplémentaires
            {
                nom: "Baskets Sportives",
                prix: "9000 FCFA",
                categorie: "Chaussures",
                image: "https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=400",
                description: "Baskets sportives confortables, idéales pour le sport et le quotidien.",
                tailles: {
                    "38": { disponible: true, stock: 3 },
                    "39": { disponible: true, stock: 5 },
                    "40": { disponible: true, stock: 7 },
                    "41": { disponible: true, stock: 4 },
                    "42": { disponible: true, stock: 6 },
                    "43": { disponible: true, stock: 2 },
                    "44": { disponible: true, stock: 3 }
                }
            },
            {
                nom: "Escarpins Noirs",
                prix: "8500 FCFA",
                categorie: "Chaussures",
                image: "https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?auto=compress&cs=tinysrgb&w=400",
                description: "Escarpins noirs élégants, parfaits pour les occasions formelles.",
                tailles: {
                    "36": { disponible: true, stock: 2 },
                    "37": { disponible: true, stock: 4 },
                    "38": { disponible: true, stock: 6 },
                    "39": { disponible: true, stock: 5 },
                    "40": { disponible: true, stock: 3 },
                    "41": { disponible: true, stock: 2 }
                }
            },
            {
                nom: "Sandales Été",
                prix: "6500 FCFA",
                categorie: "Chaussures",
                image: "https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=400",
                description: "Sandales confortables pour l'été, style décontracté et pratique.",
                tailles: {
                    "36": { disponible: true, stock: 3 },
                    "37": { disponible: true, stock: 5 },
                    "38": { disponible: true, stock: 7 },
                    "39": { disponible: true, stock: 6 },
                    "40": { disponible: true, stock: 4 },
                    "41": { disponible: true, stock: 3 }
                }
            },
            {
                nom: "Bottes Cuir",
                prix: "18000 FCFA",
                categorie: "Chaussures",
                image: "https://images.pexels.com/photos/1598507/pexels-photo-1598507.jpeg?auto=compress&cs=tinysrgb&w=400",
                description: "Bottes en cuir véritable, élégantes et durables pour l'hiver.",
                tailles: {
                    "37": { disponible: true, stock: 2 },
                    "38": { disponible: true, stock: 4 },
                    "39": { disponible: true, stock: 5 },
                    "40": { disponible: true, stock: 3 },
                    "41": { disponible: true, stock: 2 },
                    "42": { disponible: true, stock: 1 }
                }
            },

            // Accessoires supplémentaires
            {
                nom: "Ceinture Cuir Marron",
                prix: "4500 FCFA",
                categorie: "Accessoires",
                image: "https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?auto=compress&cs=tinysrgb&w=400",
                description: "Ceinture en cuir véritable marron, élégante et résistante.",
                tailles: {
                    "S": { disponible: true, stock: 4 },
                    "M": { disponible: true, stock: 6 },
                    "L": { disponible: true, stock: 5 },
                    "XL": { disponible: true, stock: 3 }
                }
            },
            {
                nom: "Sac à Dos Urbain",
                prix: "8000 FCFA",
                categorie: "Accessoires",
                image: "https://images.pexels.com/photos/428340/pexels-photo-428340.jpeg?auto=compress&cs=tinysrgb&w=400",
                description: "Sac à dos urbain pratique, parfait pour le quotidien et les voyages.",
                tailles: {
                    "Unique": { disponible: true, stock: 6 }
                }
            },
            {
                nom: "Collier Doré",
                prix: "3500 FCFA",
                categorie: "Accessoires",
                image: "https://images.pexels.com/photos/985635/pexels-photo-985635.jpeg?auto=compress&cs=tinysrgb&w=400",
                description: "Collier doré élégant, parfait pour accessoiriser vos tenues.",
                tailles: {
                    "Unique": { disponible: true, stock: 10 }
                }
            },
            {
                nom: "Montre Sport",
                prix: "15000 FCFA",
                categorie: "Accessoires",
                image: "https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg?auto=compress&cs=tinysrgb&w=400",
                description: "Montre sport moderne, résistante à l'eau et fonctionnelle.",
                tailles: {
                    "Unique": { disponible: true, stock: 5 }
                }
            },
            {
                nom: "Écharpe Soie",
                prix: "5500 FCFA",
                categorie: "Accessoires",
                image: "https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=400",
                description: "Écharpe en soie douce, élégante et confortable pour l'hiver.",
                tailles: {
                    "Unique": { disponible: true, stock: 8 }
                }
            },

            // Vêtements Unisexe supplémentaires
            {
                nom: "Sweat à Capuche Gris",
                prix: "7500 FCFA",
                categorie: "Unisexe",
                image: "https://images.pexels.com/photos/428338/pexels-photo-428338.jpeg?auto=compress&cs=tinysrgb&w=400",
                description: "Sweat à capuche confortable, parfait pour un look décontracté.",
                tailles: {
                    "S": { disponible: true, stock: 5 },
                    "M": { disponible: true, stock: 8 },
                    "L": { disponible: true, stock: 6 },
                    "XL": { disponible: true, stock: 4 }
                }
            },
            {
                nom: "Gilet Sans Manches",
                prix: "5500 FCFA",
                categorie: "Unisexe",
                image: "https://images.pexels.com/photos/428340/pexels-photo-428340.jpeg?auto=compress&cs=tinysrgb&w=400",
                description: "Gilet sans manches pratique, idéal pour les couches de vêtements.",
                tailles: {
                    "S": { disponible: true, stock: 4 },
                    "M": { disponible: true, stock: 7 },
                    "L": { disponible: true, stock: 5 },
                    "XL": { disponible: true, stock: 3 }
                }
            }
        ];
    }

    // Méthode pour charger les produits
    async loadProducts(container = 'catalog') {
        this.isLoading = true;
        this.showLoading(container);

        try {
            // Essayer de charger depuis Google Sheets d'abord
            try {
                this.products = await this.loadFromGoogleSheets();
                console.log('✅ Produits chargés depuis Google Sheets:', this.products.length);
            } catch (sheetsError) {
                console.warn('⚠️ Erreur Google Sheets, utilisation des données de démonstration:', sheetsError);
                this.products = this.demoData;
                console.log('📦 Utilisation des données de démonstration:', this.products.length, 'produits');
            }
            
            // S'assurer qu'on a des produits
            if (!this.products || this.products.length === 0) {
                console.warn('⚠️ Aucun produit disponible, utilisation des données de démonstration');
                this.products = this.demoData;
            }
            
            this.displayProducts(container);
            
        } catch (error) {
            console.error('❌ Erreur lors du chargement des produits:', error);
            // En cas d'erreur, essayer d'utiliser les données de démonstration
            try {
                this.products = this.demoData;
                this.displayProducts(container);
                console.log('🔄 Récupération avec les données de démonstration:', this.products.length, 'produits');
            } catch (fallbackError) {
                console.error('❌ Erreur critique:', fallbackError);
                this.showError(container, 'Impossible de charger les produits. Veuillez réessayer plus tard.');
            }
        } finally {
            this.isLoading = false;
        }
    }

    // Simulation d'un appel API
    simulateAPICall() {
        return new Promise((resolve) => {
            setTimeout(resolve, 1500); // Simule une latence réseau
        });
    }

    // Méthode réelle pour Google Sheets (à implémenter)
    async loadFromGoogleSheets() {
        try {
            // Option 1: Utiliser l'API Google Sheets (nécessite une clé API)
            // const response = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/Sheet1!A:F?key=${API_KEY}`);
            
            // Option 2: Utiliser un Google Sheet publié en CSV (RECOMMANDÉ)
            // Remplacez cette URL par votre lien Google Sheets publié en CSV
            const response = await fetch('VOTRE_URL_CSV_GOOGLE_SHEETS');
            const csvText = await response.text();
            return this.parseCSV(csvText);
            
            // Pour l'exemple, retourne les données de démonstration
            // return this.demoData;
            
        } catch (error) {
            console.error('Erreur Google Sheets:', error);
            // En cas d'erreur, utiliser les données de démonstration
            return this.demoData;
        }
    }

    // Parser CSV (si vous utilisez l'export CSV de Google Sheets)
    parseCSV(csvText) {
        const lines = csvText.split('\n');
        const products = [];

        for (let i = 1; i < lines.length; i++) {
            const line = lines[i].trim();
            if (!line) continue; // Ignorer les lignes vides
            
            // Parser CSV simple (gère les virgules dans les descriptions)
            const values = this.parseCSVLine(line);
            
            if (values.length >= 4) {
                const product = {
                    nom: values[0]?.trim() || '',
                    prix: values[1]?.trim() || '',
                    image: values[2]?.trim() || '',
                    description: values[3]?.trim() || '',
                    categorie: values[4]?.trim() || 'Général'
                };

                // Parser les tailles si disponibles
                if (values[5]) {
                    try {
                        product.tailles = JSON.parse(values[5]);
                    } catch (e) {
                        // Si le JSON est invalide, créer des tailles par défaut
                        product.tailles = this.createDefaultSizes();
                    }
                } else {
                    product.tailles = this.createDefaultSizes();
                }

                products.push(product);
            }
        }

        return products;
    }

    // Parser une ligne CSV en gérant les virgules dans les descriptions
    parseCSVLine(line) {
        const values = [];
        let current = '';
        let inQuotes = false;
        
        for (let i = 0; i < line.length; i++) {
            const char = line[i];
            
            if (char === '"') {
                inQuotes = !inQuotes;
            } else if (char === ',' && !inQuotes) {
                values.push(current);
                current = '';
            } else {
                current += char;
            }
        }
        
        values.push(current); // Ajouter la dernière valeur
        return values;
    }

    // Créer des tailles par défaut si aucune n'est spécifiée
    createDefaultSizes() {
        return {
            "Unique": { disponible: true, stock: 1 }
        };
    }

    // Afficher l'état de chargement
    showLoading(container) {
        const containerId = container === 'home' ? 'home-products' : 'catalog-products';
        const element = document.getElementById(containerId);
        
        if (element) {
            element.innerHTML = `
                <div class="loading">
                    <div class="spinner"></div>
                    <p>Chargement des produits...</p>
                </div>
            `;
        }
    }

    // Afficher une erreur
    showError(container, message) {
        const containerId = container === 'home' ? 'home-products' : 'catalog-products';
        const element = document.getElementById(containerId);
        
        if (element) {
            element.innerHTML = `
                <div class="error">
                    <i class="fas fa-exclamation-triangle"></i>
                    <h3>Erreur de chargement</h3>
                    <p>${message}</p>
                    <button class="btn btn-primary" onclick="window.googleSheets.loadProducts('${container}')">
                        <i class="fas fa-redo"></i>
                        Réessayer
                    </button>
                </div>
            `;
        }
    }

    // Afficher les produits
    displayProducts(container, selectedCategory = 'Tous') {
        const containerId = container === 'home' ? 'home-products' : 'catalog-products';
        const element = document.getElementById(containerId);
        
        if (!element) return;

        // Filtrer par catégorie
        let filteredProducts = selectedCategory === 'Tous' ? this.products : 
                              this.products.filter(product => product.categorie === selectedCategory);

        // Limiter à 6 produits pour la page d'accueil
        const productsToShow = container === 'home' ? filteredProducts.slice(0, 6) : filteredProducts;

        if (productsToShow.length === 0) {
            element.innerHTML = `
                <div class="error">
                    <i class="fas fa-box-open"></i>
                    <h3>Aucun produit dans cette catégorie</h3>
                    <p>Découvrez nos autres collections !</p>
                </div>
            `;
            return;
        }

        const productsHTML = productsToShow.map(product => `
            <div class="product-card" data-product='${JSON.stringify(product)}'>
                <img src="${product.image}" 
                     alt="${product.nom}" 
                     class="product-image"
                     onerror="this.src='https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg?auto=compress&cs=tinysrgb&w=400'">
                <div class="product-category">${product.categorie}</div>
                ${this.getStockBadge(product)}
                <div class="product-info">
                    <h3 class="product-title">${product.nom}</h3>
                    <div class="product-price">${product.prix}</div>
                    <p class="product-description">${product.description}</p>
                    ${this.createSizeSelector(product)}
                    <button class="btn btn-whatsapp product-order-btn" onclick="window.googleSheets.handleProductOrder('${product.nom}', '${product.prix}', this)">
                        <i class="fab fa-whatsapp"></i>
                        Commander via WhatsApp
                    </button>
                    <button class="btn btn-primary add-to-cart-btn" onclick="window.cartManager.handleAddToCart(this)">
                        <i class="fas fa-shopping-cart"></i>
                        Ajouter au panier
                    </button>
                </div>
            </div>
        `).join('');

        // Ajouter les filtres pour la page catalogue
        const filtersHTML = container === 'catalog' ? this.createCategoryFilters(selectedCategory) : '';
        
        element.innerHTML = `
            ${filtersHTML}
            <div class="products-grid">${productsHTML}</div>
        `;

        // Initialiser l'état des boutons pour chaque produit
        setTimeout(() => {
            const productCards = element.querySelectorAll('.product-card');
            productCards.forEach(card => {
                if (window.ikfiniShopApp) {
                    window.ikfiniShopApp.updateProductButtons(card);
                }
            });
        }, 100);

        // Ajouter le bouton "Voir tous les produits" sur la page d'accueil
        if (container === 'home' && this.products.length > 6) {
            element.innerHTML += `
                <div class="text-center mt-4">
                    <button class="btn btn-primary" onclick="window.navigation.loadPage('catalog')">
                        Voir tous les produits
                        <i class="fas fa-arrow-right"></i>
                    </button>
                </div>
            `;
        }
    }

    // Créer les filtres de catégories
    createCategoryFilters(selectedCategory) {
        const categories = ['Tous', ...new Set(this.products.map(product => product.categorie))];
        
        const filtersHTML = categories.map(category => `
            <button class="category-filter ${category === selectedCategory ? 'active' : ''}" 
                    onclick="window.googleSheets.filterByCategory('${category}')">
                ${category}
            </button>
        `).join('');

        return `
            <div class="category-filters">
                <h3>Filtrer par catégorie :</h3>
                <div class="filters-container">
                    ${filtersHTML}
                </div>
            </div>
        `;
    }

    // Filtrer par catégorie
    filterByCategory(category) {
        this.displayProducts('catalog', category);
    }

    // Obtenir les catégories disponibles
    getCategories() {
        return [...new Set(this.products.map(product => product.categorie))];
    }

    // Obtenir un produit par nom
    getProductByName(name) {
        return this.products.find(product => product.nom === name);
    }

    // Rechercher des produits
    searchProducts(query) {
        const lowerQuery = query.toLowerCase();
        return this.products.filter(product => 
            product.nom.toLowerCase().includes(lowerQuery) ||
            product.description.toLowerCase().includes(lowerQuery)
        );
    }

    // Créer le sélecteur de tailles
    createSizeSelector(product) {
        if (!product.tailles) return '';
        
        const tailles = Object.entries(product.tailles);
        const taillesHTML = tailles.map(([taille, info]) => `
            <button class="size-option ${!info.disponible ? 'unavailable' : ''}" 
                    data-size="${taille}" 
                    data-stock="${info.stock}"
                    ${!info.disponible ? 'disabled' : ''}>
                ${taille}
                ${info.stock <= 2 && info.disponible ? '<span class="low-stock">!</span>' : ''}
            </button>
        `).join('');
        
        return `
            <div class="size-selector">
                <label class="size-label">Taille :</label>
                <div class="size-options">
                    ${taillesHTML}
                </div>
                <div class="size-info">
                    <span class="selected-size-info"></span>
                </div>
            </div>
        `;
    }

    // Créer le badge de stock
    getStockBadge(product) {
        if (!product.tailles) return '';
        
        const totalStock = Object.values(product.tailles).reduce((total, info) => total + info.stock, 0);
        const availableSizes = Object.values(product.tailles).filter(info => info.disponible).length;
        
        if (totalStock === 0) {
            return '<div class="stock-badge out-of-stock">Rupture de stock</div>';
        } else if (totalStock <= 5) {
            return '<div class="stock-badge low-stock">Stock limité</div>';
        } else if (availableSizes <= 2) {
            return '<div class="stock-badge limited-sizes">Tailles limitées</div>';
        }
        
        return '<div class="stock-badge in-stock">En stock</div>';
    }

    // Gérer la commande avec taille sélectionnée
    handleProductOrder(productName, productPrice, buttonElement) {
        const productCard = buttonElement.closest('.product-card');
        const selectedSize = productCard.querySelector('.size-option.selected');
        
        if (!selectedSize) {
            this.showSizeSelectionAlert();
            return;
        }
        
        const size = selectedSize.dataset.size;
        const stock = selectedSize.dataset.stock;
        
        // Appeler WhatsApp avec les informations de taille
        window.whatsAppHelper.orderProductWithSize(productName, productPrice, size, stock);
    }

    // Afficher une alerte pour sélectionner une taille
    showSizeSelectionAlert() {
        const alert = document.createElement('div');
        alert.className = 'size-alert';
        alert.innerHTML = `
            <div class="size-alert-content">
                <i class="fas fa-exclamation-circle"></i>
                <span>Veuillez sélectionner une taille avant de commander</span>
            </div>
        `;
        
        document.body.appendChild(alert);
        
        setTimeout(() => {
            alert.remove();
        }, 3000);
    }
}

// Initialiser l'API Google Sheets
document.addEventListener('DOMContentLoaded', () => {
    window.googleSheets = new GoogleSheetsAPI();
});