(function() {
  'use strict';

  // ============================================================================
  // MOBILE FILTERS BOTTOM SHEET
  // ============================================================================

  function initMobileFilters() {
    // Create bottom sheet HTML if not exists
    if (!document.getElementById('filterBottomSheet')) {
      const filterHTML = `
        <div id="filterBottomSheet" class="filter-bottom-sheet">
          <div class="filter-bottom-sheet-header">
            <h3>Filtres</h3>
            <button class="filter-sheet-close" onclick="window.closeMobileFilters()">×</button>
          </div>
          <div class="filter-bottom-sheet-content" id="filterBottomSheetContent"></div>
          <div class="filter-bottom-sheet-footer">
            <button class="btn btn-secondary" onclick="window.resetMobileFilters()">Réinitialiser</button>
            <button class="btn btn-cta" onclick="window.applyMobileFilters()">Appliquer</button>
          </div>
        </div>
      `;
      document.body.insertAdjacentHTML('beforeend', filterHTML);
    }

    // Add mobile filter button to search sidebar if exists
    const sidebarFilters = document.querySelector('.search-sidebar');
    if (sidebarFilters && !document.getElementById('mobileFilterBtn')) {
      const mobileBtn = document.createElement('button');
      mobileBtn.id = 'mobileFilterBtn';
      mobileBtn.className = 'btn btn-cta';
      mobileBtn.textContent = 'Filtres';
      mobileBtn.style.cssText = 'display:none; width:100%; margin-bottom:20px;';
      mobileBtn.onclick = window.openMobileFilters;
      sidebarFilters.parentElement.insertBefore(mobileBtn, sidebarFilters);
    }

    // Sync filters from sidebar to bottom sheet
    syncFiltersToBottomSheet();
  }

  function syncFiltersToBottomSheet() {
    const content = document.getElementById('filterBottomSheetContent');
    if (!content) return;

    // Get filters from sidebar
    const sidebar = document.querySelector('.search-sidebar');
    if (!sidebar) {
      content.innerHTML = '<p style="padding:20px;">Aucun filtre disponible</p>';
      return;
    }

    // Extract filter sections
    const filterSections = sidebar.querySelectorAll('.filter-section');
    let html = '';

    filterSections.forEach(section => {
      const title = section.querySelector('.filter-title')?.textContent || 'Filtres';
      const sanitizedTitle = sanitizeHTML(title);
      
      html += `<div class="filter-section">
        <h4 style="margin-bottom:10px; font-weight:600;">${sanitizedTitle}</h4>`;

      const checkboxes = section.querySelectorAll('input[type="checkbox"]');
      checkboxes.forEach(checkbox => {
        const label = checkbox.parentElement?.textContent?.trim() || checkbox.value;
        const sanitizedLabel = sanitizeHTML(label);
        
        html += `
          <label style="display:block; margin-bottom:8px; cursor:pointer;">
            <input type="checkbox" data-filter-key="${sanitizeHTML(checkbox.name)}" 
                   value="${sanitizeHTML(checkbox.value)}" ${checkbox.checked ? 'checked' : ''}>
            <span>${sanitizedLabel}</span>
          </label>`;
      });

      html += '</div>';
    });

    content.innerHTML = html;

    // Add change listeners to sync back
    content.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
      checkbox.addEventListener('change', function() {
        const sidebarCheckbox = sidebar.querySelector(`input[name="${this.dataset.filterKey}"][value="${this.value}"]`);
        if (sidebarCheckbox) {
          sidebarCheckbox.checked = this.checked;
        }
      });
    });
  }

  function sanitizeHTML(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  window.openMobileFilters = function() {
    const sheet = document.getElementById('filterBottomSheet');
    if (sheet) {
      sheet.classList.add('active');
    }
  };

  window.closeMobileFilters = function() {
    const sheet = document.getElementById('filterBottomSheet');
    if (sheet) {
      sheet.classList.remove('active');
    }
  };

  window.toggleMobileFilters = function() {
    const sheet = document.getElementById('filterBottomSheet');
    if (sheet) {
      sheet.classList.toggle('active');
    }
  };

  window.applyMobileFilters = function() {
    // Dispatch event to trigger search update (for search.js to listen to)
    const event = new CustomEvent('bazzart:filters-applied');
    document.dispatchEvent(event);
    
    closeMobileFilters();
  };

  window.resetMobileFilters = function() {
    const content = document.getElementById('filterBottomSheetContent');
    if (content) {
      content.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
        checkbox.checked = false;
      });
      
      // Also reset sidebar
      const sidebar = document.querySelector('.search-sidebar');
      if (sidebar) {
        sidebar.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
          checkbox.checked = false;
        });
      }
    }
  };

  // Show/hide mobile filter button based on viewport
  function updateMobileFilterButtonVisibility() {
    const btn = document.getElementById('mobileFilterBtn');
    const sidebar = document.querySelector('.search-sidebar');
    
    if (btn && sidebar) {
      // Show button on mobile (max-width: 640px)
      if (window.innerWidth <= 640) {
        btn.style.display = 'block';
        sidebar.style.display = 'none';
      } else {
        btn.style.display = 'none';
        sidebar.style.display = 'block';
      }
    }
  }

  window.addEventListener('resize', updateMobileFilterButtonVisibility);

  // Initialize on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initMobileFilters);
  } else {
    initMobileFilters();
  }

  // Also run on window.load to ensure sidebar exists
  window.addEventListener('load', function() {
    updateMobileFilterButtonVisibility();
    syncFiltersToBottomSheet();
  });

})();
