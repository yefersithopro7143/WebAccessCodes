// security.js - Código unificado de protección avanzada (MEJORADO)
(function() {
  // Inyectar CSS dinámicamente
  const css = `
    .protected-alert {
      position: fixed;
      top: 20px;
      left: 50%;
      transform: translateX(-50%) translateY(-100px) scale(0.8);
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: #fff;
      padding: 10px 16px;
      font-size: 13px;
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      font-weight: 500;
      border-radius: 25px;
      display: flex;
      align-items: center;
      gap: 8px;
      opacity: 0;
      pointer-events: none;
      transition: all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
      z-index: 99999;
      max-width: 90%;
      text-align: center;
      box-shadow: 0 8px 32px rgba(102, 126, 234, 0.3),
                  0 4px 12px rgba(0, 0, 0, 0.15);
      backdrop-filter: blur(10px);
      border: 1px solid rgba(255, 255, 255, 0.2);
      animation: shimmer 2s infinite;
    }
    
    @keyframes shimmer {
      0%, 100% { background: linear-gradient(135deg, #6c5ce7 0%, #a29bfe 100%); }
      50% { background: linear-gradient(135deg, #fd79a8 0%, #e84393 100%); }
    }
    
    .protected-alert.show {
      opacity: 1;
      transform: translateX(-50%) translateY(0) scale(1);
    }
    
    .protected-alert.danger {
      background: linear-gradient(135deg, #ff3838 0%, #ff6b35 100%);
      animation: pulse-red 1.5s infinite;
    }
    
    .protected-alert.warning {
      background: linear-gradient(135deg, #ffb347 0%, #ff8c42 100%);
      color: #ffffff;
      animation: pulse-orange 1.5s infinite;
    }
    
    .protected-alert.info {
      background: linear-gradient(135deg, #00cec9 0%, #55a3ff 100%);
      color: #ffffff !important;
      animation: pulse-blue 1.5s infinite;
    }
    
    @keyframes pulse-red {
      0%, 100% { box-shadow: 0 8px 32px rgba(255, 56, 56, 0.5), 0 4px 12px rgba(0, 0, 0, 0.2); }
      50% { box-shadow: 0 12px 40px rgba(255, 107, 53, 0.7), 0 6px 20px rgba(255, 107, 53, 0.4); }
    }
    
    @keyframes pulse-orange {
      0%, 100% { box-shadow: 0 8px 32px rgba(255, 179, 71, 0.5), 0 4px 12px rgba(0, 0, 0, 0.2); }
      50% { box-shadow: 0 12px 40px rgba(255, 140, 66, 0.7), 0 6px 20px rgba(255, 140, 66, 0.4); }
    }
    
    @keyframes pulse-blue {
      0%, 100% { box-shadow: 0 8px 32px rgba(0, 206, 201, 0.5), 0 4px 12px rgba(0, 0, 0, 0.2); }
      50% { box-shadow: 0 12px 40px rgba(85, 163, 255, 0.7), 0 6px 20px rgba(85, 163, 255, 0.4); }
    }
    
    .protected-alert svg {
      width: 16px;
      height: 16px;
      fill: currentColor;
      flex-shrink: 0;
      filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2));
    }
    
    .protected-alert .alert-text {
      letter-spacing: 0.4px;
      text-shadow: 0 2px 6px rgba(0, 0, 0, 0.6);
      font-weight: 600;
    }
    
    .protected-alert::before {
      content: '';
      position: absolute;
      top: -2px;
      left: -2px;
      right: -2px;
      bottom: -2px;
      background: linear-gradient(45deg, transparent, rgba(255, 255, 255, 0.1), transparent);
      border-radius: 27px;
      opacity: 0;
      animation: border-glow 2s infinite;
    }
    
    @keyframes border-glow {
      0%, 100% { opacity: 0; transform: rotate(0deg); }
      50% { opacity: 1; transform: rotate(180deg); }
    }
    
    /* BLOQUEO COMPLETO DE SELECCIÓN */
    * {
      -webkit-user-select: none !important;
      -moz-user-select: none !important;
      -ms-user-select: none !important;
      user-select: none !important;
      -webkit-touch-callout: none !important;
      -webkit-tap-highlight-color: transparent !important;
    }
    
    /* Permitir selección solo en elementos específicos */
    .allow-copy, .allow-copy * {
      -webkit-user-select: text !important;
      -moz-user-select: text !important;
      -ms-user-select: text !important;
      user-select: text !important;
    }
    
    /* Bloquear menú contextual en imágenes */
    img {
      -webkit-user-drag: none !important;
      -khtml-user-drag: none !important;
      -moz-user-drag: none !important;
      -o-user-drag: none !important;
      user-drag: none !important;
      pointer-events: auto !important;
    }
  `;
  
  const style = document.createElement('style');
  style.textContent = css;
  document.head.appendChild(style);

  // Control de alertas - evitar spam
  let lastAlertTime = 0;
  let alertCooldown = 1500; // 1.5 segundos entre alertas
  
  // Función para mostrar alerta compacta (con control de spam y estilos dinámicos)
  function showProtectionAlert(message = "⚠️ Seguridad activa", type = "default") {
    const currentTime = Date.now();
    if (currentTime - lastAlertTime < alertCooldown) {
      return; // Evitar spam de alertas
    }
    lastAlertTime = currentTime;
    
    let oldAlert = document.querySelector(".protected-alert");
    if (oldAlert) oldAlert.remove();
    
    const alert = document.createElement("div");
    alert.className = `protected-alert ${type}`;
    
    // Diferentes iconos según el tipo de alerta
    let iconSVG = '';
    switch(type) {
      case 'danger':
        iconSVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
        </svg>`;
        break;
      case 'warning':
        iconSVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"/>
        </svg>`;
        break;
      case 'info':
        iconSVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/>
        </svg>`;
        break;
      default:
        iconSVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z"/>
        </svg>`;
    }
    
    alert.innerHTML = `
      ${iconSVG}
      <span class="alert-text">${message}</span>
    `;
    
    document.body.appendChild(alert);
    setTimeout(() => alert.classList.add("show"), 50);
    setTimeout(() => {
      alert.classList.remove("show");
      setTimeout(() => alert.remove(), 400);
    }, 2500);
  }

  // Bloqueo de teclas peligrosas
  document.addEventListener("keydown", (e) => {
    if (
      e.key === "F12" ||
      (e.ctrlKey && e.shiftKey && ["I", "J", "C", "K"].includes(e.key.toUpperCase())) ||
      (e.ctrlKey && ["u","s","p","a","c","x","v"].includes(e.key.toLowerCase()))
    ) {
      e.preventDefault();
      e.stopPropagation();
      showProtectionAlert("Acción bloqueada", "danger");
    }
  }, true);

  // Bloquear clic derecho
  document.addEventListener("contextmenu", (e) => {
    e.preventDefault();
    e.stopPropagation();
    showProtectionAlert("Clic derecho no permitido", "danger");
  }, true);

  // Bloquear selección mejorado
  document.addEventListener("selectstart", (e) => {
    if (!e.target.closest(".allow-copy")) {
      e.preventDefault();
      e.stopPropagation();
      showProtectionAlert("Texto protegido", "warning");
    }
  }, true);

  // Bloquear arrastre
  document.addEventListener("dragstart", (e) => {
    if (!e.target.closest(".allow-copy")) {
      e.preventDefault();
      e.stopPropagation();
      showProtectionAlert("Arrastre deshabilitado", "warning");
    }
  }, true);

  // SOLUCIÓN MEJORADA: Pulsación larga en móviles (SIN SPAM)
  let touchTimer;
  let touchStarted = false;
  let scrolling = false;
  let lastScrollTime = 0;

  // Detectar scroll para evitar alertas durante scroll
  document.addEventListener("scroll", () => {
    scrolling = true;
    lastScrollTime = Date.now();
    setTimeout(() => {
      if (Date.now() - lastScrollTime >= 300) {
        scrolling = false;
      }
    }, 300);
  }, { passive: true });

  document.addEventListener("touchstart", (e) => {
    if (e.target.closest(".allow-copy")) return;
    
    touchStarted = true;
    touchTimer = setTimeout(() => {
      // Solo mostrar alerta si NO estamos haciendo scroll Y el touch sigue activo
      if (!scrolling && touchStarted) {
        showProtectionAlert("Selección bloqueada", "warning");
      }
    }, 800); // Aumentamos el tiempo para evitar falsos positivos
  }, { passive: true });

  document.addEventListener("touchmove", () => {
    // Si hay movimiento, probablemente es scroll
    touchStarted = false;
    clearTimeout(touchTimer);
  }, { passive: true });

  document.addEventListener("touchend", () => {
    touchStarted = false;
    clearTimeout(touchTimer);
  }, { passive: true });

  // Bloquear gestos de zoom
  document.addEventListener("gesturestart", (e) => {
    e.preventDefault();
    showProtectionAlert("Zoom bloqueado", "info");
  });

  // Bloquear doble tap para zoom
  let lastTapTime = 0;
let tapCount = 0;

document.addEventListener("touchend", (e) => {
  // Solo 1 dedo por toque
  if (e.changedTouches.length !== 1) return;

  const currentTime = Date.now();
  const timeSinceLastTap = currentTime - lastTapTime;

  // Si pasaron más de 300ms desde el último tap, reiniciamos el contador
  if (timeSinceLastTap > 300) {
    tapCount = 0;
  }

  tapCount++;
  lastTapTime = currentTime;

  // Solo activamos si son exactamente 2 taps rápidos
  if (tapCount === 2) {
    e.preventDefault(); // Bloquear zoom
    showProtectionAlert("Zoom bloqueado", "info");
    tapCount = 0; // Reiniciamos para no detectar triple tap
  } else if (tapCount > 2) {
    // Si se hace triple tap o más, no hacemos nada
    tapCount = 0;
  }
});

  // Detección de DevTools (optimizada)
  let devToolsOpen = false;
  setInterval(() => {
    let start = performance.now();
    debugger;
    let timeTaken = performance.now() - start;
    
    if (timeTaken > 100 && !devToolsOpen) {
      devToolsOpen = true;
      showProtectionAlert("🚨 Inspección detectada", "danger");
    } else if (timeTaken <= 100) {
      devToolsOpen = false;
    }
  }, 2000); // Reducimos la frecuencia para mejor rendimiento

  // Bloqueo adicional de copy/paste
  document.addEventListener("copy", (e) => {
    if (!e.target.closest(".allow-copy")) {
      e.preventDefault();
      e.clipboardData.setData("text/plain", "");
      showProtectionAlert("Copia bloqueada", "warning");
    }
  });

  document.addEventListener("paste", (e) => {
    if (!e.target.closest(".allow-copy")) {
      e.preventDefault();
      showProtectionAlert("Pegado bloqueado", "warning");
    }
  });

  // Protección contra extensiones de captura
  document.addEventListener("beforeprint", (e) => {
    e.preventDefault();
    showProtectionAlert("Impresión bloqueada", "info");
  });

  // Limpiar alertas al cambiar de página
  window.addEventListener("beforeunload", () => {
    const alerts = document.querySelectorAll(".protected-alert");
    alerts.forEach(alert => alert.remove());
  });

  console.log("🛡️ Sistema de protección avanzada activado");
})();
