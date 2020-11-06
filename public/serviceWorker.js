const CACHE_NAME = 'swipe-v2'
const urlsToCache = ['offline.html']

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            cache.addAll(urlsToCache)
        })
    )
})

self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(keyList => {
            Promise.all(keyList.map(key => {
                if (key !== CACHE_NAME) {
                    caches.delete(key)
                }
            }))
        })
    )
})

self.addEventListener('fetch', event => {
    event.respondWith(
        fetch(event.request).catch(() => caches.match('offline.html'))
    )
})