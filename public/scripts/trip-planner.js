try {
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
    //departureForm.querySelector("ul").innerHTML = "";
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
function changeInDestination() {
    resetFlightsList();
    let btn = document.getElementById("searchtrips");
    btn.disabled = false;
}

originSelector.addEventListener("change", changeInOrigin);
destinationSelector.addEventListener("change", changeInDestination);

function filterDepartures() {
    //hide unrelated flights
    
    //show departures table
    let departureForm = document.getElementById("departures");
    departureForm.style.display = "block";
}

let searchButton = document.getElementById("searchtrips");
searchButton.addEventListener("click", filterDepartures);

} catch {
    console.log("Oops, wrong page")
}