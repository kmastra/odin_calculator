const screen = document.querySelector("#screen");
const numberButtons = document.querySelectorAll(".number");
const operatorButtons = document.querySelectorAll(".operator");
const run = document.querySelector("#run");
const clear = document.querySelector("#clear");

let x = { value: "" };
let y = { value: "" };
let operation = null;
let cursor = x;


numberButtons.forEach((button) => {
    button.addEventListener("click", () => {
        cursor.value = cursor.value + button.id;
        refreshScreen();
    });
});


operatorButtons.forEach((button) => {
    button.addEventListener("click", () => {
        if (x.value !== ""){
            operation = button.textContent;
            cursor = y;  
            refreshScreen();
        }
    });
});


clear.addEventListener("click", () => {
    clearAll();
});


run.addEventListener("click", () => {
    if (x.value !== "" && y.value !== "") {
        result = operate(parseInt(x.value), parseInt(y.value), operation);
        screen.textContent = result;
        clearAll(true);
        x.value = result;
    };
});


function operate(x, z, operation) {
    switch (operation) {
        case "+":
            return add(x, z);
        case "-":
            return subtract(x, z);
        case "*":
            return multiply(x, z);
        case "/":
            return divide(x, z);
    };
};


function clearAll(noRefresh) {
    x.value = "";
    y.value = "";
    operation = null;
    cursor = x;
    noRefresh || refreshScreen();
};


function refreshScreen() {
    if (cursor === x && operation === null) {
        screen.textContent = x.value;
    };
    if (cursor === x && operation !== null) {
        screen.textContent = `${x.value} ${operation} `;
    };
    if (cursor === y) {
        screen.textContent = `${x.value} ${operation} ${y.value}`;
    };
};


const add = function(x, z) {
	return x + z;
};


const subtract = function(x, z) {
	return x - z;
};


const multiply = function(x, z) {
	return x * z;
};


const divide = function(x, z) {
	return x / z;
};