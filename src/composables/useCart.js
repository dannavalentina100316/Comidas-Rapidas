import { ref, computed } from 'vue';

const cartItems = ref([]);
const favorites = ref([1, 5, 9, 13]); // Default favorites
const isCartOpen = ref(false);
const isReservationOpen = ref(false);

export function useCart() {
  const addToCart = (product, quantity = 1, note = '') => {
    const existingIndex = cartItems.value.findIndex(item => item.id === product.id);
    if (existingIndex > -1) {
      cartItems.value[existingIndex].quantity += quantity;
      if (note) {
        cartItems.value[existingIndex].note = note;
      }
    } else {
      cartItems.value.push({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        category: product.category,
        quantity,
        note
      });
    }
  };

  const removeFromCart = (productId) => {
    cartItems.value = cartItems.value.filter(item => item.id !== productId);
  };

  const updateQuantity = (productId, delta) => {
    const item = cartItems.value.find(item => item.id === productId);
    if (item) {
      item.quantity += delta;
      if (item.quantity <= 0) {
        removeFromCart(productId);
      }
    }
  };

  const clearCart = () => {
    cartItems.value = [];
  };

  const totalCount = computed(() => {
    return cartItems.value.reduce((sum, item) => sum + item.quantity, 0);
  });

  const totalPrice = computed(() => {
    return cartItems.value.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  });

  const formatCOP = (val) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      maximumFractionDigits: 0
    }).format(val).replace('COP', '').trim() + ' COP';
  };

  const toggleFavorite = (productId) => {
    const index = favorites.value.indexOf(productId);
    if (index > -1) {
      favorites.value.splice(index, 1);
      return false;
    } else {
      favorites.value.push(productId);
      return true;
    }
  };

  const isFavorite = (productId) => {
    return favorites.value.includes(productId);
  };

  return {
    cartItems,
    favorites,
    isCartOpen,
    isReservationOpen,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    totalCount,
    totalPrice,
    formatCOP,
    toggleFavorite,
    isFavorite
  };
}
