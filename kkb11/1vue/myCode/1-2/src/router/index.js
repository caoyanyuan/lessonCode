import Vue from 'vue'
import Router from 'vue-router'
import Form from '@/components/form/index'
import Dialog from '@/components/dialog/index'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/form',
      name: 'form',
      component: Form
    },
    {
      path: '/dialog',
      name: 'Dialog',
      component: Dialog
    }
  ]
})
