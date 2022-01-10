<template>
  <div v-if="!noData">
    <apexchart
      type="pie"
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
    data() {
      return {
      };
    },
    computed: {
      noData() {
        return isEmpty(this.data);
      },
      series() {
        return this.data.map(d => d.value);
      },
      chartOptions() {
        return {
          colors: BASE_COLORS,
          labels: this.data.map(d => d.label),
          chart: {
            width: this.height,
            type: 'pie',
            fontFamily: 'Open Sans, sans-serif',
          },
          title: {
            text: this.title,
            align: 'center',
            margin: 0,
            style: {
              fontSize: '16px'
            },
          },
          tooltip: {
             y: {
              formatter: function(val) {
                return val.toFixed(1) + " hrs"
              },
              title: {
                formatter: function (seriesName) {
                  return ''
                }
              }
            }
          },
          plotOptions: {
            pie: {
              dataLabels: {
                offset: -25
              }
            }
          },
          legend: {
            show: false
          },
          dataLabels: {
            formatter(val, opts) {
              const name = opts.w.globals.labels[opts.seriesIndex]
              return [name, val.toFixed(1) + '%']
            }
          },
          responsive: [{
            breakpoint: 480,
            options: {
              chart: {
                width: 200
              },
              legend: {
                position: 'bottom'
              }
            }
          }]
        }
      },
    }
  }
</script>