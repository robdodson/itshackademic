// extremely unsophisticated retina image swap for badge
var retina = window.devicePixelRatio > 1;
if (retina) {
  var src = document.getElementById('badge').getAttribute('src');
  document.getElementById('badge').setAttribute('src', src.replace('.png', '@2x.png'));
}

// load stellar
// $(document).stellar();

// faq toggling, allows many to be open at once
$('#faq label').click(function() {
  $(this).parents('li').toggleClass('open');
});

// scroll navigation
$('.scroll-to').click(function() {
  $('html, body').animate({scrollTop: $( $(this).attr('href') ).offset().top }, 750);
  return false;
});
