<template>
  <div id="app">
    <Header></Header>
    <!-- <div class="nav">
      <router-link to="/">Home</router-link>|<router-link to="/leaderboard">About</router-link>
    </div> -->
    <router-view></router-view>
    <Footer :version="'2.0.0-beta.1'" last-updated=""></Footer>
  </div>
</template>
<script>
import Header from './components/Header/Header.vue';
import Footer from './components/Footer/Footer.vue';

export default {
  components: {
    Header,
    Footer
  },
}
</script>

<style lang="scss">
  $box-shadow: 1px 1px 1px 0 #eee;
  $box-padding: 8px;
  $body-font-size: 0.8em;

  @import url('https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300;0,500;1,300&display=swap');
  // @import '../node_modules/bulma/sass/base/_all.sass';
  // @import '../node_modules/bulma/sass/utilities/_all';
  // @import '../node_modules/bulma/sass/helpers/_all';
  // @import "../node_modules/bulma/sass/components/level.sass";
  // @import "../node_modules/bulma/sass/components/media.sass";
  // @import "../node_modules/bulma/sass/components/modal.sass";
  // @import "../node_modules/bulma/sass/elements/box.sass";
  // @import "../node_modules/bulma/sass/elements/container.sass";
  // @import "../node_modules/bulma/sass/elements/table.sass";
  // @import "../node_modules/bulma/sass/elements/tag.sass";
  // @import "../node_modules/bulma/sass/elements/title.sass";
  // @import "../node_modules/bulma/sass/layout/section.sass";
  // @import "../node_modules/bulma/sass/layout/footer.sass";
  // // dashbboard
  // @import "../node_modules/bulma/sass/grid/_all.sass";
  @import '~bulma/bulma';
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