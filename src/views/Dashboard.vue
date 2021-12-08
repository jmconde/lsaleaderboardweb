<template>
  <div>
    <div id="dashboard">
      <section class="pt-2">
        <RangeSelector @range-change="rangeChanged" />
        <div class="columns">
          <div class="column">
            <Widget>
              <Metric :title="$t('titles.totals')" :data="allMetricsData" ></Metric>
            </Widget>
          </div>
          <div class="column">
            <Widget>
              <Metric :title="$t('titles.ivaoTotals')" :data="ivaoMetricsData" ></Metric>
            </Widget>
          </div>
        </div>
        <div class="tile is-ancestor">
          <div class="tile is-parent ">
            <div class="tile is-child">
              <div class="notification is-light">
                <Widget>
                  <LineChart :title="$t('titles.flightsByDay')" :data="flightsByDay" :height="250"></LineChart>
                </Widget>
              </div>
              <div class="notification is-light">
                <Widget>
                  <BarChart :title="$t('titles.flightsByPilot')" :data="flightsByPilot" :height="350"></BarChart>
                </Widget>
              </div>
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
import RangeSelector from '../components/RangeSelector.vue';

import { GraphQLQueries } from '../data/graphql/queries';
import { request } from 'graphql-request'

export default{
  data() {
    return {
      result: {},
      period: 'month',
      date: new Date(),
      version: window.__GLOBALS.version,
      startDate: '2021-12-01',
      endDate: '2021-12-31',
      loading: true,
      flightsByPilot: [],
      flightsByDay: [],
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
    RangeSelector,
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
    
    rangeChanged(range) {
      console.log('rangeChanged', range);
      this.startDate = range[0];
      this.endDate = range[1];
      this.doQuery();
    },
    getMetricData(data) {
      return {
        main: [{
          label: this.$t('metrics.flightHours'),
          value: this.getMetric('total_time', data),
          format: 'time',
        }, {
          label: this.$t('metrics.distance'),
          value: this.getMetric('total_distance', data),
          format: 'distance',
        }],
        secondary: [{
          label: this.$t('metrics.flights'),
          value: this.getMetric('total_flights', data)
        }, {
          label: this.$t('metrics.hoursAvg'),
          value: this.getMetric('avg_time', data),
          format: 'time',
        }, {
          label: this.$t('metrics.distanceAvg'),
          value: this.getMetric('avg_distance', data),
          format: 'distance',
        }]
      }
    }
  }
}
</script>
