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
              GOOD <span class="text-[#F35D08]">MOOD</span>
            </h1>
          </div>

          <!-- Divisor decorativo -->
          <div class="flex items-center justify-center lg:justify-start space-x-3 text-[#F35D08]">
            <span class="h-[1px] w-12 bg-[#F35D08]/60"></span>
            <q-icon name="favorite" size="14px" />
            <span class="h-[1px] w-12 bg-[#F35D08]/60"></span>
          </div>

          <p class="text-neutral-300 text-base sm:text-lg max-w-lg mx-auto lg:mx-0 font-sans-body leading-relaxed">
            Nuestras hamburguesas son forjadas a fuego vivo con cortes certificados de res Angus, panes brioche horneados cada mañana e ingredientes cosechados con pasión.
          </p>

          <!-- Botones de Acción -->
          <div class="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-3">
            <q-btn
              unelevated
              class="btn-flavoria-primary text-weight-bold px-8 py-3.5 shadow-xl text-sm tracking-wider"
              @click="isReservationOpen = true"
            >
              <q-icon name="restaurant_menu" size="20px" class="q-mr-sm" />
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

        <!-- Columna Derecha: Imagen Destacada en Alta Resolución -->
        <div class="lg:col-span-6 flex justify-center relative">
          <div class="relative w-full max-w-md sm:max-w-lg aspect-square">
            <!-- Glow effect -->
            <div class="absolute inset-0 bg-gradient-to-tr from-[#F35D08]/20 to-transparent rounded-full blur-3xl -z-10"></div>
            <img
              src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=1200&q=80"
              alt="Hamburguesa Gourmet Especial Flavoria"
              class="w-full h-full object-cover rounded-3xl shadow-2xl border border-neutral-800/80 transform hover:scale-102 transition-transform duration-500"
            />
            <!-- Floating chef's choice tag -->
            <div class="absolute -bottom-4 -right-2 bg-neutral-900/90 backdrop-blur-md border border-[#F35D08] px-4 py-2.5 rounded-2xl shadow-xl flex items-center space-x-3">
              <div class="w-10 h-10 rounded-full bg-[#F35D08] flex items-center justify-center text-white">
                <q-icon name="local_fire_department" size="22px" />
              </div>
              <div>
                <span class="text-[10px] text-neutral-400 block uppercase font-bold">100% Angus Beef</span>
                <span class="text-xs font-bold text-white">Sabor Ahumado Auténtico</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- FRANJA DE CARACTERÍSTICAS / GARANTÍAS (Contraste Beige Crema) -->
    <FeaturesStrip />

    <!-- SECCIÓN GRID DE PRODUCTOS ("Our Chef's Specials") -->
    <section id="menu-section" class="max-w-7xl mx-auto px-6 md:px-12 py-12">
      <!-- Header de la sección -->
      <div class="text-center max-w-2xl mx-auto mb-12">
        <span class="text-xs uppercase tracking-[0.3em] text-[#F35D08] font-bold block mb-2">
          — POPULAR DISHES —
        </span>
        <h2 class="text-3xl sm:text-4xl md:text-5xl font-serif-title font-bold text-white mb-3">
          Nuestra Selección de Hamburguesas
        </h2>
        <div class="flex items-center justify-center space-x-3 text-neutral-600 mb-4">
          <span class="h-[1px] w-8 bg-neutral-700"></span>
          <q-icon name="restaurant" size="16px" color="deep-orange-7" />
          <span class="h-[1px] w-8 bg-neutral-700"></span>
        </div>
        <p class="text-sm text-neutral-400">
          Haz clic sobre cualquier hamburguesa para personalizar sus ingredientes, seleccionar términos o agregar adiciones gourmet.
        </p>
      </div>

      <!-- Grid de Tarjetas (Mínimo 4 productos) -->
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
    id: 101,
    name: 'Flavoria Truffle Monster',
    category: 'Hamburguesa Gourmet',
    price: 36900,
    reviews: 218,
    isChefSpecial: true,
    image: 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?auto=format&fit=crop&w=800&q=80',
    description: 'Nuestra creación insigne. 300g de doble carne Angus madurada, queso cheddar inglés derretido, tocineta ahumada caramelizada al maple, cebolla crispy y emulsión de trufa negra en pan brioche artesanal dorado.',
    ingredients: ['300g Doble Carne Angus', 'Queso Cheddar Inglés', 'Tocineta al Maple', 'Cebolla Crispy Crujiente', 'Mayonesa de Trufa Negra', 'Pan Brioche Artesanal']
  },
  {
    id: 102,
    name: 'Classic Beef Burger',
    category: 'Hamburguesa Clásica',
    price: 24500,
    reviews: 145,
    isChefSpecial: false,
    image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=800&q=80',
    description: 'La tradición elevada al máximo estándar. 180g de carne de res a la brasa, queso americano fundido, lechuga batavia hidropónica, rodajas de tomate milano fresco, pepinillos dulces y salsa tártara de la casa.',
    ingredients: ['180g Res Selección', 'Queso Americano Fundido', 'Lechuga Batavia Fresca', 'Tomate Milano', 'Pepinillos Dulces', 'Salsa Especial Flavoria']
  },
  {
    id: 103,
    name: 'Smoky BBQ Bacon Burger',
    category: 'Hamburguesa Ahumada',
    price: 29900,
    reviews: 182,
    isChefSpecial: false,
    image: 'https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?auto=format&fit=crop&w=800&q=80',
    description: 'Carne Angus asada sobre maderas aromáticas, queso gouda ahumado, tres tiras de tocineta crocante, aros de cebolla rebozados y una generosa capa de salsa BBQ con toque de café colombiano.',
    ingredients: ['200g Carne Angus Ahumada', 'Queso Gouda Ahumado', 'Tiras de Tocineta Gruesa', 'Aros de Cebolla Rebozados', 'Salsa BBQ al Café']
  },
  {
    id: 104,
    name: 'Crispy Buffalo Chicken',
    category: 'Hamburguesa de Pollo',
    price: 26500,
    reviews: 110,
    isChefSpecial: false,
    image: 'https://images.unsplash.com/photo-1625813506062-0aeb1d7a094b?auto=format&fit=crop&w=800&q=80',
    description: 'Suprema de pollo marinada en suero de leche, apanada en doble capa crocante, bañada en salsa buffalo de ají dulce, ensalada coleslaw cremosa con manzana verde y aderezo ranch.',
    ingredients: ['Pechuga Apanada Extra Crujiente', 'Salsa Buffalo Artesanal', 'Coleslaw Cremosa con Manzana', 'Aderezo Ranch de Eneldo', 'Pan Brioche Tostado']
  },
  {
    id: 105,
    name: 'Mushroom Swiss Supreme',
    category: 'Hamburguesa de la Casa',
    price: 31000,
    reviews: 94,
    isChefSpecial: false,
    image: 'https://chatgpt.com/backend-api/estuary/content?id=file_00000000795c81f9adf7ab10582f311d&ts=497242&p=fs&cid=1&sig=5f963828df6f64e801d6ec18625a42ddee66f0122fa1b83d173870edd1e2fd70&v=0',
    description: 'Homenaje a los hongos de bosque. Carne de res con reducción de champiñones portobello y parís al vino blanco, doble queso suizo derretido y alioli de ajo asado con hierbas finas.',
    ingredients: ['200g Carne de Res a la Parrilla', 'Portobellos y Champiñones al Vino', 'Doble Queso Suizo Derretido', 'Alioli de Ajo Rostizado', 'Rúcula Fresca']
  },
  {
    id: 106,
    name: 'Guacamole Jalapeño Crunch',
    category: 'Hamburguesa Fusión',
    price: 28900,
    reviews: 132,
    isChefSpecial: false,
    image: 'https://images.unsplash.com/photo-1565299507177-b0ac66763828?auto=format&fit=crop&w=800&q=80',
    description: 'Inspiración tex-mex con guacamole fresco preparado en mortero, rodajas de jalapeño encurtido en casa, queso monterey jack, nachos triturados para el crujido perfecto y pico de gallo.',
    ingredients: ['Carne de Res Jugosa 180g', 'Guacamole Rústico de Aguacate Hass', 'Jalapeños Suaves Encurtidos', 'Queso Monterey Jack', 'Crujiente de Tortillas de Maíz']
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
