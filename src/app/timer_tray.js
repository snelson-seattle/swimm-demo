const { app, Menu, Tray } = require("electron");

class TimerTray extends Tray {
  constructor(iconPath, mainWindow) {
    super(iconPath);

    this.mainWindow = mainWindow;

    this.setToolTip("Tasky Timer");
    this.on("click", this.onClick);
    this.on("right-click", this.onRightClick);
  }

  onClick = (event, bounds) => {
    // Click event bounds
    const { x, y } = bounds;

    // Window size
    const { height, width } = this.mainWindow.getBounds();

    if (this.mainWindow.isVisible()) {
      this.mainWindow.hide();
    } else {
      const yPosition = process.platform === "darwin" ? y : y - height;
      this.mainWindow.setBounds({
        x: x - width / 2,
        y: yPosition,
        height: height,
        width: width,
      });
      this.mainWindow.show();
    }
  };

  onRightClick = () => {
    const menuConfig = Menu.buildFromTemplate([
      {
        label: "Quit",
        click: () => {
          app.quit();
        },
      },
    ]);
  
    this.popUpContextMenu(menuConfig);
  };
  
}

module.exports = TimerTray;
