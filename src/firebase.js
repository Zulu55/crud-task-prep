import firebase from 'firebase/app'
import 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyDEAl1-3KnD0H4mnCy8LUtG1lIdaHHdqNU",
    authDomain: "tasks-prep.firebaseapp.com",
    projectId: "tasks-prep",
    storageBucket: "tasks-prep.appspot.com",
    messagingSenderId: "253472645444",
    appId: "1:253472645444:web:23edab2f344a5a163eb711"
}
    
export const firebaseApp = firebase.initializeApp(firebaseConfig)