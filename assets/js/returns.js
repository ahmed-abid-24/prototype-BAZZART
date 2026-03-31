(function() {
  'use strict';

  function getOrderIdFromUrl() {
    const params = new URLSearchParams(window.location.search);
    return params.get('order');
  }

  function getOrderDetails(orderId) {
    const orders = JSON.parse(localStorage.getItem('bazzart_checkout_orders') || '[]');
    return orders.find(o => o.orderId === orderId || o.id === orderId);
  }

  function populateForm() {
    const orderId = getOrderIdFromUrl();
    const order = getOrderDetails(orderId);

    document.getElementById('orderIdInput').value = orderId || 'N/A';

    if (!order || !order.items) {
      window.BazzartUI.flash('Commande non trouvee', 'error');
      return;
    }

    const productSelect = document.getElementById('productSelect');
    order.items.forEach(item => {
      const option = document.createElement('option');
      option.value = item.productId;
      option.textContent = item.name + ' (' + window.BazzartUtils.formatPrice(item.unitPrice || 0) + ')';
      productSelect.appendChild(option);
    });
  }

  function handleFormSubmit(e) {
    e.preventDefault();

    const orderId = document.getElementById('orderIdInput').value;
    const productId = document.getElementById('productSelect').value;
    const quantity = parseInt(document.getElementById('quantityInput').value);
    const reason = document.getElementById('reasonSelect').value;
    const description = document.getElementById('descriptionInput').value;
    const condition = document.querySelector('input[name="condition"]:checked').value;

    if (!productId || !reason || !description) {
      window.BazzartUI.flash('Veuillez remplir tous les champs requis', 'error');
      return;
    }

    if (!document.getElementById('acceptTermsCheckbox').checked) {
      window.BazzartUI.flash('Vous devez accepter les conditions de retour', 'error');
      return;
    }

    // Create return request
    const returnRequest = {
      id: 'RET' + Date.now(),
      orderId: orderId,
      productId: productId,
      quantity: quantity,
      reason: reason,
      description: description,
      condition: condition,
      status: 'pending',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    // Save to localStorage
    const returns = JSON.parse(localStorage.getItem('bazzart_returns') || '[]');
    returns.push(returnRequest);
    localStorage.setItem('bazzart_returns', JSON.stringify(returns));

    // Show success message
    document.getElementById('successMessage').style.display = 'block';
    document.getElementById('returnsForm').style.display = 'none';
    document.getElementById('returnIdTicket').textContent = '#' + returnRequest.id;

    window.BazzartUI.flash('Demande de retour soumise avec succes', 'success');
  }

  function init() {
    const user = window.BazzartStore.getUser();
    if (!user) {
      window.location.href = 'login.html';
      return;
    }

    populateForm();
    document.getElementById('returnsForm').addEventListener('submit', handleFormSubmit);
  }

  document.addEventListener('DOMContentLoaded', init);
})();
