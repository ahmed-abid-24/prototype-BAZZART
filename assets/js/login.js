(function () {
  document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('loginForm');
    const tabButtons = document.querySelectorAll('.login-tab-btn');
    const roleInput = document.querySelector('input[name="role"]');

    if (!form) return;

    function validateEmail(email) {
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return re.test(email);
    }

    // Handle role tab switching
    tabButtons.forEach((btn) => {
      btn.addEventListener('click', function () {
        tabButtons.forEach((b) => b.classList.remove('is-active'));
        this.classList.add('is-active');
        if (roleInput) {
          roleInput.value = this.getAttribute('data-role');
        }
      });
    });

    form.addEventListener('submit', function (event) {
      event.preventDefault();
      const data = new FormData(form);
      const email = String(data.get('email') || '').trim();
      const password = String(data.get('password') || '').trim();
      const role = String(data.get('role') || 'buyer');

      if (!email || !validateEmail(email)) {
        window.BazzartUI.flash('Entrez une adresse email valide.', 'error');
        return;
      }

      if (!password || password.length < 6) {
        window.BazzartUI.flash('Le mot de passe doit contenir au moins 6 caracteres.', 'error');
        return;
      }

      // Simulated login (in production, this would call a backend API)
      const user = {
        id: 'u-' + Date.now(),
        email,
        role,
        firstName: email.split('@')[0].charAt(0).toUpperCase() + email.split('@')[0].slice(1)
      };

      if (role === 'seller') {
        const savedSeller = localStorage.getItem('bazzart_last_seller');
        if (savedSeller) {
          const sellerData = JSON.parse(savedSeller);
          user.shopName = sellerData.shopName;
        }
      }

      window.BazzartStore.setUser(user);
      window.BazzartUI.flash('Bienvenue ' + user.firstName + '! Connexion reussie.', 'info');

      setTimeout(() => {
        window.location.href = role === 'seller' ? 'dashboard-vendeur.html' : '../index.html';
      }, 1500);
    });

    // Link to seller registration
    const registerLink = document.querySelector('a[href="register-vendeur.html"]');
    if (registerLink) {
      registerLink.addEventListener('click', function () {
        window.location.href = this.href;
      });
    }
  });
})();
