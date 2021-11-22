<template>
  <div :id="id" @loading="handleLoading">
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
    animationPath: {
      type: String,
      default: 'http://localhost:3100/lottie/loading-colour.json'
    }
  },
  data() {
    return {
      id: crypto.randomUUID(),
      loading: true,
      error: false,
      initialized: false
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
  },
  components: {
    LottieAnimation
  }
}
</script>