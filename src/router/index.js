import Vue from 'vue'
import Router from 'vue-router'
import Index from '../pages/index.vue'


Vue.use(Router)

const route = new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'index',
            component: Index
        }
    ]
})

export default route