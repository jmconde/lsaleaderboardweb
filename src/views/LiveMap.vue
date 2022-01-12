<template>
  <section class="hero">
    <div class="livemap-wrapper">
      <l-map ref="map"
          :minZoom="3"
          :maxZoom="15"
          @ready="doQuery()"
          @update:zoom="zoomUpdated">
        <l-tile-layer
          :url="tilesUrl"
          :attribution="attribution"></l-tile-layer>

        <l-feature-group v-if="this.zoom > 6">
          <l-marker v-for="(marker, index) in markers" :key="index" :lat-lng="marker.latlng" :icon="marker.icon">
            <l-tooltip :options="tooltipOptions"><h3 class="has-text-weight-semibold">{{marker.data.location.id}}</h3></l-tooltip>
          </l-marker>
        </l-feature-group>
        
        <l-feature-group>
          <l-rotated-marker 
              v-for="(marker, index) in rotatedMarkers" 
              :key="'marker' + index" 
              :lat-lng="marker.latlng" 
              :icon="marker.icon"
              :rotationOrigin="marker.origin"
              :rotationAngle="marker.yaw"
              @click="openLivePopUp(marker)">
                <l-popup>
                  <div class="popup-container">
                    <h5 class="has-text-weight-semibold">{{marker.data.user.name}}</h5>
                    <p>Route: {{marker.data.dpt_airport_id}}-{{marker.data.arr_airport_id}}</p>
                    <p>Altitude: {{marker.data.position.altitude}}</p>
                    <p>GS: {{marker.data.position.gs}}</p>
                    <p>VS: {{marker.data.position.vs}}</p>
                    <p>Flight time: {{marker.data.flight_time}}</p>
                  </div>
                </l-popup>
            </l-rotated-marker>

        </l-feature-group>
        <!-- <l-polyline v-for="(poly, index) in polylines" :key="'polyline' + index" :lat-lngs="poly.latlngs" :color="poly.color" :weight="poly.weight" :dashArray="poly.dashArray" ></l-polyline> -->
      </l-map>
    </div>
  </section>
</template>

<style lang="scss">
  .livemap-wrapper {
    // position: absolute;
    // bottom: 0;
    width: 100%;
    height: 90vh;
  }
  .popup-container {
    p {
      margin: 0;
    }
  }
</style>

<script>
import { customIcons } from '../data/MapHelper';
import { latLngBounds, latLng, point } from "leaflet";
import { LMap, LTileLayer, LMarker, LPolyline, LLayerGroup, LPopup, LTooltip, LFeatureGroup} from 'vue2-leaflet';
import { request } from 'graphql-request';
import { GraphQLQueries } from '../data/graphql/queries';
import Vue2LeafletRotatedMarker from 'vue2-leaflet-rotatedmarker';
import axios from 'axios';

let initialRotation = 0;
let initialLat = 11.1196;
let initialLon = -74.2306;
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
  },
  data() {
    return {
      markers: [],
      rotatedMarkers: [],
      polylines: [],
      loading: true,
      initialized: false,
      zoom: 5,
      tooltipOptions: {direction: 'top', offset: point(0, -35)},
    };
  },
  mounted() {
    
  },
  computed: {
    map() {
      return this.$refs.map ? this.$refs.map.mapObject : null;
    }
  },
  methods: {
    async doQuery() {
      if (!this.initialized) {
        const latlng = latLng(11.1196, -74.2306);
        this.map.setView(latlng, this.zoom);
      }
      this.loading = true;
      const result = await request(process.env.ROOT_GRAPHQL,  GraphQLQueries.GQL_LIVEMAP_DATA);
      const { data: acars } = await axios.get(`${process.env.ROOT_API}/acars`);
      const idInAcars = acars.data.map(d => d.user_id);
      // console.log(result, acars);
      // console.log(idInAcars);
      console.log(acars.data.map(d => [d.position.lat, d.position.lon]));
      let minLat = 999;
      let minLon = 999;
      let maxLat = -999;
      let maxLon = -999;

      const markers = result.pilots.reduce((acc, d) => {
        const lat = d.location.lat;
        const lon = d.location.lon;
        const latlng = latLng(lat, lon);
        if (lat < minLat) { minLat = lat; }
        if (lat > maxLat) { maxLat = lat; }
        if (lon < minLon) { minLon = lon; }
        if (lon > maxLon) { maxLon = lon; }
        if (!idInAcars.includes(d.id)) {
          acc.push({
            latlng: latlng,
            icon: customIcons.iconHere,
            data: d,
          });
        }
        return acc;
      }, []);

      const rotatedMarkers = acars.data.map(d => ({
        latlng: latLng(d.position.lat, d.position.lon),
        icon: customIcons.iconPlane,
        yaw: d.position.heading,
        origin: 'center center',
        data: d,
      }));

      this.loading = false;
      this.initMap(markers, rotatedMarkers, latLng(minLat, minLon), latLng(maxLat, maxLon));
    },
    initMap(markers, rotatedMarkers, minCorner, maxCorner) {
      // this.doQuery();
      // console.log(this.$refs.animated.clearLayers());
      this.markers = markers;
      this.rotatedMarkers = rotatedMarkers;
      if (!this.initialized) {
        this.map.fitBounds(latLngBounds(minCorner, maxCorner), [30, 30]);
        this.initialized = true;
      }
      setTimeout(this.doQuery, 2000);
    },
    openLivePopUp(marker, caller) {
      console.log(marker, caller);
    },
    zoomUpdated(zoom) {
      console.log('zoom :>> ', zoom);
      this.zoom = zoom;
    }
  },
  components: {
    LMap,
    LTileLayer,
    LMarker,
    LPolyline,
    LLayerGroup, 
    LPopup,
    LFeatureGroup,
    LTooltip,
    'l-rotated-marker':Vue2LeafletRotatedMarker,
  },
}
</script>