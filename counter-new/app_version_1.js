const counterElement = document.querySelector("#counter");
const incrementBtn = document.querySelector("#increment");
const decrementBtn = document.querySelector("#decrement");
const resetBtn = document.querySelector("#reset");

resetBtn.addEventListener("click", resetCounter);
incrementBtn.addEventListener("click", incrementCounter);
decrementBtn.addEventListener("click", decrementCounter);

function resetCounter() {
  counterElement.textContent = "0";
}

function incrementCounter() {
  counterElement.textContent = Number(counterElement.textContent) + 1;
}

function decrementCounter() {
  counterElement.textContent = Number(counterElement.textContent) - 1;
}

/*
  VERSION 1: ORIGINAL APPROACH

  - Three separate event listeners (one per button)
  - Each function reads the counter value directly from the DOM
  - Counter state lives only in the DOM, nowhere else
  - Performance: DOM is queried multiple times per click

  Trade-offs:
  + Simple and straightforward to understand
  - Inefficient for larger apps (DOM reads are expensive)
  - Hard to reuse counter value elsewhere in code
  - Code repetition (similar logic in 3 functions)
*/
