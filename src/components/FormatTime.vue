<template>
<span>
  <span v-if="value">{{hours}}<small class="distance-units is-uppercase has-text-weight-light">h</small> {{minutes}}<small class="distance-units is-uppercase has-text-weight-light">m</small></span>
  <span v-else>-</span>
</span>
</template>

<style lang="scss">
  .distance-units{
    font-size: 60%;
    margin-left: 2px;
  }
</style>

<script>
export default {
  props: ['value'],
  
  // data(){
  //   return {
  //     hours: String,
  //     minutes: String,
  //   }
  // },
  computed: {
    hours() {
      return Number.isNaN(this.value) ? 0 : Math.floor(this.value / 60);;
    },
    minutes() {
      return Number.isNaN(this.value) ? 0 :Math.round((this.value % 60));
    },
  }
}
</script>