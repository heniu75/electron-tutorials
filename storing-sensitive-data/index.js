const { app, BrowserWindow, ipcMain } = require('electron');
const EventHandlers = require('./eventHandlers.js');
const path = require('path');
// const keytar = require("keytar");

let mainWindow;
let eventHandlers;

app.on('ready', () => {
  mainWindow = new BrowserWindow({
    webPreferences: { nodeIntegration: true }
  });

  // initialize the eventHandlers
  eventHandlers = new EventHandlers({
    ipcMain: ipcMain,
    mainWindow: mainWindow
  });

  mainWindow.loadURL(path.join('file://', __dirname, 'index.html'));
});





// // how to handle error (i.e. the then is not called?)
// ipcMain.on("get-password", (event, args) => {
//   keytar.getPassword(args.serviceName, args.accountName)
//     .then(password => {
//       console.log('found password', password);
//       mainWindow.send('get-password-response', { secret: password });
//     });
// });

// ipcMain.on("set-password", (event, args) => {
//   keytar.setPassword(args.serviceName, args.accountName, args.secret)
//     .then(() => console.log('password has been set'));
// });

// ipcMain.on("synchronous-message", (event, arg) => {
//   console.log("synchronous-message received", arg); // prints "ping"
//   event.returnValue = "pong";
// });