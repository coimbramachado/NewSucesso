// Scroll para adicionar/remover classe 'scrolled' no nav
window.addEventListener('scroll', function () {
  const nav = document.querySelector('nav');
  nav.classList.toggle('scrolled', window.scrollY > 50);
});

// Toggle do menu e ícone
const toggleBtn = document.getElementById('menu-toggle');
const menu = document.getElementById('menu');
const icon = toggleBtn.querySelector('i');

toggleBtn.addEventListener('click', function () {
  menu.classList.toggle('show');
  toggleBtn.classList.toggle('active');

  if (icon.classList.contains('fa-bars')) {
    icon.classList.replace('fa-bars', 'fa-times');
  } else {
    icon.classList.replace('fa-times', 'fa-bars');
  }
});

// Fecha o menu ao clicar em qualquer link e faz scroll suave
document.querySelectorAll('#menu a').forEach(link => {
  link.addEventListener('click', function (e) {
    e.preventDefault();

    const targetId = this.getAttribute('href').substring(1);
    const targetSection = document.getElementById(targetId);

    if (targetSection) {
      targetSection.scrollIntoView({ behavior: 'smooth' });
    }

    // Fecha menu
    menu.classList.remove('show');
    toggleBtn.classList.remove('active');
    icon.classList.replace('fa-times', 'fa-bars');
  });
});

// Carrossel de depoimentos
const track = document.querySelector('.carrossel-track');
const depoimentos = Array.from(track.children);

function getDepoimentoWidth() {
  const style = getComputedStyle(depoimentos[0]);
  const marginRight = parseInt(style.marginRight);
  return depoimentos[0].getBoundingClientRect().width + marginRight;
}

let index = 0;

function moverCarrossel() {
  const containerWidth = document.querySelector('.carrossel-container').offsetWidth;
  const depoimentoWidth = getDepoimentoWidth();

  const visiveis = window.innerWidth > 768 ? 3 : 1;

  index++;
  if (index > depoimentos.length - visiveis) {
    index = 0;
  }

  track.style.transform = `translateX(-${depoimentoWidth * index}px)`;
}

setInterval(moverCarrossel, 3000);

window.addEventListener('resize', () => {
  index = 0;
  track.style.transform = `translateX(0)`;
});

// Scroll suave com offset para links internos
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', function(e) {
    e.preventDefault();

    const targetID = this.getAttribute('href').substring(1);
    const targetElement = document.getElementById(targetID);

    if (targetElement) {
      let navbarHeight = 80; // padrão

      const mobileNavbar = document.querySelector('.mobile-navbar'); 
      if (mobileNavbar && window.getComputedStyle(mobileNavbar).display !== 'none') {
        navbarHeight = mobileNavbar.offsetHeight;
      } else {
        const desktopNavbar = document.querySelector('.navbar');
        if (desktopNavbar) {
          navbarHeight = desktopNavbar.offsetHeight;
        }
      }

      const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - navbarHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  });
});
  function filterCategory(event, category) {
      event.preventDefault();

      // Remove classe 'active' de todos os links
      document.querySelectorAll('.mini-navbar ul li a').forEach(link => {
        link.classList.remove('active');
      });

      // Adiciona classe 'active' ao link clicado
      event.target.classList.add('active');

      // Seleciona todos os quadrosPort
      const quadros = document.querySelectorAll('.quadroPort');

      // Mostra ou esconde os quadrosPort com base na categoria
      quadros.forEach(quadro => {
        if (category === 'todos' || quadro.dataset.category === category) {
          quadro.classList.remove('hidden'); // Mostra o quadroPort
        } else {
          quadro.classList.add('hidden'); // Esconde o quadroPort
        }
      });
    }
