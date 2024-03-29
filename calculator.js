window.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById("calc-form");
  if (form) {
    setupIntialValues();
    form.addEventListener("submit", function(e) {
      e.preventDefault();
      update();
    });
  }
});

function getCurrentUIValues() {
  return {
    amount: +(document.getElementById("loan-amount").value),
    years: +(document.getElementById("loan-years").value),
    rate: +(document.getElementById("loan-rate").value),
  }
}

// Get the inputs from the DOM.
// Put some default values in the inputs
// Call a function to calculate the current monthly payment
function setupIntialValues() {
  let amountUI = document.getElementById("loan-amount");
  let yearsUI = document.getElementById("loan-years");
  let ratesUI = document.getElementById("loan-rate");
  let values = { amount: 5000, years: 10, rate: 5 }
  // yearsUI.value = values.years;
  // amountUI.value = values.amount;
  // ratesUI.value = values.rate;
  values.years = yearsUI.value;
  values.amount = amountUI.value;
  values.rate = ratesUI.value;
  update();
}

// Get the current values from the UI
// Update the monthly payment
function update() {
  let currentValuesUI = getCurrentUIValues();
  updateMonthly(calculateMonthlyPayment(currentValuesUI));
}

// Given an object of values (a value has amount, years and rate ),
// calculate the monthly payment.  The output should be a string
// that always has 2 decimal places.
function calculateMonthlyPayment(values) {
  let i = (values.rate / 100) / 12;
  let n = Math.floor(values.years * 12);
  return (
    (values.amount * i) /
    (1 - Math.pow((1 + i), -n))
  ).toFixed(2);
}

// Given a string representing the monthly payment value,
// update the UI to show the value.
function updateMonthly(monthly) {
  let monthlyUI = document.getElementById("monthly-payment");
  monthlyUI.innerText = "$" + monthly;
}
