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

let calculatorState = {
    firstValue: null,
    secondValue: null,
    operator: null,

    valueStorage: [0],
    dotTracker: 0,

    functionSelection: false,
    operationChaining: false,
    resultShown: false
}

let display = document.querySelector("#display");
display.textContent = calculatorState.valueStorage;

let numberButtons = document.querySelectorAll(".number");

numberButtons.forEach(button => {
    button.addEventListener("click", function() {
        let currentNumber;

        if (calculatorState.functionSelection && !calculatorState.firstValue) {
            calculatorState.firstValue = parseFloat(calculatorState.valueStorage.join(""));

            calculatorState.valueStorage = [0];
            display.textContent = calculatorState.valueStorage;
        }

        // if (calculatorState.firstValue !== null && calculatorState.operationChaining) {
            

        // }

        if (calculatorState.firstValue !== null) {
            calculatorState.valueStorage = [0];
            display.textContent = calculatorState.valueStorage;
        }

        if (calculatorState.resultShown && !calculatorState.functionSelection) {
            calculatorState.firstValue = null;
            calculatorState.secondValue = null;
        }



            if (button.textContent === ".") {
                if (calculatorState.dotTracker < 1) {
                    calculatorState.dotTracker++;
                    currentNumber = button.textContent; 

                    calculatorState.valueStorage.push(currentNumber);
                    display.textContent += currentNumber;
                }
            } else {
                if (calculatorState.valueStorage.length === 1 && calculatorState.valueStorage.includes(0)) {
                    calculatorState.valueStorage.shift()
                    display.textContent = "";
                }
                    currentNumber = parseFloat(button.textContent);

                    calculatorState.valueStorage.push(currentNumber);
                    display.textContent += currentNumber;
            }

            console.log(calculatorState);
    })
});

let functionButtons = document.querySelectorAll(".function") 

let operate = function(firstValue, secondValue, operator) {
    let result = operator(firstValue, secondValue);
    display.textContent = result;

    calculatorState.firstValue = result;
    calculatorState.secondValue = null;
    calculatorState.operator = null;

    let resultToArray = result.toString().split("");
    calculatorState.valueStorage = resultToArray;

}

functionButtons.forEach(button => {
    button.addEventListener("click", function() {
        calculatorState.functionSelection = true;

        if (button.textContent !== "±" && button.textContent !== "C" && button.textContent !== "=" && calculatorState.firstValue !== null) {

            calculatorState.secondValue = parseFloat(calculatorState.valueStorage.join(""));

            operate(calculatorState.firstValue, calculatorState.secondValue, calculatorState.operator);
            calculatorState.resultShown = true;
            calculatorState.functionSelection = false;
            calculatorState.operationChaining = false;
        }

        if (button.textContent === "±") {
            let toNegative = parseFloat(valueStorage.join("")) * (-1);
            display.textContent = toNegative;
            let toNegativeArray = toNegative.toString().split("");
            calculatorState.valueStorage = toNegativeArray;
        }
        
        if (button.textContent === "%") calculatorState.operator = percent;
        if (button.textContent === "x^") calculatorState.operator = power;
        if (button.textContent === "+") calculatorState.operator = add;
        if (button.textContent === "-") calculatorState.operator = subtract;
        if (button.textContent === "×") calculatorState.operator = multiply;
        if (button.textContent === "÷") calculatorState.operator = divide;

        if (button.textContent === "C") {
            calculatorState.valueStorage = [0];
            display.textContent = calculatorState.valueStorage;

            calculatorState.firstValue = null;
            calculatorState.secondValue = null;
            calculatorState.operator = null;
            calculatorState.functionSelection = false;
            calculatorState.resultShown = false;
            calculatorState.operationChaining = false;
        }

        if (button.textContent === "=") {
            calculatorState.secondValue = parseFloat(calculatorState.valueStorage.join(""));

            operate(calculatorState.firstValue, calculatorState.secondValue, calculatorState.operator);
            calculatorState.resultShown = true;
            calculatorState.functionSelection = false;
            calculatorState.operationChaining = false;
            console.log(`first value is ${calculatorState.firstValue}, second value is ${calculatorState.secondValue}, and the used operator is ${calculatorState.operator}`)
        }

    })
})


}) // <- end of the load listener



