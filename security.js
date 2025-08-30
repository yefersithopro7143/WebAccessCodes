// security.js - Código unificado de protección avanzada

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
  `;
  const style = document.createElement('style');
  style.textContent = css;
  document.head.appendChild(style);

  // Función para mostrar alerta compacta
  function showProtectionAlert(message = "⚠️ Seguridad activa") {
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
      showProtectionAlert("🚫 Acción bloqueada");
    }
  });

  // Bloquear clic derecho
  document.addEventListener("contextmenu", (e) => {
    e.preventDefault();
    showProtectionAlert("🚫 Clic derecho no permitido");
  });

  // Bloquear selección (excepto en .allow-copy)
  document.addEventListener("selectstart", (e) => {
    if (!e.target.classList.contains("allow-copy")) {
      e.preventDefault();
      showProtectionAlert("🚫 Texto protegido");
    }
  });

  // Bloquear arrastre
  document.addEventListener("dragstart", (e) => {
    e.preventDefault();
    showProtectionAlert("🚫 Arrastre deshabilitado");
  });

  // Pulsación larga en móviles
  let touchTimer;
  document.addEventListener("touchstart", () => {
    touchTimer = setTimeout(() => {
      showProtectionAlert("🚫 Copia en móviles bloqueada");
    }, 550);
  });
  document.addEventListener("touchend", () => clearTimeout(touchTimer));

  // Detección de DevTools
  setInterval(() => {
    let start = performance.now();
    debugger;
    if (performance.now() - start > 100) {
      showProtectionAlert("🚨 Inspección detectada");
    }
  }, 1800);

})();
