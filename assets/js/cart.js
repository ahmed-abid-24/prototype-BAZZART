(function () {
  const PROMO_CODES = {
    'WELCOME10': { discount: 10, type: 'percent', description: 'Bienvenue 10%' },
    'SUMMER20': { discount: 20, type: 'percent', description: 'Ete 20%' },
    'FREESHIP': { discount: 7000, type: 'fixed', description: 'Livraison gratuite' }
  };

  function indexProducts() {
    const map = {};
    window.BAZZART_DATA.products.forEach((p) => {
      map[p.id] = p;
    });
    return map;
  }

  function applyPromoCode(code) {
    const promo = PROMO_CODES[code.toUpperCase()];
    if (!promo) {
      return null;
    }
    return { code: code.toUpperCase(), ...promo };
  }

  function calculateTotal(subtotal, shipping, promo) {
    let total = subtotal + shipping;
    let discount = 0;

    if (promo) {
      if (promo.type === 'percent') {
        discount = Math.round(subtotal * promo.discount / 100);
      } else if (promo.type === 'fixed') {
        discount = promo.discount;
      }
      total = subtotal + shipping - discount;
    }

    return { total, discount };
  }

  function renderCart() {
    const root = document.getElementById('cartMount');
    const totalMount = document.getElementById('cartTotals');
    if (!root || !totalMount) {
      return;
    }

    const prodMap = indexProducts();
    const items = window.BazzartStore.getCart();
    const promo = JSON.parse(sessionStorage.getItem('bazzart_promo') || 'null');

    if (!items.length) {
      root.innerHTML = '<div class="empty-state"><h3>Panier vide</h3><p>Ajoutez vos premiers produits pour lancer votre commande.</p><a class="btn btn-primary" href="marketplace.html">Explorer la marketplace</a></div>';
      totalMount.innerHTML = '<div class="store-card"><p style="margin:0; color:var(--text-muted);">Aucun produit selectionne</p><p style="font-size:20px;"><strong>Total: 0 TND</strong></p></div>';
      return;
    }

    let subtotal = 0;
    const rows = items
      .map((item) => {
        const p = prodMap[item.productId];
        if (!p) {
          return '';
        }
        const line = p.price * item.quantity;
        subtotal += line;
        return '<tr><td>' + p.name + '</td><td>' + window.BazzartUtils.formatPrice(p.price) + '</td><td><input class="input" style="max-width:80px;" type="number" min="1" data-qty="' + p.id + '" value="' + item.quantity + '"></td><td>' + window.BazzartUtils.formatPrice(line) + '</td><td><button class="btn btn-danger" data-remove="' + p.id + '">Supprimer</button></td></tr>';
      })
      .join('');

    root.innerHTML = '<div><table class="table"><thead><tr><th>Produit</th><th>Prix</th><th>Quantite</th><th>Total</th><th>Action</th></tr></thead><tbody>' + rows + '</tbody></table><div style="margin-top: 1.5em; padding: 1em; background: var(--cream); border-radius: 8px;"><label style="display: flex; gap: 8px; align-items: flex-end;"><input class="input" id="promoCodeInput" type="text" placeholder="Code promo (ex: WELCOME10)" style="flex:1;"><button type="button" id="applyPromoBtn" class="btn btn-secondary">Appliquer</button></label><small style="color: var(--text-muted); display: block; margin-top: 0.5em;">Codes disponibles: WELCOME10, SUMMER20, FREESHIP</small></div></div>';

    const shipping = items.length ? 7000 : 0;
    const { total, discount } = calculateTotal(subtotal, shipping, promo);

    let totalsHTML = '<div class="store-card"><p style="margin-top:0; color:var(--text-muted);">Votre selection est presque prete.</p><p>Sous-total: <strong>' + window.BazzartUtils.formatPrice(subtotal) + '</strong></p><p>Livraison: <strong>' + window.BazzartUtils.formatPrice(shipping) + '</strong></p>';

    if (discount > 0) {
      totalsHTML += '<p style="color: var(--success);">Reduction (' + (promo.type === 'percent' ? promo.discount + '%' : 'Livraison') + '): <strong>-' + window.BazzartUtils.formatPrice(discount) + '</strong></p>';
    }

    totalsHTML += '<p style="font-size:20px;">Total: <strong>' + window.BazzartUtils.formatPrice(total) + '</strong></p><a class="btn btn-cta cta-strong btn-mobile-full" href="checkout.html">Continuer vers paiement securise</a></div>';

    totalMount.innerHTML = totalsHTML;

    // Setup event listeners
    root.querySelectorAll('[data-remove]').forEach((btn) => {
      btn.addEventListener('click', function () {
        window.BazzartStore.removeFromCart(btn.getAttribute('data-remove'));
        window.BazzartUI.flash('Produit retire. Votre total a ete mis a jour.', 'info');
        renderCart();
      });
    });

    root.querySelectorAll('[data-qty]').forEach((input) => {
      input.addEventListener('change', function () {
        const id = input.getAttribute('data-qty');
        const qty = Number(input.value || 1);
        window.BazzartStore.updateQty(id, qty);
        window.BazzartUI.flash('Quantite ajustee avec succes.', 'info');
        renderCart();
      });
    });

    const applyBtn = document.getElementById('applyPromoBtn');
    if (applyBtn) {
      applyBtn.addEventListener('click', function() {
        const code = document.getElementById('promoCodeInput').value.trim();
        if (!code) {
          window.BazzartUI.flash('Veuillez entrer un code promo', 'warning');
          return;
        }

        const validPromo = applyPromoCode(code);
        if (!validPromo) {
          window.BazzartUI.flash('Code promo invalide', 'error');
          return;
        }

        sessionStorage.setItem('bazzart_promo', JSON.stringify(validPromo));
        window.BazzartUI.flash('Code promo applique: ' + validPromo.description, 'success');
        renderCart();
      });
    }
  }

  document.addEventListener('DOMContentLoaded', renderCart);
})();
