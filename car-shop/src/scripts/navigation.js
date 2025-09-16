class Navigation {
    constructor() {
        this.currentPage = 'home';
        this.pages = {
            home: this.createHomePage,
            catalog: this.createCatalogPage,
            services: this.createServicesPage,
            about: this.createAboutPage,
            contact: this.createContactPage
        };
        
        this.init();
    }

    init() {
        this.setupNavigation();
        this.setupMobileMenu();
        this.loadPage('home');
    }

    setupNavigation() {
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const page = e.target.getAttribute('data-page');
                this.loadPage(page);
                
                // Update active nav link
                navLinks.forEach(l => l.classList.remove('active'));
                e.target.classList.add('active');
                
                // Close mobile menu if open
                this.closeMobileMenu();
            });
        });
    }

    setupMobileMenu() {
        const navToggle = document.getElementById('nav-toggle');
        const navMenu = document.getElementById('nav-menu');
        
        navToggle.addEventListener('click', () => {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
                this.closeMobileMenu();
            }
        });
    }

    closeMobileMenu() {
        const navToggle = document.getElementById('nav-toggle');
        const navMenu = document.getElementById('nav-menu');
        
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
    }

    loadPage(pageId) {
        const mainContent = document.getElementById('main-content');
        
        if (this.pages[pageId]) {
            mainContent.innerHTML = this.pages[pageId]();
            this.currentPage = pageId;
            
            // Load cars for catalog page
            if (pageId === 'catalog') {
                window.googleSheets?.loadCars('catalog');
            } else if (pageId === 'home') {
                window.googleSheets?.loadCars('home');
            }
        }
    }

    createHomePage() {
        return `
            <div class="page active" id="home-page">
                <section class="hero">
                    <div class="hero-content">
                        <h1>AUTOMAX</h1>
                        <p>Votre concessionnaire automobile de confiance</p>
                        <p>Véhicules neufs et d'occasion</p>
                        
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
                        
                        <div class="hero-cta">
                            <button class="btn btn-primary" onclick="window.navigation.loadPage('catalog')">
                                <i class="fas fa-car"></i>
                                Voir nos véhicules
                            </button>
                            <button class="btn btn-secondary" onclick="window.whatsAppHelper.sendGeneralMessage()">
                                <i class="fab fa-whatsapp"></i>
                                Nous contacter
                            </button>
                        </div>
                    </div>
                </section>

                <section class="section categories-preview">
                    <div class="container">
                        <h2 class="section-title">Nos Catégories</h2>
                        <p class="section-subtitle">Découvrez notre sélection par type de véhicule</p>
                        
                        <div class="categories-grid">
                            <div class="category-card" onclick="window.navigation.loadPage('catalog')">
                                <div class="category-icon">
                                    <i class="fas fa-car"></i>
                                </div>
                                <h3>Berlines</h3>
                                <p>Confort et élégance pour vos déplacements</p>
                            </div>
                            
                            <div class="category-card" onclick="window.navigation.loadPage('catalog')">
                                <div class="category-icon">
                                    <i class="fas fa-truck"></i>
                                </div>
                                <h3>SUV</h3>
                                <p>Polyvalence et robustesse pour tous terrains</p>
                            </div>
                            
                            <div class="category-card" onclick="window.navigation.loadPage('catalog')">
                                <div class="category-icon">
                                    <i class="fas fa-car-side"></i>
                                </div>
                                <h3>Citadines</h3>
                                <p>Maniabilité et économie pour la ville</p>
                            </div>
                            
                            <div class="category-card" onclick="window.navigation.loadPage('catalog')">
                                <div class="category-icon">
                                    <i class="fas fa-motorcycle"></i>
                                </div>
                                <h3>Compactes</h3>
                                <p>Équilibre parfait entre taille et confort</p>
                            </div>
                        </div>
                    </div>
                </section>

                <section class="section">
                    <div class="container">
                        <h2 class="section-title">Véhicules Récents</h2>
                        <p class="section-subtitle">Découvrez nos dernières acquisitions de véhicules de qualité</p>
                        
                        <div id="home-cars" class="loading">
                            <div class="loading-spinner"></div>
                            <p>Chargement des véhicules...</p>
                        </div>
                    </div>
                </section>

                <section class="section testimonials">
                    <div class="container">
                        <h2 class="section-title">Ce que disent nos clients</h2>
                        
                        <div class="testimonials-grid">
                            <div class="testimonial-card">
                                <div class="testimonial-stars">
                                    <i class="fas fa-star"></i>
                                    <i class="fas fa-star"></i>
                                    <i class="fas fa-star"></i>
                                    <i class="fas fa-star"></i>
                                    <i class="fas fa-star"></i>
                                </div>
                                <p>"Excellent service et véhicules de qualité ! AutoMax a dépassé mes attentes."</p>
                                <div class="testimonial-author">
                                    <strong>Moussa D.</strong>
                                    <span>Client fidèle</span>
                                </div>
                            </div>
                            
                            <div class="testimonial-card">
                                <div class="testimonial-stars">
                                    <i class="fas fa-star"></i>
                                    <i class="fas fa-star"></i>
                                    <i class="fas fa-star"></i>
                                    <i class="fas fa-star"></i>
                                    <i class="fas fa-star"></i>
                                </div>
                                <p>"Service après-vente impeccable et équipe très professionnelle. Je recommande !"</p>
                                <div class="testimonial-author">
                                    <strong>Aminata K.</strong>
                                    <span>Client régulier</span>
                                </div>
                            </div>
                            
                            <div class="testimonial-card">
                                <div class="testimonial-stars">
                                    <i class="fas fa-star"></i>
                                    <i class="fas fa-star"></i>
                                    <i class="fas fa-star"></i>
                                    <i class="fas fa-star"></i>
                                    <i class="fas fa-star"></i>
                                </div>
                                <p>"Achat facile et livraison rapide. Mon véhicule est exactement comme décrit !"</p>
                                <div class="testimonial-author">
                                    <strong>Fatou S.</strong>
                                    <span>Nouvelle cliente</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section class="section cta-section">
                    <div class="container">
                        <div class="cta-content">
                            <h2>Prêt à trouver votre véhicule idéal ?</h2>
                            <p>Découvrez notre collection complète et trouvez le véhicule parfait pour vos besoins</p>
                            <div class="cta-buttons">
                                <button class="btn btn-primary" onclick="window.navigation.loadPage('catalog')">
                                    <i class="fas fa-car"></i>
                                    Voir le catalogue
                                </button>
                                <button class="btn btn-secondary" onclick="window.navigation.sendWhatsAppMessage('general')">
                                    <i class="fab fa-whatsapp"></i>
                                    Contacter maintenant
                                </button>
                            </div>
                        </div>
                    </div>
                </section>
                
                <!-- Section WhatsApp pour l'accueil -->
                <section class="section">
                    <div class="container">
                        <div class="whatsapp-section">
                            <h3><i class="fab fa-whatsapp"></i> Contactez-nous facilement</h3>
                            <p>
                                Nos conseillers sont disponibles pour vous accompagner dans votre projet automobile. 
                                Choisissez le type d'assistance dont vous avez besoin !
                            </p>
                            
                            <div class="whatsapp-buttons">
                                <button class="btn btn-whatsapp" onclick="window.navigation.sendWhatsAppMessage('achat')">
                                    <i class="fas fa-car"></i>
                                    Achat de véhicule
                                </button>
                                
                                <button class="btn btn-whatsapp" onclick="window.navigation.sendWhatsAppMessage('financement')">
                                    <i class="fas fa-credit-card"></i>
                                    Financement
                                </button>
                                
                                <button class="btn btn-whatsapp" onclick="window.navigation.sendWhatsAppMessage('service')">
                                    <i class="fas fa-tools"></i>
                                    Service après-vente
                                </button>
                                
                                <button class="btn btn-whatsapp" onclick="window.navigation.sendWhatsAppMessage('general')">
                                    <i class="fab fa-whatsapp"></i>
                                    Questions générales
                                </button>
                            </div>
                            
                            <div class="whatsapp-info">
                                <div class="whatsapp-item">
                                    <i class="fas fa-clock"></i>
                                    <span>Réponse sous 24h</span>
                                </div>
                                <div class="whatsapp-item">
                                    <i class="fas fa-shield-alt"></i>
                                    <span>Service sécurisé</span>
                                </div>
                                <div class="whatsapp-item">
                                    <i class="fas fa-headset"></i>
                                    <span>Support personnalisé</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        `;
    }

    createCatalogPage() {
        return `
            <div class="page active" id="catalog-page">
                <section class="section">
                    <div class="container">
                        <h1 class="section-title">Notre Catalogue de Véhicules</h1>
                        <p class="section-subtitle">Explorez toute notre collection de véhicules de qualité</p>
                        
                        <!-- Filtres de véhicules -->
                        <div class="car-filters">
                            <h3>Filtrer par catégorie</h3>
                            <div class="filters-container">
                                <button class="filter-btn active" data-category="all" onclick="window.navigation.filterCars('all')">
                                    <i class="fas fa-car"></i> Tous
                                </button>
                                <button class="filter-btn" data-category="berline" onclick="window.navigation.filterCars('berline')">
                                    <i class="fas fa-car"></i> Berlines
                                </button>
                                <button class="filter-btn" data-category="suv" onclick="window.navigation.filterCars('suv')">
                                    <i class="fas fa-truck"></i> SUV
                                </button>
                                <button class="filter-btn" data-category="citadine" onclick="window.navigation.filterCars('citadine')">
                                    <i class="fas fa-car-side"></i> Citadines
                                </button>
                                <button class="filter-btn" data-category="compacte" onclick="window.navigation.filterCars('compacte')">
                                    <i class="fas fa-motorcycle"></i> Compactes
                                </button>
                            </div>
                            
                            <div class="price-filter">
                                <h4>Filtrer par prix</h4>
                                <div class="price-range">
                                    <button class="price-btn" onclick="window.navigation.filterByPrice('0-5000000')">
                                        < 5M FCFA
                                    </button>
                                    <button class="price-btn" onclick="window.navigation.filterByPrice('5000000-10000000')">
                                        5M - 10M FCFA
                                    </button>
                                    <button class="price-btn" onclick="window.navigation.filterByPrice('10000000-15000000')">
                                        10M - 15M FCFA
                                    </button>
                                    <button class="price-btn" onclick="window.navigation.filterByPrice('15000000+')">
                                        > 15M FCFA
                                    </button>
                                </div>
                            </div>
                        </div>
                        
                        <div id="catalog-cars" class="loading">
                            <div class="loading-spinner"></div>
                            <p>Chargement des véhicules...</p>
                        </div>
                        
                        <!-- Section WhatsApp pour le catalogue -->
                        <div class="whatsapp-section">
                            <h3><i class="fab fa-whatsapp"></i> Besoin d'aide pour choisir ?</h3>
                            <p>
                                Nos experts sont là pour vous accompagner dans votre choix de véhicule. 
                                Contactez-nous directement via WhatsApp pour des conseils personnalisés !
                            </p>
                            
                            <div class="whatsapp-buttons">
                                <button class="btn btn-whatsapp" onclick="window.navigation.sendWhatsAppMessage('achat')">
                                    <i class="fas fa-car"></i>
                                    Conseils d'achat
                                </button>
                                
                                <button class="btn btn-whatsapp" onclick="window.navigation.sendWhatsAppMessage('financement')">
                                    <i class="fas fa-credit-card"></i>
                                    Solutions de financement
                                </button>
                                
                                <button class="btn btn-whatsapp" onclick="window.navigation.sendWhatsAppMessage('general')">
                                    <i class="fab fa-whatsapp"></i>
                                    Questions générales
                                </button>
                                
                                <button class="btn btn-whatsapp" onclick="window.navigation.sendWhatsAppMessage('service')">
                                    <i class="fas fa-tools"></i>
                                    Service après-vente
                                </button>
                            </div>
                            
                            <div class="whatsapp-info">
                                <div class="whatsapp-item">
                                    <i class="fas fa-clock"></i>
                                    <span>Réponse sous 24h</span>
                                </div>
                                <div class="whatsapp-item">
                                    <i class="fas fa-user-tie"></i>
                                    <span>Conseils d'experts</span>
                                </div>
                                <div class="whatsapp-item">
                                    <i class="fas fa-handshake"></i>
                                    <span>Accompagnement personnalisé</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        `;
    }

    createServicesPage() {
        return `
            <div class="page active" id="services-page">
                <section class="section">
                    <div class="container">
                        <h1 class="section-title">Nos Services</h1>
                        <p class="section-subtitle">Une gamme complète de services pour votre véhicule</p>
                        
                        <div class="services-grid">
                            <div class="service-card">
                                <div class="service-icon">
                                    <i class="fas fa-search"></i>
                                </div>
                                <h3>Inspection Complète</h3>
                                <p>Chaque véhicule passe par une inspection rigoureuse pour garantir sa qualité et sa fiabilité. Nous vérifions tous les systèmes essentiels.</p>
                            </div>
                            
                            <div class="service-card">
                                <div class="service-icon">
                                    <i class="fas fa-wrench"></i>
                                </div>
                                <h3>Réparation & Entretien</h3>
                                <p>Service après-vente professionnel avec des techniciens qualifiés et des pièces d'origine pour maintenir votre véhicule en parfait état.</p>
                            </div>
                            
                            <div class="service-card">
                                <div class="service-icon">
                                    <i class="fas fa-credit-card"></i>
                                </div>
                                <h3>Financement</h3>
                                <p>Solutions de financement adaptées à votre budget avec des taux compétitifs et des conditions flexibles pour faciliter votre achat.</p>
                            </div>
                            
                            <div class="service-card">
                                <div class="service-icon">
                                    <i class="fas fa-shield-alt"></i>
                                </div>
                                <h3>Garantie Étendue</h3>
                                <p>Protection maximale pour votre investissement avec nos garanties étendues couvrant les réparations et la maintenance.</p>
                            </div>
                            
                            <div class="service-card">
                                <div class="service-icon">
                                    <i class="fas fa-truck"></i>
                                </div>
                                <h3>Livraison</h3>
                                <p>Service de livraison à domicile pour votre confort. Nous nous occupons de tout pour que vous receviez votre véhicule en toute sécurité.</p>
                            </div>
                            
                            <div class="service-card">
                                <div class="service-icon">
                                    <i class="fas fa-exchange-alt"></i>
                                </div>
                                <h3>Reprise Véhicule</h3>
                                <p>Nous reprenons votre ancien véhicule à un prix équitable pour faciliter votre nouvel achat et réduire vos coûts.</p>
                            </div>
                        </div>
                        
                        <!-- Section WhatsApp pour les services -->
                        <div class="whatsapp-section">
                            <h3><i class="fab fa-whatsapp"></i> Besoin d'un service ?</h3>
                            <p>
                                Nos techniciens sont à votre disposition pour tous vos besoins d'entretien et de réparation. 
                                Contactez-nous pour un devis personnalisé !
                            </p>
                            
                            <div class="whatsapp-buttons">
                                <button class="btn btn-whatsapp" onclick="window.navigation.sendWhatsAppMessage('service')">
                                    <i class="fas fa-tools"></i>
                                    Demander un devis
                                </button>
                                
                                <button class="btn btn-whatsapp" onclick="window.navigation.sendWhatsAppMessage('general')">
                                    <i class="fab fa-whatsapp"></i>
                                    Questions sur les services
                                </button>
                                
                                <button class="btn btn-whatsapp" onclick="window.navigation.sendWhatsAppMessage('achat')">
                                    <i class="fas fa-car"></i>
                                    Achat de véhicule
                                </button>
                                
                                <button class="btn btn-whatsapp" onclick="window.navigation.sendWhatsAppMessage('financement')">
                                    <i class="fas fa-credit-card"></i>
                                    Financement
                                </button>
                            </div>
                            
                            <div class="whatsapp-info">
                                <div class="whatsapp-item">
                                    <i class="fas fa-clock"></i>
                                    <span>Devis sous 24h</span>
                                </div>
                                <div class="whatsapp-item">
                                    <i class="fas fa-wrench"></i>
                                    <span>Techniciens qualifiés</span>
                                </div>
                                <div class="whatsapp-item">
                                    <i class="fas fa-shield-alt"></i>
                                    <span>Garantie sur les réparations</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        `;
    }

    createAboutPage() {
        return `
            <div class="page active" id="about-page">
                <section class="section">
                    <div class="container">
                        <div class="about-content">
                            <h1 class="section-title">À Propos d'AutoMax</h1>
                            
                            <h2>Votre concessionnaire automobile de confiance</h2>
                            <p>
                                Depuis notre création, AutoMax s'est établi comme une référence dans le domaine automobile au Sénégal. 
                                Notre mission est simple : offrir à nos clients des véhicules de qualité supérieure, fiables et accessibles, 
                                pour tous les budgets et tous les besoins.
                            </p>
                            
                            <p>
                                Nous croyons que posséder un véhicule doit être accessible à tous. C'est pourquoi nous proposons une large gamme de 
                                véhicules soigneusement sélectionnés, alliant performance, confort et durabilité. Notre équipe parcourt les 
                                meilleures sources pour vous apporter les véhicules les plus fiables à des prix compétitifs.
                            </p>
                            
                            <p>
                                Avec notre plateforme en ligne et notre service de contact via WhatsApp, nous rendons l'achat de véhicule 
                                plus facile que jamais. Votre satisfaction est notre priorité absolue.
                            </p>
                        </div>

                        <div class="features-grid">
                            <div class="feature-card">
                                <i class="fas fa-heart"></i>
                                <h3>Passion Automobile</h3>
                                <p>Une équipe passionnée qui sélectionne avec soin chaque véhicule pour vous offrir le meilleur de l'automobile.</p>
                            </div>
                            
                            <div class="feature-card">
                                <i class="fas fa-star"></i>
                                <h3>Qualité Premium</h3>
                                <p>Nous ne proposons que des véhicules de haute qualité, inspectés et approuvés par notre équipe d'experts.</p>
                            </div>
                            
                            <div class="feature-card">
                                <i class="fas fa-users"></i>
                                <h3>Service Client</h3>
                                <p>Une équipe dédiée pour vous accompagner dans votre achat et répondre à toutes vos questions.</p>
                            </div>
                            
                            <div class="feature-card">
                                <i class="fas fa-shipping-fast"></i>
                                <h3>Livraison Rapide</h3>
                                <p>Recevez votre véhicule rapidement partout au Sénégal grâce à notre réseau de livraison efficace.</p>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        `;
    }

    createContactPage() {
        return `
            <div class="page active" id="contact-page">
                <section class="section">
                    <div class="container">
                        <h1 class="section-title">Contactez-nous</h1>
                        <p class="section-subtitle">Nous sommes là pour vous aider. N'hésitez pas à nous contacter !</p>
                        
                        <div class="contact-content">
                            <div class="contact-info">
                                <div class="contact-item">
                                    <i class="fas fa-phone"></i>
                                    <div class="contact-item-content">
                                        <h4>Téléphone</h4>
                                        <p>+221 77 487 66 89</p>
                                    </div>
                                </div>
                                
                                <div class="contact-item">
                                    <i class="fas fa-envelope"></i>
                                    <div class="contact-item-content">
                                        <h4>Email</h4>
                                        <p>contact@automax.sn</p>
                                    </div>
                                </div>
                                
                                <div class="contact-item">
                                    <i class="fas fa-map-marker-alt"></i>
                                    <div class="contact-item-content">
                                        <h4>Adresse</h4>
                                        <p>Dakar, Sénégal</p>
                                    </div>
                                </div>
                                
                                <div class="contact-item">
                                    <i class="fas fa-clock"></i>
                                    <div class="contact-item-content">
                                        <h4>Horaires</h4>
                                        <p>Lun - Sam: 8h00 - 20h00<br>Dimanche: 10h00 - 18h00</p>
                                    </div>
                                </div>
                            </div>
                            
                        </div>

                        <div class="whatsapp-section">
                            <h3><i class="fab fa-whatsapp"></i> Contactez-nous via WhatsApp</h3>
                            <p>
                                La façon la plus rapide de nous contacter ! Envoyez-nous un message avec vos questions 
                                et nous vous accompagnerons dans votre recherche de véhicule.
                            </p>
                            
                            <div class="whatsapp-buttons">
                                <button class="btn btn-whatsapp" onclick="window.navigation.sendWhatsAppMessage('general')">
                                    <i class="fab fa-whatsapp"></i>
                                    Message général
                                </button>
                                
                                <button class="btn btn-whatsapp" onclick="window.navigation.sendWhatsAppMessage('achat')">
                                    <i class="fas fa-car"></i>
                                    Achat de véhicule
                                </button>
                                
                                <button class="btn btn-whatsapp" onclick="window.navigation.sendWhatsAppMessage('service')">
                                    <i class="fas fa-tools"></i>
                                    Service après-vente
                                </button>
                            </div>
                            
                            <div class="whatsapp-info">
                                <div class="whatsapp-item">
                                    <i class="fas fa-clock"></i>
                                    <span>Réponse sous 24h</span>
                                </div>
                                <div class="whatsapp-item">
                                    <i class="fas fa-shield-alt"></i>
                                    <span>Service sécurisé</span>
                                </div>
                                <div class="whatsapp-item">
                                    <i class="fas fa-headset"></i>
                                    <span>Support personnalisé</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        `;
    }

    // Envoyer un message WhatsApp selon le type
    sendWhatsAppMessage(type) {
        const messages = {
            'general': `Bonjour AutoMax ! 👋

Je vous contacte via votre site web pour obtenir des informations générales.

Pouvez-vous me renseigner sur :
- Vos véhicules disponibles
- Vos services
- Vos conditions de vente

Merci !`,
            
            'achat': `Bonjour AutoMax ! 👋

Je suis intéressé(e) par l'achat d'un véhicule.

Voici mes critères :
- Budget : [À préciser]
- Type de véhicule : [Berline/SUV/Citadine/Compacte]
- Carburant préféré : [Essence/Diesel/Hybride]
- Kilométrage max : [À préciser]

Pouvez-vous me proposer des options qui correspondent à mes besoins ?

Merci !`,
            
            'service': `Bonjour AutoMax ! 👋

Je souhaite des informations sur vos services après-vente.

Pouvez-vous me renseigner sur :
- Les services d'entretien proposés
- Les garanties disponibles
- Les tarifs de réparation
- La disponibilité des pièces détachées

Merci !`,
            
            'financement': `Bonjour AutoMax ! 👋

Je souhaite des informations sur vos solutions de financement.

Pouvez-vous me renseigner sur :
- Les conditions de crédit
- Les taux d'intérêt
- Les durées de remboursement
- Les documents nécessaires
- Les garanties requises

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
        this.trackWhatsAppUsage(type);
    }
    
    // Suivre l'utilisation de WhatsApp
    trackWhatsAppUsage(type) {
        console.log(`📱 Message WhatsApp envoyé: ${type}`);
        
        // Ici vous pouvez ajouter votre système d'analytics
        if (typeof gtag !== 'undefined') {
            gtag('event', 'whatsapp_message', {
                'message_type': type,
                'page': this.currentPage
            });
        }
    }
    
    // Filtrer les véhicules par catégorie
    filterCars(category) {
        // Mettre à jour l'état actif des boutons
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector(`[data-category="${category}"]`).classList.add('active');
        
        // Appliquer le filtre via googleSheets
        if (window.googleSheets) {
            window.googleSheets.filterCarsByCategory(category);
        }
        
        // Analytics
        this.trackFilterUsage('category', category);
    }
    
    // Filtrer les véhicules par prix
    filterByPrice(priceRange) {
        // Mettre à jour l'état actif des boutons de prix
        document.querySelectorAll('.price-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        event.target.classList.add('active');
        
        // Appliquer le filtre via googleSheets
        if (window.googleSheets) {
            window.googleSheets.filterCarsByPrice(priceRange);
        }
        
        // Analytics
        this.trackFilterUsage('price', priceRange);
    }
    
    // Suivre l'utilisation des filtres (analytics)
    trackFilterUsage(type, value) {
        console.log(`🔍 Filtre appliqué: ${type} = ${value}`);
        
        // Ici vous pouvez ajouter votre système d'analytics
        // Par exemple: Google Analytics, Facebook Pixel, etc.
        if (typeof gtag !== 'undefined') {
            gtag('event', 'filter_used', {
                'filter_type': type,
                'filter_value': value,
                'page': this.currentPage
            });
        }
    }
}

// Initialize navigation when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.navigation = new Navigation();
});
