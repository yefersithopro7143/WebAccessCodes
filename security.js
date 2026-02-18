// security.js - Premium Store Security Core (VIP GOD-TIER)
(function() {
  // ==========================================
  // PROTOCOLO 1: ESCUDO ANTI-IFRAME (FRAME KILLER)
  // ==========================================
  if (window.top !== window.self) {
      window.top.location = window.self.location;
  }

  // ==========================================
  // ESTILOS BASE Y ALERTAS COMPACTAS (Uso Normal)
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
    .premium-sec-alert.danger { border-color: #39ff14; box-shadow: 0 5px 15px rgba(57, 255, 20, 0.3); color: #39ff14; }
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
  // PROTOCOLO 2: AUTO-DESTRUCCIÓN (DOM BLACKOUT - VERDE RADIACTIVO)
  // ==========================================
  let isDestroyed = false;
  
  // Fake IP generator for intimidation
  function generateFakeIP() {
      return `${Math.floor(Math.random()*255)}.${Math.floor(Math.random()*255)}.${Math.floor(Math.random()*255)}.${Math.floor(Math.random()*255)}`;
  }

  function triggerAutoDestruct() {
      if (isDestroyed) return;
      isDestroyed = true;
      
      const fakeIP = generateFakeIP();
      
      // Borramos la página (Head y Body content)
      document.head.innerHTML = '';
      
      // Inyectamos el estilo DIRECTAMENTE en el body para que no se borre
      const blackoutStyles = `
          body {
              background: #050a05 !important; color: #39ff14 !important;
              font-family: 'Courier New', Courier, monospace !important;
              display: flex !important; justify-content: center !important; align-items: center !important;
              height: 100vh !important; width: 100vw !important; overflow: hidden !important;
              margin: 0 !important; padding: 0 !important;
              background-image: 
                  radial-gradient(circle at center, rgba(57, 255, 20, 0.05) 0%, transparent 60%),
                  repeating-linear-gradient(0deg, rgba(57, 255, 20, 0.02) 0px, rgba(57, 255, 20, 0.02) 1px, transparent 1px, transparent 3px) !important;
          }
          .blackout-card {
              background: rgba(0, 20, 0, 0.8) !important; border: 1px solid #39ff14 !important;
              padding: 40px !important; border-radius: 8px !important; text-align: center !important;
              box-shadow: 0 0 40px rgba(57, 255, 20, 0.2), inset 0 0 20px rgba(57, 255, 20, 0.1) !important;
              max-width: 600px !important; width: 90% !important; position: relative !important;
              animation: glitchIn 0.2s linear !important;
          }
          .radar {
              width: 80px; height: 80px; border-radius: 50%; border: 2px solid #39ff14;
              margin: 0 auto 20px; position: relative; overflow: hidden;
              box-shadow: 0 0 20px rgba(57, 255, 20, 0.5);
          }
          .radar::before {
              content: ''; position: absolute; top: 0; left: 50%; width: 50%; height: 50%;
              background: linear-gradient(45deg, rgba(57, 255, 20, 0) 0%, rgba(57, 255, 20, 0.8) 100%);
              transform-origin: bottom left; animation: scan 2s linear infinite;
          }
          .radar::after { content: '⚠️'; position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); font-size: 24px; z-index: 2; }
          .blackout-card h1 { font-size: 28px !important; margin: 0 0 15px 0 !important; text-shadow: 0 0 10px #39ff14 !important; letter-spacing: 2px !important; }
          .blackout-card p { font-size: 14px !important; margin-bottom: 10px !important; line-height: 1.5 !important; }
          .alert-box {
              background: rgba(255, 0, 0, 0.1) !important; border: 1px solid #ff003c !important;
              color: #ff003c !important; padding: 15px !important; margin-top: 25px !important;
              text-align: left !important; font-size: 12px !important;
          }
          .alert-box strong { font-size: 14px; }
          
          @keyframes scan { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
          @keyframes glitchIn { 0% { transform: scale(1.1); filter: contrast(2); } 50% { transform: scale(0.9); filter: invert(1); } 100% { transform: scale(1); filter: none; } }
          @keyframes blinkWarning { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
      `;

      document.body.innerHTML = `
          <style>${blackoutStyles}</style>
          <div class="blackout-card">
              <div class="radar"></div>
              <h1>ACCESO DENEGADO</h1>
              <p>El código fuente ha sido purgado tras detectar una intrusión no autorizada en el DOM.</p>
              <p>Tu intento de inspección/clonación ha activado los protocolos de seguridad.</p>
              
              <div class="alert-box">
                  <strong><span style="animation: blinkWarning 1s infinite;">[!]</span> ADVERTENCIA CRÍTICA</strong><br><br>
                  IP Registrada: ${fakeIP}<br>
                  Acción: Extracción de código bloqueada.<br><br>
                  <em>Aviso 1 de 2: Cierra las herramientas de desarrollo inmediatamente. Un segundo intento resultará en un bloqueo permanente de hardware (MAC Address) y reporte a ISP.</em>
              </div>
              <p style="margin-top: 20px; font-size: 10px; opacity: 0.5;">PREMIUM STORE SECURITY ENFORCEMENT</p>
          </div>
      `;
      // Prevenir el menú de nuevo por si acaso en la pantalla negra
      document.body.oncontextmenu = (e) => e.preventDefault();
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
      console.log("%c¡SISTEMA BLOQUEADO!", "color: #39ff14; font-size: 40px; font-weight: bold; text-shadow: 0 0 10px #39ff14; background: #000; padding: 20px; border: 2px solid #39ff14;");
      console.log("%cTus acciones están siendo monitoreadas. Cierra la consola inmediatamente.", "color: #fff; font-size: 16px; background: #ff003c; padding: 10px;");
  }, 1000);

  // ==========================================
  // PROTOCOLO 5: BLOQUEO DE DESCARGA Y TECLAS (ANTI-SAVE)
  // ==========================================
  document.addEventListener("keydown", (e) => {
    // Bloquea Guardar e Imprimir
    if ((e.ctrlKey || e.metaKey) && ["s", "p", "u", "a", "c", "x", "v"].includes(e.key.toLowerCase())) {
        e.preventDefault(); e.stopPropagation();
        showProtectionAlert("Acción Bloqueada", "danger");
    }
    // Bloquea F12 y Herramientas (Gatilla destrucción)
    if (e.key === "F12" || (e.ctrlKey && e.shiftKey && ["I", "J", "C", "K"].includes(e.key.toUpperCase()))) {
        e.preventDefault(); e.stopPropagation();
        triggerAutoDestruct(); 
    }
  }, true);

  // Detección agresiva del Debugger
  let devToolsOpen = false;
  setInterval(() => {
    let start = performance.now();
    debugger; 
    let timeTaken = performance.now() - start;
    if (timeTaken > 100 && !devToolsOpen) {
      devToolsOpen = true;
      triggerAutoDestruct(); 
    }
  }, 1500);

  // INTERACCIONES TÁCTILES / RATÓN (con soporte allow-copy)
  document.addEventListener("contextmenu", (e) => {
    if (!e.target.closest(".allow-copy")) { e.preventDefault(); e.stopPropagation(); showProtectionAlert("Protegido", "warning"); }
  }, true);

  document.addEventListener("selectstart", (e) => {
    if (!e.target.closest(".allow-copy")) { e.preventDefault(); e.stopPropagation(); }
  }, true);

  document.addEventListener("dragstart", (e) => {
    if (!e.target.closest(".allow-copy")) { e.preventDefault(); e.stopPropagation(); }
  }, true);

  document.addEventListener("copy", (e) => {
    if (!e.target.closest(".allow-copy")) { e.preventDefault(); e.clipboardData.setData("text/plain", ""); showProtectionAlert("Copia Bloqueada", "warning"); }
  });

  console.log("🛡️ Premium Store Security Core: [MODO DIOS ACTIVADO]");
})();
