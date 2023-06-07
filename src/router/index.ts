import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  {
    path: '',
    redirect: '/recipe/browse'
  },
  {
    path: '/recipe/browse',
    component: () => import ('../views/Browse.vue')
  },
  {
    path: '/recipe/:id',
    component: () => import ('../views/Recipe.vue')
  },
  {
    path: '/recipe/create',
    component: () => import('../views/createEdit/CreateEditHeader.vue')
  },
  {
    path: '/recipe/create/ingredients',
    component: () => import('../views/createEdit/CreateEditIngredients.vue')
  },
  {
    path: '/recipe/create/instructions',
    component: () => import('../views/createEdit/CreateEditInstructions.vue')
  },
  {
    path: '/recipe/edit/:id',
    component: () => import('../views/createEdit/CreateEditHeader.vue')
  },
  {
    path: '/recipe/edit/:id/ingredients',
    component: () => import('../views/createEdit/CreateEditIngredients.vue')
  },
  {
    path: '/recipe/edit/:id/instructions',
    component: () => import('../views/createEdit/CreateEditInstructions.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
