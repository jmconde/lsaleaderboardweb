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
    <div class="columns">
      <div class="column">
        <Widget>
          <PilotsList @show-map="mapData"/>
        </Widget>
      </div>
      <div class="column is-narrow">
        <div style="min-width: 350px">
          <Widget>
            <OnlineActivity></OnlineActivity>
          </Widget>
          <!-- <Widget>
            <LineChart></LineChart>
          </Widget> -->
        </div>
      </div>
    </div>
  </div>
  
   <!-- <div id="dashboard" class="container">
     <section class="section">
       <div class="tile is-ancestor">
         <div class="tile is-parent">
           <div class="tile is-child box">
             <h5 class="title is-5">Online Pilots</h5>
              <div>
                <PilotsList />
              </div>
           </div>
         </div>
         <div class="tile is-parent is-vertical is-4">
           <div class="tile is-child box">
             <h5 class="title is-5">Panel 2</h5>
             <div>
                <OnlineActivity />
             </div>
           </div>
           <div class="tile is-child box">
             <h5 class="title is-5">Panel 3</h5>
            </div>
         </div>
       </div>
     </section>
   </div> -->
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
      polylines: []
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

<style lang="scss">
</style>
