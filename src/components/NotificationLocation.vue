<template>
  <div class="notification has-text-left">
    <button @click="close" class="delete"></button>
    <h5 class="mb-1">{{data.id}} - {{data.name}}</h5>
    <p class="is-italic" ><small>{{data.location}}, {{getCountryName(data.country)}}<br/>{{data.elevation | formatNumber}} ft. ({{data.lat}}, {{data.lon}})</small></p>
    <h6 v-if="data.pilots && data.pilots.length" class="mb-1">Pilots</h6>
    <div class="mb-1" v-for="(pilot) in data.pilots" :key="pilot.id">
      <div class="level mb-0">
      <span>{{pilot.pilotId}}</span>
      <span>{{pilot.name}}</span>
      </div>
    </div>
    <h6 v-if="data.aircrafts && data.aircrafts.length" class="mt-3 mb-1">Aircrafts</h6>
    <div class="aircraft mb-1" v-for="(aircraft) in data.aircrafts" :key="aircraft.id">
      <div class="level mb-0">
        <span class="is-uppercase">{{aircraft.registration }}</span>
        <span>{{aircraft.type}}</span>
      </div>
      <span class="is-italic has-text-weight-light"><small>{{aircraft.fleet}}</small></span>
    </div>
  </div>
</template>

<script>
import { getCountryName } from '../data/countries';

export default {
  props: ['data'],
  methods: {
    getCountryName(code) {
      return getCountryName(code);
    },
    close() {
      this.$emit('closed');
    },
  }
}
</script>

<style lang="scss" scoped>
  .aircraft span{
    line-height: 1rem;
  }
</style>