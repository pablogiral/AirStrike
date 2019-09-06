window.onload = function () {
  setTimeout(() => {
    menuMusic.play();
  }, 3000);
  document.getElementById("start-button").onclick = function () {
    document.querySelector(".main").style.display = "none";
    startGame();
  };
};