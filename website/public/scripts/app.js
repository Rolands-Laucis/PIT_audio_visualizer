//this script settings, that arent in the users control
var canvasHeight = 500
var the_Song = null
var fft = null
var windowWidthOffset = 35
var bands = []

//vizualization config
var vizConfig = {}

//Video Capture config
var capCofig = {}

function preload() {
    soundFormats('mp3');
}


function setup() {
    //setup canvas to be in the right div on the site
    let c = createCanvas(windowWidth-windowWidthOffset, canvasHeight)
    c.parent(document.getElementById('vizualization_canvas'))
    getAudioContext().suspend()
    frameRate(60)
    p5bezier.initBezier(c)

    console.log("Canvas initialized, can start drawing...")

    //setup background color
    bg = color(54, 55, 67, 255)
    background(bg)

    fft = new p5.FFT(0.8, vizConfig['FFT_res']);
}

function draw() {
    //background(bg);

    bands.forEach(b => {
        //b.UpdatePoints()
        b.Draw()
    })

    if(the_Song != null && the_Song.isPlaying()){
        var spectrum = fft.analyze(vizConfig['FFT_res']);
        
        bands.forEach(b => {
            //b.UpdatePoints()
            b.Draw()
        })
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
    vizConfig = options
    frameRate(vizConfig['FPS'])

    bands.length = 0
    for(i = 0; i < vizConfig['Band_count']; i++){
        bands.push(new Band({'width':windowWidth-windowWidthOffset, 
                            'height':canvasHeight, 
                            'fidelity':7, 'point_count':5, 
                            'color':vizConfig['Band_colors'][i], 
                            'amp':vizConfig['Band_amps'][i],
                            'thickness':5
                            }))
    }

    console.log(bands)
}

function CapConfig(options){
    capCofig = options
}

function windowResized() {
    resizeCanvas(windowWidth-windowWidthOffset, canvasHeight);
}

function Random(min, max) {
    return Math.floor(Math.random() * (max + 1)) + min;
}

//export {StartVizualization, LoadSong, setup, windowResized, draw, preload};