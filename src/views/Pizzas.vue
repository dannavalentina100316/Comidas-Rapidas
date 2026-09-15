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
              PIZZA & <span class="text-[#F35D08]">PASSION</span>
            </h1>
          </div>

          <div class="flex items-center justify-center lg:justify-start space-x-3 text-[#F35D08]">
            <span class="h-[1px] w-12 bg-[#F35D08]/60"></span>
            <q-icon name="favorite" size="14px" />
            <span class="h-[1px] w-12 bg-[#F35D08]/60"></span>
          </div>

          <p class="text-neutral-300 text-base sm:text-lg max-w-lg mx-auto lg:mx-0 font-sans-body leading-relaxed">
            Masa madre fermentada durante 48 horas, horneada a la piedra a más de 450°C. Bordes inflados y alveolados con salsa de tomates San Marzano y mozzarella di bufala fundente.
          </p>

          <div class="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-3">
            <q-btn
              unelevated
              class="btn-flavoria-primary text-weight-bold px-8 py-3.5 shadow-xl text-sm tracking-wider"
              @click="isReservationOpen = true"
            >
              <q-icon name="local_pizza" size="20px" class="q-mr-sm" />
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
              src="https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=1200&q=80"
              alt="Pizza Artesanal Especial Flavoria"
              class="w-full h-full object-cover rounded-3xl shadow-2xl border border-neutral-800/80 transform hover:scale-102 transition-transform duration-500"
            />
            <div class="absolute -bottom-4 -right-2 bg-neutral-900/90 backdrop-blur-md border border-[#F35D08] px-4 py-2.5 rounded-2xl shadow-xl flex items-center space-x-3">
              <div class="w-10 h-10 rounded-full bg-[#F35D08] flex items-center justify-center text-white">
                <q-icon name="whatshot" size="22px" />
              </div>
              <div>
                <span class="text-[10px] text-neutral-400 block uppercase font-bold">Horno de Piedra</span>
                <span class="text-xs font-bold text-white">Masa Madre 48h</span>
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
          Nuestra Selección de Pizzas
        </h2>
        <div class="flex items-center justify-center space-x-3 text-neutral-600 mb-4">
          <span class="h-[1px] w-8 bg-neutral-700"></span>
          <q-icon name="local_pizza" size="16px" color="deep-orange-7" />
          <span class="h-[1px] w-8 bg-neutral-700"></span>
        </div>
        <p class="text-sm text-neutral-400">
          Disfruta de pizzas individuales y para compartir, con ingredientes genuinamente italianos y el toque rebelde de Flavoria.
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
    id: 301,
    name: 'Pizza Trufa & Prosciutto Di Parma',
    category: 'Pizza Gourmet de Autor',
    price: 44900,
    reviews: 231,
    isChefSpecial: true,
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=800&q=80',
    description: 'Nuestra joya horneada. Base de crema trufada, mozzarella fior di latte, láminas de prosciutto di Parma curado 18 meses colocadas tras salir del horno, rúcula selvática, lascas de parmesano reggiano y aceite de trufa blanca.',
    ingredients: ['Crema de Trufa Negra', 'Mozzarella Fior Di Latte', 'Prosciutto Di Parma 18 Meses', 'Rúcula Selvática Fresca', 'Parmesano Reggiano', 'Aceite de Oliva Trufado']
  },
  {
    id: 302,
    name: 'Pizza Pepperoni Crunch Hot Honey',
    category: 'Pizza Clásica Picante',
    price: 36900,
    reviews: 285,
    isChefSpecial: false,
    image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&w=800&q=80',
    description: 'Doble porción de pepperoni en rodajas gruesas que forman pequeñas copas crocantes al hornearse, mozzarella fundida, salsa de tomates San Marzano y un hilo generoso de miel picante infusionada con chiles habaneros.',
    ingredients: ['Doble Pepperoni Americano Grueso', 'Miel Picante Hot Honey Artesanal', 'Queso Mozzarella', 'Tomates San Marzano DOP', 'Orégano Seco del Mediterráneo']
  },
  {
    id: 303,
    name: 'Pizza Cuatro Quesos & Pera Caramelizada',
    category: 'Pizza Especial Blanca',
    price: 38900,
    reviews: 142,
    isChefSpecial: false,
    image: 'https://images.unsplash.com/photo-1573821663912-569905455b1c?auto=format&fit=crop&w=800&q=80',
    description: 'Equilibrio sublime entre salado y dulce: combinación cremosa de gorgonzola italiano, mozzarella, fontina y queso parmesano, finas láminas de pera pochadas en vino blanco y nueces de nogal tostadas.',
    ingredients: ['Queso Gorgonzola Suave', 'Queso Fontina y Mozzarella', 'Pera Confitada en Vino', 'Nueces de Nogal Crocantes', 'Toque de Miel de Romero']
  },
  {
    id: 304,
    name: 'Pizza BBQ Carnes Ahumadas',
    category: 'Pizza Rústica Fuerte',
    price: 39900,
    reviews: 178,
    isChefSpecial: false,
    image: 'https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?auto=format&fit=crop&w=800&q=80',
    description: 'Para los amantes del asador: brisket de res desmechado, pulled pork, trozos de tocineta ahumada, cebolla morada caramelizada y un zigzag de salsa barbacoa artesanal con toque ahumado de nogal.',
    ingredients: ['Brisket de Res Ahumado', 'Pulled Pork BBQ', 'Tiras de Tocineta Tostada', 'Cebolla Morada Encurtida', 'Queso Mozzarella Rallado']
  },
  {
    id: 305,
    name: 'Pizza Margherita Di Bufala Clásica',
    category: 'Pizza Tradicional Napolitana',
    price: 32900,
    reviews: 195,
    isChefSpecial: false,
    image: 'https://images.unsplash.com/photo-1604382355076-af4b0eb60143?auto=format&fit=crop&w=800&q=80',
    description: 'La reina de Nápoles: salsa cruda de tomates pera de huerta, medallones de mozzarella de búfala que se funden suavemente, hojas de albahaca fresca del día y aceite de oliva virgen extra de primera prensa en frío.',
    ingredients: ['Mozzarella Di Bufala Campana', 'Tomates San Marzano Frescos', 'Albahaca Genovesa Viva', 'Aceite de Oliva Virgen Extra', 'Pizca de Sal Marina']
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
