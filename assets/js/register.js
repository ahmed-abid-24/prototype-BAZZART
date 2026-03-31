(function () {
  let step = 1;
  const maxSteps = 4;

  function updateStep() {
    document.querySelectorAll('[data-step]').forEach((panel) => {
      panel.classList.toggle('hidden', Number(panel.getAttribute('data-step')) !== step);
    });
    const bar = document.getElementById('progressBarFill');
    if (bar) {
      bar.style.width = (step / maxSteps) * 100 + '%';
    }
    const label = document.getElementById('stepLabel');
    if (label) {
      label.textContent = 'Etape ' + step + ' / ' + maxSteps;
    }

    const prevBtn = document.getElementById('prevStepBtn');
    const nextBtn = document.getElementById('nextStepBtn');
    const submitBtn = document.querySelector('[type="submit"]');

    if (prevBtn) prevBtn.style.visibility = step === 1 ? 'hidden' : 'visible';
    if (nextBtn) nextBtn.style.display = step === maxSteps ? 'none' : 'block';
    if (submitBtn) submitBtn.style.display = step === maxSteps ? 'block' : 'none';

    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }

  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

  function validatePhone(phone) {
    const cleanPhone = String(phone || '').replace(/\D/g, '');
    return cleanPhone.length >= 8;
  }

  function validateCurrent() {
    const current = document.querySelector('[data-step="' + step + '"]');
    if (!current) return true;

    const required = current.querySelectorAll('[required]');
    for (const input of required) {
      let isValid = String(input.value || '').trim().length > 0;

      if (input.type === 'email') {
        isValid = validateEmail(input.value);
      } else if (input.name === 'phone') {
        isValid = validatePhone(input.value);
      } else if (input.name === 'firstPrice') {
        isValid = parseFloat(input.value) > 0;
      } else if (input.name === 'firstStock') {
        isValid = parseInt(input.value, 10) > 0;
      }

      if (!isValid) {
        const label = input.parentElement.textContent.split('\n')[0].trim();
        window.BazzartUI.flash('Completez le champ obligatoire: ' + label, 'error');
        input.focus();
        return false;
      }
    }
    return true;
  }

  function bindPhotoPreview() {
    const fileInput = document.getElementById('productPhoto');
    const preview = document.getElementById('photoPreview');
    if (!fileInput || !preview) return;

    fileInput.addEventListener('change', function () {
      const file = fileInput.files && fileInput.files[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = function (event) {
        preview.src = event.target.result;
        preview.classList.remove('hidden');
      };
      reader.readAsDataURL(file);
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('sellerForm');
    if (!form) return;

    bindPhotoPreview();
    updateStep();

    const nextBtn = document.getElementById('nextStepBtn');
    const prevBtn = document.getElementById('prevStepBtn');

    if (nextBtn) {
      nextBtn.addEventListener('click', function (e) {
        e.preventDefault();
        if (validateCurrent() && step < maxSteps) {
          step += 1;
          updateStep();
        }
      });
    }

    if (prevBtn) {
      prevBtn.addEventListener('click', function (e) {
        e.preventDefault();
        if (step > 1) {
          step -= 1;
          updateStep();
        }
      });
    }

    form.addEventListener('submit', function (event) {
      event.preventDefault();
      if (!validateCurrent()) return;

      const data = new FormData(form);
      const seller = {
        id: 'seller-' + Date.now(),
        fullName: data.get('fullName'),
        email: data.get('email'),
        phone: data.get('phone'),
        shopName: data.get('shopName'),
        category: data.get('category'),
        description: data.get('description'),
        governor: data.get('governor'),
        city: data.get('city'),
        firstProduct: data.get('firstProduct'),
        firstPrice: parseFloat(data.get('firstPrice')),
        firstStock: parseInt(data.get('firstStock'), 10),
        createdAt: new Date().toISOString()
      };

      localStorage.setItem('bazzart_last_seller', JSON.stringify(seller));
      window.BazzartStore.setUser({
        id: seller.id,
        email: seller.email,
        role: 'seller',
        firstName: seller.fullName.split(' ')[0],
        shopName: seller.shopName
      });

      window.BazzartUI.flash('Bienvenue sur Bazzart! Votre boutique ' + seller.shopName + ' est creee.', 'info');
      setTimeout(() => {
        window.location.href = 'dashboard-vendeur.html';
      }, 1500);
    });
  });
})();
