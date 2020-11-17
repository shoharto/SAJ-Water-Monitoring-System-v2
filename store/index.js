import {
  vuexfireMutations
} from 'vuexfire'
import JWTDecode from 'jwt-decode'
import cookieparser from 'cookieparser'
export const mutations = {
  // other mutations
  ...vuexfireMutations
}

export const actions = {
  nuxtServerInit({
    commit
  }, {
    req
  }) {

    if (process.server && process.static) return

    if (!req.headers.cookie) return;
    const parsed = cookieparser.parse(req.headers.cookie)
    const accessTokenCookie = parsed.access_token
    if (!accessTokenCookie) return;
    const decoded = JWTDecode(accessTokenCookie)
    if (decoded) {
      commit('users/SET_USER', decoded)
      commit('users/SET_UID', decoded.user_id)
      commit('users/SET_EMAIL', decoded.email)
    }

  },

}
