import { icon } from 'leaflet';
const popupAnchor = [0, -30];
export const customIcons = {
  iconHere: icon({
    iconUrl: require('../assets/img/marker-here.png'),
    iconSize: [21, 32],
    iconAnchor: [10, 32],
    popupAnchor,
  }),
  iconLanding: icon({
    iconUrl: require('../assets/img/marker-landing.png'),
    iconSize: [21, 32],
    iconAnchor: [10, 32],
    popupAnchor,
  }),
  iconTakeoff: icon({
    iconUrl: require('../assets/img/marker-takeoff.png'),
    iconSize: [21, 32],
    iconAnchor: [10, 32],
    popupAnchor,
  }),
  iconPlane: icon({
    iconUrl: require('../assets/img/plane.png'),
    iconSize: [30, 30],
    iconAnchor: [15, 15],
    popupAnchor: [0, -20],
  }),
  iconLocationRed: icon({
    iconUrl: require('../assets/img/location-red.png'),
    iconSize: [12, 16],
    iconAnchor: [6, 16],
    popupAnchor: [0, -20],
  }),
  iconLocationYellow: icon({
    iconUrl: require('../assets/img/location-yellow.png'),
    iconSize: [12, 16],
    iconAnchor: [6, 16],
    popupAnchor: [0, -20],
  }),
  iconLocationBlue: icon({
    iconUrl: require('../assets/img/location-blue.png'),
    iconSize: [12, 16],
    iconAnchor: [6, 16],
    popupAnchor: [0, -20],
  }),
  iconLocationLightBlue: icon({
    iconUrl: require('../assets/img/location-lightblue.png'),
    iconSize: [12, 16],
    iconAnchor: [6, 16],
    popupAnchor: [0, -20],
  }),
  iconLocationGreen: icon({
    iconUrl: require('../assets/img/location-green.png'),
    iconSize: [12, 16],
    iconAnchor: [6, 16],
    popupAnchor: [0, -20],
  }),
  iconLocationGray: icon({
    iconUrl: require('../assets/img/location-gray.png'),
    iconSize: [12, 16],
    iconAnchor: [6, 16],
    popupAnchor: [0, -20],
  }),
};