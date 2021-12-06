<template>
  <div class="container">
    <LeafletMap :show="showMap" 
        tiles-url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" 
        attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
        :type="mapType"
        :markers="markers"
        :polylines="polylines"
        @modal-closed="modalClosed"
       />
    <section class="section">
      <PilotsList @show-map="mapData"></PilotsList>
    </section>
  </div>
</template>
<script>
import Header from '../components/Header/Header.vue';
import Footer from '../components/Footer/Footer.vue';
import PilotsList from '../components/PilotsList/PilotsList.vue';
import LeafletMap from '../components/LeafletMap/LeafletMap.vue';

export default {
  data() {
    return {
      version: '',
      lastUpdated: '',
      pilotsList: [],
      mapType: 'location',
      showMap: false,
      markers: [],
      polylines: [],
    }
  },
  methods: {
    modalClosed() {
      this.markers = [];
      this.polylines = [];
      this.showMap = false;
    },
    mapData(data) {
      console.log(data);
      const { markers, polylines, type } = data;
      this.markers = markers;
      this.polylines = polylines;
      this.showMap = true;
      this.mapType = type;
    },
  },
  components: {
    Header,
    Footer,
    PilotsList,
    LeafletMap,
  }
}
</script>

<style lang="scss">
  .logo {
      width: 150px;
  }
</style>