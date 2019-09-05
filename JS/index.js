window.onload = function () {
  ost.play();
  document.getElementById("start-button").onclick = function () {
    document.querySelector(".main").style.display = "none";
    startGame();
  };
};