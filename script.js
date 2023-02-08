$('nav a').hover(function() {
  $(this).addClass('expand');
}, function() {
  $(this).removeClass('expand');
});



let previousScroll = 0;

window.onscroll = function() {
  const currentScroll = window.scrollY;
  console.log(currentScroll);

  $('.about-section h1').css({'transform': `perspective(300px) rotateX(${-((currentScroll/10)-67.9)}deg)`})

  const hiddenElements = document.getElementsByClassName('to-be-hidden');
  for (let i = 0; i < hiddenElements.length; i++) {
    if (isInViewport(hiddenElements[i])) {
      setTimeout(() => {
        hiddenElements[i].classList.remove('hidden');
      }, 200);
    } else if (!isInViewport(hiddenElements[i]) && currentScroll < previousScroll && currentScroll < hiddenElements[i].offsetTop) {
      hiddenElements[i].classList.add('hidden');
    }
  }

  previousScroll = currentScroll;
};
  


function isInViewport(element, margin = 100) {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= -margin &&
    rect.left >= -margin &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) + margin &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth) + margin
  );
}

  

