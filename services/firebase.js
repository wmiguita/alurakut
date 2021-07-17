import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

var config = {
  apiKey: process.env.FB_KEY,
  authDomain: process.env.FB_AUTH,
  projectId: process.env.FB_PID,
  storageBucket: process.env.FB_BUK,
  messagingSenderId: process.env.FB_SND,
  appId: process.env.FB_AID
};

let _singleton = null

class FirebaseAPI {
  constructor() {
    if ( _singleton ) return _singleton

    if ( ! firebase.apps.length ) // initialize if not yet
      firebase.initializeApp( config )

    this.auth = firebase.auth()
    this.db = firebase.firestore()
    this.pid = Date.now() // dirt (wrong?) singleton check
  }

  login ( form ) {
    const { email, password } = form

    return this.auth.signInWithEmailAndPassword( email, password )
  }

  subscribe( form ) {
    const { email, password } = form

    return this.auth.createUserWithEmailAndPassword( email, password )
  }

  logout() {
    this.auth.signOut()
  }

  setAuthChangeListener( handlerAuthChange ) {
    this.auth.onAuthStateChanged( handlerAuthChange )
  }

  createCom( form ) {
  }

  delCom( comId ) {
  }
}

export const Firebase = new FirebaseAPI()
