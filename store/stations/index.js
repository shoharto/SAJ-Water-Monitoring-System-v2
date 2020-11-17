import {
  auth,
  db
} from '@/plugins/firebase'
import {
  firebaseMutations,
  firebaseAction
} from 'vuexfire'
//const _uid = state.users.user
//const itemsRef = db.ref(`/user-station/${_uid}`)

export const state = () => ({
  stations: [],
  station: null,
  stationStore: [],
  coordinates: {
    lat: 1.38,
    lng: 103.8
  }
})

export const getters = {
  items: state => {
    return state.stations
  },
  item: state => {
    return state.station
  },
  stationStore: state => {
    return state.stationStore
  },
  coordinates: state => state.coordinates
}

export const mutations = {
  SET_COORDINATES: (state, coordinates) => {
    state.coordinates = coordinates
  },
}

export const actions = {
  init: firebaseAction(async ({
    bindFirebaseRef,
    rootState
  }) => {

    let uid = rootState.users.user.user_id

    const itemsRef = db.ref(`/user-station/${uid}/station`)
    await bindFirebaseRef('stations', itemsRef)
  }),
  setCurrentStation: firebaseAction(async ({
    bindFirebaseRef,
    rootState,
    state
  }, stationName) => {
    let uid = rootState.users.user.user_id
    await bindFirebaseRef('station', db.ref(`/user-station/${uid}/station/${stationName}`))
    await bindFirebaseRef('stationStore', db.ref(`/user-station/${uid}/store/${stationName}`).orderByChild("time"))
  }),
  async addNewStation({
    rootState
  }, newStation) {
    let nme = newStation.name
    let uid = rootState.users.user.user_id
    const object = {
      name: newStation.name,
      'created-date': newStation.createdDate,
      data: {
        o2level: 0,
        ph: 0,
        temp: 0,
        turbidity: 0
      },
      location: newStation.location
    };
    var stat = {
      nme: object
    }

    console.log(stat.nme)
    console.log(object)
    await db.ref(`/user-station/${uid}/station/${nme}`).update(stat.nme)
  },

  async generaterandomstore({
    rootState
  }, stationName) {
    let uid = rootState.users.user.user_id
    await db.ref(`/user-station/${uid}/store/${stationName}`).push({
      aluminum: 0.05,
      ammonia: 0.02,
      conductivity: 1000,
      do: 5.5,
      ph: 9,
      temp: 78,
      time: 1579641579,
      turbidity: 0
    })

  },
  setCoordinates({
    commit
  }, coordinates) {
    commit('SET_COORDINATES', coordinates)

  }

}
























/*

export const mutations = {
  SET_STATIONS: (state, list) => {
    state.stationList = list
  }
}

export const getters = {
  stationList: state => {
    return state.stationList
  }
}
export const actions = {
  async getStations({
    commit
  }) {
    const token = await auth.currentUser.getIdToken()
    const authToken = `Bearer ${token}`
    console.log(authToken)
    let config = {
      headers: {
        Authorization: authToken,
      }
    }
    let payload = {
      email: 'hadif66@gmail.com'
    }

    await this.$axios
      .$post('https://us-central1-saj-water-quality-monitor.cloudfunctions.net/api/station/allstations', payload, config)
      .then(response => {
        var listStation = []
        listStation = response
        commit('SET_STATIONS', response)
      })
      .catch(err => {
        throw err
      })
  }
}
*/
