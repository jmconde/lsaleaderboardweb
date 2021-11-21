<template>
  <table class="table is-striped is-narrow is-fullwidth">
    <tr>
      <th class="has-text-centered">Pilot</th>
      <th class="has-text-centered">Current Location</th>
      <th class="has-text-centered">Fight hours</th>
      <th class="has-text-centered">Total Flights</th>
      <th class="has-text-centered">Average Time per flight</th>
      <th class="has-text-centered">Last Flight</th>
    </tr>
    <tr :class="pilot._decorators._trClasses" v-for="pilot in pilots" :key="pilot.userId">
      <td>
        <div class="info-card">
          <div class="info-card-first-row">
            {{pilot.name}}
          </div>
          <div class="info-card-second-row">
            <img :src="'/images/ranks/' + pilot._decorators._rankImageCode.code + '.png'" :title="pilot._decorators._rankImageCode.rank" :alt="pilot._decorators._rankImageCode.rank" class="rank-image">
            <img v-if="pilot.countryCode" :src="'/images/flags/' + pilot.countryCode + '.png'" :alt="pilot.country" :title="pilot.country">
          </div>
        </div>
      </td>
                <!-- td
                  .info-card 
                    .info-card-first-row #{user.name}
                    .info-card-second-row
                    img.rank-image(src="/images/ranks/" + user._decorators._rankImageCode.code +".png", alt=user._decorators._rankImageCode.rank)
                    if user.countryCode
                      img(src="/images/flags/" + user.countryCode + ".png", alt=user.country, title=user.country)
                td.has-text-centered
                  a(href="#", class="location-link", data-lat=user._decorators._location.lat, data-lon=user._decorators._location.lon) #{user.location}
                td.has-text-centered
                  i(class="arrow-diff " + user._decorators._diff)
                  span #{user.hours}
                td.has-text-centered #{user.flights}
                td.has-text-centered #{user.minutesPerFlight}
                td
                  if user._decorators._lastFlight
                    .info-card-first-row
                      a.route-link(href="#", data-lat=user._decorators._location.lat, data-lon=user._decorators._location.lon, data-prevlat=user._decorators._previousLocation.lat,  data-prevlon=user._decorators._previousLocation.lon) #{user._decorators._lastFlight.origin} - #{user._decorators._lastFlight.destination}
                    .info-card-second-row
                      .tag.has-addons 
                        span.tag.is-light.is-success #{user._decorators._distance}nm
                        span.tag.is-light.is-primary #{user._decorators._lastFlight.time}
                        span.tag.is-light.is-info #{user._decorators._lastFlight.fromNow} -->
    </tr>
  </table>
</template>

<script>

export default {
  props: ['pilots'],
  mounted() {
    console.log(this.pilots);
  }
}
</script>