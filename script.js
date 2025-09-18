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
        return "error";
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
    prevOperators: [],

    valueStorage: [0],
    dotTracker: 0,
    numbersEntered: 0,

    functionSelection: false,
    resultShown: false
}

let display = document.querySelector("#display");
display.textContent = calculatorState.valueStorage;

let numberButtons = document.querySelectorAll(".number");

numberButtons.forEach(button => {
    button.addEventListener("click", function() {
        let currentNumber;
        console.log(`this is calculator at the beginning of entering a number:`, calculatorState)

        if (calculatorState.functionSelection && !calculatorState.firstValue) {
            calculatorState.firstValue = parseFloat(calculatorState.valueStorage.join(""));

            calculatorState.valueStorage = [0];
            display.textContent = calculatorState.valueStorage;
            calculatorState.numbersEntered = 0;
        }

        if (calculatorState.firstValue !== null) {
            calculatorState.valueStorage = [0];
            display.textContent = calculatorState.valueStorage;
            calculatorState.numbersEntered = 0;
        }

        if (display.textContent === "HACKER!!!" || calculatorState.resultShown && !calculatorState.functionSelection) {
            calculatorState.firstValue = null;
            calculatorState.secondValue = null;
            calculatorState.operator = null;
            calculatorState.numbersEntered = 0;
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
                    calculatorState.numbersEntered++;
            }

            console.log(`this is calculator at the end of entering a number:`, calculatorState)
    })
});

let functionButtons = document.querySelectorAll(".function") 

let operate = function(firstValue, secondValue, operator) {
    let result = operator(firstValue, secondValue);

    if (result === "error") {
        display.textContent = "HACKER!!!"

        calculatorState.firstValue = null;
        calculatorState.secondValue = null;
    } else {
        display.textContent = result;

        calculatorState.firstValue = result;
        calculatorState.secondValue = null;

        let resultToArray = result.toString().split("");

        calculatorState.valueStorage = resultToArray;
    }

    calculatorState.resultShown = true;
    calculatorState.numbersEntered = 0;
}

functionButtons.forEach(button => {
    button.addEventListener("click", function() {
        calculatorState.functionSelection = true;

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

        calculatorState.prevOperators.push(calculatorState.operator);
        console.log(calculatorState.prevOperators);

        if (button.textContent === "C") {
            calculatorState.valueStorage = [0];
            display.textContent = calculatorState.valueStorage;

            calculatorState.firstValue = null;
            calculatorState.secondValue = null;
            calculatorState.operator = null;
            calculatorState.functionSelection = false;
            calculatorState.resultShown = false;
            calculatorState.numbersEntered = 0;
            calculatorState.prevOperators = [];
        }

        if (button.textContent === "=") {  
            calculatorState.secondValue = parseFloat(calculatorState.valueStorage.join(""));
            console.log(`first value is ${calculatorState.firstValue}, second value is ${calculatorState.secondValue}, and the used operator is ${calculatorState.operator}`)
            operate(calculatorState.firstValue, calculatorState.secondValue, calculatorState.operator);
            calculatorState.functionSelection = false;
            
        }

        if (button.textContent !== "±" && button.textContent !== "C" && button.textContent !== "=" && calculatorState.firstValue !== null && calculatorState.numbersEntered > 0) {
            calculatorState.secondValue = parseFloat(calculatorState.valueStorage.join(""));
            operate(calculatorState.firstValue, calculatorState.secondValue, calculatorState.prevOperators[calculatorState.prevOperators.length - 2]);
            //this logic breaks when we try to run an operation like 1 + 2 - 3 (returns -4, as all operators get changed to the last one used) +
            //+ can't run '=' operation when working with chained calculations like 1 + 2 + 3, as we get an error that operator is not a function, as it gets reset to null - look into that issue
        }

    })
})


})



