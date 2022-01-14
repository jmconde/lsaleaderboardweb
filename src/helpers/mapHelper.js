import { latLngBounds, latLng, point } from "leaflet";

export const getBounds = (map = {}) => {
  const data = Object.values(map);
  if (!data.length) {
    return [latLng(11.1196, -74.2306), latLng(11.1196, -74.2306)]
  }
  let minLat = 999;
  let minLon = 999;
  let maxLat = -999;
  let maxLon = -999;
  
  data.forEach((d) => {
    const { lat, lng } = d.getLatLng();
    if (lat < minLat) { minLat = lat; }
    if (lat > maxLat) { maxLat = lat; }
    if (lng < minLon) { minLon = lng; }
    if (lng > maxLon) { maxLon = lng; }
  });

  return [ latLng(minLat, minLon), latLng(maxLat, maxLon) ];
};

const s4 = () => Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);

export const uid = () => `${s4()}${s4()}-${s4()}-${s4()}-${s4()}-${s4()}${s4()}${s4()}`;

export const getPilotsInAirport = (code, pilots, idsInAcars) => {
  return pilots.filter(d => (d.location.id === code && !idsInAcars.includes(d.id)));
}

export const getAircraftsInAirport = (code, aircrafts, aircraftsInAcars) => {
  return aircrafts.filter(a => (a.location.id === code && !aircraftsInAcars.includes(a.id)));
};

export const getPilotsByAirport = (pilots, pilotsInFlight) => {
  return pilots.reduce((airports, pilot) => {
    if (!pilotsInFlight.includes(pilot.id)) {
      const icao = pilot.location.id;
      if (!airports[icao]) {
        airports[icao] = [];
      }
      airports[icao].push(pilot);
    }
    return airports;
  }, {});
}

export const getAircraftsByAirport = (aircrafts, aircraftsInFlight) => {
  return aircrafts.reduce((airports, aircraft) => {
    if (!aircraftsInFlight.includes(aircraft.id)) {
      const icao = aircraft.location.id;
      if (!airports[icao]) {
        airports[icao] = [];
      }
      airports[icao].push(aircraft);
    }
    return airports;
  }, {});
}

export const getFlightPath = (flight) => {
  return [
    [flight.dpt_airport.lat, flight.dpt_airport.lon],
    [flight.position.lat, flight.position.lon],
    [flight.arr_airport.lat, flight.arr_airport.lon],
  ]
}
