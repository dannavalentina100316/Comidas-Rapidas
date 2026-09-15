import { createRouter, createWebHistory } from 'vue-router';
import Hamburguesas from '../views/Hamburguesas.vue';
import Perros from '../views/Perros.vue';
import Pizzas from '../views/Pizzas.vue';
import Bebidas from '../views/Bebidas.vue';
import Postres from '../views/Postres.vue';
import Promociones from '../views/Promociones.vue';
import Nosotros from '../views/Nosotros.vue';

const routes = [
  {
    path: '/',
    redirect: '/hamburguesas'
  },
  {
    path: '/hamburguesas',
    name: 'Hamburguesas',
    component: Hamburguesas,
    meta: { title: 'Hamburguesas | Flavoria' }
  },
  {
    path: '/perros',
    name: 'Perros',
    component: Perros,
    meta: { title: 'Perros Calientes | Flavoria' }
  },
  {
    path: '/pizzas',
    name: 'Pizzas',
    component: Pizzas,
    meta: { title: 'Pizzas Artesanales | Flavoria' }
  },
  {
    path: '/bebidas',
    name: 'Bebidas',
    component: Bebidas,
    meta: { title: 'Bebidas & Coctelería | Flavoria' }
  },
  {
    path: '/postres',
    name: 'Postres',
    component: Postres,
    meta: { title: 'Postres Tentación | Flavoria' }
  },
  {
    path: '/promociones',
    name: 'Promociones',
    component: Promociones,
    meta: { title: 'Combos & Promociones | Flavoria' }
  },
  {
    path: '/nosotros',
    name: 'Nosotros',
    component: Nosotros,
    meta: { title: 'Sobre Nosotros | Flavoria' }
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0, behavior: 'smooth' };
  }
});

router.afterEach((to) => {
  if (to.meta && to.meta.title) {
    document.title = to.meta.title;
  }
});

export default router;
