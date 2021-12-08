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
    </div>
    <div class="level-right">
      <button class="button is-primary is-light is-small mr-1" @click="decrementRangeClicked" :disabled="!hasPrevious()">
        <font-awesome-icon icon="angle-left"></font-awesome-icon>
      </button>
      <div class="level-item has-text-right">{{getRangeText()}}</div>
      <button class="button is-primary is-light is-small ml-1" @click="incrementRangeClicked" :disabled="!hasNext()">
        <font-awesome-icon icon="angle-right"></font-awesome-icon>
      </button>
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
}];

const DATE_FORMAT = 'YYYY-MM-DD';

export default {
  data() {
    return {
      minDate: Vue.moment().subtract(6, 'month'),
      date: Vue.moment(),
      period: 'month',
      periods: PERIODS,
      months: [],
      weeks: [],
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
    // months() {
    //   return [
    //     'Diciembre',
    //     'Noviembre'
    //   ]
    // },
    // weeks() {
    //   return [

    //   ];
    // }
  },
  mounted() {
    console.log(Vue.moment().get('week'));
    this.months = [11, 10, 9];
    this.weeks = [];
  },
  watch: {
    range() {
      console.log(this.range);
      this.$emit('range-change', this.range);
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
  },
}
</script>