// definir un objeto mixin
export default {
  methods: {
    widgetLoading() {
      this.$parent.handleLoading({ id: this.id})
    },
    widgetLoaded() {
      this.$parent.handleLoaded({ id: this.id})
    },
    widgetFailed() {
      this.$parent.handleFailed({ id: this.id})
    },
    widgetInitialized() {
      this.$parent.handleInitialized({ id: this.id})
    },
  }
}