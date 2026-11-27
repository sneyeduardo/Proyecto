document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('cg-registro-natural-form');
    const alertBox = document.getElementById('cg-reg-alert');
    const mobileToggle = document.getElementById('cg-mobile-toggle');
    const nav = document.getElementById('cg-nav');

    const showAlert = (msg, type = 'success') => {
        if (!alertBox) return;
        alertBox.textContent = msg;
        alertBox.className = `cg-reg-alert is-${type}`;
        alertBox.hidden = false;
        alertBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    };

    // Menú móvil
    mobileToggle?.addEventListener('click', () => {
        nav?.classList.toggle('is-open');
    });

    // 1. Ojito de contraseña
    const passInput = document.getElementById('password-natural');
    const togglePassBtn = document.getElementById('toggle-pass-btn');
    togglePassBtn?.addEventListener('click', () => {
        if (!passInput) return;
        const isPass = passInput.type === 'password';
        passInput.type = isPass ? 'text' : 'password';
        const icon = togglePassBtn.querySelector('i');
        if (icon) {
            icon.classList.toggle('fa-eye', !isPass);
            icon.classList.toggle('fa-eye-slash', isPass);
        }
    });

    // 2. Controles segmentados (Tipo de perfil, Estado de vinculación, Preferencia)
    document.querySelectorAll('.cg-segmented').forEach((group) => {
        const hiddenId = group.dataset.segmented;
        const hiddenInput = document.getElementById(hiddenId);
        group.addEventListener('click', (e) => {
            const btn = e.target.closest('.cg-seg-btn');
            if (!btn) return;
            group.querySelectorAll('.cg-seg-btn').forEach((b) => b.classList.remove('active'));
            btn.classList.add('active');
            if (hiddenInput) hiddenInput.value = btn.dataset.value || '';
        });
    });

    // 3. Switch de disponibilidad
    const dispCheck = document.getElementById('disponibilidad');
    const dispLabel = document.getElementById('disponibilidad-label');
    dispCheck?.addEventListener('change', () => {
        if (dispLabel) {
            dispLabel.textContent = dispCheck.checked ? 'Disponible' : 'Ocupado';
        }
    });

    // 4. Vista previa de Foto de Perfil
    const bindImagePreview = (inputEl, previewEl, placeholderEl) => {
        inputEl?.addEventListener('change', () => {
            const file = inputEl.files?.[0];
            if (!file) return;
            const reader = new FileReader();
            reader.onload = (ev) => {
                previewEl.src = ev.target.result;
                previewEl.hidden = false;
                if (placeholderEl) placeholderEl.hidden = true;
            };
            reader.readAsDataURL(file);
        });
    };

    bindImagePreview(
        document.getElementById('foto-perfil-input'),
        document.getElementById('foto-perfil-preview'),
        document.getElementById('foto-perfil-placeholder')
    );

    // Vista previa de fotos Antes / Después del portafolio
    document.querySelectorAll('.cg-mini-upload').forEach((box) => {
        const input = box.querySelector('input[type="file"]');
        const preview = box.querySelector('.cg-mini-preview');
        const placeholder = box.querySelector('.cg-mini-placeholder');
        bindImagePreview(input, preview, placeholder);
    });

    // 5. Tags SEO interactivos (#Tag)
    const tagsBox = document.getElementById('cg-tags-box');
    const tagInput = document.getElementById('tag-input');

    tagsBox?.addEventListener('click', (e) => {
        if (e.target.tagName === 'BUTTON') {
            e.target.closest('.cg-seo-tag')?.remove();
        }
    });

    tagInput?.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ',') {
            e.preventDefault();
            let val = tagInput.value.trim().replace(/\s+/g, '');
            if (!val) return;
            if (!val.startsWith('#')) val = `#${val}`;

            const span = document.createElement('span');
            span.className = 'cg-seo-tag';
            span.innerHTML = `${val} <button type="button" aria-label="Quitar">&times;</button>`;
            tagsBox.insertBefore(span, tagInput);
            tagInput.value = '';
        }
    });

    // 6. Redes sociales (guardado temporal por red al hacer clic)
    const socialData = { instagram: '', tiktok: '', youtube: '', linkedin: '' };
    const socialWrap = document.getElementById('cg-social-input-wrap');
    const socialUrl = document.getElementById('cg-social-url');
    let activeSocial = null;

    document.querySelectorAll('.cg-social-chip').forEach((chip) => {
        chip.addEventListener('click', () => {
            const key = chip.dataset.social;
            document.querySelectorAll('.cg-social-chip').forEach((c) => c.classList.remove('active'));
            chip.classList.add('active');
            activeSocial = key;

            if (socialWrap && socialUrl) {
                socialWrap.hidden = false;
                socialUrl.placeholder = `URL o usuario de ${chip.textContent.trim()}`;
                socialUrl.value = socialData[key] || '';
                socialUrl.focus();
            }
        });
    });

    socialUrl?.addEventListener('input', () => {
        if (activeSocial) socialData[activeSocial] = socialUrl.value.trim();
    });

    // 7. Botones de la barra azul marino (Nuevo, Editar, Guardar, Eliminar)
    const resetPreviews = () => {
        document.querySelectorAll('.cg-upload-preview, .cg-mini-preview').forEach((img) => {
            img.src = '';
            img.hidden = true;
        });
        document.querySelectorAll('.cg-upload-placeholder, .cg-mini-placeholder').forEach((ph) => {
            ph.hidden = false;
        });
    };

    document.getElementById('btn-nuevo')?.addEventListener('click', () => {
        form?.reset();
        resetPreviews();
        if (dispLabel) dispLabel.textContent = 'Disponible';
        showAlert('Formulario limpio listo para un nuevo registro.', 'info');
    });

    document.getElementById('btn-editar')?.addEventListener('click', () => {
        document.getElementById('nombres')?.focus();
        showAlert('Modo edición activo. Modifica los campos y presiona Guardar Cambios.', 'info');
    });

    document.getElementById('btn-guardar')?.addEventListener('click', () => {
        showAlert('Cambios guardados en borrador correctamente (vista demo).', 'success');
    });

    document.getElementById('btn-eliminar')?.addEventListener('click', () => {
        if (confirm('¿Deseas limpiar y descartar este registro?')) {
            form?.reset();
            resetPreviews();
            showAlert('Registro eliminado de la vista temporal.', 'error');
        }
    });

    // 8. Envío principal
    form?.addEventListener('submit', (e) => {
        e.preventDefault();
        const terms = document.getElementById('acepta-terminos');
        const nombres = document.getElementById('nombres')?.value.trim();
        const numDoc = document.getElementById('num-doc')?.value.trim();

        if (!numDoc || !nombres) {
            showAlert('Por favor completa los campos obligatorios marcados con *.', 'error');
            return;
        }
        if (!terms?.checked) {
            showAlert('Debes aceptar los términos, veracidad de la información y privacidad.', 'error');
            return;
        }
        showAlert('¡Perfil registrado y publicado correctamente! (Modo demostración visual)', 'success');
    });
});