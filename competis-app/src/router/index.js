import Vue from 'vue'
import VueRouter from 'vue-router'
import AthletePage from '../views/AthletePage.vue'
import TrialPage from '../views/TrialPage.vue'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Athlete',
    component: AthletePage
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
  }
]

const router = new VueRouter({
  routes
})

export default router
