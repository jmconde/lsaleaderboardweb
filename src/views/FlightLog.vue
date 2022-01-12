<template>
  <div id="dashboard">
    <section class="pt-2">
      
      <RangeSelector :seconds="120" :loading="loading" />
      <h1 class="title is-5">{{$t('titles.flightlog')}}</h1>
      <table class="table is-striped is-hoverable is-fullwidth"><!--  is-striped is-hoverable is-narrow  -->
        <thead>
          <tr>
            <th class="has-text-centered">{{$t('labels.blockOff')}}</th>
            <th class="has-text-centered">{{$t('labels.blockOn')}}</th>
            <th class="has-text-centered">{{$t('labels.pilot')}}</th>
            <th class="has-text-centered">{{$t('labels.departure')}}</th>
            <th class="has-text-centered">{{$t('labels.arrival')}}</th>
            <th class="has-text-centered">{{$t('labels.alternate')}}</th>
            <th class="has-text-centered">{{$t('labels.duration')}}</th>
            <th class="has-text-centered">{{$t('labels.aircraftType')}}</th>
            <th class="has-text-centered">{{$t('labels.registration')}}</th>

          </tr>
        </thead>
        <tbody>
          <tr v-for="(flight, index) in log" :key="index">
            <td>
              {{flight.blockOffTime}}
            </td>
            <td>
              {{flight.blockOnTime}}
            </td>
            <td class="has-text-left">
              {{flight.pilot.name}}
            </td>
            <td>
              {{flight.departure.id}}
            </td>
            <td>
              {{flight.arrival.id}}
            </td>    
            <td>
              {{flight.alternate && flight.alternate.id}}
            </td>            
            <td><FormatTime :value="flight.time" /></td>
            <td>
              {{flight.aircraft && flight.aircraft.type}}
            </td>
            <td>
              {{flight.aircraft && flight.aircraft.registration}}
            </td>
          </tr>
        </tbody>
      </table>
    </section>
  </div>
</template>

<script>
import FormatTime from '../components/FormatTime.vue';
import RangeSelector from '../components/RangeSelector.vue';
import { createNamespacedHelpers  } from 'vuex';
import { GraphQLQueries } from '../data/graphql/queries';
import { request } from 'graphql-request';

const { mapGetters, mapState, mapActions } = createNamespacedHelpers('daterange');
export default {
  data() {
    return {
      log: [],
      loading: true,
    }
  },
  computed: {
    ...mapGetters([
      'range'
    ])
  },
  mounted() {
    this.doQuery();
  },
  methods: {
    async doQuery() {
      console.log('doQuewry');
      this.loading = true;
      console.log(1);
      console.log(this.range);
      const result = await request(process.env.ROOT_GRAPHQL,  GraphQLQueries.GQL_FLIGHT_LOG, {
        start: this.range[0],
        end: this.range[1],
      });
      console.log(result);
      this.log = result.log;
      this.loading = false;
    }
  },
  watch: {
    range() {
      this.doQuery();
    }
  },
  components: {
    FormatTime,
    RangeSelector,
  }
}
</script>

<style>

</style>