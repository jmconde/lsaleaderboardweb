<template>
  <div class="notification is-info is-light">
    <h1 class="title is-size-6">{{title}}</h1>
    <div class="level">
      <div v-for="(metric, index) in data.main" :key="index" class="level-item has-text-centered">
        <div>
          <div class="heading">
            {{metric.label}}
          </div>
          <div class="title">
            <FormatTime v-if="metric.format === 'time'" :value="metric.value" />
            <FormatDistance v-else-if="metric.format === 'distance'" :value="metric.value" />
            <span v-else>{{metric.value}}</span>
          </div>
        </div>
      </div>
    </div>

    <div class="level">
      <div v-for="(metric, index) in data.secondary" :key="index"  class="level-item has-text-centered">
        <small>
          <div class="heading">
            {{metric.label}}
          </div>
          <div class="is-size-5 has-text-weight-bold">
            <FormatTime v-if="metric.format === 'time'" :value="metric.value" />
            <FormatDistance v-else-if="metric.format === 'distance'" :value="metric.value" />
            <span v-else>{{metric.value}}</span>
          </div>
        </small>
      </div>
    </div>
  </div>
</template>

<script>
import FormatTime from  './FormatTime.vue';
import FormatDistance from  './FormatDistance.vue';
export default {
  props: {
    title: String,
    data: {
      type: Object,
      default() {
        return {
          main: [],
          secondary: [],
        }
      }
    }
  },
  data() {
    return {}
  },
  components: {
    FormatTime,
    FormatDistance
  }
}
</script>