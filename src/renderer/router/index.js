import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/components/Home'
import Search from '@/components/Search'
import Mine from '@/components/Mine'
import Edit from '@/components/Edit'
import Recommend from '@/components/Recommend'
import Help from '@/components/Help'
import Note from '@/components/Note'
import Chat from '@/components/Chat'
import Message from '@/components/Message'
import Register from '@/components/Register'
import Login from '@/components/Login'
import Tree from '@/components/Tree'
import Collect from '@/components/Collect'
Vue.use(VueRouter)

export default new VueRouter({
  routes: [
    {
      path: '/home',
      name: 'home',
      component: Home
    },{
      path: '/tree',
      name: 'tree',
      component: Tree
    },{
      path: '/collect',
      name: 'collect',
      component: Collect
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },{
      path: '/login',
      name: 'login',
      component: Login 
    },
    {
      path: '/note',
      name: 'note',
      component: Note
    },
    {
      path: '/search',
      name: 'search',
      component: Search
    },
    {
      path: '/mine',
      name: 'mine',
      component: Mine
    },
    {
      path: '/edit',
      name: 'edit',
      component: Edit
    },
    {
      path: '/recommend',
      name: 'recommend',
      component: Recommend
    },{
      path: '/message',
      name: 'message',
      component: Message
    },
    {
      path: '/help',
      name: 'help',
      component: Help
    },   
    {
      path: '/chat',
      name: 'chat',
      component: Chat
    },
    {
      path: '*',
      redirect: '/home'
    }
  ]
})