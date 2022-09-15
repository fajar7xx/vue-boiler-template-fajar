import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

import productRoutes from "../views/products/productRoutes";
const AnimalView = () => import("@/views/AnimalApiExample.vue");
const BusinessCardEditor = () =>
  import("@/views/businessCardEditor/BusinessCardEditor.vue");

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/AboutView.vue"),
    },
    {
      path: "/animal",
      name: "Animal",
      component: AnimalView,
    },
    {
      path: "/business-card-editor",
      name: "BusinessCardEditor",
      component: BusinessCardEditor,
    },
    ...productRoutes,
  ],
});

export default router;
