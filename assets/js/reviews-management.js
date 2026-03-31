(function() {
  'use strict';

  function getReviews() {
    // Collect all reviews from BAZZART_DATA
    const allReviews = [];
    Object.keys(window.BAZZART_DATA.reviews || {}).forEach(productId => {
      const reviews = window.BAZZART_DATA.reviews[productId] || [];
      reviews.forEach(review => {
        allReviews.push({
          ...review,
          productId: productId,
          id: productId + '_' + review.author
        });
      });
    });
    return allReviews;
  }

  function renderReviews(reviews = null) {
    const allReviews = reviews || getReviews();
    const list = document.getElementById('reviewsList');

    if (!allReviews.length) {
      list.innerHTML = '<div class="empty-state"><h3>Aucun avis</h3><p>Vous n avez pas encore recu d avis.</p></div>';
      return;
    }

    list.innerHTML = allReviews.map(review => `
      <div class="store-card review-item">
        <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 12px;">
          <div>
            <h3 style="margin: 0 0 4px; color: var(--navy);">${review.author}</h3>
            <p style="margin: 0; color: var(--text-muted); font-size: 12px;">Pour le produit: Produit ID ${review.productId}</p>
            <p style="margin: 0; color: var(--gold); font-size: 14px; letter-spacing: 2px;">${window.BazzartUtils.stars(review.rating)} ${review.rating}</p>
          </div>
          <span style="background: #f5f3f0; padding: 4px 8px; border-radius: 4px; font-size: 12px; color: var(--text-muted);">Il y a quelques jours</span>
        </div>
        <p style="margin: 0 0 12px; color: var(--text-dark); line-height: 1.6;">${review.text}</p>
        <textarea class="textarea" style="margin: 12px 0;" placeholder="Ecrivez votre reponse..." data-review-id="${review.id}"></textarea>
        <button class="btn btn-cta btn-sm" onclick="window.submitReplyToReview('${review.id}')">Repondre</button>
      </div>
    `).join('');
  }

  function setupFilters() {
    const ratingFilter = document.getElementById('ratingFilter');
    const sortFilter = document.getElementById('sortFilter');

    const updateDisplay = () => {
      let reviews = getReviews();

      // Filter by rating
      const rating = ratingFilter.value;
      if (rating) {
        reviews = reviews.filter(r => r.rating == rating);
      }

      // Sort
      const sort = sortFilter.value;
      if (sort === 'rating-high') {
        reviews.sort((a, b) => b.rating - a.rating);
      } else if (sort === 'rating-low') {
        reviews.sort((a, b) => a.rating - b.rating);
      }

      renderReviews(reviews);
    };

    ratingFilter.addEventListener('change', updateDisplay);
    sortFilter.addEventListener('change', updateDisplay);
  }

  function init() {
    const user = window.BazzartStore.getUser();
    if (!user || user.role !== 'seller') {
      window.location.href = 'login.html';
      return;
    }

    renderReviews();
    setupFilters();
  }

  window.submitReplyToReview = function(reviewId) {
    const textarea = document.querySelector(`textarea[data-review-id="${reviewId}"]`);
    const reply = textarea.value.trim();
    
    if (!reply) {
      window.BazzartUI.flash('Veuillez ecrire une reponse', 'warning');
      return;
    }

    if (reply.length > 500) {
      window.BazzartUI.flash('La reponse ne doit pas depasser 500 caracteres', 'error');
      return;
    }

    // Save reply (in real app, would send to server)
    localStorage.setItem('review_reply_' + reviewId, reply);
    textarea.value = '';
    window.BazzartUI.flash('Reponse soumise', 'success');
  };

  document.addEventListener('DOMContentLoaded', init);
})();
