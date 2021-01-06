import anime from "animejs";

function App() {
  window.addEventListener("load", () => {
    anime({
      targets: "#loading-screen",
      opacity: "0"
    });
    anime({
      targets: "#toodle-root",
      opacity: "1"
    });
  })

  return (
    <button className="button">asdasd</button>
  );
}

export default App;
