// security.js - Código unificado de protección avanzada con estilo profesional

(function() {
  // Inyectar CSS dinámicamente
  const css = `
    /* Fondo oscuro que cubre toda la pantalla para resaltar el mensaje */
    .protected-overlay {
      position: fixed;
      top: 0; left: 0; right: 0; bottom: 0;
      background: rgba(0, 0, 0, 0.65);
      backdrop-filter: blur(4px);
      z-index: 99998;
      opacity: 0;
      pointer-events: none;
      transition: opacity 0.3s ease;
    }
    .protected-overlay.active {
      opacity: 1;
      pointer-events: auto;
    }

    /* Contenedor del mensaje en la parte superior */
    .protected-alert {
      position: fixed;
      top: 20px;
      left: 50%;
      transform: translateX(-50%) translateY(-20px);
      background: linear-gradient(135deg, #1a1a1a, #111111);
      color: #ffd633;
      padding: 12px 24px;
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      font-weight: 600;
      font-size: 14px;
      border-radius: 12px;
      box-shadow: 0 8px 20px rgba(255, 214, 51, 0.4);
      display: flex;
      align-items: center;
      gap: 10px;
      max-width: 90%;
      max-width: clamp(280px, 40vw, 480px);
      opacity: 0;
      pointer-events: none;
      transition: opacity 0.35s cubic-bezier(0.4, 0, 0.2, 1), transform 0.35s cubic-bezier(0.4, 0, 0.2, 1);
      z-index: 99999;
      user-select: none;
    }
    .protected-alert.show {
      opacity: 1;
      pointer-events: auto;
      transform: translateX(-50%) translateY(0);
    }
    .protected-alert.hide {
      opacity: 0;
      transform: translateX(-50%) translateY(-20px);
      pointer-events: none;
    }

    /* Icono de advertencia */
    .protected-alert svg {
      width: 20px;
      height: 20px;
      flex-shrink: 0;
      fill: #ffd633;
      filter: drop-shadow(0 0 2px #ffd633aa);
      animation: pulse 2.5s infinite ease-in-out;
    }

    /* Animación sutil de pulso para el icono */
    @keyframes pulse {
      0%, 100% { transform: scale(1); opacity: 1; }
      50% { transform: scale(1.1); opacity: 0.8; }
    }
  `;
  const style = document.createElement('style');
  style.textContent = css;
  document.head.appendChild(style);

  // Crear overlay oscuro para resaltar el mensaje
  let overlay = document.createElement('div');
  overlay.className = 'protected-overlay';
  document.body.appendChild(overlay);

  // Función para mostrar alerta profesional
  function showProtectionAlert(message = "⚠️ Seguridad Avanzada Activada") {
    // Eliminar alerta previa si existe
    let oldAlert = document.querySelector(".protected-alert");
    if (oldAlert) {
      oldAlert.classList.add('hide');
      setTimeout(() => oldAlert.remove(), 350);
    }

    // Activar overlay
    overlay.classList.add('active');

    // Crear nuevo mensaje
    const alert = document.createElement("div");
    alert.className = "protected-alert";
    alert.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <path d="M12 2L1 21h22L12 2zM12 16a1.5 1.5 0 110-3 1.5 1.5 0 010 3zm-1-5h2V7h-2v4z"/>
      </svg>
      <span>${message}</span>
    `;
    document.body.appendChild(alert);

    // Forzar reflow para animar
    void alert.offsetWidth;
    alert.classList.add("show");

    // Duración extendida: 3.5 segundos visible + 0.35s fade out
    setTimeout(() => {
      alert.classList.remove("show");
      alert.classList.add("hide");
      overlay.classList.remove('active');
      setTimeout(() => alert.remove(), 350);
    }, 3500);
  }

  // Bloqueo de teclas peligrosas
  document.addEventListener("keydown", (e) => {
    if (
      e.key === "F12" ||
      (e.ctrlKey && e.shiftKey && ["I", "J", "C", "K"].includes(e.key.toUpperCase())) ||
      (e.ctrlKey && ["u","s","p","a","c","x","v"].includes(e.key.toLowerCase()))
    ) {
      e.preventDefault();
      showProtectionAlert("🚫 Acción bloqueada - Seguridad Avanzada");
    }
  });

  // Bloquear clic derecho
  document.addEventListener("contextmenu", (e) => {
    e.preventDefault();
    showProtectionAlert("🚫 Clic derecho deshabilitado");
  });

  // Bloquear selección (excepto en .allow-copy)
  document.addEventListener("selectstart", (e) => {
    if (!e.target.classList.contains("allow-copy")) {
      e.preventDefault();
      showProtectionAlert("🚫 Protección de contenido activa");
    }
  });

  // Bloquear arrastre
  document.addEventListener("dragstart", (e) => {
    e.preventDefault();
    showProtectionAlert("🚫 Arrastre deshabilitado");
  });

  // Pulsación larga en móviles con detección de scroll
  let touchTimer;
  let startY = 0;
  let moved = false;
  document.addEventListener("touchstart", (e) => {
    moved = false;
    startY = e.touches[0].clientY;
    touchTimer = setTimeout(() => {
      if (!moved) {
        showProtectionAlert("🚫 ActiCopy activado - Copia bloqueada");
      }
    }, 600);
  });

  document.addEventListener("touchmove", (e) => {
    let currentY = e.touches[0].clientY;
    if (Math.abs(currentY - startY) > 10) {
      moved = true;
      clearTimeout(touchTimer);
    }
  });
  document.addEventListener("touchend", () => {
    clearTimeout(touchTimer);
  });

  // Detección de DevTools
  setInterval(() => {
    let start = performance.now();
    debugger;
    if (performance.now() - start > 100) {
      showProtectionAlert("🚨 Inspección detectada - Seguridad reforzada");
    }
  }, 1800);

})();
