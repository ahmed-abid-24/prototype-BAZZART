(function() {
  'use strict';

  function loadSellerProducts() {
    const user = window.BazzartStore.getUser();
    if (!user || user.role !== 'seller') {
      window.location.href = 'login.html';
      return;
    }

    const products = JSON.parse(localStorage.getItem('seller_products_' + user.id) || '[]');
    return products;
  }

  function saveSellerProducts(products) {
    const user = window.BazzartStore.getUser();
    localStorage.setItem('seller_products_' + user.id, JSON.stringify(products));
  }

  function renderProductsList() {
    const products = loadSellerProducts();
    const list = document.getElementById('productsList');

    if (!products.length) {
      list.innerHTML = '<div class="empty-state"><h3>Aucun produit</h3><p>Vous n avez pas encore ajoute de produit. Commencez par cliquer sur \"Ajouter un produit\".</p></div>';
      return;
    }

    list.innerHTML = '<table class="table"><thead><tr><th>Nom</th><th>Categorie</th><th>Prix</th><th>Stock</th><th>Ajoute le</th><th>Actions</th></tr></thead><tbody>' + products.map(p => `
      <tr>
        <td><strong>${p.name}</strong></td>
        <td>${p.category}</td>
        <td>${window.BazzartUtils.formatPrice(p.price)}</td>
        <td>${p.stock} articles</td>
        <td>${new Date(p.createdAt).toLocaleDateString('fr-FR')}</td>
        <td style="display:flex; gap: 6px;">
          <button class="btn btn-sm btn-secondary" onclick="window.editProduct('${p.id}')">Modifier</button>
          <button class="btn btn-sm btn-danger" onclick="window.deleteProduct('${p.id}')">Supprimer</button>
        </td>
      </tr>
    `).join('') + '</tbody></table>';
  }

  function handleFormSubmit(e) {
    e.preventDefault();

    const name = document.getElementById('productNameInput').value.trim();
    const description = document.getElementById('productDescInput').value.trim();
    const category = document.getElementById('categorySelect').value;
    const price = parseInt(document.getElementById('priceInput').value);
    const stock = parseInt(document.getElementById('stockInput').value);
    const image = document.getElementById('imageInput').value.trim();

    if (!name || !description || !category || !price || !stock || !image) {
      window.BazzartUI.flash('Veuillez remplir tous les champs', 'error');
      return;
    }

    const products = loadSellerProducts();
    const productId = document.getElementById('productForm').dataset.productId;

    if (productId) {
      // Modifier
      const idx = products.findIndex(p => p.id === productId);
      if (idx !== -1) {
        products[idx] = {
          id: productId,
          name, description, category, price, stock, image,
          createdAt: products[idx].createdAt,
          updatedAt: new Date().toISOString()
        };
      }
    } else {
      // Ajouter
      products.push({
        id: 'prod_' + Date.now(),
        name, description, category, price, stock, image,
        createdAt: new Date().toISOString()
      });
    }

    saveSellerProducts(products);
    window.BazzartUI.flash('Produit sauvegarde avec succes', 'success');
    
    document.getElementById('productForm').style.display = 'none';
    document.getElementById('productForm').reset();
    delete document.getElementById('productForm').dataset.productId;
    renderProductsList();
  }

  function setupAddButton() {
    document.getElementById('addProductBtn').addEventListener('click', () => {
      document.getElementById('productForm').style.display = 'block';
      document.getElementById('productForm').reset();
      delete document.getElementById('productForm').dataset.productId;
    });

    document.getElementById('cancelProductBtn').addEventListener('click', (e) => {
      e.preventDefault();
      document.getElementById('productForm').style.display = 'none';
    });

    document.getElementById('productForm').addEventListener('submit', handleFormSubmit);
  }

  function setupSearch() {
    document.getElementById('searchProducts').addEventListener('input', (e) => {
      const query = e.target.value.toLowerCase();
      const products = loadSellerProducts();
      const filtered = products.filter(p => p.name.toLowerCase().includes(query));
      
      const list = document.getElementById('productsList');
      if (!filtered.length) {
        list.innerHTML = '<div class="empty-state"><h3>Aucun resultat</h3><p>Aucun produit ne correspond a votre recherche.</p></div>';
      } else {
        list.innerHTML = '<table class="table"><thead><tr><th>Nom</th><th>Categorie</th><th>Prix</th><th>Stock</th><th>Ajoute le</th><th>Actions</th></tr></thead><tbody>' + filtered.map(p => `
          <tr>
            <td><strong>${p.name}</strong></td>
            <td>${p.category}</td>
            <td>${window.BazzartUtils.formatPrice(p.price)}</td>
            <td>${p.stock} articles</td>
            <td>${new Date(p.createdAt).toLocaleDateString('fr-FR')}</td>
            <td style="display:flex; gap: 6px;">
              <button class="btn btn-sm btn-secondary" onclick="window.editProduct('${p.id}')">Modifier</button>
              <button class="btn btn-sm btn-danger" onclick="window.deleteProduct('${p.id}')">Supprimer</button>
            </td>
          </tr>
        `).join('') + '</tbody></table>';
      }
    });
  }

  function init() {
    renderProductsList();
    setupAddButton();
    setupSearch();
  }

  // Global functions for onclick
  window.editProduct = function(productId) {
    const products = loadSellerProducts();
    const product = products.find(p => p.id === productId);
    if (!product) return;

    document.getElementById('productNameInput').value = product.name;
    document.getElementById('productDescInput').value = product.description;
    document.getElementById('categorySelect').value = product.category;
    document.getElementById('priceInput').value = product.price;
    document.getElementById('stockInput').value = product.stock;
    document.getElementById('imageInput').value = product.image;

    document.getElementById('productForm').dataset.productId = productId;
    document.getElementById('productForm').style.display = 'block';
  };

  window.deleteProduct = function(productId) {
    if (!confirm('Etes-vous sur de vouloir supprimer ce produit?')) return;
    
    let products = loadSellerProducts();
    products = products.filter(p => p.id !== productId);
    saveSellerProducts(products);
    window.BazzartUI.flash('Produit supprime', 'success');
    renderProductsList();
  };

  document.addEventListener('DOMContentLoaded', init);
})();
