<template>
  <div>
    <!-- <div v-if="$apollo.queries.data.loading">
      <h1>Loading {{loading}}</h1>
    </div> -->
    <apexchart
      type="line"
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
        colors: ['#967756', '#F3AD41'],
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
        text: this.title,
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
        curve: "smooth",
        // dashArray: '20 5 10 5',
        width: 2,
      },
      markers: {
        size: 0,
      },
      fill: {
        // type: "gradient",
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
      }
    },
    titleTranslated() {
      console.log(this.title);
      return  this.$t(this.title);
    },
    series() {
      console.log(this.data);
      const data = (this.data[0] || []).map((d) => d.y);
      const data2 = (this.data[1] || []).map((d) => d.y);
      data.unshift(0);
      data2.unshift(0);
      const series = [
        {
          name: this.$t('labels.flights'),
          data,
        },
        {
          name: this.$t('labels.ivaoFlights'),
          data: data2,
        },
      ];
      return series;
    },
    chartOptions() {
      const categories = (this.data[0] || []).map((d) => d.x);
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