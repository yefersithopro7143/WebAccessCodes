// security.js - Premium Store Security Core (VIP GOD-TIER V5 - PROTECCIÓN INTELIGENTE)
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
    // ESTILOS BASE Y ALERTAS COMPACTAS (Diseño Premium)
    // ==========================================
    const css = `
      .premium-sec-alert {
        position: fixed; bottom: 30px; left: 50%; transform: translateX(-50%) translateY(50px) scale(0.9);
        background: rgba(15, 10, 5, 0.95); color: #fff; padding: 10px 18px; font-size: 11px; 
        font-family: 'Montserrat', monospace, sans-serif; font-weight: 700; text-transform: uppercase;
        letter-spacing: 1px; border-radius: 30px; display: flex; align-items: center; gap: 8px;
        opacity: 0; pointer-events: none; transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        z-index: 9999999; white-space: nowrap; box-shadow: 0 10px 25px rgba(0, 0, 0, 0.8);
        backdrop-filter: blur(10px); -webkit-backdrop-filter: blur(10px);
        border: 1px solid rgba(255, 159, 67, 0.3);
      }
      .premium-sec-alert.show { opacity: 1; transform: translateX(-50%) translateY(0) scale(1); }
      .premium-sec-alert.warning { border-color: #ff9f43; box-shadow: 0 5px 15px rgba(255, 159, 67, 0.2); color: #ff9f43; }
      .premium-sec-alert.info { border-color: #00d2ff; box-shadow: 0 5px 15px rgba(0, 210, 255, 0.2); color: #00d2ff; }
      .premium-sec-alert svg { width: 16px; height: 16px; fill: currentColor; }
      
      * { -webkit-user-select: none !important; -moz-user-select: none !important; -ms-user-select: none !important; user-select: none !important; -webkit-touch-callout: none !important; -webkit-tap-highlight-color: transparent !important; }
      .allow-copy, .allow-copy * { -webkit-user-select: text !important; -moz-user-select: text !important; -ms-user-select: text !important; user-select: text !important; -webkit-touch-callout: default !important; }
      img { -webkit-user-drag: none !important; pointer-events: none !important; }
    `;
    const style = document.createElement('style'); 
    style.textContent = css; 
    document.head.appendChild(style);

    let lastAlertTime = 0;
    function showProtectionAlert(message = "Función Protegida", type = "warning") {
        if (Date.now() - lastAlertTime < 2500) return; // Evita spam de alertas
        lastAlertTime = Date.now();
        let oldAlert = document.querySelector(".premium-sec-alert"); 
        if (oldAlert) oldAlert.remove();
        
        const alert = document.createElement("div"); 
        alert.className = `premium-sec-alert ${type}`;
        
        // Icono de Escudo amigable
        let iconSVG = `<svg viewBox="0 0 24 24"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z"/></svg>`;
        
        alert.innerHTML = `${iconSVG} <span>${message}</span>`;
        document.body.appendChild(alert);
        
        // Animación de entrada y salida
        setTimeout(() => alert.classList.add("show"), 10);
        setTimeout(() => { 
            alert.classList.remove("show"); 
            setTimeout(() => alert.remove(), 400); 
        }, 2500);
    }

    // ==========================================
    // PROTOCOLO 2: AUTO-DESTRUCCIÓN ELEGANTE (WIPE-OUT DOM)
    // Borra la página si intentan robar el código fuente de forma agresiva.
    // ==========================================
    let isDestroyed = false;
    function triggerAutoDestruct() {
        if (isDestroyed) return;
        isDestroyed = true;
        
        try {
            document.write(""); // Destruye el DOM activo
            document.documentElement.innerHTML = "";
            // Pantalla negra de bloqueo
            document.body.style.cssText = "background-color: #0a0500 !important; margin: 0 !important; padding: 0 !important; height: 100vh !important; width: 100vw !important; overflow: hidden !important;";
        } catch(e) {
            document.body.innerHTML = '';
            document.head.innerHTML = '';
        }
    }

    // ==========================================
    // PROTOCOLO 3: DETECCIÓN DE HERRAMIENTAS DE DESARROLLADOR (GEOMETRÍA)
    // Se activa solo en PC. Si encogen la ventana útil para abrir el inspector, se bloquea.
    // ==========================================
    const detectDevToolsGeometry = () => {
        const threshold = 160; 
        const widthDiff = window.outerWidth - window.innerWidth > threshold;
        const heightDiff = window.outerHeight - window.innerHeight > threshold;
        
        // Excluimos móviles para no dar falsos positivos por el teclado o la barra del navegador
        const isMobile = /Mobi|Android/i.test(navigator.userAgent);

        if ((widthDiff || heightDiff) && !isMobile && !isDestroyed) {
            triggerAutoDestruct();
        }
    };
    window.addEventListener('resize', detectDevToolsGeometry);
    setInterval(detectDevToolsGeometry, 2000);

    // ==========================================
    // PROTOCOLO 4: CONSOLA AMIGABLE Y SECUESTRADA
    // No borra nada a lo loco. Da un mensaje de bienvenida y bloquea comandos invasivos.
    // ==========================================
    console.clear();
    console.log("%c🌟 BIENVENIDO A PREMIUM STORE 🌟", "color: #ff9f43; font-size: 22px; font-weight: bold; background: #1a0b00; padding: 15px; border-radius: 8px; border: 1px solid #ff9f43;");
    console.log("%cNos alegra que te interese la tecnología. Para proteger la privacidad de nuestros usuarios, esta zona está restringida. ¡Disfruta de la página!", "color: #dcdcdc; font-size: 14px; background: #000; padding: 10px; border-radius: 5px;");

    const consoleKiller = function() {};
    ['warn', 'info', 'dir', 'table', 'trace'].forEach(method => {
        console[method] = consoleKiller;
    });

    // ==========================================
    // PROTOCOLO 5: BLOQUEO DE TECLAS Y DESCARGAS
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
            showProtectionAlert("Función de copia deshabilitada", "warning");
        }
    }, true);

    // ==========================================
    // PROTOCOLO 6: BLOQUEO DE RATÓN (RESPETA LA ZONA "ALLOW-COPY")
    // ==========================================
    document.addEventListener("contextmenu", (e) => {
        if (!e.target.closest(".allow-copy")) { 
            e.preventDefault(); e.stopPropagation(); 
            // Mensaje suave, parece una función normal de la página
            showProtectionAlert("Menú protegido por seguridad", "warning"); 
        }
    }, true);

    document.addEventListener("dragstart", (e) => {
        if (!e.target.closest(".allow-copy")) { e.preventDefault(); e.stopPropagation(); }
    }, true);

    document.addEventListener("copy", (e) => {
        if (!e.target.closest(".allow-copy")) { 
            e.preventDefault(); 
            // En lugar de vaciarlo, ponemos un mensaje publicitario elegante
            e.clipboardData.setData("text/plain", "Contenido exclusivo de Premium Store."); 
            showProtectionAlert("Selección de texto protegida", "warning"); 
        }
    });

})();
