(function () {
  function findProduct(id) {
    return window.BAZZART_DATA.products.find((p) => p.id === id);
  }

  function findShop(id) {
    return window.BAZZART_DATA.boutiques.find((s) => s.id === id);
  }

  function normalizeRegion(value) {
    return String(value || '').trim().toLowerCase();
  }

  function gatherScenarioReviews(opts) {
    const products = window.BAZZART_DATA.products;
    const shops = window.BAZZART_DATA.boutiques;
    const reviewsMap = window.BAZZART_DATA.reviews;
    const pool = [];

    products.forEach((product) => {
      const shop = shops.find((s) => s.id === product.shopId);
      if (!shop) {
        return;
      }
      if (opts.region && normalizeRegion(shop.region) !== normalizeRegion(opts.region)) {
        return;
      }
      if (opts.shopId && shop.id !== opts.shopId) {
        return;
      }
      (reviewsMap[product.id] || []).forEach((r) => {
        pool.push({
          author: r.author,
          rating: r.rating,
          text: r.text,
          productName: product.name,
          shopName: shop.name,
          region: shop.region
        });
      });
    });

    return pool;
  }

  function resolveReviewContext(product) {
    const scenario = window.BazzartUtils.q('scenario');
    const region = window.BazzartUtils.q('region');
    const shopId = window.BazzartUtils.q('shop');

    if (scenario === 'vendeur-top-sfax') {
      return {
        label: 'Scenario demo: Vendeur top Sfax',
        reviews: gatherScenarioReviews({ region: 'Sfax' }).slice(0, 6)
      };
    }
    if (scenario === 'produits-populaires-tunis') {
      return {
        label: 'Scenario demo: Produits populaires Tunis',
        reviews: gatherScenarioReviews({ region: 'Tunis' }).slice(0, 6)
      };
    }
    if (region) {
      return {
        label: 'Avis region: ' + region,
        reviews: gatherScenarioReviews({ region }).slice(0, 6)
      };
    }
    if (shopId) {
      const shop = findShop(shopId);
      return {
        label: shop ? 'Avis boutique: ' + shop.name : 'Avis boutique',
        reviews: gatherScenarioReviews({ shopId }).slice(0, 6)
      };
    }

    return {
      label: 'Avis clients',
      reviews: (window.BAZZART_DATA.reviews[product.id] || []).map((r) => ({
        author: r.author,
        rating: r.rating,
        text: r.text,
        productName: product.name
      }))
    };
  }

  function renderReviews(product) {
    const context = resolveReviewContext(product);
    if (!context.reviews.length) {
      return '<p class="notice">Aucun avis pour ce scenario pour le moment.</p>';
    }

    const cards = context.reviews
      .map((r) => '<article class="store-card"><strong>' + r.author + '</strong><div class="stars">' + window.BazzartUtils.stars(r.rating) + '</div><p style="margin:8px 0 0; color:var(--text-muted);">' + r.text + '</p><p style="margin:8px 0 0; font-size:12px; color:var(--text-muted);">Produit: ' + (r.productName || '-') + '</p></article>')
      .join('');

    return '<p class="notice"><strong>' + context.label + '</strong></p>' + cards;
  }

  function renderSimilar(product) {
    const items = window.BAZZART_DATA.products
      .filter((p) => p.category === product.category && p.id !== product.id)
      .slice(0, 3);

    if (!items.length) {
      return '<p class="notice">Pas de produit similaire.</p>';
    }

    return items.map((p) => '<article class="product-card"><div class="product-media"><img src="' + p.image + '" alt="' + p.name + '"></div><div class="product-body"><h3 class="product-title">' + p.name + '</h3><div class="product-meta"><strong class="price">' + window.BazzartUtils.formatPrice(p.price) + '</strong><span class="stars">' + window.BazzartUtils.stars(p.rating) + '</span></div><a class="btn btn-ghost" href="product-detail.html?id=' + p.id + '">Ouvrir</a></div></article>').join('');
  }

  document.addEventListener('DOMContentLoaded', function () {
    const mount = document.getElementById('productDetailMount');
    if (!mount) {
      return;
    }

    const id = window.BazzartUtils.q('id') || 'p-101';
    const product = findProduct(id);

    if (!product) {
      mount.innerHTML = '<p class="notice">Produit introuvable.</p>';
      return;
    }

    const shop = findShop(product.shopId);
    const shopVerified = shop && shop.verified ? ' badge-verified' : '';
    const carouselImages = [product.image]; // In prod, this would be an array of images
    
    mount.innerHTML = '<section class="grid cols-2">'
      + '<article class="store-card"><div id="productCarousel" class="product-carousel"></div></article>'
      + '<article class="store-card"><span class="badge badge-product">Stock ' + product.stock + '</span><h2 style="margin:10px 0 6px; color:var(--navy);">' + product.name + '</h2><p class="price" style="margin:0 0 10px;">' + window.BazzartUtils.formatPrice(product.price) + '</p><div class="stars" style="margin-bottom:12px;">' + window.BazzartUtils.stars(product.rating) + '</div><p style="color:var(--text-muted); line-height:1.7;">' + product.description + '</p><p><a href="boutique.html?id=' + shop.id + '" class="badge' + shopVerified + '">Boutique: ' + shop.name + '</a></p><div style="display:flex; gap:10px;"><button class="btn btn-primary" id="addNowBtn">Ajouter au panier</button><a class="btn btn-ghost" href="panier.html">Acheter maintenant</a></div></article>'
      + '</section>'
      + '<section class="section"><p class="section-label">Avis clients</p><div class="grid cols-2">' + renderReviews(product) + '</div></section>'
      + '<section class="section"><p class="section-label">Produits similaires</p><div class="grid cols-3">' + renderSimilar(product) + '</div></section>';

    // Initialize carousel
    if (window.ProductCarousel && window.ProductCarousel.init) {
      window.ProductCarousel.init('productCarousel', carouselImages);
    }

    document.getElementById('addNowBtn').addEventListener('click', function () {
      window.BazzartStore.addToCart(product.id, 1);
      window.BazzartUI.flash('Produit ajoute au panier');
    });
  });
})();
