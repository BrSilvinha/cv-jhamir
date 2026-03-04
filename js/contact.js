/* ============================================================
   CONTACT — Form (FormSubmit.co) + email obfuscation
   ============================================================ */
export function initContactForm() {

    /* ── Email obfuscation — build address in JS so bots can't scrape HTML ── */
    document.querySelectorAll('.em-link').forEach(el => {
        const addr = `${el.dataset.u}@${el.dataset.d}`;
        el.href = `mailto:${addr}`;
        /* Update visible text: social handle span or own text */
        const textTarget = el.querySelector('.em-text') ?? el;
        if (textTarget === el && el.textContent.trim() !== addr) {
            el.textContent = addr;
        } else if (textTarget !== el) {
            textTarget.textContent = addr;
        }
    });

    /* ── Contact form — FormSubmit.co (no account required) ── */
    const form    = document.getElementById('contact-form');
    const success = document.getElementById('form-success');
    if (!form) return;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const btn  = form.querySelector('.form-submit');
        const data = Object.fromEntries(new FormData(form));

        btn.disabled  = true;
        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando…';

        try {
            const res = await fetch(form.action, {
                method:  'POST',
                headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
                body:    JSON.stringify(data)
            });

            const json = await res.json();

            if (res.ok && json.success === 'true') {
                form.reset();
                success?.classList.add('visible');
                btn.innerHTML = '<i class="fas fa-paper-plane"></i> Enviar mensaje';
                setTimeout(() => success?.classList.remove('visible'), 6000);
            } else {
                throw new Error(json.message ?? 'Error del servidor');
            }
        } catch (err) {
            btn.innerHTML = '<i class="fas fa-triangle-exclamation"></i> Error — intenta de nuevo';
            console.warn('FormSubmit error:', err.message);
        } finally {
            btn.disabled = false;
        }
    });
}
