var app = document.querySelector('#app');
app.page = 'home';

app.addEventListener('dom-change', function() {
  // Simulate deep linking
  var hash = window.location.hash;
  if (hash) {
    Polymer.dom(document).querySelector(hash).scrollIntoView();
  }
});
