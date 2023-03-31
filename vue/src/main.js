import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import ElementPlus from 'element-plus'

import 'element-plus/dist/index.css'
import './assets/global.css'

import request from '@/utils/request'

const app = createApp(App)

app.use(ElementPlus,{size:"small"})
app.use(router)
app.config.globalProperties.request = request

app.mount('#app')
