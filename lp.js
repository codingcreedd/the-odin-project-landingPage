const langsInfo = document.querySelectorAll('.langs-info');


langsInfo.forEach(lang => {
    lang.addEventListener('click', e => {
        gsap.to(e.target, {y: 5, rotate: 720, repeat:1, yoyo: true,ease:"power1", duration: 0.5})
    });
});