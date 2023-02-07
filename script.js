$('nav a').hover(function() {
    $(this).addClass('expand');
  }, function() {
    $(this).removeClass('expand');
  });

window.onscroll = function() {
  console.log(scrollY)
  $('.about-section h1').css({'transform': `perspective(300px) rotateX(${-((scrollY/10)-67.9)}deg)`})
};
  