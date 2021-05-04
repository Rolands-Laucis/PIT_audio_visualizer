//this script settings, that arent in the users control
//objects
var the_Song = null
var fft = null
var capturer = null
var canvas = null

//value variables
var canvasHeight = 900
var windowWidthOffset = 35
var bands = []
var point_distributions = {
    '1':[1],
    '2':[0.5,0.5],
    '3':[0.50,0.30,0.20],
    '4':[0.40,0.30,0.20,0.10],
    '5':[0.35,0.30,0.20,0.10,0.05]
}
//how close should the bands be together visualy. Only really works with 0.5 rn
var bands_visual_compression = 0.5

//vizualization config
var vizConfig = {}

//Video Capture config
var capCofig = {}

function preload() {
    soundFormats('mp3');
}

//              --MAIN--

function setup() {
    //setup canvas to be in the right div on the site
    canvas = createCanvas(windowWidth-windowWidthOffset, canvasHeight)
    canvas.parent(document.getElementById('vizualization_canvas'))
    getAudioContext().suspend()
    frameRate(60)

    p5bezier.initBezier(canvas)

    fft = new p5.FFT(0.8, vizConfig['FFT_res']);

    console.log("Canvas initialized, can start drawing...")

    //setup background color
    //bg = color(54, 55, 67, 255) 83dbd2 152339  EA7350 DCD6B0 F07571
    //bg = color('#EAE5D5')
    bg = color('#000000')
    //bg = color('#ffffff')
    bg.setAlpha(40)

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
        if(capCofig['cap_video']){
            capturer.capture(canvas.elt);
        }
    }
}

//call this from a button click or user interaction
function StartVizualization() {
    console.log("Starting vizualization...")
    getAudioContext().resume()
    if(the_Song.isPlaying()){
        the_Song.stop()

        if(capCofig['cap_video']){
            capturer.stop();
            capturer.save();
        }
    }else{
        userStartAudio();
        the_Song.play()

        if(capCofig['cap_video']){
            capturer.start();
        }
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
        var band_height = vizConfig['band_spacing'] ? ((canvasHeight/vizConfig['Band_count'])/2 + canvasHeight*i/vizConfig['Band_count']) : canvasHeight/2
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
                            'taper':vizConfig['taper'],
                            //'alpha': Math.round(255/vizConfig['Band_count']),
                            'max_amp_px': vizConfig['band_spacing'] ? Clamp(40*(i+1), 0, 400) : Clamp(150*(i+1), 0, 400)
                            }))
    }
}

function CapConfig(options){
    capCofig = options

    if(capCofig['cap_video']){
        capturer = new CCapture( { 
            format: capCofig['format'],
            workersPath: './capture/',
            framerate: capCofig['FPS'],
            verbose: false,
            name: 'AudioVizualization',
            timeLimit: 360,
            autoSaveTime: capCofig['interval'] == 0 ? 360 : capCofig['interval']
        } );
    }
}

function ForceSaveVideo(){
    if(capturer != null){
        capturer.stop();
        capturer.save();
    }
}

function windowResized() {
    resizeCanvas(windowWidth-windowWidthOffset, canvasHeight);
}

function Random(min, max) {
    return Math.floor(Math.random() * (max + 1)) + min;
}

function Clamp(val,min,max){
    return Math.max(min,Math.min(max,val));
}

//export {StartVizualization, LoadSong, setup, windowResized, draw, preload};