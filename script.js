const input = document.getElementById("celsius");
const button = document.getElementById("convertBtn");
const result = document.getElementById("result");

function convertTemperature() {
    const celsius = parseFloat(input.value);

    if (isNaN(celsius)) {
        result.textContent = "⚠️ Please enter a valid number";
        return;
    }

    const fahrenheit = (celsius * 9 / 5) + 32;

    result.innerHTML = `
        ${celsius}°C = <br>
        ${fahrenheit.toFixed(2)}°F
    `;
}

button.addEventListener("click", convertTemperature);

input.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        convertTemperature();
    }
});