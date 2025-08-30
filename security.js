// security.js - Sistema de Protección Avanzada AntiCopy™

(function() {
    'use strict';
    
    // Detectar dispositivo móvil
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    // Inyectar CSS dinámicamente con animaciones profesionales
    const css = `
        .security-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.95);
            backdrop-filter: blur(8px);
            -webkit-backdrop-filter: blur(8px);
            z-index: 999998;
            opacity: 0;
            visibility: hidden;
            transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .security-overlay.active {
            opacity: 1;
            visibility: visible;
        }
        
        .security-alert {
            position: fixed;
            top: 20px;
            left: 50%;
            transform: translateX(-50%) translateY(-30px);
            background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
            border: 1px solid rgba(255, 204, 0, 0.3);
            color: #ffffff;
            padding: 16px 24px;
            font-size: 14px;
            font-weight: 600;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            border-radius: 12px;
            display: flex;
            align-items: center;
            gap: 12px;
            opacity: 0;
            visibility: hidden;
            transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
            z-index: 999999;
            max-width: 90%;
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4), 0 0 20px rgba(255, 204, 0, 0.1);
            backdrop-filter: blur(20px);
            -webkit-backdrop-filter: blur(20px);
        }
        
        .security-alert.show {
            opacity: 1;
            visibility: visible;
            transform: translateX(-50%) translateY(0);
        }
        
        .security-alert .icon {
            width: 20px;
            height: 20px;
            flex-shrink: 0;
            filter: drop-shadow(0 0 4px rgba(255, 204, 0, 0.5));
        }
        
        .security-alert .status-dot {
            width: 8px;
            height: 8px;
            background: #ffcc00;
            border-radius: 50%;
            animation: pulse 2s infinite;
            margin-left: auto;
        }
        
        .security-alert .text {
            font-size: 13px;
            letter-spacing: 0.5px;
            text-transform: uppercase;
        }
        
        @keyframes pulse {
            0%, 100% { opacity: 1; transform: scale(1); }
            50% { opacity: 0.7; transform: scale(1.2); }
        }
        
        body.security-locked {
            overflow: hidden !important;
        }
    `;
    
    const style = document.createElement('style');
    style.textContent = css;
    document.head.appendChild(style);
    
    // Crear overlay de fondo
    const overlay = document.createElement('div');
    overlay.className = 'security-overlay';
    document.body.appendChild(overlay);
    
    // Función para mostrar alerta de seguridad avanzada
    function showSecurityAlert(message = "🔒 SEGURIDAD ACTIVA") {
        // Remover alerta anterior
        const oldAlert = document.querySelector(".security-alert");
        if (oldAlert) oldAlert.remove();
        
        // Activar overlay y bloquear scroll
        overlay.classList.add('active');
        document.body.classList.add('security-locked');
        
        // Crear nueva alerta
        const alert = document.createElement("div");
        alert.className = "security-alert";
        alert.innerHTML = `
            <div class="icon">🛡️</div>
            <span class="text">${message}</span>
            <div class="status-dot"></div>
        `;
        document.body.appendChild(alert);
        
        // Mostrar con animación
        setTimeout(() => alert.classList.add("show"), 50);
        
        // Ocultar después de 3.5 segundos
        setTimeout(() => {
            alert.classList.remove("show");
            overlay.classList.remove('active');
            document.body.classList.remove('security-locked');
            setTimeout(() => alert.remove(), 500);
        }, 3500);
    }
    
    // Bloqueo de teclas de desarrollo (solo PC)
    if (!isMobile) {
        document.addEventListener("keydown", (e) => {
            if (
                e.key === "F12" ||
                (e.ctrlKey && e.shiftKey && ["I", "J", "C", "K"].includes(e.key.toUpperCase())) ||
                (e.ctrlKey && ["u","s","p","a","c","x","v"].includes(e.key.toLowerCase()))
            ) {
                e.preventDefault();
                showSecurityAlert("🚫 ACCESO DENEGADO");
            }
        });
        
        // Bloquear clic derecho (solo PC)
        document.addEventListener("contextmenu", (e) => {
            e.preventDefault();
            showSecurityAlert("🔐 ANTICOPY ACTIVADO");
        });
    }
    
    // Bloquear selección de texto (excepto en .allow-copy)
    document.addEventListener("selectstart", (e) => {
        if (!e.target.closest('.allow-copy')) {
            e.preventDefault();
            showSecurityAlert("⚠️ CONTENIDO PROTEGIDO");
        }
    });
    
    // Bloquear arrastre de elementos
    document.addEventListener("dragstart", (e) => {
        e.preventDefault();
        showSecurityAlert("🔒 TRANSFERENCIA BLOQUEADA");
    });
    
    // Protección contra copia en móviles (pulsación larga)
    if (isMobile) {
        let touchTimer;
        let startY = 0;
        let moved = false;
        
        document.addEventListener("touchstart", (e) => {
            moved = false;
            startY = e.touches[0].clientY;
            touchTimer = setTimeout(() => {
                if (!moved && !e.target.closest('.allow-copy')) {
                    showSecurityAlert("📱 PROTECCIÓN MÓVIL");
                }
            }, 600);
        });
        
        document.addEventListener("touchmove", (e) => {
            const currentY = e.touches[0].clientY;
            if (Math.abs(currentY - startY) > 15) {
                moved = true;
                clearTimeout(touchTimer);
            }
        });
        
        document.addEventListener("touchend", () => {
            clearTimeout(touchTimer);
        });
    }
    
    // Detección avanzada de herramientas de desarrollo
    setInterval(() => {
        const start = performance.now();
        debugger;
        const duration = performance.now() - start;
        
        if (duration > 100) {
            showSecurityAlert("🚨 INSPECCIÓN DETECTADA");
        }
    }, 2000);
    
    // Protección contra console
    const noop = () => {};
    const consoleMethods = ['log', 'debug', 'info', 'warn', 'error', 'table', 'trace'];
    consoleMethods.forEach(method => {
        console[method] = noop;
    });
    
    // Mensaje inicial de activación
    setTimeout(() => {
        showSecurityAlert("🛡️ SEGURIDAD AVANZADA");
    }, 800);
    
})();
