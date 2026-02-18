// security.js - Premium Store Security Core (VIP GOD-TIER ULTIMATE)
(function() {
  // ==========================================
  // PROTOCOLO 1: ESCUDO ANTI-IFRAME (FRAME KILLER)
  // ==========================================
  if (window.top !== window.self) {
      window.top.location = window.self.location;
  }

  // ==========================================
  // ESTILOS BASE Y ALERTAS COMPACTAS (DISEÑO PREMIUM)
  // ==========================================
  const css = `
    /* ALERTAS INFERIORES (TOASTS) */
    .premium-sec-alert {
      position: fixed; bottom: 35px; left: 50%; transform: translateX(-50%) translateY(50px) scale(0.9);
      background: linear-gradient(145deg, rgba(15,15,15,0.95), rgba(5,5,5,0.98)); color: #fff; 
      padding: 10px 18px; font-size: 11px; font-family: 'Montserrat', sans-serif; font-weight: 800; 
      text-transform: uppercase; letter-spacing: 1.5px; border-radius: 50px; display: flex; align-items: center; gap: 8px;
      opacity: 0; pointer-events: none; transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
      z-index: 9999999; white-space: nowrap; box-shadow: 0 15px 35px rgba(0, 0, 0, 0.9);
      backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px);
      border: 1px solid rgba(255, 255, 255, 0.05);
    }
    .premium-sec-alert.show { opacity: 1; transform: translateX(-50%) translateY(0) scale(1); }
    .premium-sec-alert.danger { border-left: 3px solid #ff003c; box-shadow: 0 8px 25px rgba(255, 0, 60, 0.25); color: #ff3355; }
    .premium-sec-alert.warning { border-left: 3px solid #d4af37; box-shadow: 0 8px 25px rgba(212, 175, 55, 0.2); color: #d4af37; }
    .premium-sec-alert.info { border-left: 3px solid #00d2ff; box-shadow: 0 8px 25px rgba(0, 210, 255, 0.2); color: #00d2ff; }
    .premium-sec-alert svg { width: 16px; height: 16px; fill: currentColor; filter: drop-shadow(0 0 5px currentColor); }
    
    /* BLOQUEOS NATIVOS */
    * { -webkit-user-select: none !important; -moz-user-select: none !important; -ms-user-select: none !important; user-select: none !important; -webkit-touch-callout: none !important; -webkit-tap-highlight-color: transparent !important; }
    .allow-copy, .allow-copy * { -webkit-user-select: text !important; -moz-user-select: text !important; -ms-user-select: text !important; user-select: text !important; -webkit-touch-callout: default !important; }
    img { -webkit-user-drag: none !important; pointer-events: none !important; }
    
    /* =========================================================
       ESTILOS PARA EL BLACKOUT (AUTO-DESTRUCCIÓN LEGENDARIA)
       ========================================================= */
    body.blackout-mode {
        background: #020202 !important; 
        background-image: radial-gradient(circle at 50% 50%, rgba(255, 0, 60, 0.05) 0%, transparent 60%), 
                          linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
                          linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px) !important;
        background-size: 100% 100%, 30px 30px, 30px 30px !important;
        color: #ff003c !important; font-family: 'Courier New', Courier, monospace !important; 
        display: flex !important; justify-content: center !important; align-items: center !important;
        height: 100vh !important; width: 100vw !important; overflow: hidden !important;
        margin: 0 !important; padding: 0 !important;
    }
    
    .cyber-box {
        background: rgba(5, 0, 0, 0.9); border: 1px solid rgba(255, 0, 60, 0.3);
        padding: 40px; border-radius: 12px; text-align: center;
        box-shadow: 0 0 50px rgba(255, 0, 60, 0.2), inset 0 0 20px rgba(255, 0, 60, 0.1);
        position: relative; overflow: hidden; width: 90%; max-width: 500px;
        animation: boxIn 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    }

    /* Láser de Escaneo */
    .cyber-box::before {
        content: ''; position: absolute; top: -100%; left: 0; width: 100%; height: 2px;
        background: #ff003c; box-shadow: 0 0 20px #ff003c, 0 0 10px #ff003c;
        animation: cyberScan 3s linear infinite;
    }

    /* Icono Escudo Roto */
    .shield-icon { width: 70px; height: 70px; margin-bottom: 20px; filter: drop-shadow(0 0 10px #ff003c); animation: pulseShield 2s infinite alternate; }
    
    /* Texto Glitch Principal */
    .glitch-text {
        font-size: 28px; font-weight: 900; text-transform: uppercase; margin: 0 0 15px 0;
        position: relative; text-shadow: 0 0 10px rgba(255,0,60,0.8); letter-spacing: 2px;
    }
    .glitch-text::before, .glitch-text::after {
        content: 'ACCESO DENEGADO'; position: absolute; top: 0; left: 0; width: 100%; height: 100%;
        background: rgba(5,0,0,0.9);
    }
    .glitch-text::before { left: 2px; text-shadow: -2px 0 #00ffff; clip: rect(24px, 550px, 90px, 0); animation: glitch-anim-2 3s infinite linear alternate-reverse; }
    .glitch-text::after { left: -2px; text-shadow: -2px 0 #ff003c; clip: rect(85px, 550px, 140px, 0); animation: glitch-anim 2.5s infinite linear alternate-reverse; }

    /* Terminal de Registro */
    .terminal-log {
        background: rgba(0, 0, 0, 0.8); border: 1px solid rgba(255, 0, 60, 0.2);
        padding: 15px; border-radius: 6px; text-align: left; font-size: 12px;
        color: #ff3355; margin-top: 25px; line-height: 1.6;
    }
    .terminal-log span { display: block; opacity: 0; animation: typeLine 0.1s forwards; }
    .terminal-log span:nth-child(1) { animation-delay: 0.5s; }
    .terminal-log span:nth-child(2) { animation-delay: 1.5s; }
    .terminal-log span:nth-child(3) { animation-delay: 2.5s; color: #fff; font-weight: bold; }

    /* Animaciones Blackout */
    @keyframes boxIn { 0% { transform: scale(0.8); opacity: 0; } 100% { transform: scale(1); opacity: 1; } }
    @keyframes cyberScan { 0% { top: -10%; opacity: 0; } 10%, 90% { opacity: 1; } 100% { top: 110%; opacity: 0; } }
    @keyframes pulseShield { 0% { transform: scale(0.95); opacity: 0.8; } 100% { transform: scale(1.05); opacity: 1; } }
    @keyframes typeLine { 0% { opacity: 0; transform: translateX(-5px); } 100% { opacity: 1; transform: translateX(0); } }
    @keyframes glitch-anim { 0% { clip: rect(10px, 9999px, 44px, 0); } 20% { clip: rect(112px, 9999px, 76px, 0); } 40% { clip: rect(14px, 9999px, 89px, 0); } 60% { clip: rect(138px, 9999px, 22px, 0); } 80% { clip: rect(54px, 9999px, 108px, 0); } 100% { clip: rect(38px, 9999px, 120px, 0); } }
    @keyframes glitch-anim-2 { 0% { clip: rect(65px, 9999px, 100px, 0); } 20% { clip: rect(10px, 9999px, 50px, 0); } 40% { clip: rect(80px, 9999px, 12px, 0); } 60% { clip: rect(30px, 9999px, 90px, 0); } 80% { clip: rect(110px, 9999px, 20px, 0); } 100% { clip: rect(40px, 9999px, 70px, 0); } }
  `;
  const style = document.createElement('style'); style.textContent = css; document.head.appendChild(style);

  // ==========================================
  // SISTEMA DE ALERTAS VIP
  // ==========================================
  let lastAlertTime = 0;
  function showProtectionAlert(message = "Acción Denegada", type = "warning") {
    if (Date.now() - lastAlertTime < 2000) return; 
    lastAlertTime = Date.now();
    let oldAlert = document.querySelector(".premium-sec-alert"); if (oldAlert) oldAlert.remove();
    const alert = document.createElement("div"); alert.className = `premium-sec-alert ${type}`;
    
    let iconSVG = type === 'danger' ? `<svg viewBox="0 0 24 24"><path d="M12 2L1 21h22M12 6l7.53 13H4.47"/></svg>` : `<svg viewBox="0 0 24 24"><path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/></svg>`;
    alert.innerHTML = `${iconSVG} <span>${message}</span>`;
    document.body.appendChild(alert);
    setTimeout(() => alert.classList.add("show"), 10);
    setTimeout(() => { alert.classList.remove("show"); setTimeout(() => alert.remove(), 400); }, 2000);
  }

  // ==========================================
  // PROTOCOLO 2: AUTO-DESTRUCCIÓN (DOM BLACKOUT LEGENDARIO)
  // ==========================================
  let isDestroyed = false;
  function triggerAutoDestruct() {
      if (isDestroyed) return;
      isDestroyed = true;
      document.body.innerHTML = `
          <div class="cyber-box">
              <svg class="shield-icon" viewBox="0 0 24 24" fill="none" stroke="#ff003c" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                  <line x1="9" y1="9" x2="15" y2="15"></line>
                  <line x1="15" y1="9" x2="9" y2="15"></line>
              </svg>
              <h1 class="glitch-text">ACCESO DENEGADO</h1>
              <p style="color: #aaa; font-size: 12px; letter-spacing: 1px;">Protocolo de seguridad máxima activado.</p>
              
              <div class="terminal-log">
                  <span>> DOM structure... [PURGED]</span>
                  <span>> Developer tools... [DETECTED]</span>
                  <span>> SYSTEM LOCKDOWN INITIATED.</span>
              </div>
          </div>
      `;
      document.body.className = 'blackout-mode';
      document.head.innerHTML = ''; // Destruye el CSS original para romper la web por completo
  }

  // ==========================================
  // PROTOCOLO 3: TRAMPA DE MUTACIÓN (ANTI-TAMPERING)
  // ==========================================
  const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
          mutation.removedNodes.forEach((node) => {
              if (node.tagName === 'SCRIPT' || node.tagName === 'STYLE') triggerAutoDestruct();
          });
      });
  });
  observer.observe(document.documentElement, { childList: true, subtree: true });

  // ==========================================
  // PROTOCOLO 4: INUNDACIÓN DE CONSOLA (CONSOLE JAMMER)
  // ==========================================
  setInterval(() => {
      console.clear();
      console.log("%c⚠️ ACCESO RESTRINGIDO ⚠️", "color: #ff003c; font-size: 30px; font-weight: 900; font-family: sans-serif; text-shadow: 2px 2px 0 #000;");
      console.log("%cEl código fuente de Premium Store está encriptado y protegido por derechos de autor. Cualquier intento de clonación o inyección de scripts resultará en un bloqueo permanente.", "color: #fff; font-size: 14px; background: #111; padding: 15px; border-left: 5px solid #ff003c; border-radius: 4px; font-family: monospace;");
  }, 1000);

  // ==========================================
  // PROTOCOLO 5: BLOQUEO DE DESCARGA Y TECLAS (ANTI-SAVE)
  // ==========================================
  document.addEventListener("keydown", (e) => {
    if ((e.ctrlKey || e.metaKey) && ["s", "p", "u", "a", "c", "x", "v"].includes(e.key.toLowerCase())) {
        e.preventDefault(); e.stopPropagation(); showProtectionAlert("Sistema Protegido", "danger");
    }
    if (e.key === "F12" || (e.ctrlKey && e.shiftKey && ["I", "J", "C", "K"].includes(e.key.toUpperCase()))) {
        e.preventDefault(); e.stopPropagation(); triggerAutoDestruct();
    }
  }, true);

  // Detección del Debugger
  let devToolsOpen = false;
  setInterval(() => {
    let start = performance.now();
    debugger; 
    let timeTaken = performance.now() - start;
    if (timeTaken > 100 && !devToolsOpen) {
      devToolsOpen = true; triggerAutoDestruct();
    }
  }, 2000);

  // INTERACCIONES DE RATÓN (Protección Móvil y PC)
  document.addEventListener("contextmenu", (e) => {
    if (!e.target.closest(".allow-copy")) { e.preventDefault(); e.stopPropagation(); showProtectionAlert("Protección Activa", "warning"); }
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

  console.log("🛡️ Premium Store Security Core: [MODO DIOS SUPREMO INICIADO]");
})();
