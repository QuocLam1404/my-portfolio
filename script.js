// Smooth Scroll for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });

            // Close mobile menu if open
            const navMenu = document.getElementById('navMenu');
            const hamburger = document.getElementById('hamburger');
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
            }
        }
    });
});

// Sticky Header
const header = document.getElementById('header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 100) {
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.05)';
    }

    lastScroll = currentScroll;
});

// Mobile Menu Toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
});

// Scroll Animation
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

// Observe elements for scroll animation
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.skill-category, .project-card, .profile-card, .about-card, .contact-card, .contact-form');
    animateElements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
});

// Contact Form Handling
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Get form values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const subject = document.getElementById('subject') ? document.getElementById('subject').value : '';
    const message = document.getElementById('message').value;

    // Simple validation
    if (!name || !email || !subject || !message) {
        alert('Vui lòng điền đầy đủ thông tin bắt buộc!');
        return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Vui lòng nhập email hợp lệ!');
        return;
    }

    // Simulate form submission
    const submitButton = contactForm.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    submitButton.textContent = 'Đang gửi...';
    submitButton.disabled = true;

    // Simulate API call
    setTimeout(() => {
        alert(`Cảm ơn bạn đã liên hệ về "${subject}"! Tôi sẽ phản hồi sớm nhất có thể.`);
        contactForm.reset();
        submitButton.textContent = originalText;
        submitButton.disabled = false;
    }, 1500);
});

// Active Navigation Link on Scroll
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.pageYOffset >= sectionTop - 100) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Add active class styling for nav links
const style = document.createElement('style');
style.textContent = `
    .nav-link.active {
        color: var(--primary-color);
    }
    .nav-link.active::after {
        width: 100%;
    }
`;
document.head.appendChild(style);



// Repo Modal
const repoModal = document.getElementById('repoModal');
const modalTitle = document.getElementById('modalTitle');
const repoLinkInput = document.getElementById('repoLinkInput');
const copyBtn = document.getElementById('copyBtn');
const copyHint = document.getElementById('copyHint');
const modalClose = document.getElementById('modalClose');

function showRepoModal(projectName, repoUrl) {
    modalTitle.textContent = projectName + ' – Repository';
    repoLinkInput.value = repoUrl;
    copyBtn.classList.remove('copied');
    copyBtn.querySelector('span').textContent = 'Copy';
    copyHint.textContent = '';
    repoModal.classList.add('active');
}

function closeRepoModal() {
    repoModal.classList.remove('active');
}

function copyRepoLink() {
    repoLinkInput.select();
    navigator.clipboard.writeText(repoLinkInput.value).then(() => {
        copyBtn.classList.add('copied');
        copyBtn.querySelector('span').textContent = 'Copied!';
        copyHint.textContent = '✅ Đã copy link! Dán vào trình duyệt để truy cập.';
        setTimeout(() => {
            copyBtn.classList.remove('copied');
            copyBtn.querySelector('span').textContent = 'Copy';
        }, 3000);
    }).catch(() => {
        // Fallback for older browsers
        document.execCommand('copy');
        copyBtn.classList.add('copied');
        copyBtn.querySelector('span').textContent = 'Copied!';
        copyHint.textContent = '✅ Đã copy link! Dán vào trình duyệt để truy cập.';
    });
}

modalClose.addEventListener('click', closeRepoModal);
repoModal.addEventListener('click', (e) => {
    if (e.target === repoModal) closeRepoModal();
});
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeRepoModal();
});

// Social Links (placeholder)
document.querySelectorAll('.social-link').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const platform = link.getAttribute('aria-label');
        alert(`Link ${platform} sẽ được cập nhật sau. Bạn có thể thay đổi href trong file HTML.`);
    });
});

// Parallax Effect for Hero Section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero && scrolled < window.innerHeight) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
        hero.style.opacity = 1 - (scrolled / window.innerHeight) * 0.5;
    }
});

// Typing Effect for Hero Title (Optional Enhancement)
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.textContent = '';

    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }

    type();
}

// Uncomment below to enable typing effect
// const heroTitle = document.querySelector('.hero-title');
// if (heroTitle) {
//     const originalText = heroTitle.textContent;
//     typeWriter(heroTitle, originalText, 50);
// }

// Add loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// Console welcome message
console.log('%c👋 Welcome to my Portfolio!', 'color: #2A63A5; font-size: 20px; font-weight: bold;');
console.log('%cFeel free to explore the code!', 'color: #666; font-size: 14px;');

// ---------- AI / Modern Digital Effects ----------

// Custom Glow Cursor
const cursorDot = document.getElementById('cursor-dot');
const cursorOutline = document.getElementById('cursor-outline');

if (cursorDot && cursorOutline) {
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let outlineX = mouseX;
    let outlineY = mouseY;
    
    // Track mouse position
    window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        // Dot follows instantly
        cursorDot.style.top = `${mouseY}px`;
        cursorDot.style.left = `${mouseX}px`;
    });

    // Outline follows with lerp (delay)
    function animateCursor() {
        // Lerp for outline
        let easing = 0.15;
        outlineX += (mouseX - outlineX) * easing;
        outlineY += (mouseY - outlineY) * easing;

        cursorOutline.style.top = `${outlineY}px`;
        cursorOutline.style.left = `${outlineX}px`;

        requestAnimationFrame(animateCursor);
    }
    animateCursor();

    // Hover state on interactive elements
    const interactives = document.querySelectorAll('a, button, input, textarea, .nav-link, .btn, .social-link, details, [data-magnetic]');
    interactives.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursorDot.classList.add('hovered');
            cursorOutline.classList.add('hovered');
        });
        el.addEventListener('mouseleave', () => {
            cursorDot.classList.remove('hovered');
            cursorOutline.classList.remove('hovered');
        });
    });
}

// Magnetic Button Effect
const magnetics = document.querySelectorAll('[data-magnetic]');
magnetics.forEach(btn => {
    btn.addEventListener('mousemove', function(e) {
        const position = btn.getBoundingClientRect();
        const x = e.clientX - position.left - position.width / 2;
        const y = e.clientY - position.top - position.height / 2;
        
        btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
    });
    
    btn.addEventListener('mouseleave', function() {
        btn.style.transform = 'translate(0px, 0px)';
    });
});

// 3D Tilt Effect for Cards
const tiltCards = document.querySelectorAll('.tilt-card');
tiltCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left; // x position within the element.
        const y = e.clientY - rect.top;  // y position within the element.
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = ((y - centerY) / centerY) * -10; // Max 10 deg
        const rotateY = ((x - centerX) / centerX) * 10;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        card.style.transition = 'none';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
        card.style.transition = 'transform 0.5s ease';
    });
});
