// security.js - Código unificado de protección avanzada con estilo profesional neón

(function() {
  // Inyectar CSS dinámicamente
  const css = `
    @keyframes neonPulse {
      0%, 100% {
        text-shadow:
          0 0 5px #0ff,
          0 0 10px #0ff,
          0 0 20px #0ff,
          0 0 40px #0ff,
          0 0 80px #0ff;
        color: #0ff;
      }
      50% {
        text-shadow:
          0 0 10px #0ff,
          0 0 20px #0ff,
          0 0 30px #0ff,
          0 0 50px #0ff,
          0 0 100px #0ff;
        color: #aaffff;
      }
    }

    .protected-alert {
      position: fixed;
      top: 15px;
      left: 50%;
      transform: translateX(-50%) scale(0.9);
      background: rgba(10, 10, 30, 0.95);
      color: #0ff;
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      font-weight: 600;
      font-size: 14px;
      padding: 12px 20px;
      border-radius: 12px;
      display: flex;
      align-items: center;
      gap: 10px;
      opacity: 0;
      pointer-events: none;
      transition: opacity 0.3s ease, transform 0.3s ease;
      z-index: 999999;
      max-width: 95%;
      box-shadow:
        0 0 8px #0ff,
        0 0 20px #0ff,
        0 0 30px #0ff,
        0 0 40px #0ff inset;
      user-select: none;
      letter-spacing: 0.05em;
      animation: neonPulse 3s ease-in-out infinite;
      text-align: center;
    }
    .protected-alert.show {
      opacity: 1;
      transform: translateX(-50%) scale(1);
      pointer-events: auto;
    }
    .protected-alert svg {
      width: 22px;
      height: 22px;
      fill: #0ff;
      flex-shrink: 0;
      filter: drop-shadow(0 0 4px #0ff);
      animation: neonPulse 3s ease-in-out infinite;
    }
  `;
  const style = document.createElement('style');
  style.textContent = css;
  document.head.appendChild(style);

  // Función para mostrar alerta compacta con terminología avanzada
  function showProtectionAlert(message = "⚡ Seguridad Avanzada Activada") {
    let oldAlert = document.querySelector(".protected-alert");
    if (oldAlert) oldAlert.remove();

    const alert = document.createElement("div");
    alert.className = "protected-alert";
    alert.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" role="img" aria-label="Alerta de seguridad">
        <path d="M12 2L1 21h22L12 2zM12 16a1.5 1.5 0 110-3 1.5 1.5 0 010 3zm-1-5h2V7h-2v4z"/>
      </svg>
      <span>${message}</span>
    `;
    document.body.appendChild(alert);

    setTimeout(() => alert.classList.add("show"), 30);
    setTimeout(() => {
      alert.classList.remove("show");
      setTimeout(() => alert.remove(), 300);
    }, 2800);
  }

  // Bloqueo de teclas peligrosas con mensajes técnicos
  document.addEventListener("keydown", (e) => {
    if (
      e.key === "F12" ||
      (e.ctrlKey && e.shiftKey && ["I", "J", "C", "K"].includes(e.key.toUpperCase())) ||
      (e.ctrlKey && ["u","s","p","a","c","x","v"].includes(e.key.toLowerCase()))
    ) {
      e.preventDefault();
      showProtectionAlert("🚫 Acción restringida: Módulo Anti-Inspección activo");
    }
  });

  // Bloquear clic derecho con mensaje profesional
  document.addEventListener("contextmenu", (e) => {
    e.preventDefault();
    showProtectionAlert("🚫 Acceso denegado: Protección Anti-Clic Derecho");
  });

  // Bloquear selección (excepto en .allow-copy) con mensaje técnico
  document.addEventListener("selectstart", (e) => {
    if (!e.target.classList.contains("allow-copy")) {
      e.preventDefault();
      showProtectionAlert("🚫 Protección de contenido: Selección deshabilitada");
    }
  });

  // Bloquear arrastre con mensaje elegante
  document.addEventListener("dragstart", (e) => {
    e.preventDefault();
    showProtectionAlert("🚫 Seguridad avanzada: Arrastre bloqueado");
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
        showProtectionAlert("🚫 Protección móvil: Copia bloqueada");
      }
    }, 550);
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

  // Detección de DevTools con mensaje de alerta avanzada
  setInterval(() => {
    let start = performance.now();
    debugger;
    if (performance.now() - start > 100) {
      showProtectionAlert("🚨 Alerta: Inspección de código detectada");
    }
  }, 1800);

})();
