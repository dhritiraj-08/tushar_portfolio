// Navbar: transparent at top, dark on scroll
const navbar = document.querySelector('.navbar');
if (navbar) {
    window.addEventListener('scroll', () => {
        navbar.classList.toggle('scrolled', window.scrollY > 50);
    });
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href*="#"]').forEach(link => {
    link.addEventListener('click', e => {
        const href = link.getAttribute('href');
        const hashIndex = href.indexOf('#');
        if (hashIndex === -1) return;
        const hash = href.slice(hashIndex);
        const target = document.querySelector(hash);
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Mobile menu toggle
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
        const isOpen = navLinks.style.display === 'flex';
        navLinks.style.display = isOpen ? 'none' : 'flex';
        navLinks.style.position = 'absolute';
        navLinks.style.top = '100%';
        navLinks.style.left = '0';
        navLinks.style.width = '100%';
        navLinks.style.flexDirection = 'column';
        navLinks.style.background = 'rgba(10,10,10,0.98)';
        navLinks.style.padding = '2rem';
        navLinks.style.gap = '2rem';
    });
}

// 3D tilt on poster cells
document.querySelectorAll('.poster-cell').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const rotateX = (((e.clientY - rect.top) / rect.height) - 0.5) * -20;
        const rotateY = (((e.clientX - rect.left) / rect.width) - 0.5) * 20;
        card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
    });
    card.addEventListener('mouseleave', () => { card.style.transform = ''; });
});

// ── Optimized Video Loading ──
// Sections 1 & 2 are primary — autoplay attribute handles them
document.querySelectorAll('.hs1 video, .hero-section2 video').forEach(v => {
    v.play().catch(() => {});
});

// All other videos are lazy — load src only when near viewport
const lazyLoader = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        const video = entry.target;
        if (entry.isIntersecting) {
            const source = video.querySelector('source[data-src]');
            if (source) {
                source.src = source.dataset.src;
                source.removeAttribute('data-src');
                video.load();
            }
            video.play().catch(() => {});
        } else {
            video.pause();
        }
    });
}, { rootMargin: '200px 0px', threshold: 0.1 });

document.querySelectorAll('video[data-lazy]').forEach(v => lazyLoader.observe(v));

// ── Per-video mute/unmute buttons ──
const mutedSVG = `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/></svg>`;
const unmutedSVG = `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/></svg>`;

document.querySelectorAll('video').forEach(video => {
    if (video.closest('.no-sound')) return;
    const parent = video.parentElement;
    if (parent.classList.contains('vid-wrap')) return;

    const wrap = document.createElement('div');
    wrap.classList.add('vid-wrap');
    parent.insertBefore(wrap, video);
    wrap.appendChild(video);

    const btn = document.createElement('button');
    btn.classList.add('vid-mute-btn');
    btn.setAttribute('aria-label', 'Toggle sound');
    btn.innerHTML = mutedSVG;
    wrap.appendChild(btn);

    btn.addEventListener('click', () => {
        video.muted = !video.muted;
        btn.innerHTML = video.muted ? mutedSVG : unmutedSVG;
    });
});

// Page load fade in
window.addEventListener('load', () => {
    document.body.style.opacity = '1';
});

// Contact form AJAX submit
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const btn = contactForm.querySelector('.hc-btn');
        const msg = document.getElementById('formMsg');
        btn.textContent = 'Sending...';
        btn.disabled = true;

        try {
            const res = await fetch(contactForm.action, {
                method: 'POST',
                headers: { 'x-requested-with': 'XMLHttpRequest' },
                body: new FormData(contactForm)
            });
            const data = await res.json();
            if (data.success) {
                btn.textContent = '✓ Sent Successfully';
                btn.style.borderColor = '#7fff7f';
                btn.style.color = '#7fff7f';
                if (msg) msg.textContent = '';
                contactForm.reset();
                setTimeout(() => {
                    btn.textContent = 'Send Message';
                    btn.style.borderColor = '';
                    btn.style.color = '';
                    btn.disabled = false;
                }, 3000);
            } else {
                btn.textContent = 'Send Message';
                btn.disabled = false;
                if (msg) { msg.textContent = data.error || 'Something went wrong.'; msg.style.color = '#ff7f7f'; }
            }
        } catch {
            btn.textContent = 'Send Message';
            btn.disabled = false;
            if (msg) { msg.textContent = 'Network error. Please try again.'; msg.style.color = '#ff7f7f'; }
        }
    });
}
