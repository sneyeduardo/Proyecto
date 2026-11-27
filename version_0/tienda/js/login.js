document.addEventListener('DOMContentLoaded', () => {
    const tabsContainer = document.getElementById('auth-tabs');
    const tabLinks = document.querySelectorAll('[data-tab]');
    const tabPanels = document.querySelectorAll('.ps-tabs .ps-tab');
    const feedback = document.getElementById('auth-feedback');

    const showFeedback = (message, type = 'success') => {
        feedback.textContent = message;
        feedback.className = `ps-auth-feedback is-${type}`;
    };

    const clearFeedback = () => {
        feedback.textContent = '';
        feedback.className = 'ps-auth-feedback';
    };

    // 1. Cambio entre Iniciar sesión, Registrarse y Recuperar contraseña
    const switchTab = (targetId) => {
        clearFeedback();

        tabPanels.forEach((panel) => {
            panel.classList.toggle('active', panel.id === targetId);
        });

        const navItems = tabsContainer.querySelectorAll('li');
        navItems.forEach((item) => {
            const link = item.querySelector('a');
            item.classList.toggle('active', link && link.dataset.tab === targetId);
        });
    };

    tabLinks.forEach((link) => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const target = link.dataset.tab;
            if (target) switchTab(target);
        });
    });

    // 2. Botón de ojito para mostrar/ocultar contraseña
    const toggleButtons = document.querySelectorAll('.ps-toggle-password');
    toggleButtons.forEach((btn) => {
        btn.addEventListener('click', () => {
            const input = document.getElementById(btn.dataset.target);
            const icon = btn.querySelector('i');
            if (!input || !icon) return;

            const isPassword = input.type === 'password';
            input.type = isPassword ? 'text' : 'password';
            icon.classList.toggle('fa-eye', !isPassword);
            icon.classList.toggle('fa-eye-slash', isPassword);
            btn.classList.toggle('is-visible', isPassword);
        });
    });

    // 3. Envío visual de formularios (modo demo sin backend)
    const formLogin = document.getElementById('form-login');
    const formRegister = document.getElementById('form-register');
    const formForgot = document.getElementById('form-forgot');

    if (formLogin) {
        formLogin.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('login-email').value.trim();
            const pass = document.getElementById('login-password').value.trim();

            if (!email || !pass) {
                showFeedback('Por favor completa tu correo y contraseña.', 'error');
                return;
            }
            showFeedback('Inicio de sesión simulado correctamente (vista demo).', 'success');
        });
    }

    if (formRegister) {
        formRegister.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('reg-name').value.trim();
            const email = document.getElementById('reg-email').value.trim();
            const pass = document.getElementById('reg-password').value;
            const confirm = document.getElementById('reg-password-confirm').value;

            if (!name || !email || !pass || !confirm) {
                showFeedback('Por favor completa todos los campos del registro.', 'error');
                return;
            }
            if (pass !== confirm) {
                showFeedback('Las contraseñas no coinciden.', 'error');
                return;
            }
            showFeedback('Registro simulado correctamente (vista demo).', 'success');
        });
    }

    if (formForgot) {
        formForgot.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('forgot-email').value.trim();

            if (!email) {
                showFeedback('Ingresa tu correo electrónico para recuperar tu cuenta.', 'error');
                return;
            }
            showFeedback('Si el correo existe, recibirás un enlace de recuperación (vista demo).', 'success');
        });
    }
});