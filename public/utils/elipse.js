class Elipse {
    constructor(a,b,center){
        this.a = a;
        this.b = b;
        this.center = center;
        this.endsX = this.x(0);
    }
    y(x) {
        let {a,b} = this;
        return Math.sqrt((a*b-b*Math.pow(x,2))/a);
    }
    x(y) {
        let {a,b} = this;
        return Math.sqrt((a*b-b*Math.pow(y,2))/b);
    }
    step(pointsQuantity){
        return (this.endsX*2)/pointsQuantity;
    }
}