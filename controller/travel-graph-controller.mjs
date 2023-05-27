const controller = await import("./flight-controller.mjs");

const userId = 'postgres';

export async function listRefomattedLocations() {
    const locationPairs = await controller.getFlightConnections(userId);

    const groupByKey = (list, key, { omitKey = false }) => list.reduce((hash, { [key]: value, ...rest }) => ({ ...hash, [value]: (hash[value] || []).concat(omitKey ? { ...rest } : { [key]: value, ...rest }) }), {})

    const reformattedLocations = groupByKey(locationPairs, 'departure', { omitKey: true });
    return reformattedLocations;
}

export async function listAllLocations() {
    const locationPairs = await controller.getFlightConnections(userId);
    const customLocations = new Array();

    locationPairs.forEach(element => {
        if (!customLocations.includes(element.departure)) {
            customLocations.push(element.departure)
        }
        if (!customLocations.includes(element.destination)) {
            customLocations.push(element.destination)
        }
    });
    return customLocations;
}

export async function listAllConnections() {
    const locationPairs = await controller.getFlightConnections(userId);
    const uniquePairs = new Array();
    locationPairs.forEach(element => {
        if (!uniquePairs.includes(element)) {
            uniquePairs.push(element)
        }
    });
    return uniquePairs;
}