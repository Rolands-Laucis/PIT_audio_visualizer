//this script settings, that arent in the users control
var canvasHeight = 800
var the_Song = null
var fft = null
var windowWidthOffset = 35
var bands = []
var point_distributions = {
    '1':[1],
    '2':[0.5,0.5],
    '3':[0.50,0.30,0.20],
    '4':[0.40,0.30,0.20,0.10],
    '5':[0.35,0.30,0.20,0.10,0.05]
}
//how close should the bands be together visualy 
var bands_visual_compression = 0.5

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

    fft = new p5.FFT(0.8, vizConfig['FFT_res']);

    console.log("Canvas initialized, can start drawing...")

    //setup background color
    //bg = color(54, 55, 67, 255) 83dbd2 152339  EA7350 DCD6B0 F07571
    //bg = color('#EAE5D5')
    bg = color('#000000')
    //bg = color('#ffffff')
    bg.setAlpha(30)

    noFill()
}

function draw() {
    blendMode(BLEND)
    //background('#000000')
    background(bg);
    blendMode(ADD)

    /*
    bands.forEach((b) => {
        b.Draw()
    })
    */

    if(the_Song != null && the_Song.isPlaying()){
        var spectrum = fft.waveform(vizConfig['FFT_res']);
        var spec_to_p_distribution = []
        var offset = 0

        for(let i = 0; i < vizConfig['FFT_res']; i++){
            var distrb = []

            for(let j = 0; j < Math.round(point_distributions[String(vizConfig['Band_count'])][i] * vizConfig['FFT_res']); j++){
                distrb.push(spectrum[offset+j])
            }

            spec_to_p_distribution.push(distrb)

            offset += Math.round(point_distributions[String(vizConfig['Band_count'])][i] * vizConfig['FFT_res'])
        }

        for(let i = 0; i < bands.length; i++){
            bands[i].UpdatePoints(spec_to_p_distribution[i])
            bands[i].Draw()
        }

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
    var point_distribution = point_distributions[String(vizConfig['Band_count'])]
    
    for(let i = 0; i < vizConfig['Band_count']; i++){
        //var band_height = (((canvasHeight/vizConfig['Band_count'])/2 + canvasHeight*i/vizConfig['Band_count']) * bands_visual_compression) + (canvasHeight)/2
        var band_height = canvasHeight/2//((canvasHeight/vizConfig['Band_count'])/2 + canvasHeight*i/vizConfig['Band_count'])
        var point_count = Math.round(point_distribution[i] * vizConfig['FFT_res'])-1
        var fidelity = 4//Math.round(map(point_count, 0, vizConfig['FFT_res'], 6, 3))
        var thickness = 30//Math.round(map(point_count, 0, vizConfig['FFT_res'], 10, 300))

        bands.push(new Band({'width':windowWidth-windowWidthOffset, 
                            'height': band_height, 
                            'fidelity': fidelity, 
                            'point_count': point_count, 
                            'color':vizConfig['Band_colors'][i], 
                            'amp':vizConfig['Band_amps'][i],
                            'thickness':thickness,
                            'alpha': Math.round(255/vizConfig['Band_count'])
                            }))
    }
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