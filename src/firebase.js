import firebase from 'firebase'

const config = {
  apiKey: 'AIzaSyCEnAUHkDyfyYAqrETdR3pu6MKdecx8LRQ',
  authDomain: 'sqrrly2.firebaseapp.com',
  databaseURL: 'https://sqrrly2.firebaseio.com',
  projectId: 'sqrrly2',
  storageBucket: 'sqrrly2.appspot.com',
  messagingSenderId: '12575805272',
  appId: '1:12575805272:web:825a5431eb818cdcd5df2d',
  measurementId: 'G-W4KCDFMC0L'
}
firebase.initializeApp(config)
firebase.analytics()
