const counterElement = document.getElementById("counter");
const buttonsContainer = document.querySelector(".btn-container");

buttonsContainer.addEventListener("click", (e) => {
  updateCounter(e);
});

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

let counter = +counterElement.textContent;

let displayCounter = () => (counterElement.textContent = counter);

/*
  VERSION 3: FULLY OPTIMIZED (EVENT DELEGATION + EFFICIENT SELECTORS)

  - Counter state in a variable (like v2)
  - Single function with switch statement (like v2)
  - ONE event listener on parent container (.btn-container) instead of 3
  - Uses getElementById() for ID selection (faster than querySelector)
  - Uses querySelector() for class selection (appropriate for non-ID)
  - Event bubbling handles clicks from any child button

  Trade-offs:
  + Best performance: 1 listener instead of 3, efficient selectors
  + Scalable: add new buttons, they automatically work (no new listeners needed)
  + Clean, minimal code
  + Counter available anywhere in code

  Real-world impact:
  - Version 1: Works for small projects, but inefficient patterns
  - Version 2: Solid foundation (state management), scales better
  - Version 3: Production-ready, efficient, maintainable
*/
