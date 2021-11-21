<template>
  <div id="map-modal" class="modal" :class="{ 'is-active': mutatedShow }">
    <div class="modal-background" @click="closeMap"></div>
    <div class="modal-content">
      <div id="map-container">
        <l-map v-if="this.x" ref="map" @ready="doSomethingOnReady()">
          <l-tile-layer
            :url="tilesUrl"
            :attribution="attribution"></l-tile-layer>
          <l-marker v-for="(marker, index) in markers" :key="'marker' + index" :lat-lng="marker.latlng" :icon="marker.icon"></l-marker>
          <l-polyline v-for="(poly, index) in polylines" :key="'polyline' + index" :lat-lngs="poly.latlngs" :color="poly.color" :weight="poly.weight" :dashArray="poly.dashArray" ></l-polyline>
        </l-map>
      </div>
      <button class="modal-close is-large" @click="closeMap" aria-label="close"></button>
    </div>
  </div>
</template>

<script>

import { latLngBounds } from "leaflet";
import { LMap, LTileLayer, LMarker, LPolyline } from 'vue2-leaflet';

export default {
  props: {
    type: String,
    show: Boolean,
    attribution: String, //&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors
    tilesUrl: String,
    markers: Array,
    polylines: Array //https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png
  },
  data() {
    return {
      mutatedShow: this.show,
      x: false
    }
  },
  components: {
    LMap,
    LTileLayer,
    LMarker,
    LPolyline,
  },
  methods: {
    closeMap() {
      this.mutatedShow = false;
      this.x = false;
      this.$emit('modal-closed')
    },
    doSomethingOnReady() {
      console.log('type :>> ', this.type);
        this.map = this.$refs.map.mapObject;
        if (this.type === 'location' ) {
          const latlong = this.markers[0].latlng;
          this.map.setView(latlong, 13);
        } else if (this.type === 'route') {
          const corner1 = this.markers[0].latlng;
          const corner2 = this.markers[1].latlng;
          this.map.fitBounds(latLngBounds(corner1, corner2), [30, 30])
        }
        // this.map.setZoom(5);
        // this.map.setView([0, 0], 4);
        console.log('updated', this.mutatedShow);
        // this.polylineRef = this.$refs.polylineRef.mapObject;
        // this.map.fitBounds(this.polylineRef.getBounds(), [30, 30])
    },
  },
  watch: {
    show: function(newVal) {
      this.mutatedShow = newVal;
      if (this.mutatedShow) {
        setTimeout(() => this.x = true, 300);
      }

    }
  }
}
</script>
<style lang="scss">
  @media screen and (min-width: 769px){
    #map-modal .modal-content {
      width: 80vw !important;
    }
  }
  
  #map-container {
      height: 80vh;
  }
</style>