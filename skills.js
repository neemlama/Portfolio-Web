// Skills page functionality
document.addEventListener('DOMContentLoaded', function() {
    // Add hover effects for skill cards
    const skillCards = document.querySelectorAll('.skill-card');
    
    skillCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Animate stats numbers
    const statNumbers = document.querySelectorAll('.stat-number');
    
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const statNumber = entry.target;
                const finalNumber = parseInt(statNumber.textContent);
                let currentNumber = 0;
                const increment = finalNumber / 50;
                
                const countUp = () => {
                    if (currentNumber < finalNumber) {
                        currentNumber += increment;
                        statNumber.textContent = Math.floor(currentNumber) + '+';
                        requestAnimationFrame(countUp);
                    } else {
                        statNumber.textContent = finalNumber + '+';
                    }
                };
                
                countUp();
                statsObserver.unobserve(statNumber);
            }
        });
    }, { threshold: 0.5 });
    
    statNumbers.forEach(stat => {
        statsObserver.observe(stat);
    });
    
    // Smooth scrolling for internal links
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
    
    // Add stagger animation to skill cards
    const addStaggerAnimation = () => {
        const categories = document.querySelectorAll('.category-section');
        
        categories.forEach(category => {
            const cards = category.querySelectorAll('.skill-card');
            cards.forEach((card, index) => {
                card.style.animationDelay = `${index * 0.1}s`;
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                
                setTimeout(() => {
                    card.style.transition = 'all 0.6s ease';
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, index * 100);
            });
        });
    };
    
    // Add fade-in animation on page load
    setTimeout(addStaggerAnimation, 500);
    
    // Filter functionality (if needed in future)
    const addFilterFunctionality = () => {
        const filterButtons = document.querySelectorAll('.filter-btn');
        const skillCards = document.querySelectorAll('.skill-card');
        
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                const filter = this.getAttribute('data-filter');
                
                // Update active button
                filterButtons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');
                
                // Filter cards
                skillCards.forEach(card => {
                    if (filter === 'all' || card.classList.contains(filter)) {
                        card.style.display = 'block';
                        card.style.animation = 'fadeIn 0.5s ease';
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });
    };
    
    // Skill card click functionality for more details
    skillCards.forEach(card => {
        card.addEventListener('click', function(e) {
            // Prevent default if it's not a link
            if (!e.target.closest('a')) {
                const skillName = this.querySelector('.skill-name').textContent;
                const skillDescription = this.querySelector('.skill-description').textContent;
                
                // Could implement a modal or expanded view here
                console.log(`Skill: ${skillName}, Description: ${skillDescription}`);
            }
        });
    });
});

// CSS animations for skill cards
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .skill-card {
        cursor: pointer;
    }
    
    .skill-card:active {
        transform: translateY(-3px) scale(0.98);
    }
`;
document.head.appendChild(style);
