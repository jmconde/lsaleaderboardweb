<template>
  
  <section class="section">
    <LeafletMapModal :show="showMap" 
      tiles-url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" 
      attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
      :type="mapType"
      :markers="markers"
      :polylines="polylines"
      @modal-closed="modalClosed"
      />
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
            <a href="#"  @click="showLocation(pilot)" class="has-text-weight-semibold">{{pilot.location.id}}</a>
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
                <a href="#" @click="showRoute(pilot)" class="route-link">
                  {{pilot.lastFlight.departure.id}} - {{pilot.lastFlight.arrival.id}}
                </a>
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

import LeafletMapModal from '../components/LeafletMapModal.vue';
import FormatTime from '../components/FormatTime.vue';
import FormatDistance from '../components/FormatDistance.vue';
import { GraphQLQueries } from '../data/graphql/queries';
import { request } from 'graphql-request';
import { customIcons } from '../data/MapHelper';
import { latLng } from 'leaflet';

export default {
  data() {
    return {
      loading: true,
      pilots: [],
      mapType: 'location',
      showMap: false,
      markers: [],
      polylines: [],
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

    showLocation(pilot) {
      console.log('pilot', pilot);
      const latlng = latLng(pilot.location.lat, pilot.location.lon);
      this.mapType = 'location'; 
      this.markers = [{
        latlng,
        icon: customIcons.iconHere
      }];
      this.showMap = true;
    },
    
    showRoute(pilot) {
      const latlng1 = latLng(pilot.lastFlight.arrival.lat, pilot.lastFlight.arrival.lon);
      const latlng2 = latLng(pilot.lastFlight.departure.lat, pilot.lastFlight.departure.lon);

      this.mapType = 'route'; 
      this.markers =  [{
        latlng: latlng1,
        icon: customIcons.iconLanding
      }, {
        latlng: latlng2,
        icon: customIcons.iconTakeoff
      }];
      this.polylines = [{
        latlngs: [[latlng2.lat, latlng2.lng], [latlng1.lat, latlng1.lng]],
        color: '#DA53D4',
        weight: 1,
        dashArray: '6 3 2 3'
      }];
      this.showMap = true;
    },
    modalClosed() {
      this.markers = [];
      this.polylines = [];
      this.showMap = false;
    },
  },
  components: {
    FormatTime,
    FormatDistance,
    LeafletMapModal,
  }
}
</script>