// Preloader functionality
window.addEventListener('load', function() {
    // Wait for everything to load
    setTimeout(function() {
        document.body.classList.add('loaded');
    }, 3500); // 3.5 seconds delay
});

// DOM Elements
const cursor = document.getElementById('cursor');
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileMenu = document.getElementById('mobileMenu');
const navLinks = document.querySelectorAll('.nav-link');
const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
const sections = document.querySelectorAll('.section');
const ctaButton = document.querySelector('.cta-button');
const contactForm = document.getElementById('contactForm');

// Current active section
let currentSection = 'home';

// Custom cursor
if (window.innerWidth > 768) {
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });

    // Cursor hover effects
    const hoverElements = document.querySelectorAll('a, button, .nav-link, .project-card');
    hoverElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            cursor.classList.add('hovered');
        });
        element.addEventListener('mouseleave', () => {
            cursor.classList.remove('hovered');
        });
    });
}

// Logo click functionality
const logo = document.querySelector('.logo');
logo.addEventListener('click', (e) => {
    e.preventDefault();
    showSection('home');
});

// Mobile menu toggle
mobileMenuBtn.addEventListener('click', () => {
    mobileMenuBtn.classList.toggle('active');
    mobileMenu.classList.toggle('active');
});

// Navigation functionality
function showSection(sectionId) {
    // Hide all sections
    sections.forEach(section => {
        section.classList.remove('active');
    });

    // Show target section
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.classList.add('active');
        currentSection = sectionId;

        // Update active nav link
        updateActiveNavLink(sectionId);

        // Animate skill bars if about section
        if (sectionId === 'about') {
            animateSkillBars();
        }

        // Close mobile menu
        mobileMenuBtn.classList.remove('active');
        mobileMenu.classList.remove('active');
    }
}

function updateActiveNavLink(sectionId) {
    // Update desktop nav
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.dataset.section === sectionId) {
            link.classList.add('active');
        }
    });

    // Update mobile nav
    mobileNavLinks.forEach(link => {
        link.classList.remove('active');
        if (link.dataset.section === sectionId) {
            link.classList.add('active');
        }
    });
}

// Add click listeners to nav links
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const sectionId = link.dataset.section;
        showSection(sectionId);
    });
});

mobileNavLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const sectionId = link.dataset.section;
        showSection(sectionId);
    });
});

// CTA button functionality
ctaButton.addEventListener('click', () => {
    showSection('work');
});

// Skill bars animation
function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    skillBars.forEach((bar, index) => {
        setTimeout(() => {
            const width = bar.dataset.width;
            bar.style.width = width + '%';
        }, index * 200);
    });
}

// Contact form handling
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(contactForm);
    const name = formData.get('name');
    const email = formData.get('email');
    const message = formData.get('message');

    // Simple validation
    if (!name || !email || !message) {
        alert('Please fill in all fields');
        return;
    }

    // Simulate form submission
    alert('Thank you for your message! I\'ll get back to you soon.');
    contactForm.reset();
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const sectionId = this.getAttribute('href').substring(1);
        showSection(sectionId);
    });
});

// Initialize page
document.addEventListener('DOMContentLoaded', () => {
    // Show home section by default
    showSection('home');
    
    // Add stagger animation to project cards
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
    });
});

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    const sectionOrder = ['home', 'about', 'work', 'contact'];
    const currentIndex = sectionOrder.indexOf(currentSection);

    if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
        e.preventDefault();
        const nextIndex = (currentIndex + 1) % sectionOrder.length;
        showSection(sectionOrder[nextIndex]);
    } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
        e.preventDefault();
        const prevIndex = currentIndex === 0 ? sectionOrder.length - 1 : currentIndex - 1;
        showSection(sectionOrder[prevIndex]);
    }
});

// Resize handler
window.addEventListener('resize', () => {
    // Hide mobile menu on resize
    if (window.innerWidth > 768) {
        mobileMenuBtn.classList.remove('active');
        mobileMenu.classList.remove('active');
    }
});

// Add loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Intersection Observer for animations (optional enhancement)
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animationPlayState = 'running';
        }
    });
}, observerOptions);

// Observe animated elements
document.querySelectorAll('[class*="fadeIn"]').forEach(el => {
    observer.observe(el);
});