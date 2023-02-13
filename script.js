const navA = document.querySelectorAll('nav a');
navA.forEach(a => {
  a.addEventListener('mouseenter', function() {
    a.classList.add('expand');
  });
  a.addEventListener('mouseleave', function() {
    a.classList.remove('expand');
  });
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
    element.style.transform = 'translateY(1em)';
  },
  slideDown: function(element) {
    element.style.position = 'relative';
    element.style.transform = 'translateY(100%)';
  },
  zoomOut: function(element) {
    element.style.transform = 'scale(1.2)'
  },
  slideUpText: function(element) {
    element.style.transform = 'translateY(1em)';
    element.style.lineHeight = "1.5em";
  },
};

const effectNames = Object.getOwnPropertyNames(effects);
effectNames.forEach(effectName => {
  const elements = document.getElementsByClassName(effectName);
  for (let i = 0; i < elements.length; i++) {
    elements[i].classList.add('dynamic')
    effects[effectName](elements[i]);
  }
})

function updateEffects() {
  const currentScroll = window.scrollY;
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
}

let previousScroll = 0;
updateEffects();

const projectItems = document.getElementsByClassName('project-item');
for (let i = 0; i < projectItems.length; i++) {
  if (i % 2 === 1) {
    projectItems[i].style.transitionDelay = '0.2s';
  }
}

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
    element.style.transform = `scale(${scale}) perspective(300px) rotateX(${rotate}deg)`
  }
}

function applyBehavior(behaviorName) {
  const elements = document.getElementsByClassName(behaviorName);
  for (let i = 0; i < elements.length; i++) {
    behaviors[behaviorName](elements[i]);
  }
}

const mainSection = document.getElementsByClassName('main-section')[0];
const mainSectionH1 = document.getElementsByClassName('main-section')[0].getElementsByTagName('h1')[0];
const mainSectionH2 = document.getElementsByClassName('main-section')[0].getElementsByTagName('h2')[0];
const mainSectionH3 = document.getElementsByClassName('main-section')[0].getElementsByTagName('h3')[0];
const nav = document.getElementsByTagName('nav')[0];

if (window.innerWidth < 500) {
  mainSectionH1.classList.remove('slideUpText');
  mainSectionH1.classList.add('slideRight');
  mainSectionH2.classList.remove('slideUpText');
  mainSectionH2.classList.add('slideRight');
  mainSectionH3.classList.remove('slideUpText');
  mainSectionH3.classList.add('slideRight');
  nav.classList.add('nav-hidden');

  const menuButton = document.getElementsByClassName('menu-button')[0];
  const navLis = document.querySelectorAll('nav li');
  navLis.forEach(li => {
    li.addEventListener('click', function() {
      nav.classList.add('nav-hidden');
    });
  })
  menuButton.addEventListener('click', function() {
    nav.classList.toggle('nav-hidden');
  });
}

window.onscroll = function() {
  const currentScroll = window.scrollY;

  const behaviorNames = Object.getOwnPropertyNames(behaviors);
  behaviorNames.forEach(behaviorName => {
      applyBehavior(behaviorName)
  })

  updateEffects();

  previousScroll = currentScroll;
};
  


function isInViewport(element, margin = 100) {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= -margin &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) + margin
  );
}

  

