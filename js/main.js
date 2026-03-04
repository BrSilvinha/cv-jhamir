/* ============================================================
   MAIN — Entry point: imports & initializes all modules
   ============================================================ */
import { initCursor }      from './cursor.js';
import { initParticles }   from './particles.js';
import { initTyping }      from './typing.js';
import { initScrollReveal, initCountUp, initSkillBars } from './observers.js';
import { initNav }         from './nav.js';
import { initTheme }       from './theme.js';
import { initGitHubStats } from './github.js';
import { initContactForm } from './contact.js';
import { initEasterEgg }   from './easter-egg.js';

/* Run on DOM ready */
document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initCursor();
    initParticles();
    initTyping();
    initScrollReveal();
    initCountUp();
    initSkillBars();
    initNav();
    initContactForm();
    initEasterEgg();
    initGitHubStats();
});

/* Preloader — hide after page fully loads */
window.addEventListener('load', () => {
    setTimeout(() => {
        const preloader = document.getElementById('preloader');
        if (preloader) preloader.classList.add('hidden');
    }, 1900);
});
