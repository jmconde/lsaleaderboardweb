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

export default {
  props: {
    title: String,
    data: {
      type: Array,
      default: () => [[], []],
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
      month: new Date().getMonth(),
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
            borderRadius: 1,
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
      console.log('this.data :>> ', this.data);
      const series = [
        {
          name: this.$t('labels.flights'),
          data: this.data[0].map((d) => d.y),
        },
        {
          name: this.$t('labels.ivaoFlights'),
          data: this.data[1].map((d) => d.y),
        },
      ];
      return series;
    },
    chartOptions() {
      const xaxis = {
        categories: this.data[0].map((d) => d.x),
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