// ===== SMOOTH SCROLLING =====
function initSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    for (let i = 0; i < links.length; i++) {
        links[i].addEventListener('click', function(e) {
            e.preventDefault();
            
            const target = this.getAttribute('href');
            const targetElement = document.querySelector(target);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // adjust for navbar height
                    behavior: 'smooth'
                });
            }
        });
    }
}

// ===== NAVBAR SCROLL EFFECT =====
function initNavbarScroll() {
    const navbar = document.querySelector('.navbar'); // Declare navbar variable
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 25px rgba(0, 0, 0, 0.2)';
            navbar.style.borderBottom = '2px solid #e9ecef';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.15)';
            navbar.style.borderBottom = '1px solid #e9ecef';
        }
        
        // Actualizar enlace activo en navbar
        updateActiveNavLink();
    });
}

// ===== PROGRESS BARS ANIMATION =====
function initProgressBarsAnimation() {
    const progressBars = document.querySelectorAll('.progress-bar');
    
    progressBars.forEach(bar => {
        const percentage = bar.dataset.percent;
        bar.style.width = percentage + '%';
    });
}

// ===== CAROUSEL =====
function initCarousel() {
    const carousel = document.querySelector('#carouselExampleIndicators');
    const bootstrap = window.bootstrap; // Declare bootstrap variable
    if (carousel) {
        new bootstrap.Carousel(carousel, {
            interval: 3000,
            pause: 'hover'
        });
    }
}

// ===== EFECTOS BLANCO Y NEGRO =====
function initBlackWhiteEffects() {
    // Efecto hover para imágenes
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('mouseenter', function() {
            this.style.filter = 'grayscale(100%) contrast(1.3) brightness(1.1)';
            this.style.transform = 'scale(1.02)';
        });
        
        img.addEventListener('mouseleave', function() {
            this.style.filter = 'grayscale(100%) contrast(1.2)';
            this.style.transform = 'scale(1)';
        });
    });
    
    // Efecto de typing para el título principal
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const text = heroTitle.textContent;
        heroTitle.textContent = '';
        let i = 0;
        
        function typeWriter() {
            if (i < text.length) {
                heroTitle.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        }
        
        setTimeout(typeWriter, 1000);
    }
}

// ===== UPDATE ACTIVE NAVLINK =====
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');

    let currentSection = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (window.pageYOffset >= sectionTop - 90) {
            currentSection = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === currentSection) {
            link.classList.add('active');
        }
    });
}

// ===== INICIALIZACIÓN =====
document.addEventListener('DOMContentLoaded', function() {
    initSmoothScrolling();
    initNavbarScroll();
    initProgressBarsAnimation();
    initCarousel();
    initBlackWhiteEffects(); // Nueva función
});

// ===== ANIMACIONES DE HABILIDADES =====

// Inicializar animaciones cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    initSkillsAnimations();
    initStatsCounter();
});

// Animaciones de barras de progreso
function initSkillsAnimations() {
    const skillsSection = document.querySelector('#skills');
    
    if (!skillsSection) return;
    
    const observerOptions = {
        threshold: 0.3,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const skillsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateSkillBars();
                animateProficiencyLevels();
                skillsObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    skillsObserver.observe(skillsSection);
}

// Animar barras de progreso principales
function animateSkillBars() {
    const progressBars = document.querySelectorAll('.skill-progress-bar');
    
    progressBars.forEach((bar, index) => {
        const percentage = bar.dataset.percentage;
        
        setTimeout(() => {
            bar.style.width = percentage + '%';
        }, index * 200);
    });
}

// Animar niveles de competencia del software
function animateProficiencyLevels() {
    const proficiencyLevels = document.querySelectorAll('.proficiency-level');
    
    proficiencyLevels.forEach((level, index) => {
        setTimeout(() => {
            const afterElement = level.querySelector('::after');
            level.classList.add('animate');
        }, index * 100);
    });
}

// Contador animado para estadísticas
function initStatsCounter() {
    const statsSection = document.querySelector('.experience-stats');
    
    if (!statsSection) return;
    
    const observerOptions = {
        threshold: 0.5
    };
    
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();
                statsObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    statsObserver.observe(statsSection);
}

// Animar contadores de estadísticas
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
        const target = parseInt(counter.dataset.target);
        const duration = 2000; // 2 segundos
        const increment = target / (duration / 16); // 60 FPS
        let current = 0;
        
        const updateCounter = () => {
            if (current < target) {
                current += increment;
                counter.textContent = Math.floor(current);
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target;
            }
        };
        
        updateCounter();
    });
}

// Efecto hover para software items
document.addEventListener('DOMContentLoaded', function() {
    const softwareItems = document.querySelectorAll('.software-item');
    
    softwareItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            // Efecto de escala en el logo
            const logo = this.querySelector('.software-logo');
            if (logo) {
                logo.style.transform = 'scale(1.2) rotate(5deg)';
            }
            
            // Efecto en el nivel de competencia
            const proficiency = this.querySelector('.proficiency-level');
            if (proficiency) {
                proficiency.style.transform = 'scaleX(1.05)';
            }
        });
        
        item.addEventListener('mouseleave', function() {
            const logo = this.querySelector('.software-logo');
            if (logo) {
                logo.style.transform = 'scale(1) rotate(0deg)';
            }
            
            const proficiency = this.querySelector('.proficiency-level');
            if (proficiency) {
                proficiency.style.transform = 'scaleX(1)';
            }
        });
    });
});

// Efecto parallax suave para la sección de estadísticas
window.addEventListener('scroll', function() {
    const statsSection = document.querySelector('.experience-stats');
    if (!statsSection) return;
    
    const rect = statsSection.getBoundingClientRect();
    const scrolled = window.pageYOffset;
    const rate = scrolled * -0.5;
    
    if (rect.top <= window.innerHeight && rect.bottom >= 0) {
        statsSection.style.transform = `translateY(${rate}px)`;
    }
});

// Función para reiniciar animaciones (útil para desarrollo)
function resetAnimations() {
    // Resetear barras de progreso
    const progressBars = document.querySelectorAll('.skill-progress-bar');
    progressBars.forEach(bar => {
        bar.style.width = '0%';
    });
    
    // Resetear contadores
    const counters = document.querySelectorAll('.stat-number');
    counters.forEach(counter => {
        counter.textContent = '0';
    });
    
    // Reinicializar
    setTimeout(() => {
        initSkillsAnimations();
        initStatsCounter();
    }, 100);
}

// Exportar funciones para uso global
window.skillsAnimations = {
    reset: resetAnimations,
    init: function() {
        initSkillsAnimations();
        initStatsCounter();
    }
};