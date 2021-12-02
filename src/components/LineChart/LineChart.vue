<template>
  <div>
    <!-- <div v-if="$apollo.queries.data.loading">
      <h1>Loading {{loading}}</h1>
    </div> -->
    <apexchart
      type="line"
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
  //   $loadingKey: 'loading',
  //   data: {
  //     loading: 0,
  //     query: gql`query ByDayQuery($month: Int!) {
  //       monthlyFlightsByDay(month: $month) {
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
  //     update: data => data.monthlyFlightsByDay,
  //     pollInterval: 25000
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
  updated: function () {
    if(this.data.length > 0) {
      console.log('xccasdasd');
      this.widgetInitialized();
    }
  },
  data() {
    return {
      loading: 0,
      month: new Date().getMonth(),
      baseChartOptions: {
        chart: {
          fontFamily: 'Open Sans, sans-serif',
          toolbar: {
            show: false,
          },
          height: this.height,
          type: "line",
          zoom: {
            enabled: false,
          },
        },
        title: {
          text: 'This month flights by Day',
          align: 'center',
          margin: 0,
          style: {
            fontSize: '16px'
          },
        },
        dataLabels: {
          enabled: false,
        },
        stroke: {
          // curve: "smooth",
          // dashArray: '20 5 10 5',
          width: 3,
        },
        markers: {
          size: 0,
        },
        fill: {
          type: "gradient",
        },
        grid: {
          row: {
            colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
            opacity: 0.5,
          },
        },
        yaxis: {
          show: true,
          axisBorder: {
            show: false
          },
          labels: {
            style: {
              fontFamily: 'Open Sans, sans-serif'
            }
          }
        },
        xaxis: {
          categories: []
        },
      },
    };
  },
  computed: {
    series() {
      const data = this.data.map((d) => d.y)
      data.unshift(0);
      const series = [
        {
          name: "Flights",
          data,
        },
      ];
      return series;
    },
    chartOptions() {
      const categories = this.data.map((d) => d.x);
      categories.unshift('');
      const xaxis = {
        categories,
        tickAmount: 15,
        tooltip: {
          enabled: false
        },
        floating: false
      };
      return { ...this.baseChartOptions, ...{ xaxis } };
    },
    isLoading() {
      if (!this.$apollo.queries.data) return this.$apollo.loading;
      return this.$apollo.queries.data.loading;
    }
  },
  
  watch: {
    isLoading(val) {
      console.log('isLoading :>>', val);
    }
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
          }/monthly-flights-by-day/${new Date().getMonth()}`
        );
        this.data = data;
        this.widgetLoaded();
        window.dispatchEvent(new Event("resize"));
      } catch (err) {
        this.widgetFailed();
        console.log(err);
      }
    },
  },
};
</script>