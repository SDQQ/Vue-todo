import {initializeApp} from 'firebase/app';

import {getDatabase, increment, onDisconnect, onValue, ref, set} from "firebase/database";
import objToArr from "./objToArr";

const db = getDatabase();
const connectedRef = ref(db, ".info/connected");
const presenceRef = ref(db, "peopleConnected");


export default function (store){
  initializeApp({
    apiKey: "AIzaSyDwGS27BbfHEolJDUPRgdpHPYiqtwvFIgs",
    authDomain: "vue-with-http-822a4.firebaseapp.com",
    databaseURL: "https://vue-with-http-822a4-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "vue-with-http-822a4",
    storageBucket: "vue-with-http-822a4.appspot.com",
    messagingSenderId: "515574911494",
    appId: "1:515574911494:web:fd2dce2e1eeacea11b6987"
  })


  onValue(connectedRef, async (snap) => {
    if (snap.val() === true) {
      set(ref(db, 'peopleConnected'),increment(+1))
    }
  });

  onDisconnect(presenceRef).set(increment(-1))

  onValue(ref(db, 'peopleConnected'), (snapshot) => {
    const res = snapshot.val();
    if (res) {
      store.commit('setOnlinePeople', +res)
    }
  });


  onValue(ref(db, 'tasks'), (snapshot) => {
    const res = snapshot.val();
    if (res) {
      store.commit('setTaskArr', objToArr(res).sort((a, b) => b.timeStamp - a.timeStamp))
    } else {
      store.commit('setTaskArr', [])
    }
  });
}

