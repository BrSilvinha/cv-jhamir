/* ============================================================
   CONTACT FORM — Formspree async submit
   ============================================================ */
export function initContactForm() {
    const form    = document.getElementById('contact-form');
    const success = document.getElementById('form-success');
    if (!form) return;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const btn = form.querySelector('.form-submit');
        btn.disabled = true;
        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando…';

        try {
            const res = await fetch(form.action, {
                method:  'POST',
                body:    new FormData(form),
                headers: { 'Accept': 'application/json' }
            });

            if (res.ok) {
                form.reset();
                success?.classList.add('visible');
                btn.innerHTML = '<i class="fas fa-paper-plane"></i> Enviar mensaje';
                btn.disabled  = false;
                setTimeout(() => success?.classList.remove('visible'), 6000);
            } else {
                throw new Error('Error en el servidor');
            }
        } catch {
            btn.innerHTML = '<i class="fas fa-triangle-exclamation"></i> Error — intenta de nuevo';
            btn.disabled  = false;
        }
    });
}
