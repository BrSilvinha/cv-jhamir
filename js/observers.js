/* ============================================================
   OBSERVERS — Scroll reveal, count-up, skill bar animations
   ============================================================ */

/* ── Scroll Reveal ─────────────────────────────────────── */
export function initScrollReveal() {
    const obs = new IntersectionObserver(entries => {
        entries.forEach(e => {
            if (e.isIntersecting) e.target.classList.add('visible');
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal').forEach(el => obs.observe(el));
}

/* ── Count-Up Animation ────────────────────────────────── */
export function initCountUp() {
    const obs = new IntersectionObserver(entries => {
        entries.forEach(e => {
            if (!e.isIntersecting) return;
            const el     = e.target;
            const target = parseInt(el.dataset.target, 10);
            const step   = target / 55;
            let count    = 0;

            const timer = setInterval(() => {
                count += step;
                if (count >= target) {
                    el.textContent = target + (target === 100 ? '%' : '+');
                    clearInterval(timer);
                } else {
                    el.textContent = Math.floor(count);
                }
            }, 28);

            obs.unobserve(el);
        });
    }, { threshold: 0.5 });

    document.querySelectorAll('[data-target]').forEach(el => obs.observe(el));
}

/* ── Skill Bar Animation ───────────────────────────────── */
export function initSkillBars() {
    const obs = new IntersectionObserver(entries => {
        entries.forEach(e => {
            if (!e.isIntersecting) return;
            e.target.querySelectorAll('.skill-bar-fill').forEach(bar => {
                bar.style.width = bar.dataset.w;
            });
            obs.unobserve(e.target);
        });
    }, { threshold: 0.3 });

    document.querySelectorAll('.skill-category').forEach(el => obs.observe(el));
}
