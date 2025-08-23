if ('serviceWorker' in navigator) {
   await navigator.serviceWorker.register("/static/frontend/serviceworker.js", {
        scope: '.' // <--- THIS BIT IS REQUIRED
    });
}

// This code executes in its own worker or thread
self.addEventListener("install", event => {
    console.log("Service worker installed");
 });
 self.addEventListener("activate", event => {
    console.log("Service worker activated");
 });

self.addEventListener("fetch", (event)=>{
    return
})