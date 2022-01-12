<template>
  <section class="section">
    <h1 class="title is-5">{{$t('titles.aircraftList')}}</h1>
    <table class="table is-striped is-hoverable is-fullwidth"><!--  is-striped is-hoverable is-narrow  -->
      <thead>
        <tr>
          <th class="has-text-centered">{{$t('labels.registration')}}</th>
          <th class="has-text-centered">{{$t('labels.type')}}</th>
          <th class="has-text-centered">{{$t('labels.name')}}</th>
          <th class="has-text-centered">{{$t('labels.location')}}</th>
          <th class="has-text-centered">{{$t('labels.status')}}</th>
          <th class="has-text-centered">{{$t('labels.state')}}</th>
          <th class="has-text-centered">{{$t('labels.fleet')}}</th>
          <th class="has-text-centered">{{$t('labels.hub')}}</th>
          <th class="has-text-centered">{{$t('labels.flightTIme')}}</th>
          
        </tr>
      </thead>
      <tbody>
        <tr v-for="aircraft in aircrafts" :key="aircraft.id">
          <td>
            {{aircraft.registration}}
          </td>
          <td>
            {{aircraft.type}}
          </td>
          <td>
            {{aircraft.name}}
          </td>
          <td>
            {{aircraft.location.id}}
          </td>
          <td>
            {{aircraft.status}}
          </td>
          <td>
            {{aircraft.state}}
          </td>
          <td>
            {{aircraft.fleet}}
          </td>
          <td>
            {{aircraft.hub}}
          </td>
          <td><FormatTime :value="aircraft.flightTime" /></td>
        </tr>
      </tbody>
    </table>
  </section>
</template>

<script>

import FormatTime from '../components/FormatTime.vue';
import { GraphQLQueries } from '../data/graphql/queries';
import { request } from 'graphql-request';

export default {
  data() {
    return {
      loading: true,
      aircrafts: [],
    }
  },
  mounted() {
    this.doQuery();
  },
  methods: {
    async doQuery() {
      this.loading = true;
      const result = await request(process.env.ROOT_GRAPHQL,  GraphQLQueries.GQL_LIST_AIRCRAFTS);
      this.aircrafts = result.aircrafts;
    },
  },
  components: {
    FormatTime
  }
}
</script>