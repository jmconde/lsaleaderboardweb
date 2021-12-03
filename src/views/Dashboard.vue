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
        <div class="columns">
          <div class="column">
            <Widget>
              <Metric :value="getMetric('total_flights')" :name="'Total flights'"></Metric>
            </Widget>
          </div>
          <div class="column">
            <Widget>
              <Metric :value="formatTime(getMetric('total_time'))" :name="'Total Flight Hours'"></Metric>
            </Widget>
          </div>
          <div class="column">
            <Widget>
              <Metric :value="formatDistance(getMetric('total_distance'))" :name="'Total Distance'"></Metric>
            </Widget>
          </div>
          <div class="column">
            <Widget>
              <Metric :value="formatTime(getIvaoMetric('total_time'))" :name="'Total IVAO Time'"></Metric>
            </Widget>
          </div>
        </div>
        <div class="tile is-ancestor">
          <div class="tile is-parent">
            <div class="tile is-child">
              <Widget>
                <LineChart :data="flightsByDay" :height="250"></LineChart>
              </Widget>
            </div>
          </div>
          <div class="tile is-parent">
            <div class="tile is-child">
              <Widget>
                <BarChart :data="flightsByPilot" :height="250"></BarChart>
              </Widget>
            </div>
          </div>
        </div>
        <div class="tile is-ancestor">
          <div class="tile is-parent">
            <div class="tile is-child">
              <Widget :height="500">
                <PilotsList @show-map="mapData"/>
              </Widget>
            </div>
          </div>
          <div class="tile is-parent is-4">
            <div class="tile is-child">
              <Widget>
                <OnlineActivity></OnlineActivity>
              </Widget>
            </div>
          </div>
        </div>
            <!-- <div class="tile is-child">
              <h6 class="title is-6">All time ranking</h6>
              <div>
              </div>
            </div> -->
          <!-- <div class="tile is-parent is-vertical is-4">
            <div class="tile is-child">
                
                <Widget>
                  <LineChart height="250"></LineChart>
                </Widget>
                
                <Widget>
                  <OnlineActivity></OnlineActivity>
                </Widget>
            </div>
          </div> -->
      </section>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import Header from '../components/Header/Header.vue';
import OnlineActivity from '../components/OnlineActivity/OnlineActivity.vue';
import PilotsList from '../components/PilotsList/PilotsList.vue';
import LeafletMap from '../components/LeafletMap/LeafletMap.vue';
import Widget from '../components/Widget.vue';
import LineChart from '../components/LineChart/LineChart.vue';
import BarChart from '../components/BarChart/BarChart.vue';
import Metric from '../components/Metric.vue';

import gql from 'graphql-tag';

export default{
  apollo: {
    allMetrics: {
      query: gql`query getAllMetrics($start: String!, $end: String!) {
        allMetrics:getMetrics(start:$start, end:$end) {
          metric
          id
        }
      }`,
      variables() {
        return {
          start: this.start,
          end: this.end,
        }
      },
      fetchPolicy: 'no-cache',
    },
    ivaoMetrics: {
      query: gql`query getIvaoMetrics($start: String!, $end: String!) {
        ivaoMetrics:getIvaoMetrics(start:$start, end:$end) {
          all {
            metric
            id
          }
          byPilot {
            id
            name
            metrics {
              id
              metric
            }
          }
        }
      }`,
      variables() {
        return {
          start: this.start,
          end: this.end,
        }
      },
      fetchPolicy: 'no-cache',
    },
    flightsByPilot: {
      query: gql`query getFlightsByPilot ($start: String!, $end: String!) {
        flightsByPilot: monthlyFlightsByPilot(start:$start, end:$end) {
          x
          y
        }
      },`,
      variables() {
        return {
          start: this.start,
          end: this.end,
        }
      },
      fetchPolicy: 'no-cache',
    },
    flightsByDay: {
      query: gql`query getFlightsByDay ($start: String!, $end: String!) {
        flightsByDay: monthlyFlightsByDay(start:$start, end:$end) {
          x
          y
        }
      },`,
      variables() {
        return {
          start: this.start,
          end: this.end,
        }
      },
      fetchPolicy: 'no-cache',
    },
  },
  data() {
    return {
      allMetrics: [],
      ivaoMetrics: [],
      flightsByPilot: [],
      flightsByDay: [],
      dashboardData: {},
      period: 'month',
      date: new Date(),
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
    LineChart,
    BarChart,
    Metric,
  },
  computed:{
    start() {
       return Vue.moment().startOf('month').format();
    },
    end() {
       return Vue.moment().endOf('month').format();
    },
    staticsHost() {
      return process.env.STATICS_HOST || '';
    },
  },
  methods: {
    getMetric(id) {
      if (!this.allMetrics) return 0;
      const obj = this.allMetrics.find(d => d.id === id);
      return obj ? obj.metric : NaN;
    },
    getIvaoMetric(id) {
      if (!this._.has(this.ivaoMetrics, 'all') ) return 0;
      const obj = this.ivaoMetrics.all.find(d => d.id === id);
      return obj ? obj.metric : NaN;
    },
    modalClosed() {
      this.markers = [];
      this.polylines = [];
      this.showMap = false;
    },
    mapData(data) {
      const { markers, polylines, type } = data;
      this.markers = markers;
      this.polylines = polylines;
      this.showMap = true;
      this.mapType = type;
    },
    formatTime(value) {
      const hours = Math.floor(value / 60);
      const minutes = value % 60;
      return `${hours}h ${minutes}m`;
    },
    formatDistance(value) {
      return `${Math.round(value)} nm`
    }
  }
}
</script>
