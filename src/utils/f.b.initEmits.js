import {getDatabase, increment, onDisconnect, onValue, ref, set} from "firebase/database";
import objToArr from "./objToArr";


export default function (store){
  const db = getDatabase();
  const connectedRef = ref(db, ".info/connected");
  const presenceRef = ref(db, "peopleConnected");

  onValue(connectedRef, async (snap) => {
    if (snap.val() === true) {
      set(ref(db, 'peopleConnected'),increment(+1))
    }
  });

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

  onDisconnect(presenceRef).set(increment(-1))

}

