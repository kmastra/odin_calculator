const screen = document.querySelector("#screen");
const numberButtons = document.querySelectorAll(".number");
const operatorButtons = document.querySelectorAll(".operator");
const run = document.querySelector("#run");
const clear = document.querySelector("#clear");
const backspace = document.querySelector("#backspace");

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
        if (x.value !== "" && y.value === "") {
            operation = button.textContent;
            cursor = y;  
            refreshScreen();
        };
        if (x.value !== "" && y.value !== "") {
            call();
        };
    });
});


clear.addEventListener("click", () => {
    clearAll();
});


run.addEventListener("click", () => {
    call();
});


backspace.addEventListener("click", () => {
    if (cursor === x || cursor === y && y.value !== "") {
        cursor.value = cursor.value.slice(0, -1);
        refreshScreen();
    };
    if (cursor === y && operation === null) {
        cursor = x;
        cursor.value = cursor.value.slice(0, -1);
        refreshScreen();
    };
    if (cursor === y && y.value === "" && operation !== null) {
        operation = null;
        cursor = x;
        refreshScreen();
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


function call() {
    if (x.value !== "" && y.value !== "") {
        let result = operate(parseInt(x.value), parseInt(y.value), operation);
        screen.textContent = result;
        clearAll(true);
        x.value = result;
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
    let result = x + z;
	return Number.isInteger(result) ? result : result.toFixed(3);
};


const subtract = function(x, z) {
    let result = x - z;
	return Number.isInteger(result) ? result : result.toFixed(3);
};


const multiply = function(x, z) {
    let result = x * z;
	return Number.isInteger(result) ? result : result.toFixed(3);
};


const divide = function(x, z) {
    if (z === 0) {
        return "yo ERROR";
    }
	let result = x / z;
	return Number.isInteger(result) ? result : result.toFixed(3);
};