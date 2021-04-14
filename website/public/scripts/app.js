var bg = '#6E32CF'
var colors = ['#3A756D', '#85A18D', '#D14257', '#F08178', '#EBB55B']

var canvasHeight = 500

//vizualization config
var freqRes = 128
var vizFPS = 60
var theSong = null
var fft = null

//Video Capture config


function preload() {
    soundFormats('mp3');
}


function setup() {
    //setup canvas to be in the right div on the site
    let c = createCanvas(windowWidth, canvasHeight)
    c.parent(document.getElementById('vizualization_canvas'))
    getAudioContext().suspend()
    frameRate(vizFPS)

    console.log("Canvas initialized, can start drawing...")

    //setup background color
    bg = color(54, 55, 67, 255)
    background(bg)

    fft = new p5.FFT(0.8, freqRes);
}

function draw() {
    background(bg);

    if(theSong.isPlaying()){
        var spectrum = fft.analyze(freqRes);
        
    }
}

//call this from a button click or user interaction
function StartVizualization() {
    console.log("Starting vizualization...")
    getAudioContext().resume()
    if(theSong.isPlaying()){
        theSong.stop()
        //capturer.stop();
        //capturer.save();
    }else{
        userStartAudio();
        theSong.play()
        //capturer.start();
    }
}

function LoadSong(song){
    //console.log(song.target.files[0])
    theSong = loadSound(song.target.files[0]);
    console.log("loaded song: " + song.target.files[0])
}

function windowResized() {
    resizeCanvas(windowWidth, canvasHeight);
}

function Random(min, max) {
    return Math.floor(Math.random() * (max + 1)) + min;
}