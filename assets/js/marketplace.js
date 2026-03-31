(function () {
  function shopById(id) {
    return window.BAZZART_DATA.boutiques.find((shop) => shop.id === id);
  }

  function getAltImage(product) {
    const sameCategory = window.BAZZART_DATA.products.find((p) => p.category === product.category && p.id !== product.id);
    return sameCategory ? sameCategory.image : product.image;
  }

  function getDynamicBadge(product) {
    const daysSinceCreation = Math.floor((Date.now() - new Date(product.createdAt).getTime()) / (1000 * 60 * 60 * 24));
    if (product.stock <= 12) {
      return { label: 'Stock limite', cls: 'badge-stock' };
    }
    if (Number(product.rating) >= 4.7) {
      return { label: 'Best seller', cls: 'badge-best' };
    }
    if (daysSinceCreation <= 21) {
      return { label: 'Nouveau', cls: 'badge-new' };
    }
    return { label: 'Nouveau', cls: 'badge-new' };
  }

  let renderTicket = 0;

  function productCard(product) {
    const shop = shopById(product.shopId);
    const shopName = shop ? shop.name : 'Boutique';
    const shopVerified = shop && shop.verified ? ' badge-verified' : '';
    const badge = getDynamicBadge(product);
    const ratingStars = Math.round(product.rating * 10) / 10;
    const reviewCount = Math.floor(Math.random() * 100) + 5;
    
    return '<article class="product-card">'
      + '<div class="product-media">'
      + '<span class="badge badge-product ' + badge.cls + '">' + badge.label + '</span>'
      + '<img class="img-main" src="' + product.image + '" alt="' + product.name + '">'
      + '<img class="img-alt" src="' + getAltImage(product) + '" alt="' + product.name + ' vue secondaire">'
      + '</div>'
      + '<div class="product-body">'
      + '<div class="product-shop"><span class="vendor-badge' + shopVerified + '"><span>' + shopName + '</span>' + (shop && shop.rating ? '<span>★ ' + shop.rating.toFixed(1) + '</span>' : '') + '</span></div>'
      + '<h3 class="product-title">' + product.name + '</h3>'
      + '<div class="product-meta"><strong class="price">' + window.BazzartUtils.formatPrice(product.price) + '<span class="price-note">Livraison estimee sous 48h</span></strong><span class="product-rating-badge"><span class="stars">' + window.BazzartUtils.stars(product.rating) + '</span><span>' + ratingStars + ' (' + reviewCount + ')</span></span></div>'
      + '<div style="display:flex; gap:8px; flex-wrap:wrap;"><a class="btn btn-ghost" href="product-detail.html?id=' + product.id + '">Voir</a><button class="btn btn-ghost" data-quick="' + product.id + '">Apercu rapide</button><button class="btn btn-cta cta-strong" data-add="' + product.id + '">Ajouter</button></div>'
      + '</div>'
      + '</article>';
  }

  function openQuickView(productId, anchorCard) {
    const product = window.BAZZART_DATA.products.find((p) => p.id === productId);
    const body = document.getElementById('quickViewBody');
    const modal = document.getElementById('quickViewModal');
    const grid = document.getElementById('marketGrid');
    if (!product || !body || !modal || !grid || !anchorCard) {
      return;
    }

    const shop = shopById(product.shopId);
    body.innerHTML = '<article class="quick-view-content">'
      + '<img src="' + product.image + '" alt="' + product.name + '">'
      + '<div>'
      + '<p class="section-label" style="margin:0 0 4px;">' + (shop ? shop.name : 'Boutique locale') + '</p>'
      + '<h3 style="margin:0 0 8px; color:var(--navy);">' + product.name + '</h3>'
      + '<p style="margin:0 0 10px; color:var(--text-muted); line-height:1.65;">' + product.description + '</p>'
      + '<p class="price" style="margin:0 0 10px;">' + window.BazzartUtils.formatPrice(product.price) + '</p>'
      + '<div style="display:flex; gap:8px; flex-wrap:wrap;"><a class="btn btn-ghost" href="product-detail.html?id=' + product.id + '">Voir la fiche</a><button class="btn btn-cta" data-add-quick="' + product.id + '">Ajouter au panier</button></div>'
      + '</div>'
      + '</article>';

    anchorCard.insertAdjacentElement('afterend', modal);
    modal.hidden = false;
    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    modal.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

    const addBtn = body.querySelector('[data-add-quick]');
    if (addBtn) {
      addBtn.addEventListener('click', function () {
        window.BazzartStore.addToCart(addBtn.getAttribute('data-add-quick'), 1);
        window.BazzartUI.flash('Produit ajoute depuis l apercu rapide.', 'info');
        closeQuickView();
      });
    }
  }

  function closeQuickView() {
    const modal = document.getElementById('quickViewModal');
    if (!modal) {
      return;
    }
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    modal.hidden = true;
  }

  function setResultCount(total) {
    const desktop = document.getElementById('resultCount');
    const mobile = document.getElementById('resultCountMobile');
    const text = total + ' produits';
    if (desktop) {
      desktop.textContent = text;
    }
    if (mobile) {
      mobile.textContent = text;
    }
  }

  function closeFiltersDrawer() {
    const shell = document.getElementById('filterShell');
    const overlay = document.getElementById('filterOverlay');
    if (!shell || !overlay) {
      return;
    }
    shell.classList.remove('is-open');
    overlay.classList.remove('is-open');
    document.body.classList.remove('no-scroll');
  }

  function openFiltersDrawer() {
    const shell = document.getElementById('filterShell');
    const overlay = document.getElementById('filterOverlay');
    if (!shell || !overlay) {
      return;
    }
    shell.classList.add('is-open');
    overlay.classList.add('is-open');
    document.body.classList.add('no-scroll');
  }

  function resetFilters() {
    document.getElementById('searchInput').value = '';
    document.getElementById('categoryFilter').value = '';
    document.getElementById('regionFilter').value = '';
    document.getElementById('priceMin').value = '';
    document.getElementById('ratingFilter').value = '0';
    document.getElementById('sortBy').value = 'relevance';
    window.currentPage = 1;
    render();
  }

  function applyFilters(all) {
    const s = document.getElementById('searchInput').value.trim().toLowerCase();
    const cat = document.getElementById('categoryFilter').value;
    const region = document.getElementById('regionFilter').value;
    const min = Number(document.getElementById('priceMin').value || 0) * 1000;
    const note = Number(document.getElementById('ratingFilter').value || 0);

    return all.filter((p) => {
      const shop = shopById(p.shopId);
      const matchSearch = !s || p.name.toLowerCase().includes(s) || (shop && shop.name.toLowerCase().includes(s));
      const matchCat = !cat || p.category === cat;
      const matchRegion = !region || (shop && shop.region === region);
      const matchPrice = p.price >= min;
      const matchNote = Number(p.rating) >= note;
      return matchSearch && matchCat && matchRegion && matchPrice && matchNote;
    });
  }

  function sortProducts(items) {
    const mode = document.getElementById('sortBy').value;
    const list = items.slice();
    if (mode === 'price-asc') {
      list.sort((a, b) => a.price - b.price);
    } else if (mode === 'price-desc') {
      list.sort((a, b) => b.price - a.price);
    } else if (mode === 'new') {
      list.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } else {
      list.sort((a, b) => b.rating - a.rating);
    }
    return list;
  }

  function render() {
    const data = window.BAZZART_DATA.products;
    const perPage = 12;
    const filtered = sortProducts(applyFilters(data));
    const pageCount = Math.max(1, Math.ceil(filtered.length / perPage));
    const safePage = Math.min(window.currentPage || 1, pageCount);
    window.currentPage = safePage;

    const start = (safePage - 1) * perPage;
    const slice = filtered.slice(start, start + perPage);

    const root = document.getElementById('marketGrid');
    const pager = document.getElementById('pager');
    closeQuickView();
    setResultCount(filtered.length);

    let pagerHtml = '';
    for (let i = 1; i <= pageCount; i += 1) {
      pagerHtml += '<button class="page-btn ' + (i === safePage ? 'active' : '') + '" data-page="' + i + '">' + i + '</button>';
    }
    pager.innerHTML = pagerHtml;

    renderTicket += 1;
    const currentTicket = renderTicket;
    root.innerHTML = '<div class="grid cols-4 skeleton-grid" style="grid-column:1/-1;">'
      + '<article class="skeleton-card"></article><article class="skeleton-card"></article><article class="skeleton-card"></article><article class="skeleton-card"></article>'
      + '</div>';

    window.setTimeout(function () {
      if (currentTicket !== renderTicket) {
        return;
      }

      if (!slice.length) {
        root.innerHTML = '<div class="empty-state" style="grid-column:1/-1;"><h3>Aucun resultat</h3><p>Essaie de reduire les filtres ou de changer le tri pour decouvrir plus de produits locaux.</p><a class="btn btn-cta" href="marketplace.html">Reinitialiser la recherche</a></div>';
      } else {
        root.innerHTML = slice.map(function (item) {
          return '<div data-reveal>' + productCard(item) + '</div>';
        }).join('');
      }

      root.querySelectorAll('[data-add]').forEach((btn) => {
        btn.addEventListener('click', function () {
          window.BazzartStore.addToCart(btn.getAttribute('data-add'), 1);
          window.BazzartUI.flash('Produit ajoute. Continuez vos achats ou ouvrez le panier.', 'info');
        });
      });

      root.querySelectorAll('[data-quick]').forEach((btn) => {
        btn.addEventListener('click', function () {
          const card = btn.closest('[data-reveal]') || btn.closest('.product-card');
          openQuickView(btn.getAttribute('data-quick'), card);
        });
      });

      if (window.BazzartUI && window.BazzartUI.setupRevealAnimations) {
        window.BazzartUI.setupRevealAnimations();
      }
    }, 130);

    pager.querySelectorAll('[data-page]').forEach((btn) => {
      btn.addEventListener('click', function () {
        window.currentPage = Number(btn.getAttribute('data-page'));
        render();
      });
    });
  }

  function setupFilters() {
    const categories = window.BAZZART_DATA.categories;
    const regions = [...new Set(window.BAZZART_DATA.boutiques.map((s) => s.region))];

    document.getElementById('categoryFilter').innerHTML += categories
      .map((c) => '<option value="' + c.id + '">' + c.name + '</option>')
      .join('');

    document.getElementById('regionFilter').innerHTML += regions
      .map((r) => '<option value="' + r + '">' + r + '</option>')
      .join('');

    ['searchInput', 'categoryFilter', 'regionFilter', 'priceMin', 'ratingFilter', 'sortBy'].forEach((id) => {
      document.getElementById(id).addEventListener('input', function () {
        window.currentPage = 1;
        render();
      });
      document.getElementById(id).addEventListener('change', function () {
        window.currentPage = 1;
        render();
      });
    });

    const scenario = window.BazzartUtils.q('scenario');
    if (scenario === 'vendeur-top-sfax') {
      document.getElementById('regionFilter').value = 'Sfax';
      document.getElementById('ratingFilter').value = '4.5';
      document.getElementById('sortBy').value = 'relevance';
    }
    if (scenario === 'produits-populaires-tunis') {
      document.getElementById('regionFilter').value = 'Tunis';
      document.getElementById('ratingFilter').value = '4';
      document.getElementById('sortBy').value = 'relevance';
    }

    const openBtn = document.getElementById('openFiltersBtn');
    const closeBtn = document.getElementById('closeFiltersBtn');
    const overlay = document.getElementById('filterOverlay');
    const applyBtn = document.getElementById('applyFiltersBtn');
    const resetBtn = document.getElementById('resetFiltersBtn');
    const quickCloseIcon = document.getElementById('quickViewCloseIcon');

    if (openBtn) {
      openBtn.addEventListener('click', openFiltersDrawer);
    }
    if (closeBtn) {
      closeBtn.addEventListener('click', closeFiltersDrawer);
    }
    if (overlay) {
      overlay.addEventListener('click', closeFiltersDrawer);
    }
    if (applyBtn) {
      applyBtn.addEventListener('click', function () {
        closeFiltersDrawer();
        render();
      });
    }
    if (resetBtn) {
      resetBtn.addEventListener('click', function () {
        resetFilters();
        closeFiltersDrawer();
      });
    }
    if (quickCloseIcon) {
      quickCloseIcon.addEventListener('click', closeQuickView);
    }

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape') {
        closeFiltersDrawer();
        closeQuickView();
      }
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    if (!document.getElementById('marketGrid')) {
      return;
    }
    window.currentPage = 1;
    closeQuickView();
    setupFilters();
    render();
  });
})();
