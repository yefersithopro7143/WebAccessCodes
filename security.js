// ==========================================================
// PREMIUM STORE SECURITY CORE v2.0 (MODO DIOS SUPREMO)
// ==========================================================
(function() {
  // 1. ESCUDO ANTI-IFRAME (Anti-Clickjacking & Anti-Clonación)
  if (window.top !== window.self) {
    window.top.location = window.self.location;
  }

  // 2. INYECCIÓN DE CSS (Alertas y Pantalla de Auto-Destrucción)
  const css = `
    /* -- Alertas VIP (Toast) -- */
    .premium-sec-alert {
      position: fixed; bottom: 30px; left: 50%;
      transform: translateX(-50%) translateY(50px) scale(0.9);
      background: rgba(10, 10, 10, 0.95); color: #fff;
      padding: 8px 14px; font-size: 11px; font-family: 'Montserrat', sans-serif;
      font-weight: 700; text-transform: uppercase; letter-spacing: 1px;
      border-radius: 30px; display: flex; align-items: center; gap: 6px;
      opacity: 0; pointer-events: none;
      transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
      z-index: 9999999; white-space: nowrap;
      box-shadow: 0 10px 25px rgba(0, 0, 0, 0.8);
      backdrop-filter: blur(10px); -webkit-backdrop-filter: blur(10px);
      border: 1px solid rgba(255, 255, 255, 0.1);
    }
    .premium-sec-alert.show { opacity: 1; transform: translateX(-50%) translateY(0) scale(1); }
    .premium-sec-alert.danger { border-color: #ff3333; box-shadow: 0 5px 15px rgba(255, 51, 51, 0.2); color: #ff3333; }
    .premium-sec-alert.warning { border-color: #d4af37; box-shadow: 0 5px 15px rgba(212, 175, 55, 0.2); color: #d4af37; }
    .premium-sec-alert svg { width: 14px; height: 14px; fill: currentColor; }
    
    /* -- PANTALLA DE AUTO-DESTRUCCIÓN (DOM BLACKOUT) -- */
    #system-blackout-overlay {
      position: fixed; top: 0; left: 0; width: 100vw; height: 100vh;
      background: #000; z-index: 9999999999;
      display: flex; flex-direction: column; justify-content: center; align-items: center;
      color: #ff003c; font-family: monospace; text-align: center;
    }
    .blackout-glitch { font-size: 24px; font-weight: bold; text-transform: uppercase; letter-spacing: 3px; margin-bottom: 10px; animation: glitchText 0.2s infinite; }
    .blackout-sub { color: #888; font-size: 12px; max-width: 80%; }
    @keyframes glitchText { 0% { transform: translate(2px, 2px); } 50% { transform: translate(-2px, -2px); } 100% { transform: translate(2px, -2px); } }

    /* -- BLOQUEOS DE SELECCIÓN -- */
    * {
      -webkit-user-select: none !important; -moz-user-select: none !important; -ms-user-select: none !important; user-select: none !important;
      -webkit-touch-callout: none !important; -webkit-tap-highlight-color: transparent !important;
    }
    .allow-copy, .allow-copy * {
      -webkit-user-select: text !important; -moz-user-select: text !important; -ms-user-select: text !important; user-select: text !important;
      -webkit-touch-callout: default !important;
    }
    img { -webkit-user-drag: none !important; pointer-events: none !important; }
  `;
  const style = document.createElement('style'); style.textContent = css; document.head.appendChild(style);

  // -- SISTEMA DE ALERTAS --
  let lastAlertTime = 0;
  function showProtectionAlert(message = "Acción Denegada", type = "warning") {
    if (Date.now() - lastAlertTime < 2000) return; 
    lastAlertTime = Date.now();
    let oldAlert = document.querySelector(".premium-sec-alert"); if (oldAlert) oldAlert.remove();
    const alert = document.createElement("div"); alert.className = `premium-sec-alert ${type}`;
    let iconSVG = type === 'danger' ? `<svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15h2v-2h-2v2zm0-4h2V7h-2v6z"/></svg>` : `<svg viewBox="0 0 24 24"><path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/></svg>`;
    alert.innerHTML = `${iconSVG} <span>${message}</span>`; document.body.appendChild(alert);
    setTimeout(() => alert.classList.add("show"), 10);
    setTimeout(() => { alert.classList.remove("show"); setTimeout(() => alert.remove(), 400); }, 2000);
  }

  // 3. AUTO-DESTRUCCIÓN (DOM BLACKOUT FUNC)
  let isDestroyed = false;
  function triggerBlackout() {
    if (isDestroyed) return;
    isDestroyed = true;
    document.body.innerHTML = `
      <div id="system-blackout-overlay">
        <svg width="60" height="60" viewBox="0 0 24 24" fill="#ff003c" style="margin-bottom:20px;"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z"/></svg>
        <div class="blackout-glitch">BRECHA DETECTADA</div>
        <div class="blackout-sub">El sistema de seguridad ha bloqueado la página.<br>Inspección de código no autorizada.</div>
      </div>
    `;
    // 4. AGUJERO NEGRO DE CONSOLA
    console.clear();
    console.log("%c🛑 ACCESO DENEGADO", "color: red; font-size: 40px; font-weight: bold; text-shadow: 2px 2px 0 #000;");
    console.log("%cLos sistemas de Premium Store están protegidos.", "color: white; font-size: 16px; background: black; padding: 10px;");
    // Destruir métodos de consola para que no puedan buscar variables
    Object.keys(console).forEach(method => {
       if (typeof console[method] === 'function') console[method] = function() { return "🔒 Nivel de Seguridad Máximo"; };
    });
  }

  // 5. TRAMPA DE DEPURACIÓN (Debugger Trap) + DETECCIÓN DE HERRAMIENTAS
  let devToolsOpen = false;
  setInterval(() => {
    let start = performance.now();
    debugger; // Si tienen la consola abierta, el navegador se trabará aquí
    let timeTaken = performance.now() - start;
    if (timeTaken > 100 && !devToolsOpen) {
      devToolsOpen = true;
      triggerBlackout(); // ¡BUM! Auto-destrucción
    }
  }, 1000);

  // 6. SENSOR DE ANOMALÍAS DE PANTALLA (Docked DevTools Detector)
  // Si la pantalla cambia de altura bruscamente más de 150px (al abrir consola inferior)
  let lastHeight = window.innerHeight;
  window.addEventListener("resize", () => {
    let currentHeight = window.innerHeight;
    if (lastHeight - currentHeight > 150) {
      // Posible consola acoplada abierta
      triggerBlackout();
    }
    lastHeight = currentHeight;
  });

  // -- BLOQUEOS DE INTERACCIÓN FÍSICA --
  document.addEventListener("keydown", (e) => {
    if (e.key === "F12" || (e.ctrlKey && e.shiftKey && ["I", "J", "C", "K"].includes(e.key.toUpperCase())) || (e.ctrlKey && ["u","s","p","a","c","x","v"].includes(e.key.toLowerCase()))) {
      e.preventDefault(); e.stopPropagation(); showProtectionAlert("Teclas Bloqueadas", "danger"); triggerBlackout();
    }
  }, true);

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

  console.log("🛡️ Premium Store Security Core V2.0: ACTIVO Y ARMADO");
})();
