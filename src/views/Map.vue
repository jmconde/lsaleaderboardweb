<template>
  <section class="hero">
    <div class="livemap-wrapper">
      <l-map ref="map"
          :minZoom="3"
          :maxZoom="15"
          @ready="initMap()"
          @update:zoom="zoomUpdated">
        <l-tile-layer
          :url="tilesUrl"
          :attribution="attribution">
        </l-tile-layer>
        <l-layer-group ref="iconsGroup"></l-layer-group>
        <l-layer-group ref="locationsGroup"></l-layer-group>
        <l-layer-group ref="planesGroup"></l-layer-group>
        <l-layer-group ref="routesGroup"></l-layer-group>
      </l-map>
      <MapNotification 
        @notification-closed="notificationClosed" 
        :opened="drawerOpened"
        :data="drawerData">
        Lorem ipsum dolor sit amet, consectetur
        adipiscing elit lorem ipsum dolor. <strong>Pellentesque risus mi</strong>, tempus quis placerat ut, porta nec nulla. Vestibulum rhoncus ac ex sit amet fringilla. Nullam gravida purus diam, et dictum <a>felis venenatis</a> efficitur.
      </MapNotification>
    </div>
  </section>
</template>

<style lang="scss">
  .livemap-wrapper {
    width: 100%;
    height: calc(100vh - 52px);
    position: absolute;
    left: 0;
  }
  .popup-container {
    p {
      margin: 0;
    }
  }
</style>

<script>
import { customIcons } from '../data/MapHelper';
import { getBounds, getPilotsInAirport, getAircraftsInAirport, getPilotsByAirport, getAircraftsByAirport, getFlightPath } from '../helpers/mapHelper';
import { LatLng, latLng, point } from "leaflet";
import { LMap, LTileLayer, LLayerGroup} from 'vue2-leaflet';
import { request } from 'graphql-request';
import { GraphQLQueries } from '../data/graphql/queries';
import MapNotification from '../components/MapNotification.vue';
import 'leaflet-rotatedmarker';
import get from 'lodash/get';
import each from 'lodash/each';
import findIndex from 'lodash/findIndex';
import { getAcars, getGeoson } from '../data/acars';

//https://crew.latinstreamingalliance.com/api/pireps/PRnxWl4r1eRWryZr/acars/geojson
export default {
  props: {
    tilesUrl: {
      type: String,
      default: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      // default: 'https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png',
    },
    attribution: {
      type: String,
      default: `&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors`,
    },
    pollingTime: {
      type: Number,
      default: 5000,
    }
  },
  data() {
    return {
      loading: true,
      initialized: false,
      zoom: 5,
      tooltipOptions: {direction: 'top', offset: point(0, -35)},
      drawerOpened: false,
      drawerData: [],
      airports: [],
      pilots: [],
      aircrafts: [],
      routesPaths: {},
      liveRoutesPaths: {},
      airportMarkers: {},
      flightsMarkers: {},
      airportsDynamicData: {},
      flightsDynamicData: {},
    };
  },
  computed: {
    map() {
      return this.$refs.map ? this.$refs.map.mapObject : null;
    },
    locationsGroup() {
      return this.$refs.locationsGroup ? this.$refs.locationsGroup.mapObject : null;
    },
    planesGroup() {
      return this.$refs.planesGroup ? this.$refs.planesGroup.mapObject : null;
    },
    iconsGroup() {
      return this.$refs.iconsGroup ? this.$refs.iconsGroup.mapObject : null;
    },
    routesPathsGroup() {
      return this.$refs.routesGroup ? this.$refs.routesGroup.mapObject : null;
    },
  },
  methods: {
    async initMap() {
      this.loading = true;
      const result = await request(process.env.ROOT_GRAPHQL,  GraphQLQueries.GQL_LIVEMAP_DATA);
      const { airports } = result;

      await this.initAirports(airports);
      await this.loadDynamicData(true);
      this.initialized = true;
    },
    async initAirports(airports) {
      airports.forEach((airport) => {
        const { lat, lon, id } = airport;
        const latlng = latLng(lat, lon);

        const marker =  L.marker(latlng, { 
          icon: customIcons.iconLocationGray,
          data: {
            type: 'location',
            uid: id,
            ...airport,
            isEmpty: true,
          },
        });

        this.airportMarkers[id] = marker;
        marker.addTo(this.locationsGroup).on('click', this.onCLickMarker);
      });
      this.airports = airports;
    },
    async loadDynamicData(firstTime) {
      const result = await request(process.env.ROOT_GRAPHQL,  GraphQLQueries.GQL_LIVEMAP_DATA_LIGHT);
      const { pilots, aircrafts } = result;
      const acars = await getAcars();
      const pilotsInFlight = acars.map(d => d.user.id);
      const aircraftsInFlight = acars.map(d => d.aircraft.id);

      this.updateAcarsData(acars);
      this.drawFlights();
      this.updatePaths(acars);

      this.updateAirportsData(
        getPilotsByAirport(pilots, pilotsInFlight),
        getAircraftsByAirport(aircrafts, aircraftsInFlight)
      );
      this.updateAirportMarkers();
      

      this.loading = false;
      if (firstTime) {
        this.setInitialBounds();
        this.initialized = true;
      }
      setTimeout(() => this.loadDynamicData(), this.pollingTime);
    },
    async addFlightPath(flight) {
      console.log('addFlightPath');
       const polyline = L.polyline(getFlightPath(flight), {
          color: '#CEE2E8',
          weight: 2,
          dashArray: ''
        }).addTo(this.routesPathsGroup);
        this.routesPaths[flight.uid] = polyline;

        const geoson = await getGeoson(flight.uid);
        const polyline2 = L.polyline(get(geoson, 'line.features[0].geometry.coordinates').map(d => latLng(d[1], d[0])), {
          color: '#F3AD41',
          weight: 2,
          dashArray: ''
        }).addTo(this.routesPathsGroup);
        this.liveRoutesPaths[flight.uid] = polyline2;
        console.log('geoson :>> ', geoson);
    },
    removeFlight(uid) {
      this.routesPaths[uid].removeFrom(this.routesPathsGroup);
      this.liveRoutesPaths[uid].removeFrom(this.routesPathsGroup);
      delete this.routesPaths[uid];
      delete this.liveRoutesPaths[uid];
      console.log(this.routesPaths);
    },
    updatePaths(acars) {
      acars.forEach(async (flight) => {
        const pirep = flight.position.pirep_id;
        const geoson = await getGeoson(pirep);
        const latlngs = get(geoson, 'line.features[0].geometry.coordinates').map(d => latLng(d[1], d[0]));
        const polyline = this.routesPaths[pirep];
        const polyline2 = this.liveRoutesPaths[pirep];
        if (polyline) {
          console.log('updated');
          polyline.setLatLngs(getFlightPath(flight));
          polyline2.setLatLngs(latlngs);
        }
      });
    },
    setInitialBounds() {
      const keys = Object.keys(this.flightsMarkers);
      if (!keys.length) {
        this.zoom = 6;
        this.map.setView(latLng(4.70159, -74.1469), this.zoom);
      }
      else if (keys.length === 1) {
        this.zoom = 6;
        this.map.setView(this.flightsMarkers[keys[0]].getLatLng(), this.zoom);
      } else  if (flights.length > 1) {
        this.map.fitBounds(getBounds(this.flightsMarkers), [30, 30]);
      }    
    },
    drawFlights() {
      each(this.flightsDynamicData, (d, key) => {
        const marker = this.flightsMarkers[key];
        if (!marker) {
          this.flightsMarkers[key] =  L.marker(latLng(d.position.lat, d.position.lon), { 
            icon: customIcons.iconPlane,
            rotationAngle:  d.position.heading,
            rotationOrigin: 'center center',
            zIndexOffset: 1000,
            data: {
              ...{ 
                uid: d.position.pirep_id,
                type: 'liveflight'
              },
              ...d
            },
          }).addTo(this.planesGroup).on('click', this.onCLickMarker);
        } else {
          const data = get(marker, 'options.data');
          marker.setLatLng(latLng(d.position.lat, d.position.lon));
          marker.setRotationAngle(d.position.heading);
          marker.options.data = {
            ...marker.options.data,
            ...d
          };
          this.updateDrawerData(marker);
        }
      })
    },
    updateDrawerData(marker) {
      const data = get(marker, 'options.data');
      const index = findIndex(this.drawerData, ['uid', data.uid]);
      if (index > -1) {
        this.drawerData.splice(index, 1, data);
      }
    },
    updateAcarsData(acars) {
      const modified = [];
      each(acars, (flight) => {
        this.flightsDynamicData[flight.user.id] = flight;
        modified.push(flight.user.id)
      });
      Object.keys(this.flightsDynamicData).forEach(key => !modified.includes(Number(key)) && delete this.flightsDynamicData[key]);
    },
    updateAirportMarkers() {
      each(this.airportsDynamicData, (data, icao) => {
        const marker = this.airportMarkers[icao];
        marker.options.data = { ...marker.options.data, ...data };
        marker.setIcon(customIcons.iconLocationBlue);
      });
    },
    updateAirportsData(pilotsByAirport, aircraftsByAirports) {
      each(pilotsByAirport, (pilots, icao) => {
        if (!this.airportsDynamicData[icao]) {
          this.airportsDynamicData[icao] = { pilots }
        } else {
          this.airportsDynamicData[icao].pilots = pilots;
        }
      });

      each(aircraftsByAirports, (aircrafts, icao) => {
        if (!this.airportsDynamicData[icao]) {
          this.airportsDynamicData[icao] = { aircrafts }
        } else {
          this.airportsDynamicData[icao].aircrafts = aircrafts;
        }
      });
    },
    zoomUpdated(zoom) {
      this.zoom = zoom;
    },
    onCLickMarker(evt) {
      const data = get(evt, 'target.options.data');
      if (!data) { return; }
      const notification = findIndex(this.drawerData, ['uid', data.uid]);
      if (notification === -1) {
        console.log('data.type :>> ', data.type);
      if(data.type === 'liveflight') {
        this.addFlightPath(data)
       }

        this.drawerData.push(data);
        this.drawerOpened = true;
      } else {
         this.notificationClosed(notification);
      }
    },
    notificationClosed(index) {
      const item = this.drawerData[index];
      if (item.type === 'liveflight') {
        this.removeFlight(item.uid);
      }
      this.drawerData.splice(index, 1);
    }
  },
  components: {
    LMap,
    LTileLayer,
    LLayerGroup, 
    MapNotification,
  },
}
</script>