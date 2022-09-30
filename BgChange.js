var section = document.querySelector('section');
var images = [

];

setInterval(function () {
    var bg = images[Math.floor(Math.random() * images.length)];
    section.style.background = bg;
}, 1000);