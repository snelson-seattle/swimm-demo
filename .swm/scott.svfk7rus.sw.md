---
title: Scott
---
# Introduction

This document will walk you through the implementation of the "Scott" feature. This feature introduces a new main window class and a tray icon for an Electron application. The main window class has a unique behavior that hides the window when it loses focus. The tray icon is used to control the visibility of the main window.

We will cover:

1. Why we created a new main window class.


2. How we implemented the unique behavior of the main window.


3. How we integrated the main window with the tray icon.

# Creating a new main window class

<SwmSnippet path="/src/app/main_window.js" line="1">

---

In the Electron framework, a BrowserWindow instance represents a window in the GUI of the operating system. We can customize the behavior of a window by extending the BrowserWindow class. In this code change, we created a new class called MainWindow that extends BrowserWindow.

```javascript
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
```

---

</SwmSnippet>

# Implementing the unique behavior of the main window

<SwmSnippet path="/src/app/main_window.js" line="1">

---

The MainWindow class has a unique behavior that hides the window when it loses focus. This behavior is implemented by listening to the "blur" event of the window and calling the hide method when the event is triggered.

```javascript
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
```

---

</SwmSnippet>

# Integrating the main window with the tray icon

<SwmSnippet path="/src/main.js" line="1">

---

In the main process of the Electron application, we created an instance of the MainWindow class and passed it to the constructor of the TimerTray class. The TimerTray class represents a tray icon in the system's notification area. The tray icon is used to control the visibility of the main window.

```javascript
const { app } = require("electron");
const MainWindow = require("./app/main_window");
```

---

</SwmSnippet>

<SwmSnippet path="/src/main.js" line="22">

---

&nbsp;

```javascript
  }

  mainWindow = new MainWindow(options);
```

---

</SwmSnippet>

<SwmSnippet path="/src/main.js" line="39">

---

&nbsp;

```javascript
  tray = new TimerTray(iconPath, mainWindow);
};

```

---

</SwmSnippet>

# Handling the application lifecycle

<SwmSnippet path="/src/main.js" line="42">

---

In the main process of the Electron application, we also handled the lifecycle of the application. When the application is ready, we created the main window and the tray icon. When the application is activated and there are no other windows open, we recreated the main window. This is a common behavior in OS X applications.

```javascript
// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  if(process.platform === "darwin"){
    app.dock.hide();
  }
```

---

</SwmSnippet>

<SwmSnippet path="/src/main.js" line="49">

---

&nbsp;

```javascript

  createWindow();

  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  app.on("activate", () => {
    if (MainWindow.getAllWindows().length === 0) {
```

---

</SwmSnippet>

<SwmMeta version="3.0.0" repo-id="Z2l0aHViJTNBJTNBc3dpbW0tZGVtbyUzQSUzQXNuZWxzb24tc2VhdHRsZQ=="><sup>Powered by [Swimm](https://app.swimm.io/)</sup></SwmMeta>
