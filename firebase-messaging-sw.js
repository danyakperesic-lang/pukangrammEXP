importScripts('https://www.gstatic.com/firebasejs/10.12.2/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.12.2/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyBp47mSukJiG6SFLQn4nxYjd-WF2g-i0c8",
  authDomain: "djamma1.firebaseapp.com",
  projectId: "djamma1",
  storageBucket: "djamma1.firebasestorage.app",
  messagingSenderId: "959811813426",
  appId: "1:959811813426:web:0b1c0918e2fbb09045fc2b"
});

const messaging = firebase.messaging();

// Показывать уведомление когда приложение закрыто/свёрнуто
messaging.onBackgroundMessage(function(payload) {
  const { title, body, icon } = payload.notification || {};
  self.registration.showNotification(title || 'pukangram', {
    body: body || 'Новое сообщение',
    icon: icon || '/pukangrammEXP/icon-192.png',
    badge: '/pukangrammEXP/icon-192.png',
    vibrate: [200, 100, 200],
    tag: 'pukangram-msg',
    renotify: true,
    data: payload.data || {}
  });
});

// Клик по уведомлению — открыть приложение
self.addEventListener('notificationclick', function(event) {
  event.notification.close();
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then(function(clientList) {
      for (const client of clientList) {
        if (client.url.includes('pukangrammEXP') && 'focus' in client) {
          return client.focus();
        }
      }
      return clients.openWindow('https://danyakperesic-lang.github.io/pukangrammEXP/');
    })
  );
});
