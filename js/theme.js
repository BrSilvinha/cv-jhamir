/* ============================================================
   THEME — Dark / Light mode toggle with localStorage
   ============================================================ */
export function initTheme() {
    const btn  = document.getElementById('theme-toggle');
    const icon = btn?.querySelector('i');
    const root = document.documentElement;

    const saved = localStorage.getItem('theme') || 'dark';
    applyTheme(saved);

    btn?.addEventListener('click', () => {
        const next = root.getAttribute('data-theme') === 'green' ? 'dark' : 'green';
        applyTheme(next);
        localStorage.setItem('theme', next);
    });

    function applyTheme(theme) {
        root.setAttribute('data-theme', theme);
        if (!icon) return;
        icon.className = theme === 'green' ? 'fas fa-terminal' : 'fas fa-moon';
        btn.title = theme === 'green' ? 'Modo oscuro' : 'Modo hacker';
    }
}
