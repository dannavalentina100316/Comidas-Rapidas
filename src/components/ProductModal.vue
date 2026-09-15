<template>
  <q-dialog
    v-model="isOpen"
    @update:model-value="handleModelUpdate"
    @hide="onClose"
  >
    <q-card
      v-if="product"
      class="bg-neutral-900 text-white rounded-2xl overflow-hidden border border-neutral-800 shadow-2xl relative"
      style="width: 580px; max-width: 95vw; background-color: #161616;"
    >
      <!-- Image Container with Chef Special Badge -->
      <div class="relative h-64 sm:h-72 w-full overflow-hidden bg-neutral-950">
        <img
          :src="product.image"
          :alt="product.name"
          class="w-full h-full object-cover"
        />
        <div class="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-black/40"></div>

        <!-- Close button: explicit click handler, high z-index, guaranteed interactive -->
        <q-btn
          round
          dense
          flat
          icon="close"
          color="white"
          class="absolute top-4 right-4 z-30 bg-black/75 hover:bg-neutral-800 text-white cursor-pointer shadow-lg transition-all"
          @click.stop="onClose"
          v-close-popup
          aria-label="Cerrar modal"
        />

        <!-- Chef Special Badge if active -->
        <div
          v-if="product.isChefSpecial"
          class="absolute top-4 left-4 bg-[#F35D08] text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider flex items-center space-x-1 shadow-lg"
        >
          <q-icon name="stars" size="16px" />
          <span>Especial del Chef</span>
        </div>

        <!-- Price banner over image bottom -->
        <div class="absolute bottom-4 left-5 right-5 flex justify-between items-end">
          <div>
            <span class="text-xs uppercase tracking-widest text-[#F35D08] font-bold">— {{ product.category }} —</span>
            <h3 class="text-2xl sm:text-3xl font-serif-title font-bold text-white drop-shadow-md m-0">
              {{ product.name }}
            </h3>
          </div>
          <div class="text-right">
            <span class="text-xs text-neutral-400 block uppercase">Precio</span>
            <span class="text-2xl font-extrabold text-[#F35D08] drop-shadow-md font-sans-body">
              {{ formatCOP(product.price) }}
            </span>
          </div>
        </div>
      </div>

      <!-- Content Details -->
      <q-card-section class="p-6 space-y-5">
        <!-- Rating & Reviews -->
        <div class="flex items-center justify-between border-b border-neutral-800 pb-3">
          <div class="flex items-center space-x-1">
            <q-icon
              v-for="star in 5"
              :key="star"
              name="star"
              size="18px"
              color="deep-orange-7"
            />
            <span class="text-sm font-bold text-neutral-200 ml-2">5.0</span>
            <span class="text-xs text-neutral-400">({{ product.reviews }} opiniones)</span>
          </div>
          <div class="flex items-center text-xs text-neutral-400">
            <q-icon name="timer" size="16px" class="q-mr-xs text-[#F35D08]" />
            <span>15 - 25 min</span>
          </div>
        </div>

        <!-- Description -->
        <div>
          <h4 class="text-xs uppercase tracking-widest text-neutral-400 font-bold mb-2">Descripción</h4>
          <p class="text-sm text-neutral-300 leading-relaxed m-0">
            {{ product.description }}
          </p>
        </div>

        <!-- Ingredients List -->
        <div v-if="product.ingredients && product.ingredients.length">
          <h4 class="text-xs uppercase tracking-widest text-neutral-400 font-bold mb-2">Ingredientes Principales</h4>
          <div class="flex flex-wrap gap-2">
            <span
              v-for="(ing, idx) in product.ingredients"
              :key="idx"
              class="text-xs px-3 py-1.5 rounded-lg bg-neutral-800/80 text-neutral-200 border border-neutral-700/60"
            >
              ✓ {{ ing }}
            </span>
          </div>
        </div>

        <!-- Special Instructions / Notes -->
        <div>
          <label class="text-xs uppercase tracking-widest text-neutral-400 font-bold block mb-1">
            Instrucciones o personalización
          </label>
          <q-input
            v-model="customerNote"
            dark
            outlined
            dense
            placeholder="Ej. Sin cebolla, salsa aparte, pan bien tostado..."
            color="deep-orange-7"
          />
        </div>

        <!-- Quantity & Add to Cart Action -->
        <div class="pt-4 border-t border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <!-- Quantity Stepper -->
          <div class="flex items-center space-x-3 bg-neutral-950 px-3 py-1.5 rounded-full border border-neutral-800">
            <span class="text-xs text-neutral-400 uppercase font-bold mr-1">Cant:</span>
            <q-btn
              round
              flat
              dense
              icon="remove"
              color="grey-4"
              size="sm"
              @click="quantity > 1 ? quantity-- : null"
            />
            <span class="text-base font-bold text-white px-2">{{ quantity }}</span>
            <q-btn
              round
              flat
              dense
              icon="add"
              color="deep-orange-5"
              size="sm"
              @click="quantity++"
            />
          </div>

          <!-- Total Calculation & CTA -->
          <div class="flex items-center space-x-3 w-full sm:w-auto justify-end">
            <div class="text-right hidden sm:block mr-1">
              <span class="text-[11px] uppercase text-neutral-400 block">Subtotal</span>
              <span class="text-lg font-bold text-white">{{ formatCOP(product.price * quantity) }}</span>
            </div>
            <q-btn
              flat
              dense
              label="Cerrar"
              color="grey-4"
              class="px-3 py-2 text-xs hover:text-white"
              @click="onClose"
            />
            <q-btn
              unelevated
              class="btn-flavoria-primary flex-1 sm:flex-none q-py-sm q-px-lg text-weight-bold"
              @click="handleAddToCart"
            >
              <q-icon name="add_shopping_cart" class="q-mr-sm" size="18px" />
              <span>AGREGAR AL PEDIDO</span>
            </q-btn>
          </div>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { ref, watch } from 'vue';
import { useQuasar } from 'quasar';
import { useCart } from '../composables/useCart.js';

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  },
  product: {
    type: Object,
    default: null
  }
});

const emit = defineEmits(['update:modelValue']);

const $q = useQuasar();
const { addToCart, formatCOP } = useCart();

const isOpen = ref(props.modelValue);
const quantity = ref(1);
const customerNote = ref('');

watch(() => props.modelValue, (val) => {
  isOpen.value = val;
  if (val) {
    quantity.value = 1;
    customerNote.value = '';
  }
});

const handleModelUpdate = (val) => {
  isOpen.value = val;
  if (!val) {
    emit('update:modelValue', false);
  }
};

const onClose = () => {
  isOpen.value = false;
  emit('update:modelValue', false);
};

const handleAddToCart = () => {
  if (!props.product) return;

  addToCart(props.product, quantity.value, customerNote.value);

  $q.notify({
    type: 'positive',
    message: `¡${quantity.value}x ${props.product.name} agregado al pedido!`,
    caption: `${formatCOP(props.product.price * quantity.value)}`,
    position: 'top',
    timeout: 2500
  });

  emit('update:modelValue', false);
};
</script>
