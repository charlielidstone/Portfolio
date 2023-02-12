$('nav a').hover(function() {
  $(this).addClass('expand');
}, function() {
  $(this).removeClass('expand');
});

const effects = {
  zoomIn: function(element) {
    element.style.transform = 'scale(0.8)';
  },
  slideRight: function(element) {
    element.style.transform = 'translateX(-5vw)';
  },
  slideLeft: function(element) {
    element.style.transform = 'translateX(5vw)';
  },
  slideUp: function(element) {
    element.style.transform = 'translateY(12vh)';
    element.style.lineHeight = "1.5em";
  },
  slideDown: function(element) {
    element.style.transform = 'translateY(-5vh)';
    element.style.lineHeight = "1.5em";
  },
  zoomOut: function(element) {
    element.style.transform = 'scale(1.2)'
  }
};

// for every other .project-item, delay the transition by 0.2s
const projectItems = document.getElementsByClassName('project-item');
for (let i = 0; i < projectItems.length; i++) {
  if (i % 2 === 1) {
    projectItems[i].style.transitionDelay = '0.2s';
  }
}

function applyEffect(effectName) {
  const elements = document.getElementsByClassName(effectName);
  for (let i = 0; i < elements.length; i++) {
    elements[i].classList.add('dynamic')
    effects[effectName](elements[i]);
  }
}

const effectNames = Object.getOwnPropertyNames(effects);
effectNames.forEach(effectName => {
  applyEffect(effectName)
})

const behaviors = {
  rotate: function(element) {
    element.style.transform = `perspective(300px) rotateX(${-((window.scrollY/20)-element.offsetTop+(window.innerHeight/(window.innerHeight/200)))}deg)`
  },
  grow: function(element) {
    element.style.transform = `scale(${window.scrollY/400}) translateY(${window.scrollY/5}px)`
    element.style.opacity = `${(-0.00125)*window.scrollY+1.25}`
  },
  growRotate: function(element) {
    const elementHeight = element.offsetHeight;
    const scrollPosition = window.scrollY + window.innerHeight / 2;
    const elementPosition = element.offsetTop + elementHeight / 2;
    const distance = Math.abs(scrollPosition - elementPosition);
    const maxDistance = window.innerHeight / 2 + elementHeight / 2;
    const scale = 1 * (1 - distance / maxDistance);
    const rotate = (-250 + element.getBoundingClientRect().top) / 8.3
    

  }
}

function applyBehavior(behaviorName) {
  const elements = document.getElementsByClassName(behaviorName);
  for (let i = 0; i < elements.length; i++) {
    behaviors[behaviorName](elements[i]);
  }
}

// const behaviorNames = Object.getOwnPropertyNames(effects);
// behaviorNames.forEach(behaviorName => {
//   applyBehavior(behaviorName)
// })


let previousScroll = 0;

window.onscroll = function() {
  const currentScroll = window.scrollY;

  const behaviorNames = Object.getOwnPropertyNames(behaviors);
  behaviorNames.forEach(behaviorName => {
      applyBehavior(behaviorName)
  })

  // $('.about-section h1').css({'transform': `perspective(300px) rotateX(${-((currentScroll/10)-67.9)}deg)`})

  const dynamicElements = document.getElementsByClassName('dynamic');
  for (let i = 0; i < dynamicElements.length; i++) {
    if (isInViewport(dynamicElements[i])) {
      setTimeout(() => {
        dynamicElements[i].classList.remove('hidden');
        dynamicElements[i].classList.add('visible');
      }, 200);
    } else if (!isInViewport(dynamicElements[i]) && currentScroll < previousScroll && currentScroll < dynamicElements[i].offsetTop) {
      dynamicElements[i].classList.add('hidden');
      dynamicElements[i].classList.remove('visible');
    }
  }

  previousScroll = currentScroll;
};
  


function isInViewport(element, margin = 100) {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= -margin &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) + margin
  );
}

  

