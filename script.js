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
    operator: {
        id: null,
        function: null
    },

    prevOperators: [],

    valueStorage: [0],
    dotTracker: 0,
    numbersEntered: 0,

    functionSelection: false,
    resultShown: false
}

let storedCalculations = document.querySelector("#prevCalc");
let currentCalculation = document.querySelector("#currentCalc")
currentCalculation.textContent = calculatorState.valueStorage;

let numberButtons = document.querySelectorAll(".number");

let updatePrev = function () {
    allFunctions = [
        {
            id: "%",
            function: percent
        },
         {
            id: "^",
            function: power
        },
         {
            id: "+",
            function: add
        },
         {
            id: "-",
            function: subtract
        },
         {
            id: "×",
            function: multiply
        },
         {
            id: "÷",
            function: divide,
        }
    ]

    let neededOperator = allFunctions.find(operator => operator.id === calculatorState.operator.id)
    console.log("the needed operator that we pushed into prevOperators is", neededOperator);

    calculatorState.prevOperators.push(neededOperator);
    }

let manageStoredDisplay = function (string) {
    if ([...string].length >= 25) {
        let shortened = [...string].slice(0, 24)
        storedCalculations.textContent = shortened.join("");
        storedCalculations.textContent += " ...";
    } else {
        storedCalculations.textContent = string;
    }
}

let displayRefresh = function() {
    calculatorState.valueStorage = [0];
    currentCalculation.textContent = calculatorState.valueStorage;
    calculatorState.numbersEntered = 0;
    calculatorState.resultShown = false;
    
    if (calculatorState.operator !== null && calculatorState.firstValue !== null) {
        manageStoredDisplay(`${calculatorState.firstValue} ${calculatorState.operator.id}`)
    } else if (calculatorState.firstValue !== null) {
        manageStoredDisplay(`${calculatorState.firstValue}`);
    }     
}

numberButtons.forEach(button => {
    button.addEventListener("click", function() {
        let currentNumber;

        if (calculatorState.functionSelection && !calculatorState.firstValue) {
            calculatorState.firstValue = parseFloat(calculatorState.valueStorage.join(""));
            displayRefresh()
        }

        if (calculatorState.firstValue !== null && calculatorState.numbersEntered === 0) { 
            //not a duplicate of the above if statement, needed to update values correctly in case of chained operations!
            updatePrev(); 
            displayRefresh();
        }

        if (currentCalculation.textContent === "HACKER!!!" || calculatorState.resultShown && !calculatorState.functionSelection) {
            calculatorState.firstValue = null;
            calculatorState.secondValue = null;
            calculatorState.operator = null;
            calculatorState.numbersEntered = 0;
            storedCalculations.textContent = "";
        }



            if (button.textContent === ".") {
                if (calculatorState.dotTracker < 1) {
                    calculatorState.dotTracker++;
                    currentNumber = button.textContent; 

                    calculatorState.valueStorage.push(currentNumber);
                    currentCalculation.textContent += currentNumber;
                }
            } else {
                if (calculatorState.valueStorage.length === 1 && calculatorState.valueStorage.includes(0)) {
                    calculatorState.valueStorage.shift()
                    currentCalculation.textContent = "";
                }
                    currentNumber = parseFloat(button.textContent);

                    calculatorState.valueStorage.push(currentNumber);

                    if (calculatorState.valueStorage.length >= 13) {
                        let shortenedDisplay = calculatorState.valueStorage.slice(0, 12)
                        currentCalculation.textContent = parseFloat(shortenedDisplay.join(""));
                        currentCalculation.textContent += " ...";
                    } else {
                        currentCalculation.textContent += currentNumber;
                    }

                    calculatorState.numbersEntered++;
            }

            console.log(`valueStorage is ${calculatorState.valueStorage}`);
    })
});



let functionButtons = document.querySelectorAll(".function") 

let operate = function(firstValue, secondValue, operator) {
    let result = operator(firstValue, secondValue);

    if (result === "error") {
        currentCalculation.textContent = "HACKER!!!"

        calculatorState.firstValue = null;
        calculatorState.secondValue = null;
    } else {     
        if ([...result.toString()].length >= 13) {
            let shortenedResult = [...result.toString()].slice(0, 12)
            currentCalculation.textContent = parseFloat(shortenedResult.join(""));
            currentCalculation.textContent += " ...";
        } else {
            currentCalculation.textContent = result;
        }

        calculatorState.firstValue = result;
        calculatorState.secondValue = null;

        let resultToArray = result.toString().split("");

        calculatorState.valueStorage = resultToArray;
    }

    calculatorState.resultShown = true;
    calculatorState.numbersEntered = 0;
}
        
let handleFunctions = function(event) {
    calculatorState.functionSelection = true;
    console.log(event);

    if (event.target.textContent === "±" || event.key === "_") {
        let toNegative = parseFloat(valueStorage.join("")) * (-1);
        currentCalculation.textContent = toNegative;
        let toNegativeArray = toNegative.toString().split("");
        calculatorState.valueStorage = toNegativeArray;
    }
    
    if (event.target.textContent === "%" || event.key === "%") {
        calculatorState.operator.id = "%"
        calculatorState.operator.function = percent;
    }
    if (event.target.textContent === "x^" || event.key === "^") {
        calculatorState.operator.id = "^";
        calculatorState.operator.function = power;
    }
    if (event.target.textContent === "+" || event.key === "+") {
        calculatorState.operator.id = "+"
        calculatorState.operator.function = add;
    } 
    if (event.target.textContent === "-" || event.key === "-") {
        calculatorState.operator.id = "-"
        calculatorState.operator.function = subtract;
    }
    if (event.target.textContent === "×" || event.key === "*") {
        calculatorState.operator.id = "×"
        calculatorState.operator.function = multiply;
    }
    if (event.target.textContent === "÷" || event.key === "/") {
        calculatorState.operator.id = "÷"
        calculatorState.operator.function = divide;
    }

    if (calculatorState.firstValue !== null) {
        manageStoredDisplay(`${calculatorState.firstValue} ${calculatorState.operator.id}`)
    }   


    if (event.target.textContent === "C" || event.code === "KeyC") {
        calculatorState.valueStorage = [0];
        currentCalculation.textContent = calculatorState.valueStorage;
        storedCalculations.textContent = "";

        calculatorState.firstValue = null;
        calculatorState.secondValue = null;
        calculatorState.operator.id = null;
        calculatorState.operator.function = null;
        calculatorState.functionSelection = false;
        calculatorState.resultShown = false;
        calculatorState.numbersEntered = 0;
        calculatorState.prevOperators = [];
    }

    if (event.target.textContent === "=" || event.key === "=") {  
        if (calculatorState.firstValue !== null && calculatorState.numbersEntered > 0) {
            calculatorState.secondValue = parseFloat(calculatorState.valueStorage.join(""));
            manageStoredDisplay(`${calculatorState.firstValue} ${calculatorState.operator.id} ${calculatorState.secondValue} =`);
            operate(calculatorState.firstValue, calculatorState.secondValue, calculatorState.operator.function);
            calculatorState.functionSelection = false;
        } 
    }

    if ((event.key !== "_" && event.code !== "KeyC" && !event.key !== "="||event.target.textContent !== "±" && event.target.textContent !== "C" && event.target.textContent !== "=") && calculatorState.firstValue !== null && calculatorState.numbersEntered > 0) {
        calculatorState.secondValue = parseFloat(calculatorState.valueStorage.join(""));
        manageStoredDisplay(`${calculatorState.firstValue} ${calculatorState.prevOperators[calculatorState.prevOperators.length - 1].id} ${calculatorState.secondValue} =`);
        operate(calculatorState.firstValue, calculatorState.secondValue, calculatorState.prevOperators[calculatorState.prevOperators.length - 1].function);
    }
}

functionButtons.forEach(button => {
    button.addEventListener("click", handleFunctions);
})

window.addEventListener("keydown", handleFunctions);

const backspace = document.querySelector("#backspace");

backspace.addEventListener("click", function() {

    if (calculatorState.valueStorage.length >= 1 && !calculatorState.resultShown) {
        if (calculatorState.valueStorage.length > 1) {
            calculatorState.valueStorage.pop();
        } else if (calculatorState.valueStorage.length === 1) {
            if (!calculatorState.valueStorage.includes(0)) {
                calculatorState.valueStorage = [0];
            }
        }
    }

    calculatorState.numbersEntered = calculatorState.numbersEntered === 0 ? 0 : calculatorState.numbersEntered - 1;
    if (calculatorState.valueStorage.length >= 13) {
        let shortened = calculatorState.valueStorage.slice(0, 12)
        currentCalculation.textContent = parseFloat(shortened.join(""));
        currentCalculation.textContent += " ...";
    } else {
        currentCalculation.textContent = parseFloat(calculatorState.valueStorage.join(""));
    }
})




    const canvas = document.querySelector("#hacker");
    let screenSize = window.screen;
    let canvasWidth = (canvas.width = screenSize.width);
    let canvasHeight = (canvas.height = screenSize.height);
    const ctx = canvas.getContext("2d");

    const columnCount = Math.floor(canvasWidth / 10) + 1;
    let columnPositions = Array(columnCount).fill(0);

    const randomItem = (items) => items[Math.floor(Math.random() * items.length)];
    const possibleCharacters = [..."01234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ"];

    setInterval(() => {
        ctx.fillStyle = "rgba(0, 0, 0, .05)";
        ctx.fillRect(0, 0, canvasWidth, canvasHeight);
        ctx.fillStyle = "green"

        columnPositions.forEach((y, columnIndex) => {
            const char = randomItem(possibleCharacters);
            ctx.fillText(char, columnIndex * 10, y)

            if (y >= canvasHeight || y > 50 + 10000 * Math.random()) {
                columnPositions[columnIndex] = 0; //reset a column to start back from the top
            } else {
                columnPositions[columnIndex] = y + 10;
            }
        })
        

    }, 1000 / 30)


})



