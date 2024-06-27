"use strict";

// VARIABLES DECLARATIONS
const billInput = document.querySelector(".bill-input");
const tipInput = document.querySelector(".tip-input");
const peopleInput = document.querySelector(".people-input");
const tipBtns = document.querySelectorAll(".tip-calculator__tip-button");
const resetBtn = document.querySelector(".btn-reset");

const tipAmount = document.querySelector(".tip-amount");
const totalAmount = document.querySelector(".total-amount");

const peopleErrorMessage = document.querySelector(".people-error");

let bill = 0,
  tip = 0,
  people = 0;

// FUNCTION DECLARATIONS
const assignedVariables = function () {
  return bill >= 0 && tip >= 0 && people > 0;
};

const calcTipPerPerson = function () {
  return Math.trunc((bill / people) * (tip / 100) * 100) / 100;
};

const calcTotalPerPerson = function () {
  return Math.trunc((calcTipPerPerson() + bill / people) * 100) / 100;
};

const showResult = function () {
  tipAmount.textContent = calcTipPerPerson().toFixed(2);
  totalAmount.textContent = calcTotalPerPerson().toFixed(2);
};

const displayError = function () {
  peopleErrorMessage.classList.remove("u-hidden");
  peopleInput.classList.add("beauty-input--error");
};

const removeError = function () {
  peopleErrorMessage.classList.add("u-hidden");
  peopleInput.classList.remove("beauty-input--error");
};

const validNumber = function (input) {
  const floatRgx = /^(?<!-)[0-9]+\.?[0-9]+$/;
  const intRgx = /^(?<!-)[0-9]+$/;
  return intRgx.test(input) || floatRgx.test(input);
};

const canReset = function () {
  // check if inputs are not empty
  const noEmptyInputs =
    billInput.value !== "" || tipInput.value !== "" || peopleInput.value !== "";
  // check if there's the error message
  const errorMessage =
    !peopleErrorMessage.classList.contains("u-hidden") &&
    peopleInput.classList.contains("beauty-input--error");
  // check if outputs are not at their initial values
  const modifiedOutputs =
    tipAmount.textContent !== "0.00" || totalAmount.textContent !== "0.00";
  const tipBtnSelected =
    document.querySelector(".tip-calculator__tip-button--selected") !== null;

  return noEmptyInputs || errorMessage || modifiedOutputs || tipBtnSelected;
};

const reset = function () {
  billInput.value = "";
  tipInput.value = "";
  peopleInput.value = "";
  tipAmount.textContent = "0.00";
  totalAmount.textContent = "0.00";
  bill = 0;
  tip = 0;
  people = 0;

  if (
    !peopleErrorMessage.classList.contains("u-hidden") &&
    peopleInput.classList.contains("beauty-input--error")
  ) {
    peopleErrorMessage.classList.add("u-hidden");
    peopleInput.classList.remove("beauty-input--error");
  }

  if (document.querySelector(".tip-calculator__tip-button--selected") != null) {
    document
      .querySelector(".tip-calculator__tip-button--selected")
      .classList.remove("tip-calculator__tip-button--selected");
  }
  resetBtn.classList.add("btn-reset--disabled");
};

// EVENT HANDLERS

// Bill input's event handler
billInput.addEventListener("input", function () {
  if (this.value === "") {
    bill = 0;
    if (assignedVariables()) {
      showResult();
    }
  } else if (validNumber(this.value)) {
    bill = parseFloat(this.value);

    if (assignedVariables()) {
      showResult();
    }
  }

  if (canReset()) {
    resetBtn.classList.remove("btn-reset--disabled");
  } else {
    resetBtn.classList.add("btn-reset--disabled");
  }
});

// Tip input's event handler
tipInput.addEventListener("input", function () {
  if (this.value === "") {
    tip = 0;
    if (assignedVariables()) {
      showResult();
    }
  } else if (validNumber(this.value)) {
    tip = parseFloat(this.value);

    if (
      document.querySelector(".tip-calculator__tip-button--selected") != null
    ) {
      document
        .querySelector(".tip-calculator__tip-button--selected")
        .classList.remove("tip-calculator__tip-button--selected");
    }

    if (assignedVariables()) {
      showResult();
    }
  }

  if (canReset()) {
    resetBtn.classList.remove("btn-reset--disabled");
  } else {
    resetBtn.classList.add("btn-reset--disabled");
  }
});

// Tip butttons' event handler
tipBtns.forEach(function (btn) {
  btn.addEventListener("click", function () {
    tipInput.value = "";
    tip = parseInt(this.getAttribute("data-tip"));

    if (
      document.querySelector(".tip-calculator__tip-button--selected") !== null
    ) {
      document
        .querySelector(".tip-calculator__tip-button--selected")
        .classList.remove("tip-calculator__tip-button--selected");
    }
    this.classList.add("tip-calculator__tip-button--selected");

    if (assignedVariables()) showResult();

    if (canReset()) {
      resetBtn.classList.remove("btn-reset--disabled");
    } else {
      resetBtn.classList.add("btn-reset--disabled");
    }
  });
});

// People input's event handler
peopleInput.addEventListener("input", function () {
  if (validNumber(this.value)) {
    if (parseInt(this.value) === 0) {
      if (peopleErrorMessage.classList.contains("u-hidden")) {
        displayError();
      }
    } else {
      people = parseInt(this.value);
      if (!peopleErrorMessage.classList.contains("u-hidden")) {
        removeError();
      }
    }

    if (assignedVariables()) {
      showResult();
    }
  }

  if (canReset()) {
    resetBtn.classList.remove("btn-reset--disabled");
  } else {
    resetBtn.classList.add("btn-reset--disabled");
  }
});

resetBtn.addEventListener("click", reset);
