<template>
  <q-layout view="hHh lpR fFf" class="bg-black text-white" style="background-color: #0D0D0D; min-height: 100vh;">
    <!-- HEADER & NAVBAR -->
    <q-header elevated class="bg-dark text-white border-b border-neutral-900" style="background-color: #0D0D0D; border-bottom: 1px solid #1F1F1F;">
      <q-toolbar class="py-3 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex items-center justify-between gap-3">
        <!-- Logo -->
        <router-link to="/hamburguesas" class="flex items-center no-underline text-white cursor-pointer group shrink-0">
          <div class="mr-2.5 flex items-center justify-center rounded-full bg-orange-950/40 p-2 border border-orange-600/30">
            <q-icon name="restaurant_menu" size="24px" color="deep-orange-7" />
          </div>
          <div class="flex flex-col">
            <span class="text-xl sm:text-2xl font-serif-title font-bold tracking-wider leading-none text-white group-hover:text-deep-orange-5 transition-colors">
              Flavoria
            </span>
            <span class="text-[9px] sm:text-[10px] tracking-[0.25em] text-neutral-400 uppercase font-sans-body">
              Fast Gourmet
            </span>
          </div>
        </router-link>

        <!-- Desktop Navigation Links: Single line, no wrapping, responsive spacing -->
        <nav class="hidden xl:flex items-center gap-1 2xl:gap-3 flex-nowrap whitespace-nowrap">
          <router-link
            v-for="item in navLinks"
            :key="item.to"
            :to="item.to"
            custom
            v-slot="{ href, navigate, isActive }"
          >
            <a
              :href="href"
              @click="navigate"
              class="relative px-2.5 2xl:px-3.5 py-1.5 text-xs 2xl:text-sm uppercase tracking-wider font-semibold whitespace-nowrap shrink-0 transition-all duration-200 cursor-pointer no-underline"
              :class="isActive ? 'text-deep-orange-5 font-bold' : 'text-neutral-300 hover:text-white'"
            >
              {{ item.label }}
              <span
                v-if="isActive"
                class="absolute bottom-0 left-2 right-2 h-[2px] bg-[#F35D08] rounded-full"
              ></span>
            </a>
          </router-link>
        </nav>

        <!-- Action Buttons: Cart & Order/Reserve -->
        <div class="flex items-center space-x-3 sm:space-x-4 shrink-0">
          <!-- Cart Button -->
          <q-btn
            round
            flat
            color="white"
            icon="shopping_bag"
            size="md"
            @click="isCartOpen = true"
            aria-label="Ver pedido"
            class="hover:bg-neutral-800 transition-colors"
          >
            <q-badge v-if="totalCount > 0" floating color="deep-orange-7" rounded class="text-xs">
              {{ totalCount }}
            </q-badge>
          </q-btn>

          <!-- Main CTA: RESERVAR / PEDIR AHORA (Prominente, Completo y Grande) -->
          <q-btn
            unelevated
            class="btn-flavoria-primary text-weight-bold shadow-lg"
            padding="12px 26px"
            @click="openReservationModal"
          >
            <span class="tracking-wider text-xs sm:text-sm font-bold whitespace-nowrap">RESERVAR / PEDIR AHORA</span>
          </q-btn>

          <!-- Mobile Hamburger Menu Button -->
          <q-btn
            flat
            round
            dense
            icon="menu"
            size="md"
            class="xl:hidden text-white hover:bg-neutral-800"
            @click="mobileDrawerOpen = !mobileDrawerOpen"
            aria-label="Abrir menú"
          />
        </div>
      </q-toolbar>
    </q-header>

    <!-- MOBILE DRAWER -->
    <q-drawer
      v-model="mobileDrawerOpen"
      side="right"
      overlay
      behavior="mobile"
      class="bg-neutral-950 text-white p-6"
      style="background-color: #121212;"
    >
      <div class="flex justify-between items-center mb-8 border-b border-neutral-800 pb-4">
        <div class="flex items-center">
          <q-icon name="restaurant" size="24px" color="deep-orange-7" class="q-mr-sm" />
          <span class="text-xl font-serif-title font-bold text-white">Flavoria</span>
        </div>
        <q-btn flat round dense icon="close" color="white" @click="mobileDrawerOpen = false" />
      </div>

      <q-list class="text-neutral-300 space-y-2">
        <q-item
          v-for="item in navLinks"
          :key="item.to"
          clickable
          v-ripple
          :to="item.to"
          @click="mobileDrawerOpen = false"
          active-class="bg-orange-950/40 text-deep-orange-5 font-bold rounded-lg"
          class="rounded-lg transition-colors"
        >
          <q-item-section avatar>
            <q-icon :name="item.icon" size="20px" :color="$route.path === item.to ? 'deep-orange-7' : 'grey-5'" />
          </q-item-section>
          <q-item-section class="text-base tracking-wide">{{ item.label }}</q-item-section>
        </q-item>
      </q-list>

      <div class="mt-8 pt-6 border-t border-neutral-800">
        <q-btn
          unelevated
          class="btn-flavoria-primary full-width q-py-md text-weight-bold"
          @click="mobileDrawerOpen = false; openReservationModal();"
        >
          RESERVAR / PEDIR AHORA
        </q-btn>
      </div>
    </q-drawer>

    <!-- MAIN PAGE CONTAINER -->
    <q-page-container>
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </q-page-container>

    <!-- FOOTER INFORMATIVO (Basado estrictamente en la imagen de referencia) -->
    <!-- Franja Naranja Vibrante (4 Columnas) -->
    <section class="flavoria-footer-bar py-8 px-6 md:px-12">
      <div class="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-center">
        <!-- Columna 1: Ubicación -->
        <div class="flex items-center space-x-4">
          <div class="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0 text-white">
            <q-icon name="place" size="28px" />
          </div>
          <div>
            <h4 class="text-xs uppercase font-extrabold tracking-widest text-white/90 mb-1">NUESTRA UBICACIÓN</h4>
            <p class="text-sm font-medium leading-snug text-white">
              Calle 85 #11-53, Zona T<br />Bogotá D.C., Colombia
            </p>
          </div>
        </div>

        <!-- Columna 2: Horarios -->
        <div class="flex items-center space-x-4">
          <div class="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0 text-white">
            <q-icon name="schedule" size="28px" />
          </div>
          <div>
            <h4 class="text-xs uppercase font-extrabold tracking-widest text-white/90 mb-1">HORARIOS DE ATENCIÓN</h4>
            <p class="text-sm font-medium leading-snug text-white">
              Lunes a Domingo<br />11:30 AM - 11:30 PM
            </p>
          </div>
        </div>

        <!-- Columna 3: Teléfonos -->
        <div class="flex items-center space-x-4">
          <div class="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0 text-white">
            <q-icon name="call" size="28px" />
          </div>
          <div>
            <h4 class="text-xs uppercase font-extrabold tracking-widest text-white/90 mb-1">CONTÁCTANOS</h4>
            <p class="text-sm font-medium leading-snug text-white">
              +57 (312) 456-7890<br />+57 (601) 890-1234
            </p>
          </div>
        </div>

        <!-- Columna 4: Domicilios Rápidos -->
        <div class="flex items-center space-x-4">
          <div class="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0 text-white">
            <q-icon name="two_wheeler" size="28px" />
          </div>
          <div>
            <h4 class="text-xs uppercase font-extrabold tracking-widest text-white/90 mb-1">SERVICIO DOMICILIO</h4>
            <p class="text-sm font-medium leading-snug text-white">
              Comida caliente y deliciosa<br />directo a tu puerta en 35 min.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Barra Inferior Oscura con Copyright y Redes Sociales -->
    <footer class="bg-black py-6 px-6 md:px-12 border-t border-neutral-900 text-neutral-400" style="background-color: #0D0D0D;">
      <div class="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <p class="text-xs tracking-wider text-center sm:text-left m-0">
          © 2026 Flavoria Restaurant. Todos los derechos reservados.
        </p>
        <div class="flex items-center space-x-4">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" class="w-9 h-9 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-300 hover:text-white hover:border-orange-500 hover:bg-orange-950/40 transition-all">
            <i class="fa-brands fa-facebook-f text-sm"></i>
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" class="w-9 h-9 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-300 hover:text-white hover:border-orange-500 hover:bg-orange-950/40 transition-all">
            <i class="fa-brands fa-instagram text-sm"></i>
          </a>
          <a href="https://pinterest.com" target="_blank" rel="noopener noreferrer" class="w-9 h-9 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-300 hover:text-white hover:border-orange-500 hover:bg-orange-950/40 transition-all">
            <i class="fa-brands fa-pinterest-p text-sm"></i>
          </a>
          <a href="https://whatsapp.com" target="_blank" rel="noopener noreferrer" class="w-9 h-9 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-300 hover:text-white hover:border-orange-500 hover:bg-orange-950/40 transition-all">
            <i class="fa-brands fa-whatsapp text-sm"></i>
          </a>
        </div>
      </div>
    </footer>

    <!-- MODAL DE CARRITO DE COMPRAS -->
    <q-dialog v-model="isCartOpen" position="right" full-height>
      <q-card class="bg-neutral-900 text-white flex flex-col" style="width: 420px; max-width: 90vw; background-color: #161616; border-left: 1px solid #2A2A2A;">
        <q-card-section class="q-py-md q-px-lg bg-neutral-950 flex items-center justify-between border-b border-neutral-800">
          <div class="flex items-center space-x-2">
            <q-icon name="shopping_bag" color="deep-orange-7" size="24px" />
            <span class="text-lg font-serif-title font-bold text-white">Tu Pedido</span>
            <q-badge color="deep-orange-7" class="q-ml-sm">{{ totalCount }}</q-badge>
          </div>
          <q-btn flat round dense icon="close" color="white" @click="isCartOpen = false" v-close-popup aria-label="Cerrar carrito" />
        </q-card-section>

        <!-- Cart items list -->
        <q-card-section class="col overflow-auto p-4 space-y-3">
          <div v-if="cartItems.length === 0" class="text-center py-16 text-neutral-400">
            <q-icon name="remove_shopping_cart" size="64px" color="grey-7" class="mb-4" />
            <p class="text-base font-medium">Aún no has agregado productos</p>
            <p class="text-xs text-neutral-500">Explora nuestro menú y selecciona tus platos favoritos</p>
          </div>

          <div
            v-for="item in cartItems"
            :key="item.id"
            class="flex items-center space-x-3 p-3 rounded-xl bg-neutral-950 border border-neutral-800"
          >
            <img :src="item.image" :alt="item.name" class="w-16 h-16 rounded-lg object-cover flex-shrink-0" />
            <div class="flex-1 min-w-0">
              <h5 class="text-sm font-bold text-white truncate m-0">{{ item.name }}</h5>
              <span class="text-xs font-bold text-deep-orange-5">{{ formatCOP(item.price) }}</span>
              <p v-if="item.note" class="text-[11px] text-neutral-400 italic truncate m-0">"{{ item.note }}"</p>
            </div>
            <!-- Quantity controls -->
            <div class="flex items-center space-x-1 bg-neutral-900 rounded-lg p-1 border border-neutral-800">
              <q-btn flat round dense size="xs" icon="remove" color="grey-4" @click="updateQuantity(item.id, -1)" />
              <span class="text-xs font-bold px-2 text-white">{{ item.quantity }}</span>
              <q-btn flat round dense size="xs" icon="add" color="deep-orange-5" @click="updateQuantity(item.id, 1)" />
            </div>
            <q-btn flat round dense size="sm" icon="delete" color="grey-5" @click="removeFromCart(item.id)" />
          </div>
        </q-card-section>

        <!-- Cart Summary & Actions -->
        <q-card-section v-if="cartItems.length > 0" class="bg-neutral-950 border-t border-neutral-800 p-5 space-y-4">
          <div class="flex justify-between items-center text-sm text-neutral-300">
            <span>Subtotal:</span>
            <span class="font-bold text-white">{{ formatCOP(totalPrice) }}</span>
          </div>
          <div class="flex justify-between items-center text-sm text-neutral-300">
            <span>Envío estimado:</span>
            <span class="font-bold text-green-400">¡GRATIS!</span>
          </div>
          <div class="flex justify-between items-center text-base border-t border-neutral-800 pt-3 text-white">
            <span class="font-bold">Total a Pagar:</span>
            <span class="text-xl font-bold text-deep-orange-5">{{ formatCOP(totalPrice) }}</span>
          </div>

          <div class="space-y-2 pt-2">
            <q-btn
              unelevated
              class="btn-flavoria-primary full-width q-py-sm text-weight-bold"
              @click="sendWhatsAppOrder"
            >
              <q-icon name="send" class="q-mr-sm" size="18px" />
              CONFIRMAR POR WHATSAPP
            </q-btn>
            <q-btn
              flat
              dense
              class="full-width text-grey-5 hover:text-white text-xs"
              @click="clearCart"
            >
              Vaciar carrito
            </q-btn>
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>

    <!-- MODAL DE RESERVA / PEDIDO INMEDIATO -->
    <q-dialog v-model="isReservationOpen">
      <q-card class="bg-neutral-900 text-white rounded-2xl border border-neutral-800" style="width: 520px; max-width: 95vw; background-color: #1A1A1A;">
        <q-card-section class="p-6 bg-gradient-to-r from-orange-950/50 to-neutral-950 border-b border-neutral-800 flex justify-between items-center">
          <div>
            <span class="text-xs uppercase tracking-widest text-deep-orange-5 font-bold">— EXPERIENCIA FLAVORIA —</span>
            <h3 class="text-2xl font-serif-title font-bold text-white m-0">Reservar Mesa / Pedido</h3>
          </div>
          <q-btn flat round dense icon="close" color="white" @click="isReservationOpen = false" v-close-popup aria-label="Cerrar reserva" />
        </q-card-section>

        <q-card-section class="p-6 space-y-4">
          <!-- Type selector -->
          <div class="grid grid-cols-2 gap-3 mb-2">
            <button
              type="button"
              @click="orderType = 'reserva'"
              class="py-3 px-4 rounded-xl border text-sm font-bold flex items-center justify-center space-x-2 transition-all cursor-pointer"
              :class="orderType === 'reserva' ? 'bg-[#F35D08] border-[#F35D08] text-white' : 'bg-neutral-900 border-neutral-800 text-neutral-300'"
            >
              <q-icon name="table_restaurant" size="20px" />
              <span>Reservar Mesa</span>
            </button>
            <button
              type="button"
              @click="orderType = 'domicilio'"
              class="py-3 px-4 rounded-xl border text-sm font-bold flex items-center justify-center space-x-2 transition-all cursor-pointer"
              :class="orderType === 'domicilio' ? 'bg-[#F35D08] border-[#F35D08] text-white' : 'bg-neutral-900 border-neutral-800 text-neutral-300'"
            >
              <q-icon name="moped" size="20px" />
              <span>Pedir Domicilio</span>
            </button>
          </div>

          <!-- Form Fields -->
          <div class="space-y-3">
            <div>
              <label class="text-xs uppercase tracking-wider text-neutral-400 block mb-1">Nombre Completo</label>
              <q-input
                v-model="bookingForm.name"
                dark
                outlined
                dense
                placeholder="Ej. Carlos Mendoza"
                color="deep-orange-7"
              />
            </div>

            <div>
              <label class="text-xs uppercase tracking-wider text-neutral-400 block mb-1">Teléfono Móvil</label>
              <q-input
                v-model="bookingForm.phone"
                dark
                outlined
                dense
                placeholder="Ej. +57 312 345 6789"
                color="deep-orange-7"
              />
            </div>

            <div v-if="orderType === 'reserva'" class="grid grid-cols-2 gap-3">
              <div>
                <label class="text-xs uppercase tracking-wider text-neutral-400 block mb-1">Personas</label>
                <q-select
                  v-model="bookingForm.guests"
                  :options="['2 Personas', '4 Personas', '6 Personas', '8+ Personas']"
                  dark
                  outlined
                  dense
                  color="deep-orange-7"
                />
              </div>
              <div>
                <label class="text-xs uppercase tracking-wider text-neutral-400 block mb-1">Hora Estimada</label>
                <q-select
                  v-model="bookingForm.time"
                  :options="['12:30 PM', '2:00 PM', '6:30 PM', '7:30 PM', '8:30 PM', '9:30 PM']"
                  dark
                  outlined
                  dense
                  color="deep-orange-7"
                />
              </div>
            </div>

            <div v-else>
              <label class="text-xs uppercase tracking-wider text-neutral-400 block mb-1">Dirección de Entrega</label>
              <q-input
                v-model="bookingForm.address"
                dark
                outlined
                dense
                placeholder="Ej. Calle 127 #15-30 Apto 402"
                color="deep-orange-7"
              />
            </div>

            <div>
              <label class="text-xs uppercase tracking-wider text-neutral-400 block mb-1">Notas Especiales / Ocasión</label>
              <q-input
                v-model="bookingForm.notes"
                dark
                outlined
                dense
                type="textarea"
                rows="2"
                placeholder="Ej. Cumpleaños, sin cebolla, timbre averiado..."
                color="deep-orange-7"
              />
            </div>
          </div>
        </q-card-section>

        <q-card-actions align="right" class="p-6 bg-neutral-950 border-t border-neutral-800">
          <q-btn flat label="Cancelar" color="grey-5" @click="isReservationOpen = false" v-close-popup />
          <q-btn
            unelevated
            class="btn-flavoria-primary text-weight-bold px-6"
            label="CONFIRMAR SOLICITUD"
            @click="submitBooking"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-layout>
</template>

<script setup>
import { ref } from 'vue';
import { useQuasar } from 'quasar';
import { useCart } from './composables/useCart.js';

const $q = useQuasar();
const {
  cartItems,
  isCartOpen,
  isReservationOpen,
  removeFromCart,
  updateQuantity,
  clearCart,
  totalCount,
  totalPrice,
  formatCOP
} = useCart();

const mobileDrawerOpen = ref(false);
const orderType = ref('reserva');

const bookingForm = ref({
  name: '',
  phone: '',
  guests: '2 Personas',
  time: '7:30 PM',
  address: '',
  notes: ''
});

const navLinks = [
  { label: 'Hamburguesas', to: '/hamburguesas', icon: 'lunch_dining' },
  { label: 'Perros', to: '/perros', icon: 'fastfood' },
  { label: 'Pizzas', to: '/pizzas', icon: 'local_pizza' },
  { label: 'Bebidas', to: '/bebidas', icon: 'local_bar' },
  { label: 'Postres', to: '/postres', icon: 'icecream' },
  { label: 'Promociones', to: '/promociones', icon: 'local_offer' },
  { label: 'Nosotros', to: '/nosotros', icon: 'info' }
];

const openReservationModal = () => {
  isReservationOpen.value = true;
};

const submitBooking = () => {
  if (!bookingForm.value.name || !bookingForm.value.phone) {
    $q.notify({
      type: 'warning',
      message: 'Por favor ingresa tu nombre y teléfono de contacto',
      position: 'top',
      timeout: 3000
    });
    return;
  }

  $q.notify({
    type: 'positive',
    message: orderType.value === 'reserva'
      ? `¡Reserva confirmada con éxito para ${bookingForm.value.name}! Te esperamos a las ${bookingForm.value.time}.`
      : `¡Pedido programado para entrega a ${bookingForm.value.name}!`,
    caption: 'Te enviaremos un mensaje de confirmación a tu teléfono.',
    position: 'top',
    timeout: 4500
  });

  isReservationOpen.value = false;
  bookingForm.value.name = '';
  bookingForm.value.phone = '';
  bookingForm.value.address = '';
  bookingForm.value.notes = '';
};

const sendWhatsAppOrder = () => {
  if (cartItems.value.length === 0) return;

  let text = `¡Hola Flavoria! Quisiera realizar el siguiente pedido:\n\n`;
  cartItems.value.forEach(item => {
    text += `• ${item.quantity}x ${item.name} (${formatCOP(item.price * item.quantity)})\n`;
    if (item.note) text += `   Nota: ${item.note}\n`;
  });
  text += `\n*Total:* ${formatCOP(totalPrice.value)}`;
  text += `\n*Servicio Domicilio Express*`;

  const url = `https://wa.me/573124567890?text=${encodeURIComponent(text)}`;
  window.open(url, '_blank');

  $q.notify({
    type: 'positive',
    message: 'Abriendo WhatsApp con el detalle de tu pedido...',
    position: 'top'
  });
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s ease, transform 0.25s ease;
}

.fade-enter-from {
  opacity: 0;
  transform: translateY(8px);
}

.fade-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
</style>
