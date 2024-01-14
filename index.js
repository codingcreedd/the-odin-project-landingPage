const jsLogo = document.querySelector('.js-svg');
const movementPath = document.querySelector('#movementPath')
gsap.to(jsLogo, {x: 20, y:-20, repeat: -1, duration: 1, yoyo:true, ease: "elastic"});
