// FreshVeg - Script principal pour la plateforme de légumes

// Données des produits légumes
const vegetablesData = [
    // Légumes Feuilles
    {
        id: 1,
        name: "Épinards Frais",
        description: "Épinards biologiques cueillis le matin même",
        price: 1500,
        category: "legumes-feuilles",
        image: "fas fa-leaf",
        badge: "Bio",
        unit: "kg"
    },
    {
        id: 2,
        name: "Laitue Romaine",
        description: "Laitue croquante et fraîche pour vos salades",
        price: 1200,
        category: "legumes-feuilles",
        image: "fas fa-leaf",
        badge: "Frais",
        unit: "pièce"
    },
    {
        id: 3,
        name: "Chou Vert",
        description: "Chou vert ferme et nutritif",
        price: 2000,
        category: "legumes-feuilles",
        image: "fas fa-circle",
        badge: "Local",
        unit: "pièce"
    },
    {
        id: 4,
        name: "Persil",
        description: "Persil frais pour aromatiser vos plats",
        price: 500,
        category: "aromates",
        image: "fas fa-leaf",
        badge: "Bio",
        unit: "bouquet"
    },
    
    // Légumes Racines
    {
        id: 5,
        name: "Carottes",
        description: "Carottes sucrées et croquantes",
        price: 1800,
        category: "legumes-racines",
        image: "fas fa-carrot",
        badge: "Bio",
        unit: "kg"
    },
    {
        id: 6,
        name: "Pommes de Terre",
        description: "Pommes de terre fermes et savoureuses",
        price: 1600,
        category: "legumes-racines",
        image: "fas fa-circle",
        badge: "Local",
        unit: "kg"
    },
    {
        id: 7,
        name: "Oignons",
        description: "Oignons doux et parfumés",
        price: 1400,
        category: "legumes-racines",
        image: "fas fa-circle",
        badge: "Frais",
        unit: "kg"
    },
    {
        id: 8,
        name: "Ail",
        description: "Ail frais et parfumé",
        price: 3000,
        category: "aromates",
        image: "fas fa-circle",
        badge: "Bio",
        unit: "kg"
    },
    
    // Légumes Fruits
    {
        id: 9,
        name: "Tomates",
        description: "Tomates juteuses et savoureuses",
        price: 2500,
        category: "legumes-fruits",
        image: "fas fa-circle",
        badge: "Bio",
        unit: "kg"
    },
    {
        id: 10,
        name: "Concombres",
        description: "Concombres frais et croquants",
        price: 2000,
        category: "legumes-fruits",
        image: "fas fa-circle",
        badge: "Frais",
        unit: "kg"
    },
    {
        id: 11,
        name: "Poivrons",
        description: "Poivrons colorés et vitaminés",
        price: 3000,
        category: "legumes-fruits",
        image: "fas fa-pepper-hot",
        badge: "Bio",
        unit: "kg"
    },
    {
        id: 12,
        name: "Aubergines",
        description: "Aubergines fermes et savoureuses",
        price: 2800,
        category: "legumes-fruits",
        image: "fas fa-circle",
        badge: "Local",
        unit: "kg"
    },
    
    // Aromates supplémentaires
    {
        id: 13,
        name: "Basilic",
        description: "Basilic frais pour vos plats méditerranéens",
        price: 800,
        category: "aromates",
        image: "fas fa-leaf",
        badge: "Bio",
        unit: "bouquet"
    },
    {
        id: 14,
        name: "Coriandre",
        description: "Coriandre fraîche pour vos plats africains",
        price: 600,
        category: "aromates",
        image: "fas fa-leaf",
        badge: "Frais",
        unit: "bouquet"
    },
    {
        id: 15,
        name: "Menthe",
        description: "Menthe fraîche pour vos infusions",
        price: 700,
        category: "aromates",
        image: "fas fa-leaf",
        badge: "Bio",
        unit: "bouquet"
    },
    {
        id: 16,
        name: "Gingembre",
        description: "Gingembre frais et piquant",
        price: 4000,
        category: "aromates",
        image: "fas fa-circle",
        badge: "Bio",
        unit: "kg"
    },

    // Légumes Feuilles supplémentaires
    {
        id: 17,
        name: "Blettes",
        description: "Blettes fraîches et tendres",
        price: 1800,
        category: "legumes-feuilles",
        image: "fas fa-leaf",
        badge: "Bio",
        unit: "kg"
    },
    {
        id: 18,
        name: "Céleri Branche",
        description: "Céleri branche croquant et parfumé",
        price: 2200,
        category: "legumes-feuilles",
        image: "fas fa-leaf",
        badge: "Frais",
        unit: "pièce"
    },
    {
        id: 19,
        name: "Endives",
        description: "Endives blanches et croquantes",
        price: 2500,
        category: "legumes-feuilles",
        image: "fas fa-leaf",
        badge: "Bio",
        unit: "kg"
    },
    {
        id: 20,
        name: "Mâche",
        description: "Mâche tendre et délicate",
        price: 3000,
        category: "legumes-feuilles",
        image: "fas fa-leaf",
        badge: "Bio",
        unit: "kg"
    },

    // Légumes Racines supplémentaires
    {
        id: 21,
        name: "Betteraves",
        description: "Betteraves rouges sucrées",
        price: 2000,
        category: "legumes-racines",
        image: "fas fa-circle",
        badge: "Bio",
        unit: "kg"
    },
    {
        id: 22,
        name: "Radis",
        description: "Radis roses et croquants",
        price: 1800,
        category: "legumes-racines",
        image: "fas fa-circle",
        badge: "Frais",
        unit: "kg"
    },
    {
        id: 23,
        name: "Navets",
        description: "Navets blancs et tendres",
        price: 1600,
        category: "legumes-racines",
        image: "fas fa-circle",
        badge: "Local",
        unit: "kg"
    },
    {
        id: 24,
        name: "Panais",
        description: "Panais doux et parfumés",
        price: 2800,
        category: "legumes-racines",
        image: "fas fa-circle",
        badge: "Bio",
        unit: "kg"
    },

    // Légumes Fruits supplémentaires
    {
        id: 25,
        name: "Courgettes",
        description: "Courgettes vertes et tendres",
        price: 2200,
        category: "legumes-fruits",
        image: "fas fa-circle",
        badge: "Bio",
        unit: "kg"
    },
    {
        id: 26,
        name: "Pommes de Terre Nouvelles",
        description: "Pommes de terre nouvelles et savoureuses",
        price: 2400,
        category: "legumes-fruits",
        image: "fas fa-circle",
        badge: "Nouveau",
        unit: "kg"
    },
    {
        id: 27,
        name: "Haricots Verts",
        description: "Haricots verts fins et croquants",
        price: 3000,
        category: "legumes-fruits",
        image: "fas fa-circle",
        badge: "Bio",
        unit: "kg"
    },
    {
        id: 28,
        name: "Petits Pois",
        description: "Petits pois frais et sucrés",
        price: 3500,
        category: "legumes-fruits",
        image: "fas fa-circle",
        badge: "Bio",
        unit: "kg"
    },
    {
        id: 29,
        name: "Maïs",
        description: "Maïs doux et juteux",
        price: 1800,
        category: "legumes-fruits",
        image: "fas fa-circle",
        badge: "Frais",
        unit: "pièce"
    },

    // Aromates supplémentaires
    {
        id: 30,
        name: "Thym",
        description: "Thym frais pour vos plats",
        price: 800,
        category: "aromates",
        image: "fas fa-leaf",
        badge: "Bio",
        unit: "bouquet"
    },
    {
        id: 31,
        name: "Romarin",
        description: "Romarin parfumé et frais",
        price: 900,
        category: "aromates",
        image: "fas fa-leaf",
        badge: "Bio",
        unit: "bouquet"
    },
    {
        id: 32,
        name: "Estragon",
        description: "Estragon frais et délicat",
        price: 700,
        category: "aromates",
        image: "fas fa-leaf",
        badge: "Frais",
        unit: "bouquet"
    },
    {
        id: 33,
        name: "Ciboulette",
        description: "Ciboulette fraîche et parfumée",
        price: 600,
        category: "aromates",
        image: "fas fa-leaf",
        badge: "Bio",
        unit: "bouquet"
    },
    {
        id: 34,
        name: "Oignons Nouveaux",
        description: "Oignons nouveaux et tendres",
        price: 2000,
        category: "aromates",
        image: "fas fa-circle",
        badge: "Nouveau",
        unit: "kg"
    },

    // Légumes spéciaux
    {
        id: 35,
        name: "Artichauts",
        description: "Artichauts frais et tendres",
        price: 4000,
        category: "legumes-speciaux",
        image: "fas fa-circle",
        badge: "Premium",
        unit: "pièce"
    },
    {
        id: 36,
        name: "Asperges",
        description: "Asperges vertes et croquantes",
        price: 5000,
        category: "legumes-speciaux",
        image: "fas fa-circle",
        badge: "Premium",
        unit: "kg"
    },
    {
        id: 37,
        name: "Champignons",
        description: "Champignons de Paris frais",
        price: 3200,
        category: "legumes-speciaux",
        image: "fas fa-circle",
        badge: "Bio",
        unit: "kg"
    },
    {
        id: 38,
        name: "Brocolis",
        description: "Brocolis verts et vitaminés",
        price: 2800,
        category: "legumes-speciaux",
        image: "fas fa-circle",
        badge: "Bio",
        unit: "pièce"
    }
];

// Variables globales
let currentFilter = 'all';
let cart = JSON.parse(localStorage.getItem('freshveg-cart')) || [];

// Initialisation de l'application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    loadProducts();
    setupEventListeners();
    updateCartDisplay();
    setupSmoothScrolling();
    setupAnimations();
}

// Chargement des produits
function loadProducts() {
    const productsGrid = document.getElementById('products-grid');
    if (!productsGrid) return;

    const filteredProducts = currentFilter === 'all' 
        ? vegetablesData 
        : vegetablesData.filter(product => product.category === currentFilter);

    productsGrid.innerHTML = '';

    filteredProducts.forEach(product => {
        const productCard = createProductCard(product);
        productsGrid.appendChild(productCard);
    });
}

// Création d'une carte produit
function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.innerHTML = `
        <div class="product-image">
            <i class="${product.image}"></i>
            ${product.badge ? `<div class="product-badge ${product.badge.toLowerCase()}">${product.badge}</div>` : ''}
        </div>
        <div class="product-info">
            <h3 class="product-name">${product.name}</h3>
            <p class="product-description">${product.description}</p>
            <div class="product-price">${product.price.toLocaleString()} FCFA / ${product.unit}</div>
            <div class="product-actions">
                <button class="add-to-cart-btn" onclick="addToCart(${product.id})">
                    <i class="fas fa-plus"></i>
                    Ajouter
                </button>
                <div class="quantity-controls">
                    <button class="quantity-btn" onclick="decreaseQuantity(${product.id})">-</button>
                    <input type="number" class="quantity-input" id="qty-${product.id}" value="1" min="1" max="10">
                    <button class="quantity-btn" onclick="increaseQuantity(${product.id})">+</button>
                </div>
            </div>
        </div>
    `;
    return card;
}

// Configuration des écouteurs d'événements
function setupEventListeners() {
    // Filtres de catégorie
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            currentFilter = this.dataset.category;
            loadProducts();
        });
    });

    // Formulaire de contact
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactForm);
    }

    // Newsletter
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', handleNewsletter);
    }

    // Menu mobile
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', toggleMobileMenu);
    }
}

// Gestion du panier
function addToCart(productId) {
    const product = vegetablesData.find(p => p.id === productId);
    const quantity = parseInt(document.getElementById(`qty-${productId}`).value) || 1;
    
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({
            ...product,
            quantity: quantity
        });
    }
    
    saveCart();
    updateCartDisplay();
    showNotification(`${product.name} ajouté au panier !`, 'success');
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    saveCart();
    updateCartDisplay();
    showNotification('Article retiré du panier', 'info');
}

function updateQuantity(productId, newQuantity) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity = Math.max(1, newQuantity);
        saveCart();
        updateCartDisplay();
    }
}

function increaseQuantity(productId) {
    const input = document.getElementById(`qty-${productId}`);
    const currentValue = parseInt(input.value) || 1;
    if (currentValue < 10) {
        input.value = currentValue + 1;
    }
}

function decreaseQuantity(productId) {
    const input = document.getElementById(`qty-${productId}`);
    const currentValue = parseInt(input.value) || 1;
    if (currentValue > 1) {
        input.value = currentValue - 1;
    }
}

function saveCart() {
    localStorage.setItem('freshveg-cart', JSON.stringify(cart));
}

function updateCartDisplay() {
    const cartCount = document.getElementById('cart-count');
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    
    if (cartCount) {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCount.textContent = totalItems;
        cartCount.style.display = totalItems > 0 ? 'flex' : 'none';
    }
    
    if (cartItems) {
        cartItems.innerHTML = '';
        cart.forEach(item => {
            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item';
            cartItem.innerHTML = `
                <div class="cart-item-image">
                    <i class="${item.image}"></i>
                </div>
                <div class="cart-item-info">
                    <div class="cart-item-name">${item.name}</div>
                    <div class="cart-item-price">${item.price.toLocaleString()} FCFA</div>
                </div>
                <div class="cart-item-controls">
                    <button class="quantity-btn" onclick="updateQuantity(${item.id}, ${item.quantity - 1})">-</button>
                    <span>${item.quantity}</span>
                    <button class="quantity-btn" onclick="updateQuantity(${item.id}, ${item.quantity + 1})">+</button>
                    <button class="remove-item-btn" onclick="removeFromCart(${item.id})">×</button>
                </div>
            `;
            cartItems.appendChild(cartItem);
        });
    }
    
    if (cartTotal) {
        const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        cartTotal.textContent = `${total.toLocaleString()} FCFA`;
    }
}

// Fonction pour basculer le panier
function toggleCart() {
    const cartSidebar = document.getElementById('cart-sidebar');
    const cartOverlay = document.getElementById('cart-overlay');
    
    cartSidebar.classList.toggle('active');
    cartOverlay.classList.toggle('active');
}

// Fonction pour procéder au checkout
function proceedToCheckout() {
    if (cart.length === 0) {
        showNotification('Votre panier est vide', 'warning');
        return;
    }
    
    // Générer le message WhatsApp
    const message = generateWhatsAppMessage();
    const whatsappUrl = `https://wa.me/221776404406?text=${encodeURIComponent(message)}`;
    
    window.open(whatsappUrl, '_blank');
}

// Génération du message WhatsApp
function generateWhatsAppMessage() {
    let message = `🍅 *Commande FreshVeg* 🥕\n\n`;
    message += `Bonjour ! Je souhaite passer une commande de légumes frais :\n\n`;
    
    cart.forEach(item => {
        message += `• ${item.name} (${item.badge || 'Standard'})\n`;
        message += `  Quantité: ${item.quantity} ${item.unit}\n`;
        message += `  Prix: ${item.price.toLocaleString()} FCFA\n\n`;
    });
    
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    message += `💰 *Total: ${total.toLocaleString()} FCFA*\n\n`;
    message += `📱 Merci de confirmer ma commande et de me donner les détails de livraison.`;
    
    return message;
}

// Gestion du formulaire de contact
function handleContactForm(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const data = {
        name: formData.get('name'),
        email: formData.get('email'),
        message: formData.get('message')
    };
    
    // Simuler l'envoi du formulaire
    showNotification('Message envoyé avec succès !', 'success');
    e.target.reset();
}

// Gestion de la newsletter
function handleNewsletter(e) {
    e.preventDefault();
    
    const email = e.target.querySelector('input[type="email"]').value;
    if (email) {
        showNotification('Merci pour votre inscription à la newsletter !', 'success');
        e.target.querySelector('input[type="email"]').value = '';
    }
}

// Fonction pour basculer le menu mobile
function toggleMobileMenu() {
    const navLinks = document.querySelector('.nav-links');
    navLinks.classList.toggle('active');
}

// Configuration du défilement fluide
function setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Configuration des animations
function setupAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observer les cartes de produits et autres éléments
    document.querySelectorAll('.product-card, .feature-card, .contact-item').forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });
}

// Fonction pour afficher les notifications
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
            <span>${message}</span>
        </div>
    `;
    
    // Styles pour la notification
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 0.5rem;
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
        z-index: 10000;
        transform: translateX(400px);
        transition: transform 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    // Animation d'entrée
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Suppression automatique
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Fonction pour le suivi des clics (analytics)
function trackClick(element, action) {
    console.log(`📊 Click tracked: ${element} - ${action}`);
    // Vous pouvez implémenter Google Analytics ou autre système de tracking ici
}

// Export des fonctions pour utilisation globale
window.addToCart = addToCart;
window.removeFromCart = removeFromCart;
window.updateQuantity = updateQuantity;
window.increaseQuantity = increaseQuantity;
window.decreaseQuantity = decreaseQuantity;
window.toggleCart = toggleCart;
window.proceedToCheckout = proceedToCheckout;
window.toggleMobileMenu = toggleMobileMenu;
