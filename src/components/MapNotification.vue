<template>
  <div class="drawer" :class="{ opened: opened }">

    <div class="content">      
      <div v-for="(item, index) in data" :key="index" >
        <NotificationLocation class="mb-2" v-if="item.type==='location'" @closed="closed(index)" :data="item" />
        <NotificationLiveFlight class="mb-2" v-if="item.type==='liveflight'" @closed="closed(index)" :data="item" />
      </div>
    </div>
  </div>
</template>

<script>
import NotificationLocation from '../components/NotificationLocation.vue';
import NotificationLiveFlight from '../components/NotificationLiveFlight.vue';

export default {
  props: {
    // opened: {
    //   type: Boolean,
    //   default: false
    // },
    data: {
      type: Array,
      default: [],
    }
  },
  data() {
    return {
    }
  },
  computed: {
    opened() {
      return !!this.data.length;
    }
  },
  methods: {
    closed(uid) {
      this.$emit('notification-closed', uid);
    }
  },
  components: {
    NotificationLocation,
    NotificationLiveFlight
  },
}
</script>

<style lang="scss">
.content {
  margin-top: 16px;
}

  .drawer {
    background-color: rgba(12, 12, 12, 0.05);
    height: calc(100vh - 52px);
    width: 301px;
    position: absolute;
    top: 0;
    right: -301px;
    z-index: 10000;
    overflow: hidden;
    // border: 1px solid #121212;
    // border-radius: 5px;
    transition:  all 0.2s ease-out ;
    padding: 16px;
    
    &.opened {
      right: 0;
      overflow-y: auto;
    }
  }
</style>