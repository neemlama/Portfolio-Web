// Floating Navbar Functionality with Vertical Dock
document.addEventListener('DOMContentLoaded', function() {
    const floatingNav = document.querySelector('.floating-navbar');
    
    // Theme Toggle Functionality
    const themeToggle = document.getElementById('themeToggle');
    const body = document.body;
    const html = document.documentElement;
    
    // Check for saved theme preference or default to light mode
    const savedTheme = localStorage.getItem('theme') || 'light';
    if (savedTheme === 'dark') {
        body.classList.add('dark-theme');
        html.classList.add('dark-theme');
    } else {
        // Ensure light theme is properly set
        body.classList.remove('dark-theme');
        html.classList.remove('dark-theme');
    }
    
    // Theme toggle event listener
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            body.classList.toggle('dark-theme');
            html.classList.toggle('dark-theme');
            const currentTheme = body.classList.contains('dark-theme') ? 'dark' : 'light';
            localStorage.setItem('theme', currentTheme);
        });
    }
    
    // Force navbar to be always visible
    if (floatingNav) {
        floatingNav.classList.add('visible');
        floatingNav.style.opacity = '1';
        floatingNav.style.visibility = 'visible';
        floatingNav.style.display = 'block';
        floatingNav.style.position = 'fixed';
        floatingNav.style.zIndex = '5000';
    }
    
    // Handle scroll-based transformation
    let isVerticalDock = false;
    const transformThreshold = 200; // Pixels to scroll before transforming
    
    function handleScroll() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > transformThreshold && !isVerticalDock) {
            // Transform to vertical dock
            floatingNav.classList.add('vertical-dock');
            // Force positioning for vertical dock - center of viewport
            floatingNav.style.position = 'fixed';
            floatingNav.style.top = '50%';
            floatingNav.style.left = '2rem';
            floatingNav.style.transform = 'translateY(-50%)';
            floatingNav.style.zIndex = '9999';
            floatingNav.style.opacity = '1';
            floatingNav.style.visibility = 'visible';
            floatingNav.style.display = 'block';
            isVerticalDock = true;
        } else if (scrollTop <= transformThreshold && isVerticalDock) {
            // Transform back to horizontal navbar
            floatingNav.classList.remove('vertical-dock');
            // Reset positioning for horizontal navbar
            floatingNav.style.position = 'fixed';
            floatingNav.style.top = '20px';
            floatingNav.style.left = '50%';
            floatingNav.style.transform = 'translateX(-50%)';
            floatingNav.style.zIndex = '5000';
            isVerticalDock = false;
        }
    }
    
    // Add scroll listener
    window.addEventListener('scroll', handleScroll);
    
    // Initial check
    handleScroll();
    
    // Add subtle scale effect on hover for better UX
    const navItems = document.querySelectorAll('.nav-item, .nav-cta-button');
    
    navItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            if (isVerticalDock) {
                this.style.transform = 'scale(1.1)';
            } else {
                this.style.transform = 'scale(1.05)';
            }
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
});

// Smooth scrolling for anchor links only (not navigation links)
document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', function(e) {
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

// Legacy navbar scroll effect (keeping for compatibility)
window.addEventListener('scroll', function() {
    // This can be removed or kept for other elements that might need scroll effects
});

// Scroll indicator animation
function animateScrollIndicator() {
    const scrollArrow = document.querySelector('.scroll-arrow');
    if (scrollArrow) {
        scrollArrow.addEventListener('click', function() {
            window.scrollTo({
                top: window.innerHeight,
                behavior: 'smooth'
            });
        });
    }
}

// Initialize animations when page loads
document.addEventListener('DOMContentLoaded', function() {
    animateScrollIndicator();
    
    // Count-up animation for stats
    function animateCountUp(element, start, end, duration) {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            const currentValue = Math.floor(progress * (end - start) + start);
            element.textContent = currentValue + '+';
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    }
    
    // Intersection Observer for stats animation
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const statNumber = entry.target;
                const finalNumber = parseInt(statNumber.textContent);
                
                // Start animation from 0 to the final number
                animateCountUp(statNumber, 0, finalNumber, 2000); // 2 seconds duration
                
                // Stop observing this element so it only animates once
                statsObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.5 // Trigger when 50% of the element is visible
    });
    
    // Observe all stat numbers
    document.querySelectorAll('.stat-number').forEach(stat => {
        statsObserver.observe(stat);
    });
    
    // Add fade-in animation to elements
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe sections for fade-in animation
    document.querySelectorAll('section').forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });
});

// Add click handler for CTA button
document.querySelector('.cta-button')?.addEventListener('click', function() {
    // You can customize this action - for now, it could scroll to contact or open a modal
    alert('Contact form would open here!');
});

// Color box hover effects
document.querySelectorAll('.color-box').forEach(box => {
    box.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.05)';
        this.style.transition = 'transform 0.3s ease';
    });
    
    box.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
    });
});

// Profile image placeholder interaction
document.querySelector('.profile-placeholder')?.addEventListener('click', function() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    
    input.addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                const placeholder = document.querySelector('.profile-placeholder');
                placeholder.innerHTML = `<img src="${e.target.result}" alt="Profile" style="width: 100%; height: 100%; object-fit: cover;">`;
            };
            reader.readAsDataURL(file);
        }
    });
    
    input.click();
});

// Typing animation for the hero title
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize typing animation when hero section is visible
const heroTitle = document.querySelector('.hero-title');
if (heroTitle) {
    const originalText = heroTitle.textContent;
    
    const heroObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                typeWriter(heroTitle, originalText, 150);
                heroObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    heroObserver.observe(heroTitle);
}

// Floating Dock Functionality
document.addEventListener('DOMContentLoaded', function() {
    const dockContainer = document.querySelector('.dock-container');
    const dockItems = document.querySelectorAll('.dock-item');
    const mobileToggle = document.querySelector('.mobile-dock-toggle');
    let mouseY = 0;
    let isMouseOver = false;

    // Desktop dock magnification effect (vertical)
    if (dockContainer) {
        dockContainer.addEventListener('mousemove', function(e) {
            mouseY = e.clientY;
            isMouseOver = true;
            updateDockItems();
        });

        dockContainer.addEventListener('mouseleave', function() {
            isMouseOver = false;
            resetDockItems();
        });
    }

    function updateDockItems() {
        if (!isMouseOver) return;
        
        dockItems.forEach(item => {
            const rect = item.getBoundingClientRect();
            const itemCenter = rect.top + rect.height / 2;
            const distance = Math.abs(mouseY - itemCenter);
            
            // Calculate scale based on distance (closer = bigger)
            const maxDistance = 150;
            const minScale = 1;
            const maxScale = 1.4;
            
            let scale = maxScale - (distance / maxDistance) * (maxScale - minScale);
            scale = Math.max(minScale, Math.min(maxScale, scale));
            
            // Apply transformation (translate left for vertical dock)
            item.style.transform = `scale(${scale}) translateX(${(scale - 1) * -20}px)`;
        });
    }

    function resetDockItems() {
        dockItems.forEach(item => {
            item.style.transform = 'scale(1) translateX(0)';
        });
    }

    // Mobile dock toggle
    if (mobileToggle) {
        mobileToggle.addEventListener('click', function() {
            if (dockContainer) {
                dockContainer.classList.toggle('mobile-open');
                
                // Animate toggle icon
                const icon = this.querySelector('.dock-menu-icon');
                if (dockContainer.classList.contains('mobile-open')) {
                    icon.textContent = '✕';
                    this.style.transform = 'rotate(180deg)';
                } else {
                    icon.textContent = '☰';
                    this.style.transform = 'rotate(0deg)';
                }
            }
        });
    }

    // Add click handlers for dock items
    dockItems.forEach(item => {
        item.addEventListener('click', function() {
            const skill = this.getAttribute('data-skill');
            
            // Smooth scroll to skills section and highlight the clicked skill
            const skillsSection = document.querySelector('.colors-section');
            if (skillsSection) {
                skillsSection.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'center'
                });
                
                // Add a visual indicator
                this.style.animation = 'pulse 0.6s ease-in-out';
                setTimeout(() => {
                    this.style.animation = '';
                }, 600);
            }
        });
        
        // Add hover sound effect (optional)
        item.addEventListener('mouseenter', function() {
            // You can add a subtle sound effect here if desired
            this.style.transition = 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
        });
    });

    // Show dock always (since it's positioned at top right)
    window.addEventListener('scroll', function() {
        const dock = document.querySelector('.floating-dock');
        if (dock) {
            // Keep dock visible at all times for top-right position
            dock.style.opacity = '1';
        }
    });

    // Show dock on mouse movement
    document.addEventListener('mousemove', function() {
        const dock = document.querySelector('.floating-dock');
        if (dock) {
            dock.style.opacity = '1';
        }
    });
});

// Add CSS for pulse animation
const style = document.createElement('style');
style.textContent = `
    @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.2); }
        100% { transform: scale(1); }
    }
`;
document.head.appendChild(style);
