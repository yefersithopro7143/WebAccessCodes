// security.js - Premium Store Security Core (VIP GOD-TIER V5 - ESTABLE Y AMIGABLE)
(function() {
    // ==========================================
    // PROTOCOLO 1: ESCUDO ANTI-IFRAME Y CLICKJACKING
    // Evita que clonen tu web metiéndola en un marco o app de terceros.
    // ==========================================
    try {
        if (window.top !== window.self) {
            window.top.location.replace(window.self.location.href);
        }
    } catch (e) {}

    // ==========================================
    // ESTILOS BASE Y ALERTAS COMPACTAS (Intacto y optimizado)
    // ==========================================
    const css = `
      .premium-sec-alert {
        position: fixed; bottom: 30px; left: 50%; transform: translateX(-50%) translateY(50px) scale(0.9);
        background: rgba(10, 10, 10, 0.95); color: #fff; padding: 8px 14px; font-size: 11px; 
        font-family: 'Montserrat', monospace, sans-serif; font-weight: 700; text-transform: uppercase;
        letter-spacing: 1px; border-radius: 30px; display: flex; align-items: center; gap: 6px;
        opacity: 0; pointer-events: none; transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        z-index: 9999999; white-space: nowrap; box-shadow: 0 10px 25px rgba(0, 0, 0, 0.8);
        backdrop-filter: blur(10px); -webkit-backdrop-filter: blur(10px);
        border: 1px solid rgba(255, 255, 255, 0.1);
      }
      .premium-sec-alert.show { opacity: 1; transform: translateX(-50%) translateY(0) scale(1); }
      .premium-sec-alert.danger { border-color: #ff003c; box-shadow: 0 5px 15px rgba(255, 0, 60, 0.3); color: #ff003c; }
      .premium-sec-alert.warning { border-color: #d4af37; box-shadow: 0 5px 15px rgba(212, 175, 55, 0.2); color: #d4af37; }
      .premium-sec-alert.info { border-color: #00d2ff; box-shadow: 0 5px 15px rgba(0, 210, 255, 0.2); color: #00d2ff; }
      .premium-sec-alert svg { width: 14px; height: 14px; fill: currentColor; }
      
      * { -webkit-user-select: none !important; -moz-user-select: none !important; -ms-user-select: none !important; user-select: none !important; -webkit-touch-callout: none !important; -webkit-tap-highlight-color: transparent !important; }
      .allow-copy, .allow-copy * { -webkit-user-select: text !important; -moz-user-select: text !important; -ms-user-select: text !important; user-select: text !important; -webkit-touch-callout: default !important; }
      img { -webkit-user-drag: none !important; pointer-events: none !important; }
    `;
    const style = document.createElement('style'); 
    style.textContent = css; 
    document.head.appendChild(style);

    let lastAlertTime = 0;
    function showProtectionAlert(message = "Acción Denegada", type = "warning") {
        if (Date.now() - lastAlertTime < 2000) return; 
        lastAlertTime = Date.now();
        let oldAlert = document.querySelector(".premium-sec-alert"); 
        if (oldAlert) oldAlert.remove();
        
        const alert = document.createElement("div"); 
        alert.className = `premium-sec-alert ${type}`;
        
        let iconSVG = type === 'danger' ? `<svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15h2v-2h-2v2zm0-4h2V7h-2v6z"/></svg>` : `<svg viewBox="0 0 24 24"><path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/></svg>`;
        
        alert.innerHTML = `${iconSVG} <span>${message}</span>`;
        document.body.appendChild(alert);
        setTimeout(() => alert.classList.add("show"), 10);
        setTimeout(() => { 
            alert.classList.remove("show"); 
            setTimeout(() => alert.remove(), 400); 
        }, 2000);
    }

    // ==========================================
    // PROTOCOLO 2: AUTO-DESTRUCCIÓN ABSOLUTA (WIPE-OUT DOM)
    // No solo borra visualmente, borra el árbol de memoria.
    // ==========================================
    let isDestroyed = false;
    function triggerAutoDestruct() {
        if (isDestroyed) return;
        isDestroyed = true;
        
        try {
            // Document.write borra todo el flujo del documento activo
            document.write(""); 
            document.documentElement.innerHTML = "";
            document.body.style.cssText = "background-color: #000 !important; margin: 0 !important; padding: 0 !important; height: 100vh !important; width: 100vw !important; overflow: hidden !important;";
        } catch(e) {
            // Respaldo de destrucción
            document.body.innerHTML = '';
            document.head.innerHTML = '';
        }
    }

    // ==========================================
    // PROTOCOLO 3: DETECCIÓN DE HERRAMIENTAS DE DESARROLLADOR (GEOMETRÍA)
    // Si la ventana útil se encoge porque abrieron la consola, la página explota.
    // ==========================================
    const detectDevToolsGeometry = () => {
        const threshold = 160; // Píxeles que ocupa la consola como mínimo
        const widthDiff = window.outerWidth - window.innerWidth > threshold;
        const heightDiff = window.outerHeight - window.innerHeight > threshold;
        
        // Excluimos móviles para no dar falsos positivos por el teclado virtual
        const isMobile = /Mobi|Android/i.test(navigator.userAgent);

        if ((widthDiff || heightDiff) && !isMobile && !isDestroyed) {
            triggerAutoDestruct();
        }
    };
    window.addEventListener('resize', detectDevToolsGeometry);
    setInterval(detectDevToolsGeometry, 1500);

    // ==========================================
    // PROTOCOLO 4: SECUESTRO DE CONSOLA Y MENSAJE AMIGABLE
    // ==========================================
    const consoleKiller = function() {};
    ['log', 'warn', 'info', 'error', 'dir', 'table', 'trace'].forEach(method => {
        console[method] = consoleKiller;
    });

    // Mensaje elegante y profesional (Estilo Facebook/Discord)
    setTimeout(() => {
        const realLog = Object.getPrototypeOf(console).log || console.log;
        realLog.call(console, "%c✨ Bienvenido a Premium Store ✨", "color: #ff9f43; font-size: 24px; font-weight: bold; font-family: sans-serif;");
        realLog.call(console, "%c¡Hola! Este es un espacio para desarrolladores.\n\nCONSEJO DE SEGURIDAD:\nSi alguien te dijo que pegar un código aquí para conseguir APKs gratis o Keys ilimitadas… cuidado ⚠️\nPodría ser una estafa y tu cuenta de Premium Store podría estar en riesgo.\n\nMantente seguro y disfurta de nuestros servicios.", "color: #b0b0b0; font-size: 14px; font-family: sans-serif; line-height: 1.5;");
    }, 100);

    // ==========================================
    // PROTOCOLO 5: BUCLE DE DEBUGGER INFINITO (OFUSCADO)
    // ==========================================
    setInterval(function() {
        // Envuelta en constructores para dificultar su bloqueo en la consola
        (function() { return false; }).constructor("debugger")();
    }, 1000);

    // ==========================================
    // PROTOCOLO 6: BLOQUEO DE TECLAS AVANZADO Y DESCARGAS
    // ==========================================
    document.addEventListener("keydown", (e) => {
        // F12 o Atajos de desarrollador (Ctrl+Shift+I / J / C)
        if (e.key === "F12" || (e.ctrlKey && e.shiftKey && ["I", "J", "C", "K"].includes(e.key.toUpperCase()))) {
            e.preventDefault(); e.stopPropagation();
            triggerAutoDestruct(); 
        }
        
        // Atajos de Guardado, Impresión, Código Fuente (Ctrl+S, P, U)
        if ((e.ctrlKey || e.metaKey) && ["s", "p", "u", "a", "c", "x", "v"].includes(e.key.toLowerCase())) {
            e.preventDefault(); e.stopPropagation();
            showProtectionAlert("Descarga y Copia Restringida", "danger");
        }
    }, true);

    // ==========================================
    // PROTOCOLO 7: BLOQUEO DE RATÓN (CON SOPORTE EXCEPCIONAL PARA TEXTO PERMITIDO)
    // ==========================================
    document.addEventListener("contextmenu", (e) => {
        if (!e.target.closest(".allow-copy")) { 
            e.preventDefault(); e.stopPropagation(); 
            showProtectionAlert("Acción Bloqueada", "warning"); 
        }
    }, true);

    document.addEventListener("dragstart", (e) => {
        if (!e.target.closest(".allow-copy")) { e.preventDefault(); e.stopPropagation(); }
    }, true);

    document.addEventListener("copy", (e) => {
        if (!e.target.closest(".allow-copy")) { 
            e.preventDefault(); 
            // Inyectamos un texto seguro si intentan forzar la copia
            e.clipboardData.setData("text/plain", "Seguridad Premium Store"); 
            showProtectionAlert("Copia Restringida", "warning"); 
        }
    });

})();
