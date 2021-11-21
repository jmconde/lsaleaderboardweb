<template>
  <div class="container">
    <section class="section">
      <Header></Header>
      <PilotsList :pilots="pilotsList"></PilotsList>
    </section>
    <Footer :version="version" last-updated="lastUpdated"></Footer>
  </div>
</template>
<script>
import Header from '../components/Header/Header.vue';
import Footer from '../components/Footer/Footer.vue';
import PilotsList from '../components/PilotsList/PilotsList.vue';
import axios from 'axios';

export default {
  data() {
    return {
      version: '',
      lastUpdated: '',
      pilotsList: []
    }
  },
  async mounted() {
    const { data } = await axios.get('http://localhost:3100/api/pilots');
    const { pilots, lastUpdated, version } = data;
    this.pilotsList = pilots;
    this.version = version;
    this.lastUpdated = lastUpdated;
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