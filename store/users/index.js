import Cookie from 'js-cookie'
import {
  auth
} from '@/plugins/firebase'
import JWTDecode from 'jwt-decode'

export const state = () => ({
  user: null,
  uid: null,
  email: null,
  loadingLogin: false
})

export const getters = {
  user: state => {
    return state.user
  },
  loadingLogin: state => state.loadingLogin
}

export const mutations = {
  SET_USER: (state, currentUser) => {
    state.user = currentUser
  },
  SET_UID: (state, uid) => {
    state.uid = uid
  },
  SET_EMAIL: (state, email) => {
    state.email = email
  },
  SET_LOG_LOAD: (state, loadState) => {
    state.loadingLogin = loadState
  }
}
export const actions = {
  async login({
    commit
  }, account) {
    try {
      commit('SET_LOG_LOAD', true)
      await auth.signInWithEmailAndPassword(account.email, account.password)
      const token = await auth.currentUser.getIdToken()
      Cookie.set('access_token', token)
      Cookie.set('authorization', `Bearer ${token}`)
      const decoded = JWTDecode(token)

      if (decoded) {
        commit('SET_USER', decoded)
        commit('SET_UID', decoded.user_id)
        commit('SET_EMAIL', decoded.email)
      }
      commit('SET_LOG_LOAD', false)
    } catch (error) {
      commit('SET_LOG_LOAD', false)
      throw error;
    }

  }
}
