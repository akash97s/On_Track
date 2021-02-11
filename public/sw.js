const staticCache = 'static-cache';
const dynamicCache = 'dynamic-cache';
const assets = [
  '/',
  'index.html',
  'js/app.js',
  'js/ui.js',
  'pages/fallback.html',
  'js/materialize.min.js',
  'css/materialize.min.css',
  'https://fonts.googleapis.com/icon?family=Material+Icons'
];

// install
self.addEventListener('install', e=> {
  // console.log("SW installed")
  e.waitUntil (
  caches.open(staticCache).then(cache =>  {
    cache.addAll(assets)
  })
  )
})
// activate
self.addEventListener('activate', e=> {
  console.log("SW activated");
})

self.addEventListener('fetch', e=> {
  // console.log("SW fetch event", e);
if(e.request.url.indexOf('firestore.googleapis.com') === -1) {  // request contains thiss string
  e.respondWith(
    caches.match(e.request).then(staticRes => {
      return staticRes || fetch(e.request).then(dynamicRes => {
        return caches.open(dynamicCache).then(cache => {
          cache.put(e.request.url, dynamicRes.clone());
            return dynamicRes;
        }).catch(console.log("cache.put failed"))
      }).catch(() => caches.match('pages/fallback.html'))
    })
  )
}

  // e.respondWith(
  //   caches.match(e.request).then(staticRes => {
  //     return staticRes || fetch(e.request).then(dynamicRes => {
  //       return caches.open(dynamicCache).then(cache => {
  //         cache.put(e.request.url, dynamicRes.clone())
  //           return dynamicRes;
  //       })
  //     }).catch(() => caches.match('/pages/fallback.html'))
  //   })
  // )
})
