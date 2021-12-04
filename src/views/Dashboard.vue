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
      <section class="pt-2 section">
        <div class="mb-4 has-text-right">{{this.startDate}} <span class="has-text-weight-bold">to</span> {{this.endDate}}</div>
        <div class="columns">
          <div class="column">
            <Widget>
              <Metric title="Totals" :data="allMetricsData" ></Metric>
            </Widget>
          </div>
          <div class="column">
            <Widget>
              <Metric title="IVAO Totals" :data="ivaoMetricsData" ></Metric>
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

import { GraphQLQueries } from '../data/graphql/queries';
import { request } from 'graphql-request'

export default{
  data() {
    return {
      result: {},
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
      version: window.__GLOBALS.version,
      startDate: '2021-12-01',
      endDate: '2021-12-31',
      loading: true,
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
  mounted() {
    this.doQuery();
  },
  computed:{
     //:metrics-id="['total_time', 'total_time', 'total_time']" :name="['Total flights', 'Total flights', 'Total flights']"
    allMetricsData() {
      const { allMetrics } =  this.result;
      if (!allMetrics) {
         return;
      }
      return this.getMetricData(allMetrics)
    },
    ivaoMetricsData() {
      const { ivaoMetrics } =  this.result;
      if (!ivaoMetrics || !ivaoMetrics.all) {
         return;
      }
      return this.getMetricData(ivaoMetrics.all)
    },
    range() {
      return {
        start: this.start,
        end: this.end,
      }
    },
    start() {
       return Vue.moment(this.startDate).startOf('day').format('YYYY-MM-DD HH:mm:ss');
    },
    end() {
       return Vue.moment(this.endDate, 'YYYY-MM-DD').endOf('day').format('YYYY-MM-DD HH:mm:ss');
    },
    staticsHost() {
      return process.env.STATICS_HOST || '';
    },
  },
  methods: {
    async doQuery() {
      this.loading = true;
      const result = await request(process.env.ROOT_GRAPHQL,  GraphQLQueries.GQL_ALL_METRICS, this.range);
      this.result = result;
      this.flightsByDay = result.flightsByDay;
      this.flightsByPilot = result.flightsByPilot;
    },
    getMetric(id, arrMetrics) {
      const obj = arrMetrics.find(d => d.id === id);
      return obj ? obj.metric : NaN;
    },
    formatTime(value) {
      const hours = Math.floor(value / 60);
      const minutes = value % 60;
      return `${hours}h ${minutes}m`;
    },
    formatDistance(value) {
      return `${Math.round(value)} nm`
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
    getMetricData(data) {
      return {
        main: [{
          label: 'Flight Hours',
          value: this.getMetric('total_time', data),
          format: 'time',
        }, {
          label: 'Distance',
          value: this.getMetric('total_distance', data),
          format: 'distance',
        }],
        secondary: [{
          label: 'Flights',
          value: this.getMetric('total_flights', data)
        }, {
          label: 'hours/flights',
          value: this.getMetric('avg_time', data),
          format: 'time',
        }, {
          label: 'distance/flights',
          value: this.getMetric('avg_distance', data),
          format: 'distance',
        }]
      }
    }
  }
}
</script>
