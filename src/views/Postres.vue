<template>
  <q-page class="bg-[#0D0D0D] text-white pb-16">
    <!-- HERO BANNER PRINCIPAL (Fondo oscuro, 2 columnas) -->
    <section class="relative overflow-hidden pt-8 pb-16 px-6 md:px-12 max-w-7xl mx-auto">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        <!-- Columna Izquierda: Textos y Acciones -->
        <div class="lg:col-span-6 space-y-6 text-center lg:text-left">
          <div class="inline-block">
            <span class="font-script text-4xl sm:text-5xl text-neutral-200 block -mb-2">
              Sweet Bites
            </span>
            <h1 class="text-5xl sm:text-6xl md:text-7xl font-serif-title font-black uppercase tracking-tight text-white m-0 leading-none">
              SWEET & <span class="text-[#F35D08]">HEAVEN</span>
            </h1>
          </div>

          <div class="flex items-center justify-center lg:justify-start space-x-3 text-[#F35D08]">
            <span class="h-[1px] w-12 bg-[#F35D08]/60"></span>
            <q-icon name="favorite" size="14px" />
            <span class="h-[1px] w-12 bg-[#F35D08]/60"></span>
          </div>

          <p class="text-neutral-300 text-base sm:text-lg max-w-lg mx-auto lg:mx-0 font-sans-body leading-relaxed">
            El final inolvidable para una comida de campeonato: volcanes de chocolate derretidos al corte, churros artesanales crujientes y galletas tibias recién horneadas servidas con helado artesanal.
          </p>

          <div class="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-3">
            <q-btn
              unelevated
              class="btn-flavoria-primary text-weight-bold px-8 py-3.5 shadow-xl text-sm tracking-wider"
              @click="isReservationOpen = true"
            >
              <q-icon name="cake" size="20px" class="q-mr-sm" />
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
              src="https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=format&fit=crop&w=1200&q=80"
              alt="Postres y Dulces de Autor Flavoria"
              class="w-full h-full object-cover rounded-3xl shadow-2xl border border-neutral-800/80 transform hover:scale-102 transition-transform duration-500"
            />
            <div class="absolute -bottom-4 -right-2 bg-neutral-900/90 backdrop-blur-md border border-[#F35D08] px-4 py-2.5 rounded-2xl shadow-xl flex items-center space-x-3">
              <div class="w-10 h-10 rounded-full bg-[#F35D08] flex items-center justify-center text-white">
                <q-icon name="cake" size="22px" />
              </div>
              <div>
                <span class="text-[10px] text-neutral-400 block uppercase font-bold">Repostería Diaria</span>
                <span class="text-xs font-bold text-white">Recién Horneados</span>
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
          Nuestra Selección de Postres
        </h2>
        <div class="flex items-center justify-center space-x-3 text-neutral-600 mb-4">
          <span class="h-[1px] w-8 bg-neutral-700"></span>
          <q-icon name="icecream" size="16px" color="deep-orange-7" />
          <span class="h-[1px] w-8 bg-neutral-700"></span>
        </div>
        <p class="text-sm text-neutral-400">
          Postres horneados en el momento para disfrutar tibios, con contrastes de temperatura y salsas abundantes.
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
    id: 501,
    name: 'Volcán Lava de Cacao & Arequipe',
    category: 'Postre Caliente',
    price: 21900,
    reviews: 198,
    isChefSpecial: true,
    image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=800&q=80',
    description: 'Bizcocho esponjoso horneado con chocolate Tumaco 70% cacao que al partirlo libera una cascada ardiente de chocolate oscuro fundido y arequipe de paila tradicional. Acompañado de una bola de helado de flor de leche y pistacho triturado.',
    ingredients: ['Cacao Colombiano 70%', 'Arequipe Artesanal de Paila', 'Helado de Flor de Leche', 'Pistachos Tostados', 'Mantequilla Pura de Campo']
  },
  {
    id: 502,
    name: 'Churros Gourmet Canela & Nutella',
    category: 'Churros Artesanales',
    price: 16500,
    reviews: 245,
    isChefSpecial: false,
    image: 'https://images.unsplash.com/photo-1624353365286-3f8d62daad51?auto=format&fit=crop&w=800&q=80',
    description: 'Cinco churros estriados extra dorados y crujientes por fuera con interior suave, rebozados en azúcar pulverizada y canela molida de Ceilán. Servidos con dos vasijas de dipping: Nutella tibia y salsa de frutos rojos.',
    ingredients: ['Masa de Churro Crujiente', 'Canela Fina de Ceilán', 'Nutella Avellanas Tibia', 'Coulis de Frutos del Bosque', 'Azúcar Microfina']
  },
  {
    id: 503,
    name: 'Skillet Cookie con Helado de Vainilla',
    category: 'Galleta en Sartén',
    price: 19500,
    reviews: 132,
    isChefSpecial: false,
    image: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&w=800&q=80',
    description: 'Galleta gigante con chips de chocolate con leche y chocolate blanco, horneada en sartén de hierro fundido directo a tu mesa, súper tierna en el centro, cubierta con bola de helado artesanal y salsa toffee.',
    ingredients: ['Masa de Galleta Rústica con Mantequilla', 'Chips de Tres Chocolates', 'Helado de Vainilla Madagaskar', 'Salsa Toffee Artesanal']
  },
  {
    id: 504,
    name: 'Cheesecake Estilo Vasco Horneado',
    category: 'Tarta de Queso',
    price: 18500,
    reviews: 116,
    isChefSpecial: false,
    image: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&w=800&q=80',
    description: 'Tarta de queso caramelizada en la superficie con un interior hiper cremoso casi fluido, elaborada con queso crema Philadelphia, nata fresca y un toque sutil de vainilla bourbon sin corteza tradicional.',
    ingredients: ['Queso Crema Philadelphia', 'Nata Fresca Doble Grasa', 'Caramelizado Superior de Azúcar Moreno', 'Reducción de Maracuyá Aparte']
  },
  {
    id: 505,
    name: 'Brownie Fudge Melcochudo',
    category: 'Brownie Clásico',
    price: 15900,
    reviews: 160,
    isChefSpecial: false,
    image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=800&q=80',
    description: 'El clásico indiscutible: corteza brillante craquelada e interior húmedo con nueces del nogal tostadas, servido tibio con salsa fudge de chocolate espeso.',
    ingredients: ['Chocolate Semiamargo 65%', 'Nueces de Nogal Partidas', 'Helado Opcional', 'Jarabe Caliente de Fudge']
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
