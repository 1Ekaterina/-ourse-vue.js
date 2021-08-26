import Vue from "vue";
import Router from "vue-router";
Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "MainPage",
      component: () => import('../pages/MainPage')
    },
    {
      path: "/add/payment/:category/",
      name: "AddPay",
      component: () => import('../pages/MainPage')
    },
    {
      path: "*",
      name: "NotFound",
      component: () => import('../pages/Page404')
    }
  ]
});
