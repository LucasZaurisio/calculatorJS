/*
*this doc has a "calculator" class. this represents a basic calculator in js.
*/
class Calculator {
    /**
     * the class construtor receive two elemts from DOM as parameters,
     * it will be used to show the previous operand an de current from calculator.
     * it call the function "clear to start the variable values.
     */
    constructor(previousTermTextElement, currentTermTextElement) {
      this.previousTermTextElement = previousTermTextElement;
      this.currentTermTextElement = currentTermTextElement;
      this.clear();
    }
  
    /**
     * this function is called by constructor also by calculator AC button.
     * it reroll the current operand, previous operand and the operation.
     */
    clear() {
      this.currentTerm = "";
      this.previousTerm = "";
      this.operation = undefined;
    }
  
    /**
     * this function is called by button "DEL".
     * ir remove the last digit from disply form current operand.
     */
    delete() {
      this.currentTerm = this.currentTerm.toString().slice(0, -1);
    }
  
    /**
     * this function is called when any number button is clicked.
     * it add the number clicked at current operand.
     * if the current number was a comma and the operand already had one, this functions does nothing.
     */
    appendNumber(number) {
      if (number === "," && this.currentTerm.includes(",")) return;
      this.currentTerm = this.currentTerm.toString() + number.toString();
    }
  
    /**
     * this function is called when any operation button is clicked.
     * if it doesn't exist a current operand, this function does nothing.
     * if exist a previous operand, this function calls the "compute()" function" 
     * and then determine the selected operation as a new operation an move the current operand to previous operand,
     * cleaning the current operand.
     */
    chooseOperation(operation) {
      if (this.currentTerm === "") return;
      if (this.previousTerm !== "") {
        this.compute();
      }
      this.operation = operation;
      this.previousTerm = this.currentTerm;
      this.currentTerm = "";
    }
  
    /**
     * this function is called when equal button is clicked.
     * it compute the outcome from current operation and update the current operand with it.
     * the operation is setted as undefined a the previous operand is cleaned.
     */
    compute() {
      let computation;
      const prev = parseFloat(this.previousTerm);
      const current = parseFloat(this.currentTerm);
      if (isNaN(prev) || isNaN(current)) return;
      switch (this.operation) {
        case "+":
          computation = prev + current;
          break;
        case "-":
          computation = prev - current;
          break;
        case "*":
          computation = prev * current;
          break;
        case "÷":
          computation = prev / current;
          break;
        default:
          return;
      }
      this.currentTerm = computation;
      this.operation = undefined;
      this.previousTerm = "";
    }
    /**
     * this function receive a number as parameter and return a formatted string.
     * to show on display.
     * it split the digits before and after comma.
     * format the digits before comma as a thousands separator and return a formatted string.
     */
    getDisplayNumber(number) {
      const stringNumber = number.toString();
      const integerDigits = parseFloat(stringNumber.split(".")[0]);
      const decimalDigits = stringNumber.split(",")[1];
      let integerDisplay;
      if (isNaN(integerDigits)) {
        integerDisplay = "";
      } else {
        integerDisplay = integerDigits.toLocaleString("pt-br", {
          style: "decimal",
          minimumFractionDigits: 0,
        });
      }
      if (decimalDigits != null) {
        return `${integerDisplay},${decimalDigits}`;
      } else {
        return integerDisplay;
      }
    }
  
    /**
     * this function update the elements from DOM who show the prevous opeand an the current operand with updated values.
     * if there is not a selected operation, the element from the previous operand is cleaned.
     */
    updateDisplay() {
      this.currentTermTextElement.innerText = this.getDisplayNumber(
        this.currentTerm
      );
      if (this.operation != null) {
        this.previousTermTextElement.innerText = `${this.getDisplayNumber(
          this.previousTerm
        )} ${this.operation}`;
      } else {
        this.previousTermTextElement.innerText = "";
      }
    }
  }
  
  /**
   * creates click events for calculator buttons and associates them with corresponding functions of the "Calculator" class.
   */
const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const equalButton = document.querySelector('[data-equal]')
const acButton = document.querySelector('[data-all-clear]')
const previousTermTextElement = document.querySelector('[data-previous-term]')
const currentTermTextElement = document.querySelector('[data-current-term]')


const calculator = new Calculator(
    previousTermTextElement,
    currentTermTextElement
  );
  
  numberButtons.forEach((button) => {
    button.addEventListener("click", () => {
      calculator.appendNumber(button.innerText);
      calculator.updateDisplay();
    });
  });
  
  operationButtons.forEach((button) => {
    button.addEventListener("click", () => {
      calculator.chooseOperation(button.innerText);
      calculator.updateDisplay();
    });
  });
  
  equalButton.addEventListener("click", (button) => {
    calculator.compute();
    calculator.updateDisplay();
  });
  
  acButton.addEventListener("click", (button) => {
    calculator.clear();
    calculator.updateDisplay();
  });
  
  /*deleteButton.addEventListener("click", (button) => {
    calculator.delete();
    calculator.updateDisplay();
  });*/
