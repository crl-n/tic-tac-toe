const CACHE_NAME = 'tic-tac-toe-cache';
const urlsToCache = [
    '/',
    '/index.html',
    '/styles.css'
];

console.log('Service worker registered.');

self.addEventListener('install', function (event) {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(function (cache) {
                cache.addAll(urlsToCache);
            })
    );
});

self.addEventListener('fetch', function (event) {
    event.respondWith(
        caches.match(event.request)
            .then(function (response) {
                response || fetch(event.request);
            })
    );
});