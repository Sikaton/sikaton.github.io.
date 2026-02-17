// Stargate: Conquest — DarkOrbit VRU Style JS

(function () {
    'use strict';

    // --- Navbar scroll effect ---
    const nav = document.getElementById('nav');

    function onScroll() {
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    }

    window.addEventListener('scroll', onScroll, { passive: true });

    // --- Scroll reveal (faction cards + download panel) ---
    const revealEls = document.querySelectorAll('.faction-card, .download-panel');

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.12 }
    );

    revealEls.forEach((el) => observer.observe(el));

    // --- Smooth scroll ---
    document.querySelectorAll('a[href^="#"]').forEach((link) => {
        link.addEventListener('click', (e) => {
            const target = document.querySelector(link.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // --- HUD progress bar animation ---
    const progressFill = document.getElementById('progressFill');
    let progress = 0;

    function animateProgress() {
        progress += (100 - progress) * 0.02;
        if (progress > 99.5) progress = 100;
        if (progressFill) {
            progressFill.style.width = progress + '%';
        }
    }

    // Simulate loading
    const progressInterval = setInterval(() => {
        animateProgress();
        if (progress >= 100) clearInterval(progressInterval);
    }, 50);

    // --- Fake FPS / PING counters ---
    const fpsEl = document.getElementById('fpsCounter');
    const pingEl = document.getElementById('pingCounter');

    function updateHudCounters() {
        if (fpsEl) {
            fpsEl.textContent = Math.floor(58 + Math.random() * 4);
        }
        if (pingEl) {
            pingEl.textContent = Math.floor(18 + Math.random() * 12) + 'ms';
        }
    }

    setInterval(updateHudCounters, 2000);

    // --- Status text cycling ---
    const statusEl = document.getElementById('statusText');
    const statusMessages = [
        'SYSTEM ONLINE',
        'SCANNING SECTOR',
        'GATE LOCK ACTIVE',
        'SHIELDS AT 100%',
        'FLEET STANDING BY',
        'HYPERSPACE READY'
    ];
    let statusIdx = 0;

    function cycleStatus() {
        statusIdx = (statusIdx + 1) % statusMessages.length;
        if (statusEl) {
            statusEl.style.opacity = '0';
            setTimeout(() => {
                statusEl.textContent = statusMessages[statusIdx];
                statusEl.style.opacity = '1';
            }, 300);
        }
    }

    setInterval(cycleStatus, 4000);

    // --- Sector cycling in HUD ---
    const sectorEl = document.getElementById('hudSector');
    const sectors = ['P3X-974', 'M4C-862', 'P2X-338', 'P3W-451', 'M7G-677', 'PBX-744'];
    let sectorIdx = 0;

    function cycleSector() {
        sectorIdx = (sectorIdx + 1) % sectors.length;
        if (sectorEl) {
            sectorEl.textContent = sectors[sectorIdx];
        }
    }

    setInterval(cycleSector, 6000);

    // --- Stat bar animation on reveal ---
    const statObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const fills = entry.target.querySelectorAll('.stat-fill');
                    fills.forEach((fill) => {
                        const w = fill.style.width;
                        fill.style.width = '0%';
                        requestAnimationFrame(() => {
                            requestAnimationFrame(() => {
                                fill.style.width = w;
                            });
                        });
                    });
                    statObserver.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.3 }
    );

    document.querySelectorAll('.faction-stats').forEach((el) => statObserver.observe(el));

})();
