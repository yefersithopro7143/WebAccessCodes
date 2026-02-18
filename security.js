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
  // PROTOCOLO 2: AUTO-DESTRUCCIÓN (DISEÑO RADIACTIVO LEGENDARIO)
  // ==========================================
  let isDestroyed = false;
  function triggerAutoDestruct() {
      if (isDestroyed) return;
      isDestroyed = true;
      
      // Borrar el head destruye CSS de Blogger pero no afectará a los estilos in-line que pondremos abajo
      document.head.innerHTML = ''; 
      
      // Obtener IP simulada o real si tienes servicio externo (aquí simulo para el impacto visual)
      const fakeIP = Math.floor(Math.random() * 255) + "." + Math.floor(Math.random() * 255) + ".x.x";

      // Reemplazamos el BODY entero con CSS y HTML en línea para asegurar que se vea incluso sin HEAD
      document.body.style.cssText = "margin:0; padding:0; background-color:#050a05; background-image:repeating-linear-gradient(0deg, rgba(57,255,20,0.03) 0px, rgba(57,255,20,0.03) 1px, transparent 1px, transparent 2px); height:100vh; width:100vw; display:flex; justify-content:center; align-items:center; overflow:hidden; font-family:monospace;";
      
      document.body.innerHTML = `
          <style>
              @keyframes glitch-green { 0% { transform: translate(0); text-shadow: 0 0 10px #39ff14; } 20% { transform: translate(-2px, 2px); text-shadow: -2px 0 red, 2px 0 blue; } 40% { transform: translate(-2px, -2px); } 60% { transform: translate(2px, 2px); text-shadow: 0 0 20px #39ff14; } 80% { transform: translate(2px, -2px); } 100% { transform: translate(0); text-shadow: 0 0 10px #39ff14; } }
              @keyframes pulse-ring { 0% { transform: scale(0.8); opacity: 0.8; } 100% { transform: scale(1.5); opacity: 0; } }
              .terminal-box { border: 1px solid #39ff14; background: rgba(0, 20, 0, 0.8); padding: 40px; border-radius: 12px; text-align: center; box-shadow: 0 0 40px rgba(57, 255, 20, 0.2), inset 0 0 20px rgba(57, 255, 20, 0.1); max-width: 450px; position: relative; }
              .terminal-box::before { content: ''; position: absolute; top: 0; left: 0; width: 100%; height: 3px; background: #39ff14; box-shadow: 0 2px 15px #39ff14; }
              .icon-container { position: relative; width: 80px; height: 80px; margin: 0 auto 20px auto; }
              .ring { position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: 2px solid #39ff14; border-radius: 50%; animation: pulse-ring 2s infinite ease-out; }
              .nuke-icon { width: 50px; height: 50px; fill: #39ff14; filter: drop-shadow(0 0 10px #39ff14); position: relative; top: 15px; }
              h1 { color: #39ff14; font-size: 28px; margin: 0 0 10px 0; text-transform: uppercase; letter-spacing: 2px; animation: glitch-green 0.4s infinite; }
              .warning-text { color: #fff; font-size: 14px; line-height: 1.6; margin-bottom: 25px; }
              .ip-box { background: rgba(255, 0, 0, 0.1); border: 1px dashed red; padding: 10px; border-radius: 5px; color: red; font-weight: bold; font-size: 12px; text-transform: uppercase; margin-bottom: 15px; letter-spacing: 1px;}
              .strike-tag { display: inline-block; background: #39ff14; color: #000; font-weight: 900; padding: 5px 10px; font-size: 10px; border-radius: 4px; text-transform: uppercase; }
              .footer-sys { color: #555; font-size: 10px; margin-top: 25px; }
          </style>

          <div class="terminal-box">
              <div class="icon-container">
                  <div class="ring"></div>
                  <svg class="nuke-icon" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
                      <path d="M256 0a256 256 0 1 0 256 256A256.3 256.3 0 0 0 256 0zm0 39.7a216 216 0 0 1 108.9 29.8l-54 93.5a108 108 0 0 0-109.8 0l-54-93.5A216 216 0 0 1 256 39.7zM78.6 150.3l54 93.5a108 108 0 0 0 0 110l-54 93.5a216.3 216.3 0 0 1 0-297zm93.6 242.4a108 108 0 0 0 167.6 0l54 93.5a216.3 216.3 0 0 1-275.6 0zm207.2-28.9l-54-93.5a108 108 0 0 0 0-110l54-93.5a216.3 216.3 0 0 1 0 297z"/>
                      <circle cx="256" cy="256" r="45"/>
                  </svg>
              </div>
              
              <h1>ACCESS DENIED</h1>
              
              <p class="warning-text">El sistema de <b>Premium Store</b> ha detectado un intento de inspección de código. El DOM ha sido purgado por seguridad.</p>
              
              <div class="ip-box">
                  [!] Rastreo de Conexión: IP ${fakeIP} <br>
                  Aviso 1 de 2: Bloqueo Permanente Inminente
              </div>
              
              <div class="strike-tag">SISTEMA CERRADO</div>
              
              <div class="footer-sys">Premium Store Security Core v3.0</div>
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
      console.log("%c☢️ SYSTEM OVERRIDE ☢️", "color: #39ff14; font-size: 40px; font-weight: bold; text-shadow: 0 0 10px #39ff14; background: #000; padding: 20px; border: 2px solid #39ff14;");
      console.log("%cIntento de robo detectado. Abandona la consola inmediatamente o tu IP será registrada en la lista negra.", "color: red; font-size: 16px; background: black; padding: 10px; border-radius: 5px;");
  }, 1000); // Lo aceleré a 1 segundo para ser más molesto

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

  // Detección del Debugger
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

  // INTERACCIONES BÁSICAS DE RATÓN (Protegiendo allow-copy)
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
