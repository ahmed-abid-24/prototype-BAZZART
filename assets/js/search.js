(function() {
  'use strict';

  // ============================================================================
  // SEARCH & FILTER LOGIC
  // ============================================================================

  function getSelectedCategories() {
    const checkboxes = document.querySelectorAll('input[name="category"]:checked');
    return Array.from(checkboxes).map(cb => cb.value);
  }

  function getSelectedRating() {
    const radio = document.querySelector('input[name="rating"]:checked');
    return radio ? radio.value : 'all';
  }

  function getSelectedShop() {
    const select = document.getElementById('shopFilter');
    return select ? select.value : '';
  }

  function getInStockOnly() {
    const checkbox = document.getElementById('inStockOnly');
    return checkbox ? checkbox.checked : false;
  }

  function getMinPrice() {
    const input = document.getElementById('minPrice');
    return input ? parseInt(input.value) || 0 : 0;
  }

  function getMaxPrice() {
    const input = document.getElementById('maxPrice');
    return input ? parseInt(input.value) || 999999 : 999999;
  }

  function getSearchQuery() {
    const input = document.getElementById('searchInput');
    return input ? input.value.trim().toLowerCase() : '';
  }

  function getSortBy() {
    const select = document.getElementById('sortBy');
    return select ? select.value : 'newest';
  }

  function applySearchResults(results) {
    const grid = document.getElementById('productsGrid');
    const noResults = document.getElementById('noResults');
    const resultsCount = document.getElementById('resultsCount');

    if (!grid || !noResults) return;

    if (results.length === 0) {
      grid.innerHTML = '';
      grid.style.display = 'none';
      noResults.style.display = 'block';
      resultsCount.textContent = '0 produits trouvés';
      return;
    }

    grid.style.display = 'grid';
    noResults.style.display = 'none';
    resultsCount.textContent = results.length + (results.length === 1 ? ' produit trouvé' : ' produits trouvés');

    grid.innerHTML = results.map(product => {
      const shop = window.BAZZART_DATA.boutiques.find(b => b.id === product.shopId);
      const shopName = shop ? shop.nomShop : 'Vendeur inconnu';
      const rating = (Math.random() * 0.5 + 4).toFixed(1);
      const ratingCount = Math.floor(Math.random() * 80 + 20);
      const inWishlist = window.BazzartStore.isInWishlist ? window.BazzartStore.isInWishlist(product.id) : false;

      return `
        <div class="product-card">
          <div class="product-image-wrapper">
            <img src="${product.image}" alt="${product.name}" class="product-image">
            <button class="wishlist-btn ${inWishlist ? 'is-wishlisted' : ''}" 
                    onclick="window.toggleWishlistFromSearch('${product.id}')">
              ❤️
            </button>
          </div>
          <div class="product-info">
            <p class="product-category">${product.category}</p>
            <h3><a href="product-detail.html?id=${product.id}">${product.name}</a></h3>
            <p class="product-shop">${shopName}</p>
            <div class="product-rating">
              ${'★'.repeat(Math.floor(rating))}${'☆'.repeat(5 - Math.floor(rating))} ${rating} (${ratingCount})
            </div>
            <p class="product-price">${product.price.toLocaleString('fr-TN')} TND</p>
            <button class="btn btn-primary" onclick="window.addToCartFromSearch('${product.id}')">
              Ajouter au panier
            </button>
          </div>
        </div>
      `;
    }).join('');
  }

  function performSearch() {
    const query = getSearchQuery();
    const categories = getSelectedCategories();
    const minPrice = getMinPrice();
    const maxPrice = getMaxPrice();
    const rating = getSelectedRating();
    const shop = getSelectedShop();
    const inStockOnly = getInStockOnly();
    const sort = getSortBy();

    // Filter products
    let results = window.BAZZART_DATA.products.filter(product => {
      // Keyword search
      if (query && !product.name.toLowerCase().includes(query) && !product.description.toLowerCase().includes(query)) {
        return false;
      }

      // Category filter
      if (categories.length > 0 && !categories.includes(product.category)) {
        return false;
      }

      // Price range
      if (product.price < minPrice || product.price > maxPrice) {
        return false;
      }

      // Rating filter
      const productRating = (Math.random() * 0.5 + 4);
      if (rating === '4' && productRating < 4) return false;
      if (rating === '3' && productRating < 3) return false;

      // Stock filter
      if (inStockOnly && product.stock <= 0) {
        return false;
      }

      // Shop filter
      if (shop && product.shopId !== shop) {
        return false;
      }

      return true;
    });

    // Sort results
    switch (sort) {
      case 'price-asc':
        results.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        results.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        results.reverse(); // Simulate higher rated products first
        break;
      case 'popularity':
        results = results.sort(() => Math.random() - 0.5); // Shuffle for demo
        break;
      case 'newest':
      default:
        results.reverse(); // Newer products first
        break;
    }

    applySearchResults(results);
  }

  function populateShopFilter() {
    const select = document.getElementById('shopFilter');
    if (!select) return;

    const shops = window.BAZZART_DATA.boutiques.slice(0, 15); // Show top 15 shops
    const options = shops.map(shop => 
      `<option value="${shop.id}">${shop.nomShop}</option>`
    ).join('');

    select.innerHTML = '<option value="">Tous les vendeurs</option>' + options;
  }

  function loadSearchFromUrl() {
    const params = new URLSearchParams(window.location.search);
    const query = params.get('q');
    const category = params.get('category');
    const minPrice = params.get('minPrice');
    const maxPrice = params.get('maxPrice');

    if (query) {
      const input = document.getElementById('searchInput');
      if (input) input.value = query;
    }

    if (category) {
      const checkbox = document.querySelector(`input[name="category"][value="${category}"]`);
      if (checkbox) checkbox.checked = true;
    }

    if (minPrice) {
      const input = document.getElementById('minPrice');
      if (input) input.value = minPrice;
    }

    if (maxPrice) {
      const input = document.getElementById('maxPrice');
      if (input) input.value = maxPrice;
    }

    performSearch();
  }

  // ============================================================================
  // GLOBAL HANDLERS
  // ============================================================================

  window.toggleWishlistFromSearch = function(productId) {
    if (!window.BazzartStore.isInWishlist) {
      alert('Wishlist not available');
      return;
    }

    if (window.BazzartStore.isInWishlist(productId)) {
      window.BazzartStore.removeFromWishlist(productId);
    } else {
      window.BazzartStore.addToWishlist(productId);
    }

    performSearch(); // Re-render to update wishlist heart
  };

  window.addToCartFromSearch = function(productId) {
    const product = window.BAZZART_DATA.products.find(p => p.id === productId);
    if (!product) {
      alert('Produit non trouvé');
      return;
    }

    window.BazzartStore.addToCart(productId, 1);
    alert(product.name + ' ajouté au panier');
  };

  // ============================================================================
  // INITIALIZATION
  // ============================================================================

  function init() {
    populateShopFilter();
    loadSearchFromUrl();

    // Setup event listeners
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
      searchInput.addEventListener('input', performSearch);
    }

    const searchBtn = document.getElementById('searchBtn');
    if (searchBtn) {
      searchBtn.addEventListener('click', performSearch);
    }

    const categoryCheckboxes = document.querySelectorAll('input[name="category"]');
    categoryCheckboxes.forEach(cb => cb.addEventListener('change', performSearch));

    const minPrice = document.getElementById('minPrice');
    if (minPrice) minPrice.addEventListener('input', performSearch);

    const maxPrice = document.getElementById('maxPrice');
    if (maxPrice) maxPrice.addEventListener('input', performSearch);

    const ratingRadios = document.querySelectorAll('input[name="rating"]');
    ratingRadios.forEach(r => r.addEventListener('change', performSearch));

    const inStockCheckbox = document.getElementById('inStockOnly');
    if (inStockCheckbox) inStockCheckbox.addEventListener('change', performSearch);

    const shopFilter = document.getElementById('shopFilter');
    if (shopFilter) shopFilter.addEventListener('change', performSearch);

    const sortBy = document.getElementById('sortBy');
    if (sortBy) sortBy.addEventListener('change', performSearch);

    const resetBtn = document.getElementById('resetFilters');
    if (resetBtn) {
      resetBtn.addEventListener('click', function() {
        // Reset all filters
        document.getElementById('searchInput').value = '';
        document.getElementById('minPrice').value = '0';
        document.getElementById('maxPrice').value = '999999';
        document.getElementById('inStockOnly').checked = false;
        document.getElementById('shopFilter').value = '';
        document.getElementById('sortBy').value = 'newest';
        
        document.querySelectorAll('input[name="category"]').forEach(cb => cb.checked = false);
        document.querySelectorAll('input[name="rating"]').forEach(r => r.checked = false);
        document.querySelector('input[name="rating"][value="all"]').checked = true;

        performSearch();
      });
    }
  }

  // Wait for DOM and data
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
