// Script principal pour initialiser l'application AutoMax
class AutoMaxApp {
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
            
            console.log('🚗 AutoMax App initialisée avec succès!');
            
        } catch (error) {
            console.error('❌ Erreur lors de l\'initialisation:', error);
            this.handleInitError(error);
        }
    }

    // Attendre que tous les modules nécessaires soient chargés
    waitForModules() {
        return new Promise((resolve, reject) => {
            const checkModules = () => {
                if (window.navigation && window.googleSheets && window.whatsAppHelper) {
                    resolve();
                } else {
                    setTimeout(checkModules, 100);
                }
            };
            
            // Timeout après 10 secondes
            setTimeout(() => {
                if (!this.isInitialized) {
                    reject(new Error('Timeout: Modules non chargés'));
                }
            }, 10000);
            
            checkModules();
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
        
        // Gestion des filtres de véhicules
        this.setupCarFilters();
        
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
        // Recharger les véhicules si nécessaire
        if (window.googleSheets && !window.googleSheets.isLoading) {
            const currentPage = window.navigation?.currentPage;
            if (currentPage === 'catalog' || currentPage === 'home') {
                window.googleSheets.loadCars(currentPage);
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
            console.log('📱 Optimisations mobile activées pour AutoMax');
            
            // Empêcher le zoom sur les inputs
            const inputs = document.querySelectorAll('input[type="text"], input[type="email"], input[type="tel"]');
            inputs.forEach(input => {
                input.addEventListener('focus', () => {
                    input.style.fontSize = '16px'; // Empêche le zoom sur iOS
                });
            });

            // Améliorer les interactions tactiles
            const buttons = document.querySelectorAll('.btn, .filter-btn, .price-btn, .contact-btn, .nav-toggle');
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
                    this.handleWindowResize();
                    // Recharger les véhicules si nécessaire
                    if (window.googleSheets && !window.googleSheets.isLoading) {
                        const currentPage = window.navigation?.currentPage;
                        if (currentPage === 'catalog' || currentPage === 'home') {
                            window.googleSheets.loadCars(currentPage);
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

        // Lazy loading des images de voitures
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
            
            // Observer les cartes de véhicules et autres éléments
            document.addEventListener('DOMContentLoaded', () => {
                const animateElements = document.querySelectorAll('.car-card, .service-card, .contact-card');
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

    // Configuration des filtres de véhicules
    setupCarFilters() {
        document.addEventListener('click', (e) => {
            // Gestion des boutons de favoris
            if (e.target.classList.contains('favorite-btn') && !e.target.disabled) {
                const carCard = e.target.closest('.car-card');
                const carData = JSON.parse(carCard.dataset.car);
                
                if (window.favoritesManager) {
                    window.favoritesManager.handleAddToFavorites(e.target, carData);
                }
            }
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
    reloadCars() {
        if (window.googleSheets) {
            const currentPage = window.navigation?.currentPage || 'home';
            window.googleSheets.loadCars(currentPage);
        }
    }

    navigateToPage(pageId) {
        if (window.navigation) {
            window.navigation.loadPage(pageId);
        }
    }

    contactAboutCar(carName, carPrice) {
        if (window.whatsAppHelper) {
            window.whatsAppHelper.contactAboutCar(carName, carPrice);
        }
    }

    // Méthodes utilitaires pour le debug
    getStatus() {
        return {
            initialized: this.isInitialized,
            currentPage: window.navigation?.currentPage,
            carsLoaded: window.googleSheets?.cars?.length || 0,
            favoritesCount: window.favoritesManager?.getTotalFavorites() || 0,
            online: navigator.onLine
        };
    }
}

// CSS pour les animations et styles supplémentaires
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

    /* Styles pour les favoris */
    .favorites-button {
        position: fixed;
        bottom: 20px;
        left: 20px;
        z-index: 1000;
        cursor: pointer;
    }
    
    .favorites-icon {
        width: 60px;
        height: 60px;
        background: var(--primary-color);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-size: 24px;
        box-shadow: var(--shadow-lg);
        transition: var(--transition);
        position: relative;
    }
    
    .favorites-icon:hover {
        transform: scale(1.1);
    }
    
    .favorites-count {
        position: absolute;
        top: -5px;
        right: -5px;
        background: var(--accent-color);
        color: white;
        border-radius: 50%;
        width: 20px;
        height: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 12px;
        font-weight: 600;
    }
    
    .favorites-panel {
        position: fixed;
        top: 0;
        right: -400px;
        width: 400px;
        height: 100vh;
        background: var(--white);
        box-shadow: var(--shadow-xl);
        transition: var(--transition);
        z-index: 1001;
        display: flex;
        flex-direction: column;
    }
    
    .favorites-panel.active {
        right: 0;
    }
    
    .favorites-header {
        padding: 1.5rem;
        border-bottom: 1px solid var(--gray-200);
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    
    .favorites-content {
        flex: 1;
        overflow-y: auto;
        padding: 1rem;
    }
    
    .favorites-empty {
        text-align: center;
        padding: 2rem;
        color: var(--text-light);
    }
    
    .favorites-empty i {
        font-size: 3rem;
        margin-bottom: 1rem;
        color: var(--gray-300);
    }
    
    .favorites-item {
        display: flex;
        gap: 1rem;
        padding: 1rem;
        border: 1px solid var(--gray-200);
        border-radius: 0.5rem;
        margin-bottom: 1rem;
    }
    
    .favorites-item-image {
        width: 80px;
        height: 60px;
        border-radius: 0.25rem;
        overflow: hidden;
    }
    
    .favorites-item-image img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
    
    .favorites-item-details {
        flex: 1;
    }
    
    .favorites-item-details h4 {
        font-size: 0.875rem;
        margin-bottom: 0.25rem;
        color: var(--text-dark);
    }
    
    .favorites-item-price {
        font-weight: 600;
        color: var(--primary-color);
        font-size: 0.875rem;
        margin-bottom: 0.25rem;
    }
    
    .favorites-item-specs {
        font-size: 0.75rem;
        color: var(--text-light);
    }
    
    .favorites-item-controls {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
    }
    
    .favorites-item-controls .btn {
        padding: 0.5rem;
        font-size: 0.75rem;
    }
    
    .favorites-footer {
        padding: 1rem;
        border-top: 1px solid var(--gray-200);
    }
    
    .favorites-actions {
        display: flex;
        gap: 0.75rem;
    }
    
    .favorites-actions .btn {
        flex: 1;
    }
    
    .favorites-notification {
        position: fixed;
        top: 100px;
        right: 20px;
        background: var(--success);
        color: white;
        padding: 1rem;
        border-radius: 0.5rem;
        box-shadow: var(--shadow-lg);
        z-index: 1002;
        transform: translateX(100%);
        transition: var(--transition);
    }
    
    .favorites-notification.show {
        transform: translateX(0);
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }
    
    /* Bouton favori dans les cartes */
    .favorite-btn {
        position: absolute;
        top: 1rem;
        left: 1rem;
        width: 40px;
        height: 40px;
        background: rgba(255, 255, 255, 0.9);
        border: none;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        transition: var(--transition);
        z-index: 10;
    }
    
    .favorite-btn:hover {
        background: var(--white);
        transform: scale(1.1);
    }
    
    .favorite-btn.favorited {
        background: var(--primary-color);
        color: var(--white);
    }
    
    .favorite-btn i {
        font-size: 1.25rem;
    }
`;

// Ajouter les styles d'animation
const styleSheet = document.createElement('style');
styleSheet.textContent = animationStyles;
document.head.appendChild(styleSheet);

// Initialiser l'application
document.addEventListener('DOMContentLoaded', () => {
    window.autoMaxApp = new AutoMaxApp();
});

// Exposer des méthodes globales pour le debug
window.debugAutoMax = {
    getStatus: () => window.autoMaxApp?.getStatus(),
    reloadCars: () => window.autoMaxApp?.reloadCars(),
    navigateTo: (page) => window.autoMaxApp?.navigateToPage(page)
};
