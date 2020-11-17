<template>
  <v-app>
    <v-navigation-drawer
      v-if="this.$store.state.users.user"
      v-model="drawer"
      :clipped="clipped"
      app
    >
      <v-list>
        <v-list-item v-for="(item, i) in items" :key="i" :to="item.to" router exact>
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar :clipped-left="clipped" fixed app>
      <v-app-bar-nav-icon v-if="this.$store.state.users.user" @click.stop="drawer = !drawer" />
      <v-btn v-if="this.$store.state.users.user" icon @click.stop="clipped = !clipped">
        <v-icon>mdi-application</v-icon>
      </v-btn>
      <v-toolbar-title v-text="title" />
      <v-spacer></v-spacer>
      <v-btn v-if="this.$store.state.users.user" icon @click="logout">
        <v-icon>mdi-logout</v-icon>
      </v-btn>
    </v-app-bar>
    <v-content>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>
    <v-footer :fixed="fixed" app>
      <span>&copy; 2020</span>
    </v-footer>
  </v-app>
</template>

<script>
import { auth } from '@/plugins/firebase'
import Cookie from 'js-cookie'
export default {
  data() {
    return {
      clipped: false,
      drawer: true,
      fixed: false,
      items: [
        {
          icon: 'mdi-apps',
          title: 'Dashboard',
          to: '/protected'
        },
        { icon: 'mdi-chip', title: 'Stations', to: '/protected/stations' }
      ],
      right: true,
      title: 'SAJ Monitor System'
    }
  },
  methods: {
    async logout() {
      await auth.signOut()
      await Cookie.remove('access_token')
      await Cookie.remove('authorization')

      location.href = '/'
    }
  },
  computed: {}
}
</script>
