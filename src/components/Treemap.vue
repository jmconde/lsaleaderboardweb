<template>
  <div>
    <apexchart
      type="treemap"
      height="250"
      :options="chartOptions"
      :series="series"
    ></apexchart>
  </div>
</template>
<script>
import VueApexCharts from "vue-apexcharts";
import WidgetContentMixin from "../mixins/WidgetContentMixin";
import axios from "axios";
import gql from 'graphql-tag';

export default {
  apollo: {
    data: {
      query: gql`query ByDayPilotX($month: Int!) {
        monthlyFlightsByPilot(month: $month) {
          x
          y
        }
      }`,
      result() {
        this.widgetInitialized();
      },
      variables() {
        return  {
          month: this.month
        };
      },
      update: data => data.monthlyFlightsByPilot,
      pollInterval: 15*60*60
    }
  },
  props: {
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
      data: [],
      baseChartOptions: {
        chart: {
          fontFamily: 'Open Sans, sans-serif',
          toolbar: {
            show: false,
          },
          type: "treemap",
          height: this.height,
        },
        title: {
          text: 'This month flights by pilot',
          align: 'center',
          margin: 0,
          style: {
            fontSize: '16px'
          },
        },
        legend: {
          show: false,
        },
        fill: {
          type: 'solid',
        },
        dataLabels: {
          dropShadow: {
            enabled: false
          },
          style: {
            colors: ['#fff']
          },
          formatter: function (val, opts) {
            const max = opts.w.config.series[0].data[0].y;
            const cut = Math.ceil(max * .2);
            return opts.value > cut ? [val, opts.value] : '';
         }
        },
        colors: ['#5C94A7'],
        plotOptions: {
          treemap: {
            enableShades: true,
          },
        },
      },
    };
  },
  computed: {
    series() {
      const series = [
        {
          data: this.data,
        },
      ];
      return series;
    },
    chartOptions() {
      // const xaxis = {
      //   categories: this.data.map((d) => d.name),
      // };
      // console.log("xaxis :>> ", xaxis);
      return { ...this.baseChartOptions };
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