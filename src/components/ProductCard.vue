<template>
  <div
    class="flavoria-card flex flex-col h-full cursor-pointer relative group"
    :class="{ 'flavoria-chef-special': product.isChefSpecial }"
    @click="$emit('select', product)"
  >
    <!-- Chef's special badge on card -->
    <div
      v-if="product.isChefSpecial"
      class="absolute top-3 left-3 z-10 bg-[#F35D08] text-white text-[11px] font-extrabold uppercase px-2.5 py-1 rounded-full shadow-lg flex items-center space-x-1"
    >
      <q-icon name="stars" size="14px" />
      <span>Especial del Chef</span>
    </div>

    <!-- Image Container with floating heart -->
    <div class="relative w-full h-56 sm:h-60 overflow-hidden bg-neutral-950">
      <img
        :src="product.image"
        :alt="product.name"
        class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        loading="lazy"
      />
      <div class="absolute inset-0 bg-gradient-to-t from-[#1A1A1A] via-transparent to-transparent opacity-80"></div>

      <!-- Floating Heart Button (Favoritos) in top-right -->
      <button
        type="button"
        @click.stop="toggleFav"
        class="absolute top-3 right-3 z-10 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 backdrop-blur-md cursor-pointer border"
        :class="isFav ? 'bg-[#F35D08] border-[#F35D08] text-white scale-110 shadow-lg' : 'bg-black/60 border-white/20 text-white/80 hover:bg-black/80 hover:text-white'"
        title="Guardar en favoritos"
      >
        <q-icon :name="isFav ? 'favorite' : 'favorite_border'" size="20px" :color="isFav ? 'white' : 'deep-orange-5'" />
      </button>
    </div>

    <!-- Product Info Section -->
    <div class="p-5 flex flex-col flex-1 justify-between bg-[#1A1A1A]">
      <div>
        <span class="text-[11px] uppercase tracking-widest text-neutral-400 font-bold block mb-1">
          {{ product.category }}
        </span>
        <h3 class="text-lg sm:text-xl font-bold font-serif-title text-white group-hover:text-deep-orange-5 transition-colors line-clamp-1 m-0">
          {{ product.name }}
        </h3>

        <!-- 5 Orange Stars & Reviews -->
        <div class="flex items-center space-x-1 my-2">
          <q-icon
            v-for="star in 5"
            :key="star"
            name="star"
            size="16px"
            color="deep-orange-7"
          />
          <span class="text-xs text-neutral-400 font-medium ml-1">({{ product.reviews }})</span>
        </div>

        <p class="text-xs text-neutral-400 line-clamp-2 leading-relaxed mb-4">
          {{ product.description }}
        </p>
      </div>

      <!-- Price & Order Action -->
      <div class="flex items-center justify-between pt-3 border-t border-neutral-800/80 mt-auto">
        <div>
          <span class="text-[10px] uppercase text-neutral-500 block font-semibold">Precio</span>
          <span class="text-lg font-bold text-[#F35D08] font-sans-body">
            {{ formatCOP(product.price) }}
          </span>
        </div>

        <q-btn
          round
          dense
          unelevated
          color="deep-orange-7"
          icon="add"
          size="sm"
          class="transition-transform group-hover:scale-110"
          @click.stop="$emit('add', product)"
          title="Agregar al pedido"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useCart } from '../composables/useCart.js';

const props = defineProps({
  product: {
    type: Object,
    required: true
  }
});

defineEmits(['select', 'add']);

const { formatCOP, toggleFavorite, isFavorite } = useCart();

const isFav = computed(() => isFavorite(props.product.id));

const toggleFav = () => {
  toggleFavorite(props.product.id);
};
</script>
