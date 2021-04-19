import Vue from 'vue'
import VueRouter from 'vue-router'
import HomePage from '../views/HomePage.vue'
import AthletePage from '../views/AthletePage.vue'
import TrialPage from '../views/TrialPage.vue'
import TodoPage from '../views/TodoPage.vue'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomePage
  },
  {
    path: '/athlete',
    name: 'Athlete',
    component : AthletePage
  },
  {
    path : '/trial',
    name : 'Trial', 
    component : TrialPage
  },
  {
    path : '/todo',
    name : 'Todo', 
    component : TodoPage
  }
]

const router = new VueRouter({
  routes
})

export default router
