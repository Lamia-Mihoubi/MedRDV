// that's the js script for the main window
const { ipcRenderer } = require("electron");
const { BrowserWindow } = require("electron").remote;
const RDVManager = require("./RDVManager");
const path = require("path");
const url = require("url");
RDVManager.initRdvList();
const fs = require("fs");
let view = "today";
document.getElementById("ajouter-rdv-btn").addEventListener("click", () => {
  ipcRenderer.send("ajouter-rdv");
});
// create add todo window button
document.getElementById("createPatientBtn").addEventListener("click", () => {
  ipcRenderer.send("add-patient-window");
});

let search = document.getElementById("search-patient");
search.addEventListener("search", () => {
  console.log(RDVManager.rdvList);
  let e = document.querySelector(".card-columns");
  let ind = 0;
  //e.firstElementChild can be used.
  let child = e.lastElementChild;
  while (child) {
    e.removeChild(child);
    child = e.lastElementChild;
  }
  if (view == "nottoday") {
    while (ind < RDVManager.rdvList.length) {
      if (RDVManager.rdvList[ind].patientTelNum == search.value)
        displayRDV(RDVManager.rdvList[ind]);
      ind++;
    }
  } else {
    while (ind < RDVManager.rdvList.length) {
      if (RDVManager.rdvList[ind].patientTelNum == search.value) {
        let today = new Date();
        let dd = String(today.getDate()).padStart(2, "0");
        let mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
        let yyyy = today.getFullYear();
        let day = "";
        let month = "";
        let year = "";
        while (index < RDVManager.rdvList.length) {
          dateTime = RDVManager.rdvList[index].dateTime;
          year = dateTime.slice(0, 4);
          month = dateTime.slice(5, 7);
          day = dateTime.slice(8, 10);
          if (day == dd && month == mm && year == yyyy)
            displayRDV(RDVManager.rdvList[index]);
        }
      }
      ind++;
    }
  }
});

document.getElementById("afficher-rdv-btn").addEventListener("click", () => {
  view = "nottoday";
  console.log(RDVManager.rdvList);
  let e = document.querySelector(".card-columns");
  let ind = 0;
  //e.firstElementChild can be used.
  let child = e.lastElementChild;
  while (child) {
    e.removeChild(child);
    child = e.lastElementChild;
  }
  while (ind < RDVManager.rdvList.length) {
    displayRDV(RDVManager.rdvList[ind]);
    ind++;
  }
});
function displayRDV(rdv) {
  RDVManager.initRdvList();
  let months = [
    "Janvier",
    "Fevrier",
    "Mars",
    "Avril",
    "Mai",
    "Join",
    "Jouillet",
    "Août",
    "Septembre",
    "Octobre",
    "Novembre",
    "Décembre",
  ];
  let rdvsBody = document.querySelector(".card-columns");
  let card = document.createElement("div");
  card.className = "card " + rdv.patientTelNum;
  card.style.width = "18rem";
  card.id = rdv.dateTime;
  let cardBody1 = document.createElement("div");
  cardBody1.className = "card-body";
  let cardTitle = document.createElement("h5");
  cardTitle.className = "card-title";
  cardTitle.appendChild(document.createTextNode("Rendez-vous"));
  cardBody1.appendChild(cardTitle);
  let cardSubtitle = document.createElement("h7");
  cardSubtitle.className = "card-subtitle mb-2 text-muted";
  let year = rdv.dateTime.slice(0, 4);
  let month = months[parseInt(rdv.dateTime.slice(5, 7)) - 1];
  let day = rdv.dateTime.slice(8, 10);
  let time = rdv.dateTime.slice(11);
  cardSubtitle.appendChild(
    document.createTextNode(
      "Le " + day + " " + month + " " + year + " à " + time
    )
  );
  cardBody1.appendChild(cardSubtitle);
  card.appendChild(cardBody1);
  let cardList = document.createElement("ul");
  cardList.className = "list";
  let patientName = document.createElement("h7");
  patientName.className = "card-subtitle mb-2 text-muted";
  patientName.appendChild(document.createTextNode("Nom du patient:"));
  let name = document.createElement("p");
  name.appendChild(document.createTextNode(rdv.patienName));
  let il1 = document.createElement("il");
  il1.className = "item";
  il1.appendChild(patientName);
  il1.appendChild(name);
  cardList.appendChild(il1);
  let patientTelNum = document.createElement("h7");
  patientTelNum.className = "card-subtitle mb-2 text-muted";
  patientTelNum.appendChild(
    document.createTextNode("Numéro de téléphone du patient")
  );
  let telNum = document.createElement("p");
  telNum.appendChild(document.createTextNode(rdv.patientTelNum));
  let il2 = document.createElement("il");
  il2.className = "item";
  il2.appendChild(patientTelNum);
  il2.appendChild(telNum);
  cardList.appendChild(il2);
  let object = document.createElement("h7");
  object.className = "card-subtitle mb-2 text-muted";
  object.appendChild(document.createTextNode("Objet: "));
  let obj = document.createElement("p");
  obj.appendChild(document.createTextNode(rdv.object));
  let il3 = document.createElement("il");
  il3.className = "item";
  il3.appendChild(object);
  il3.appendChild(obj);
  cardList.appendChild(il3);
  card.appendChild(cardList);
  let cardBody2 = document.createElement("div");
  cardBody2.className = "card-body";
  let cardEdit = document.createElement("button");
  cardEdit.style.margin = "1.5px";
  cardEdit.className = "btn btn-success btn-primary btn-sm";
  cardEdit.appendChild(document.createTextNode(" Modifier "));
  cardBody2.appendChild(cardEdit);
  let cardDel = document.createElement("button");
  cardDel.addEventListener("click", (event) => {
    let rdvCard = cardDel.parentNode.parentNode;
    let id = toString(rdvCard.id);
    RDVManager.deleteRDV(id);
    ipcRenderer.send("delete:rdv", id);
    rdvCard.parentNode.removeChild(rdvCard);
  });
  cardDel.style.margin = "1.5px";
  cardDel.className = "btn btn-danger btn-primary btn-sm";
  cardDel.appendChild(document.createTextNode(" Supprimer "));
  cardDel.addEventListener("click", (event) => {
    let rdvCard = cardDel.parentNode.parentNode;
    let id = toString(rdvCard.id);
    RDVManager.deleteRDV(id);
    RDVManager.storeRdvList();
    ipcRenderer.send("delete:rdv", id);
    rdvCard.parentNode.removeChild(rdvCard);
  });
  cardBody2.appendChild(cardDel);
  let cardPrint = document.createElement("button");
  cardPrint.style.margin = "1.5px";
  cardPrint.className = "btn btn-primary btn-sm";
  cardPrint.appendChild(document.createTextNode(" Imprimer "));
  cardPrint.addEventListener("click", () => {
    console.log("print link");

    const item1 = rdv.patienName;
    const item3 = rdv.patientTelNum;
    const dateTime = "Le ".concat(day, " ", month, " ", year, " à ", time);
    const object = rdv.object;
    const list1 = [item1, item3, dateTime, object];
    const rdv_one = {
      nom: item1,
      numero: item3,
      date: dateTime,
      obj: object,
    };
    const jsonString = JSON.stringify(rdv_one);
    console.log(jsonString);
    fs.writeFile("./renderer/rdv_one.json", jsonString, (err) => {
      if (err) {
        console.log("Error writing file", err);
      } else {
        console.log("Successfully wrote file");
      }
    });

    ipcRenderer.send("printRDV1", list1);
    console.log("ipcRenderer");
  });
  cardBody2.appendChild(cardPrint);
  card.appendChild(cardBody2);
  rdvsBody.appendChild(card);
}

ipcRenderer.on("rdv:add", (event, rdv) => {
  RDVManager.initRdvList();
  console.log("hi renderer");
  displayRDV(rdv);
});

window.addEventListener("load", function (event) {
  view = "today";
  console.log(RDVManager.rdvList);
  index = 0;
  let today = new Date();
  let dd = String(today.getDate()).padStart(2, "0");
  let mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  let yyyy = today.getFullYear();
  let day = "";
  let month = "";
  let year = "";
  while (index < RDVManager.rdvList.length) {
    dateTime = RDVManager.rdvList[index].dateTime;
    year = dateTime.slice(0, 4);
    month = dateTime.slice(5, 7);
    day = dateTime.slice(8, 10);
    if (day == dd && month == mm && year == yyyy)
      displayRDV(RDVManager.rdvList[index]);
    index++;
  }
});

module.exports.displayRDV = (rdv) => {
  displayRDV(rdv);
};
