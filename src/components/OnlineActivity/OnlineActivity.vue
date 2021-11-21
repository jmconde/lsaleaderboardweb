<template>
  <div class="notification">
    <h5 class="title is-5">Realtime activity</h5>
    <div class="media" v-for="d in data" :key="d.user_id">
      <figure class="media-left">
        <p class="image is-32x32">
          <img :src="d.user.avatar" :alt="d.user.name" width="32" />
        </p>
      </figure>
      <div class="media-content">
        <div class="level">
          <div class="has-text-left">
            <div class="is-size-6 has-text-left has-text-weight-semibold">{{d.user.name}}</div>
            <span class="tag is-dark">{{d.status_text}}</span>
          </div>
          <div>
            <div class="has-text-right is-size-7">{{d.dpt_airport_id}} - {{d.arr_airport_id}}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      data: null
    }
  },
  async mounted() {
    const { data } = await axios.get('http://gairacalabs.xyz:3100/api/acars');
    console.log('data :>> ', data);
    this.data = data.data;
  }
}
</script>