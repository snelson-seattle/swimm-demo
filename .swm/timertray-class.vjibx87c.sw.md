---
title: TimerTray class
---
# Introduction

This document will walk you through the implementation of the TimerTray class in our Electron application. The TimerTray class is a crucial part of our application as it handles the behavior of the application's tray icon.

We will cover:

1. Why we decided to encapsulate the tray icon behavior in a class.

2. How the TimerTray class is structured.

3. How the TimerTray class is used in the main application file.

# Encapsulating Tray Icon Behavior

<SwmSnippet path="/src/app/timer_tray.js" line="1">

---

In our Electron application, we have a tray icon that users can interact with. Previously, the behavior of this tray icon was scattered throughout our main application file. This made the code harder to understand and maintain. To solve this, we decided to encapsulate all the tray icon behavior in a new class called TimerTray.

```javascript
const { app, Menu, Tray } = require("electron");

class TimerTray extends Tray {
  constructor(iconPath, mainWindow) {
    super(iconPath);

    this.mainWindow = mainWindow;

    this.setToolTip("Tasky Timer");
    this.on("click", this.onClick);
    this.on("right-click", this.onRightClick);
  }
```

---

</SwmSnippet>

# TimerTray Class Structure

The TimerTray class extends the Tray class from Electron. This means that it inherits all the properties and methods of the Tray class, but we can also add our own custom behavior.

<SwmSnippet path="/src/app/timer_tray.js" line="1">

---

In the constructor of the TimerTray class, we pass in the path to the icon and the main window of the application. We store the main window in a property so we can use it in other methods of the class. We also set up an event listener for both a click or right-click event on the tray icon.

```javascript
const { app, Menu, Tray } = require("electron");

class TimerTray extends Tray {
  constructor(iconPath, mainWindow) {
    super(iconPath);

    this.mainWindow = mainWindow;

    this.setToolTip("Tasky Timer");
    this.on("click", this.onClick);
    this.on("right-click", this.onRightClick);
  }
```

---

</SwmSnippet>

<SwmSnippet path="/src/app/timer_tray.js" line="13">

---

When the tray icon is clicked, we want to show or hide the main window. To do this, we first get the bounds of the click event and the size of the main window.

```javascript

  onClick = (event, bounds) => {
    // Click event bounds
    const { x, y } = bounds;

    // Window size
    const { height, width } = this.mainWindow.getBounds();
```

---

</SwmSnippet>

<SwmSnippet path="/src/app/timer_tray.js" line="21">

---

Then, we check if the main window is currently visible. If it is, we hide it. If it's not, we calculate the position where the main window should be shown and then show it. The user can also quit the application by right clicking on the tray icon and choosing the "Quit" option.

```javascript
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
```

---

</SwmSnippet>

<SwmSnippet path="/src/app/timer_tray.js" line="49">

---

Finally, we export the TimerTray class so we can use it in other files.

```javascript

module.exports = TimerTray;
```

---

</SwmSnippet>

# Using the TimerTray Class in the Main Application File

<SwmSnippet path="/src/main.js" line="1">

---

In our main application file, we import the TimerTray class.

```javascript
const { app } = require("electron");
const MainWindow = require("./app/main_window");
const TimerTray = require("./app/timer_tray");
```

---

</SwmSnippet>

By encapsulating the tray icon behavior in the TimerTray class, we have made our code more organized and easier to understand. This will make it easier for us to add more features to the tray icon in the future.

<SwmMeta version="3.0.0" repo-id="Z2l0aHViJTNBJTNBc3dpbW0tZGVtbyUzQSUzQXNuZWxzb24tc2VhdHRsZQ=="><sup>Powered by [Swimm](https://app.swimm.io/)</sup></SwmMeta>
