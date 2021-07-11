import * as firebase from 'firebase'

// Initialize Firebase
const config =  firebase.initializeApp({
    apiKey: "AIzaSyDz3W9-C3-AVcmbPvlO8kihKJWe9RMlf98",
    authDomain: "luau-3dd10.firebaseapp.com",
    databaseURL: "https://luau-3dd10.firebaseio.com",
    projectId: "luau-3dd10",
    storageBucket: "luau-3dd10.appspot.com",
    messagingSenderId: "544587721685",
    appId: "1:544587721685:web:e429a38d6edc3fe322eb5c",
    measurementId: "G-PB7GVTFR6K"
  });
  
  
  //firebase.analytics();
  export const auth = firebase.auth();

  const firestore = firebase.firestore();
  
  export const db = {
    stores: firestore.collection('stores'),
    farms: firestore.collection('farms'),
    farmMenu : firestore.collection('farmMenu'),
    formatDoc: doc => {
      return { id: doc.id, ...doc.data() }
    },
    getCurrentTimestamp: firebase.firestore.FieldValue.serverTimestamp
  }
 

  export default config