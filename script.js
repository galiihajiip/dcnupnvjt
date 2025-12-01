// ===================================
// NAVBAR FUNCTIONALITY
// ===================================
const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link, .nav-cta');

// Mobile menu toggle
navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    
    // Animate hamburger
    const spans = navToggle.querySelectorAll('span');
    if (navMenu.classList.contains('active')) {
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
    } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    }
});

// Close mobile menu when clicking a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        const spans = navToggle.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    });
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.05)';
    }
});

// ===================================
// SMOOTH SCROLL
// ===================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ===================================
// SCROLL ANIMATIONS
// ===================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe all elements with fade-in-scroll class
document.querySelectorAll('.fade-in-scroll').forEach(el => {
    observer.observe(el);
});

// ===================================
// FAQ ACCORDION
// ===================================
const faqQuestions = document.querySelectorAll('.faq-question');

faqQuestions.forEach(question => {
    question.addEventListener('click', () => {
        const faqItem = question.parentElement;
        const isActive = faqItem.classList.contains('active');
        
        // Close all FAQ items
        document.querySelectorAll('.faq-item').forEach(item => {
            item.classList.remove('active');
        });
        
        // Toggle current item
        if (!isActive) {
            faqItem.classList.add('active');
        }
    });
});

// ===================================
// FORM VALIDATION & SUBMISSION
// ===================================
const registrationForm = document.getElementById('registrationForm');
const successModal = document.getElementById('successModal');
const closeModalBtn = document.getElementById('closeModal');

// Form validation rules
const validationRules = {
    nama: {
        required: true,
        minLength: 3,
        message: 'Nama lengkap minimal 3 karakter'
    },
    nim: {
        required: true,
        pattern: /^[0-9]+$/,
        message: 'NIM harus berupa angka'
    },
    prodi: {
        required: true,
        minLength: 3,
        message: 'Program studi minimal 3 karakter'
    },
    angkatan: {
        required: true,
        pattern: /^[0-9]{4}$/,
        message: 'Angkatan harus 4 digit tahun (contoh: 2023)'
    },
    email: {
        required: true,
        pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        message: 'Email tidak valid'
    },
    whatsapp: {
        required: true,
        pattern: /^[0-9+\-\s()]+$/,
        minLength: 10,
        message: 'Nomor WhatsApp tidak valid'
    },
    instagram: {
        required: true,
        minLength: 2,
        message: 'Username Instagram minimal 2 karakter'
    },
    linkedin: {
        required: false,
        pattern: /^(https?:\/\/)?(www\.)?linkedin\.com\/.+$/,
        message: 'URL LinkedIn tidak valid'
    },
    github: {
        required: false,
        minLength: 1,
        message: 'Username GitHub tidak valid'
    },
    ketersediaan: {
        required: true,
        message: 'Pilih ketersediaan waktu'
    },
    motivasi: {
        required: true,
        minLength: 20,
        message: 'Motivasi minimal 20 karakter'
    },
    minat: {
        required: true,
        minLength: 20,
        message: 'Minat minimal 20 karakter'
    }
};

// Validate single field
function validateField(fieldName, value) {
    const rules = validationRules[fieldName];
    if (!rules) return { valid: true };
    
    // Check required
    if (rules.required && !value.trim()) {
        return { valid: false, message: 'Field ini wajib diisi' };
    }
    
    // Skip other validations if field is optional and empty
    if (!rules.required && !value.trim()) {
        return { valid: true };
    }
    
    // Check min length
    if (rules.minLength && value.trim().length < rules.minLength) {
        return { valid: false, message: rules.message };
    }
    
    // Check pattern
    if (rules.pattern && !rules.pattern.test(value.trim())) {
        return { valid: false, message: rules.message };
    }
    
    return { valid: true };
}

// Show error message
function showError(fieldName, message) {
    const formGroup = document.getElementById(fieldName).closest('.form-group');
    const errorElement = document.getElementById(fieldName + 'Error');
    
    formGroup.classList.add('error');
    errorElement.textContent = message;
    errorElement.style.display = 'block';
}

// Clear error message
function clearError(fieldName) {
    const formGroup = document.getElementById(fieldName).closest('.form-group');
    const errorElement = document.getElementById(fieldName + 'Error');
    
    formGroup.classList.remove('error');
    errorElement.textContent = '';
    errorElement.style.display = 'none';
}

// Real-time validation on blur
Object.keys(validationRules).forEach(fieldName => {
    const field = document.getElementById(fieldName);
    if (field) {
        field.addEventListener('blur', () => {
            const validation = validateField(fieldName, field.value);
            if (!validation.valid) {
                showError(fieldName, validation.message);
            } else {
                clearError(fieldName);
            }
        });
        
        // Clear error on input
        field.addEventListener('input', () => {
            clearError(fieldName);
        });
    }
});

// Form submission
registrationForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    let isValid = true;
    const formData = new FormData(registrationForm);
    
    // Validate all fields
    Object.keys(validationRules).forEach(fieldName => {
        const value = formData.get(fieldName) || '';
        const validation = validateField(fieldName, value);
        
        if (!validation.valid) {
            showError(fieldName, validation.message);
            isValid = false;
        }
    });
    
    // If form is valid, show success modal
    if (isValid) {
        // Here you would normally send data to a server
        console.log('Form data:', Object.fromEntries(formData));
        
        // Show success modal
        successModal.classList.add('active');
        
        // Reset form
        registrationForm.reset();
        
        // Clear all errors
        Object.keys(validationRules).forEach(fieldName => {
            clearError(fieldName);
        });
    } else {
        // Scroll to first error
        const firstError = document.querySelector('.form-group.error');
        if (firstError) {
            const offsetTop = firstError.offsetTop - 100;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    }
});

// Close modal
closeModalBtn.addEventListener('click', () => {
    successModal.classList.remove('active');
});

// Close modal when clicking outside
successModal.addEventListener('click', (e) => {
    if (e.target === successModal) {
        successModal.classList.remove('active');
    }
});

// ===================================
// NEURAL NETWORK ANIMATION
// ===================================
const nodes = document.querySelectorAll('.node');
nodes.forEach((node, index) => {
    node.style.animationDelay = `${index * 0.5}s`;
});

// ===================================
// LOADING ANIMATION
// ===================================
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// ===================================
// CONSOLE MESSAGE
// ===================================
console.log('%c🚀 DCN UPNVJT - Gen AI Engineer Learning Path', 'font-size: 20px; font-weight: bold; color: #2563EB;');
console.log('%cBagian dari Dicoding Community Builder Batch 2', 'font-size: 14px; color: #22C55E;');
console.log('%cFollow us: @dcn.upnvjt', 'font-size: 12px; color: #64748B;');
