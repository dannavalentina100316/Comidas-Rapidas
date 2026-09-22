<template>
  <q-page class="bg-[#0D0D0D] text-white pb-16">
    <!-- HERO BANNER PRINCIPAL (Fondo oscuro, 2 columnas) -->
    <section class="relative overflow-hidden pt-8 pb-16 px-6 md:px-12 max-w-7xl mx-auto">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        <!-- Columna Izquierda: Textos y Acciones -->
        <div class="lg:col-span-6 space-y-6 text-center lg:text-left">
          <div class="inline-block">
            <span class="font-script text-4xl sm:text-5xl text-neutral-200 block -mb-2">
              Good Food
            </span>
            <h1 class="text-5xl sm:text-6xl md:text-7xl font-serif-title font-black uppercase tracking-tight text-white m-0 leading-none">
              DOGS & <span class="text-[#F35D08]">MOOD</span>
            </h1>
          </div>

          <div class="flex items-center justify-center lg:justify-start space-x-3 text-[#F35D08]">
            <span class="h-[1px] w-12 bg-[#F35D08]/60"></span>
            <q-icon name="favorite" size="14px" />
            <span class="h-[1px] w-12 bg-[#F35D08]/60"></span>
          </div>

          <p class="text-neutral-300 text-base sm:text-lg max-w-lg mx-auto lg:mx-0 font-sans-body leading-relaxed">
            Perros calientes llevados al plano gourmet: salchichas tipo Frankfurt y Bratwurst artesanales, panes brioche de masa madre y combinaciones de salsas que desafían lo convencional.
          </p>

          <div class="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-3">
            <q-btn
              unelevated
              class="btn-flavoria-primary text-weight-bold px-8 py-3.5 shadow-xl text-sm tracking-wider"
              @click="isReservationOpen = true"
            >
              <q-icon name="local_fire_department" size="20px" class="q-mr-sm" />
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
              src="https://images.unsplash.com/photo-1619740455993-9e612b1af08a?auto=format&fit=crop&w=1200&q=80"
              alt="Perro Caliente Gourmet Especial Flavoria"
              class="w-full h-full object-cover rounded-3xl shadow-2xl border border-neutral-800/80 transform hover:scale-102 transition-transform duration-500"
            />
            <div class="absolute -bottom-4 -right-2 bg-neutral-900/90 backdrop-blur-md border border-[#F35D08] px-4 py-2.5 rounded-2xl shadow-xl flex items-center space-x-3">
              <div class="w-10 h-10 rounded-full bg-[#F35D08] flex items-center justify-center text-white">
                <q-icon name="local_fire_department" size="22px" />
              </div>
              <div>
                <span class="text-[10px] text-neutral-400 block uppercase font-bold">Salchicha Artesanal</span>
                <span class="text-xs font-bold text-white">Ahumada en Leña</span>
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
          Nuestra Selección de Perros Calientes
        </h2>
        <div class="flex items-center justify-center space-x-3 text-neutral-600 mb-4">
          <span class="h-[1px] w-8 bg-neutral-700"></span>
          <q-icon name="fastfood" size="16px" color="deep-orange-7" />
          <span class="h-[1px] w-8 bg-neutral-700"></span>
        </div>
        <p class="text-sm text-neutral-400">
          Recetas cargadas de texturas crocantes, quesos gratinados al soplete y salsas artesanales reducidas a fuego lento.
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
    id: 201,
    name: 'Perro Real Flavoria Truffle',
    category: 'Perro Caliente Gourmet',
    price: 27900,
    reviews: 167,
    isChefSpecial: true,
    image: 'https://i.pinimg.com/736x/43/37/66/43376652639552aedcdef161d81cbccf.jpg',
    description: 'Salchicha alemana Bratwurst ahumada rellena de queso, queso mozzarella gratinado al soplete, cebolla caramelizada, tocineta crujiente picada, papas chips de la casa y salsa mayo-trufa en pan brioche artesanal.',
    ingredients: ['Salchicha Bratwurst con Queso', 'Queso Mozzarella Gratinado', 'Cebolla Confitada al Vino Tinto', 'Tocineta Picada Extra Crocante', 'Mayo-Trufa Negra', 'Pan de Papa Brioche']
  },
  {
    id: 202,
    name: 'Perro Clásico Criollo',
    category: 'Perro Caliente Tradicional',
    price: 18500,
    reviews: 204,
    isChefSpecial: false,
    image: 'https://images.unsplash.com/photo-1619740455993-9e612b1af08a?auto=format&fit=crop&w=800&q=80',
    description: 'El clásico con el toque inconfundible de Flavoria: salchicha manguera premium, generoso queso costeño rallado al momento, ripio de papa artesanal súper tostado, huevo de codorniz y lluvia de salsas de la casa.',
    ingredients: ['Salchicha Frankfurt Jumbo', 'Queso Costeño Rallado Fresco', 'Ripio de Papa Super Crocante', 'Huevos de Codorniz', 'Salsa Tártara y de Piña Calada']
  },
  {
    id: 203,
    name: 'Perro Mexicano Volcánico',
    category: 'Perro Caliente Fusión',
    price: 23900,
    reviews: 138,
    isChefSpecial: false,
    image: 'https://images.unsplash.com/photo-1541214113241-21578d2d9b62?auto=format&fit=crop&w=800&q=80',
    description: 'Salchicha de res a la parrilla cubierta con chili con carne sazonado, queso cheddar fundido, pico de gallo campesino, sour cream y rodajitas de jalapeño sobre una cama de nachos crujientes.',
    ingredients: ['Salchicha de Res Asada', 'Chili con Carne Casero', 'Queso Cheddar Caliente', 'Pico de Gallo con Cilantro', 'Sour Cream Cremoso', 'Jalapeños Suaves']
  },
  {
    id: 204,
    name: 'Perro Bacon & Chimi Argentino',
    category: 'Perro Caliente Parrillero',
    price: 24500,
    reviews: 119,
    isChefSpecial: false,
    image: 'https://i.pinimg.com/736x/c4/c4/db/c4c4dbb9d0f9bab138fa48b96661c90f.jpg',
    description: 'Salchicha envuelta en espiral de tocineta ahumada y dorada al grill, bañada en chimichurri rústico de perejil fresco y ajo confitado, con pimientos asados y provolone fundido.',
    ingredients: ['Salchicha Envuelta en Tocineta', 'Chimichurri Rústico de la Casa', 'Pimientos Rojos Asados al Carbón', 'Queso Provolone Fundido', 'Pan Rústico']
  },
  {
    id: 205,
    name: 'Perro Sweet Pulled Pork',
    category: 'Perro Caliente de Autor',
    price: 26900,
    reviews: 98,
    isChefSpecial: false,
    image: 'https://images.unsplash.com/photo-1541214113241-21578d2d9b62?auto=format&fit=crop&w=800&q=80',
    description: 'Salchicha polaca ahumada coronada con bondiola de cerdo desmechada cocinada durante 10 horas en BBQ dulce, ensalada de repollo agridulce y hebras de queso parmesano reggiano.',
    ingredients: ['Salchicha Polaca de Cerdo', 'Pulled Pork 10 Horas en BBQ', 'Ensalada Coleslaw Fresca', 'Queso Parmesano Reggiano', 'Pan Brioche']
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
