'use strict'

const Store = require('electron-store')

class DataStore extends Store {
  constructor (settings) {
    super(settings)

    // initialize with todos or empty array
    this.patients = this.get() || []
  }

  savePatient (key) {
    // save todos to JSON file
    this.set(key.toString(), this.patients)

    // returning 'this' allows method chaining
    return this
  }

  getPatient () {
    // set object's todos to todos in JSON file
    this.patients = this.get() || []

    return this
  }

  addPatient (patient) {
    this.key=patient[2]
    // merge the existing todos with the new todo
    this.patients = patient

    return this.savePatient(this.key)
  }

  deletePatient (patient,store) {
    // filter out the target todo
    //this.patients = this.patients.delete(patient)
    store.delete(patient)
    return this
  }
}

module.exports = DataStore
