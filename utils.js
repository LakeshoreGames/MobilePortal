class vec{
    constructor(x, y)
    {
        this.x = x;
        this.y = y;
    }

    add(v) {
        return (new vec(this.x + v.x, this.y + v.y))
    }

    subtract(v) {
        return (new vec(this.x - v.x, this.y - v.y))
    }

    normal()
    {
        let m = this.mag()
        return new vec (this.x/m, this.y/m)
    }

    mag(){
        return Math.sqrt(this.x*this.x + this.y*this.y)
    }

    dot(v){
        return this.x * v.x + this.y*v.y;
    }

    ang(v){
        return Math.acos( this.dot(v) / (v.mag() * this.mag() ) )*rad2deg
    }

}

function clamp(a, f, c)
{
    if(a < f)
    {
        return f;
    }
    if(a > c)
    {
        return c;
    }
    return a
}

var deg2rad = Math.PI/180
var rad2deg = 180/Math.PI 