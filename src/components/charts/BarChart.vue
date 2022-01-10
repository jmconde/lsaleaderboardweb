<template>
  <div v-if="!noData">
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
  import { BASE_COLORS } from '../../data/constants';
  import isEmpty from 'lodash/isEmpty';

  export default {
    props: {
      title: String,
      data: {
        type: Array,
        default: [],
      },
      height: {
        type: Number,
        default: 300,
      },
      horizontal: {
        type: Boolean,
        default: false,
      },
      stacked: {
        type: Boolean,
        default: false,
      },
      floatPrecision: {
        type: Number,
        default: 0,
      }
    },
    components: {
      apexchart: VueApexCharts,
    },
    data() {
      return {
      };
    },
    computed: {
      noData() {
        return isEmpty(this.data);
      },
      baseChartOptions() {
        return {
          colors: BASE_COLORS,
          chart: {
            type: 'bar',
            fontFamily: 'Open Sans, sans-serif',
            toolbar: {
              show: false,
            },
            height: this.height,
            stacked: this.stacked,
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
              horizontal: this.horizontal,
              borderRadius: 1,
              columnWidth: '50%',
              endingShape: 'rounded'
            }
          },
          dataLabels: {
            enabled: false
          },
          tooltip: {
            theme: 'dark',
            x: {
              show: false,
            },
            y: {
              formatter: this.formatterFn,
            }
          },
        }
      },
      series() {
        return this.data.map(d => ({
          name: this.$t(d.label),
          data: d.series, 
        }));
      },
      chartOptions() {
        const categories = isEmpty(this.data) ? [] : this.data[0].series.map((d) => d.x);
        if (this.horizontal) {
          const xaxis = {
            categories,
            tickAmount: 'dataPoints',
            labels: {
              formatter: this.formatterFn
            },
          };
          return { ...this.baseChartOptions, ...{ xaxis } };
        } else {
          const xaxis = {
            categories,
            tickAmount: 'dataPoints',
            tooltip: {
              enabled: false
            },
            floating: false
          };

          const yaxis = {
            show: true,
            axisBorder: {
              show: false
            },
            labels: {
              style: {
                fontFamily: 'Open Sans, sans-serif'
              },
              formatter: this.formatterFn
            } 
          };
          return { ...this.baseChartOptions, ...{ xaxis, yaxis } };
        }
      },
    },
    methods: {
      formatterFn(val) {
        return val.toFixed(this.floatPrecision);
      },
      // getCategories() {
      //   const cat = [];
      // },
    //   async loadData() {
    //     this.widgetLoading();
    //     try {
    //       const { data } = await axios.get(
    //         `${
    //           process.env.ROOT_API
        //       );
    //       this.data = data;
    //       // console.log(data.map());
    //       this.widgetLoaded();

    //       window.dispatchEvent(new Event("resize"));
    //       console.log(data);
    //     } catch (err) {
    //       this.widgetFailed();
    //       console.log(err);
    //     }
    //   },
    },
  };
</script>