/* Now we have all of our constants */
const display1El = document.querySelector(".display-1");
const display2El = document.querySelector(".display-2");
const tempResultEl = document.querySelector(".temp-result");
const numbersEl = document.querySelectorAll(".number");
const operationEl = document.querySelectorAll(".operation");
const equalEl = document.querySelector(".equal");
const clearAllEl = document.querySelector(".all-clear");
const clearLastEl = document.querySelector(".last-entity-clear");

//Variables
let dis1Num = ""; //Initially it will be empty
let dis2Num = ""; //Initially it will be empty
let result = null; //It will be null
let lastOperation = ""; //Last operation,initially empty
let haveDot = false;
//If we have dot (point) in our number, it will take care of that. This will be used because we can not have two points within the same number. for eg. 23.3.3 <-- this is not a valid number

//Adding event listener to every number, Number Display and Dot (point) functionality
numbersEl.forEach((number) => {
  number.addEventListener("click", (e) => {
    if (e.target.innerText === "." && !haveDot) {
      haveDot = true;
    } else if (e.target.innerText === "." && haveDot) {
      return;
    }
    dis2Num += e.target.innerText;
    display2El.innerText = dis2Num; //upon click on any number it will show us in display
  });
});

//For Mathematical Operations
operationEl.forEach((operation) => {
  operation.addEventListener("click", (e) => {
    if (!dis2Num) return;
    //check if we have any number in display to perform operation, if yes then we will go further otherwise we will return.
    haveDot = false; //Setting haveDot to false, we are allowing new dot in our new number.
    const operationName = e.target.innerText;
    if (dis1Num && dis2Num && lastOperation) {
      //If we have these three, then only move further
      mathOperation();
    } else {
      result = parseFloat(dis2Num);
    }
    clearVar(operationName);
    lastOperation = operationName; //Whenevr we do any operation, it will update
    console.log(result);
  });
});

function clearVar(name = "") {
  dis1Num += dis2Num + " " + name + " "; //Updating the display number 1
  display1El.innerText = dis1Num;
  display2El.innerText = ""; //Clearing Display
  dis2Num = ""; //Clearing variable
  tempResultEl.innerText = result; // For showing temporary result
}

//Functionality for Math Operations
function mathOperation() {
  if (lastOperation === "X") {
    result = parseFloat(result) * parseFloat(dis2Num);
  } else if (lastOperation === "+")
    result = parseFloat(result) + parseFloat(dis2Num);
  else if (lastOperation === "-")
    result = parseFloat(result) - parseFloat(dis2Num);
  else if (lastOperation === "/")
    result = parseFloat(result) / parseFloat(dis2Num);
  else if (lastOperation === "%")
    result = parseFloat(result) % parseFloat(dis2Num);
}

//For equal
equalEl.addEventListener("click", (e) => {
  if (!dis2Num || !dis2Num) return;
  haveDot = false;
  mathOperation();
  clearVar();
  display2El.innerText = result;
  tempResultEl.innerText = "";
  dis2Num = result;
  dis1Num = "";
});

//For Clearing All
clearAllEl.addEventListener("click", (e) => {
  display1El.innerText = "";
  display2El.innerText = "";
  dis1Num = "";
  dis2Num = "";
  result = "";
  tempResultEl.innerText = "";
});

// For clearing last entry
clearLastEl.addEventListener("click", (e) => {
  display2El.innerText = "";
  dis2Num = "";
});

//Adding Keyboard Functionality

//To see which key is pressed
window.addEventListener("keydown", (e) => {
  if (
    e.key === "0" ||
    e.key === "1" ||
    e.key === "2" ||
    e.key === "3" ||
    e.key === "4" ||
    e.key === "5" ||
    e.key === "6" ||
    e.key === "7" ||
    e.key === "8" ||
    e.key === "9" ||
    e.key === "."
  ) {
    clickButtonEl(e.key);
  } else if (e.key === "+" || e.key === "-" || e.key === "/" || e.key === "%") {
    clickOperation(e.key);
  } else if (e.key === "*") {
    clickOperation("X");
  } else if (e.key == "Enter" || e.key === "=") {
    clickEqual();
  } else if (e.key == "Backspace") {
    clickClear();
  } else if (e.key == "Delete") {
    clickClearLast();
  }
});

//Functions for pressing diffent combinations
function clickButtonEl(key) {
  numbersEl.forEach((button) => {
    if (button.innerText === key) {
      button.click();
    }
  });
}

function clickOperation(key) {
  operationEl.forEach((button) => {
    if (button.innerText === key) {
      button.click();
    }
  });
}

function clickEqual() {
  equalEl.click();
}
function clickClear() {
  clearAllEl.click();
}
function clickClearLast() {
  clearLastEl.click();
}
