// security.js - Premium Store Security Core (VIP GOD-TIER V4 - ANIQUILACIÓN)
const SECURITY_ENABLED = true; // 🛡️ EL INTERRUPTOR MAESTRO (Controlado por el Panel)

(function() {
  if (!SECURITY_ENABLED) {
      console.log("%c⚠️ Premium Store Security Core: [DESACTIVADO POR EL ADMINISTRADOR]", "color: #ffcc00; font-size: 14px; font-weight: bold;");
      return; // Corta la ejecución aquí, dejando la web sin seguridad
  }

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
  // PROTOCOLO 2: AUTO-DESTRUCCIÓN ABSOLUTA (DOM BLACKOUT)
  // ==========================================
  let isDestroyed = false;
  function triggerAutoDestruct() {
      if (isDestroyed) return;
      isDestroyed = true;
      document.head.innerHTML = ''; 
      document.body.innerHTML = ''; 
      document.body.removeAttribute('class');
      document.body.style.cssText = "background-color: #000 !important; margin: 0 !important; padding: 0 !important; height: 100vh !important; width: 100vw !important; overflow: hidden !important;";
  }

  // ==========================================
  // PROTOCOLO 3: TRAMPA DE MUTACIÓN (ANTI-TAMPERING)
  // ==========================================
  const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
          mutation.removedNodes.forEach((node) => {
              if (node.tagName === 'SCRIPT' || node.tagName === 'STYLE') {
                  triggerAutoDestruct(); 
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
      console.log("%c🛡️ PRECAUCIÓN DE SEGURIDAD", "color: #fff700; font-size: 22px; font-weight: bold; text-shadow: 0 0 10px rgba(255, 247, 0, 0.4); font-family: sans-serif; padding: 10px 0;");
      console.log("%cLa seguridad máxima de Premium Store ha sido activada por el desarrollador.\n\nEsta es una función del navegador dirigida únicamente a programadores. Si alguien te pidió que copies y pegues código aquí para habilitar alguna función, se trata de una estafa (Self-XSS) que les dará acceso a tu cuenta y comprometerá tu dispositivo.\n\nPor favor, cierra esta ventana para continuar navegando de forma segura.", "color: #ffffff; font-size: 13px; background: #111; padding: 15px; border-radius: 8px; border-left: 4px solid #fff700; line-height: 1.6; font-family: sans-serif;");
  }, 1000);

  // ==========================================
  // PROTOCOLO 5: BLOQUEO DE DESCARGA Y TECLAS (ANTI-SAVE)
  // ==========================================
  document.addEventListener("keydown", (e) => {
    if ((e.ctrlKey || e.metaKey) && ["s", "p", "u", "a", "c", "x", "v"].includes(e.key.toLowerCase())) {
        e.preventDefault(); e.stopPropagation();
        showProtectionAlert("Descarga y Copia Restringida", "danger");
    }
    if (e.key === "F12" || (e.ctrlKey && e.shiftKey && ["I", "J", "C", "K"].includes(e.key.toUpperCase()))) {
        e.preventDefault(); e.stopPropagation();
        triggerAutoDestruct(); 
    }
  }, true);

  // DETECCIÓN DEL DEBUGGER
  let devToolsOpen = false;
  setInterval(() => {
    let start = performance.now();
    debugger;
    let timeTaken = performance.now() - start;
    if (timeTaken > 100 && !devToolsOpen) {
      devToolsOpen = true;
      triggerAutoDestruct(); 
    }
  }, 2000);

  // ==========================================
  // INTERACCIONES BÁSICAS DE RATÓN
  // ==========================================
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

})();
