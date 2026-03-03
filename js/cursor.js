/* ============================================================
   CURSOR — Custom animated cursor
   ============================================================ */
export function initCursor() {
    const cursor   = document.getElementById('cursor');
    const follower = document.getElementById('cursor-follower');
    if (!cursor || !follower) return;

    let mx = 0, my = 0, fx = 0, fy = 0;

    document.addEventListener('mousemove', e => {
        mx = e.clientX;
        my = e.clientY;
        cursor.style.left = (mx - 5) + 'px';
        cursor.style.top  = (my - 5) + 'px';
    });

    (function animFollow() {
        fx += (mx - fx - 19) * 0.15;
        fy += (my - fy - 19) * 0.15;
        follower.style.left = fx + 'px';
        follower.style.top  = fy + 'px';
        requestAnimationFrame(animFollow);
    })();

    const hoverTargets = 'a, button, .interest-card, .project-card, .social-card, .skill-category, .skill-icon-item';
    document.querySelectorAll(hoverTargets).forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.transform = 'scale(2.5)';
            follower.style.width       = '60px';
            follower.style.height      = '60px';
            follower.style.borderColor = 'rgba(0,245,255,0.9)';
        });
        el.addEventListener('mouseleave', () => {
            cursor.style.transform = 'scale(1)';
            follower.style.width       = '38px';
            follower.style.height      = '38px';
            follower.style.borderColor = 'rgba(0,245,255,0.5)';
        });
    });
}
