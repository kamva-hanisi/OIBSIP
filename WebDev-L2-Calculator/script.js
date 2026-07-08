// script.js
const display = document.getElementById("display");
const buttons = document.querySelectorAll("button");

let expression = "";

buttons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const value = btn.dataset.value;
    const action = btn.dataset.action;

    if (value) {
      expression += value;
      display.value = expression;
    } else if (action === "clear") {
      expression = "";
      display.value = "";
    } else if (action === "backspace") {
      expression = expression.slice(0, -1);
      display.value = expression;
    } else if (action === "equals") {
      try {
        if (/\/0(?!\.)/.test(expression)) {
          throw new Error("Division by zero");
        }
        const result = Function(`"use strict"; return (${expression})`)();
        expression = String(result);
        display.value = expression;
      } catch {
        display.value = "Error";
        expression = "";
      }
    }
  });
});
