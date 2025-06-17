import {createRouter, createWebHistory} from "vue-router";

const routes = [
  {
    path: "/home",
    component: () => import("@/components/home/homePage.vue"),
  },
  {
    path: "/login",
    component: () => import("@/components/login/login.vue"),
  },
  {
    path: "/register",
    component: () => import("@/components/login/registerPage.vue"),
  },
  {
    path: '/:pathMatch(.*)*',
    component: () => import('@/components/login/login.vue'),
  }
  ]

  const router = createRouter({
    history: createWebHistory(),
    routes
  })

  export default router
