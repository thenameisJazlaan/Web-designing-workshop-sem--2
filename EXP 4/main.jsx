function calculate(){

let n = document.getElementById("subjects").value;

let total = 0;

for(let i=1;i<=n;i++){

let marks = parseInt(prompt("Enter marks for subject "+i));

total += marks;

}

let avg = total / n;

let grade = "";
let res = "";

if(avg >= 75){
grade = "A";
}
else if(avg >= 60){
grade = "B";
}
else if(avg >= 50){
grade = "C";
}
else{
grade = "D";
}

if(avg >= 40){
res = "PASS";
}
else{
res = "FAIL";
}

document.getElementById("total").innerHTML = "Total Marks: " + total;
document.getElementById("average").innerHTML = "Average Marks: " + avg.toFixed(2);
document.getElementById("grade").innerHTML = "Grade: " + grade;
document.getElementById("result").innerHTML = "Result: " + res;

}