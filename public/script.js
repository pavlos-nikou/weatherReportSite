// create elipse to help with sunrise and sunset animation
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

const tempGauge = document.querySelector(".glassUpper .temp");
tempGauge.style.height = "6em";
// console.log(tempGauge);



const todContainer = document.querySelector(".sunriseSunsetContainer")
console.log(todContainer.getBoundingClientRect())
const elipse = new Elipse(200000, 20000);
console.log(elipse.endsX);


let points = [];
let prevStep = -Math.floor(elipse.endsX)+5;
const stepNum = 16;
for (let i = 0; i < stepNum; i++) {
    points.push(prevStep);
    prevStep = Math.floor(prevStep+elipse.step(stepNum));
}
console.log(points);