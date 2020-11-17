<template>
  <div>
    <VueSvgGauge
      :start-angle="-90"
      :end-angle="90"
      :value="gval"
      :separator-step="0"
      :min="-20"
      :max="100"
      :gauge-color="[{ offset: -20, color: '#347AB0'}, { offset: 100, color: '#8CDFAD'}]"
      :scale-interval="0"
      :inner-radius="65"
    ></VueSvgGauge>
  </div>
</template>

<script>
export default {
  props: {
    gval: Number
  }
}
</script>

<style lang="scss" scoped>
.inner-text {
  // allow the text to take all the available space in the svg on top of the gauge
  height: 100%;
  width: 100%;

  span {
    max-width: 100px;
    color: red;
    // ...
  }
}
</style>
