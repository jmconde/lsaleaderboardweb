<template>
  <div>
    <div id="dashboard">
      <section class="pt-2">
        <RangeSelector @range-change="rangeChanged" :seconds="120" :loading="loading" />
        <div class="columns">
          <div class="column is-two-thirds">
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
            <div class="columns">
              <div class="column">
                <div class="notification is-light">
                  <PieChart :title="$t('titles.ivaoHoursPercentage')" :data="hoursPieChart" :height="350"></PieChart>
                </div>
              </div>
              <div class="column">
                <div class="notification is-light">
                  <BarChart stacked :title="$t('titles.hoursByDay')" :floatPrecision="2" :data="timeByDay" :height="350"></BarChart>
                  
                </div>
              </div>
            </div>
            <div class="columns">
              <div class="column">
                <div class="notification is-light">
                  <BarChart horizontal stacked :title="$t('titles.flightsByPilot')" :data="flightsByPilot" :height="350"></BarChart>
                </div>
              </div>
              <div class="column">
                <div class="notification is-light">
                  <BarChart horizontal stacked :title="$t('titles.hoursByPilot')" :floatPrecision="2" :data="timeByPilot" :height="350"></BarChart>
                </div>
              </div>
            </div>
            <!-- <div class="columns">
              <div class="column">
              </div>
              <div class="column">
                <div class="notification is-light">
                  <BarChart stacked :title="$t('titles.flightsByDay')" :data="flightsByDay" :height="350"></BarChart>
                </div>
              </div>
            </div> -->
          </div>
          <div class="column">
            <Metric :title="$t('labels.ivaoFlightsNoAcars')" :data="outsideVAData" />
            <Widget>
              <OnlineActivity></OnlineActivity>
            </Widget>
          </div>
        </div>
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
import Metric from '../components/Metric.vue';
import RangeSelector from '../components/RangeSelector.vue';
import PieChart from '../components/charts/PieChart.vue';
import BarChart from '../components/charts/BarChart.vue';

import { GraphQLQueries } from '../data/graphql/queries';
import { request } from 'graphql-request';
import { flightsByPilotMapper, timeByPilotMapper, flightsByDayMapper, timeByDayMapper } from '../data/mappers/BarChartMappers';

export default{
  data() {
    return {
      result: {},
      period: 'month',
      date: new Date(),
      version: window.__GLOBALS.version,
      startDate: Vue.moment().startOf('month').format('YYYY-MM-DD'),
      endDate: Vue.moment().endOf('month').format('YYYY-MM-DD'),
      loading: true,
      flightsByPilot: [],
      flightsByDay: [],
      timeByPilot: [],
      timeByDay: [],
    }
  },
  components: {
    Header,
    OnlineActivity,
    PilotsList,
    LeafletMap,
    Widget,
    Metric,
    RangeSelector,
    PieChart,
    BarChart,
  },
  mounted() {
    this.doQuery();
  },
  computed:{
     //:metrics-id="['total_time', 'total_time', 'total_time']" :name="['Total flights', 'Total flights', 'Total flights']"
    hoursPieChart() {
      const { allMetrics, ivaoMetrics } =  this.result;
      // if (!allMetrics || !ivaoMetrics.all) {
      //   console.log('entered here!');
      //   return [];
      // }
      const a =  this.getMetric('total_time', allMetrics);
      const b =  this.getMetric('total_time', ivaoMetrics.all);
      return [
        {
          label: this.$t('labels.ivaoFlights'),
          value: b / 60,
        },
        {
          label: this.$t('labels.flights'),
          value: (a - b) / 60,
        },
      ];
    },
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
    outsideVAData() {
      const { outsideVA } =  this.result;
       if (!outsideVA || !outsideVA.all) {
         return;
      }
      return this.getOutsideVAData(outsideVA.all);
    },
    range() {
      return {
        start: this.start,
        end: this.end,
      }
    },
    start() {
       return Vue.moment(this.startDate, 'YYYY-MM-DD').startOf('day').format('YYYY-MM-DD HH:mm:ss');
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
      this.flightsByPilot = flightsByPilotMapper(this.result);
      this.timeByPilot = timeByPilotMapper(this.result);
      this.flightsByDay = flightsByDayMapper(this.result);
      this.timeByDay = timeByDayMapper(this.result)
      this.loading = false;
      console.log('<-->', timeByDayMapper(this.result));
    },
    getMetric(id, arrMetrics) {
      const obj = arrMetrics.find(d => d.id === id);
      return obj ? obj.metric : NaN;
    },
    
    rangeChanged(range) {
      this.startDate = range[0];
      this.endDate = range[1];
      this.doQuery();
    },
    getOutsideVAData(data) {
      return  {
        main: [{
          label: this.$t('labels.registeredPilot'),
          value: this.getMetric('total_flights', data),
        }], //"total_flights_unregisterd"
        secondary: [{
          label: this.$t('labels.unregisteredPilot'),
          value: this.getMetric('total_flights_unregisterd', data),
        }]
      };
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
