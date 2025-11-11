// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    const burgerMenu = document.querySelector('.burger-menu');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileMenuClose = document.querySelector('.mobile-menu-close');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav a');

    // Open mobile menu
    if (burgerMenu) {
        burgerMenu.addEventListener('click', function() {
            mobileMenu.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    }

    // Close mobile menu
    if (mobileMenuClose) {
        mobileMenuClose.addEventListener('click', function() {
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    }

    // Close menu when clicking on a link
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', function() {
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // Language buttons
    const langButtons = document.querySelectorAll('.lang-btn');
    langButtons.forEach(button => {
        button.addEventListener('click', function() {
            const parent = this.parentElement;
            parent.querySelectorAll('.lang-btn').forEach(btn => {
                btn.classList.remove('active');
            });
            this.classList.add('active');

            // Here you can add language switching logic
            const lang = this.getAttribute('data-lang');
            console.log('Language switched to:', lang);
        });
    });

    // Reviews Slider
    const reviewsSlider = document.querySelector('.reviews-slider');
    const prevBtn = document.querySelector('.slider-btn.prev');
    const nextBtn = document.querySelector('.slider-btn.next');

    if (reviewsSlider && prevBtn && nextBtn) {
        let currentIndex = 0;
        const reviews = reviewsSlider.querySelectorAll('.review-card');
        const totalReviews = reviews.length;

        function updateSlider() {
            if (window.innerWidth <= 768) {
                // Mobile view - show one card at a time
                reviews.forEach((review, index) => {
                    if (index === currentIndex) {
                        review.style.display = 'block';
                    } else {
                        review.style.display = 'none';
                    }
                });
            } else {
                // Desktop view - show all cards
                reviews.forEach(review => {
                    review.style.display = 'block';
                });
            }
        }

        prevBtn.addEventListener('click', function() {
            currentIndex = (currentIndex - 1 + totalReviews) % totalReviews;
            updateSlider();
        });

        nextBtn.addEventListener('click', function() {
            currentIndex = (currentIndex + 1) % totalReviews;
            updateSlider();
        });

        // Initial setup
        updateSlider();

        // Update on window resize
        window.addEventListener('resize', updateSlider);
    }

    // Contact Form
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Get form values
            const formData = new FormData(contactForm);
            const data = {};
            formData.forEach((value, key) => {
                data[key] = value;
            });

            // Here you can add your form submission logic
            console.log('Form submitted:', data);

            // Show success message
            alert('Дякуємо за вашу заявку! Ми зв\'яжемося з вами найближчим часом.');

            // Reset form
            contactForm.reset();
        });
    }

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href.length > 1) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    const headerOffset = 80;
                    const elementPosition = target.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Header scroll effect
    let lastScroll = 0;
    const header = document.querySelector('.header');

    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 100) {
            header.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
        } else {
            header.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.1)';
        }

        lastScroll = currentScroll;
    });

    // Animation on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll('.advantage-card, .service-card, .review-card, .why-item');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Add name attributes to form inputs for FormData to work
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contactForm');
    if (form) {
        const inputs = form.querySelectorAll('input, textarea');
        inputs.forEach((input, index) => {
            if (!input.name) {
                if (input.type === 'text') input.name = 'name';
                else if (input.type === 'tel') input.name = 'phone';
                else if (input.type === 'email') input.name = 'email';
                else if (input.tagName === 'TEXTAREA') input.name = 'comment';
            }
        });
    }
});
