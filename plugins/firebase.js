import firebase from 'firebase/app'
import 'firebase/database'
import 'firebase/auth'


var firebaseConfig = {
  apiKey: "AIzaSyBsIVbYdz0GYaBrarUsxFa7fYFRTRibQzE",
  authDomain: "saj-water-quality-monitor.firebaseapp.com",
  databaseURL: "https://saj-water-quality-monitor.firebaseio.com",
  projectId: "saj-water-quality-monitor",
  storageBucket: "saj-water-quality-monitor.appspot.com",
  messagingSenderId: "180205665179",
  appId: "1:180205665179:web:24bf7e963171e4a3c7bf3e",
  measurementId: "G-Q3CS3FH5FR"
};
// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)
  //firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);
}




export const db = firebase.database()
export const auth = firebase.auth()
