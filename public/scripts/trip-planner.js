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
        ticketSubmit.disabled = false;
        //write costs and available seats
        let chosenFlight = document.querySelector('input[name="f_id"]:checked').value;
        let existingFlightinfo = document.querySelector("#flight-"+chosenFlight+"-radio");

        let firstClassCost = document.querySelector("#f_seat_cost");
        firstClassCost.innerText = existingFlightinfo.dataset.f_cost;

        let businessClassCost = document.querySelector("#b_seat_cost");
        businessClassCost.innerText = existingFlightinfo.dataset.b_cost;

        let economyClassCost = document.querySelector("#e_seat_cost");
        economyClassCost.innerText = existingFlightinfo.dataset.e_cost;

        let infoJSON = await fetch("?returnSeats="+chosenFlight);
        let infoData = await infoJSON.json();

        let firstClassSeats = document.querySelector("#f_seat_available");
        firstClassSeats.innerText = infoData.f_available;
        if(infoData.f_available == 0) {
            let fClassOption = document.querySelector("#fseatpick");
            fClassOption.checked = false;
            fClassOption.disabled = true;
        }
        let firstClassTotal = document.querySelector("#f_seat_total");
        firstClassTotal.innerText = existingFlightinfo.dataset.t_f_seats;

        let businessClassSeats = document.querySelector("#b_seat_available");
        businessClassSeats.innerText = infoData.b_available;
        if(infoData.b_available == 0) {
            let bClassOption = document.querySelector("#bseatpick");
            bClassOption.checked = false;
            bClassOption.disabled = true;
        }
        let businessClassTotal = document.querySelector("#b_seat_total");
        businessClassTotal.innerText = existingFlightinfo.dataset.t_b_seats;

        let economyClassSeats = document.querySelector("#e_seat_available");
        economyClassSeats.innerText = infoData.e_available;
        if(infoData.e_available == 0) {
            let eClassOption = document.querySelector("#eseatpick");
            eClassOption.checked = false;
            eClassOption.disabled = true;
        }
        let economyClassTotal = document.querySelector("#e_seat_total");
        economyClassTotal.innerText = existingFlightinfo.dataset.t_e_seats;
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
