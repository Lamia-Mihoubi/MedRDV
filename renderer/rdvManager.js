// the script that creates the patient objects and saves the patients list and manages them
const electron = require("electron");
const path = require("path");
const fs = require("fs");

class Store {
  constructor(opts) {
    // renderer has to get `app` module via remote, main gets it directly
    const userDataPath = (electron.app || electron.remote.app).getPath(
      "userData"
    );
    this.path = path.join(userDataPath, opts.configName + ".json");
    this.defaults = opts.defaults;
  }

  get(key) {
    return this.data[key];
  }

  set(key, val, data) {
    fs.writeFileSync(this.path, JSON.stringify(data));
  }

  loadData() {
    try {
      return JSON.parse(fs.readFileSync(this.path));
    } catch (error) {
      return this.defaults;
    }
  }

  store(data) {
    fs.writeFileSync(this.path, JSON.stringify(data));
  }
}

class RDV {
  constructor(patienName, patientTelNum, dateTime, object) {
    this.patienName = patienName;
    this.patientTelNum = patientTelNum;
    this.dateTime = dateTime;
    this.object = object;
  }

  editRDV(newDateTime) {
    this.dateTime = newDateTime;
  }
}

persistence = new Store({ configName: "rdvList", defaults: [] });

class RDVManager {
  initRdvList() {
    this.rdvList = persistence.loadData();
  }

  createRDV(patienName, patientTelNum, dateTime, object) {
    const rdv = new RDV(patienName, patientTelNum, dateTime, object);
    this.rdvList.push(rdv);
  }

  deleteRDV(dateTime) {
    this.rdvList = this.rdvList.filter((rdv) => {
      return rdv.dateTime != dateTime;
    });
  }

  editRDV(dateTime, newDateTime) {
    rdv = this.rdvList.find((rdv) => rdv.dateTime == dateTime);
    if (rdv != undefined) {
      rdv.dateTime = newDateTime;
    } else {
      alert("Le RDV que vous avez demandé n'existe pas");
    }
  }

  printRDV(dateTime) {}

  storeRdvList() {
    persistence.store(this.rdvList);
  }
}
module.exports = RDVManager;
