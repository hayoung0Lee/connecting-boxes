let target;
let isDrawing;
let pos1 = 0,
  pos2 = 0,
  pos3 = 0,
  pos4 = 0;

let $container;
let $path;
let $circle;
let isConnecting;
let cStart, cTop;

// TODO
// mouse event 위치 관련 정비
// 상자를 이동했을때도 라인이 같이 따라오도록 개선
// svg 객체 관련 개선, setAttribute 이렇게 해도 되는건지 확인
window.addEventListener("load", init);

const boxOrBtn = (e) => {
  if (e.target.classList.contains("box")) {
    return "box";
  }
  if (e.target.classList.contains("btn")) {
    return "btn";
  }
};

function startConnecting(e) {
  // cursor
  document.body.style.cursor = "move";
  // 새로운 연결 시작
  // 누른 상태에서 이동할때
  $container.addEventListener("mousemove", drawConnectingLine);
  $path.classList.remove("drawn");
  $path.classList.add("flowline");
  $path.classList.remove("invisible");
  $circle.classList.remove("invisible");

  target = e.target;
  isConnecting = target.dataset.boxNum; // 시작하는 박스
  let leftOrRight = target.dataset.type;

  if (leftOrRight === "left") {
    cStart = document.getElementById(`btn${isConnecting}-box`).offsetLeft;
  } else {
    cStart = document.getElementById(`btn${isConnecting}-box`).offsetLeft + 200;
  }
  cTop = document.getElementById(`btn${isConnecting}-box`).offsetTop + 20;

  $path.setAttribute("d", `M${cStart} ${cTop} L${cStart} ${cTop}`);
  $circle.setAttribute("cx", cStart);
  $circle.setAttribute("cy", cTop);
}

function drawConnectingLine(e) {
  if (isConnecting !== 0) {
    $path.setAttribute(
      "d",
      `M${cStart} ${cTop} L${e.clientX - 10} ${e.clientY - 10}`
    );
    $circle.setAttribute("cx", e.clientX - 10);
    $circle.setAttribute("cy", e.clientY - 10);
  }
}

function endConnecting(e) {
  // cursor
  document.body.style.cursor = "default";
  $container.removeEventListener("mousemove", drawConnectingLine);
  $circle.classList.add("invisible");
  $path.classList.remove("flowline");
  $path.classList.add("drawn");

  // 다른 객체를 클릭해야한다.
  if (e.target.classList.value !== target.classList.value) {
    const endTarget = e.target;
    let leftOrRight = endTarget.dataset.type;
    let cEnd;
    if (leftOrRight === "left") {
      cEnd = document.getElementById(`btn${3 - isConnecting}-box`).offsetLeft;
    } else {
      cEnd =
        document.getElementById(`btn${3 - isConnecting}-box`).offsetLeft + 200;
    }

    const topEnd =
      document.getElementById(`btn${3 - isConnecting}-box`).offsetTop + 20;

    $path.setAttribute("d", `M${cStart} ${cTop} L${cEnd} ${topEnd}`);
    cStart = 0;
    cTop = 0;
  } else {
    $path.classList.add("invisible");
  }

  isConnecting = 0;
}

function init() {
  $container = document.querySelector(".container");
  $path = document.querySelector(".flowline");
  $circle = document.querySelector(".circle");
  const $boxes = document.querySelectorAll(".box");

  for (const $box of $boxes) {
    // 누르기 시작할때
    $box.addEventListener("mousedown", boxEventStart);
    // 이동할 때
    $box.addEventListener("mousemove", boxMoving);
    // 마우스를 뗐을때
    $box.addEventListener("mouseup", boxFinishMoving);
  }
}

// btn 관련 처리
function btnDrag(e) {
  if (isConnecting) {
    endConnecting(e);
  } else {
    startConnecting(e);
  }
}

// box 관련 동작
function boxDrag(e) {
  isDrawing = true;
  target = e.target;
  isConnecting = false;
  pos3 = e.clientX;
  pos4 = e.clientY;
}

function boxEventStart(e) {
  switch (boxOrBtn(e)) {
    case "box":
      // 박스를 이동하는 이벤트
      boxDrag(e);
      break;
    case "btn":
      // 버튼을 누르는 동작 처리
      btnDrag(e);
      break;
  }
}

function boxMoving(e) {
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
}

function boxFinishMoving(e) {
  // box일때만 동작한다
  if (boxOrBtn(e) === "box" && isDrawing === true) {
    isDrawing = false;
    (pos1 = 0), (pos2 = 0), (pos3 = 0), (pos4 = 0);
  }
}
