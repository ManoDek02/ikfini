class Navigation {
    constructor() {
        this.currentPage = 'home';
        this.pages = {
            home: this.createHomePage,
            catalog: this.createCatalogPage,
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
            
            // Load products for catalog page
            if (pageId === 'catalog') {
                window.googleSheets?.loadProducts('catalog');
            }
        }
    }

    createHomePage() {
        return `
            <div class="page active" id="home-page">
                <section class="hero">
                    <div class="hero-content">
                        <h1>IKFINI SHOP</h1>
                        <p>Votre mode à portée de clic !</p>
                        <p>Vêtements Homme & Femme</p>
                        
                        <div class="hero-features">
                            <div class="hero-feature">
                                <i class="fas fa-truck"></i>
                                <span>Livraison rapide partout</span>
                            </div>
                            <div class="hero-feature">
                                <i class="fas fa-shield-alt"></i>
                                <span>Qualité garantie</span>
                            </div>
                            <div class="hero-feature">
                                <i class="fab fa-whatsapp"></i>
                                <span>Commande via WhatsApp</span>
                            </div>
                        </div>
                        
                        <div class="hero-cta">
                            <button class="btn btn-primary" onclick="window.navigation.loadPage('catalog')">
                                <i class="fas fa-shopping-bag"></i>
                                Découvrir nos produits
                            </button>
                            <button class="btn btn-whatsapp" onclick="window.whatsAppHelper.sendGeneralMessage()">
                                <i class="fab fa-whatsapp"></i>
                                Nous contacter
                            </button>
                        </div>
                    </div>
                </section>

                <section class="section categories-preview">
                    <div class="container">
                        <h2 class="section-title">Nos Catégories</h2>
                        <p class="section-subtitle">Découvrez notre sélection par catégorie</p>
                        
                        <div class="categories-grid">
                            <div class="category-card" onclick="window.navigation.loadPage('catalog')">
                                <div class="category-icon">
                                    <i class="fas fa-male"></i>
                                </div>
                                <h3>Homme</h3>
                                <p>T-shirts, pantalons, chemises et plus</p>
                                <div class="category-count">12 produits</div>
                            </div>
                            
                            <div class="category-card" onclick="window.navigation.loadPage('catalog')">
                                <div class="category-icon">
                                    <i class="fas fa-female"></i>
                                </div>
                                <h3>Femme</h3>
                                <p>Robes, jupes, blazers élégants</p>
                                <div class="category-count">10 produits</div>
                            </div>
                            
                            <div class="category-card" onclick="window.navigation.loadPage('catalog')">
                                <div class="category-icon">
                                    <i class="fas fa-shoe-prints"></i>
                                </div>
                                <h3>Chaussures</h3>
                                <p>Sneakers, chaussures de ville</p>
                                <div class="category-count">5 produits</div>
                            </div>
                            
                            <div class="category-card" onclick="window.navigation.loadPage('catalog')">
                                <div class="category-icon">
                                    <i class="fas fa-gem"></i>
                                </div>
                                <h3>Accessoires</h3>
                                <p>Sacs, bijoux, ceintures</p>
                                <div class="category-count">6 produits</div>
                            </div>
                        </div>
                    </div>
                </section>

                <section class="section">
                    <div class="container">
                        <h2 class="section-title">Produits Vedettes</h2>
                        <p class="section-subtitle">Découvrez nos dernières collections de vêtements tendance pour homme et femme</p>
                        
                        <div id="home-products" class="products-grid">
                            <div class="product-card">
                                <img src="https://images.pexels.com/photos/428338/pexels-photo-428338.jpeg?auto=compress&cs=tinysrgb&w=400" alt="T-shirt Blanc Premium" class="product-image">
                                <div class="product-category">Homme</div>
                                <div class="product-info">
                                    <h3 class="product-title">T-shirt Blanc Premium</h3>
                                    <div class="product-price">5000 FCFA</div>
                                    <p class="product-description">T-shirt en coton 100% bio, coupe moderne et confortable. Parfait pour un look casual chic.</p>
                                    <div class="product-actions">
                                        <button class="btn btn-primary" onclick="window.navigation.loadPage('catalog')">
                                            <i class="fas fa-eye"></i>
                                            Voir plus
                                        </button>
                                    </div>
                                </div>
                            </div>
                            
                            <div class="product-card">
                                <img src="https://images.pexels.com/photos/985635/pexels-photo-985635.jpeg?auto=compress&cs=tinysrgb&w=400" alt="Robe Rouge Élégante" class="product-image">
                                <div class="product-category">Femme</div>
                                <div class="product-info">
                                    <h3 class="product-title">Robe Rouge Élégante</h3>
                                    <div class="product-price">15000 FCFA</div>
                                    <p class="product-description">Robe rouge sophistiquée, idéale pour les occasions spéciales. Coupe moderne et élégante.</p>
                                    <div class="product-actions">
                                        <button class="btn btn-primary" onclick="window.navigation.loadPage('catalog')">
                                            <i class="fas fa-eye"></i>
                                            Voir plus
                                        </button>
                                    </div>
                                </div>
                            </div>
                            
                            <div class="product-card">
                                <img src="https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=400" alt="Sneakers Blanches" class="product-image">
                                <div class="product-category">Chaussures</div>
                                <div class="product-info">
                                    <h3 class="product-title">Sneakers Blanches</h3>
                                    <div class="product-price">7500 FCFA</div>
                                    <p class="product-description">Sneakers blanches tendance, confortables pour un usage quotidien. Style urbain et moderne.</p>
                                    <div class="product-actions">
                                        <button class="btn btn-primary" onclick="window.navigation.loadPage('catalog')">
                                            <i class="fas fa-eye"></i>
                                            Voir plus
                                        </button>
                                    </div>
                                </div>
                            </div>
                            
                            <div class="product-card">
                                <img src="https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?auto=compress&cs=tinysrgb&w=400" alt="Sac à Main Cuir" class="product-image">
                                <div class="product-category">Accessoires</div>
                                <div class="product-info">
                                    <h3 class="product-title">Sac à Main Cuir</h3>
                                    <div class="product-price">12500 FCFA</div>
                                    <p class="product-description">Sac à main en cuir véritable, élégant et pratique. Parfait pour toutes occasions.</p>
                                    <div class="product-actions">
                                        <button class="btn btn-primary" onclick="window.navigation.loadPage('catalog')">
                                            <i class="fas fa-eye"></i>
                                            Voir plus
                                        </button>
                                    </div>
                                </div>
                            </div>
                            
                            <div class="product-card">
                                <img src="https://images.pexels.com/photos/1598507/pexels-photo-1598507.jpeg?auto=compress&cs=tinysrgb&w=400" alt="Pantalon Jean Slim" class="product-image">
                                <div class="product-category">Homme</div>
                                <div class="product-info">
                                    <h3 class="product-title">Pantalon Jean Slim</h3>
                                    <div class="product-price">8000 FCFA</div>
                                    <p class="product-description">Jean slim fit de haute qualité, confortable et durable. Style moderne et tendance.</p>
                                    <div class="product-actions">
                                        <button class="btn btn-primary" onclick="window.navigation.loadPage('catalog')">
                                            <i class="fas fa-eye"></i>
                                            Voir plus
                                        </button>
                                    </div>
                                </div>
                            </div>
                            
                            <div class="product-card">
                                <img src="https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=400" alt="Robe Fleurie" class="product-image">
                                <div class="product-category">Femme</div>
                                <div class="product-info">
                                    <h3 class="product-title">Robe Fleurie</h3>
                                    <div class="product-price">10000 FCFA</div>
                                    <p class="product-description">Robe d'été légère avec motifs floraux, parfaite pour les journées ensoleillées. Style bohème chic.</p>
                                    <div class="product-actions">
                                        <button class="btn btn-primary" onclick="window.navigation.loadPage('catalog')">
                                            <i class="fas fa-eye"></i>
                                            Voir plus
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div class="text-center" style="margin-top: 3rem;">
                            <button class="btn btn-primary" onclick="window.navigation.loadPage('catalog')">
                                <i class="fas fa-shopping-bag"></i>
                                Voir tous les produits
                            </button>
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
                                <p>"Excellente qualité et livraison rapide ! Je recommande vivement Ikfini Shop."</p>
                                <div class="testimonial-author">
                                    <strong>Aminata D.</strong>
                                    <span>Cliente fidèle</span>
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
                                <p>"Service client au top et produits de qualité. Très satisfait de mes achats !"</p>
                                <div class="testimonial-author">
                                    <strong>Moussa K.</strong>
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
                                <p>"Commande facile via WhatsApp et réception rapide. Je recommande !"</p>
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
                            <h2>Prêt à faire du shopping ?</h2>
                            <p>Découvrez notre collection complète et trouvez votre style parfait</p>
                            <div class="cta-buttons">
                                <button class="btn btn-primary" onclick="window.navigation.loadPage('catalog')">
                                    <i class="fas fa-shopping-bag"></i>
                                    Voir le catalogue
                                </button>
                                <button class="btn btn-whatsapp" onclick="window.whatsAppHelper.sendGeneralMessage()">
                                    <i class="fab fa-whatsapp"></i>
                                    Commander maintenant
                                </button>
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
                        <h1 class="section-title">Notre Catalogue</h1>
                        <p class="section-subtitle">Explorez toute notre collection de vêtements de qualité</p>
                        
                        <div id="catalog-products" class="loading">
                            <div class="spinner"></div>
                            <p>Chargement des produits...</p>
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
                            <h1 class="section-title">À Propos d'Ikfini Shop</h1>
                            
                            <h2>Votre boutique mode de confiance</h2>
                            <p>
                                Depuis notre création, Ikfini Shop s'est établie comme une référence dans le domaine de la mode au Sénégal. 
                                Notre mission est simple : offrir à nos clients des vêtements de qualité supérieure, tendance et accessibles, 
                                pour hommes et femmes.
                            </p>
                            
                            <p>
                                Nous croyons que la mode doit être accessible à tous. C'est pourquoi nous proposons une large gamme de 
                                produits soigneusement sélectionnés, alliant style, confort et durabilité. Notre équipe parcourt les 
                                meilleures sources pour vous apporter les dernières tendances à des prix compétitifs.
                            </p>
                            
                            <p>
                                Avec notre plateforme en ligne et notre service de commande via WhatsApp, nous rendons le shopping 
                                plus facile que jamais. Votre satisfaction est notre priorité absolue.
                            </p>
                        </div>

                        <div class="features-grid">
                            <div class="feature-card">
                                <i class="fas fa-heart"></i>
                                <h3>Passion Mode</h3>
                                <p>Une équipe passionnée qui sélectionne avec soin chaque produit pour vous offrir le meilleur de la mode.</p>
                            </div>
                            
                            <div class="feature-card">
                                <i class="fas fa-star"></i>
                                <h3>Qualité Premium</h3>
                                <p>Nous ne proposons que des articles de haute qualité, testés et approuvés par notre équipe.</p>
                            </div>
                            
                            <div class="feature-card">
                                <i class="fas fa-users"></i>
                                <h3>Service Client</h3>
                                <p>Une équipe dédiée pour vous accompagner dans vos achats et répondre à toutes vos questions.</p>
                            </div>
                            
                            <div class="feature-card">
                                <i class="fas fa-shipping-fast"></i>
                                <h3>Livraison Rapide</h3>
                                <p>Recevez vos commandes rapidement partout au Sénégal grâce à notre réseau de livraison efficace.</p>
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
                        
                        <div class="contact-info">
                            <div class="contact-card">
                                <i class="fas fa-phone"></i>
                                <h3>Téléphone</h3>
                                <p>+221 77 487 66 89</p>
                            </div>
                            
                            <div class="contact-card">
                                <i class="fas fa-envelope"></i>
                                <h3>Email</h3>
                                <p>contact@ikfinishop.com</p>
                            </div>
                            
                            <div class="contact-card">
                                <i class="fas fa-clock"></i>
                                <h3>Horaires</h3>
                                <p>Lun - Sam: 8h00 - 20h00<br>Dimanche: 10h00 - 18h00</p>
                            </div>
                        </div>

                        <div class="whatsapp-section">
                            <h3><i class="fab fa-whatsapp"></i> Commandez via WhatsApp</h3>
                            <p>
                                La façon la plus rapide de passer commande ! Envoyez-nous un message avec les produits 
                                qui vous intéressent et nous vous accompagnerons dans votre achat.
                            </p>
                            <a href="#" class="btn btn-whatsapp" onclick="window.whatsAppHelper.sendGeneralMessage()">
                                <i class="fab fa-whatsapp"></i>
                                Contacter sur WhatsApp
                            </a>
                        </div>
                    </div>
                </section>
            </div>
        `;
    }
}

// Initialize navigation when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.navigation = new Navigation();
});