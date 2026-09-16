document.addEventListener('DOMContentLoaded', () => {
  const revealItems = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealItems.forEach((item) => revealObserver.observe(item));

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
      slides.forEach((slide, index) => {
        slide.classList.toggle('is-active', index === currentIndex);
      });

      const dots = dotsWrap.querySelectorAll('.carousel-dot');
      dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentIndex);
      });
    }

    function nextSlide() {
      currentIndex = (currentIndex + 1) % slides.length;
      renderSlides();
    }

    function prevSlide() {
      currentIndex = (currentIndex - 1 + slides.length) % slides.length;
      renderSlides();
    }

    function restartAutoPlay() {
      clearInterval(autoplay);
      autoplay = setInterval(() => {
        nextSlide();
      }, 5600);
    }

    prevButton?.addEventListener('click', () => {
      prevSlide();
      restartAutoPlay();
    });

    nextButton?.addEventListener('click', () => {
      nextSlide();
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
      const image = button.dataset.image;
      const alt = button.dataset.alt;
      const slide = button.closest('.slide');

      if (!image || !slide || !lightbox || !lightboxImage) return;

      lightboxImage.src = image;
      lightboxImage.alt = alt || 'Expanded design preview';
      lightboxTitle.textContent = slide.dataset.title || 'G GRAPH';
      lightboxType.textContent = slide.dataset.type || 'Portfolio piece';

      lightbox.classList.add('open');
      lightbox.setAttribute('aria-hidden', 'false');
      document.body.classList.add('modal-open');
    });
  });

  function closeLightbox() {
    if (!lightbox) return;
    lightbox.classList.remove('open');
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('modal-open');
  }

  closeButton?.addEventListener('click', closeLightbox);

  lightbox?.addEventListener('click', (event) => {
    if (event.target === lightbox) closeLightbox();
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && lightbox && lightbox.classList.contains('open')) {
      closeLightbox();
    }
  });

  lightboxStage?.addEventListener('mousemove', (event) => {
    const rect = lightboxStage.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;
    lightboxStage.style.setProperty('--zoom-x', `${x}%`);
    lightboxStage.style.setProperty('--zoom-y', `${y}%`);
  });
});
