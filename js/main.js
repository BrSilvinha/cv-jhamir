/* ============================================================
   MAIN — Entry point: imports & initializes all modules
   ============================================================ */
import { initCursor }      from './cursor.js';
import { initParticles }   from './particles.js';
import { initTyping }      from './typing.js';
import { initScrollReveal, initCountUp, initSkillBars } from './observers.js';
import { initNav }         from './nav.js';

/* Run on DOM ready */
document.addEventListener('DOMContentLoaded', () => {
    initCursor();
    initParticles();
    initTyping();
    initScrollReveal();
    initCountUp();
    initSkillBars();
    initNav();
});

/* Preloader — hide after page fully loads */
window.addEventListener('load', () => {
    setTimeout(() => {
        const preloader = document.getElementById('preloader');
        if (preloader) preloader.classList.add('hidden');
    }, 1900);
});
