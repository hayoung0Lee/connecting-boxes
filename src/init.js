let target;
let isDrawing;
let pos1 = 0,
  pos2 = 0,
  pos3 = 0,
  pos4 = 0;

let isConnecting;
let $container;

window.addEventListener("load", init);

const boxOrBtn = (e) => {
  if (e.target.classList.contains("box")) {
    return "box";
  }
  if (e.target.classList.contains("btn")) {
    return "btn";
  }
};

const boxDrag = (e) => {
  target = e.target;
  isDrawing = true;
  pos3 = e.clientX;
  pos4 = e.clientY;
  isConnecting = false;
};

const btnDrag = (e) => {
  if (!isConnecting) {
    // 새로운 연결 시작
    target = e.target;
    isConnecting = true;
  } else {
    // 연결 동작 마무리, class명으로 동일한 parent div에 포함인지 확인
    isConnecting = false;
    if (e.target.classList.value !== target.classList.value) {
      console.log("다른 도형끼리 연결!");
      return;
    }
    // 같은 parent div 소속이면 무시
  }
};

const mousedown = (e) => {
  switch (boxOrBtn(e)) {
    case "box":
      boxDrag(e);
      break;
    case "btn":
      btnDrag(e);
      break;
  }
};

const mousemove = (e) => {
  // box일때만 동작한다
  if (boxOrBtn(e) === "box" && isDrawing === true) {
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;

    target.style.left = target.offsetLeft - pos1 + "px";
    target.style.top = target.offsetTop - pos2 + "px";
  }

  if (isConnecting === true) {
    console.log("연결 중");
  }
};

const mouseup = (e) => {
  // box일때만 동작한다
  if (boxOrBtn(e) === "box" && isDrawing === true) {
    isDrawing = false;
    (pos1 = 0), (pos2 = 0), (pos3 = 0), (pos4 = 0);
  }
};

function init() {
  $container = document.querySelector(".container");
  const $boxes = document.querySelectorAll(".box");

  for (const $box of $boxes) {
    // 누르기 시작할때
    $box.addEventListener("mousedown", mousedown);
    // 누른 상태에서 이동할때
    $box.addEventListener("mousemove", mousemove);
    // 마우스를 뗐을때
    $box.addEventListener("mouseup", mouseup);
  }
}
