<template>
  <div class="container with-nav" v-cloak>
    <the-navbar></the-navbar>
    <router-view/>
  </div>
</template>

<script>

import TheNavbar from './components/TheNavbar'
import {useStore} from "vuex";
import {onMounted} from "vue";
import objToArr from "./utils/objToArr";

import {getDatabase, ref, onValue, onDisconnect,  set,increment} from "firebase/database";


export default {
  components: {
    TheNavbar
  },
  setup() {
    const store = useStore()
    const db = getDatabase();
    const presenceRef = ref(db, "peopleConnected");

    onMounted(async () => {
      const connectedRef = ref(db, ".info/connected");

      // onValue(connectedRef, async (snap) => {
      //   if (snap.val() === true) {
      //     const res = await get(ref(db,'peopleConnected'))
      //       set(ref(db, 'peopleConnected'),+res.val() + 1)
      //       // console.log("connected");
      //   } else {
      //     // console.log("not connected");
      //   }
      // });

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

    })
    return {}
  }
}
</script>

<style>

</style>
