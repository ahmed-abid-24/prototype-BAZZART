(function () {
  document.addEventListener('DOMContentLoaded', function () {
    const summary = document.getElementById('confirmationSummary');
    const timelineStatus = document.getElementById('timelineStatus');
    const trackingCode = document.getElementById('trackingCode');
    const orderTimeline = document.getElementById('orderTimeline');
    const contactSellerBtn = document.getElementById('contactSellerBtn');
    const showFaqBtn = document.getElementById('showFaqBtn');
    const faqBlock = document.getElementById('faqBlock');
    const orderIdEl = document.getElementById('orderId');
    const orderDateEl = document.getElementById('orderDate');
    const orderAmountEl = document.getElementById('orderAmount');
    const orderItemsEl = document.getElementById('orderItems');

    function formatDate(dateStr) {
      const date = new Date(dateStr);
      const day = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const year = date.getFullYear();
      return day + '/' + month + '/' + year;
    }

    function setTimeline(stepIndex) {
      if (!orderTimeline) return;
      orderTimeline.querySelectorAll('li').forEach(function (item) {
        const current = Number(item.getAttribute('data-step'));
        item.classList.remove('is-done', 'is-current');
        if (current < stepIndex) {
          item.classList.add('is-done');
        } else if (current === stepIndex) {
          item.classList.add('is-current');
        }
      });
    }

    if (!summary || !window.BazzartStore) return;

    const order = window.BazzartStore.getLastOrder();
    if (!order) {
      summary.textContent = 'Aucune commande recente detectee. Explorez la marketplace pour demarrer une nouvelle commande.';
      setTimeline(0);
      if (timelineStatus) {
        timelineStatus.textContent = 'Statut: En attente de nouvelle commande';
      }
      return;
    }

    const amount = window.BazzartUtils.formatPrice(order.total || 0);
    summary.textContent = 'Commande validee pour un montant de ' + amount + '. Vous recevrez une mise a jour de livraison sous peu.';

    if (orderIdEl) {
      orderIdEl.textContent = order.id || 'BZ-000000';
    }
    if (orderDateEl) {
      orderDateEl.textContent = formatDate(order.date || new Date().toISOString());
    }
    if (orderAmountEl) {
      orderAmountEl.textContent = amount;
    }

    // Render order items
    if (orderItemsEl && order.items && Array.isArray(order.items)) {
      orderItemsEl.innerHTML = order.items.map(function (item) {
        return '<div style="display:flex; justify-content:space-between; align-items:center; font-size:13px; padding:8px; border-bottom:1px solid var(--border);"><span><strong>' + item.name + '</strong> x' + item.qty + '</span><span style="color:var(--navy); font-weight:600;">' + window.BazzartUtils.formatPrice(item.price * item.qty) + '</span></div>';
      }).join('');
    }

    const tracking = 'BZ-' + String(order.id || '').replace(/[^0-9]/g, '').slice(-6);
    if (trackingCode) {
      trackingCode.textContent = 'Suivi: ' + (tracking || 'BZ-000000');
    }

    // Prototype heuristic: recently confirmed orders are in preparation,
    // then move to expedition based on elapsed hours.
    const elapsedHours = Math.max(0, (Date.now() - new Date(order.date).getTime()) / 3600000);
    let step = 1;
    let status = 'Statut: Preparation en cours';
    if (elapsedHours >= 24 && elapsedHours < 72) {
      step = 2;
      status = 'Statut: Expedition en cours';
    }
    if (elapsedHours >= 72) {
      step = 3;
      status = 'Statut: Livree';
    }
    setTimeline(step);

    if (timelineStatus) {
      timelineStatus.textContent = status;
    }

    if (contactSellerBtn) {
      contactSellerBtn.addEventListener('click', function () {
        window.BazzartUI.flash('Message envoye au vendeur. Reponse moyenne: moins de 2h.', 'info');
      });
    }

    if (showFaqBtn && faqBlock) {
      showFaqBtn.addEventListener('click', function () {
        faqBlock.classList.toggle('hidden');
      });
    }
  });
})();
