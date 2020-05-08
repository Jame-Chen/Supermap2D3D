import Vue from 'vue';
import Router from 'vue-router';
Vue.use(Router);
const router = new Router({
  // mode:'history',
  routes: [{
      path: '/index',
      name: 'index',
      meta: {
        title: 'herox',
        auth: false, //需要登录
        keepAlive: false
      },
      component: resolve => require(['@/views/index.vue'], resolve)
    },
    {
      path: '/test',
      name: 'test',
      meta: {
        title: 'test',
        auth: false, //需要登录
        keepAlive: false
      },
      component: resolve => require(['@/views/Test.vue'], resolve)
    },
    {
      path: '/supermap3d',
      name: 'supermap3d',
      meta: {
        title: '超图',
        auth: false, //需要登录
        keepAlive: false
      },
      component: resolve => require(['@/views/Supermap3D.vue'], resolve)
    },
    {
      path: '/',
      name: 'supermap2d',
      meta: {
        title: '超图2d',
        auth: false, //需要登录
        keepAlive: false
      },
      component: resolve => require(['@/views/Supermap2D.vue'], resolve)
    },
  ]
});
/**
 * 路由前置检查
 */
router.beforeEach((to, from, next) => {
  // 合法性校验
  if (to.meta.auth) {
    console.log('into auth');
    next();
  }
  next();
});
router.afterEach(() => {
  // 在即将进入新的页面组件前操作
});
export default router;