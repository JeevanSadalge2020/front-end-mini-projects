const reset_button = document.querySelector(".reset");
const input = document.querySelector("#number");
const plus_button = document.querySelector(".plus");
const minus_button = document.querySelector(".minus");
const counter = document.querySelector("h1");

reset_button.addEventListener("click", () => displayValue(0));
plus_button.addEventListener("click", incrementCounter);
minus_button.addEventListener("click", decrementCounter);

input.value = "1";

function incrementCounter() {
  let x = +input.value;
  let counter_number = +counter.innerText + x;
  counter.innerText = counter_number;
}

function decrementCounter() {
  let x = +input.value;
  let counter_number = +counter.innerText - x;
  counter.innerText = counter_number;
}

function displayValue(value) {
  counter.innerText = value;
}
