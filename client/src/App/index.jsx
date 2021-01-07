import React, { Fragment } from "react";
import anime from "animejs";
import "normalize.css";

import Routes from "./Routes";

function hideLoadingScreen() {
  anime({
    targets: "#loading-screen",
    opacity: "0",
    duration: 1000
  });
}

export default function App() {
  window.addEventListener("load", () => hideLoadingScreen());

  return (
    <Fragment>
        <Routes />
    </Fragment>
  );
}
