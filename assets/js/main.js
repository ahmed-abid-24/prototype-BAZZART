(function () {
  document.body.classList.add('page-enter');
  window.requestAnimationFrame(function () {
    document.body.classList.remove('page-enter');
  });

  function logoSvg() {
    return '<svg class="brand-mark" viewBox="0 0 34 40" fill="none" aria-hidden="true"><rect x="1" y="12" width="32" height="27" rx="16" fill="none" stroke="#C9A84C" stroke-width="1.8"></rect><rect x="14" y="24" width="6" height="8" rx="3" fill="#C9A84C" opacity="0.6"></rect><circle cx="17" cy="6" r="4" fill="none" stroke="#C9A84C" stroke-width="1.5"></circle><line x1="17" y1="10" x2="17" y2="13" stroke="#C9A84C" stroke-width="1.5"></line></svg>';
  }

  function pagePrefix() {
    return window.location.pathname.includes('/pages/') ? '..' : '.';
  }

  function getHeaderHtml(prefix) {
    return '<header class="site-header"><div class="container header-row"><a class="brand" href="' + prefix + '/index.html">' + logoSvg() + '<span class="brand-name">Bazzart</span></a><nav class="main-nav"><a class="nav-link" href="' + prefix + '/index.html">Accueil</a><a class="nav-link" href="' + prefix + '/pages/marketplace.html">Marketplace</a><a class="nav-link" href="' + prefix + '/pages/register-vendeur.html">Devenir vendeur</a><a class="nav-link" href="' + prefix + '/pages/dashboard-vendeur.html">Dashboard</a><a class="nav-link" href="' + prefix + '/pages/panier.html">Panier <span id="cartCount">(0)</span></a><a class="nav-link" id="authLink" href="' + prefix + '/pages/login.html">Connexion</a></nav></div></header>';
  }

  function getMobileBottomNavHtml(prefix) {
    const path = window.location.pathname;
    function active(test) {
      return path.includes(test) ? ' is-active' : '';
    }
    return '<nav class="mobile-bottom-nav" aria-label="Navigation rapide">'
      + '<a class="mobile-nav-item' + (path.endsWith('/index.html') || path.endsWith('/') ? ' is-active' : '') + '" href="' + prefix + '/index.html"><span>Accueil</span></a>'
      + '<a class="mobile-nav-item' + active('/marketplace.html') + '" href="' + prefix + '/pages/marketplace.html"><span>Marketplace</span></a>'
      + '<a class="mobile-nav-item' + active('/panier.html') + '" href="' + prefix + '/pages/panier.html"><span>Panier <strong id="mobileCartCount">0</strong></span></a>'
      + '<a class="mobile-nav-item' + (path.includes('/login.html') || path.includes('/register-vendeur.html') ? ' is-active' : '') + '" href="' + prefix + '/pages/login.html"><span>Compte</span></a>'
      + '</nav>';
  }

  function getFooterHtml(prefix) {
    const year = new Date().getFullYear();
    return '<footer class="site-footer">'
      + '<div class="container footer-grid">'
      + '<section class="footer-brand-col">'
      + '<a class="brand" href="#">' + logoSvg() + '<span class="brand-name">Bazzart</span></a>'
      + '<p class="footer-muted">Marketplace tunisienne pour connecter les boutiques locales et les acheteurs partout en Tunisie.</p>'
      + '<p class="footer-contact"><strong>Support:</strong> support@bazzart.tn</p>'
      + '<p class="footer-contact"><strong>Hotline:</strong> +216 70 000 000</p>'
      + '<form id="footerNewsletterForm" class="footer-newsletter">'
      + '<label for="footerNewsletterEmail">Newsletter Bazzart</label>'
      + '<div class="footer-newsletter-row">'
      + '<input id="footerNewsletterEmail" type="email" placeholder="Votre email" required>'
      + '<button type="submit">S inscrire</button>'
      + '</div>'
      + '</form>'
      + '</section>'
      + '<section>'
      + '<h4 class="footer-title">Decouvrir</h4>'
      + '<ul class="footer-links">'
      + '<li><a href="' + prefix + '/pages/marketplace.html">Marketplace</a></li>'
      + '<li><a href="' + prefix + '/pages/panier.html">Panier</a></li>'
      + '<li><a href="' + prefix + '/pages/checkout.html">Paiement securise</a></li>'
      + '<li><a href="' + prefix + '/pages/confirmation.html">Suivi commande</a></li>'
      + '</ul>'
      + '</section>'
      + '<section>'
      + '<h4 class="footer-title">Vendeurs</h4>'
      + '<ul class="footer-links">'
      + '<li><a href="' + prefix + '/pages/register-vendeur.html">Ouvrir ma boutique</a></li>'
      + '<li><a href="' + prefix + '/pages/dashboard-vendeur.html">Dashboard BI</a></li>'
      + '<li><a href="' + prefix + '/pages/login.html">Connexion vendeur</a></li>'
      + '<li><a href="' + prefix + '/pages/boutique.html?id=shop-1">Voir une boutique</a></li>'
      + '</ul>'
      + '</section>'
      + '<section>'
      + '<h4 class="footer-title">Confiance</h4>'
      + '<ul class="footer-badges">'
      + '<li>Paiement securise</li>'
      + '<li>Livraison suivie</li>'
      + '<li>Avis verifies</li>'
      + '</ul>'
        + '<ul class="footer-links" style="margin-top:10px;">'
        + '<li><a href="' + prefix + '/pages/mentions-legales.html">Mentions legales</a></li>'
        + '<li><a href="' + prefix + '/pages/cgv.html">CGV</a></li>'
        + '<li><a href="' + prefix + '/pages/politique-confidentialite.html">Politique confidentialite</a></li>'
        + '<li><a href="' + prefix + '/pages/faq.html">FAQ</a></li>'
        + '</ul>'
      + '<div class="footer-socials">'
      + '<a class="social-instagram" href="https://www.instagram.com/bazzart.official?igsh=Njl6c2NuN3IzZGd5" target="_blank" rel="noopener noreferrer" aria-label="Instagram Bazzart">'
      + '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" stroke-width="2"></rect><circle cx="12" cy="12" r="4" stroke="currentColor" stroke-width="2"></circle><circle cx="17.5" cy="6.5" r="1.2" fill="currentColor"></circle></svg>'
      + '<span>Instagram</span>'
      + '</a>'
      + '<a class="social-tiktok" href="https://www.tiktok.com/@bazzart.official?_r=1&_t=ZS-959FdSWgFxI" target="_blank" rel="noopener noreferrer" aria-label="TikTok Bazzart">'
      + '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M14 4c.2 1.5 1.2 2.8 2.7 3.4.8.3 1.6.5 2.3.5v2.5a7 7 0 0 1-3-.6v5.7a5.6 5.6 0 1 1-4.8-5.5v2.6a3 3 0 1 0 2.2 2.9V4h.6z" fill="currentColor"></path></svg>'
      + '<span>TikTok</span>'
      + '</a>'
      + '</div>'
      + '</section>'
      + '</div>'
      + '<div class="container footer-bottom">'
      + '<span>© ' + year + ' Bazzart. Tous droits reserves.</span>'
        + '<div class="footer-payment-badges"><span>VISA</span><span>Mastercard</span><span>COD</span></div>'
      + '<span>Prototype academique - IHEC Carthage</span>'
      + '</div>'
      + '</footer>';
  }

  function updateCartCount() {
    if (!window.BazzartStore) {
      return;
    }
    const target = document.getElementById('cartCount');
    const mobileTarget = document.getElementById('mobileCartCount');
    const count = window.BazzartStore.getCart().reduce((sum, item) => sum + item.quantity, 0);
    if (target) {
      target.textContent = '(' + count + ')';
    }
    if (mobileTarget) {
      mobileTarget.textContent = String(count);
    }
  }

  function updateAuthLink() {
    const authLink = document.getElementById('authLink');
    if (!authLink || !window.BazzartStore) {
      return;
    }
    const user = window.BazzartStore.getUser();
    if (!user) {
      authLink.textContent = 'Connexion';
      return;
    }
    authLink.textContent = user.firstName ? user.firstName : user.email;
    authLink.href = '#';
    authLink.addEventListener('click', function (event) {
      event.preventDefault();
      window.BazzartStore.logout();
      window.location.reload();
    });
  }

  function flash(message, type) {
    const existing = document.querySelector('.flash');
    if (existing) {
      existing.remove();
    }
    const box = document.createElement('div');
    box.className = 'flash' + (type ? ' ' + type : '');
    box.textContent = message;
    document.body.appendChild(box);
    window.setTimeout(function () {
      box.remove();
    }, 2200);
  }

  function setupPageTransitions() {
    document.addEventListener('click', function (event) {
      const link = event.target.closest('a[href]');
      if (!link) {
        return;
      }

      const href = link.getAttribute('href');
      if (!href || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:')) {
        return;
      }
      if (link.target === '_blank' || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) {
        return;
      }

      const url = new URL(href, window.location.href);
      if (url.origin !== window.location.origin) {
        return;
      }

      event.preventDefault();
      document.body.classList.add('page-exit');
      window.setTimeout(function () {
        window.location.href = url.href;
      }, 170);
    });
  }

  function setupFooterNewsletter() {
    const form = document.getElementById('footerNewsletterForm');
    if (!form) {
      return;
    }
    form.addEventListener('submit', function (event) {
      event.preventDefault();
      const input = document.getElementById('footerNewsletterEmail');
      const email = String(input && input.value ? input.value : '').trim();
      if (!email) {
        flash('Merci de saisir un email valide.', 'error');
        return;
      }
      flash('Inscription newsletter confirmee. Merci!', 'info');
      form.reset();
    });
  }

  function setupPrintButtons() {
    const triggers = document.querySelectorAll('[data-print-page]');
    if (!triggers.length) {
      return;
    }
    triggers.forEach(function (btn) {
      btn.addEventListener('click', function () {
        window.print();
      });
    });
  }

  function setupRevealAnimations() {
    const targets = document.querySelectorAll('[data-reveal]');
    if (!targets.length) {
      return;
    }

    if (!('IntersectionObserver' in window)) {
      targets.forEach(function (el) {
        el.classList.add('reveal-in');
      });
      return;
    }

    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal-in');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.16 });

    targets.forEach(function (el, index) {
      el.classList.add('reveal-item');
      el.style.transitionDelay = Math.min(index * 35, 280) + 'ms';
      observer.observe(el);
    });
  }

  function setupParallax() {
    const parallaxElements = document.querySelectorAll('[data-parallax]');
    if (!parallaxElements.length || window.innerWidth < 1000) {
      return;
    }

    window.addEventListener('scroll', function () {
      parallaxElements.forEach(function (el) {
        const rect = el.getBoundingClientRect();
        const elementCenter = rect.top + rect.height / 2;
        const viewportCenter = window.innerHeight / 2;
        const distance = (elementCenter - viewportCenter) / window.innerHeight;
        const parallaxStrength = 20;
        var yOffset = distance * parallaxStrength;
        el.style.transform = 'translateY(' + Math.round(yOffset * 100) / 100 + 'px)';
      });
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    const prefix = pagePrefix();
    const headerMount = document.getElementById('siteHeaderMount');
    const footerMount = document.getElementById('siteFooterMount');

    if (headerMount) {
      headerMount.innerHTML = getHeaderHtml(prefix);
    }
    if (footerMount) {
      footerMount.innerHTML = getFooterHtml(prefix);
    }

    if (!document.querySelector('.mobile-bottom-nav')) {
      document.body.insertAdjacentHTML('beforeend', getMobileBottomNavHtml(prefix));
    }

    updateCartCount();
    updateAuthLink();

    window.addEventListener('bazzart:cart-updated', updateCartCount);
    window.addEventListener('bazzart:user-updated', updateAuthLink);

    setupPageTransitions();
    setupFooterNewsletter();
    setupPrintButtons();
    setupRevealAnimations();
    setupParallax();
  });

  window.BazzartUI = { flash, setupRevealAnimations, setupParallax };
})();
