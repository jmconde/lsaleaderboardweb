<template>
  <div class="notification is-info is-light">
    <div class="has-text-weight-medium is-size-6">
      {{name}}
    </div>
    <div class="is-size-1 is-size-2-tablet is-size-3-mobile has-text-weight-bold">{{value}} <span v-if="unit">{{unit}}</span></div>
    <small></small>
  </div>
</template>

<script>
import WidgetContentMixin from "../mixins/WidgetContentMixin";
import gql from 'graphql-tag';

export default {
  props: [ 'value', 'name', 'unit' ],
  // apollo: {
  //   $loadingKey: 'loading',
  //   data: {
  //     loading: 0,
  //     query: gql`query TotalFilghts($month: Int!, $prevMonth: Int!) {
  //       current: monthlyTotalFlights(month: $month) {
  //         metric
  //       }
  //       previous: monthlyTotalFlights(month: $prevMonth) {
  //         metric
  //       }
  //     }`,
  //     result(a) {
  //       console.log('result', a);
  //       this.widgetInitialized();
  //     },
  //     variables() {
  //       return  {
  //         month: this.month,
  //         prevMonth: this.month - 1
  //       };
  //     },
  //     update: data => ({
  //       current: data.current,
  //       previous: data.previous
  //     }),
  //     pollInterval: 15000
  //   }
  // },
  mixins: [WidgetContentMixin],
  data() {
    return {
      month: new Date().getMonth(),
      // data: {},
    }
  }
}
</script>