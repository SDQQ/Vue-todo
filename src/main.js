import {createApp} from "vue";
import App from "./App";
import './style/theme.css'
import './style/animation.css'
import router from "./router";
import store from './store'


const app = createApp(App)

app
  .use(store)
  .use(router)
  .mount('#app')
