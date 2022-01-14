<template>
  <div class="notification has-text-left">
    <button @click="close" class="delete"></button>

    <h5 class="mb-3">{{data.user.name}}</h5>
    <h6 class="mb-0">{{data.dpt_airport.icao}} - {{data.arr_airport.icao}}</h6>
    <p class="is-italic"><small>{{data.status_text}}</small></p>
    
    <div v-if="data.route" class="mb-1">
      <p  class="is-size-7 has-text-weight-light"><small>{{data.route}}</small></p>
    </div>

    <div class="columns mb-0 has-text-centered">
      <div class="column p-1 is-size-7">
        <small class="is-uppercase has-text-weight-semibold">Altitude</small>
        <br/>{{data.position.altitude | formatNumber}} ft
      </div>
      <div class="column p-1 is-size-7"><small class="is-uppercase has-text-weight-semibold">Heading</small><br/>{{data.position.heading}}&#186; </div>
    </div>
    <div class="level mb-0 has-text-centered">
      <div class="column p-1 is-size-7"><small class="is-uppercase has-text-weight-semibold">Ground Speed</small><br/>{{data.position.gs}} kt </div>
      <div class="column p-1 is-size-7 "><small class="is-uppercase has-text-weight-semibold">Vertical Speed</small><br/>{{data.position.vs}} ft/min </div>
    </div>
  </div>
</template>

<script>
import { getCountryName } from '../data/countries';

export default {
  props: ['data'],
  methods: {
    close() {
      this.$emit('closed');
    },
  }
}
</script>

<style>

</style>