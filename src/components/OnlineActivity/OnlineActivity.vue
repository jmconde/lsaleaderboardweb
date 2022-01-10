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
        <div class="level mb-1">
          <div class="is-size-6 has-text-left has-text-weight-semibold">{{d.user.name}}</div>
          <img v-if="d.isInIvao" :src="require(`../../assets/img/icao_logo_white.svg`)">
        </div>
        <div class="level mb-1">
          <p class="is-size-7 has-text-left has-text-weight-light" ><small>
            {{d.airline.icao}}{{d.flight_number}}
          </small></p>
          <p class="is-size-7 has-text-left has-text-weight-light" ><small>
          {{d.status_text}}
          </small></p>
          <p class="is-size-7 has-text-left has-text-weight-light" ><small>
            {{d.aircraft.icao}} {{d.aircraft.registration}}
          </small></p>
        </div>
         <div class="level mb-0 is-relative">
            <div class="is-size-4 has-text-weight-light">{{d.dpt_airport_id}}</div>
            <progress class="progress is-small mb-0 mt-0 ml-1 mr-1" :value="percentageCompleted(d.planned_distance.nmi, d.distance.nmi)" max="100">
            </progress>
            <div class="is-size-4 has-text-weight-light">{{d.arr_airport_id}}</div>
            <div class="distance"><small>{{round(d.distance.nmi)}}nm / {{round(d.planned_distance.nmi)}}nm</small></div>
         </div>        
        <p class="is-size-7 has-text-weight-light"><small>{{d.route}}</small></p>

        <div class="level mb-0">
           <span class="is-size-7"><small class="is-uppercase has-text-weight-semibold">Altitude</small><br/>{{d.position.altitude | formatNumber}} ft</span>
           <span class="is-size-7"><small class="is-uppercase has-text-weight-semibold">Heading</small><br/>{{d.position.heading}}&#186; </span>
           <span class="is-size-7"><small class="is-uppercase has-text-weight-semibold">Ground Speed</small><br/>{{d.position.gs}} kt </span>
           <span class="is-size-7 "><small class="is-uppercase has-text-weight-semibold">Vertical Speed</small><br/>{{d.position.vs}} ft/min </span>
        </div>

        
      </div>
    </div>
    <div v-if="!data.length">
      <LottieAnimation :width="100" :height="100" :path="`${animationBasePath}/lottie/radar.json`"></LottieAnimation>
      <p>Skies are empty,<br>searching for new flights...</p> 
    </div>
  </div>
</template>

<style lang="scss">
  .distance {
    color: #aaa;
    position: absolute;
    width: 100%;
    font-size: 80%;
  }
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
        // this.widgetFailed();
        this.loop();
      }
    }
  },
  components: {
    LottieAnimation
  }
}
</script>