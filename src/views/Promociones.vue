<template>
  <q-page class="bg-[#0D0D0D] text-white pb-16">
    <!-- HERO BANNER PRINCIPAL (Fondo oscuro, 2 columnas) -->
    <section class="relative overflow-hidden pt-8 pb-16 px-6 md:px-12 max-w-7xl mx-auto">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        <!-- Columna Izquierda: Textos y Acciones -->
        <div class="lg:col-span-6 space-y-6 text-center lg:text-left">
          <div class="inline-block">
            <span class="font-script text-4xl sm:text-5xl text-neutral-200 block -mb-2">
              Best Deals
            </span>
            <h1 class="text-5xl sm:text-6xl md:text-7xl font-serif-title font-black uppercase tracking-tight text-white m-0 leading-none">
              COMBOS & <span class="text-[#F35D08]">PROMOS</span>
            </h1>
          </div>

          <div class="flex items-center justify-center lg:justify-start space-x-3 text-[#F35D08]">
            <span class="h-[1px] w-12 bg-[#F35D08]/60"></span>
            <q-icon name="favorite" size="14px" />
            <span class="h-[1px] w-12 bg-[#F35D08]/60"></span>
          </div>

          <p class="text-neutral-300 text-base sm:text-lg max-w-lg mx-auto lg:mx-0 font-sans-body leading-relaxed">
            Ahorra en grande sin sacrificar calidad ni sabor. Combos completos diseñados para disfrutar en pareja, en familia o con tu grupo de amigos con hasta un 30% de descuento.
          </p>

          <div class="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-3">
            <q-btn
              unelevated
              class="btn-flavoria-primary text-weight-bold px-8 py-3.5 shadow-xl text-sm tracking-wider"
              @click="isReservationOpen = true"
            >
              <q-icon name="local_offer" size="20px" class="q-mr-sm" />
              <span>PEDIR AHORA</span>
            </q-btn>

            <q-btn
              outline
              class="btn-flavoria-outline px-7 py-3.5 text-sm tracking-wider"
              @click="scrollToMenu"
            >
              <span>VER MENÚ</span>
              <q-icon name="arrow_forward" size="18px" class="q-ml-sm" />
            </q-btn>
          </div>
        </div>

        <!-- Columna Derecha: Imagen Destacada -->
        <div class="lg:col-span-6 flex justify-center relative">
          <div class="relative w-full max-w-md sm:max-w-lg aspect-square">
            <div class="absolute inset-0 bg-gradient-to-tr from-[#F35D08]/20 to-transparent rounded-full blur-3xl -z-10"></div>
            <img
              src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=80"
              alt="Combos y Promociones Flavoria"
              class="w-full h-full object-cover rounded-3xl shadow-2xl border border-neutral-800/80 transform hover:scale-102 transition-transform duration-500"
            />
            <div class="absolute -bottom-4 -right-2 bg-neutral-900/90 backdrop-blur-md border border-[#F35D08] px-4 py-2.5 rounded-2xl shadow-xl flex items-center space-x-3">
              <div class="w-10 h-10 rounded-full bg-[#F35D08] flex items-center justify-center text-white">
                <q-icon name="savings" size="22px" />
              </div>
              <div>
                <span class="text-[10px] text-neutral-400 block uppercase font-bold">Ahorro Real</span>
                <span class="text-xs font-bold text-white">Hasta 30% OFF</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- FRANJA DE CARACTERÍSTICAS / GARANTÍAS -->
    <FeaturesStrip />

    <!-- SECCIÓN GRID DE PRODUCTOS ("Our Chef's Specials") -->
    <section id="menu-section" class="max-w-7xl mx-auto px-6 md:px-12 py-12">
      <div class="text-center max-w-2xl mx-auto mb-12">
        <span class="text-xs uppercase tracking-[0.3em] text-[#F35D08] font-bold block mb-2">
          — POPULAR DISHES —
        </span>
        <h2 class="text-3xl sm:text-4xl md:text-5xl font-serif-title font-bold text-white mb-3">
          Nuestra Selección de Promociones
        </h2>
        <div class="flex items-center justify-center space-x-3 text-neutral-600 mb-4">
          <span class="h-[1px] w-8 bg-neutral-700"></span>
          <q-icon name="local_offer" size="16px" color="deep-orange-7" />
          <span class="h-[1px] w-8 bg-neutral-700"></span>
        </div>
        <p class="text-sm text-neutral-400">
          Los paquetes más pedidos del restaurante a un precio imperdible con acompañamientos incluidos.
        </p>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        <ProductCard
          v-for="item in products"
          :key="item.id"
          :product="item"
          @select="openModal"
          @add="quickAdd"
        />
      </div>
    </section>

    <!-- Modal de Detalles -->
    <ProductModal
      v-model="modalOpen"
      :product="selectedProduct"
    />
  </q-page>
</template>

<script setup>
import { ref } from 'vue';
import { useQuasar } from 'quasar';
import FeaturesStrip from '../components/FeaturesStrip.vue';
import ProductCard from '../components/ProductCard.vue';
import ProductModal from '../components/ProductModal.vue';
import { useCart } from '../composables/useCart.js';

const $q = useQuasar();
const { addToCart, isReservationOpen } = useCart();

const modalOpen = ref(false);
const selectedProduct = ref(null);

const products = ref([
  {
    id: 601,
    name: 'Combo Pareja Legendario Flavoria',
    category: 'Combo Dúo Especial',
    price: 59900,
    reviews: 312,
    isChefSpecial: true,
    image: 'https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?auto=format&fit=crop&w=800&q=80',
    description: 'El combo más vendido: 2 Hamburguesas Classic Beef o Smoky BBQ, 1 porción jumbo de papas rústicas con queso cheddar y tocineta picada, y 2 bebidas a elección (sodas saborizadas o gaseosas).',
    ingredients: ['2 Hamburguesas Gourmet a Elección', '1 Canasta Familiar de Papas Rústicas', 'Queso Cheddar Fundido y Tocineta', '2 Bebidas Refrescantes de 400ml']
  },
  {
    id: 602,
    name: 'Party Pack Familiar (4 Personas)',
    category: 'Combo Familiar',
    price: 99900,
    reviews: 184,
    isChefSpecial: false,
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80',
    description: 'Ideal para celebraciones en casa: 2 Hamburguesas + 2 Perros Calientes Clásicos Criollos, 2 canastas de papas a la francesa crujientes, aros de cebolla rebozados y 4 bebidas.',
    ingredients: ['2 Hamburguesas Res 180g', '2 Perros Calientes Criollos', '2 Papas Francesas Grandes', '10 Aros de Cebolla Rebozados', '4 Gaseosas o Limonadas']
  },
  {
    id: 603,
    name: 'Combo Pizza & Beer Night',
    category: 'Combo Noche de Amigos',
    price: 58900,
    reviews: 147,
    isChefSpecial: false,
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80',
    description: '1 Pizza Grande artesanal horneada a la leña (Pepperoni Crunch o Cuatro Quesos) acompañada de 2 Cervezas Artesanales Golden Ale bien heladas y salsa de ajo blanco para los bordes.',
    ingredients: ['1 Pizza Grande 8 Porciones', '2 Cervezas Artesanales de Barril', 'Dip Especial de Ajo Confitado']
  },
  {
    id: 604,
    name: 'Mega Box Burger Individual',
    category: 'Combo Personal Premium',
    price: 33900,
    reviews: 220,
    isChefSpecial: false,
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80',
    description: 'Hamburguesa Smoky BBQ o Classic Beef + papas en gajos sazonadas con paprika y finas hierbas + bebida de la casa + mini volcán de chocolate o brownie melcochudo.',
    ingredients: ['Hamburguesa Gourmet Completa', 'Papas Rústicas Sazonadas', 'Bebida 400ml', 'Mini Postre del Día']
  },
  {
    id: 605,
    name: 'Combo 2x1 Perros Calientes Criollos',
    category: 'Promoción del Día',
    price: 29900,
    reviews: 260,
    isChefSpecial: false,
    image: 'https://images.unsplash.com/photo-1619740455993-9e612b1af08a?auto=format&fit=crop&w=800&q=80',
    description: 'Dos perros calientes criollos jumbo con doble queso costeño, ripio súper crocante, huevos de codorniz y papas chips.',
    ingredients: ['2 Perros Calientes Criollos', 'Papas Chips Caseras', 'Todas las Salsas de la Casa']
  }
]);

const scrollToMenu = () => {
  const el = document.getElementById('menu-section');
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' });
  }
};

const openModal = (product) => {
  selectedProduct.value = product;
  modalOpen.value = true;
};

const quickAdd = (product) => {
  addToCart(product, 1);
  $q.notify({
    type: 'positive',
    message: `¡${product.name} agregado al pedido!`,
    position: 'top',
    timeout: 2000
  });
};
</script>
