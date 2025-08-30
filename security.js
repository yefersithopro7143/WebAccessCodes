// security.js - Protección avanzada mejorada con overlay y mensajes centrados

(function() {
  // Inyectar CSS dinámicamente
  const css = `
    /* Overlay oscuro que bloquea interacción y scroll */
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

    /* Contenedor del mensaje centrado */
    .protected-alert {
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%) scale(0.9);
      background: linear-gradient(135deg, #1a1a1a, #111111);
      color: #ffd633;
      padding: 16px 32px;
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      font-weight: 700;
      font-size: 16px;
      border-radius: 14px;
      box-shadow: 0 10px 30px rgba(255, 214, 51, 0.45);
      display: flex;
      align-items: center;
      gap: 12px;
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
      transform: translate(-50%, -50%) scale(1);
    }
    .protected-alert.hide {
      opacity: 0;
      transform: translate(-50%, -50%) scale(0.9);
      pointer-events: none;
    }

    /* Icono de advertencia */
    .protected-alert svg {
      width: 22px;
      height: 22px;
      flex-shrink: 0;
      fill: #ffd633;
      filter: drop-shadow(0 0 3px #ffd633cc);
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

  // Crear overlay oscuro para bloquear interacción y scroll
  let overlay = document.createElement('div');
  overlay.className = 'protected-overlay';
  document.body.appendChild(overlay);

  // Función para bloquear scroll cuando overlay está activo
  function toggleBodyScroll(block) {
    if (block) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }

  // Función para mostrar alerta profesional y centrada
  function showProtectionAlert(message = "⚠️ Seguridad") {
    // Eliminar alerta previa si existe
    let oldAlert = document.querySelector(".protected-alert");
    if (oldAlert) {
      oldAlert.classList.add('hide');
      setTimeout(() => oldAlert.remove(), 350);
    }

    // Activar overlay y bloquear scroll
    overlay.classList.add('active');
    toggleBodyScroll(true);

    // Crear nuevo mensaje
    const alert = document.createElement("div");
    alert.className = "protected-alert";
    alert.setAttribute('role', 'alert');
    alert.setAttribute('aria-live', 'assertive');
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

    // Duración: 3.5 segundos visible + 0.35s fade out
    setTimeout(() => {
      alert.classList.remove("show");
      alert.classList.add("hide");
      overlay.classList.remove('active');
      toggleBodyScroll(false);
      setTimeout(() => alert.remove(), 350);
    }, 3500);
  }

  // Detectar si es dispositivo móvil (simplificado)
  const isMobile = /Mobi|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

  // Bloqueo de teclas peligrosas (PC y móviles)
  document.addEventListener("keydown", (e) => {
    if (
      e.key === "F12" ||
      (e.ctrlKey && e.shiftKey && ["I", "J", "C", "K"].includes(e.key.toUpperCase())) ||
      (e.ctrlKey && ["u","s","p","a","c","x","v"].includes(e.key.toLowerCase()))
    ) {
      e.preventDefault();
      showProtectionAlert("Acción bloqueada");
    }
  });

  // Bloquear clic derecho solo en PC
  if (!isMobile) {
    document.addEventListener("contextmenu", (e) => {
      e.preventDefault();
      showProtectionAlert("Clic derecho bloqueado");
    });
  }

  // Bloquear selección de texto (excepto en .allow-copy) en PC y móviles
  document.addEventListener("selectstart", (e) => {
    if (!e.target.classList.contains("allow-copy")) {
      e.preventDefault();
      showProtectionAlert("Selección bloqueada");
    }
  });

  // Bloquear arrastre en todos los dispositivos
  document.addEventListener("dragstart", (e) => {
    e.preventDefault();
    showProtectionAlert("Arrastre bloqueado");
  });

  // En móviles, eliminar pulsación larga para evitar conflicto con selección
  // Solo se usa bloqueo de selección para evitar "locuras"
  // Por eso no se implementa pulsación larga aquí

  // Detección de DevTools
  setInterval(() => {
    let start = performance.now();
    debugger;
    if (performance.now() - start > 100) {
      showProtectionAlert("Inspección detectada");
    }
  }, 1800);

})();
