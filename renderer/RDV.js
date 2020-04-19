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

module.exports = RDV;
