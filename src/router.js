import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Collections from './views/Collections.vue'
import Items from './views/Items.vue'
import PlaylistItems from './views/PlaylistItems.vue'
import Member from './views/Member.vue'
import Test from './views/Test.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/collections',
      name: 'collections',
      component: Collections
    },
    {
      path: '/test',
      name: 'test',
      component: Test
    },
    {
      path: '/collections/:slug',
      name: 'Items',
      component: Items
    },
    {
      path: '/playlists',
      name: 'playlists',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/Playlists.vue')
    },
    {
      path: '/playlists/:playlist',
      name: 'PlaylistItems',
      component: PlaylistItems
    },
    {
      path: '/member',
      name: 'member',
      component: Member
    }
  ]
})
