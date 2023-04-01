let departureForm = `
<form><fieldset>
<legend>Δρομολόγια</legend>
<ul>
<li><input type="radio" id="time1" name="time" value="time1"><label for="time1">Peekaboo</label></li>
<li><input type="radio" id="time2" name="time" value="time2"><label for="time2">Peekaboo</label></li>
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
        x.querySelectorAll("input").forEach(i => i.addEventListener("change", () => {btn.disabled = ''}))
    }
}


let searchButton = document.getElementById("searchtrips");
searchButton.addEventListener("click", showUs);