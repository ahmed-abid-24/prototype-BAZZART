(function() {
  'use strict';

  const WISHLIST_KEY = 'bazzart_wishlist';

  function getWishlist() {
    try {
      return JSON.parse(localStorage.getItem(WISHLIST_KEY) || '[]');
    } catch (_err) {
      return [];
    }
  }

  function setWishlist(items) {
    localStorage.setItem(WISHLIST_KEY, JSON.stringify(items));
    window.dispatchEvent(new CustomEvent('bazzart:wishlist-updated'));
  }

  function addToWishlist(productId) {
    const wishlist = getWishlist();
    if (!wishlist.includes(productId)) {
      wishlist.push(productId);
      setWishlist(wishlist);
    }
  }

  function removeFromWishlist(productId) {
    const wishlist = getWishlist().filter(id => id !== productId);
    setWishlist(wishlist);
  }

  function isInWishlist(productId) {
    return getWishlist().includes(productId);
  }

  function renderWishlist() {
    const wishlist = getWishlist();
    const grid = document.getElementById('wishlistGrid');
    const empty = document.getElementById('emptyWishlist');
    const addCartBtn = document.getElementById('addToCartBtn');

    if (!wishlist.length) {
      grid.style.display = 'none';
      empty.style.display = 'block';
      addCartBtn.style.display = 'none';
      return;
    }

    grid.innerHTML = wishlist.map(productId => {
      const product = window.BAZZART_DATA.products.find(p => p.id === productId);
      if (!product) return '';

      const shop = window.BAZZART_DATA.boutiques.find(s => s.id === product.shopId);
      const rating = product.rating || 4.0;
      const stars = window.BazzartUtils.stars(rating);

      return `
        <div class="product-card store-card" data-product-id="${product.id}">
          <div class="product-image-wrapper">
            <a href="product-detail.html?id=${product.id}">
              <img src="${product.image}" alt="${product.name}" class="product-image">
            </a>
            <button class="wishlist-btn is-wishlisted" onclick="window.removeWishlistItem('${product.id}')">
              <span>❤️</span>
            </button>
          </div>
          <div class="product-info">
            <p class="product-category">${product.category}</p>
            <h3><a href="product-detail.html?id=${product.id}">${product.name}</a></h3>
            <p class="product-shop">chez <strong>${shop.name}</strong></p>
            <p class="product-rating">${stars} ${rating}</p>
            <p class="product-price">${window.BazzartUtils.formatPrice(product.price)}</p>
            <p class="text-muted" style="font-size: 0.85em;">Stock: ${product.stock} articles</p>
            <button class="btn btn-cta btn-sm" onclick="window.addWishlistToCart('${product.id}')">Ajouter au panier</button>
          </div>
        </div>
      `;
    }).join('');

    if (wishlist.length > 0) {
      addCartBtn.style.display = 'inline-block';
    }
  }

  function setupShareButton() {
    const shareBtn = document.getElementById('shareWishlistBtn');
    shareBtn.addEventListener('click', () => {
      const wishlist = getWishlist();
      if (!wishlist.length) {
        window.BazzartUI.flash('Votre liste est vide', 'warning');
        return;
      }
      
      const shareUrl = window.location.origin + window.location.pathname + '?list=' + wishlist.join(',');
      navigator.clipboard.writeText(shareUrl);
      window.BazzartUI.flash('Lien copie dans le presse-papiers', 'success');
    });
  }

  function setupAddToCart() {
    const addCartBtn = document.getElementById('addToCartBtn');
    addCartBtn.addEventListener('click', () => {
      const wishlist = getWishlist();
      let count = 0;
      wishlist.forEach(productId => {
        window.BazzartStore.addToCart(productId, 1);
        count++;
      });
      window.BazzartUI.flash(`${count} produit${count > 1 ? 's' : ''} ajoute${count > 1 ? 's' : ''} au panier`, 'success');
    });
  }

  function init() {
    const user = window.BazzartStore.getUser();
    if (!user) {
      window.location.href = 'login.html';
      return;
    }

    // Expose methods to window for onclick handlers
    window.BazzartStore.addToWishlist = addToWishlist;
    window.BazzartStore.removeFromWishlist = removeFromWishlist;
    window.BazzartStore.isInWishlist = isInWishlist;
    window.BazzartStore.getWishlist = getWishlist;

    renderWishlist();
    setupShareButton();
    setupAddToCart();

    // Listen for wishlist updates
    window.addEventListener('bazzart:wishlist-updated', renderWishlist);
  }

  // Make functions global
  window.removeWishlistItem = function(productId) {
    removeFromWishlist(productId);
    renderWishlist();
    window.BazzartUI.flash('Produit retire de la liste', 'success');
  };

  window.addWishlistToCart = function(productId) {
    window.BazzartStore.addToCart(productId, 1);
    window.BazzartUI.flash('Produit ajoute au panier', 'success');
  };

  document.addEventListener('DOMContentLoaded', init);
})();
