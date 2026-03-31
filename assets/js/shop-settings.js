(function() {
  'use strict';

  function loadShopSettings() {
    const user = window.BazzartStore.getUser();
    if (!user || user.role !== 'seller') {
      window.location.href = 'login.html';
      return null;
    }

    const settings = JSON.parse(localStorage.getItem('shop_settings_' + user.id) || 'null');
    return settings || {
      shopName: user.shopName || '',
      slogan: '',
      descriptionLong: '',
      logo: '',
      phone: user.phone || '',
      email: user.email || '',
      region: user.region || '',
      city: user.city || '',
      openMonday: true,
      openTuesday: true,
      openWednesday: true,
      openThursday: true,
      openFriday: true,
      openSaturday: true,
      openSunday: false,
      paymentCard: true,
      paymentTransfer: true,
      paymentCash: true
    };
  }

  function saveShopSettings(settings) {
    const user = window.BazzartStore.getUser();
    localStorage.setItem('shop_settings_' + user.id, JSON.stringify(settings));
  }

  function loadSettingsToForm() {
    const settings = loadShopSettings();
    if (!settings) return;

    document.getElementById('shopNameInput').value = settings.shopName || '';
    document.getElementById('sloganInput').value = settings.slogan || '';
    document.getElementById('descriptionLongInput').value = settings.descriptionLong || '';
    document.getElementById('logoInput').value = settings.logo || '';
    document.getElementById('phoneInput').value = settings.phone || '';
    document.getElementById('emailInput').value = settings.email || '';
    document.getElementById('regionSelect').value = settings.region || '';
    document.getElementById('cityInput').value = settings.city || '';

    document.getElementById('openMondayCheckbox').checked = settings.openMonday !== false;
    document.getElementById('openTuesdayCheckbox').checked = settings.openTuesday !== false;
    document.getElementById('openWednesdayCheckbox').checked = settings.openWednesday !== false;
    document.getElementById('openThursdayCheckbox').checked = settings.openThursday !== false;
    document.getElementById('openFridayCheckbox').checked = settings.openFriday !== false;
    document.getElementById('openSaturdayCheckbox').checked = settings.openSaturday !== false;
    document.getElementById('openSundayCheckbox').checked = settings.openSunday === true;

    document.getElementById('paymentCardCheckbox').checked = settings.paymentCard !== false;
    document.getElementById('paymentTransferCheckbox').checked = settings.paymentTransfer !== false;
    document.getElementById('paymentCashCheckbox').checked = settings.paymentCash !== false;
  }

  function handleFormSubmit(e) {
    e.preventDefault();

    const shopName = document.getElementById('shopNameInput').value.trim();
    const phone = document.getElementById('phoneInput').value.trim();
    const email = document.getElementById('emailInput').value.trim();
    const region = document.getElementById('regionSelect').value;
    const city = document.getElementById('cityInput').value.trim();

    if (!shopName || !phone || !email || !region || !city) {
      window.BazzartUI.flash('Veuillez remplir tous les champs obligatoires', 'error');
      return;
    }

    const settings = {
      shopName: shopName,
      slogan: document.getElementById('sloganInput').value.trim(),
      descriptionLong: document.getElementById('descriptionLongInput').value.trim(),
      logo: document.getElementById('logoInput').value.trim(),
      phone: phone,
      email: email,
      region: region,
      city: city,
      openMonday: document.getElementById('openMondayCheckbox').checked,
      openTuesday: document.getElementById('openTuesdayCheckbox').checked,
      openWednesday: document.getElementById('openWednesdayCheckbox').checked,
      openThursday: document.getElementById('openThursdayCheckbox').checked,
      openFriday: document.getElementById('openFridayCheckbox').checked,
      openSaturday: document.getElementById('openSaturdayCheckbox').checked,
      openSunday: document.getElementById('openSundayCheckbox').checked,
      paymentCard: document.getElementById('paymentCardCheckbox').checked,
      paymentTransfer: document.getElementById('paymentTransferCheckbox').checked,
      paymentCash: document.getElementById('paymentCashCheckbox').checked
    };

    saveShopSettings(settings);
    
    // Update user in store as well
    const user = window.BazzartStore.getUser();
    user.shopName = shopName;
    user.phone = phone;
    user.email = email;
    user.region = region;
    user.city = city;
    window.BazzartStore.setUser(user);

    window.BazzartUI.flash('Parametres sauvegardees avec succes', 'success');
  }

  function handleReset(e) {
    e.preventDefault();
    if (confirm('Etes-vous sur? Cela reinitialiser tous les parametres.')) {
      const user = window.BazzartStore.getUser();
      localStorage.removeItem('shop_settings_' + user.id);
      loadSettingsToForm();
      window.BazzartUI.flash('Parametres reinitialises', 'info');
    }
  }

  function init() {
    const user = window.BazzartStore.getUser();
    if (!user || user.role !== 'seller') {
      window.location.href = 'login.html';
      return;
    }

    loadSettingsToForm();
    document.getElementById('shopSettingsForm').addEventListener('submit', handleFormSubmit);
    document.getElementById('resetBtn').addEventListener('click', handleReset);
  }

  document.addEventListener('DOMContentLoaded', init);
})();
