<template>
  <div>
    <h6 class="title is-6 mb-1">Flights this month</h6>
    <apexchart
      type="line"
      height="250"
      :options="chartOptions"
      :series="series"
    ></apexchart>
  </div>
</template>
<script>
import VueApexCharts  from "vue-apexcharts";
import WidgetContentMixin from '../../mixins/WidgetContentMixin';
import axios from 'axios';

export default {
  props: {
    height: {
      type: Number,
      default: 300
    }
  },
  components: {
    apexchart: VueApexCharts,
  },
  async mounted() {
    await this.loadData();
    this.widgetInitialized();
  },
  mixins: [WidgetContentMixin],
  data() {
    return {
      data: [],
      // series: [
      //   {
      //     name: "Desktops",
      //     data: [10, 41, 35, 51, 49, 62, 69, 91, 148],
      //   },
      // ],
      baseChartOptions: {
        chart: {
          toolbar: {
          show: false
        },
          height: this.height,
          type: "line",
          zoom: {
            enabled: false,
          },
        },
        dataLabels: {
          enabled: false,
        },
        stroke: {
          curve: "smooth",
          // dashArray: '20 5 10 5',
          width: 2
        },
        markers: {
          size: 0
        },
        fill: {
          type: 'gradient'
        },
        grid: {
          row: {
            colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
            opacity: 0.5,
          },
        },
        xaxis: {
          categories: [],
        },
      },
    };
  },
  computed: {
    series() {
      const series = [{
        name: "Flights",
        data: this.data.map(d => d.flights),
      }];
      console.log('series :>> ', series);
      return series;
    },
    chartOptions() {
      const xaxis = {
         categories: this.data.map(d => d.day)
      };
      console.log('xaxis :>> ', xaxis);;
      return {...this.baseChartOptions, ...{ xaxis } }
    }
  },
  methods: {
    getCategories() {
      const cat = [];
    },
    async loadData() {
      this.widgetLoading();
      try {
        const { data } = await axios.get(`${process.env.ROOT_API}/daily-total-data`);
        this.data = data;
        // console.log(data.map());
        this.widgetLoaded();

        window.dispatchEvent(new Event('resize'));
        console.log(data);
      } catch(err) {
        this.widgetFailed();
        console.log(err);
      }
    }
  },
};
</script>