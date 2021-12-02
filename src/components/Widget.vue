<template>
  <div class="widget" :id="id" @loading="handleLoading">
    <LottieAnimation :hidden="initialized" :width="200" :height="200" :path="animationPath"></LottieAnimation>
    <div :hidden="!initialized || error">
      <slot></slot>
    </div>
    <div :hidden="!error">
      Error
    </div>
  </div>
</template>

<script>
import LottieAnimation from '../components/LottieAnimation.vue';
export default {
  props: {
    height: Number,
    animationPath: {
      type: String,
      default() {
        return `${process.env.STATICS_HOST}/lottie/loading-colour.json`
      }
    }
  },
  data() {
    return {
      id: this.uuid(),
      loading: true,
      error: false,
      initialized: true
    }
  },
  mounted() {
    this.$on('loading', this.handleLoading);
    // this.$on('widget-loaded', () => console.log('loaded'));
    // this.$on('widget-error', () => console.log('error'));
  },
  methods: {
    handleLoading() {
      this.loading = true;
      this.error = false;
    },
    handleInitialized() {
      this.initialized = true;
    },
    handleLoaded() {
      this.loading = false;
    },
    handleFailed() {
      this.error = true;
    },
    uuid() {
      return 'xxxx-xxxx-xxx-xxxx'.replace(/[x]/g, (c) => {  
        const r = Math.floor(Math.random() * 16);  
        return r.toString(16);  
      });  
    }
  },
  components: {
    LottieAnimation
  }
}
</script>

<style lang="scss">
  // .widget {
  //   overflow-x: hidden;
  //   overflow-y: auto;
  // }
</style>