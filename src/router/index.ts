import { createRouter, createWebHistory } from "@ionic/vue-router";
import { RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/browse",
    component: () => import("@/views/browseView/BrowseView.vue"),
  },
  {
    path: "/recipe/:id",
    component: () => import("@/views/RecipeView.vue"),
    props: true
  },
  {
    path: "/recipe/create",
    component: () => import("@/views/createEdit/CreateEditHeaderView.vue"),
  },
  {
    path: "/recipe/create/ingredients",
    component: () => import("@/views/createEdit/CreateEditIngredientsView.vue"),
  },
  {
    path: "/recipe/create/instructions",
    component: () =>
      import("@/views/createEdit/CreateEditInstructionsView.vue"),
  },
  {
    path: "/recipe/edit/:id",
    component: () => import("@/views/createEdit/CreateEditHeaderView.vue"),
  },
  {
    path: "/recipe/edit/:id/ingredients",
    component: () => import("@/views/createEdit/CreateEditIngredientsView.vue"),
  },
  {
    path: "/recipe/edit/:id/instructions",
    component: () =>
      import("@/views/createEdit/CreateEditInstructionsView.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
