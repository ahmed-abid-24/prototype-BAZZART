(function() {
  'use strict';

  // ============================================================================
  // CHAT MESSAGE MANAGEMENT
  // ============================================================================

  function getConversations() {
    const stored = localStorage.getItem('bazzart_conversations');
    return stored ? JSON.parse(stored) : [];
  }

  function saveConversations(conversations) {
    localStorage.setItem('bazzart_conversations', JSON.stringify(conversations));
  }

  function getMessages(conversationId) {
    const stored = localStorage.getItem('bazzart_messages_' + conversationId);
    return stored ? JSON.parse(stored) : [];
  }

  function saveMessages(conversationId, messages) {
    localStorage.setItem('bazzart_messages_' + conversationId, JSON.stringify(messages));
    // Update conversation's lastMessage and timestamp
    const conversations = getConversations();
    const conv = conversations.find(c => c.id === conversationId);
    if (conv && messages.length > 0) {
      const lastMsg = messages[messages.length - 1];
      conv.lastMessage = lastMsg.text.substring(0, 50) + (lastMsg.text.length > 50 ? '...' : '');
      conv.lastMessageTime = lastMsg.createdAt;
      saveConversations(conversations);
    }
  }

  function createConversationId(userId1, userId2) {
    // Create consistent ID regardless of order
    const ids = [userId1, userId2].sort();
    return 'conv_' + ids.join('_');
  }

  function getOrCreateConversation(participantId, participantName, participantShop) {
    const currentUser = window.BazzartStore.getUser();
    const conversationId = createConversationId(currentUser.id, participantId);
    
    let conversations = getConversations();
    let conversation = conversations.find(c => c.id === conversationId);
    
    if (!conversation) {
      conversation = {
        id: conversationId,
        participantId: participantId,
        participantName: participantName,
        participantShop: participantShop,
        lastMessage: '',
        lastMessageTime: new Date().toISOString(),
        unreadCount: 0
      };
      conversations.push(conversation);
      saveConversations(conversations);
    }
    
    return conversation;
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

  function renderConversations() {
    const conversationsList = document.getElementById('conversationsList');
    if (!conversationsList) return;

    const conversations = getConversations();
    const currentUser = window.BazzartStore.getUser();
    const searchQuery = (document.getElementById('searchConversations')?.value || '').toLowerCase();

    const filtered = conversations.filter(c => 
      c.participantName.toLowerCase().includes(searchQuery) ||
      (c.participantShop || '').toLowerCase().includes(searchQuery)
    );

    if (filtered.length === 0) {
      conversationsList.innerHTML = '<p class="empty-state" style="padding: 12px; text-align: center; color: var(--text-muted);">Aucune conversation</p>';
      return;
    }

    conversationsList.innerHTML = filtered.map(conv => {
      const unread = conv.unreadCount > 0 ? ' has-unread' : '';
      return `
        <div class="conversation-item${unread}" data-conversation-id="${conv.id}" onclick="window.selectConversation('${conv.id}', '${conv.participantId}', '${conv.participantName.replace(/'/g, "\\'")}', '${(conv.participantShop || '').replace(/'/g, "\\'")}')">
          <div class="conversation-header">
            <strong>${conv.participantName}</strong>
            <small>${getRelativeTime(conv.lastMessageTime)}</small>
          </div>
          <div class="conversation-preview">${conv.lastMessage || 'Aucun message'}</div>
          ${conv.unreadCount > 0 ? `<div class="unread-badge">${conv.unreadCount}</div>` : ''}
        </div>
      `;
    }).join('');
  }

  function renderMessages(conversationId) {
    const messagesList = document.getElementById('messagesList');
    if (!messagesList) return;

    const currentUser = window.BazzartStore.getUser();
    const messages = getMessages(conversationId);

    if (messages.length === 0) {
      messagesList.innerHTML = '<div style="padding: 20px; text-align: center; color: var(--text-muted);">Aucun message</div>';
      messagesList.style.display = 'block';
      return;
    }

    messagesList.innerHTML = messages.map((msg, idx) => {
      const isSender = msg.senderId === currentUser.id;
      const senderClass = isSender ? 'is-sent' : 'is-received';
      const prevMsg = idx > 0 ? messages[idx - 1] : null;
      const sameAuthor = prevMsg && prevMsg.senderId === msg.senderId;
      
      return `
        <div class="message-item ${senderClass} ${sameAuthor ? 'continuation' : ''}">
          <div class="message-bubble">
            <p>${msg.text}</p>
            <small>${getRelativeTime(msg.createdAt)}</small>
          </div>
        </div>
      `;
    }).join('');

    messagesList.scrollTop = messagesList.scrollHeight;

    // Mark all messages as read
    const updatedMessages = messages.map(m => ({ ...m, read: true }));
    saveMessages(conversationId, updatedMessages);
    
    // Update conversation unread count
    const conversations = getConversations();
    const conv = conversations.find(c => c.id === conversationId);
    if (conv) {
      conv.unreadCount = 0;
      saveConversations(conversations);
    }
    
    renderConversations();
  }

  // ============================================================================
  // EVENT HANDLERS
  // ============================================================================

  window.selectConversation = function(conversationId, participantId, participantName, participantShop) {
    const currentUser = window.BazzartStore.getUser();
    if (!currentUser) {
      alert('Vous devez être connecté pour envoyer un message');
      return;
    }

    // Update header
    document.getElementById('chatHeader').style.display = 'block';
    document.getElementById('chatWithName').textContent = participantName;
    document.getElementById('chatWithShop').textContent = participantShop || 'Acheteur';
    document.getElementById('noConversation').style.display = 'none';

    // Show message area
    document.getElementById('messagesList').style.display = 'block';
    document.getElementById('messageForm').style.display = 'flex';

    // Render messages
    renderMessages(conversationId);

    // Clear input
    const input = document.getElementById('messageInput');
    if (input) input.value = '';

    // Store current conversation ID for form submission
    document.getElementById('messageForm').dataset.conversationId = conversationId;
    document.getElementById('messageForm').dataset.participantId = participantId;
  };

  function handleSendMessage(e) {
    e.preventDefault();
    const form = e.target;
    const conversationId = form.dataset.conversationId;
    const participantId = form.dataset.participantId;
    const input = document.getElementById('messageInput');
    const text = input.value.trim();

    if (!text) {
      alert('Veuillez entrer un message');
      return;
    }

    const currentUser = window.BazzartStore.getUser();
    const message = {
      id: 'msg_' + Date.now(),
      conversationId: conversationId,
      senderId: currentUser.id,
      senderName: currentUser.fullName || 'Utilisateur',
      text: text,
      createdAt: new Date().toISOString(),
      read: true
    };

    const messages = getMessages(conversationId);
    messages.push(message);
    saveMessages(conversationId, messages);

    input.value = '';
    renderMessages(conversationId);
  }

  function handleSearchConversations(e) {
    renderConversations();
  }

  // ============================================================================
  // INITIALIZATION
  // ============================================================================

  function init() {
    const currentUser = window.BazzartStore.getUser();
    if (!currentUser) {
      document.body.innerHTML = '<div class="container" style="padding: 40px; text-align: center;"><h2>Accès refusé</h2><p>Vous devez être connecté pour utiliser la messagerie.</p><a href="login.html" class="btn btn-cta">Se connecter</a></div>';
      return;
    }

    // Render initial conversations list
    renderConversations();

    // Setup search
    const searchInput = document.getElementById('searchConversations');
    if (searchInput) {
      searchInput.addEventListener('input', handleSearchConversations);
    }

    // Setup message form
    const messageForm = document.getElementById('messageForm');
    if (messageForm) {
      messageForm.addEventListener('submit', handleSendMessage);
    }
  }

  // Wait for DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
