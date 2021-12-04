<template>
<span>{{formatted | formatNumber}}<small class="ml-1 is-size-7 is-uppercase has-text-weight-light">nm</small></span>  
</template>

<script>
export default {
  props: ['value',],
  computed: {
    formatted() {
      if (!this.value) { return 0;}
      return Math.round(this.value);
    }
  }
}
</script>