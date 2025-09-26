function toggleMenu() {
  const menu = document.getElementById("dropdownMenu");
  const button = document.querySelector(".menu-button");

  menu.classList.toggle("show");
  button.classList.toggle("active");
}

function selectPersona(persona) {
  showCustomAlert(
    "info",
    "👤 Persona Seleccionada",
    "Has seleccionado: " +
      persona +
      "\n\nEsta persona ahora puede usar el chat."
  );
  toggleMenu(); // Cierra el menú después de seleccionar
}

// Cerrar menú al hacer clic fuera
document.addEventListener("click", function (event) {
  const menu = document.getElementById("dropdownMenu");
  const button = document.querySelector(".menu-button");

  if (!menu.contains(event.target) && !button.contains(event.target)) {
    menu.classList.remove("show");
    button.classList.remove("active");
  }
});

const socket = new WebSocket("ws://localhost:4000");

function iniciarChat() {
  // Aquí irá la lógica para iniciar el chat
  showCustomAlert(
    "success",
    "🚀 Chat Iniciado",
    "¡Iniciando chat automático!\n\nEl chat se iniciará en breve..."
  );

  //conexión al servidor (hecha por el back-end porque el del front-end está viendo anime y anuncios de blacked)
  const listaEjemplo = [
  "¡A ver, patrón, con esa pinta de 'yo pongo y yo quito'! ¿No le da pena cómo tienen este país vuelto mierda? ¡Paracos hijueputas!"
  ]
  const listaEjemplo2 = [
    "¡A ver, patrón, con esa pinta de 'yo pongo y yo quito'! ¿No le da pena cómo tienen este país vuelto mierda? ¡Paracos hijueputas!",
    '¡Pena da usted, marica! Con Uribe éramos una berraquera, no este mierdero de vagos que nos trajo su hijueputa de Petro, ¡comunista de mierda!'
  ]

  //ejemplos de como aparecen los textos, en cada actualización el siguiente mensaje queda último, lo mejor para recorrerlos es un console.log(listaEjemplo2[listaEjemplo2.length-1]), de esta forma siempre muestra el último objeto, lo guarda en una variable y ya lo puede poner en el texto, y llevar una variable booleana de control que al ser false muestre textos de el petrista y al ser true textos del uribista

  socket.onmessage = (event) =>{
    const data = JSON.parse(event.data);
    console.log("Conversación actualizada:", data);
  }
}

async function reiniciarChat() {
  // Aquí irá la lógica para reiniciar el chat
  const confirmed = await customConfirm(
    "¿Estás seguro de que quieres reiniciar el chat?\n\nSe perderá el historial actual."
  );
  if (confirmed) {
    showCustomAlert(
      "success",
      "🔄 Chat Reiniciado",
      "Chat reiniciado exitosamente!\n\nPuedes comenzar una nueva conversación."
    );
  }
}

function irAEntrada() {
  // Función para ir a la página de bienvenida
  window.location.href = "../Bienvenida/Index.html";
}

// Custom Alert Functions
function showCustomAlert(type, title, message) {
  const alertContainer = document.getElementById("customAlertContainer");
  const alert = document.getElementById("customAlert");
  const alertIcon = document.getElementById("alertIcon");
  const alertTitle = document.getElementById("alertTitle");
  const alertMessage = document.getElementById("alertMessage");

  // Set content
  alertTitle.textContent = title;
  alertMessage.textContent = message;

  // Set icon and type
  switch (type) {
    case "success":
      alertIcon.textContent = "✅";
      alert.className = "custom-alert alert-success";
      break;
    case "info":
      alertIcon.textContent = "ℹ️";
      alert.className = "custom-alert alert-info";
      break;
    case "warning":
      alertIcon.textContent = "⚠️";
      alert.className = "custom-alert alert-warning";
      break;
    case "error":
      alertIcon.textContent = "❌";
      alert.className = "custom-alert alert-error";
      break;
    default:
      alertIcon.textContent = "👤";
      alert.className = "custom-alert alert-info";
  }

  // Show alert
  alertContainer.style.display = "flex";
  setTimeout(() => {
    alert.classList.add("show");
  }, 10);
}

function closeCustomAlert() {
  const alertContainer = document.getElementById("customAlertContainer");
  const alert = document.getElementById("customAlert");

  alert.classList.remove("show");
  setTimeout(() => {
    alertContainer.style.display = "none";
  }, 300);
}

// Custom confirm function
function customConfirm(message) {
  return new Promise((resolve) => {
    showCustomAlert("warning", "Confirmación", message);

    // Add confirm buttons temporarily
    const alertContent = document.querySelector(".alert-content");
    const existingButtons = alertContent.querySelector(".alert-buttons");
    if (existingButtons) {
      existingButtons.remove();
    }

    const buttonsDiv = document.createElement("div");
    buttonsDiv.className = "alert-buttons";
    buttonsDiv.innerHTML = `
            <button class="btn btn-primary" onclick="handleConfirm(true)">Aceptar</button>
            <button class="btn btn-secondary" onclick="handleConfirm(false)">Cancelar</button>
          `;

    alertContent.appendChild(buttonsDiv);

    window.handleConfirm = (result) => {
      closeCustomAlert();
      resolve(result);
      const buttons = document.querySelector(".alert-buttons");
      if (buttons) buttons.remove();
    };
  });
}


