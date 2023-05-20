//Populate Locations List
let locations = [
    {
        name: "Anor Londo",
        id: 0,
    },
    {
        name: "Undead Parish",
        id: 1,
    },
    {
        name: "Depths",
        id: 2,
    },
    {
        name: "Sen's Fortress",
        id: 3,
    },
    {
        name: "Darkroot Basin",
        id: 4,
    },
    {
        name: "Blighttown",
        id: 5,
    },
    {
        name: "Ashen Lake",
        id: 6,
    }
];
let connections = [
    [0,3],
    [1,2], [1,3], [1,4],
    [2,1], [2,5],
    [3,0], [3,1],
    [4,1],
    [5,2], [5,6],
    [6,5]
];
let originLocation = document.getElementById("from-location");
originLocation.value = "";
locations.forEach(i => {
    let loc = document.createElement("option");
    originLocation.appendChild(loc);
    loc.setAttribute("value", i.id);
    loc.textContent = i.name;
});

let destinationLocation = document.getElementById("destination-location");
destinationLocation.value = "";

//Pick Destination based on Origin and Available Connections
function updateDestinations() {
    //clear Departures List and disable button
    let departureForm = document.getElementById("departures");
    departureForm.style.display = "none";
    departureForm.querySelector("ul").innerHTML = "";
    let btn = document.getElementById("searchtrips");
    btn.disabled = true;

    //find what the user chose
    let originID = originLocation.value;
    //update available destinations
    let destinationLocation = document.getElementById("destination-location");
    destinationLocation.innerHTML = ""; //clear destinations
    //write a placeholder option
    let emptyDestination = document.createElement("option");
    destinationLocation.appendChild(emptyDestination);
    emptyDestination.setAttribute("value", "");
    emptyDestination.setAttribute("disabled", "true");
    emptyDestination.setAttribute("selected", "true");
    emptyDestination.setAttribute("hidden", "true");
    emptyDestination.textContent = "Προορισμός";
    //write actual available destinations
    connections.forEach(i => {
        if(i[0] == originID) {
            let loc = document.createElement("option");
            destinationLocation.appendChild(loc);
            loc.setAttribute("value", i[1]);
            let dname = "test";
            locations.forEach(lc => {if (lc.id == i[1]) dname = lc.name;});
            loc.textContent = dname;
        }
    });
}
originLocation.addEventListener("change", updateDestinations);

document.getElementById("destination-location").addEventListener("change", () => {
    let departureForm = document.getElementById("departures");
    departureForm.style.display = "none";
    departureForm.querySelector("ul").innerHTML = "";
    let btn = document.getElementById("searchtrips");
    btn.disabled = false;
});

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
