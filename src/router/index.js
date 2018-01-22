import Vue from 'vue'
import Router from 'vue-router'
import TodoMain from '@/components/TodoMain'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'TodoMain',
      component: TodoMain
    }
  ]
})
