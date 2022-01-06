<template>
  <div class="level">
    <div class="level-left">
      <div class="level-item select is-primary is-light isx-rounded is-small">
        <select v-model="period">
          <option v-for="option in periods" :value="option.value" :key="option.value">
            {{$t(option.name)}}
          </option>
        </select>
      </div>
      <div class="level-item is-flex">
        <button class="button is-primary is-small mr-1" @click="decrementRangeClicked" :disabled="!hasPrevious()">
          <font-awesome-icon icon="angle-left"></font-awesome-icon>
        </button>
        <div class="has-text-weight-semibold has-text-centered">{{getRangeText()}}</div>
        <button class="button is-primary is-small ml-1" @click="incrementRangeClicked" :disabled="!hasNext()">
          <font-awesome-icon icon="angle-right"></font-awesome-icon>
        </button>
      </div>
    </div>
    <div class="level-right">
      <div>
        <span v-if="!loading" class="mr-1 has-text-primary">{{$tc('labels.reloadIn', countdown, {countdown}) }}</span>
        <span v-else class="mr-1 has-text-primary">{{$t('labels.updating') }}</span></div>
        
        <a class="button is-white is-small is-rounded" @click="updateNow">
         <font-awesome-icon class="has-text-primary" icon="sync" :spin="loading"></font-awesome-icon>
        </a>
      </div>
  </div>
</template>

<style lang="scss">
</style>

<script>
import Vue from 'vue';

const PERIODS = [{
  name: 'range.monthly',
  value: 'month'
}, {
  name: 'range.weekly',
  value: 'week'
}, {
  name: 'range.daily',
  value: 'day'
}];

const DATE_FORMAT = 'YYYY-MM-DD';
const SECONDS_TO_RELOAD = 60;

export default {
  props: {
    loading: Boolean,
    seconds: {
      type: Number,
      default() {
        return SECONDS_TO_RELOAD;
      }
    }
  },
  data() {
    return {
      minDate: Vue.moment().subtract(6, 'month'),
      date: Vue.moment(),
      period: 'month',
      periods: PERIODS,
      months: [],
      weeks: [],
      interval: null,
      countdown: this.seconds,
      countdownEnabled: true,
    };
  },
  computed: {
    range() {
      return [ this.start.format(DATE_FORMAT), this.end.format(DATE_FORMAT)];
    }, 
    start() {
      return this.date.clone().startOf(this.period);
    },
    end() {
      return this.date.clone().endOf(this.period);
    },
  },
  mounted() {
    this.months = [11, 10, 9];
    this.weeks = [];
  },
  beforeRouteLeave(to, from, next) {
    console.log('interval cleared');
    clearInterval(this.interval);
    next();
  },
  watch: {
    loading(a, b) {
      if (!this.loading) {
        this.startCountDown();
      }
    },
    range() {
      this.updateNow();
    }
  },
  methods: {
    getRangeText() {
      let text = '';
      switch (this.period) {
        case 'month':
          text = this.date.format('MMMM');
          break;
        case 'week':
          text = `${this.start.format(DATE_FORMAT)} - ${this.end.format(DATE_FORMAT)}`
          break;
        case 'day':
          text = `${this.start.format(DATE_FORMAT)}`
          break;
        default:
          break;
      }
      return text;
    },
    decrementRangeClicked() {
      this.date = this.date.clone().subtract(1, this.period);
    },
    incrementRangeClicked() {
      this.date = this.date.clone().add(1, this.period);
    },
    hasPrevious() {
      return this.date.clone().subtract(1, this.period).isAfter(this.minDate);
    },
    hasNext() {
      return this.date.clone().add(1, this.period).isBefore(Vue.moment());
    },
    startCountDown() {
      clearInterval(this.interval);
      this.countdown = this.seconds;
      if (this.countdownEnabled) {
        this.interval = setInterval(this.countdownCheck, 1000);
      } 
    },
    countdownCheck() {
      this.countdown--;
      if (this.countdown <= 0) {
        this.updateNow();
      }
    },
    updateNow() {
      clearInterval(this.interval);
      this.$emit('range-change', this.range);
    },
  },
}
</script>