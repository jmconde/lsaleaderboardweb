<template>
  <div>
    <apexchart
      type="bar"
      :height="this.height"
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
    title: String,
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
    };
  },
  computed: {
    baseChartOptions() {
      return {
        colors: ['#967756', '#F3AD41'],
        chart: {
          type: 'bar',
          fontFamily: 'Open Sans, sans-serif',
          toolbar: {
            show: false,
          },
          height: this.height,
        },
        title: {
          text: this.title,
          align: 'center',
          margin: 0,
          style: {
            fontSize: '16px'
          },
        },
        plotOptions: {
          bar: {
            horizontal: true,
            borderRadius: 8,
            columnWidth: '50%',
            endingShape: 'rounded'
          }
        },
        dataLabels: {
          enabled: false
        },
      }
    },
    series() {
      const series = [
        {
          name: 'Vuelos',
          data: this.data.map((d) => d.y),
        },
        // {
        //   name: 'Vuelos en IVAO',
        //   data: this.data.map((d) => d.y),
        // },
      ];
      return series;
    },
    chartOptions() {
      const xaxis = {
        categories: this.data.map((d) => d.x),
        // labels: {
        //   formatter: function(val) {
        //     return val.toFixed(0);
        //   }
        // }
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