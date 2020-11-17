<template>
  <div>
    <v-select
      :items="stations"
      v-model="stations[0]"
      item-text="name"
      item-value="name"
      label="Select Station"
      solo
    ></v-select>
  </div>
</template>

<script>
export default {
  props: {
    stations: Array
  },
  data: () => ({})
}
</script>

<style lang="scss" scoped>
</style>
