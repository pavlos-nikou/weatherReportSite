const tempGauge = document.querySelector(".glassUpper .temp");
tempGauge.style.height = "6em";
// console.log(tempGauge);



const todContainer = document.querySelector(".sunriseSunsetContainer")
console.log(todContainer.getBoundingClientRect())
const elipse = new Elipse(200000, 20000);
console.log(elipse.endsX);


let points = [];
let prevStep = -Math.floor(elipse.endsX)+5;
const stepNum = 10;
for (let i = 0; i < stepNum; i++) {
    points.push(prevStep);
    prevStep = Math.floor(prevStep+elipse.step(stepNum));
}
console.log(points);