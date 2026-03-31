(function () {
  function reviewsForShop(shopId) {
    const productIds = window.BAZZART_DATA.products.filter((p) => p.shopId === shopId).map((p) => p.id);
    const list = [];
    productIds.forEach((id) => {
      (window.BAZZART_DATA.reviews[id] || []).forEach((r) => {
        list.push(r);
      });
    });
    return list;
  }

  function responseTime(shop) {
    if (shop.reviews >= 100) {
      return '15 min';
    }
    if (shop.reviews >= 60) {
      return '22 min';
    }
    return '35 min';
  }

  function satisfactionRate(shop) {
    const val = Math.min(99, Math.max(86, Math.round((Number(shop.rating) / 5) * 100)));
    return val + '%';
  }

  function productsTab(shop) {
    const products = window.BAZZART_DATA.products.filter((p) => p.shopId === shop.id);
    const productsHtml = products.map((p) => '<article class="product-card" data-reveal><div class="product-media"><img src="' + p.image + '" alt="' + p.name + '"></div><div class="product-body"><h3 class="product-title">' + p.name + '</h3><div class="product-meta"><strong class="price">' + window.BazzartUtils.formatPrice(p.price) + '</strong><span class="stars">' + window.BazzartUtils.stars(p.rating) + '</span></div><a class="btn btn-ghost" href="product-detail.html?id=' + p.id + '">Details</a></div></article>').join('');
    return '<section class="tab-panel" data-tab-panel="products"><p class="section-label">Produits de la boutique</p><div class="grid cols-3">' + productsHtml + '</div></section>';
  }

  function reviewsTab(shop) {
    const reviews = reviewsForShop(shop.id);
    if (!reviews.length) {
      return '<section class="tab-panel hidden" data-tab-panel="reviews"><p class="notice">Aucun avis pour le moment.</p></section>';
    }
    const html = reviews.slice(0, 6).map((r) => '<article class="store-card" data-reveal><strong>' + r.author + '</strong><div class="stars">' + window.BazzartUtils.stars(r.rating) + '</div><p style="margin:8px 0 0; color:var(--text-muted);">' + r.text + '</p></article>').join('');
    return '<section class="tab-panel hidden" data-tab-panel="reviews"><p class="section-label">Avis clients</p><div class="grid cols-2">' + html + '</div></section>';
  }

  function shippingTab(shop) {
    return '<section class="tab-panel hidden" data-tab-panel="shipping">'
      + '<div class="store-card" data-reveal>'
      + '<h3 style="margin-top:0; color:var(--navy);">Informations livraison</h3>'
      + '<ul class="shipping-list">'
      + '<li><strong>Zone prioritaire:</strong> ' + shop.region + ' et grandes villes</li>'
      + '<li><strong>Delai estime:</strong> 24h a 72h selon destination</li>'
      + '<li><strong>Retours:</strong> acceptes sous 7 jours apres reception</li>'
      + '<li><strong>Support:</strong> WhatsApp vendeur disponible tous les jours</li>'
      + '</ul>'
      + '</div>'
      + '</section>';
  }

  function renderShop(shop) {
    return '<section class="shop-hero" data-reveal>'
      + '<div class="shop-hero-cover"></div>'
      + '<div class="shop-hero-content">'
      + '<p class="section-label">Boutique locale</p>'
      + '<h2>' + shop.name + '</h2>'
      + '<p class="shop-slogan">' + shop.description + '</p>'
      + '<p><span class="badge badge-verified">' + shop.region + ' - ' + shop.city + '</span> <span class="stars">' + window.BazzartUtils.stars(shop.rating) + ' (' + shop.reviews + ' avis)</span></p>'
      + '<div class="shop-kpis">'
      + '<div class="kpi-pill"><span>Temps de reponse</span><strong>' + responseTime(shop) + '</strong></div>'
      + '<div class="kpi-pill"><span>Satisfaction</span><strong>' + satisfactionRate(shop) + '</strong></div>'
      + '</div>'
      + '<button class="btn btn-primary btn-mobile-full" id="contactSeller">Contacter le vendeur</button>'
      + '</div>'
      + '</section>'
      + '<nav class="shop-tabs" aria-label="Sections boutique">'
      + '<button class="shop-tab is-active" data-tab="products" type="button">Produits</button>'
      + '<button class="shop-tab" data-tab="reviews" type="button">Avis</button>'
      + '<button class="shop-tab" data-tab="shipping" type="button">Infos livraison</button>'
      + '</nav>'
      + productsTab(shop)
      + reviewsTab(shop)
      + shippingTab(shop);
  }

  function setupTabs() {
    const buttons = document.querySelectorAll('[data-tab]');
    const panels = document.querySelectorAll('[data-tab-panel]');
    if (!buttons.length || !panels.length) {
      return;
    }
    buttons.forEach((btn) => {
      btn.addEventListener('click', function () {
        const tab = btn.getAttribute('data-tab');
        buttons.forEach((b) => b.classList.remove('is-active'));
        btn.classList.add('is-active');
        panels.forEach((panel) => {
          panel.classList.toggle('hidden', panel.getAttribute('data-tab-panel') !== tab);
        });
        if (window.BazzartUI && window.BazzartUI.setupRevealAnimations) {
          window.BazzartUI.setupRevealAnimations();
        }
      });
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    const mount = document.getElementById('boutiqueMount');
    if (!mount) {
      return;
    }

    const id = window.BazzartUtils.q('id') || 'shop-1';
    const shop = window.BAZZART_DATA.boutiques.find((s) => s.id === id);
    if (!shop) {
      mount.innerHTML = '<p class="notice">Boutique introuvable.</p>';
      return;
    }

    mount.innerHTML = renderShop(shop);
    setupTabs();
    document.getElementById('contactSeller').addEventListener('click', function () {
      window.BazzartUI.flash('Message envoye au vendeur');
    });
  });
})();
