<template>
  <v-row align="center" justify="center">
    <v-col cols="12" sm="8" md="4">
      <v-card class="elevation-12">
        <v-toolbar color="primary" dark flat>
          <v-toolbar-title>Login</v-toolbar-title>
          <v-spacer />
        </v-toolbar>
        <v-card-text>
          <v-form @submit.prevent="login" id="check-login-form">
            <v-text-field
              id="email"
              v-model="account.email"
              label="Login"
              name="login"
              prepend-icon="person"
              type="email"
            />

            <v-text-field
              id="password"
              v-model="account.password"
              label="Password"
              name="password"
              prepend-icon="lock"
              type="password"
            />

            <div class="alert alert-danger red--text" v-if="isError">
              <div>"{{errMessage}}"</div>
            </div>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn color="primary" form="check-login-form" type="submit" :loading="loginLoad">Login</v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data: () => ({
    account: {
      email: '',
      password: ''
    },
    isError: false,
    errMessage: ''
  }),
  methods: {
    login() {
      this.$store
        .dispatch('users/login', this.account)
        .then(() => {
          this.$router.push({ path: '/protected' })
        })
        .catch(error => {
          this.isError = true
          this.errMessage = error
        })
    }
  },
  components: {},
  computed: {
    ...mapGetters({ loginLoad: 'users/loadingLogin' })
  }
}
</script>
