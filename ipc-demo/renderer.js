// require('devtron').install();
const { ipcRenderer, remote } = require('electron');

// IPC
document.querySelector('#sendMsgMain').addEventListener('click', () => {
  ipcRenderer.send('sendMainMessage', {
    greeting: 'Hello'
  });
});

ipcRenderer.on('sendRendererMessage', (event, props) => {
  console.log({event, props});
});

// REMOTE
document.querySelector('#openDialog').addEventListener('click', () => {
  // remote.require('./show-dialog').showDialog('Konnichiwa');
  // we could also do it directly here like so:
  remote.dialog.showMessageBox({
    type: 'info',
    title: 'Greetings',
    message: `Konnichiwa!`
  });
});

// CPU INTENSIVE
document.querySelector('#doBlockingWork').addEventListener('click', () => {
  // note that even though we are asking the main process to do the CPU work,
  // it still seems to affect the renderer thread
  ipcRenderer.send('doBlockingWork');
});

document.querySelector('#doNonBlockingWork').addEventListener('click', () => {
  const nonBlockingWork = require('./non-blocking-work');
  nonBlockingWork();
});

// Remote
const { BrowserWindow } = require('electron').remote

document.querySelector('#openNewBrowserWindow').addEventListener('click', () => {
  let win = new BrowserWindow({ width: 800, height: 600 })
  win.loadURL('https://github.com');
});

// Promise Worker
var PromiseWorker = require('promise-worker');
var worker = new Worker('childPong.js');
var promiseWorker = new PromiseWorker(worker);

promiseWorker.postMessage('ping').then(function (response) {
  // handle response
  console.log('renderer received from childPong.js', response);
}).catch(function (error) {
  // handle error
  console.log('renderer received error rom childPong.js', error);
});

document.querySelector('#doBlockingWorkViaWebSocket').addEventListener('click', () => {
  var worker = new Worker('childWorker.js');
  var promiseWorker = new PromiseWorker(worker);

  promiseWorker.postMessage('please do some work').then(function (response) {
    // handle response
    console.log('renderer received messasge from childWorker', response);
  }).catch(function (error) {
    // handle error
    console.log('renderer error', error);
  });
});

