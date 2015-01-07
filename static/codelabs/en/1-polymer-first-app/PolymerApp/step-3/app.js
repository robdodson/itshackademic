var tabs = document.querySelector('paper-tabs');

tabs.addEventListener('core-select', function() {
  console.log("Selected: " + tabs.selected);
});