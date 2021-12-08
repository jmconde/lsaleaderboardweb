<template>
  <div id="app" class="container">
    <!-- <div class="nav">
      <router-link to="/">Home</router-link>|<router-link to="/leaderboard">About</router-link>
    </div> -->
    <Navigation />
    <router-view></router-view>
    <Footer :version="version" class="mt-6"></Footer>
  </div>
</template>
<script>
import Navigation from './components/Navigation.vue';
import Header from './components/Header/Header.vue';
import Footer from './components/Footer/Footer.vue';

export default {
  components: {
    Header,
    Footer,
    Navigation,
  },
  computed: {
    version() {
      return window.__GLOBALS.version;
    }
  }
}
</script>

<style lang="scss">
  $brown: #967756;
  $orange: #F3AD41;

  $primary: $brown;
  $info: $orange;

  // $notification-background-color: #967756;
  $box-shadow: 1px 1px 1px 0 #eee;
  $box-padding: 8px;
  $body-font-size: 0.8em;

  @import url('https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300;0,500;1,300&display=swap');
  @import '../node_modules/bulma/sass/utilities/_all';
  @import '../node_modules/bulma/sass/base/_all.sass';
  @import "../node_modules/bulma/sass/grid/_all.sass";
  @import '../node_modules/bulma/sass/helpers/_all';
  @import "../node_modules/bulma/sass/components/navbar.sass";
  @import "../node_modules/bulma/sass/components/level.sass";
  @import "../node_modules/bulma/sass/components/media.sass";
  @import "../node_modules/bulma/sass/components/modal.sass";
  @import "../node_modules/bulma/sass/elements/progress.sass";
  @import "../node_modules/bulma/sass/elements/button.sass";
  @import "../node_modules/bulma/sass/elements/image.sass";
  @import "../node_modules/bulma/sass/elements/container.sass";
  @import "../node_modules/bulma/sass/elements/notification.sass";
  @import "../node_modules/bulma/sass/elements/table.sass";
  @import "../node_modules/bulma/sass/elements/tag.sass";
  @import "../node_modules/bulma/sass/elements/title.sass";
  @import "../node_modules/bulma/sass/layout/section.sass";
  @import "../node_modules/bulma/sass/form/shared.sass";
  @import "../node_modules/bulma/sass/form/select.sass";
  // @import "../node_modules/bulma/sass/layout/footer.sass";
  // @import '../'
  // // dashbboard
  // @import '~bulma/bulma';
  :root {
    --font: 'Open Sans', sans-serif;
    --textColor: #374961;
    --linkActiveColor: #41b783;
  }

  #app {
    font-family: var(--font);
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: var(--textColor);

    .logo {
      width: 150px;
    }
  }

  .nav {
    padding: 30px 0 100px 0;

    a {
      font-weight: 500;
      color: var(--textColor);
      margin: 0 5px;
    }

    a.router-link-exact-active {
      color: var(--linkActiveColor);
    }
  }
</style>