import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)
//路由配置对象
const routes = [
    {
        path: '/',
        name: 'Login',
        component: ()=> import('../components/login/login.vue')
    },
    {
        path: '/home',
        name: 'home',
        component: ()=> import('../components/home/home')
    },

]

const router = new VueRouter({
    mode: 'history',
    routes,
})

export default router
