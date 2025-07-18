// Enhanced KK Computers Website - Advanced JavaScript Animations & Interactions

// Chatbot Implementation
class Chatbot {
    constructor() {
        this.isOpen = false;
        this.isMobile = window.innerWidth <= 768;
        this.responses = {
            'hello': 'Hello! Welcome to KK Computers. How can I help you today?',
            'hi': 'Hi there! I\'m here to help you with any questions about our courses.',
            'courses': 'We offer Web Development, Digital Marketing, Data Analysis, Python, Java, MS Office, Tally ERP, DTP, and Adobe Photoshop courses.',
            'fees': 'Our course fees range from ₹5,000 to ₹18,000 depending on the program. We also offer flexible EMI options.',
            'duration': 'Course durations vary from 2 to 6 months. Most popular courses are 3-4 months long.',
            'placement': 'We have a 95% placement rate with partnerships with 50+ companies including TCS, Infosys, Wipro, and HCL.',
            'location': 'We have two campuses - one in Guntur and another in Darsi, Andhra Pradesh.',
            'contact': 'You can reach us at +91 9876543210 or email info@kkcomputers.com',
            'timing': 'We offer flexible timings - morning (9 AM - 12 PM), afternoon (1 PM - 4 PM), and evening (5 PM - 8 PM) batches.',
            'certification': 'Yes, we provide industry-recognized certifications along with government-approved certificates.',
            'admission': 'Admissions are open throughout the year. Basic computer knowledge and 10th grade completion required.',
            'default': 'I\'m here to help! You can ask me about our courses, fees, placement, timings, or contact information.'
        };
        this.init();
    }

    init() {
        this.createChatbot();
        this.setupEventListeners();
    }

    createChatbot() {
        const windowWidth = this.isMobile ? '280px' : '350px';
        const windowHeight = this.isMobile ? '350px' : '500px';
        
        const chatbotHTML = `
            <div class="chatbot-container">
                <button class="chatbot-toggle" id="chatbot-toggle">
                    <i class="fas fa-comments"></i>
                </button>
                <div class="chatbot-window" id="chatbot-window" style="width: ${windowWidth}; height: ${windowHeight};">
                    <div class="chatbot-header">
                        <h4>KK Computers Assistant</h4>
                        <small>Ask me anything about our courses!</small>
                    </div>
                    <div class="chatbot-messages" id="chatbot-messages">
                        <div class="chatbot-message bot">
                            Hello! I'm your KK Computers assistant. How can I help you today?
                        </div>
                    </div>
                    <div class="chatbot-input">
                        <input type="text" id="chatbot-input" placeholder="Type your message...">
                        <button id="chatbot-send"><i class="fas fa-paper-plane"></i></button>
                    </div>
                </div>
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', chatbotHTML);
    }

    setupEventListeners() {
        const toggle = document.getElementById('chatbot-toggle');
        const window = document.getElementById('chatbot-window');
        const input = document.getElementById('chatbot-input');
        const send = document.getElementById('chatbot-send');

        toggle.addEventListener('click', () => this.toggleChatbot());
        send.addEventListener('click', () => this.sendMessage());
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.sendMessage();
        });

        // Close chatbot when clicking outside (desktop only)
        if (!this.isMobile) {
            document.addEventListener('click', (e) => {
                if (!e.target.closest('.chatbot-container') && this.isOpen) {
                    this.toggleChatbot();
                }
            });
        }
        
        // Handle mobile keyboard
        if (this.isMobile) {
            input.addEventListener('focus', () => {
                setTimeout(() => {
                    window.scrollTop = window.scrollHeight;
                }, 300);
            });
        }
    }

    toggleChatbot() {
        const window = document.getElementById('chatbot-window');
        const toggle = document.getElementById('chatbot-toggle');
        
        this.isOpen = !this.isOpen;
        
        if (this.isOpen) {
            window.classList.add('active');
            toggle.innerHTML = '<i class="fas fa-times"></i>';
        } else {
            window.classList.remove('active');
            toggle.innerHTML = '<i class="fas fa-comments"></i>';
        }
    }

    sendMessage() {
        const input = document.getElementById('chatbot-input');
        const message = input.value.trim();
        
        if (!message) return;
        
        this.addMessage(message, 'user');
        input.value = '';
        
        // Simulate typing delay
        setTimeout(() => {
            const response = this.getResponse(message);
            this.addMessage(response, 'bot');
        }, 1000);
    }

    addMessage(message, sender) {
        const messagesContainer = document.getElementById('chatbot-messages');
        const messageDiv = document.createElement('div');
        messageDiv.className = `chatbot-message ${sender}`;
        messageDiv.textContent = message;
        messagesContainer.appendChild(messageDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    getResponse(message) {
        const lowerMessage = message.toLowerCase();
        
        for (const [key, response] of Object.entries(this.responses)) {
            if (lowerMessage.includes(key)) {
                return response;
            }
        }
        
        return this.responses.default;
    }
}

// Enhanced Gallery with Location Data
class EnhancedGallery {
    constructor() {
        this.isMobile = window.innerWidth <= 768;
        this.galleryData = {
            'guntur-1': {
                title: 'Guntur Campus - Main Building',
                description: 'Our flagship campus in Guntur with state-of-the-art facilities',
                students: '300+ Active Students',
                courses: 'All Courses Available',
                facilities: ['Computer Labs', 'Library', 'Cafeteria', 'Parking']
            },
            'guntur-2': {
                title: 'Guntur Campus - Computer Lab',
                description: 'Modern computer lab with latest hardware and software',
                students: '50 Workstations',
                courses: 'Programming & Development',
                facilities: ['High-Speed Internet', 'Latest Software', 'AC Environment']
            },
            'darsi-1': {
                title: 'Darsi Campus - Main Building',
                description: 'Our expanding campus in Darsi serving local community',
                students: '200+ Active Students',
                courses: 'Core IT Courses',
                facilities: ['Computer Labs', 'Training Rooms', 'Student Lounge']
            },
            'activities-1': {
                title: 'Student Training Session',
                description: 'Interactive learning sessions with hands-on practice',
                students: 'Batch of 25 Students',
                courses: 'Web Development',
                facilities: ['Project-Based Learning', 'Industry Mentors', 'Real Projects']
            }
        };
        this.init();
    }

    init() {
        this.setupGalleryItems();
        this.createEnhancedLightbox();
    }

    setupGalleryItems() {
        const galleryItems = document.querySelectorAll('.gallery-item');
        galleryItems.forEach((item, index) => {
            // Add data attributes
            const dataKey = `${item.dataset.location}-${index + 1}`;
            item.dataset.info = dataKey;
            
            // Add overlay only on desktop
            if (!this.isMobile) {
                const overlay = document.createElement('div');
                overlay.className = 'gallery-overlay';
                overlay.innerHTML = `
                    <h4>${this.galleryData[dataKey]?.title || 'KK Computers Facility'}</h4>
                    <p>${this.galleryData[dataKey]?.students || 'Student Activity'}</p>
                `;
                item.appendChild(overlay);
            }
            
            item.addEventListener('click', () => {
                this.openEnhancedLightbox(item);
            });
            
            // Add touch feedback for mobile
            if (this.isMobile) {
                item.addEventListener('touchstart', () => {
                    item.style.transform = 'scale(0.98)';
                });
                
                item.addEventListener('touchend', () => {
                    item.style.transform = '';
                });
            }
        });
    }

    createEnhancedLightbox() {
        const lightboxHTML = `
            <div class="lightbox" id="enhanced-lightbox">
                <button class="lightbox-close" id="lightbox-close">×</button>
                <div class="lightbox-content">
                    <img src="" alt="" id="lightbox-image">
                    <div class="lightbox-info" id="lightbox-info">
                        <h3 id="lightbox-title"></h3>
                        <p id="lightbox-description"></p>
                        <div class="lightbox-details">
                            <div><strong>Students:</strong> <span id="lightbox-students"></span></div>
                            <div><strong>Focus:</strong> <span id="lightbox-courses"></span></div>
                            <div><strong>Facilities:</strong> <span id="lightbox-facilities"></span></div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', lightboxHTML);
        
        document.getElementById('lightbox-close').addEventListener('click', () => {
            this.closeLightbox();
        });
        
        document.getElementById('enhanced-lightbox').addEventListener('click', (e) => {
            if (e.target.id === 'enhanced-lightbox') {
                this.closeLightbox();
            }
        });
    }

    openEnhancedLightbox(item) {
        const img = item.querySelector('img');
        const dataKey = item.dataset.info;
        const data = this.galleryData[dataKey] || {};
        
        document.getElementById('lightbox-image').src = img.src;
        document.getElementById('lightbox-title').textContent = data.title || 'KK Computers';
        document.getElementById('lightbox-description').textContent = data.description || 'Excellence in IT Education';
        document.getElementById('lightbox-students').textContent = data.students || 'Active Learning Community';
        document.getElementById('lightbox-courses').textContent = data.courses || 'Comprehensive IT Training';
        document.getElementById('lightbox-facilities').textContent = data.facilities?.join(', ') || 'Modern Facilities';
        
        document.getElementById('enhanced-lightbox').classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    closeLightbox() {
        document.getElementById('enhanced-lightbox').classList.remove('active');
        document.body.style.overflow = '';
    }
}

// Theme Management
class ThemeManager {
    constructor() {
        this.currentTheme = 'light'; // Always light theme
        this.init();
    }

    init() {
        this.createParticles();
    }

    createParticles() {
        const particlesContainer = document.createElement('div');
        particlesContainer.className = 'particles-bg';
        document.body.appendChild(particlesContainer);

        for (let i = 0; i < 30; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.top = Math.random() * 100 + '%';
            particle.style.animationDelay = Math.random() * 8 + 's';
            particle.style.animationDuration = (Math.random() * 4 + 4) + 's';
            particlesContainer.appendChild(particle);
        }
    }
}

// Advanced Animation Controller
class AnimationController {
    constructor() {
        this.observers = [];
        this.init();
    }

    init() {
        this.createScrollAnimations();
        this.createHoverAnimations();
        this.createProgressBar();
        this.createScrollToTop();
    }

    createScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-slideInUp');
                    this.animateCounters(entry.target);
                }
            });
        }, observerOptions);

        document.querySelectorAll('.card, .service-card, .team-card, .testimonial-card, .stat-number').forEach(el => {
            observer.observe(el);
        });

        this.observers.push(observer);
    }

    createHoverAnimations() {
        document.querySelectorAll('.card, .service-card, .team-card').forEach(card => {
            card.addEventListener('mouseenter', (e) => {
                e.target.style.transform = 'translateY(-10px) scale(1.02)';
                e.target.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.2)';
            });

            card.addEventListener('mouseleave', (e) => {
                e.target.style.transform = '';
                e.target.style.boxShadow = '';
            });
        });
    }

    animateCounters(element) {
        const counters = element.querySelectorAll('.stat-number');
        counters.forEach(counter => {
            const target = parseInt(counter.textContent.replace(/\D/g, ''));
            const duration = 2000;
            const step = target / (duration / 16);
            let current = 0;

            const timer = setInterval(() => {
                current += step;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }
                counter.textContent = Math.floor(current) + (counter.textContent.includes('%') ? '%' : '+');
            }, 16);
        });
    }

    createProgressBar() {
        const progressBar = document.createElement('div');
        progressBar.className = 'progress-bar';
        document.body.appendChild(progressBar);

        window.addEventListener('scroll', () => {
            const scrolled = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
            progressBar.style.width = scrolled + '%';
        });
    }

    createScrollToTop() {
        const scrollBtn = document.createElement('button');
        scrollBtn.className = 'scroll-to-top';
        scrollBtn.innerHTML = '↑';
        scrollBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
        document.body.appendChild(scrollBtn);

        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                scrollBtn.classList.add('visible');
            } else {
                scrollBtn.classList.remove('visible');
            }
        });
    }
}

// Enhanced Hero Slider
class HeroSlider {
    constructor() {
        this.currentSlide = 0;
        this.slides = document.querySelectorAll('.hero-slide');
        this.dots = [];
        this.autoPlayInterval = null;
        this.init();
    }

    init() {
        if (this.slides.length === 0) return;
        
        this.createDots();
        this.createNavigation();
        this.startAutoPlay();
        this.addKeyboardNavigation();
    }

    createDots() {
        const dotsContainer = document.createElement('div');
        dotsContainer.className = 'slider-dots';
        dotsContainer.style.cssText = `
            position: absolute;
            bottom: 30px;
            left: 50%;
            transform: translateX(-50%);
            display: flex;
            gap: 10px;
            z-index: 20;
        `;

        this.slides.forEach((_, index) => {
            const dot = document.createElement('button');
            dot.className = 'slider-dot';
            dot.style.cssText = `
                width: 12px;
                height: 12px;
                border-radius: 50%;
                border: none;
                background: rgba(255, 255, 255, 0.5);
                cursor: pointer;
                transition: all 0.3s ease;
            `;
            
            if (index === 0) {
                dot.style.background = 'white';
                dot.style.transform = 'scale(1.2)';
            }

            dot.addEventListener('click', () => this.goToSlide(index));
            this.dots.push(dot);
            dotsContainer.appendChild(dot);
        });

        document.querySelector('.hero-slider').appendChild(dotsContainer);
    }

    createNavigation() {
        const prevBtn = document.createElement('button');
        const nextBtn = document.createElement('button');
        
        prevBtn.innerHTML = '‹';
        nextBtn.innerHTML = '›';
        
        [prevBtn, nextBtn].forEach(btn => {
            btn.style.cssText = `
                position: absolute;
                top: 50%;
                transform: translateY(-50%);
                background: rgba(255, 255, 255, 0.2);
                border: none;
                color: white;
                font-size: 30px;
                padding: 15px 20px;
                cursor: pointer;
                transition: all 0.3s ease;
                z-index: 20;
                backdrop-filter: blur(10px);
                border-radius: 50%;
            `;
        });

        prevBtn.style.left = '20px';
        nextBtn.style.right = '20px';

        prevBtn.addEventListener('click', () => this.previousSlide());
        nextBtn.addEventListener('click', () => this.nextSlide());

        const slider = document.querySelector('.hero-slider');
        slider.appendChild(prevBtn);
        slider.appendChild(nextBtn);
    }

    goToSlide(index) {
        this.slides[this.currentSlide].classList.remove('active');
        this.dots[this.currentSlide].style.background = 'rgba(255, 255, 255, 0.5)';
        this.dots[this.currentSlide].style.transform = 'scale(1)';

        this.currentSlide = index;

        this.slides[this.currentSlide].classList.add('active');
        this.dots[this.currentSlide].style.background = 'white';
        this.dots[this.currentSlide].style.transform = 'scale(1.2)';
    }

    nextSlide() {
        const next = (this.currentSlide + 1) % this.slides.length;
        this.goToSlide(next);
    }

    previousSlide() {
        const prev = (this.currentSlide - 1 + this.slides.length) % this.slides.length;
        this.goToSlide(prev);
    }

    startAutoPlay() {
        this.autoPlayInterval = setInterval(() => {
            this.nextSlide();
        }, 5000);

        // Pause on hover
        const slider = document.querySelector('.hero-slider');
        slider.addEventListener('mouseenter', () => {
            clearInterval(this.autoPlayInterval);
        });

        slider.addEventListener('mouseleave', () => {
            this.startAutoPlay();
        });
    }

    addKeyboardNavigation() {
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') this.previousSlide();
            if (e.key === 'ArrowRight') this.nextSlide();
        });
    }
}

// Enhanced Gallery with Lightbox
class Gallery {
    constructor() {
        this.currentFilter = 'all';
        this.lightbox = null;
        this.init();
    }

    init() {
        this.createLightbox();
        this.setupFilters();
        this.setupGalleryItems();
    }

    createLightbox() {
        this.lightbox = document.createElement('div');
        this.lightbox.className = 'lightbox';
        this.lightbox.innerHTML = `
            <button class="lightbox-close">×</button>
            <img src="" alt="Gallery Image">
        `;
        document.body.appendChild(this.lightbox);

        this.lightbox.querySelector('.lightbox-close').addEventListener('click', () => {
            this.closeLightbox();
        });

        this.lightbox.addEventListener('click', (e) => {
            if (e.target === this.lightbox) {
                this.closeLightbox();
            }
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeLightbox();
            }
        });
    }

    setupFilters() {
        const filterBtns = document.querySelectorAll('.filter-btn');
        filterBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const filter = e.target.dataset.filter;
                this.filterGallery(filter);
                
                // Update active button
                filterBtns.forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
            });
        });
    }

    setupGalleryItems() {
        const galleryItems = document.querySelectorAll('.gallery-item');
        galleryItems.forEach(item => {
            item.addEventListener('click', () => {
                const img = item.querySelector('img');
                this.openLightbox(img.src, img.alt);
            });

            // Add hover effect
            item.addEventListener('mouseenter', () => {
                item.style.transform = 'scale(1.05) rotate(2deg)';
            });

            item.addEventListener('mouseleave', () => {
                item.style.transform = '';
            });
        });
    }

    filterGallery(filter) {
        const items = document.querySelectorAll('.gallery-item');
        items.forEach(item => {
            const location = item.dataset.location;
            if (filter === 'all' || location === filter) {
                item.style.display = 'block';
                item.style.animation = 'slideInUp 0.5s ease';
            } else {
                item.style.display = 'none';
            }
        });
    }

    openLightbox(src, alt) {
        const img = this.lightbox.querySelector('img');
        img.src = src;
        img.alt = alt;
        this.lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    closeLightbox() {
        this.lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// Enhanced Form Handler
class FormHandler {
    constructor() {
        this.init();
    }

    init() {
        this.setupContactForm();
        this.setupFloatingLabels();
    }

    setupContactForm() {
        const form = document.getElementById('contactForm');
        if (!form) return;

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleSubmit(form);
        });

        // Real-time validation
        const inputs = form.querySelectorAll('input, textarea, select');
        inputs.forEach(input => {
            input.addEventListener('blur', () => this.validateField(input));
            input.addEventListener('input', () => this.clearErrors(input));
        });
    }

    setupFloatingLabels() {
        const formGroups = document.querySelectorAll('.form-group');
        formGroups.forEach(group => {
            const input = group.querySelector('input, textarea, select');
            const label = group.querySelector('label');
            
            if (input && label) {
                input.addEventListener('focus', () => {
                    label.style.transform = 'translateY(-25px) scale(0.9)';
                    label.style.color = 'var(--text-accent)';
                });

                input.addEventListener('blur', () => {
                    if (!input.value) {
                        label.style.transform = '';
                        label.style.color = '';
                    }
                });
            }
        });
    }

    validateField(field) {
        const value = field.value.trim();
        let isValid = true;
        let message = '';

        switch (field.type) {
            case 'email':
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                isValid = emailRegex.test(value);
                message = 'Please enter a valid email address';
                break;
            case 'tel':
                const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
                isValid = !value || phoneRegex.test(value);
                message = 'Please enter a valid phone number';
                break;
            default:
                if (field.required) {
                    isValid = value.length > 0;
                    message = 'This field is required';
                }
        }

        this.showFieldValidation(field, isValid, message);
        return isValid;
    }

    showFieldValidation(field, isValid, message) {
        const group = field.closest('.form-group');
        let errorElement = group.querySelector('.error-message');

        if (!errorElement) {
            errorElement = document.createElement('div');
            errorElement.className = 'error-message';
            errorElement.style.cssText = `
                color: #ef4444;
                font-size: 0.8rem;
                margin-top: 0.5rem;
                opacity: 0;
                transition: opacity 0.3s ease;
            `;
            group.appendChild(errorElement);
        }

        if (!isValid) {
            errorElement.textContent = message;
            errorElement.style.opacity = '1';
            field.style.borderColor = '#ef4444';
        } else {
            errorElement.style.opacity = '0';
            field.style.borderColor = '#10b981';
        }
    }

    clearErrors(field) {
        const group = field.closest('.form-group');
        const errorElement = group.querySelector('.error-message');
        if (errorElement) {
            errorElement.style.opacity = '0';
        }
        field.style.borderColor = '';
    }

    async handleSubmit(form) {
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);

        // Validate all fields
        const inputs = form.querySelectorAll('input[required], textarea[required]');
        let isFormValid = true;

        inputs.forEach(input => {
            if (!this.validateField(input)) {
                isFormValid = false;
            }
        });

        if (!isFormValid) {
            this.showNotification('Please fix the errors above', 'error');
            return;
        }

        // Show loading state
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.innerHTML = '<div class="loading"></div> Sending...';
        submitBtn.disabled = true;

        // Simulate form submission
        setTimeout(() => {
            this.showNotification('Thank you! Your message has been sent successfully.', 'success');
            form.reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
            
            // Reset floating labels
            form.querySelectorAll('label').forEach(label => {
                label.style.transform = '';
                label.style.color = '';
            });
        }, 2000);
    }

    showNotification(message, type) {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 1rem 2rem;
            border-radius: 10px;
            color: white;
            font-weight: 600;
            z-index: 9999;
            transform: translateX(100%);
            transition: transform 0.3s ease;
            ${type === 'success' ? 'background: #10b981;' : 'background: #ef4444;'}
        `;
        notification.textContent = message;
        document.body.appendChild(notification);

        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);

        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 5000);
    }
}

// Typewriter Effect
class TypewriterEffect {
    constructor(element, text, speed = 100) {
        this.element = element;
        this.text = text;
        this.speed = speed;
        this.index = 0;
        this.init();
    }

    init() {
        this.element.textContent = '';
        this.type();
    }

    type() {
        if (this.index < this.text.length) {
            this.element.textContent += this.text.charAt(this.index);
            this.index++;
            setTimeout(() => this.type(), this.speed);
        }
    }
}

// Mobile Menu Handler
class MobileMenu {
    constructor() {
        this.isOpen = false;
        this.overlay = null;
        this.init();
    }

    init() {
        const menuBtn = document.getElementById('mobile-menu-button');
        const mobileMenu = document.getElementById('mobile-menu');
        
        if (!menuBtn || !mobileMenu) return;
        
        // Create overlay for mobile menu
        this.createOverlay();

        menuBtn.addEventListener('click', () => {
            this.toggle(mobileMenu);
        });

        // Close menu when clicking on overlay
        this.overlay.addEventListener('click', () => {
            this.close(mobileMenu);
        });

        // Close menu on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.close(mobileMenu);
            }
        });
        
        // Close menu when clicking on menu links
        const menuLinks = mobileMenu.querySelectorAll('a');
        menuLinks.forEach(link => {
            link.addEventListener('click', () => {
                this.close(mobileMenu);
            });
        });
    }
    
    createOverlay() {
        this.overlay = document.createElement('div');
        this.overlay.className = 'mobile-menu-overlay';
        this.overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.5);
            z-index: 40;
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
        `;
        document.body.appendChild(this.overlay);
    }

    toggle(menu) {
        if (this.isOpen) {
            this.close(menu);
        } else {
            this.open(menu);
        }
    }

    open(menu) {
        menu.classList.remove('hidden');
        this.overlay.style.opacity = '1';
        this.overlay.style.visibility = 'visible';
        menu.style.animation = 'slideInUp 0.3s ease';
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
        this.isOpen = true;
    }

    close(menu) {
        menu.style.animation = 'slideInUp 0.3s ease reverse';
        this.overlay.style.opacity = '0';
        this.overlay.style.visibility = 'hidden';
        document.body.style.overflow = ''; // Restore scrolling
        setTimeout(() => {
            menu.classList.add('hidden');
        }, 300);
        this.isOpen = false;
    }
}

// WhatsApp Integration
class WhatsAppIntegration {
    constructor() {
        this.init();
    }

    init() {
        const whatsappBtns = document.querySelectorAll('[onclick*="openWhatsApp"]');
        whatsappBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                this.openWhatsApp();
            });
        });
    }

    openWhatsApp() {
        const message = encodeURIComponent("Hi! I'm interested in joining KK Computers training programs. Please provide more information about courses and admissions.");
        const whatsappUrl = `https://wa.me/919876543210?text=${message}`;
        window.open(whatsappUrl, '_blank');
    }
}

// Testimonial Slider
class TestimonialSlider {
    constructor() {
        this.currentSlide = 0;
        this.slides = document.querySelectorAll('.testimonial-slide');
        this.init();
    }

    init() {
        if (this.slides.length === 0) return;
        
        this.createNavigation();
        this.startAutoPlay();
    }

    createNavigation() {
        const container = document.querySelector('.testimonial-slider');
        if (!container) return;

        const prevBtn = document.createElement('button');
        const nextBtn = document.createElement('button');
        
        prevBtn.innerHTML = '‹';
        nextBtn.innerHTML = '›';
        
        [prevBtn, nextBtn].forEach(btn => {
            btn.style.cssText = `
                position: absolute;
                top: 50%;
                transform: translateY(-50%);
                background: var(--gradient-primary);
                border: none;
                color: white;
                font-size: 20px;
                padding: 10px 15px;
                cursor: pointer;
                border-radius: 50%;
                transition: all 0.3s ease;
                z-index: 10;
            `;
        });

        prevBtn.style.left = '10px';
        nextBtn.style.right = '10px';

        prevBtn.addEventListener('click', () => this.previousSlide());
        nextBtn.addEventListener('click', () => this.nextSlide());

        container.appendChild(prevBtn);
        container.appendChild(nextBtn);
    }

    goToSlide(index) {
        this.slides[this.currentSlide].classList.remove('active');
        this.currentSlide = index;
        this.slides[this.currentSlide].classList.add('active');
    }

    nextSlide() {
        const next = (this.currentSlide + 1) % this.slides.length;
        this.goToSlide(next);
    }

    previousSlide() {
        const prev = (this.currentSlide - 1 + this.slides.length) % this.slides.length;
        this.goToSlide(prev);
    }

    startAutoPlay() {
        setInterval(() => {
            this.nextSlide();
        }, 4000);
    }
}

// Navigation Scroll Effect
class NavigationEffects {
    constructor() {
        this.init();
    }

    init() {
        const nav = document.querySelector('nav');
        if (!nav) return;

        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                nav.classList.add('scrolled');
            } else {
                nav.classList.remove('scrolled');
            }
        });

        // Smooth scroll for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Check if device is mobile
    const isMobile = window.innerWidth <= 768;
    
    // Reduce animations on mobile for better performance
    if (isMobile) {
        // Disable complex animations on mobile
        const complexAnimations = document.querySelectorAll('.floating, .animate-float, .animate-pulse');
        complexAnimations.forEach(element => {
            element.style.animation = 'none';
        });
        
        // Reduce particle count on mobile
        const particlesContainer = document.querySelector('.particles-bg');
        if (particlesContainer) {
            const particles = particlesContainer.querySelectorAll('.particle');
            particles.forEach((particle, index) => {
                if (index > 10) { // Keep only first 10 particles on mobile
                    particle.remove();
                }
            });
        }
    }
    
    // Initialize all components
    new Chatbot();
    new EnhancedGallery();
    new ThemeManager();
    new AnimationController();
    new HeroSlider();
    new FormHandler();
    new MobileMenu();
    new WhatsAppIntegration();
    new TestimonialSlider();
    new NavigationEffects();

    // Initialize typewriter effect if element exists
    const typewriterElement = document.querySelector('.typewriter');
    if (typewriterElement) {
        const text = typewriterElement.textContent;
        new TypewriterEffect(typewriterElement, text);
    }

    // Add loading animation to page
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);

    // Initialize AOS if available
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: isMobile ? 400 : 800,
            once: true,
            offset: 50,
            easing: 'ease-out-cubic',
            disable: isMobile ? 'mobile' : false
        });
    }
    
    // Handle orientation change
    window.addEventListener('orientationchange', () => {
        setTimeout(() => {
            // Refresh AOS on orientation change
            if (typeof AOS !== 'undefined') {
                AOS.refresh();
            }
            
            // Adjust chatbot position
            const chatbot = document.querySelector('.chatbot-window');
            if (chatbot && chatbot.classList.contains('active')) {
                chatbot.style.display = 'none';
                setTimeout(() => {
                    chatbot.style.display = 'flex';
                }, 100);
            }
        }, 100);
    });
    
    // Handle window resize
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            // Refresh AOS on resize
            if (typeof AOS !== 'undefined') {
                AOS.refresh();
            }
            
            // Update mobile detection
            const newIsMobile = window.innerWidth <= 768;
            if (newIsMobile !== isMobile) {
                location.reload(); // Reload page if mobile state changes
            }
        }, 250);
    });

    console.log('🚀 KK Computers Website Enhanced - All systems operational!');
});

// Error handling
window.addEventListener('error', (e) => {
    console.error('JavaScript Error:', e.error);
});

// Performance monitoring
window.addEventListener('load', () => {
    const loadTime = performance.now();
    console.log(`⚡ Page loaded in ${Math.round(loadTime)}ms`);
});