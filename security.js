// security.js - Código unificado de protección avanzada (MEJORADO)
(function() {
  // Inyectar CSS dinámicamente
  const css = `
    .protected-alert {
      position: fixed;
      bottom: 15px;
      left: 50%;
      transform: translateX(-50%) scale(0.9);
      background: rgba(0, 0, 0, 0.85);
      color: #fff;
      padding: 8px 14px;
      font-size: 13px;
      border-radius: 8px;
      display: flex;
      align-items: center;
      gap: 6px;
      opacity: 0;
      pointer-events: none;
      transition: opacity 0.25s ease, transform 0.25s ease;
      z-index: 99999;
      max-width: 90%;
      text-align: center;
    }
    .protected-alert.show {
      opacity: 1;
      transform: translateX(-50%) scale(1);
    }
    .protected-alert svg {
      width: 18px;
      height: 18px;
      fill: #ffcc00;
      flex-shrink: 0;
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
  
  // Función para mostrar alerta compacta (con control de spam)
  function showProtectionAlert(message = "⚠️ Seguridad activa") {
    const currentTime = Date.now();
    if (currentTime - lastAlertTime < alertCooldown) {
      return; // Evitar spam de alertas
    }
    lastAlertTime = currentTime;
    
    let oldAlert = document.querySelector(".protected-alert");
    if (oldAlert) oldAlert.remove();
    
    const alert = document.createElement("div");
    alert.className = "protected-alert";
    alert.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path d="M12 2L1 21h22L12 2zM12 16a1.5 1.5 0 110-3 1.5 1.5 0 010 3zm-1-5h2V7h-2v4z"/>
      </svg>
      <span>${message}</span>
    `;
    
    document.body.appendChild(alert);
    setTimeout(() => alert.classList.add("show"), 30);
    setTimeout(() => {
      alert.classList.remove("show");
      setTimeout(() => alert.remove(), 250);
    }, 2200);
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
      showProtectionAlert("🚫 Acción bloqueada");
    }
  }, true);

  // Bloquear clic derecho
  document.addEventListener("contextmenu", (e) => {
    e.preventDefault();
    e.stopPropagation();
    showProtectionAlert("🚫 Clic derecho no permitido");
  }, true);

  // Bloquear selección mejorado
  document.addEventListener("selectstart", (e) => {
    if (!e.target.closest(".allow-copy")) {
      e.preventDefault();
      e.stopPropagation();
      showProtectionAlert("🚫 Texto protegido");
    }
  }, true);

  // Bloquear arrastre
  document.addEventListener("dragstart", (e) => {
    if (!e.target.closest(".allow-copy")) {
      e.preventDefault();
      e.stopPropagation();
      showProtectionAlert("🚫 Arrastre deshabilitado");
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
        showProtectionAlert("🚫 Selección bloqueada");
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
    showProtectionAlert("🚫 Zoom bloqueado");
  });

  // Bloquear doble tap para zoom
  let lastTap = 0;
  document.addEventListener("touchend", (e) => {
    const currentTime = new Date().getTime();
    const tapLength = currentTime - lastTap;
    if (tapLength < 500 && tapLength > 0) {
      e.preventDefault();
      showProtectionAlert("🚫 Zoom bloqueado");
    }
    lastTap = currentTime;
  });

  // Detección de DevTools (optimizada)
  let devToolsOpen = false;
  setInterval(() => {
    let start = performance.now();
    debugger;
    let timeTaken = performance.now() - start;
    
    if (timeTaken > 100 && !devToolsOpen) {
      devToolsOpen = true;
      showProtectionAlert("🚨 Inspección detectada");
    } else if (timeTaken <= 100) {
      devToolsOpen = false;
    }
  }, 2000); // Reducimos la frecuencia para mejor rendimiento

  // Bloqueo adicional de copy/paste
  document.addEventListener("copy", (e) => {
    if (!e.target.closest(".allow-copy")) {
      e.preventDefault();
      e.clipboardData.setData("text/plain", "");
      showProtectionAlert("🚫 Copia bloqueada");
    }
  });

  document.addEventListener("paste", (e) => {
    if (!e.target.closest(".allow-copy")) {
      e.preventDefault();
      showProtectionAlert("🚫 Pegado bloqueado");
    }
  });

  // Protección contra extensiones de captura
  document.addEventListener("beforeprint", (e) => {
    e.preventDefault();
    showProtectionAlert("🚫 Impresión bloqueada");
  });

  // Limpiar alertas al cambiar de página
  window.addEventListener("beforeunload", () => {
    const alerts = document.querySelectorAll(".protected-alert");
    alerts.forEach(alert => alert.remove());
  });

  console.log("🛡️ Sistema de protección avanzada activado");
})();
