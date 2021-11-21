<template>
  <div class="container">
    <section class="section">
      <PilotsList></PilotsList>
    </section>
  </div>
</template>
<script>
import Header from '../components/Header/Header.vue';
import Footer from '../components/Footer/Footer.vue';
import PilotsList from '../components/PilotsList/PilotsList.vue';

export default {
  data() {
    return {
      version: '',
      lastUpdated: '',
      pilotsList: []
    }
  },
  components: {
    Header,
    Footer,
    PilotsList
  }
}
</script>

<style lang="scss">
  .logo {
      width: 150px;
  }
</style>