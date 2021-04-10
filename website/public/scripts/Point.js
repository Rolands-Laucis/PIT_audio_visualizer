class Point{
    system = 'c'//cartesian
    ox//x origin point of system
    oy//y origin point of system
    x//cartesian coord float
    y //cartesian coord float
    r//polar system radius float
    o//polar system angle float in degrees
    toRadians = Math.PI/180
    toDegrees = 180/Math.PI
    constructor(cx = random(0, windowWidth), cy = random(0, windowHeight), sys = 'c', ox = 0, oy = 0){
      this.system = sys
      if(this.system == 'c'){
        this.x = cx
        this.y = cy
      }else if(this.system == 'p'){//polar system
        this.r = cx
        this.o = cy
      }
      this.ox = ox
      this.oy = oy
    }
  
    //modulus distance between 2 points in cartesian
    static Distance(p1, p2){
      return Math.sqrt(((p2.x-p1.x)*(p2.x-p1.x)) + ((p2.y-p1.y)*(p2.y-p1.y)))
    }

    // in cartesian
    static DistanceSimple(x1,y1,x2,y2){
      return (x2-x1) + (y2-y1)
      //return Math.sqrt(((x2-x1)*(x2-x1)) + ((y2-y1)*(y2-y1)))
    }

    // in cartesian
    RotateAround(o, alpha){
      //alpha should be passed in degrees, but convert it to radians for formula
      alpha = alpha * (Math.PI/180)
      var calcx = ((Math.cos(alpha) * (this.x-o.x)) - (Math.sin(alpha) * (this.y-o.y))) + o.x
      this.y = ((Math.sin(alpha) * (this.x-o.x)) + (Math.cos(alpha) * (this.y-o.y))) + o.y
      this.x = calcx
    }

    MoveBy(x,y){
      if(this.system == 'c'){
        this.x += x
        this.y += y
      }else if(this.system == 'p'){//polar system
        this.r += p.r
        this.o += p.o
      }
    }

    Add(p){
      if(this.system == 'c'){
        this.x += p.x
        this.y += p.y
      }else if(this.system == 'p'){//polar system
        this.r += p.r
        this.o += p.o
      }
    }

    AddToRadius(r){
      this.r += r
    }

    Limit(max){
      let v = createVector(this.x, this.y);
      v.limit(max);
      this.x = v.x
      this.y = v.y
    }

    Magnitude(){
      return Math.sqrt((this.x*this.x)+(this.y*this.y))
    }

    AsArray(){
      return [this.x, this.y]
    }

    ToCartesian(){
      var x = this.r*Math.cos(this.o*this.toRadians)
      var y = this.r*Math.sin(this.o*this.toRadians)
      return new Point(x, y)
    }

    ToCartesianThis(){
      this.x = this.r*Math.cos(this.o*this.toRadians)
      this.y = this.r*Math.sin(this.o*this.toRadians)
    }

    ToPolarThis(){
      this.r = Math.sqrt((this.x*this.x)+(this.y*this.y))
      this.o = Math.atan(this.y/this.x)*this.toDegrees
      this.ox = this.x
      this.oy = this.y
    }

    ToPolar(){
      var r = Math.sqrt((this.x*this.x)+(this.y*this.y))
      var o = Math.atan(this.y/this.x)
      this.ox = this.x
      this.oy = this.y
      return new Point(r, o, 'p', this.ox, this.oy)
    }

    static StaticToCartesianCoords(r, o){
      return [r*Math.cos(o*Math.PI/180),r*Math.sin(o*Math.PI/180)]
    }
}