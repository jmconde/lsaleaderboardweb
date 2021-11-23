<template>
  <div>
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
      series: [
        {
          name: "Desktops",
          data: [10, 41, 35, 51, 49, 62, 69, 91, 148],
        },
      ],
      chartOptions: {
        chart: {
          height: 350,
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
          dashArray: '20 5 10 5',
          width: 2
        },
        markers: {
          size: 0
        },
        title: {
          text: "Product Trends by Month",
          align: "left",
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
          categories: [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
          ],
        },
      },
    };
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
        this.widgetLoaded();
        console.log(data
        );
      } catch(err) {
        this.widgetFailed();
      }
    }
  },
};
</script>