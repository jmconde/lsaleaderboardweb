<template>
  <div id="app">
    <Header />
    <div class="nav">
      <router-link to="/">Home</router-link>|<router-link to="/leaderboard"
        >About</router-link
      >
    </div>
    <router-view />
  </div>
</template>
<script>
import Header from './components/Header/Header.vue';

export default {
  components: {
    Header
  }
}
</script>

<style lang="scss">
  @import url('https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300;0,500;1,300&display=swap');
  @import '../node_modules/bulma/sass/base/_all.sass';
  @import '../node_modules/bulma/sass/utilities/_all';
  @import "../node_modules/bulma/sass/components/modal.sass";
  @import "../node_modules/bulma/sass/elements/box.sass";
  @import "../node_modules/bulma/sass/elements/container.sass";
  @import "../node_modules/bulma/sass/elements/table.sass";
  @import "../node_modules/bulma/sass/elements/tag.sass";
  @import "../node_modules/bulma/sass/layout/section.sass";
  @import "../node_modules/bulma/sass/layout/footer.sass";
  // dashbboard
  @import "../node_modules/bulma/sass/grid/_all.sass";

  :root {
    --font: Roboto, sans-serif;
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