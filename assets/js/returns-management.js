(function() {
  'use strict';

  function getReturnRequests() {
    try {
      return JSON.parse(localStorage.getItem('bazzart_returns') || '[]');
    } catch (_err) {
      return [];
    }
  }

  function saveReturns(returns) {
    localStorage.setItem('bazzart_returns', JSON.stringify(returns));
  }

  function renderReturns(returns = null) {
    const allReturns = returns || getReturnRequests();
    const list = document.getElementById('returnsList');
    const noReturns = document.getElementById('noReturns');

    if (!allReturns.length) {
      list.style.display = 'none';
      noReturns.style.display = 'block';
      return;
    }

    list.style.display = 'block';
    noReturns.style.display = 'none';

    list.innerHTML = allReturns.map(ret => `
      <div class="store-card return-item">
        <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 12px; padding-bottom: 12px; border-bottom: 1px solid var(--border);">
          <div>
            <h3 style="margin: 0 0 4px; color: var(--navy);">#${ret.id} - Commande ${ret.orderId}</h3>
            <p style="margin: 0; color: var(--text-muted); font-size: 12px;">${new Date(ret.createdAt).toLocaleDateString('fr-FR')}</p>
          </div>
          <span class="status-badge status-${ret.status}">${ret.status === 'pending' ? 'En attente' : ret.status === 'approved' ? 'Approuvee' : 'Rejetee'}</span>
        </div>

        <div style="margin: 12px 0; padding: 12px 0;">
          <h4 style="margin: 0 0 8px; color: var(--navy);">Details du retour</h4>
          <p style="margin: 0 0 4px;"><strong>Produit:</strong> Produit ID ${ret.productId}</p>
          <p style="margin: 0 0 4px;"><strong>Quantite:</strong> ${ret.quantity} article(s)</p>
          <p style="margin: 0 0 4px;"><strong>Motif:</strong> ${ret.reason}</p>
          <p style="margin: 0; color: var(--text-muted);"><strong>Condition:</strong> ${ret.condition}</p>
          <p style="margin: 8px 0 0; padding: 8px; background: #f5f3f0; border-radius: 6px; font-size: 13px;">${ret.description}</p>
        </div>

        ${ret.status === 'pending' ? `
          <div style="display: flex; gap: 8px; margin-top: 12px;">
            <button class="btn btn-cta btn-sm" onclick="window.approveReturn('${ret.id}')">Approuver</button>
            <button class="btn btn-danger btn-sm" onclick="window.rejectReturn('${ret.id}')">Rejeter</button>
          </div>
        ` : ''}
      </div>
    `).join('');
  }

  function setupFilters() {
    const statusFilter = document.getElementById('statusFilter');
    statusFilter.addEventListener('change', (e) => {
      const status = e.target.value;
      if (!status) {
        renderReturns();
      } else {
        const returns = getReturnRequests().filter(r => r.status === status);
        renderReturns(returns);
      }
    });
  }

  function init() {
    const user = window.BazzartStore.getUser();
    if (!user || user.role !== 'seller') {
      window.location.href = 'login.html';
      return;
    }

    renderReturns();
    setupFilters();
  }

  window.approveReturn = function(returnId) {
    let returns = getReturnRequests();
    const idx = returns.findIndex(r => r.id === returnId);
    if (idx !== -1) {
      returns[idx].status = 'approved';
      returns[idx].updatedAt = new Date().toISOString();
      saveReturns(returns);
      window.BazzartUI.flash('Retour approuve', 'success');
      renderReturns();
    }
  };

  window.rejectReturn = function(returnId) {
    if (!confirm('Etes-vous sur de vouloir rejeter this retour?')) return;
    
    let returns = getReturnRequests();
    const idx = returns.findIndex(r => r.id === returnId);
    if (idx !== -1) {
      returns[idx].status = 'rejected';
      returns[idx].updatedAt = new Date().toISOString();
      saveReturns(returns);
      window.BazzartUI.flash('Retour rejete', 'success');
      renderReturns();
    }
  };

  document.addEventListener('DOMContentLoaded', init);
})();
