var canvasHeight = 500
var the_Song = null
var fft = null

//vizualization config
var band_count = 3
var band_colors = {"1":{"color":"#3A756D", "amp":0.7},
                    "2":{"color":"#85A18D", "amp":0.5},
                    "3":{"color":"#D14257", "amp":1}}
var freq_spec_res = 128
var viz_FPS = 60
var changing_bg = false
var bg_color = '#6E32CF'

//Video Capture config
var cap_FPS = 60
var cap_interval = 10
var format = "WebM" 

function preload() {
    soundFormats('mp3');
}


function setup() {
    //setup canvas to be in the right div on the site
    let c = createCanvas(windowWidth, canvasHeight)
    c.parent(document.getElementById('vizualization_canvas'))
    getAudioContext().suspend()
    frameRate(viz_FPS)

    console.log("Canvas initialized, can start drawing...")

    //setup background color
    bg = color(54, 55, 67, 255)
    background(bg)

    fft = new p5.FFT(0.8, freq_spec_res);
}

function draw() {
    background(bg);

    if(the_Song != null && the_Song.isPlaying()){
        var spectrum = fft.analyze(freq_spec_res);
        
    }
}

//call this from a button click or user interaction
function StartVizualization() {
    console.log("Starting vizualization...")
    getAudioContext().resume()
    if(the_Song.isPlaying()){
        the_Song.stop()
        //capturer.stop();
        //capturer.save();
    }else{
        userStartAudio();
        the_Song.play()
        //capturer.start();
    }
}

function LoadSong(song){
    //console.log(song.target.files[0])
    the_Song = loadSound(song.target.files[0]);
    console.log("loaded song: " + song.target.files[0].name)
}

function VizConfig(options){

}

function windowResized() {
    resizeCanvas(windowWidth, canvasHeight);
}

function Random(min, max) {
    return Math.floor(Math.random() * (max + 1)) + min;
}

//export {StartVizualization, LoadSong, setup, windowResized, draw, preload};