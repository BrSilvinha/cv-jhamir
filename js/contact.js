/* ============================================================
   CONTACT — Form (Formspree) + email obfuscation
   ============================================================ */
export function initContactForm() {

    /* ── Email obfuscation — build address in JS so bots can't scrape HTML ── */
    document.querySelectorAll('.em-link').forEach(el => {
        const addr = `${el.dataset.u}@${el.dataset.d}`;
        el.href = `mailto:${addr}`;
        const textTarget = el.querySelector('.em-text') ?? el;
        if (textTarget === el && el.textContent.trim() !== addr) {
            el.textContent = addr;
        } else if (textTarget !== el) {
            textTarget.textContent = addr;
        }
    });

    /* ── Contact form — Formspree ── */
    const form    = document.getElementById('contact-form');
    const success = document.getElementById('form-success');
    if (!form) return;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const btn = form.querySelector('.form-submit');

        btn.disabled  = true;
        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando…';

        try {
            const res  = await fetch(form.action, {
                method:  'POST',
                body:    new FormData(form),
                headers: { 'Accept': 'application/json' }
            });
            const json = await res.json();

            if (res.ok) {
                form.reset();
                success?.classList.add('visible');
                btn.innerHTML = '<i class="fas fa-paper-plane"></i> Enviar mensaje';
                setTimeout(() => success?.classList.remove('visible'), 6000);
            } else {
                throw new Error(json?.errors?.[0]?.message ?? 'Error del servidor');
            }
        } catch (err) {
            btn.innerHTML = '<i class="fas fa-triangle-exclamation"></i> Error — intenta de nuevo';
            console.warn('Formspree error:', err.message);
        } finally {
            btn.disabled = false;
        }
    });
}
