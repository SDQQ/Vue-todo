// import * as firebase from "firebase";
// import {getDatabase, ref} from "firebase/database";

import {createApp} from "vue";
import App from "./App";
import './theme.css'
import router from "./router";
import store from './store'





const app = createApp(App)

app
  .use(store)
  .use(router)
  .mount('#app')
