<template>
  
  <section class="section">
    <h1 class="title is-5">{{$t('titles.alltime')}}</h1>
    <table class="table is-striped is-hoverable is-fullwidth"><!--  is-striped is-hoverable is-narrow is-fullwidth -->
      <thead>
        <tr>
          <th class="has-text-centered">{{$t('labels.pilot')}}</th>
          <th class="has-text-centered">{{$t('labels.location')}}</th>
          <th class="has-text-centered">{{$t('metrics.flightHours')}}</th>
          <th class="has-text-centered">{{$t('labels.totalFlights')}}</th>
          <th class="has-text-centered">{{$t('labels.averageTotalFlights')}}</th>
          <th class="has-text-centered">{{$t('labels.lastFlight')}}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="pilot in pilots" :key="pilot.id">
          <td class="has-text-left">
            <div class="info-card">
              <div class="info-card-first-row">
                {{pilot.pilotId}} {{pilot.name}}
              </div>
              <div class="info-card-second-row">
                <img :src="feedItemIcon(pilot)" :title="pilot.rankName" :alt="pilot.rankName" class="rank-image">
                <img v-if="pilot.country" :src="require(`../assets/img/flags/${pilot.country}.png`)" :alt="pilot.country" :title="pilot.country">
              </div>
            </div>
          </td>
          <td class="has-text-centered">
            <!-- <a href="#" @click="showLocation(pilot)" class="location-link">{{pilot.location}}</a> -->
            <span class="has-text-weight-semibold">{{pilot.location}}</span>
          </td>
          <td class="has-text-centered">
            <!-- <font-awesome-icon v-if="pilot.seconds" :icon="getCaretIcon(pilot._decorators._diff)" :class="getCaretClass(pilot._decorators._diff)" />
            <span>{{pilot.hours}}</span> -->
            <FormatTime :value="pilot.flightTime" />
          </td>
          <td class="has-text-centered">{{pilot.flights || '-'}}</td>
          <td class="has-text-centered"><FormatTime :value="pilot.flightTime / pilot.flights" /></td>
          <td class="has-text-left">
            <div class="info-card" v-if="pilot.lastFlight">
              <div class="info-card-first-row">
                <!-- <a href="#" @click="showRoute(pilot)" class="route-link">
                  {{pilot.lastFlight.departure}} - {{pilot.lastFlight.arrival}}
                </a> -->
                <span class="has-text-weight-semibold">{{pilot.lastFlight.departure}} - {{pilot.lastFlight.arrival}}</span>
              </div>
              <div class="info-card-second-row">
                <div class="">
                  <span class="tag is-light is-success"><FormatDistance :value="pilot.lastFlight.distance" /></span>
                  <span class="tag is-light is-primary"><FormatTime :value="pilot.lastFlight.time" /></span>
                  <span class="tag is-light is-info">{{getDate(pilot.lastFlight.date) | moment('from', 'now')}}</span>
                </div>                        
              </div>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </section>
</template>

<script>

import FormatTime from '../components/FormatTime.vue'
import FormatDistance from '../components/FormatDistance.vue'
import { GraphQLQueries } from '../data/graphql/queries';
import { request } from 'graphql-request'

export default {
  data() {
    return {
      loading: true,
      pilots: [],
    }
  },
  mounted() {
    this.doQuery();
  },
  methods: {
    async doQuery() {
      this.loading = true;
      const result = await request(process.env.ROOT_GRAPHQL,  GraphQLQueries.GQL_LIST_PILOTS);
      this.pilots = result.pilots;
    },
    feedItemIcon(pilot) {
      try {
        return require(`../assets/img/ranks/0${pilot.rankId}.png`)
      } catch(err) {
        console.log(err);
      }
    },
    getDate(d) {
      return new Date(Number(d));
    },
  },
  components: {
    FormatTime,
    FormatDistance
  }
}
</script>