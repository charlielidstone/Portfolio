$('nav a').hover(function() {
    $(this).addClass('expand');
  }, function() {
    $(this).removeClass('expand');
  });

$('body').scroll(function() {
  alert('hi')
})
  