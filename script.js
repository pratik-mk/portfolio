/* ============================================================
   PRATIK DHOKE — PORTFOLIO
   Interactions: theme toggle, typewriter, scroll reveal, nav
   ============================================================ */

/* ===== THEME TOGGLE ===== */
const html     = document.documentElement;
const themeBtn = document.getElementById('theme-toggle');

const savedTheme = localStorage.getItem('pd-theme') || 'dark';
html.setAttribute('data-theme', savedTheme);

themeBtn.addEventListener('click', () => {
    const next = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', next);
    localStorage.setItem('pd-theme', next);
});

/* ===== HAMBURGER MENU ===== */
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('nav-links');

hamburger.addEventListener('click', () => {
    const open = navLinks.classList.toggle('open');
    hamburger.classList.toggle('open', open);
    hamburger.setAttribute('aria-expanded', open);
});

// Close nav when any link is clicked
navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        hamburger.classList.remove('open');
    });
});

// Close nav on outside click
document.addEventListener('click', (e) => {
    if (!navLinks.contains(e.target) && !hamburger.contains(e.target)) {
        navLinks.classList.remove('open');
        hamburger.classList.remove('open');
    }
});

/* ===== SCROLL REVEAL ===== */
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

/* ===== ACTIVE NAV LINK ON SCROLL ===== */
const sections    = document.querySelectorAll('section[id]');
const navAnchors  = document.querySelectorAll('.nav-links a[href^="#"]');

const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const id = entry.target.getAttribute('id');
            navAnchors.forEach(a => {
                a.classList.toggle('active', a.getAttribute('href') === `#${id}`);
            });
        }
    });
}, { rootMargin: '-40% 0px -55% 0px' });

sections.forEach(s => navObserver.observe(s));

/* ===== NAVBAR SHADOW ON SCROLL ===== */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    navbar.style.borderBottomColor = window.scrollY > 20
        ? 'var(--border)'
        : 'transparent';
}, { passive: true });

/* ===== TYPEWRITER EFFECT ===== */
const titles   = ['Software Engineer 2', 'Full-Stack Developer', 'GenAI Enthusiast', 'MCP Builder', 'Problem Solver'];
const typedEl  = document.getElementById('typed-text');
let titleIdx   = 0;
let charIdx    = 0;
let deleting   = false;

function typewrite() {
    if (!typedEl) return;
    const current = titles[titleIdx];

    if (!deleting) {
        charIdx++;
        typedEl.textContent = current.slice(0, charIdx);
        if (charIdx === current.length) {
            deleting = true;
            setTimeout(typewrite, 2200);
            return;
        }
    } else {
        charIdx--;
        typedEl.textContent = current.slice(0, charIdx);
        if (charIdx === 0) {
            deleting = false;
            titleIdx = (titleIdx + 1) % titles.length;
        }
    }

    setTimeout(typewrite, deleting ? 55 : 95);
}

// Small delay before starting typewriter so page is ready
setTimeout(typewrite, 600);

/* ===== CONTACT FORM (prevent default + feedback) ===== */
const form      = document.getElementById('contact-form');
const submitBtn = document.getElementById('submit-btn');

if (form) {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        submitBtn.textContent = 'Message Sent ✓';
        submitBtn.style.background = '#22c55e';
        submitBtn.disabled = true;
        setTimeout(() => {
            submitBtn.textContent = 'Send Message →';
            submitBtn.style.background = '';
            submitBtn.disabled = false;
            form.reset();
        }, 3500);
    });
}

/* ===== SMOOTH SKILL TAG STAGGER ON REVEAL ===== */
const skillPanelObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const tags = entry.target.querySelectorAll('.skill-tag');
            tags.forEach((tag, i) => {
                tag.style.transitionDelay = `${i * 40}ms`;
                tag.style.opacity = '0';
                tag.style.transform = 'translateY(8px)';
                requestAnimationFrame(() => {
                    setTimeout(() => {
                        tag.style.transition = 'opacity 0.35s ease, transform 0.35s ease, border-color 0.2s, color 0.2s, background 0.2s';
                        tag.style.opacity = '1';
                        tag.style.transform = 'translateY(0)';
                    }, i * 40);
                });
            });
            skillPanelObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.2 });

document.querySelectorAll('.skills-panel').forEach(p => skillPanelObserver.observe(p));
