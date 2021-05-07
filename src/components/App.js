import Box from "./Box";
import Btn from "./Btn";

class App {
  constructor() {
    this.$container = document.querySelector(".container");
    this.$path = document.querySelector(".flowline");
    this.$circle = document.querySelector(".circle");
    this.isConnecting = 0;
    this.boxConnected = {};

    this.box1 = new Box({
      $container: this.$container,
      id: 1,
      boxConnected: this.boxConnected,
      $path: this.$path,
    });

    this.box1_btn1 = new Btn({
      boxId: 1,
      side: "left",
      $box: this.box1,
      $container: this.$container,
      isConnecting: this.isConnecting,
      updateConnection: this.updateConnection.bind(this),
      getConnection: this.getConnection.bind(this),
      boxConnected: this.boxConnected,
      $path: this.$path,
      $circle: this.$circle,
    });

    this.box1_btn2 = new Btn({
      boxId: 1,
      side: "right",
      $box: this.box1,
      $container: this.$container,
      isConnecting: this.isConnecting,
      updateConnection: this.updateConnection.bind(this),
      getConnection: this.getConnection.bind(this),
      boxConnected: this.boxConnected,
      $path: this.$path,
      $circle: this.$circle,
    });

    this.box2 = new Box({
      $container: this.$container,
      id: 2,
      boxConnected: this.boxConnected,
      $path: this.$path,
    });

    this.box2_btn1 = new Btn({
      boxId: 2,
      side: "left",
      $box: this.box2,
      $container: this.$container,
      isConnecting: this.isConnecting,
      updateConnection: this.updateConnection.bind(this),
      getConnection: this.getConnection.bind(this),
      boxConnected: this.boxConnected,
      $path: this.$path,
      $circle: this.$circle,
    });

    this.box2_btn2 = new Btn({
      boxId: 2,
      side: "right",
      $box: this.box2,
      $container: this.$container,
      isConnecting: this.isConnecting,
      updateConnection: this.updateConnection.bind(this),
      getConnection: this.getConnection.bind(this),
      boxConnected: this.boxConnected,
      $path: this.$path,
      $circle: this.$circle,
    });
  }

  updateConnection(value) {
    this.isConnecting = value;
  }

  getConnection() {
    return this.isConnecting;
  }
}

export default App;
