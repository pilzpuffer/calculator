window.addEventListener("load", function() {

    let playMain = function() { 
        let mainTheme = document.querySelector("#main-theme");
        mainTheme.play();
        window.removeEventListener("click", playMain);
    };

    window.addEventListener("click", playMain)


const add = function (a, b) {
    return a + b;
}

const subtract = function (a, b) {
    return a - b;
}

const multiply = function (a, b) {
    return a * b;
}

const divide = function (a, b) {
    if (b === 0) {
        console.log("naughty...."); //change to an actual display output later
    } else {
        return a / b;
    }
}

const power = function (a, b) {
    return a ** b;
}

const percent = function (a, b) {
    return (b / 100) * a;
}

let firstValue = null;
let secondValue = null;
let operator = null;

let display = document.querySelector("#display");

let valueStorage = [0];
display.textContent = valueStorage;

let dotTracker = 0;
let numberButtons = document.querySelectorAll(".number");

numberButtons.forEach(button => {
    button.addEventListener("click", function() {
        let currentNumber;

        if (operator && !firstValue) {
            firstValue = parseInt(valueStorage.join(""));

            valueStorage = [0];
            display.textContent = valueStorage;
        }

            if (button.textContent === ".") {
                if (dotTracker < 1) {
                    dotTracker++;
                    currentNumber = button.textContent; 

                    valueStorage.push(currentNumber);
                    display.textContent += currentNumber;
                }
            } else {
                if (valueStorage.length === 1 && valueStorage.includes(0)) {
                    valueStorage.shift()
                    display.textContent = "";
                }
                    currentNumber = parseInt(button.textContent);

                    valueStorage.push(currentNumber);
                    display.textContent += currentNumber;
            }
    })
});

let functionButtons = document.querySelectorAll(".function") 

let operate = function(firstValue, secondValue, operator) {
    let result = operator(firstValue, secondValue);
    display.textContent = result;
    let resultToArray = result.toString().split("");
    valueStorage = resultToArray;
}

functionButtons.forEach(button => {
    button.addEventListener("click", function() {
        if (button.textContent === "±") {
            let toNegative = parseInt(valueStorage.join("")) * (-1);
            display.textContent = toNegative;
            let toNegativeArray = toNegative.toString().split("");
            valueStorage = toNegativeArray;
        }
        
        if (button.textContent === "%") operator = percent;
        if (button.textContent === "x^") operator = power;
        if (button.textContent === "+") operator = add;
        if (button.textContent === "-") operator = subtract;
        if (button.textContent === "×") operator = multiply;
        if (button.textContent === "÷") operator = divide;

        if (button.textContent === "C") {
            valueStorage = [0];
            display.textContent = valueStorage;

            firstValue = null;
            secondValue = null;
            operator = null;
        }

        if (button.textContent === "=") {
            secondValue = parseInt(valueStorage.join(""));

            operate(firstValue, secondValue, operator);
        }

    })
})


}) // <- end of the load listener



