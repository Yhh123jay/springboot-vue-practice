import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import ElementPlus from 'element-plus'

import 'element-plus/dist/index.css'
import './assets/global.css'

const app = createApp(App)

app.use(ElementPlus,{size:"small"})
app.use(router)
app.mount('#app')
