(function() {
  'use strict';

  // ============================================================================
  // PRODUCT IMAGE CAROUSEL
  // ============================================================================

  function initProductCarousel(containerId, images) {
    const container = document.getElementById(containerId);
    if (!container || !images || images.length === 0) return;

    let currentIndex = 0;

    // Build carousel HTML
    const carouselHTML = `
      <div class="carousel-main">
        ${images.map((img, idx) => `
          <img src="${img}" alt="Product image ${idx + 1}" class="carousel-image ${idx === 0 ? '' : 'hidden'}" data-index="${idx}">
        `).join('')}
        <button class="carousel-nav carousel-prev" onclick="window.prevCarouselImage('${containerId}')">‹</button>
        <button class="carousel-nav carousel-next" onclick="window.nextCarouselImage('${containerId}')">›</button>
        <div class="carousel-dots">
          ${images.map((_, idx) => `
            <button class="carousel-dot ${idx === 0 ? 'active' : ''}" onclick="window.goToCarouselImage('${containerId}', ${idx})"></button>
          `).join('')}
        </div>
      </div>
      ${images.length > 1 ? `
        <div class="carousel-thumbs">
          ${images.map((img, idx) => `
            <div class="carousel-thumb ${idx === 0 ? 'active' : ''}" onclick="window.goToCarouselImage('${containerId}', ${idx})">
              <img src="${img}" alt="Thumbnail ${idx + 1}">
            </div>
          `).join('')}
        </div>
      ` : ''}
    `;

    container.innerHTML = carouselHTML;

    // Store carousel state in data attribute
    container.dataset.currentIndex = 0;
    container.dataset.total = images.length;
  }

  function updateCarouselDisplay(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const currentIndex = parseInt(container.dataset.currentIndex);
    const images = container.querySelectorAll('.carousel-image');
    const dots = container.querySelectorAll('.carousel-dot');
    const thumbs = container.querySelectorAll('.carousel-thumb');

    // Update images
    images.forEach((img, idx) => {
      if (idx === currentIndex) {
        img.classList.remove('hidden');
      } else {
        img.classList.add('hidden');
      }
    });

    // Update dots
    dots.forEach((dot, idx) => {
      if (idx === currentIndex) {
        dot.classList.add('active');
      } else {
        dot.classList.remove('active');
      }
    });

    // Update thumbs
    thumbs.forEach((thumb, idx) => {
      if (idx === currentIndex) {
        thumb.classList.add('active');
      } else {
        thumb.classList.remove('active');
      }
    });
  }

  window.nextCarouselImage = function(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    let currentIndex = parseInt(container.dataset.currentIndex);
    const total = parseInt(container.dataset.total);
    currentIndex = (currentIndex + 1) % total;
    container.dataset.currentIndex = currentIndex;
    updateCarouselDisplay(containerId);
  };

  window.prevCarouselImage = function(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    let currentIndex = parseInt(container.dataset.currentIndex);
    const total = parseInt(container.dataset.total);
    currentIndex = (currentIndex - 1 + total) % total;
    container.dataset.currentIndex = currentIndex;
    updateCarouselDisplay(containerId);
  };

  window.goToCarouselImage = function(containerId, index) {
    const container = document.getElementById(containerId);
    if (!container) return;

    container.dataset.currentIndex = index;
    updateCarouselDisplay(containerId);
  };

  window.ProductCarousel = {
    init: initProductCarousel
  };

})();
