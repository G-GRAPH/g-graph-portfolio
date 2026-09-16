document.addEventListener('DOMContentLoaded', () => {
  const enhancementStyles = document.createElement('link');
  enhancementStyles.rel = 'stylesheet';
  enhancementStyles.href = 'enhancements.css';
  document.head.appendChild(enhancementStyles);

  const header = document.querySelector('.site-header');
  const nav = document.querySelector('.main-nav');
  if (nav) {
    const menuButton = document.createElement('button');
    menuButton.className = 'menu-toggle';
    menuButton.type = 'button';
    menuButton.setAttribute('aria-label', 'Open navigation menu');
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.innerHTML = '☰';
    nav.prepend(menuButton);

    const closeMenu = () => {
      nav.classList.remove('menu-open');
      menuButton.setAttribute('aria-expanded', 'false');
      menuButton.setAttribute('aria-label', 'Open navigation menu');
      menuButton.innerHTML = '☰';
    };

    menuButton.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('menu-open');
      menuButton.setAttribute('aria-expanded', String(isOpen));
      menuButton.setAttribute('aria-label', isOpen ? 'Close navigation menu' : 'Open navigation menu');
      menuButton.innerHTML = isOpen ? '×' : '☰';
    });

    nav.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));
    document.addEventListener('click', (event) => {
      if (!nav.contains(event.target)) closeMenu();
    });
    window.addEventListener('resize', () => {
      if (window.innerWidth > 680) closeMenu();
    });
  }

  if (header) {
    const updateHeader = () => header.classList.toggle('scrolled', window.scrollY > 18);
    updateHeader();
    window.addEventListener('scroll', updateHeader, { passive: true });
  }

  const revealItems = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealItems.forEach((item) => revealObserver.observe(item));
  } else {
    revealItems.forEach((item) => item.classList.add('visible'));
  }

  const slides = [...document.querySelectorAll('.slide')];
  const dotsWrap = document.querySelector('.carousel-dots');
  const prevButton = document.querySelector('.carousel-arrow.prev');
  const nextButton = document.querySelector('.carousel-arrow.next');
  let currentIndex = 0;
  let autoplay;

  if (slides.length && dotsWrap) {
    slides.forEach((_, index) => {
      const dot = document.createElement('button');
      dot.type = 'button';
      dot.className = 'carousel-dot';
      dot.setAttribute('aria-label', `Show slide ${index + 1}`);
      dot.addEventListener('click', () => {
        currentIndex = index;
        renderSlides();
        restartAutoPlay();
      });
      dotsWrap.appendChild(dot);
    });

    function renderSlides() {
      slides.forEach((slide, index) => slide.classList.toggle('is-active', index === currentIndex));
      dotsWrap.querySelectorAll('.carousel-dot').forEach((dot, index) => dot.classList.toggle('active', index === currentIndex));
    }

    function restartAutoPlay() {
      clearInterval(autoplay);
      autoplay = setInterval(() => {
        currentIndex = (currentIndex + 1) % slides.length;
        renderSlides();
      }, 5600);
    }

    prevButton?.addEventListener('click', () => {
      currentIndex = (currentIndex - 1 + slides.length) % slides.length;
      renderSlides();
      restartAutoPlay();
    });

    nextButton?.addEventListener('click', () => {
      currentIndex = (currentIndex + 1) % slides.length;
      renderSlides();
      restartAutoPlay();
    });

    renderSlides();
    restartAutoPlay();
  }

  const lightbox = document.querySelector('.lightbox');
  const lightboxImage = document.querySelector('.lightbox-stage img');
  const lightboxTitle = document.querySelector('.lightbox-meta strong');
  const lightboxType = document.querySelector('.lightbox-meta span');
  const lightboxStage = document.querySelector('.lightbox-stage');
  const closeButton = document.querySelector('.lightbox-close');

  document.querySelectorAll('.project-button').forEach((button) => {
    button.addEventListener('click', () => {
      const slide = button.closest('.slide');
      if (!slide || !lightbox || !lightboxImage) return;
      lightboxImage.src = button.dataset.image;
      lightboxImage.alt = button.dataset.alt || 'Expanded design preview';
      if (lightboxTitle) lightboxTitle.textContent = slide.dataset.title || 'G GRAPH';
      if (lightboxType) lightboxType.textContent = slide.dataset.type || 'Portfolio piece';
      lightbox.classList.add('open');
      lightbox.setAttribute('aria-hidden', 'false');
      document.body.classList.add('modal-open');
    });
  });

  const closeLightbox = () => {
    if (!lightbox) return;
    lightbox.classList.remove('open');
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('modal-open');
  };

  closeButton?.addEventListener('click', closeLightbox);
  lightbox?.addEventListener('click', (event) => {
    if (event.target === lightbox) closeLightbox();
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeLightbox();
  });

  lightboxStage?.addEventListener('mousemove', (event) => {
    const rect = lightboxStage.getBoundingClientRect();
    lightboxStage.style.setProperty('--zoom-x', `${((event.clientX - rect.left) / rect.width) * 100}%`);
    lightboxStage.style.setProperty('--zoom-y', `${((event.clientY - rect.top) / rect.height) * 100}%`);
  });
});
