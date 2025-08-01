// ===== GLOBAL VARIABLES =====
let isLoading = true;
let currentTheme = localStorage.getItem('theme') || 'light';
let isMenuOpen = false;

// ===== DOM ELEMENTS =====
const loadingScreen = document.getElementById('loading-screen');
const themeToggle = document.querySelector('.theme-toggle');
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const backToTopBtn = document.getElementById('backToTop');
const skillCategories = document.querySelectorAll('.skill-category');
const skillsGroups = document.querySelectorAll('.skills-group');
const contactForm = document.getElementById('contactForm');

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    // Set initial theme
    setTheme(currentTheme);
    
    // Initialize components
    initializeLoading();
    initializeNavigation();
    initializeThemeToggle();
    initializeMobileMenu();
    initializeScrollEffects();
    initializeSkillsSection();
    initializeAnimations();
    initializeContactForm();
    initializeParticles();
    
    console.log('Portfolio initialized successfully!');
}

// ===== LOADING SCREEN =====
function initializeLoading() {
    // Simulate loading time
    setTimeout(() => {
        hideLoadingScreen();
    }, 1500);
}

function hideLoadingScreen() {
    if (loadingScreen) {
        loadingScreen.classList.add('hidden');
        setTimeout(() => {
            loadingScreen.style.display = 'none';
            isLoading = false;
            // Trigger entrance animations
            triggerEntranceAnimations();
        }, 500);
    }
}

function triggerEntranceAnimations() {
    const heroElements = document.querySelectorAll('.hero-text > *');
    heroElements.forEach((element, index) => {
        setTimeout(() => {
            element.style.animation = `fadeInUp 0.8s ease-out forwards`;
        }, index * 200);
    });
}

// ===== THEME TOGGLE =====
function initializeThemeToggle() {
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
        updateThemeIcon();
    }
}

function toggleTheme() {
    currentTheme = currentTheme === 'light' ? 'dark' : 'light';
    setTheme(currentTheme);
    localStorage.setItem('theme', currentTheme);
}

function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    currentTheme = theme;
    updateThemeIcon();
}

function updateThemeIcon() {
    if (themeToggle) {
        const icon = themeToggle.querySelector('i');
        if (icon) {
            icon.className = currentTheme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
        }
    }
}

// ===== NAVIGATION =====
function initializeNavigation() {
    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', handleNavClick);
    });
    
    // Update active nav link on scroll
    window.addEventListener('scroll', updateActiveNavLink);
    
    // Header scroll effect
    window.addEventListener('scroll', handleHeaderScroll);
}

function handleNavClick(e) {
    e.preventDefault();
    const targetId = e.target.getAttribute('href');
    const targetSection = document.querySelector(targetId);
    
    if (targetSection) {
        const headerHeight = document.querySelector('.header').offsetHeight;
        const targetPosition = targetSection.offsetTop - headerHeight - 20;
        
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
        
        // Close mobile menu if open
        if (isMenuOpen) {
            closeMobileMenu();
        }
    }
}

function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPosition = window.scrollY + 100;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navLinks.forEach(link => link.classList.remove('active'));
            if (navLink) {
                navLink.classList.add('active');
            }
        }
    });
}

function handleHeaderScroll() {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = currentTheme === 'light' 
            ? 'rgba(255, 255, 255, 0.98)' 
            : 'rgba(15, 23, 42, 0.98)';
        header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.background = currentTheme === 'light' 
            ? 'rgba(255, 255, 255, 0.95)' 
            : 'rgba(15, 23, 42, 0.95)';
        header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.05)';
    }
}

// ===== MOBILE MENU =====
function initializeMobileMenu() {
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', toggleMobileMenu);
    }
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (isMenuOpen && !e.target.closest('.nav-container')) {
            closeMobileMenu();
        }
    });
    
    // Close menu on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && isMenuOpen) {
            closeMobileMenu();
        }
    });
}

function toggleMobileMenu() {
    if (isMenuOpen) {
        closeMobileMenu();
    } else {
        openMobileMenu();
    }
}

function openMobileMenu() {
    isMenuOpen = true;
    mobileMenuToggle.classList.add('active');
    navMenu.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeMobileMenu() {
    isMenuOpen = false;
    mobileMenuToggle.classList.remove('active');
    navMenu.classList.remove('active');
    document.body.style.overflow = '';
}

// ===== SCROLL EFFECTS =====
function initializeScrollEffects() {
    // Back to top button
    window.addEventListener('scroll', handleBackToTop);
    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', scrollToTop);
    }
    
    // Parallax effects
    window.addEventListener('scroll', handleParallax);
    
    // Progress bars animation
    window.addEventListener('scroll', animateProgressBars);
}

function handleBackToTop() {
    if (backToTopBtn) {
        if (window.scrollY > 500) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    }
}

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

function handleParallax() {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.hero-particles');
    
    parallaxElements.forEach(element => {
        const speed = 0.5;
        element.style.transform = `translateY(${scrolled * speed}px)`;
    });
}

function animateProgressBars() {
    const progressBars = document.querySelectorAll('.skill-progress');
    
    progressBars.forEach(bar => {
        const rect = bar.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
        
        if (isVisible && !bar.classList.contains('animated')) {
            const width = bar.getAttribute('data-width');
            bar.style.width = width + '%';
            bar.classList.add('animated');
        }
    });
}

// ===== SKILLS SECTION =====
function initializeSkillsSection() {
    skillCategories.forEach(category => {
        category.addEventListener('click', () => {
            const targetGroup = category.getAttribute('data-category');
            switchSkillsGroup(targetGroup);
        });
    });
}

function switchSkillsGroup(targetGroup) {
    // Update active category
    skillCategories.forEach(category => {
        category.classList.remove('active');
        if (category.getAttribute('data-category') === targetGroup) {
            category.classList.add('active');
        }
    });
    
    // Update active skills group
    skillsGroups.forEach(group => {
        group.classList.remove('active');
        if (group.getAttribute('data-group') === targetGroup) {
            group.classList.add('active');
            // Animate progress bars for the active group
            setTimeout(() => {
                const progressBars = group.querySelectorAll('.skill-progress');
                progressBars.forEach(bar => {
                    const width = bar.getAttribute('data-width');
                    bar.style.width = width + '%';
                });
            }, 300);
        }
    });
}

// ===== ANIMATIONS =====
function initializeAnimations() {
    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                
                // Special animations for specific elements
                if (entry.target.classList.contains('timeline-item')) {
                    animateTimelineItem(entry.target);
                }
                
                if (entry.target.classList.contains('project-card')) {
                    animateProjectCard(entry.target);
                }
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animatedElements = document.querySelectorAll(`
        .about-content > *,
        .skill-item,
        .project-card,
        .timeline-item,
        .education-item,
        .cert-item,
        .contact-item
    `);
    
    animatedElements.forEach(element => {
        element.classList.add('animate-on-scroll');
        observer.observe(element);
    });
}

function animateTimelineItem(item) {
    const marker = item.querySelector('.timeline-marker');
    const content = item.querySelector('.timeline-content');
    
    if (marker) {
        marker.style.animation = 'pulse 0.6s ease-out';
    }
    
    if (content) {
        content.style.animation = 'fadeInRight 0.8s ease-out 0.2s both';
    }
}

function animateProjectCard(card) {
    card.style.animation = 'fadeInUp 0.8s ease-out both';
}

// ===== CONTACT FORM =====
function initializeContactForm() {
    if (contactForm) {
        contactForm.addEventListener('submit', handleFormSubmit);
        
        // Add input animations
        const inputs = contactForm.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('focus', handleInputFocus);
            input.addEventListener('blur', handleInputBlur);
        });
    }
}

function handleFormSubmit(e) {
    e.preventDefault();
    
    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData);
    
    // Show loading state
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
    submitBtn.disabled = true;
    
    // Simulate form submission (replace with actual form handling)
    setTimeout(() => {
        showNotification('Mensagem enviada com sucesso!', 'success');
        contactForm.reset();
        
        // Reset button
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    }, 2000);
}

function handleInputFocus(e) {
    e.target.parentElement.classList.add('focused');
}

function handleInputBlur(e) {
    if (!e.target.value) {
        e.target.parentElement.classList.remove('focused');
    }
}

// ===== PARTICLES EFFECT =====
function initializeParticles() {
    createParticles();
}

function createParticles() {
    const particlesContainer = document.querySelector('.hero-particles');
    if (!particlesContainer) return;
    
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.cssText = `
            position: absolute;
            width: ${Math.random() * 4 + 1}px;
            height: ${Math.random() * 4 + 1}px;
            background: rgba(255, 255, 255, ${Math.random() * 0.5 + 0.2});
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: floatParticle ${Math.random() * 10 + 10}s linear infinite;
            animation-delay: ${Math.random() * 5}s;
        `;
        
        particlesContainer.appendChild(particle);
    }
}

// ===== UTILITY FUNCTIONS =====
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'}"></i>
        <span>${message}</span>
    `;
    
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : '#3b82f6'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 0.5rem;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        transform: translateX(100%);
        transition: transform 0.3s ease-out;
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after delay
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 4000);
}

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// ===== PERFORMANCE OPTIMIZATIONS =====
// Debounce scroll events
window.addEventListener('scroll', debounce(() => {
    updateActiveNavLink();
    handleBackToTop();
    animateProgressBars();
}, 10));

// Throttle resize events
window.addEventListener('resize', throttle(() => {
    // Handle responsive adjustments
    if (window.innerWidth > 768 && isMenuOpen) {
        closeMobileMenu();
    }
}, 250));

// ===== KEYBOARD NAVIGATION =====
document.addEventListener('keydown', (e) => {
    // Tab navigation enhancement
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-navigation');
    }
});

document.addEventListener('mousedown', () => {
    document.body.classList.remove('keyboard-navigation');
});

// ===== ADDITIONAL CSS FOR ANIMATIONS =====
const additionalStyles = `
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
    
    @keyframes fadeInRight {
        from {
            opacity: 0;
            transform: translateX(30px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
    
    @keyframes pulse {
        0% {
            transform: scale(1);
        }
        50% {
            transform: scale(1.1);
        }
        100% {
            transform: scale(1);
        }
    }
    
    @keyframes floatParticle {
        0% {
            transform: translateY(0px) rotate(0deg);
            opacity: 1;
        }
        100% {
            transform: translateY(-100vh) rotate(360deg);
            opacity: 0;
        }
    }
    
    .keyboard-navigation *:focus {
        outline: 2px solid var(--primary-color) !important;
        outline-offset: 2px;
    }
    
    .form-group.focused label {
        color: var(--primary-color);
        transform: translateY(-2px);
    }
`;

// Inject additional styles
const styleSheet = document.createElement('style');
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet);

// ===== ERROR HANDLING =====
window.addEventListener('error', (e) => {
    console.error('Portfolio Error:', e.error);
    // You could send this to an error tracking service
});

// ===== CONSOLE WELCOME MESSAGE =====
console.log(`
🚀 Portfólio de Tiago Bettega
📧 tiagobettega.dev@gmail.com
🌐 Desenvolvedor Full Stack

Obrigado por visitar meu portfólio!
Se você está vendo isso, provavelmente é um desenvolvedor também. 
Que tal conversarmos sobre tecnologia? 😊
`);

// ===== EXPORT FOR TESTING =====
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initializeApp,
        toggleTheme,
        showNotification,
        debounce,
        throttle
    };
}