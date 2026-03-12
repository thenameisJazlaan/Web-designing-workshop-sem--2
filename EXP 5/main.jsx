let employees=[];

function addEmployee(){

let name=document.getElementById("name").value;
let id=document.getElementById("id").value;
let salary=document.getElementById("salary").value;
let dept=document.getElementById("dept").value;

if(name=="" || id=="" || salary=="" || dept==""){
alert("Please fill all fields!");
return;
}

salary=parseInt(salary);

employees.push({name,id,salary,dept});

alert("Employee added successfully!");

document.getElementById("name").value="";
document.getElementById("id").value="";
document.getElementById("salary").value="";
document.getElementById("dept").value="";
}

function displayAll(){

if(employees.length==0){
document.getElementById("output").innerHTML="No employees added.";
return;
}

let text="<b>Employee List:</b><br>";

employees.forEach(e=>{
text+=e.name+" | "+e.id+" | "+e.salary+" | "+e.dept+"<br>";
});

document.getElementById("output").innerHTML=text;
}

function salaryFilter(){

let text="<b>Employees with Salary > 50000:</b><br>";
let found=false;

employees.forEach(e=>{
if(e.salary>50000){
text+=e.name+" | "+e.salary+" | "+e.dept+"<br>";
found=true;
}
});

if(!found){
text="No employees with salary greater than 50000.";
}

document.getElementById("output").innerHTML=text;
}

function totalSalary(){

let total=0;

employees.forEach(e=>{
total+=e.salary;
});

document.getElementById("output").innerHTML="<b>Total Salary:</b> "+total;
}

function averageSalary(){

let total=0;

employees.forEach(e=>{
total+=e.salary;
});

let avg=total/employees.length;

document.getElementById("output").innerHTML="<b>Average Salary:</b> "+avg;
}

function countDept(){

let deptName=prompt("Enter department name:");

if(deptName==null || deptName==""){
alert("Department name required!");
return;
}

let count=0;

let text="<b>Employees in "+deptName+" Department:</b><br>";

employees.forEach(e=>{
if(e.dept.toLowerCase()==deptName.toLowerCase()){
count++;
text+=e.name+" | "+e.id+" | "+e.salary+" | "+e.dept+"<br>";
}
});

text+="<br><b>Total Employees:</b> "+count;

document.getElementById("output").innerHTML=text;

}