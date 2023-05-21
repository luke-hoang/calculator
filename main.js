let operator = null;
let operand1 = null;
let operand2 = null;
let entry = "";
let precision = 10;

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
    if (allInputsSet()) {
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
    if (entry.length < precision) {
      if (allInputsSet()) {
        clearInputs();
      }
      entry += element.textContent;
      if (/^0\d/.test(entry)) {
        entry = entry.slice(1);
      }
      output.innerHTML = entry;
    };
  });
});

equals.addEventListener("click", function() {
  readEntry();
  if (allInputsSet()) {
    input.innerHTML = getInputs();
    result = operation(operator, operand1, operand2);
    if (result === Infinity) {
      output.innerHTML = 'Undefined';
    } else {
      output.innerHTML = Number(result.toPrecision(precision));
    }
  }
});

decimalPoint.addEventListener("click", function() {
  if (allInputsSet()) {
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

clear.addEventListener("click", clearInputs);

function getInputs() {
  let input = "";
  if (!Number.isNaN(Number.parseFloat(operand1))) {
    input += Number(operand1.toPrecision(precision));
  }
  if (operator !== null) {
    input += " " + document.getElementById(operator).textContent;
  }
  if (!Number.isNaN(Number.parseFloat(operand2))) {
    input += " " + Number(operand2.toPrecision(precision)) + " = ";
  }
  return input;
}

function readEntry() {
  num = Number.parseFloat(entry);
  if (operand1 === null) {
    operand1 = num || 0;
  } else if (!Number.isNaN(num)) {
    operand2 = num;
  }
  entry = "";
}

function clearInputs() {
  operator = null;
  operand1 = null;
  operand2 = null;
  entry = "";
  input.innerHTML = "";
  output.innerHTML = "";
}

function allInputsSet() {
  return ["add", "subtract", "multiply", "divide"].includes(operator)
    && !Number.isNaN(Number.parseFloat(operand1))
    && !Number.isNaN(Number.parseFloat(operand2));
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
      result = "Operation Error";
      break;
  }
  if (result === Infinity) {
    operator = null;
    operand1 = null;
    operand2 = null;
    entry = "";
  }
  return result;
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