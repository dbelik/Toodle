import React, { Fragment } from "react";
import anime from "animejs";
import "normalize.css";

import "./BaseStyles.css";

import Routes from "./Routes";

function hideLoadingScreen() {
  const animationDuration = 100;

  anime({
    targets: "#loading-screen",
    opacity: "0",
    duration: animationDuration,
    easing: "linear",
    complete: () => document.getElementById("loading-screen").style.display = "none"
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
