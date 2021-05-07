import { boxOrBtn } from "../utils";

// to remove event;
var drawFunc;
class Btn {
  constructor({
    boxId,
    side,
    $box,
    $container,
    isConnecting,
    updateConnection,
    getConnection,
    boxConnected,
    $path,
    $circle,
  }) {
    this.boxId = boxId;
    this.side = side;
    this.$target = this.init($box);

    // 연결 관련
    this.isConnecting = isConnecting;
    this.updateConnection = updateConnection;
    this.getConnection = getConnection;

    // 연결 정보
    this.boxConnected = boxConnected;

    // dom
    this.$container = $container;
    this.$path = $path;
    this.$circle = $circle;

    this.cStart = 0;
    this.cStartTop = 0;
    this.cEnd = 0;
    this.cEndTop = 0;
  }

  init($box) {
    const $target = document.createElement("div");
    $target.classList = `btn btn${this.boxId}`;
    $target["dataset"]["boxNum"] = `${this.boxId}`;
    $target["dataset"]["type"] = `${this.side}`;

    $target.addEventListener("mousedown", this.btnEventStart.bind(this));

    $box.appendChild($target);
    return $target;
  }

  btnEventStart(e) {
    this.isConnecting = this.getConnection();

    if (boxOrBtn(e) === "btn") {
      if (this.isConnecting !== 0) {
        this.endConnecting(e);
      } else {
        this.startConnecting(e);
      }
    }
  }

  //  btn(사각형 내부 점) 관련 처리
  startConnecting(e) {
    // cursor
    document.body.style.cursor = "move";
    // 새로운 연결 시작
    // 누른 상태에서 이동할때
    drawFunc = this.drawConnectingLine.bind(this);
    this.$container.addEventListener("mousemove", drawFunc);
    this.$path.classList.remove("drawn");
    this.$path.classList.add("flowline");
    this.$path.classList.remove("invisible");
    this.$circle.classList.remove("invisible");

    this.updateConnection(this.$target.dataset.boxNum); // 시작하는 박스
    this.isConnecting = +this.$target.dataset.boxNum;

    let leftOrRight = this.$target.dataset.type;
    if (leftOrRight === "left") {
      this.cStart = +document.getElementById(`btn${this.isConnecting}-box`)
        .offsetLeft;
    } else {
      this.cStart =
        +document.getElementById(`btn${this.isConnecting}-box`).offsetLeft +
        200;
    }

    this.cStartTop =
      document.getElementById(`btn${this.isConnecting}-box`).offsetTop + 20;

    this.boxConnected[`box${this.isConnecting}`] = {
      x: this.cStart,
      y: this.cStartTop,
    };

    this.$path.setAttribute(
      "d",
      `M${this.cStart} ${this.cStartTop} L${this.cStart} ${this.cStartTop}`
    );
    this.$circle.setAttribute("cx", this.cStart);
    this.$circle.setAttribute("cy", this.cStartTop);
  }

  drawConnectingLine(e) {
    if (this.isConnecting !== 0) {
      this.$path.setAttribute(
        "d",
        `M${this.cStart} ${this.cStartTop} L${e.clientX - 10} ${e.clientY - 10}`
      );
      this.$circle.setAttribute("cx", e.clientX - 10);
      this.$circle.setAttribute("cy", e.clientY - 10);
    }
  }

  endConnecting(e) {
    // cursor
    document.body.style.cursor = "default";
    this.$container.removeEventListener("mousemove", drawFunc);
    this.$circle.classList.add("invisible");
    this.$path.classList.remove("flowline");
    this.$path.classList.add("drawn");

    // 다른 객체를 클릭해야한다
    if (this.isConnecting !== this.$target["dataset"]["boxNum"]) {
      const endTarget = this.$target;
      let leftOrRight = endTarget.dataset.type;

      if (leftOrRight === "left") {
        this.cEnd = +document.getElementById(`btn${3 - this.isConnecting}-box`)
          .offsetLeft;
      } else {
        this.cEnd =
          +document.getElementById(`btn${3 - this.isConnecting}-box`)
            .offsetLeft + 200;
      }

      this.cEndTop =
        document.getElementById(`btn${3 - this.isConnecting}-box`).offsetTop +
        20;

      this.boxConnected[`box${3 - this.isConnecting}`] = {
        x: this.cEnd,
        y: this.cEndTop,
      };

      this.$path.setAttribute(
        "d",
        `M${this.boxConnected[`box${this.boxId}`].x} ${
          this.boxConnected[`box${this.boxId}`].y
        } L${this.boxConnected[`box${3 - this.boxId}`].x} ${
          this.boxConnected[`box${3 - this.boxId}`].y
        }`
      );
    } else {
      this.$path.classList.add("invisible");
      this.boxConnected = {};
    }

    this.updateConnection(0);
    this.isConnecting = 0;
    this.cStart = 0;
    this.cStartTop = 0;
    this.cEnd = 0;
    this.cEndTop = 0;
  }
}

export default Btn;
