document.addEventListener('DOMContentLoaded', () => {
    const filterBar = document.getElementById('cg-filter-bar');
    if (!filterBar) return;

    // ==================== CATÁLOGO DE 10 CATEGORÍAS ====================
    const CATEGORIES = [
        {
            id: 'materiales-obra-gruesa',
            filterKey: 'materiales',
            shortName: 'Materiales y Obra Gruesa',
            label: '1. Materiales de Construcción y Obra Gruesa',
            icon: `<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M5 6h14l1 13a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2L5 6z"/><path d="M7 6V4a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v2"/><path d="M9 13h6M12 10l-3 5h6l-3-5z"/></svg>`,
            groups: [
                {
                    title: 'Cementos, Morteros y Aditivos',
                    items: [
                        { label: 'Cemento Portland Gris (42.5 kg)', filterSub: 'cemento-bloques' },
                        { label: 'Cemento Blanco y Estructural', filterSub: 'cemento-bloques' },
                        { label: 'Pego para Cerámica y Porcelanato', filterSub: 'cemento-bloques' },
                        { label: 'Cal Hidratada y Yeso de Obra', filterSub: 'cemento-bloques' },
                        { label: 'Aditivos Impermeabilizantes y Acelerantes', filterSub: 'pintura-acabados' }
                    ]
                },
                {
                    title: 'Bloques, Ladrillos y Agregados',
                    items: [
                        { label: 'Bloques de Arcilla (10cm, 12cm, 15cm)', filterSub: 'cemento-bloques' },
                        { label: 'Bloques de Concreto y Ventilación', filterSub: 'cemento-bloques' },
                        { label: 'Arena Lavada, Polvillo y Piedra Picada', filterSub: 'cemento-bloques' },
                        { label: 'Concreto Premezclado (Despacho en Mixer)', filterSub: 'cemento-bloques' }
                    ]
                },
                {
                    title: 'Impermeabilización y Aislamiento',
                    items: [
                        { label: 'Manto Asfáltico (3mm y 4mm)', filterSub: 'pintura-acabados' },
                        { label: 'Impermeabilizante Asfáltico y Acrílico', filterSub: 'pintura-acabados' },
                        { label: 'Primer Asfáltico y Pintura Aluminio', filterSub: 'pintura-acabados' }
                    ]
                }
            ]
        },
        {
            id: 'acero-estructuras',
            filterKey: 'materiales',
            shortName: 'Acero y Estructuras',
            label: '2. Acero, Hierro y Estructuras Metálicas',
            icon: `<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M4 17l10-10 4 4-10 10-4-4z"/><path d="M11 4l9 9M3 12l9 9"/></svg>`,
            groups: [
                {
                    title: 'Acero de Refuerzo (Cabillas y Mallas)',
                    items: [
                        { label: 'Cabillas Corrugadas y Lisas', filterSub: 'acero' },
                        { label: 'Cabillas Estriadas (3/8", 1/2", 5/8", 3/4", 7/8", 1", 1 3/8")', filterSub: 'acero', defaultSelected: true },
                        { label: 'Barras Lisas y Alambrón', filterSub: 'acero' },
                        { label: 'Mallas y Elementos Armados', filterSub: 'acero' },
                        { label: 'Estribos Prefabricados, Vigas de Riostra y Castillos', filterSub: 'acero' },
                        { label: 'Alambre Dulce Recocido y Alambre de Púas', filterSub: 'acero' }
                    ]
                },
                {
                    title: 'Perfiles Estructurales y Tubería Mecánica',
                    items: [
                        { label: 'Perfiles Laminados y Soldados (Vigas IPN, IPE, UPN, HEA, HEB)', filterSub: 'acero' },
                        { label: 'Perfiles Tubulares Estructurales (ECO: Cuadrados, Rectangulares, Redondos)', filterSub: 'acero' },
                        { label: 'Ángulos, Pletinas, Tees y Barras', filterSub: 'acero' },
                        { label: 'Láminas y Planchas Metálicas (lisas, estriadas, perforadas y metal desplegado)', filterSub: 'acero' }
                    ]
                },
                {
                    title: 'Techos Metálicos y Cubiertas',
                    items: [
                        { label: 'Láminas para Techo', filterSub: 'acero' },
                        { label: 'Acerolit y Láminas Termoacústicas (UPVC / Policarbonato)', filterSub: 'acero' },
                        { label: 'Láminas de Zinc / Galvanizadas Acanaladas y Trapezoidales', filterSub: 'acero' },
                        { label: 'Láminas Tipo Teja', filterSub: 'acero' },
                        { label: 'Accesorios de Cubierta (cumbreras, canales de lluvia, tornillos)', filterSub: 'acero' }
                    ]
                }
            ]
        },
        {
            id: 'madera-drywall',
            filterKey: 'acabados',
            shortName: 'Madera y Drywall',
            label: '3. Madera, Tabiquería Seca (Drywall) y Carpintería',
            icon: `<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="4" y="4" width="12" height="16" rx="1"/><path d="M16 7h4v13h-4M8 4v16M12 4v16"/></svg>`,
            groups: [
                {
                    title: 'Sistemas Drywall y Techos Rasos',
                    items: [
                        { label: 'Láminas de Drywall (1/2", Resistente a Humedad y Fuego)', filterSub: 'pintura-acabados' },
                        { label: 'Perfiles Galvanizados (Paral, Riel, Omega y Esquinero)', filterSub: 'pintura-acabados' },
                        { label: 'Masilla, Cinta de Papel y Malla para Juntas', filterSub: 'pintura-acabados' },
                        { label: 'Láminas de Fibrocemento y Techos Acústicos', filterSub: 'pintura-acabados' }
                    ]
                },
                {
                    title: 'Maderas y Carpintería de Obra',
                    items: [
                        { label: 'Tablas, Listones y Cuartones para Encofrado', filterSub: 'pintura-acabados' },
                        { label: 'Madera Contrachapada (Playwood) y MDF', filterSub: 'pintura-acabados' },
                        { label: 'Puertas Entamboradas, Marcos y Cerraduras', filterSub: 'pintura-acabados' }
                    ]
                }
            ]
        },
        {
            id: 'acabados-pinturas',
            filterKey: 'acabados',
            shortName: 'Acabados y Pinturas',
            label: '4. Acabados, Revestimientos y Pinturas',
            icon: `<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="4" y="3" width="14" height="6" rx="1.5"/><path d="M18 6h2v4l-8 2v9"/></svg>`,
            groups: [
                {
                    title: 'Pinturas y Recubrimientos',
                    items: [
                        { label: 'Pintura de Caucho Interior y Exterior (Galón / Cuñete)', filterSub: 'pintura-acabados' },
                        { label: 'Esmaltes, Anticorrosivos y Fondo Epóxico', filterSub: 'pintura-acabados' },
                        { label: 'Grafiado, Pasta Profesional y Selladores', filterSub: 'pintura-acabados' }
                    ]
                },
                {
                    title: 'Pisos y Revestimientos',
                    items: [
                        { label: 'Cerámica, Porcelanato y Mosaicos', filterSub: 'pintura-acabados' },
                        { label: 'Granito, Mármol y Cuarzo para Topes', filterSub: 'pintura-acabados' },
                        { label: 'Pisos Vinílicos SPC y Laminados', filterSub: 'pintura-acabados' }
                    ]
                }
            ]
        },
        {
            id: 'plomeria-hidraulica',
            filterKey: 'acabados',
            shortName: 'Plomería y Sanitarios',
            label: '5. Plomería, Sanitarios y Sistemas Hidráulicos',
            icon: `<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M4 10h6v6h4v-4h6"/><circle cx="7" cy="10" r="2"/><path d="M17 12v6"/></svg>`,
            groups: [
                {
                    title: 'Tuberías y Conexiones',
                    items: [
                        { label: 'Tubos de PVC Aguas Blancas y Aguas Negras', filterSub: 'electricidad' },
                        { label: 'Tubería Termofusión PPR y Pavco', filterSub: 'electricidad' },
                        { label: 'Llaves de Paso, Válvulas Check y Conexiones', filterSub: 'electricidad' }
                    ]
                },
                {
                    title: 'Almacenamiento y Bombeo',
                    items: [
                        { label: 'Tanques de Agua Cilíndricos y Horizontales (500L a 10.000L)', filterSub: 'electricidad' },
                        { label: 'Bombas de Agua, Hidroneumáticos y Presurizadores', filterSub: 'electricidad' }
                    ]
                },
                {
                    title: 'Salas de Baño y Grifería',
                    items: [
                        { label: 'Inodoros, Lavamanos y Pedestales', filterSub: 'pintura-acabados' },
                        { label: 'Griferías, Duchas y Fregaderos de Acero Inoxidable', filterSub: 'pintura-acabados' }
                    ]
                }
            ]
        },
        {
            id: 'electricidad-energia',
            filterKey: 'ferreteria',
            shortName: 'Electricidad y Energía',
            label: '6. Electricidad, Iluminación y Energía',
            icon: `<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M9 18h6M10 21h4M12 2a7 7 0 0 0-4 12.7V17h8v-2.3A7 7 0 0 0 12 2z"/></svg>`,
            groups: [
                {
                    title: 'Conductores y Canalización',
                    items: [
                        { label: 'Cables Eléctricos THW / THHN (Nro 14, 12, 10, 8 AWG)', filterSub: 'electricidad' },
                        { label: 'Tubería EMT, Conduit PVC y Bandejas Portacables', filterSub: 'electricidad' },
                        { label: 'Tableros Eléctricos, Breakers y Protectores de Voltaje', filterSub: 'electricidad' }
                    ]
                },
                {
                    title: 'Iluminación y Respaldo',
                    items: [
                        { label: 'Reflectores LED, Paneles y Luminarias Industriales', filterSub: 'electricidad' },
                        { label: 'Plantas Eléctricas, Inversores y Sistemas Solares', filterSub: 'electricidad' }
                    ]
                }
            ]
        },
        {
            id: 'climatizacion-hvac',
            filterKey: 'ferreteria',
            shortName: 'Climatización y Gas',
            label: '7. Climatización (HVAC), Gas y Sistemas Contra Incendio',
            icon: `<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="3" y="5" width="10" height="14" rx="2"/><path d="M16 8h5M16 12h4M16 16h5"/></svg>`,
            groups: [
                {
                    title: 'Aire Acondicionado y Ductería',
                    items: [
                        { label: 'Equipos Split, Centrales y Chillers Comerciales', filterSub: 'herramientas' },
                        { label: 'Tubería de Cobre, Aislante Armaflex y Gas Refrigerante', filterSub: 'herramientas' }
                    ]
                },
                {
                    title: 'Detección y Extinción de Incendios',
                    items: [
                        { label: 'Extintores PQS / CO2, Gabinetes y Mangueras', filterSub: 'herramientas' },
                        { label: 'Rociadores (Sprinklers), Bombas y Centrales de Alarma', filterSub: 'herramientas' }
                    ]
                }
            ]
        },
        {
            id: 'ferreteria-epp',
            filterKey: 'ferreteria',
            shortName: 'Ferretería y EPP',
            label: '8. Ferretería General, Herramientas y Seguridad Industrial',
            icon: `<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M14 7h6v5h-6zM3 8h11v4H3zM7 12v7h3l1-7"/></svg>`,
            groups: [
                {
                    title: 'Herramientas Eléctricas y Manuales',
                    items: [
                        { label: 'Taladros Percutores, Esmeriles y Rotomartillos', filterSub: 'herramientas' },
                        { label: 'Equipos de Soldadura Inverter y Electrodos', filterSub: 'herramientas' },
                        { label: 'Tornillería, Anclajes Expansivos, Discos y Brocas', filterSub: 'herramientas' }
                    ]
                },
                {
                    title: 'Seguridad Industrial (EPP)',
                    items: [
                        { label: 'Cascos, Botas Punta de Acero y Arneses de Altura', filterSub: 'herramientas' },
                        { label: 'Guantes, Lentes de Seguridad y Chalecos Reflectivos', filterSub: 'herramientas' }
                    ]
                }
            ]
        },
        {
            id: 'maquinaria-andamios',
            filterKey: 'maquinaria',
            shortName: 'Maquinaria y Andamiaje',
            label: '9. Maquinaria Pesada, Equipos Livianos y Andamiaje',
            icon: `<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M3 16h12v-5H7l-4 5zM15 12l4-5 2 2-3 5"/><circle cx="7" cy="18" r="2"/><circle cx="13" cy="18" r="2"/></svg>`,
            groups: [
                {
                    title: 'Equipos Livianos y Andamios',
                    items: [
                        { label: 'Andamios Metálicos, Puntales y Formaletas', filterSub: 'herramientas' },
                        { label: 'Mezcladoras de Concreto (Trompos) y Vibradores', filterSub: 'herramientas' },
                        { label: 'Ranas Compactadoras y Cortadoras de Pavimento', filterSub: 'herramientas' }
                    ]
                },
                {
                    title: 'Maquinaria Pesada (Venta y Alquiler)',
                    items: [
                        { label: 'Retroexcavadoras, Minicargadores y Grúas', filterSub: 'herramientas' },
                        { label: 'Camiones Volteo, Plataformas y Transporte de Carga', filterSub: 'herramientas' }
                    ]
                }
            ]
        },
        {
            id: 'servicios-ingenieria',
            filterKey: '',
            shortName: 'Servicios e Ingeniería',
            label: '10. Servicios de Ingeniería, Arquitectura y Ejecución de Obra',
            icon: `<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="3" y="4" width="18" height="14" rx="1.5"/><path d="M7 10h6M7 14h4M16 14l2 5M14 19h6"/></svg>`,
            groups: [
                {
                    title: 'Proyectos, Cálculo y Topografía',
                    items: [
                        { label: 'Cálculo Estructural y Diseño Arquitectónico', filterSub: '' },
                        { label: 'Levantamientos Topográficos y Estudios de Suelo', filterSub: '' },
                        { label: 'Presupuestos, Cómputos Métricos e Inspección de Obra', filterSub: '' }
                    ]
                },
                {
                    title: 'Ejecución y Contratistas',
                    items: [
                        { label: 'Construcción Civil, Galpones y Remodelaciones', filterSub: '' },
                        { label: 'Instalaciones Eléctricas, Plomería y Drywall', filterSub: '' }
                    ]
                }
            ]
        }
    ];

    // ==================== CIUDADES Y MUNICIPIOS DE VENEZUELA ====================
    const LOCATIONS = {
        caracas: {
            label: 'Caracas',
            municipios: [
                { value: 'chacao', label: 'Chacao' },
                { value: 'baruta', label: 'Baruta' },
                { value: 'sucre', label: 'Sucre' },
                { value: 'el-hatillo', label: 'El Hatillo' },
                { value: 'libertador', label: 'Libertador' }
            ]
        },
        valencia: {
            label: 'Valencia',
            municipios: [
                { value: 'libertador', label: 'Valencia / Libertador' },
                { value: 'naguanagua', label: 'Naguanagua' },
                { value: 'san-diego', label: 'San Diego' },
                { value: 'los-guayos', label: 'Los Guayos' }
            ]
        },
        maracaibo: {
            label: 'Maracaibo',
            municipios: [
                { value: 'libertador', label: 'Maracaibo Centro' },
                { value: 'san-francisco', label: 'San Francisco' },
                { value: 'cabimas', label: 'Cabimas' }
            ]
        },
        'puerto-ordaz': {
            label: 'Puerto Ordaz',
            municipios: [
                { value: 'caroni', label: 'Caroní' },
                { value: 'angostura', label: 'Angostura del Orinoco' }
            ]
        },
        barquisimeto: {
            label: 'Barquisimeto',
            municipios: [
                { value: 'iribarren', label: 'Iribarren' },
                { value: 'palavecino', label: 'Palavecino' }
            ]
        },
        merida: {
            label: 'Mérida',
            municipios: [
                { value: 'libertador', label: 'Libertador' },
                { value: 'campo-elias', label: 'Campo Elías' }
            ]
        }
    };

    const PRICE_RANGES = [
        { value: '', label: 'Cualquier precio' },
        { value: '0-25', label: 'Hasta $25' },
        { value: '25-100', label: '$25 a $100' },
        { value: '100-500', label: '$100 a $500' },
        { value: '500-99999', label: 'Más de $500' }
    ];

    // ==================== ESTADO INTERNO Y ELEMENTOS ====================
    let activeCatIndex = 1; // Por defecto resalta la Categoría 2 (igual al mockup)
    let selectedCategoryObj = null;
    let selectedSubItem = CATEGORIES[1].groups[0].items[1]; // Cabillas Estriadas premarcada visualmente
    let selectedCiudad = '';
    let selectedMunicipio = '';
    let selectedPrecio = '';

    const triggers = document.querySelectorAll('[data-dd-trigger]');
    const panels = document.querySelectorAll('[data-dd-panel]');
    const mmSidebar = document.getElementById('cg-megamenu-sidebar');
    const mmGroups = document.getElementById('cg-megamenu-groups');
    const mmBtnAll = document.getElementById('cg-mm-btn-all');
    const mmBtnApply = document.getElementById('cg-mm-btn-apply');

    const inputCat = document.getElementById('filter-categoria');
    const inputSub = document.getElementById('filter-subcategoria');
    const inputCiudad = document.getElementById('filter-ciudad');
    const inputMun = document.getElementById('filter-municipio');
    const inputPrecio = document.getElementById('filter-precio');
    const filterForm = document.getElementById('cg-filter-form');

    const setTriggerText = (name, text, hasValue) => {
        const btn = document.querySelector(`[data-dd-trigger="${name}"]`);
        const label = btn?.querySelector('.cg-trigger-label');
        if (!btn || !label) return;
        label.textContent = text || label.dataset.default;
        btn.classList.toggle('has-value', Boolean(hasValue));
    };

    const closeAllPanels = () => {
        panels.forEach((p) => (p.hidden = true));
        triggers.forEach((t) => {
            t.classList.remove('is-open');
            t.setAttribute('aria-expanded', 'false');
        });
    };

    const openPanel = (name) => {
        const panel = document.querySelector(`[data-dd-panel="${name}"]`);
        const trigger = document.querySelector(`[data-dd-trigger="${name}"]`);
        if (!panel || !trigger) return;

        const wasOpen = !panel.hidden;
        closeAllPanels();

        if (!wasOpen) {
            panel.hidden = false;
            trigger.classList.add('is-open');
            trigger.setAttribute('aria-expanded', 'true');
        }
    };

    const triggerLiveFilter = () => {
        filterForm?.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
    };

    // ==================== RENDER MEGA-MENÚ ====================
    const renderMegaSidebar = () => {
        if (!mmSidebar) return;
        mmSidebar.innerHTML = CATEGORIES.map((cat, idx) => `
            <button type="button" class="cg-mm-cat-item ${idx === activeCatIndex ? 'is-active' : ''}" data-cat-idx="${idx}">
                <span class="cg-mm-cat-icon">${cat.icon}</span>
                <span class="cg-mm-cat-text">${cat.label}</span>
            </button>
        `).join('');
    };

    const renderMegaGroups = () => {
        if (!mmGroups) return;
        const cat = CATEGORIES[activeCatIndex];
        if (!cat) return;

        mmGroups.innerHTML = cat.groups.map((grp, gIdx) => `
            <div class="cg-mm-group">
                <h4 class="cg-mm-group__title">${grp.title}</h4>
                <ul class="cg-mm-sublist">
                    ${grp.items.map((item, iIdx) => {
                        const isSel = selectedSubItem && selectedSubItem.label === item.label;
                        return `
                            <li>
                                <button type="button" class="cg-mm-sub-btn ${isSel ? 'is-selected' : ''}" data-g-idx="${gIdx}" data-i-idx="${iIdx}">
                                    <span class="cg-sub-check"><i class="fa fa-check"></i></span>
                                    <span>${item.label}</span>
                                </button>
                            </li>
                        `;
                    }).join('')}
                </ul>
            </div>
        `).join('');

        if (mmBtnAll) {
            mmBtnAll.querySelector('span').textContent = `Ver todos en ${cat.shortName}`;
        }
    };

    // ==================== RENDER POPOVER SUBCATEGORÍA ====================
    const renderSubcatPopover = () => {
        const list = document.getElementById('cg-subcat-list');
        const title = document.getElementById('cg-subcat-title');
        if (!list) return;

        const cat = selectedCategoryObj || CATEGORIES[activeCatIndex];
        if (title) title.textContent = `Subcategorías • ${cat.shortName}`;

        const allItems = cat.groups.flatMap((g) => g.items);
        list.innerHTML = allItems.map((item) => {
            const isSel = selectedSubItem && selectedSubItem.label === item.label;
            return `
                <button type="button" class="cg-dd-option ${isSel ? 'is-selected' : ''}" data-sub-label="${item.label}" data-sub-key="${item.filterSub || ''}">
                    <span>${item.label}</span>
                    <span class="cg-opt-check"><i class="fa fa-check"></i></span>
                </button>
            `;
        }).join('');
    };

    // ==================== RENDER POPOVER CIUDAD Y MUNICIPIO ====================
    const renderCiudadPopover = () => {
        const list = document.getElementById('cg-ciudad-list');
        if (!list) return;

        const entries = Object.entries(LOCATIONS);
        list.innerHTML = `
            <button type="button" class="cg-dd-option ${!selectedCiudad ? 'is-selected' : ''}" data-ciudad="">
                <span>Todas las ciudades</span>
                <span class="cg-opt-check"><i class="fa fa-check"></i></span>
            </button>
            ${entries.map(([key, info]) => `
                <button type="button" class="cg-dd-option ${selectedCiudad === key ? 'is-selected' : ''}" data-ciudad="${key}">
                    <span>${info.label}</span>
                    <span class="cg-opt-check"><i class="fa fa-check"></i></span>
                </button>
            `).join('')}
        `;
    };

    const renderMunicipioPopover = () => {
        const list = document.getElementById('cg-municipio-list');
        const title = document.getElementById('cg-municipio-title');
        if (!list) return;

        const loc = LOCATIONS[selectedCiudad];
        const municipios = loc
            ? loc.municipios
            : [
                { value: 'chacao', label: 'Chacao (Caracas)' },
                { value: 'baruta', label: 'Baruta (Caracas)' },
                { value: 'sucre', label: 'Sucre (Caracas)' },
                { value: 'libertador', label: 'Libertador' },
                { value: 'caroni', label: 'Caroní (Puerto Ordaz)' }
            ];

        if (title) {
            title.textContent = loc ? `Municipios de ${loc.label}` : 'Municipios principales';
        }

        list.innerHTML = `
            <button type="button" class="cg-dd-option ${!selectedMunicipio ? 'is-selected' : ''}" data-mun="">
                <span>Todos los municipios</span>
                <span class="cg-opt-check"><i class="fa fa-check"></i></span>
            </button>
            ${municipios.map((m) => `
                <button type="button" class="cg-dd-option ${selectedMunicipio === m.value ? 'is-selected' : ''}" data-mun="${m.value}">
                    <span>${m.label}</span>
                    <span class="cg-opt-check"><i class="fa fa-check"></i></span>
                </button>
            `).join('')}
        `;
    };

    // ==================== RENDER POPOVER PRECIO ====================
    const renderPrecioPopover = () => {
        const list = document.getElementById('cg-precio-list');
        if (!list) return;

        list.innerHTML = PRICE_RANGES.map((r) => `
            <button type="button" class="cg-dd-option ${selectedPrecio === r.value ? 'is-selected' : ''}" data-precio="${r.value}" data-precio-label="${r.label}">
                <span>${r.label}</span>
                <span class="cg-opt-check"><i class="fa fa-check"></i></span>
            </button>
        `).join('');
    };

    // ==================== EVENTOS ====================
    triggers.forEach((btn) => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const target = btn.dataset.ddTrigger;
            if (target === 'subcategoria') renderSubcatPopover();
            if (target === 'municipio') renderMunicipioPopover();
            openPanel(target);
        });
    });

    // Cambiar categoría activa en el Mega-Menú (hover o clic)
    const selectSidebarCategory = (idx) => {
        if (idx === activeCatIndex) return;
        activeCatIndex = idx;
        renderMegaSidebar();
        renderMegaGroups();
    };

    mmSidebar?.addEventListener('click', (e) => {
        const item = e.target.closest('.cg-mm-cat-item');
        if (!item) return;
        selectSidebarCategory(Number(item.dataset.catIdx));
    });

    mmSidebar?.addEventListener('mouseover', (e) => {
        if (window.innerWidth < 992) return;
        const item = e.target.closest('.cg-mm-cat-item');
        if (!item) return;
        selectSidebarCategory(Number(item.dataset.catIdx));
    });

    // Seleccionar subcategoría en panel derecho
    mmGroups?.addEventListener('click', (e) => {
        const btn = e.target.closest('.cg-mm-sub-btn');
        if (!btn) return;
        const cat = CATEGORIES[activeCatIndex];
        const gIdx = Number(btn.dataset.gIdx);
        const iIdx = Number(btn.dataset.iIdx);
        selectedCategoryObj = cat;
        selectedSubItem = cat.groups[gIdx].items[iIdx];
        renderMegaGroups();
    });

    // Botón "Ver todos en [Categoría]"
    mmBtnAll?.addEventListener('click', () => {
        const cat = CATEGORIES[activeCatIndex];
        selectedCategoryObj = cat;
        selectedSubItem = null;
        if (inputCat) inputCat.value = cat.filterKey;
        if (inputSub) inputSub.value = '';
        setTriggerText('categoria', cat.shortName, true);
        setTriggerText('subcategoria', '', false);
        closeAllPanels();
        triggerLiveFilter();
    });

    // Botón rojo "Filtrar subcategoría seleccionada"
    mmBtnApply?.addEventListener('click', () => {
        const cat = CATEGORIES[activeCatIndex];
        selectedCategoryObj = cat;
        if (inputCat) inputCat.value = cat.filterKey;
        setTriggerText('categoria', cat.shortName, true);

        if (selectedSubItem) {
            if (inputSub) inputSub.value = selectedSubItem.filterSub || '';
            setTriggerText('subcategoria', selectedSubItem.label, true);
        }
        closeAllPanels();
        triggerLiveFilter();
    });

    // Clic en opciones de Subcategoría
    document.getElementById('cg-subcat-list')?.addEventListener('click', (e) => {
        const opt = e.target.closest('.cg-dd-option');
        if (!opt) return;
        const label = opt.dataset.subLabel;
        const key = opt.dataset.subKey;
        selectedSubItem = { label, filterSub: key };
        if (inputSub) inputSub.value = key;
        setTriggerText('subcategoria', label, true);
        closeAllPanels();
        triggerLiveFilter();
    });

    // Clic en opciones de Ciudad
    document.getElementById('cg-ciudad-list')?.addEventListener('click', (e) => {
        const opt = e.target.closest('.cg-dd-option');
        if (!opt) return;
        selectedCiudad = opt.dataset.ciudad || '';
        selectedMunicipio = '';
        if (inputCiudad) inputCiudad.value = selectedCiudad;
        if (inputMun) inputMun.value = '';
        setTriggerText('ciudad', selectedCiudad ? LOCATIONS[selectedCiudad].label : '', Boolean(selectedCiudad));
        setTriggerText('municipio', '', false);
        renderCiudadPopover();
        renderMunicipioPopover();
        closeAllPanels();
        triggerLiveFilter();
    });

    // Clic en opciones de Municipio
    document.getElementById('cg-municipio-list')?.addEventListener('click', (e) => {
        const opt = e.target.closest('.cg-dd-option');
        if (!opt) return;
        selectedMunicipio = opt.dataset.mun || '';
        if (inputMun) inputMun.value = selectedMunicipio;
        setTriggerText('municipio', selectedMunicipio ? opt.textContent.trim() : '', Boolean(selectedMunicipio));
        renderMunicipioPopover();
        closeAllPanels();
        triggerLiveFilter();
    });

    // Clic en opciones de Precio
    document.getElementById('cg-precio-list')?.addEventListener('click', (e) => {
        const opt = e.target.closest('.cg-dd-option');
        if (!opt) return;
        selectedPrecio = opt.dataset.precio || '';
        if (inputPrecio) inputPrecio.value = selectedPrecio;
        setTriggerText('precio', selectedPrecio ? opt.dataset.precioLabel : '', Boolean(selectedPrecio));
        renderPrecioPopover();
        closeAllPanels();
        triggerLiveFilter();
    });

    // Precio personalizado Mín / Máx
    document.getElementById('cg-price-apply')?.addEventListener('click', () => {
        const min = document.getElementById('cg-price-min')?.value || '0';
        const max = document.getElementById('cg-price-max')?.value || '99999';
        selectedPrecio = `${min}-${max}`;
        if (inputPrecio) inputPrecio.value = selectedPrecio;
        setTriggerText('precio', `$${min} - $${max}`, true);
        closeAllPanels();
        triggerLiveFilter();
    });

    // Sincronizar botón Limpiar
    document.getElementById('btn-clear-filters')?.addEventListener('click', () => {
        selectedCategoryObj = null;
        selectedSubItem = null;
        selectedCiudad = '';
        selectedMunicipio = '';
        selectedPrecio = '';
        [inputCat, inputSub, inputCiudad, inputMun, inputPrecio].forEach((el) => {
            if (el) el.value = '';
        });
        ['categoria', 'subcategoria', 'ciudad', 'municipio', 'precio'].forEach((n) => setTriggerText(n, '', false));
        const pMin = document.getElementById('cg-price-min');
        const pMax = document.getElementById('cg-price-max');
        if (pMin) pMin.value = '';
        if (pMax) pMax.value = '';
        renderMegaGroups();
        renderCiudadPopover();
        renderMunicipioPopover();
        renderPrecioPopover();
        closeAllPanels();
    });

    // Cerrar al hacer clic afuera o pulsar ESC
    document.addEventListener('click', (e) => {
        if (!filterBar.contains(e.target)) closeAllPanels();
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeAllPanels();
    });

    // Inicializar contenido
    renderMegaSidebar();
    renderMegaGroups();
    renderCiudadPopover();
    renderMunicipioPopover();
    renderPrecioPopover();
});