import { createApp,h } from 'vue'
import App from './App.vue'
import naive from "naive-ui";
import router from './routers'
import pinia from "./store/store"
const app = createApp(App);
app.use(naive);
app.use(router);
app.use(pinia);
app.mount('#app');