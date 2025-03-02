let btn = document.querySelector("#toggleButton");

btn.addEventListener("click", () => {
  toggleBulb();
  toggleBulbStatus();
  toggleButton();
});

function toggleBulb() {
  document.querySelector("#bulb").classList.toggle("off");
}

function toggleBulbStatus() {
  let cur_status =
    document
      .querySelector("#status")
      .textContent.split(":")[1]
      .trim()
      .toLowerCase() === "on";
  if (cur_status) {
    console.log("==ON");
    document.querySelector("#status").textContent = "Status: OFF";
  } else {
    console.log("==OFF");
    document.querySelector("#status").textContent = "Status: ON";
  }
}

function toggleButton() {
  let cur_btn_status = document
    .querySelector("#toggleButton")
    .textContent.trim();
  if (cur_btn_status === "Turn On") {
    document.querySelector("#toggleButton").textContent = "Turn Off";
  } else {
    document.querySelector("#toggleButton").textContent = "Turn On";
  }
}
