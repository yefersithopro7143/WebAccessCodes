// security.js - Premium Store Security Core (VIP GOD-TIER)
(function() {
  // ==========================================
  // PROTOCOLO 1: ESCUDO ANTI-IFRAME (FRAME KILLER)
  // ==========================================
  if (window.top !== window.self) {
      window.top.location = window.self.location;
  }

  // ==========================================
  // ESTILOS BASE, ALERTAS COMPACTAS Y BLACKOUT VIP
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
    
    /* ==========================================
       ESTILOS PARA EL BLACKOUT (NUEVO DISEÑO VIP)
       ========================================== */
    body.blackout-mode {
        background: radial-gradient(circle at center, #1a0005 0%, #000 70%) !important;
        display: flex !important; justify-content: center !important; align-items: center !important;
        height: 100vh !important; width: 100vw !important; overflow: hidden !important;
        margin: 0 !important; padding: 0 !important; font-family: 'Montserrat', sans-serif !important;
    }
    .blackout-box {
        background: linear-gradient(145deg, #0a0002, #000);
        border: 1px solid rgba(255, 0, 60, 0.4);
        border-radius: 12px; padding: 30px 20px; text-align: center;
        width: 85%; max-width: 300px; /* Ultra delgado y perfecto para celular */
        box-shadow: 0 0 40px rgba(255, 0, 60, 0.15), inset 0 0 15px rgba(255, 0, 60, 0.1);
        position: relative; overflow: hidden;
        animation: systemLockdown 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
    }
    .blackout-box::before {
        content: ''; position: absolute; top: 0; left: 0; width: 100%; height: 3px;
        background: #ff003c; box-shadow: 0 2px 10px #ff003c;
    }
    .lock-icon-svg { 
        width: 35px; height: 35px; fill: #ff003c; margin-bottom: 15px; 
        filter: drop-shadow(0 0 8px rgba(255,0,60,0.6)); animation: pulseLock 2s infinite; 
    }
    .blackout-box h1 { 
        color: #fff; font-size: 16px; text-transform: uppercase; letter-spacing: 2px; 
        margin: 0 0 8px 0; font-weight: 900; text-shadow: 0 0 10px rgba(255,0,60,0.5); line-height: 1.2;
    }
    .blackout-box p { color: #888; font-size: 11px; line-height: 1.5; margin: 0 0 18px 0; }
    .blackout-tag { 
        display: inline-block; background: rgba(255,0,60,0.1); color: #ff003c; 
        border: 1px solid rgba(255,0,60,0.3); padding: 5px 12px; font-size: 9px; 
        font-weight: 900; border-radius: 6px; letter-spacing: 1px; text-transform: uppercase; 
    }
    
    @keyframes systemLockdown { 0% { transform: scale(0.8) translateY(20px); opacity: 0; } 100% { transform: scale(1) translateY(0); opacity: 1; } }
    @keyframes pulseLock { 0%, 100% { transform: scale(1); opacity: 1; } 50% { transform: scale(1.1); opacity: 0.7; } }
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
  // PROTOCOLO 2: AUTO-DESTRUCCIÓN (DOM BLACKOUT MEJORADO)
  // ==========================================
  let isDestroyed = false;
  function triggerAutoDestruct() {
      if (isDestroyed) return;
      isDestroyed = true;
      document.body.innerHTML = `
          <div class="blackout-box">
              <svg class="lock-icon-svg" viewBox="0 0 24 24">
                  <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/>
              </svg>
              <h1>Acceso Denegado</h1>
              <p>El código fuente ha sido purgado. Se ha detectado un intento de violación en la seguridad del sistema.</p>
              <div class="blackout-tag">IP REGISTRADA</div>
          </div>
      `;
      document.body.className = 'blackout-mode';
      document.head.innerHTML = ''; // Borra el CSS original para romper la página
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
      console.log("%c¡ALTO AHÍ!", "color: red; font-size: 50px; font-weight: bold; text-shadow: 2px 2px 0 #000;");
      console.log("%cEsta área es solo para administradores de Premium Store. Si intentas robar código, el sistema registrará tu actividad.", "color: white; font-size: 16px; background: black; padding: 10px; border-radius: 5px;");
  }, 1500);

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
