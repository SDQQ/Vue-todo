import {initializeApp} from 'firebase/app';
import {getDatabase, get, ref, set, child, update, remove} from "firebase/database";

initializeApp({
  apiKey: "AIzaSyDwGS27BbfHEolJDUPRgdpHPYiqtwvFIgs",
  authDomain: "vue-with-http-822a4.firebaseapp.com",
  databaseURL: "https://vue-with-http-822a4-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "vue-with-http-822a4",
  storageBucket: "vue-with-http-822a4.appspot.com",
  messagingSenderId: "515574911494",
  appId: "1:515574911494:web:fd2dce2e1eeacea11b6987"
})

class TaskRequests {

  constructor() {
    // this.database = firebase.database().ref('/tasks');
    this.database = ref(getDatabase());
    this.db = getDatabase();

  }

  async setTask(data) {
    let result
    await set(ref(this.db, `tasks/${data.id}`), data).then(() => {
      result = true
    })
        .catch((e) => {
          console.log('setTask failed')
          console.log(e)
          result = false
        });
    return result
  }

  async getTasks() {
    return await get(child(this.database, `tasks`)).then((snapshot) => {
      if (snapshot.exists()) {
        return snapshot.val()
      } else {
        console.log("No data available");
      }
    }).catch((error) => {
      console.error(error);
    });
  }

  watchTasks() {
    this.database.orderByKey().on('value', snapshot => {
      snapshot.val()
    });
  }

  async deleteTasks(id) {
    let result
    await remove(ref(this.db, `tasks/${id}`)).then(() => {
      result = true
    })
        .catch((e) => {
          console.log('deleteTasks failed')
          console.log(e)
          result = false
        });
    return result
  }

  async updateTask(data) {
    let result
    await update(ref(this.db, `tasks/${data.id}`), data).then(() => {
      result = true
    })
        .catch((e) => {
          console.log('updateTask failed')
          console.log(e)
          result = false
        });
    return result
  }
}

export default new TaskRequests()


//firebase v8
// class TaskRequests{
//
//     constructor() {
//       // this.database = firebase.database().ref('/tasks');
//       this.database = ref(getDatabase());
//
//     }
//     setTask(data){
//       this.database.child(data.id).set(data)
//     }
//     getTasks(){
//       return new Promise((resolve, reject)=>{
//         this.database.orderByKey().on('value', snapshot => {
//           resolve(snapshot.val())
//         });
//       })
//     }
//     watchTasks(){
//       this.database.orderByKey().on('value', snapshot => {
//        snapshot.val()
//       });
//     }
//   getTask(id){
//     return new Promise((resolve, reject)=>{
//       this.database.orderByChild('id').equalTo(id).on('value', snapshot => {
//         resolve(snapshot.val())
//       });
//     })
//   }
//
//     deleteTasks(id){
//       this.database.child(id).remove()
//     }
//     updateTask(data){
//       this.database.child(data.id).update({status:data.status})
//     }
// }

