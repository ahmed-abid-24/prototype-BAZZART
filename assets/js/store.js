const CART_KEY = 'bazzart_cart';
const USER_KEY = 'bazzart_user';
const ORDER_KEY = 'bazzart_checkout_orders';
const LAST_ORDER_KEY = 'bazzart_last_order';

window.BazzartStore = {
  getCart() {
    try {
      return JSON.parse(localStorage.getItem(CART_KEY)) || [];
    } catch (_err) {
      return [];
    }
  },

  setCart(items) {
    localStorage.setItem(CART_KEY, JSON.stringify(items));
    window.dispatchEvent(new CustomEvent('bazzart:cart-updated'));
  },

  addToCart(productId, quantity) {
    const qty = Number(quantity || 1);
    const cart = this.getCart();
    const found = cart.find((item) => item.productId === productId);
    if (found) {
      found.quantity += qty;
    } else {
      cart.push({ productId, quantity: qty });
    }
    this.setCart(cart);
  },

  updateQty(productId, quantity) {
    const qty = Number(quantity);
    const cart = this.getCart().map((item) =>
      item.productId === productId ? { ...item, quantity: qty } : item
    );
    this.setCart(cart.filter((item) => item.quantity > 0));
  },

  removeFromCart(productId) {
    const cart = this.getCart().filter((item) => item.productId !== productId);
    this.setCart(cart);
  },

  clearCart() {
    localStorage.removeItem(CART_KEY);
    window.dispatchEvent(new CustomEvent('bazzart:cart-updated'));
  },

  getUser() {
    try {
      return JSON.parse(localStorage.getItem(USER_KEY));
    } catch (_err) {
      return null;
    }
  },

  setUser(user) {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
    window.dispatchEvent(new CustomEvent('bazzart:user-updated'));
  },

  logout() {
    localStorage.removeItem(USER_KEY);
    window.dispatchEvent(new CustomEvent('bazzart:user-updated'));
  },

  saveOrder(order) {
    const list = JSON.parse(localStorage.getItem(ORDER_KEY) || '[]');
    list.push(order);
    localStorage.setItem(ORDER_KEY, JSON.stringify(list));
    localStorage.setItem(LAST_ORDER_KEY, JSON.stringify(order));
  },

  getLastOrder() {
    try {
      return JSON.parse(localStorage.getItem(LAST_ORDER_KEY));
    } catch (_err) {
      return null;
    }
  },

  getWishlist() {
    try {
      return JSON.parse(localStorage.getItem('bazzart_wishlist') || '[]');
    } catch (_err) {
      return [];
    }
  },

  setWishlist(items) {
    localStorage.setItem('bazzart_wishlist', JSON.stringify(items));
    window.dispatchEvent(new CustomEvent('bazzart:wishlist-updated'));
  },

  addToWishlist(productId) {
    const wishlist = this.getWishlist();
    if (!wishlist.includes(productId)) {
      wishlist.push(productId);
      this.setWishlist(wishlist);
    }
  },

  removeFromWishlist(productId) {
    const wishlist = this.getWishlist().filter(id => id !== productId);
    this.setWishlist(wishlist);
  },

  isInWishlist(productId) {
    return this.getWishlist().includes(productId);
  },

  clearWishlist() {
    localStorage.removeItem('bazzart_wishlist');
    window.dispatchEvent(new CustomEvent('bazzart:wishlist-updated'));
  }
};
