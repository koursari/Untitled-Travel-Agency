let departureForm = `
<form><fieldset>
<legend>Δρομολόγια</legend>
<ul>
<li><input type="radio" id="time1" name="time" value="time1"><label for="time1">Δρομολόγιο 1</label></li>
<li><input type="radio" id="time2" name="time" value="time2"><label for="time2">Δρομολόγιο 2</label></li>
</ul>
</fieldset>
<button type="submit" disabled>Αγορά</button>
</form>
`;

function showUs(){
    let x = document.getElementById("departures");
    if(x.hasChildNodes()) {
        x.innerHTML = "";
        x.style.display = "none";
    } else {
        x.innerHTML = departureForm;
        x.style.display = "block";
        let btn = x.querySelector("button");
        x.querySelectorAll("input").forEach(i => i.addEventListener("change", () => {btn.disabled = ''}));
    }
}

let searchButton = document.getElementById("searchtrips");
searchButton.addEventListener("click", showUs);

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