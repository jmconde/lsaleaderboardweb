<template>
<span>{{hours}}<small class="ml-1 is-size-6 is-uppercase has-text-weight-light">h</small> {{minutes}}<small class="ml-1 is-size-6 is-uppercase has-text-weight-light">m</small></span>  
</template>

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
      return Math.floor(this.value / 60);;
    },
    minutes() {
      return Math.round((this.value % 60));
    },
  }
}
</script>