import Vue from 'vue'
import Router from 'vue-router'
import Layout from '../layout/index'

Vue.use(Router)

export const constantRouterMap = [
  {
    path: '/login',
    meta: { title: '登录', noCache: true },
    component: (resolve) => require(['@/views/login'], resolve),
    hidden: true
  },
  {
    path: '/analysis',
    meta: { title: 's', noCache: true },
    component: (resolve) => require(['@/views/analysis/index.vue'], resolve),
    hidden: true,
    children: [{
      path: 'percancy',
      name: 'Percancy',
      component: (resolve) => require(['@/views/analysis/visual/percancy'], resolve)
    }, {
      path: 'alarm',
      name: 'Alarm',
      component: (resolve) => require(['@/views/analysis/visual/alarm'], resolve)
    }, {
      path: 'inspect',
      name: 'Inspect',
      component: (resolve) => require(['@/views/analysis/visual/inspect'], resolve)
    },
    {
      path: 'policeTrack',
      name: 'PoliceTrack',
      component: (resolve) => require(['@/views/analysis/visual/policeTrack'], resolve)
    }
    ]
  },
  {
    path: '/amap',
    meta: { title: '系统选择', noCache: true },
    component: (resolve) => require(['@/views/gis/amap/index.vue'], resolve),
    hidden: true
  },
  {
    path: '/subsystem',
    meta: { title: '系统选择', noCache: true },
    component: (resolve) => require(['@/views/systemOverview/index.vue'], resolve),
    hidden: true
  },
  {
    path: '/map',
    meta: { title: '地图', noCache: true },
    component: (resolve) => require(['@/views/gis/composite/index.vue'], resolve),
    hidden: true
  },
  {
    path: '/',
    meta: { title: '系统选择', noCache: true },
    component: (resolve) => require(['@/views/systemOverview/index.vue'], resolve),
    hidden: true
  },
  {
    path: '/404',
    component: (resolve) => require(['@/views/features/404'], resolve),
    hidden: true
  },
  {
    path: '/401',
    component: (resolve) => require(['@/views/features/401'], resolve),
    hidden: true
  },
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path*',
        component: (resolve) => require(['@/views/features/redirect'], resolve)
      }
    ]
  },
  {
    path: '/home',
    component: Layout,
    children: [
      {
        path: 'home',
        component: (resolve) => require(['@/views/home'], resolve),
        name: 'home',
        meta: { title: '首页', icon: 'index', affix: true, noCache: true }
      }
    ]
  },
  // {
  //   path: '/',
  //   component: Layout,
  //   redirect: '/dashboard',
  //   children: [
  //     {
  //       path: 'dashboard',
  //       component: (resolve) => require(['@/views/home'], resolve),
  //       name: 'Dashboard',
  //       meta: { title: '首页', icon: 'index', affix: true, noCache: true }
  //     }
  //   ]
  // },
  {
    path: '/user',
    component: Layout,
    hidden: true,
    redirect: 'noredirect',
    children: [
      {
        path: 'center',
        component: (resolve) => require(['@/views/system/user/center'], resolve),
        name: '个人中心',
        meta: { title: '个人中心' }
      }
    ]
  }
]

export default new Router({
  // mode: 'hash',
  mode: 'history',
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})
