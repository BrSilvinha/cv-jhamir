/* ============================================================
   NAV — Navigation, hamburger menu, scroll behavior
   ============================================================ */
export function initNav() {
    const navbar   = document.getElementById('navbar');
    const navLinks = document.getElementById('nav-links');
    const burger   = document.getElementById('hamburger');
    const links    = document.querySelectorAll('.nav-links a');
    const sections = document.querySelectorAll('section[id]');
    const btt      = document.getElementById('back-to-top');
    const cvBtn    = document.getElementById('cv-float-btn');

    /* Hamburger toggle */
    if (burger) {
        burger.addEventListener('click', () => {
            navLinks.classList.toggle('open');
            burger.classList.toggle('open');
        });
    }

    /* Close menu on link click */
    links.forEach(link => link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        burger.classList.remove('open');
    }));

    /* Scroll: nav style + active link + back-to-top */
    window.addEventListener('scroll', () => {
        const sy = window.scrollY;

        if (navbar) {
            navbar.style.background = sy > 60
                ? 'rgba(5,5,16,0.98)'
                : 'rgba(5,5,16,0.75)';
        }

        if (btt)   btt.classList.toggle('visible', sy > 400);
        if (cvBtn) cvBtn.classList.toggle('visible', sy > 400);

        /* Active section highlight */
        let current = '';
        sections.forEach(sec => {
            if (sy >= sec.offsetTop - 120) current = sec.getAttribute('id');
        });
        links.forEach(a => {
            a.classList.toggle('active', a.getAttribute('href') === '#' + current);
        });
    });

    /* Back-to-top button */
    if (btt) {
        btt.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
    }
}
