// Cart Functionality
document.addEventListener('DOMContentLoaded', () => {
    const cart = {
        items: [],
        total: 0
    };

    // Select all "Buy Now" buttons
    const buyButtons = document.querySelectorAll('.service-card button');
    const cartLink = document.getElementById('cart-link');
    const cartModal = document.getElementById('cart-modal');
    const closeBtn = document.querySelector('.close-btn');
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotalPrice = document.getElementById('cart-total-price');
    const checkoutBtn = document.getElementById('checkout-btn');

    // Add to cart functionality
    buyButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const serviceCard = e.target.closest('.service-card');
            const serviceName = serviceCard.querySelector('h3').textContent;
            const servicePrice = parseFloat(serviceCard.querySelector('.price').textContent.replace('$', ''));

            // Add to cart
            cart.items.push({ name: serviceName, price: servicePrice });
            cart.total += servicePrice;

            // Update cart count
            updateCartCount();
            
            // Optional: Show a quick notification
            alert(`Added ${serviceName} to cart`);
        });
    });

    // Update cart count in header
    function updateCartCount() {
        const cartCount = document.getElementById('cart-count');
        cartCount.textContent = cart.items.length;
    }

    // Open cart modal
    cartLink.addEventListener('click', (e) => {
        e.preventDefault();
        renderCartItems();
        cartModal.style.display = 'block';
    });

    // Close cart modal
    closeBtn.addEventListener('click', () => {
        cartModal.style.display = 'none';
    });

    // Render cart items
    function renderCartItems() {
        cartItemsContainer.innerHTML = '';
        cart.items.forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.classList.add('cart-item');
            itemElement.innerHTML = `
                <span>${item.name}</span>
                <span>$${item.price.toFixed(2)}</span>
            `;
            cartItemsContainer.appendChild(itemElement);
        });
        cartTotalPrice.textContent = cart.total.toFixed(2);
    }

    // Checkout functionality
    checkoutBtn.addEventListener('click', () => {
        if (cart.items.length === 0) {
            alert('Your cart is empty');
            return;
        }
        alert('Thank you for your purchase! Total: $' + cart.total.toFixed(2));
        // Reset cart
        cart.items = [];
        cart.total = 0;
        updateCartCount();
        cartModal.style.display = 'none';
    });

    // Contact Form Submission
    const contactForm = document.getElementById('contact-form');
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;

        // Simple form validation
        if (!name || !email || !message) {
            alert('Please fill in all fields');
            return;
        }

        // Simulate form submission
        alert(`Thank you for your message, ${name}! We'll get back to you soon.`);
        
        // Reset form
        contactForm.reset();
    });

    // Close modal when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target === cartModal) {
            cartModal.style.display = 'none';
        }
    });
});
