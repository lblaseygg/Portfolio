document.addEventListener('DOMContentLoaded', () => {
    // Theme toggle functionality
    const themeToggle = document.querySelector('.theme-toggle');
    const root = document.documentElement;
    let isDark = false;

    themeToggle?.addEventListener('click', () => {
        isDark = !isDark;
        if (isDark) {
            root.style.setProperty('--text-color', '#fff');
            root.style.setProperty('--bg-color', '#000');
        } else {
            root.style.setProperty('--text-color', '#000');
            root.style.setProperty('--bg-color', '#ff0044');
        }
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Generate and update binary pattern
    const binaryPattern = document.querySelector('.binary-pattern');
    const generateBinary = () => {
        return Array(32).fill(0).map(() => Math.random() > 0.5 ? '1' : '0').join('');
    };

    if (binaryPattern) {
        setInterval(() => {
            binaryPattern.textContent = generateBinary();
        }, 2000);
    }

    // Intersection Observer for fade-in animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all sections and work items
    document.querySelectorAll('.section, .work-item').forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
        observer.observe(element);
    });

    // Special handling for subtitle
    const subtitle = document.querySelector('.subtitle');
    if (subtitle) {
        subtitle.style.opacity = '0';
        subtitle.style.transform = 'translateY(20px)';
        subtitle.style.transition = 'opacity 2s ease-out, transform 2s ease-out';
        setTimeout(() => {
            subtitle.style.opacity = '1';
            subtitle.style.transform = 'translateY(0)';
        }, 2000);
    }

    // Parallax effect for hero section
    let lastScrollY = window.scrollY;
    const hero = document.querySelector('.hero');
    
    const updateParallax = () => {
        if (hero) {
            const scrollY = window.scrollY;
            const delta = scrollY - lastScrollY;
            const speed = 0.5;
            
            if (scrollY <= window.innerHeight) {
                hero.style.transform = `translateY(${scrollY * speed}px)`;
                hero.style.opacity = 1 - (scrollY / window.innerHeight);
            }
            
            lastScrollY = scrollY;
        }
    };

    window.addEventListener('scroll', () => {
        window.requestAnimationFrame(updateParallax);
    });

    // Sticky header behavior
    const header = document.querySelector('header');
    let lastScroll = 0;
    const scrollThreshold = 50;
    let ticking = false;

    const updateHeader = () => {
        const currentScroll = window.pageYOffset;
        
        if (window.innerWidth <= 768) {
            if (currentScroll > scrollThreshold) {
                header.classList.add('visible');
            } else {
                header.classList.remove('visible');
            }
        } else {
            if (currentScroll > scrollThreshold) {
                header.style.transform = 'translateY(0)';
            } else {
                header.style.transform = 'translateY(-100%)';
            }
        }
        
        lastScroll = currentScroll;
    };

    // Initial state - hide navbar on both mobile and desktop
    if (window.innerWidth <= 768) {
        header.classList.remove('visible');
    } else {
        header.style.transform = 'translateY(-100%)';
    }

    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                updateHeader();
                ticking = false;
            });
            ticking = true;
        }
    });

    // Handle window resize
    window.addEventListener('resize', () => {
        if (window.innerWidth <= 768) {
            header.classList.remove('visible');
            header.style.transform = '';
        } else {
            header.classList.remove('visible');
            header.style.transform = 'translateY(-100%)';
        }
    });

    // Form submission handling
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData);
            
            // Here you would typically send the data to a server
            console.log('Form submitted:', data);
            
            // Show success message
            const successMessage = document.createElement('div');
            successMessage.className = 'success-message';
            successMessage.textContent = 'Your message has been sent. Thank you!';
            contactForm.appendChild(successMessage);
            
            // Reset form
            contactForm.reset();
            
            // Remove success message after 3 seconds
            setTimeout(() => {
                successMessage.remove();
            }, 3000);
        });
    }

    // Work item hover effect
    const workItems = document.querySelectorAll('.work-item');
    workItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            item.style.transform = 'translateY(-8px)';
        });
        
        item.addEventListener('mouseleave', () => {
            item.style.transform = 'translateY(0)';
        });
    });

    // Smooth scrolling for navigation links in mobile navbar
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
}); 