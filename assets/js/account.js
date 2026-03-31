(function() {
  'use strict';

  const ACCOUNT_TABS = ['profil', 'preferences', 'securite'];

  function initTabNavigation() {
    const navBtns = document.querySelectorAll('.account-nav-btn');
    navBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const tabName = btn.dataset.tab;
        switchTab(tabName);
      });
    });
  }

  function switchTab(tabName) {
    // Remove active class from all buttons and tabs
    document.querySelectorAll('.account-nav-btn').forEach(btn => btn.classList.remove('is-active'));
    document.querySelectorAll('.account-tab').forEach(tab => tab.classList.remove('is-visible'));

    // Add active class to selected
    document.querySelector(`[data-tab="${tabName}"]`).classList.add('is-active');
    document.getElementById(`${tabName}-tab`).classList.add('is-visible');
  }

  function loadUserData() {
    const user = window.BazzartStore.getUser();
    if (!user) {
      window.location.href = 'login.html';
      return;
    }

    // Fill profile form
    document.getElementById('fullNameInput').value = user.fullName || '';
    document.getElementById('emailInput').value = user.email || '';
    document.getElementById('phoneInput').value = user.phone || '';
    document.getElementById('addressInput').value = user.address || '';

    // Fill preferences
    document.getElementById('newsletterCheckbox').checked = user.newsletter || false;
    document.getElementById('ordersCheckbox').checked = user.notifyOrders !== false;
    document.getElementById('offersCheckbox').checked = user.notifyOffers !== false;
    document.getElementById('pushCheckbox').checked = user.notifyPush || false;
    
    const visibility = user.profileVisibility || 'private';
    document.querySelector(`input[name="visibility"][value="${visibility}"]`).checked = true;

    // Set password date
    const pwdDate = user.passwordChanged || user.createdAt || new Date().toISOString();
    const dateObj = new Date(pwdDate);
    document.getElementById('passwordDate').textContent = dateObj.toLocaleDateString('fr-FR');
  }

  function handleProfilFormSubmit(e) {
    e.preventDefault();
    
    const fullName = document.getElementById('fullNameInput').value.trim();
    const email = document.getElementById('emailInput').value.trim();
    const phone = document.getElementById('phoneInput').value.trim();
    const address = document.getElementById('addressInput').value.trim();

    if (!fullName || !email || !phone || !address) {
      window.BazzartUI.flash('Veuillez remplir tous les champs', 'error');
      return;
    }

    const user = window.BazzartStore.getUser();
    user.fullName = fullName;
    user.email = email;
    user.phone = phone;
    user.address = address;
    user.updatedAt = new Date().toISOString();

    window.BazzartStore.setUser(user);
    window.BazzartUI.flash('Profil mis a jour avec succes', 'success');
  }

  function handlePrefsFormSubmit(e) {
    e.preventDefault();

    const user = window.BazzartStore.getUser();
    user.newsletter = document.getElementById('newsletterCheckbox').checked;
    user.notifyOrders = document.getElementById('ordersCheckbox').checked;
    user.notifyOffers = document.getElementById('offersCheckbox').checked;
    user.notifyPush = document.getElementById('pushCheckbox').checked;
    user.profileVisibility = document.querySelector('input[name="visibility"]:checked').value;
    user.updatedAt = new Date().toISOString();

    window.BazzartStore.setUser(user);
    window.BazzartUI.flash('Preferences sauvegardees', 'success');
  }

  function setupPasswordChange() {
    const changeBtn = document.getElementById('changePasswordBtn');
    const passwordForm = document.getElementById('passwordForm');
    const cancelBtn = document.getElementById('cancelPasswordBtn');

    changeBtn.addEventListener('click', () => {
      passwordForm.style.display = 'block';
      changeBtn.style.display = 'none';
    });

    cancelBtn.addEventListener('click', () => {
      passwordForm.style.display = 'none';
      changeBtn.style.display = 'block';
      passwordForm.reset();
    });

    passwordForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const oldPassword = document.getElementById('oldPasswordInput').value;
      const newPassword = document.getElementById('newPasswordInput').value;
      const confirmPassword = document.getElementById('confirmPasswordInput').value;

      if (newPassword !== confirmPassword) {
        document.getElementById('passwordFeedback').textContent = 'Les mots de passe ne correspondent pas';
        document.getElementById('passwordFeedback').style.color = 'var(--danger)';
        return;
      }

      const user = window.BazzartStore.getUser();
      const storedPassword = user.password || 'password';

      if (oldPassword !== storedPassword) {
        document.getElementById('passwordFeedback').textContent = 'Ancien mot de passe incorrect';
        document.getElementById('passwordFeedback').style.color = 'var(--danger)';
        return;
      }

      user.password = newPassword;
      user.passwordChanged = new Date().toISOString();
      window.BazzartStore.setUser(user);

      document.getElementById('passwordFeedback').textContent = 'Mot de passe change avec succes';
      document.getElementById('passwordFeedback').style.color = 'var(--success)';

      setTimeout(() => {
        passwordForm.style.display = 'none';
        changeBtn.style.display = 'block';
        passwordForm.reset();
        document.getElementById('passwordDate').textContent = new Date().toLocaleDateString('fr-FR');
      }, 1500);
    });
  }

  function setupAccountDeletion() {
    const deleteBtn = document.getElementById('deleteAccountBtn');
    deleteBtn.addEventListener('click', () => {
      if (confirm('Etes-vous sur? Cette action est irreversible. Toutes vos donnees seront supprimees.')) {
        window.BazzartStore.logout();
        localStorage.removeItem('bazzart_checkout_orders');
        window.location.href = 'login.html';
      }
    });
  }

  function init() {
    loadUserData();
    initTabNavigation();
    document.getElementById('profilForm').addEventListener('submit', handleProfilFormSubmit);
    document.getElementById('prefsForm').addEventListener('submit', handlePrefsFormSubmit);
    setupPasswordChange();
    setupAccountDeletion();
  }

  document.addEventListener('DOMContentLoaded', init);
})();
