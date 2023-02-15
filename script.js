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
  appear: function(element) {
  },
  zoomIn: function(element) {
    element.style.transform = 'scale(0.8)';
    element.style.opacity = '0';
  },
  slideRight: function(element) {
    element.style.transform = 'translateX(-5vw)';
    element.style.opacity = '0';
  },
  slideLeft: function(element) {
    element.style.transform = 'translateX(5vw)';
    element.style.opacity = '0';
  },
  slideUp: function(element) {
    element.style.transform = 'translateY(10%)';
    element.style.opacity = '0';
  },
  slideDown: function(element) {
    element.style.position = 'relative';
    element.style.transform = 'translateY(100%)';
    element.style.opacity = '0';
  },
  zoomOut: function(element) {
    element.style.transform = 'scale(1.2)'
    element.style.opacity = '0';
  },
  slideUpText: function(element) {
    element.style.transform = 'translateY(1rem)';
    element.style.lineHeight = "1.5em";
    element.style.opacity = '0';
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

if (window.innerWidth < 700) {
  mainSectionH1.classList.remove('slideUpText');
  mainSectionH1.classList.add('slideRight');
  mainSectionH2.classList.remove('slideUpText');
  mainSectionH2.classList.add('slideRight');
  mainSectionH3.classList.remove('slideUpText');
  mainSectionH3.classList.add('slideRight');
  nav.classList.add('nav-hidden');

  const menuButton = document.getElementsByClassName('menu-button')[0];
  const menuImg = menuButton.getElementsByTagName('img')[0]
  const navLis = document.querySelectorAll('nav li');
  const overlay = document.getElementById('overlay');
  navLis.forEach(li => {
    li.addEventListener('click', function() {
      toggleNav();
    });
  });
  var navIsOpen = false
  menuButton.addEventListener('click', function() {
    toggleNav();
  });
  overlay.addEventListener('click', function() {
    toggleNav();
  });
  
  function toggleNav () {
    if (navIsOpen) {
      overlay.style.opacity = '0';
      overlay.style.zIndex = '0';
      nav.classList.add('nav-hidden');
      menuImg.src = 'menu_FILL0_wght400_GRAD0_opsz48.svg';
      menuButton.style.position = 'absolute'
      navIsOpen = false;
    } else if (!navIsOpen) {
      overlay.style.opacity = '1';
      overlay.style.zIndex = '1';
      nav.classList.remove('nav-hidden');
      menuImg.src = 'close_FILL0_wght400_GRAD0_opsz48.svg';
      menuButton.style.position = 'fixed'
      navIsOpen = true;
    }
  }
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

  

