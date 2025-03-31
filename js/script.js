// Smooth scrolling for navigation links
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);

        if (targetSection) {
            targetSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Mobile menu toggle
function setupMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const menuOverlay = document.querySelector('.menu-overlay');
    const navItems = document.querySelectorAll('.nav-links a');

    // Toggle menu on button click
    menuToggle.addEventListener('click', () => {
        toggleMenu();
    });

    // Toggle menu when overlay is clicked
    menuOverlay.addEventListener('click', () => {
        toggleMenu();
    });

    // Close menu when a nav item is clicked
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            toggleMenu(false);
        });
    });

    // Close menu when escape key is pressed
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            toggleMenu(false);
        }
    });

    function toggleMenu(forceState) {
        const newState = forceState !== undefined ? forceState : !menuToggle.classList.contains('active');

        if (newState) {
            menuToggle.classList.add('active');
            navLinks.classList.add('active');
            menuOverlay.classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevent scrolling
        } else {
            menuToggle.classList.remove('active');
            navLinks.classList.remove('active');
            menuOverlay.classList.remove('active');
            document.body.style.overflow = ''; // Allow scrolling
        }
    }
}

// Dark mode toggle
function setupDarkMode() {
    // Create dark mode toggle button
    const nav = document.querySelector('nav');
    const themeToggle = document.createElement('button');
    themeToggle.classList.add('theme-toggle');
    themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    themeToggle.setAttribute('aria-label', 'Toggle dark mode');
    themeToggle.setAttribute('title', 'Toggle dark mode');
    nav.appendChild(themeToggle);

    // Check for saved theme preference or prefer-color-scheme
    const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const savedTheme = localStorage.getItem('theme');

    if (savedTheme === 'dark' || (!savedTheme && prefersDarkMode)) {
        document.body.classList.add('dark-mode');
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }

    // Toggle dark mode
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');

        if (document.body.classList.contains('dark-mode')) {
            localStorage.setItem('theme', 'dark');
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
            // Add transition effect
            addFireworks();
        } else {
            localStorage.setItem('theme', 'light');
            themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
            // Add transition effect
            addSparkle(themeToggle, 10);
        }
    });
}

// Form submission handling
function setupContactForm() {
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) return;

    // Preencher informações do navegador para análise
    if (document.getElementById('user_agent')) {
        document.getElementById('user_agent').value = navigator.userAgent;
    }

    contactForm.addEventListener('submit', async function (e) {
        e.preventDefault();

        // Get form status element
        const formStatus = document.getElementById('formStatus');
        formStatus.className = 'form-status loading';
        formStatus.innerHTML = '<div class="loading-spinner"></div> Enviando...';
        formStatus.style.display = 'block';

        // Get form data
        const formData = new FormData(this);
        const formValues = {
            name: formData.get('name'),
            email: formData.get('email'),
            subject: formData.get('subject'),
            message: formData.get('message'),
            created_at: new Date().toISOString(),
            source: formData.get('source') || 'portfolio_website',
            user_agent: formData.get('user_agent') || navigator.userAgent,
            read: false
        };

        // Validação básica
        if (!formValues.name || !formValues.email || !formValues.subject || !formValues.message) {
            formStatus.className = 'form-status error';
            formStatus.textContent = 'Por favor, preencha todos os campos obrigatórios.';
            return;
        }

        try {
            if (typeof supabaseClient === 'undefined') {
                throw new Error('Supabase client não foi carregado');
            }

            // Enviar para o Supabase
            const { data, error } = await supabaseClient
                .from('contacts')
                .insert([formValues]);

            if (error) throw error;

            // Add confetti celebration
            addConfetti();

            // Reset form
            contactForm.reset();

            // Escolha uma das opções:

            // Opção 1: Mostrar mensagem de sucesso no mesmo formulário
            formStatus.className = 'form-status success';
            formStatus.textContent = 'Mensagem enviada com sucesso! Entraremos em contato em breve.';

            // Opção 2: Redirecionar para página de agradecimento após pequeno delay
            // setTimeout(() => {
            //     window.location.href = 'obrigado.html';
            // }, 1000);
        } catch (error) {
            console.error('Erro ao enviar mensagem:', error);

            formStatus.className = 'form-status error';
            formStatus.textContent = 'Ocorreu um erro ao enviar a mensagem. Por favor, tente novamente mais tarde.';
        }
    });
}

// Add active class to navigation links based on scroll position
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('nav a');

window.addEventListener('scroll', () => {
    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 60) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// Add scroll-to-top button
const scrollButton = document.createElement('button');
scrollButton.innerHTML = '<i class="fas fa-arrow-up"></i>';
scrollButton.className = 'scroll-top';
document.body.appendChild(scrollButton);

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollButton.style.display = 'flex';
    } else {
        scrollButton.style.display = 'none';
    }
});

scrollButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
    addSparkle(scrollButton, 5);
});

// Sparkle effect on mouse click
function addSparkleOnClick() {
    document.addEventListener('click', (e) => {
        addSparkle({ x: e.clientX, y: e.clientY }, 5);
    });
}

function addSparkle(element, count = 3) {
    const positions = [];

    if (element.x !== undefined && element.y !== undefined) {
        // If element has x,y coordinates
        positions.push({ x: element.x, y: element.y });
    } else {
        // If element is a DOM element
        const rect = element.getBoundingClientRect();
        positions.push({
            x: rect.left + rect.width / 2,
            y: rect.top + rect.height / 2
        });
    }

    positions.forEach(pos => {
        for (let i = 0; i < count; i++) {
            const sparkle = document.createElement('div');
            sparkle.className = 'sparkle';

            // Randomize position slightly
            const offsetX = (Math.random() - 0.5) * 40;
            const offsetY = (Math.random() - 0.5) * 40;

            sparkle.style.left = `${pos.x + offsetX}px`;
            sparkle.style.top = `${pos.y + offsetY}px`;

            // Randomize color
            const colors = ['#64ffda', '#ff7597', '#ffeb3b', '#3498db'];
            sparkle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];

            document.body.appendChild(sparkle);

            // Remove sparkle after animation completes
            setTimeout(() => {
                sparkle.remove();
            }, 800);
        }
    });
}

// Emoji reactions
function setupEmojiReactions() {
    const emojiContainer = document.createElement('div');
    emojiContainer.className = 'emoji-reactions';

    const emojis = ['👍', '❤️', '🚀', '👏', '😮'];

    emojis.forEach(emoji => {
        const button = document.createElement('button');
        button.className = 'emoji-btn';
        button.textContent = emoji;
        button.setAttribute('aria-label', `React with ${emoji}`);

        button.addEventListener('click', () => {
            createFloatingEmoji(emoji, button);
        });

        emojiContainer.appendChild(button);
    });

    document.body.appendChild(emojiContainer);
}

function createFloatingEmoji(emoji, sourceElement) {
    const floatingEmoji = document.createElement('div');
    floatingEmoji.className = 'floating-emoji';
    floatingEmoji.textContent = emoji;

    const rect = sourceElement.getBoundingClientRect();
    floatingEmoji.style.left = `${rect.left + rect.width / 2}px`;
    floatingEmoji.style.bottom = `${window.innerHeight - rect.top}px`;

    document.body.appendChild(floatingEmoji);

    // Add some randomness to the animation
    const randomX = (Math.random() - 0.5) * 100;
    floatingEmoji.style.transform = `translateX(${randomX}px)`;

    // Remove after animation completes
    setTimeout(() => {
        floatingEmoji.remove();
    }, 3000);
}

// Add confetti effect
function addConfetti() {
    for (let i = 0; i < 100; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'sparkle';

        // Randomize position
        const x = Math.random() * window.innerWidth;
        const y = Math.random() * window.innerHeight * 0.5;

        confetti.style.left = `${x}px`;
        confetti.style.top = `${y}px`;

        // Randomize color and size
        const colors = ['#ff7597', '#64ffda', '#3498db', '#e74c3c', '#f1c40f', '#9b59b6'];
        const size = 5 + Math.random() * 10;

        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.width = `${size}px`;
        confetti.style.height = `${size}px`;

        // Different shapes
        if (Math.random() > 0.5) {
            confetti.style.borderRadius = '50%';
        } else {
            confetti.style.borderRadius = '0';
        }

        document.body.appendChild(confetti);

        // Remove confetti after animation completes
        setTimeout(() => {
            confetti.remove();
        }, 800 + Math.random() * 1000);
    }
}

// Add fireworks effect
function addFireworks() {
    const fireworksCount = 3;

    for (let i = 0; i < fireworksCount; i++) {
        setTimeout(() => {
            const x = Math.random() * window.innerWidth;
            const y = Math.random() * window.innerHeight * 0.5;

            for (let j = 0; j < 30; j++) {
                const particle = document.createElement('div');
                particle.className = 'sparkle';

                particle.style.left = `${x}px`;
                particle.style.top = `${y}px`;

                // Randomize color
                const colors = ['#ff7597', '#64ffda', '#3498db', '#e74c3c', '#f1c40f'];
                particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];

                document.body.appendChild(particle);

                // Explode animation
                const angle = Math.random() * Math.PI * 2;
                const speed = 2 + Math.random() * 3;
                const tx = x + Math.cos(angle) * 100 * speed;
                const ty = y + Math.sin(angle) * 100 * speed;

                particle.style.transition = `all 0.8s cubic-bezier(0.165, 0.84, 0.44, 1)`;

                setTimeout(() => {
                    particle.style.left = `${tx}px`;
                    particle.style.top = `${ty}px`;
                    particle.style.opacity = '0';
                }, 10);

                // Remove particle
                setTimeout(() => {
                    particle.remove();
                }, 800);
            }
        }, i * 300);
    }
}

// Hover effects for skills
function setupSkillsHoverEffects() {
    const skills = document.querySelectorAll('.skill-category li');

    skills.forEach(skill => {
        skill.addEventListener('mouseenter', () => {
            skill.style.transform = 'translateX(10px) scale(1.05)';
            skill.style.color = 'var(--accent-color)';
        });

        skill.addEventListener('mouseleave', () => {
            skill.style.transform = '';
            skill.style.color = '';
        });
    });
}

// Initialize all functions when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    setupDarkMode();
    addSparkleOnClick();
    setupEmojiReactions();
    setupSkillsHoverEffects();
    setupMobileMenu();
    setupContactForm();
});
