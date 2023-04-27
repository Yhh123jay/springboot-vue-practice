import {createRouter, createWebHistory, createWebHashHistory} from 'vue-router'

import Manage from "../views/Manage.vue"
import User from "@/views/User.vue"
import Home from '@/views/Home.vue'

export default createRouter({
    history:createWebHistory(),
    routes:[
        {
            path:'/',
            name:'Manage',
            component: Manage,
            meta:{title:'首页'},
            redirect: "/home",
            children:[
                {
                    path: "user",
                    name: 'User',
                    meta:{title:'用户信息'},
                    component: User
                },
                {
                    path: "home",
                    name: 'Home',
                    component: Home
                },

            ]
        }
    ]
})



