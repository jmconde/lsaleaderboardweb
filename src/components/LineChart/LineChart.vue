<template>
  <div>
    <!-- <div v-if="$apollo.queries.data.loading">
      <h1>Loading {{loading}}</h1>
    </div> -->
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

export default {
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
  updated: function () {
    if(this.data.length > 0) {
      this.widgetInitialized();
    }
  },
  data() {
    return {
      loading: 0,
      month: new Date().getMonth(),
    };
  },
  computed: {
    baseChartOptions() {
      return {
        colors: ['#F3AD41', '#967756',],
        chart: {
          fontFamily: 'Open Sans, sans-serif',
          toolbar: {
            show: false,
          },
          height: this.height,
          type: "bar",
          stacked: true,
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
            horizontal: false,
            borderRadius: 1,
            columnWidth: '50%',
            endingShape: 'rounded'
          }
        },
        dataLabels: {
          enabled: false,
        },
        tooltip: {
          theme: 'dark',
          x: {
            show: false,
          },
          y: {
            formatter: function(val) {
              return val.toFixed(0);
            },
          }
        },
        yaxis: {
          show: true,
          axisBorder: {
            show: false
          },
          labels: {
            style: {
              fontFamily: 'Open Sans, sans-serif'
            },
            formatter: function(val) {
              console.log(typeof val);
              return val.toFixed(0);
            },
          } 
        },
        xaxis: {
          categories: [],
        },
      }
    },
    titleTranslated() {
      return  this.$t(this.title);
    },
    series() {
      const data = (this.data[0] || []).map((d, i) => d.y - this.data[1][i].y);
      const data2 = (this.data[1] || []).map((d) => d.y);
      const series = [
        {
          name: this.$t('labels.ivaoFlights'),
          data: data2,
        },
        {
          name: this.$t('labels.flights'),
          data,
        },
      ];
      return series;
    },
    chartOptions() {
      const categories = (this.data[0] || []).map((d) => d.x);
      // categories.unshift('');
      const xaxis = {
        categories,
        tickAmount: 15,
        tooltip: {
          enabled: false
        },
        floating: false
      };
      return { ...this.baseChartOptions, ...{ xaxis } };
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