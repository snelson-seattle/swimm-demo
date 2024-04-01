const { BrowserWindow } = require("electron");

class MainWindow extends BrowserWindow {
  constructor(options) {
    super(options);

    this.on("blur", this.onBlur);
  }

  onBlur = () => {
    this.hide();
  }
}

module.exports = MainWindow;
