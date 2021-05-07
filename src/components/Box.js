import { boxOrBtn } from "../utils";

// isDrawing, pos1, pos2, pos3, pos4로 이동하는 동작 제어
class Box {
  constructor({ $container, id, boxConnected, $path }) {
    this.id = id;
    this.isDrawing = false;
    (this.pos1 = 0), (this.pos2 = 0), (this.pos3 = 0), (this.pos4 = 0);
    this.boxConnected = boxConnected;
    this.$container = $container;
    this.$target = this.init();
    this.$path = $path;
    return this.$target;
  }

  init() {
    const $target = document.createElement("div");
    $target.classList = `box box${this.id}`;
    $target.id = `btn${this.id}-box`;
    $target["dataset"]["boxNum"] = `${this.id}`;

    $target.addEventListener("mousedown", this.boxEventStart.bind(this));
    $target.addEventListener("mousemove", this.boxMoving.bind(this));
    $target.addEventListener("mouseup", this.boxFinishMoving.bind(this));

    this.$container.appendChild($target);
    return $target;
  }

  // box 관련 동작ㄴ
  boxEventStart(e) {
    if (boxOrBtn(e) === "box") {
      this.isDrawing = true;
      this.pos3 = e.clientX;
      this.pos4 = e.clientY;
      //   this.isConnecting = 0;
    }
  }

  boxMoving(e) {
    // box일때만 동작한다
    if (boxOrBtn(e) === "box" && this.isDrawing === true) {
      this.pos1 = this.pos3 - e.clientX;
      this.pos2 = this.pos4 - e.clientY;
      this.pos3 = e.clientX;
      this.pos4 = e.clientY;
      this.$target.style.left = this.$target.offsetLeft - this.pos1 + "px";
      this.$target.style.top = this.$target.offsetTop - this.pos2 + "px";

      const boxNum = this.$target.dataset.boxNum;
      if (this.boxConnected[`box${boxNum}`]) {
        this.boxConnected[`box${boxNum}`] = {
          x: this.boxConnected[`box${boxNum}`].x - this.pos1,
          y: this.boxConnected[`box${boxNum}`].y - this.pos2,
        };

        this.$path.setAttribute(
          "d",
          `M${this.boxConnected[`box${boxNum}`].x} ${
            this.boxConnected[`box${boxNum}`].y
          } L${this.boxConnected[`box${3 - boxNum}`].x} ${
            this.boxConnected[`box${3 - boxNum}`].y
          }`
        );
      }
    }
  }

  boxFinishMoving(e) {
    // box일때만 동작한다
    if (boxOrBtn(e) === "box" && this.isDrawing === true) {
      this.isDrawing = false;
      (this.pos1 = 0), (this.pos2 = 0), (this.pos3 = 0), (this.pos4 = 0);
    }
  }
}

export default Box;
