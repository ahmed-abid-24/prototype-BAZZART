(function() {
  'use strict';

  // ============================================================================
  // NOTIFICATION MANAGEMENT
  // ============================================================================

  function getNotifications() {
    const stored = localStorage.getItem('bazzart_notifications');
    return stored ? JSON.parse(stored) : [];
  }

  function saveNotifications(notifications) {
    localStorage.setItem('bazzart_notifications', JSON.stringify(notifications));
  }

  function addNotification(type, message) {
    const notification = {
      id: 'notif_' + Date.now(),
      type: type, // 'order' | 'review' | 'return' | 'message' | 'system'
      message: message,
      read: false,
      createdAt: new Date().toISOString()
    };

    const notifications = getNotifications();
    notifications.unshift(notification); // Add at beginning
    saveNotifications(notifications);

    return notification;
  }

  function markAllAsRead() {
    const notifications = getNotifications();
    notifications.forEach(n => n.read = true);
    saveNotifications(notifications);
    renderNotifications();
  }

  function clearAllNotifications() {
    if (confirm('Êtes-vous sûr de vouloir supprimer tous les messages?')) {
      localStorage.removeItem('bazzart_notifications');
      renderNotifications();
    }
  }

  function deleteNotification(notificationId) {
    let notifications = getNotifications();
    notifications = notifications.filter(n => n.id !== notificationId);
    saveNotifications(notifications);
    renderNotifications();
  }

  // ============================================================================
  // UI RENDERING
  // ============================================================================

  function getRelativeTime(isoString) {
    const date = new Date(isoString);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'À l\'instant';
    if (diffMins < 60) return diffMins + 'm';
    if (diffHours < 24) return diffHours + 'h';
    if (diffDays < 7) return diffDays + 'j';
    
    return date.toLocaleDateString('fr-TN');
  }

  function getNotificationIcon(type) {
    switch(type) {
      case 'order': return '📦';
      case 'review': return '⭐';
      case 'return': return '↩️';
      case 'message': return '💬';
      case 'system': return 'ℹ️';
      default: return '🔔';
    }
  }

  function renderNotifications() {
    const notificationsList = document.getElementById('notificationsList');
    const noNotifications = document.getElementById('noNotifications');

    if (!notificationsList || !noNotifications) return;

    const notifications = getNotifications();

    if (notifications.length === 0) {
      notificationsList.innerHTML = '';
      notificationsList.style.display = 'none';
      noNotifications.style.display = 'block';
      return;
    }

    notificationsList.style.display = 'block';
    noNotifications.style.display = 'none';

    notificationsList.innerHTML = notifications.map(notif => {
      const isRead = notif.read ? 'is-read' : 'is-unread';
      const icon = getNotificationIcon(notif.type);

      return `
        <div class="notification-item ${isRead}">
          <div class="notification-icon">${icon}</div>
          <div class="notification-content">
            <p class="notification-message">${notif.message}</p>
            <small class="notification-time">${getRelativeTime(notif.createdAt)}</small>
          </div>
          <button class="btn-close" onclick="window.deleteNotification('${notif.id}')" title="Supprimer">×</button>
        </div>
      `;
    }).join('');

    // Update badge with unread count
    const unreadCount = notifications.filter(n => !n.read).length;
    const badge = document.querySelector('.notifications-badge');
    if (badge) {
      if (unreadCount > 0) {
        badge.textContent = unreadCount;
        badge.style.display = 'inline-flex';
      } else {
        badge.style.display = 'none';
      }
    }
  }

  // ============================================================================
  // EVENT HANDLERS
  // ============================================================================

  window.deleteNotification = function(notificationId) {
    deleteNotification(notificationId);
  };

  // ============================================================================
  // INITIALIZATION
  // ============================================================================

  function init() {
    const currentUser = window.BazzartStore.getUser();
    if (!currentUser) {
      document.body.innerHTML = '<div class="container" style="padding: 40px; text-align: center;"><h2>Accès refusé</h2><p>Vous devez être connecté pour consulter vos notifications.</p><a href="login.html" class="btn btn-cta">Se connecter</a></div>';
      return;
    }

    // Render initial notifications
    renderNotifications();

    // Setup buttons
    const markAllBtn = document.querySelector('#markAllReadBtn');
    if (markAllBtn) {
      markAllBtn.addEventListener('click', markAllAsRead);
    }

    const clearAllBtn = document.querySelector('#clearAllBtn');
    if (clearAllBtn) {
      clearAllBtn.addEventListener('click', clearAllNotifications);
    }
  }

  // Wait for DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Export for external notification creation
  window.BazzartNotifications = {
    add: addNotification,
    getAll: getNotifications,
    markAsRead: markAllAsRead,
    render: renderNotifications
  };

})();
