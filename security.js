// security.js - Premium Store Security Core (Mobile Optimized VIP)
(function() {
  // Inyectar CSS dinámicamente - Diseño Ultra Compacto y Elegante
  const css = `
    .premium-sec-alert {
      position: fixed;
      bottom: 30px; /* Abajo para no tapar la navegación superior del celular */
      left: 50%;
      transform: translateX(-50%) translateY(50px) scale(0.9);
      background: rgba(10, 10, 10, 0.95);
      color: #fff;
      padding: 8px 14px; /* Mucho más pequeño y elegante */
      font-size: 11px; /* Letra pequeña y estética */
      font-family: 'Montserrat', sans-serif;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 1px;
      border-radius: 30px;
      display: flex;
      align-items: center;
      gap: 6px;
      opacity: 0;
      pointer-events: none;
      transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
      z-index: 9999999;
      white-space: nowrap; /* Evita que el texto baje a dos líneas */
      box-shadow: 0 10px 25px rgba(0, 0, 0, 0.8);
      backdrop-filter: blur(10px); -webkit-backdrop-filter: blur(10px);
      border: 1px solid rgba(255, 255, 255, 0.1);
    }
    
    .premium-sec-alert.show {
      opacity: 1;
      transform: translateX(-50%) translateY(0) scale(1);
    }
    
    /* Variantes de color sutiles y profesionales */
    .premium-sec-alert.danger { border-color: #ff3333; box-shadow: 0 5px 15px rgba(255, 51, 51, 0.2); color: #ff3333; }
    .premium-sec-alert.warning { border-color: #d4af37; box-shadow: 0 5px 15px rgba(212, 175, 55, 0.2); color: #d4af37; }
    .premium-sec-alert.info { border-color: #00d2ff; box-shadow: 0 5px 15px rgba(0, 210, 255, 0.2); color: #00d2ff; }
    
    .premium-sec-alert svg { width: 14px; height: 14px; fill: currentColor; }
    
    /* BLOQUEO COMPLETO DE SELECCIÓN Y TOQUES LARGOS EN MÓVIL */
    * {
      -webkit-user-select: none !important;
      -moz-user-select: none !important;
      -ms-user-select: none !important;
      user-select: none !important;
      -webkit-touch-callout: none !important; /* Bloquea el menú de Android/iOS nativo */
      -webkit-tap-highlight-color: transparent !important;
    }
    
    .allow-copy, .allow-copy * {
      -webkit-user-select: text !important;
      -moz-user-select: text !important;
      -ms-user-select: text !important;
      user-select: text !important;
    }
    
    img {
      -webkit-user-drag: none !important;
      pointer-events: none !important; /* Hace que las imágenes sean "intocables" */
    }
  `;
  
  const style = document.createElement('style');
  style.textContent = css;
  document.head.appendChild(style);

  // Control de alertas - evitar spam
  let lastAlertTime = 0;
  let alertCooldown = 2000; // 2 segundos de respiro
  
  function showProtectionAlert(message = "Acción Denegada", type = "warning") {
    const currentTime = Date.now();
    if (currentTime - lastAlertTime < alertCooldown) return; 
    lastAlertTime = currentTime;
    
    let oldAlert = document.querySelector(".premium-sec-alert");
    if (oldAlert) oldAlert.remove();
    
    const alert = document.createElement("div");
    alert.className = `premium-sec-alert ${type}`;
    
    let iconSVG = '';
    if(type === 'danger') {
        iconSVG = `<svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15h2v-2h-2v2zm0-4h2V7h-2v6z"/></svg>`;
    } else if(type === 'warning') {
        iconSVG = `<svg viewBox="0 0 24 24"><path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/></svg>`;
    } else {
        iconSVG = `<svg viewBox="0 0 24 24"><path d="M12 2L1 21h22M12 6l7.53 13H4.47"/></svg>`;
    }
    
    alert.innerHTML = `${iconSVG} <span>${message}</span>`;
    document.body.appendChild(alert);
    
    setTimeout(() => alert.classList.add("show"), 10);
    setTimeout(() => {
      alert.classList.remove("show");
      setTimeout(() => alert.remove(), 400);
    }, 2000);
  }

  // 1. Bloqueo de Teclas (PC)
  document.addEventListener("keydown", (e) => {
    if (e.key === "F12" || (e.ctrlKey && e.shiftKey && ["I", "J", "C", "K"].includes(e.key.toUpperCase())) || (e.ctrlKey && ["u","s","p","a","c","x","v"].includes(e.key.toLowerCase()))) {
      e.preventDefault(); e.stopPropagation();
      showProtectionAlert("Sistema Protegido", "danger");
    }
  }, true);

  // 2. Bloquear Menú Contextual (Clic derecho / Mantener presionado en móvil)
  document.addEventListener("contextmenu", (e) => {
    e.preventDefault(); e.stopPropagation();
    showProtectionAlert("Acción Bloqueada", "warning");
  }, true);

  // 3. Bloquear Selección de Texto
  document.addEventListener("selectstart", (e) => {
    if (!e.target.closest(".allow-copy")) {
      e.preventDefault(); e.stopPropagation();
      // No mostramos alerta aquí para no fastidiar si el dedo resbala en el móvil
    }
  }, true);

  // 4. Bloquear Arrastre de Imágenes
  document.addEventListener("dragstart", (e) => {
    if (!e.target.closest(".allow-copy")) {
      e.preventDefault(); e.stopPropagation();
    }
  }, true);

  // 5. Detección de DevTools (Simplificada para no gastar batería en móvil)
  let devToolsOpen = false;
  setInterval(() => {
    let start = performance.now();
    debugger;
    let timeTaken = performance.now() - start;
    if (timeTaken > 100 && !devToolsOpen) {
      devToolsOpen = true;
      showProtectionAlert("Seguridad Activa", "danger");
    } else if (timeTaken <= 100) {
      devToolsOpen = false;
    }
  }, 3000);

  // 6. Protección de Portapapeles
  document.addEventListener("copy", (e) => {
    if (!e.target.closest(".allow-copy")) {
      e.preventDefault(); e.clipboardData.setData("text/plain", "");
      showProtectionAlert("Copia Restringida", "warning");
    }
  });

  console.log("🛡️ Premium Store Security Core: Online");
})();
