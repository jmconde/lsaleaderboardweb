<template>
  <div class="notification">
    <h6 class="title is-6">{{$t('titles.onlineActivity')}}</h6>
    <div class="media" v-for="d in data" :key="d.user_id">
      <figure class="media-left">
        <p class="image is-32x32">
          <img class="is-rounded" :src="d.user.avatar" :alt="d.user.name" width="32" />
        </p>
      </figure>
      <div class="media-content">
        <div class="is-size-6 has-text-left has-text-weight-semibold">{{d.user.name}} </div>
          <div class="level mb-1">
            <p class="is-size-7 has-text-left has-text-weight-light" ><small>
              {{d.airline.icao}}{{d.flight_number}}
            </small></p>
            <p class="is-size-7 has-text-left has-text-weight-light" ><small>
              {{d.aircraft.icao}} {{d.aircraft.registration}}
            </small></p>
          </div>
         <div class="level mb-0">
            <div class="is-size-4 has-text-weight-light">{{d.dpt_airport_id}}</div>
            <progress class="progress is-small mb-0 mt-0 ml-1 mr-1" :value="percentageCompleted(d.planned_distance.nmi, d.distance.nmi)" max="100">{{round(d.distance.nmi)}} - {{round(d.planned_distance.nmi)}}</progress>
           <div class="is-size-4 has-text-weight-light">{{d.arr_airport_id}}</div>
         </div>        

        <div class="level mb-0">
          <span class="is-size-7 is-italic">{{d.status_text}}</span>
          <div class="is-size-7 has-text-weight-semibold"><small>{{round(d.distance.nmi)}}nm / {{round(d.planned_distance.nmi)}}nm</small></div>
          <span class="is-size-7 is-italic"><small>Fuel: {{d.aircraft.fuel_onboard}}</small></span>
        </div>
        <p class="is-size-7 has-text-weight-light"><small>{{d.route}}</small></p>

        
      </div>
    </div>
    <div v-if="!data.length">
      <LottieAnimation :width="100" :height="100" :path="`${animationBasePath}/lottie/radar.json`"></LottieAnimation>
      <p>Skies are empty,<br>searching for new flights...</p> 
    </div>
  </div>
</template>

<style lang="scss">
  
</style>

<script>
import axios from 'axios';
import WidgetContentMixin from '../../mixins/WidgetContentMixin';
import LottieAnimation from '../LottieAnimation.vue';

export default {
  data() {
    return {
      data: [],
      timeoutId: null,
    }
  },
  async mounted() {
    await this.loadData();
    this.widgetInitialized();
  },
  mixins: [WidgetContentMixin],
  computed: {
    animationBasePath() {
      return process.env.STATICS_HOST;
    }
  },
  methods: {
    loop() {
      clearTimeout(this.timeoutId);
      this.timeoutId = setTimeout(this.loadData, 10000);
    },
    round(num) {
      return Math.round(num);
    },
    percentageCompleted(xt, x) {
      return Math.round((x * 100) / xt);
    },
    async loadData() {
      this.widgetLoading();
      try {
        const { data } = await axios.get(`${process.env.ROOT_API}/acars`);
        this.widgetLoaded();
        this.data = data.data.sort((a,b) => {
          return (new Date(a.created_at).getTime() - new Date(b.created_at).getTime());
        });
        this.loop();
      } catch(err) {
        this.widgetFailed();
      }
    }
  },
  components: {
    LottieAnimation
  }
}
</script>