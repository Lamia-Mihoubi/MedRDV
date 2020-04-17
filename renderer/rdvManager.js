// the script that creates the patient objects and saves the patients list and manages them
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

class RDVManager {
  constructor(path, filename) {
    // if file exists
    this.loadRdvList(path, filename);
    // else
    this.rdvList = [];
  }

  createRDV(patienName, patientTelNum, dateTime, object) {
    rdv = new RDV(patienName, patientTelNum, dateTime, object);
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
    }
  }

  printRDV(dateTime) {}

  loadRdvList(path, filename) {
    // I'd like to use a json file to save the rdv list
  }

  storeRdvList(path, filename) {}
}
module.exports = rdvManager;
