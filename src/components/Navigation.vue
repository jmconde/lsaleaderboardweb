<template>
  <nav class="navbar" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <a class="navbar-item" href="#">
        <img src="../assets/img/logo_28.png" height="28">
      </a>

      <a role="button" @click="toggleBurger" ref="navBurger" class="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
        <span aria-hidden="false"></span>
        <span aria-hidden="false"></span>
        <span aria-hidden="false"></span>
      </a>
    </div>

    <div id="navbarBasicExample" class="navbar-menu" ref="navMenu">
      <div class="navbar-start">
        <router-link class="navbar-item" to="/">{{$t('menu.home')}}</router-link>
        <router-link class="navbar-item" to="/alltime">{{$t('menu.alltime')}}</router-link>
        <router-link class="navbar-item" to="/log">{{$t('menu.flightlog')}}</router-link>
        <router-link class="navbar-item" to="/aircrafts">{{$t('menu.aircrafts')}}</router-link>
        <router-link class="navbar-item" to="/live">{{$t('menu.livemap')}}</router-link>
        <!-- <router-link class="navbar-item" to="/test">Test</router-link> -->

        <!-- <div class="navbar-item has-dropdown is-hoverable">
          <a class="navbar-link">
            More
          </a>

          <div class="navbar-dropdown">
            <a class="navbar-item">
              About
            </a>
            <a class="navbar-item">
              Jobs
            </a>
            <a class="navbar-item">
              Contact
            </a>
            <hr class="navbar-divider">
            <a class="navbar-item">
              Report an issue
            </a>
          </div>
        </div> -->
      </div>

      <div class="navbar-end">
        <div class="navbar-item has-dropdown is-hoverable lang-dropdown">
          <a class="navbar-link is-arrowless">
            <img :src="lang.image" alt="">
          </a>

          <div class="navbar-dropdown is-boxed is-right">
            <a v-for="lang in langs" :key="lang.locale" class="navbar-item" @click="changeLocale(lang)">
              <img :src="lang.image" :alt="lang.name">
              <span>{{lang.name}}</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import Vue from 'vue';
const LANGS =  [{
  locale: 'en',
  image: 'https://cdn0.iconfinder.com/data/icons/all-national-flags-of-the-world-very-high-quality-/283/usa-512.png',
  name: 'English',
}, {
  locale: 'es',
  image: 'https://cdn0.iconfinder.com/data/icons/all-national-flags-of-the-world-very-high-quality-/283/colombia-512.png',
  name: 'Español',
}];
export default {
  data () {
    return { 
      lang: LANGS[1],
      langs: LANGS,
     }
  },
  methods: {
    changeLocale(lang) {
      console.log('locale cahnged to', lang.locale);
      this.$moment.locale(lang.locale);
      this.lang = lang;
      this.$root.$i18n.locale = lang.locale
    },
    toggleBurger() {
      console.log('toggle');
      this.$refs.navBurger.classList.toggle("is-active");
      this.$refs.navMenu.classList.toggle("is-active");
    }
  }
}
</script>