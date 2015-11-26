
// Service workers require HTTPS (http://goo.gl/lq4gCo). If we're running on a real web server
// (as opposed to localhost on a custom port, which is whitelisted), then change the protocol to HTTPS.
if ((!location.port || location.port == "80") && location.protocol != 'https:') {
  location.protocol = 'http:';
}

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('./service-worker.js', {scope: './'}).then(function() {
    // Registration was successful. Now, check to see whether the service worker is controlling the page.
    if (navigator.serviceWorker.controller) {
      // If .controller is set, then this page is being actively controlled by the service worker.
      document.querySelector('#status').textContent =
        'This funky font has been cached by the controlling service worker.';
    } else {
      // If .controller isn't set, then prompt the user to reload the page so that the service worker can take
      // control. Until that happens, the service worker's fetch handler won't be used.
      document.querySelector('#status').textContent =
        'Please reload this page to allow the service worker to handle network operations.';
    }
  }).catch(function(error) {
    // Something went wrong during registration. The service-worker.js file
    // might be unavailable or contain a syntax error.
    // document.querySelector('#status').textContent = error;
    console.log( "Error" + error );
  });
}