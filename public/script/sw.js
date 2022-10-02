const safarApp = "safar-app-v1"
const assets = [

    "/home",
    "/search",
    "/place",
    "/state",
    "/user",
    "/auth",
    "/contact",
    "/about",

    "/public/image/logo.2.png",

    "/public/icon/fontawesome-6.0.0/css/all.min.css",

    "/public/style/ly.css",
    "/public/style/app.css",
    "/public/image/img2.png",

    "/public/script/ly.js",
    "/public/script/jquery-3.6.1.min.js",
    "/public/script/app.js",
    "/public/script/app.api.js"
]

self.addEventListener("install", installEvent => {

    installEvent.waitUntil(caches.open(safarApp).then(cache => { 
        cache.addAll(assets); 
    }));

});

self.addEventListener("fetch", fetchEvent => {

    fetchEvent.respondWith(caches.match(fetchEvent.request).then(res => {
        return res || fetch(fetchEvent.request);
    }));

});