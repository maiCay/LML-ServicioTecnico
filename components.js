/**
 * Inyecta navbar y footer en todas las páginas,
 * y marca el link activo según la URL actual.
 */

async function loadComponent(selector, url) {
    const el = document.querySelector(selector);
    if (!el) return;
    try {
        const res = await fetch(url);
        if (!res.ok) throw new Error(`No se pudo cargar ${url}`);
        el.innerHTML = await res.text();
    } catch (err) {
        console.error(err);
    }
}

function markActiveLink() {
    const current = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-menu a').forEach(link => {
        const href = link.getAttribute('href').split('/').pop();
        if (href === current) {
            link.style.color = '#d35400';
            link.style.fontWeight = '700';
        }
    });
}

document.addEventListener('DOMContentLoaded', async () => {
    // Rutas relativas a la raíz del proyecto
    const base = document.querySelector('meta[name="base-path"]')?.content ?? '';

    await Promise.all([
        loadComponent('#navbar-placeholder', `${base}components/navbar.html`),
        loadComponent('#footer-placeholder', `${base}components/footer.html`),
    ]);

    markActiveLink();
});