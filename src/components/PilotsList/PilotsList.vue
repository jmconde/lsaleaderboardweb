<template src="./pilot-list.html">
</template>

<script>

import axios from 'axios';
import { latLng } from 'leaflet';
import { customIcons } from '../../data/MapHelper';

export default {
  props:{
    id: String
  },
  data() {
    return {
      pilots: []
    }
  },
  async mounted() {
    await this.loadData();
    // this.widgetInitialized();
  },
  methods: {
    async loadData() {
      // console.log('this.$parent :>> ', this.$parent);
      // this.widgetLoading();
      this.$emit('loading', { id: this.id });
      try {
        const { data } = await axios.get(`${process.env.ROOT_API}/pilots`);
        const { pilots, lastUpdated, version } = data;
        this.pilots = pilots;
        // this.widgetLoaded();
        // console.log('this.pilots :>> ', this.pilots);
      } catch(err){
        // this.widgetFailed();
      }
      
    },
    feedItemIcon(pilot) {
      try {
        return require(`../../assets/img/ranks/${pilot._decorators._rankImageCode.code}.png`)
      } catch(err) {
        console.log(err);
      }
    },
    showRoute(pilot) {
       const latlng1 = latLng(pilot._decorators._location.lat, pilot._decorators._location.lon);
       const latlng2 = latLng(pilot._decorators._previousLocation.lat, pilot._decorators._previousLocation.lon);
        // console.log(latlng1, latlng2);
       this.$emit('show-map', {
        type: 'route',
        markers: [{
          latlng: latlng1,
          icon: customIcons.iconLanding
        }, {
          latlng: latlng2,
          icon: customIcons.iconTakeoff
        }],
        polylines: [{
          latlngs: [[latlng2.lat, latlng2.lng], [latlng1.lat, latlng1.lng]],
          color: '#DA53D4',
          weight: 1,
          dashArray: '6 3 2 3'
        }]
      });
    },
    showLocation(pilot) {
      const latlng = latLng(pilot._decorators._location.lat, pilot._decorators._location.lon);
      this.$emit('show-map', {
        type: 'location',
        markers: [{
          latlng,
          icon: customIcons.iconHere
        }]
      });
    },
    getCaretIcon(diff) {
      if (diff < 0) return 'caret-up';
      else if (diff > 0) return 'caret-down';
      else return 'caret-right';
    },
    getCaretClass(diff) {
      if (diff < 0) return 'has-text-success';
      else if (diff > 0) return 'has-text-danger';
      else return 'has-text-grey-lighter';
    }
  }
}
</script>

<style lang="scss">

.rank-image {
    width: 28px;
    margin-right: 4px;
}
.info-card {
    &-first-row{
        font-size: 15px;
        font-weight: 600;
    }
    &-second-row{
        .tag{
            font-weight: 400;
        }
    }
}

.danger {
    background-color: #FEFFEC !important;
}

.arrow-diff {
    margin-right: 5px;

    &.fa {
        font-size: 12px;
    }
    &.diff-stable {
        color: #e8e8e8;
    }
    &.diff-up {
        color: green;
    }
    &.diff-down {
        color: red;
    }
}
</style>