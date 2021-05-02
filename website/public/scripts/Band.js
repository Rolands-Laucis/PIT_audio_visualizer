class Band{
    curve = null
    points = []
    fidelity = 7
    color
    thickness
    amp
    height
    alpha

    max_amp_px = 400

    constructor(init){
        this.points = this.GenPointsLine(init)
        this.fidelity = init['fidelity']
        this.color = '#'+init['color']
        this.thickness = init['thickness']
        this.amp = init['amp']
        this.height = Math.round(init['height'])
        this.alpha = init['alpha']

        this.curve = p5bezier.newBezierObj(this.points, 'OPEN', this.fidelity)
        console.log(this)
    }

    Draw(){
        //noFill()
        strokeWeight(this.thickness)
        var col = color(this.color)
        //col.setAlpha(this.alpha)
        stroke(col)
        this.curve.draw()
    }

    UpdatePoints(amps){
        var p = []

        for(let i = 0; i < this.curve.controlPoints.length; i++){
            var taper
            if(i <= this.curve.controlPoints.length/2){
                taper = map(i,0, this.curve.controlPoints.length/2, 0, 1) * this.max_amp_px
            }else{
                taper = map(i, this.curve.controlPoints.length/2,this.curve.controlPoints.length-1, 1, 0) * this.max_amp_px
            }
            p.push([this.curve.controlPoints[i][0], this.height + (amps[i] * taper)])
        }

        this.curve.update(p)
    }

    GenPointsLine(opt){
        var p = []
        var width = opt['width']

        for(let i=0;i<=opt['point_count'];i++){
            p.push([Math.round(width*i/opt['point_count']), this.height])//opt['height']*i/opt['Band_count']
        }

        return p
    }
}