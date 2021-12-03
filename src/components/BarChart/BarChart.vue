<template>
  <div>
    <apexchart
      type="bar"
      height="250"
      :options="chartOptions"
      :series="series"
    ></apexchart>
  </div>
</template>
<script>
import VueApexCharts from "vue-apexcharts";
import WidgetContentMixin from "../../mixins/WidgetContentMixin";
import axios from "axios";
import gql from 'graphql-tag';

export default {
  // apollo: {
  //   data: {
  //     query: gql`query ByDayPilot($month: Int!) {
  //       monthlyFlightsByPilot(month: $month) {
  //         x
  //         y
  //       }
  //     }`,
  //     result() {
  //       this.widgetInitialized();
  //     },
  //     variables() {
  //       return  {
  //         month: this.month
  //       };
  //     },
  //     update: data => data.monthlyFlightsByPilot,
  //     pollInterval: 15*60*60
  //   }
  // },
  props: {
    data: {
      type: Array,
      default: () => [],
    },
    height: {
      type: Number,
      default: 300,
    },
  },
  components: {
    apexchart: VueApexCharts,
  },
  mixins: [WidgetContentMixin],
  data() {
    return {
      // series: [{
      //   data: [400, 430, 448, 470, 540, 580, 690, 1100, 1200, 1380]
      // }],
      month: new Date().getMonth(),
      // data: [],
      baseChartOptions: {
        chart: {
          type: 'bar',
          fontFamily: 'Open Sans, sans-serif',
          toolbar: {
            show: false,
          },
          height: 200,
        },
        title: {
          text: 'This month flights by Pilot',
          align: 'center',
          margin: 0,
          style: {
            fontSize: '16px'
          },
        },
        plotOptions: {
          bar: {
            borderRadius: 4,
            horizontal: true,
          }
        },
        // xaxis: {
        //   categories: ['South Korea', 'Canada', 'United Kingdom', 'Netherlands', 'Italy', 'France', 'Japan',
        //     'United States', 'China', 'Germany'
        //   ],
        // },
        // title: {
        //   text: 'This month flights by pilot',
        //   align: 'center',
        //   margin: 0,
        //   style: {
        //     fontSize: '16px'
        //   },
        // },
        dataLabels: {
          enabled: false
        },
      },
    };
  },
  computed: {
    series() {
      const series = [
        {
          data: this.data.map((d) => d.y),
        },
      ];
      return series;
    },
    chartOptions() {
      const xaxis = {
        categories: this.data.map((d) => d.x),
        labels: {
          formatter: function(val) {
            return val.toFixed(0);
          }
        }
      };
      return { ...this.baseChartOptions, ...{ xaxis } };
    },
  },
  methods: {
    getCategories() {
      const cat = [];
    },
    async loadData() {
      this.widgetLoading();
      try {
        const { data } = await axios.get(
          `${
            process.env.ROOT_API
          }/monthly-flights-by-pilot/${new Date().getMonth()}`
        );
        this.data = data;
        // console.log(data.map());
        this.widgetLoaded();

        window.dispatchEvent(new Event("resize"));
        console.log(data);
      } catch (err) {
        this.widgetFailed();
        console.log(err);
      }
    },
  },
};
</script>