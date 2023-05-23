//Locations List
//We can list all locations with actual flights instead

const controller = await import("../controller/travel-controller.mjs");

const userId = 'postgres';


const departures = await controller.getAllDepartures(userId);
const destinations = await controller.getAllDestinations(userId);
console.log(departures, destinations);


 const locations =  [ {
        name: "Anor Londo",
        short: "ALD",
        id: 0,
    },
    {
        name: "Undead Parish",
        short: "UDP",
        id: 1,
    },
    {
        name: "Depths",
        short: "DPTS",
        id: 2,
    },
    {
        name: "Sen's Fortress",
        short: "SFS",
        id: 3,
    },
    {
        name: "Darkroot Basin",
        short: "DRB",
        id: 4,
    },
    {
        name: "Blighttown",
        short: "BLTN",
        id: 5,
    },
    {
        name: "Ashen Lake",
        short: "ASL",
        id: 6,
    }
 ];

// probably won't be used as to allow for complicated flights
const directConnections = [
    {from: 0, to: 3},
    {from: 1, to: 2}, {from: 1, to: 3}, {from: 1, to: 4},
    {from: 2, to: 1}, {from: 2, to: 5}, 
    {from: 3, to: 0}, {from: 3, to: 1},
    {from: 4, to: 1},
    {from: 5, to: 2}, {from: 5, to: 6},
    {from: 6, to: 5}
];

export { locations, directConnections}