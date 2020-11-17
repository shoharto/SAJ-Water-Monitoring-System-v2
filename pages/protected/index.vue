<template>
  <v-container fluid grid-list-xl>
    <v-row no-gutters>
      <v-col no-gutters>
        <h2>Dashboard</h2>
      </v-col>
      <v-col no-gutters>
        <v-select
          :items="stationItems"
          v-model="station"
          item-text="name"
          item-value="name"
          label="Select Station"
          solo
          return-object
        ></v-select>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" md="7">
        <v-card class="mt-3 mx-auto">
          <chartline />
        </v-card>
      </v-col>
      <v-col>
        <v-row>
          <v-col>
            <v-card>
              <v-card-title>Temperature</v-card-title>
              <v-card-text>
                <div>
                  <client-only>
                    <VueSvgGauge
                      :start-angle="-90"
                      :end-angle="90"
                      :value="stationItem?stationItem.data.temp:0"
                      :separator-step="0"
                      :min="0"
                      :max="100"
                      :gauge-color="[{ offset: 0, color: '#6b9de3'}, { offset: 40, color: '#f5f258'},{ offset: 100, color: '#fc2b14'}]"
                      :scale-interval="20"
                      :inner-radius="65"
                    ></VueSvgGauge>
                  </client-only>
                </div>
                <div id="mcontainer">
                  <div class="abc">100</div>
                  <div>0</div>
                </div>
                <div class="action">
                  <span class="headline">{{stationItem?stationItem.data.temp:0}}</span>
                </div>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-card class="mx-auto">
              <v-card-title>O2 Level</v-card-title>
              <v-card-text>
                <div>
                  <client-only>
                    <VueSvgGauge
                      :start-angle="-90"
                      :end-angle="90"
                      :value="stationItem?stationItem.data.o2level:0"
                      :separator-step="0"
                      :min="0"
                      :max="120"
                      :gauge-color="[{ offset: 0, color: '#3cde3a'}, { offset: 120, color: '#eb4034'}]"
                      :scale-interval="10"
                      :inner-radius="65"
                    ></VueSvgGauge>
                  </client-only>
                </div>
                <div id="mcontainer">
                  <div class="abc">120</div>
                  <div>0</div>
                </div>
                <div class="action">
                  <span class="headline">{{stationItem?stationItem.data.o2level:0}}</span>
                </div>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
      <v-col>
        <v-row>
          <v-col>
            <v-card class="mx-auto">
              <v-card-title>Ph</v-card-title>
              <v-card-text>
                <div>
                  <client-only>
                    <VueSvgGauge
                      :start-angle="-90"
                      :end-angle="90"
                      :value="stationItem?stationItem.data.ph:0"
                      :separator-step="0"
                      :min="0"
                      :max="20"
                      :gauge-color="[{ offset: -20, color: '#347AB0'}, { offset: 100, color: '#8CDFAD'}]"
                      :scale-interval="2"
                      :inner-radius="65"
                    ></VueSvgGauge>
                  </client-only>
                </div>
                <div id="mcontainer">
                  <div class="abc">20</div>
                  <div>0</div>
                </div>
                <div class="action">
                  <span class="headline">{{stationItem?stationItem.data.ph:0}}</span>
                </div>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-card class="mx-auto">
              <v-card-title>Turbidity</v-card-title>
              <v-card-text>
                <div>
                  <client-only>
                    <VueSvgGauge
                      :start-angle="-90"
                      :end-angle="90"
                      :value="stationItem?stationItem.data.turbidity:0"
                      :separator-step="0"
                      :min="0"
                      :max="20"
                      :gauge-color="[{ offset: -20, color: '#347AB0'}, { offset: 100, color: '#8CDFAD'}]"
                      :scale-interval="2"
                      :inner-radius="65"
                    ></VueSvgGauge>
                  </client-only>
                </div>
                <div id="mcontainer">
                  <div class="abc">20</div>
                  <div>0</div>
                </div>
                <div class="action">
                  <span class="headline">{{stationItem?stationItem.data.turbidity:0}}</span>
                </div>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12">
        <div>
          <rawMap :stations="stationItems" />
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import rawMap from '@/components/rawMapComponent'
import gauge from '@/components/gauge'
import chartline from '@/components/chart-line'
import { auth, db } from '@/plugins/firebase'

export default {
  data: () => ({
    selectedKey: 'station',
    station: {
      data: {
        temperature: 0
      }
    },
    stationlist: [],
    gval: 0,
    labels: ['12am', '3am', '6am', '9am', '12pm', '3pm', '6pm', '9pm'],
    value: [150, 675, 410, 390, 310, 460, 250, 240]
  }),
  components: { rawMap, gauge, chartline },
  computed: {
    ...mapGetters({
      stationItems: 'stations/items',
      stationItem: 'stations/item'
    })
  },
  created() {
    this.mapInit()
  },
  methods: {
    ...mapActions({
      mapInit: 'stations/init',
      getStationToGauge: 'stations/setCurrentStation'
    })
  },
  mounted() {
    auth.onAuthStateChanged(function(user) {
      if (user) {
        console.log('its ok')
      } else {
        console.log('no user')
      }
    })
  },
  watch: {
    station: function() {
      let { '.key': selectedKey, ...rest } = this.station
      this.getStationToGauge(selectedKey)
      return this.stationItem
      //console.log(this.stationItem)
    }
  }
}
</script>
<style lang="scss" scoped>
.action {
  display: flex;
  align-items: center;
  justify-content: center;
}
#mcontainer {
  overflow: hidden;
  display: inline;
}
.abc {
  float: right;
  margin-left: 10px;
}
</style>
