const CACHE_NAME = 'cache-key-name-2';
const URLS_TO_CACHE = [
    'index.html',
    "https://getbootstrap.com/docs/5.1/dist/css/bootstrap.min.css",
];

self.addEventListener('install', function (event) {
    console.log("installing...")
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(function (cache) {
                console.log('Caching resources...');
                return cache.addAll(URLS_TO_CACHE);
            })
    );
});

// Cada vez que se solicita un recurso (Imagen, Script, Fuente, Estilos, Etc...)
self.addEventListener('fetch', function (event) {
    console.log("fetching...")

    event.respondWith(
        caches.match(event.request)
            .then(function (response) {
                if (response) {
                    return response;
                }

                return fetch(event.request);
            })
    );
});

// Gestionar los recursos cacheados, por ejemplo, eliminar los viejos y actualizar los nuevos, etc...
self.addEventListener('activate', function (event) {
    const cacheWhiteList = ['hello'];

    event.waitUntil(
        caches.keys().then(function (cacheNames) {
            return Promise.all(
                cacheNames.map(function (cacheName) {
                    if (cacheWhiteList.indexOf(cacheName) === -1) {
                        return caches.delete(cacheName);
                    }
                })
            )
        })
    );
});

