const crypto = require('crypto');

// do random work
// usually takes a few seconds on newer MBP
// return how long it took to complete
// function work(limit = 500000) {
function work(limit = 5000000) {
    console.log('working...')
    let start = Date.now();
    for (let i = 0; i <= limit; i++) {
        crypto.randomBytes(2048);
        // Note that console.log slows everything down terribly
        // console.log('working...', i);
    }

    console.log('WORK DONE!')
    return Date.now() - start;
}

var registerPromiseWorker = require('promise-worker/register');

registerPromiseWorker(function (message) {
    console.log('childWorker.js received message', message);
    work();
    return 'pong';
});