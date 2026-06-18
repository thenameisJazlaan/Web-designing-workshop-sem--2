function calculateResult() {
    let s1 = parseInt(document.getElementById("s1").value);
    let s2 = parseInt(document.getElementById("s2").value);
    let s3 = parseInt(document.getElementById("s3").value);
    let s4 = parseInt(document.getElementById("s4").value);
    let s5 = parseInt(document.getElementById("s5").value);

    let total = s1 + s2 + s3 + s4 + s5;
    let percentage = total / 5;

    let result;

    if (percentage >= 75) {
        result =  "Grade A";
    } else if (percentage >= 60) {
        result = "Grade B";
    } else if (percentage >= 50) {
        result = "Grade C";
    } else if (percentage >= 40) {
        result = "Pass";
    } else {
        result = "Fail";
    }

    document.getElementById("output").innerHTML =
        "Total = " + total +
        "<br>Percentage = " + percentage + "%" +
        "<br>Result = " + result;
}