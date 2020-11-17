<template>
  <div>
    <gmap-map ref="gmap" :center="coordinates" :zoom="12" style="width:100%;  height: 341px;">
      <gmap-marker
        :key="index"
        v-for="(marker, index) in markers"
        :draggable="true"
        @click="center=marker"
        @dragend="getMarkerPosition($event.latLng)"
        :position.sync="marker"
      ></gmap-marker>
    </gmap-map>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  data() {
    return {
      // default to Montreal to keep it simple
      // change this to whatever makes sense
      center: { lat: 1.38, lng: 103.8 },
      markers: [{ lat: 1.38, lng: 103.8 }],
      places: [],
      currentPlace: null,
      coordinates: {
        lat: 1.38,
        lng: 103.8
      }
    }
  },
  computed: {
    ...mapGetters({
      sotreCoordinates: 'stations/coordinates'
    })
  },
  methods: {
    getMarkerPosition: function(latLng) {
      this.coordinates = { lat: latLng.lat(), lng: latLng.lng() }
      this.$store.dispatch('stations/setCoordinates', this.coordinates)
      console.log(this.coordinates)
      console.log(this.sotreCoordinates)
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
