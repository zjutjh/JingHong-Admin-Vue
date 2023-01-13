import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import navie from 'naive-ui'

const app = createApp(App);

createApp(App).mount('#app')

app.use(navie);
