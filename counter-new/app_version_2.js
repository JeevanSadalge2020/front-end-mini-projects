const counterElement = document.querySelector("#counter");
const incrementBtn = document.querySelector("#increment");
const decrementBtn = document.querySelector("#decrement");
const resetBtn = document.querySelector("#reset");

let buttons = document.querySelectorAll("button");

buttons.forEach((button) =>
  button.addEventListener("click", (e) => {
    updateCounter(e);
  }),
);

let counter = +counterElement.textContent;

let displayCounter = () => (counterElement.textContent = counter);

function updateCounter(e) {
  let current_element_id = e.target.id;
  switch (current_element_id) {
    case "reset":
      counter = 0;
      displayCounter();
      break;
    case "increment":
      counter++;
      displayCounter();
      break;
    case "decrement":
      counter--;
      displayCounter();
      break;
    default:
  }
}

/*
  VERSION 2: STATE MANAGEMENT + SINGLE FUNCTION

  - Counter value stored in a variable (source of truth)
  - One updateCounter() function handles all three buttons via switch statement
  - DOM is only updated for display, not for reading values
  - Uses forEach to attach listeners to all buttons

  Trade-offs:
  + Better performance (no repeated DOM reads)
  + Counter value available anywhere in code
  + Reduced code repetition with single function
  - Still attaching 3 event listeners (one per button)
*/
