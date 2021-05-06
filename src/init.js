let target;
let isDrawing;
let pos1 = 0,
  pos2 = 0,
  pos3 = 0,
  pos4 = 0;
window.addEventListener("load", init);

function init() {
  const $box1 = document.querySelector(".box1");

  $box1.addEventListener("mousedown", (e) => {
    // switch로 바꾸기
    if (e.target.classList.contains("box")) {
      target = e.target;
      isDrawing = true;
      pos3 = e.clientX;
      pos4 = e.clientY;
      return;
    }

    if (e.target.classList.contains("btn")) {
      e.stopPropagation();
      console.log("선 연결");
      return;
    }
  });

  $box1.addEventListener("mousemove", (e) => {
    if (isDrawing === true) {
      pos1 = pos3 - e.clientX;
      pos2 = pos4 - e.clientY;
      pos3 = e.clientX;
      pos4 = e.clientY;

      target.style.left = target.offsetLeft - pos1 + "px";
      target.style.top = target.offsetTop - pos2 + "px";
    }
  });

  $box1.addEventListener("mouseup", (e) => {
    if (isDrawing === true) {
      isDrawing = false;
      (pos1 = 0), (pos2 = 0), (pos3 = 0), (pos4 = 0);
    }
  });
}

function dragStart(event) {
  console.log("start", event, this);
}
