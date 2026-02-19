// security.js - Premium Store Security Core (VIP GOD-TIER FINAL)
(function() {
  // ==========================================
  // PROTOCOLO 1: ESCUDO ANTI-IFRAME (FRAME KILLER)
  // ==========================================
  if (window.top !== window.self) { window.top.location = window.self.location; }

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
      backdrop-filter: blur(10px); -webkit-backdrop-filter: blur(10px); border: 1px solid rgba(255, 255, 255, 0.1);
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
    if (Date.now() - lastAlertTime < 2000) return; lastAlertTime = Date.now();
    let oldAlert = document.querySelector(".premium-sec-alert"); if (oldAlert) oldAlert.remove();
    const alert = document.createElement("div"); alert.className = `premium-sec-alert ${type}`;
    let iconSVG = type === 'danger' ? `<svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15h2v-2h-2v2zm0-4h2V7h-2v6z"/></svg>` : `<svg viewBox="0 0 24 24"><path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/></svg>`;
    alert.innerHTML = `${iconSVG} <span>${message}</span>`;
    document.body.appendChild(alert);
    setTimeout(() => alert.classList.add("show"), 10); setTimeout(() => { alert.classList.remove("show"); setTimeout(() => alert.remove(), 400); }, 2000);
  }

  // ==========================================
  // PROTOCOLO 2: AUTO-DESTRUCCIÓN (REDSEÑO PROFESIONAL)
  // Se activa ANTES de que el debugger pause el navegador.
  // ==========================================
  let isDestroyed = false;
  function triggerAutoDestruct() {
      if (isDestroyed) return;
      isDestroyed = true;
      
      // Usamos setTimeout(0) para forzar al navegador a renderizar esto ANTES de pausar
      setTimeout(() => {
          document.head.innerHTML = ''; 
          const fakeIP = "192.168." + Math.floor(Math.random() * 99) + ".XXX";

          document.body.style.cssText = "margin:0; padding:0; background-color:#0a0000; background-image:repeating-linear-gradient(0deg, rgba(255,0,0,0.05) 0px, rgba(255,0,0,0.05) 1px, transparent 1px, transparent 2px); height:100vh; width:100vw; display:flex; justify-content:center; align-items:center; overflow:hidden; font-family: 'Courier New', monospace;";
          
          document.body.innerHTML = `
              <style>
                  @keyframes glitch-hard { 0% { transform: translate(0); } 20% { transform: translate(-3px, 3px); clip-path: inset(10% 0 85% 0); } 40% { transform: translate(3px, -3px); clip-path: inset(40% 0 40% 0); } 60% { transform: translate(-3px, 3px); clip-path: inset(75% 0 10% 0); } 80% { transform: translate(3px, -3px); clip-path: inset(20% 0 60% 0); } 100% { transform: translate(0); clip-path: inset(0 0 0 0); } }
                  @keyframes pulse-red { 0% { box-shadow: 0 0 0 0 rgba(255, 0, 0, 0.7); } 70% { box-shadow: 0 0 0 20px rgba(255, 0, 0, 0); } 100% { box-shadow: 0 0 0 0 rgba(255, 0, 0, 0); } }
                  @keyframes blink-text { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } }

                  .terminal-box { 
                      border: 2px solid #ff003c; background: rgba(20, 0, 0, 0.95); padding: 35px 25px; border-radius: 8px; text-align: center; 
                      box-shadow: 0 0 60px rgba(255, 0, 60, 0.3), inset 0 0 30px rgba(255, 0, 0, 0.2); width: 85%; max-width: 320px; position: relative;
                  }
                  .terminal-box::before { content: 'SYSTEM_FAILURE_ID_#992A'; position: absolute; top: -12px; left: 50%; transform: translateX(-50%); background: #ff003c; color: #000; font-weight: bold; font-size: 10px; padding: 2px 10px; border-radius: 4px; }
                  
                  .icon-container { position: relative; width: 80px; height: 80px; margin: 0 auto 25px auto; }
                  .ring { position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 60px; height: 60px; border-radius: 50%; background: #ff003c; animation: pulse-red 2s infinite; opacity: 0.5;}
                  .nuke-icon { width: 60px; height: 60px; fill: #fff; filter: drop-shadow(0 0 15px #ff003c); position: relative; z-index: 2; animation: glitch-hard 1s infinite linear alternate-reverse;}
                  
                  h1 { color: #ff003c; font-size: 26px; margin: 0 0 15px 0; text-transform: uppercase; letter-spacing: 3px; font-weight: 900; text-shadow: 0 0 10px #ff003c; }
                  .warning-text { color: #fff; font-size: 13px; line-height: 1.5; margin-bottom: 25px; font-weight: 600; }
                  
                  .ip-box { 
                      background: #000; border: 2px solid #ff003c; padding: 15px; border-radius: 4px; color: #ff003c; font-weight: bold; font-size: 13px; 
                      text-transform: uppercase; margin-bottom: 20px; letter-spacing: 1px; font-family: 'Courier New', monospace; position: relative; overflow: hidden;
                  }
                  .ip-box::after { content: ''; position: absolute; top: 0; left: -100%; width: 100%; height: 100%; background: linear-gradient(90deg, transparent, rgba(255,0,60,0.4), transparent); animation: scan 2s infinite linear; }
                  @keyframes scan { to { left: 100%; } }

                  .alert-level { color: #fff; font-size: 14px; margin-top: 10px; animation: blink-text 0.5s infinite; }
                  .footer-sys { color: #666; font-size: 9px; margin-top: 25px; letter-spacing: 2px; text-transform: uppercase;}
              </style>

              <div class="terminal-box">
                  <div class="icon-container">
                      <div class="ring"></div>
                      <svg class="nuke-icon" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 19h2v-6h-2v6zm0-8h2V7h-2v6z"/></svg>
                  </div>
                  
                  <h1>VIOLACIÓN CRÍTICA</h1>
                  
                  <p class="warning-text">Se ha detectado un intento de acceso no autorizado al código fuente. El sistema ha sido purgado.</p>
                  
                  <div class="ip-box">
                      > RASTREO IP: ${fakeIP}<br>
                      > ESTADO: REGISTRADA
                      <div class="alert-level">AVISO 1 DE 2: BLOQUEO PERMANENTE</div>
                  </div>
                  
                  <div class="footer-sys">Premium Store Security Core || ID: ERR_DOM_TAMPER</div>
              </div>
          `;
      }, 0); // El '0' es clave: fuerza el renderizado antes de la siguiente pausa de JS
  }

  // ==========================================
  // PROTOCOLO 3: TRAMPA DE MUTACIÓN
  // ==========================================
  const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
          mutation.removedNodes.forEach((node) => {
              if (node.tagName === 'SCRIPT' || node.tagName === 'STYLE') { triggerAutoDestruct(); }
          });
      });
  });
  observer.observe(document.documentElement, { childList: true, subtree: true });

  // ==========================================
  // PROTOCOLO 4: INUNDACIÓN DE CONSOLA
  // ==========================================
  setInterval(() => {
      console.clear();
      console.log("%c🛑 ACCESO DENEGADO 🛑", "color: red; font-size: 35px; font-weight: 900; text-shadow: 0 0 10px red; background: #000; padding: 20px; border: 3px solid red;");
      console.log("%cTu dirección IP y actividad han sido registradas por el sistema de seguridad de Premium Store. Cierra esta ventana.", "color: white; font-size: 14px; background: #111; padding: 10px; border-left: 3px solid red; font-family: monospace;");
  }, 800); 

  // ==========================================
  // PROTOCOLO 5: BLOQUEO DE DESCARGA Y TECLAS
  // ==========================================
  document.addEventListener("keydown", (e) => {
    if ((e.ctrlKey || e.metaKey) && ["s", "p", "u", "a", "c", "x", "v"].includes(e.key.toLowerCase())) {
        e.preventDefault(); e.stopPropagation(); showProtectionAlert("Acción Restringida", "danger");
    }
    // Gatillo inmediato si tocan F12
    if (e.key === "F12" || (e.ctrlKey && e.shiftKey && ["I", "J", "C", "K"].includes(e.key.toUpperCase()))) {
        e.preventDefault(); e.stopPropagation(); triggerAutoDestruct(); 
    }
  }, true);

  // ==========================================
  // DETECCIÓN AGRESIVA DEL DEBUGGER (NUEVO MÉTODO)
  // Se activa el trigger ANTES del debugger;
  // ==========================================
  setInterval(() => {
      // Si la consola está abierta, esto gatilla la destrucción visual
      // Y milisegundos después, el navegador se pausa en el 'debugger'.
      triggerAutoDestruct();
      debugger; 
  }, 2000);

  // Interacciones básicas (Respeta allow-copy)
  document.addEventListener("contextmenu", (e) => { if (!e.target.closest(".allow-copy")) { e.preventDefault(); e.stopPropagation(); showProtectionAlert("Acción Bloqueada", "warning"); } }, true);
  document.addEventListener("selectstart", (e) => { if (!e.target.closest(".allow-copy")) { e.preventDefault(); e.stopPropagation(); } }, true);
  document.addEventListener("dragstart", (e) => { if (!e.target.closest(".allow-copy")) { e.preventDefault(); e.stopPropagation(); } }, true);
  document.addEventListener("copy", (e) => { if (!e.target.closest(".allow-copy")) { e.preventDefault(); e.clipboardData.setData("text/plain", ""); showProtectionAlert("Copia Restringida", "warning"); } });

  console.log("🛡️ Security Core: [ONLINE]");
})();
