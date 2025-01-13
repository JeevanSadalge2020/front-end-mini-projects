const resultPara = document.querySelector(".result");
const list = document.querySelector("ul");
let rollCount = 0;

let dice_map = new Map();

dice_map.set(1, "fa-dice-one");
dice_map.set(2, "fa-dice-two");
dice_map.set(3, "fa-dice-three");
dice_map.set(4, "fa-dice-four");
dice_map.set(5, "fa-dice-five");
dice_map.set(6, "fa-dice-six");

function generateRandomNumber(maxInt) {
  return Math.floor(Math.random() * maxInt) + 1;
}

function reset() {
  list.textContent = "";
}

document.onload = reset();

function displayRollDiceResult() {
  const li = document.createElement("li");
  const dice_roll_result = generateRandomNumber(6);
  const roll_number_header = document.createElement("p");
  const dice_rolled_para = document.createElement("p");

  rollCount = rollCount + 1;

  dice_rolled_para.textContent = dice_roll_result;
  roll_number_header.textContent = `Roll ${rollCount}`;

  li.append(roll_number_header, dice_roll_result);
  list.appendChild(li);
  resultPara.innerHTML = `<i class="fa-solid"></i>`;
  resultPara.querySelector("i").classList.add(dice_map.get(dice_roll_result));
}

const button = document.querySelector("button");

button.addEventListener("click", displayRollDiceResult);
