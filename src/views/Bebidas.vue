<template>
  <q-page class="bg-[#0D0D0D] text-white pb-16">
    <!-- HERO BANNER PRINCIPAL (Fondo oscuro, 2 columnas) -->
    <section class="relative overflow-hidden pt-8 pb-16 px-6 md:px-12 max-w-7xl mx-auto">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        <!-- Columna Izquierda: Textos y Acciones -->
        <div class="lg:col-span-6 space-y-6 text-center lg:text-left">
          <div class="inline-block">
            <span class="font-script text-4xl sm:text-5xl text-neutral-200 block -mb-2">
              Good Drinks
            </span>
            <h1 class="text-5xl sm:text-6xl md:text-7xl font-serif-title font-black uppercase tracking-tight text-white m-0 leading-none">
              FRESH & <span class="text-[#F35D08]">COLD</span>
            </h1>
          </div>

          <div class="flex items-center justify-center lg:justify-start space-x-3 text-[#F35D08]">
            <span class="h-[1px] w-12 bg-[#F35D08]/60"></span>
            <q-icon name="favorite" size="14px" />
            <span class="h-[1px] w-12 bg-[#F35D08]/60"></span>
          </div>

          <p class="text-neutral-300 text-base sm:text-lg max-w-lg mx-auto lg:mx-0 font-sans-body leading-relaxed">
            El maridaje perfecto para tus comidas rápidas gourmet: limonadas de hierbas frescas, malteadas artesanales con helado de crema pura y sodas saborizadas preparadas en barra al instante.
          </p>

          <div class="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-3">
            <q-btn
              unelevated
              class="btn-flavoria-primary text-weight-bold px-8 py-3.5 shadow-xl text-sm tracking-wider"
              @click="isReservationOpen = true"
            >
              <q-icon name="local_bar" size="20px" class="q-mr-sm" />
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
              src="https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=1200&q=80"
              alt="Bebidas Refrescantes y Cócteles Flavoria"
              class="w-full h-full object-cover rounded-3xl shadow-2xl border border-neutral-800/80 transform hover:scale-102 transition-transform duration-500"
            />
            <div class="absolute -bottom-4 -right-2 bg-neutral-900/90 backdrop-blur-md border border-[#F35D08] px-4 py-2.5 rounded-2xl shadow-xl flex items-center space-x-3">
              <div class="w-10 h-10 rounded-full bg-[#F35D08] flex items-center justify-center text-white">
                <q-icon name="ac_unit" size="22px" />
              </div>
              <div>
                <span class="text-[10px] text-neutral-400 block uppercase font-bold">100% Fruta Natural</span>
                <span class="text-xs font-bold text-white">Extra Refrescante</span>
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
          Nuestra Selección de Bebidas
        </h2>
        <div class="flex items-center justify-center space-x-3 text-neutral-600 mb-4">
          <span class="h-[1px] w-8 bg-neutral-700"></span>
          <q-icon name="local_bar" size="16px" color="deep-orange-7" />
          <span class="h-[1px] w-8 bg-neutral-700"></span>
        </div>
        <p class="text-sm text-neutral-400">
          Desde malteadas súper densas hasta limonadas botánicas y sodas saborizadas refrescantes.
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
    id: 401,
    name: 'Malteada Caramelo Salado & Brownie',
    category: 'Malteada de Autor',
    price: 18900,
    reviews: 174,
    isChefSpecial: true,
    image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=800&q=80',
    description: 'Nuestra malteada estrella. Helado artesanal de vainilla bourbon batido con reducción de toffee y caramelo con escamas de sal marina, trozos de brownie de chocolate semiamargo horneado en casa, crema chantilly fresca y crocante de praliné.',
    ingredients: ['Helado de Vainilla Bourbon', 'Caramelo Salado Artesanal', 'Trozos de Brownie Melcochudo', 'Crema Chantilly Batida', 'Escamas de Sal Marina de Manaure']
  },
  {
    id: 402,
    name: 'Limonada de Coco Cremosita',
    category: 'Bebida Refrescante',
    price: 13500,
    reviews: 215,
    isChefSpecial: false,
    image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=800&q=80',
    description: 'Zumo de limones tahití recién exprimidos procesados a alta velocidad con crema de coco caribeña, leche condensada y abundante hielo frappé hasta lograr una textura aterciopelada y celestial.',
    ingredients: ['Zumo Natural de Limón Tahití', 'Crema de Coco Real', 'Hielo Frappé Triturado', 'Ralladura de Lima', 'Toque de Hierbabuena']
  },
  {
    id: 403,
    name: 'Soda Frutos Rojos & Albahaca',
    category: 'Soda Artesanal',
    price: 12900,
    reviews: 128,
    isChefSpecial: false,
    image: 'https://images.unsplash.com/photo-1556881286-fc6915169721?auto=format&fit=crop&w=800&q=80',
    description: 'Infusión burbujeante de mora silvestre, fresas y arándanos macerados con azúcar orgánica, hojas frescas de albahaca morada y agua de manantial con gas extra fina servida en vaso escarchado.',
    ingredients: ['Compota Rústica de Frutos Rojos', 'Albahaca Fresca de Huerta', 'Agua de Manantial con Gas', 'Hielo en Cubos Cristalinos']
  },
  {
    id: 404,
    name: 'Malteada Monster Cookies & Cream',
    category: 'Malteada Gourmet',
    price: 17900,
    reviews: 140,
    isChefSpecial: false,
    image: 'https://images.unsplash.com/photo-1579954115545-a95591f28bfc?auto=format&fit=crop&w=800&q=80',
    description: 'Base hiper cremosa de helado de leche con galletas negras de chocolate trituradas, jarabe de chocolate fudge caliente en las paredes de la copa y coronada con una galleta entera.',
    ingredients: ['Galletas de Chocolate Rellenas', 'Helado de Crema Pura', 'Fudge Tibio de Chocolate Suizo', 'Chantilly Ligera']
  },
  {
    id: 405,
    name: 'Cerveza Artesanal Golden Ale IPA',
    category: 'Cerveza de Barril',
    price: 15500,
    reviews: 95,
    isChefSpecial: false,
    image: 'https://images.unsplash.com/photo-1608270192770-5975107e59b9?auto=format&fit=crop&w=800&q=80',
    description: 'Cerveza de la casa con notas cítricas de maracuyá y toronja, amargor balanceado y cuerpo dorado resplandeciente servida en copa fría.',
    ingredients: ['Lúpulos Cascade y Citra', 'Maltas Pilsen y Caramelo', 'Levadura Ale Neutra', 'Agua Filtrada Pura']
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
    message: `¡${product.name} agregada al pedido!`,
    position: 'top',
    timeout: 2000
  });
};
</script>
