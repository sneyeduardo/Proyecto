document.addEventListener('DOMContentLoaded', () => {
    const cards = Array.from(document.querySelectorAll('.cg-product-card'));
    const emptyState = document.getElementById('cg-empty-state');

    const searchForm = document.getElementById('cg-search-form');
    const searchScope = document.getElementById('cg-search-scope');
    const searchInput = document.getElementById('cg-search-input');

    const filterForm = document.getElementById('cg-filter-form');
    const selCat = document.getElementById('filter-categoria');
    const selSub = document.getElementById('filter-subcategoria');
    const selCiudad = document.getElementById('filter-ciudad');
    const selMun = document.getElementById('filter-municipio');
    const selPrecio = document.getElementById('filter-precio');
    const btnClear = document.getElementById('btn-clear-filters');
    const quickPills = document.querySelectorAll('[data-quick-cat]');

    let activeQuickFilter = '';

    // 1. Respaldo visual para imágenes faltantes
    document.querySelectorAll('.cg-product-card__img img').forEach((img) => {
        const applyFallback = () => {
            const icon = img.dataset.icon || 'fa-cube';
            const wrapper = img.parentElement;
            if (!wrapper) return;
            wrapper.innerHTML = `
                <div class="cg-img-placeholder">
                    <i class="fa ${icon}"></i>
                    <span>Foto</span>
                </div>
            `;
        };
        img.addEventListener('error', applyFallback);
        if (img.complete && img.naturalWidth === 0) applyFallback();
    });

    const heroImg = document.querySelector('.cg-hero__bg');
    if (heroImg) {
        heroImg.addEventListener('error', () => {
            heroImg.style.display = 'none';
        });
    }

    // 2. Motor de filtrado en vivo
    const applyFilters = () => {
        const query = (searchInput?.value || '').trim().toLowerCase();
        const scope = searchScope?.value || '';
        const cat = selCat?.value || scope || '';
        const sub = selSub?.value || '';
        const ciudad = selCiudad?.value || '';
        const mun = selMun?.value || '';
        const precioRango = selPrecio?.value || '';

        let visibleCount = 0;

        cards.forEach((card) => {
            const text = card.textContent.toLowerCase();
            const cCat = card.dataset.categoria || '';
            const cSub = card.dataset.subcategoria || '';
            const cCiudad = card.dataset.ciudad || '';
            const cMun = card.dataset.municipio || '';
            const cPrecio = parseFloat(card.dataset.precio || '0');
            const cVerificado = card.dataset.verificado === 'true';

            let match = true;
            if (query && !text.includes(query)) match = false;
            if (cat && cCat !== cat) match = false;
            if (sub && cSub !== sub) match = false;
            if (ciudad && cCiudad !== ciudad) match = false;
            if (mun && cMun !== mun) match = false;

            if (precioRango) {
                const [min, max] = precioRango.split('-').map(Number);
                if (cPrecio < min || cPrecio > max) match = false;
            }

            if (activeQuickFilter === 'verificado' && !cVerificado) {
                match = false;
            } else if (
                activeQuickFilter &&
                !['verificado', 'servicios', 'solicita'].includes(activeQuickFilter) &&
                cCat !== activeQuickFilter
            ) {
                match = false;
            }

            card.style.display = match ? '' : 'none';
            if (match) visibleCount++;
        });

        if (emptyState) emptyState.hidden = visibleCount > 0;
    };

    filterForm?.addEventListener('submit', (e) => {
        e.preventDefault();
        activeQuickFilter = '';
        applyFilters();
    });

    searchForm?.addEventListener('submit', (e) => {
        e.preventDefault();
        applyFilters();
    });

    btnClear?.addEventListener('click', () => {
        filterForm?.reset();
        searchForm?.reset();
        activeQuickFilter = '';
        document.querySelectorAll('.cg-pill').forEach((p, idx) => {
            p.classList.toggle('active', idx === 0);
        });
        applyFilters();
    });

    quickPills.forEach((btn) => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            activeQuickFilter = btn.dataset.quickCat || '';
            if (btn.classList.contains('cg-pill')) {
                document.querySelectorAll('.cg-pill').forEach((p) => p.classList.remove('active'));
                btn.classList.add('active');
            }
            applyFilters();
        });
    });
});