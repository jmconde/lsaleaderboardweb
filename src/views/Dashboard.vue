<template>
  <div class="container is-fluid">
    <LeafletMap :show="showMap" 
      tiles-url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" 
      attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
      :type="mapType"
      :markers="markers"
      :polylines="polylines"
      @modal-closed="modalClosed"
       />
  
    <div id="dashboard" class="container">
      <section class="section">
        <div class="tile is-ancestor">
          <div class="tile is-parent">
            <div class="tile is-child">
              <h6 class="title is-6">All time pilots ranking</h6>
                <div>
                  <Widget :height="500">
                    <PilotsList @show-map="mapData"/>
                  </Widget>
                </div>
            </div>
          </div>
          <div class="tile is-parent is-vertical is-4">
            <div class="tile is-child">
                
                <Widget>
                  <LineChart height="250"></LineChart>
                </Widget>
                
                <Widget>
                  <OnlineActivity></OnlineActivity>
                </Widget>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>

import Header from '../components/Header/Header.vue';
import OnlineActivity from '../components/OnlineActivity/OnlineActivity.vue';
import PilotsList from '../components/PilotsList/PilotsList.vue';
import LeafletMap from '../components/LeafletMap/LeafletMap.vue';
import Widget from '../components/Widget.vue';
import LineChart from '../components/LineChart/LineChart.vue';

export default{
  data() {
    return {
      mapType: 'location',
      showMap: false,
      markers: [],
      polylines: [],
      version: window.__GLOBALS.version
    }
  },
  components: {
    Header,
    OnlineActivity,
    PilotsList,
    LeafletMap,
    Widget,
    LineChart
  },
  mounted() {
    console.log(process.env.STATICS_HOST);
  },
  computed:{
    staticsHost() {
      return process.env.STATICS_HOST || '';
    }
  },
  methods: {
    modalClosed() {
      this.markers = [];
      this.polylines = [];
      this.showMap = false;
    },
    mapData(data) {
      console.log('data :>> ', data);
      const { markers, polylines, type } = data;
      this.markers = markers;
      this.polylines = polylines;
      this.showMap = true;
      this.mapType = type;
      console.log('showing map');
    }
  }
}
</script>
