window.BazzartUtils = {
  formatPrice(millimes) {
    const tnd = Math.round(Number(millimes || 0) / 1000);
    return new Intl.NumberFormat('fr-FR').format(tnd) + ' TND';
  },

  stars(value) {
    const safe = Number(value || 0);
    const full = Math.round(safe);
    let out = '';
    for (let i = 1; i <= 5; i += 1) {
      out += i <= full ? '★' : '☆';
    }
    return out;
  },

  q(name) {
    const p = new URLSearchParams(window.location.search);
    return p.get(name);
  },

  byId(id) {
    return document.getElementById(id);
  }
};
