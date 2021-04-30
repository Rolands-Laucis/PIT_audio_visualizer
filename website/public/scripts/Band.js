class Band{
    curve = null
    points = []
    fidelity = 7
    color
    thickness
    amp

    constructor(init){
        this.points = this.GenPointsLine(init)
        this.fidelity = init['fidelity']
        this.color = init['color']
        this.thickness = init['thickness']
        this.amp = init['amp']

        this.curve = p5bezier.newBezierObj(this.points, 'OPEN', this.fidelity)
    }

    Draw(){
        noFill()
        strokeWeight(this.thickness)
        stroke(this.color)
        this.curve.draw()
    }

    UpdatePoints(amps){

    }

    GenPointsLine(opt){
        var p = []
        var width = opt['width']

        for(i=0;i<=opt['point_count'];i++){
            p.push([Math.round(width*i/opt['point_count']), Math.round(opt['height']/2)])
        }

        return p
    }
}