let operator;
let operand1;
let operand2;
let entry = "";

const operators = Array.from(document.getElementsByClassName("operator"));
const digits = Array.from(document.getElementsByClassName("digit"));
const decimalPoint = document.getElementById("decimal-point");
const equals = document.getElementById("equals");
const clear = document.getElementById("clear");
const input = document.getElementById("input");
const output = document.getElementById("output");

operators.forEach(element => {
  element.addEventListener("click", function(event) {
    readEntry();
    if (operator && !isNaN(operand1) && !isNaN(operand2)) {
      operand1 = operation(operator, operand1, operand2);
      operand2 = null;
    }
    operator = event.target.id;
    input.innerHTML = getInputs();
    output.innerHTML = entry;
  });
});

digits.forEach(element => {
  element.addEventListener("click", function() {
    if (operator === null) {
      clearInputs();
    }
    entry += element.textContent;
    output.innerHTML = entry;
  });
});

decimalPoint.addEventListener("click", function() {
  if (operator === null) {
    clearInputs();
  }
  if (entry === "") {
    entry += "0.";
  }
  if (!entry.includes(".")) {
    entry += ".";
  }
  output.innerHTML = entry;
});

equals.addEventListener("click", function() {
  readEntry();
  if (operator && !isNaN(operand1) && !isNaN(operand2)) {
    input.innerHTML = getInputs();
    operand1 = operation(operator, operand1, operand2);
    operand2 = null;
    operator = null;
    output.innerHTML = operand1;
  }
});

clear.addEventListener("click", clearInputs);

function getInputs() {
  let input = "";
  if (!isNaN(operand1)) {
    input += operand1;
  }
  if (operator != undefined) {
    input += " " + document.getElementById(operator).textContent;
  }
  if (!isNaN(operand2)) {
    input += " " + operand2 + " = ";
  }
  return input;
}

function readEntry() {
  num = Number.parseFloat(entry);
  if (isNaN(operand1)) {
    operand1 = num || 0;
  } else {
    operand2 = num;
  }
  entry = "";
}

function clearInputs() {
  operator = undefined;
  operand1 = undefined;
  operand2 = undefined;
  entry = "";
  input.innerHTML = "";
  output.innerHTML = "";
}

function operation(operator, a, b) {
  let result;
  switch(operator) {
    case "add":
      result = add(a, b);
      break;
    case "subtract":
      result = subtract(a, b);
      break;
    case "multiply":
      result = multiply(a, b);
      break;
    case "divide":
      result = divide(a, b);
      break;
    default:
      result = NaN;
      break;
  }
  return Number.parseFloat(result.toFixed(8));
}

function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  return a / b;
}