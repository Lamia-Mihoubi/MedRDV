// that's the script for the data storage in a local file
'use strict'

const Store = require('electron-store')

class DataStore extends Store {
  constructor (settings) {
    super(settings)

    // initialize with todos or empty array
    this.rdvs = this.get() || []
  }
  saveRDV (key) {
    // save todos to JSON file
    this.set(key.toString(), this.rdvs)

    // returning 'this' allows method chaining
    return this
  }

  getRDV () {
    // set object's todos to todos in JSON file
    this.rdvs = this.get() || []

    return this
  }

  addRDV (key,rdv) {
    // merge the existing todos with the new todo
    this.rdvs = rdv

    return this.savePatient(key)
  }

  deleteRDV (rdv,store) {
    // filter out the target todo
    //this.patients = this.patients.delete(patient)
    store.delete(rdv)
    return this
  }
}

module.exports = DataStore
