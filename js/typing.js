/* ============================================================
   TYPING EFFECT — Animated role text in hero section
   ============================================================ */
const WORDS = [
    'Desarrollador Full Stack',
    'Estudiante de Sistemas',
    'PHP Developer',
    'Python Enthusiast',
    'TypeScript Lover',
    'Game Developer',
    'Nadador',
    'Cinefilo',
    'Motupe, Lambayeque',
];

export function initTyping() {
    const el = document.getElementById('typed');
    if (!el) return;

    let wordIdx = 0;
    let charIdx = 0;
    let deleting = false;

    function loop() {
        const word = WORDS[wordIdx];

        if (deleting) {
            el.textContent = word.substring(0, charIdx - 1);
            charIdx--;
        } else {
            el.textContent = word.substring(0, charIdx + 1);
            charIdx++;
        }

        if (!deleting && charIdx === word.length) {
            setTimeout(() => { deleting = true; }, 1800);
        } else if (deleting && charIdx === 0) {
            deleting = false;
            wordIdx = (wordIdx + 1) % WORDS.length;
        }

        setTimeout(loop, deleting ? 55 : 100);
    }

    loop();
}
