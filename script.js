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

let firstValue;
let secondValue;
let operator;

let display = document.querySelector("#display");

let valueStorage = [0];
display.textContent = valueStorage;

let dotTracker = 0;
let numberButtons = document.querySelectorAll(".number");

numberButtons.forEach(button => {
    button.addEventListener("click", function() {
        let currentNumber;

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

functionButtons.forEach(button => {
    button.addEventListener("click", function() {
        if (button.textContent === "±") {
            let toNegative = parseInt(valueStorage.join("")) * (-1);
            console.log(`toNegative is ${toNegative}, and its type is ${typeof(toNegative)}`);
            display.textContent = toNegative;
            let toNegativeArray = toNegative.toString().split("");
            console.log(`toNegativeArray is ${toNegativeArray}, and its type is ${typeof(toNegativeArray)}`)
            valueStorage.splice(0, valueStorage.length, ...toNegativeArray)
            console.log(valueStorage);
        }
    })
})

let operate = function(firstValue, secondValue, operator) {

}

})
