'use strict'

const Store = require('electron-store')

class DataStore extends Store {
  constructor (settings) {
    super(settings)

    // initialize with todos or empty array
    this.patients = this.get('patients') || []
  }

  savePatient () {
    // save todos to JSON file
    this.set('patients', this.patients)

    // returning 'this' allows method chaining
    return this
  }

  getPatient () {
    // set object's todos to todos in JSON file
    this.patients = this.get('patients') || []

    return this
  }

  addPatient (patient) {
    // merge the existing todos with the new todo
    this.patients = [ ...this.patients, patient ]

    return this.savePatient()
  }

  deletePatient (patient) {
    // filter out the target todo
    this.patients = this.patients.filter(t => t !== patient)

    return this.saveTodos()
  }
}

module.exports = DataStore
