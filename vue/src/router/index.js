import {createRouter, createWebHistory, createWebHashHistory} from 'vue-router'
import { defineAsyncComponent } from 'vue'

import Home from '../views/Home'

export default createRouter({
    history:createWebHistory(),
    routes:[
        {
            path:'/',
            name:'home',
            component:Home
        }
    ]
})



