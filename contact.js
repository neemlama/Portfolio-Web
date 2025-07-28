// Contact page functionality
document.addEventListener('DOMContentLoaded', function() {
    // FAQ functionality
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Close all FAQ items
            faqItems.forEach(otherItem => {
                otherItem.classList.remove('active');
            });
            
            // Toggle current item
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });
    
    // Contact form functionality
    const contactForm = document.getElementById('contactForm');
    const formSuccess = document.getElementById('formSuccess');
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const formObject = {};
        
        formData.forEach((value, key) => {
            formObject[key] = value;
        });
        
        // Simulate form submission
        submitForm(formObject);
    });
    
    function submitForm(data) {
        // Show loading state
        const submitButton = contactForm.querySelector('.form-submit');
        const originalText = submitButton.innerHTML;
        
        submitButton.innerHTML = '<span>Sending...</span>';
        submitButton.disabled = true;
        
        // Simulate API call
        setTimeout(() => {
            // Hide form and show success message
            contactForm.style.opacity = '0';
            
            setTimeout(() => {
                formSuccess.classList.add('show');
            }, 300);
            
            // Reset form after delay
            setTimeout(() => {
                contactForm.reset();
                submitButton.innerHTML = originalText;
                submitButton.disabled = false;
                contactForm.style.opacity = '1';
                formSuccess.classList.remove('show');
            }, 3000);
            
        }, 2000);
        
        // In a real application, you would send the data to your server
        console.log('Form submitted with data:', data);
    }
    
    // Form validation
    const formInputs = contactForm.querySelectorAll('input, select, textarea');
    
    formInputs.forEach(input => {
        input.addEventListener('blur', validateInput);
        input.addEventListener('input', clearValidation);
    });
    
    function validateInput(e) {
        const input = e.target;
        const value = input.value.trim();
        
        // Remove existing validation classes
        input.classList.remove('error', 'success');
        
        // Skip validation for optional fields
        if (!input.required && !value) return;
        
        let isValid = true;
        
        switch(input.type) {
            case 'email':
                isValid = validateEmail(value);
                break;
            case 'text':
                isValid = value.length >= 2;
                break;
            default:
                isValid = value.length > 0;
        }
        
        if (isValid) {
            input.classList.add('success');
        } else {
            input.classList.add('error');
        }
    }
    
    function clearValidation(e) {
        const input = e.target;
        input.classList.remove('error', 'success');
    }
    
    function validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    // Add contact method click tracking
    const contactMethods = document.querySelectorAll('.contact-method');
    
    contactMethods.forEach(method => {
        method.addEventListener('click', function() {
            const methodTitle = this.querySelector('.method-title').textContent;
            console.log(`Contact method clicked: ${methodTitle}`);
            
            // Add click animation
            this.style.transform = 'translateX(10px) scale(1.02)';
            setTimeout(() => {
                this.style.transform = 'translateX(5px) scale(1)';
            }, 150);
        });
    });
    
    // Social links tracking
    const socialLinks = document.querySelectorAll('.social-link');
    
    socialLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Prevent default for demo purposes
            e.preventDefault();
            
            const platform = this.querySelector('span').textContent;
            console.log(`Social link clicked: ${platform}`);
            
            // Add click animation
            this.style.transform = 'translateY(-8px) scale(1.05)';
            setTimeout(() => {
                this.style.transform = 'translateY(-5px) scale(1)';
            }, 150);
        });
    });
    
    // Smooth scroll for anchor links
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
    
    // Add entrance animation
    const addEntranceAnimation = () => {
        const elements = document.querySelectorAll('.contact-method, .faq-item, .social-link');
        
        elements.forEach((element, index) => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                element.style.transition = 'all 0.6s ease';
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }, index * 100);
        });
    };
    
    // Add intersection observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (entry.target.classList.contains('contact-methods')) {
                    addEntranceAnimation();
                    observer.unobserve(entry.target);
                }
            }
        });
    }, observerOptions);
    
    const contactMethodsSection = document.querySelector('.contact-methods');
    if (contactMethodsSection) {
        observer.observe(contactMethodsSection);
    }
    
    // Auto-resize textarea
    const textarea = document.getElementById('message');
    if (textarea) {
        textarea.addEventListener('input', function() {
            this.style.height = 'auto';
            this.style.height = Math.min(this.scrollHeight, 200) + 'px';
        });
    }
    
    // Form field focus effects
    formInputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            this.parentElement.classList.remove('focused');
        });
    });
    
    // Add availability status animation
    const statusIndicator = document.querySelector('.status-indicator');
    if (statusIndicator) {
        setInterval(() => {
            statusIndicator.style.transform = 'scale(1.2)';
            setTimeout(() => {
                statusIndicator.style.transform = 'scale(1)';
            }, 300);
        }, 3000);
    }
});

// Add CSS for form validation states
const style = document.createElement('style');
style.textContent = `
    .form-input.error,
    .form-select.error,
    .form-textarea.error {
        border-color: #ef4444;
        box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
    }
    
    .form-input.success,
    .form-select.success,
    .form-textarea.success {
        border-color: #22c55e;
        box-shadow: 0 0 0 3px rgba(34, 197, 94, 0.1);
    }
    
    .form-group.focused .form-label {
        color: #222;
        transform: translateY(-2px);
    }
    
    .status-indicator {
        transition: transform 0.3s ease;
    }
    
    .contact-method {
        cursor: pointer;
    }
    
    .social-link {
        cursor: pointer;
    }
`;
document.head.appendChild(style);
