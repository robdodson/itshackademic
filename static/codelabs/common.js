var match = window.location.pathname.match(/\/static\/codelabs\/([a-z0-9-]+)\//)
if (match) {
  var el = document.querySelector('io-codelab');
  el.codelab = match[1];
  el.addEventListener("core-response", function(e) {
    document.title = el.response.codelabs[match[1]].title;
  });
  // Save the last visited codelab step to localstorage, so we can restore it
  // if necessary.
  window.addEventListener('hashchange', function(e) {
    // save new URL if we need to restore it:
    localStorage["last_codelab"] = e.newURL;
  });
}
