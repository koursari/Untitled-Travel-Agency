function showUs(){
    let x = document.getElementById("departures");
    if(x.hasChildNodes()) {
        console.log("YES");
        x.innerHTML = "";
        x.style.display = "none";
    } else {
        x.innerHTML = "<form><fieldset><input type=\"radio\"><label>Peekaboo</label></fieldset></form>";
        x.style.display = "block";
    }
}

let searchButton = document.getElementById("searchtrips");
searchButton.addEventListener("click", showUs);