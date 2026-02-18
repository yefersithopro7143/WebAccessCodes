// security.js - Premium Store Security Core (VIP GOD-TIER)
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
  // PROTOCOLO 2: AUTO-DESTRUCCIÓN (DOM BLACKOUT ÉPICO)
  // ==========================================
  let isDestroyed = false;
  function triggerAutoDestruct() {
      if (isDestroyed) return;
      isDestroyed = true;
      
      // Borramos el head para destruir el CSS de la página original
      document.head.innerHTML = ''; 

      // Inyectamos nuestro propio entorno seguro directamente en el Body
      document.body.innerHTML = `
        <style>
          body { margin: 0; padding: 0; background: #050000; overflow: hidden; }
          .lockdown-container {
             height: 100vh; width: 100vw; display: flex; flex-direction: column; 
             justify-content: center; align-items: center;
             background: radial-gradient(circle at center, rgba(255,0,0,0.1) 0%, #000 70%);
             font-family: 'Courier New', monospace; color: #ff003c; text-align: center;
             z-index: 9999999999; position: fixed; top: 0; left: 0;
          }
          .glitch-text {
             font-size: 32px; font-weight: 900; text-transform: uppercase; letter-spacing: 2px;
             text-shadow: 0 0 20px rgba(255,0,60,0.8); margin: 0 0 10px 0;
             animation: glitch-anim 0.3s infinite;
          }
          .sub-text { font-size: 12px; color: #aaa; max-width: 80%; line-height: 1.5; margin-bottom: 25px; }
          .terminal-box {
             background: rgba(20, 0, 0, 0.8); border: 1px solid #ff003c;
             padding: 20px; border-radius: 8px; text-align: left; font-size: 11px;
             box-shadow: inset 0 0 15px rgba(255,0,60,0.2); width: 85%; max-width: 350px;
          }
          .terminal-line { margin: 6px 0; color: #fff; display: flex; justify-content: space-between;}
          .status-ok { color: #00e676; text-shadow: 0 0 5px #00e676;}
          .status-err { color: #ff003c; animation: blink 1s infinite; text-shadow: 0 0 5px #ff003c;}
          @keyframes glitch-anim {
             0% { transform: translate(0) }
             20% { transform: translate(-2px, 2px) }
             40% { transform: translate(-2px, -2px) }
             60% { transform: translate(2px, 2px) }
             80% { transform: translate(2px, -2px) }
             100% { transform: translate(0) }
          }
          @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
          .shield-icon { width: 70px; height: 70px; fill: none; stroke: #ff003c; stroke-width: 2; margin-bottom: 15px; filter: drop-shadow(0 0 10px #ff003c); stroke-linecap: round; stroke-linejoin: round;}
        </style>
        <div class="lockdown-container">
           <svg class="shield-icon" viewBox="0 0 24 24">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
              <line x1="12" y1="8" x2="12" y2="12"/>
              <line x1="12" y1="16" x2="12.01" y2="16"/>
           </svg>
           <div class="glitch-text">SYSTEM LOCKDOWN</div>
           <div class="sub-text">Violación de seguridad crítica detectada. El DOM ha sido purgado irreversiblemente para proteger a <b>Premium Store</b>.</div>
           <div class="terminal-box">
              <div class="terminal-line"><span>> PROTOCOLO DE DEFENSA:</span> <span class="status-ok">ACTIVO</span></div>
              <div class="terminal-line"><span>> PURGA DE CÓDIGO HTML:</span> <span class="status-ok">COMPLETADA</span></div>
              <div class="terminal-line"><span>> INTENTO DE CLONACIÓN:</span> <span class="status-err">BLOQUEADO</span></div>
              <div class="terminal-line" style="margin-top: 15px; border-top: 1px dashed #ff003c; padding-top: 10px; color: #777;">>_ CONEXIÓN TERMINADA.</div>
           </div>
        </div>
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
      console.log("%c¡ACCESO RESTRINGIDO!", "color: #ff003c; font-size: 40px; font-weight: bold; text-shadow: 2px 2px 0 #000;");
      console.log("%cEsta área es exclusiva para la administración de Premium Store. Cualquier intento de inyección o copia de código activará el bloqueo por IP.", "color: white; font-size: 14px; background: #111; padding: 10px; border: 1px solid #ff003c; border-radius: 5px;");
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
        triggerAutoDestruct(); // Destrucción inmediata al presionar F12
    }
  }, true);

  // Detección del Debugger
  let devToolsOpen = false;
  setInterval(() => {
    let start = performance.now();
    debugger; 
    let timeTaken = performance.now() - start;
    if (timeTaken > 100 && !devToolsOpen) {
      devToolsOpen = true;
      triggerAutoDestruct(); // Destruye la página si detecta el inspector
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
