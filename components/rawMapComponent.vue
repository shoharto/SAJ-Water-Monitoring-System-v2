<template>
  <div>
    <v-btn @click="mapBounds">Show All</v-btn>
    <gmap-map
      ref="gmap"
      :center="center"
      :options="mapOptions"
      :zoom="12"
      style="width:100%;  height: 340px;"
    >
      <gmap-marker
        :key="index"
        v-for="(m, index) in stations"
        :position="m.location"
        @click="toggleInfoWindow(m,index)"
      ></gmap-marker>

      <gmap-info-window
        :options="infoOptions"
        :position="infoWindowPos"
        :opened="infoWinOpen"
        @closeclick="infoWinOpen=false"
      >
        <div v-html="infoContent"></div>
      </gmap-info-window>
    </gmap-map>
  </div>
</template>

<script>
export default {
  name: 'GoogleMap',
  props: {
    stations: Array
  },
  data() {
    return {
      mapOptions: {
        fullscreenControl: false,
        zoomControl: true,
        mapTypeControl: false,
        scaleControl: false,
        streetViewControl: false,
        rotateControl: false,
        disableDefaultUi: false
      },
      //a default center for the map
      center: { lat: 1.504038, lng: 103.767732 },
      map: null,
      infoContent: '',
      infoWindowPos: {
        lat: 0,
        lng: 0
      },
      infoWinOpen: false,
      currentMidx: null,
      //optional: offset infowindow so it visually sits nicely on top of our marker
      infoOptions: {
        pixelOffset: {
          width: 0,
          height: -35
        }
      }
    }
  },

  mounted() {
    //set bounds of the map
    /*
    this.$refs.gmap.$mapPromise.then(async () => {
      await this.mapBounds()
    })*/
  },
  methods: {
    toggleInfoWindow: function(marker, idx) {
      this.infoWindowPos = marker.location
      this.infoContent = this.getInfoWindowContent(marker.name, marker.data)

      //check if its the same marker that was selected if yes toggle
      if (this.currentMidx == idx) {
        this.infoWinOpen = !this.infoWinOpen
      }
      //if different marker set infowindow to open and reset current marker index
      else {
        this.infoWinOpen = true
        this.currentMidx = idx
      }
    },
    mapBounds() {
      this.$refs.gmap.$mapPromise.then(map => {
        const bounds = new google.maps.LatLngBounds()
        for (let m of this.stations) {
          bounds.extend(m.location)
        }
        console.log(bounds)
        map.fitBounds(bounds)
      })
    },

    getInfoWindowContent: function(name, marker) {
      return `<div class="card">

  <div class="card-content">
    <div class="media">
      <div class="media-content">
        <p class="title is-4 blue--text">${name}</p>
      </div>
    </div>
    <div class="content black--text">
    Temperature =
      ${marker.temp}
    </div>
        <div class="content black--text">
        O2 Level =
      ${marker.o2level}
    </div>
        <div class="content black--text">
        pH =
      ${marker.ph}
    </div>
        <div class="content black--text">
        Turbidity =
      ${marker.turbidity}
    </div>
  </div>
</div>`
    }
  },
  watch: {
    stations: function() {
      return this.stations
    },
    logit(marker) {
      console.log(marker)
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
