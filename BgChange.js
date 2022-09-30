function generateColor() {
    length = 6;
    var chars = 'abcdef0123456789';
    var color = '';
    for (var i = 0; i < length; i++) {
        color += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return '#' + color;
}
function changeColor() {
    document.body.style.backgroundColor = generateColor();
    document.body.style.backgroundColor = generateColor();
    generateColor();
}
//Change background every 1 second
setInterval(function () {
    changeColor();

}, 1000);