<template>
  <div>
    <div class="card">
      <div class="card-body">
        <h2 class="card-title">Line</h2>

        <div class="btn-group btn-group-toggle">
          <label
            v-for="(item, index) in btn"
            :key="index"
            :class="{ active: item.value == radio }"
            class="btn btn-success"
          >
            <input
              v-model="radio"
              :name="dataLabel"
              :value="item"
              type="radio"
              @click="changeRadio(item)"
            />
            {{ item.label }}
          </label>
        </div>
      </div>

      <div class="card-img-bottom">
        <chartjs-line
          :backgroundcolor="bgColor"
          :beginzero="beginZero"
          :bind="true"
          :bordercolor="borderColor"
          :data="dataa[radio.value]"
          :datalabel="radio.label"
          :labels="labels"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      bgColor: '#81894e',
      beginZero: true,
      borderColor: '#81894e',
      btn: [
        { label: 'Temperature', value: 'temp' },
        { label: 'Ph', value: 'ph' },
        { label: 'Turbidity', value: 'turbidity' }
      ],

      dataLabel: 'Value',
      labels: null,
      dataa: {
        temp: [],
        ph: [],
        turbidity: []
      },
      radio: { label: 'Temperature', value: 'temp' }
    }
  },
  mounted() {
    this.printStationStore()
  },
  computed: {
    ...mapGetters({
      stationStore: 'stations/stationStore'
    })
  },
  methods: {
    printStationStore() {
      console.log(this.labels)
      for (let m of this.stationStore) console.log(m['temp'])
    },
    changeRadio(item) {
      this.radio = item
    }
  },
  watch: {
    stationStore: function() {
      this.labels = this.stationStore.map(item => item.time)
      this.dataa.temp = this.stationStore.map(item => item.temp)
      this.dataa.ph = this.stationStore.map(item => item.ph)
      this.dataa.turbidity = this.stationStore.map(item => item.turbidity)
    }
  }
}
</script>
