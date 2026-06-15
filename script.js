  const htmlEl = document.documentElement;
  const themeCheckbox = document.getElementById('theme-toggle-checkbox');
  
  function setTheme(theme) {
    if (theme === 'light') {
      htmlEl.classList.add('light');
      htmlEl.classList.remove('dark');
      themeCheckbox.checked = true;
    } else {
      htmlEl.classList.remove('light');
      htmlEl.classList.add('dark');
      themeCheckbox.checked = false;
    }
    localStorage.setItem('theme', theme);
  }
  
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'light') setTheme('light');
  else setTheme('dark');
  
  themeCheckbox.addEventListener('change', (e) => {
    if (e.target.checked) setTheme('light');
    else setTheme('dark');
  });

  function typeWriterWithCursor(element, text, speed = 45, callback) {
    let i = 0;
    element.innerHTML = '';
    function typing() {
      if (i < text.length) {
        element.innerHTML += text.charAt(i);
        i++;
        setTimeout(typing, speed);
      } else if (callback) {
        callback();
      }
    }
    typing();
  }

  const greetingEl = document.getElementById('dynamicGreeting');
  const welcomeMsgSpan = document.getElementById('welcomeMessage');
  
  const hour = new Date().getHours();
  let mainGreeting = '';
  if (hour < 12) mainGreeting = 'Bom dia! Eu sou o Matheus';
  else if (hour < 18) mainGreeting = 'Boa tarde! Eu sou o Matheus';
  else mainGreeting = 'Boa noite! Eu sou o Matheus';
  
  const subMsg = 'Esse é meu Portfólio de Figma e Power BI';
  
  typeWriterWithCursor(greetingEl, mainGreeting, 55);
  setTimeout(() => {
    typeWriterWithCursor(welcomeMsgSpan, subMsg, 45);
  }, 400);
  
  const modal = document.getElementById('globalModal');
  const aboutBtn = document.getElementById('aboutBtnGlobal');
  const closeModalBtn = document.getElementById('closeModalBtn');
  
  function openModal() {
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
  }
  
  function closeModal() {
    modal.style.display = 'none';
    document.body.style.overflow = '';
  }
  
  aboutBtn.addEventListener('click', openModal);
  if (closeModalBtn) closeModalBtn.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => { 
    if (e.target === modal) closeModal();
  });
  
  const usernameDiv = document.getElementById('usernameBtn');
  const notif = document.getElementById('notification');
  
  function copyUsername() {
    navigator.clipboard.writeText('@MatheusAbib').then(() => {
      notif.style.display = 'block';
      setTimeout(() => notif.style.display = 'none', 2000);
    });
  }
  usernameDiv.addEventListener('click', copyUsername);
  
  const whatsBtn = document.getElementById('whatsappBtn');
  const notifWpp = document.getElementById('notificationWttp');
  function copyWhatsApp(e) {
    e.preventDefault();
    const number = "+55 11975072008";
    navigator.clipboard.writeText(number).then(() => {
      notifWpp.style.display = 'block';
      setTimeout(() => notifWpp.style.display = 'none', 2000);
    });
  }
  whatsBtn.addEventListener('click', copyWhatsApp);
  
  const allProjectCards = document.querySelectorAll('.project-card');
  allProjectCards.forEach((card, idx) => {
    card.style.animationDelay = `${idx * 0.04}s`;
  });