// that's the js script for the main window
const { ipcRenderer } = require("electron");
const RDVManager = require("./RDVManager");
RDVManager.initRdvList();

document.getElementById("ajouter-rdv-btn").addEventListener("click", () => {
  ipcRenderer.send("ajouter-rdv");
});
// create add todo window button
document.getElementById("createPatientBtn").addEventListener("click", () => {
  ipcRenderer.send("add-patient-window");
});

function displayRDV(rdv) {
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
  card.className = "card";
  card.style.width = "18rem";
  let cardBody1 = document.createElement("div");
  cardBody1.className = "card-body";
  let cardTitle = document.createElement("h5");
  cardTitle.className = "card-title";
  cardTitle.appendChild(document.createTextNode("Rendez-vous"));
  cardBody1.appendChild(cardTitle);
  let cardSubtitle = document.createElement("h6");
  cardSubtitle.className = "card-subtitle mb-2 text-muted";
  let year = rdv.dateTime.slice(0, 4);
  let month = months[parseInt(rdv.dateTime.slice(5, 7))];
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
  let cardEdit = document.createElement("a");
  cardEdit.href = "#";
  cardEdit.style.margin = "1.5px";
  cardEdit.className = "btn btn-success btn-primary btn-sm";
  cardEdit.appendChild(document.createTextNode(" Modifier "));
  cardBody2.appendChild(cardEdit);
  let cardDel = document.createElement("a");
  cardDel.href = "#";
  cardDel.style.margin = "1.5px";
  cardDel.className = "btn btn-danger btn-primary btn-sm";
  cardDel.appendChild(document.createTextNode(" Supprimer "));
  cardBody2.appendChild(cardDel);
  let cardPrint = document.createElement("a");
  cardPrint.href = "#";
  cardPrint.style.margin = "1.5px";
  cardPrint.className = "btn btn-primary btn-sm";
  cardPrint.appendChild(document.createTextNode(" Imprimer "));
  cardBody2.appendChild(cardPrint);
  card.appendChild(cardBody2);
  rdvsBody.appendChild(card);
}

ipcRenderer.on("rdv:add", (event, rdv) => {
  console.log("hi renderer");
  displayRDV(rdv);
});

window.addEventListener("load", function (event) {
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
