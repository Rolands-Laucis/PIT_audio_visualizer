class Band{
    curve = null
    points = []
    fidelity = 7
    color
    thickness
    amp

    max_amp_px = 1

    constructor(init){
        this.points = this.GenPointsLine(init)
        this.fidelity = init['fidelity']
        this.color = '#'+init['color']
        this.thickness = init['thickness']
        this.amp = init['amp']

        this.curve = p5bezier.newBezierObj(this.points, 'OPEN', this.fidelity)
        //console.log(this.curve)
    }

    Draw(){
        noFill()
        strokeWeight(this.thickness)
        stroke(this.color)
        this.curve.draw()
    }

    UpdatePoints(amps){
        var p = []

        for(let i = 0; i < this.curve.controlPoints.length; i++){
            p.push([this.curve.controlPoints[i][0], amps[i]*this.max_amp_px])
        }

        this.curve.update(p)
    }

    GenPointsLine(opt){
        var p = []
        var width = opt['width']

        for(let i=0;i<=opt['point_count'];i++){
            p.push([Math.round(width*i/opt['point_count']), Math.round(opt['height'])])//opt['height']*i/opt['Band_count']
        }

        return p
    }
}