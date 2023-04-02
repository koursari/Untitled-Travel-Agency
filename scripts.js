//Populate Locations List
let locations = [
    "Anor Londo",
    "Undead Parish",
    "Depths",
    "Sen's Fortress",
    "Darkroot Basin",
    "Blighttown",
    "Ashen Lake"
];
let connections = [
    [3],
    [2,3,4],
    [1,5],
    [0,1],
    [1],
    [2,6],
    [5]

];
let originLocation = document.getElementById("from-location");
originLocation.value = "";
locations.forEach(i => {
    let loc = document.createElement("option");
    originLocation.appendChild(loc);
    loc.textContent = i;
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
    let originIndex = locations.indexOf(originLocation.value);
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
    connections[originIndex].forEach(i => {
        let loc = document.createElement("option");
        destinationLocation.appendChild(loc);
        loc.textContent = locations[i];
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
    let tripSpan = document.createElement("span");
    tripSpan.textContent = "Από: " + locationA + ". Προς: " + locationB + ".";
    departureForm.appendChild(tripSpan);

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
    departureForm.style.display = "block";
}

let searchButton = document.getElementById("searchtrips");
searchButton.addEventListener("click", populateDepartures);

//Populate Announcement List
let customAnnouncements = [
{
    title: "Prima",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
},
{
    title: "Secunda",
    text: "I am the very model of a modern Major-Gineral, I've information vegetable, animal, and mineral, I know the kings of England, and I quote the fights historical, from Marathon to Waterloo, in order categorical.",
},
{
    title: "Tetria",
    text: "The FitnessGram Pacer test is a multistage aerobic capacity test that progressively gets more difficult as it continues."
}
];
let sidebarDiv = document.getElementById("sidebar");

let announcementUL = document.createElement("ul");
sidebarDiv.appendChild(announcementUL);
customAnnouncements.forEach(i => {
    let an = document.createElement("li");
    an.textContent = i.title;
    an.setAttribute("data-text", i.text);
    announcementUL.appendChild(an);
});

//Click on sidebar announcements should lead to a custom pop up
function announce(event){
    let x = document.getElementById("short-announce");
    x.style.display = "block";
    x.querySelector("span").textContent = event.currentTarget.getAttribute("data-text");
    let btn = x.querySelector("button").addEventListener("click", ()=>{x.style.display = "none"})
}

let announcementList = document.querySelectorAll(".sidebar ul li").forEach(i => i.addEventListener("click", announce));