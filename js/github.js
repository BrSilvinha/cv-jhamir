/* ============================================================
   GITHUB — Fetch live public repo count from GitHub API
   ============================================================ */
export async function initGitHubStats() {
    try {
        const res = await fetch('https://api.github.com/users/BrSilvinha', {
            headers: { 'Accept': 'application/vnd.github.v3+json' }
        });
        if (!res.ok) return;

        const data = await res.json();

        /* Update repos stat with live count */
        const reposEl = document.querySelector('.stat-number[data-target="33"]');
        if (reposEl && data.public_repos) {
            reposEl.setAttribute('data-target', data.public_repos);
            reposEl.textContent = data.public_repos;
        }
    } catch {
        /* Silently fallback to static data */
    }
}
