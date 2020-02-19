console.log('now in renderer.js');

const {ipcRenderer } = require("electron");

console.log('renderer: sending ping to main');
const response = ipcRenderer.sendSync('synchronous-message', 'ping');
console.log('renderer: response from main.synchronous-message', response);

const getBtn = document.querySelector('#getBtn');
const setBtn = document.querySelector('#setBtn');
const secretValEl = document.querySelector('#secretVal');
const output = document.querySelector('#output');

getBtn.addEventListener('click', () => {
  // Params are: service name, account name. Both are arbitrary
  ipcRenderer.send('get-password', { serviceName: 'KeytarTest', accountName: 'AccountName'});
});

setBtn.addEventListener('click', () => {
  const secret = secretValEl.value;
  ipcRenderer.send("set-password", { serviceName: "KeytarTest", accountName: "AccountName", secret: secret });
});

ipcRenderer.on('asynchronous-reply', (event, arg) => {
  console.log(arg) // prints "pong"
})

ipcRenderer.send('asynchronous-message', 'ping')

ipcRenderer.on("get-password-response", (event, args) => {
  console.log("renderer: password returned from main", args.secret);
  output.innerText = args.secret || "Nothing set";
});
