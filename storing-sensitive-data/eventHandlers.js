const keytar = require("keytar");

class EventHandlers {
    constructor( options ) {

        this.ipcMain = options.ipcMain;
        this.mainWindow = options.mainWindow;

        // how to handle error (i.e. the then is not called?)
        this.ipcMain.on("get-password", (event, args) => {
            const window = this.mainWindow;
            keytar.getPassword(args.serviceName, args.accountName)
                .then(password => {
                    console.log('found password', password);
                    window.send('get-password-response', { secret: password });
                });
        });

        this.ipcMain.on("set-password", (event, args) => {
            keytar.setPassword(args.serviceName, args.accountName, args.secret)
                .then(() => console.log('password has been set'));
        });

        this.ipcMain.on("synchronous-message", (event, arg) => {
            console.log("synchronous-message received", arg); // prints "ping"
            event.returnValue = "pong";
        });
    }
}

module.exports = EventHandlers;