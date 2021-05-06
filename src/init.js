let target;
let isDrawing;
let pos1 = 0,
  pos2 = 0,
  pos3 = 0,
  pos4 = 0;

let isConnecting;
let $container;
let $path;
let left, top;
let $circle;
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
    $path.classList.remove("invisible");
    $circle.classList.remove("invisible");

    const start = document.getElementById("btn1-box").getBoundingClientRect();
    top = start.top;
    left = start.left;

    $path.setAttribute(
      "d",
      `M${left + 190} ${top + 10} L${left + 190} ${top + 10}`
    );

    $circle.setAttribute("cx", e.clientX - 10);
    $circle.setAttribute("cy", e.clientY - 10);
    // cursor
    document.body.style.cursor = "move";
  } else {
    // 연결 동작 마무리, class명으로 동일한 parent div에 포함인지 확인
    isConnecting = false;
    // cursor
    document.body.style.cursor = "default";
    $circle.classList.add("invisible");
    $path.classList.remove("flowline");
    $path.classList.add("drawn");
    if (e.target.classList.value !== target.classList.value) {
      console.log("다른 도형끼리 연결!");

      const end = document.getElementById("btn2-box").getBoundingClientRect();

      $path.setAttribute(
        "d",
        `M${left + 185} ${top + 10} L${end.left - 10} ${end.top + 10}`
      );

      left = 0;
      top = 0;
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

const mousemove_box = (e) => {
  // box일때만 동작한다
  if (boxOrBtn(e) === "box" && isDrawing === true) {
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    target.style.left = target.offsetLeft - pos1 + "px";
    target.style.top = target.offsetTop - pos2 + "px";

    // FIXME: div 옮겼을때도 선이 유지되도록
  }
};

const mousemove_btn = (e) => {
  if (isConnecting === true) {
    console.log("연결 중");
    // FIXME: 이부분 개선하기.. setAttribute 또해도 되는건가?
    $path.setAttribute(
      "d",
      `M${left + 190} ${top + 10} L${e.clientX} ${e.clientY}`
    );
    $circle.setAttribute("cx", e.clientX - 10);
    $circle.setAttribute("cy", e.clientY - 10);
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
  $path = document.querySelector(".flowline");
  $circle = document.querySelector(".circle");
  const $boxes = document.querySelectorAll(".box");

  for (const $box of $boxes) {
    // 누르기 시작할때
    $box.addEventListener("mousedown", mousedown);
    $box.addEventListener("mousemove", mousemove_box);
    // 마우스를 뗐을때
    $box.addEventListener("mouseup", mouseup);
  }

  // 누른 상태에서 이동할때
  $container.addEventListener("mousemove", mousemove_btn);
}
