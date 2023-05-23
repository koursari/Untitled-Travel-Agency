//Locations List
//We can list all locations with actual flights instead

const controller = await import("../controller/travel-controller.mjs");

const userId = 'postgres';

//gets departures and destinations in an array
const initLocations = await controller.getFlightConnections(userId);

//different way of doing it by passing an Object into  array.reduce() // needs lodash.groupby // cleanup later
// reformattedLocations = initLocations.reduce(function (r, a) {
//     r[a.departure] = r[a.departure] || [];
//     r[a.departure].push(a);
//     return r;
// }, Object.create(null)); 

//similar method
// const reformattedLocations = groupBy (initLocations, loc => loc.departure);


//simple javascript
function groupByKey(array, key) {
    return array
      .reduce((hash, obj) => {
        if(obj[key] === undefined) return hash; 
        return Object.assign(hash, { [obj[key]]:( hash[obj[key]] || [] ).concat(obj)})
      }, {})
 }
 
 const reformattedLocations = groupByKey(initLocations, 'departure');
 console.log(reformattedLocations);

// export {locations}

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
