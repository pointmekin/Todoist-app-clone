import firebase from "firebase/app";
import 'firebase/firestore';


const firebaseConfig = firebase.initializeApp({
  apiKey: "AIzaSyDBVHcgUgHvndOaPyiWogf5jVR875Do0yU",
  authDomain: "todoist-clone-c64e2.firebaseapp.com",
  databaseURL: "https://todoist-clone-c64e2-default-rtdb.firebaseio.com",
  projectId: "todoist-clone-c64e2",
  storageBucket: "todoist-clone-c64e2.appspot.com",
  messagingSenderId: "862835557480",
  appId: "1:862835557480:web:3002ffbf6ec4c15c52e7dd" 
})

export { firebaseConfig as firebase }