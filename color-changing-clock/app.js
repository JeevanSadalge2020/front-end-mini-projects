const root = ReactDOM.createRoot(document.getElementById("root"));

let class_name = "light";
const style = {
  textAlign: "center",
  borderRadius: "1rem",
  padding: "2rem 1rem",
  display: "flex",
  alignItem: "center",
  justifyContent: "center",
};

setInterval(() => {
  root.render(<Clock />);
  const spans = document.querySelectorAll("section");
  spans.forEach((span) => (span.style.color = generateRGB()));
}, 1000);

function Clock() {
  let date = new Date();

  let hour = date.getHours().toString().padStart(2, 0);
  let min = date.getMinutes().toString().padStart(2, 0);
  let sec = date.getSeconds().toString().padStart(2, 0);

  if (!(hour < 18 && hour >= 6)) class_name = "dark";

  return (
    <div id="clock">
      <div className={class_name} style={style}>
        <section>
          <span className="first">{hour[0]}</span>
          <span className="second">{hour[1]}</span>
        </section>
        <span className="colon"></span>
        <section>
          <span className="first">{min[0]}</span>
          <span className="second">{min[1]}</span>
        </section>
        <span className="colon"></span>
        <section>
          <span className="first">{sec[0]}</span>
          <span className="second">{sec[1]}</span>
        </section>
      </div>
    </div>
  );
}

function generateRGB() {
  let a = generateRandomNumber(255);
  let b = generateRandomNumber(255);
  let c = generateRandomNumber(255);
  return `rgb(${a}, ${b}, ${c})`;
}

function generateRandomNumber(N) {
  return Math.floor(Math.random() * N);
}
