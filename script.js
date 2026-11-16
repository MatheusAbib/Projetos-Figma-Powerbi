
const greetingEl = document.getElementById("dynamicGreeting");
const welcomeMsgSpan = document.getElementById("welcomeMessage");
const modal = document.getElementById("globalModal");
const modalCard = modal?.querySelector(".modal-card");
const aboutBtn = document.getElementById("aboutBtnGlobal");
const aboutBtnProfile = document.getElementById("aboutBtnProfile");
const closeModalBtn = document.getElementById("closeModalBtn");
const usernameBtn = document.getElementById("usernameBtn");
const whatsBtn = document.getElementById("whatsappBtn");
const profileWhatsappBtn = document.getElementById("profileWhatsappBtn");
const notification = document.getElementById("notification");
const currentYear = document.getElementById("currentYear");
const cvDropdown = document.getElementById("cvDropdown");
const cvDropdownBtn = document.getElementById("cvDropdownBtn");

let lastFocusedElement = null;
let notificationTimeout = null;

function typeWriter(element, text, speed = 45, callback = null) {
  if (!element) {
    if (callback) callback();
    return;
  }

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (reducedMotion) {
    element.textContent = text;
    if (callback) callback();
    return;
  }

  let index = 0;
  element.textContent = "";

  const cursor = document.createElement("span");
  cursor.className = "cursor";
  cursor.setAttribute("aria-hidden", "true");
  element.appendChild(cursor);

  function type() {
    if (index < text.length) {
      element.insertBefore(
        document.createTextNode(text.charAt(index)),
        cursor
      );

      index++;
      setTimeout(type, speed);
    } else if (callback) {
      callback();
    }
  }

  type();
}

function initializeGreeting() {
  const hour = new Date().getHours();

  let greeting;

  if (hour < 12) {
    greeting = "Bom dia!\nEu sou o Matheus";
  } else if (hour < 18) {
    greeting = "Boa tarde!\nEu sou o Matheus";
  } else {
    greeting = "Boa noite!\nEu sou o Matheus";
  }

  const subtitle = "Esse é meu portfólio para projetos Figma e Power BI";

  typeWriter(greetingEl, greeting, 42, () => {
    typeWriter(welcomeMsgSpan, subtitle, 24);
  });
}

function openModal() {
  if (!modal || !closeModalBtn) return;

  lastFocusedElement = document.activeElement;

  modal.classList.add("is-open");
  modal.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");

  closeModalBtn.focus();
}

function closeModal() {
  if (!modal) return;

  modal.classList.remove("is-open");
  modal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("modal-open");

  if (lastFocusedElement && typeof lastFocusedElement.focus === "function") {
    lastFocusedElement.focus();
  }
}

function handleModalKeyboard(event) {
  if (!modal || !modalCard || !modal.classList.contains("is-open")) return;

  if (event.key === "Escape") {
    closeModal();
    return;
  }

  if (event.key !== "Tab") return;

  const focusableElements = Array.from(
    modalCard.querySelectorAll(
      'a[href], button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])'
    )
  ).filter(element => element.getClientRects().length > 0);

  if (!focusableElements.length) {
    event.preventDefault();
    modalCard.focus();
    return;
  }

  const first = focusableElements[0];
  const last = focusableElements[focusableElements.length - 1];

  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault();
    last.focus();
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault();
    first.focus();
  }
}

function showNotification(message) {
  if (!notification) return;

  clearTimeout(notificationTimeout);

  notification.textContent = message;
  notification.classList.add("visible");

  notificationTimeout = setTimeout(() => {
    notification.classList.remove("visible");
  }, 2600);
}

async function copyText(text, successMessage) {
  try {
    await navigator.clipboard.writeText(text);
    showNotification(successMessage);
  } catch {
    showNotification("Não foi possível copiar automaticamente.");
  }
}

function closeCvDropdown() {
  if (!cvDropdown || !cvDropdownBtn) return;

  cvDropdown.classList.remove("is-open");
  cvDropdownBtn.setAttribute("aria-expanded", "false");
}

if (aboutBtn) {
  aboutBtn.addEventListener("click", openModal);
}

if (aboutBtnProfile) {
  aboutBtnProfile.addEventListener("click", openModal);

  aboutBtnProfile.addEventListener("keydown", event => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openModal();
    }
  });
}

if (closeModalBtn) {
  closeModalBtn.addEventListener("click", closeModal);
}

if (modal) {
  modal.addEventListener("click", event => {
    if (event.target === modal) {
      closeModal();
    }
  });
}

document.addEventListener("keydown", handleModalKeyboard);

if (usernameBtn) {
  usernameBtn.addEventListener("click", () => {
    copyText("@MatheusAbib", "Usuário do LinkedIn copiado!");
  });
}

if (whatsBtn) {
  whatsBtn.addEventListener("click", () => {
    copyText("+5511975072008", "Número do WhatsApp copiado!");
  });
}

if (profileWhatsappBtn) {
  profileWhatsappBtn.addEventListener("click", () => {
    copyText("+5511975072008", "Número do WhatsApp copiado!");
  });
}

if (cvDropdown && cvDropdownBtn) {
  cvDropdownBtn.addEventListener("click", () => {
    const isOpen = cvDropdown.classList.toggle("is-open");
    cvDropdownBtn.setAttribute("aria-expanded", String(isOpen));
  });

  document.addEventListener("click", event => {
    if (!cvDropdown.contains(event.target)) {
      closeCvDropdown();
    }
  });

  document.addEventListener("keydown", event => {
    if (event.key === "Escape" && cvDropdown.classList.contains("is-open")) {
      closeCvDropdown();
      cvDropdownBtn.focus();
    }
  });

  cvDropdown.querySelectorAll(".cv-dropdown-menu a").forEach(link => {
    link.addEventListener("click", closeCvDropdown);
  });
}

if (currentYear) {
  currentYear.textContent = new Date().getFullYear();
}

initializeGreeting();
