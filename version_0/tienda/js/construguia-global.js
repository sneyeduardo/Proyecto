document.addEventListener('DOMContentLoaded', () => {
    // 1. Menú móvil
    const mobileToggle = document.getElementById('cg-mobile-toggle');
    const nav = document.getElementById('cg-nav');
    mobileToggle?.addEventListener('click', () => {
        nav?.classList.toggle('is-open');
    });

    // 2. Boletín (demo)
    const newsletterForm = document.getElementById('cg-newsletter-form');
    newsletterForm?.addEventListener('submit', (e) => {
        e.preventDefault();
        const emailInput = document.getElementById('cg-newsletter-email');
        if (emailInput && emailInput.value.trim()) {
            alert(`¡Gracias por suscribirte a ConstruGuía con ${emailInput.value.trim()}!`);
            emailInput.value = '';
        }
    });

    // 3. Botón volver arriba
    const backToTop = document.getElementById('cg-back-to-top');
    window.addEventListener('scroll', () => {
        if (!backToTop) return;
        backToTop.classList.toggle('visible', window.scrollY > 300);
    });
    backToTop?.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // 4. Agente IA Pino (global en todas las vistas)
    const aiToggle = document.getElementById('cg-ai-toggle');
    const aiChat = document.getElementById('cg-ai-chat');
    const aiClose = document.getElementById('cg-ai-close');
    const aiForm = document.getElementById('cg-ai-form');
    const aiInput = document.getElementById('cg-ai-input');
    const aiMessages = document.getElementById('cg-ai-messages');
    const aiTyping = document.getElementById('cg-ai-typing');
    const quickChipsContainer = document.getElementById('cg-ai-quick-chips');

    const scrollToLastMessage = () => {
        if (aiMessages) aiMessages.scrollTop = aiMessages.scrollHeight;
    };

    aiToggle?.addEventListener('click', () => {
        aiToggle.hidden = true;
        aiChat.hidden = false;
        aiInput?.focus();
    });

    aiClose?.addEventListener('click', () => {
        aiChat.hidden = true;
        aiToggle.hidden = false;
    });

    const speakPinoIA = (userMsgText, intent = '') => {
        if (aiTyping) {
            aiMessages.appendChild(aiTyping);
            aiTyping.hidden = false;
            scrollToLastMessage();
        }

        let pinoResponse = 'Interesante consulta. Como tu asesor de ConstruGuía, estoy analizando los proveedores y mayoristas de nuestra base para darte la cotización más exacta. ¿Quieres que busque precios o prefieres ver la lista de verificados?';
        const token = userMsgText.toLowerCase();

        if (intent === 'suscriptores' || token.includes('suscriptor') || token.includes('proveedor')) {
            pinoResponse = '¡Claro! En Caracas contamos con <strong>Ferretería Central Caracas</strong> y <strong>Bloquera El Marqués</strong>, ambos con stock inmediato de agregados y acero.';
            document.querySelector('[data-quick-cat="verificado"]')?.click();
        } else if (intent === 'cotizacion' || token.includes('cotiz') || token.includes('cuanto') || token.includes('precio')) {
            pinoResponse = '¡Entendido! Para cotizar al mayor acero, cemento o andamios en ConstruGuía, indícame la cantidad y ciudad de despacho. Puedo conectarte directamente con <strong>Aceros Orinoco C.A.</strong> o <strong>Hidráulica del Centro</strong>.';
        } else if (intent === 'catalogo' || token.includes('catalogo') || token.includes('producto') || token.includes('buscar')) {
            pinoResponse = '¡Perfecto! Nuestro catálogo tiene todo para tu obra: acero, cemento, taladros y drywall. Puedes explorar todas las categorías desde la barra superior.';
            document.getElementById('btn-clear-filters')?.click();
        } else if (token.includes('hola') || token.includes('buen')) {
            pinoResponse = '¡Hola! Qué gusto saludarte. Soy Pino, tu Asistente IA de ConstruGuía. ¿En qué proyecto o compra de materiales te puedo asesorar hoy?';
        }

        setTimeout(() => {
            if (aiTyping) aiTyping.hidden = true;

            const botMsg = document.createElement('div');
            botMsg.className = 'cg-msg cg-msg--bot';
            botMsg.innerHTML = `
                <div class="cg-msg__avatar">
                    <img src="/img/pino-avatar.jpg" alt="P" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex'">
                    <span class="cg-ai-chat__avatar-fallback"><i class="fa fa-user"></i></span>
                </div>
                <div class="cg-msg__content">
                    <div class="cg-msg__text">${pinoResponse}</div>
                </div>
            `;
            aiMessages.appendChild(botMsg);
            scrollToLastMessage();
        }, 1000 + Math.random() * 600);
    };

    aiForm?.addEventListener('submit', (e) => {
        e.preventDefault();
        const text = aiInput.value.trim();
        if (!text) return;

        const userMsg = document.createElement('div');
        userMsg.className = 'cg-msg cg-msg--user';
        userMsg.innerHTML = `<div class="cg-msg__text">${text}</div>`;
        aiMessages.appendChild(userMsg);

        aiInput.value = '';
        scrollToLastMessage();
        speakPinoIA(text);
    });

    quickChipsContainer?.addEventListener('click', (e) => {
        const chip = e.target.closest('.cg-chip');
        if (!chip) return;

        const intent = chip.dataset.aiIntent;
        const label = chip.textContent;

        const userMsg = document.createElement('div');
        userMsg.className = 'cg-msg cg-msg--user';
        userMsg.innerHTML = `<div class="cg-msg__text">${label}</div>`;
        aiMessages.appendChild(userMsg);
        scrollToLastMessage();

        speakPinoIA(label, intent);
    });
});