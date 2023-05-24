
const connectionInformation = document.getElementById("direct-connections").querySelectorAll("div");
const connections = new Array();
connectionInformation.forEach(i => {
    let from = i.dataset.from;
    let to = i.dataset.to;
    connections.push([from, to]);
});

let originSelector = document.getElementById("from-location");
let destinationSelector = document.getElementById("destination-location");
destinationSelector.value = "";

function getNeighbors(x) {
    let result = new Array();
    connections.forEach(element => {
        if (element[0] == x) result.push(element[1])
    })
    return result;
}

function resetFlightsList() {
    let departureForm = document.getElementById("departures");
    departureForm.style.display = "none";
    departureForm.querySelector("ul").innerHTML = "";
    let btn = document.getElementById("searchtrips");
    btn.disabled = true;
}

function updateDestinations() {
    //Hde all connections
    destinations = destinationSelector.querySelectorAll("option");
    destinations.forEach(element => {
        element.hidden = true;
        element.disabled = true;
    });
    destinationSelector.value = "";
    //then show direct connections
    let selectedOriginID = originSelector.value;
    neighbors = getNeighbors(selectedOriginID);
    destinations.forEach(element => {
        id = element.value;
        if(neighbors.includes(id)) {
            element.hidden = false;
            element.disabled = false;
        }
    });
}
function changeInOrigin() {
    resetFlightsList();
    updateDestinations();
}
let changeInDestination = resetFlightsList;

originSelector.addEventListener("change", changeInOrigin);
destinationSelector.addEventListener("change", changeInDestination);

/*
//Populate Departures List
let customDepartures = [
    {
        timeID: "time1",
        text: "Δρομολόγιο 1",
    },
    {
        timeID: "time2",
        text: "Δρομολόγιο 2",
    }
];

function populateDepartures(){
    let locationA = document.getElementById("from-location").value;
    let locationB = document.getElementById("destination-location").value;

    let departureForm = document.getElementById("departures");
    let formUL = departureForm.querySelector("ul");
    let btn = departureForm.querySelector("button");
    btn.disabled = true;
    if (formUL.innerHTML != "") {
        formUL.innerHTML = "";
        departureForm.style.display = "none";
        return;
    }
    customDepartures.forEach(i => {
        let deLI = document.createElement("li");
        let deRadio = document.createElement("input");
        let deLabel = document.createElement("label");
        deLI.appendChild(deRadio);
        deLI.appendChild(deLabel);
        formUL.appendChild(deLI);
        deRadio.setAttribute("type", "radio");
        deRadio.setAttribute("name", "time");
        deRadio.setAttribute("value", i.timeID);
        deRadio.setAttribute("id", i.timeID);
        deRadio.addEventListener("change", ()=>{btn.disabled = false});
        deLabel.textContent = i.text;
        deLabel.setAttribute("for", i.timeID);
    });

    //to make the form more accessible
    let La = document.createElement("input");
    La.setAttribute("name","origin");
    La.setAttribute("value", locationA);
    La.style.display = "none";
    formUL.appendChild(La);

    let Lb = document.createElement("input");
    Lb.setAttribute("name","destination");
    Lb.setAttribute("value", locationB);
    Lb.style.display = "none";
    formUL.appendChild(Lb);

    departureForm.style.display = "block";
}

let searchButton = document.getElementById("searchtrips");
searchButton.addEventListener("click", populateDepartures);
*/