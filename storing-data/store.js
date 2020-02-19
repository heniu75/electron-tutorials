const electron = require('electron');
const path = require('path');
const fs = require('fs');

class Store {
  constructor(opts) {
    console.log('main: in store ctor()');
    // renderer has to get `app` module via remote, main gets it directly
    const userDataPath = (electron.app || electron.remote.app).getPath('userData');
    console.log('main: user data path', userDataPath);
    this.path = path.join(userDataPath, opts.configName + '.json');
    console.log('main: path', this.path)
    this.data = parseDataFile(this.path, opts.defaults);
    console.log('main: parsed data', this.data)
  }

  get(key) {
    return this.data[key];
  }

  set(key, val) {
    this.data[key] = val;
    fs.writeFileSync(this.path, JSON.stringify(this.data));
  }
}

function parseDataFile(filePath, defaults) {
  try {
    return JSON.parse(fs.readFileSync(filePath));
  } catch(error) {
    return defaults;
  }
}

module.exports = Store;
