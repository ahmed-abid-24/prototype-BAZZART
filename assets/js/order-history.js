(function() {
  'use strict';

  function getOrders() {
    try {
      return JSON.parse(localStorage.getItem('bazzart_checkout_orders') || '[]');
    } catch (_err) {
      return [];
    }
  }

  function renderOrders(orders = null) {
    const allOrders = orders || getOrders();
    const ordersList = document.getElementById('ordersList');
    const noOrders = document.getElementById('noOrders');

    if (!allOrders.length) {
      ordersList.style.display = 'none';
      noOrders.style.display = 'block';
      return;
    }

    ordersList.innerHTML = allOrders.reverse().map(order => {
      const orderDate = new Date(order.orderDate || order.createdAt);
      const dateStr = orderDate.toLocaleDateString('fr-FR');
      const timeStr = orderDate.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
      
      const itemsSummary = order.items 
        ? order.items.map(item => `${item.name} × ${item.quantity}`).join(', ')
        : 'Articles non disponibles';

      return `
        <div class="order-card store-card">
          <div class="order-header">
            <div>
              <h3>Commande #${order.orderId || 'N/A'}</h3>
              <p class="text-muted">${dateStr} a ${timeStr}</p>
            </div>
            <div class="order-status">
              <span class="status-badge status-${order.status.toLowerCase()}">${order.status}</span>
            </div>
          </div>

          <div class="order-items">
            <strong>Articles:</strong>
            <p>${itemsSummary}</p>
          </div>

          <div class="order-total">
            <strong>${window.BazzartUtils.formatPrice(order.totalAmount || 0)}</strong>
          </div>

          <div class="order-timeline">
            <div class="timeline-step ${['Preparation', 'Expedition', 'Livree'].includes(order.status) ? 'is-done' : ''}">
              <span class="timeline-dot"></span>
              <span>Confirmée</span>
            </div>
            <div class="timeline-step ${['Expedition', 'Livree'].includes(order.status) ? 'is-done' : ''}">
              <span class="timeline-dot"></span>
              <span>Préparation</span>
            </div>
            <div class="timeline-step ${order.status === 'Livree' ? 'is-done' : ''}">
              <span class="timeline-dot"></span>
              <span>Expédiée</span>
            </div>
            <div class="timeline-step ${order.status === 'Livree' ? 'is-done' : ''}">
              <span class="timeline-dot"></span>
              <span>Livrée</span>
            </div>
          </div>

          <div class="order-actions" style="margin-top: 1em; display: flex; gap: 8px;">
            <button class="btn btn-secondary btn-sm" onclick="viewOrderDetails('${order.orderId || 'N/A'}')">Voir details</button>
            <button class="btn btn-secondary btn-sm" onclick="downloadInvoice('${order.orderId || 'N/A'}')">Facture</button>
            ${order.status !== 'Livree' ? '' : '<button class="btn btn-secondary btn-sm" onclick="requestReturn(\''+order.orderId+'\')">Retourner</button>'}
          </div>
        </div>
      `;
    }).join('');
  }

  function setupFilters() {
    const statusFilter = document.getElementById('statusFilter');
    statusFilter.addEventListener('change', (e) => {
      const status = e.target.value;
      if (!status) {
        renderOrders();
      } else {
        const allOrders = getOrders();
        const filtered = allOrders.filter(order => order.status === status);
        renderOrders(filtered);
      }
    });
  }

  function init() {
    const user = window.BazzartStore.getUser();
    if (!user) {
      window.location.href = 'login.html';
      return;
    }

    renderOrders();
    setupFilters();
  }

  // Make functions global for onclick handlers
  window.viewOrderDetails = function(orderId) {
    window.BazzartUI.flash(`Details de commande #${orderId}`, 'info');
  };

  window.downloadInvoice = function(orderId) {
    window.BazzartUI.flash(`Facture #${orderId} telechargeée`, 'success');
  };

  window.requestReturn = function(orderId) {
    window.location.href = '../pages/returns.html?order=' + orderId;
  };

  document.addEventListener('DOMContentLoaded', init);
})();
