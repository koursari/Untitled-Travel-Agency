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
    departureForm.style.display = "block";
}

let searchButton = document.getElementById("searchtrips");
searchButton.addEventListener("click", populateDepartures);

//Populate Announcement List
customAnnouncements = [
{
    title: "Primus",
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