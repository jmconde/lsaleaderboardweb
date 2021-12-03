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
              <Metric :value="formatTime(getIvaoMetric('_total_time'))" :name="'Total IVAO Time'"></Metric>
            </Widget>
          </div>
        </div>
        <div class="tile is-ancestor">
          <div class="tile is-parent">
            <div class="tile is-child">
              <Widget>
                <LineChart :data="dashboardData.by_day" :height="250"></LineChart>
              </Widget>
            </div>
          </div>
          <div class="tile is-parent">
            <div class="tile is-child">
              <Widget>
                <BarChart :data="dashboardData.by_pilot" :height="250"></BarChart>
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
    dashboardData: {
      query: gql`query getDashboardData($start: String!, $end: String!) {
        metrics:getMetrics(start:$start, end:$end) {
          metric
          id
        },
        ivao_vids: getIvaoVIds{
          vid
        }
        by_pilot: monthlyFlightsByPilot(start:$start, end:$end) {
          x
          y
        },
        by_day: monthlyFlightsByDay(start:$start, end:$end) {
          x
          y
        }
        ivao_metrics: getIvaoMetrics(start:$start, end:$end) {
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
      update: data => ({
        metrics: data.metrics,
        ivao_vids: data.ivao_vids,
        by_pilot: data.by_pilot,
        by_day: data.by_day,
        ivao_metrics: data.ivao_metrics,
      }),
      variables() {
        return {
          date: this.date,
          unit: this.period,
          start: this.start,
          end: this.end,
        }
      }
    }
  },
  data() {
    return {
      dashboardData: {},
      period: 'month',
      date: new Date(),
      start: Vue.moment().startOf('month').toDate(),
      end: Vue.moment().endOf('month').toDate(),
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
  mounted() {
    console.log(process.env.STATICS_HOST);
  },
  computed:{
    staticsHost() {
      return process.env.STATICS_HOST || '';
    }
  },
  methods: {
    getMetric(id) {
      const obj = this.dashboardData.metrics.find(d => d.id === id);
      return obj ? obj.metric : NaN;
    },
    getIvaoMetric(id) {
      console.log('this.dashboardData :>> ', id, this.dashboardData.ivao_metrics.all);
      if (!this.dashboardData.ivao_metrics) return 0;
      const obj = this.dashboardData.ivao_metrics.all.find(d => d.id === id);
      return obj ? obj.metric : NaN;
    },
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
