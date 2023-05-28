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
    originSelector.value = "";
    destinationSelector.value = "";

    let departureForm = document.getElementById("departures");
    let seatPickerField = document.getElementById("class-picker-fieldset");
    let seatPickerButton = document.getElementById("class-picker-btn");
    seatPickerButton.disabled = true;
    seatPickerButton.addEventListener("click", ()=>{seatPickerField.style.display="block"})
    let ticketSubmit = document.getElementById("purchase");
    ticketSubmit.disabled = true;
    
    let departureFormFlights = departureForm.querySelectorAll("#flight-options input");
    departureFormFlights.forEach(element => {
        element.checked = false;
        let itsLabelDTime = document.querySelector("#dtime-"+element.value);
        let itsLabelATime = document.querySelector("#atime-"+element.value);
        let d = new Date(element.dataset.d_date);
        let a = new Date(element.dataset.a_date);
        itsLabelDTime.innerText = new Intl.DateTimeFormat('el-GR', { dateStyle: 'short', timeStyle: 'long', timeZone: 'Europe/Athens' }).format(d);
        itsLabelATime.innerText = new Intl.DateTimeFormat('el-GR', { dateStyle: 'short', timeStyle: 'long', timeZone: 'Europe/Athens' }).format(a);
        element.addEventListener("change", flightPick)
    });

    function getNeighbors(x) {
        let result = new Array();
        connections.forEach(element => {
            if (element[0] == x) result.push(element[1])
        })
        return result;
    }

    function resetFlightsList() {  
        departureForm.style.display = "none";
        seatPickerField.style.display = "none"
        departureFormFlights.forEach(element => {
            element.checked = false;
        });
        seatPickerButton.disabled = true;
        ticketSubmit.disabled = true;
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
            if (neighbors.includes(id)) {
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
        let formLegend = departureForm.querySelector("legend");
        let locationA = originSelector.value;
        let locationB = destinationSelector.value;
        formLegend.innerText = "Δρομολόγια: " + locationA + " - " + locationB;

        //hide unrelated flights
        let flightOptions = departureForm.querySelectorAll("#flight-options input");
        flightOptions.forEach(element => {
            if ((element.dataset.from == locationA) && (element.dataset.to == locationB)) {
                //the parent element is the list element so it includes both <input> and <legend>
                element.parentElement.style.display = "block";
            } else {
                element.parentElement.style.display = "none";
            }
        });
        departureForm.style.display = "block";
    }

    async function flightPick() {
        seatPickerButton.disabled = false;
        //write costs and available seats
        let chosenFlight = document.querySelector('input[name="f_id"]:checked').value;
        let existingFlightinfo = document.querySelector("#flight-"+chosenFlight+"-radio");
        console.log(existingFlightinfo);

        let firstClassOption = document.querySelector("#f_seat_cost");
        firstClassOption.innerText = existingFlightinfo.dataset.f_cost;

        let businessClassOption = document.querySelector("#b_seat_cost");
        businessClassOption.innerText = existingFlightinfo.dataset.b_cost;

        let economyClassOption = document.querySelector("#e_seat_cost");
        economyClassOption.innerText = existingFlightinfo.dataset.e_cost;

        let infoJSON = await fetch("?returnSeats=true");
        let infoData = await infoJSON.json();
        console.log(infoData.foo)
    }
    
    let seatingOptions = seatPickerField.querySelectorAll("input");
    seatingOptions.forEach(element => {
        element.addEventListener("click", seatPicked)
    })

    function seatPicked() {
        ticketSubmit.disabled = false;
    }

    let searchButton = document.getElementById("searchtrips");
    searchButton.addEventListener("click", filterDepartures);

} catch {
    console.log("Oops, wrong page")
}
