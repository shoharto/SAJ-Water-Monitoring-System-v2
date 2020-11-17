<template>
  <v-container>
    <v-row no-gutters>
      <v-col>
        <h2>Stations</h2>
      </v-col>
      <v-col>
        <v-btn @click="addRandomStore"></v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-card>
          <v-data-table :headers="headers" :items="stationItems" :search="search">
            <template v-slot:top>
              <v-toolbar flat>
                <v-toolbar-title>Stations</v-toolbar-title>
                <div class="flex-grow-1"></div>
                <v-text-field
                  v-model="search"
                  append-icon="mdi-magnify"
                  label="Search"
                  hide-details
                  class="half-width"
                ></v-text-field>
                <div class="flex-grow-1"></div>

                <v-btn small @click="addItem">
                  <v-icon>mdi-plus</v-icon>
                </v-btn>

                <v-dialog v-model="addDialog" max-width="500px">
                  <v-card>
                    <v-card-title>
                      <span class="headline">Add Station</span>
                    </v-card-title>

                    <v-card-text>
                      <v-container>
                        <v-form ref="addForm">
                          <v-text-field
                            v-model="name"
                            :counter="15"
                            label="Name"
                            :rules="nameRules"
                            required
                          ></v-text-field>
                        </v-form>
                        <selectMap />
                      </v-container>
                    </v-card-text>

                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="blue darken-1" text @click="close">Close</v-btn>
                      <v-btn color="success" text @click="saveNewStation">Save</v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </v-toolbar>
            </template>
            <template v-slot:item.created-date="{ item }">{{timestampToDate(item['created-date'])}}</template>
            <template v-slot:item.action="{ item }">
              <v-icon class="mr-2" @click="editItem(item)">edit</v-icon>
            </template>
          </v-data-table>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import selectMap from '@/components/locationSetMap'

export default {
  data() {
    return {
      search: '',
      headers: [
        { text: 'Name', value: 'name' },
        { text: 'Created at', value: 'created-date' },
        { text: 'Action', value: 'action', sortable: false, align: 'right' }
      ],
      editedItem: {},
      editDialog: false,
      addDialog: false,
      valid: false,
      name: '',
      nameRules: [v => !!v || 'Name is required']
    }
  },

  computed: {
    ...mapGetters({
      stationItems: 'stations/items',
      stationItem: 'stations/item',
      coordinates: 'stations/coordinates'
    })
  },
  components: { selectMap },
  created() {
    this.tableInit()
  },
  methods: {
    ...mapActions({
      tableInit: 'stations/init'
    }),
    getProperty: function(name) {
      return this[name]
    },
    timestampToDate: function(timestmp) {
      var date = new Date(timestmp)
      let formatted_date =
        date.getFullYear() +
        '-' +
        (date.getMonth() + 1) +
        '-' +
        date.getDate() +
        ' ' +
        date.getHours() +
        ':' +
        date.getMinutes()
      return formatted_date
    },
    refresh: function() {},
    saveNewStation() {
      if (this.$refs.addForm.validate()) {
        var date = new Date()
        var timestamp = date.getTime()
        let newItem = {
          name: this.name,
          createdDate: timestamp,
          location: this.coordinates
        }
        this.$store.dispatch('stations/addNewStation', newItem)
      }
    },
    addRandomStore() {
      this.$store.dispatch('stations/generaterandomstore', 'station1')
    },
    close: function() {
      this.addDialog = false
      this.$refs.addForm.reset()
    },
    addItem: function() {
      this.addDialog = true
    },
    editItem: function(item) {}
  }
}
</script>

<style lang="scss" scoped>
</style>