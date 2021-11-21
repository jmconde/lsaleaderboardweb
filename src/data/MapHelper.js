import { icon } from 'leaflet';

export const customIcons = {
  iconHere: icon({
    iconUrl: require('../assets/img/marker-here.png'),
    iconSize: [21, 32],
    iconAnchor: [10, 32]
  }),
  iconLanding: icon({
    iconUrl: require('../assets/img/marker-landing.png'),
    iconSize: [21, 32],
    iconAnchor: [10, 32]
  }),
  iconTakeoff: icon({
    iconUrl: require('../assets/img/marker-takeoff.png'),
    iconSize: [21, 32],
    iconAnchor: [10, 32]
  }),
};