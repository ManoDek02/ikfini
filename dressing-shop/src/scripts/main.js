// Script principal pour initialiser l'application
class IkfiniShopApp {
    constructor() {
        this.isInitialized = false;
        this.init();
    }

    async init() {
        try {
            // Attendre que tous les modules soient chargés
            await this.waitForModules();
            
            // Initialiser l'application
            this.setupGlobalEvents();
            this.setupAnimations();
            this.setupPerformance();
            this.setupMobileOptimizations();
            
            // Marquer comme initialisé
            this.isInitialized = true;
            
            console.log('🚀 Ikfini Shop App initialisée avec succès!');
            
        } catch (error) {
            console.error('❌ Erreur lors de l\'initialisation:', error);
            this.handleInitError(error);
        }
    }

    // Attendre que tous les modules nécessaires soient chargés
    waitForModules() {
        return new Promise((resolve) => {
            // Vérifier immédiatement si les modules sont déjà chargés
            if (window.navigation && window.googleSheets && window.whatsAppHelper) {
                resolve();
                return;
            }
            
            // Sinon, attendre un court délai et résoudre quand même
            setTimeout(() => {
                console.log('⚠️ Certains modules peuvent ne pas être chargés, mais on continue...');
                resolve();
            }, 500);
        });
    }

    // Configuration des événements globaux
    setupGlobalEvents() {
        // Gestion du scroll pour la navbar
        this.setupNavbarScroll();
        
        // Gestion du redimensionnement de la fenêtre
        window.addEventListener('resize', this.debounce(this.handleWindowResize.bind(this), 300));
        
        // Gestion de la connexion réseau
        window.addEventListener('online', this.handleOnline.bind(this));
        window.addEventListener('offline', this.handleOffline.bind(this));
        
        // Gestion des sélecteurs de taille
        this.setupSizeSelectors();
        
        // Prévention du clic droit (optionnel)
        // document.addEventListener('contextmenu', e => e.preventDefault());
    }

    // Animation de la navbar au scroll
    setupNavbarScroll() {
        let lastScrollY = window.scrollY;
        const navbar = document.getElementById('navbar');
        
        window.addEventListener('scroll', () => {
            const currentScrollY = window.scrollY;
            
            if (navbar) {
                if (currentScrollY > lastScrollY && currentScrollY > 100) {
                    // Scroll vers le bas - cacher la navbar
                    navbar.style.transform = 'translateY(-100%)';
                } else {
                    // Scroll vers le haut - montrer la navbar
                    navbar.style.transform = 'translateY(0)';
                }
                
                // Ajouter une classe pour le style de scroll
                if (currentScrollY > 50) {
                    navbar.classList.add('scrolled');
                } else {
                    navbar.classList.remove('scrolled');
                }
            }
            
            lastScrollY = currentScrollY;
        });
    }

    // Gestion du redimensionnement
    handleWindowResize() {
        // Fermer le menu mobile si la fenêtre est redimensionnée
        const navMenu = document.getElementById('nav-menu');
        const navToggle = document.getElementById('nav-toggle');
        
        if (window.innerWidth > 768 && navMenu && navToggle) {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        }
    }

    // Gestion de la connexion
    handleOnline() {
        console.log('📶 Connexion rétablie');
        // Recharger les produits si nécessaire
        if (window.googleSheets && !window.googleSheets.isLoading) {
            const currentPage = window.navigation?.currentPage;
            if (currentPage === 'catalog' || currentPage === 'home') {
                window.googleSheets.loadProducts(currentPage);
            }
        }
    }

    handleOffline() {
        console.log('📵 Connexion perdue');
        this.showOfflineNotification();
    }

    // Optimisations spécifiques pour mobile
    setupMobileOptimizations() {
        const isMobile = window.innerWidth <= 768;
        
        if (isMobile) {
            console.log('📱 Optimisations mobile activées');
            
            // Empêcher le zoom sur les inputs
            const inputs = document.querySelectorAll('input[type="number"], input[type="text"], input[type="email"]');
            inputs.forEach(input => {
                input.addEventListener('focus', () => {
                    input.style.fontSize = '16px'; // Empêche le zoom sur iOS
                });
            });

            // Améliorer les interactions tactiles
            const buttons = document.querySelectorAll('.btn, .size-btn, .filter-btn, .cart-btn, .nav-toggle');
            buttons.forEach(button => {
                button.addEventListener('touchstart', (e) => {
                    button.style.transform = 'scale(0.95)';
                });
                
                button.addEventListener('touchend', (e) => {
                    setTimeout(() => {
                        button.style.transform = '';
                    }, 150);
                });
            });

            // Gérer l'orientation du téléphone
            window.addEventListener('orientationchange', () => {
                setTimeout(() => {
                    this.handleResize();
                    // Recharger les produits si nécessaire
                    if (window.googleSheets && !window.googleSheets.isLoading) {
                        const currentPage = window.navigation?.currentPage;
                        if (currentPage === 'catalog' || currentPage === 'home') {
                            window.googleSheets.loadProducts(currentPage);
                        }
                    }
                }, 500);
            });

            // Optimiser les performances sur mobile
            this.optimizeForMobile();
        }
    }

    // Optimisations de performance pour mobile
    optimizeForMobile() {
        // Réduire les animations sur mobile pour améliorer les performances
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        
        if (prefersReducedMotion) {
            document.documentElement.style.setProperty('--transition', 'none');
        }

        // Lazy loading des images
        const images = document.querySelectorAll('img[data-src]');
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src;
                        img.classList.remove('lazy');
                        observer.unobserve(img);
                    }
                });
            });

            images.forEach(img => imageObserver.observe(img));
        }
    }

    // Notification hors ligne
    showOfflineNotification() {
        const notification = document.createElement('div');
        notification.className = 'offline-notification';
        notification.innerHTML = `
            <div class="offline-content">
                <i class="fas fa-wifi"></i>
                <span>Connexion perdue. Certaines fonctionnalités peuvent être limitées.</span>
            </div>
        `;
        
        // Styles pour la notification
        const style = document.createElement('style');
        style.textContent = `
            .offline-notification {
                position: fixed;
                top: 70px;
                left: 0;
                right: 0;
                background: #fbbf24;
                color: #92400e;
                padding: 1rem;
                text-align: center;
                z-index: 999;
                animation: slideDown 0.3s ease;
            }
            
            .offline-content {
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 0.5rem;
            }
            
            @keyframes slideDown {
                from { transform: translateY(-100%); }
                to { transform: translateY(0); }
            }
        `;
        
        document.head.appendChild(style);
        document.body.appendChild(notification);
        
        // Supprimer la notification après 5 secondes
        setTimeout(() => {
            notification.remove();
            style.remove();
        }, 5000);
    }

    // Configuration des animations
    setupAnimations() {
        // Observer d'intersection pour les animations au scroll
        if ('IntersectionObserver' in window) {
            const observer = new IntersectionObserver(
                (entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            entry.target.classList.add('animate-in');
                        }
                    });
                },
                { threshold: 0.1 }
            );
            
            // Observer les cartes de produits et autres éléments
            document.addEventListener('DOMContentLoaded', () => {
                const animateElements = document.querySelectorAll('.product-card, .feature-card, .contact-card');
                animateElements.forEach(el => observer.observe(el));
            });
        }
    }

    // Optimisations de performance
    setupPerformance() {
        // Lazy loading des images
        this.setupLazyLoading();
        
        // Préchargement des pages importantes
        this.preloadCriticalResources();
    }

    // Lazy loading des images
    setupLazyLoading() {
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        if (img.dataset.src) {
                            img.src = img.dataset.src;
                            img.removeAttribute('data-src');
                            imageObserver.unobserve(img);
                        }
                    }
                });
            });
            
            // Observer toutes les images avec data-src
            document.addEventListener('DOMContentLoaded', () => {
                const lazyImages = document.querySelectorAll('img[data-src]');
                lazyImages.forEach(img => imageObserver.observe(img));
            });
        }
    }

    // Préchargement des ressources critiques
    preloadCriticalResources() {
        // Précharger les polices
        const fonts = [
            'https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap'
        ];
        
        fonts.forEach(font => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.href = font;
            link.as = 'style';
            document.head.appendChild(link);
        });
    }

    // Gestion des erreurs d'initialisation
    handleInitError(error) {
        const errorContainer = document.getElementById('main-content');
        if (errorContainer) {
            errorContainer.innerHTML = `
                <div class="error-page">
                    <div class="container">
                        <div class="error-content">
                            <i class="fas fa-exclamation-triangle"></i>
                            <h1>Erreur d'initialisation</h1>
                            <p>Une erreur est survenue lors du chargement de l'application.</p>
                            <button class="btn btn-primary" onclick="window.location.reload()">
                                <i class="fas fa-redo"></i>
                                Recharger la page
                            </button>
                        </div>
                    </div>
                </div>
            `;
        }
    }

    // Utilitaire: Debounce
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func.apply(this, args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    // Méthodes publiques pour l'interaction externe
    reloadProducts() {
        if (window.googleSheets) {
            const currentPage = window.navigation?.currentPage || 'home';
            window.googleSheets.loadProducts(currentPage);
        }
    }

    navigateToPage(pageId) {
        if (window.navigation) {
            window.navigation.loadPage(pageId);
        }
    }

    orderProduct(productName, productPrice) {
        if (window.whatsAppHelper) {
            window.whatsAppHelper.orderProduct(productName, productPrice);
        }
    }

    // Méthodes utilitaires pour le debug
    getStatus() {
        return {
            initialized: this.isInitialized,
            currentPage: window.navigation?.currentPage,
            productsLoaded: window.googleSheets?.products?.length || 0,
            online: navigator.onLine
        };
    }

    // Configuration des sélecteurs de taille
    setupSizeSelectors() {
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('size-option') && !e.target.disabled) {
                const productCard = e.target.closest('.product-card');
                const sizeOptions = productCard.querySelectorAll('.size-option');
                const sizeInfo = productCard.querySelector('.selected-size-info');
                
                // Retirer la sélection précédente
                sizeOptions.forEach(option => option.classList.remove('selected'));
                
                // Ajouter la nouvelle sélection
                e.target.classList.add('selected');
                
                // Mettre à jour les informations de taille
                const size = e.target.dataset.size;
                const stock = e.target.dataset.stock;
                
                if (sizeInfo) {
                    let stockText = '';
                    if (stock <= 2) {
                        stockText = ` - Plus que ${stock} en stock !`;
                    } else if (stock <= 5) {
                        stockText = ` - ${stock} disponibles`;
                    }
                    
                    sizeInfo.textContent = `Taille ${size} sélectionnée${stockText}`;
                    sizeInfo.style.color = stock <= 2 ? 'var(--warning)' : 'var(--success)';
                }
                
                // Mettre à jour l'état des boutons
                this.updateProductButtons(productCard);
            }
        });
    }

    // Mettre à jour l'état des boutons selon la sélection de taille
    updateProductButtons(productCard) {
        const selectedSize = productCard.querySelector('.size-option.selected');
        const addToCartBtn = productCard.querySelector('.add-to-cart-btn');
        const orderBtn = productCard.querySelector('.product-order-btn');
        
        if (selectedSize) {
            // Activer les boutons si une taille est sélectionnée
            if (addToCartBtn) {
                addToCartBtn.disabled = false;
                addToCartBtn.style.opacity = '1';
                addToCartBtn.style.cursor = 'pointer';
            }
            if (orderBtn) {
                orderBtn.disabled = false;
                orderBtn.style.opacity = '1';
                orderBtn.style.cursor = 'pointer';
            }
        } else {
            // Désactiver les boutons si aucune taille n'est sélectionnée
            if (addToCartBtn) {
                addToCartBtn.disabled = true;
                addToCartBtn.style.opacity = '0.6';
                addToCartBtn.style.cursor = 'not-allowed';
            }
            if (orderBtn) {
                orderBtn.disabled = true;
                orderBtn.style.opacity = '0.6';
                orderBtn.style.cursor = 'not-allowed';
            }
        }
    }
    
    // Méthode pour obtenir le statut de l'application
    getStatus() {
        return {
            isInitialized: this.isInitialized,
            modules: {
                navigation: !!window.navigation,
                googleSheets: !!window.googleSheets,
                whatsAppHelper: !!window.whatsAppHelper,
                cartManager: !!window.cartManager
            },
            currentPage: window.navigation?.currentPage || 'unknown',
            products: window.googleSheets?.products?.length || 0,
            demoData: window.googleSheets?.demoData?.length || 0
        };
    }
    
    // Méthode pour recharger les produits
    reloadProducts() {
        if (window.googleSheets) {
            console.log('🔄 Rechargement des produits...');
            window.googleSheets.loadProducts('catalog');
        }
    }
    
    // Méthode pour naviguer vers une page
    navigateToPage(page) {
        if (window.navigation) {
            console.log(`🧭 Navigation vers: ${page}`);
            window.navigation.loadPage(page);
        }
    }
}

// CSS pour les animations
const animationStyles = `
    .animate-in {
        animation: fadeInUp 0.6s ease-out;
    }
    
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .navbar {
        transition: transform 0.3s ease, background-color 0.3s ease;
    }
    
    .navbar.scrolled {
        background: rgba(255, 255, 255, 0.95);
        backdrop-filter: blur(10px);
    }
    
    .error-page {
        min-height: calc(100vh - 70px);
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: center;
        padding: 2rem;
    }
    
    .error-content i {
        font-size: 4rem;
        color: var(--error);
        margin-bottom: 2rem;
    }
    
    .error-content h1 {
        font-size: 2rem;
        margin-bottom: 1rem;
        color: var(--text-dark);
    }
    
    .error-content p {
        font-size: 1.125rem;
        color: var(--text-light);
        margin-bottom: 2rem;
    }
`;

// Ajouter les styles d'animation
const styleSheet = document.createElement('style');
styleSheet.textContent = animationStyles;
document.head.appendChild(styleSheet);

// Initialiser l'application
document.addEventListener('DOMContentLoaded', () => {
    window.ikfiniShopApp = new IkfiniShopApp();
});

// Exposer des méthodes globales pour le debug
window.debugIkfini = {
    getStatus: () => window.ikfiniShopApp?.getStatus(),
    reloadProducts: () => window.ikfiniShopApp?.reloadProducts(),
    navigateTo: (page) => window.ikfiniShopApp?.navigateToPage(page),
    checkModules: () => {
        console.log('🔍 État des modules:');
        console.log('- navigation:', !!window.navigation);
        console.log('- googleSheets:', !!window.googleSheets);
        console.log('- whatsAppHelper:', !!window.whatsAppHelper);
        console.log('- cartManager:', !!window.cartManager);
        console.log('- ikfiniShopApp:', !!window.ikfiniShopApp);
        
        if (window.googleSheets) {
            console.log('- Produits disponibles:', window.googleSheets.products?.length || 0);
            console.log('- Données de démo:', window.googleSheets.demoData?.length || 0);
        }
    },
    forceLoadProducts: () => {
        if (window.googleSheets) {
            console.log('🔄 Forcer le chargement des produits...');
            window.googleSheets.loadProducts('catalog');
        }
    }
};