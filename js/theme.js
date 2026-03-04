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
        const next = root.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
        applyTheme(next);
        localStorage.setItem('theme', next);
    });

    function applyTheme(theme) {
        root.setAttribute('data-theme', theme);
        if (!icon) return;
        icon.className = theme === 'light' ? 'fas fa-sun' : 'fas fa-moon';
    }
}
