var bg = '#6E32CF'
var colors = ['#3A756D', '#85A18D', '#D14257', '#F08178', '#EBB55B']

var canvasHeight = 500


function setup() {
    //setup canvas to be in the right div on the site
    let c = createCanvas(windowWidth, canvasHeight);
    c.parent(document.getElementById('vizualization_canvas'))

    //setup background color
    bg = color(54, 55, 67, 255)
    background(bg);

    console.log("here")
}

function draw() {
    background(bg);
}

function windowResized() {
    resizeCanvas(windowWidth, canvasHeight);
}

function Random(min, max) {
    return Math.floor(Math.random() * (max + 1)) + min;
}