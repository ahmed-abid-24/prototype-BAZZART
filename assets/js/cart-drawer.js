(function() {
  'use strict';

  // ============================================================================
  // FLOATING CART DRAWER
  // ============================================================================

  function initCartDrawer() {
    // Create floating cart button if not exists
    if (!document.getElementById('floatingCartBtn')) {
      const floatingBtn = document.createElement('button');
      floatingBtn.id = 'floatingCartBtn';
      floatingBtn.className = 'floating-cart-btn';
      floatingBtn.setAttribute('aria-label', 'Ouvrir le panier flottant');
      floatingBtn.innerHTML = `<span class="floating-cart-icon">🛒</span><span class="floating-cart-count" id="floatingCartCount">0</span>`;
      floatingBtn.addEventListener('click', window.openCartDrawer);
      document.body.appendChild(floatingBtn);
    }

    // Create drawer HTML if not exists
    if (!document.getElementById('cartDrawer')) {
      const drawerHTML = `
        <div id="cartDrawerOverlay" class="cart-drawer-overlay"></div>
        <div id="cartDrawer" class="cart-drawer">
          <div class="cart-drawer-header">
            <h2>Panier</h2>
            <button class="cart-drawer-close" onclick="window.toggleCartDrawer()">×</button>
          </div>
          <div class="cart-drawer-content" id="cartDrawerContent"></div>
          <div class="cart-drawer-footer">
            <div class="cart-drawer-total">
              <span>Total:</span>
              <span id="cartDrawerTotal">0 TND</span>
            </div>
            <a class="btn btn-cta" href="panier.html" style="width:100%; text-align:center;">Voir le panier complet</a>
          </div>
        </div>
      `;
      document.body.insertAdjacentHTML('beforeend', drawerHTML);
    }

    // Setup event listeners
    const overlay = document.getElementById('cartDrawerOverlay');
    if (overlay) {
      overlay.addEventListener('click', window.toggleCartDrawer);
    }

    // Listen for cart updates
    document.addEventListener('bazzart:cart-updated', renderCartDrawer);

    renderCartDrawer();
  }

  function renderCartDrawer() {
    const content = document.getElementById('cartDrawerContent');
    const totalEl = document.getElementById('cartDrawerTotal');
    const countEl = document.getElementById('floatingCartCount');
    
    if (!content || !totalEl || !window.BazzartStore) return;

    const items = window.BazzartStore.getCart ? window.BazzartStore.getCart() : [];

    if (countEl) {
      countEl.textContent = items.length;
    }

    if (items.length === 0) {
      content.innerHTML = '<p style="padding:20px; text-align:center; color:var(--text-muted);">Votre panier est vide</p>';
      totalEl.textContent = '0 TND';
      return;
    }

    let total = 0;
    content.innerHTML = items.map(item => {
      const product = window.BAZZART_DATA.products.find(p => p.id === item.productId);
      if (!product) return '';

      const itemTotal = product.price * item.quantity;
      total += itemTotal;

      return `
        <div class="cart-drawer-item">
          <img src="${product.image}" alt="${product.name}" class="cart-drawer-item-image">
          <div class="cart-drawer-item-info">
            <p class="cart-drawer-item-name">${product.name}</p>
            <div class="cart-drawer-item-qty">
              <span>Qty: ${item.quantity}</span>
            </div>
            <p class="cart-drawer-item-price">${itemTotal.toLocaleString('fr-TN')} TND</p>
          </div>
        </div>
      `;
    }).join('');

    totalEl.textContent = total.toLocaleString('fr-TN') + ' TND';
  }

  window.toggleCartDrawer = function() {
    const drawer = document.getElementById('cartDrawer');
    const overlay = document.getElementById('cartDrawerOverlay');
    const btn = document.getElementById('floatingCartBtn');
    
    if (drawer && overlay) {
      drawer.classList.toggle('active');
      overlay.classList.toggle('active');
      document.body.classList.toggle('no-scroll');
      if (btn) btn.classList.toggle('hidden');
    }
  };

  window.openCartDrawer = function() {
    const drawer = document.getElementById('cartDrawer');
    const overlay = document.getElementById('cartDrawerOverlay');
    const btn = document.getElementById('floatingCartBtn');
    
    if (drawer && overlay) {
      drawer.classList.add('active');
      overlay.classList.add('active');
      document.body.classList.add('no-scroll');
      if (btn) btn.classList.add('hidden');
    }
  };

  window.closeCartDrawer = function() {
    const drawer = document.getElementById('cartDrawer');
    const overlay = document.getElementById('cartDrawerOverlay');
    const btn = document.getElementById('floatingCartBtn');
    
    if (drawer && overlay) {
      drawer.classList.remove('active');
      overlay.classList.remove('active');
      document.body.classList.remove('no-scroll');
      if (btn) btn.classList.remove('hidden');
    }
  };

  // Initialize on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCartDrawer);
  } else {
    initCartDrawer();
  }

})();
