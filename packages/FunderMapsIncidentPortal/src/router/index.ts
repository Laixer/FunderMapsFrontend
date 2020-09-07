import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'


// route level code-splitting
// this generates a separate chunk (about.[hash].js) 
// which is lazy-loaded when the route is visited.
// multiple routes are combined by using the same chunk name.
const Home = () => import(/* webpackChunkName: "start" */ '../views/Home.vue')
const Address = () => import(/* webpackChunkName: "start" */ '../views/Address.vue')
const Questions = () => import(/* webpackChunkName: "questions" */ '../views/Questions.vue')
const Upload = () => import(/* webpackChunkName: "finish" */ '../views/Upload.vue')
const Profile = () => import(/* webpackChunkName: "finish" */ '../views/Profile.vue')
const Finish = () => import(/* webpackChunkName: "finish" */ '../views/Finish.vue')


Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/adres',
    name: 'Address',
    component: Address
  },
  {
    path: '/vragen/:question',
    name: 'Questions',
    component: Questions
  },
  {
    path: '/rapport',
    name: 'Upload',
    component: Upload
  },
  {
    path: '/profiel',
    name: 'Profile',
    component: Profile
  },
  {
    path: '/klaar',
    name: 'Finish',
    component: Finish
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
