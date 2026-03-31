(function () {
  function setFieldState(fieldName, isValid, message) {
    const fieldMap = {
      fullName: 'fullNameInput',
      phone: 'phoneInput',
      address: 'addressInput'
    };
    const input = document.getElementById(fieldMap[fieldName]);
    const feedback = document.querySelector('[data-feedback="' + fieldName + '"]');
    if (!input || !feedback) {
      return;
    }

    input.classList.remove('is-valid', 'is-invalid');
    input.classList.add(isValid ? 'is-valid' : 'is-invalid');
    feedback.textContent = message || '';
    feedback.classList.remove('is-valid', 'is-invalid');
    feedback.classList.add(isValid ? 'is-valid' : 'is-invalid');
  }

  function validateField(fieldName, value) {
    const v = String(value || '').trim();
    if (fieldName === 'fullName') {
      const ok = v.length >= 4;
      setFieldState(fieldName, ok, ok ? 'Nom valide.' : 'Entrez un nom complet (min 4 caracteres).');
      return ok;
    }
    if (fieldName === 'phone') {
      const ok = /^(\+216)?\s?\d{8}$/.test(v.replace(/\s+/g, ''));
      setFieldState(fieldName, ok, ok ? 'Numero valide.' : 'Format attendu: +216XXXXXXXX ou 8 chiffres.');
      return ok;
    }
    if (fieldName === 'address') {
      const ok = v.length >= 10;
      setFieldState(fieldName, ok, ok ? 'Adresse valide.' : 'Veuillez saisir une adresse plus detaillee.');
      return ok;
    }
    return true;
  }

  function bindInlineValidation() {
    const fullName = document.getElementById('fullNameInput');
    const phone = document.getElementById('phoneInput');
    const address = document.getElementById('addressInput');
    if (!fullName || !phone || !address) {
      return;
    }

    fullName.addEventListener('input', function () {
      validateField('fullName', fullName.value);
    });
    phone.addEventListener('input', function () {
      validateField('phone', phone.value);
    });
    address.addEventListener('input', function () {
      validateField('address', address.value);
    });
  }

  function getProductMap() {
    const map = {};
    window.BAZZART_DATA.products.forEach((p) => {
      map[p.id] = p;
    });
    return map;
  }

  function renderSummary() {
    const mount = document.getElementById('checkoutSummary');
    if (!mount) {
      return { subtotal: 0, shipping: 0, total: 0 };
    }

    const items = window.BazzartStore.getCart();
    const prod = getProductMap();

    let subtotal = 0;
    const lines = items
      .map((item) => {
        const p = prod[item.productId];
        if (!p) {
          return '';
        }
        const amount = p.price * item.quantity;
        subtotal += amount;
        return '<li style="display:flex; justify-content:space-between; gap:8px;"><span>' + p.name + ' x' + item.quantity + '</span><strong>' + window.BazzartUtils.formatPrice(amount) + '</strong></li>';
      })
      .join('');

    const shipping = items.length ? 7000 : 0;
    const total = subtotal + shipping;

    mount.innerHTML = '<ul style="list-style:none; padding:0; margin:0; display:grid; gap:8px;">' + lines + '</ul><hr style="border:none; border-top:1px solid var(--border); margin:14px 0;"><p style="display:flex; justify-content:space-between;"><span>Sous-total</span><strong>' + window.BazzartUtils.formatPrice(subtotal) + '</strong></p><p style="display:flex; justify-content:space-between;"><span>Livraison</span><strong>' + window.BazzartUtils.formatPrice(shipping) + '</strong></p><p style="display:flex; justify-content:space-between; font-size:20px;"><span>Total</span><strong>' + window.BazzartUtils.formatPrice(total) + '</strong></p>';

    return { subtotal, shipping, total };
  }

  function bindForm(totals) {
    const form = document.getElementById('checkoutForm');
    if (!form) {
      return;
    }

    const ctaTotal = document.getElementById('checkoutCtaTotal');
    if (ctaTotal) {
      ctaTotal.textContent = window.BazzartUtils.formatPrice(totals.total);
    }

    form.addEventListener('submit', function (event) {
      event.preventDefault();
      if (!window.BazzartStore.getCart().length) {
        window.BazzartUI.flash('Votre panier est vide. Ajoutez un produit avant de confirmer.', 'error');
        return;
      }
      const data = new FormData(form);
      const name = String(data.get('fullName') || '').trim();
      const phone = String(data.get('phone') || '').trim();
      const address = String(data.get('address') || '').trim();
      const payment = String(data.get('payment') || '').trim();

      const nameOk = validateField('fullName', name);
      const phoneOk = validateField('phone', phone);
      const addressOk = validateField('address', address);

      if (!nameOk || !phoneOk || !addressOk || !payment) {
        window.BazzartUI.flash('Merci de completer tous les champs pour confirmer la commande.', 'error');
        return;
      }

      const order = {
        id: 'ord-' + Date.now(),
        date: new Date().toISOString(),
        customer: name,
        phone,
        address,
        payment,
        items: window.BazzartStore.getCart(),
        total: totals.total
      };

      window.BazzartStore.saveOrder(order);
      window.BazzartStore.clearCart();
      window.BazzartUI.flash('Commande confirmee. Redirection vers votre page de confirmation...', 'info');
      window.setTimeout(function () {
        window.location.href = 'confirmation.html';
      }, 700);
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    const totals = renderSummary();
    bindInlineValidation();
    bindForm(totals);
  });
})();
