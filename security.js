// security.js - Premium Store Security Core (VIP GOD-TIER V2)
(function() {
  // ==========================================
  // PROTOCOLO 1: ESCUDO ANTI-IFRAME (FRAME KILLER)
  // ==========================================
  if (window.top !== window.self) {
      window.top.location = window.self.location;
  }

  // ==========================================
  // ESTILOS BASE Y ALERTAS COMPACTAS
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
  const style = document.createElement('style'); style.textContent = css; document.head.appendChild(style);

  let lastAlertTime = 0;
  function showProtectionAlert(message = "Acción Denegada", type = "warning") {
    if (Date.now() - lastAlertTime < 2000) return; 
    lastAlertTime = Date.now();
    let oldAlert = document.querySelector(".premium-sec-alert"); if (oldAlert) oldAlert.remove();
    const alert = document.createElement("div"); alert.className = `premium-sec-alert ${type}`;
    
    let iconSVG = type === 'danger' ? `<svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15h2v-2h-2v2zm0-4h2V7h-2v6z"/></svg>` : `<svg viewBox="0 0 24 24"><path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/></svg>`;
    alert.innerHTML = `${iconSVG} <span>${message}</span>`;
    document.body.appendChild(alert);
    setTimeout(() => alert.classList.add("show"), 10);
    setTimeout(() => { alert.classList.remove("show"); setTimeout(() => alert.remove(), 400); }, 2000);
  }

  // ==========================================
  // PROTOCOLO 2: AUTO-DESTRUCCIÓN (DISEÑO DELGADO Y ELEGANTE)
  // ==========================================
  let isDestroyed = false;
  function triggerAutoDestruct() {
      if (isDestroyed) return;
      isDestroyed = true;
      
      // En lugar de vaciar solo el body, reescribimos todo el documento con estilos propios aislados
      document.documentElement.innerHTML = `
        <head>
            <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
            <style>
                body {
                    background-color: #030303;
                    font-family: 'Courier New', Courier, monospace;
                    display: flex; justify-content: center; align-items: center;
                    height: 100vh; margin: 0; overflow: hidden;
                    user-select: none; -webkit-user-select: none;
                }
                .lockdown-card {
                    background: linear-gradient(145deg, #0a0a0a, #000);
                    border: 1px solid rgba(255, 0, 60, 0.3);
                    box-shadow: 0 15px 35px rgba(0,0,0,0.9), inset 0 0 15px rgba(255, 0, 60, 0.05);
                    border-radius: 12px;
                    padding: 25px 20px;
                    text-align: center;
                    width: 85%; max-width: 300px;
                    animation: glitchDrop 0.4s cubic-bezier(0.25, 0.8, 0.25, 1) forwards;
                    position: relative;
                }
                .lockdown-card::before {
                    content: ''; position: absolute; top: 0; left: 50%; transform: translateX(-50%);
                    width: 50px; height: 3px; background: #ff003c; border-radius: 0 0 4px 4px;
                    box-shadow: 0 2px 10px #ff003c;
                }
                .icon { margin-bottom: 12px; }
                .icon svg { width: 30px; height: 30px; stroke: #ff003c; filter: drop-shadow(0 0 5px rgba(255,0,60,0.5)); }
                h1 { 
                    font-size: 15px; margin: 0 0 8px 0; color: #fff; 
                    text-transform: uppercase; letter-spacing: 2px; font-weight: bold;
                }
                p { font-size: 11px; color: #888; margin: 0; line-height: 1.5; }
                .sys-code { 
                    margin-top: 15px; font-size: 9px; color: #ff003c; 
                    background: rgba(255,0,60,0.1); display: inline-block; 
                    padding: 4px 8px; border-radius: 4px; border: 1px solid rgba(255,0,60,0.2);
                    letter-spacing: 1px; font-weight: bold;
                }
                @keyframes glitchDrop {
                    0% { transform: translateY(-20px) scale(0.95); opacity: 0; }
                    100% { transform: translateY(0) scale(1); opacity: 1; }
                }
            </style>
        </head>
        <body>
            <div class="lockdown-card">
                <div class="icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                        <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                    </svg>
                </div>
                <h1>Acceso Restringido</h1>
                <p>El código fuente ha sido purgado debido a una violación de seguridad. Conexión terminada.</p>
                <div class="sys-code">ERR_SEC_PURGE :: LOGGED</div>
            </div>
        </body>
      `;
  }

  // ==========================================
  // PROTOCOLO 3: TRAMPA DE MUTACIÓN (ANTI-TAMPERING)
  // ==========================================
  const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
          mutation.removedNodes.forEach((node) => {
              if (node.tagName === 'SCRIPT' || node.tagName === 'STYLE') {
                  triggerAutoDestruct(); // Si borran nuestro script, la página explota
              }
          });
      });
  });
  observer.observe(document.documentElement, { childList: true, subtree: true });

  // ==========================================
  // PROTOCOLO 4: INUNDACIÓN DE CONSOLA (CONSOLE JAMMER)
  // ==========================================
  setInterval(() => {
      console.clear();
      console.log("%c¡SISTEMA BLINDADO!", "color: #ff003c; font-size: 40px; font-weight: bold; text-shadow: 2px 2px 0 #000;");
      console.log("%cEsta área es exclusiva para la administración de Premium Store. Intentos de manipulación del DOM serán bloqueados.", "color: white; font-size: 14px; background: #111; padding: 10px; border-radius: 5px; border-left: 4px solid #ff003c;");
  }, 1500);

  // ==========================================
  // PROTOCOLO 5: BLOQUEO DE DESCARGA Y TECLAS (ANTI-SAVE)
  // ==========================================
  document.addEventListener("keydown", (e) => {
    // Bloquea Ctrl+S / Cmd+S (Guardar), Ctrl+P (Imprimir)
    if ((e.ctrlKey || e.metaKey) && ["s", "p", "u", "a", "c", "x", "v"].includes(e.key.toLowerCase())) {
        e.preventDefault(); e.stopPropagation();
        showProtectionAlert("Descarga Restringida", "danger");
    }
    // Bloquea F12 y herramientas de inspector
    if (e.key === "F12" || (e.ctrlKey && e.shiftKey && ["I", "J", "C", "K"].includes(e.key.toUpperCase()))) {
        e.preventDefault(); e.stopPropagation();
        triggerAutoDestruct(); 
    }
  }, true);

  // Detección del Debugger (Gatillo principal de destrucción)
  let devToolsOpen = false;
  setInterval(() => {
    let start = performance.now();
    debugger; // Si tienen la consola abierta, el navegador se pausa aquí
    let timeTaken = performance.now() - start;
    if (timeTaken > 100 && !devToolsOpen) {
      devToolsOpen = true;
      triggerAutoDestruct(); 
    }
  }, 2000);

  // INTERACCIONES BÁSICAS DE RATÓN
  document.addEventListener("contextmenu", (e) => {
    if (!e.target.closest(".allow-copy")) { e.preventDefault(); e.stopPropagation(); showProtectionAlert("Acción Bloqueada", "warning"); }
  }, true);

  document.addEventListener("selectstart", (e) => {
    if (!e.target.closest(".allow-copy")) { e.preventDefault(); e.stopPropagation(); }
  }, true);

  document.addEventListener("dragstart", (e) => {
    if (!e.target.closest(".allow-copy")) { e.preventDefault(); e.stopPropagation(); }
  }, true);

  document.addEventListener("copy", (e) => {
    if (!e.target.closest(".allow-copy")) { e.preventDefault(); e.clipboardData.setData("text/plain", ""); showProtectionAlert("Copia Restringida", "warning"); }
  });

  console.log("🛡️ Premium Store Security Core: [NIVEL DIOS ACTIVADO]");
})();
