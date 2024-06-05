// service-worker.js
self.addEventListener('install', function(event) {
    event.waitUntil(
      caches.open('app-cache').then(function(cache) {
        return cache.addAll([
          '/',
          '/index.html',
          '/back/Assets/style/styles.css',
          '/back/Assets/style/styles_game.css',
          '/back/Assets/scripts/script.js',
          '/back/Assets/scripts/scripts.js',
          '/public/camera/the-color-is.html',
          '/public/camera/give-me-color.html',
          '/public/camera/loader.html',
          '/public/camera/result.html',
          '/public/camera/find-the-color.html',
          '/back/images/Logo.png',
          '/back/images/arrow-left-solid.svg',
          '/back/images/bolt-solid.svg',
          '/back/images/button.png',
          '/back/images/camera-solid.svg',
          '/back/images/chargement.svg',
          '/back/images/fleches.svg',
          '/back/images/icone_192x192.png',
          '/back/images/icone_512x512.png',
          '/back/images/images-solid.svg',
          '/back/images/lamp.svg',
          // Ajoutez tous les fichiers nécessaires à la mise en cache
        ]);
      })
    );
  });
  
  self.addEventListener('fetch', function(event) {
    event.respondWith(
      caches.match(event.request).then(function(response) {
        return response || fetch(event.request);
      })
    );
  });
